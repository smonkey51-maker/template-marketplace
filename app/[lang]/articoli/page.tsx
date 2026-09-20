import type { Metadata } from "next";
import Link from "next/link";
import { toLocale } from "@/lib/locales";
import { copy } from "@/lib/i18n";
import {
  getAllArticlesSorted,
  getCategoryLabel,
  ARTICLE_CATEGORIES,
  type ArticleCategory,
} from "@/lib/articles";
import SiteNav from "@/components/SiteNav";
import { FormaFooter } from "@/components/FormaFooter";
import { ArtHeader, PAINTINGS } from "@/components/ArtHeader";

const META = {
  it: {
    title: "Articoli — INSPO",
    description: 'Fan commentary su "Il Mentalist" e guide pratiche di psicologia.',
  },
  en: {
    title: "Articles — INSPO",
    description: 'Fan commentary on "The Mentalist" and practical psychology guides.',
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

const FILTER_LABEL_KEYS: Record<ArticleCategory, keyof typeof copy.it> = {
  corpo: "filterCorpo",
  persuasione: "filterPersuasione",
  mentalismo: "filterMentalismo",
  "contro-manipolazione": "filterContromanipolazione",
};

export default async function ArticoliPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { lang: rawLang } = await params;
  const { categoria } = await searchParams;
  const lang = toLocale(rawLang);
  const t = (k: keyof typeof copy.it) => copy[lang][k];

  const active: ArticleCategory | "all" = ARTICLE_CATEGORIES.includes(categoria as ArticleCategory)
    ? (categoria as ArticleCategory)
    : "all";

  const all = getAllArticlesSorted();
  const list = active === "all" ? all : all.filter((a) => a.category === active);
  // Asymmetric editorial layout, brief §12: the first (most recent) piece of
  // an unfiltered archive reads as a large featured lead, the rest as a
  // regular grid — instead of every card at the same weight.
  const featured = active === "all" ? list[0] : undefined;
  const rest = active === "all" ? list.slice(1) : list;

  return (
    <div className="min-h-screen bg-page relative overflow-x-hidden">
      <SiteNav />
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-10">
        <ArtHeader
          painting={PAINTINGS.articoli}
          kicker={t("articoliKicker")}
          title={t("articoliTitle")}
          subtitle={t("articoliSub")}
        />
      </div>

      <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 lg:px-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/${lang}/articoli`}
            className="r-md border px-4 py-2 text-[13px] font-semibold transition-colors"
            style={{
              borderColor: active === "all" ? "var(--accent)" : "var(--border)",
              color: active === "all" ? "var(--accent)" : "var(--text)",
              background:
                active === "all"
                  ? "color-mix(in srgb, var(--accent) 8%, transparent)"
                  : "transparent",
            }}
          >
            {t("filterAll")}
          </Link>
          {ARTICLE_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/${lang}/articoli?categoria=${cat}`}
              className="r-md border px-4 py-2 text-[13px] font-semibold transition-colors"
              style={{
                borderColor: active === cat ? "var(--accent)" : "var(--border)",
                color: active === cat ? "var(--accent)" : "var(--text)",
                background:
                  active === cat
                    ? "color-mix(in srgb, var(--accent) 8%, transparent)"
                    : "transparent",
              }}
            >
              {t(FILTER_LABEL_KEYS[cat])}
            </Link>
          ))}
        </div>

        {/* List */}
        {list.length === 0 ? (
          <p className="mt-12 text-[14px]" style={{ color: "var(--muted)" }}>
            {t("noArticles")}
          </p>
        ) : (
          <>
            {featured ? (
              <Link
                href={`/${lang}/articoli/${featured.slug}`}
                className="group mt-10 grid grid-cols-1 gap-6 border border-theme r-md p-8 transition-colors hover:border-[var(--accent)] md:grid-cols-[1.4fr_1fr] md:p-10"
                style={{ background: "var(--surface)" }}
              >
                <div>
                  <span
                    className="text-[10px] font-semibold uppercase"
                    style={{ color: "var(--accent)", letterSpacing: "0.14em" }}
                  >
                    {getCategoryLabel(featured.category, lang)}
                  </span>
                  <h2
                    className="mt-3 text-[clamp(1.5rem,3vw,2.1rem)] leading-tight transition-colors group-hover:text-[var(--accent)]"
                    style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 700 }}
                  >
                    {featured[lang].title}
                  </h2>
                  <span
                    className="mt-4 inline-block text-[12px] font-semibold"
                    style={{ color: "var(--accent)" }}
                  >
                    {t("readMore")}
                  </span>
                </div>
                <p
                  className="self-center text-[14px] leading-relaxed md:border-l md:pl-6"
                  style={{ color: "var(--muted)", borderColor: "var(--border)" }}
                >
                  {featured[lang].description}
                </p>
              </Link>
            ) : null}

            {rest.length > 0 && (
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                {rest.map((article) => (
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
                    <p
                      className="mt-2 text-[13px] leading-relaxed"
                      style={{ color: "var(--muted)" }}
                    >
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
            )}
          </>
        )}
      </div>

      <FormaFooter />
    </div>
  );
}
