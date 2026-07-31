import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// vi.mock calls are hoisted above everything else in the file regardless of
// where they're written, so the module-mock factory must be declared once,
// here, rather than differently inside each `it` — two hoisted vi.mock calls
// for the same specifier collapse into whichever one runs last, which meant
// the "uses Upstash" test below was silently exercising the same mock as the
// "fails open" test (both return `true`, so the wrong assertion still passed).
// `limitMock` is the one piece each test reconfigures per-case.
const { limitMock } = vi.hoisted(() => ({ limitMock: vi.fn() }));

vi.mock("@upstash/ratelimit", () => ({
  // `rateLimitRedis.ts` does `new Ratelimit(...)`, so the mock implementation
  // must itself be constructible — an arrow function throws "is not a
  // constructor" the moment `new` touches it.
  Ratelimit: Object.assign(
    vi.fn().mockImplementation(function () {
      return { limit: limitMock };
    }),
    { slidingWindow: vi.fn().mockReturnValue("sliding-window-limiter") },
  ),
}));

vi.mock("@upstash/redis", () => ({
  Redis: { fromEnv: vi.fn().mockReturnValue({}) },
}));

describe("rateLimitRedis", () => {
  beforeEach(() => {
    vi.resetModules();
    limitMock.mockReset();
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
    expect(limitMock).not.toHaveBeenCalled();
  });

  it("uses Upstash when env vars are present and returns allowed result", async () => {
    process.env.UPSTASH_REDIS_REST_URL = "https://test.upstash.io";
    process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";
    limitMock.mockResolvedValue({ success: true });

    const { rateLimitRedis } = await import("@/lib/rateLimitRedis");
    const result = await rateLimitRedis("test:upstash", 10, 60_000);
    expect(result).toBe(true);
    expect(limitMock).toHaveBeenCalledOnce();
  });

  it("fails open when Upstash throws", async () => {
    process.env.UPSTASH_REDIS_REST_URL = "https://test.upstash.io";
    process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";
    limitMock.mockRejectedValue(new Error("connection refused"));

    const { rateLimitRedis } = await import("@/lib/rateLimitRedis");
    // Should fail open (return true) on Redis error
    const result = await rateLimitRedis("test:fail-open", 10, 60_000);
    expect(result).toBe(true);
    expect(limitMock).toHaveBeenCalledOnce();
  });
});
