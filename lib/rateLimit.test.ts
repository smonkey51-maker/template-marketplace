import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { rateLimit } from "./rateLimit";

describe("rateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows requests within the limit", () => {
    expect(rateLimit("test-key-1", 3, 60_000)).toBe(true);
    expect(rateLimit("test-key-1", 3, 60_000)).toBe(true);
    expect(rateLimit("test-key-1", 3, 60_000)).toBe(true);
  });

  it("blocks requests that exceed the limit", () => {
    rateLimit("test-key-2", 2, 60_000);
    rateLimit("test-key-2", 2, 60_000);
    expect(rateLimit("test-key-2", 2, 60_000)).toBe(false);
  });

  it("resets after the window expires", () => {
    rateLimit("test-key-3", 1, 60_000);
    expect(rateLimit("test-key-3", 1, 60_000)).toBe(false);
    vi.advanceTimersByTime(61_000);
    expect(rateLimit("test-key-3", 1, 60_000)).toBe(true);
  });

  it("tracks different keys independently", () => {
    rateLimit("key-a", 1, 60_000);
    expect(rateLimit("key-a", 1, 60_000)).toBe(false);
    expect(rateLimit("key-b", 1, 60_000)).toBe(true);
  });
});
