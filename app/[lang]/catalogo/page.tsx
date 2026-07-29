"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { FormaFooter } from "@/components/FormaFooter";
import { templatesMeta, formatPrice, type TemplateMeta } from "@/lib/templates";
import { TemplatePreview } from "@/components/TemplatePreview";
import { motion, AnimatePresence } from "framer-motion";
import { TiltCard } from "@/components/TiltCard";

type FilterKey = "All" | "Web" | "Notion" | "App" | "Shop";

function getFilterKey(t: TemplateMeta): FilterKey {
  const dt = t.downloadType ?? "html";
  if (dt === "notion") return "Notion";
  if (dt === "shopify" || dt === "wordpress") return "Shop";
  const tags = t.tags.join(" ").toLowerCase();
  if (
    tags.includes("mobile") ||
    tags.includes("ios") ||
    t.name.toLowerCase().includes("mobile app")
  )
    return "App";
  return "Web";
}

function getPlatformLabel(t: TemplateMeta): string {
  const dt = t.downloadType ?? "html";
  const labels: Record<string, string> = {
    html: "HTML",
    notion: "Notion",
    canva: "Canva",
    excel: "Excel",
    sheets: "Sheets",
    framer: "Framer",
    webflow: "Webflow",
    shopify: "Shopify",
    wordpress: "WordPress",
  };
  return labels[dt] ?? "HTML";
}

const PAID_TEMPLATES = templatesMeta.filter((t) => !t.id.startsWith("free-"));

const FILTER_KEYS: FilterKey[] = ["All", "Web", "Notion", "App", "Shop"];

function isFilterKey(v: string | null): v is FilterKey {
  return v !== null && (FILTER_KEYS as string[]).includes(v);
}

export default function CatalogoPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<FilterKey>("All");
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeItem = useMemo(() => PAID_TEMPLATES.find((t) => t.id === activeId), [activeId]);

  // Preselect the category when arriving from a nav dropdown (/catalogo?cat=Notion).
  // Read from the URL directly rather than useSearchParams so the page needs no
  // Suspense boundary during prerendering.
  useEffect(() => {
    const cat = new URLSearchParams(window.location.search).get("cat");
    if (isFilterKey(cat)) setFilter(cat);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeId]);

  const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "All", label: t("all") },
    { key: "Web", label: "Web" },
    { key: "Notion", label: "Notion" },
    { key: "App", label: "App" },
    { key: "Shop", label: "Shop" },
  ];

  const filtered = useMemo(
    () =>
      PAID_TEMPLATES.filter(
        (x) =>
          (filter === "All" || getFilterKey(x) === filter) &&
          `${x.name} ${x.description} ${x.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [q, filter],
  );

  return (
    <>
      <motion.div 
        className="fn-bg"
        animate={{ 
          scale: activeId ? 0.94 : 1, 
          borderRadius: activeId ? "24px" : "0px",
          filter: activeId ? "brightness(0.65)" : "brightness(1)" 
        }}
        transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
        style={{ transformOrigin: "top center", minHeight: "100vh" }}
      >
      <div className="fn-shell">
        <SiteNav />

        <section className="fn-section">
          <div className="fn-kicker">{t("browseAll")}</div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 300,
              fontSize: "clamp(42px,5vw,72px)",
              margin: "0 0 6px",
              color: "var(--text)",
            }}
          >
            {t("templates")}
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 17, marginBottom: 32 }}>
            {filtered.length}{" "}
            {lang === "it"
              ? "template pronti all'uso — HTML, Notion, Shopify, WordPress"
              : "ready-to-use templates — HTML, Notion, Shopify, WordPress"}
          </p>

          <div className="fn-toolbar">
            <input
              className="fn-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("searchPlaceholder")}
            />
          </div>

          <div className="flex gap-1 p-1.5 mb-10 glass-pill w-fit mx-auto sm:mx-0 overflow-x-auto max-w-full" style={{ scrollbarWidth: "none" }}>
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`relative px-5 py-2.5 text-[11px] font-semibold tracking-widest uppercase transition-colors z-10 whitespace-nowrap outline-none ${
                  filter === key ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {filter === key && (
                  <motion.div
                    layoutId="active-filter-pill"
                    className="absolute inset-0 bg-white/15 border border-white/10 shadow-sm"
                    style={{ borderRadius: 9999, zIndex: -1 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
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
              {filtered.map((item) => (
                <TiltCard 
                  className="fn-card cursor-pointer" 
                  key={item.id}
                  layoutId={`card-container-${item.id}`}
                  onClick={() => setActiveId(item.id)}
                  whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", bounce: 0.3 }}
                  active={activeId === item.id}
                >
                  <motion.div layoutId={`card-preview-${item.id}`} style={{ borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
                    <TemplatePreview id={item.id} />
                  </motion.div>
                  <motion.div className="fn-body" layoutId={`card-body-${item.id}`}>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        alignItems: "center",
                        marginBottom: 14,
                        flexWrap: "wrap",
                      }}
                    >
                      <span className="fn-badge">{getPlatformLabel(item)}</span>
                      {item.editorsPick && (
                        <span
                          className="fn-badge"
                          style={{
                            background: "transparent",
                            border: "1px solid rgba(212,175,55,.5)",
                            color: "#D4AF37",
                          }}
                        >
                          ★ Editor
                        </span>
                      )}
                      {item.isNew && (
                        <span
                          className="fn-badge"
                          style={{
                            background: "transparent",
                            border: "1px solid rgba(234,234,234,.25)",
                            color: "var(--text)",
                          }}
                        >
                          New
                        </span>
                      )}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontWeight: 400,
                        fontSize: 26,
                        margin: "0 0 8px",
                        lineHeight: 1.2,
                      }}
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{
                        color: "var(--muted)",
                        fontSize: 14,
                        lineHeight: 1.55,
                        margin: "0 0 16px",
                      }}
                    >
                      {item.description}
                    </p>
                    <div className="fn-meta">
                      <span>{item.tags.slice(0, 2).join(" · ")}</span>
                      <b
                        style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                          fontSize: 22,
                          fontWeight: 400,
                          color: "var(--text)",
                        }}
                      >
                        {formatPrice(item.price)}
                      </b>
                    </div>
                    <div className="fn-card-actions" style={{ marginTop: 18 }}>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveId(item.id); }} 
                        className="fn-btn primary w-full justify-center"
                      >
                        {t("details")}
                      </button>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          )}
        </section>
        <FormaFooter />
      </div>
      </motion.div>

      {/* iOS App-like Modal Overlay */}
      <AnimatePresence>
        {activeId && activeItem && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center pointer-events-none sm:p-4">
            {/* Overlay invisibile per cliccare fuori e chiudere */}
            <motion.div 
              className="absolute inset-0 pointer-events-auto bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveId(null)}
            />

            <motion.div
              className="relative w-full max-w-[1000px] glass-panel flex flex-col pointer-events-auto"
              style={{
                height: "92vh",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                overflow: "hidden",
              }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
            >
              {/* Bottone Chiudi */}
              <button
                onClick={() => setActiveId(null)}
                className="absolute top-6 right-6 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 text-white backdrop-blur-xl border border-white/10 hover:bg-black/60 transition-colors"
                aria-label="Chiudi"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="flex-1 overflow-y-auto overflow-x-hidden">
                <motion.div layoutId={`card-preview-${activeItem.id}`} style={{ width: "100%", height: "50vh", minHeight: "400px", position: "relative" }}>
                  <TemplatePreview id={activeItem.id} />
                </motion.div>
                
                <motion.div layoutId={`card-body-${activeItem.id}`} className="p-8 sm:p-12">
                  <div className="flex gap-2 items-center flex-wrap mb-4">
                    <span className="fn-badge bg-black/20">{getPlatformLabel(activeItem)}</span>
                    {activeItem.editorsPick && <span className="fn-badge" style={{ border: "1px solid rgba(212,175,55,.5)", color: "#D4AF37" }}>★ Editor</span>}
                  </div>
                  
                  <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1, marginBottom: 16 }}>
                    {activeItem.name}
                  </h2>
                  
                  <p style={{ color: "var(--muted)", fontSize: 18, lineHeight: 1.6, marginBottom: 32, maxWidth: "600px" }}>
                    {activeItem.description}
                  </p>

                  <div className="flex items-center gap-6 pt-6 border-t border-theme">
                    <div>
                      <span className="block text-xs uppercase tracking-widest text-muted mb-1">Prezzo</span>
                      <b style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 32 }}>{formatPrice(activeItem.price)}</b>
                    </div>
                    
                    <div className="flex-1 flex justify-end gap-3">
                      <Link href={`/preview/${activeItem.id}`} className="fn-btn">
                        {t("download")}
                      </Link>
                      <Link href={`/templates/${activeItem.id}`} className="fn-btn primary shadow-lg">
                        Acquista Ora
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
