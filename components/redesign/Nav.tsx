"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { useLayoutMode } from "@/components/redesign/LayoutContext";
import { useTheme } from "@/components/ThemeProvider";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggle: toggleLang } = useLang();
  const { mode, toggle: toggleLayout } = useLayoutMode();
  const { theme, toggle: toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { label: lang === "it" ? "Catalogo" : "Catalog", id: "templates" },
    { label: "AI Studio", href: "/studio" },
    { label: lang === "it" ? "Guida" : "Guide", href: "/guide" },
  ];

  const navBg = scrolled
    ? "color-mix(in srgb, var(--forma-bg) 90%, transparent)"
    : "transparent";
  const navBorder = scrolled
    ? "1px solid var(--forma-border)"
    : "1px solid transparent";

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backdropFilter: scrolled ? "blur(14px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px) saturate(160%)" : "none",
          backgroundColor: navBg,
          borderBottom: navBorder,
          transition: "background-color 0.45s ease, border-color 0.45s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 8vw",
            height: "60px",
          }}
        >
          {/* Logotype */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "22px",
              fontWeight: 400,
              letterSpacing: "0.04em",
              color: "var(--forma-text)",
              textDecoration: "none",
            }}
          >
            Forma
            <span
              aria-hidden
              style={{
                fontFamily: "serif",
                fontSize: "8px",
                color: "var(--forma-accent-sabi)",
                marginLeft: "6px",
                verticalAlign: "super",
                opacity: 0.7,
              }}
            >
              ·
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex"
            style={{ display: "flex", alignItems: "center", gap: "48px" }}
          >
            {links.map(({ label, id, href }) =>
              id ? (
                <button
                  key={label}
                  onClick={() => scrollTo(id)}
                  style={{
                    fontFamily: "var(--font-inter), var(--font-jakarta), sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                    letterSpacing: "0.06em",
                    color: "var(--forma-text-muted)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--forma-text)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--forma-text-muted)"; }}
                >
                  {label}
                </button>
              ) : (
                <Link
                  key={label}
                  href={href!}
                  style={{
                    fontFamily: "var(--font-inter), var(--font-jakarta), sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                    letterSpacing: "0.06em",
                    color: "var(--forma-text-muted)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--forma-text)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--forma-text-muted)"; }}
                >
                  {label}
                </Link>
              )
            )}
          </nav>

          {/* Right: layout toggle + lang toggle + theme toggle + mobile trigger */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Layout toggle */}
            <button
              onClick={toggleLayout}
              aria-label={mode === "editorial" ? "Vista compatta" : "Vista editoriale"}
              title={mode === "editorial" ? "Vista compatta" : "Vista editoriale"}
              className="hidden md:block"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--forma-text-muted)",
                background: "transparent",
                border: "1px solid var(--forma-border-card)",
                padding: "4px 8px",
                cursor: "pointer",
                borderRadius: "2px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--forma-text)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--forma-border-card)"; }}
            >
              {mode === "editorial" ? "⊟" : "⊞"}
            </button>

            {/* Lang toggle */}
            <button
              onClick={toggleLang}
              aria-label="Cambia lingua"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: "var(--forma-text-muted)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "color 0.2s ease",
                padding: 0,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--forma-text)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--forma-text-muted)"; }}
            >
              {lang === "it" ? "EN" : "IT"}
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Modalità chiara" : "Modalità scura"}
              title={theme === "dark" ? "Modalità chiara" : "Modalità scura"}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "14px",
                color: "var(--forma-text-muted)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "2px 0",
                lineHeight: 1,
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--forma-text)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--forma-text-muted)"; }}
            >
              {theme === "dark" ? "○" : "●"}
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--forma-text)",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                padding: "4px 0",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "20px",
                  height: "1px",
                  background: "var(--forma-text)",
                  transition: "transform 0.25s ease, opacity 0.25s ease",
                  transform: mobileOpen ? "translateY(6px) rotate(45deg)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "20px",
                  height: "1px",
                  background: "var(--forma-text)",
                  transition: "opacity 0.25s ease",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "20px",
                  height: "1px",
                  background: "var(--forma-text)",
                  transition: "transform 0.25s ease, opacity 0.25s ease",
                  transform: mobileOpen ? "translateY(-6px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "var(--forma-bg)",
            padding: "100px 8vw 48px",
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}
        >
          {links.map(({ label, id, href }, i) => (
            <div key={label}>
              {i > 0 && (
                <div style={{ height: "1px", background: "var(--forma-text)", opacity: 0.1 }} />
              )}
              {id ? (
                <button
                  onClick={() => { scrollTo(id); setMobileOpen(false); }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "20px 0",
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "32px",
                    fontWeight: 400,
                    letterSpacing: "0.02em",
                    color: "var(--forma-text)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {label}
                </button>
              ) : (
                <Link
                  href={href!}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block",
                    padding: "20px 0",
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "32px",
                    fontWeight: 400,
                    letterSpacing: "0.02em",
                    color: "var(--forma-text)",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </Link>
              )}
            </div>
          ))}

          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "16px" }}>
            <button
              onClick={() => { toggleLang(); setMobileOpen(false); }}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--forma-text-muted)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {lang === "it" ? "Switch to English" : "Passa all'italiano"}
            </button>
            <button
              onClick={() => { toggleTheme(); setMobileOpen(false); }}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--forma-text-muted)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {theme === "dark"
                ? (lang === "it" ? "Modalità chiara" : "Light mode")
                : (lang === "it" ? "Modalità scura" : "Dark mode")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
