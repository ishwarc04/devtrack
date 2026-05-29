import { describe, expect, it } from "vitest";

import {
  getAuthErrorMessage,
  normalizeAuthError,
} from "../src/lib/auth-error-message";

describe("auth-error-message", () => {
  describe("normalizeAuthError", () => {
    it("returns null for empty values", () => {
      expect(normalizeAuthError(null)).toBeNull();
      expect(normalizeAuthError("   ")).toBeNull();
    });

    it("decodes URL-encoded error codes", () => {
      expect(normalizeAuthError("OAuthCallback%20")).toBe("OAuthCallback ");
    });

    it("falls back to raw value when decoding fails", () => {
      expect(normalizeAuthError("%E0%A4%A")).toBe("%E0%A4%A");
    });
  });

  describe("getAuthErrorMessage", () => {
    it("returns mapped message for known errors", () => {
      expect(getAuthErrorMessage("OAuthSignin")).toContain(
        "Could not start the GitHub sign-in flow"
      );
    });

    it("falls back to default for unknown errors", () => {
      expect(getAuthErrorMessage("UnknownCode")).toContain(
        "unexpected authentication error"
      );
    });
  });
});
