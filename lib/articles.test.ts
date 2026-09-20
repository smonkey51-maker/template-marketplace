import { describe, it, expect } from "vitest";
import {
  articles,
  getArticle,
  getArticlesByCategory,
  getAllArticlesSorted,
  getRelatedArticles,
  getDossierArticles,
  getGuideArticles,
  ARTICLE_CATEGORIES,
} from "./articles";

describe("articles data", () => {
  it("has at least six articles", () => {
    expect(articles.length).toBeGreaterThanOrEqual(6);
  });

  it("every article has a unique slug", () => {
    const slugs = articles.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every article has non-empty IT and EN content", () => {
    for (const a of articles) {
      expect(a.it.title.length).toBeGreaterThan(0);
      expect(a.en.title.length).toBeGreaterThan(0);
      expect(a.it.body.length).toBeGreaterThan(200);
      expect(a.en.body.length).toBeGreaterThan(200);
      expect(ARTICLE_CATEGORIES).toContain(a.category);
    }
  });

  it("includes all four categories", () => {
    for (const category of ARTICLE_CATEGORIES) {
      expect(articles.some((a) => a.category === category)).toBe(true);
    }
  });

  it("has at least two dossier (person-tagged) articles", () => {
    expect(getDossierArticles().length).toBeGreaterThanOrEqual(2);
  });

  it("has at least one guide-flagged article", () => {
    expect(getGuideArticles().length).toBeGreaterThanOrEqual(1);
  });
});

describe("getArticle", () => {
  it("returns the article for a valid slug", () => {
    const first = articles[0];
    expect(getArticle(first.slug)?.slug).toBe(first.slug);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getArticle("does-not-exist")).toBeUndefined();
  });
});

describe("getArticlesByCategory", () => {
  it("only returns articles of the requested category", () => {
    const result = getArticlesByCategory("mentalismo");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((a) => a.category === "mentalismo")).toBe(true);
  });
});

describe("getAllArticlesSorted", () => {
  it("returns all articles sorted by publish date descending", () => {
    const sorted = getAllArticlesSorted();
    expect(sorted.length).toBe(articles.length);
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].publishedAt >= sorted[i].publishedAt).toBe(true);
    }
  });
});

describe("getRelatedArticles", () => {
  it("never includes the current article", () => {
    const current = articles[0];
    const related = getRelatedArticles(current);
    expect(related.every((a) => a.slug !== current.slug)).toBe(true);
  });

  it("prefers the same category first", () => {
    const current = articles.find((a) => a.category === "mentalismo")!;
    const related = getRelatedArticles(current, 2);
    expect(related[0]?.category).toBe("mentalismo");
  });

  it("respects the limit", () => {
    const related = getRelatedArticles(articles[0], 2);
    expect(related.length).toBeLessThanOrEqual(2);
  });
});
