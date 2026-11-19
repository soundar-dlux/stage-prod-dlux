import fs from "node:fs";
import {
  validateLeadPayload,
  resolveGatedAsset,
  dispatchLeadSubmission,
  createDownloadToken,
  verifyDownloadToken,
  recordTokenUsage,
  checkRateLimit,
  LeadSubmissionPayload,
} from "@/src/lib/downloads/server";
import { getTrustedClientIp } from "@/src/lib/security/client-ip";

export const dynamic = "force-dynamic";

/**
 * POST /api/downloads
 * Validates lead data, submits to CRM server-side, and issues a time-limited download token.
 */
export async function POST(req: Request) {
  // 1. IP Rate Limiting with trusted IP extraction and direct-bypass check
  const clientIp = getTrustedClientIp(req);

  if (clientIp === "untrusted-proxy-bypass") {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Forbidden: Direct origin access is not permitted.",
      }),
      { status: 403, headers: { "Content-Type": "application/json" } },
    );
  }

  const ipLimit = await checkRateLimit(`ip:${clientIp}`, 20, 60_000);
  if (!ipLimit.allowed) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Too many requests. Please try again shortly.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(ipLimit.retryAfterSeconds || 60),
        },
      },
    );
  }

  // 2. Parse JSON
  let body: LeadSubmissionPayload;
  try {
    body = (await req.json()) as LeadSubmissionPayload;
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid JSON request body" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // 3. Validate Lead
  const validation = validateLeadPayload(body);
  if (!validation.isValid || !validation.lead) {
    return new Response(
      JSON.stringify({ success: false, error: validation.error }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // 4. Email Rate Limiting
  const emailLimit = await checkRateLimit(
    `email:${validation.lead.email}`,
    5,
    60_000,
  );
  if (!emailLimit.allowed) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Too many download requests for this email address.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(emailLimit.retryAfterSeconds || 60),
        },
      },
    );
  }

  // 5. Resolve Asset
  const asset = await resolveGatedAsset({
    assetId: body.assetId,
    slug: body.slug,
    useCase: body.useCase,
    pdfUrl: body.pdfUrl,
  });

  if (!asset) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Requested asset not found or unavailable.",
      }),
      { status: 404, headers: { "Content-Type": "application/json" } },
    );
  }

  // 6. Server-side CRM dispatch (verification before unlocking)
  let formType: "case-study" | "use-case" | "fusion-health-check" =
    "case-study";
  if (asset.id === "fusion-readiness-guide") {
    formType = "fusion-health-check";
  } else if (body.useCase || asset.id.startsWith("use-case-")) {
    formType = "use-case";
  }

  const crmResult = await dispatchLeadSubmission(validation.lead, {
    formType,
    useCaseTitle: body.useCase || asset.title,
  });

  if (!crmResult.success) {
    return new Response(
      JSON.stringify({
        success: false,
        error:
          "Unable to verify lead submission. Please check your information and try again.",
      }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  }

  // 7. Generate Signed Download Token (fails closed if secret missing or invalid)
  let downloadToken: string;
  try {
    downloadToken = createDownloadToken(asset.id, validation.lead.email);
  } catch (err: unknown) {
    console.error(
      "Failed to generate download token: authorization signing secret unavailable or invalid",
    );
    return new Response(
      JSON.stringify({
        success: false,
        error:
          "Download authorization is temporarily unavailable. Please try again later.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response(
    JSON.stringify({
      success: true,
      downloadToken,
      downloadUrl: `/api/downloads?token=${encodeURIComponent(downloadToken)}`,
      fileName: asset.fileName,
      title: asset.title,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    },
  );
}

/**
 * GET /api/downloads?token=<signedToken>
 * Verifies token signature, expiration, and replay limits before delivering asset.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return new Response(
      JSON.stringify({
        error: "Unauthorized: Missing download authorization token",
      }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  // 1. Verify Token
  const verification = verifyDownloadToken(token);
  if (!verification.isValid || !verification.payload) {
    const isConfigError =
      verification.error?.toLowerCase().includes("secret") ||
      verification.error?.toLowerCase().includes("configuration");
    const clientError = isConfigError
      ? "Unauthorized: Invalid or unverifiable download authorization token"
      : `Unauthorized: ${verification.error || "Invalid token"}`;

    return new Response(
      JSON.stringify({
        error: clientError,
      }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  // 2. Enforce Token Usage / Replay (Fail-closed)
  const allowed = await recordTokenUsage(verification.payload.jti);
  if (!allowed) {
    return new Response(
      JSON.stringify({
        error: "Forbidden: Download token usage limit exceeded",
      }),
      { status: 403, headers: { "Content-Type": "application/json" } },
    );
  }

  // 3. Resolve Gated Asset
  const asset = await resolveGatedAsset({
    assetId: verification.payload.assetId,
    slug: verification.payload.assetId,
  });

  if (!asset) {
    return new Response(
      JSON.stringify({ error: "Asset not found or no longer available" }),
      { status: 404, headers: { "Content-Type": "application/json" } },
    );
  }

  // 4. Private Delivery (Never redirect or leak upstream CDN/storage URLs)
  const safeFileName = asset.fileName.replace(/[^a-zA-Z0-9._-]/g, "_");

  // Mode A: Direct private storage delivery (Zero CDN exposure, air-gapped from public web)
  if (asset.localPath) {
    try {
      const fileBuffer = await fs.promises.readFile(asset.localPath);
      return new Response(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${safeFileName}"`,
          "Cache-Control": "private, no-store, max-age=0, must-revalidate",
          "X-Content-Type-Options": "nosniff",
        },
      });
    } catch {
      return new Response(
        JSON.stringify({
          error: "Protected asset could not be read from private storage",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  }

  // Mode B: Server-brokered upstream streaming
  if (!asset.url) {
    return new Response(JSON.stringify({ error: "Asset source unavailable" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const upstreamRes = await fetch(asset.url, {
      signal: AbortSignal.timeout(10000),
    });

    if (!upstreamRes.ok) {
      return new Response(
        JSON.stringify({
          error: "Upstream asset is temporarily unavailable",
        }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    const fileBuffer = await upstreamRes.arrayBuffer();

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeFileName}"`,
        "Cache-Control": "private, no-store, max-age=0, must-revalidate",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response(
      JSON.stringify({
        error:
          "Failed to securely retrieve download asset from upstream storage",
      }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  }
}
