"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { LayoutProvider, useLayoutMode } from "@/components/redesign/LayoutContext";
import Hero from "@/components/redesign/Hero";
import NewsTicker from "@/components/redesign/NewsTicker";
import Sommario from "@/components/redesign/Sommario";
import Manifesto from "@/components/redesign/Manifesto";
import CategoryRoom from "@/components/redesign/CategoryRoom";
import AIStudio from "@/components/redesign/AIStudio";
import TemplateMasonry from "@/components/redesign/TemplateMasonry";
import SiteFooter from "@/components/redesign/SiteFooter";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useLang } from "@/components/LanguageProvider";

// ── Sticky strip nav link style ───────────────────────────────────────────────

const stripLinkStyle: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: "9px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--forma-text-muted)",
  textDecoration: "none",
  transition: "color 0.18s ease",
  whiteSpace: "nowrap",
};

function StripLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={stripLinkStyle}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--forma-text)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--forma-text-muted)"; }}
    >
      {children}
    </Link>
  );
}

// ── Inner layout wrapper ──────────────────────────────────────────────────────

function HomeV3Inner() {
  const { mode } = useLayoutMode();
  const { lang } = useLang();
  const [pastHero, setPastHero] = useState(false);

  // Apply editorial/compact class on html element
  useEffect(() => {
    if (mode === "editorial") {
      document.documentElement.classList.add("forma-v2");
    } else {
      document.documentElement.classList.remove("forma-v2");
    }
    document.documentElement.classList.toggle("forma-compact", mode === "compact");
    return () => {
      document.documentElement.classList.remove("forma-v2");
      document.documentElement.classList.remove("forma-compact");
    };
  }, [mode]);

  // Observe when hero exits the viewport to reveal the compact sticky strip
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="forma-grain" aria-hidden />

      {/* ── Compact sticky strip — appears after hero exits viewport ─────────── */}
      <div
        aria-hidden={!pastHero}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "var(--nav-bg)",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          borderBottom: "1px solid var(--forma-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 8vw",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          opacity: pastHero ? 1 : 0,
          transform: pastHero ? "translateY(0)" : "translateY(-6px)",
          pointerEvents: pastHero ? "auto" : "none",
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
            fontSize: "22px",
            fontWeight: 300,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--forma-text)",
            textDecoration: "none",
            paddingRight: "0.25em", // compensate trailing letter-spacing
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
        >
          Forma
        </Link>

        {/* Right cluster: nav links + controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <StripLink href="/">
            {lang === "it" ? "Catalogo" : "Catalog"}
          </StripLink>
          <StripLink href="/guide">
            {lang === "it" ? "Guida" : "Guide"}
          </StripLink>
          <StripLink href="/studio">AI Studio</StripLink>
          <StripLink href="/account">Account</StripLink>

          {/* Divider */}
          <span
            aria-hidden
            style={{
              width: "1px",
              height: "14px",
              background: "var(--forma-border)",
              opacity: 0.6,
              flexShrink: 0,
            }}
          />

          <ThemeToggle />
          <LanguageToggle />
          <UserButton />
        </div>
      </div>

      {/* ── Main content — no SiteNav rendered here ───────────────────────────── */}
      <main id="main-content">
        <Hero />
        <NewsTicker />
        <Sommario />
        <Manifesto />
        <CategoryRoom category="ui" sectionIndex={4} featuredId="hero-saas" />
        <CategoryRoom category="notion" sectionIndex={5} featuredId="notion-project-hub" />
        <CategoryRoom category="prompts" sectionIndex={6} featuredId="linkedin-prompt-pack" />
        <AIStudio />
        <TemplateMasonry />
      </main>
      <SiteFooter />
    </div>
  );
}

// ── Default export ────────────────────────────────────────────────────────────

export default function HomeContentV3() {
  return (
    <LayoutProvider>
      <HomeV3Inner />
    </LayoutProvider>
  );
}
