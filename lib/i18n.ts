export type Lang = "it" | "en";

/**
 * Single copy table for the whole site. Replaces the pre-refresh split
 * between `lib/formaCopy.ts` and `lib/i18n.ts` — this project has no product
 * catalogue and far less copy overall, so one table is enough.
 */
export const copy = {
  it: {
    /* brand */
    siteName: "INSPO",
    siteTagline: "Osservazione, psicologia e Il Mentalist.",

    /* nav — "L'Archivio" is the display label for /articoli (kept as the
       route path to avoid URL churn); Dossier Personaggi, Guide Pratiche and
       La Biblioteca are the three new sections from the "Il Taccuino di
       Jane" content brief. */
    navHome: "Home",
    navArticoli: "L'Archivio",
    navDossier: "Dossier Personaggi",
    navGuide: "Guide Pratiche",
    navBiblioteca: "La Biblioteca",
    navChiSiamo: "Chi siamo",

    /* fan-site disclaimer (short, used in header/footer contexts) */
    disclaimerShort:
      'Sito di fan non ufficiale, non affiliato a CBS, Warner Bros. o ai creatori de "Il Mentalist".',

    /* homepage */
    heroKicker: "Osservazione · Psicologia · Finzione",
    heroTitle: "L'acume non è un potere. È un metodo.",
    heroTagline: "L'arte di osservare ciò che gli altri vedono soltanto.",
    heroSub:
      'Analisi da fan su Patrick Jane e "Il Mentalist", insieme a guide pratiche di psicologia — linguaggio del corpo, memoria, ascolto, persuasione — per usare davvero ciò che il personaggio simula in TV.',
    heroCtaArticoli: "Leggi gli articoli",
    heroCtaChiSiamo: "Chi siamo",
    featuredKicker: "In evidenza",
    featuredTitle: "Ultimi articoli",
    featuredSub: "I pezzi più recenti, tra analisi della serie e psicologia applicata.",
    seeAllArticles: "Vedi tutti gli articoli →",
    categoryTeaserDossierTitle: "Dossier Personaggi",
    categoryTeaserDossierSub:
      "Psicologia, linguaggio del corpo e tecniche di personaggi come Patrick Jane e Cal Lightman — commento da fan.",
    categoryTeaserGuideTitle: "Guide Pratiche",
    categoryTeaserGuideSub: "Tecniche vere, passo dopo passo: osservazione, difesa, persuasione.",
    newsletterKicker: "Il Taccuino",
    newsletterTitle: "Il Taccuino di Jane",
    newsletterSub:
      "Ogni settimana, un'analisi psicologica esclusiva direttamente nella tua casella di posta. Tecniche che non pubblico sul sito.",
    newsletterPlaceholder: "La tua email",
    newsletterCta: "Iscriviti al Taccuino",
    newsletterSuccess: "Iscritto — grazie!",
    newsletterError: "Qualcosa è andato storto. Riprova.",

    /* articoli listing */
    articoliKicker: "L'Archivio",
    articoliTitle: "L'Archivio",
    articoliSub: 'Fan commentary su "Il Mentalist" e guide pratiche di psicologia.',
    filterAll: "Tutti",
    filterCorpo: "Linguaggio del Corpo",
    filterPersuasione: "Persuasione",
    filterMentalismo: "Mentalismo & Cold Reading",
    filterContromanipolazione: "Contro-Manipolazione",
    noArticles: "Nessun articolo in questa categoria, per ora.",
    readMore: "Leggi →",
    minRead: "min di lettura",

    /* dossier personaggi */
    dossierKicker: "Dossier",
    dossierTitle: "Dossier Personaggi",
    dossierSub:
      "Analisi psicologiche originali di personaggi di finzione che leggono le persone per mestiere — Patrick Jane, Cal Lightman e altri. Commento da fan, mai trascrizioni di scene o dialoghi.",
    dossierBackToDossier: "← Tutti i dossier",

    /* guide pratiche */
    guideKicker: "Guide",
    guideTitle: "Guide Pratiche",
    guideSub:
      "Articoli lunghi, passo dopo passo, su difesa psicologica e miglioramento della comunicazione.",

    /* la biblioteca */
    bibliotecaKicker: "Biblioteca",
    bibliotecaTitle: "La Biblioteca",
    bibliotecaSub:
      "I testi fondamentali per chi vuole andare oltre la fiction e approfondire la materia sul serio.",

    /* article detail */
    backToArticles: "← Tutti gli articoli",
    relatedTitle: "Continua a leggere",
    publishedOn: "Pubblicato il",

    /* chi siamo */
    chiSiamoKicker: "Chi siamo",
    chiSiamoTitle: "Un progetto di fan, non un prodotto ufficiale",

    /* privacy / terms */
    privacyKicker: "Privacy",
    termsKicker: "Termini",
    lastUpdated: "Ultimo aggiornamento",

    /* footer */
    footerColumnsExplore: "Esplora",
    footerColumnsLegal: "Legale",
    footerTerms: "Termini",
    footerPrivacy: "Privacy",
    footerContact: "Contatti",
    footerCopyright:
      "© 2026 INSPO. Progetto di fan indipendente — non affiliato a CBS o Warner Bros.",

    /* 404 */
    notFoundTitle: "Pagina non trovata",
    notFoundSub: "La pagina che cerchi non esiste o è stata rimossa.",
    notFoundCta: "Torna alla home",

    /* generic error boundary */
    errorTitle: "Qualcosa è andato storto",
    errorSub: "Si è verificato un errore imprevisto. Riprova o torna alla home.",
    errorRetry: "Riprova",
    errorHome: "← Home",
  },

  en: {
    /* brand */
    siteName: "INSPO",
    siteTagline: "Observation, psychology and The Mentalist.",

    /* nav */
    navHome: "Home",
    navArticoli: "The Archive",
    navDossier: "Character Dossiers",
    navGuide: "Practical Guides",
    navBiblioteca: "The Library",
    navChiSiamo: "About",

    /* fan-site disclaimer */
    disclaimerShort:
      'Unofficial fan site, not affiliated with CBS, Warner Bros., or the creators of "The Mentalist".',

    /* homepage */
    heroKicker: "Observation · Psychology · Fiction",
    heroTitle: "Acumen isn't a power. It's a method.",
    heroTagline: "The art of observing what others only see.",
    heroSub:
      'Fan analysis of Patrick Jane and "The Mentalist", alongside practical psychology guides — body language, memory, listening, persuasion — for actually using what the character simulates on screen.',
    heroCtaArticoli: "Read the articles",
    heroCtaChiSiamo: "About us",
    featuredKicker: "Featured",
    featuredTitle: "Latest articles",
    featuredSub: "The most recent pieces, between show analysis and applied psychology.",
    seeAllArticles: "See all articles →",
    categoryTeaserDossierTitle: "Character Dossiers",
    categoryTeaserDossierSub:
      "Psychology, body language and technique, character by character — Patrick Jane, Cal Lightman and more. Fan commentary.",
    categoryTeaserGuideTitle: "Practical Guides",
    categoryTeaserGuideSub: "Real techniques, step by step: observation, defense, persuasion.",
    newsletterKicker: "The Notebook",
    newsletterTitle: "Jane's Notebook",
    newsletterSub:
      "Every week, one exclusive psychological analysis straight to your inbox. Techniques I don't publish on the site.",
    newsletterPlaceholder: "Your email",
    newsletterCta: "Subscribe to the Notebook",
    newsletterSuccess: "Subscribed — thank you!",
    newsletterError: "Something went wrong. Try again.",

    /* articles listing */
    articoliKicker: "The Archive",
    articoliTitle: "The Archive",
    articoliSub: 'Fan commentary on "The Mentalist" and practical psychology guides.',
    filterAll: "All",
    filterCorpo: "Body Language",
    filterPersuasione: "Persuasion",
    filterMentalismo: "Mentalism & Cold Reading",
    filterContromanipolazione: "Counter-Manipulation",
    noArticles: "No articles in this category yet.",
    readMore: "Read →",
    minRead: "min read",

    /* character dossiers */
    dossierKicker: "Dossier",
    dossierTitle: "Character Dossiers",
    dossierSub:
      "Original psychological analysis of fictional characters who read people for a living — Patrick Jane, Cal Lightman and others. Fan commentary, never a transcript of scenes or dialogue.",
    dossierBackToDossier: "← All dossiers",

    /* practical guides */
    guideKicker: "Guides",
    guideTitle: "Practical Guides",
    guideSub: "Long-form, step-by-step pieces on psychological self-defense and communication.",

    /* the library */
    bibliotecaKicker: "Library",
    bibliotecaTitle: "The Library",
    bibliotecaSub: "The essential books for going beyond the fiction and studying this for real.",

    /* article detail */
    backToArticles: "← All articles",
    relatedTitle: "Keep reading",
    publishedOn: "Published on",

    /* about */
    chiSiamoKicker: "About",
    chiSiamoTitle: "A fan project, not an official product",

    /* privacy / terms */
    privacyKicker: "Privacy",
    termsKicker: "Terms",
    lastUpdated: "Last updated",

    /* footer */
    footerColumnsExplore: "Explore",
    footerColumnsLegal: "Legal",
    footerTerms: "Terms",
    footerPrivacy: "Privacy",
    footerContact: "Contact",
    footerCopyright:
      "© 2026 INSPO. An independent fan project — not affiliated with CBS or Warner Bros.",

    /* 404 */
    notFoundTitle: "Page not found",
    notFoundSub: "The page you're looking for doesn't exist or has been removed.",
    notFoundCta: "Back to home",

    /* generic error boundary */
    errorTitle: "Something went wrong",
    errorSub: "An unexpected error occurred. Try again or go back home.",
    errorRetry: "Try again",
    errorHome: "← Home",
  },
} as const;

export type CopyKey = keyof typeof copy.it;
