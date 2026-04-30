"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { templates, formatPrice, getDownloadType } from "@/lib/templates";

const EASE = [0.16, 1, 0.3, 1] as const;
const PREVIEW_COUNT = 6;

const CATS = [
  { key: "all",    labelIt: "Tutti",   labelEn: "All" },
  { key: "html",   labelIt: "UI",      labelEn: "UI" },
  { key: "notion", labelIt: "Notion",  labelEn: "Notion" },
  { key: "prompt", labelIt: "Prompt",  labelEn: "Prompt" },
  { key: "canva",  labelIt: "Canva",   labelEn: "Canva" },
];

function categoryLabel(tmpl: (typeof templates)[number], lang: "it" | "en"): string {
  const dt = getDownloadType(tmpl);
  const map: Record<string, { it: string; en: string }> = {
    html:      { it: "UI",        en: "UI" },
    notion:    { it: "Notion",    en: "Notion" },
    canva:     { it: "Canva",     en: "Canva" },
    excel:     { it: "Excel",     en: "Excel" },
    sheets:    { it: "Sheets",    en: "Sheets" },
    webflow:   { it: "Webflow",   en: "Webflow" },
    framer:    { it: "Framer",    en: "Framer" },
    shopify:   { it: "Shopify",   en: "Shopify" },
    wordpress: { it: "WordPress", en: "WordPress" },
    prompt:    { it: "Prompt",    en: "Prompt" },
  };
  return (map[dt] ?? { it: "UI", en: "UI" })[lang];
}

interface CardProps {
  tmpl: (typeof templates)[number];
  index: number;
  lang: "it" | "en";
}

function TemplateCard({ tmpl, index, lang }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: (index % 6) * 0.04, ease: EASE }}
      style={{ background: "var(--forma-bg-alt)" }}
    >
      <Link href={`/preview/${tmpl.id}`} style={{ textDecoration: "none", display: "block" }}>
        <div
          style={{ transition: "background 0.2s ease" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--forma-bg)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ""; }}
        >
          {/* Preview */}
          <div
            style={{
              height: "172px",
              background: "#ffffff",
              overflow: "hidden",
              position: "relative",
              borderBottom: "1px solid var(--forma-border)",
            }}
          >
            <iframe
              src={`/api/preview/${tmpl.id}`}
              title={tmpl.name}
              aria-hidden="true"
              loading="lazy"
              style={{
                width: "160%",
                height: "160%",
                border: "none",
                transformOrigin: "top left",
                transform: "scale(0.625)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Meta */}
          <div style={{ padding: "11px 14px 13px" }}>
            <p
              style={{
                fontFamily: "monospace",
                fontSize: "9px",
                fontWeight: 300,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--forma-text-accent)",
                marginBottom: "5px",
              }}
            >
              {categoryLabel(tmpl, lang)}
            </p>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "8px" }}>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "15px",
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                  color: "var(--forma-text)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  minWidth: 0,
                }}
              >
                {tmpl.name}
              </p>
              <span
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "11px",
                  fontWeight: 300,
                  color: "var(--forma-text-muted)",
                  flexShrink: 0,
                }}
              >
                {formatPrice(tmpl.price)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function TemplateMasonry() {
  const { lang } = useLang();
  const [expanded, setExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"default" | "price-asc" | "price-desc">("default");
  const headRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headRef, { once: true, margin: "-60px" });

  const sorted = [...templates]
    .filter(
      (t) => activeCategory === "all" || getDownloadType(t) === activeCategory
    )
    .sort((a, b) => {
      if (sortOrder === "price-asc") return a.price - b.price;
      if (sortOrder === "price-desc") return b.price - a.price;
      // default: paid first
      if (a.price > 0 && b.price === 0) return -1;
      if (a.price === 0 && b.price > 0) return 1;
      return 0;
    });

  const visible = expanded ? sorted : sorted.slice(0, PREVIEW_COUNT);

  return (
    <section
      id="templates"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--forma-border)",
        padding: "clamp(80px, 12vw, 140px) 8vw clamp(60px, 8vw, 100px)",
        position: "relative",
      }}
    >
      {/* Section number */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "clamp(80px, 12vw, 140px)",
          left: "8vw",
          fontFamily: "monospace",
          fontSize: "11px",
          fontWeight: 300,
          letterSpacing: "0.04em",
          color: "var(--forma-text)",
          opacity: 0.3,
        }}
      >
        08
      </span>

      {/* Header */}
      <div
        ref={headRef}
        style={{
          paddingTop: "clamp(24px, 3vw, 36px)",
          marginBottom: "clamp(32px, 4vw, 48px)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              fontFamily: "monospace",
              fontSize: "10px",
              fontWeight: 300,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--forma-text-accent)",
              marginBottom: "10px",
            }}
          >
            {lang === "it" ? "Selezione editoriale" : "Editorial selection"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 400,
              letterSpacing: "0.01em",
              color: "var(--forma-text)",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {lang === "it" ? "Il catalogo." : "The catalog."}
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          style={{
            fontFamily: "monospace",
            fontSize: "10px",
            fontWeight: 300,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: "var(--forma-text-muted)",
            opacity: 0.6,
            paddingBottom: "4px",
          }}
        >
          {templates.length} {lang === "it" ? "template disponibili" : "templates available"}
        </motion.p>
      </div>

      {/* Grid — hairline separators via 1px gap on colored background */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{
          gap: "1px",
          background: "var(--forma-border)",
          border: "1px solid var(--forma-border)",
        }}
      >
        <AnimatePresence>
          {visible.map((tmpl, i) => (
            <TemplateCard key={tmpl.id} tmpl={tmpl} index={i} lang={lang} />
          ))}
        </AnimatePresence>
      </div>

      {/* Footer bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid var(--forma-border)",
          paddingTop: "16px",
          marginTop: "1px",
          gap: "16px",
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "9px",
            fontWeight: 300,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--forma-text-muted)",
            opacity: 0.55,
          }}
        >
          {expanded
            ? `${templates.length} ${lang === "it" ? "template" : "templates"}`
            : `${PREVIEW_COUNT} ${lang === "it" ? `di ${templates.length}` : `of ${templates.length}`}`}
        </span>

        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            fontFamily: "monospace",
            fontSize: "10px",
            fontWeight: 400,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--forma-text-accent)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--forma-accent-sabi)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--forma-text-accent)"; }}
        >
          {expanded
            ? (lang === "it" ? "Mostra meno ↑" : "Show less ↑")
            : (lang === "it"
                ? `Vedi tutti i ${templates.length} template →`
                : `View all ${templates.length} templates →`)}
        </button>
      </div>
    </section>
  );
}
