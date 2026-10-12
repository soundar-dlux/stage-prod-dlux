import sanitizeHtml from "sanitize-html";

/**
 * Strict allowlist of safe HTML tags permitted in blog articles.
 * Preserves standard editorial and typography elements while rejecting
 * all executable, embedding, and input tags.
 */
export const ALLOWED_TAGS: string[] = [
  // Headings & Structural Elements
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "br",
  "hr",
  "blockquote",
  "pre",
  "code",

  // Inline Formatting
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "strike",
  "del",
  "sub",
  "sup",
  "span",
  "mark",
  "kbd",

  // Lists
  "ul",
  "ol",
  "li",

  // Media & Links
  "a",
  "img",
  "figure",
  "figcaption",

  // Tables
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
];

/**
 * Allowed attributes strictly mapped by element type.
 * Note: All on* event handlers (onclick, onerror, onload, etc.) are strictly rejected.
 */
export const ALLOWED_ATTRIBUTES: Record<string, string[]> = {
  a: ["href", "name", "target", "rel", "title"],
  img: ["src", "alt", "title", "width", "height", "loading"],
  th: ["colspan", "rowspan", "scope", "align"],
  td: ["colspan", "rowspan", "align"],
  ol: ["start", "type"],
  "*": ["class", "id"],
};

/**
 * Permitted URL schemes for links and resources.
 * Executable schemes (javascript:, vbscript:, data:, file:) are strictly rejected.
 */
export const ALLOWED_SCHEMES: string[] = ["http", "https", "mailto", "tel"];

export interface SanitizeOptions {
  allowedTags?: string[];
  allowedAttributes?: Record<string, string[]>;
  allowedSchemes?: string[];
  allowedSchemesByTag?: Record<string, string[]>;
  allowProtocolRelative?: boolean;
}

/**
 * Sanitizes blog HTML content using a strict allowlist parser.
 *
 * Security Guarantees:
 * 1. Uses htmlparser2 AST tokenization - strictly avoids fragile regex matching.
 * 2. Strips all <script>, <iframe>, <object>, <embed>, <form>, <style>, <svg>, <meta>, <base> tags.
 * 3. Strips all inline event handlers (onerror, onload, onclick, etc.).
 * 4. Validates URL-bearing attributes (href, src) against allowed schemes (https, http, mailto, tel).
 * 5. Rejects javascript:, vbscript:, and malicious data: URI execution.
 * 6. Enforces rel="noopener noreferrer" on external/blank-targeted links to prevent reverse tabnabbing.
 *
 * @param dirtyHtml - The untrusted HTML string from CMS or external input.
 * @param customOptions - Optional overrides for customization.
 * @returns Clean, safe HTML string.
 */
export function sanitizeBlogHtml(
  dirtyHtml: string | null | undefined,
  customOptions?: SanitizeOptions
): string {
  if (!dirtyHtml || typeof dirtyHtml !== "string") {
    return "";
  }

  const sanitized = sanitizeHtml(dirtyHtml, {
    allowedTags: customOptions?.allowedTags ?? ALLOWED_TAGS,
    allowedAttributes: customOptions?.allowedAttributes ?? ALLOWED_ATTRIBUTES,
    allowedSchemes: customOptions?.allowedSchemes ?? ALLOWED_SCHEMES,
    allowedSchemesByTag: customOptions?.allowedSchemesByTag ?? {
      a: ["http", "https", "mailto", "tel"],
      img: ["http", "https"],
    },
    // Prevent protocol-relative URL exploits (e.g. "//evil.com")
    allowProtocolRelative: customOptions?.allowProtocolRelative ?? false,
    // Discard disallowed tags and their dangerous executable content
    disallowedTagsMode: "discard",
    transformTags: {
      a: (tagName, attribs) => {
        const safeAttribs = { ...attribs };

        // Normalize target and enforce noopener noreferrer for blank targets
        if (safeAttribs.target === "_blank") {
          const existingRel = safeAttribs.rel ? safeAttribs.rel.split(/\s+/) : [];
          const requiredRels = ["noopener", "noreferrer"];
          const mergedRel = Array.from(new Set([...existingRel, ...requiredRels])).join(" ");
          safeAttribs.rel = mergedRel;
        }

        return {
          tagName,
          attribs: safeAttribs,
        };
      },
      img: (tagName, attribs) => {
        const safeAttribs = { ...attribs };
        // Default lazy loading for performance and resource control
        if (!safeAttribs.loading) {
          safeAttribs.loading = "lazy";
        }
        return {
          tagName,
          attribs: safeAttribs,
        };
      },
    },
  });

  return sanitized.trim();
}
