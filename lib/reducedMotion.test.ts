import { describe, it, expect, vi, afterEach } from "vitest";
import { prefersReducedMotion, motionDuration } from "./reducedMotion";

/**
 * jsdom has no real media query engine — `matchMedia` is stubbed in
 * vitest.setup.ts and always reports `matches: false`. So each test installs
 * its own, which is also the only honest way to test the "reduce" branch.
 */
function stubMatchMedia(matches: boolean) {
  const spy = vi.fn().mockReturnValue({ matches });
  vi.stubGlobal("matchMedia", spy);
  return spy;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("prefersReducedMotion", () => {
  it("is false when the visitor has not asked for reduced motion", () => {
    stubMatchMedia(false);
    expect(prefersReducedMotion()).toBe(false);
  });

  it("is true when they have", () => {
    stubMatchMedia(true);
    expect(prefersReducedMotion()).toBe(true);
  });

  it("asks for the reduce query specifically", () => {
    const spy = stubMatchMedia(true);
    prefersReducedMotion();
    expect(spy).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
  });

  it("is false rather than throwing where matchMedia does not exist", () => {
    vi.stubGlobal("matchMedia", undefined);
    expect(prefersReducedMotion()).toBe(false);
  });
});

describe("motionDuration", () => {
  it("passes the duration through when motion is fine", () => {
    stubMatchMedia(false);
    expect(motionDuration(0.3)).toBe(0.3);
  });

  it("collapses to zero when it is not", () => {
    stubMatchMedia(true);
    expect(motionDuration(0.3)).toBe(0);
  });

  it("collapses to zero — not to undefined — so gsap still fires onComplete", () => {
    stubMatchMedia(true);
    // The sheet close unmounts from onComplete; a missing duration would make
    // gsap fall back to its 0.5s default instead of finishing immediately.
    expect(motionDuration(0.3)).not.toBeUndefined();
    expect(typeof motionDuration(0.3)).toBe("number");
  });
});
