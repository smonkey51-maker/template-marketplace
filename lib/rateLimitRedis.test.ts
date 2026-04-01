import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("rateLimitRedis", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
  });

  it("falls back to in-memory limiter when env vars are missing", async () => {
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;

    const { rateLimitRedis } = await import("@/lib/rateLimitRedis");
    // First request should be allowed
    const result = await rateLimitRedis("test:fallback", 10, 60_000);
    expect(result).toBe(true);
  });

  it("uses Upstash when env vars are present and returns allowed result", async () => {
    process.env.UPSTASH_REDIS_REST_URL = "https://test.upstash.io";
    process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";

    vi.mock("@upstash/ratelimit", () => ({
      Ratelimit: Object.assign(
        vi.fn().mockImplementation(() => ({
          limit: vi.fn().mockResolvedValue({ success: true }),
        })),
        {
          slidingWindow: vi.fn().mockReturnValue("sliding-window-limiter"),
        }
      ),
    }));

    vi.mock("@upstash/redis", () => ({
      Redis: {
        fromEnv: vi.fn().mockReturnValue({}),
      },
    }));

    const { rateLimitRedis } = await import("@/lib/rateLimitRedis");
    const result = await rateLimitRedis("test:upstash", 10, 60_000);
    expect(result).toBe(true);
  });

  it("fails open when Upstash throws", async () => {
    process.env.UPSTASH_REDIS_REST_URL = "https://test.upstash.io";
    process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";

    vi.mock("@upstash/ratelimit", () => ({
      Ratelimit: Object.assign(
        vi.fn().mockImplementation(() => ({
          limit: vi.fn().mockRejectedValue(new Error("connection refused")),
        })),
        {
          slidingWindow: vi.fn().mockReturnValue("sliding-window-limiter"),
        }
      ),
    }));

    vi.mock("@upstash/redis", () => ({
      Redis: {
        fromEnv: vi.fn().mockReturnValue({}),
      },
    }));

    const { rateLimitRedis } = await import("@/lib/rateLimitRedis");
    // Should fail open (return true) on Redis error
    const result = await rateLimitRedis("test:fail-open", 10, 60_000);
    expect(result).toBe(true);
  });
});
