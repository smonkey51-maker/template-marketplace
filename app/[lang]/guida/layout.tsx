import type { Metadata } from "next";
import { toLocale } from "@/lib/locales";

// No " — Atelier Nove" on `title`: the root layout's `template: "%s — Atelier Nove"` adds it.
const META = {
  it: {
    title: "Guida all'uso",
    description:
      "Come scegliere, acquistare e usare i template Atelier Nove. FAQ, istruzioni per prompt, guide e fogli di calcolo, info su download e licenze.",
    ogDescription:
      "Come scegliere, acquistare e usare i template Atelier Nove. FAQ, istruzioni, licenze.",
  },
  en: {
    title: "How it works",
    description:
      "How to choose, buy and use Atelier Nove templates. FAQ, instructions for prompts, guides and spreadsheets, plus download and licence details.",
    ogDescription:
      "How to choose, buy and use Atelier Nove templates. FAQ, instructions, licences.",
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
    },
  };
}

export default function GuidaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
