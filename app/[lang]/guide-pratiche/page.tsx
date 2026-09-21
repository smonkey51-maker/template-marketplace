import type { Metadata } from "next";
import Link from "next/link";
import { toLocale } from "@/lib/locales";
import { copy } from "@/lib/i18n";
import { getGuideArticles, getCategoryLabel } from "@/lib/articles";
import SiteNav from "@/components/SiteNav";
import { OsservatorioFooter } from "@/components/OsservatorioFooter";
import { ArtHeader, PAINTINGS } from "@/components/ArtHeader";

const META = {
  it: {
    title: "Guide Pratiche — OSSERVATORIO",
    description: "Guide lunghe, passo dopo passo, su difesa psicologica e comunicazione.",
  },
  en: {
    title: "Practical Guides — OSSERVATORIO",
    description: "Long-form, step-by-step guides on psychological self-defense and communication.",
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
      canonical: `/${lang}/guide-pratiche`,
      languages: { it: "/it/guide-pratiche", en: "/en/guide-pratiche" },
    },
  };
}

export default async function GuidePratichePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const list = getGuideArticles();

  return (
    <div className="min-h-screen bg-page relative overflow-x-hidden">
      <SiteNav />
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-10">
        <ArtHeader
          painting={PAINTINGS.guide}
          kicker={t("guideKicker")}
          title={t("guideTitle")}
          subtitle={t("guideSub")}
        />
      </div>

      <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {list.map((article) => (
            <Link
              key={article.slug}
              href={`/${lang}/articoli/${article.slug}`}
              className="group block border border-theme r-md p-6 transition-colors hover:border-[var(--accent)]"
              style={{ background: "var(--surface)" }}
            >
              <span
                className="text-[10px] font-semibold uppercase"
                style={{ color: "var(--accent)", letterSpacing: "0.14em" }}
              >
                {getCategoryLabel(article.category, lang)}
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

      <OsservatorioFooter />
    </div>
  );
}
