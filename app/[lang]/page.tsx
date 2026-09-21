import type { Metadata } from "next";
import Link from "next/link";
import { toLocale } from "@/lib/locales";
import { copy } from "@/lib/i18n";
import { getAllArticlesSorted, getCategoryLabel, getHomepageFeature } from "@/lib/articles";
import SiteNav from "@/components/SiteNav";
import { OsservatorioFooter } from "@/components/OsservatorioFooter";
import HomeHero from "@/components/HomeHero";

const META = {
  it: {
    title: "OSSERVATORIO — The Mentalist, osservazione e psicologia",
    description:
      'Patrick Jane e "Il Mentalist" letti attraverso psicologia, osservazione, linguaggio del corpo, persuasione e cold reading.',
  },
  en: {
    title: "OSSERVATORIO — The Mentalist, observation and psychology",
    description:
      'Patrick Jane and "The Mentalist" explored through psychology, observation, body language, persuasion and cold reading.',
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const m = META[lang];
  const ogImage = `/api/og?lang=${lang}`;
  return {
    title: { absolute: m.title },
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "OSSERVATORIO" }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [ogImage],
    },
    alternates: {
      canonical: `/${lang}`,
      languages: { it: "/it", en: "/en" },
    },
  };
}

function ArticleCard({
  article,
  lang,
  compact = false,
}: {
  article: ReturnType<typeof getAllArticlesSorted>[number];
  lang: "it" | "en";
  compact?: boolean;
}) {
  return (
    <Link
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
      <h3
        className={compact ? "mt-2 text-[1.1rem] leading-snug" : "mt-3 text-[1.45rem] leading-tight"}
        style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 600 }}
      >
        {article[lang].title}
      </h3>
      <p
        className={compact ? "mt-2 text-[13px] leading-relaxed line-clamp-3" : "mt-3 text-[14px] leading-relaxed line-clamp-4"}
        style={{ color: "var(--muted)" }}
      >
        {article[lang].description}
      </p>
    </Link>
  );
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const all = getAllArticlesSorted();
  const jane = getHomepageFeature();
  const recent = all.filter((article) => article.slug !== jane.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-page relative overflow-x-hidden">
      <SiteNav />
      <HomeHero lang={lang} />

      <section className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-10">
        <span
          className="block text-[11px] font-semibold uppercase"
          style={{ color: "var(--muted)", letterSpacing: "0.2em" }}
        >
          {t("featuredKicker")}
        </span>
        <h2
          className="mt-3 text-[clamp(2rem,4vw,3.2rem)]"
          style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 600 }}
        >
          {t("featuredTitle")}
        </h2>
        <p className="mt-3 max-w-2xl text-[15px]" style={{ color: "var(--muted)" }}>
          {t("featuredSub")}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Link
            href={`/${lang}/articoli/${jane.slug}`}
            className="group relative overflow-hidden border border-theme r-md p-8 transition-colors hover:border-[var(--accent)] lg:col-span-8 lg:p-10"
            style={{ background: "var(--surface)" }}
          >
            <span
              className="text-[10px] font-semibold uppercase"
              style={{ color: "var(--accent)", letterSpacing: "0.16em" }}
            >
              {t("janeKicker")}
            </span>
            <h3
              className="mt-5 max-w-[680px] text-[clamp(2rem,4vw,3.5rem)] leading-[1.02]"
              style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 700, letterSpacing: "-0.025em" }}
            >
              {jane[lang].title}
            </h3>
            <p className="mt-5 max-w-[650px] text-[15px] leading-7" style={{ color: "var(--muted)" }}>
              {jane[lang].description}
            </p>
            <span className="mt-8 inline-block text-sm font-semibold" style={{ color: "var(--accent)" }}>
              {t("janeRead")}
            </span>
            <span
              aria-hidden
              className="absolute -bottom-6 right-5 select-none text-[8rem] leading-none opacity-[0.035]"
              style={{ fontFamily: "var(--font-display), Georgia, serif", color: "var(--text)" }}
            >
              PJ
            </span>
          </Link>

          <div className="grid gap-6 lg:col-span-4">
            {recent.map((article) => (
              <ArticleCard key={article.slug} article={article} lang={lang} compact />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Link href={`/${lang}/articoli`} className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
            {t("seeAllArticles")}
          </Link>
        </div>
      </section>

      <section className="border-y border-theme" style={{ background: "var(--surface)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-10">
          <span
            className="block text-[11px] font-semibold uppercase"
            style={{ color: "var(--muted)", letterSpacing: "0.2em" }}
          >
            {t("journeyKicker")}
          </span>
          <h2
            className="mt-3 text-[clamp(2rem,4vw,3rem)]"
            style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 600 }}
          >
            {t("journeyTitle")}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-theme md:grid-cols-3">
            {[
              [t("journeyObserveTitle"), t("journeyObserveSub"), `/${lang}/dossier`],
              [t("journeyUnderstandTitle"), t("journeyUnderstandSub"), `/${lang}/articoli`],
              [t("journeyApplyTitle"), t("journeyApplySub"), `/${lang}/guide-pratiche`],
            ].map(([title, body, href]) => (
              <Link
                key={title}
                href={href}
                className="group min-h-[220px] p-7 transition-colors hover:bg-[var(--bg)]"
                style={{ background: "var(--surface)" }}
              >
                <h3
                  className="text-[1.45rem] group-hover:text-[var(--accent)]"
                  style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 600 }}
                >
                  {title}
                </h3>
                <p className="mt-4 text-[14px] leading-6" style={{ color: "var(--muted)" }}>
                  {body}
                </p>
                <span className="mt-8 inline-block text-sm" style={{ color: "var(--accent)" }}>
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Link
            href={`/${lang}/dossier`}
            className="group block border border-theme r-md p-8 transition-colors hover:border-[var(--accent)]"
          >
            <span className="text-[10px] font-semibold uppercase" style={{ color: "var(--accent)", letterSpacing: "0.16em" }}>
              {lang === "it" ? "Finzione → Psicologia" : "Fiction → Psychology"}
            </span>
            <h3
              className="mt-3 text-[1.7rem] transition-colors group-hover:text-[var(--accent)]"
              style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 700 }}
            >
              {t("categoryTeaserDossierTitle")}
            </h3>
            <p className="mt-3 text-[14px] leading-6" style={{ color: "var(--muted)" }}>
              {t("categoryTeaserDossierSub")}
            </p>
          </Link>

          <Link
            href={`/${lang}/guide-pratiche`}
            className="group block border border-theme r-md p-8 transition-colors hover:border-[var(--accent)]"
          >
            <span className="text-[10px] font-semibold uppercase" style={{ color: "var(--accent)", letterSpacing: "0.16em" }}>
              {lang === "it" ? "Psicologia → Pratica" : "Psychology → Practice"}
            </span>
            <h3
              className="mt-3 text-[1.7rem] transition-colors group-hover:text-[var(--accent)]"
              style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 700 }}
            >
              {t("categoryTeaserGuideTitle")}
            </h3>
            <p className="mt-3 text-[14px] leading-6" style={{ color: "var(--muted)" }}>
              {t("categoryTeaserGuideSub")}
            </p>
          </Link>
        </div>
      </section>

      <OsservatorioFooter />
    </div>
  );
}
