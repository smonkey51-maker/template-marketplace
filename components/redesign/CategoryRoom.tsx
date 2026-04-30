"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { templates, formatPrice } from "@/lib/templates";

const EASE = [0.16, 1, 0.3, 1] as const;

export type RoomCategory = "ui" | "notion" | "prompts";

interface CategoryRoomProps {
  category: RoomCategory;
  sectionIndex: number; // 03, 04, 05
  featuredId: string;
}

const ROOM_DATA: Record<RoomCategory, { nameIt: string; nameEn: string; descIt: string; descEn: string; tagline: string }> = {
  ui: {
    nameIt: "Interfacce UI",
    nameEn: "UI Interfaces",
    tagline: "HTML · Tailwind",
    descIt: "Sezioni hero, pricing, dashboard, form. Codice pulito, pronto per il deploy.",
    descEn: "Hero sections, pricing, dashboards, forms. Clean code, ready to deploy.",
  },
  notion: {
    nameIt: "Template Notion",
    nameEn: "Notion Templates",
    tagline: "Notion",
    descIt: "Sistemi di lavoro relazionali. Project management, CRM, knowledge base.",
    descEn: "Relational work systems. Project management, CRM, knowledge base.",
  },
  prompts: {
    nameIt: "Prompt AI",
    nameEn: "AI Prompts",
    tagline: "Claude · GPT · Gemini",
    descIt: "Prompt engineering curati per output prevedibili e workflow replicabili.",
    descEn: "Curated prompt engineering for predictable output and replicable workflows.",
  },
};

export default function CategoryRoom({ category, sectionIndex, featuredId }: CategoryRoomProps) {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inView = useInView(contentRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const data = ROOM_DATA[category];
  const featured = templates.find((t) => t.id === featuredId) ?? templates[0];
  const sectionNum = String(sectionIndex).padStart(2, "0");

  return (
    <section
      id={`category-${category}`}
      ref={sectionRef}
      className="forma-snap forma-v2-section"
      style={{
        minHeight: "100svh",
        background: "var(--forma-bg)",
        borderTop: "1px solid var(--forma-border)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        padding: "clamp(80px, 10vw, 120px) 8vw",
      }}
    >
      {/* Section number — absolute left margin */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "clamp(80px, 10vw, 120px)",
          left: "calc(8vw - 0px)",
          fontFamily: "monospace",
          fontSize: "11px",
          fontWeight: 300,
          letterSpacing: "0.04em",
          color: "var(--forma-text)",
          opacity: 0.35,
        }}
      >
        {sectionNum}
      </span>

      <div
        ref={contentRef}
        className="forma-section-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6vw",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {/* ── Left: category info ── */}
        <div>
          {/* Tagline / platform */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              fontFamily: "monospace",
              fontSize: "10px",
              fontWeight: 300,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--forma-text-accent)",
              marginBottom: "clamp(16px, 2vw, 24px)",
            }}
          >
            {data.tagline}
          </motion.p>

          {/* Category name */}
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(44px, 7vw, 88px)",
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: "0.01em",
              color: "var(--forma-text)",
              marginBottom: "clamp(20px, 2.5vw, 32px)",
            }}
          >
            {lang === "it" ? data.nameIt : data.nameEn}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            style={{
              fontFamily: "var(--font-inter), var(--font-jakarta), sans-serif",
              fontSize: "clamp(14px, 1.4vw, 16px)",
              fontWeight: 300,
              lineHeight: 1.75,
              color: "var(--forma-text-muted)",
              maxWidth: "380px",
              marginBottom: "clamp(28px, 3.5vw, 44px)",
            }}
          >
            {lang === "it" ? data.descIt : data.descEn}
          </motion.p>

          {/* Separator line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            style={{
              height: "1px",
              background: "var(--forma-text)",
              opacity: 0.15,
              transformOrigin: "left",
              maxWidth: "380px",
              marginBottom: "clamp(20px, 2.5vw, 32px)",
            }}
          />

          {/* Price + CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            style={{ display: "flex", alignItems: "center", gap: "32px" }}
          >
            <span
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "13px",
                fontWeight: 300,
                letterSpacing: "0.04em",
                color: "var(--forma-text-muted)",
              }}
            >
              {lang === "it" ? "da €19 — acquisto unico" : "from €19 — one-time purchase"}
            </span>
            <button
              onClick={() => document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--forma-text-accent)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#A0522D"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--forma-text-accent)"; }}
            >
              {lang === "it" ? "Tutti i template →" : "All templates →"}
            </button>
          </motion.div>
        </div>

        {/* ── Right: featured template, positioned slightly off-axis ── */}
        <motion.div
          style={{ y: cardY }}
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          className="hidden md:block"
        >
          {/* Card positioned slightly right with left void */}
          <div style={{ paddingLeft: "8%" }}>
            <div
              style={{
                border: "1px solid var(--forma-border-card)",
                background: "var(--forma-bg-alt)",
                borderRadius: "2px",
                overflow: "hidden",
                maxWidth: "340px",
              }}
            >
              {/* Preview */}
              <div
                style={{
                  height: "200px",
                  background: "#ffffff",
                  overflow: "hidden",
                  borderBottom: "1px solid var(--forma-border)",
                  position: "relative",
                }}
              >
                <iframe
                  src={`/api/preview/${featured.id}`}
                  title={featured.name}
                  aria-hidden="true"
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
              <div style={{ padding: "16px 18px" }}>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "17px",
                    fontWeight: 400,
                    color: "var(--forma-text)",
                    marginBottom: "8px",
                    letterSpacing: "0.01em",
                  }}
                >
                  {featured.name}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "12px",
                      fontWeight: 300,
                      color: "var(--forma-text-muted)",
                    }}
                  >
                    {formatPrice(featured.price)}
                  </span>
                  <Link
                    href={`/preview/${featured.id}`}
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "10px",
                      fontWeight: 400,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#8B6F47",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#A0522D"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8B6F47"; }}
                  >
                    {lang === "it" ? "Anteprima →" : "Preview →"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
