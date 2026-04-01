import { describe, it, expect } from "vitest";
import {
  generateSchema,
  customizeSchema,
  checkoutSchema,
  reviewSchema,
  wishlistSchema,
} from "@/lib/schemas";

describe("generateSchema", () => {
  it("accepts valid input", () => {
    const result = generateSchema.safeParse({ category: "ui", description: "A hero section" });
    expect(result.success).toBe(true);
  });

  it("rejects empty description", () => {
    const result = generateSchema.safeParse({ category: "ui", description: "" });
    expect(result.success).toBe(false);
  });

  it("rejects description over 2000 chars", () => {
    const result = generateSchema.safeParse({ category: "ui", description: "a".repeat(2001) });
    expect(result.success).toBe(false);
  });

  it("rejects invalid category", () => {
    const result = generateSchema.safeParse({ category: "video", description: "test" });
    expect(result.success).toBe(false);
  });

  it("accepts prompt category", () => {
    const result = generateSchema.safeParse({ category: "prompt", description: "A cold email" });
    expect(result.success).toBe(true);
  });
});

describe("customizeSchema", () => {
  it("accepts valid input", () => {
    const result = customizeSchema.safeParse({
      templateContent: "<div>hello</div>",
      category: "ui",
      instructions: "Change the color to blue",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty templateContent", () => {
    const result = customizeSchema.safeParse({
      templateContent: "",
      category: "ui",
      instructions: "change color",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty instructions", () => {
    const result = customizeSchema.safeParse({
      templateContent: "<div>hello</div>",
      category: "ui",
      instructions: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects templateContent over 50000 chars", () => {
    const result = customizeSchema.safeParse({
      templateContent: "x".repeat(50_001),
      category: "ui",
      instructions: "change color",
    });
    expect(result.success).toBe(false);
  });
});

describe("checkoutSchema", () => {
  it("accepts templateId only", () => {
    const result = checkoutSchema.safeParse({ templateId: "hero-saas" });
    expect(result.success).toBe(true);
  });

  it("accepts bundleId only", () => {
    const result = checkoutSchema.safeParse({ bundleId: "bundle-ui" });
    expect(result.success).toBe(true);
  });

  it("rejects when both are missing", () => {
    const result = checkoutSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("accepts both templateId and bundleId (refine passes)", () => {
    const result = checkoutSchema.safeParse({ templateId: "hero-saas", bundleId: "bundle-ui" });
    expect(result.success).toBe(true);
  });
});

describe("reviewSchema", () => {
  it("accepts valid review", () => {
    const result = reviewSchema.safeParse({ templateId: "hero-saas", rating: 5, comment: "Great!" });
    expect(result.success).toBe(true);
  });

  it("accepts review without comment", () => {
    const result = reviewSchema.safeParse({ templateId: "hero-saas", rating: 3 });
    expect(result.success).toBe(true);
  });

  it("rejects rating below 1", () => {
    const result = reviewSchema.safeParse({ templateId: "hero-saas", rating: 0 });
    expect(result.success).toBe(false);
  });

  it("rejects rating above 5", () => {
    const result = reviewSchema.safeParse({ templateId: "hero-saas", rating: 6 });
    expect(result.success).toBe(false);
  });

  it("rejects comment over 1000 chars", () => {
    const result = reviewSchema.safeParse({ templateId: "hero-saas", rating: 4, comment: "x".repeat(1001) });
    expect(result.success).toBe(false);
  });
});

describe("wishlistSchema", () => {
  it("accepts valid templateId", () => {
    const result = wishlistSchema.safeParse({ templateId: "hero-saas" });
    expect(result.success).toBe(true);
  });

  it("rejects missing templateId", () => {
    const result = wishlistSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("rejects empty templateId", () => {
    const result = wishlistSchema.safeParse({ templateId: "" });
    expect(result.success).toBe(false);
  });
});
