/**
 * Typed API client for the medical license data provider.
 *
 * Endpoint:  POST /api/v1/medical/search-license-by-number/
 * Base URL:  https://api.medicalsearch.licensy.ai
 * Auth:      credential_key field in the POST body
 * Format:    application/x-www-form-urlencoded
 * Params:    License_Number, State (full state name e.g. "Georgia")
 *
 * All calls originate server-side so the API key is never exposed to the browser.
 */

const BASE_URL =
  process.env.LICENSE_API_BASE_URL?.replace(/\/$/, "") ??
  "https://api.medicalsearch.licensy.ai/api/v1/medical";

const API_KEY = process.env.LICENSE_API_KEY ?? "";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SearchByLicenseParams {
  licenseNumber: string;
  /** Full state name as expected by the API, e.g. "Georgia" */
  state: string;
}

/** Raw response shape — we preserve all fields since the full schema isn't documented */
export interface RawLicenseRecord {
  [key: string]: unknown;
}

/** Normalised record returned to the frontend */
export interface LicenseRecord {
  licenseNumber: string;
  state: string;
  providerName: string | null;
  licenseType: string | null;
  status: string;
  issueDate: string | null;
  expirationDate: string | null;
  verifiedAt: string;
  raw: RawLicenseRecord;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ─── Client ───────────────────────────────────────────────────────────────────

export async function searchByLicenseNumber(
  params: SearchByLicenseParams
): Promise<LicenseRecord> {
  if (!API_KEY) {
    throw new ApiError(500, "LICENSE_API_KEY environment variable is not set.");
  }

  const url = `${BASE_URL}/search-license-by-number/`;

  // Build body exactly as shown in the API example
  const body = new URLSearchParams({
    License_Number: params.licenseNumber,
    State: params.state,
    credential_key: API_KEY,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new ApiError(response.status, parseErrorMessage(response.status, text));
  }

  const raw: RawLicenseRecord = await response.json();

  return normalizeRecord(params, raw);
}

// ─── Normalisation ────────────────────────────────────────────────────────────

/**
 * Map the raw API response to a consistent LicenseRecord shape.
 *
 * Confirmed response schema (e.g. Alabama):
 * {
 *   "Full_Name":      "Steven   Winiarski",
 *   "License_Type":   "DO",
 *   "License_Number": "2142",
 *   "Status":         "Active",
 *   "Issued":         "01/21/2020",
 *   "Expired":        "12/31/2026",
 *   "State":          "Alabama"
 * }
 */
function normalizeRecord(
  params: SearchByLicenseParams,
  raw: RawLicenseRecord
): LicenseRecord {
  return {
    licenseNumber: str(raw["License_Number"]) ?? params.licenseNumber,
    state:         str(raw["State"])          ?? params.state,
    providerName:  str(raw["Full_Name"]),
    licenseType:   str(raw["License_Type"]),
    status:        normalizeStatus(str(raw["Status"]) ?? ""),
    issueDate:     str(raw["Issued"]),
    expirationDate: str(raw["Expired"]),
    verifiedAt:    new Date().toISOString(),
    raw,
  };
}

/** Safely coerce a value to a trimmed string, or null. */
function str(val: unknown): string | null {
  if (typeof val === "string" && val.trim()) return val.trim();
  return null;
}

function normalizeStatus(raw: string): string {
  if (!raw) return "Unknown";
  const lower = raw.toLowerCase();
  if (lower === "active")          return "Active";
  if (lower === "inactive")        return "Inactive";
  if (lower === "expired")         return "Expired";
  if (lower.includes("probation")) return "Probation";
  if (lower.includes("suspend"))   return "Suspended";
  if (lower.includes("revok"))     return "Revoked";
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

function parseErrorMessage(httpStatus: number, body: string): string {
  switch (httpStatus) {
    case 400:
      return "Invalid request. Please check the license number and state.";
    case 401:
    case 403:
      return "Authentication failed. The API key may be invalid.";
    case 404:
      return "No license record found for that license number and state.";
    case 429:
      return "Too many requests. Please wait a moment and try again.";
    case 500:
    case 502:
    case 503:
      return "The license data service is temporarily unavailable. Please try again shortly.";
    default:
      return body
        ? `Unexpected error (${httpStatus}): ${body.slice(0, 200)}`
        : `Unexpected error from the license data service (HTTP ${httpStatus}).`;
  }
}
