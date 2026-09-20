import type { Metadata } from "next";
import { toLocale } from "@/lib/locales";
import { copy } from "@/lib/i18n";
import { books } from "@/lib/books";
import SiteNav from "@/components/SiteNav";
import { FormaFooter } from "@/components/FormaFooter";
import { ArtHeader, PAINTINGS } from "@/components/ArtHeader";

const META = {
  it: {
    title: "La Biblioteca — INSPO",
    description: "Libri consigliati per approfondire linguaggio del corpo e persuasione.",
  },
  en: {
    title: "The Library — INSPO",
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
  return { title: META[lang].title, description: META[lang].description };
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
      </div>

      <FormaFooter />
    </div>
  );
}
