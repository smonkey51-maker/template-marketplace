import { test, expect } from "@playwright/test";

/**
 * Checkout flow E2E tests.
 * These tests verify the UI flow up to Stripe redirect.
 * They do NOT complete real payments — use Stripe test mode.
 */
test.describe("Checkout flow", () => {
  // `request`, not `page`, for the reason set out at the top of home.spec.ts:
  // browser-driven navigation cannot reach the suite's own server on CI.
  //
  // The assertion is also stricter than the one it replaces. "Some heading is
  // visible" was satisfied by the not-found page, which is exactly the state
  // every product page was in on the live site: 200, a heading, and the words
  // "Template non trovato", because the page read the database directly and the
  // row was missing. Naming the product is what makes the test able to tell a
  // working page from a polite failure.
  test("preview page shows the product, not a not-found page", async ({ request }) => {
    const response = await request.get("/it/preview/chatgpt-prompt-library-freelancers");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("Libreria di Prompt ChatGPT");
    expect(body).not.toContain("Template non trovato");
  });

  test("checkout API rejects missing body with 400", async ({ request }) => {
    const response = await request.post("/api/checkout", {
      data: {},
    });
    expect(response.status()).toBe(400);
  });

  test("checkout API rejects unknown templateId with 404", async ({ request }) => {
    const response = await request.post("/api/checkout", {
      data: { templateId: "nonexistent-template-xyz" },
    });
    expect(response.status()).toBe(404);
  });
});
