/**
 * Configuration and validation logic for cross-window iframe postMessage communication.
 * Protects against untrusted origin injection, cross-frame spoofing, and layout denial-of-service.
 */

export const DEFAULT_FORM_ORIGIN = "https://forms.dluxtech.com";
export const DEFAULT_FORM_ID = "yDN6eKbrtAH11RME4LZgO6s-M8ogDvOaP693n-cytaQ";

export const DEFAULT_MIN_HEIGHT = 100;
export const DEFAULT_MAX_HEIGHT = 4000;
export const HEIGHT_PADDING = 15;

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
 * Validates postMessage resize payloads from the embedded contact form iframe.
 *
 * Security Requirements:
 * 1. event.origin MUST equal the configured form origin exactly.
 * 2. event.source MUST equal the target iframe contentWindow reference.
 * 3. event.data MUST be a string matching the schema "formId|height".
 * 4. formId MUST strictly match expectedFormId.
 * 5. height MUST be a positive, finite, bounded integer (minHeight <= height <= maxHeight).
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

  // 1. Origin verification
  if (!event || typeof event.origin !== "string") {
    return { isValid: false, error: "Missing event origin" };
  }

  if (event.origin !== expectedOrigin) {
    return {
      isValid: false,
      error: `Untrusted origin '${event.origin}', expected '${expectedOrigin}'`,
    };
  }

  // 2. Source window verification
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

  // 3. Payload type check
  if (typeof event.data !== "string" || !event.data.trim()) {
    return {
      isValid: false,
      error: "Malformed payload: data must be a non-empty string",
    };
  }

  // 4. Schema check: formId|height
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

  // 5. Expected Form Identifier check
  if (!expectedFormId || !trimmedFormId) {
    return {
      isValid: false,
      error: "Empty form identifier",
    };
  }

  if (trimmedFormId !== expectedFormId) {
    return {
      isValid: false,
      error: `Form identifier mismatch: received '${trimmedFormId}', expected '${expectedFormId}'`,
    };
  }

  // 6. Strict numeric validation for height
  if (!/^\d+$/.test(trimmedHeight)) {
    return {
      isValid: false,
      error: `Invalid non-numeric height value '${trimmedHeight}'`,
    };
  }

  const parsedHeight = parseInt(trimmedHeight, 10);

  if (!Number.isFinite(parsedHeight) || Number.isNaN(parsedHeight)) {
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
