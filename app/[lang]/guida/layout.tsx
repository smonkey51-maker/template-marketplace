import type { Metadata } from "next";
import { toLocale } from "@/lib/locales";

// No " — FORMA" on `title`: the root layout's `template: "%s — FORMA"` adds it.
const META = {
  it: {
    title: "Guida all'uso",
    description:
      "Come scegliere, acquistare e usare i template FORMA. FAQ, istruzioni per prompt, guide e fogli di calcolo, info su download e licenze.",
    ogDescription: "Come scegliere, acquistare e usare i template FORMA. FAQ, istruzioni, licenze.",
  },
  en: {
    title: "How it works",
    description:
      "How to choose, buy and use FORMA templates. FAQ, instructions for prompts, guides and spreadsheets, plus download and licence details.",
    ogDescription: "How to choose, buy and use FORMA templates. FAQ, instructions, licences.",
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
    },
  };
}

export default function GuidaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
