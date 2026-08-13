import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { escapeHtml } from "@/lib/html";

/**
 * Full, ready-to-use product files.
 *
 * These live in `content/products/` and NOT in `public/` on purpose: anything
 * under `public/` is served verbatim by Next.js at `/<name>`, which would let
 * anyone download a paid product without buying it. Every read below happens
 * behind a purchase check in the calling route.
 */
const PRODUCTS_DIR = join(process.cwd(), "content", "products");

/** Reject anything that isn't a plain template id, so `..` can't escape the dir. */
const SAFE_ID = /^[a-z0-9][a-z0-9-]*$/i;

export function hasProductFile(templateId: string): boolean {
  if (!SAFE_ID.test(templateId)) return false;
  return existsSync(join(PRODUCTS_DIR, `${templateId}.html`));
}

export function readProductFile(templateId: string): string | null {
  if (!SAFE_ID.test(templateId)) return null;
  const path = join(PRODUCTS_DIR, `${templateId}.html`);
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf-8");
}

/**
 * Tailwind is loaded from the CDN inside the standalone files we hand to
 * buyers. Pinned to an exact version so a future Tailwind release can't
 * silently restyle a product someone already paid for.
 */
export const TAILWIND_CDN = "https://cdn.tailwindcss.com/3.4.16";

/** Wrap a template body into a standalone, downloadable HTML document. */
export function renderStandaloneHtml({
  body,
  title,
  lang,
}: {
  body: string;
  title: string;
  lang: "it" | "en";
}): string {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${escapeHtml(title)} — Atelier Nove</title>
  <script src="${TAILWIND_CDN}"></script>
  <style>body { margin: 0; }</style>
</head>
<body>${body}
</body>
</html>`;
}
