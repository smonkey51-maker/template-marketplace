import { test, expect } from "@playwright/test";

/**
 * These assertions are about what the server returns, so they use the `request`
 * fixture rather than driving a browser.
 *
 * That is not a workaround for a flaky runner — it is the split the evidence
 * showed. On CI every test using `request` passed and every test using
 * `page.goto` failed with ERR_NAME_NOT_RESOLVED, for the bare loopback address
 * as well as for "localhost", with `--no-proxy-server` already set in
 * playwright.config.ts. Chromium could not reach the server the suite had just
 * started; Node could.
 *
 * Nothing here needed a browser in the first place: a status code, an XML root
 * element and a <title> all live in the response body. Keeping them
 * browser-driven bought no coverage and cost the whole job.
 *
 * A test that genuinely needs rendering — layout, hydration, a click — should
 * still use `page`, and will need the Chromium networking problem solved first.
 */
test.describe("Home page", () => {
  test("serves the home page with the brand title", async ({ request }) => {
    // "/" carries no locale; middleware redirects to /it or /en by
    // Accept-Language. Following that redirect is part of what is checked here.
    const response = await request.get("/");
    expect(response.status()).toBe(200);
    expect(response.url()).toMatch(/\/(it|en)\/?$/);
    expect(await response.text()).toMatch(/<title>[^<]*Atelier Nove[^<]*<\/title>/i);
  });

  test("sitemap is accessible", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain("<urlset");
  });

  test("robots.txt is accessible", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
  });
});
