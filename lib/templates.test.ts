import { describe, it, expect } from "vitest";
import { formatPrice, getTemplate, getBundle, templates } from "./templates";

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
    // Read the id off the catalogue rather than hardcoding one — templates get
    // retired, and a stale literal here fails for a reason unrelated to getTemplate.
    const id = templates[0].id;
    const t = getTemplate(id);
    expect(t).toBeDefined();
    expect(t?.id).toBe(id);
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
