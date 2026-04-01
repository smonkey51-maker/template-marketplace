import { test, expect } from "@playwright/test";

/**
 * API input validation E2E tests.
 * Verifies that Zod schemas correctly reject malformed inputs.
 */
test.describe("API validation", () => {
  test.describe("/api/generate", () => {
    test("returns 401 without auth", async ({ request }) => {
      const response = await request.post("/api/generate", {
        data: { category: "ui", description: "A hero section" },
      });
      // Middleware blocks unauthenticated requests
      expect([401, 302]).toContain(response.status());
    });
  });

  test.describe("/api/customize", () => {
    test("returns 401 without auth", async ({ request }) => {
      const response = await request.post("/api/customize", {
        data: {
          templateContent: "<div>test</div>",
          category: "ui",
          instructions: "Change color to red",
        },
      });
      expect([401, 302]).toContain(response.status());
    });
  });

  test.describe("/api/reviews", () => {
    test("returns 400 for invalid rating", async ({ request }) => {
      const response = await request.post("/api/reviews", {
        data: { templateId: "hero-saas", rating: 10 },
      });
      expect(response.status()).toBe(400);
    });

    test("returns 400 for missing templateId", async ({ request }) => {
      const response = await request.post("/api/reviews", {
        data: { rating: 5 },
      });
      expect(response.status()).toBe(400);
    });
  });

  test.describe("/api/wishlist", () => {
    test("GET returns ids array (empty for unauthenticated)", async ({ request }) => {
      const response = await request.get("/api/wishlist");
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body).toHaveProperty("ids");
      expect(Array.isArray(body.ids)).toBe(true);
    });

    test("POST returns 400 for empty templateId", async ({ request }) => {
      const response = await request.post("/api/wishlist", {
        data: { templateId: "" },
      });
      expect(response.status()).toBe(400);
    });
  });
});
