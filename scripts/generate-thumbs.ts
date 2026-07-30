/**
 * Renders one static thumbnail per template into public/thumbs/.
 *
 * Why this exists: the catalogue used to show each template through a live
 * <iframe> pointed at /api/preview/[id]. Sixteen cards meant sixteen nested
 * browsing contexts, each laying out a document at 1440px and then scaling it
 * down, plus a ResizeObserver per card to compute that scale. The teaser HTML
 * is only ~1.4 KB, so this was never a bandwidth problem — it was the cost of
 * creating and laying out sixteen documents on the main thread. On a phone the
 * grid is one column, so `loading="lazy"` deferred nearly all of them and the
 * page felt fine; on desktop three columns put 6-9 iframes in the first
 * viewport and they all started at once. That is the whole story of "fast on
 * mobile, slow on desktop".
 *
 * An image has none of that cost: no document, no observer, no JavaScript, and
 * the browser can decode it off the main thread. Rendering happens once, here,
 * instead of in every visitor's browser on every visit.
 *
 * The HTML assembled below deliberately matches the non-interactive branch of
 * app/api/preview/[templateId]/route.ts. If that wrapper changes, change it here
 * too, or the thumbnails drift from what the preview endpoint serves.
 *
 * Run with `npm run thumbs`. Output is committed — it is a build input, not a
 * build artifact, so a deploy never depends on a browser being available.
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { templates } from "../lib/templates";

/** Design width the templates are authored against — same as TemplatePreview. */
const RENDER_WIDTH = 1440;
const RENDER_HEIGHT = 900;

/**
 * Output width. Twice the widest the card ever gets (~360px in a 3-track grid
 * on a 1400px page) so the image stays sharp on a 2× display, and no wider —
 * every extra pixel is bytes on a page that shows sixteen of these.
 */
const OUT_WIDTH = 720;
const OUT_HEIGHT = 450;

const OUT_DIR = path.join(process.cwd(), "public", "thumbs");

/**
 * No Tailwind CDN <script> here, on purpose — and it matters twice over.
 *
 * It matches what the grid actually showed. The non-interactive branch of
 * /api/preview omits Tailwind too, and grid thumbnails rendered in a sandbox
 * without allow-scripts where it could never have executed anyway. Templates
 * carry their own inline <style>, which is what was doing the work. So these
 * images are a like-for-like replacement of the old iframes rather than a
 * different-looking render.
 *
 * And it makes this script deterministic. With the CDN in, output would depend
 * on whether the machine running it has network access — a build box with
 * egress would produce Tailwind-styled thumbnails that no longer matched the
 * committed set, silently. A generator whose output changes with the network is
 * worse than one that renders slightly less.
 */
function previewHtml(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>body { margin: 0; } * { scrollbar-width: none; -ms-overflow-style: none; } *::-webkit-scrollbar { display: none; }</style>
</head>
<body>${content}</body>
</html>`;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: RENDER_WIDTH, height: RENDER_HEIGHT },
    // Render at 1× and downscale with sharp rather than screenshotting at 2×:
    // Lanczos resampling gives a cleaner result than a raw 2× capture, at a
    // quarter of the pixels to move around.
    deviceScaleFactor: 1,
  });

  let written = 0;
  const failed: string[] = [];

  for (const template of templates) {
    try {
      await page.setContent(previewHtml(template.content), { waitUntil: "load" });
      // Web fonts resolve after `load`; screenshotting before they settle
      // catches a fallback-font frame.
      await page.evaluate(() => document.fonts.ready);

      // Clip to what the template actually draws, not the whole viewport. The
      // teasers centre a card in the page, so a full-viewport capture spent more
      // than half the thumbnail on empty background — dead space in a grid whose
      // job is to show sixteen products at once.
      const box = await page.evaluate(() => {
        const els = Array.from(document.body.children) as HTMLElement[];
        const boxes = els
          .map((el) => el.getBoundingClientRect())
          .filter((r) => r.width > 1 && r.height > 1);
        if (!boxes.length) return null;
        const left = Math.min(...boxes.map((r) => r.left));
        const top = Math.min(...boxes.map((r) => r.top));
        const right = Math.max(...boxes.map((r) => r.right));
        const bottom = Math.max(...boxes.map((r) => r.bottom));
        return { left, top, width: right - left, height: bottom - top };
      });

      // Breathing room, so the crop never shaves a shadow or a rounded corner.
      const pad = 20;
      const clip = box
        ? {
            x: Math.max(0, box.left - pad),
            y: Math.max(0, box.top - pad),
            width: Math.min(RENDER_WIDTH, box.width + pad * 2),
            height: Math.min(RENDER_HEIGHT, box.height + pad * 2),
          }
        : { x: 0, y: 0, width: RENDER_WIDTH, height: RENDER_HEIGHT };

      const png = await page.screenshot({ type: "png", clip });

      const webp = await sharp(png)
        .resize(OUT_WIDTH, OUT_HEIGHT, { fit: "cover", position: "top" })
        .webp({ quality: 78, effort: 6 })
        .toBuffer();

      const out = path.join(OUT_DIR, `${template.id}.webp`);
      await writeFile(out, webp);
      written++;
      console.log(`  ${template.id}.webp  ${(webp.byteLength / 1024).toFixed(1)} kB`);
    } catch (err) {
      // One bad template must not cost the other fifteen their thumbnails.
      failed.push(template.id);
      console.error(`  ✗ ${template.id}: ${err instanceof Error ? err.message : err}`);
    }
  }

  await browser.close();

  console.log(`\n${written}/${templates.length} thumbnails written to public/thumbs/`);
  if (failed.length) {
    console.error(`Failed: ${failed.join(", ")}`);
    process.exitCode = 1;
  }
}

main();
