/**
 * Unit tests for the /api/search route handler.
 *
 * We test the route handler's input validation, rate limiting integration,
 * and response shaping by mocking the underlying dependencies.
 *
 * Note: The upstream API call itself is tested via the apiClient module;
 * here we focus on the proxy layer logic.
 */

import { NextRequest, NextResponse } from "next/server";

// ─── Module mocks ─────────────────────────────────────────────────────────────

jest.mock("../src/lib/apiClient", () => ({
  verifyLicense: jest.fn(),
  ApiError: class ApiError extends Error {
    constructor(
      public readonly status: number,
      message: string
    ) {
      super(message);
      this.name = "ApiError";
    }
  },
}));

jest.mock("../src/lib/rateLimit", () => ({
  checkRateLimit: jest.fn(),
  rateLimitHeaders: jest.fn(),
}));

import { verifyLicense, ApiError } from "../src/lib/apiClient";
import { checkRateLimit, rateLimitHeaders } from "../src/lib/rateLimit";
import { GET } from "../src/app/api/search/route";

const mockVerifyLicense = verifyLicense as jest.MockedFunction<typeof verifyLicense>;
const mockCheckRateLimit = checkRateLimit as jest.MockedFunction<typeof checkRateLimit>;
const mockRateLimitHeaders = rateLimitHeaders as jest.MockedFunction<typeof rateLimitHeaders>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeRequest(params: Record<string, string> = {}): NextRequest {
  const url = new URL("http://localhost:3000/api/search");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return new NextRequest(url.toString());
}

const RATE_OK = {
  allowed: true,
  remaining: 19,
  resetAt: Date.now() + 60000,
};

const RATE_BLOCKED = {
  allowed: false,
  remaining: 0,
  resetAt: Date.now() + 30000,
};

const MOCK_HEADERS = {
  "X-RateLimit-Limit": "20",
  "X-RateLimit-Remaining": "19",
  "X-RateLimit-Reset": "9999999999",
  "Retry-After": "0",
};

// ─── Tests ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  jest.clearAllMocks();
  mockCheckRateLimit.mockReturnValue(RATE_OK);
  mockRateLimitHeaders.mockReturnValue(MOCK_HEADERS);
});

describe("GET /api/search", () => {
  describe("rate limiting", () => {
    test("returns 429 when rate limit is exceeded", async () => {
      mockCheckRateLimit.mockReturnValue(RATE_BLOCKED);
      mockRateLimitHeaders.mockReturnValue({
        ...MOCK_HEADERS,
        "X-RateLimit-Remaining": "0",
        "Retry-After": "30",
      });

      const req = makeRequest({ npi: "1234567890" });
      const res = await GET(req);

      expect(res.status).toBe(429);
      const body = await res.json();
      expect(body.error).toBeTruthy();
    });
  });

  describe("input validation", () => {
    test("returns 400 when NPI is missing", async () => {
      const req = makeRequest({});
      const res = await GET(req);
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toBeTruthy();
    });

    test("returns 400 when NPI is invalid (not 10 digits)", async () => {
      const req = makeRequest({ npi: "12345" });
      const res = await GET(req);
      expect(res.status).toBe(400);
    });

    test("returns 400 when NPI contains letters", async () => {
      const req = makeRequest({ npi: "123456789A" });
      const res = await GET(req);
      expect(res.status).toBe(400);
    });

    test("returns 400 when state is invalid", async () => {
      const req = makeRequest({ npi: "1234567890", state: "XX" });
      const res = await GET(req);
      expect(res.status).toBe(400);
    });
  });

  describe("successful lookups", () => {
    const mockRecord = {
      npi: "1234567890",
      state: "CA",
      status: "Active",
      expirationDate: "2026-01-01",
      rawStatus: "active",
      verifiedAt: new Date().toISOString(),
    };

    test("returns 200 with licence record on success", async () => {
      mockVerifyLicense.mockResolvedValue(mockRecord);

      const req = makeRequest({ npi: "1234567890", state: "CA" });
      const res = await GET(req);

      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.npi).toBe("1234567890");
      expect(body.status).toBe("Active");
    });

    test("passes state to verifyLicense when provided", async () => {
      mockVerifyLicense.mockResolvedValue(mockRecord);

      const req = makeRequest({ npi: "1234567890", state: "ca" });
      await GET(req);

      expect(mockVerifyLicense).toHaveBeenCalledWith({
        npi: "1234567890",
        state: "CA",
      });
    });

    test("passes undefined state when not provided", async () => {
      mockVerifyLicense.mockResolvedValue({ ...mockRecord, state: "CA" });

      const req = makeRequest({ npi: "1234567890" });
      await GET(req);

      expect(mockVerifyLicense).toHaveBeenCalledWith({
        npi: "1234567890",
        state: undefined,
      });
    });
  });

  describe("error handling", () => {
    test("returns 404 when ApiError with 404 status is thrown", async () => {
      const { ApiError: MockApiError } = jest.requireMock("../src/lib/apiClient");
      mockVerifyLicense.mockRejectedValue(
        new MockApiError(404, "No record found.")
      );

      const req = makeRequest({ npi: "1234567890" });
      const res = await GET(req);

      expect(res.status).toBe(404);
      const body = await res.json();
      expect(body.error).toContain("No record found");
    });

    test("returns 429 when ApiError with 429 status is thrown", async () => {
      const { ApiError: MockApiError } = jest.requireMock("../src/lib/apiClient");
      mockVerifyLicense.mockRejectedValue(
        new MockApiError(429, "Rate limit reached.")
      );

      const req = makeRequest({ npi: "1234567890" });
      const res = await GET(req);

      expect(res.status).toBe(429);
    });

    test("returns 500 on unexpected errors", async () => {
      mockVerifyLicense.mockRejectedValue(new Error("Network failure"));

      const req = makeRequest({ npi: "1234567890" });
      const res = await GET(req);

      expect(res.status).toBe(500);
      const body = await res.json();
      expect(body.error).toBeTruthy();
    });
  });
});
