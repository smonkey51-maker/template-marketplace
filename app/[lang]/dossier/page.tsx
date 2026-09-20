import type { Metadata } from "next";
import Link from "next/link";
import { toLocale } from "@/lib/locales";
import { copy } from "@/lib/i18n";
import { getDossierArticles, getCategoryLabel } from "@/lib/articles";
import SiteNav from "@/components/SiteNav";
import { FormaFooter } from "@/components/FormaFooter";
import { ArtHeader, PAINTINGS } from "@/components/ArtHeader";

const META = {
  it: {
    title: "Dossier Personaggi — INSPO",
    description:
      "Analisi psicologiche originali di personaggi di finzione: Patrick Jane, Cal Lightman e altri.",
  },
  en: {
    title: "Character Dossiers — INSPO",
    description:
      "Original psychological analysis of fictional characters: Patrick Jane, Cal Lightman and more.",
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

/** Readable label for a `person` id — the dossier grammar only stores a
 * kebab-case id (e.g. "patrick-jane"), title-cased here for display. */
function personLabel(person: string) {
  return person
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function DossierPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const list = getDossierArticles();

  return (
    <div className="min-h-screen bg-page relative overflow-x-hidden">
      <SiteNav />
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-10">
        <ArtHeader
          painting={PAINTINGS.dossier}
          kicker={t("dossierKicker")}
          title={t("dossierTitle")}
          subtitle={t("dossierSub")}
        />
      </div>

      <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {list.map((article) => (
            <Link
              key={article.slug}
              href={`/${lang}/dossier/${article.slug}`}
              className="group block border border-theme r-md p-6 transition-colors hover:border-[var(--accent)]"
              style={{ background: "var(--surface)" }}
            >
              <span
                className="text-[10px] font-semibold uppercase"
                style={{ color: "var(--accent)", letterSpacing: "0.14em" }}
              >
                {personLabel(article.person!)} · {getCategoryLabel(article.category, lang)}
              </span>
              <h2
                className="mt-2 text-[1.2rem] leading-snug transition-colors group-hover:text-[var(--accent)]"
                style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 700 }}
              >
                {article[lang].title}
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed" style={{ color: "var(--muted)" }}>
                {article[lang].description}
              </p>
              <span
                className="mt-4 inline-block text-[12px] font-semibold"
                style={{ color: "var(--accent)" }}
              >
                {t("readMore")}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <FormaFooter />
    </div>
  );
}
