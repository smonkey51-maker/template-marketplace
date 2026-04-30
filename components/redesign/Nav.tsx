"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { useTheme } from "@/components/ThemeProvider";

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggle: toggleLang } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { label: lang === "it" ? "Template" : "Templates", href: "#browse" },
    { label: lang === "it" ? "Lineup" : "Lineup", href: "#lineup" },
    { label: "AI Studio", href: "/studio" },
    { label: lang === "it" ? "Prezzi" : "Pricing", href: "#pricing" },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
          backgroundColor: scrolled ? "var(--apple-nav-bg)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--apple-divider)" : "1px solid transparent",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 5vw",
            height: "52px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontSize: "17px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--apple-text)",
              fontFamily: "var(--font-montserrat), -apple-system, sans-serif",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            Forma
          </Link>

          {/* Desktop nav links */}
          <nav style={{ display: "flex", alignItems: "center", gap: "28px" }} className="hidden md:flex">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={(e) => {
                  if (href.startsWith("#")) {
                    e.preventDefault();
                    const el = document.getElementById(href.slice(1));
                    el?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                style={{
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "var(--apple-text-secondary)",
                  textDecoration: "none",
                  letterSpacing: "-0.005em",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--apple-text)"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--apple-text-secondary)"; }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: "var(--apple-text-secondary)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "6px 8px",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--apple-text)"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--apple-text-secondary)"; }}
            >
              {lang === "it" ? "EN" : "IT"}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--apple-text-secondary)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--apple-text)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--apple-text-secondary)"; }}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Studio CTA — desktop only */}
            <Link
              href="/studio"
              className="hidden sm:inline-flex"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "7px 16px",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                background: "var(--apple-text)",
                color: "var(--apple-bg)",
                textDecoration: "none",
                transition: "opacity 0.15s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.82"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              {lang === "it" ? "Apri Studio" : "Open Studio"}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              style={{
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--apple-text)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            backdropFilter: "saturate(180%) blur(20px)",
            WebkitBackdropFilter: "saturate(180%) blur(20px)",
            backgroundColor: "var(--apple-nav-bg)",
            display: "flex",
            flexDirection: "column",
            padding: "80px 5vw 40px",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={(e) => {
                  setMobileOpen(false);
                  if (href.startsWith("#")) {
                    e.preventDefault();
                    setTimeout(() => {
                      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
                    }, 50);
                  }
                }}
                style={{
                  fontSize: "28px",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: "var(--apple-text)",
                  textDecoration: "none",
                  padding: "10px 0",
                  borderBottom: "1px solid var(--apple-divider)",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div style={{ marginTop: "32px", display: "flex", gap: "12px" }}>
            <Link
              href="/studio"
              onClick={() => setMobileOpen(false)}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px",
                fontSize: "15px",
                fontWeight: 600,
                background: "var(--apple-text)",
                color: "var(--apple-bg)",
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              {lang === "it" ? "Apri AI Studio" : "Open AI Studio"}
            </Link>
          </div>

          <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={toggleLang}
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "var(--apple-text-secondary)",
                background: "transparent",
                border: "1px solid var(--apple-border)",
                cursor: "pointer",
                padding: "6px 12px",
              }}
            >
              {lang === "it" ? "English" : "Italiano"}
            </button>
            <button
              onClick={toggleTheme}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                fontWeight: 500,
                color: "var(--apple-text-secondary)",
                background: "transparent",
                border: "1px solid var(--apple-border)",
                cursor: "pointer",
                padding: "6px 12px",
              }}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
