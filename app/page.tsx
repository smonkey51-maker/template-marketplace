import type { Metadata } from "next";
import { ArrowRight, LayoutTemplate, MonitorSmartphone, Smartphone, Presentation } from "lucide-react";

export const metadata: Metadata = {
  title: "FORMA — Arte, in tasca.",
  description:
    "Template multipiattaforma pronti all'uso: Notion, Web, Mobile e Pitch. Personalizza in pochi minuti, pubblica con una qualità che si vede.",
  openGraph: {
    title: "FORMA — Arte, in tasca.",
    description: "Template multipiattaforma pronti all'uso: Notion, Web, Mobile e Pitch.",
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "FORMA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FORMA — Arte, in tasca.",
    description: "Template multipiattaforma pronti all'uso: Notion, Web, Mobile e Pitch.",
    images: ["/api/og"],
  },
};

export default function Page() {
  return (
    <div className="fp-page">
      <LandingContent />
    </div>
  );
}

/* ── Server-renderable landing (no state) ── */
function LandingContent() {
  const tiles = ["Notion", "Web", "Mobile", "Pitch"] as const;
  return (
    <>
      {/* Hero */}
      <section className="fp-hero">
        <div className="fp-eyebrow">
          <span className="fp-dot" />
          Template multipiattaforma
        </div>
        <h1 className="fp-h1">Arte, in tasca.</h1>
        <p className="fp-lead">
          Template pronti, belli e senza fuffa. Scegli la piattaforma, personalizza in pochi minuti,
          pubblica con una qualità che si vede.
        </p>
        <div className="fp-actions">
          <a className="fp-btn primary" href="#explore">
            Esplora template <ArrowRight size={16} />
          </a>
          <a className="fp-btn" href="/app">Apri piattaforma</a>
        </div>
      </section>

      {/* Browser mockup */}
      <section className="fp-showcase">
        <div className="fp-browser">
          <div className="fp-browserbar">
            <span /><span /><span />
          </div>
          <div className="fp-template-grid">
            <div className="fp-tile large">
              <span className="fp-badge">FORMA</span>
              <h3>Template che sembrano prodotti.</h3>
              <p>Non parti da zero. Parti da una struttura già pensata, già bella, già utile.</p>
              <div className="fp-orb" />
            </div>
            {tiles.map(x => (
              <div className="fp-tile" key={x}>
                <h3>{x}</h3>
                <p>Pronto da adattare alla tua piattaforma.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature section */}
      <section className="fp-section" id="explore">
        <h2>Un sistema per creare più in fretta, con più gusto.</h2>
        <p>
          FORMA porta arte applicata al tech: template Notion, Web, Mobile e Pitch già progettati
          con logica, gerarchia e cura editoriale.
        </p>
        <div className="fp-cards">
          <div className="fp-card">
            <LayoutTemplate color="#d4af37" size={24} />
            <h3>Notion</h3>
            <p>Workspace già ordinati.</p>
          </div>
          <div className="fp-card">
            <MonitorSmartphone color="#d4af37" size={24} />
            <h3>Web</h3>
            <p>Landing e UI pronte.</p>
          </div>
          <div className="fp-card">
            <Smartphone color="#d4af37" size={24} />
            <h3>Mobile</h3>
            <p>Screen da prototipo.</p>
          </div>
          <div className="fp-card">
            <Presentation color="#d4af37" size={24} />
            <h3>Pitch</h3>
            <p>Deck con narrativa.</p>
          </div>
        </div>
      </section>

      <footer className="forma-footer">FORMA © Premium Brand System</footer>
    </>
  );
}
