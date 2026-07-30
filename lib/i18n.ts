export type Lang = "it" | "en";

export const t = {
  it: {
    nav: {
      guide: "Guida",
      studio: "AI Studio",
      account: "Account",
      signIn: "Accedi",
    },
    hero: {
      badge: "Powered by Claude AI · Anthropic",
      titleStart: "Template premium,",
      titleGradient: "personalizzati\ncon AI",
      titleEnd: "per te",
      subtitle:
        "Acquista un template professionale, poi adattalo in secondi con Claude AI. Nessun codice. Nessuna attesa.",
      cta1: "Sfoglia i template →",
      cta2: "Prova l'AI Studio",
      statTemplates: "template pronti",
      statDownloads: "acquisti",
      statPayment: "Pagamento sicuro Stripe",
    },
    howItWorks: {
      title: "Come funziona",
      step1Title: "Scegli un template",
      step1Desc: "Sfoglia i template professionali. Anteprima completa prima di acquistare.",
      step2Title: "Acquista in un click",
      step2Desc: "Pagamento sicuro con Stripe. Accesso immediato al template e all'AI Studio.",
      step3Title: "Personalizza con AI",
      step3Desc:
        "Descrivi le modifiche in italiano. Claude AI le applica in secondi — senza codice.",
    },
    studioAccessBanner: {
      badge: "Studio Access",
      title: "Non trovi quello che cerchi? Generalo con l'AI.",
      subtitle: "Componenti UI, prompt, landing page — illimitati.",
      price: "€9,99 / mese",
      cta: "Inizia con Studio Access →",
    },
    search: {
      placeholder: "Cerca template…",
      chipAll: "Tutti",
      chipUI: "UI Template",
      chipPrompt: "Prompt",
      found: "{{n}} template trovati",
      notFound: "Nessun template trovato",
      notFoundDesc: "Prova con un termine diverso o cambia categoria.",
      resetCta: "Sfoglia tutti",
      sortPopular: "Più scaricati",
      sortRecent: "Più recenti",
      styleAll: "Tutti",
      styleDark: "Dark",
      styleMinimal: "Minimal",
      styleGradient: "Gradient",
      styleGlass: "Glassmorphic",
      styleCards: "Cards",
    },
    sections: {
      professionals: {
        label: "Professionisti",
        subtitle: "Agenti immobiliari, psicologi, studi legali",
      },
      "lifestyle-finance": {
        label: "Lifestyle & Finanza personale",
        subtitle: "Affitti brevi, budget tracker, gestione patrimonio",
      },
      business: {
        label: "Imprenditori & Business",
        subtitle: "Cataloghi, analytics, pricing per piccole imprese",
      },
      startup: {
        label: "Startup & Lancio prodotto",
        subtitle: "Landing page, hero section, pagine di lancio",
      },
      creative: {
        label: "Agenzie & Freelance",
        subtitle: "Portfolio, profili developer, blog",
      },
      "copywriting-ai": {
        label: "Copywriting & AI Prompt",
        subtitle: "Prompt pronti per vendite, SEO, LinkedIn e YouTube",
      },
      "ai-productivity": {
        label: "AI & Produttività",
        subtitle: "Claude Project pack, workflow automation, focus tracker",
      },
      hospitality: {
        label: "Ristorazione & Hospitality",
        subtitle: "Ristoranti, café, hotel e strutture ricettive",
      },
      "digital-product": {
        label: "App & Prodotto Digitale",
        subtitle: "Showcase app, dashboard SaaS, feature page",
      },
      "personal-brand": {
        label: "Identità & Personal Brand",
        subtitle: "CV digitale, link in bio, newsletter landing",
      },
      "notion-workspace": {
        label: "Notion Workspace",
        subtitle: "Template Notion pronti: CRM, project management, finanze, PKM",
      },
      elearning: {
        label: "E-learning & Corsi",
        subtitle: "Landing page corsi, webinar, curriculum AI, email onboarding",
      },
      "shopify-ecommerce": {
        label: "Shopify E-commerce",
        subtitle: "Sezioni Liquid pronte per il tuo negozio Shopify",
      },
      "wordpress-themes": {
        label: "Temi WordPress",
        subtitle: "Temi PHP completi per WordPress: business, blog, portfolio",
      },
    },
    card: {
      categoryUI: "UI Template",
      bestseller: "★ Bestseller",
      downloads: "acquisti",
      open: "Apri →",
      editorsPick: "Editor's Pick",
      isNew: "Nuovo",
    },
    preview: {
      back: "Indietro",
      buyNow: "Acquista ora — {{price}}",
      openStudio: "Personalizza in AI Studio →",
      oneTime: "una tantum",
      loading: "Caricamento...",
      notFound: "Template non trovato.",
      notFoundBack: "← Torna al marketplace",
    },
    guide: {
      pageTitle: "Guida",
      badge: "Come funziona",
      title: "Come usare Forma",
      subtitle: "Dalla scelta all'utilizzo in pochi minuti.",
      // Tipi di template
      sectionTypes: "I due tipi di template",
      uiTitle: "UI Template",
      uiDesc:
        "Pagine HTML complete, pronte da copiare e incollare nel tuo progetto. Compatibili con qualsiasi framework.",
      uiTags: ["HTML", "Tailwind CSS", "Copy & Paste"],
      promptTitle: "Prompt Template",
      promptDesc:
        "Istruzioni AI pronte da usare in ChatGPT, Claude, Gemini e altri. Copia il testo e ottieni risultati professionali subito.",
      promptTags: ["ChatGPT", "Claude", "Gemini"],
      // Flusso
      sectionFlow: "Come funziona",
      flowStep1Title: "Scegli un template",
      flowStep1Desc:
        "Sfoglia il marketplace, filtra per categoria e anteprima il template prima di acquistare.",
      flowStep2Title: "Acquista con Stripe",
      flowStep2Desc:
        "Pagamento sicuro in un click. Il template è subito disponibile nel tuo account.",
      flowStep3Title: "Personalizza con AI Studio",
      flowStep3Desc:
        "Apri il template in AI Studio e descrivi le modifiche. Claude le applica in pochi secondi.",
      flowStep4Title: "Copia e usa",
      flowStep4Desc:
        "Un click per copiare il codice o il testo. Incollalo nel tuo progetto — zero dipendenze.",
      // AI Studio
      sectionStudio: "L'AI Studio",
      studioCustomTitle: "Personalizza un template",
      studioCustomDesc:
        "Hai acquistato un template? Aprilo in AI Studio e descrivi cosa vuoi cambiare: colori, testi, layout. Claude riscrive il codice in secondi.",
      studioCustomBadge: "Incluso con ogni acquisto",
      studioGenTitle: "Genera da zero",
      studioGenDesc:
        "Con Studio Access puoi creare template HTML o Prompt completamente nuovi. Descrivi l'idea e Claude li costruisce per te.",
      studioGenBadge: "Studio Access",
      // Bundle
      sectionBundles: "I Bundle",
      bundleTitle: "Più template, prezzo ridotto",
      bundleDesc:
        "I bundle raccolgono più template correlati in un unico acquisto scontato. Ideali se hai bisogno di coprire più casi d'uso.",
      bundleBadge: "Risparmio garantito",
      // CTA
      ctaLabel: "Inizia ora",
      ctaTitle: "Pronto a usare Forma?",
      ctaSubtitle: "Sfoglia i template, scegli quello che fa per te e personalizzalo con AI.",
      ctaBtn: "Sfoglia i template →",
    },
    account: {
      title: "Account",
      backToMarketplace: "Marketplace",
      studioBtn: "AI Studio →",
      studioAccessTitle: "Studio Access",
      studioAccessActive: "Attivo — Generazioni AI illimitate",
      studioAccessInactive: "Non attivo",
      manageSubscription: "Gestisci abbonamento",
      activateCta: "Attiva →",
      myTemplates: "I miei template",
      noTemplates: "Nessun template acquistato ancora.",
      goToMarketplace: "Vai al marketplace →",
      accountSection: "Account",
      managePayments: "Gestisci pagamenti e fatture",
      goToStudio: "Vai all'AI Studio",
    },
    success: {
      title: "Acquisto completato!",
      studioAccessPurchased: "Studio Access",
      subtitleStudio: "Puoi ora generare template illimitati con l'AI Studio.",
      openStudio: "Apri AI Studio → Genera ora",
      templatePurchased: "Hai acquistato",
      subtitleTemplate: "Puoi ora personalizzare il template con l'AI Studio.",
      customizeStudio: "Personalizza in AI Studio →",
      backToMarketplace: "Torna al marketplace",
    },
    bundleCard: {
      includes: "Include",
      alreadyYours: "(già tuo)",
      fullyOwned: "✓ Bundle già acquistato",
      buyBundle: "Acquista il bundle — {{price}}",
      loading: "Caricamento...",
      youOwn: "Possiedi già {{owned}}/{{total}} template",
      save: "Risparmi",
      seeDetails: "Vedi cosa include →",
    },
    bundleDetail: {
      back: "Indietro",
      whatsIncluded: "Cosa include il bundle",
      previewTab: "Anteprima",
      buyNow: "Acquista il bundle — {{price}}",
      loading: "Caricamento...",
      oneTime: "pagamento unico · accesso permanente",
      fullyOwned: "✓ Bundle già acquistato",
      alreadyOwned: "Già tuo",
      savings: "Risparmi {{amount}} rispetto all'acquisto singolo",
      totalValue: "Valore totale",
      openPreview: "Vedi anteprima completa →",
      notFound: "Bundle non trovato.",
      notFoundBack: "← Torna al marketplace",
      owned: "{{n}}/{{total}} template già posseduti",
    },
    footer: {
      tagline: "Design per chi costruisce.",
      bundles: "Bundle",
      saved: "Salvati",
      guide: "Guida",
      studio: "AI Studio",
      account: "Account",
      privacy: "Privacy Policy",
      terms: "Termini di servizio",
      copyright: "© 2026 Forma. Tutti i diritti riservati.",
    },
  },
  en: {
    nav: {
      guide: "Guide",
      studio: "AI Studio",
      account: "Account",
      signIn: "Sign in",
    },
    hero: {
      badge: "Powered by Claude AI · Anthropic",
      titleStart: "Premium templates,",
      titleGradient: "customized\nwith AI",
      titleEnd: "for you",
      subtitle:
        "Buy a professional template, then adapt it in seconds with Claude AI. No code. No waiting.",
      cta1: "Browse templates →",
      cta2: "Try AI Studio",
      statTemplates: "templates ready",
      statDownloads: "purchases",
      statPayment: "Secure Stripe payment",
    },
    howItWorks: {
      title: "How it works",
      step1Title: "Choose a template",
      step1Desc: "Browse professional templates. Full preview before purchasing.",
      step2Title: "Buy in one click",
      step2Desc: "Secure payment with Stripe. Immediate access to the template and AI Studio.",
      step3Title: "Customize with AI",
      step3Desc:
        "Describe your changes in plain language. Claude AI applies them in seconds — no code.",
    },
    studioAccessBanner: {
      badge: "Studio Access",
      title: "Can't find what you need? Generate it with AI.",
      subtitle: "UI components, prompts, landing pages — unlimited.",
      price: "€9.99 / month",
      cta: "Start with Studio Access →",
    },
    search: {
      placeholder: "Search templates…",
      chipAll: "All",
      chipUI: "UI Template",
      chipPrompt: "Prompt",
      found: "{{n}} templates found",
      notFound: "No templates found",
      notFoundDesc: "Try a different term or change the category.",
      resetCta: "Browse all",
      sortPopular: "Most downloaded",
      sortRecent: "Most recent",
      styleAll: "All",
      styleDark: "Dark",
      styleMinimal: "Minimal",
      styleGradient: "Gradient",
      styleGlass: "Glassmorphic",
      styleCards: "Cards",
    },
    sections: {
      professionals: {
        label: "Professionals",
        subtitle: "Real estate agents, therapists, law firms",
      },
      "lifestyle-finance": {
        label: "Lifestyle & Personal Finance",
        subtitle: "Short-term rentals, budget tracker, wealth management",
      },
      business: {
        label: "Entrepreneurs & Business",
        subtitle: "Catalogs, analytics, pricing for small businesses",
      },
      startup: {
        label: "Startup & Product Launch",
        subtitle: "Landing pages, hero sections, launch pages",
      },
      creative: {
        label: "Agencies & Freelancers",
        subtitle: "Portfolio, developer profiles, blog",
      },
      "copywriting-ai": {
        label: "Copywriting & AI Prompts",
        subtitle: "Ready-made prompts for sales, SEO, LinkedIn and YouTube",
      },
      "ai-productivity": {
        label: "AI & Productivity",
        subtitle: "Claude Project pack, workflow automation, focus tracker",
      },
      hospitality: {
        label: "Food & Hospitality",
        subtitle: "Restaurants, cafés, hotels and accommodations",
      },
      "notion-workspace": {
        label: "Notion Workspace",
        subtitle: "Ready-to-use Notion templates: CRM, project management, finance, PKM",
      },
      elearning: {
        label: "E-learning & Courses",
        subtitle: "Course landing pages, webinar registration, AI curriculum, onboarding emails",
      },
      "digital-product": {
        label: "App & Digital Product",
        subtitle: "App showcase, SaaS dashboard, feature page",
      },
      "personal-brand": {
        label: "Identity & Personal Brand",
        subtitle: "Digital resume, link in bio, newsletter landing",
      },
      "shopify-ecommerce": {
        label: "Shopify E-commerce",
        subtitle: "Ready-to-use Liquid sections for your Shopify store",
      },
      "wordpress-themes": {
        label: "WordPress Themes",
        subtitle: "Complete PHP themes for WordPress: business, blog, portfolio",
      },
    },
    card: {
      categoryUI: "UI Template",
      bestseller: "★ Bestseller",
      downloads: "purchases",
      open: "Open →",
      editorsPick: "Editor's Pick",
      isNew: "New",
    },
    preview: {
      back: "Back",
      buyNow: "Buy now — {{price}}",
      openStudio: "Customize in AI Studio →",
      oneTime: "one-time",
      loading: "Loading...",
      notFound: "Template not found.",
      notFoundBack: "← Back to marketplace",
    },
    guide: {
      pageTitle: "Guide",
      badge: "How it works",
      title: "How to use Forma",
      subtitle: "From choosing to using in minutes.",
      // Template types
      sectionTypes: "Two types of templates",
      uiTitle: "UI Template",
      uiDesc:
        "Complete HTML pages, ready to copy and paste into any project. Works with any framework.",
      uiTags: ["HTML", "Tailwind CSS", "Copy & Paste"],
      promptTitle: "Prompt Template",
      promptDesc:
        "AI-ready instructions for ChatGPT, Claude, Gemini and others. Copy the text and get professional results instantly.",
      promptTags: ["ChatGPT", "Claude", "Gemini"],
      // Flow
      sectionFlow: "How it works",
      flowStep1Title: "Pick a template",
      flowStep1Desc:
        "Browse the marketplace, filter by category and preview the template before buying.",
      flowStep2Title: "Buy with Stripe",
      flowStep2Desc:
        "Secure one-click payment. The template is immediately available in your account.",
      flowStep3Title: "Customize with AI Studio",
      flowStep3Desc:
        "Open the template in AI Studio and describe your changes. Claude applies them in seconds.",
      flowStep4Title: "Copy and use",
      flowStep4Desc:
        "One click to copy the code or text. Paste it into your project — zero dependencies.",
      // AI Studio
      sectionStudio: "The AI Studio",
      studioCustomTitle: "Customize a template",
      studioCustomDesc:
        "Bought a template? Open it in AI Studio and describe what you want to change: colours, text, layout. Claude rewrites the code in seconds.",
      studioCustomBadge: "Included with every purchase",
      studioGenTitle: "Generate from scratch",
      studioGenDesc:
        "With Studio Access you can create brand new HTML or Prompt templates. Describe the idea and Claude builds it for you.",
      studioGenBadge: "Studio Access",
      // Bundles
      sectionBundles: "Bundles",
      bundleTitle: "More templates, lower price",
      bundleDesc:
        "Bundles group multiple related templates into one discounted purchase. Perfect when you need to cover more use cases.",
      bundleBadge: "Guaranteed savings",
      // CTA
      ctaLabel: "Get started",
      ctaTitle: "Ready to use Forma?",
      ctaSubtitle: "Browse the templates, pick the one that suits you and customize it with AI.",
      ctaBtn: "Browse templates →",
    },
    account: {
      title: "Account",
      backToMarketplace: "Marketplace",
      studioBtn: "AI Studio →",
      studioAccessTitle: "Studio Access",
      studioAccessActive: "Active — Unlimited AI generations",
      studioAccessInactive: "Not active",
      manageSubscription: "Manage subscription",
      activateCta: "Activate →",
      myTemplates: "My templates",
      noTemplates: "No templates purchased yet.",
      goToMarketplace: "Go to marketplace →",
      accountSection: "Account",
      managePayments: "Manage payments & invoices",
      goToStudio: "Go to AI Studio",
    },
    success: {
      title: "Purchase complete!",
      studioAccessPurchased: "Studio Access",
      subtitleStudio: "You can now generate unlimited templates with AI Studio.",
      openStudio: "Open AI Studio → Generate now",
      templatePurchased: "You purchased",
      subtitleTemplate: "You can now customize the template with AI Studio.",
      customizeStudio: "Customize in AI Studio →",
      backToMarketplace: "Back to marketplace",
    },
    bundleCard: {
      includes: "Includes",
      alreadyYours: "(already yours)",
      fullyOwned: "✓ Already owned",
      buyBundle: "Get the bundle — {{price}}",
      loading: "Loading...",
      youOwn: "You own {{owned}}/{{total}} templates",
      save: "Save",
      seeDetails: "See what's included →",
    },
    bundleDetail: {
      back: "Back",
      whatsIncluded: "What's included",
      previewTab: "Preview",
      buyNow: "Get the bundle — {{price}}",
      loading: "Loading...",
      oneTime: "one-time payment · permanent access",
      fullyOwned: "✓ Already owned",
      alreadyOwned: "Already yours",
      savings: "Save {{amount}} vs buying individually",
      totalValue: "Total value",
      openPreview: "See full preview →",
      notFound: "Bundle not found.",
      notFoundBack: "← Back to marketplace",
      owned: "{{n}}/{{total}} templates already owned",
    },
    footer: {
      tagline: "Design for those who build.",
      bundles: "Bundles",
      saved: "Saved",
      guide: "Guide",
      studio: "AI Studio",
      account: "Account",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      copyright: "© 2026 Forma. All rights reserved.",
    },
  },
} as const;

// Italian name + description for every product on sale.
//
// English is the base: the strings in lib/templates.ts are the English copy,
// and this table overrides them when the visitor is on /it. The locale itself
// is decided in middleware.ts from Accept-Language — an Italian browser lands
// on /it, every other language on /en — so a template with no entry here shows
// its English name to an Italian visitor. That is the bug this table exists to
// prevent, and it is why the keys must track lib/templates.ts exactly.
//
// It previously held forty entries for a catalogue that no longer exists
// ("hero-saas", "restaurant-menu", …) and not one for the sixteen products
// actually on sale, so every Italian visitor read an English shop.
//
// Note on "first-100-online-guide": the title stays in dollars in both
// languages because the guide itself is written in dollars — content/products/
// first-100-online-guide.html says "$100" six times. Translating the cover to
// euros would promise a figure the file does not deliver.
export const templateTranslations: Record<string, { name: string; description: string }> = {
  // ── Prompt e script AI ──────────────────────────────────────────────────
  "chatgpt-prompt-library-freelancers": {
    name: "Libreria di Prompt ChatGPT per Freelance",
    description:
      "53 prompt ChatGPT pronti da copiare per ogni parte della tua attività da freelance: preventivi, email ai clienti, tariffe, marketing e onboarding.",
  },
  "chatgpt-prompt-pack-creators": {
    name: "Pacchetto Prompt ChatGPT per Creator",
    description:
      "30 prompt pronti da copiare per scrivere hook per Threads, caption Instagram, descrizioni prodotto e contenuti che convertono.",
  },
  "midjourney-prompt-guide-mockups": {
    name: "Guida ai Prompt Midjourney per Mockup Prodotto",
    description:
      "Oltre 25 prompt Midjourney testati e un workflow completo per creare mockup di prodotto professionali senza assumere un designer.",
  },
  "dm-sales-script-pack": {
    name: "Pacchetto Script DM di Vendita",
    description:
      "10 script DM pronti da copiare per vendere prodotti digitali su Instagram e Threads — uno per ogni fase della conversazione, senza sembrare spam.",
  },

  // ── Guide e percorsi ────────────────────────────────────────────────────
  "home-gym-4-week-guide": {
    name: "Home Gym: Programma di 4 Settimane",
    description:
      "Un programma di allenamento progressivo di 4 settimane per allenarti a casa con attrezzatura minima. Da principiante a intermedio, 3–4 sessioni a settimana.",
  },
  "social-media-detox-7day": {
    name: "Protocollo Detox dai Social in 7 Giorni",
    description:
      "Un piano strutturato di azioni quotidiane per 7 giorni, per interrompere lo scrolling compulsivo e ricostruire un rapporto consapevole con i social.",
  },
  "anti-procrastination-playbook": {
    name: "Playbook Anti-Procrastinazione",
    description:
      "Cause profonde, 8 framework comportamentali e sistemi che superano davvero la procrastinazione. Basato sulla psicologia comportamentale, non sulla motivazione.",
  },
  "mindset-reset-7day-journal": {
    name: "Journal Mindset Reset in 7 Giorni",
    description:
      "Un journal guidato quotidiano per sciogliere i blocchi mentali, far emergere le convinzioni limitanti e ritrovare ciò che vuoi davvero costruire.",
  },
  "first-100-online-guide": {
    name: "Come Guadagnare i Tuoi Primi 100 $ Online",
    description:
      "Una roadmap concreta e senza fronzoli, da zero: 13 passi in sequenza, da cosa vendere fino alla prima vendita, senza pubblico e senza capitale iniziale.",
  },
  "digital-product-launch-checklist": {
    name: "Checklist per il Lancio di un Prodotto Digitale",
    description:
      "Ogni passo dall'idea alla prima vendita: checklist in 6 fasi che copre le basi del prodotto, la realizzazione, la configurazione di Gumroad, il pre-lancio, il giorno del lancio e il dopo.",
  },

  // ── Fogli e tracker ─────────────────────────────────────────────────────
  "freelance-rate-calculator": {
    name: "Workbook Calcolo Tariffa Freelance",
    description:
      "Calcola la tua vera tariffa oraria da freelance in 15 minuti. Tiene conto di tasse, spese, ore non fatturabili e margine di profitto. Pronto per Google Sheets.",
  },
  "monthly-business-finance-tracker": {
    name: "Tracker Finanze Mensili per Freelance",
    description:
      "Una dashboard finanziaria mensile completa per freelance: entrate, spese, margini di profitto e stima delle tasse. Pronto per Google Sheets, con formule già impostate.",
  },
  "wedding-budget-tracker": {
    name: "Tracker Budget Matrimonio",
    description:
      "Tieni traccia di ogni fornitore, acconto e scadenza di pagamento su 6 categorie del matrimonio. Quadro completo di ciò che è prenotato, pagato e ancora da saldare.",
  },
  "remote-job-search-tracker": {
    name: "Tracker Ricerca Lavoro da Remoto",
    description:
      "Tieni traccia di ogni candidatura, fase di colloquio, follow-up e offerta. Include tabella di confronto delle offerte e obiettivi settimanali. Pronto per Google Sheets.",
  },
  "first-apartment-budget-planner": {
    name: "Checklist e Budget per il Primo Appartamento",
    description:
      "Tutto quello che serve comprare, sistemare e mettere a budget per la tua prima casa — ordinato per urgenza, così non spendi troppo su ciò che può aspettare.",
  },
  "pet-care-vet-tracker": {
    name: "Registro Cure e Visite Veterinarie",
    description:
      "Un archivio sanitario completo per il tuo animale: visite dal veterinario, vaccinazioni, farmaci, peso, alimentazione e contatti d'emergenza. Pronto da stampare.",
  },

  // ── Bundle ──────────────────────────────────────────────────────────────
  "bundle-ai-creator": {
    name: "Bundle AI Creator",
    description:
      "53 prompt per freelancer, 30 prompt per creator, guida completa a Midjourney per mockup e 10 script DM per vendere. Un arsenale AI completo.",
  },
  "bundle-wellness-mindset": {
    name: "Bundle Benessere e Mindset",
    description:
      "4 settimane di allenamento home gym, protocollo detox dai social, playbook anti-procrastinazione e journal mindset 7 giorni. Un reset completo.",
  },
  "bundle-money-career": {
    name: "Bundle Soldi e Carriera",
    description:
      "Calcolatore tariffa freelance, tracker finanze mensili, tracker ricerca lavoro remoto, guida ai primi 100 $ online e checklist lancio prodotto digitale.",
  },
  "bundle-life-admin": {
    name: "Bundle Gestione Quotidiana",
    description:
      "Planner budget primo appartamento, tracker budget matrimonio e registro cure veterinarie. I tre tracker essenziali per le grandi tappe della vita.",
  },
};

// Per la ricerca bilingue: mappa termini italiani → tag inglesi
export const SEARCH_SYNONYMS: Record<string, string[]> = {
  // Italian → English mappings
  ristorante: ["restaurant", "food", "menu", "hospitality"],
  caffe: ["coffee", "café"],
  bar: ["coffee", "café"],
  albergo: ["hotel", "booking", "hospitality", "travel"],
  affitto: ["rental", "airbnb", "property"],
  casa: ["property", "real estate", "airbnb"],
  immobiliare: ["real estate", "property", "listings"],
  psicologo: ["therapist", "health", "psychology"],
  psicologa: ["therapist", "health"],
  avvocato: ["law", "legal", "firm"],
  legale: ["law", "legal", "firm"],
  curriculum: ["cv", "resume", "personal"],
  profilo: ["profile", "personal", "portfolio"],
  agenzia: ["agency", "portfolio", "creative"],
  freelance: ["freelance", "portfolio", "crm"],
  email: ["email", "cold-email", "copywriting"],
  negozio: ["catalog", "product", "ecom", "shop", "store"],
  prodotto: ["product", "ecom", "catalog"],
  startup: ["startup", "landing", "saas"],
  landing: ["landing", "saas", "startup", "hero"],
  app: ["app", "mobile", "ios"],
  blog: ["blog", "articles", "cards"],
  prezzo: ["pricing", "saas", "table"],
  prenotazione: ["booking", "hotel", "hospitality"],
  newsletter: ["newsletter", "email", "signup"],
  link: ["link in bio", "creator", "social"],
  contabilita: ["budget", "finance", "spreadsheet", "tracker"],
  finanza: ["finance", "investments", "budget", "tracker"],
  dashboard: ["dashboard", "analytics", "saas"],
  // English → expanded terms
  restaurant: ["ristorante", "food", "menu", "hospitality"],
  hotel: ["albergo", "booking", "hospitality", "travel"],
  portfolio: ["agenzia", "agency", "creative", "portfolio"],
  resume: ["curriculum", "cv", "personal"],
  cv: ["curriculum", "resume", "personal"],
  shop: ["negozio", "ecom", "store", "catalog"],
  store: ["negozio", "ecom", "shop", "catalog"],
  price: ["pricing", "prezzo", "table"],
  pricing: ["prezzo", "price", "table", "saas"],
  finance: ["finanza", "budget", "tracker", "contabilita"],
  budget: ["finanza", "finance", "tracker", "contabilita"],
  crm: ["freelance", "client", "contacts"],
  notion: ["notion", "template", "workspace", "productivity"],
  canva: ["canva", "design", "social", "template"],
  excel: ["excel", "spreadsheet", "sheets", "tracker"],
  sheets: ["excel", "spreadsheet", "google", "tracker"],
  social: ["social", "instagram", "linkedin", "link in bio"],
  instagram: ["social", "stories", "post"],
  linkedin: ["social", "professional", "networking"],
  sito: ["website", "landing", "web", "hero"],
  website: ["sito", "landing", "web", "hero"],
  progetto: ["project", "hub", "management"],
  project: ["progetto", "hub", "management"],
  lavoro: ["job", "career", "tracker", "work"],
  job: ["lavoro", "career", "tracker", "work"],
  cliente: ["client", "crm", "freelance", "portal"],
  client: ["cliente", "crm", "freelance", "portal"],
  contenuto: ["content", "calendar", "blog", "social"],
  content: ["contenuto", "calendar", "blog", "social"],
  calendario: ["calendar", "content", "planner"],
  calendar: ["calendario", "content", "planner"],
  organizzazione: ["organization", "productivity", "planner", "second brain"],
  prompt: ["prompt", "ai", "copywriting", "template"],
  template: ["template", "modello"],
  modello: ["template", "model"],
  gratuito: ["free", "gratis"],
  free: ["gratuito", "gratis"],
  shopify: ["shopify", "ecommerce", "liquid", "negozio", "store"],
  wordpress: ["wordpress", "php", "theme", "blog", "cms"],
  tema: ["theme", "wordpress", "shopify"],
  theme: ["tema", "wordpress", "shopify"],
  ecommerce: ["shopify", "negozio", "store", "product"],
};

/** Returns the localized name for a template (falls back to EN name). */
export function getLocalizedName(template: { id: string; name: string }, lang: Lang): string {
  return lang === "it" ? (templateTranslations[template.id]?.name ?? template.name) : template.name;
}

/** Returns the localized description for a template (falls back to EN description). */
export function getLocalizedDesc(
  template: { id: string; description: string },
  lang: Lang,
): string {
  return lang === "it"
    ? (templateTranslations[template.id]?.description ?? template.description)
    : template.description;
}
