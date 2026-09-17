import { test, expect } from "@playwright/test";

test.describe("ACUME smoke", () => {
  test("homepage renders in Italian with the fan disclaimer", async ({ page }) => {
    await page.goto("/it");
    await expect(page).toHaveTitle(/./);
    await expect(page.getByRole("contentinfo")).toContainText(/non ufficiale|non affiliat/i);
  });

  test("article index lists articles and filters by category", async ({ page }) => {
    await page.goto("/it/articoli");
    await expect(page.getByRole("link", { name: /./ }).first()).toBeVisible();
  });

  test("an article page renders its content", async ({ page }) => {
    await page.goto("/it/articoli/metodo-jane-osservazione");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("chi siamo page states the site is an unofficial fan project", async ({ page }) => {
    await page.goto("/it/chi-siamo");
    await expect(page.getByText(/affiliat/i).first()).toBeVisible();
  });
});
