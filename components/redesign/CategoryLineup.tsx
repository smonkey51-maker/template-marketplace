"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

interface Category {
  id: string;
  icon: React.ReactNode;
  name: { it: string; en: string };
  tagline: { it: string; en: string };
  description: { it: string; en: string };
  features: { it: string[]; en: string[] };
  price: string;
  priceNote: { it: string; en: string };
  cta: { it: string; en: string };
  href: string;
}

const UIIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="2" y="5" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <line x1="2" y1="10" x2="30" y2="10" stroke="currentColor" strokeWidth="1.5" />
    <rect x="5" y="13" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
    <line x1="18" y1="13" x2="27" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="18" y1="16" x2="25" y2="16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="18" y1="19" x2="27" y2="19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const NotionIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="5" y="3" width="22" height="26" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <line x1="9" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="9" y1="14" x2="23" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="9" y1="18" x2="18" y2="18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="9" y1="22" x2="20" y2="22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const PromptIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="3" y="6" width="26" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 13l4 3.5L9 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="16" y1="20" x2="23" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CATEGORIES: Category[] = [
  {
    id: "ui",
    icon: <UIIcon />,
    name: { it: "UI Templates", en: "UI Templates" },
    tagline: { it: "Interfacce pronte all'uso.", en: "Ready-to-use interfaces." },
    description: {
      it: "Sezioni hero, pricing, form di contatto, dashboard. HTML pulito con Tailwind, personalizzabile con AI.",
      en: "Hero sections, pricing tables, contact forms, dashboards. Clean HTML with Tailwind, customizable with AI.",
    },
    features: {
      it: ["HTML + Tailwind CSS", "Dark mode incluso", "Personalizzabile con Claude", "Download immediato"],
      en: ["HTML + Tailwind CSS", "Dark mode included", "Customizable with Claude", "Instant download"],
    },
    price: "da €19",
    priceNote: { it: "Acquisto unico", en: "One-time purchase" },
    cta: { it: "Vedi template UI →", en: "View UI templates →" },
    href: "#browse",
  },
  {
    id: "notion",
    icon: <NotionIcon />,
    name: { it: "Notion Templates", en: "Notion Templates" },
    tagline: { it: "Sistemi di lavoro, non solo pagine.", en: "Work systems, not just pages." },
    description: {
      it: "Project manager, CRM, knowledge base, tracker personali. Strutture relazionali progettate per l'uso reale.",
      en: "Project managers, CRMs, knowledge bases, personal trackers. Relational structures designed for real use.",
    },
    features: {
      it: ["Database relazionali", "Viste multiple incluse", "Istruzioni d'uso dettagliate", "Duplica in un click"],
      en: ["Relational databases", "Multiple views included", "Detailed usage guide", "Duplicate in one click"],
    },
    price: "da €19",
    priceNote: { it: "Acquisto unico", en: "One-time purchase" },
    cta: { it: "Vedi Notion templates →", en: "View Notion templates →" },
    href: "#browse",
  },
  {
    id: "prompts",
    icon: <PromptIcon />,
    name: { it: "AI Prompt Packs", en: "AI Prompt Packs" },
    tagline: { it: "Istruzioni che parlano al modello giusto.", en: "Instructions that speak to the right model." },
    description: {
      it: "Prompt engineering curati per Claude, GPT, Gemini. Output prevedibili, tono calibrato, workflow replicabili.",
      en: "Curated prompt engineering for Claude, GPT, Gemini. Predictable output, calibrated tone, replicable workflows.",
    },
    features: {
      it: ["Testati con Claude 3.5+", "Varianti per contesto", "Libreria di system prompt", "Aggiornamenti inclusi"],
      en: ["Tested with Claude 3.5+", "Context variants included", "System prompt library", "Updates included"],
    },
    price: "da €29",
    priceNote: { it: "Acquisto unico", en: "One-time purchase" },
    cta: { it: "Vedi prompt packs →", en: "View prompt packs →" },
    href: "#browse",
  },
];

function CategoryCard({ cat, index, lang }: { cat: Category; index: number; lang: "it" | "en" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease }}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "clamp(28px, 4vw, 44px)",
        border: "1px solid var(--apple-border)",
        background: "var(--apple-surface)",
        flex: 1,
        minWidth: "0",
        position: "relative",
      }}
    >
      {/* Icon */}
      <div style={{ color: "var(--apple-text)", marginBottom: "20px" }}>
        {cat.icon}
      </div>

      {/* Name */}
      <p
        style={{
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--apple-text-secondary)",
          marginBottom: "10px",
          fontFamily: "var(--font-jakarta), sans-serif",
        }}
      >
        {cat.name[lang]}
      </p>

      {/* Tagline */}
      <h3
        className="apple-headline"
        style={{ fontSize: "clamp(22px, 3vw, 32px)", marginBottom: "16px" }}
      >
        {cat.tagline[lang]}
      </h3>

      {/* Description */}
      <p
        className="apple-subhead"
        style={{ fontSize: "15px", lineHeight: 1.65, marginBottom: "24px" }}
      >
        {cat.description[lang]}
      </p>

      {/* Feature list */}
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0", display: "flex", flexDirection: "column", gap: "8px" }}>
        {cat.features[lang].map((f) => (
          <li
            key={f}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: "var(--apple-text-secondary)",
              fontFamily: "var(--font-jakarta), sans-serif",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, color: "var(--accent)" }}>
              <path d="M2.5 7l3 3L11.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Price */}
      <div
        style={{
          paddingTop: "20px",
          borderTop: "1px solid var(--apple-divider)",
          marginBottom: "16px",
        }}
      >
        <span
          style={{
            fontSize: "clamp(20px, 2.5vw, 26px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--apple-text)",
            fontFamily: "var(--font-montserrat), sans-serif",
          }}
        >
          {cat.price}
        </span>
        <span
          style={{
            fontSize: "12px",
            color: "var(--apple-text-tertiary)",
            marginLeft: "8px",
            fontFamily: "var(--font-jakarta), sans-serif",
          }}
        >
          {cat.priceNote[lang]}
        </span>
      </div>

      {/* CTA */}
      <Link
        href={cat.href}
        onClick={(e) => {
          if (cat.href.startsWith("#")) {
            e.preventDefault();
            document.getElementById(cat.href.slice(1))?.scrollIntoView({ behavior: "smooth" });
          }
        }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: "var(--accent)",
          textDecoration: "none",
          fontFamily: "var(--font-jakarta), sans-serif",
          transition: "opacity 0.15s ease",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
      >
        {cat.cta[lang]}
      </Link>
    </motion.div>
  );
}

export default function CategoryLineup() {
  const { lang } = useLang();
  const headRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section
      id="lineup"
      style={{
        background: "var(--apple-bg-alt)",
        padding: "clamp(80px, 12vw, 140px) 5vw",
        borderTop: "1px solid var(--apple-divider)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section header */}
        <div ref={headRef} style={{ marginBottom: "clamp(48px, 6vw, 72px)", maxWidth: "640px" }}>
          <motion.p
            className="apple-eyebrow"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: "16px" }}
          >
            {lang === "it" ? "La nostra lineup" : "Our lineup"}
          </motion.p>
          <motion.h2
            className="apple-headline"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease }}
            style={{ fontSize: "clamp(36px, 5vw, 56px)", marginBottom: "16px" }}
          >
            {lang === "it" ? "Tre categorie. Un unico standard." : "Three categories. One standard."}
          </motion.h2>
          <motion.p
            className="apple-subhead"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2, ease }}
            style={{ fontSize: "clamp(16px, 2vw, 20px)" }}
          >
            {lang === "it"
              ? "Ogni categoria è progettata con la stessa cura: produzione-ready, personalizzabile con AI, acquisto unico."
              : "Every category is crafted with the same care: production-ready, AI-customizable, one-time purchase."}
          </motion.p>
        </div>

        {/* Category cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            background: "var(--apple-border)",
            border: "1px solid var(--apple-border)",
          }}
        >
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} lang={lang} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            marginTop: "24px",
            fontSize: "12px",
            color: "var(--apple-text-tertiary)",
            textAlign: "center",
            fontFamily: "var(--font-jakarta), sans-serif",
          }}
        >
          {lang === "it"
            ? "Tutti i template includono personalizzazione gratuita con AI Studio dopo l'acquisto."
            : "All templates include free AI Studio customization after purchase."}
        </motion.p>
      </div>
    </section>
  );
}
