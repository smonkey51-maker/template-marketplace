"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggle: toggleLang } = useLang();

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
    ? "rgba(245,240,232,0.90)"
    : "transparent";
  const navBorder = scrolled
    ? "1px solid rgba(26,24,21,0.10)"
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
              color: "#1A1815",
              textDecoration: "none",
            }}
          >
            Forma
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
                    color: "#4A4642",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#1A1815"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#4A4642"; }}
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
                    color: "#4A4642",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#1A1815"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#4A4642"; }}
                >
                  {label}
                </Link>
              )
            )}
          </nav>

          {/* Right: lang toggle + mobile trigger */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <button
              onClick={toggleLang}
              aria-label="Cambia lingua"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: "#4A4642",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "color 0.2s ease",
                padding: 0,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#1A1815"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#4A4642"; }}
            >
              {lang === "it" ? "EN" : "IT"}
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
                color: "#1A1815",
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
                  background: "#1A1815",
                  transition: "transform 0.25s ease, opacity 0.25s ease",
                  transform: mobileOpen ? "translateY(6px) rotate(45deg)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "20px",
                  height: "1px",
                  background: "#1A1815",
                  transition: "opacity 0.25s ease",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "20px",
                  height: "1px",
                  background: "#1A1815",
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
            background: "#F5F0E8",
            padding: "100px 8vw 48px",
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}
        >
          {links.map(({ label, id, href }, i) => (
            <div key={label}>
              {i > 0 && (
                <div style={{ height: "1px", background: "#1A1815", opacity: 0.1 }} />
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
                    color: "#1A1815",
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
                    color: "#1A1815",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </Link>
              )}
            </div>
          ))}

          <div style={{ marginTop: "auto" }}>
            <button
              onClick={() => { toggleLang(); setMobileOpen(false); }}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#4A4642",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              {lang === "it" ? "Switch to English" : "Passa all'italiano"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
