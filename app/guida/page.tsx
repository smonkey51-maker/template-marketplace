import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = { title: "Guida — FORMA" };

export default function GuidaPage() {
  return (
    <div className="fn-bg">
      <div className="fn-shell">
        <SiteNav />
        <main className="fn-simple">
          <h1>Guida</h1>
          <p>Come scegliere, acquistare e usare i template FORMA.</p>
          <div className="fn-box">
            1. Scegli il formato. &nbsp;2. Guarda anteprima. &nbsp;3. Acquista. &nbsp;4. Scarica e usa.
          </div>
          <div style={{ marginTop: 32 }}>
            <Link className="fn-btn primary" href="/">Torna alla landing</Link>
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
