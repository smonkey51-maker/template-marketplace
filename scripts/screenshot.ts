/**
 * Screenshot a real page of the site, without the browser touching the network.
 *
 * Why this is not just `page.goto(url)`: in the sandbox this repo is worked on
 * from, Chromium cannot open a connection to anything — not the public site,
 * not a server on localhost. Every attempt ends in ERR_CONNECTION_RESET or a
 * timeout, with or without --no-sandbox, with or without the proxy. `curl` and
 * Node reach the same URLs happily, so the network is fine; the browser is
 * isolated from it. That is also why the e2e suite's `page.goto` tests were
 * converted to the `request` fixture.
 *
 * But Chromium *renders* perfectly well — scripts/generate-thumbs.ts has been
 * relying on that for a while. So the page is fetched with Node, assembled into
 * one self-contained document, and handed to the browser in memory. Every
 * request the page then tries to make is served from disk or refused, so
 * nothing needs to leave the process.
 *
 * What comes out is the real production page, not a mock: same markup, same
 * stylesheet, same thumbnails.
 *
 * Usage:
 *   npx tsx scripts/screenshot.ts /it/catalogo
 *   npx tsx scripts/screenshot.ts /it/catalogo --desktop
 *   npx tsx scripts/screenshot.ts /it/catalogo --full --out shots/catalogo.png
 *   npx tsx scripts/screenshot.ts /it/catalogo --base http://127.0.0.1:3000
 *
 * Output goes to screenshots/ by default, which is gitignored — these are for
 * looking at, not for committing.
 */

import { chromium } from "playwright";
import { existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const DEFAULT_BASE = process.env.SCREENSHOT_BASE ?? "https://template-marketplace-psi.vercel.app";

/**
 * Playwright insists on the exact Chromium build its version pins, and refuses
 * to start if that build was never downloaded. Some sandboxes ship a Chromium
 * that is a few builds older and have no way to fetch another one, so the
 * screenshot tool became unusable there for a reason that has nothing to do
 * with the site. Set CHROMIUM_PATH to override which binary is launched — e.g.
 * CHROMIUM_PATH=/opt/pw-browsers/chromium. Unset, nothing changes.
 */
function executablePath(): string | undefined {
  const candidate = process.env.CHROMIUM_PATH;
  return candidate && existsSync(candidate) ? candidate : undefined;
}

/** iPhone-ish and laptop-ish. The two shapes worth checking every time. */
const VIEWPORTS = {
  mobile: { width: 390, height: 844 },
  desktop: { width: 1440, height: 900 },
};

function arg(flag: string): string | undefined {
  const i = process.argv.indexOf(flag);
  return i === -1 ? undefined : process.argv[i + 1];
}

async function main() {
  const path = process.argv[2];
  if (!path || path.startsWith("--")) {
    console.error(
      "Usage: npx tsx scripts/screenshot.ts /it/catalogo [--desktop] [--full] [--out f.png]",
    );
    process.exit(1);
  }

  const base = arg("--base") ?? DEFAULT_BASE;
  const viewport = process.argv.includes("--desktop") ? VIEWPORTS.desktop : VIEWPORTS.mobile;
  const fullPage = process.argv.includes("--full");
  const out =
    arg("--out") ??
    join(
      "screenshots",
      `${path.replace(/^\//, "").replace(/\//g, "-") || "home"}-${process.argv.includes("--desktop") ? "desktop" : "mobile"}.png`,
    );

  // Fetched with Node, which can reach the network.
  const res = await fetch(base + path);
  if (!res.ok) throw new Error(`${base}${path} answered ${res.status}`);
  let html = await res.text();

  const cssHref = html.match(/href="(\/_next\/static\/[^"]+\.css)"/)?.[1];
  const css = cssHref ? await (await fetch(base + cssHref)).text() : "";

  // The stylesheet is inlined and the scripts dropped. Without JavaScript the
  // page is its server-rendered self, which is the honest thing to look at
  // anyway: it is what a visitor sees before hydration, and this site renders
  // its catalogue server-side on purpose.
  html = html
    .replace(/<link[^>]*rel="stylesheet"[^>]*>/g, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/g, "")
    .replace("</head>", `<style>${css}</style></head>`);

  const browser = await chromium.launch({ executablePath: executablePath() });
  const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });

  // The page is given a real origin rather than being injected with
  // setContent. A setContent document has an about:blank origin, and Chromium
  // forbids that origin from loading file:// subresources — so every product
  // thumbnail failed and the page looked broken in a way the real site is not.
  // With an origin, "/thumbs/x.webp" resolves normally; the route handler below
  // answers it from disk before any socket is opened, so this host never has to
  // exist.
  const ORIGIN = "http://forma.local";

  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());

    if (url.origin === ORIGIN && url.pathname === "/") {
      return route.fulfill({ contentType: "text/html; charset=utf-8", body: html });
    }
    for (const dir of ["public", ".next"]) {
      const file = join(process.cwd(), dir, url.pathname.replace(/^\/_next/, ""));
      if (existsSync(file) && !file.endsWith("/")) return route.fulfill({ path: file });
    }

    // Anything else same-origin is a route the server has to answer — the
    // product pages embed /api/preview/<id> in an iframe. Aborting those left a
    // full-width broken-image placeholder in the middle of every preview panel,
    // which reads as a broken page when the endpoint is in fact fine. Node can
    // reach the server even though the browser cannot, so fetch it here and
    // hand the bytes back.
    if (url.origin === ORIGIN) {
      try {
        const upstream = await fetch(base + url.pathname + url.search);
        return route.fulfill({
          status: upstream.status,
          contentType: upstream.headers.get("content-type") ?? undefined,
          body: Buffer.from(await upstream.arrayBuffer()),
        });
      } catch {
        return route.abort();
      }
    }

    return route.abort();
  });

  await page.goto(ORIGIN + "/", { waitUntil: "domcontentloaded" });
  // The wordmark animates its letters in over ~1.8s. Screenshotting sooner
  // catches a half-drawn logo and reads as a rendering bug that is not there.
  await page.waitForTimeout(2200);

  // Every thumbnail below the fold is loading="lazy", so a --full screenshot
  // taken straight away shows ten empty grey boxes on /catalogo and looks like
  // the images are broken. They are not — they were simply never asked for.
  // Walking the page one viewport at a time puts each of them on screen long
  // enough for the request to start. The walk deliberately does not scroll back
  // to the top afterwards: Chromium cancels the in-flight fetch for an image
  // that leaves the viewport again, which left the last card on /catalogo
  // empty. Playwright handles scrolling itself when it captures a full page.
  if (fullPage) {
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 150));
      }
    });
    // Give the last images kicked off by the walk time to arrive and decode.
    await page.waitForLoadState("networkidle").catch(() => {});
    await page.waitForTimeout(600);
  }

  mkdirSync(dirname(out), { recursive: true });
  await page.screenshot({ path: out, fullPage });
  await browser.close();

  console.log(
    `${base}${path}  →  ${out}  (${viewport.width}×${viewport.height}${fullPage ? ", full page" : ""})`,
  );
}

main().catch((err) => {
  console.error("Screenshot failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
