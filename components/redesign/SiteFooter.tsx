"use client";

import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";

export default function SiteFooter() {
  const { lang, toggle: toggleLang } = useLang();
  const year = new Date().getFullYear();

  const cols = {
    it: [
      {
        heading: "Prodotti",
        links: [
          { label: "Template UI", id: "category-ui" },
          { label: "Notion Templates", id: "category-notion" },
          { label: "AI Prompt Packs", id: "category-prompts" },
          { label: "Bundle", href: "#templates" },
          { label: "AI Studio", href: "/studio" },
        ],
      },
      {
        heading: "Risorse",
        links: [
          { label: "Catalogo completo", id: "templates" },
          { label: "Guida all'acquisto", href: "/guide" },
          { label: "Il mio account", href: "/account" },
          { label: "Wishlist", href: "/wishlist" },
        ],
      },
      {
        heading: "Legale",
        links: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Termini di servizio", href: "/terms" },
        ],
      },
    ],
    en: [
      {
        heading: "Products",
        links: [
          { label: "UI Templates", id: "category-ui" },
          { label: "Notion Templates", id: "category-notion" },
          { label: "AI Prompt Packs", id: "category-prompts" },
          { label: "Bundles", href: "#templates" },
          { label: "AI Studio", href: "/studio" },
        ],
      },
      {
        heading: "Resources",
        links: [
          { label: "Full catalog", id: "templates" },
          { label: "Buyer's guide", href: "/guide" },
          { label: "My account", href: "/account" },
          { label: "Wishlist", href: "/wishlist" },
        ],
      },
      {
        heading: "Legal",
        links: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of service", href: "/terms" },
        ],
      },
    ],
  };

  const columns = cols[lang];

  const linkStyle = {
    fontFamily: "var(--font-inter), var(--font-jakarta), sans-serif",
    fontSize: "13px",
    fontWeight: 300 as const,
    letterSpacing: "0.02em",
    color: "#4A4642",
    textDecoration: "none",
    transition: "color 0.2s ease",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    textAlign: "left" as const,
  };

  return (
    <footer
      style={{
        background: "#F5F0E8",
        borderTop: "1px solid rgba(26,24,21,0.12)",
        padding: "clamp(64px, 8vw, 96px) 8vw clamp(40px, 5vw, 56px)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr repeat(3, 1fr)",
          gap: "clamp(32px, 4vw, 64px)",
        }}
        className="grid-cols-2 md:grid-cols-4"
      >
        {/* Brand column */}
        <div>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "28px",
              fontWeight: 400,
              letterSpacing: "0.04em",
              color: "#1A1815",
              textDecoration: "none",
              display: "block",
              marginBottom: "16px",
            }}
          >
            Forma
          </Link>
          <p
            style={{
              fontFamily: "var(--font-inter), var(--font-jakarta), sans-serif",
              fontSize: "13px",
              fontWeight: 300,
              lineHeight: 1.7,
              color: "#4A4642",
              maxWidth: "220px",
              marginBottom: "24px",
            }}
          >
            {lang === "it"
              ? "Template come oggetti curati. Marketplace italiano di design digitale."
              : "Templates as curated objects. Italian marketplace of digital design."}
          </p>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "10px",
              fontWeight: 300,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#8B6F47",
              opacity: 0.8,
            }}
          >
            {lang === "it" ? "AI di Anthropic Claude" : "Powered by Anthropic Claude"}
          </p>
        </div>

        {/* Nav columns */}
        {columns.map((col) => (
          <div key={col.heading}>
            <p
              style={{
                fontFamily: "monospace",
                fontSize: "10px",
                fontWeight: 300,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: "#1A1815",
                opacity: 0.5,
                marginBottom: "20px",
              }}
            >
              {col.heading}
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {col.links.map(({ label, id, href }) => (
                <li key={label}>
                  {id ? (
                    <button
                      onClick={() =>
                        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
                      }
                      style={linkStyle}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#1A1815"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#4A4642"; }}
                    >
                      {label}
                    </button>
                  ) : (
                    <Link
                      href={href!}
                      style={linkStyle}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#1A1815"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#4A4642"; }}
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          marginTop: "clamp(40px, 5vw, 64px)",
          paddingTop: "clamp(20px, 2.5vw, 28px)",
          borderTop: "1px solid rgba(26,24,21,0.10)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "11px",
            fontWeight: 300,
            letterSpacing: "0.04em",
            color: "#4A4642",
            opacity: 0.7,
          }}
        >
          &copy; {year} Forma.{" "}
          {lang === "it" ? "Tutti i diritti riservati." : "All rights reserved."}
        </p>

        <button
          onClick={toggleLang}
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "11px",
            fontWeight: 400,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: "#4A4642",
            opacity: 0.7,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
        >
          {lang === "it" ? "English" : "Italiano"}
        </button>
      </div>
    </footer>
  );
}
