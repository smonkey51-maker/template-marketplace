import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads and shows template grid", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Forma/i);
    // Template grid should be visible
    await expect(page.locator("main")).toBeVisible();
  });

  test("sitemap is accessible", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);
    const body = await page.content();
    expect(body).toContain("<urlset");
  });

  test("robots.txt is accessible", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    expect(response?.status()).toBe(200);
  });
});
