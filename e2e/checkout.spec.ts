import { test, expect } from "@playwright/test";

/**
 * Checkout flow E2E tests.
 * These tests verify the UI flow up to Stripe redirect.
 * They do NOT complete real payments — use Stripe test mode.
 */
test.describe("Checkout flow", () => {
  test("preview page loads for a known template", async ({ page }) => {
    // hero-saas is the first template in lib/templates.ts
    await page.goto("/preview/hero-saas");
    await expect(page.locator("h1, h2").first()).toBeVisible();
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
