"use client";

import Link from "next/link";
import { templates, formatPrice } from "@/lib/templates";
import { TemplatePreview } from "@/components/TemplatePreview";
import { FormaFooter } from "@/components/FormaFooter";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";

const FEATURED_IDS = ["hero-saas", "cold-email-b2b", "notion-project-hub"];
const HERO_PREVIEW_ID = "saas-landing-dark";

const CATEGORIES_IT = [
  { label: "HTML & Web",   desc: "Landing page, SaaS, portfolio, dashboard.",  count: "25+", href: "/catalogo" },
  { label: "Notion",       desc: "CRM, tracker, second brain, client portal.",  count: "8",   href: "/catalogo" },
  { label: "Shopify / WP", desc: "Temi e layout per e-commerce e blog.",         count: "6",   href: "/catalogo" },
  { label: "App & Mobile", desc: "Schermate, showcase e prototipi mobile.",     count: "3+",  href: "/catalogo" },
];
const CATEGORIES_EN = [
  { label: "HTML & Web",   desc: "Landing pages, SaaS, portfolios, dashboards.", count: "25+", href: "/catalogo" },
  { label: "Notion",       desc: "CRM, tracker, second brain, client portal.",   count: "8",   href: "/catalogo" },
  { label: "Shopify / WP", desc: "Themes and layouts for e-commerce and blogs.", count: "6",   href: "/catalogo" },
  { label: "App & Mobile", desc: "Screens, showcases and mobile prototypes.",    count: "3+",  href: "/catalogo" },
];

export function HomeContent() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];

  const featured = FEATURED_IDS
    .map(id => templates.find(x => x.id === id))
    .filter((x): x is typeof templates[number] => Boolean(x));

  const totalCount = templates.filter(x => !x.id.startsWith("free-")).length;
  const categories = lang === "it" ? CATEGORIES_IT : CATEGORIES_EN;

  return (
    <>
      {/* ── Hero: text left, live template preview right ── */}
      <main style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", maxWidth: 1220, margin: "0 auto", padding: "72px 36px 60px", gap: 56 }}>
        <section>
          <div className="fn-kicker" style={{ marginBottom: 16 }}>{t("heroKicker")}</div>
          <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(44px,5.5vw,78px)", lineHeight: 1.02, margin: "0 0 20px", color: "var(--text)" }}>
            {lang === "it"
              ? <><span>Template come</span><br /><span>oggetti curati.</span></>
              : <><span>Templates as</span><br /><span>curated objects.</span></>}
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 18, lineHeight: 1.65, maxWidth: 480, marginBottom: 36 }}>
            {t("heroSub")}
          </p>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <Link className="fn-btn primary" href="/catalogo" style={{ fontSize: 11 }}>{t("browseAll")}</Link>
            <Link className="fn-btn gold" href="/ai-studio" style={{ fontSize: 11 }}>{t("studioCta")} →</Link>
          </div>

          {/* Stats strip */}
          <div style={{ display: "flex", gap: 40, borderTop: "1px solid var(--fn-border, rgba(234,234,234,.10))", paddingTop: 28, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 36, fontWeight: 300, color: "var(--text)", lineHeight: 1 }}>{totalCount}+</div>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".18em", color: "var(--muted)", marginTop: 4 }}>{t("statCatalog")}</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 36, fontWeight: 300, color: "var(--text)", lineHeight: 1 }}>4</div>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".18em", color: "var(--muted)", marginTop: 4 }}>{t("statFormats")}</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 36, fontWeight: 300, color: "var(--text)", lineHeight: 1 }}>€4,99</div>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".18em", color: "var(--muted)", marginTop: 4 }}>{t("statFrom")}</div>
            </div>
          </div>
        </section>

        {/* Live template preview */}
        <aside style={{ position: "relative" }}>
          {/* Browser chrome */}
          <div style={{ border: "1px solid var(--fn-border, rgba(234,234,234,.12))", background: "var(--surface)", overflow: "hidden" }}>
            <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--fn-border, rgba(234,234,234,.08))", display: "flex", gap: 6, alignItems: "center" }}>
              {["#ff5f56", "#ffbd2e", "#27c93f"].map(c => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
              ))}
              <div style={{ flex: 1, marginLeft: 10, background: "rgba(255,255,255,.06)", borderRadius: 3, height: 18, display: "flex", alignItems: "center", padding: "0 10px" }}>
                <span style={{ fontSize: 10, color: "var(--muted)", letterSpacing: ".06em" }}>forma.design/preview</span>
              </div>
            </div>
            <TemplatePreview id={HERO_PREVIEW_ID} height={400} />
          </div>
          {/* Floating badge */}
          <div style={{
            position: "absolute", bottom: -12, right: -12,
            background: "linear-gradient(135deg, #D4AF37, #B8962E)",
            color: "#060606", padding: "8px 16px", fontSize: 10,
            fontWeight: 700, textTransform: "uppercase", letterSpacing: ".16em",
          }}>
            {lang === "it" ? "Anteprima live" : "Live preview"}
          </div>
        </aside>
      </main>

      {/* ── Featured templates ── */}
      <div className="fn-featured">
        <div className="fn-kicker" style={{ marginBottom: 10 }}>{t("featuredKicker")}</div>
        <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(36px,4vw,56px)", margin: "0 0 6px", color: "var(--text)" }}>
          {t("featuredTitle")}
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 16, marginBottom: 40 }}>{t("featuredSub")}</p>
        <div className="fn-featured-grid">
          {featured.map(item => (
            <article key={item.id} className="fn-card">
              <TemplatePreview id={item.id} height={200} />
              <div className="fn-body">
                <span className="fn-badge">{item.downloadType?.toUpperCase() ?? "HTML"}</span>
                <h3 style={{ marginTop: 12, fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontSize: 22, color: "var(--text)" }}>{item.name}</h3>
                <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.55, margin: "8px 0 16px" }}>
                  {item.description.length > 80 ? item.description.slice(0, 80) + "…" : item.description}
                </p>
                <div className="fn-meta">
                  <span>{item.tags.slice(0, 2).join(" · ")}</span>
                  <b style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 22, fontWeight: 400, color: "var(--text)" }}>
                    {formatPrice(item.price)}
                  </b>
                </div>
                <Link href={`/templates/${item.id}`} className="fn-btn primary" style={{ fontSize: 11, marginTop: 16 }}>
                  {t("detailsLink")}
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link href="/catalogo" className="fn-btn" style={{ fontSize: 11 }}>
            {lang === "it" ? `Vedi tutti i ${totalCount}+ template →` : `Browse all ${totalCount}+ templates →`}
          </Link>
        </div>
      </div>

      {/* ── Categories ── */}
      <div style={{ borderTop: "1px solid var(--fn-border, rgba(234,234,234,.10))", padding: "64px 36px" }}>
        <div style={{ maxWidth: 1220, margin: "0 auto" }}>
          <div className="fn-kicker" style={{ marginBottom: 10 }}>{t("categoriesKicker")}</div>
          <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(32px,4vw,52px)", margin: "0 0 36px", color: "var(--text)" }}>
            {t("categoriesTitle")}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "var(--fn-border, rgba(234,234,234,.08))" }}>
            {categories.map(cat => (
              <Link key={cat.label} href={cat.href} style={{ textDecoration: "none", display: "block", padding: "32px 24px", background: "var(--surface)", transition: "background .2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-2, #0d0d0d)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--surface)")}>
                <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 26, fontWeight: 300, color: "var(--text)", marginBottom: 10 }}>{cat.label}</div>
                <div style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.6, marginBottom: 18 }}>{cat.desc}</div>
                <div style={{ color: "#D4AF37", fontSize: 10, textTransform: "uppercase", letterSpacing: ".18em" }}>{cat.count} template →</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── AI Studio callout ── */}
      <div style={{ borderTop: "1px solid var(--fn-border, rgba(234,234,234,.10))", padding: "80px 36px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
          <div className="fn-kicker" style={{ marginBottom: 14 }}>{t("aiKicker")}</div>
          <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(36px,5vw,64px)", margin: "0 0 18px", color: "var(--text)" }}>
            {t("aiCalloutTitle")}
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 36px" }}>
            {t("aiCalloutSub")}
          </p>
          <Link className="fn-btn primary" href="/ai-studio" style={{ fontSize: 12 }}>{t("aiCalloutCta")}</Link>
        </div>
      </div>

      <FormaFooter />
    </>
  );
}
