import type { Metadata } from "next";
import { toLocale } from "@/lib/locales";
import { copy } from "@/lib/i18n";
import { getGuideArticles, getCategoryLabel } from "@/lib/articles";
import SiteNav from "@/components/SiteNav";
import { OsservatorioFooter } from "@/components/OsservatorioFooter";
import { ArtHeader, PAINTINGS } from "@/components/ArtHeader";
import GuideListAntd from "@/components/GuideListAntd";

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
        <GuideListAntd
          items={list.map((article) => ({
            slug: article.slug,
            href: `/${lang}/articoli/${article.slug}`,
            category: getCategoryLabel(article.category, lang),
            title: article[lang].title,
            description: article[lang].description,
            cta: t("readMore"),
          }))}
        />
      </div>

      <OsservatorioFooter />
    </div>
  );
}
