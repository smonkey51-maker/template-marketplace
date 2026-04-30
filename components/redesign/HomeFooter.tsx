"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import { useTheme } from "@/components/ThemeProvider";
import EmailCapture from "@/components/EmailCapture";

const COLUMNS = {
  it: [
    {
      heading: "Prodotti",
      links: [
        { label: "Template UI", href: "#browse" },
        { label: "Notion Templates", href: "#browse" },
        { label: "AI Prompt Packs", href: "#browse" },
        { label: "Bundle", href: "#browse" },
        { label: "AI Studio", href: "/studio" },
      ],
    },
    {
      heading: "Risorse",
      links: [
        { label: "Guida all'acquisto", href: "/guide" },
        { label: "Anteprima template", href: "#browse" },
        { label: "Wishlist", href: "/wishlist" },
        { label: "Il mio account", href: "/account" },
      ],
    },
    {
      heading: "Azienda",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Termini di servizio", href: "/terms" },
        { label: "Newsletter", href: "#newsletter" },
      ],
    },
  ],
  en: [
    {
      heading: "Products",
      links: [
        { label: "UI Templates", href: "#browse" },
        { label: "Notion Templates", href: "#browse" },
        { label: "AI Prompt Packs", href: "#browse" },
        { label: "Bundles", href: "#browse" },
        { label: "AI Studio", href: "/studio" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Buyer's guide", href: "/guide" },
        { label: "Template preview", href: "#browse" },
        { label: "Wishlist", href: "/wishlist" },
        { label: "My account", href: "/account" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of service", href: "/terms" },
        { label: "Newsletter", href: "#newsletter" },
      ],
    },
  ],
};

export default function HomeFooter() {
  const { lang, toggle: toggleLang } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const cols = COLUMNS[lang];
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--apple-bg-alt)",
        borderTop: "1px solid var(--apple-divider)",
        padding: "0 5vw",
      }}
    >
      {/* Newsletter strip */}
      <div
        id="newsletter"
        style={{
          padding: "clamp(48px, 6vw, 72px) 0",
          borderBottom: "1px solid var(--apple-divider)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "32px",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--apple-text-secondary)",
              marginBottom: "8px",
              fontFamily: "var(--font-jakarta), sans-serif",
            }}
          >
            Newsletter
          </p>
          <h3
            style={{
              fontSize: "clamp(20px, 2.8vw, 28px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--apple-text)",
              marginBottom: "8px",
              fontFamily: "var(--font-montserrat), sans-serif",
            }}
          >
            {lang === "it" ? "Novità dal marketplace." : "News from the marketplace."}
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "var(--apple-text-secondary)",
              lineHeight: 1.6,
              fontFamily: "var(--font-jakarta), sans-serif",
            }}
          >
            {lang === "it"
              ? "Nuovi template, guide e aggiornamenti sullo Studio. Una volta al mese, niente spam."
              : "New templates, guides, and Studio updates. Once a month, no spam."}
          </p>
        </div>
        <div style={{ maxWidth: "420px" }}>
          <EmailCapture lang={lang} />
        </div>
      </div>

      {/* Main footer grid */}
      <div
        style={{
          padding: "clamp(48px, 6vw, 64px) 0 0",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "clamp(32px, 4vw, 48px)",
        }}
      >
        {/* Brand column */}
        <div style={{ gridColumn: "span 1" }}>
          <Link
            href="/"
            style={{
              display: "block",
              fontSize: "20px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--apple-text)",
              textDecoration: "none",
              marginBottom: "12px",
              fontFamily: "var(--font-montserrat), sans-serif",
            }}
          >
            Forma
          </Link>
          <p
            style={{
              fontSize: "13px",
              color: "var(--apple-text-secondary)",
              lineHeight: 1.65,
              maxWidth: "220px",
              fontFamily: "var(--font-jakarta), sans-serif",
            }}
          >
            {lang === "it"
              ? "Marketplace di template digitali. UI, Notion, AI prompts. Personalizzabili con Claude."
              : "Digital template marketplace. UI, Notion, AI prompts. Customizable with Claude."}
          </p>

          {/* Claude attribution */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "20px",
              padding: "5px 10px",
              border: "1px solid var(--apple-border)",
              fontSize: "11px",
              color: "var(--apple-text-tertiary)",
              fontFamily: "var(--font-jakarta), sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {lang === "it" ? "AI di Anthropic Claude" : "Powered by Anthropic Claude"}
          </div>
        </div>

        {/* Nav columns */}
        {cols.map((col) => (
          <div key={col.heading}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--apple-text)",
                marginBottom: "16px",
                fontFamily: "var(--font-jakarta), sans-serif",
              }}
            >
              {col.heading}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {col.links.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={(e) => {
                      if (href.startsWith("#")) {
                        e.preventDefault();
                        document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    style={{
                      fontSize: "13px",
                      color: "var(--apple-text-secondary)",
                      textDecoration: "none",
                      fontFamily: "var(--font-jakarta), sans-serif",
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--apple-text)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--apple-text-secondary)"; }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingTop: "24px",
          paddingBottom: "clamp(32px, 4vw, 48px)",
          marginTop: "clamp(32px, 4vw, 48px)",
          borderTop: "1px solid var(--apple-divider)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            color: "var(--apple-text-tertiary)",
            fontFamily: "var(--font-jakarta), sans-serif",
          }}
        >
          &copy; {year} Forma.{" "}
          {lang === "it" ? "Tutti i diritti riservati." : "All rights reserved."}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={toggleLang}
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: "var(--apple-text-tertiary)",
              background: "transparent",
              border: "1px solid var(--apple-border)",
              cursor: "pointer",
              padding: "4px 10px",
              transition: "color 0.15s ease",
              fontFamily: "var(--font-jakarta), sans-serif",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--apple-text)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--apple-text-tertiary)"; }}
          >
            {lang === "it" ? "English" : "Italiano"}
          </button>

          <button
            onClick={toggleTheme}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "11px",
              fontWeight: 500,
              color: "var(--apple-text-tertiary)",
              background: "transparent",
              border: "1px solid var(--apple-border)",
              cursor: "pointer",
              padding: "4px 10px",
              transition: "color 0.15s ease",
              fontFamily: "var(--font-jakarta), sans-serif",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--apple-text)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--apple-text-tertiary)"; }}
          >
            {theme === "dark" ? (
              <>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
                Light
              </>
            ) : (
              <>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
                Dark
              </>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
}
