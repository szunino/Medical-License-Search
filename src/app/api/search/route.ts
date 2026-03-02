/**
 * /api/search — Server-side proxy for medical license lookups.
 *
 * GET /api/search?licenseNumber={license}&state={full state name}
 *
 * Proxies to:
 *   POST https://api.medicalsearch.licensy.ai/api/v1/medical/search-license-by-number/
 */

import { NextRequest, NextResponse } from "next/server";
import { searchByLicenseNumber, ApiError } from "@/lib/apiClient";
import { validateSearchForm } from "@/lib/validation";
import { checkRateLimit, rateLimitHeaders } from "@/lib/rateLimit";

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);

  // ── Rate limiting ────────────────────────────────────────────────────────
  const rateResult = checkRateLimit(ip);
  const rlHeaders = rateLimitHeaders(rateResult);

  if (!rateResult.allowed) {
    console.warn(`[search] Rate limit exceeded for IP: ${ip}`);
    return NextResponse.json(
      {
        error: "Too many requests. Please wait a moment and try again.",
        retryAfter: Math.ceil((rateResult.resetAt - Date.now()) / 1000),
      },
      { status: 429, headers: { ...rlHeaders, "Content-Type": "application/json" } }
    );
  }

  // ── Input validation ─────────────────────────────────────────────────────
  const { searchParams } = new URL(request.url);
  const rawLicense = searchParams.get("licenseNumber") ?? "";
  const rawState   = searchParams.get("state") ?? "";

  const validation = validateSearchForm({ licenseNumber: rawLicense, state: rawState });

  if (!validation.valid) {
    return NextResponse.json(
      { error: "Invalid request parameters.", fieldErrors: validation.errors },
      { status: 400, headers: rlHeaders }
    );
  }

  const { licenseNumber, state } = validation.normalised!;

  // ── Server-side logging (masked) ─────────────────────────────────────────
  const maskedLicense = licenseNumber.slice(0, 2) + "***" + licenseNumber.slice(-2);
  console.info(
    `[search] ip=${ip} license=${maskedLicense} state=${state} ts=${new Date().toISOString()}`
  );

  // ── Upstream API call ────────────────────────────────────────────────────
  try {
    const record = await searchByLicenseNumber({ licenseNumber, state });

    return NextResponse.json(record, {
      status: 200,
      headers: {
        ...rlHeaders,
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300",
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    if (err instanceof ApiError) {
      const status = err.status >= 400 && err.status < 600 ? err.status : 502;
      return NextResponse.json(
        { error: err.message },
        { status, headers: { ...rlHeaders, "Cache-Control": "no-store" } }
      );
    }

    console.error("[search] Unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500, headers: { ...rlHeaders, "Cache-Control": "no-store" } }
    );
  }
}
