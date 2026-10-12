import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  validateFormResizeMessage,
  DEFAULT_FORM_ORIGIN,
  DEFAULT_FORM_ID,
  DEFAULT_MIN_HEIGHT,
  DEFAULT_MAX_HEIGHT,
  HEIGHT_PADDING,
} from "../../src/lib/security/form-message";

describe("S03 Security - postMessage Trust & Schema Validation", () => {
  // Mock window objects for event.source testing
  const validMockWindow = {} as unknown as Window;
  const attackerMockWindow = {} as unknown as Window;

  const createValidEvent = (overrides?: Partial<Parameters<typeof validateFormResizeMessage>[0]["event"]>) => ({
    origin: DEFAULT_FORM_ORIGIN,
    source: validMockWindow,
    data: `${DEFAULT_FORM_ID}|650`,
    ...overrides,
  });

  describe("Origin Trust Validation", () => {
    it("accepts messages matching the exact configured form origin", () => {
      const event = createValidEvent();
      const result = validateFormResizeMessage({
        event,
        expectedOrigin: DEFAULT_FORM_ORIGIN,
        expectedSourceWindow: validMockWindow,
        expectedFormId: DEFAULT_FORM_ID,
      });

      assert.strictEqual(result.isValid, true);
      assert.strictEqual(result.formattedHeight, "665px");
    });

    it("rejects untrusted third-party origins", () => {
      const untrustedOrigins = [
        "https://evil-attacker.com",
        "http://forms.dluxtech.com", // Insecure HTTP
        "https://forms.dluxtech.com.attacker.com", // Subdomain spoofing
        "https://attacker-forms.dluxtech.com",
        "null",
        "",
      ];

      for (const origin of untrustedOrigins) {
        const event = createValidEvent({ origin });
        const result = validateFormResizeMessage({
          event,
          expectedOrigin: DEFAULT_FORM_ORIGIN,
          expectedSourceWindow: validMockWindow,
          expectedFormId: DEFAULT_FORM_ID,
        });

        assert.strictEqual(result.isValid, false);
        assert.ok(result.error?.includes("Untrusted origin") || result.error?.includes("Missing event origin"));
      }
    });

    it("rejects events with missing or undefined origin", () => {
      const event = createValidEvent({ origin: undefined });
      const result = validateFormResizeMessage({
        event,
        expectedOrigin: DEFAULT_FORM_ORIGIN,
        expectedSourceWindow: validMockWindow,
        expectedFormId: DEFAULT_FORM_ID,
      });

      assert.strictEqual(result.isValid, false);
      assert.strictEqual(result.error, "Missing event origin");
    });
  });

  describe("Source Window Trust Validation", () => {
    it("rejects messages originating from an attacker window or wrong frame", () => {
      const event = createValidEvent({ source: attackerMockWindow });
      const result = validateFormResizeMessage({
        event,
        expectedOrigin: DEFAULT_FORM_ORIGIN,
        expectedSourceWindow: validMockWindow,
        expectedFormId: DEFAULT_FORM_ID,
      });

      assert.strictEqual(result.isValid, false);
      assert.strictEqual(
        result.error,
        "Event source does not match the target iframe contentWindow"
      );
    });

    it("rejects messages when event.source is null or undefined", () => {
      const eventWithNull = createValidEvent({ source: null });
      const resultNull = validateFormResizeMessage({
        event: eventWithNull,
        expectedOrigin: DEFAULT_FORM_ORIGIN,
        expectedSourceWindow: validMockWindow,
        expectedFormId: DEFAULT_FORM_ID,
      });

      assert.strictEqual(resultNull.isValid, false);
      assert.strictEqual(
        resultNull.error,
        "Missing event source or iframe contentWindow reference"
      );
    });

    it("rejects messages when expectedSourceWindow has not initialized", () => {
      const event = createValidEvent();
      const result = validateFormResizeMessage({
        event,
        expectedOrigin: DEFAULT_FORM_ORIGIN,
        expectedSourceWindow: null,
        expectedFormId: DEFAULT_FORM_ID,
      });

      assert.strictEqual(result.isValid, false);
      assert.strictEqual(
        result.error,
        "Missing event source or iframe contentWindow reference"
      );
    });
  });

  describe("Message Payload Schema & Type Validation", () => {
    it("rejects non-string payloads (objects, arrays, numbers, null)", () => {
      const invalidData = [
        { height: 650 },
        [DEFAULT_FORM_ID, 650],
        650,
        true,
        null,
        undefined,
      ];

      for (const data of invalidData) {
        const event = createValidEvent({ data });
        const result = validateFormResizeMessage({
          event,
          expectedOrigin: DEFAULT_FORM_ORIGIN,
          expectedSourceWindow: validMockWindow,
          expectedFormId: DEFAULT_FORM_ID,
        });

        assert.strictEqual(result.isValid, false);
        assert.ok(result.error?.includes("Malformed payload"));
      }
    });

    it("rejects empty strings or whitespace data", () => {
      const invalidStrings = ["", "   ", "\n", "\t"];

      for (const data of invalidStrings) {
        const event = createValidEvent({ data });
        const result = validateFormResizeMessage({
          event,
          expectedOrigin: DEFAULT_FORM_ORIGIN,
          expectedSourceWindow: validMockWindow,
          expectedFormId: DEFAULT_FORM_ID,
        });

        assert.strictEqual(result.isValid, false);
        assert.ok(result.error?.includes("Malformed payload"));
      }
    });

    it("rejects malformed delimiter structures (no pipe or excess pipes)", () => {
      const malformedPayloads = [
        "650", // Missing delimiter
        `${DEFAULT_FORM_ID}`, // Missing delimiter
        `${DEFAULT_FORM_ID}|650|extra`, // Too many parts
        `${DEFAULT_FORM_ID}|650|`, // Trailing delimiter
        `||`, // Multiple empty delimiters
      ];

      for (const data of malformedPayloads) {
        const event = createValidEvent({ data });
        const result = validateFormResizeMessage({
          event,
          expectedOrigin: DEFAULT_FORM_ORIGIN,
          expectedSourceWindow: validMockWindow,
          expectedFormId: DEFAULT_FORM_ID,
        });

        assert.strictEqual(result.isValid, false);
        assert.ok(result.error?.includes("schema") || result.error?.includes("identifier"));
      }
    });
  });

  describe("Form Identifier Validation", () => {
    it("rejects empty or whitespace form identifiers", () => {
      const invalidPayloads = [
        `|650`,
        `   |650`,
      ];

      for (const data of invalidPayloads) {
        const event = createValidEvent({ data });
        const result = validateFormResizeMessage({
          event,
          expectedOrigin: DEFAULT_FORM_ORIGIN,
          expectedSourceWindow: validMockWindow,
          expectedFormId: DEFAULT_FORM_ID,
        });

        assert.strictEqual(result.isValid, false);
        assert.strictEqual(result.error, "Empty form identifier");
      }
    });

    it("rejects messages with an incorrect form identifier", () => {
      const event = createValidEvent({
        data: "unauthorized-external-form-id|650",
      });
      const result = validateFormResizeMessage({
        event,
        expectedOrigin: DEFAULT_FORM_ORIGIN,
        expectedSourceWindow: validMockWindow,
        expectedFormId: DEFAULT_FORM_ID,
      });

      assert.strictEqual(result.isValid, false);
      assert.ok(result.error?.includes("Form identifier mismatch"));
    });
  });

  describe("Bounded Finite Height Validation", () => {
    it("rejects non-numeric height values", () => {
      const nonNumeric = [
        `${DEFAULT_FORM_ID}|abc`,
        `${DEFAULT_FORM_ID}|650px`,
        `${DEFAULT_FORM_ID}|650;alert(1)`,
        `${DEFAULT_FORM_ID}|NaN`,
        `${DEFAULT_FORM_ID}|Infinity`,
        `${DEFAULT_FORM_ID}|1e6`,
        `${DEFAULT_FORM_ID}|650.5`,
      ];

      for (const data of nonNumeric) {
        const event = createValidEvent({ data });
        const result = validateFormResizeMessage({
          event,
          expectedOrigin: DEFAULT_FORM_ORIGIN,
          expectedSourceWindow: validMockWindow,
          expectedFormId: DEFAULT_FORM_ID,
        });

        assert.strictEqual(result.isValid, false);
        assert.ok(result.error?.includes("non-numeric"));
      }
    });

    it("rejects negative or below-minimum heights", () => {
      const belowMinimum = [
        `${DEFAULT_FORM_ID}|-500`,
        `${DEFAULT_FORM_ID}|0`,
        `${DEFAULT_FORM_ID}|99`, // default min is 100
      ];

      for (const data of belowMinimum) {
        const event = createValidEvent({ data });
        const result = validateFormResizeMessage({
          event,
          expectedOrigin: DEFAULT_FORM_ORIGIN,
          expectedSourceWindow: validMockWindow,
          expectedFormId: DEFAULT_FORM_ID,
        });

        assert.strictEqual(result.isValid, false);
        assert.ok(result.error?.includes("below minimum bound") || result.error?.includes("non-numeric"));
      }
    });

    it("rejects excessive heights beyond the upper bound (DoS prevention)", () => {
      const excessiveHeights = [
        `${DEFAULT_FORM_ID}|4001`, // Default max is 4000
        `${DEFAULT_FORM_ID}|100000`,
        `${DEFAULT_FORM_ID}|9999999`,
      ];

      for (const data of excessiveHeights) {
        const event = createValidEvent({ data });
        const result = validateFormResizeMessage({
          event,
          expectedOrigin: DEFAULT_FORM_ORIGIN,
          expectedSourceWindow: validMockWindow,
          expectedFormId: DEFAULT_FORM_ID,
        });

        assert.strictEqual(result.isValid, false);
        assert.ok(result.error?.includes("exceeds maximum allowed bound"));
      }
    });
  });

  describe("Legitimate Resize Calculation & Padding", () => {
    it("accepts valid minimum bound and adds height padding", () => {
      const event = createValidEvent({
        data: `${DEFAULT_FORM_ID}|${DEFAULT_MIN_HEIGHT}`,
      });
      const result = validateFormResizeMessage({
        event,
        expectedOrigin: DEFAULT_FORM_ORIGIN,
        expectedSourceWindow: validMockWindow,
        expectedFormId: DEFAULT_FORM_ID,
      });

      assert.strictEqual(result.isValid, true);
      assert.strictEqual(result.heightPx, DEFAULT_MIN_HEIGHT + HEIGHT_PADDING);
      assert.strictEqual(
        result.formattedHeight,
        `${DEFAULT_MIN_HEIGHT + HEIGHT_PADDING}px`
      );
    });

    it("accepts valid maximum bound and adds height padding", () => {
      const event = createValidEvent({
        data: `${DEFAULT_FORM_ID}|${DEFAULT_MAX_HEIGHT}`,
      });
      const result = validateFormResizeMessage({
        event,
        expectedOrigin: DEFAULT_FORM_ORIGIN,
        expectedSourceWindow: validMockWindow,
        expectedFormId: DEFAULT_FORM_ID,
      });

      assert.strictEqual(result.isValid, true);
      assert.strictEqual(result.heightPx, DEFAULT_MAX_HEIGHT + HEIGHT_PADDING);
      assert.strictEqual(
        result.formattedHeight,
        `${DEFAULT_MAX_HEIGHT + HEIGHT_PADDING}px`
      );
    });

    it("calculates legitimate form resize correctly for standard height (e.g. 780px)", () => {
      const event = createValidEvent({
        data: `${DEFAULT_FORM_ID}|780`,
      });
      const result = validateFormResizeMessage({
        event,
        expectedOrigin: DEFAULT_FORM_ORIGIN,
        expectedSourceWindow: validMockWindow,
        expectedFormId: DEFAULT_FORM_ID,
      });

      assert.strictEqual(result.isValid, true);
      assert.strictEqual(result.heightPx, 795);
      assert.strictEqual(result.formattedHeight, "795px");
    });
  });
});
