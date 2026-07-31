import type { Metadata } from "next";
import { formatPrice } from "@/lib/templates";
import { resolveBundle, resolveAllBundles } from "@/lib/templatesDb";
import BundleDetailContent from "@/components/BundleDetailContent";
import { getLocalizedName, getLocalizedDesc } from "@/lib/i18n";
import { toLocale } from "@/lib/locales";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://forma.design";

export async function generateStaticParams() {
  try {
    const bundles = await resolveAllBundles();
    return bundles.map((b) => ({ bundleId: b.id }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bundleId: string; lang: string }>;
}): Promise<Metadata> {
  const { bundleId, lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const bundle = await resolveBundle(bundleId);
  if (!bundle) return { title: lang === "it" ? "Bundle non trovato" : "Bundle not found" };
  const name = getLocalizedName(bundle, lang);
  const canonicalUrl = `${SITE_URL}/bundle/${bundleId}`;
  const savings = bundle.regularPrice - bundle.price;
  return {
    title: name,
    description: `${bundle.tagline}. ${bundle.highlights.join(" · ")}`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${name} — Forma`,
      description: `${bundle.tagline}. ${formatPrice(bundle.price)} invece di ${formatPrice(bundle.regularPrice)}. Risparmia ${formatPrice(savings)}.`,
      type: "website",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} — Forma`,
      description: bundle.tagline,
    },
  };
}

export default async function BundlePage({
  params,
}: {
  params: Promise<{ bundleId: string; lang: string }>;
}) {
  const { bundleId, lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const bundle = await resolveBundle(bundleId);

  const jsonLd = bundle
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: getLocalizedName(bundle, lang),
        description: getLocalizedDesc(bundle, lang),
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
