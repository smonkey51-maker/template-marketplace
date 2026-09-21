import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toLocale } from "@/lib/locales";
import { copy } from "@/lib/i18n";
import { getArticle, getDossierArticles, getCategoryLabel } from "@/lib/articles";
import SiteNav from "@/components/SiteNav";
import { OsservatorioFooter } from "@/components/OsservatorioFooter";
import ArticleBody from "@/components/ArticleBody";
import EditorialLens from "@/components/EditorialLens";
import { ArtHeader, PAINTINGS } from "@/components/ArtHeader";

export function generateStaticParams() {
  return getDossierArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = toLocale(rawLang);
  const article = getArticle(slug);
  if (!article || !article.person) return {};
  const locale = article[lang];
  const ogImage = `/api/og?slug=${article.slug}&lang=${lang}`;
  return {
    title: locale.title,
    description: locale.description,
    openGraph: {
      type: "article",
      title: locale.title,
      description: locale.description,
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

export default async function DossierArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const lang = toLocale(rawLang);
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const article = getArticle(slug);
  if (!article || !article.person) notFound();

  const locale = article[lang];

  return (
    <div className="min-h-screen bg-page relative overflow-x-hidden">
      <SiteNav />
      <div className="mx-auto max-w-[800px] px-4 sm:px-6">
        <ArtHeader
          compact
          painting={PAINTINGS.dossier}
          kicker={getCategoryLabel(article.category, lang)}
          title={locale.title}
        />

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="r-sm border px-2.5 py-1 text-[10px] font-semibold uppercase" style={{ borderColor: "var(--border)", color: "var(--accent)", letterSpacing: "0.12em" }}>
            {article.person.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ")}
          </span>
          <span className="r-sm border px-2.5 py-1 text-[10px] font-semibold uppercase" style={{ borderColor: "var(--border)", color: "var(--muted)", letterSpacing: "0.12em" }}>
            {getCategoryLabel(article.category, lang)}
          </span>
        </div>

        <EditorialLens lang={lang} />
        <ArticleBody body={locale.body} />

        <div className="mt-10 border-t border-theme pt-6">
          <Link
            href={`/${lang}/dossier`}
            className="text-sm font-semibold"
            style={{ color: "var(--accent)" }}
          >
            {t("dossierBackToDossier")}
          </Link>
        </div>
      </div>
      <div className="mt-16">
        <OsservatorioFooter />
      </div>
    </div>
  );
}
