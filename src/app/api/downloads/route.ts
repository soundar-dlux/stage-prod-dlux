import {
  validateLeadPayload,
  resolveGatedAsset,
  dispatchLeadSubmission,
  createDownloadToken,
  verifyDownloadToken,
  recordTokenUsage,
  checkRateLimit,
} from "@/src/lib/downloads/server";

export const dynamic = "force-dynamic";

/**
 * POST /api/downloads
 * Validates lead data, submits to CRM server-side, and issues a time-limited download token.
 */
export async function POST(req: Request) {
  // 1. IP Rate Limiting
  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "client";

  const ipLimit = checkRateLimit(`ip:${clientIp}`, 20, 60_000);
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
      }
    );
  }

  // 2. Parse JSON
  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid JSON request body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // 3. Validate Lead
  const validation = validateLeadPayload(body);
  if (!validation.isValid || !validation.lead) {
    return new Response(
      JSON.stringify({ success: false, error: validation.error }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // 4. Email Rate Limiting
  const emailLimit = checkRateLimit(`email:${validation.lead.email}`, 5, 60_000);
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
      }
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
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  // 6. Server-side CRM dispatch (verification before unlocking)
  let formType: "case-study" | "use-case" | "fusion-health-check" = "case-study";
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
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  // 7. Generate Signed Download Token
  const downloadToken = createDownloadToken(asset.id, validation.lead.email);

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
    }
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
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // 1. Verify Token
  const verification = verifyDownloadToken(token);
  if (!verification.isValid || !verification.payload) {
    return new Response(
      JSON.stringify({
        error: `Unauthorized: ${verification.error || "Invalid token"}`,
      }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // 2. Enforce Token Usage / Replay
  const allowed = recordTokenUsage(verification.payload.jti);
  if (!allowed) {
    return new Response(
      JSON.stringify({
        error: "Forbidden: Download token usage limit exceeded",
      }),
      { status: 403, headers: { "Content-Type": "application/json" } }
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
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  // 4. Private Delivery
  try {
    const upstreamRes = await fetch(asset.url, {
      signal: AbortSignal.timeout(10000),
    });

    if (!upstreamRes.ok) {
      // Fallback: safe redirect
      return Response.redirect(asset.url, 307);
    }

    const fileBuffer = await upstreamRes.arrayBuffer();
    const safeFileName = asset.fileName.replace(/[^a-zA-Z0-9._-]/g, "_");

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
    // If upstream streaming fails, redirect to safe canonical URL
    return Response.redirect(asset.url, 307);
  }
}
