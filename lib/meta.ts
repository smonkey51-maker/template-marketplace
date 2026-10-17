import type { Metadata } from "next";
import type { Locale } from "@/lib/locales";

/** Title, description and canonical/hreflang alternates for a localised route. */
export function pageMeta(lang: Locale, path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}${path}`,
      languages: { it: `/it${path}`, en: `/en${path}` },
    },
  };
}

/** Formats an ISO date for display in the given locale. */
export function formatDate(iso: string, lang: Locale): string {
  return new Date(iso).toLocaleDateString(lang === "it" ? "it-IT" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
