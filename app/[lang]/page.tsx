import type { Metadata } from "next";
import CinematicHomepage from "@/components/CinematicHomepage";

export const metadata: Metadata = {
  title: "FORMA — Arte in tasca.",
  description:
    "Template digitali pronti all'uso: HTML, Notion, Shopify, WordPress. Ogni file è un gesto preciso, non una soluzione generica.",
  openGraph: {
    title: "FORMA — Arte in tasca.",
    description: "Ogni file è un gesto preciso, non una soluzione generica.",
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "FORMA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FORMA — Arte in tasca.",
    description: "Ogni file è un gesto preciso, non una soluzione generica.",
    images: ["/api/og"],
  },
};

export default function Page() {
  return (
    // Full-bleed cinematic homepage
    <CinematicHomepage />
  );
}
