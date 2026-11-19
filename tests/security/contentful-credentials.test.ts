import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import {
  getContentfulConfig,
  fetchContentfulGraphQL,
} from "../../src/lib/contentful/server-client";
import { fetchBlogResourcesData } from "../../src/lib/contentful/blog-resources";
import { fetchAdobeCommercePageData } from "../../src/lib/contentful/adobe-commerce";
import { fetchCareersGallery } from "../../src/lib/contentful/careers-gallery";
import { fetchClients } from "../../src/lib/contentful/ClientsLogo";
import { fetchOurTeamData } from "../../src/lib/contentful/our-team";

// One-way SHA-256 hash digest of historical revoked token.
// Storing only the cryptographic hash prevents keeping plain secret credentials in source files.
const HISTORICAL_REVOKED_TOKEN_HASH =
  "1f257757c8bb30d647bc1e066061514724870b9704dc539f834618b10c5437a6";

const CLIENT_COMPONENT_PATHS = [
  "src/components/sections/resources/blogs/BlogsList.tsx",
  "src/components/sections/resources/blogs/Hero.tsx",
  "src/components/sections/resources/blogs/LeftRightCards.tsx",
  "src/components/sections/platform/adobe/adobe-commerce/AdobeServiceCards.tsx",
  "src/components/sections/platform/adobe/adobe-commerce/Banner.tsx",
  "src/components/sections/platform/adobe/adobe-commerce/CaseStudySection.tsx",
  "src/components/sections/platform/adobe/adobe-commerce/CoeVideos.tsx",
  "src/components/sections/platform/adobe/adobe-commerce/FeatureSection.tsx",
  "src/components/sections/platform/adobe/adobe-commerce/ImageLeftSection.tsx",
  "src/components/sections/platform/adobe/adobe-commerce/Testimonials.tsx",
  "src/components/sections/About/careers/GallerySection.tsx",
  "src/app/case-study/[slug]/page.tsx",
];

describe("S02 Security - Browser-Exposed Contentful Credentials Verification", () => {
  describe("Client Component Bundle Auditing", () => {
    for (const relativePath of CLIENT_COMPONENT_PATHS) {
      it(`verifies ${relativePath} contains NO hardcoded Contentful credentials`, () => {
        const fullPath = path.resolve(process.cwd(), relativePath);
        assert.ok(fs.existsSync(fullPath), `File must exist: ${relativePath}`);

        const fileContent = fs.readFileSync(fullPath, "utf-8");

        // Verify no token in file matches the historical revoked credential hash
        const potentialTokens =
          fileContent.match(/[A-Za-z0-9_-]{32,64}/g) || [];
        for (const token of potentialTokens) {
          const hash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");
          assert.notStrictEqual(
            hash,
            HISTORICAL_REVOKED_TOKEN_HASH,
            `Security violation: ${relativePath} contains historical revoked Contentful credential!`
          );
        }

        // Verify no CFPAT or Contentful environment tokens are exposed
        assert.strictEqual(
          /CFPAT-[a-zA-Z0-9_-]{40,}/.test(fileContent),
          false,
          `Security violation: ${relativePath} contains Contentful Personal Access Token!`
        );

        assert.strictEqual(
          fileContent.includes("graphql.contentful.com"),
          false,
          `Security violation: ${relativePath} still initiates direct browser Contentful calls!`
        );
      });
    }
  });

  describe("Server-Client Environment Configuration & Error Resilience", () => {
    const originalEnv = { ...process.env };
    const originalFetch = globalThis.fetch;

    afterEach(() => {
      process.env = { ...originalEnv };
      globalThis.fetch = originalFetch;
    });

    it("handles missing environment variables gracefully without crashing", async () => {
      delete process.env.CONTENTFUL_SPACE_ID;
      delete process.env.CONTENTFUL_ACCESS_TOKEN;

      const config = getContentfulConfig();
      assert.strictEqual(config.isConfigured, false);
      assert.strictEqual(config.endpoint, "");

      const result = await fetchContentfulGraphQL(`{ test }`);
      assert.strictEqual(result, null);
    });

    it("recognizes placeholder access tokens as unconfigured", async () => {
      process.env.CONTENTFUL_SPACE_ID = "pj0maraabon4";
      process.env.CONTENTFUL_ACCESS_TOKEN = "rotated_contentful_access_token_placeholder";

      const config = getContentfulConfig();
      assert.strictEqual(config.isConfigured, false);
      assert.strictEqual(config.endpoint, "");

      const result = await fetchContentfulGraphQL(`{ test }`);
      assert.strictEqual(result, null);
    });

    it("handles upstream HTTP 500 error gracefully without crashing", async () => {
      process.env.CONTENTFUL_SPACE_ID = "test-space";
      process.env.CONTENTFUL_ACCESS_TOKEN = "test-token";

      globalThis.fetch = async () =>
        new Response("Internal Server Error", { status: 500 });

      const result = await fetchContentfulGraphQL(`{ test }`);
      assert.strictEqual(result, null);
    });

    it("returns empty team data when Contentful rejects the request", async () => {
      process.env.CONTENTFUL_SPACE_ID = "test-space";
      process.env.CONTENTFUL_ACCESS_TOKEN = "test-token";

      globalThis.fetch = async () =>
        new Response("Unauthorized", { status: 401 });

      const result = await fetchOurTeamData();
      assert.deepStrictEqual(result, {
        primaryBanner: null,
        secondaryBanner: null,
        heroBanner: null,
        lifeAtDlux: null,
      });
    });

    it("handles upstream network connection failure gracefully", async () => {
      process.env.CONTENTFUL_SPACE_ID = "test-space";
      process.env.CONTENTFUL_ACCESS_TOKEN = "test-token";

      globalThis.fetch = async () => {
        throw new Error("ENOTFOUND: graphql.contentful.com");
      };

      const result = await fetchContentfulGraphQL(`{ test }`);
      assert.strictEqual(result, null);
    });

    it("handles GraphQL query syntax or schema errors gracefully", async () => {
      process.env.CONTENTFUL_SPACE_ID = "test-space";
      process.env.CONTENTFUL_ACCESS_TOKEN = "test-token";

      globalThis.fetch = async () =>
        new Response(
          JSON.stringify({
            errors: [{ message: "Unknown field 'invalidField'" }],
            data: null,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );

      const result = await fetchContentfulGraphQL(`{ invalidField }`);
      assert.strictEqual(result, null);
    });
  });

  describe("Server Loaders Execution & Data Normalization", () => {
    const originalFetch = globalThis.fetch;
    const originalEnv = { ...process.env };

    afterEach(() => {
      globalThis.fetch = originalFetch;
      process.env = { ...originalEnv };
    });

    it("fetchBlogResourcesData returns properly mapped resources", async () => {
      process.env.CONTENTFUL_SPACE_ID = "test-space";
      process.env.CONTENTFUL_ACCESS_TOKEN = "test-token";

      globalThis.fetch = async () =>
        new Response(
          JSON.stringify({
            data: {
              blogPageCollection: {
                items: [
                  {
                    heroBannerCollection: {
                      items: [{ url: "https://images.ctfassets.net/banner1.jpg" }],
                    },
                    dluxBlogCollection: {
                      items: [
                        {
                          title: "Martech Insights",
                          description: "Deep dive",
                          url: "https://images.ctfassets.net/card1.jpg",
                        },
                      ],
                    },
                  },
                ],
              },
              coEVideosCollection: {
                items: [
                  {
                    title: "AI Video",
                    description: "Overview",
                    videoSrc: { url: "https://videos.ctfassets.net/vid1.mp4" },
                    videoBanner: { url: "https://images.ctfassets.net/thumb1.jpg" },
                    trending: true,
                  },
                ],
              },
            },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );

      const data = await fetchBlogResourcesData();
      assert.deepStrictEqual(data.heroBanners, [
        "https://images.ctfassets.net/banner1.jpg",
      ]);
      assert.strictEqual(data.leftRightCards.length, 1);
      assert.strictEqual(data.leftRightCards[0].title, "Martech Insights");
      assert.strictEqual(data.videos.length, 1);
      assert.strictEqual(data.videos[0].title, "AI Video");
      assert.strictEqual(data.videos[0].trending, true);
    });

    it("fetchAdobeCommercePageData returns properly mapped sections", async () => {
      process.env.CONTENTFUL_SPACE_ID = "test-space";
      process.env.CONTENTFUL_ACCESS_TOKEN = "test-token";

      globalThis.fetch = async () =>
        new Response(
          JSON.stringify({
            data: {
              commerceVideosCollection: {
                items: [
                  {
                    sys: { id: "vid-1" },
                    title: "Commerce Tour",
                    description: "Product tour",
                    video: "https://video.mp4",
                    image: { url: "https://poster.jpg" },
                  },
                ],
              },
              platformAdobeCommerces: {
                imageLeftContent: {
                  title: "Headless Commerce",
                  description: "Scale your store",
                  url: "https://img.jpg",
                },
                adobeCommerceFeatutreCollection: {
                  items: [{ title: "B2B Suite", description: "Features", url: "https://b2b.jpg" }],
                },
                adobeServiceCollection: {
                  items: [{ title: "Migration", description: "Services", url: "https://mig.jpg" }],
                },
                dluxClientsSayCollection: {
                  items: [{ title: "Testimonial 1", description: "Great work", url: "https://t.jpg" }],
                },
              },
              caseStudyCollection: {
                items: [
                  {
                    title: "Retail Giant",
                    slug: "retail-giant",
                    client: "Retailer",
                    shortDescription: "Transformation",
                    banner: { url: "https://banner.jpg" },
                  },
                ],
              },
            },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );

      const data = await fetchAdobeCommercePageData();
      assert.strictEqual(data.slides.length, 1);
      assert.strictEqual(data.slides[0].title, "Commerce Tour");
      assert.strictEqual(data.videos.length, 1);
      assert.strictEqual(data.imageLeft?.title, "Headless Commerce");
      assert.strictEqual(data.features.length, 1);
      assert.strictEqual(data.services.length, 1);
      assert.strictEqual(data.testimonials.length, 1);
      assert.strictEqual(data.caseStudies.length, 1);
      assert.strictEqual(data.caseStudies[0].slug, "retail-giant");
    });

    it("fetchCareersGallery returns flat list of image URLs", async () => {
      process.env.CONTENTFUL_SPACE_ID = "test-space";
      process.env.CONTENTFUL_ACCESS_TOKEN = "test-token";

      globalThis.fetch = async () =>
        new Response(
          JSON.stringify({
            data: {
              gallaryCollection: {
                items: [
                  {
                    imagesCollection: {
                      items: [
                        { url: "https://gallery1.jpg" },
                        { url: "https://gallery2.jpg" },
                      ],
                    },
                  },
                ],
              },
            },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );

      const urls = await fetchCareersGallery();
      assert.deepStrictEqual(urls, ["https://gallery1.jpg", "https://gallery2.jpg"]);
    });

    it("fetchClients returns properly mapped clients data", async () => {
      process.env.CONTENTFUL_SPACE_ID = "test-space";
      process.env.CONTENTFUL_ACCESS_TOKEN = "test-token";

      globalThis.fetch = async () =>
        new Response(
          JSON.stringify({
            data: {
              ourClients: {
                dluxHeading: "Trusted by Leaders",
                dluxPara: "Leading enterprises rely on DLUX",
                dluxImageCollection: {
                  items: [{ url: "https://images.ctfassets.net/client1.png" }],
                },
              },
            },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );

      const clients = await fetchClients();
      assert.strictEqual(clients?.dluxHeading, "Trusted by Leaders");
      assert.strictEqual(clients?.dluxImageCollection.items.length, 1);
      assert.strictEqual(
        clients?.dluxImageCollection.items[0].url,
        "https://images.ctfassets.net/client1.png"
      );
    });
  });
});
