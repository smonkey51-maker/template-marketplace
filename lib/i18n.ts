export type Lang = "it" | "en";

/** One copy table for every UI string. Keys must exist in both locales. */
export const copy = {
  it: {
    siteName: "SANDBOX",
    siteTagline: "Ambiente di prova",
    envLabel: "Test environment",
    envNote: "Contenuti di esempio. Il sito non rappresenta un'organizzazione reale.",

    navTest: "Test",
    navTestPlus: "Test ma di più",
    navRick: "Rickrolled",
    searchCta: "Cerca",
    breadcrumbHome: "Home",

    testKicker: "Pagina 1",
    testTitle: "Test",
    testSub: "Pagina di base: stato dell'ambiente, tipografia, pulsanti, campi e callout.",
    testPlusKicker: "Pagina 2",
    testPlusTitle: "Test ma di più",
    testPlusSub:
      "Stessa base, più materiale: primitive Ark UI, testo lungo, tabella dati e palette.",

    statusTitle: "Stato dell'ambiente",
    statusEnv: "Ambiente",
    statusEnvValue: "Test",
    statusContent: "Contenuti",
    statusContentValue: "Esempio",
    statusLangs: "Lingue",
    statusStack: "Stack",

    newsletterKicker: "Aggiornamenti",
    newsletterSub: "Un messaggio periodico dall'ambiente di prova.",
    newsletterPlaceholder: "Indirizzo email",
    newsletterCta: "Iscriviti",
    newsletterSuccess: "Iscrizione registrata. Grazie.",
    newsletterError: "Non è stato possibile completare l'iscrizione. Riprova più tardi.",

    footerColumnsExplore: "Pagine",
    footerContact: "Contatti",
    footerNote:
      "Ambiente di prova. I contenuti sono esempi e non rappresentano un'organizzazione reale.",
    footerCopyright: "Sandbox. Ambiente di test.",

    notFoundTitle: "Pagina non trovata",
    notFoundSub: "L'indirizzo richiesto non esiste o è stato spostato.",
    notFoundCta: "Vai a Test",
    errorTitle: "Si è verificato un errore",
    errorSub: "Qualcosa non ha funzionato. Riprova o torna alla pagina Test.",
    errorRetry: "Riprova",
    errorHome: "Test",
  },
  en: {
    siteName: "SANDBOX",
    siteTagline: "Test environment",
    envLabel: "Test environment",
    envNote: "Sample content. This site does not represent a real organisation.",

    navTest: "Test",
    navTestPlus: "Test, but more",
    navRick: "Rickrolled",
    searchCta: "Search",
    breadcrumbHome: "Home",

    testKicker: "Page 1",
    testTitle: "Test",
    testSub: "Base page: environment status, typography, buttons, fields and callouts.",
    testPlusKicker: "Page 2",
    testPlusTitle: "Test, but more",
    testPlusSub:
      "Same base, more material: Ark UI primitives, long-form text, a data table and the palette.",

    statusTitle: "Environment status",
    statusEnv: "Environment",
    statusEnvValue: "Test",
    statusContent: "Content",
    statusContentValue: "Sample",
    statusLangs: "Languages",
    statusStack: "Stack",

    newsletterKicker: "Updates",
    newsletterSub: "An occasional message from the test environment.",
    newsletterPlaceholder: "Email address",
    newsletterCta: "Subscribe",
    newsletterSuccess: "Subscription recorded. Thank you.",
    newsletterError: "We could not complete the subscription. Please try again later.",

    footerColumnsExplore: "Pages",
    footerContact: "Contact",
    footerNote:
      "Test environment. Content is sample material and does not represent a real organisation.",
    footerCopyright: "Sandbox. Test environment.",

    notFoundTitle: "Page not found",
    notFoundSub: "The requested address does not exist or has been moved.",
    notFoundCta: "Go to Test",
    errorTitle: "An error occurred",
    errorSub: "Something went wrong. Try again or go back to the Test page.",
    errorRetry: "Try again",
    errorHome: "Test",
  },
} as const;

export type CopyKey = keyof typeof copy.it;

// Compile-time guarantee that both locales define exactly the same keys.
const _localeKeysMatch: Record<CopyKey, string> = copy.en;
void _localeKeysMatch;
