"use client";

import Link from "next/link";
import { templates, formatPrice } from "@/lib/templates";
import { TemplatePreview } from "@/components/TemplatePreview";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";

const FEATURED_IDS = ["hero-saas", "cold-email-b2b", "notion-project-hub"];

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
      {/* ── Hero ── */}
      <main className="fn-hero">
        <section>
          <div className="fn-kicker">{t("heroKicker")}</div>
          <h1>{t("heroTitle").split(".")[0]}.<br />{t("heroTitle").split(".")[1] ?? ""}</h1>
          <p>{t("heroSub")}</p>
          <div className="fn-actions">
            <Link className="fn-btn primary" href="/catalogo">{t("browseAll")}</Link>
            <Link className="fn-btn gold" href="/ai-studio">{t("studioCta")} →</Link>
          </div>
        </section>
        <aside className="fn-stats">
          <div className="fn-stat"><b>{totalCount}+</b><span>{t("statCatalog")}</span></div>
          <div className="fn-stat"><b>4</b><span>{t("statFormats")}</span></div>
          <div className="fn-stat"><b>€4,99</b><span>{t("statFrom")}</span></div>
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
              <TemplatePreview id={item.id} height={180} />
              <div className="fn-body">
                <span className="fn-badge">{item.downloadType?.toUpperCase() ?? "HTML"}</span>
                <h3 style={{ marginTop: 12 }}>{item.name}</h3>
                <p>{item.description.length > 90 ? item.description.slice(0, 90) + "…" : item.description}</p>
                <div className="fn-meta">
                  <span>{item.tags.slice(0, 2).join(" · ")}</span>
                  <b style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 22, fontWeight: 400, color: "var(--text)" }}>
                    {formatPrice(item.price)}
                  </b>
                </div>
                <Link href={`/templates/${item.id}`} className="fn-btn primary" style={{ fontSize: 11 }}>
                  {t("detailsLink")}
                </Link>
              </div>
            </article>
          ))}
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
              <Link key={cat.label} href={cat.href} style={{ textDecoration: "none", display: "block", padding: "30px 24px", background: "var(--surface)" }}>
                <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 26, fontWeight: 300, color: "var(--text)", marginBottom: 8 }}>{cat.label}</div>
                <div style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.55, marginBottom: 16 }}>{cat.desc}</div>
                <div style={{ color: "#D4AF37", fontSize: 10, textTransform: "uppercase", letterSpacing: ".18em" }}>{cat.count} template →</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── AI Studio callout ── */}
      <div style={{ borderTop: "1px solid var(--fn-border, rgba(234,234,234,.10))", padding: "72px 36px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
          <div className="fn-kicker" style={{ marginBottom: 14 }}>{t("aiKicker")}</div>
          <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(34px,5vw,60px)", margin: "0 0 18px", color: "var(--text)" }}>
            {t("aiCalloutTitle")}
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.65, maxWidth: 580, margin: "0 auto 36px" }}>
            {t("aiCalloutSub")}
          </p>
          <Link className="fn-btn primary" href="/ai-studio" style={{ fontSize: 12 }}>{t("aiCalloutCta")}</Link>
        </div>
      </div>
    </>
  );
}
