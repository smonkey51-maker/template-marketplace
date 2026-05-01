export type Lang = "it" | "en";

export const copy = {
  it: {
    catalogo: "Catalogo", guida: "Guida", studioAi: "AI Studio",
    account: "Account", cerca: "Cerca", studio: "Studio",
    heroKicker: "Edizione digitale · Vol. I",
    heroTitle: "Template come oggetti curati.",
    heroSub: "Ogni file è un gesto preciso, non una soluzione generica.",
    browse: "Sfoglia", browseAll: "Sfoglia catalogo", studioCta: "AI Studio",
    templates: "Template nel catalogo", categories: "Categorie",
    from: "Da", oneTime: "Acquisto unico",
    searchPlaceholder: "Cerca template, piattaforma o formato...",
    all: "Tutti", notion: "Notion", web: "Web", app: "App", deck: "Deck",
    buy: "Acquista", download: "Scarica demo", details: "Dettagli", saved: "Salvati",
    accountTitle: "Account", accountSub: "Gestisci acquisti, download e template salvati.",
    guideTitle: "Guida", guideSub: "Come scegliere, acquistare e usare i template FORMA.",
    studioTitle: "Studio", studioSub: "Un ambiente per generare, adattare e rifinire template.",
    aiTitle: "AI Studio", aiSub: "Descrivi cosa ti serve. FORMA ti propone la struttura corretta.",
    backHome: "Torna alla landing",
  },
  en: {
    catalogo: "Catalog", guida: "Guide", studioAi: "AI Studio",
    account: "Account", cerca: "Search", studio: "Studio",
    heroKicker: "Digital edition · Vol. I",
    heroTitle: "Templates as curated objects.",
    heroSub: "Every file is a precise gesture, not a generic solution.",
    browse: "Browse", browseAll: "Browse catalog", studioCta: "AI Studio",
    templates: "Templates in catalog", categories: "Categories",
    from: "From", oneTime: "one-time purchase",
    searchPlaceholder: "Search templates, platform or format...",
    all: "All", notion: "Notion", web: "Web", app: "App", deck: "Deck",
    buy: "Buy", download: "Download demo", details: "Details", saved: "Saved",
    accountTitle: "Account", accountSub: "Manage purchases, downloads and saved templates.",
    guideTitle: "Guide", guideSub: "How to choose, buy and use FORMA templates.",
    studioTitle: "Studio", studioSub: "A place to generate, adapt and refine templates.",
    aiTitle: "AI Studio", aiSub: "Describe what you need. FORMA proposes the right structure.",
    backHome: "Back to landing",
  },
} as const;

export type CopyKey = keyof typeof copy.it;

export type Template = {
  slug: string;
  platform: string;
  format: string;
  price: string;
  tag: string;
  title: { it: string; en: string };
  desc:  { it: string; en: string };
  file: string;
  preview: "crm" | "web" | "app" | "deck";
};

export const formaTemplates: Template[] = [
  {
    slug: "notion-crm", platform: "Notion", format: "Markdown", price: "€19", tag: "CRM",
    title: { it: "CRM essenziale", en: "Essential CRM" },
    desc:  { it: "Pipeline clienti, follow-up e revenue tracker importabili in Notion.", en: "Client pipeline, follow-ups and revenue tracker importable into Notion." },
    file: "/downloads/notion-crm.md", preview: "crm",
  },
  {
    slug: "web-landing", platform: "Web", format: "HTML", price: "€29", tag: "SITE",
    title: { it: "Landing premium", en: "Premium landing" },
    desc:  { it: "Landing page completa con hero, sezioni value e CTA.", en: "Complete landing page with hero, value sections and CTA." },
    file: "/downloads/web-landing.html", preview: "web",
  },
  {
    slug: "mobile-kit", platform: "App", format: "React JSX", price: "€39", tag: "APP",
    title: { it: "Mobile launch kit", en: "Mobile launch kit" },
    desc:  { it: "Schermate app pronte per prototipi e prodotti digitali.", en: "App screens ready for prototypes and digital products." },
    file: "/downloads/mobile-kit.jsx", preview: "app",
  },
  {
    slug: "investor-sales-deck", platform: "Deck", format: "Markdown", price: "€24", tag: "DECK",
    title: { it: "Investor / Sales deck", en: "Investor / Sales deck" },
    desc:  { it: "Presentazione per vendere, raccogliere fondi o raccontare una proposta.", en: "Presentation for selling, fundraising or explaining a proposal." },
    file: "/downloads/investor-deck.md", preview: "deck",
  },
];
