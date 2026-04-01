import type { Metadata } from "next";
import { formatPrice } from "@/lib/templates";
import { getBundleFromDb, getAllBundles } from "@/lib/templatesDb";
import BundleDetailContent from "@/components/BundleDetailContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://forma.design";

export async function generateStaticParams() {
  const bundles = await getAllBundles();
  return bundles.map((b) => ({ bundleId: b.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ bundleId: string }> }
): Promise<Metadata> {
  const { bundleId } = await params;
  const bundle = await getBundleFromDb(bundleId);
  if (!bundle) return { title: "Bundle not found" };
  const canonicalUrl = `${SITE_URL}/bundle/${bundleId}`;
  const savings = bundle.regularPrice - bundle.price;
  return {
    title: bundle.name,
    description: `${bundle.tagline}. ${bundle.highlights.join(" · ")}`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${bundle.name} — Forma`,
      description: `${bundle.tagline}. ${formatPrice(bundle.price)} invece di ${formatPrice(bundle.regularPrice)}. Risparmia ${formatPrice(savings)}.`,
      type: "website",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: `${bundle.name} — Forma`,
      description: bundle.tagline,
    },
  };
}

export default async function BundlePage(
  { params }: { params: Promise<{ bundleId: string }> }
) {
  const { bundleId } = await params;
  const bundle = await getBundleFromDb(bundleId);

  const jsonLd = bundle
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: bundle.name,
        description: bundle.description,
        url: `${SITE_URL}/bundle/${bundleId}`,
        brand: { "@type": "Brand", name: "Forma" },
        seller: { "@type": "Organization", name: "Forma", url: SITE_URL },
        offers: {
          "@type": "Offer",
          price: (bundle.price / 100).toFixed(2),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/bundle/${bundleId}`,
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
