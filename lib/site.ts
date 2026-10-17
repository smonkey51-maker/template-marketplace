/**
 * Single source of truth for the business identity. Change the name, tagline or
 * the draft flag here and every page, the footer, metadata and the OG image follow.
 */
export const SITE = {
  name: "N.Forcolin & Co.",
  tagline: "Consulenza HR per le imprese",
  description:
    "Consulenza HR per imprese e responsabili del personale: selezione, sviluppo delle persone, formazione e organizzazione.",
  /** While true, a bar on every page says content is provisional. Set to false at launch. */
  draft: true,
  draftLabel: "Sito in costruzione",
  draftNote: "Contenuti provvisori: i testi non sono definitivi.",
} as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
