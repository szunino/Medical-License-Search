/**
 * Simple in-memory IP rate limiter for Next.js route handlers.
 *
 * This is a lightweight solution suitable for single-instance deployments
 * (e.g., a single Vercel serverless function region). For multi-region
 * deployments, replace with a Redis-backed store such as @upstash/ratelimit.
 *
 * Configuration via environment variables:
 *   RATE_LIMIT_MAX              — max requests per window (default: 20)
 *   RATE_LIMIT_WINDOW_SECONDS   — window size in seconds (default: 60)
 */

interface RateLimitEntry {
  count: number;
  resetAt: number; // Unix timestamp (ms)
}

// Module-level map persists across warm lambda invocations
const store = new Map<string, RateLimitEntry>();

const MAX = parseInt(process.env.RATE_LIMIT_MAX ?? "20", 10);
const WINDOW_MS =
  parseInt(process.env.RATE_LIMIT_WINDOW_SECONDS ?? "60", 10) * 1000;

/** Periodically prune expired entries to prevent unbounded growth */
function pruneExpired(): void {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) store.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Check whether the given identifier (IP address) is within its rate limit.
 * Call this at the top of your route handler and return 429 if !allowed.
 */
export function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now();

  // Prune ~1% of the time to avoid O(n) work on every request
  if (Math.random() < 0.01) pruneExpired();

  const entry = store.get(identifier);

  if (!entry || entry.resetAt <= now) {
    // New window
    const resetAt = now + WINDOW_MS;
    store.set(identifier, { count: 1, resetAt });
    return { allowed: true, remaining: MAX - 1, resetAt };
  }

  if (entry.count >= MAX) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return { allowed: true, remaining: MAX - entry.count, resetAt: entry.resetAt };
}

/**
 * Build rate-limit response headers (compatible with IETF draft-polli-ratelimit-headers).
 */
export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    "X-RateLimit-Limit": String(MAX),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
    "Retry-After": result.allowed
      ? "0"
      : String(Math.ceil((result.resetAt - Date.now()) / 1000)),
  };
}
