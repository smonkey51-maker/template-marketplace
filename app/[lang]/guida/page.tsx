"use client";

import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { FormaFooter } from "@/components/FormaFooter";

export default function GuidaPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];

  const steps = [
    { n: "01", title: t("guideStep1Title"), body: t("guideStep1Body") },
    { n: "02", title: t("guideStep2Title"), body: t("guideStep2Body") },
    { n: "03", title: t("guideStep3Title"), body: t("guideStep3Body") },
    { n: "04", title: t("guideStep4Title"), body: t("guideStep4Body") },
  ];

  const faqs = [
    { q: t("guideFaq1Q"), a: t("guideFaq1A") },
    { q: t("guideFaq2Q"), a: t("guideFaq2A") },
    { q: t("guideFaq3Q"), a: t("guideFaq3A") },
    { q: t("guideFaq4Q"), a: t("guideFaq4A") },
    { q: t("guideFaq5Q"), a: t("guideFaq5A") },
  ];

  return (
    <div className="fn-bg">
      <div className="fn-shell">
        <SiteNav />
        <main className="fn-simple">
          <div className="fn-kicker" style={{ marginBottom: 12 }}>
            {t("guideKicker")}
          </div>
          <h1>{t("guideTitle")}</h1>
          <p>{t("guideSub")}</p>

          {/* Steps */}
          <div
            style={{
              marginTop: 52,
              display: "grid",
              gap: 1,
              background: "var(--fn-border, rgba(234,234,234,.10))",
            }}
          >
            {steps.map((step) => (
              <div
                key={step.n}
                style={{
                  display: "grid",
                  gridTemplateColumns: "72px 1fr",
                  gap: 28,
                  padding: "30px 26px",
                  background: "var(--surface)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: 44,
                    fontWeight: 300,
                    color: "#D4AF37",
                    lineHeight: 1,
                  }}
                >
                  {step.n}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontWeight: 400,
                      fontSize: 22,
                      margin: "4px 0 8px",
                      color: "var(--text)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.65, margin: 0 }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div style={{ marginTop: 60 }}>
            <div className="fn-kicker" style={{ marginBottom: 10 }}>
              {t("guideFaqKicker")}
            </div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(28px,4vw,44px)",
                margin: "0 0 24px",
                color: "var(--text)",
              }}
            >
              {t("guideFaqTitle")}
            </h2>
            <div
              style={{
                display: "grid",
                gap: 1,
                background: "var(--fn-border, rgba(234,234,234,.10))",
              }}
            >
              {faqs.map((faq) => (
                <div key={faq.q} style={{ padding: "22px 26px", background: "var(--surface)" }}>
                  <h4
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontWeight: 400,
                      fontSize: 19,
                      margin: "0 0 7px",
                      color: "var(--text)",
                    }}
                  >
                    {faq.q}
                  </h4>
                  <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.65, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 48, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="fn-btn primary" href="/catalogo">
              {t("guideCta1")}
            </Link>
            <Link className="fn-btn" href="/ai-studio">
              {t("guideCta2")}
            </Link>
          </div>
        </main>
        <FormaFooter />
      </div>
    </div>
  );
}
