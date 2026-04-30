"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/components/LanguageProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

export type RoomCategory = "ui" | "notion" | "prompts";

interface CategoryRoomProps {
  category: RoomCategory;
  sectionIndex: number;
  featuredId?: string; // kept for API compat, unused
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

export default function CategoryRoom({ category, sectionIndex }: CategoryRoomProps) {
  const { lang } = useLang();
  const contentRef = useRef<HTMLDivElement>(null);
  const inView = useInView(contentRef, { once: true, margin: "-80px" });

  const data = ROOM_DATA[category];
  const sectionNum = String(sectionIndex).padStart(2, "0");

  return (
    <section
      id={`category-${category}`}
      className="forma-snap forma-v2-section"
      style={{
        minHeight: "100svh",
        background: "var(--bg)",
        borderTop: "1px solid var(--forma-border)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(80px, 10vw, 120px) clamp(24px, 8vw, 120px)",
      }}
    >
      {/* Section number — absolute top-left */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "clamp(80px, 10vw, 120px)",
          left: "clamp(24px, 8vw, 120px)",
          fontFamily: "monospace",
          fontSize: "11px",
          fontWeight: 300,
          letterSpacing: "0.04em",
          color: "var(--forma-text)",
          opacity: 0.3,
        }}
      >
        {sectionNum}
      </span>

      {/* Centered editorial content */}
      <div
        ref={contentRef}
        style={{
          textAlign: "center",
          maxWidth: "820px",
          width: "100%",
        }}
      >
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: "monospace",
            fontSize: "10px",
            fontWeight: 300,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--forma-text-accent)",
            marginBottom: "clamp(20px, 3vw, 32px)",
          }}
        >
          {data.tagline}
        </motion.p>

        {/* Big display heading */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.08, ease: EASE }}
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(56px, 10vw, 120px)",
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            color: "var(--forma-text)",
            marginBottom: "clamp(28px, 4vw, 48px)",
          }}
        >
          {lang === "it" ? data.nameIt : data.nameEn}
        </motion.h2>

        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          style={{
            height: "1px",
            background: "var(--forma-text)",
            opacity: 0.12,
            transformOrigin: "center",
            maxWidth: "360px",
            margin: "0 auto clamp(24px, 3.5vw, 40px)",
          }}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
          style={{
            fontFamily: "var(--font-inter), var(--font-jakarta), sans-serif",
            fontSize: "clamp(13px, 1.3vw, 15px)",
            fontWeight: 300,
            lineHeight: 1.8,
            color: "var(--forma-text-muted)",
            maxWidth: "440px",
            margin: "0 auto clamp(28px, 4vw, 48px)",
          }}
        >
          {lang === "it" ? data.descIt : data.descEn}
        </motion.p>

        {/* Price + CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.38, ease: EASE }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "12px",
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
              letterSpacing: "0.10em",
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
            {lang === "it" ? "Esplora il catalogo →" : "Browse catalog →"}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
