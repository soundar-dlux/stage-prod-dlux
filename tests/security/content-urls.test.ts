import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  parseYouTubeVideo,
  parseLinkedInVideo,
  getVideoEmbedDetails,
  getSafeVideoEmbedUrl,
  getSafeVideoWatchUrl,
  getSafeDirectVideoUrl,
  resolveSafeMedia,
  getSafePdfUrl,
  isSafeVideoUrl,
  isSafePdfUrl,
} from "../../src/lib/security/content-urls";

describe("S04 - Content URLs Security Allowlisting", () => {
  describe("YouTube Video Validation", () => {
    it("should accept legitimate YouTube watch URL and canonicalize", () => {
      const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      const result = parseYouTubeVideo(url);
      assert.notEqual(result, null);
      assert.equal(result?.type, "youtube");
      assert.equal(result?.id, "dQw4w9WgXcQ");
      assert.equal(result?.embedUrl, "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1");
      assert.equal(result?.watchUrl, "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    });

    it("should accept legitimate youtu.be short URL and canonicalize", () => {
      const url = "https://youtu.be/M1FncAIVAB0?si=random_tracking_token";
      const result = parseYouTubeVideo(url);
      assert.notEqual(result, null);
      assert.equal(result?.id, "M1FncAIVAB0");
      assert.equal(result?.embedUrl, "https://www.youtube.com/embed/M1FncAIVAB0?autoplay=1");
      assert.equal(result?.watchUrl, "https://www.youtube.com/watch?v=M1FncAIVAB0");
    });

    it("should accept legitimate YouTube embed URL", () => {
      const url = "https://www.youtube.com/embed/A_W3cORSBDc";
      const result = parseYouTubeVideo(url, false);
      assert.notEqual(result, null);
      assert.equal(result?.id, "A_W3cORSBDc");
      assert.equal(result?.embedUrl, "https://www.youtube.com/embed/A_W3cORSBDc");
    });

    it("should accept YouTube Shorts URL", () => {
      const url = "https://youtube.com/shorts/dQw4w9WgXcQ";
      const result = parseYouTubeVideo(url);
      assert.notEqual(result, null);
      assert.equal(result?.id, "dQw4w9WgXcQ");
    });

    it("should accept youtube-nocookie.com embed URL", () => {
      const url = "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ";
      const result = parseYouTubeVideo(url);
      assert.notEqual(result, null);
      assert.equal(result?.id, "dQw4w9WgXcQ");
    });

    it("should reject lookalike domains", () => {
      assert.equal(parseYouTubeVideo("https://youtube.com.attacker.com/watch?v=dQw4w9WgXcQ"), null);
      assert.equal(parseYouTubeVideo("https://notyoutube.com/watch?v=dQw4w9WgXcQ"), null);
      assert.equal(parseYouTubeVideo("https://attacker-youtube.com/embed/dQw4w9WgXcQ"), null);
      assert.equal(parseYouTubeVideo("https://evil.youtu.be/dQw4w9WgXcQ"), null);
    });

    it("should reject userinfo (credentials in URL)", () => {
      assert.equal(parseYouTubeVideo("https://user:pass@www.youtube.com/watch?v=dQw4w9WgXcQ"), null);
      assert.equal(parseYouTubeVideo("https://attacker@youtu.be/dQw4w9WgXcQ"), null);
    });

    it("should reject plain HTTP and insecure schemes", () => {
      assert.equal(parseYouTubeVideo("http://www.youtube.com/watch?v=dQw4w9WgXcQ"), null);
      assert.equal(parseYouTubeVideo("javascript:alert(1)"), null);
      assert.equal(parseYouTubeVideo("data:text/html,<script>alert(1)</script>"), null);
    });

    it("should reject non-standard ports", () => {
      assert.equal(parseYouTubeVideo("https://www.youtube.com:8080/watch?v=dQw4w9WgXcQ"), null);
      assert.equal(parseYouTubeVideo("https://www.youtube.com:80/watch?v=dQw4w9WgXcQ"), null);
    });

    it("should reject malformed or attacking video IDs", () => {
      assert.equal(parseYouTubeVideo("https://www.youtube.com/watch?v=<script>"), null);
      assert.equal(parseYouTubeVideo("https://www.youtube.com/watch?v=../../evil"), null);
      assert.equal(parseYouTubeVideo("https://youtu.be/short"), null); // not 11 chars
      assert.equal(parseYouTubeVideo("https://www.youtube.com/embed/dQw4w9WgXcQextra"), null); // too long
    });

    it("should reject unsupported paths", () => {
      assert.equal(parseYouTubeVideo("https://www.youtube.com/account"), null);
      assert.equal(parseYouTubeVideo("https://www.youtube.com/settings"), null);
      assert.equal(parseYouTubeVideo("https://www.youtube.com/login"), null);
    });
  });

  describe("LinkedIn Video Validation", () => {
    const validUrn = "urn:li:activity:7123456789012345678";
    const validEmbed = `https://www.linkedin.com/embed/feed/update/${validUrn}`;
    const validFeed = `https://www.linkedin.com/feed/update/${validUrn}`;

    it("should accept legitimate LinkedIn embed URL and canonicalize", () => {
      const result = parseLinkedInVideo(validEmbed);
      assert.notEqual(result, null);
      assert.equal(result?.type, "linkedin");
      assert.equal(result?.id, validUrn);
      assert.equal(result?.embedUrl, `https://www.linkedin.com/embed/feed/update/${validUrn}`);
      assert.equal(result?.watchUrl, `https://www.linkedin.com/feed/update/${validUrn}`);
    });

    it("should accept legitimate LinkedIn feed post URL and canonicalize to embed and watch", () => {
      const result = parseLinkedInVideo(validFeed);
      assert.notEqual(result, null);
      assert.equal(result?.embedUrl, `https://www.linkedin.com/embed/feed/update/${validUrn}`);
      assert.equal(result?.watchUrl, `https://www.linkedin.com/feed/update/${validUrn}`);
    });

    it("should accept percent-encoded URNs", () => {
      const encodedUrl = "https://www.linkedin.com/embed/feed/update/urn%3Ali%3AugcPost%3A123456789";
      const result = parseLinkedInVideo(encodedUrl);
      assert.notEqual(result, null);
      assert.equal(result?.id, "urn:li:ugcPost:123456789");
    });

    it("should reject lookalike LinkedIn domains", () => {
      assert.equal(parseLinkedInVideo(`https://linkedin.com.evil.com/embed/feed/update/${validUrn}`), null);
      assert.equal(parseLinkedInVideo(`https://notlinkedin.com/feed/update/${validUrn}`), null);
    });

    it("should reject userinfo in LinkedIn URLs", () => {
      assert.equal(parseLinkedInVideo(`https://attacker@www.linkedin.com/embed/feed/update/${validUrn}`), null);
    });

    it("should reject malformed URNs or script injection", () => {
      assert.equal(parseLinkedInVideo("https://www.linkedin.com/embed/feed/update/invalid-urn"), null);
      assert.equal(parseLinkedInVideo("https://www.linkedin.com/embed/feed/update/urn:li:activity:123<script>"), null);
      assert.equal(parseLinkedInVideo("https://www.linkedin.com/embed/feed/update/urn:li:profile:123"), null);
    });

    it("should reject non-feed LinkedIn paths", () => {
      assert.equal(parseLinkedInVideo("https://www.linkedin.com/in/some-user"), null);
      assert.equal(parseLinkedInVideo("https://www.linkedin.com/company/dlux"), null);
    });
  });

  describe("Direct Video Media Validation", () => {
    it("should accept legitimate Contentful video URLs", () => {
      const url = "https://videos.ctfassets.net/pj0maraabon4/6QfiQGZgTOFWE31eoXKRqr/a569dfea202f1500285af3ca764027a8/ceo-videos-01.mp4";
      const result = getSafeDirectVideoUrl(url);
      assert.equal(result, url);
    });

    it("should reject direct video with executable or non-media extension", () => {
      assert.equal(getSafeDirectVideoUrl("https://videos.ctfassets.net/file.exe"), null);
      assert.equal(getSafeDirectVideoUrl("https://videos.ctfassets.net/script.js"), null);
      assert.equal(getSafeDirectVideoUrl("https://videos.ctfassets.net/page.html"), null);
    });

    it("should reject lookalike media domains", () => {
      assert.equal(getSafeDirectVideoUrl("https://videos.ctfassets.net.attacker.com/video.mp4"), null);
      assert.equal(getSafeDirectVideoUrl("https://evil-ctfassets.net/video.mp4"), null);
    });

    it("should reject directory traversal in direct video media", () => {
      assert.equal(getSafeDirectVideoUrl("https://videos.ctfassets.net/../../evil.mp4"), null);
    });
  });

  describe("Universal Media Resolver (resolveSafeMedia)", () => {
    it("should resolve YouTube embed correctly", () => {
      const res = resolveSafeMedia("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
      assert.notEqual(res, null);
      if (res && res.kind === "embed") {
        assert.equal(res.type, "youtube");
        assert.equal(res.embedUrl, "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1");
      } else {
        assert.fail("Expected embed kind");
      }
    });

    it("should resolve direct MP4 video correctly", () => {
      const res = resolveSafeMedia("https://videos.ctfassets.net/bucket/asset/test.mp4");
      assert.notEqual(res, null);
      if (res && res.kind === "direct") {
        assert.equal(res.mediaUrl, "https://videos.ctfassets.net/bucket/asset/test.mp4");
      } else {
        assert.fail("Expected direct kind");
      }
    });

    it("should return null for untrusted or malicious sources", () => {
      assert.equal(resolveSafeMedia("https://attacker.com/evil.mp4"), null);
      assert.equal(resolveSafeMedia("https://attacker.com/watch?v=12345678901"), null);
      assert.equal(resolveSafeMedia(null), null);
    });
  });

  describe("PDF Document Validation", () => {
    it("should accept legitimate Contentful PDF URL", () => {
      const url = "https://assets.ctfassets.net/pj0maraabon4/4DlkXknKeC31BQvLWdnO0K/7d393a25d88129bae325f72ec0956a80/AEP_Implementation_guide.pdf";
      const result = getSafePdfUrl(url);
      assert.equal(result, url);
      assert.equal(isSafePdfUrl(url), true);
    });

    it("should accept dlux domain PDF asset", () => {
      const url = "https://dluxeqiq.com/assets/HealthCheck.pdf";
      const result = getSafePdfUrl(url);
      assert.equal(result, url);
    });

    it("should reject non-PDF file extensions", () => {
      assert.equal(getSafePdfUrl("https://assets.ctfassets.net/doc.docx"), null);
      assert.equal(getSafePdfUrl("https://assets.ctfassets.net/payload.exe"), null);
      assert.equal(getSafePdfUrl("https://assets.ctfassets.net/exploit.html"), null);
      assert.equal(isSafePdfUrl("https://assets.ctfassets.net/exploit.html"), false);
    });

    it("should reject lookalike PDF hostnames", () => {
      assert.equal(getSafePdfUrl("https://assets.ctfassets.net.attacker.org/file.pdf"), null);
      assert.equal(getSafePdfUrl("https://evil-dluxtech.com/file.pdf"), null);
    });

    it("should reject userinfo and unexpected ports for PDF", () => {
      assert.equal(getSafePdfUrl("https://user:pass@assets.ctfassets.net/doc.pdf"), null);
      assert.equal(getSafePdfUrl("https://assets.ctfassets.net:8443/doc.pdf"), null);
    });

    it("should reject plain HTTP for PDF", () => {
      assert.equal(getSafePdfUrl("http://assets.ctfassets.net/doc.pdf"), null);
    });
  });
});
