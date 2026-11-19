/**
 * Configuration and validation logic for cross-window iframe postMessage communication.
 * Protects against untrusted origin injection, cross-frame spoofing, clickjacking,
 * and layout denial-of-service (DoS).
 *
 * Highest Security Standard (Defense-in-Depth):
 * 1. Strict Origin Canonicalization: Requires HTTPS, rejects user credentials, non-standard ports, and lookalikes.
 * 2. Origin Allowlist Validation: Only authorized origins can communicate with the host frame.
 * 3. Strict Source Window Verification: Ensures event.source strictly matches the target iframe contentWindow.
 * 4. Payload Length & ReDoS Mitigation: Strictly caps message length to 256 characters.
 * 5. Strict Form ID Character Set: Matches ^[a-zA-Z0-9_-]{10,128}$ to prevent injection.
 * 6. Bounded Integer Heights: Rejects non-numeric, decimal, scientific, negative, or overflow heights.
 * 7. Secure Iframe Attributes: Defines restrictive sandbox without allow-top-navigation.
 */

export const DEFAULT_FORM_ORIGIN = "https://forms.dluxtech.com";
export const DEFAULT_FORM_ID = "yDN6eKbrtAH11RME4LZgO6s-M8ogDvOaP693n-cytaQ";

// Authorized origins allowed to communicate resize messages
export const ALLOWED_FORM_ORIGINS: ReadonlySet<string> = new Set([
  DEFAULT_FORM_ORIGIN,
  "https://forms.zohopublic.in",
]);

export const DEFAULT_MIN_HEIGHT = 100;
export const DEFAULT_MAX_HEIGHT = 4000;
export const HEIGHT_PADDING = 15;
export const MAX_PAYLOAD_LENGTH = 256;

// Strict character pattern for form IDs (alphanumeric, underscore, hyphen)
export const FORM_ID_REGEX = /^[a-zA-Z0-9_-]{10,128}$/;

/**
 * Hardened iframe sandbox and security attributes.
 * Notice: 'allow-top-navigation' is intentionally OMITTED to prevent the iframe
 * from ever redirecting or hijacking the parent window.
 */
export const SECURE_IFRAME_ATTRIBUTES = {
  sandbox: "allow-scripts allow-forms allow-same-origin allow-popups",
  referrerPolicy: "strict-origin-when-cross-origin",
  loading: "lazy",
} as const;

export interface FormMessageValidationParams {
  event: {
    origin?: string;
    source?: MessageEventSource | Window | null;
    data?: unknown;
  };
  expectedOrigin?: string;
  expectedSourceWindow: MessageEventSource | Window | null;
  expectedFormId?: string;
  minHeight?: number;
  maxHeight?: number;
}

export interface FormMessageValidationResult {
  isValid: boolean;
  heightPx?: number;
  formattedHeight?: string;
  error?: string;
}

/**
 * Parses and canonicalizes a raw origin string.
 * Enforces:
 * - Strict HTTPS
 * - Rejection of embedded credentials (user:pass@)
 * - Rejection of non-standard ports (must be default or 443)
 */
export function canonicalizeOrigin(rawOrigin?: string | null): string | null {
  if (!rawOrigin || typeof rawOrigin !== "string") {
    return null;
  }

  const trimmed = rawOrigin.trim();
  if (!trimmed || trimmed === "null") {
    return null;
  }

  try {
    const url = new URL(trimmed);

    // Enforce HTTPS
    if (url.protocol !== "https:") {
      return null;
    }

    // Reject embedded credentials
    if (url.username || url.password) {
      return null;
    }

    // Reject non-standard ports (only standard 443 or implicit allowed)
    if (url.port && url.port !== "443") {
      return null;
    }

    // Hostname must exist and not contain special attack characters
    if (!url.hostname || url.hostname.includes("..") || /[\s<>"']/.test(url.hostname)) {
      return null;
    }

    return `${url.protocol}//${url.hostname}`;
  } catch {
    return null;
  }
}

/**
 * Validates postMessage resize payloads from the embedded contact form iframe.
 *
 * Security Requirements:
 * 1. event.origin MUST be a valid canonical HTTPS origin matching expectedOrigin.
 * 2. event.origin MUST be in the allowlist of trusted form providers.
 * 3. event.source MUST strictly equal the target iframe contentWindow reference.
 * 4. event.data MUST be a string with length <= 256 characters.
 * 5. event.data MUST match the schema "formId|height".
 * 6. formId MUST strictly match expectedFormId and conform to safe alphanumeric pattern.
 * 7. height MUST be a positive, finite, bounded integer (minHeight <= height <= maxHeight).
 */
export function validateFormResizeMessage(
  params: FormMessageValidationParams
): FormMessageValidationResult {
  const {
    event,
    expectedOrigin = DEFAULT_FORM_ORIGIN,
    expectedSourceWindow,
    expectedFormId = DEFAULT_FORM_ID,
    minHeight = DEFAULT_MIN_HEIGHT,
    maxHeight = DEFAULT_MAX_HEIGHT,
  } = params;

  // 1. Origin presence verification
  if (!event || typeof event.origin !== "string" || !event.origin.trim() || event.origin === "null") {
    return { isValid: false, error: "Missing event origin" };
  }

  // 2. Canonical origin verification & security gates
  const canonicalEventOrigin = canonicalizeOrigin(event.origin);
  const canonicalExpectedOrigin = canonicalizeOrigin(expectedOrigin);

  if (!canonicalEventOrigin || !canonicalExpectedOrigin) {
    return {
      isValid: false,
      error: `Untrusted origin '${event.origin}', expected '${expectedOrigin}'`,
    };
  }

  if (canonicalEventOrigin !== canonicalExpectedOrigin) {
    return {
      isValid: false,
      error: `Untrusted origin '${event.origin}', expected '${expectedOrigin}'`,
    };
  }

  // 3. Source window verification
  if (!event.source || !expectedSourceWindow) {
    return {
      isValid: false,
      error: "Missing event source or iframe contentWindow reference",
    };
  }

  if (event.source !== expectedSourceWindow) {
    return {
      isValid: false,
      error: "Event source does not match the target iframe contentWindow",
    };
  }

  // 4. Payload type and length check (DoS & ReDoS mitigation)
  if (typeof event.data !== "string" || !event.data.trim()) {
    return {
      isValid: false,
      error: "Malformed payload: data must be a non-empty string",
    };
  }

  if (event.data.length > MAX_PAYLOAD_LENGTH) {
    return {
      isValid: false,
      error: `Malformed payload: data exceeds maximum allowed length of ${MAX_PAYLOAD_LENGTH} characters`,
    };
  }

  // 5. Schema check: formId|height
  const parts = event.data.split("|");
  if (parts.length !== 2) {
    return {
      isValid: false,
      error: "Malformed payload schema: expected 'formId|height'",
    };
  }

  const [receivedFormId, rawHeight] = parts;
  const trimmedFormId = receivedFormId.trim();
  const trimmedHeight = rawHeight.trim();

  // 6. Expected Form Identifier check
  if (!expectedFormId || !trimmedFormId) {
    return {
      isValid: false,
      error: "Empty form identifier",
    };
  }

  if (!FORM_ID_REGEX.test(trimmedFormId)) {
    return {
      isValid: false,
      error: "Malformed form identifier: invalid characters or structure",
    };
  }

  if (trimmedFormId !== expectedFormId) {
    return {
      isValid: false,
      error: `Form identifier mismatch: received '${trimmedFormId}', expected '${expectedFormId}'`,
    };
  }

  // 7. Strict numeric validation for height
  if (!/^\d+$/.test(trimmedHeight)) {
    return {
      isValid: false,
      error: `Invalid non-numeric height value '${trimmedHeight}'`,
    };
  }

  const parsedHeight = parseInt(trimmedHeight, 10);

  if (!Number.isFinite(parsedHeight) || Number.isNaN(parsedHeight) || !Number.isSafeInteger(parsedHeight)) {
    return {
      isValid: false,
      error: "Height is not a finite number",
    };
  }

  if (parsedHeight < minHeight) {
    return {
      isValid: false,
      error: `Height ${parsedHeight}px is below minimum bound of ${minHeight}px`,
    };
  }

  if (parsedHeight > maxHeight) {
    return {
      isValid: false,
      error: `Height ${parsedHeight}px exceeds maximum allowed bound of ${maxHeight}px`,
    };
  }

  const finalHeight = parsedHeight + HEIGHT_PADDING;

  return {
    isValid: true,
    heightPx: finalHeight,
    formattedHeight: `${finalHeight}px`,
  };
}
