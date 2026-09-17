import type { Metadata } from "next";
import Link from "next/link";
import { toLocale } from "@/lib/locales";
import { copy } from "@/lib/i18n";
import { getAllArticlesSorted } from "@/lib/articles";
import SiteNav from "@/components/SiteNav";
import { FormaFooter } from "@/components/FormaFooter";
import HomeHero from "@/components/HomeHero";

const META = {
  it: {
    title: "INSPO — Il Mentalist e la psicologia dell'osservazione",
    description:
      'Analisi da fan su Patrick Jane e "Il Mentalist", più guide pratiche di psicologia.',
  },
  en: {
    title: "INSPO — The Mentalist and the psychology of observation",
    description:
      'Fan analysis of Patrick Jane and "The Mentalist", plus practical psychology guides.',
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: "INSPO" }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const featured = getAllArticlesSorted().slice(0, 3);

  return (
    <div className="min-h-screen bg-page relative overflow-x-hidden">
      <SiteNav />
      <HomeHero lang={lang} />

      {/* Featured articles */}
      <section className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-10">
        <span
          className="block text-[11px] font-semibold uppercase"
          style={{ color: "var(--muted)", letterSpacing: "0.2em" }}
        >
          {t("featuredKicker")}
        </span>
        <h2
          className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)]"
          style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: 500 }}
        >
          {t("featuredTitle")}
        </h2>
        <p className="mt-3 max-w-xl text-[15px]" style={{ color: "var(--muted)" }}>
          {t("featuredSub")}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((article) => (
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
                {article.category === "mentalist" ? t("navMentalist") : t("navPsicologia")}
              </span>
              <h3
                className="mt-2 text-[1.15rem] leading-snug transition-colors group-hover:text-[var(--accent)]"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: 500 }}
              >
                {article[lang].title}
              </h3>
              <p
                className="mt-2 text-[13px] leading-relaxed line-clamp-3"
                style={{ color: "var(--muted)" }}
              >
                {article[lang].description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href={`/${lang}/articoli`}
            className="text-sm font-semibold"
            style={{ color: "var(--accent)" }}
          >
            {t("seeAllArticles")}
          </Link>
        </div>
      </section>

      {/* Category teasers */}
      <section className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Link
            href={`/${lang}/articoli?categoria=mentalist`}
            className="group block border border-theme r-md p-8 transition-colors hover:border-[var(--accent)]"
          >
            <h3
              className="text-[1.5rem] transition-colors group-hover:text-[var(--accent)]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: 500 }}
            >
              {t("categoryTeaserMentalistTitle")}
            </h3>
            <p className="mt-2 text-[14px]" style={{ color: "var(--muted)" }}>
              {t("categoryTeaserMentalistSub")}
            </p>
          </Link>
          <Link
            href={`/${lang}/articoli?categoria=psicologia`}
            className="group block border border-theme r-md p-8 transition-colors hover:border-[var(--accent)]"
          >
            <h3
              className="text-[1.5rem] transition-colors group-hover:text-[var(--accent)]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: 500 }}
            >
              {t("categoryTeaserPsicologiaTitle")}
            </h3>
            <p className="mt-2 text-[14px]" style={{ color: "var(--muted)" }}>
              {t("categoryTeaserPsicologiaSub")}
            </p>
          </Link>
        </div>
      </section>

      {/* Fan disclaimer */}
      <section className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 lg:px-10">
        <p
          className="max-w-2xl border-l-2 pl-4 text-[13px] leading-relaxed"
          style={{ borderColor: "var(--accent)", color: "var(--muted)" }}
        >
          {t("disclaimerShort")}
        </p>
      </section>

      <FormaFooter />
    </div>
  );
}
