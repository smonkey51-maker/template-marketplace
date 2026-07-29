"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";

export function FormaFooter() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {}
    setSent(true);
  }

  return (
    <footer
      style={{
        borderTop: "1px solid var(--fn-border, rgba(234,234,234,.10))",
        background: "var(--surface)",
        padding: "64px 36px 32px",
      }}
    >
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        {/* Top row: logo + cols */}
        <div className="fn-footer-grid">
          {/* Brand col */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: 32,
                fontWeight: 300,
                color: "var(--text)",
                marginBottom: 12,
                letterSpacing: ".08em",
              }}
            >
              FORMA
            </div>
            <p
              style={{
                color: "var(--muted)",
                fontSize: 13,
                lineHeight: 1.65,
                maxWidth: 260,
                marginBottom: 24,
              }}
            >
              {t("footerTagline")}
            </p>
            {/* Newsletter */}
            {!sent ? (
              <form
                onSubmit={handleSubscribe}
                style={{
                  display: "flex",
                  gap: 4,
                  background: "var(--bg)",
                  border: "1px solid var(--fn-border, rgba(234,234,234,.14))",
                  borderRadius: 999,
                  padding: "4px",
                  alignItems: "center",
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="fn-newsletter-input"
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    background: "transparent",
                    border: "none",
                    color: "var(--text)",
                    fontSize: 12,
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
                <button
                  type="submit"
                  className="fn-btn primary"
                  style={{ padding: "10px 20px", fontSize: 10, whiteSpace: "nowrap" }}
                >
                  {t("newsletterCta")}
                </button>
              </form>
            ) : (
              <p
                style={{
                  color: "#D4AF37",
                  fontSize: 12,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  padding: "10px 0",
                }}
              >
                ✓ {lang === "it" ? "Iscritto." : "Subscribed."}
              </p>
            )}
          </div>

          {/* Catalog col */}
          <div>
            <div
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: ".22em",
                color: "#D4AF37",
                marginBottom: 16,
                fontWeight: 600,
              }}
            >
              {t("footerCatalog")}
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { href: "/catalogo", label: t("footerTemplates") },
                { href: "/catalogo", label: t("footerBundles") },
                { href: "/catalogo", label: t("footerNew") },
                { href: "/ai-studio", label: "AI Studio" },
              ].map((l) => (
                <Link
                  key={l.href + l.label}
                  href={l.href}
                  className="link-muted"
                  style={{ fontSize: 13, textDecoration: "none" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Support col */}
          <div>
            <div
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: ".22em",
                color: "#D4AF37",
                marginBottom: 16,
                fontWeight: 600,
              }}
            >
              {t("footerSupport")}
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { href: "/guida", label: t("footerFaq") },
                { href: "/guida", label: t("footerGuide") },
                { href: "mailto:supporto@forma.design", label: t("footerContact") },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="link-muted"
                  style={{ fontSize: 13, textDecoration: "none" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal col */}
          <div>
            <div
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: ".22em",
                color: "#D4AF37",
                marginBottom: 16,
                fontWeight: 600,
              }}
            >
              {t("footerLegal")}
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { href: "/terms", label: t("footerTerms") },
                { href: "/privacy", label: t("footerPrivacy") },
                { href: "/guida#rimborsi", label: t("footerRefund") },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="link-muted"
                  style={{ fontSize: 13, textDecoration: "none" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Trust badges */}
        <div
          style={{
            borderTop: "1px solid var(--fn-border, rgba(234,234,234,.08))",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: 11,
                color: "var(--muted)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ color: "#D4AF37" }}>⚡</span> {t("secureCheckout")}
            </span>
            <span
              style={{
                fontSize: 11,
                color: "var(--muted)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ color: "#D4AF37" }}>✓</span> {t("moneyBack")}
            </span>
            <span
              style={{
                fontSize: 11,
                color: "var(--muted)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ color: "#D4AF37" }}>↓</span>{" "}
              {lang === "it" ? "Download immediato" : "Immediate download"}
            </span>
          </div>
          <p
            style={{
              color: "var(--muted)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: ".18em",
            }}
          >
            {t("footerCopyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
