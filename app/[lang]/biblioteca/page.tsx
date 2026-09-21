import type { Metadata } from "next";
import { toLocale } from "@/lib/locales";
import { copy } from "@/lib/i18n";
import { books } from "@/lib/books";
import SiteNav from "@/components/SiteNav";
import { OsservatorioFooter } from "@/components/OsservatorioFooter";
import { ArtHeader, PAINTINGS } from "@/components/ArtHeader";

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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {books.map((book) => {
            const locale = book[lang];
            return (
              <article
                key={book.slug}
                className="border border-theme r-md p-8"
                style={{ background: "var(--surface)" }}
              >
                {/* Typographic/icon treatment in place of cover art — see
                    lib/books.ts and CLAUDE.md: no cover images, to avoid any
                    copyright risk on real, currently in-print book jackets. */}
                <div
                  className="flex h-14 w-14 items-center justify-center r-sm"
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    color: "var(--accent)",
                  }}
                  aria-hidden
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22.5" />
                    <path d="M4 4.5v16A2.5 2.5 0 0 0 6.5 22H20" />
                  </svg>
                </div>
                <h2
                  className="mt-5 text-[1.35rem] leading-snug"
                  style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 700 }}
                >
                  {locale.title}
                </h2>
                <p
                  className="mt-1 text-[13px] font-semibold uppercase"
                  style={{ color: "var(--accent)", letterSpacing: "0.1em" }}
                >
                  {book.author} · {book.year}
                </p>
                <p className="mt-4 text-[14px] leading-relaxed" style={{ color: "var(--muted)" }}>
                  {locale.description}
                </p>
              </article>
            );
          })}
        </div>
        <section className="mt-16 border-t border-theme pt-10">
          <span className="text-[10px] font-semibold uppercase" style={{ color: "var(--accent)", letterSpacing: "0.16em" }}>
            {lang === "it" ? "Note di ricerca" : "Research notes"}
          </span>
          <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.3rem)]" style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 600 }}>
            {lang === "it" ? "Fonti per distinguere osservazione e inferenza" : "Sources for separating observation from inference"}
          </h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-6" style={{ color: "var(--muted)" }}>
            {lang === "it"
              ? "Queste letture non trasformano il comportamento non verbale in un rilevatore di bugie: servono soprattutto a capire cosa misurano FACS e microespressioni, e quali limiti emergono quando si tenta di inferire emozioni o inganno."
              : "These readings do not turn nonverbal behaviour into a lie detector. They help clarify what FACS and microexpressions measure, and the limits that appear when inferring emotion or deception."}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4">
            {[
              {
                label: "Clark et al. (2020) — Systematic review of FACS use",
                href: "https://pubmed.ncbi.nlm.nih.gov/32528361/",
              },
              {
                label: "Matsumoto & Hwang et al. (2018) — Microexpressions and deception: critical review + experiment",
                href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6305322/",
              },
              {
                label: "Burgoon (2018) — Why microexpressions are not a simple lie detector",
                href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6158306/",
              },
            ].map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start justify-between gap-4 border border-theme r-md p-5 transition-colors hover:border-[var(--accent)]"
                style={{ background: "var(--surface)" }}
              >
                <span className="text-[13px] leading-5" style={{ color: "var(--text)" }}>{source.label}</span>
                <span aria-hidden style={{ color: "var(--accent)" }}>↗</span>
              </a>
            ))}
          </div>
        </section>
      </div>

      <OsservatorioFooter />
    </div>
  );
}
