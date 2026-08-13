import type { Metadata } from "next";
import { Suspense } from "react";
import { formatPrice } from "@/lib/templates";
import { resolveTemplate, resolveAllTemplates } from "@/lib/templatesDb";
import PreviewContent from "@/components/PreviewContent";
import ReviewSection from "@/components/ReviewSection";
import { getLocalizedName, getLocalizedDesc } from "@/lib/i18n";
import { toLocale } from "@/lib/locales";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ateliernove.com";

export async function generateStaticParams() {
  try {
    const templates = await resolveAllTemplates();
    return templates.map((t) => ({ templateId: t.id }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ templateId: string; lang: string }>;
}): Promise<Metadata> {
  const { templateId, lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const template = await resolveTemplate(templateId);
  if (!template) return { title: lang === "it" ? "Template non trovato" : "Template not found" };
  const name = getLocalizedName(template, lang);
  const description = getLocalizedDesc(template, lang);
  const ogImage = `/api/og?id=${templateId}&lang=${lang}`;
  const canonicalUrl = `${SITE_URL}/preview/${templateId}`;
  return {
    title: name,
    description: description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${name} — Atelier Nove`,
      description: description,
      type: "website",
      url: canonicalUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} — Atelier Nove`,
      description: description,
      images: [ogImage],
    },
  };
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ templateId: string; lang: string }>;
}) {
  const { templateId, lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const template = await resolveTemplate(templateId);

  const jsonLd = template
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: getLocalizedName(template, lang),
        description: getLocalizedDesc(template, lang),
        url: `${SITE_URL}/preview/${templateId}`,
        image: `${SITE_URL}/api/og?id=${templateId}&lang=${lang}`,
        brand: { "@type": "Brand", name: "Atelier Nove" },
        category: "UI Template",
        seller: { "@type": "Organization", name: "Atelier Nove", url: SITE_URL },
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
      {/* id + scroll-mt: the account page links straight here, and the sticky
          buy bar sits at the bottom while the header floats at the top — an
          un-offset anchor lands the heading under the chrome. */}
      <div
        id="recensioni"
        className="max-w-5xl mx-auto px-4 sm:px-6 py-10 border-t border-theme"
        style={{ scrollMarginTop: "96px" }}
      >
        <h2 className="text-[15px] font-bold text-theme mb-6">Recensioni</h2>
        <Suspense fallback={<div className="h-20 animate-pulse bg-theme/5" />}>
          <ReviewSection templateId={templateId} />
        </Suspense>
      </div>
    </>
  );
}
