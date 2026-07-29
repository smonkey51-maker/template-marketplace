import { rateLimit } from "@/lib/rateLimit";

/**
 * Redis-backed sliding-window rate limiter using Upstash.
 * Falls back to the in-memory limiter when Upstash env vars are not configured
 * (e.g. local development without Redis).
 *
 * Requires env vars:
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 *
 * Returns true if the request is allowed, false if rate-limited.
 */
export async function rateLimitRedis(
  key: string,
  limit: number,
  windowMs: number,
): Promise<boolean> {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    // Fallback: in-memory limiter for local dev
    return rateLimit(key, limit, windowMs);
  }

  try {
    const { Ratelimit } = await import("@upstash/ratelimit");
    const { Redis } = await import("@upstash/redis");

    const redis = Redis.fromEnv();
    const windowSeconds = Math.ceil(windowMs / 1000);
    const ratelimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
      prefix: "forma:rl",
    });

    const { success } = await ratelimiter.limit(key);
    return success;
  } catch {
    // If Redis is unreachable, fail open (allow the request)
    return true;
  }
}
