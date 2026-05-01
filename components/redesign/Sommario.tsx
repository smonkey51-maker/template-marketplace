"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { templates, formatPrice, getDownloadType } from "@/lib/templates";

const EASE = [0.16, 1, 0.3, 1] as const;

function getCategoryLabel(
  tmpl: (typeof templates)[number],
  lang: "it" | "en"
): string {
  const dt = getDownloadType(tmpl);
  const map: Record<string, { it: string; en: string }> = {
    html:    { it: "Interfacce UI",    en: "UI Interfaces" },
    notion:  { it: "Template Notion",  en: "Notion Templates" },
    canva:   { it: "Canva",            en: "Canva" },
    prompt:  { it: "Prompt AI",        en: "AI Prompts" },
    excel:   { it: "Excel",            en: "Excel" },
    sheets:  { it: "Sheets",           en: "Sheets" },
    webflow: { it: "Webflow",          en: "Webflow" },
    framer:  { it: "Framer",           en: "Framer" },
  };
  return (map[dt] ?? { it: "UI", en: "UI" })[lang];
}

const GROUPS: Array<{
  key: string;
  labelIt: string;
  labelEn: string;
  types: string[];
}> = [
  {
    key: "ui",
    labelIt: "— Interfacce UI",
    labelEn: "— UI Interfaces",
    types: ["html"],
  },
  {
    key: "notion",
    labelIt: "— Template Notion",
    labelEn: "— Notion Templates",
    types: ["notion"],
  },
  {
    key: "prompt",
    labelIt: "— Prompt AI",
    labelEn: "— AI Prompts",
    types: ["prompt"],
  },
  {
    key: "other",
    labelIt: "— Altro",
    labelEn: "— Other",
    types: ["canva", "excel", "sheets", "webflow", "framer"],
  },
];

export default function Sommario() {
  const { lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="forma-snap forma-v2-section"
      style={{
        minHeight: "100svh",
        background: "var(--bg)",
        borderTop: "1px solid var(--forma-border)",
        padding:
          "clamp(80px, 10vw, 120px) clamp(24px, 8vw, 120px)",
        position: "relative",
        overflowY: "auto",
      }}
    >
      {/* Section number */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "clamp(80px,10vw,120px)",
          left: "clamp(24px,8vw,120px)",
          fontFamily: "monospace",
          fontSize: "11px",
          fontWeight: 300,
          letterSpacing: "0.04em",
          color: "var(--forma-text)",
          opacity: 0.3,
        }}
      >
        02
      </span>

      {/* Header */}
      <div
        style={{
          paddingTop: "clamp(24px,3vw,36px)",
          marginBottom: "clamp(32px,4vw,48px)",
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
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--forma-text-accent)",
            marginBottom: "10px",
          }}
        >
          {lang === "it" ? "Indice del catalogo" : "Catalog index"}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(36px,5vw,56px)",
            fontWeight: 400,
            letterSpacing: "0.01em",
            color: "var(--forma-text)",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          {lang === "it" ? "Sommario." : "Contents."}
        </motion.h2>
      </div>

      {/* Hairline */}
      <div
        style={{
          height: "1px",
          background: "var(--forma-text)",
          opacity: 0.15,
          marginBottom: "clamp(24px,3vw,36px)",
        }}
      />

      {/* Groups */}
      {GROUPS.map((group, gi) => {
        const grouped = templates.filter((t) =>
          group.types.includes(getDownloadType(t))
        );
        if (grouped.length === 0) return null;
        return (
          <motion.div
            key={group.key}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: gi * 0.08, ease: EASE }}
            style={{ marginBottom: "clamp(24px,3vw,36px)" }}
          >
            {/* Group label */}
            <p
              style={{
                fontFamily: "monospace",
                fontSize: "9px",
                fontWeight: 300,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--forma-text-accent)",
                marginBottom: "12px",
                opacity: 0.8,
              }}
            >
              {lang === "it" ? group.labelIt : group.labelEn}
            </p>
            {/* Template rows */}
            {grouped.map((tmpl, i) => (
              <Link
                key={tmpl.id}
                href={`/preview/${tmpl.id}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    borderTop:
                      i === 0
                        ? "1px solid var(--forma-border)"
                        : "none",
                    borderBottom: "1px solid var(--forma-border)",
                    padding: "10px 0",
                    gap: "8px",
                    transition: "background 0.15s ease, padding-left 0.15s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "var(--forma-bg-alt)";
                    el.style.paddingLeft = "8px";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "";
                    el.style.paddingLeft = "0";
                  }}
                >
                  {/* Index number */}
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "9px",
                      fontWeight: 300,
                      letterSpacing: "0.08em",
                      color: "var(--forma-text-muted)",
                      opacity: 0.4,
                      minWidth: "28px",
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Name */}
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "clamp(14px,1.4vw,17px)",
                      fontWeight: 400,
                      color: "var(--forma-text)",
                      flex: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tmpl.name}
                  </span>
                  {/* Dot leaders */}
                  <span
                    style={{
                      flex: "0 0 auto",
                      borderBottom: "1px dotted var(--forma-border)",
                      width: "clamp(40px,8vw,120px)",
                      marginBottom: "2px",
                      opacity: 0.3,
                    }}
                    aria-hidden
                  />
                  {/* Price */}
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "10px",
                      fontWeight: 300,
                      letterSpacing: "0.08em",
                      color: "var(--forma-text-muted)",
                      flexShrink: 0,
                      minWidth: "48px",
                      textAlign: "right",
                    }}
                  >
                    {formatPrice(tmpl.price)}
                  </span>
                </div>
              </Link>
            ))}
          </motion.div>
        );
      })}

      {/* Folio */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: "1px solid var(--forma-border)",
          padding: "8px clamp(24px,8vw,120px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "8px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--forma-text)",
            opacity: 0.3,
          }}
        >
          FORMA
        </span>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "8px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--forma-text)",
            opacity: 0.3,
          }}
        >
          {lang === "it"
            ? "Sezione II · Sommario"
            : "Section II · Contents"}
        </span>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "8px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--forma-text)",
            opacity: 0.3,
          }}
        >
          Pag. 2
        </span>
      </div>
    </section>
  );
}
