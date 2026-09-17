import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toLocale } from "@/lib/locales";
import { copy } from "@/lib/i18n";
import { articles, getArticle, getRelatedArticles } from "@/lib/articles";
import SiteNav from "@/components/SiteNav";
import { FormaFooter } from "@/components/FormaFooter";
import ArticleBody from "@/components/ArticleBody";
import { ArtHeader, PAINTINGS } from "@/components/ArtHeader";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = toLocale(rawLang);
  const article = getArticle(slug);
  if (!article) return {};

  const locale = article[lang];
  const ogImage = `/api/og?slug=${article.slug}&lang=${lang}`;

  return {
    title: locale.title,
    description: locale.description,
    openGraph: {
      type: "article",
      title: locale.title,
      description: locale.description,
      publishedTime: article.publishedAt,
      tags: article.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: locale.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: locale.title,
      description: locale.description,
      images: [ogImage],
    },
  };
}

function formatDate(iso: string, lang: "it" | "en") {
  const d = new Date(iso);
  return d.toLocaleDateString(lang === "it" ? "it-IT" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const lang = toLocale(rawLang);
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const article = getArticle(slug);
  if (!article) notFound();

  const locale = article[lang];
  const related = getRelatedArticles(article, 3);
  const readingMinutes = Math.max(3, Math.round(locale.body.split(/\s+/).length / 200));

  return (
    <div className="min-h-screen bg-page relative overflow-x-hidden">
      <SiteNav />

      <div className="mx-auto max-w-[800px] px-4 sm:px-6">
        <ArtHeader
          compact
          painting={article.category === "mentalist" ? PAINTINGS.mentalist : PAINTINGS.psicologia}
          kicker={article.category === "mentalist" ? t("navMentalist") : t("navPsicologia")}
          title={locale.title}
        />

        <div
          className="flex flex-wrap items-center gap-3 pb-8 pt-4 text-[13px]"
          style={{ color: "var(--muted)" }}
        >
          <span>
            {t("publishedOn")} {formatDate(article.publishedAt, lang)}
          </span>
          <span aria-hidden>·</span>
          <span>
            {readingMinutes} {t("minRead")}
          </span>
        </div>

        <ArticleBody body={locale.body} />

        <div className="mt-12 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="r-sm border px-2.5 py-1 text-[11px]"
              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-10 border-t border-theme pt-6">
          <Link
            href={`/${lang}/articoli`}
            className="text-sm font-semibold"
            style={{ color: "var(--accent)" }}
          >
            {t("backToArticles")}
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mx-auto max-w-[1000px] px-4 py-16 sm:px-6">
          <h2
            className="text-[1.3rem]"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: 500 }}
          >
            {t("relatedTitle")}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/${lang}/articoli/${r.slug}`}
                className="group block border border-theme r-md p-5 transition-colors hover:border-[var(--accent)]"
                style={{ background: "var(--surface)" }}
              >
                <span
                  className="text-[10px] font-semibold uppercase"
                  style={{ color: "var(--accent)", letterSpacing: "0.14em" }}
                >
                  {r.category === "mentalist" ? t("navMentalist") : t("navPsicologia")}
                </span>
                <h3
                  className="mt-2 text-[1rem] leading-snug transition-colors group-hover:text-[var(--accent)]"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: 500 }}
                >
                  {r[lang].title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      <FormaFooter />
    </div>
  );
}
