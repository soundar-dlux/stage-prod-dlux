import "server-only";
import { sanitizeBlogHtml } from "@/src/lib/security/sanitize-blog-html";

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  categories: string[];
  publishDate: string;
  createdAt: string;
}

interface RawCmsBlogItem {
  _id?: string;
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  categories?: string[];
  publishDate?: string;
  createdAt?: string;
}

interface CmsApiResponse {
  success: boolean;
  blogs?: RawCmsBlogItem[];
  message?: string;
}

const CMS_BASE_URL =
  process.env.CMS_BASE_URL?.replace(/\/$/, "") || "https://admin.dluxtech.com";
const FETCH_TIMEOUT_MS = 8000;

/**
 * Normalizes image URLs to full external URLs or placeholder.
 */
export function getBlogImageUrl(url?: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${CMS_BASE_URL}${cleanPath}`;
}

/**
 * Normalizes CMS blog slugs by removing historical prefix artifacts.
 */
export function normalizeBlogSlug(rawSlug?: string): string {
  if (!rawSlug || typeof rawSlug !== "string") return "";
  return rawSlug.replace(/^httpswwwdluxtechcomblog/, "").trim();
}

/**
 * Server-only loader that fetches all blogs from the CMS.
 * Handles timeouts, network failures, and invalid response schemas gracefully.
 */
export async function getAllBlogs(): Promise<BlogPost[]> {
  try {
    const endpoint = `${CMS_BASE_URL}/api/blogs?all=true`;
    const res = await fetch(endpoint, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.error(
        `[CMS Loader] Failed to fetch blogs: HTTP ${res.status} ${res.statusText}`
      );
      return [];
    }

    const data: CmsApiResponse = await res.json();
    if (!data.success || !Array.isArray(data.blogs)) {
      console.warn("[CMS Loader] Unsuccessful response or missing blogs array");
      return [];
    }

    return data.blogs.map((item: RawCmsBlogItem) => ({
      _id: String(item._id || item.id || ""),
      title: String(item.title || ""),
      slug: normalizeBlogSlug(item.slug),
      excerpt: String(item.excerpt || ""),
      content: sanitizeBlogHtml(String(item.content || "")),
      featuredImage: String(item.featuredImage || ""),
      categories: Array.isArray(item.categories)
        ? item.categories.map((c: string) => String(c))
        : [],
      publishDate: String(item.publishDate || item.createdAt || ""),
      createdAt: String(item.createdAt || ""),
    }));
  } catch (err) {
    console.error("[CMS Loader] Network or parsing error fetching blogs:", err);
    return [];
  }
}

/**
 * Retrieves a single blog post by its URL slug.
 * Returns null if the post does not exist or if the CMS is unreachable.
 *
 * All returned post content is verified and sanitized with the security allowlist.
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  if (!slug || typeof slug !== "string") {
    return null;
  }

  const normalizedTargetSlug = decodeURIComponent(slug).trim().toLowerCase();
  const allBlogs = await getAllBlogs();

  const found = allBlogs.find(
    (b) => b.slug.trim().toLowerCase() === normalizedTargetSlug
  );

  return found || null;
}

/**
 * Retrieves suggested articles excluding the current post slug.
 */
export async function getSuggestedBlogs(
  currentSlug: string,
  limit = 3
): Promise<BlogPost[]> {
  const allBlogs = await getAllBlogs();
  const normalizedCurrentSlug = decodeURIComponent(currentSlug || "")
    .trim()
    .toLowerCase();

  return allBlogs
    .filter((b) => b.slug.trim().toLowerCase() !== normalizedCurrentSlug)
    .slice(0, limit);
}

/**
 * Retrieves latest sidebar posts excluding the current post slug.
 */
export async function getSidebarBlogs(
  currentSlug: string,
  limit = 5
): Promise<BlogPost[]> {
  const allBlogs = await getAllBlogs();
  const normalizedCurrentSlug = decodeURIComponent(currentSlug || "")
    .trim()
    .toLowerCase();

  return allBlogs
    .filter((b) => b.slug.trim().toLowerCase() !== normalizedCurrentSlug)
    .slice(0, limit);
}
