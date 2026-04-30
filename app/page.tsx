import type { Metadata } from "next";
import HomeContentV3 from "@/components/HomeContentV3";
import { templates } from "@/lib/templates";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://forma.design";

export const metadata: Metadata = {
  title: "Forma — Template UI e Prompt AI pronti all'uso",
  description:
    "Scarica template HTML/UI e prompt AI professionali. Personalizzali con lo Studio AI integrato. Acquisto unico, nessun abbonamento.",
  openGraph: {
    title: "Forma — Template UI e Prompt AI pronti all'uso",
    description:
      "Scarica template HTML/UI e prompt AI professionali. Personalizzali con lo Studio AI integrato.",
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Forma" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forma — Template UI e Prompt AI pronti all'uso",
    description: "Scarica template HTML/UI e prompt AI professionali.",
    images: ["/api/og"],
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Forma",
    url: SITE_URL,
    description: "Template UI e Prompt AI pronti all'uso",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Template Forma",
    url: SITE_URL,
    numberOfItems: templates.length,
    itemListElement: templates.slice(0, 50).map((tmpl, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${SITE_URL}/preview/${tmpl.id}`,
      name: tmpl.name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <HomeContentV3 />
    </>
  );
}
