/**
 * Unit tests for src/lib/validation.ts
 */

import {
  validateSearchForm,
  sanitiseQueryParam,
  isValidNpi,
  isValidStateAbbr,
} from "../src/lib/validation";

// ─── isValidNpi ───────────────────────────────────────────────────────────────

describe("isValidNpi", () => {
  test("accepts a valid 10-digit NPI", () => {
    expect(isValidNpi("1234567890")).toBe(true);
  });

  test("rejects an NPI that is too short", () => {
    expect(isValidNpi("123456789")).toBe(false);
  });

  test("rejects an NPI that is too long", () => {
    expect(isValidNpi("12345678901")).toBe(false);
  });

  test("rejects an NPI containing letters", () => {
    expect(isValidNpi("123456789A")).toBe(false);
  });

  test("rejects an NPI with spaces", () => {
    expect(isValidNpi("1234 567890")).toBe(false);
  });

  test("rejects an NPI with dashes", () => {
    expect(isValidNpi("1234-567890")).toBe(false);
  });

  test("rejects empty string", () => {
    expect(isValidNpi("")).toBe(false);
  });

  test("trims whitespace before validating", () => {
    expect(isValidNpi("  1234567890  ")).toBe(true);
  });
});

// ─── isValidStateAbbr ─────────────────────────────────────────────────────────

describe("isValidStateAbbr", () => {
  test("accepts a valid state abbreviation (uppercase)", () => {
    expect(isValidStateAbbr("CA")).toBe(true);
    expect(isValidStateAbbr("NY")).toBe(true);
    expect(isValidStateAbbr("TX")).toBe(true);
    expect(isValidStateAbbr("DC")).toBe(true);
  });

  test("accepts a valid state abbreviation (lowercase)", () => {
    expect(isValidStateAbbr("ca")).toBe(true);
    expect(isValidStateAbbr("ny")).toBe(true);
  });

  test("accepts a valid state abbreviation (mixed case)", () => {
    expect(isValidStateAbbr("Ca")).toBe(true);
  });

  test("rejects an invalid abbreviation", () => {
    expect(isValidStateAbbr("XX")).toBe(false);
    expect(isValidStateAbbr("ZZ")).toBe(false);
  });

  test("rejects empty string", () => {
    expect(isValidStateAbbr("")).toBe(false);
  });
});

// ─── validateSearchForm ───────────────────────────────────────────────────────

describe("validateSearchForm", () => {
  test("returns valid for a correct NPI with no state", () => {
    const result = validateSearchForm({ npi: "1234567890" });
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
    expect(result.normalised?.npi).toBe("1234567890");
    expect(result.normalised?.state).toBeUndefined();
  });

  test("returns valid for correct NPI + state", () => {
    const result = validateSearchForm({ npi: "9876543210", state: "CA" });
    expect(result.valid).toBe(true);
    expect(result.normalised?.npi).toBe("9876543210");
    expect(result.normalised?.state).toBe("CA");
  });

  test("normalises state abbreviation to uppercase", () => {
    const result = validateSearchForm({ npi: "1234567890", state: "ca" });
    expect(result.valid).toBe(true);
    expect(result.normalised?.state).toBe("CA");
  });

  test("strips whitespace from NPI", () => {
    const result = validateSearchForm({ npi: "  1234567890  " });
    expect(result.valid).toBe(true);
    expect(result.normalised?.npi).toBe("1234567890");
  });

  test("returns error when NPI is missing", () => {
    const result = validateSearchForm({ npi: "" });
    expect(result.valid).toBe(false);
    expect(result.errors.npi).toBeTruthy();
  });

  test("returns error when NPI is too short", () => {
    const result = validateSearchForm({ npi: "12345" });
    expect(result.valid).toBe(false);
    expect(result.errors.npi).toContain("10 digits");
  });

  test("returns error when NPI contains letters", () => {
    const result = validateSearchForm({ npi: "123456789A" });
    expect(result.valid).toBe(false);
    expect(result.errors.npi).toBeTruthy();
  });

  test("returns error when state abbreviation is invalid", () => {
    const result = validateSearchForm({ npi: "1234567890", state: "XX" });
    expect(result.valid).toBe(false);
    expect(result.errors.state).toBeTruthy();
  });

  test("treats empty state as no state (not an error)", () => {
    const result = validateSearchForm({ npi: "1234567890", state: "" });
    expect(result.valid).toBe(true);
    expect(result.normalised?.state).toBeUndefined();
  });

  test("handles undefined fields gracefully", () => {
    const result = validateSearchForm({});
    expect(result.valid).toBe(false);
    expect(result.errors.npi).toBeTruthy();
  });
});

// ─── sanitiseQueryParam ───────────────────────────────────────────────────────

describe("sanitiseQueryParam", () => {
  test("returns null for null input", () => {
    expect(sanitiseQueryParam(null)).toBeNull();
  });

  test("returns null for undefined input", () => {
    expect(sanitiseQueryParam(undefined)).toBeNull();
  });

  test("returns null for empty string", () => {
    expect(sanitiseQueryParam("")).toBeNull();
  });

  test("returns null for whitespace-only string", () => {
    expect(sanitiseQueryParam("   ")).toBeNull();
  });

  test("returns trimmed value for valid input", () => {
    expect(sanitiseQueryParam("  hello  ")).toBe("hello");
  });

  test("truncates to default maxLength of 100", () => {
    const long = "a".repeat(200);
    const result = sanitiseQueryParam(long);
    expect(result).toHaveLength(100);
  });

  test("truncates to custom maxLength", () => {
    const long = "a".repeat(200);
    const result = sanitiseQueryParam(long, 10);
    expect(result).toHaveLength(10);
  });
});
