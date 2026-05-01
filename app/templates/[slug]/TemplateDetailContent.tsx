"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { TemplatePreview } from "@/components/TemplatePreview";
import { BuyButton } from "./BuyButton";
import { FormaFooter } from "@/components/FormaFooter";
import { formatPrice, type TemplateMeta } from "@/lib/templates";

function getPlatformLabel(downloadType?: string): string {
  const labels: Record<string, string> = {
    html: "HTML", notion: "Notion", canva: "Canva", excel: "Excel",
    sheets: "Google Sheets", framer: "Framer", webflow: "Webflow",
    shopify: "Shopify", wordpress: "WordPress",
  };
  return labels[downloadType ?? "html"] ?? "HTML";
}

export function TemplateDetailContent({ item, related }: { item: TemplateMeta; related: TemplateMeta[] }) {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const dt = item.downloadType ?? "html";
  const platform = getPlatformLabel(dt);

  const isPrompt = item.tags.some(tag => ["prompt", "ai", "copywriting"].includes(tag)) && dt === "html";
  const isNotion = dt === "notion";

  const included = isPrompt
    ? [t("includedPrompt"), t("includedExamples"), t("includedDocs"), t("includedLicense")]
    : isNotion
    ? [t("includedNotion"), t("includedDb"), t("includedDocs"), t("includedLicense")]
    : [t("includedHtml"), t("includedResponsive"), t("includedTailwind"), t("includedComments"), t("includedLicense")];

  const techRows = isPrompt
    ? [
        { k: t("platform"), v: "Markdown / .txt" },
        { k: t("techFramework"), v: "AI-agnostic" },
      ]
    : isNotion
    ? [
        { k: t("platform"), v: "Notion" },
        { k: t("techFramework"), v: "Notion databases" },
      ]
    : [
        { k: t("platform"), v: "HTML / Web" },
        { k: t("techBrowser"), v: t("techBrowserVal") },
        { k: t("techFramework"), v: "Tailwind CSS 3" },
        { k: t("techNoTools"), v: "✓" },
        { k: t("techMobile"), v: "✓" },
      ];

  const tagsLower = item.tags.join(" ").toLowerCase();
  const perfectFor: string[] = [];
  if (tagsLower.match(/agency|portfolio|creative/)) perfectFor.push(t("forAgencies"));
  if (tagsLower.match(/saas|startup|landing/)) perfectFor.push(t("forStartups"));
  if (tagsLower.match(/developer|code|html/)) perfectFor.push(t("forDesigners"));
  if (tagsLower.match(/email|marketing|newsletter/)) perfectFor.push(t("forMarketing"));
  if (tagsLower.match(/freelance|resume|invoice/)) perfectFor.push(t("forFreelance"));
  if (tagsLower.match(/ai|prompt|content/)) perfectFor.push(t("forCreators"));
  if (perfectFor.length === 0) perfectFor.push(t("forDesigners"), t("forAgencies"));

  return (
    <>
      <main style={{ maxWidth: 1160, margin: "0 auto", padding: "32px clamp(16px, 3vw, 36px) 80px" }}>

        {/* Breadcrumb */}
        <nav style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".18em", color: "var(--muted)", marginBottom: 32, display: "flex", gap: 10, alignItems: "center" }}>
          <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>FORMA</Link>
          <span>/</span>
          <Link href="/catalogo" style={{ color: "var(--muted)", textDecoration: "none" }}>{t("catalogo")}</Link>
          <span>/</span>
          <span style={{ color: "#D4AF37" }}>{item.name}</span>
        </nav>

        <div className="fn-tpl-layout">

          {/* LEFT: preview + details */}
          <section>
            {/* Large live preview */}
            <div style={{ border: "1px solid var(--fn-border, rgba(234,234,234,.10))", overflow: "hidden", marginBottom: 28 }}>
              <TemplatePreview id={item.id} height={480} />
            </div>

            {/* Badges */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              <span className="fn-badge">{platform}</span>
              {item.editorsPick && (
                <span className="fn-badge" style={{ background: "transparent", border: "1px solid rgba(212,175,55,.5)", color: "#D4AF37" }}>★ Editor&apos;s Pick</span>
              )}
              {item.isNew && (
                <span className="fn-badge" style={{ background: "transparent", border: "1px solid var(--fn-border)", color: "var(--text)" }}>New</span>
              )}
            </div>

            {/* Title */}
            <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(32px,4vw,56px)", margin: "0 0 14px", color: "var(--text)", lineHeight: 1.08 }}>
              {item.name}
            </h1>
            <p style={{ color: "var(--muted)", lineHeight: 1.7, fontSize: 16, marginBottom: 28, maxWidth: 620 }}>
              {item.description}
            </p>

            {/* Downloads */}
            <div style={{ fontSize: 12, color: "var(--muted)", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 36, display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ color: "#D4AF37" }}>↓</span>
              {item.downloads.toLocaleString()} {t("downloadsLabel")}
            </div>

            {/* What's included */}
            <div style={{ marginBottom: 36 }}>
              <h3 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".22em", color: "#D4AF37", marginBottom: 16, fontWeight: 600 }}>
                {t("whatsIncluded")}
              </h3>
              <div style={{ display: "grid", gap: 10 }}>
                {included.map(inc => (
                  <div key={inc} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "var(--muted)" }}>
                    <span style={{ color: "#D4AF37", flexShrink: 0, marginTop: 1 }}>✓</span>
                    {inc}
                  </div>
                ))}
              </div>
            </div>

            {/* Tech specs */}
            <div style={{ marginBottom: 36 }}>
              <h3 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".22em", color: "#D4AF37", marginBottom: 16, fontWeight: 600 }}>
                {t("techSpecs")}
              </h3>
              <div style={{ border: "1px solid var(--fn-border, rgba(234,234,234,.10))" }}>
                {techRows.map((row, i) => (
                  <div key={row.k} style={{
                    display: "grid", gridTemplateColumns: "160px 1fr",
                    borderBottom: i < techRows.length - 1 ? "1px solid var(--fn-border, rgba(234,234,234,.08))" : "none",
                    padding: "10px 16px",
                    background: i % 2 === 0 ? "transparent" : "rgba(212,175,55,.02)",
                  }}>
                    <span style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".12em" }}>{row.k}</span>
                    <span style={{ fontSize: 13, color: "var(--text)" }}>{row.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Perfect for */}
            <div style={{ marginBottom: 36 }}>
              <h3 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".22em", color: "#D4AF37", marginBottom: 16, fontWeight: 600 }}>
                {t("perfectFor")}
              </h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {perfectFor.map(p => (
                  <span key={p} style={{
                    padding: "6px 14px", fontSize: 12, color: "var(--muted)",
                    border: "1px solid var(--fn-border, rgba(234,234,234,.14))",
                    textTransform: "uppercase", letterSpacing: ".12em",
                  }}>{p}</span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {item.tags.map(tag => (
                <span key={tag} style={{ fontSize: 10, color: "var(--muted)", border: "1px solid var(--fn-border, rgba(234,234,234,.10))", padding: "4px 10px", textTransform: "uppercase", letterSpacing: ".14em" }}>
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* RIGHT: sticky purchase sidebar */}
          <aside style={{ position: "sticky", top: 24 }}>
            <div style={{ border: "1px solid var(--fn-border, rgba(234,234,234,.10))", background: "var(--surface)", padding: "28px 24px" }}>
              {/* Price */}
              <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 58, fontWeight: 300, color: "var(--text)", lineHeight: 1, marginBottom: 4 }}>
                {formatPrice(item.price)}
              </div>
              <p style={{ color: "var(--muted)", fontSize: 11, marginBottom: 24, textTransform: "uppercase", letterSpacing: ".16em" }}>
                {t("oneTimePurchase")} · {platform}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                <BuyButton templateId={item.id} price={formatPrice(item.price)} />
                <Link href={`/preview/${item.id}`} className="fn-btn" style={{ width: "100%", justifyContent: "center", fontSize: 11 }}>
                  {t("previewBtn")} →
                </Link>
              </div>

              {/* Quick features */}
              <div style={{ borderTop: "1px solid var(--fn-border, rgba(234,234,234,.08))", paddingTop: 20, display: "grid", gap: 10 }}>
                {[
                  { icon: "✓", label: t("immediateAccess") },
                  { icon: "✓", label: t("commercialUse") },
                  { icon: "✓", label: t("freeUpdates") },
                  { icon: "✓", label: t("emailSupport") },
                ].map(f => (
                  <div key={f.label} style={{ display: "flex", gap: 10, fontSize: 13, color: "var(--muted)" }}>
                    <span style={{ color: "#D4AF37" }}>{f.icon}</span>{f.label}
                  </div>
                ))}
              </div>

              {/* Money-back guarantee */}
              <div style={{ marginTop: 20, padding: "14px 16px", background: "rgba(212,175,55,.05)", border: "1px solid rgba(212,175,55,.15)", textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "#D4AF37", textTransform: "uppercase", letterSpacing: ".16em", marginBottom: 4 }}>⚡ {t("moneyBackShort")}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>
                  {lang === "it" ? "Non sei soddisfatto? Rimborso completo entro 14 giorni." : "Not satisfied? Full refund within 14 days."}
                </div>
              </div>

              {/* Secure checkout */}
              <div style={{ marginTop: 16, textAlign: "center" }}>
                <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: ".12em", textTransform: "uppercase" }}>
                  ⚡ {t("secureCheckout")}
                </span>
              </div>

              <div style={{ marginTop: 20 }}>
                <Link href="/catalogo" style={{ fontSize: 11, color: "var(--muted)", textDecoration: "none", textTransform: "uppercase", letterSpacing: ".14em" }}>
                  {t("backToCatalog")}
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related templates */}
        {related.length > 0 && (
          <div style={{ marginTop: 72, borderTop: "1px solid var(--fn-border, rgba(234,234,234,.10))", paddingTop: 48 }}>
            <h2 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".22em", color: "#D4AF37", marginBottom: 32, fontWeight: 600 }}>
              {t("relatedTemplates")}
            </h2>
            <div className="fn-tpl-related">
              {related.map(rel => (
                <Link key={rel.id} href={`/templates/${rel.id}`} style={{ textDecoration: "none", background: "var(--surface)", display: "flex", flexDirection: "column" }}>
                  <TemplatePreview id={rel.id} height={160} />
                  <div style={{ padding: "14px 16px" }}>
                    <span className="fn-badge" style={{ marginBottom: 8, display: "inline-block" }}>{getPlatformLabel(rel.downloadType)}</span>
                    <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 20, color: "var(--text)", marginBottom: 6 }}>{rel.name}</div>
                    <div style={{ fontSize: 13, color: "#D4AF37", fontFamily: "var(--font-cormorant), Georgia, serif" }}>{formatPrice(rel.price)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <FormaFooter />
    </>
  );
}
