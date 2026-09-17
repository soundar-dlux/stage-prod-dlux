import type { MetadataRoute } from "next";

/**
 * Dynamic sitemap for https://www.dluxtech.com  (served at /sitemap.xml)
 *
 * Uses Next.js's official metadata convention so it is reliably built and
 * served at /sitemap.xml on every deployment target. Combines all static
 * App Router pages with the dynamic Contentful collections (blogs + case
 * studies).
 */

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.dluxtech.com"
).replace(/\/$/, "");

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

// Re-generate at most once an hour so new blogs / case studies appear without
// needing a full rebuild.
export const revalidate = 3600;

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

type StaticRoute = {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
};

/**
 * A few service routes contain a literal "&" in their folder name
 * (e.g. /services/content-management-&-dam). Those pages only resolve with the
 * literal "&" — the percent-encoded "%26" form 404s — so the "&" must survive
 * into the URL. Next.js writes <loc> values verbatim (it does not XML-escape
 * them), so we pre-escape "&" to the XML entity "&amp;" here to keep the
 * generated sitemap valid XML. Crawlers decode "&amp;" back to "&".
 */
function toLoc(path: string): string {
  const url = `${BASE_URL}${path === "/" ? "" : path}`;
  return url.replace(/&/g, "&amp;");
}

/** Every crawlable static page in src/app (excludes the dynamic [slug] routes). */
const staticRoutes: StaticRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },

  // Company
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about/why-dlux", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about/our-growth-story", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about/our-team", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about/partners", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about/careers", changeFrequency: "weekly", priority: 0.7 },

  // Services
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/adobe-managed-services", changeFrequency: "monthly", priority: 0.7 },
  { path: "/services/content-management-&-dam", changeFrequency: "monthly", priority: 0.7 },
  { path: "/services/digital-&-martech-consulting", changeFrequency: "monthly", priority: 0.7 },
  { path: "/services/innovation-agentic-ai", changeFrequency: "monthly", priority: 0.7 },
  { path: "/services/managed-application-services", changeFrequency: "monthly", priority: 0.7 },
  { path: "/services/training-&-change-management", changeFrequency: "monthly", priority: 0.7 },

  // Platforms
  { path: "/platform", changeFrequency: "monthly", priority: 0.9 },
  { path: "/platform/adobe", changeFrequency: "monthly", priority: 0.7 },
  { path: "/platform/adobe/adobe-aem", changeFrequency: "monthly", priority: 0.6 },
  { path: "/platform/adobe/adobe-analytics", changeFrequency: "monthly", priority: 0.6 },
  { path: "/platform/adobe/adobe-commerce", changeFrequency: "monthly", priority: 0.6 },
  { path: "/platform/adobe/workfront", changeFrequency: "monthly", priority: 0.6 },
  { path: "/platform/adobe/workfront-fusion", changeFrequency: "monthly", priority: 0.6 },
  { path: "/platform/aprimo", changeFrequency: "monthly", priority: 0.6 },
  { path: "/platform/bynder", changeFrequency: "monthly", priority: 0.6 },
  { path: "/platform/dataiku", changeFrequency: "monthly", priority: 0.6 },
  { path: "/platform/salesforce", changeFrequency: "monthly", priority: 0.7 },
  { path: "/platform/salesforce/commerce-cloud", changeFrequency: "monthly", priority: 0.6 },

  // Industries
  { path: "/industries", changeFrequency: "monthly", priority: 0.8 },
  { path: "/industries/retail", changeFrequency: "monthly", priority: 0.6 },

  // Resources
  { path: "/resources", changeFrequency: "weekly", priority: 0.8 },
  { path: "/resources/blogs", changeFrequency: "weekly", priority: 0.8 },
  { path: "/resources/success-stories", changeFrequency: "monthly", priority: 0.7 },
  { path: "/resources/our-webinars", changeFrequency: "monthly", priority: 0.7 },
  { path: "/resources/video-library", changeFrequency: "monthly", priority: 0.7 },

  // Other
  { path: "/marketing-woes", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact-us", changeFrequency: "monthly", priority: 0.8 },

  // Legal
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.3 },
];

const CONTENTFUL_ENDPOINT = CONTENTFUL_SPACE_ID
  ? `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}/environments/production`
  : null;

/** Minimal Contentful GraphQL helper. Returns null on any failure so the
 *  sitemap still builds (with static routes) even if Contentful is down. */
async function fetchContentful<T>(query: string): Promise<T | null> {
  if (!CONTENTFUL_ENDPOINT || !CONTENTFUL_ACCESS_TOKEN) return null;

  try {
    const res = await fetch(CONTENTFUL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
      next: { revalidate },
    });

    if (!res.ok) return null;

    const { data, errors } = await res.json();
    if (errors) {
      console.error("[sitemap] Contentful returned errors:", errors);
      return null;
    }

    return data as T;
  } catch (err) {
    console.error("[sitemap] Contentful fetch failed:", err);
    return null;
  }
}

/** /blog/[detailUrlName] entries. */
async function getBlogEntries(): Promise<MetadataRoute.Sitemap> {
  const data = await fetchContentful<{
    resourcesBlogsCollection: {
      items: {
        detailUrlName: string | null;
        detailPublishDate: string | null;
        sys: { publishedAt: string | null };
      }[];
    };
  }>(`{
    resourcesBlogsCollection(limit: 1000) {
      items {
        detailUrlName
        detailPublishDate
        sys { publishedAt }
      }
    }
  }`);

  const items = data?.resourcesBlogsCollection?.items ?? [];

  return items
    .filter((item) => item.detailUrlName)
    .map((item) => ({
      url: toLoc(`/blog/${item.detailUrlName}`),
      lastModified: new Date(
        item.sys?.publishedAt || item.detailPublishDate || Date.now()
      ),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
}

/** /resources/success-stories/[slug] entries (the canonical case-study route). */
async function getCaseStudyEntries(): Promise<MetadataRoute.Sitemap> {
  const data = await fetchContentful<{
    caseStudyCollection: {
      items: {
        slug: string | null;
        sys: { publishedAt: string | null };
      }[];
    };
  }>(`{
    caseStudyCollection(limit: 1000) {
      items {
        slug
        sys { publishedAt }
      }
    }
  }`);

  const items = data?.caseStudyCollection?.items ?? [];

  return items
    .filter((item) => item.slug)
    .map((item) => ({
      url: toLoc(`/resources/success-stories/${item.slug}`),
      lastModified: new Date(item.sys?.publishedAt || Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: toLoc(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const [blogEntries, caseStudyEntries] = await Promise.all([
    getBlogEntries(),
    getCaseStudyEntries(),
  ]);

  return [...staticEntries, ...blogEntries, ...caseStudyEntries];
}
