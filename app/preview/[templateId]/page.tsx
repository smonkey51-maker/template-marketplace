import type { Metadata } from "next";
import { Suspense } from "react";
import { getTemplate, templates, formatPrice } from "@/lib/templates";
import PreviewContent from "@/components/PreviewContent";
import ReviewSection from "@/components/ReviewSection";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://templatelab.io";

export async function generateStaticParams() {
  return templates.map((t) => ({ templateId: t.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ templateId: string }> }
): Promise<Metadata> {
  const { templateId } = await params;
  const template = getTemplate(templateId);
  if (!template) return { title: "Template not found" };
  const ogImage = `/api/og?id=${templateId}`;
  const canonicalUrl = `${SITE_URL}/preview/${templateId}`;
  return {
    title: template.name,
    description: template.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${template.name} — TemplateLab`,
      description: template.description,
      type: "website",
      url: canonicalUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: template.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${template.name} — TemplateLab`,
      description: template.description,
      images: [ogImage],
    },
  };
}

export default async function PreviewPage(
  { params }: { params: Promise<{ templateId: string }> }
) {
  const { templateId } = await params;
  const template = getTemplate(templateId);

  const jsonLd = template
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: template.name,
        description: template.description,
        url: `${SITE_URL}/preview/${templateId}`,
        image: `${SITE_URL}/api/og?id=${templateId}`,
        brand: { "@type": "Brand", name: "TemplateLab" },
        category: "UI Template",
        offers: {
          "@type": "Offer",
          price: (template.price / 100).toFixed(2),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/preview/${templateId}`,
          priceValidUntil: "2027-12-31",
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
