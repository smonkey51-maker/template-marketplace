import { describe, it, expect } from "vitest";
import { formatPrice, getTemplate, getBundle } from "./templates";

describe("formatPrice", () => {
  it("formats cents to EUR price string", () => {
    expect(formatPrice(1299)).toMatch(/12[.,]99/);
  });

  it("formats zero cents", () => {
    expect(formatPrice(0)).toMatch(/0/);
  });
});

describe("getTemplate", () => {
  it("returns a template by id", () => {
    const t = getTemplate("hero-saas");
    expect(t).toBeDefined();
    expect(t?.id).toBe("hero-saas");
  });

  it("returns undefined for unknown id", () => {
    expect(getTemplate("non-existent-id-xyz")).toBeUndefined();
  });
});

describe("getBundle", () => {
  it("returns undefined for unknown bundle id", () => {
    expect(getBundle("non-existent-bundle")).toBeUndefined();
  });
});
