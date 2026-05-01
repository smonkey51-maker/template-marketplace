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
    searchPlaceholder: "Cerca per nome, categoria o formato…",
    all: "Tutti", notion: "Notion", web: "Web", app: "App", deck: "Deck",
    buy: "Dettagli", download: "Anteprima", details: "Dettagli", saved: "Salvati",
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
    searchPlaceholder: "Search by name, category or format…",
    all: "All", notion: "Notion", web: "Web", app: "App", deck: "Deck",
    buy: "Details", download: "Preview", details: "Details", saved: "Saved",
    accountTitle: "Account", accountSub: "Manage purchases, downloads and saved templates.",
    guideTitle: "Guide", guideSub: "How to choose, buy and use FORMA templates.",
    studioTitle: "Studio", studioSub: "A place to generate, adapt and refine templates.",
    aiTitle: "AI Studio", aiSub: "Describe what you need. FORMA proposes the right structure.",
    backHome: "Back to landing",
  },
} as const;

export type CopyKey = keyof typeof copy.it;
