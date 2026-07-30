import type { Metadata } from "next";
import MotionWrapper from "./MotionWrapper";

export const metadata: Metadata = {
  title: "Catalogo Template — FORMA",
  description:
    "Sfoglia il catalogo completo: template HTML, Notion, Shopify e WordPress pronti all'uso. Oltre 50 template per landing page, SaaS, portfolio, dashboard e molto altro.",
  openGraph: {
    title: "Catalogo Template — FORMA",
    description:
      "Template digitali pronti all'uso: HTML, Notion, Shopify, WordPress. Acquisto unico, download immediato.",
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "FORMA Catalogo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catalogo Template — FORMA",
    description: "Template digitali pronti all'uso: HTML, Notion, Shopify, WordPress.",
  },
};

export default function CatalogoLayout({ children }: { children: React.ReactNode }) {
  return <MotionWrapper>{children}</MotionWrapper>;
}
