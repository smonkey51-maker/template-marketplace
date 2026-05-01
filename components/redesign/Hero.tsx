"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useLang } from "@/components/LanguageProvider";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";

const EASE = [0.16, 1, 0.3, 1] as const;

// ── Hairline components ────────────────────────────────────────────────────────

function DoubleHairline() {
  return (
    <div style={{ padding: "0 0" }}>
      <div style={{ height: "2px", background: "var(--forma-text)", opacity: 0.85 }} />
      <div style={{ height: "3px" }} />
      <div style={{ height: "0.5px", background: "var(--forma-text)", opacity: 0.3 }} />
    </div>
  );
}

function SingleHairline() {
  return (
    <div style={{ height: "0.5px", background: "var(--forma-text)", opacity: 0.15 }} />
  );
}

// ── Dot separator ──────────────────────────────────────────────────────────────

function Dot() {
  return (
    <span
      aria-hidden
      style={{ opacity: 0.3, margin: "0 12px", userSelect: "none" }}
    >
      ·
    </span>
  );
}

// ── Shared nav link style ──────────────────────────────────────────────────────

const navLinkBase: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: "9px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--forma-text-muted)",
  textDecoration: "none",
  transition: "color 0.18s ease",
  whiteSpace: "nowrap",
};

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={navLinkBase}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--forma-text)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--forma-text-muted)"; }}
    >
      {children}
    </Link>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────────────────

export default function Hero() {
  const { lang } = useLang();
  const [mounted, setMounted] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.platform));
  }, []);

  const openPalette = () => {
    const evt = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: isMac,
      ctrlKey: !isMac,
      bubbles: true,
    });
    window.dispatchEvent(evt);
  };

  // Formatted date: "30 APR 2026"
  const now = new Date();
  const dateStr = now
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase()
    .replace(/\./g, "");

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="forma-snap forma-v2-section"
      style={{
        minHeight: "100svh",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── A) Info bar ──────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px clamp(16px, 8vw, 120px)",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {/* Left: date */}
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "9px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--forma-text-muted)",
            opacity: 0.6,
          }}
        >
          {dateStr}
        </span>

        {/* Center: subtitle — hidden on mobile to prevent wrapping */}
        <span
          className="hidden sm:block"
          style={{
            fontFamily: "monospace",
            fontSize: "9px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--forma-text-muted)",
            opacity: 0.6,
            textAlign: "center",
          }}
        >
          {lang === "it"
            ? "Marketplace di template digitali"
            : "Digital template marketplace"}
        </span>

        {/* Right: controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <ThemeToggle />
          <LanguageToggle />
          <UserButton />
        </div>
      </motion.div>

      {/* ── B) Double hairline ───────────────────────────────────────────────── */}
      <DoubleHairline />

      {/* ── C) FORMA masthead ────────────────────────────────────────────────── */}
      <div
        style={{
          textAlign: "center",
          padding: "clamp(24px,4vw,48px) 0",
          position: "relative",
        }}
      >
        <motion.h1
          className="forma-masthead"
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.2, ease: EASE }}
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(44px, 11vw, 210px)",
            fontWeight: 300,
            letterSpacing: "0.38em",
            lineHeight: 1,
            textAlign: "center",
            color: "var(--forma-text)",
            textTransform: "uppercase",
            margin: 0,
            paddingRight: "0.38em", // compensate for trailing letter-spacing
          }}
        >
          Forma
        </motion.h1>
      </div>

      {/* ── D) Double hairline ───────────────────────────────────────────────── */}
      <DoubleHairline />

      {/* ── E) Nav links row — hidden on mobile (MobileNav drawer handles mobile nav) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
        className="hidden sm:flex"
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 8vw",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {/* Left: page links */}
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <NavLink href="/">
            {lang === "it" ? "Catalogo" : "Catalog"} →
          </NavLink>
          <Dot />
          <NavLink href="/guide">
            {lang === "it" ? "Guida" : "Guide"} →
          </NavLink>
          <Dot />
          <NavLink href="/studio">AI Studio →</NavLink>
          <Dot />
          <NavLink href="/account">Account →</NavLink>
        </div>

        {/* Right: search + Studio CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Search / command palette trigger */}
          <button
            type="button"
            onClick={openPalette}
            aria-label={lang === "it" ? "Apri palette comandi" : "Open command palette"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <span style={navLinkBase}>
              {lang === "it" ? "Cerca" : "Search"}
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "8px",
                letterSpacing: "0.06em",
                color: "var(--forma-text-muted)",
                border: "1px solid var(--forma-border)",
                padding: "1px 5px",
                opacity: 0.55,
                userSelect: "none",
              }}
            >
              {isMac ? "⌘K" : "Ctrl K"}
            </span>
          </button>

          {/* Studio CTA */}
          <Link
            href="/studio"
            style={{
              fontFamily: "monospace",
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--forma-text-accent)",
              border: "1px solid var(--forma-text-accent)",
              padding: "4px 10px",
              textDecoration: "none",
              background: "transparent",
              transition: "background 0.18s ease, color 0.18s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "var(--forma-text-accent)";
              el.style.color = "var(--forma-bg)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.color = "var(--forma-text-accent)";
            }}
          >
            Studio →
          </Link>
        </div>
      </motion.div>

      {/* ── F) Single hairline ───────────────────────────────────────────────── */}
      <SingleHairline />

      {/* ── G) Editorial content area ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          padding: "clamp(32px,5vw,60px) 8vw clamp(48px,6vw,80px)",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "clamp(32px, 4vw, 64px)",
            alignItems: "start",
          }}
          className="forma-editorial-grid"
        >
          {/* Left column */}
          <div>
            {/* Eyebrow */}
            <p
              style={{
                fontFamily: "monospace",
                fontSize: "9px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--forma-text-accent)",
                marginBottom: "16px",
                margin: "0 0 16px 0",
              }}
            >
              {lang === "it" ? "Edizione digitale · Vol. I" : "Digital edition · Vol. I"}
            </p>

            {/* Editorial headline */}
            <h2
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(32px, 4.5vw, 52px)",
                fontWeight: 400,
                lineHeight: 1.15,
                color: "var(--forma-text)",
                margin: "0 0 clamp(14px, 1.5vw, 20px) 0",
              }}
            >
              {lang === "it"
                ? "Template come oggetti curati."
                : "Templates as curated objects."}
            </h2>

            {/* Tagline */}
            <p
              style={{
                fontFamily: "var(--font-inter), var(--font-jakarta), sans-serif",
                fontSize: "clamp(13px, 1.2vw, 15px)",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "var(--forma-text-muted)",
                maxWidth: "360px",
                margin: 0,
              }}
            >
              {lang === "it"
                ? "Ogni file è un gesto preciso, non una soluzione generica."
                : "Every file is a precise gesture, not a generic solution."}
            </p>

            {/* CTAs */}
            <div
              style={{
                marginTop: "clamp(24px, 3vw, 36px)",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0",
              }}
            >
              <button
                onClick={() =>
                  document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" })
                }
                style={{
                  fontFamily: "monospace",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--forma-bg)",
                  background: "var(--forma-text)",
                  border: "1px solid var(--forma-text)",
                  padding: "10px 24px",
                  cursor: "pointer",
                  borderRadius: 0,
                  transition: "background 0.18s ease, color 0.18s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "var(--forma-text-muted)";
                  el.style.borderColor = "var(--forma-text-muted)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "var(--forma-text)";
                  el.style.borderColor = "var(--forma-text)";
                }}
              >
                {lang === "it" ? "Sfoglia" : "Browse"}
              </button>

              <Link
                href="/studio"
                style={{
                  fontFamily: "monospace",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--forma-text-accent)",
                  textDecoration: "none",
                  marginLeft: "24px",
                  transition: "opacity 0.18s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                AI Studio →
              </Link>
            </div>
          </div>

          {/* Right column — desktop only */}
          <div
            className="hidden md:block"
            style={{
              position: "relative",
              paddingLeft: "clamp(24px, 3vw, 48px)",
              borderLeft: "1px solid var(--forma-border)",
            }}
          >
            {/* Stats column */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Stat 1 */}
              <div style={{ paddingBottom: "clamp(16px, 2vw, 28px)" }}>
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    fontSize: "48px",
                    fontWeight: 300,
                    lineHeight: 1,
                    color: "var(--forma-text)",
                    marginBottom: "6px",
                  }}
                >
                  40+
                </div>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: "9px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--forma-text-muted)",
                  }}
                >
                  {lang === "it" ? "template nel catalogo" : "templates in catalog"}
                </div>
              </div>

              <div style={{ height: "1px", background: "var(--forma-border)", opacity: 1 }} />

              {/* Stat 2 */}
              <div style={{ padding: "clamp(16px, 2vw, 28px) 0" }}>
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    fontSize: "48px",
                    fontWeight: 300,
                    lineHeight: 1,
                    color: "var(--forma-text)",
                    marginBottom: "6px",
                  }}
                >
                  3
                </div>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: "9px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--forma-text-muted)",
                  }}
                >
                  {lang === "it" ? "categorie" : "categories"}
                </div>
              </div>

              <div style={{ height: "1px", background: "var(--forma-border)", opacity: 1 }} />

              {/* Stat 3 */}
              <div style={{ paddingTop: "clamp(16px, 2vw, 28px)" }}>
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                    fontSize: "48px",
                    fontWeight: 300,
                    lineHeight: 1,
                    color: "var(--forma-text)",
                    marginBottom: "6px",
                  }}
                >
                  €19
                </div>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: "9px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--forma-text-muted)",
                  }}
                >
                  {lang === "it" ? "da · acquisto unico" : "from · one-time purchase"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── H) Scroll cue — hidden on mobile to avoid layout clutter ─────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-hidden
        className="hidden sm:flex"
        style={{
          position: "absolute",
          bottom: "24px",
          left: "8vw",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "8px",
          opacity: 0.4,
        }}
      >
        <div
          style={{
            width: "1px",
            height: "32px",
            background: "var(--forma-text)",
          }}
        />
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "9px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--forma-text-muted)",
          }}
        >
          {lang === "it" ? "scorri" : "scroll"}
        </span>
      </motion.div>
    </section>
  );
}
