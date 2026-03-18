import type { Metadata } from "next";
import { getBundle, bundles, formatPrice } from "@/lib/templates";
import BundleDetailContent from "@/components/BundleDetailContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://templatelab.io";

export async function generateStaticParams() {
  return bundles.map((b) => ({ bundleId: b.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ bundleId: string }> }
): Promise<Metadata> {
  const { bundleId } = await params;
  const bundle = getBundle(bundleId);
  if (!bundle) return { title: "Bundle not found" };
  const canonicalUrl = `${SITE_URL}/bundle/${bundleId}`;
  const savings = bundle.regularPrice - bundle.price;
  return {
    title: bundle.name,
    description: `${bundle.tagline}. ${bundle.highlights.join(" · ")}`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${bundle.name} — TemplateLab`,
      description: `${bundle.tagline}. ${formatPrice(bundle.price)} invece di ${formatPrice(bundle.regularPrice)}. Risparmia ${formatPrice(savings)}.`,
      type: "website",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: `${bundle.name} — TemplateLab`,
      description: bundle.tagline,
    },
  };
}

export default async function BundlePage(
  { params }: { params: Promise<{ bundleId: string }> }
) {
  const { bundleId } = await params;
  const bundle = getBundle(bundleId);

  const jsonLd = bundle
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: bundle.name,
        description: bundle.description,
        url: `${SITE_URL}/bundle/${bundleId}`,
        brand: { "@type": "Brand", name: "TemplateLab" },
        offers: {
          "@type": "Offer",
          price: (bundle.price / 100).toFixed(2),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/bundle/${bundleId}`,
          priceValidUntil: "2027-12-31",
        },
        keywords: bundle.tags.join(", "),
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
      <BundleDetailContent bundleId={bundleId} />
    </>
  );
}
