import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guida all'uso — FORMA",
  description:
    "Come scegliere, acquistare e usare i template FORMA. FAQ, istruzioni per HTML, Notion e Shopify, info su download e licenze.",
  openGraph: {
    title: "Guida all'uso — FORMA",
    description: "Come scegliere, acquistare e usare i template FORMA. FAQ, istruzioni, licenze.",
    type: "website",
  },
};

export default function GuidaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
