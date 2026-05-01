import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = { title: "AI Studio — FORMA" };

const EXAMPLES = [
  { prompt: "Landing page per una SaaS di analytics con hero scuro e piano prezzi", output: "HTML · ~3 sezioni" },
  { prompt: "Workspace Notion per freelance con CRM clienti e tracker fatture",     output: "Notion · 4 database" },
  { prompt: "Email di onboarding per un corso online in 5 step",                    output: "HTML · email template" },
];

export default function AIStudioPage() {
  return (
    <div className="fn-bg">
      <div className="fn-shell">
        <SiteNav />
        <main className="fn-simple">
          <div className="fn-kicker" style={{ marginBottom: 12 }}>Intelligenza artificiale</div>
          <h1>AI Studio</h1>
          <p>Descrivi cosa ti serve. FORMA genera la struttura corretta in pochi secondi.</p>

          {/* How it works */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(242,232,208,.10)", marginTop: 48 }}>
            {[
              { icon: "01", title: "Descrivi",    desc: "Scrivi un prompt: tipo di template, tono, sezioni, colori. Più dettagli dai, migliore è il risultato." },
              { icon: "02", title: "Genera",      desc: "L'AI produce codice HTML o struttura Notion ottimizzata, pronta per essere usata o modificata." },
              { icon: "03", title: "Personalizza", desc: "Raffina nel prompt, cambia sezioni, rigenera singoli blocchi. Poi scarica il file definitivo." },
            ].map(step => (
              <div key={step.icon} style={{ padding: "28px 24px", background: "rgba(255,248,230,.03)" }}>
                <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 40, fontWeight: 300, color: "#c99a52", lineHeight: 1, marginBottom: 14 }}>
                  {step.icon}
                </div>
                <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontSize: 22, margin: "0 0 8px", color: "#f5ecd8" }}>
                  {step.title}
                </h3>
                <p style={{ color: "#8a8278", fontSize: 14, lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Example prompts */}
          <div style={{ marginTop: 56 }}>
            <div className="fn-kicker" style={{ marginBottom: 10 }}>Esempi</div>
            <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(26px,4vw,42px)", margin: "0 0 22px", color: "#f5ecd8" }}>
              Cosa puoi generare
            </h2>
            <div style={{ display: "grid", gap: 1, background: "rgba(242,232,208,.10)" }}>
              {EXAMPLES.map(ex => (
                <div key={ex.prompt} style={{ padding: "20px 24px", background: "rgba(255,248,230,.03)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                  <p style={{ color: "#c9bfb2", fontSize: 14, lineHeight: 1.55, margin: 0, fontStyle: "italic", flex: 1 }}>
                    &ldquo;{ex.prompt}&rdquo;
                  </p>
                  <span style={{ color: "#c99a52", fontSize: 11, textTransform: "uppercase", letterSpacing: ".14em", whiteSpace: "nowrap" }}>
                    {ex.output}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 52, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="fn-btn primary" href="/studio">Apri lo Studio →</Link>
            <Link className="fn-btn" href="/catalogo">Sfoglia il catalogo</Link>
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
