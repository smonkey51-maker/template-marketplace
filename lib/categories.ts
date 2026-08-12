import type { TemplateMeta, DownloadType } from "@/lib/templates";

/**
 * What kind of thing a product is, and which colour says so.
 *
 * The catalogue already learned that the badge has to carry information: it
 * used to read the download format, which was "HTML" on all sixteen cards. It
 * now reads the category — but every badge was still the same gold pill, so the
 * distinction lived in nine-pixel uppercase text and nowhere else. Colour reads
 * before text does, which is the whole reason to give the groups their own
 * hues: a filtered catalogue should be recognisable at a glance, not by
 * reading.
 *
 * The hues stay inside FORMA's warm world — terracotta, gold, olive — rather
 * than being borrowed from a system palette. Gold is the house colour and stays
 * on the largest group and on the brand CTA, so the page still reads as this
 * site and not as a generic one.
 *
 * This lives here, shared, because the badge on a product page and the badge on
 * its card in the catalogue must agree; they used to be written twice and had
 * already drifted apart (the product page still showed the format).
 */

const KIND_LABELS: Record<TemplateMeta["category"], { it: string; en: string }> = {
  prompt: { it: "Prompt", en: "Prompts" },
  script: { it: "Script", en: "Scripts" },
  guide: { it: "Guida", en: "Guide" },
  worksheet: { it: "Foglio", en: "Worksheet" },
  tracker: { it: "Tracker", en: "Tracker" },
  ui: { it: "Template", en: "Template" },
};

export function getKindLabel(t: TemplateMeta, lang: "it" | "en"): string {
  return KIND_LABELS[t.category]?.[lang] ?? KIND_LABELS.ui[lang];
}

/**
 * Buyer-facing groupings, not the raw `category` field.
 *
 * The categories as stored are prompt 3 · script 1 · guide 6 · worksheet 5 ·
 * tracker 1. Exposing those directly would give two filters that return a
 * single product each, which is worse than no filter — you click it and the
 * page looks broken. So `script` joins the prompts (both are copy you paste and
 * adapt) and `tracker` joins the worksheets (both are sheets you fill in),
 * leaving three groups that each hold a real handful.
 */
export type GroupKey = "all" | "prompt" | "guide" | "sheet";

export const GROUP_OF: Record<TemplateMeta["category"], Exclude<GroupKey, "all">> = {
  prompt: "prompt",
  script: "prompt",
  guide: "guide",
  worksheet: "sheet",
  tracker: "sheet",
  ui: "guide",
};

/**
 * The value for `data-cat`, which is what the stylesheet keys the badge and
 * chip colours off. Grouped rather than per-category, so a "Script" badge and
 * the "Prompt e script" chip that selects it are the same colour — the point of
 * colouring them at all is that the two are visibly connected.
 */
export function getCatKey(t: TemplateMeta): Exclude<GroupKey, "all"> {
  return GROUP_OF[t.category] ?? "guide";
}

/**
 * How a product actually arrives — what `downloadType` means in plain words.
 *
 * Used on the product page's "what's inside" chips, which used to be four
 * lines identical on every product regardless of whether it was a prompt pack
 * or an Excel tracker. This is the one fact that genuinely differs and is
 * already stored per product, so it costs nothing to get right.
 */
const FORMAT_LABELS: Record<DownloadType, { it: string; en: string }> = {
  html: { it: "File HTML", en: "HTML file" },
  canva: { it: "Link Canva", en: "Canva link" },
  excel: { it: "File Excel", en: "Excel file" },
  sheets: { it: "Foglio Google", en: "Google Sheet" },
  notion: { it: "Template Notion", en: "Notion template" },
  webflow: { it: "Progetto Webflow", en: "Webflow project" },
  framer: { it: "Progetto Framer", en: "Framer project" },
  shopify: { it: "Tema Shopify", en: "Shopify theme" },
  wordpress: { it: "Tema WordPress", en: "WordPress theme" },
};

export function getFormatLabel(type: DownloadType, lang: "it" | "en"): string {
  return FORMAT_LABELS[type]?.[lang] ?? FORMAT_LABELS.html[lang];
}

/**
 * A tag as written in `Template.tags` ("chatgpt", "mobile ui", "ai tools") is
 * lowercase, space-joined editorial shorthand — fine as a search keyword,
 * not fine set in a UI chip next to properly-cased text. This is display
 * formatting only; it does not translate the tag; the tags themselves are
 * English-only across both locales, which is the existing convention (see
 * `matchesQuery` in CatalogoContent.tsx, which searches them regardless of
 * `lang` for the same reason).
 */
const TAG_ACRONYMS: Record<string, string> = {
  ai: "AI",
  ui: "UI",
  ux: "UX",
  chatgpt: "ChatGPT",
  crm: "CRM",
  saas: "SaaS",
  dm: "DM",
};

export function prettifyTag(tag: string): string {
  return tag
    .split(" ")
    .map((word) => TAG_ACRONYMS[word.toLowerCase()] ?? word[0]?.toUpperCase() + word.slice(1))
    .join(" ");
}
