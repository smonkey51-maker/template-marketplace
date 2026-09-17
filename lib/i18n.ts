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

    /* nav */
    navHome: "Home",
    navArticoli: "Articoli",
    navMentalist: "Il Mentalist",
    navPsicologia: "Psicologia",
    navChiSiamo: "Chi siamo",

    /* fan-site disclaimer (short, used in header/footer contexts) */
    disclaimerShort:
      'Sito di fan non ufficiale, non affiliato a CBS, Warner Bros. o ai creatori de "Il Mentalist".',

    /* homepage */
    heroKicker: "Osservazione · Psicologia · Finzione",
    heroTitle: "L'acume non è un potere. È un metodo.",
    heroSub:
      'Analisi da fan su Patrick Jane e "Il Mentalist", insieme a guide pratiche di psicologia — linguaggio del corpo, memoria, ascolto, persuasione — per usare davvero ciò che il personaggio simula in TV.',
    heroCtaArticoli: "Leggi gli articoli",
    heroCtaChiSiamo: "Chi siamo",
    featuredKicker: "In evidenza",
    featuredTitle: "Ultimi articoli",
    featuredSub: "I pezzi più recenti, tra analisi della serie e psicologia applicata.",
    seeAllArticles: "Vedi tutti gli articoli →",
    categoryTeaserMentalistTitle: "Il Mentalist",
    categoryTeaserMentalistSub:
      "Analisi del personaggio, del metodo, degli episodi — commento da fan.",
    categoryTeaserPsicologiaTitle: "Psicologia pratica",
    categoryTeaserPsicologiaSub: "Tecniche vere: osservazione, memoria, ascolto, persuasione.",
    newsletterKicker: "Newsletter",
    newsletterTitle: "Un articolo nuovo, ogni tanto",
    newsletterSub: "Niente spam — solo un'email quando pubblichiamo qualcosa di nuovo.",
    newsletterPlaceholder: "La tua email",
    newsletterCta: "Iscriviti",
    newsletterSuccess: "Iscritto — grazie!",
    newsletterError: "Qualcosa è andato storto. Riprova.",

    /* articoli listing */
    articoliKicker: "Blog",
    articoliTitle: "Articoli",
    articoliSub: 'Fan commentary su "Il Mentalist" e guide pratiche di psicologia.',
    filterAll: "Tutti",
    filterMentalist: "Il Mentalist",
    filterPsicologia: "Psicologia",
    noArticles: "Nessun articolo in questa categoria, per ora.",
    readMore: "Leggi →",
    minRead: "min di lettura",

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
    navArticoli: "Articles",
    navMentalist: "The Mentalist",
    navPsicologia: "Psychology",
    navChiSiamo: "About",

    /* fan-site disclaimer */
    disclaimerShort:
      'Unofficial fan site, not affiliated with CBS, Warner Bros., or the creators of "The Mentalist".',

    /* homepage */
    heroKicker: "Observation · Psychology · Fiction",
    heroTitle: "Acumen isn't a power. It's a method.",
    heroSub:
      'Fan analysis of Patrick Jane and "The Mentalist", alongside practical psychology guides — body language, memory, listening, persuasion — for actually using what the character simulates on screen.',
    heroCtaArticoli: "Read the articles",
    heroCtaChiSiamo: "About us",
    featuredKicker: "Featured",
    featuredTitle: "Latest articles",
    featuredSub: "The most recent pieces, between show analysis and applied psychology.",
    seeAllArticles: "See all articles →",
    categoryTeaserMentalistTitle: "The Mentalist",
    categoryTeaserMentalistSub:
      "Character and method analysis, episode commentary — fan discussion.",
    categoryTeaserPsicologiaTitle: "Practical psychology",
    categoryTeaserPsicologiaSub: "Real techniques: observation, memory, listening, persuasion.",
    newsletterKicker: "Newsletter",
    newsletterTitle: "A new article, now and then",
    newsletterSub: "No spam — just an email whenever we publish something new.",
    newsletterPlaceholder: "Your email",
    newsletterCta: "Subscribe",
    newsletterSuccess: "Subscribed — thank you!",
    newsletterError: "Something went wrong. Try again.",

    /* articles listing */
    articoliKicker: "Blog",
    articoliTitle: "Articles",
    articoliSub: 'Fan commentary on "The Mentalist" and practical psychology guides.',
    filterAll: "All",
    filterMentalist: "The Mentalist",
    filterPsicologia: "Psychology",
    noArticles: "No articles in this category yet.",
    readMore: "Read →",
    minRead: "min read",

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
