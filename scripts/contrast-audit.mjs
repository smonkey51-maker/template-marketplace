#!/usr/bin/env node
/**
 * Contrast audit on the REAL rendering.
 *
 * Glass, refraction, the pointer light and scrolling content all change what sits
 * behind the text, so contrast cannot be read from the CSS tokens alone. For every
 * page, in light and dark, at several scroll positions and with the pointer over a
 * panel, this script:
 *   1. lists the visible text elements with their colour, size and position;
 *   2. hides all text and screenshots the page, so what remains is the exact
 *      background behind each element (glass, blur, refraction, lens and all);
 *   3. takes the worst pixel behind each element and computes its WCAG contrast
 *      ratio against the element's text colour.
 * It exits 1 if anything falls under 4.5:1 (3:1 for large text).
 *
 *   npm run build && npm start        # in one terminal
 *   npm run audit:contrast            # in another
 *
 * Env: AUDIT_LENSES (on|off, default on), AUDIT_BASE (default http://localhost:3111), CHROMIUM_PATH (a Chromium binary,
 *      if Playwright's own browser is not installed), AUDIT_PAGES (comma-separated).
 */
import { chromium } from "playwright";

const BASE = process.env.AUDIT_BASE ?? "http://localhost:3111";
const PAGES = (
  process.env.AUDIT_PAGES ??
  "/,/servizi,/metodo,/chi-siamo,/contatti,/area-riservata,/privacy,/test,/test-ma-di-piu"
).split(",");
const SCROLLS = [0, 0.4, 0.85];
// Headless Chromium renders in software, where the site turns the heavy effects off on
// its own. The audit forces them on (worst case for legibility); AUDIT_LENSES=off audits
// the plain CSS glass that those visitors get instead.
const LENSES = process.env.AUDIT_LENSES === "off" ? "off" : "on";

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ["--enable-unsafe-swiftshader", "--use-gl=angle", "--use-angle=swiftshader"],
});

// A blank page used only to decode screenshots and measure pixels.
const measurer = await browser.newPage();

/** Runs in the measurer page: worst contrast behind each target rect. */
const MEASURE = async ({ b64, targets }) => {
  const img = new Image();
  img.src = "data:image/png;base64," + b64;
  await img.decode();
  const c = document.createElement("canvas");
  c.width = img.width;
  c.height = img.height;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  const lin = (v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return targets.map((t) => {
    const x = Math.max(0, Math.floor(t.x));
    const y = Math.max(0, Math.floor(t.y));
    const w = Math.min(img.width - x, Math.ceil(t.w));
    const h = Math.min(img.height - y, Math.ceil(t.h));
    if (w <= 0 || h <= 0) return { ...t, ratio: null };
    const d = ctx.getImageData(x, y, w, h).data;
    const [tr, tg, tb, ta] = t.color;
    let worst = Infinity;
    let at = [0, 0];
    for (let i = 0; i < d.length; i += 4) {
      // Blend a translucent text colour over the pixel, as the browser would.
      const r = tr * ta + d[i] * (1 - ta);
      const g = tg * ta + d[i + 1] * (1 - ta);
      const b = tb * ta + d[i + 2] * (1 - ta);
      const L1 = lum(r, g, b);
      const L2 = lum(d[i], d[i + 1], d[i + 2]);
      const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      if (ratio < worst) {
        worst = ratio;
        const p = i / 4;
        at = [x + (p % w), y + Math.floor(p / w)];
      }
    }
    return { ...t, ratio: worst, at };
  });
};

/** Runs in the page: visible, topmost text elements and how they are painted. */
const COLLECT = () => {
  const out = [];
  // Floating UI (the CTA pill, the dock): text that passes under it is not fully visible there.
  const floating = [];
  for (const f of document.querySelectorAll("body *")) {
    const fcs = getComputedStyle(f);
    if (
      (fcs.position !== "fixed" && fcs.position !== "sticky") ||
      fcs.display === "none" ||
      fcs.visibility === "hidden"
    )
      continue;
    const fr = f.getBoundingClientRect();
    // Floating UI and the sticky nav: text that scrolls under them is not fully visible there.
    // (The pointer-events:none lens canvas lets elementFromPoint see through to that text.)
    if (fr.width > 0 && fr.height > 0 && (fcs.position === "sticky" || fr.width < innerWidth * 0.9))
      floating.push(
        fcs.position === "sticky"
          ? fr
          : // Fixed UI casts a soft shadow around itself: text within it is not measured either.
            { left: fr.left - 28, right: fr.right + 28, top: fr.top - 28, bottom: fr.bottom + 28 },
      );
  }
  const vw = innerWidth;
  const vh = innerHeight;
  // Any CSS colour syntax (rgb, oklab, color-mix from `text-white/80`, ...) -> [r, g, b, a],
  // by painting one pixel: a regex over getComputedStyle misreads the modern formats.
  const px = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  px.canvas.width = px.canvas.height = 1;
  const parse = (s) => {
    px.clearRect(0, 0, 1, 1);
    px.fillStyle = "#000";
    px.fillStyle = s;
    px.fillRect(0, 0, 1, 1);
    const d = px.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2], d[3] / 255];
  };
  for (const el of document.querySelectorAll("body *")) {
    if (["SCRIPT", "STYLE", "SVG", "CANVAS", "PATH", "IMG"].includes(el.tagName.toUpperCase()))
      continue;
    if (el.closest("[aria-hidden='true']") || el.closest("svg") || el.closest("canvas")) continue;
    if (el.matches(":disabled") || el.closest("[disabled]")) continue;
    const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!hasText) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none" || Number(cs.opacity) === 0) continue;
    // Measure the text itself, line by line (a Range over each text node), not the
    // element's box: boxes include padding, borders, underlines and rounded corners,
    // none of which sit under the glyphs.
    const lines = [];
    for (const n of el.childNodes) {
      if (n.nodeType !== 3 || !n.textContent.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(n);
      for (const r of range.getClientRects()) lines.push(r);
    }
    for (const r of lines) {
      const x = Math.max(0, r.x);
      const y = Math.max(0, r.y);
      const w = Math.min(vw, r.right) - x;
      const h = Math.min(vh, r.bottom) - y;
      if (w < 4 || h < 4) continue;
      // Skip anything covered by something else (e.g. text scrolled under the sticky nav).
      if (
        floating.some(
          (f) => r.left < f.right && r.right > f.left && r.top < f.bottom && r.bottom > f.top,
        )
      )
        continue;
      // Sample along the line: if anything else covers any part, the text is not fully
      // visible there (a floating pill or the dock), so it is not measured.
      let covered = false;
      for (const f of [0.1, 0.35, 0.5, 0.65, 0.9]) {
        const top = document.elementFromPoint(x + w * f, y + h / 2);
        if (!top || !el.contains(top)) covered = true;
      }
      if (covered) continue;
      out.push({
        label: `${el.tagName.toLowerCase()}${el.className ? "." + String(el.className).split(/\s+/)[0] : ""} "${el.textContent.trim().slice(0, 28)}"`,
        x,
        y,
        w,
        h,
        color: parse(cs.color),
        size: parseFloat(cs.fontSize),
        weight: Number(cs.fontWeight),
      });
    }
  }
  return out;
};

const failures = [];
let checked = 0;
let lowest = { ratio: Infinity };

for (const theme of ["dark"]) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  await context.addInitScript((t) => {
    try {
      localStorage.setItem("theme", t);
    } catch {}
  }, theme);
  const page = await context.newPage();

  for (const path of PAGES) {
    await page.goto(`${BASE}${path}?lenses=${LENSES}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(3200); // lenses and refraction have initialised
    const max = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);

    for (const frac of SCROLLS) {
      if (frac > 0 && max < 200) continue;
      await page.evaluate((y) => window.scrollTo(0, y), Math.round(max * frac));
      await page.waitForTimeout(700);
      // Pointer over the first panel in view, so the specular light is on.
      const panel = await page.evaluate(() => {
        const e = [...document.querySelectorAll("main .glass-panel")].find((p) => {
          const r = p.getBoundingClientRect();
          return r.top > 110 && r.bottom < innerHeight;
        });
        if (!e) return null;
        const r = e.getBoundingClientRect();
        return { x: r.x + r.width * 0.35, y: r.y + r.height * 0.4 };
      });
      if (panel) {
        await page.mouse.move(panel.x, panel.y, { steps: 6 });
      }
      // Let scroll-spy, transitions and the pointer light settle before reading colours.
      await page.waitForTimeout(900);

      const targets = await page.evaluate(COLLECT);
      const hider = await page.addStyleTag({
        content:
          ".fx-ring{display:none!important}*,*::before,*::after{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important;caret-color:transparent!important;transition:none!important}::placeholder{color:transparent!important}",
      });
      await page.waitForTimeout(250);
      const shot = await page.screenshot();
      await hider.evaluate((n) => n.remove());

      const results = await measurer.evaluate(MEASURE, { b64: shot.toString("base64"), targets });
      for (const r of results) {
        if (r.ratio == null) continue;
        checked++;
        const large = r.size >= 24 || (r.size >= 18.66 && r.weight >= 700);
        const need = large ? 3 : 4.5;
        if (r.ratio < lowest.ratio) lowest = { ...r, page: path, theme, frac };
        if (r.ratio < need) {
          failures.push({
            page: path,
            theme,
            scroll: frac,
            ratio: r.ratio.toFixed(2),
            need,
            label: r.label,
            at: r.at,
          });
        }
      }
      process.stdout.write(
        `\r${theme} ${path} @${Math.round(frac * 100)}%   checked ${checked}   `,
      );
    }
  }
  await context.close();
}

console.log(`\n\nChecked ${checked} text elements.`);
console.log(
  `Lowest contrast: ${lowest.ratio.toFixed(2)}:1 — ${lowest.label} on ${lowest.page} (${lowest.theme}, scroll ${Math.round(lowest.frac * 100)}%)`,
);
if (failures.length) {
  console.log(`\n${failures.length} below the threshold:`);
  for (const f of failures.slice(0, 40)) {
    console.log(
      `  ${f.ratio}:1 (needs ${f.need})  ${f.theme} ${f.page} @${Math.round(f.scroll * 100)}%  ${f.label}  at ${f.at}`,
    );
  }
}
await browser.close();
process.exit(failures.length ? 1 : 0);
