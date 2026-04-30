"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/components/LanguageProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

// Irregular SVG separator — one imperfection in the whole page
const WavySep = () => (
  <svg
    width="100%"
    height="4"
    viewBox="0 0 1200 4"
    preserveAspectRatio="none"
    aria-hidden
    style={{ display: "block", overflow: "visible" }}
  >
    <path
      d="M0 2 C80 1.2 160 2.8 240 2 C320 1.2 400 2.9 480 2 C560 1.1 640 2.7 720 2 C800 1.3 880 2.6 960 2 C1040 1.4 1120 2.5 1200 2"
      stroke="var(--forma-text)"
      strokeWidth="0.7"
      fill="none"
      opacity="0.18"
    />
  </svg>
);

export default function Manifesto() {
  const { lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const sentence = {
    it: "Ogni template è una forma di pensiero applicato al digitale.",
    en: "Every template is a form of applied thinking in the digital space.",
  };

  return (
    <section
      ref={ref}
      style={{
        background: "var(--bg)",
        padding: "clamp(100px, 16vw, 180px) 8vw",
        position: "relative",
      }}
    >
      {/* Top separator — the one irregular line in the page */}
      <WavySep />

      {/* Section number */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "clamp(100px, 16vw, 180px)",
          left: "8vw",
          fontFamily: "monospace",
          fontSize: "11px",
          fontWeight: 300,
          letterSpacing: "0.04em",
          color: "var(--forma-text)",
          opacity: 0.35,
        }}
      >
        02
      </span>

      {/* The manifesto sentence — left-aligned, generous leading */}
      <div style={{ maxWidth: "900px", paddingTop: "clamp(40px, 5vw, 56px)" }}>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease: EASE }}
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(28px, 4.5vw, 48px)",
            fontWeight: 400,
            lineHeight: 1.3,
            letterSpacing: "0.01em",
            color: "var(--forma-text)",
            margin: 0,
          }}
        >
          {sentence[lang]}
        </motion.p>

        {/* Subtle attribution */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontSize: "11px",
            fontWeight: 300,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: "var(--forma-text-accent)",
            marginTop: "clamp(28px, 3vw, 40px)",
          }}
        >
          — Forma
        </motion.p>
      </div>

      {/* Bottom separator — straight */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "8vw",
          right: "8vw",
          height: "1px",
          background: "var(--forma-text)",
          opacity: 0.12,
        }}
      />
    </section>
  );
}
