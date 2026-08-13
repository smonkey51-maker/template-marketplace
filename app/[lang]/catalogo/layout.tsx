import type { Metadata } from "next";
import { toLocale } from "@/lib/locales";

// The `title` field carries no " — Atelier Nove" suffix on purpose: the root layout
// declares `template: "%s — Atelier Nove"`, which appends it. Spelling it out here too
// produced "Catalogo Template — Atelier Nove — Atelier Nove" in the tab and in search results.
// The openGraph and twitter titles *do* keep the suffix, because the title
// template is not applied to those fields.
const META = {
  it: {
    title: "Catalogo Template",
    description:
      "Sfoglia il catalogo completo: prompt AI, guide pratiche, fogli di calcolo e tracker pronti all'uso. Acquisto unico, download immediato.",
    ogDescription:
      "Template digitali pronti all'uso: prompt, guide, fogli e tracker. Acquisto unico, download immediato.",
  },
  en: {
    title: "Template Catalogue",
    description:
      "Browse the full catalogue: AI prompts, practical guides, spreadsheets and trackers, ready to use. One-off purchase, instant download.",
    ogDescription:
      "Ready-to-use digital templates: prompts, guides, sheets and trackers. One-off purchase, instant download.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const m = META[toLocale(rawLang)];

  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: `${m.title} — Atelier Nove`,
      description: m.ogDescription,
      type: "website",
      images: [{ url: "/api/og", width: 1200, height: 630, alt: "Atelier Nove" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${m.title} — Atelier Nove`,
      description: m.ogDescription,
    },
  };
}

export default function CatalogoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
