import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = { title: "Guida — FORMA" };

const STEPS = [
  {
    n: "01",
    title: "Scegli il formato",
    body: "Naviga il catalogo e filtra per tipo: HTML, Notion, Shopify, WordPress. Ogni template mostra anteprima, prezzo e specifiche tecniche.",
  },
  {
    n: "02",
    title: "Anteprima e dettagli",
    body: "Apri la pagina del template per vedere il design nel dettaglio, leggere le caratteristiche e verificare la compatibilità con il tuo flusso di lavoro.",
  },
  {
    n: "03",
    title: "Acquista",
    body: "Checkout sicuro via Stripe. Accettiamo carta di credito e PayPal. Acquisto una tantum — nessun abbonamento, nessun rinnovo.",
  },
  {
    n: "04",
    title: "Scarica e usa subito",
    body: "File disponibile immediatamente nell'area account e via email. HTML → apri in qualsiasi editor. Notion → duplica nel workspace. Shopify/WP → carica come tema.",
  },
];

const FAQS = [
  {
    q: "Posso modificare i template liberamente?",
    a: "Sì. Ogni template è completamente editabile. I file HTML usano Tailwind CDN — basta aprire in un editor e cambiare testi, colori e sezioni. I template Notion si duplicano e modificano direttamente nel workspace.",
  },
  {
    q: "Quante volte posso scaricare?",
    a: "Illimitatamente. Una volta acquistato, il template è tuo per sempre — nessuna restrizione di download, nessuna scadenza.",
  },
  {
    q: "L'uso commerciale è incluso?",
    a: "Sì. Puoi usare i template per progetti clienti e applicazioni commerciali. Non è consentita la rivendita del file originale su altri marketplace.",
  },
  {
    q: "Come funziona l'AI Studio?",
    a: "Descrivi il template che vuoi (tipo, stile, sezioni, tono). L'AI genera una struttura HTML o Notion pronta all'uso in pochi secondi. Puoi poi personalizzarla nell'editor integrato.",
  },
  {
    q: "Esiste assistenza dopo l'acquisto?",
    a: "Sì. Per ogni domanda tecnica scrivi a supporto@forma.design — risposta entro 24 ore lavorative.",
  },
];

export default function GuidaPage() {
  return (
    <div className="fn-bg">
      <div className="fn-shell">
        <SiteNav />
        <main className="fn-simple">
          <div className="fn-kicker" style={{ marginBottom: 12 }}>Documentazione</div>
          <h1>Guida all&apos;uso</h1>
          <p>Come scegliere, acquistare e usare i template FORMA.</p>

          {/* Steps */}
          <div style={{ marginTop: 52, display: "grid", gap: 1, background: "rgba(242,232,208,.10)" }}>
            {STEPS.map(step => (
              <div
                key={step.n}
                style={{
                  display: "grid", gridTemplateColumns: "72px 1fr", gap: 28,
                  padding: "30px 26px",
                  background: "linear-gradient(160deg, rgba(255,248,230,.04), rgba(255,248,230,.01))",
                }}
              >
                <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 44, fontWeight: 300, color: "#c99a52", lineHeight: 1 }}>
                  {step.n}
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontSize: 22, margin: "4px 0 8px", color: "#f5ecd8" }}>
                    {step.title}
                  </h3>
                  <p style={{ color: "#8a8278", fontSize: 15, lineHeight: 1.65, margin: 0 }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div style={{ marginTop: 60 }}>
            <div className="fn-kicker" style={{ marginBottom: 10 }}>FAQ</div>
            <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(28px,4vw,44px)", margin: "0 0 24px", color: "#f5ecd8" }}>
              Domande frequenti
            </h2>
            <div style={{ display: "grid", gap: 1, background: "rgba(242,232,208,.10)" }}>
              {FAQS.map(faq => (
                <div key={faq.q} style={{ padding: "22px 26px", background: "rgba(255,248,230,.03)" }}>
                  <h4 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontSize: 19, margin: "0 0 7px", color: "#f5ecd8" }}>
                    {faq.q}
                  </h4>
                  <p style={{ color: "#8a8278", fontSize: 14, lineHeight: 1.65, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 48, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="fn-btn primary" href="/catalogo">Sfoglia il catalogo</Link>
            <Link className="fn-btn" href="/ai-studio">AI Studio →</Link>
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
