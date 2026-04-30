"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { templates } from "@/lib/templates";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const WORD_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.65, ease },
  }),
};

function AnimatedHeadline({ lines }: { lines: string[][] }) {
  return (
    <motion.h1
      className="apple-headline"
      style={{ fontSize: "clamp(52px, 8.5vw, 96px)", marginBottom: "0" }}
      initial="hidden"
      animate="visible"
    >
      {lines.map((words, lineIdx) => (
        <span key={lineIdx} style={{ display: "block" }}>
          {words.map((word, wIdx) => (
            <motion.span
              key={wIdx}
              custom={lineIdx * words.length + wIdx}
              variants={WORD_VARIANTS}
              style={{ display: "inline-block", marginRight: "0.25em" }}
            >
              {word}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}

export default function Hero() {
  const { lang } = useLang();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const previewY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const previewOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const heroTemplate = templates.find((t) => t.editorsPick) ?? templates[0];

  const headlineIt = [["Design che"], ["prende forma."]];
  const headlineEn = [["Design that"], ["takes shape."]];

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "clamp(100px, 14vh, 140px)",
        paddingBottom: "80px",
        paddingLeft: "5vw",
        paddingRight: "5vw",
        background: "var(--apple-bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Subtle grid pattern ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--apple-divider) 1px, transparent 1px), linear-gradient(90deg, var(--apple-divider) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 20%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Text content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "900px",
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Eyebrow */}
        <motion.p
          className="apple-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: "24px" }}
        >
          {lang === "it" ? "Forma — Marketplace di template digitali" : "Forma — Digital Template Marketplace"}
        </motion.p>

        {/* Animated headline */}
        {mounted && <AnimatedHeadline lines={lang === "it" ? headlineIt : headlineEn} />}
        {!mounted && (
          <h1
            className="apple-headline"
            style={{ fontSize: "clamp(52px, 8.5vw, 96px)" }}
          >
            {lang === "it" ? <>Design che<br />prende forma.</> : <>Design that<br />takes shape.</>}
          </h1>
        )}

        {/* Subtitle */}
        <motion.p
          className="apple-subhead"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease }}
          style={{
            fontSize: "clamp(17px, 2.2vw, 24px)",
            maxWidth: "560px",
            marginTop: "24px",
            marginBottom: "40px",
          }}
        >
          {lang === "it"
            ? "Template professionali. Personalizzabili con Claude AI in secondi. Acquisto unico, nessun abbonamento."
            : "Professional templates. Customizable with Claude AI in seconds. One-time purchase, no subscription."}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease }}
          style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}
        >
          <a
            href="#browse"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "13px 28px",
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              background: "var(--apple-text)",
              color: "var(--apple-bg)",
              textDecoration: "none",
              cursor: "pointer",
              transition: "opacity 0.15s ease",
              fontFamily: "var(--font-jakarta), sans-serif",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.82"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          >
            {lang === "it" ? "Sfoglia il catalogo" : "Browse catalog"}
          </a>

          <Link
            href="/studio"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "13px 28px",
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              background: "transparent",
              color: "var(--apple-text)",
              border: "1px solid var(--apple-border)",
              textDecoration: "none",
              transition: "background-color 0.15s ease, border-color 0.15s ease",
              fontFamily: "var(--font-jakarta), sans-serif",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "var(--apple-surface-alt)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
            }}
          >
            {lang === "it" ? "Apri AI Studio" : "Open AI Studio"}
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6h7M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(24px, 5vw, 56px)",
            marginTop: "48px",
            paddingTop: "32px",
            borderTop: "1px solid var(--apple-divider)",
            width: "100%",
            maxWidth: "520px",
          }}
        >
          {[
            { value: `${templates.length}+`, label: lang === "it" ? "Template" : "Templates" },
            { value: "da €19", label: lang === "it" ? "Acquisto unico" : "One-time purchase" },
            { value: "Claude AI", label: lang === "it" ? "AI integrata" : "Built-in AI" },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: "clamp(16px, 2vw, 20px)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: "var(--apple-text)",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  marginBottom: "4px",
                }}
              >
                {value}
              </p>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--apple-text-tertiary)",
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Hero template preview window ── */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7, ease }}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "860px",
          marginTop: "clamp(48px, 8vh, 80px)",
          y: previewY,
          opacity: previewOpacity,
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            border: "1px solid var(--apple-border)",
            boxShadow: "var(--apple-shadow-elevated)",
            background: "var(--apple-surface)",
            overflow: "hidden",
          }}
        >
          {/* Toolbar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              background: "var(--apple-bg-alt)",
              borderBottom: "1px solid var(--apple-divider)",
            }}
          >
            <div style={{ display: "flex", gap: "6px" }}>
              {["#FF5F57", "#FFBD2E", "#27C840"].map((c) => (
                <div
                  key={c}
                  style={{ width: "11px", height: "11px", borderRadius: "50%", background: c }}
                />
              ))}
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  padding: "3px 12px",
                  fontSize: "11px",
                  color: "var(--apple-text-tertiary)",
                  background: "var(--apple-surface)",
                  border: "1px solid var(--apple-divider)",
                  maxWidth: "260px",
                  width: "100%",
                  textAlign: "center",
                  letterSpacing: "-0.01em",
                }}
              >
                forma.design/preview/{heroTemplate.id}
              </div>
            </div>
          </div>

          {/* Preview iframe */}
          <div
            style={{
              width: "100%",
              height: "clamp(280px, 38vw, 420px)",
              overflow: "hidden",
              background: "#ffffff",
              position: "relative",
            }}
          >
            <iframe
              src={`/api/preview/${heroTemplate.id}`}
              title={heroTemplate.name}
              aria-hidden="true"
              style={{
                width: "143%",
                height: "143%",
                border: "none",
                transformOrigin: "top left",
                transform: "scale(0.7)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* Caption */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "12px",
            padding: "0 4px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: "var(--apple-text-tertiary)",
              letterSpacing: "-0.01em",
            }}
          >
            {heroTemplate.name}
            {heroTemplate.editorsPick && (
              <span
                style={{
                  marginLeft: "8px",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  padding: "2px 6px",
                  border: "1px solid var(--accent)",
                  opacity: 0.85,
                }}
              >
                {lang === "it" ? "Scelta della redazione" : "Editor's pick"}
              </span>
            )}
          </span>
          <Link
            href={`/preview/${heroTemplate.id}`}
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--accent)",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            {lang === "it" ? "Vedi dettagli →" : "View details →"}
          </Link>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          color: "var(--apple-text-tertiary)",
        }}
        aria-hidden
      >
        <span style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          {lang === "it" ? "Scorri" : "Scroll"}
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
