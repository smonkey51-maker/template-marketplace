export type Lang = "it" | "en";

export const copy = {
  it: {
    /* nav */
    catalogo: "Catalogo",
    guida: "Guida",
    studioAi: "AI Studio",
    account: "Account",
    cerca: "Cerca",
    studio: "Studio",

    /* home hero */
    heroTitle: "Template come oggetti curati.",
    heroSub: "Ogni file è un gesto preciso, non una soluzione generica.",
    browse: "Sfoglia",
    browseAll: "Sfoglia catalogo",
    studioCta: "AI Studio",

    /* home stats */
    statCatalog: "Template nel catalogo",
    statFormats: "Formati supportati",
    statFrom: "Da · Acquisto unico",

    /* home featured */
    featuredKicker: "Editor's pick",
    featuredTitle: "Template in evidenza",
    featuredSub: "I più scaricati, selezionati dalla redazione.",
    detailsLink: "Dettagli →",

    /* home categories */
    categoriesKicker: "Formato",
    categoriesTitle: "Ogni struttura ha il suo formato.",

    /* home AI callout */
    aiKicker: "Intelligenza artificiale",
    aiCalloutTitle: "Descrivi. FORMA costruisce.",
    aiCalloutSub:
      "L'AI Studio genera strutture su misura a partire da un'idea. Prompt → template → download in pochi secondi.",
    aiCalloutCta: "Apri AI Studio →",

    /* catalog */
    templates: "Template nel catalogo",
    categories: "Categorie",
    from: "Da",
    oneTime: "Acquisto unico",
    searchPlaceholder: "Cerca per nome, categoria o formato…",
    all: "Tutti",
    notion: "Notion",
    web: "Web",
    app: "App",
    deck: "Deck",
    buy: "Dettagli",
    download: "Anteprima",
    details: "Dettagli",
    saved: "Salvati",
    noResults: "Nessun template trovato.",

    /* account */
    accountTitle: "Account",
    accountSub: "Gestisci acquisti, download e template salvati.",

    /* guida page */
    guideKicker: "Documentazione",
    guideTitle: "Guida all'uso",
    guideSub: "Come scegliere, acquistare e usare i template FORMA.",
    guideCta1: "Sfoglia il catalogo",
    guideCta2: "AI Studio →",
    guideFaqKicker: "FAQ",
    guideFaqTitle: "Domande frequenti",
    guideStep1Title: "Scegli il formato",
    guideStep1Body:
      "Naviga il catalogo e filtra per tipo: prompt e script, guide, fogli e tracker. Ogni prodotto mostra un'anteprima reale, il prezzo e cosa contiene.",
    guideStep2Title: "Anteprima e dettagli",
    guideStep2Body:
      "Apri la pagina del template per vedere il design nel dettaglio, leggere le caratteristiche e verificare la compatibilità con il tuo flusso di lavoro.",
    guideStep3Title: "Acquista",
    guideStep3Body:
      "Checkout sicuro via Stripe. Accettiamo carta di credito e PayPal. Acquisto una tantum — nessun abbonamento, nessun rinnovo.",
    guideStep4Title: "Scarica e usa subito",
    guideStep4Body:
      "File disponibile immediatamente nell'area account e via email. HTML → apri in qualsiasi editor. Notion → duplica nel workspace. Shopify/WP → carica come tema.",
    guideFaq1Q: "Posso modificare i template liberamente?",
    guideFaq1A:
      "Sì. Ogni template è completamente editabile. I file HTML usano Tailwind CDN — basta aprire in un editor e cambiare testi, colori e sezioni. I template Notion si duplicano e modificano direttamente nel workspace.",
    guideFaq2Q: "Quante volte posso scaricare?",
    guideFaq2A:
      "Illimitatamente. Una volta acquistato, il template è tuo per sempre — nessuna restrizione di download, nessuna scadenza.",
    guideFaq3Q: "L'uso commerciale è incluso?",
    guideFaq3A:
      "Sì. Puoi usare i template per progetti clienti e applicazioni commerciali. Non è consentita la rivendita del file originale su altri marketplace.",
    guideFaq4Q: "Come funziona l'AI Studio?",
    guideFaq4A:
      "Descrivi il template che vuoi (tipo, stile, sezioni, tono). L'AI genera una struttura HTML o Notion pronta all'uso in pochi secondi. Puoi poi personalizzarla nell'editor integrato.",
    guideFaq5Q: "Esiste assistenza dopo l'acquisto?",
    guideFaq5A:
      "Sì. Per ogni domanda tecnica scrivi a supporto@template-marketplace-psi.vercel.app — risposta entro 24 ore lavorative.",

    /* ai-studio page */
    aiStudioKicker: "Intelligenza artificiale",
    aiStudioTitle: "AI Studio",
    aiStudioSub: "Descrivi cosa ti serve. FORMA genera la struttura corretta in pochi secondi.",
    aiStudioHowKicker: "Come funziona",
    aiStep1Icon: "01",
    aiStep1Title: "Descrivi",
    aiStep1Desc:
      "Scrivi un prompt: tipo di template, tono, sezioni, colori. Più dettagli dai, migliore è il risultato.",
    aiStep2Icon: "02",
    aiStep2Title: "Genera",
    aiStep2Desc:
      "L'AI produce codice HTML o struttura Notion ottimizzata, pronta per essere usata o modificata.",
    aiStep3Icon: "03",
    aiStep3Title: "Personalizza",
    aiStep3Desc:
      "Raffina nel prompt, cambia sezioni, rigenera singoli blocchi. Poi scarica il file definitivo.",
    aiExamplesKicker: "Esempi",
    aiExamplesTitle: "Cosa puoi generare",
    aiStudioCta: "Apri lo Studio →",
    aiEx1Prompt: "Landing page per una SaaS di analytics con hero scuro e piano prezzi",
    aiEx1Output: "HTML · ~3 sezioni",
    aiEx2Prompt: "Workspace Notion per freelance con CRM clienti e tracker fatture",
    aiEx2Output: "Notion · 4 database",
    aiEx3Prompt: "Email di onboarding per un corso online in 5 step",
    aiEx3Output: "HTML · email template",

    /* snap homepage hero */
    heroTagline: "Arte in tasca.",
    heroSubSnap: "Template, prompt e strumenti per chi crea.",
    heroCtaSnap: "Esplora il catalogo →",
    heroCtaGuidaSnap: "Come funziona",

    /* shared */
    studioTitle: "Studio",
    studioSub: "Un ambiente per generare, adattare e rifinire template.",
    aiTitle: "AI Studio",
    aiSub: "Descrivi cosa ti serve. FORMA ti propone la struttura corretta.",
    guidePageTitle: "Guida",
    backHome: "Torna alla landing",
    footerHome: "Home",
    date: "01 Maggio 2026",
    tagline: "Marketplace di template digitali",
    /* template detail page */
    buyNow: "Acquista ora",
    immediateAccess: "Accesso immediato dopo l'acquisto",
    freeUpdates: "Aggiornamenti futuri inclusi",
    commercialUse: "Uso commerciale incluso",
    emailSupport: "Supporto via email entro 24h",
    moneyBack: "Garanzia rimborso 14 giorni",
    whatsIncluded: "Cosa include",
    techSpecs: "Specifiche tecniche",
    perfectFor: "Perfetto per",
    backToCatalog: "← Catalogo",
    oneTimePurchase: "Acquisto unico",
    platform: "Piattaforma",
    previewBtn: "Anteprima live",
    downloadsLabel: "download",
    relatedTemplates: "Template correlati",
    redirecting: "Reindirizzamento…",
    networkError: "Errore di rete. Riprova.",
    checkoutError: "Errore nel checkout.",
    secureCheckout: "Pagamento sicuro con Stripe",
    moneyBackShort: "Rimborso 14 giorni",
    includedHtml: "File HTML (nessun build step)",
    includedResponsive: "Design completamente responsive",
    includedTailwind: "Tailwind CSS via CDN",
    includedLicense: "Licenza commerciale inclusa",
    includedComments: "Codice commentato e modificabile",
    includedNotion: "Pagina Notion duplicabile",
    includedDb: "Database e viste preconfigurate",
    includedDocs: "Guida all'uso inclusa",
    includedPrompt: "Pack di prompt in formato .txt",
    includedExamples: "Esempi di output generati",
    techBrowser: "Browser",
    techBrowserVal: "Chrome, Safari, Firefox, Edge",
    techFramework: "Framework",
    techNoTools: "Nessun tool di build richiesto",
    techMobile: "Mobile-first responsive",
    forAgencies: "Agenzie e freelance",
    forStartups: "Startup e SaaS",
    forDesigners: "Designer e developer",
    forMarketing: "Team marketing e content",
    forFreelance: "Freelance e solopreneur",
    forCreators: "Creator e professionisti digitali",

    /* footer */
    footerTagline: "Template digitali di qualità editoriale.",
    footerCatalog: "Catalogo",
    footerTemplates: "Tutti i template",
    footerBundles: "Bundle",
    footerNew: "Nuovi arrivi",
    footerSupport: "Supporto",
    footerFaq: "FAQ",
    footerGuide: "Guida all'uso",
    footerContact: "Contatti",
    footerLegal: "Legale",
    footerTerms: "Termini di servizio",
    footerPrivacy: "Privacy policy",
    footerRefund: "Politica rimborsi",
    footerCopyright: "© 2026 FORMA. Tutti i diritti riservati.",
    footerMadeWith: "Fatto con precisione.",
    newsletterTitle: "Ricevi i nuovi template",
    newsletterSub: "Solo lanci e aggiornamenti — niente spam.",
    newsletterPlaceholder: "La tua email",
    newsletterCta: "Iscriviti",
  },

  en: {
    /* nav */
    catalogo: "Catalog",
    guida: "Guide",
    studioAi: "AI Studio",
    account: "Account",
    cerca: "Search",
    studio: "Studio",

    /* home hero */
    heroTitle: "Templates as curated objects.",
    heroSub: "Every file is a precise gesture, not a generic solution.",
    browse: "Browse",
    browseAll: "Browse catalog",
    studioCta: "AI Studio",

    /* home stats */
    statCatalog: "Templates in catalog",
    statFormats: "Supported formats",
    statFrom: "From · One-time purchase",

    /* home featured */
    featuredKicker: "Editor's pick",
    featuredTitle: "Featured templates",
    featuredSub: "Most downloaded, curated by the editorial team.",
    detailsLink: "Details →",

    /* home categories */
    categoriesKicker: "Format",
    categoriesTitle: "Every structure has its format.",

    /* home AI callout */
    aiKicker: "Artificial intelligence",
    aiCalloutTitle: "Describe it. FORMA builds it.",
    aiCalloutSub:
      "The AI Studio generates custom structures from an idea. Prompt → template → download in seconds.",
    aiCalloutCta: "Open AI Studio →",

    /* catalog */
    templates: "Templates in catalog",
    categories: "Categories",
    from: "From",
    oneTime: "one-time purchase",
    searchPlaceholder: "Search by name, category or format…",
    all: "All",
    notion: "Notion",
    web: "Web",
    app: "App",
    deck: "Deck",
    buy: "Details",
    download: "Preview",
    details: "Details",
    saved: "Saved",
    noResults: "No templates found.",

    /* account */
    accountTitle: "Account",
    accountSub: "Manage purchases, downloads and saved templates.",

    /* guida page */
    guideKicker: "Documentation",
    guideTitle: "User Guide",
    guideSub: "How to choose, buy and use FORMA templates.",
    guideCta1: "Browse catalog",
    guideCta2: "AI Studio →",
    guideFaqKicker: "FAQ",
    guideFaqTitle: "Frequently asked questions",
    guideStep1Title: "Choose your format",
    guideStep1Body:
      "Browse the catalogue and filter by type: prompts and scripts, guides, sheets and trackers. Every product shows a real preview, the price and what is inside.",
    guideStep2Title: "Preview and details",
    guideStep2Body:
      "Open the template page to see the design in detail, read the features and verify compatibility with your workflow.",
    guideStep3Title: "Purchase",
    guideStep3Body:
      "Secure checkout via Stripe. We accept credit cards and PayPal. One-time purchase — no subscription, no renewal.",
    guideStep4Title: "Download and use immediately",
    guideStep4Body:
      "File available immediately in your account area and by email. HTML → open in any editor. Notion → duplicate to your workspace. Shopify/WP → upload as theme.",
    guideFaq1Q: "Can I edit the templates freely?",
    guideFaq1A:
      "Yes. Every template is fully editable. HTML files use Tailwind CDN — just open in an editor and change texts, colours and sections. Notion templates are duplicated and edited directly in the workspace.",
    guideFaq2Q: "How many times can I download?",
    guideFaq2A:
      "Unlimited. Once purchased, the template is yours forever — no download restrictions, no expiry.",
    guideFaq3Q: "Is commercial use included?",
    guideFaq3A:
      "Yes. You can use the templates for client projects and commercial applications. Reselling the original file on other marketplaces is not permitted.",
    guideFaq4Q: "How does the AI Studio work?",
    guideFaq4A:
      "Describe the template you want (type, style, sections, tone). The AI generates an HTML or Notion structure ready to use in seconds. You can then customise it in the integrated editor.",
    guideFaq5Q: "Is there support after purchase?",
    guideFaq5A:
      "Yes. For any technical question write to support@template-marketplace-psi.vercel.app — reply within 24 business hours.",

    /* ai-studio page */
    aiStudioKicker: "Artificial intelligence",
    aiStudioTitle: "AI Studio",
    aiStudioSub: "Describe what you need. FORMA generates the right structure in seconds.",
    aiStudioHowKicker: "How it works",
    aiStep1Icon: "01",
    aiStep1Title: "Describe",
    aiStep1Desc:
      "Write a prompt: template type, tone, sections, colours. The more details you give, the better the result.",
    aiStep2Icon: "02",
    aiStep2Title: "Generate",
    aiStep2Desc: "The AI produces optimised HTML code or Notion structure, ready to use or modify.",
    aiStep3Icon: "03",
    aiStep3Title: "Customise",
    aiStep3Desc:
      "Refine in the prompt, change sections, regenerate individual blocks. Then download the final file.",
    aiExamplesKicker: "Examples",
    aiExamplesTitle: "What you can generate",
    aiStudioCta: "Open Studio →",
    aiEx1Prompt: "Landing page for an analytics SaaS with dark hero and pricing plan",
    aiEx1Output: "HTML · ~3 sections",
    aiEx2Prompt: "Notion workspace for freelancers with client CRM and invoice tracker",
    aiEx2Output: "Notion · 4 databases",
    aiEx3Prompt: "Onboarding email for an online course in 5 steps",
    aiEx3Output: "HTML · email template",

    /* snap homepage hero */
    heroTagline: "Art in your pocket.",
    heroSubSnap: "Templates, prompts and tools for creators.",
    heroCtaSnap: "Explore the catalog →",
    heroCtaGuidaSnap: "How it works",

    /* shared */
    studioTitle: "Studio",
    studioSub: "A place to generate, adapt and refine templates.",
    aiTitle: "AI Studio",
    aiSub: "Describe what you need. FORMA proposes the right structure.",
    guidePageTitle: "Guide",
    backHome: "Back to landing",
    footerHome: "Home",
    date: "01 May 2026",
    tagline: "Digital template marketplace",
    /* template detail page */
    buyNow: "Buy now",
    immediateAccess: "Immediate access after purchase",
    freeUpdates: "Future updates included",
    commercialUse: "Commercial use included",
    emailSupport: "Email support within 24h",
    moneyBack: "14-day money-back guarantee",
    whatsIncluded: "What's included",
    techSpecs: "Tech specs",
    perfectFor: "Perfect for",
    backToCatalog: "← Catalog",
    oneTimePurchase: "One-time purchase",
    platform: "Platform",
    previewBtn: "Live preview",
    downloadsLabel: "downloads",
    relatedTemplates: "Related templates",
    redirecting: "Redirecting…",
    networkError: "Network error. Try again.",
    checkoutError: "Checkout error.",
    secureCheckout: "Secure checkout with Stripe",
    moneyBackShort: "14-day refund",
    includedHtml: "HTML file (no build step required)",
    includedResponsive: "Fully responsive design",
    includedTailwind: "Tailwind CSS via CDN",
    includedLicense: "Commercial license included",
    includedComments: "Commented, editable code",
    includedNotion: "Duplicable Notion page",
    includedDb: "Pre-configured databases and views",
    includedDocs: "Usage guide included",
    includedPrompt: "Prompt pack in .txt format",
    includedExamples: "Generated output examples",
    techBrowser: "Browser",
    techBrowserVal: "Chrome, Safari, Firefox, Edge",
    techFramework: "Framework",
    techNoTools: "No build tools required",
    techMobile: "Mobile-first responsive",
    forAgencies: "Agencies and freelancers",
    forStartups: "Startups and SaaS",
    forDesigners: "Designers and developers",
    forMarketing: "Marketing and content teams",
    forFreelance: "Freelancers and solopreneurs",
    forCreators: "Digital creators and professionals",

    /* footer */
    footerTagline: "Editorial-quality digital templates.",
    footerCatalog: "Catalog",
    footerTemplates: "All templates",
    footerBundles: "Bundles",
    footerNew: "New arrivals",
    footerSupport: "Support",
    footerFaq: "FAQ",
    footerGuide: "User guide",
    footerContact: "Contact",
    footerLegal: "Legal",
    footerTerms: "Terms of service",
    footerPrivacy: "Privacy policy",
    footerRefund: "Refund policy",
    footerCopyright: "© 2026 FORMA. All rights reserved.",
    footerMadeWith: "Made with precision.",
    newsletterTitle: "Get new templates",
    newsletterSub: "Launches and updates only — no spam.",
    newsletterPlaceholder: "Your email",
    newsletterCta: "Subscribe",
  },
} as const;

export type CopyKey = keyof typeof copy.it;
