import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  createDownloadToken,
  verifyDownloadToken,
  validateLeadPayload,
  resolveGatedAsset,
  checkRateLimit,
  recordTokenUsage,
  resetRateLimitsForTesting,
  setCrmSubmitHandlerForTesting,
  setDownloadTokenSecretForTesting,
  setDownloadTokenStore,
  PRIVATE_ASSETS_DIR,
  verifyAssetStorageSecurity,
} from "../../src/lib/downloads/server";
import { POST, GET } from "../../src/app/api/downloads/route";
import { getSafePdfUrl } from "../../src/lib/security/content-urls";
import { getTrustedClientIp } from "../../src/lib/security/client-ip";
import { MemoryTokenStore } from "../../src/lib/downloads/storage";

const DEFAULT_TEST_SECRET =
  "test-secure-download-token-secret-minimum-32-chars-long-abc";

describe("S05 - Client-side-only Download & Access Gating Remediation", () => {
  const originalEnvSecret = process.env.DOWNLOAD_TOKEN_SECRET;
  const originalNextAuthSecret = process.env.NEXTAUTH_SECRET;

  beforeEach(() => {
    Object.assign(process.env, { NODE_ENV: "test" });
    process.env.DOWNLOAD_TOKEN_SECRET = DEFAULT_TEST_SECRET;
    delete process.env.NEXTAUTH_SECRET;
    delete process.env.TRUSTED_PROXY_SECRET;
    delete process.env.TRUST_PROXY;
    setDownloadTokenSecretForTesting(DEFAULT_TEST_SECRET);
    setDownloadTokenStore(new MemoryTokenStore());
    resetRateLimitsForTesting();
    setCrmSubmitHandlerForTesting(null);
  });

  afterEach(() => {
    if (originalEnvSecret !== undefined) {
      process.env.DOWNLOAD_TOKEN_SECRET = originalEnvSecret;
    } else {
      delete process.env.DOWNLOAD_TOKEN_SECRET;
    }
    if (originalNextAuthSecret !== undefined) {
      process.env.NEXTAUTH_SECRET = originalNextAuthSecret;
    } else {
      delete process.env.NEXTAUTH_SECRET;
    }
    resetRateLimitsForTesting();
    setCrmSubmitHandlerForTesting(null);
  });

  describe("1. Direct Unauthorized Access Protection & Secret Management", () => {
    it("should succeed verification for valid token signed with configured secret", () => {
      const validToken = createDownloadToken(
        "fusion-readiness-guide",
        "user@example.com"
      );
      const verification = verifyDownloadToken(validToken);

      assert.equal(verification.isValid, true);
      assert.equal(verification.payload?.assetId, "fusion-readiness-guide");
      assert.equal(verification.payload?.email, "user@example.com");
      assert.ok(typeof verification.payload?.jti === "string");
      assert.ok((verification.payload?.expiresAt ?? 0) > Date.now());
    });

    it("should reject GET requests with missing token (401 Unauthorized)", async () => {
      const req = new Request("https://dluxtech.com/api/downloads", {
        method: "GET",
      });
      const res = await GET(req);
      assert.equal(res.status, 401);
      const data = await res.json();
      assert.ok(data.error.includes("Missing download authorization token"));
    });

    it("should reject GET requests with malformed token (401)", async () => {
      const req = new Request(
        "https://dluxtech.com/api/downloads?token=totally-invalid-token",
        { method: "GET" }
      );
      const res = await GET(req);
      assert.equal(res.status, 401);
      const data = await res.json();
      assert.ok(data.error.includes("Malformed download token"));
    });

    it("should reject invalid or forged token and deny GET request (401)", async () => {
      // Token signed with an unauthorized external key
      const payload = {
        assetId: "fusion-readiness-guide",
        email: "attacker@forged.com",
        issuedAt: Date.now(),
        expiresAt: Date.now() + 600000,
        jti: "forged-uuid-9999",
      };
      const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
      const forgedSig = crypto
        .createHmac("sha256", "different-attacker-supplied-signing-key-32chars")
        .update(payloadB64)
        .digest("base64url");
      const forgedToken = `${payloadB64}.${forgedSig}`;

      const verification = verifyDownloadToken(forgedToken);
      assert.equal(verification.isValid, false);
      assert.ok(verification.error?.includes("Invalid token signature"));

      const req = new Request(
        `https://dluxtech.com/api/downloads?token=${encodeURIComponent(forgedToken)}`,
        { method: "GET" }
      );
      const res = await GET(req);
      assert.equal(res.status, 401);
      const data = await res.json();
      assert.ok(data.error.includes("Invalid token signature"));
    });

    it("should reject GET requests with tampered token signature (401)", async () => {
      const validToken = createDownloadToken(
        "fusion-readiness-guide",
        "user@example.com"
      );
      const parts = validToken.split(".");
      // Tamper signature part
      const tamperedToken = `${parts[0]}.forgedSignature123456789`;

      const verification = verifyDownloadToken(tamperedToken);
      assert.equal(verification.isValid, false);
      assert.ok(verification.error?.includes("Invalid token signature"));

      const req = new Request(
        `https://dluxtech.com/api/downloads?token=${encodeURIComponent(tamperedToken)}`,
        { method: "GET" }
      );
      const res = await GET(req);
      assert.equal(res.status, 401);
      const data = await res.json();
      assert.ok(data.error.includes("Invalid token signature"));
    });

    it("should reject GET requests with tampered token payload (401)", async () => {
      const validToken = createDownloadToken(
        "fusion-readiness-guide",
        "user@example.com"
      );
      const parts = validToken.split(".");
      // Tamper payload to escalate asset to another file without updating signature
      const decodedPayload = JSON.parse(
        Buffer.from(parts[0], "base64url").toString("utf-8")
      );
      decodedPayload.assetId = "use-case-1";
      const tamperedPayloadB64 = Buffer.from(
        JSON.stringify(decodedPayload)
      ).toString("base64url");
      const tamperedToken = `${tamperedPayloadB64}.${parts[1]}`;

      const verification = verifyDownloadToken(tamperedToken);
      assert.equal(verification.isValid, false);
      assert.ok(verification.error?.includes("Invalid token signature"));

      const req = new Request(
        `https://dluxtech.com/api/downloads?token=${encodeURIComponent(tamperedToken)}`,
        { method: "GET" }
      );
      const res = await GET(req);
      assert.equal(res.status, 401);
      const data = await res.json();
      assert.ok(data.error.includes("Invalid token signature"));
    });

    it("should reject GET requests with expired token (401)", async () => {
      // Create token expired 5 seconds ago
      const expiredToken = createDownloadToken(
        "fusion-readiness-guide",
        "user@example.com",
        { expiresInMs: -5000 }
      );

      const verification = verifyDownloadToken(expiredToken);
      assert.equal(verification.isValid, false);
      assert.ok(verification.error?.includes("expired"));

      const req = new Request(
        `https://dluxtech.com/api/downloads?token=${encodeURIComponent(expiredToken)}`,
        { method: "GET" }
      );
      const res = await GET(req);
      assert.equal(res.status, 401);
      const data = await res.json();
      assert.ok(data.error.includes("expired"));
    });

    it("should fail closed when DOWNLOAD_TOKEN_SECRET is missing and deny download authorization", async () => {
      delete process.env.DOWNLOAD_TOKEN_SECRET;
      delete process.env.NEXTAUTH_SECRET;

      // 1. Token generation fails closed
      assert.throws(
        () => createDownloadToken("fusion-readiness-guide", "user@test.com"),
        /CRITICAL SECURITY CONFIGURATION ERROR: DOWNLOAD_TOKEN_SECRET/
      );

      // 2. Token verification fails closed safely without uncaught exception
      const verification = verifyDownloadToken("sample.token");
      assert.equal(verification.isValid, false);
      assert.ok(/secret/i.test(verification.error || ""));

      // 3. GET download request denies access (401) and does not leak internal secret config
      const getReq = new Request(
        "https://dluxtech.com/api/downloads?token=sample.token",
        { method: "GET" }
      );
      const getRes = await GET(getReq);
      assert.equal(getRes.status, 401);
      const getData = await getRes.json();
      assert.ok(getData.error.includes("Unauthorized"));
      assert.equal(
        getData.error.includes("DOWNLOAD_TOKEN_SECRET"),
        false,
        "Secret environment variable names must not be leaked to clients"
      );

      // 4. POST lead submission denies token issuance (503) and does not unlock asset
      setCrmSubmitHandlerForTesting(async () => ({ success: true, status: 200 }));
      const postReq = new Request("https://dluxtech.com/api/downloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          phone: "+1 555-123-4567",
          assetId: "fusion-readiness-guide",
        }),
      });
      const postRes = await POST(postReq);
      assert.equal(postRes.status, 503);
      const postData = await postRes.json();
      assert.equal(postData.success, false);
      assert.equal(postData.downloadToken, undefined);
      assert.equal(postData.downloadUrl, undefined);
      assert.equal(
        postData.error.includes("DOWNLOAD_TOKEN_SECRET"),
        false,
        "Configuration details must not be exposed in client response"
      );
    });

    it("should fail closed when DOWNLOAD_TOKEN_SECRET is empty string or whitespace", async () => {
      const emptyValues = ["", "   ", "\t\n"];

      for (const emptyVal of emptyValues) {
        process.env.DOWNLOAD_TOKEN_SECRET = emptyVal;

        assert.throws(
          () => createDownloadToken("fusion-readiness-guide", "user@test.com"),
          /CRITICAL SECURITY CONFIGURATION ERROR/
        );

        const verification = verifyDownloadToken("some.token");
        assert.equal(verification.isValid, false);

        const getReq = new Request(
          "https://dluxtech.com/api/downloads?token=some.token",
          { method: "GET" }
        );
        const getRes = await GET(getReq);
        assert.equal(getRes.status, 401);

        setCrmSubmitHandlerForTesting(async () => ({ success: true, status: 200 }));
        const postReq = new Request("https://dluxtech.com/api/downloads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Test User",
            email: "test@example.com",
            phone: "+1 555-123-4567",
            assetId: "fusion-readiness-guide",
          }),
        });
        const postRes = await POST(postReq);
        assert.equal(postRes.status, 503);
        const postData = await postRes.json();
        assert.equal(postData.success, false);
      }
    });

    it("should fail closed if configured secret is shorter than 32 characters", async () => {
      process.env.DOWNLOAD_TOKEN_SECRET = "short-secret-under-32-chars";

      assert.throws(
        () => createDownloadToken("fusion-readiness-guide", "user@test.com"),
        /must be at least 32 characters/
      );

      const verification = verifyDownloadToken("some.token");
      assert.equal(verification.isValid, false);

      const getReq = new Request(
        "https://dluxtech.com/api/downloads?token=some.token",
        { method: "GET" }
      );
      const getRes = await GET(getReq);
      assert.equal(getRes.status, 401);

      setCrmSubmitHandlerForTesting(async () => ({ success: true, status: 200 }));
      const postReq = new Request("https://dluxtech.com/api/downloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          phone: "+1 555-123-4567",
          assetId: "fusion-readiness-guide",
        }),
      });
      const postRes = await POST(postReq);
      assert.equal(postRes.status, 503);
    });

    it("should fail closed if configured secret is an insecure placeholder value", async () => {
      process.env.DOWNLOAD_TOKEN_SECRET =
        "your_secure_download_token_secret_minimum_32_characters";

      assert.throws(
        () => createDownloadToken("fusion-readiness-guide", "user@test.com"),
        /insecure placeholder value/
      );

      const verification = verifyDownloadToken("some.token");
      assert.equal(verification.isValid, false);

      const getReq = new Request(
        "https://dluxtech.com/api/downloads?token=some.token",
        { method: "GET" }
      );
      const getRes = await GET(getReq);
      assert.equal(getRes.status, 401);
    });

    it("should strictly refuse fallback to NEXTAUTH_SECRET when DOWNLOAD_TOKEN_SECRET is missing", () => {
      delete process.env.DOWNLOAD_TOKEN_SECRET;
      process.env.NEXTAUTH_SECRET = DEFAULT_TEST_SECRET;

      // Must fail closed and NOT use NEXTAUTH_SECRET as a substitute
      assert.throws(
        () => createDownloadToken("fusion-readiness-guide", "user@test.com"),
        /DOWNLOAD_TOKEN_SECRET environment variable is missing or empty/
      );

      const verification = verifyDownloadToken("some.token");
      assert.equal(verification.isValid, false);
    });

    it("should reject forged tokens signed with old hardcoded fallback secret", () => {
      // Forge token using former predictable fallback secret: "dlux-secure-gated-download-secret-key-32chars"
      const payload = {
        assetId: "fusion-readiness-guide",
        email: "attacker@evil.com",
        issuedAt: Date.now(),
        expiresAt: Date.now() + 600000,
        jti: "forged-jti-12345",
      };
      const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
      const forgedSig = crypto
        .createHmac("sha256", "dlux-secure-gated-download-secret-key-32chars")
        .update(payloadB64)
        .digest("base64url");
      const forgedToken = `${payloadB64}.${forgedSig}`;

      // Verification with the active secure secret must reject the forged token
      const verification = verifyDownloadToken(forgedToken);
      assert.equal(verification.isValid, false);
      assert.ok(verification.error?.includes("Invalid token signature"));
    });
  });

  describe("2. Lead Input Validation & Schema Enforcement", () => {
    it("should accept valid lead information", () => {
      const result = validateLeadPayload({
        name: "Jane Smith",
        email: "jane.smith@corporate.com",
        phone: "+1 (555) 019-2834",
      });
      assert.equal(result.isValid, true);
      assert.equal(result.lead?.firstName, "Jane");
      assert.equal(result.lead?.lastName, "Smith");
      assert.equal(result.lead?.email, "jane.smith@corporate.com");
      assert.equal(result.lead?.phone, "+1 (555) 019-2834");
    });

    it("should reject missing or empty names", () => {
      const result = validateLeadPayload({
        name: "   ",
        email: "test@example.com",
        phone: "1234567890",
      });
      assert.equal(result.isValid, false);
      assert.ok(result.error?.includes("First name is required"));
    });

    it("should reject invalid or header-injected emails", () => {
      const badEmails = [
        "not-an-email",
        "user@localhost",
        "victim@corp.com\r\nBcc:attacker@evil.com",
        "user@domain..com",
        "@nodomain.com",
      ];
      for (const email of badEmails) {
        const result = validateLeadPayload({
          name: "Alice",
          email,
          phone: "1234567890",
        });
        assert.equal(
          result.isValid,
          false,
          `Expected invalid for email: ${email}`
        );
      }
    });

    it("should reject malformed phone numbers", () => {
      const badPhones = ["123", "abc-def-ghij", ""];
      for (const phone of badPhones) {
        const result = validateLeadPayload({
          name: "Bob",
          email: "bob@example.com",
          phone,
        });
        assert.equal(
          result.isValid,
          false,
          `Expected invalid for phone: ${phone}`
        );
      }
    });
  });

  describe("3. Server Verification of Lead Submission (Failed Submission Must NOT Unlock)", () => {
    it("should NOT issue token and return 502 if upstream CRM submission fails", async () => {
      // Mock CRM failure
      setCrmSubmitHandlerForTesting(async () => ({
        success: false,
        status: 500,
        error: "Upstream Zoho server timeout",
      }));

      const req = new Request("https://dluxtech.com/api/downloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Charlie Brown",
          email: "charlie@example.com",
          phone: "9876543210",
          assetId: "fusion-readiness-guide",
        }),
      });

      const res = await POST(req);
      assert.equal(res.status, 502);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.equal(data.downloadToken, undefined);
      assert.equal(data.downloadUrl, undefined);
      assert.ok(data.error.includes("Unable to verify"));
    });

    it("should issue valid signed token on verified CRM submission success", async () => {
      setCrmSubmitHandlerForTesting(async () => ({
        success: true,
        status: 200,
      }));

      const req = new Request("https://dluxtech.com/api/downloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Dana Scully",
          email: "dana@fbi.gov",
          phone: "555-123-4567",
          assetId: "fusion-readiness-guide",
        }),
      });

      const res = await POST(req);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(typeof data.downloadToken === "string");
      assert.ok(data.downloadUrl.startsWith("/api/downloads?token="));
      assert.equal(data.fileName, "fusion-readiness-guide.pdf");

      // Verify the generated token
      const tokenVerification = verifyDownloadToken(data.downloadToken);
      assert.equal(tokenVerification.isValid, true);
      assert.equal(tokenVerification.payload?.assetId, "fusion-readiness-guide");
      assert.equal(tokenVerification.payload?.email, "dana@fbi.gov");
    });
  });

  describe("4. Token Replay & Usage Limits", () => {
    it("should enforce maximum download limits per token", () => {
      const token = createDownloadToken(
        "fusion-readiness-guide",
        "replay@test.com",
        { maxUses: 2 }
      );

      const v1 = verifyDownloadToken(token);
      assert.equal(v1.isValid, true);

      // Verify and record usage
      assert.equal(recordTokenUsage(v1.payload!.jti), true); // usage 1
      assert.equal(recordTokenUsage(v1.payload!.jti), true); // usage 2

      // 3rd usage should exceed limit
      const allowed = recordTokenUsage(v1.payload!.jti);
      assert.equal(allowed, false);

      const vExceeded = verifyDownloadToken(token);
      assert.equal(vExceeded.isValid, false);
      assert.ok(vExceeded.error?.includes("usage limit exceeded"));
    });

    it("should fail closed and reject token if usage record is missing from store", () => {
      const token = createDownloadToken(
        "fusion-readiness-guide",
        "missing@test.com",
        { maxUses: 3 }
      );

      const v = verifyDownloadToken(token);
      assert.equal(v.isValid, true);
      const jti = v.payload!.jti;

      // Simulate store loss/restart where jti record is missing
      resetRateLimitsForTesting();

      // Recording usage without valid registered store state MUST fail closed
      const allowed = recordTokenUsage(jti);
      assert.equal(allowed, false);

      const vAfter = verifyDownloadToken(token);
      assert.equal(vAfter.isValid, false);
      assert.ok(vAfter.error?.includes("not found or unverified"));
    });

    it("should maintain usage limits using shared storage adapter across multiple simulated server instances", async () => {
      // Shared store instance representing persistent Redis/KV storage
      const sharedStore = new MemoryTokenStore();

      // Instance A
      setDownloadTokenStore(sharedStore);
      const token = createDownloadToken(
        "fusion-readiness-guide",
        "shared@test.com",
        { maxUses: 2 }
      );
      const v = verifyDownloadToken(token);
      assert.equal(v.isValid, true);
      const jti = v.payload!.jti;

      // Instance A records usage 1
      assert.equal(await recordTokenUsage(jti), true);

      // Instance B starts (new server instance connected to the same shared store)
      setDownloadTokenStore(sharedStore);
      // Instance B records usage 2
      assert.equal(await recordTokenUsage(jti), true);

      // Instance B records usage 3 -> must exceed limit across instances
      assert.equal(await recordTokenUsage(jti), false);
    });

    it("should prevent concurrent race conditions on token usage with maxUses: 1", async () => {
      const token = createDownloadToken(
        "fusion-readiness-guide",
        "concurrency@test.com",
        { maxUses: 1 }
      );
      const v = verifyDownloadToken(token);
      assert.equal(v.isValid, true);
      const jti = v.payload!.jti;

      // Execute 5 concurrent requests simultaneously
      const results = await Promise.all([
        recordTokenUsage(jti),
        recordTokenUsage(jti),
        recordTokenUsage(jti),
        recordTokenUsage(jti),
        recordTokenUsage(jti),
      ]);

      const successCount = results.filter((allowed) => allowed === true).length;
      const rejectedCount = results.filter((allowed) => allowed === false).length;

      // Exactly 1 request must succeed, and all excess concurrent requests must be rejected
      assert.equal(successCount, 1, "Exactly one concurrent usage must succeed");
      assert.equal(rejectedCount, 4, "All excess concurrent requests must be rejected");
    });
  });


  describe("5. Abuse Prevention & Rate Limiting", () => {
    it("should block rapid repeated requests from the same identifier", async () => {
      const testKey = "ip:192.168.1.100";
      // Allow up to 3 requests in window
      assert.equal((await checkRateLimit(testKey, 3, 60_000)).allowed, true);
      assert.equal((await checkRateLimit(testKey, 3, 60_000)).allowed, true);
      assert.equal((await checkRateLimit(testKey, 3, 60_000)).allowed, true);

      // 4th request must be blocked
      const blocked = await checkRateLimit(testKey, 3, 60_000);
      assert.equal(blocked.allowed, false);
      assert.ok((blocked.retryAfterSeconds ?? 0) > 0);
    });

    it("should extract verified client IP from trusted edge proxy headers", () => {
      const vercelReq = new Request("https://dluxtech.com/api/downloads", {
        headers: {
          "x-vercel-ip": "198.51.100.42",
          "x-forwarded-for": "10.0.0.1, 10.0.0.2",
        },
      });
      assert.equal(getTrustedClientIp(vercelReq), "198.51.100.42");

      const cfReq = new Request("https://dluxtech.com/api/downloads", {
        headers: {
          "cf-connecting-ip": "203.0.113.19",
          "x-forwarded-for": "1.2.3.4",
        },
      });
      assert.equal(getTrustedClientIp(cfReq), "203.0.113.19");
    });

    it("should sanitize and validate x-forwarded-for and reject header injection", () => {
      // Valid IPv4
      const validReq = new Request("https://dluxtech.com/api/downloads", {
        headers: { "x-forwarded-for": "192.0.2.1" },
      });
      assert.equal(getTrustedClientIp(validReq), "192.0.2.1");

      // Injection attempt with script / sql / malicious tokens
      const maliciousReq = new Request("https://dluxtech.com/api/downloads", {
        headers: { "x-forwarded-for": "invalid-ip; <script>alert(1)</script>" },
      });
      assert.equal(getTrustedClientIp(maliciousReq), "unknown-client");

      // Invalid octets out-of-range IP (e.g. 999.999.999.999)
      const outOfRangeReq = new Request("https://dluxtech.com/api/downloads", {
        headers: { "x-forwarded-for": "999.999.999.999" },
      });
      assert.equal(getTrustedClientIp(outOfRangeReq), "unknown-client");

      // Multiple IPs - right-most reverse proxy hop extracted
      const multiReq = new Request("https://dluxtech.com/api/downloads", {
        headers: { "x-forwarded-for": "203.0.113.50, 10.0.0.1" },
      });
      assert.equal(getTrustedClientIp(multiReq), "10.0.0.1");
    });

    it("should reject x-forwarded-for when proxy trust is disabled (trustProxy: false)", () => {
      const untrustedReq = new Request("https://dluxtech.com/api/downloads", {
        headers: { "x-forwarded-for": "192.0.2.1" },
      });
      assert.equal(getTrustedClientIp(untrustedReq, { trustProxy: false }), "untrusted-client");
    });

    it("should reject x-forwarded-for in production if TRUST_PROXY is not configured", () => {
      const originalEnv = process.env.NODE_ENV;
      try {
        Object.assign(process.env, { NODE_ENV: "production" });
        delete process.env.TRUST_PROXY;
        const req = new Request("https://dluxtech.com/api/downloads", {
          headers: { "x-forwarded-for": "192.0.2.1" },
        });
        assert.equal(getTrustedClientIp(req), "untrusted-client");

        // When TRUST_PROXY is set to true in production, it is accepted
        process.env.TRUST_PROXY = "true";
        assert.equal(getTrustedClientIp(req), "192.0.2.1");
      } finally {
        Object.assign(process.env, { NODE_ENV: originalEnv });
        delete process.env.TRUST_PROXY;
      }
    });

    it("should block direct origin requests when reverse proxy secret is configured and missing", () => {
      const directReq = new Request("https://dluxtech.com/api/downloads", {
        headers: { "x-forwarded-for": "192.0.2.1" },
      });
      assert.equal(
        getTrustedClientIp(directReq, { proxySecret: "expected-secret-key-123" }),
        "untrusted-proxy-bypass"
      );

      const validProxyReq = new Request("https://dluxtech.com/api/downloads", {
        headers: {
          "x-proxy-secret": "expected-secret-key-123",
          "x-real-ip": "198.51.100.22",
        },
      });
      assert.equal(
        getTrustedClientIp(validProxyReq, {
          proxySecret: "expected-secret-key-123",
          trustProxy: true,
        }),
        "198.51.100.22"
      );
    });

    it("should return 429 Too Many Requests when IP rate limit is exceeded in route", async () => {
      setCrmSubmitHandlerForTesting(async () => ({
        success: true,
        status: 200,
      }));

      // Exhaust IP limit
      for (let i = 0; i < 20; i++) {
        await checkRateLimit("ip:10.0.0.1", 20, 60_000);
      }

      const req = new Request("https://dluxtech.com/api/downloads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": "10.0.0.1",
        },
        body: JSON.stringify({
          name: "Rate Limit Tester",
          email: "ratelimit@example.com",
          phone: "555-000-1111",
          assetId: "fusion-readiness-guide",
        }),
      });

      const res = await POST(req);
      assert.equal(res.status, 429);
      const data = await res.json();
      assert.ok(data.error.includes("Too many requests"));
    });
  });

  describe("6. Gated Asset Allowlisting & SSRF Protection", () => {
    it("should correctly resolve static pre-registered assets", async () => {
      const asset = await resolveGatedAsset({
        assetId: "fusion-readiness-guide",
      });
      assert.notEqual(asset, null);
      assert.equal(asset?.fileName, "fusion-readiness-guide.pdf");
      assert.equal(asset?.url, "https://dluxeqiq.com/assets/HealthCheck.pdf");
    });

    it("should resolve use case assets from title value mapping", async () => {
      const asset = await resolveGatedAsset({
        useCase: "AI Powered Personalised Landing Pages",
      });
      assert.notEqual(asset, null);
      assert.equal(asset?.id, "use-case-1");
      assert.equal(asset?.fileName, "Use_Case_1.pdf");
    });

    it("should reject malicious SSRF and non-allowlisted PDF URLs", async () => {
      const maliciousUrls = [
        "https://attacker.com/malware.pdf",
        "https://evil-dluxtech.com/doc.pdf",
        "https://dluxtech.com.attacker.com/doc.pdf",
        "http://dluxtech.com/HealthCheck.pdf", // Plain HTTP
        "https://dluxtech.com/../../etc/passwd.pdf", // Traversal
        "https://dluxtech.com/assets/script.exe", // Executable extension
      ];

      for (const url of maliciousUrls) {
        const safeUrl = getSafePdfUrl(url);
        assert.equal(safeUrl, null, `Expected safeUrl to be null for: ${url}`);

        const asset = await resolveGatedAsset({ pdfUrl: url });
        assert.equal(asset, null, `Expected asset to be null for: ${url}`);
      }
    });

    it("should return 404 for unknown or non-allowlisted assets in POST /api/downloads", async () => {
      const req = new Request("https://dluxtech.com/api/downloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Tester",
          email: "test@example.com",
          phone: "1234567890",
          assetId: "unregistered-secret-file",
        }),
      });

      const res = await POST(req);
      assert.equal(res.status, 404);
      const data = await res.json();
      assert.ok(data.error.includes("Requested asset not found"));
    });

    it("should return 502 error instead of HTTP 307 redirect when upstream asset fetch fails", async () => {
      const originalFetch = globalThis.fetch;
      try {
        // Mock upstream fetch failure (e.g. CDN 404 or connection error)
        globalThis.fetch = async () => new Response("Not Found", { status: 404 });

        const token = createDownloadToken(
          "fusion-readiness-guide",
          "proxytest@example.com"
        );

        const req = new Request(
          `https://dluxtech.com/api/downloads?token=${encodeURIComponent(token)}`,
          { method: "GET" }
        );

        const res = await GET(req);
        // Must NOT redirect (status 307 or 302)
        assert.notEqual(res.status, 307);
        assert.notEqual(res.status, 302);
        assert.equal(res.status, 502);

        // Header Location must NOT be present
        assert.equal(res.headers.get("Location"), null);

        const data = await res.json();
        assert.ok(data.error?.includes("unavailable"));
      } finally {
        globalThis.fetch = originalFetch;
      }
    });

    it("should resolve and deliver directly from private storage when local private file exists", async () => {
      const testPrivateDir = PRIVATE_ASSETS_DIR;
      if (!fs.existsSync(testPrivateDir)) {
        fs.mkdirSync(testPrivateDir, { recursive: true });
      }

      const testFilePath = path.join(testPrivateDir, "HealthCheck.pdf");
      const testContent = Buffer.from("%PDF-1.4 Private Test Gated PDF Content");
      fs.writeFileSync(testFilePath, testContent);

      try {
        const asset = await resolveGatedAsset({
          assetId: "fusion-readiness-guide",
        });

        assert.notEqual(asset, null);
        assert.equal(asset?.source, "private");
        assert.equal(asset?.storageType, "private-storage");
        assert.equal(asset?.localPath, testFilePath);

        const securityAudit = verifyAssetStorageSecurity(asset!);
        assert.equal(securityAudit.isPrivate, true);
        assert.equal(securityAudit.deliveryMode, "private-storage");

        // Verify GET /api/downloads delivers from disk without network fetch
        const token = createDownloadToken(
          "fusion-readiness-guide",
          "privatetest@example.com"
        );
        const req = new Request(
          `https://dluxtech.com/api/downloads?token=${encodeURIComponent(token)}`,
          { method: "GET" }
        );
        const res = await GET(req);
        assert.equal(res.status, 200);
        assert.equal(res.headers.get("Content-Type"), "application/pdf");
        const buf = Buffer.from(await res.arrayBuffer());
        assert.ok(buf.includes("Private Test Gated PDF Content"));
      } finally {
        if (fs.existsSync(testFilePath)) {
          fs.unlinkSync(testFilePath);
        }
      }
    });
  });
});


