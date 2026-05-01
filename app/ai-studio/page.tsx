import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = { title: "AI Studio — FORMA" };

export default function AIStudioPage() {
  return (
    <div className="fn-bg">
      <div className="fn-shell">
        <SiteNav />
        <main className="fn-simple">
          <h1>AI Studio</h1>
          <p>Descrivi cosa ti serve. FORMA ti propone la struttura corretta.</p>
          <div className="fn-box">
            Prompt → struttura → template scaricabile.
          </div>
          <div style={{ marginTop: 32, display: "flex", gap: 16 }}>
            <Link className="fn-btn primary" href="/studio">Apri Studio</Link>
            <Link className="fn-btn" href="/">Torna alla landing</Link>
          </div>
        </main>
        <footer className="fn-footer">
          <span>FORMA</span>
          <span><Link href="/">Home</Link> · <Link href="/catalogo">Catalogo</Link></span>
        </footer>
      </div>
    </div>
  );
}
