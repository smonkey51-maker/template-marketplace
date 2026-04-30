"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { templates, formatPrice } from "@/lib/templates";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { lang } = useLang();
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Subtle parallax: card drifts up slightly on scroll
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // Pick the featured template (editor's pick or first)
  const featured = templates.find((t) => t.editorsPick) ?? templates[0];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="forma-snap"
      style={{
        minHeight: "100svh",
        background: "#F5F0E8",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Section number 01 */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "clamp(80px, 10vh, 100px)",
          left: "8vw",
          fontFamily: "monospace",
          fontSize: "11px",
          fontWeight: 300,
          letterSpacing: "0.04em",
          color: "#1A1815",
          opacity: 0.35,
        }}
      >
        01
      </span>

      {/* ── Main layout: text left, template card right ── */}
      <div
        style={{
          width: "100%",
          padding: "0 8vw",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
          gap: "4vw",
          alignItems: "center",
        }}
      >
        {/* ── Left: giant "Forma" + tagline + CTA ── */}
        <div>
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            style={{
              fontFamily: "var(--font-inter), var(--font-jakarta), sans-serif",
              fontSize: "11px",
              fontWeight: 300,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8B6F47",
              marginBottom: "clamp(16px, 2.5vw, 28px)",
            }}
          >
            {lang === "it" ? "Marketplace di template digitali" : "Digital template marketplace"}
          </motion.p>

          {/* "Forma" — the logotype-headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.15, ease: EASE }}
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(100px, 16vw, 200px)",
              fontWeight: 400,
              letterSpacing: "0.02em",
              lineHeight: 0.92,
              color: "#1A1815",
              margin: 0,
            }}
          >
            Forma
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            style={{
              fontFamily: "var(--font-inter), var(--font-jakarta), sans-serif",
              fontSize: "clamp(14px, 1.4vw, 17px)",
              fontWeight: 300,
              lineHeight: 1.7,
              color: "#4A4642",
              marginTop: "clamp(20px, 2.5vw, 32px)",
              maxWidth: "420px",
            }}
          >
            {lang === "it"
              ? "Template come oggetti curati. Ogni file è un gesto preciso, non una soluzione generica."
              : "Templates as curated objects. Every file is a precise gesture, not a generic solution."}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
            style={{
              marginTop: "clamp(28px, 3.5vw, 48px)",
              display: "flex",
              gap: "24px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                fontFamily: "var(--font-inter), var(--font-jakarta), sans-serif",
                fontSize: "12px",
                fontWeight: 400,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#F5F0E8",
                background: "#1A1815",
                border: "1px solid #1A1815",
                padding: "12px 28px",
                cursor: "pointer",
                transition: "background 0.2s ease, color 0.2s ease",
                borderRadius: "2px",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#4A4642";
                el.style.borderColor = "#4A4642";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#1A1815";
                el.style.borderColor = "#1A1815";
              }}
            >
              {lang === "it" ? "Sfoglia" : "Browse"}
            </button>

            <Link
              href="/studio"
              style={{
                fontFamily: "var(--font-inter), var(--font-jakarta), sans-serif",
                fontSize: "12px",
                fontWeight: 300,
                letterSpacing: "0.06em",
                color: "#4A4642",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#1A1815"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#4A4642"; }}
            >
              AI Studio →
            </Link>
          </motion.div>
        </div>

        {/* ── Right: featured template card, off-center via self-alignment ── */}
        <motion.div
          style={{ y: cardY, alignSelf: "center", paddingTop: "clamp(0px, 4vw, 40px)" }}
          initial={{ opacity: 0, x: 24 }}
          animate={mounted ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          className="hidden md:block"
        >
          {/* The card takes up ~60% of the right column, leaving void to the right */}
          <div style={{ maxWidth: "360px" }}>
            {/* Thin label above */}
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "10px",
                fontWeight: 300,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#8B6F47",
                marginBottom: "12px",
              }}
            >
              {lang === "it" ? "In evidenza" : "Featured"}
            </p>

            {/* Card */}
            <div
              style={{
                border: "1px solid rgba(26,24,21,0.18)",
                background: "#FAF7F0",
                overflow: "hidden",
                borderRadius: "2px",
              }}
            >
              {/* Preview */}
              <div
                style={{
                  height: "220px",
                  background: "#ffffff",
                  overflow: "hidden",
                  position: "relative",
                  borderBottom: "1px solid rgba(26,24,21,0.10)",
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

              {/* Card meta */}
              <div style={{ padding: "16px 20px" }}>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "18px",
                    fontWeight: 400,
                    letterSpacing: "0.01em",
                    color: "#1A1815",
                    marginBottom: "4px",
                  }}
                >
                  {featured.name}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "13px",
                      fontWeight: 300,
                      color: "#4A4642",
                    }}
                  >
                    {formatPrice(featured.price)}
                  </span>
                  <Link
                    href={`/preview/${featured.id}`}
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "11px",
                      fontWeight: 400,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#8B6F47",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#A0522D"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8B6F47"; }}
                  >
                    {lang === "it" ? "Vedi →" : "View →"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "32px",
          left: "8vw",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
        aria-hidden
      >
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "#1A1815",
            opacity: 0.25,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "10px",
            fontWeight: 300,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#4A4642",
            opacity: 0.6,
          }}
        >
          {lang === "it" ? "Scorri" : "Scroll"}
        </span>
      </motion.div>
    </section>
  );
}
