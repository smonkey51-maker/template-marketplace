"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { FormaLogoStatic } from "@/components/FormaLogo";

function FooterAccordion({ title, children, lang }: { title: string; children: React.ReactNode; lang: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="fn-footer-accordion-trigger"
        style={{
          fontSize: 10,
          textTransform: "uppercase" as const,
          letterSpacing: ".22em",
          color: "#D4AF37",
          marginBottom: open ? 16 : 0,
          fontWeight: 600,
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: 0,
          fontFamily: "inherit",
        }}
      >
        {title}
        <span className="fn-footer-accordion-icon" style={{ fontSize: 16, lineHeight: 1 }}>
          {open ? "−" : "+"}
        </span>
      </button>
      <nav
        className="fn-footer-accordion-content"
        style={{
          display: "flex",
          flexDirection: "column" as const,
          gap: 14,
          maxHeight: open ? 300 : 0,
          overflow: "hidden",
          transition: "max-height 0.3s ease, margin 0.3s ease",
        }}
      >
        {children}
      </nav>
    </div>
  );
}

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
            <FormaLogoStatic className="w-32 h-auto opacity-90 mb-3" />
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
                  border: "1px solid rgba(255,255,255,0.18)",
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
                  placeholder={lang === "it" ? "La tua email" : "Your email"}
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    background: "rgba(255,255,255,0.06)",
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
          <FooterAccordion title={t("footerCatalog")} lang={lang}>
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
          </FooterAccordion>

          {/* Support col */}
          <FooterAccordion title={t("footerSupport")} lang={lang}>
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
          </FooterAccordion>

          {/* Legal col */}
          <FooterAccordion title={t("footerLegal")} lang={lang}>
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
          </FooterAccordion>
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
