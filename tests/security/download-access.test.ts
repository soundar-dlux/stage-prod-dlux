import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  createDownloadToken,
  verifyDownloadToken,
  validateLeadPayload,
  resolveGatedAsset,
  checkRateLimit,
  resetRateLimitsForTesting,
  setCrmSubmitHandlerForTesting,
  STATIC_GATED_ASSETS,
} from "../../src/lib/downloads/server";
import { POST, GET } from "../../src/app/api/downloads/route";
import { getSafePdfUrl } from "../../src/lib/security/content-urls";

describe("S05 - Client-side-only Download & Access Gating Remediation", () => {
  beforeEach(() => {
    resetRateLimitsForTesting();
    setCrmSubmitHandlerForTesting(null);
  });

  describe("1. Direct Unauthorized Access Protection", () => {
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

    it("should reject GET requests with tampered token signature (401)", async () => {
      const validToken = createDownloadToken(
        "fusion-readiness-guide",
        "user@example.com"
      );
      const parts = validToken.split(".");
      // Tamper signature part
      const tamperedToken = `${parts[0]}.forgedSignature123456789`;

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

      const req = new Request(
        `https://dluxtech.com/api/downloads?token=${encodeURIComponent(expiredToken)}`,
        { method: "GET" }
      );
      const res = await GET(req);
      assert.equal(res.status, 401);
      const data = await res.json();
      assert.ok(data.error.includes("expired"));
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
      const { recordTokenUsage } = require("../../src/lib/downloads/server");
      assert.equal(recordTokenUsage(v1.payload!.jti), true); // usage 1
      assert.equal(recordTokenUsage(v1.payload!.jti), true); // usage 2

      // 3rd usage should exceed limit
      const allowed = recordTokenUsage(v1.payload!.jti);
      assert.equal(allowed, false);

      const vExceeded = verifyDownloadToken(token);
      assert.equal(vExceeded.isValid, false);
      assert.ok(vExceeded.error?.includes("usage limit exceeded"));
    });
  });

  describe("5. Abuse Prevention & Rate Limiting", () => {
    it("should block rapid repeated requests from the same identifier", () => {
      const testKey = "ip:192.168.1.100";
      // Allow up to 3 requests in window
      assert.equal(checkRateLimit(testKey, 3, 60_000).allowed, true);
      assert.equal(checkRateLimit(testKey, 3, 60_000).allowed, true);
      assert.equal(checkRateLimit(testKey, 3, 60_000).allowed, true);

      // 4th request must be blocked
      const blocked = checkRateLimit(testKey, 3, 60_000);
      assert.equal(blocked.allowed, false);
      assert.ok((blocked.retryAfterSeconds ?? 0) > 0);
    });

    it("should return 429 Too Many Requests when IP rate limit is exceeded in route", async () => {
      setCrmSubmitHandlerForTesting(async () => ({
        success: true,
        status: 200,
      }));

      // Exhaust IP limit
      for (let i = 0; i < 20; i++) {
        checkRateLimit("ip:10.0.0.1", 20, 60_000);
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
  });
});
