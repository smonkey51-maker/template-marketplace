"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { templates, formatPrice, getDownloadType } from "@/lib/templates";

const EASE = [0.16, 1, 0.3, 1] as const;

// Deterministic height variation based on template index
// Creates irregular masonry feel without randomness (SSR safe)
function cardHeight(index: number): number {
  const heights = [240, 300, 260, 320, 200, 280, 340, 220, 290, 250, 310, 270];
  return heights[index % heights.length];
}

// Category label from downloadType
function categoryLabel(tmpl: (typeof templates)[number], lang: "it" | "en"): string {
  const dt = getDownloadType(tmpl);
  const map: Record<string, { it: string; en: string }> = {
    html:       { it: "UI",     en: "UI" },
    notion:     { it: "Notion", en: "Notion" },
    canva:      { it: "Canva",  en: "Canva" },
    excel:      { it: "Excel",  en: "Excel" },
    sheets:     { it: "Sheets", en: "Sheets" },
    webflow:    { it: "Webflow", en: "Webflow" },
    framer:     { it: "Framer", en: "Framer" },
    shopify:    { it: "Shopify", en: "Shopify" },
    wordpress:  { it: "WordPress", en: "WordPress" },
  };
  return (map[dt] ?? { it: "UI", en: "UI" })[lang];
}

interface TemplateCardProps {
  tmpl: (typeof templates)[number];
  index: number;
  lang: "it" | "en";
}

function TemplateCard({ tmpl, index, lang }: TemplateCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const height = cardHeight(index);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 4) * 0.06, ease: EASE }}
      style={{
        breakInside: "avoid",
        marginBottom: "clamp(32px, 4vw, 48px)",
      }}
    >
      <Link
        href={`/preview/${tmpl.id}`}
        style={{ textDecoration: "none", display: "block" }}
      >
        <div
          style={{
            border: "1px solid rgba(26,24,21,0.14)",
            background: "#FAF7F0",
            borderRadius: "2px",
            overflow: "hidden",
            transition: "border-color 0.25s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(26,24,21,0.35)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(26,24,21,0.14)"; }}
        >
          {/* Preview area */}
          <div
            style={{
              height: `${height}px`,
              background: "#ffffff",
              overflow: "hidden",
              position: "relative",
              borderBottom: "1px solid rgba(26,24,21,0.08)",
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
          <div style={{ padding: "14px 16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: "9px",
                    fontWeight: 300,
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    color: "#8B6F47",
                    marginBottom: "4px",
                  }}
                >
                  {categoryLabel(tmpl, lang)}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "16px",
                    fontWeight: 400,
                    letterSpacing: "0.01em",
                    color: "#1A1815",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tmpl.name}
                </p>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "12px",
                  fontWeight: 300,
                  color: "#4A4642",
                  flexShrink: 0,
                  marginTop: "14px",
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
  const headRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headRef, { once: true, margin: "-60px" });

  // Show all templates; paid ones first, free ones at the end
  const sorted = [...templates].sort((a, b) => {
    if (a.price > 0 && b.price === 0) return -1;
    if (a.price === 0 && b.price > 0) return 1;
    return 0;
  });

  return (
    <section
      id="templates"
      style={{
        background: "#F5F0E8",
        borderTop: "1px solid rgba(26,24,21,0.12)",
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
          color: "#1A1815",
          opacity: 0.35,
        }}
      >
        07
      </span>

      {/* Header */}
      <div
        ref={headRef}
        style={{
          marginBottom: "clamp(48px, 6vw, 72px)",
          paddingTop: "clamp(24px, 3vw, 36px)",
        }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            fontFamily: "monospace",
            fontSize: "10px",
            fontWeight: 300,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#8B6F47",
            marginBottom: "12px",
          }}
        >
          {lang === "it" ? "Catalogo completo" : "Full catalog"}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(32px, 4.5vw, 52px)",
            fontWeight: 400,
            letterSpacing: "0.01em",
            color: "#1A1815",
            lineHeight: 1.1,
          }}
        >
          {lang === "it" ? "Ogni template, ordinato." : "Every template, curated."}
        </motion.h2>
      </div>

      {/* Masonry grid via CSS columns */}
      <div
        style={{
          columns: "clamp(280px, 30vw, 360px)",
          columnGap: "clamp(24px, 3vw, 48px)",
        }}
      >
        {sorted.map((tmpl, i) => (
          <TemplateCard key={tmpl.id} tmpl={tmpl} index={i} lang={lang} />
        ))}
      </div>
    </section>
  );
}
