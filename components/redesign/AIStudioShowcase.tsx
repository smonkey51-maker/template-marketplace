"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const DEMO_PROMPT = {
  it: "Rendi questo hero più minimalista, sfondo bianco puro, testo nero, un solo CTA.",
  en: "Make this hero more minimal, pure white background, black text, single CTA.",
};

const DEMO_OUTPUT = [
  '<section class="min-h-screen flex items-center',
  '  justify-center bg-white px-8">',
  '  <div class="max-w-3xl text-center">',
  '    <h1 class="text-7xl font-semibold',
  '      tracking-tight text-black mb-6">',
  '      Shape your',
  '      <br/>product.',
  '    </h1>',
  '    <p class="text-xl text-gray-500 mb-10">',
  '      Templates that adapt to your vision.',
  '    </p>',
  '    <a href="#" class="inline-flex items-center',
  '      px-8 py-4 bg-black text-white font-medium',
  '      text-sm tracking-wide hover:bg-gray-900',
  '      transition-colors">',
  '      Get started',
  '    </a>',
  '  </div>',
  '</section>',
];

const FEATURES = {
  it: [
    {
      icon: "⌘",
      title: "Generazione da zero",
      body: "Descrivi l'interfaccia che immagini. Claude la costruisce in HTML + Tailwind in pochi secondi.",
    },
    {
      icon: "↺",
      title: "Personalizzazione iterativa",
      body: "Parti da un template Forma e raffinalo con istruzioni naturali. Ogni iterazione è istantanea.",
    },
    {
      icon: "↓",
      title: "Export immediato",
      body: "Copia il codice o scarica il file HTML. Zero dipendenze, pronto per il deploy.",
    },
  ],
  en: [
    {
      icon: "⌘",
      title: "Generation from scratch",
      body: "Describe the interface you imagine. Claude builds it in HTML + Tailwind in seconds.",
    },
    {
      icon: "↺",
      title: "Iterative customization",
      body: "Start from a Forma template and refine it with natural instructions. Every iteration is instant.",
    },
    {
      icon: "↓",
      title: "Instant export",
      body: "Copy the code or download the HTML file. Zero dependencies, ready to deploy.",
    },
  ],
};

function TypingOutput({ lines, active }: { lines: string[]; active: boolean }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!active) { setVisibleCount(0); return; }
    setVisibleCount(0);
    const timer = setInterval(() => {
      setVisibleCount((c) => {
        if (c >= lines.length) { clearInterval(timer); return c; }
        return c + 1;
      });
    }, 90);
    return () => clearInterval(timer);
  }, [active, lines]);

  return (
    <div
      style={{
        fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
        fontSize: "12px",
        lineHeight: "1.7",
        color: "#A8FF78",
        padding: "20px",
        overflowX: "auto",
        minHeight: "200px",
      }}
    >
      {lines.slice(0, visibleCount).map((line, i) => (
        <div key={i} style={{ whiteSpace: "pre" }}>
          <span style={{ color: "#4A4A5A", userSelect: "none", marginRight: "12px" }}>
            {String(i + 1).padStart(2, " ")}
          </span>
          {line}
        </div>
      ))}
      {visibleCount < lines.length && (
        <div>
          <span style={{ color: "#4A4A5A", marginRight: "12px" }}>
            {String(visibleCount + 1).padStart(2, " ")}
          </span>
          <span className="cursor-blink" style={{ color: "#A8FF78" }}>▌</span>
        </div>
      )}
    </div>
  );
}

export default function AIStudioShowcase() {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-120px" });
  const [demoActive, setDemoActive] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setDemoActive(true), 600);
      return () => clearTimeout(t);
    }
  }, [inView]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const panelY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const features = FEATURES[lang];

  return (
    <section
      id="studio"
      ref={sectionRef}
      style={{
        background: "#0A0A0A",
        padding: "clamp(80px, 12vw, 140px) 5vw",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "clamp(48px, 6vw, 80px)",
          alignItems: "center",
        }}
      >
        {/* ── Left: text content ── */}
        <div>
          <motion.p
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "#86868B",
              marginBottom: "20px",
              fontFamily: "var(--font-jakarta), sans-serif",
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            AI Studio
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "#F5F5F7",
              marginBottom: "20px",
              fontFamily: "var(--font-montserrat), -apple-system, sans-serif",
            }}
          >
            {lang === "it"
              ? <>Personalizza tutto.<br />Powered by Claude.</>
              : <>Customize anything.<br />Powered by Claude.</>}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2, ease }}
            style={{
              fontSize: "clamp(15px, 1.8vw, 19px)",
              lineHeight: 1.65,
              color: "#86868B",
              marginBottom: "40px",
              maxWidth: "480px",
              fontFamily: "var(--font-jakarta), sans-serif",
            }}
          >
            {lang === "it"
              ? "Scrivi un'istruzione in linguaggio naturale. Lo Studio traduce la tua visione in codice HTML + Tailwind preciso, in tempo reale."
              : "Write an instruction in natural language. The Studio translates your vision into precise HTML + Tailwind code, in real time."}
          </motion.p>

          {/* Feature list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease }}
                style={{ display: "flex", gap: "16px" }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#F5F5F7",
                    flexShrink: 0,
                    fontFamily: "monospace",
                  }}
                >
                  {feat.icon}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#F5F5F7",
                      marginBottom: "4px",
                      letterSpacing: "-0.01em",
                      fontFamily: "var(--font-jakarta), sans-serif",
                    }}
                  >
                    {feat.title}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#86868B",
                      lineHeight: 1.6,
                      fontFamily: "var(--font-jakarta), sans-serif",
                    }}
                  >
                    {feat.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{ marginTop: "40px", display: "flex", gap: "12px", flexWrap: "wrap" }}
          >
            <Link
              href="/studio"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                background: "#F5F5F7",
                color: "#000000",
                textDecoration: "none",
                transition: "opacity 0.15s ease",
                fontFamily: "var(--font-jakarta), sans-serif",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.82"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              {lang === "it" ? "Apri AI Studio" : "Open AI Studio"}
            </Link>
            <Link
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                background: "transparent",
                color: "#86868B",
                border: "1px solid rgba(255,255,255,0.16)",
                textDecoration: "none",
                transition: "color 0.15s ease, border-color 0.15s ease",
                fontFamily: "var(--font-jakarta), sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#F5F5F7";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.36)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#86868B";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.16)";
              }}
            >
              {lang === "it" ? "Vedi prezzi" : "See pricing"}
            </Link>
          </motion.div>
        </div>

        {/* ── Right: animated terminal/studio panel ── */}
        <motion.div
          style={{ y: panelY }}
          initial={{ opacity: 0, x: 32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease }}
        >
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.10)",
              background: "#111111",
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
            }}
          >
            {/* Panel header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                background: "#0D0D0D",
              }}
            >
              <div style={{ display: "flex", gap: "5px" }}>
                {["#FF5F57", "#FFBD2E", "#27C840"].map((c) => (
                  <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, opacity: 0.6 }} />
                ))}
              </div>
              <span style={{ fontSize: "11px", color: "#4A4A5A", marginLeft: "4px", fontFamily: "monospace" }}>
                AI Studio — forma.design
              </span>
            </div>

            {/* Prompt input area */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p style={{ fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#4A4A5A", marginBottom: "8px", fontFamily: "monospace" }}>
                {lang === "it" ? "Prompt" : "Prompt"}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  padding: "10px 12px",
                  background: "#1A1A1A",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: "1px", color: "#4A4A5A" }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor" />
                </svg>
                <p style={{ fontSize: "12px", color: "#636366", fontFamily: "var(--font-jakarta), sans-serif", lineHeight: 1.5 }}>
                  {DEMO_PROMPT[lang]}
                </p>
              </div>
            </div>

            {/* Output area */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 20px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p style={{ fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#4A4A5A", fontFamily: "monospace" }}>
                  Output
                </p>
                {demoActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#A8FF78",
                      }}
                    />
                    <span style={{ fontSize: "10px", color: "#A8FF78", fontFamily: "monospace" }}>
                      {lang === "it" ? "Generazione in corso" : "Generating"}
                    </span>
                  </motion.div>
                )}
              </div>
              <TypingOutput lines={DEMO_OUTPUT} active={demoActive} />
            </div>

            {/* Token badge */}
            <div
              style={{
                padding: "10px 20px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: "10px", color: "#4A4A5A", fontFamily: "monospace" }}>
                claude-opus-4-6
              </span>
              <span style={{ fontSize: "10px", color: "#4A4A5A", fontFamily: "monospace" }}>
                {lang === "it" ? "∞ personalizzazioni" : "∞ customizations"}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
