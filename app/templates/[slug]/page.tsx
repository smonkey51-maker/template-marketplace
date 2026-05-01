import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import { templates, getTemplate, formatPrice } from "@/lib/templates";
import { BuyButton } from "./BuyButton";

export function generateStaticParams() {
  return templates.map(t => ({ slug: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getTemplate(slug);
  if (!item) return { title: "Non trovato — FORMA" };
  return { title: `${item.name} — FORMA` };
}

function getPlatformLabel(downloadType?: string): string {
  const labels: Record<string, string> = {
    html: "HTML", notion: "Notion", canva: "Canva",
    excel: "Excel", sheets: "Google Sheets", framer: "Framer",
    webflow: "Webflow", shopify: "Shopify", wordpress: "WordPress",
  };
  return labels[downloadType ?? "html"] ?? "HTML";
}

function PreviewBlock({ downloadType, tags }: { downloadType?: string; tags: string[] }) {
  const dt = downloadType ?? "html";
  const tagsStr = tags.join(" ").toLowerCase();

  if (dt === "notion") return (
    <div className="fn-preview fn-p-crm" style={{ height: 300 }}>
      {[0, 1, 2, 3, 4].map(i => (
        <div className="fn-row" key={i}>
          <div className={`fn-cell${i === 1 ? " fn-goldcell" : ""}`} />
          <div className="fn-cell" /><div className="fn-cell" />
        </div>
      ))}
    </div>
  );

  if (tagsStr.includes("mobile") || tagsStr.includes("ios")) return (
    <div className="fn-preview fn-p-app" style={{ height: 300 }}>
      <div className="fn-phone">
        <div className="gold" /><div /><div /><div className="gold" />
      </div>
    </div>
  );

  if (tagsStr.includes("deck") || tagsStr.includes("pitch")) return (
    <div className="fn-preview fn-p-deck" style={{ height: 300 }}>
      {[1, 2, 3].map(i => (
        <div className="fn-slide" key={i}>
          <b>0{i}</b>
          <div className="fn-line" /><div className="fn-line gold" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="fn-preview fn-p-web" style={{ height: 300 }}>
      <div className="fn-window">
        <div className="fn-line gold" /><div className="fn-line" />
        <div className="fn-line" /><div className="fn-line gold" />
      </div>
    </div>
  );
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getTemplate(slug);
  if (!item) notFound();

  const platform = getPlatformLabel(item.downloadType);
  const price = formatPrice(item.price);

  return (
    <div className="fn-bg">
      <div className="fn-shell">
        <SiteNav />
        <main className="fn-detail">

          {/* Left: preview + info */}
          <section>
            <PreviewBlock downloadType={item.downloadType} tags={item.tags} />
            <div className="fn-panel" style={{ marginTop: 18 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                <span className="fn-badge">{platform}</span>
                {item.editorsPick && (
                  <span className="fn-badge" style={{ background: "transparent", border: "1px solid #c99a52", color: "#c99a52" }}>
                    ★ Editor&apos;s Pick
                  </span>
                )}
                {item.isNew && (
                  <span className="fn-badge" style={{ background: "transparent", border: "1px solid rgba(255,255,255,.22)", color: "#f5ecd8" }}>
                    New
                  </span>
                )}
              </div>
              <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(30px,4vw,52px)", margin: "0 0 14px", color: "#f5ecd8", lineHeight: 1.1 }}>
                {item.name}
              </h2>
              <p style={{ color: "#9a8f80", lineHeight: 1.65, fontSize: 16, marginBottom: 20 }}>
                {item.description}
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {item.tags.map(tag => (
                  <span key={tag} style={{ border: "1px solid rgba(255,255,255,.14)", padding: "5px 10px", fontSize: 11, color: "#9a8f80", textTransform: "uppercase", letterSpacing: ".14em" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 16, padding: "14px 0", borderTop: "1px solid rgba(255,255,255,.09)", color: "#9a8f80", fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase" }}>
              {item.downloads.toLocaleString("it-IT")} download
            </div>
          </section>

          {/* Right: sticky purchase sidebar */}
          <aside className="fn-panel fn-sticky">
            <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 54, fontWeight: 300, margin: "0 0 2px", color: "#f5ecd8", lineHeight: 1 }}>
              {price}
            </p>
            <p style={{ color: "#9a8f80", fontSize: 11, marginBottom: 28, textTransform: "uppercase", letterSpacing: ".16em" }}>
              Acquisto unico · {platform}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <BuyButton templateId={item.id} price={price} />
              <Link
                href={`/preview/${item.id}`}
                className="fn-btn"
                style={{ width: "100%", justifyContent: "center", fontSize: 12 }}
              >
                Anteprima →
              </Link>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: "24px 0 0", display: "grid", gap: 10, borderTop: "1px solid rgba(255,255,255,.09)", paddingTop: 20 }}>
              {[
                "Accesso immediato dopo l'acquisto",
                "File aggiornabile liberamente",
                "Uso commerciale incluso",
                "Supporto via email",
              ].map(f => (
                <li key={f} style={{ fontSize: 13, color: "#9a8f80", display: "flex", gap: 8 }}>
                  <span style={{ color: "#c99a52" }}>✓</span>{f}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 24, borderTop: "1px solid rgba(255,255,255,.09)", paddingTop: 16 }}>
              <Link href="/catalogo" className="fn-btn gold" style={{ fontSize: 11, paddingLeft: 0 }}>
                ← Torna al catalogo
              </Link>
            </div>
          </aside>
        </main>

        <footer className="fn-footer">
          <span>FORMA</span>
          <span><Link href="/">Home</Link> · <Link href="/catalogo">Catalogo</Link></span>
        </footer>
      </div>
    </div>
  );
}
