/**
 * Security URL Allowlisting & Canonicalization Module
 *
 * S04 Remediation: Protects against CMS-controlled or unvalidated iframe embedding,
 * open redirects, and unsafe asset loading.
 *
 * Enforces:
 * - Strict HTTPS protocol
 * - Exact hostname allowlisting (no lookalike or arbitrary subdomain bypasses)
 * - Complete rejection of embedded credentials/userinfo (user:pass@host)
 * - Standard TLS ports only (:443 or default)
 * - Path and identifier validation using strict regex patterns
 * - Strict canonicalization of embed and watch destinations
 * - Separate policies for video embeds, direct video media, and PDF assets
 */

// Exact allowlisted video embed hosts
export const ALLOWED_YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
]);

export const ALLOWED_LINKEDIN_HOSTS = new Set([
  "linkedin.com",
  "www.linkedin.com",
]);

// Exact allowlisted direct media hosts (for <video> playback)
export const ALLOWED_MEDIA_HOSTS = new Set([
  "videos.ctfassets.net",
  "assets.ctfassets.net",
  "images.ctfassets.net",
  "dluxtech.com",
  "www.dluxtech.com",
]);

// Exact allowlisted PDF hosts
export const ALLOWED_PDF_HOSTS = new Set([
  "assets.ctfassets.net",
  "images.ctfassets.net",
  "dluxtech.com",
  "www.dluxtech.com",
  "admin.dluxtech.com",
  "dluxeqiq.com",
]);

// Strict patterns for identifiers
const YOUTUBE_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;
const LINKEDIN_URN_REGEX = /^urn:li:(activity|ugcPost|share):[0-9]+$/;
const ALLOWED_VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".ogg", ".mov"]);

/**
 * Base URL parser with strict security gates:
 * - HTTPS only
 * - No userinfo
 * - Standard port (default or 443)
 * - Host must exist in the provided allowlist
 */
function parseAndValidateBaseUrl(rawUrl: string, allowedHosts: Set<string>): URL | null {
  if (typeof rawUrl !== "string") return null;
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }

  // 1. Strict HTTPS
  if (parsed.protocol !== "https:") {
    return null;
  }

  // Reject path traversal or encoded traversal attempts
  if (trimmed.includes("..") || trimmed.toLowerCase().includes("%2e%2e")) {
    return null;
  }

  // 2. Reject userinfo (credentials in URL)
  if (parsed.username !== "" || parsed.password !== "") {
    return null;
  }

  // 3. Reject unexpected/non-standard ports
  if (parsed.port !== "" && parsed.port !== "443") {
    return null;
  }

  // 4. Exact host match (lowercase, strip trailing dot)
  const host = parsed.hostname.toLowerCase().replace(/\.$/, "");
  if (!allowedHosts.has(host)) {
    return null;
  }

  return parsed;
}

export interface VideoEmbedDetails {
  type: "youtube" | "linkedin";
  id: string;
  embedUrl: string;
  watchUrl: string;
}

/**
 * Validates and canonicalizes YouTube URLs.
 * Supports:
 * - youtu.be/<id>
 * - (www.|m.)youtube.com/watch?v=<id>
 * - (www.|m.)youtube.com/embed/<id>
 * - (www.|m.)youtube.com/shorts/<id>
 * - youtube-nocookie.com/embed/<id>
 */
export function parseYouTubeVideo(rawUrl?: string | null, autoplay = true): VideoEmbedDetails | null {
  if (!rawUrl) return null;
  const parsed = parseAndValidateBaseUrl(rawUrl, ALLOWED_YOUTUBE_HOSTS);
  if (!parsed) return null;

  const host = parsed.hostname.toLowerCase().replace(/\.$/, "");
  let videoId: string | null = null;

  if (host === "youtu.be") {
    // Path format: /<id>
    const segments = parsed.pathname.split("/").filter(Boolean);
    if (segments.length === 1 && YOUTUBE_ID_REGEX.test(segments[0])) {
      videoId = segments[0];
    }
  } else {
    // youtube.com / youtube-nocookie.com
    const path = parsed.pathname;

    if (path === "/watch") {
      const v = parsed.searchParams.get("v");
      if (v && YOUTUBE_ID_REGEX.test(v)) {
        videoId = v;
      }
    } else if (path.startsWith("/embed/")) {
      const segment = path.slice("/embed/".length).split("/")[0];
      if (segment && YOUTUBE_ID_REGEX.test(segment)) {
        videoId = segment;
      }
    } else if (path.startsWith("/shorts/")) {
      const segment = path.slice("/shorts/".length).split("/")[0];
      if (segment && YOUTUBE_ID_REGEX.test(segment)) {
        videoId = segment;
      }
    }
  }

  if (!videoId) return null;

  const embedUrl = `https://www.youtube.com/embed/${videoId}${autoplay ? "?autoplay=1" : ""}`;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return {
    type: "youtube",
    id: videoId,
    embedUrl,
    watchUrl,
  };
}

/**
 * Validates and canonicalizes LinkedIn Video Embed URLs.
 * Supports:
 * - linkedin.com/embed/feed/update/<urn>
 * - linkedin.com/feed/update/<urn>
 */
export function parseLinkedInVideo(rawUrl?: string | null): VideoEmbedDetails | null {
  if (!rawUrl) return null;
  const parsed = parseAndValidateBaseUrl(rawUrl, ALLOWED_LINKEDIN_HOSTS);
  if (!parsed) return null;

  const path = parsed.pathname;
  let rawUrn: string | null = null;

  if (path.startsWith("/embed/feed/update/")) {
    rawUrn = path.slice("/embed/feed/update/".length).split("/")[0];
  } else if (path.startsWith("/feed/update/")) {
    rawUrn = path.slice("/feed/update/".length).split("/")[0];
  }

  if (!rawUrn) return null;

  let decodedUrn: string;
  try {
    decodedUrn = decodeURIComponent(rawUrn);
  } catch {
    return null;
  }

  if (!LINKEDIN_URN_REGEX.test(decodedUrn)) {
    return null;
  }

  const embedUrl = `https://www.linkedin.com/embed/feed/update/${decodedUrn}`;
  const watchUrl = `https://www.linkedin.com/feed/update/${decodedUrn}`;

  return {
    type: "linkedin",
    id: decodedUrn,
    embedUrl,
    watchUrl,
  };
}

/**
 * Combined Video Embed validator (YouTube + LinkedIn).
 */
export function getVideoEmbedDetails(
  rawUrl?: string | null,
  options?: { autoplay?: boolean }
): VideoEmbedDetails | null {
  if (!rawUrl) return null;
  const autoplay = options?.autoplay !== false;

  return parseYouTubeVideo(rawUrl, autoplay) ?? parseLinkedInVideo(rawUrl);
}

/**
 * Returns a canonical safe video embed iframe src, or null if invalid.
 */
export function getSafeVideoEmbedUrl(
  rawUrl?: string | null,
  options?: { autoplay?: boolean }
): string | null {
  const details = getVideoEmbedDetails(rawUrl, options);
  return details ? details.embedUrl : null;
}

/**
 * Returns a canonical safe video watch URL for external fallback links, or null if invalid.
 */
export function getSafeVideoWatchUrl(rawUrl?: string | null): string | null {
  const details = getVideoEmbedDetails(rawUrl);
  return details ? details.watchUrl : null;
}

/**
 * Validates direct video media files for HTML5 <video> players.
 * Only allows trusted asset CDNs and legitimate video extensions.
 */
export function getSafeDirectVideoUrl(rawUrl?: string | null): string | null {
  if (!rawUrl) return null;
  const parsed = parseAndValidateBaseUrl(rawUrl, ALLOWED_MEDIA_HOSTS);
  if (!parsed) return null;

  // Reject path traversal
  if (parsed.pathname.includes("..")) {
    return null;
  }

  const pathnameLower = parsed.pathname.toLowerCase();
  const hasValidExt = Array.from(ALLOWED_VIDEO_EXTENSIONS).some((ext) =>
    pathnameLower.endsWith(ext)
  );

  if (!hasValidExt) {
    return null;
  }

  return `${parsed.origin}${parsed.pathname}${parsed.search}`;
}

export type SafeMediaResult =
  | { kind: "embed"; type: "youtube" | "linkedin"; embedUrl: string; watchUrl: string }
  | { kind: "direct"; mediaUrl: string };

/**
 * Universal media resolver for components that accept either iframe embeds (YouTube/LinkedIn)
 * or direct video files (e.g. Contentful MP4 assets).
 */
export function resolveSafeMedia(
  rawUrl?: string | null,
  options?: { autoplay?: boolean }
): SafeMediaResult | null {
  if (!rawUrl) return null;

  const embedDetails = getVideoEmbedDetails(rawUrl, options);
  if (embedDetails) {
    return {
      kind: "embed",
      type: embedDetails.type,
      embedUrl: embedDetails.embedUrl,
      watchUrl: embedDetails.watchUrl,
    };
  }

  const directUrl = getSafeDirectVideoUrl(rawUrl);
  if (directUrl) {
    return {
      kind: "direct",
      mediaUrl: directUrl,
    };
  }

  return null;
}

/**
 * Validates PDF documents for iframe preview and download buttons.
 * Enforces:
 * - Strict HTTPS
 * - Exact allowlisted PDF host (Contentful assets / dluxtech domains)
 * - Must end with .pdf (case insensitive)
 * - Reject traversal and credentials
 */
export function getSafePdfUrl(rawUrl?: string | null): string | null {
  if (!rawUrl) return null;
  const parsed = parseAndValidateBaseUrl(rawUrl, ALLOWED_PDF_HOSTS);
  if (!parsed) return null;

  // Reject path traversal
  if (parsed.pathname.includes("..")) {
    return null;
  }

  const pathnameLower = parsed.pathname.toLowerCase();
  if (!pathnameLower.endsWith(".pdf")) {
    return null;
  }

  return `${parsed.origin}${parsed.pathname}${parsed.search}`;
}

/**
 * Convenience booleans
 */
export function isSafeVideoUrl(rawUrl?: string | null): boolean {
  return resolveSafeMedia(rawUrl) !== null;
}

export function isSafePdfUrl(rawUrl?: string | null): boolean {
  return getSafePdfUrl(rawUrl) !== null;
}
