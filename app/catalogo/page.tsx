"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { templatesMeta, formatPrice, type TemplateMeta } from "@/lib/templates";
import { TemplatePreview } from "@/components/TemplatePreview";

type FilterKey = "All" | "Web" | "Notion" | "App" | "Shop";

function getFilterKey(t: TemplateMeta): FilterKey {
  const dt = t.downloadType ?? "html";
  if (dt === "notion") return "Notion";
  if (dt === "shopify" || dt === "wordpress") return "Shop";
  const tags = t.tags.join(" ").toLowerCase();
  if (tags.includes("mobile") || tags.includes("ios") || t.name.toLowerCase().includes("mobile app")) return "App";
  return "Web";
}

function getPlatformLabel(t: TemplateMeta): string {
  const dt = t.downloadType ?? "html";
  const labels: Record<string, string> = {
    html: "HTML", notion: "Notion", canva: "Canva",
    excel: "Excel", sheets: "Sheets", framer: "Framer",
    webflow: "Webflow", shopify: "Shopify", wordpress: "WordPress",
  };
  return labels[dt] ?? "HTML";
}

const PAID_TEMPLATES = templatesMeta.filter(t => !t.id.startsWith("free-"));

export default function CatalogoPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<FilterKey>("All");

  const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "All",    label: t("all") },
    { key: "Web",    label: "Web" },
    { key: "Notion", label: "Notion" },
    { key: "App",    label: "App" },
    { key: "Shop",   label: "Shop" },
  ];

  const filtered = useMemo(
    () => PAID_TEMPLATES.filter(x =>
      (filter === "All" || getFilterKey(x) === filter) &&
      `${x.name} ${x.description} ${x.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase())
    ),
    [q, filter]
  );

  return (
    <div className="fn-bg">
      <div className="fn-shell">
        <SiteNav />

        <section className="fn-section">
          <div className="fn-kicker">{t("browseAll")}</div>
          <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(42px,5vw,72px)", margin: "0 0 6px", color: "var(--text)" }}>
            {t("templates")}
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 17, marginBottom: 32 }}>
            {filtered.length} {lang === "it" ? "template pronti all'uso — HTML, Notion, Shopify, WordPress" : "ready-to-use templates — HTML, Notion, Shopify, WordPress"}
          </p>

          <div className="fn-toolbar">
            <input
              className="fn-search"
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder={t("searchPlaceholder")}
            />
          </div>

          <div className="fn-chips">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                className={`fn-chip${filter === key ? " active" : ""}`}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div style={{ padding: "60px 0", textAlign: "center", color: "var(--muted)" }}>
              {t("noResults")}
            </div>
          ) : (
            <div className="fn-grid">
              {filtered.map(item => (
                <article className="fn-card" key={item.id}>
                  <TemplatePreview id={item.id} />
                  <div className="fn-body">
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
                      <span className="fn-badge">{getPlatformLabel(item)}</span>
                      {item.editorsPick && (
                        <span className="fn-badge" style={{ background: "transparent", border: "1px solid rgba(212,175,55,.5)", color: "#D4AF37" }}>
                          ★ Editor
                        </span>
                      )}
                      {item.isNew && (
                        <span className="fn-badge" style={{ background: "transparent", border: "1px solid rgba(234,234,234,.25)", color: "var(--text)" }}>
                          New
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontSize: 26, margin: "0 0 8px", lineHeight: 1.2 }}>
                      {item.name}
                    </h3>
                    <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.55, margin: "0 0 16px" }}>
                      {item.description}
                    </p>
                    <div className="fn-meta">
                      <span>{item.tags.slice(0, 2).join(" · ")}</span>
                      <b style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 22, fontWeight: 400, color: "var(--text)" }}>
                        {formatPrice(item.price)}
                      </b>
                    </div>
                    <div className="fn-card-actions" style={{ marginTop: 18 }}>
                      <Link href={`/templates/${item.id}`} className="fn-btn primary">{t("details")}</Link>
                      <Link href={`/preview/${item.id}`} className="fn-btn">{t("download")}</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="fn-footer">
          <span>FORMA</span>
          <span>
            <Link href="/">{t("footerHome")}</Link> · <Link href="/catalogo">{t("catalogo")}</Link> ·{" "}
            <Link href="/guida">{t("guida")}</Link> · <Link href="/account">{t("account")}</Link>
          </span>
        </footer>
      </div>
    </div>
  );
}
