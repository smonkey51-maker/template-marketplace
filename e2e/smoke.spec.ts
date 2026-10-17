import { test, expect } from "@playwright/test";

test.describe("Smoke", () => {
  test("home renders the hero and a link to the contact page", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: "Richiedi un colloquio" }).first()).toBeVisible();
  });

  test("every public page renders a heading", async ({ page }) => {
    for (const path of [
      "/servizi",
      "/metodo",
      "/chi-siamo",
      "/contatti",
      "/area-riservata",
      "/privacy",
    ]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });

  test("the contact form shows the consent checkbox and a submit button", async ({ page }) => {
    await page.goto("/contatti");
    await expect(page.getByLabel(/Nome e cognome/)).toBeVisible();
    await expect(page.getByRole("checkbox")).toBeVisible();
    await expect(page.getByRole("button", { name: "Invia richiesta" })).toBeVisible();
  });

  test("old /it and /en links redirect to the new paths", async ({ page }) => {
    await page.goto("/it/servizi");
    await expect(page).toHaveURL(/\/servizi$/);
    await page.goto("/en");
    await expect(page).toHaveURL(/\/$/);
  });

  test("the draft bar is shown while the site is a draft", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Sito in costruzione").first()).toBeVisible();
  });
});
