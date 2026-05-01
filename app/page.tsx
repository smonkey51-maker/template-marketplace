import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import { HomeContent } from "@/components/HomeContent";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FORMA — Template come oggetti curati.",
  description: "Template digitali pronti all'uso: HTML, Notion, Shopify, WordPress. Ogni file è un gesto preciso, non una soluzione generica.",
  openGraph: {
    title: "FORMA — Template come oggetti curati.",
    description: "Ogni file è un gesto preciso, non una soluzione generica.",
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "FORMA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FORMA — Template come oggetti curati.",
    description: "Ogni file è un gesto preciso, non una soluzione generica.",
    images: ["/api/og"],
  },
};

export default function Page() {
  return (
    <div className="fn-bg">
      <div className="fn-shell">
        <SiteNav />
        <HomeContent />
        <footer className="fn-footer">
          <span>FORMA</span>
          <span>
            <Link href="/">Home</Link> · <Link href="/catalogo">Catalogo</Link> ·{" "}
            <Link href="/guida">Guida</Link> · <Link href="/account">Account</Link>
          </span>
        </footer>
      </div>
    </div>
  );
}
