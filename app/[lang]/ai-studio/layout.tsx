import type { Metadata } from "next";
import { toLocale } from "@/lib/locales";

// No " — FORMA" on `title`: the root layout's `template: "%s — FORMA"` adds it.
const META = {
  it: {
    title: "AI Studio",
    description:
      "Genera template personalizzati con l'AI. Descrivi cosa ti serve, FORMA costruisce la struttura in pochi secondi.",
    ogDescription:
      "Genera template su misura con l'intelligenza artificiale. Prompt → template → download.",
  },
  en: {
    title: "AI Studio",
    description:
      "Generate custom templates with AI. Describe what you need and FORMA builds the structure in seconds.",
    ogDescription: "Generate bespoke templates with AI. Prompt → template → download.",
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
      title: `${m.title} — FORMA`,
      description: m.ogDescription,
      type: "website",
      images: [{ url: "/api/og", width: 1200, height: 630, alt: "FORMA AI Studio" }],
    },
  };
}

export default function AIStudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
