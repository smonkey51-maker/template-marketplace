import { test, expect } from "@playwright/test";

test.describe("Sandbox smoke", () => {
  test("home redirects to the Test page", async ({ page }) => {
    await page.goto("/it");
    await expect(page).toHaveURL(/\/it\/test$/);
    await expect(page.getByRole("heading", { level: 1, name: "Test" })).toBeVisible();
  });

  test("test-ma-di-piu renders the extra sections", async ({ page }) => {
    await page.goto("/it/test-ma-di-piu");
    await expect(page.getByRole("heading", { level: 1, name: "Test ma di più" })).toBeVisible();
    await expect(page.getByRole("table")).toBeVisible();
  });

  test("rickrolled page shows a single image", async ({ page }) => {
    await page.goto("/it/rickrolled");
    await expect(page.getByAltText("Rickrolled")).toBeVisible();
  });

  test("the environment bar is always visible", async ({ page }) => {
    await page.goto("/en/test");
    await expect(page.getByText("Test environment").first()).toBeVisible();
  });
});
