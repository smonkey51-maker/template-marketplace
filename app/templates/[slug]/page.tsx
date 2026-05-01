import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import { templates, getTemplate, formatPrice, templatesMeta } from "@/lib/templates";
import { TemplateDetailContent } from "./TemplateDetailContent";

export function generateStaticParams() {
  return templates.map(t => ({ slug: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getTemplate(slug);
  if (!item) return { title: "Non trovato — FORMA" };
  return {
    title: `${item.name} — FORMA`,
    description: item.description,
    openGraph: {
      title: `${item.name} — FORMA`,
      description: item.description,
      type: "website",
    },
  };
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getTemplate(slug);
  if (!item) notFound();

  // Strip content field — pass only metadata to the client component
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content: _content, ...meta } = item;

  // Related: same tags, different id, max 3
  const related = templatesMeta
    .filter(t => t.id !== item.id && t.tags.some(tag => item.tags.includes(tag)))
    .slice(0, 3);


  // JSON-LD product schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description: item.description,
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
