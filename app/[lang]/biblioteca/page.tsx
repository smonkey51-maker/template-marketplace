import type { Metadata } from "next";
import { toLocale } from "@/lib/locales";
import { copy } from "@/lib/i18n";
import { books } from "@/lib/books";
import SiteNav from "@/components/SiteNav";
import { OsservatorioFooter } from "@/components/OsservatorioFooter";
import { ArtHeader, PAINTINGS } from "@/components/ArtHeader";
import BibliotecaArk from "@/components/BibliotecaArk";

const SOURCES = [
  {
    label: "Clark et al. (2020) — Systematic review of FACS use",
    href: "https://pubmed.ncbi.nlm.nih.gov/32528361/",
  },
  {
    label:
      "Frontiers in Psychology (2018) — Microexpressions and deception: critical review + experiment",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6305322/",
  },
  {
    label: "Burgoon (2018) — Why microexpressions are not a simple lie detector",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6158306/",
  },
];

const META = {
  it: {
    title: "La Biblioteca — OSSERVATORIO",
    description: "Libri consigliati per approfondire linguaggio del corpo e persuasione.",
  },
  en: {
    title: "The Library — OSSERVATORIO",
    description: "Recommended books on body language and persuasion.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  return {
    title: META[lang].title,
    description: META[lang].description,
    alternates: {
      canonical: `/${lang}/biblioteca`,
      languages: { it: "/it/biblioteca", en: "/en/biblioteca" },
    },
  };
}

export default async function BibliotecaPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const t = (k: keyof typeof copy.it) => copy[lang][k];

  return (
    <div className="min-h-screen bg-page relative overflow-x-hidden">
      <SiteNav />
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-10">
        <ArtHeader
          painting={PAINTINGS.biblioteca}
          kicker={t("bibliotecaKicker")}
          title={t("bibliotecaTitle")}
          subtitle={t("bibliotecaSub")}
        />
      </div>

      <div className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6 lg:px-10">
        <BibliotecaArk
          books={books.map((book) => ({
            slug: book.slug,
            title: book[lang].title,
            meta: `${book.author} · ${book.year}`,
            description: book[lang].description,
          }))}
          sources={SOURCES}
          labels={{
            books: lang === "it" ? "Libri" : "Books",
            sources: lang === "it" ? "Fonti" : "Sources",
            notesTitle:
              lang === "it"
                ? "Fonti per distinguere osservazione e inferenza"
                : "Sources for separating observation from inference",
            notesIntro:
              lang === "it"
                ? "Queste letture non trasformano il comportamento non verbale in un rilevatore di bugie: servono soprattutto a capire cosa misurano FACS e microespressioni, e quali limiti emergono quando si tenta di inferire emozioni o inganno."
                : "These readings do not turn nonverbal behaviour into a lie detector. They help clarify what FACS and microexpressions measure, and the limits that appear when inferring emotion or deception.",
          }}
        />
      </div>

      <OsservatorioFooter />
    </div>
  );
}
