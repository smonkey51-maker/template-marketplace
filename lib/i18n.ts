export type Lang = "it" | "en";

export const t = {
  it: {
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
      bundlePrice: "Prezzo del bundle",
      openPreview: "Vedi anteprima completa →",
      notFound: "Bundle non trovato.",
      notFoundBack: "← Torna al marketplace",
      owned: "{{n}}/{{total}} template già posseduti",
    },
  },
  en: {
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
      bundlePrice: "Bundle price",
      openPreview: "See full preview →",
      notFound: "Bundle not found.",
      notFoundBack: "← Back to marketplace",
      owned: "{{n}}/{{total}} templates already owned",
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
  // ── UI mobile ────────────────────────────────────────────────────────────
  "wallet-dashboard-ui": {
    name: "UI Kit Mobile — Dashboard Wallet",
    description:
      "Schermata wallet fintech scura con accenti oro: saldo in evidenza, azioni rapide, carta mascherata e lista transazioni. Solo HTML/CSS, pronto da adattare.",
  },
  "daily-agenda-ui": {
    name: "UI Kit Mobile — Agenda Timeline",
    description:
      "Schermata agenda scura ed editoriale: intestazione giorno, strip date, note in timeline e card appuntamento con luogo integrato. Solo HTML/CSS.",
  },
  "workspace-dashboard-ui": {
    name: "UI Kit Desktop — Dashboard Workspace",
    description:
      "Dashboard SaaS desktop: menu laterale, card KPI e una mappa piano isometrica live con popover di dettaglio stanza. Solo HTML/CSS.",
  },
  "fitness-tracker-ui": {
    name: "UI Kit Mobile — Fitness Tracker",
    description:
      "Schermata fitness scura con accenti oro: barre allenamenti settimanali, grafico cardio, widget idratazione e sonno, card di recupero.",
  },
  "banking-app-ui": {
    name: "UI Kit Mobile — App Bancaria",
    description:
      "Schermata bancaria chiara e calda: azioni rapide, mockup carta fisica, contatti recenti, dettaglio carta e bollette in scadenza.",
  },
  "ai-assistant-suggestions-ui": {
    name: "UI Kit Mobile — Suggerimenti Assistente AI",
    description:
      "Pillole di suggerimento in glassmorphism su sfondo sfumato caldo, con barra prompt flottante — schermata home per assistente AI.",
  },
  "ride-booking-ui": {
    name: "UI Kit Mobile — Prenotazione Corsa",
    description:
      "Schermata home scura per app di viaggio: ricerca destinazione con suggerimenti, card percorso da/a e lista viaggi recenti. Solo HTML/CSS.",
  },
  "health-insights-ui": {
    name: "UI Kit Mobile — Card Insight Salute",
    description:
      "Card glass in tonalità vinaccia su sfondo sfumato: progresso passi, messaggio con punteggio salute personalizzato, alert sonno insufficiente.",
  },
  "sleep-tracker-ui": {
    name: "UI Kit Mobile — Sleep Tracker",
    description:
      "Schermata scura di dettaglio sonno: timeline a segmenti delle fasi, griglia statistiche, banner di recupero e tabella di riepilogo.",
  },

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
