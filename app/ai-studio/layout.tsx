import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Studio — FORMA",
  description: "Genera template HTML e Notion personalizzati con l'AI. Descrivi cosa ti serve, FORMA costruisce la struttura in pochi secondi.",
  openGraph: {
    title: "AI Studio — FORMA",
    description: "Genera template su misura con l'intelligenza artificiale. Prompt → template → download.",
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "FORMA AI Studio" }],
  },
};

export default function AIStudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
