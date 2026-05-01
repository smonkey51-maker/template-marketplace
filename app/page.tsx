import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "FORMA — Template come oggetti curati.",
  description: "Ogni file è un gesto preciso, non una soluzione generica. Template digitali per Notion, Web, App e Deck.",
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
        <main className="fn-hero">
          <section>
            <div className="fn-kicker">Edizione digitale · Vol. I</div>
            <h1>Template come<br />oggetti curati.</h1>
            <p>Ogni file è un gesto preciso, non una soluzione generica.</p>
            <div className="fn-actions">
              <a className="fn-btn primary" href="/catalogo">Sfoglia</a>
              <a className="fn-btn gold" href="/ai-studio">AI Studio →</a>
            </div>
          </section>
          <aside className="fn-stats">
            <div className="fn-stat"><b>40+</b><span>Template nel catalogo</span></div>
            <div className="fn-stat"><b>4</b><span>Categorie</span></div>
            <div className="fn-stat"><b>€19</b><span>Da · Acquisto unico</span></div>
          </aside>
        </main>
        <footer className="fn-footer">
          <span>FORMA</span>
          <span>
            <a href="/">Home</a> · <a href="/catalogo">Catalogo</a> · <a href="/guida">Guida</a> · <a href="/account">Account</a>
          </span>
        </footer>
      </div>
    </div>
  );
}
