import type { Metadata } from "next";
import { Suspense } from "react";
import { formatPrice } from "@/lib/templates";
import { getTemplateFromDb, getAllTemplates } from "@/lib/templatesDb";
import PreviewContent from "@/components/PreviewContent";
import ReviewSection from "@/components/ReviewSection";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://forma.design";

export async function generateStaticParams() {
  try {
    const templates = await getAllTemplates();
    return templates.map((t) => ({ templateId: t.id }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ templateId: string }>;
}): Promise<Metadata> {
  const { templateId } = await params;
  const template = await getTemplateFromDb(templateId);
  if (!template) return { title: "Template not found" };
  const ogImage = `/api/og?id=${templateId}`;
  const canonicalUrl = `${SITE_URL}/preview/${templateId}`;
  return {
    title: template.name,
    description: template.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${template.name} — Forma`,
      description: template.description,
      type: "website",
      url: canonicalUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: template.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${template.name} — Forma`,
      description: template.description,
      images: [ogImage],
    },
  };
}

export default async function PreviewPage({ params }: { params: Promise<{ templateId: string }> }) {
  const { templateId } = await params;
  const template = await getTemplateFromDb(templateId);

  const jsonLd = template
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: template.name,
        description: template.description,
        url: `${SITE_URL}/preview/${templateId}`,
        image: `${SITE_URL}/api/og?id=${templateId}`,
        brand: { "@type": "Brand", name: "Forma" },
        category: "UI Template",
        seller: { "@type": "Organization", name: "Forma", url: SITE_URL },
        offers: {
          "@type": "Offer",
          price: (template.price / 100).toFixed(2),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/preview/${templateId}`,
        },
        keywords: template.tags.join(", "),
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <PreviewContent templateId={templateId} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 border-t border-theme">
        <h2 className="text-[15px] font-bold text-theme mb-6">Recensioni</h2>
        <Suspense fallback={<div className="h-20 animate-pulse bg-theme/5" />}>
          <ReviewSection templateId={templateId} />
        </Suspense>
      </div>
    </>
  );
}
