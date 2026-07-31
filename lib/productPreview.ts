import { readProductFile, TAILWIND_CDN } from "@/lib/productFiles";

/**
 * A readable teaser of the real product.
 *
 * The site used to preview `template.content` — a 1.5 KB promotional card with
 * the title and three figures on it. The thing people actually buy is the file
 * in content/products/, 16–47 KB of cover, sections and filled-in tables. So
 * the answer to "what am I buying?" was a poster of the product rather than the
 * product, and no amount of fixing how that poster was *rendered* could help.
 *
 * This serves the beginning of the real document and stops. The cut is a string
 * truncation, not CSS hiding: the remainder must not be in the response at all,
 * or view-source hands the product to anyone who asks.
 *
 * The cut is proportional rather than structural because the sixteen products
 * do not share one shape — nine use `<div class="section">` and seven do not,
 * and the number of headings runs from 1 to 11. A fraction of the document
 * behaves sensibly for all of them, where any single structural anchor would
 * show almost everything of one product and almost nothing of another.
 */

/** How much of the document a visitor may read before buying. */
const REVEAL_FRACTION = 0.22;

/** Never reveal less than this, or a short product shows only its cover. */
const MIN_REVEAL_CHARS = 1800;

/** Never reveal more than this, however long the product is. */
const MAX_REVEAL_CHARS = 7000;

function splitDocument(html: string): { head: string; body: string } | null {
  const bodyOpen = html.search(/<body[^>]*>/i);
  if (bodyOpen === -1) return null;
  const bodyStart = html.indexOf(">", bodyOpen) + 1;
  const bodyEnd = html.search(/<\/body>/i);
  if (bodyEnd === -1 || bodyEnd <= bodyStart) return null;
  return { head: html.slice(0, bodyStart), body: html.slice(bodyStart, bodyEnd) };
}

/**
 * Truncate at `limit`, then move forward to the end of whatever tag we landed
 * inside. Cutting mid-tag would leave the browser parsing a fragment of an
 * attribute; cutting mid-sentence is fine, because the fade sits over the seam.
 */
function cutAtTagBoundary(body: string, limit: number): string {
  if (body.length <= limit) return body;
  const nextClose = body.indexOf(">", limit);
  return nextClose === -1 ? body.slice(0, limit) : body.slice(0, nextClose + 1);
}

function gateMarkup(labels: { heading: string; blurb: string; cta: string }): string {
  // Inline styles, and a stacking context of its own: this is injected into a
  // document whose CSS was written for the standalone file and knows nothing
  // about a paywall, so it cannot rely on any class defined there.
  return `
<div style="position:relative;margin-top:-160px;padding-top:160px;
            background:linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,.92) 45%, #fff 70%);
            text-align:center;font-family:'Segoe UI',system-ui,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:0 24px 64px;">
    <p style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#9C7733;font-weight:700;margin:0 0 10px;">
      ${labels.heading}
    </p>
    <p style="font-size:16px;line-height:1.6;color:#4a4a4a;margin:0;">
      ${labels.blurb}
    </p>
  </div>
</div>`;
}

export interface ProductPreview {
  html: string;
  /** False when the whole document fitted inside the reveal budget. */
  truncated: boolean;
}

/**
 * Build the gated preview for a product, or null when it has no product file
 * (in which case the caller should fall back to `template.content`).
 */
export function buildProductPreview(
  templateId: string,
  lang: "it" | "en" = "it",
): ProductPreview | null {
  const full = readProductFile(templateId);
  if (!full) return null;

  const parts = splitDocument(full);
  if (!parts) return null;

  const limit = Math.min(
    MAX_REVEAL_CHARS,
    Math.max(MIN_REVEAL_CHARS, Math.floor(parts.body.length * REVEAL_FRACTION)),
  );
  const revealed = cutAtTagBoundary(parts.body, limit);
  const truncated = revealed.length < parts.body.length;

  const labels =
    lang === "it"
      ? {
          heading: "Anteprima",
          blurb:
            "Questa è la prima parte del documento. Il file completo, pronto da usare e da stampare, è incluso nell'acquisto.",
          cta: "Acquista",
        }
      : {
          heading: "Preview",
          blurb:
            "This is the opening of the document. The complete file, ready to use and to print, comes with your purchase.",
          cta: "Buy",
        };

  const html = `${parts.head}${revealed}${truncated ? gateMarkup(labels) : ""}</body></html>`;

  return { html, truncated };
}

export { TAILWIND_CDN };
