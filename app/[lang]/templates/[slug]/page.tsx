import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import {
  sellableTemplates,
  getTemplate,
  formatPrice,
  sellableTemplatesMeta,
} from "@/lib/templates";
import { getLocalizedName, getLocalizedDesc } from "@/lib/i18n";
import { toLocale } from "@/lib/locales";
import { TemplateDetailContent } from "./TemplateDetailContent";

export function generateStaticParams() {
  // Retired products get no page: they are withdrawn from sale, and this page
  // sells. Past buyers reach their file through /account, which resolves the
  // template by id from the full list and never comes through here.
  return sellableTemplates.map((t) => ({ slug: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}): Promise<Metadata> {
  const { slug, lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const item = getTemplate(slug);
  if (!item) return { title: lang === "it" ? "Non trovato" : "Not found" };
  // Localised, because this is what a search engine indexes and what a link
  // preview shows: an English title under /it is the same bug as an English
  // heading on the page, just harder to notice.
  const name = getLocalizedName(item, lang);
  const description = getLocalizedDesc(item, lang);
  return {
    // Bare title: the root layout appends " — FORMA" via its title template.
    title: name,
    description,
    openGraph: {
      title: `${name} — FORMA`,
      description,
      type: "website",
    },
  };
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const item = getTemplate(slug);
  if (!item || item.retired) notFound();

  // Strip content field — pass only metadata to the client component

  const { content: _content, ...meta } = item;

  // Related: same tags, different id, max 3
  const related = sellableTemplatesMeta
    .filter((t) => t.id !== item.id && t.tags.some((tag) => item.tags.includes(tag)))
    .slice(0, 3);

  // JSON-LD product schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: getLocalizedName(item, lang),
    description: getLocalizedDesc(item, lang),
    offers: {
      "@type": "Offer",
      price: (item.price / 100).toFixed(2),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "FORMA" },
    },
  };

  return (
    <div className="fn-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="fn-shell">
        <SiteNav />
        <TemplateDetailContent item={meta} related={related} />
      </div>
    </div>
  );
}
