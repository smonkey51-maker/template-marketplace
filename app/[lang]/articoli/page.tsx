import type { Metadata } from "next";
import Link from "next/link";
import { toLocale } from "@/lib/locales";
import { copy } from "@/lib/i18n";
import { getAllArticlesSorted, type ArticleCategory } from "@/lib/articles";
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

const FILTERS: { key: ArticleCategory | "all"; labelKey: keyof typeof copy.it }[] = [
  { key: "all", labelKey: "filterAll" },
  { key: "mentalist", labelKey: "filterMentalist" },
  { key: "psicologia", labelKey: "filterPsicologia" },
];

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

  const active: ArticleCategory | "all" =
    categoria === "mentalist" || categoria === "psicologia" ? categoria : "all";

  const all = getAllArticlesSorted();
  const list = active === "all" ? all : all.filter((a) => a.category === active);

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
          {FILTERS.map((f) => (
            <Link
              key={f.key}
              href={f.key === "all" ? `/${lang}/articoli` : `/${lang}/articoli?categoria=${f.key}`}
              className="r-md border px-4 py-2 text-[13px] font-semibold transition-colors"
              style={{
                borderColor: active === f.key ? "var(--accent)" : "var(--border)",
                color: active === f.key ? "var(--accent)" : "var(--text)",
                background:
                  active === f.key
                    ? "color-mix(in srgb, var(--accent) 8%, transparent)"
                    : "transparent",
              }}
            >
              {t(f.labelKey)}
            </Link>
          ))}
        </div>

        {/* List */}
        {list.length === 0 ? (
          <p className="mt-12 text-[14px]" style={{ color: "var(--muted)" }}>
            {t("noArticles")}
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
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
                  {article.category === "mentalist" ? t("navMentalist") : t("navPsicologia")}
                </span>
                <h2
                  className="mt-2 text-[1.2rem] leading-snug transition-colors group-hover:text-[var(--accent)]"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: 500 }}
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
        )}
      </div>

      <FormaFooter />
    </div>
  );
}
