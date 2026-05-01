import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import { formaTemplates, type Template } from "@/lib/formaCopy";

export function generateStaticParams() {
  return formaTemplates.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = formaTemplates.find(t => t.slug === slug);
  if (!item) return { title: "Not found — FORMA" };
  return { title: `${item.title.it} — FORMA` };
}

function PreviewBlock({ type }: { type: Template["preview"] }) {
  if (type === "crm") return (
    <div className="fn-preview fn-p-crm" style={{ height: 300 }}>
      {[0,1,2,3,4].map(i => (
        <div className="fn-row" key={i}>
          <div className={`fn-cell${i === 1 ? " fn-goldcell" : ""}`} />
          <div className="fn-cell" /><div className="fn-cell" />
        </div>
      ))}
    </div>
  );
  if (type === "web") return (
    <div className="fn-preview fn-p-web" style={{ height: 300 }}>
      <div className="fn-window">
        <div className="fn-line gold" /><div className="fn-line" />
        <div className="fn-line" /><div className="fn-line gold" />
      </div>
    </div>
  );
  if (type === "app") return (
    <div className="fn-preview fn-p-app" style={{ height: 300 }}>
      <div className="fn-phone">
        <div className="gold" /><div /><div /><div className="gold" />
      </div>
    </div>
  );
  return (
    <div className="fn-preview fn-p-deck" style={{ height: 300 }}>
      {[1,2,3].map(i => (
        <div className="fn-slide" key={i}>
          <b>0{i}</b>
          <div className="fn-line" /><div className="fn-line gold" />
        </div>
      ))}
    </div>
  );
}

export default async function TemplatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = formaTemplates.find(t => t.slug === slug);
  if (!item) notFound();

  return (
    <div className="fn-bg">
      <div className="fn-shell">
        <SiteNav />
        <main className="fn-detail">
          <section>
            <PreviewBlock type={item.preview} />
            <div className="fn-panel" style={{ marginTop: 18 }}>
              <span className="fn-badge">{item.platform}</span>
              <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 38, margin: "12px 0 10px" }}>
                {item.title.it}
              </h2>
              <p style={{ color: "#9a9387", lineHeight: 1.6 }}>{item.desc.it}</p>
            </div>
          </section>
          <aside className="fn-panel fn-sticky">
            <p style={{ fontFamily: "Georgia, serif", fontSize: 42, margin: "0 0 4px" }}>{item.price}</p>
            <p style={{ color: "#9a9387", marginBottom: 24 }}>{item.format}</p>
            <div className="fn-card-actions">
              <a className="fn-btn primary" href={item.file} download>Scarica demo</a>
              <a className="fn-btn" href={`mailto:hello@forma.local?subject=${item.title.en}`}>Acquista</a>
            </div>
            <div style={{ marginTop: 24, borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: 16 }}>
              <Link href="/catalogo" className="fn-btn gold" style={{ fontSize: 11 }}>
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
