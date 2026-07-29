import { defineConfig, devices } from "@playwright/test";

// 127.0.0.1, not localhost: on the CI runner Chromium fails to resolve
// "localhost" and every page.goto died with ERR_NAME_NOT_RESOLVED, while the
// request-fixture tests — which don't go through the browser's network stack —
// passed. The loopback address sidesteps name resolution entirely.
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    baseURL: BASE_URL,
    // The suite only ever talks to the server started below, so send Chromium
    // straight there. Without this it routes even 127.0.0.1 through whatever
    // proxy the environment configures and every page.goto fails with
    // ERR_NAME_NOT_RESOLVED — note that happens for the bare IP too, so it is
    // the proxy rather than name resolution. The request-fixture tests were
    // unaffected, which is why only the browser-driven ones were failing.
    launchOptions: { args: ["--no-proxy-server"] },
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // Playwright starts the server itself in both environments. Previously CI got
  // `undefined` here, so it expected something to already be listening on :3000
  // — nothing ever was, which is one reason the suite could never have passed
  // on a runner. CI runs the production build (the workflow builds first);
  // locally it runs the dev server.
  webServer: {
    command: process.env.CI ? "npm start" : "npm run dev",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
