import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import { templates, formatPrice } from "@/lib/templates";

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

const FEATURED_IDS = ["hero-saas", "cold-email-b2b", "notion-project-hub"];

const CATEGORIES = [
  { label: "HTML & Web",   desc: "Landing page, SaaS, portfolio, dashboard.",  count: "25+" },
  { label: "Notion",       desc: "CRM, tracker, second brain, client portal.",  count: "8" },
  { label: "Shopify / WP", desc: "Temi e layout per e-commerce e blog.",         count: "6" },
  { label: "App & Mobile", desc: "Schermate, showcase e prototipi mobile.",     count: "3+" },
];

function PreviewMock({ downloadType, tags }: { downloadType?: string; tags: string[] }) {
  const dt = downloadType ?? "html";
  const tagsStr = tags.join(" ").toLowerCase();
  if (dt === "notion") return (
    <div className="fn-preview fn-p-crm" style={{ height: 180 }}>
      {[0, 1, 2, 3].map(i => (
        <div className="fn-row" key={i}>
          <div className={`fn-cell${i === 1 ? " fn-goldcell" : ""}`} />
          <div className="fn-cell" /><div className="fn-cell" />
        </div>
      ))}
    </div>
  );
  if (tagsStr.includes("mobile") || tagsStr.includes("ios")) return (
    <div className="fn-preview fn-p-app" style={{ height: 180 }}>
      <div className="fn-phone">
        <div className="gold" /><div /><div /><div className="gold" />
      </div>
    </div>
  );
  return (
    <div className="fn-preview fn-p-web" style={{ height: 180 }}>
      <div className="fn-window">
        <div className="fn-line gold" /><div className="fn-line" />
        <div className="fn-line" /><div className="fn-line gold" />
      </div>
    </div>
  );
}

export default function Page() {
  const featured = FEATURED_IDS
    .map(id => templates.find(t => t.id === id))
    .filter((t): t is typeof templates[number] => Boolean(t));
  const totalCount = templates.filter(t => !t.id.startsWith("free-")).length;

  return (
    <div className="fn-bg">
      <div className="fn-shell">
        <SiteNav />

        {/* ── Hero ── */}
        <main className="fn-hero">
          <section>
            <div className="fn-kicker">Edizione digitale · Vol. I</div>
            <h1>Template come<br />oggetti curati.</h1>
            <p>Ogni file è un gesto preciso,<br />non una soluzione generica.</p>
            <div className="fn-actions">
              <Link className="fn-btn primary" href="/catalogo">Sfoglia il catalogo</Link>
              <Link className="fn-btn gold" href="/ai-studio">AI Studio →</Link>
            </div>
          </section>
          <aside className="fn-stats">
            <div className="fn-stat">
              <b>{totalCount}+</b>
              <span>Template nel catalogo</span>
            </div>
            <div className="fn-stat">
              <b>4</b>
              <span>Formati supportati</span>
            </div>
            <div className="fn-stat">
              <b>€4,99</b>
              <span>Da · Acquisto unico</span>
            </div>
          </aside>
        </main>

        {/* ── Featured templates ── */}
        <div className="fn-featured">
          <div className="fn-kicker" style={{ marginBottom: 10 }}>Editor&apos;s pick</div>
          <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(36px,4vw,56px)", margin: "0 0 6px", color: "#f5ecd8" }}>
            Template in evidenza
          </h2>
          <p style={{ color: "#8a8278", fontSize: 16, marginBottom: 40 }}>
            I più scaricati, selezionati dalla redazione.
          </p>
          <div className="fn-featured-grid">
            {featured.map(item => (
              <article key={item.id} className="fn-card">
                <PreviewMock downloadType={item.downloadType} tags={item.tags} />
                <div className="fn-body">
                  <span className="fn-badge">{item.downloadType?.toUpperCase() ?? "HTML"}</span>
                  <h3 style={{ marginTop: 12 }}>{item.name}</h3>
                  <p>{item.description.length > 90 ? item.description.slice(0, 90) + "…" : item.description}</p>
                  <div className="fn-meta">
                    <span>{item.tags.slice(0, 2).join(" · ")}</span>
                    <b style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 22, fontWeight: 400, color: "#f5ecd8" }}>
                      {formatPrice(item.price)}
                    </b>
                  </div>
                  <Link href={`/templates/${item.id}`} className="fn-btn primary" style={{ fontSize: 11 }}>
                    Dettagli →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── Categories strip ── */}
        <div style={{ borderTop: "1px solid rgba(242,232,208,.12)", padding: "64px 36px" }}>
          <div style={{ maxWidth: 1220, margin: "0 auto" }}>
            <div className="fn-kicker" style={{ marginBottom: 10 }}>Formato</div>
            <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(32px,4vw,52px)", margin: "0 0 36px", color: "#f5ecd8" }}>
              Ogni struttura ha il suo formato.
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(242,232,208,.10)" }}>
              {CATEGORIES.map(cat => (
                <Link
                  key={cat.label}
                  href="/catalogo"
                  style={{
                    textDecoration: "none", display: "block", padding: "30px 24px",
                    background: "linear-gradient(160deg, rgba(255,248,230,.04), rgba(255,248,230,.01))",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 26, fontWeight: 300, color: "#f5ecd8", marginBottom: 8 }}>
                    {cat.label}
                  </div>
                  <div style={{ color: "#8a8278", fontSize: 13, lineHeight: 1.55, marginBottom: 16 }}>
                    {cat.desc}
                  </div>
                  <div style={{ color: "#c99a52", fontSize: 10, textTransform: "uppercase", letterSpacing: ".18em" }}>
                    {cat.count} template →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── AI Studio callout ── */}
        <div style={{ borderTop: "1px solid rgba(242,232,208,.12)", padding: "72px 36px" }}>
          <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
            <div className="fn-kicker" style={{ marginBottom: 14 }}>Intelligenza artificiale</div>
            <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(34px,5vw,60px)", margin: "0 0 18px", color: "#f5ecd8" }}>
              Descrivi. FORMA costruisce.
            </h2>
            <p style={{ color: "#8a8278", fontSize: 17, lineHeight: 1.65, maxWidth: 580, margin: "0 auto 36px" }}>
              L&apos;AI Studio genera strutture su misura a partire da un&apos;idea.
              Prompt → template → download in pochi secondi.
            </p>
            <Link className="fn-btn primary" href="/ai-studio" style={{ fontSize: 12 }}>
              Apri AI Studio →
            </Link>
          </div>
        </div>

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
