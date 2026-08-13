"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import { ArtHeader, PAINTINGS } from "@/components/ArtHeader";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { FormaFooter } from "@/components/FormaFooter";

export default function GuidaPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];
  // Only one FAQ open at a time, matching the Figma prototype's accordion —
  // this used to be a static list of always-expanded Q&A cards.
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
          <ArtHeader
            painting={PAINTINGS.guida}
            kicker={t("guideKicker")}
            title={t("guideTitle")}
            subtitle={t("guideSub")}
          />

          {/* Steps */}
          <div
            style={{
              marginTop: 52,
              display: "grid",
              gap: 12,
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
                }}
                className="glass-surface"
              >
                <div
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontSize: 44,
                    fontWeight: 300,
                    color: "var(--accent)",
                    lineHeight: 1,
                  }}
                >
                  {step.n}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-fraunces), Georgia, serif",
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
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(28px,4vw,44px)",
                margin: "0 0 24px",
                color: "var(--text)",
              }}
            >
              {t("guideFaqTitle")}
            </h2>
            <ul className="border-t border-theme">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <li key={faq.q} className="border-b border-theme">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-fraunces), Georgia, serif",
                          fontWeight: 500,
                          color: "var(--text)",
                        }}
                        className="text-[1.1rem]"
                      >
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <Minus
                          size={18}
                          strokeWidth={1.8}
                          className="shrink-0"
                          style={{ color: "var(--accent)" }}
                        />
                      ) : (
                        <Plus
                          size={18}
                          strokeWidth={1.8}
                          className="shrink-0"
                          style={{ color: "var(--muted)" }}
                        />
                      )}
                    </button>
                    <div
                      className="grid transition-all duration-300 ease-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                    >
                      <div className="overflow-hidden">
                        <p
                          className="max-w-xl pb-6 text-[14px] leading-relaxed"
                          style={{ color: "var(--muted)" }}
                        >
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div style={{ marginTop: 48, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="fn-btn primary" href={`/${lang}/catalogo`}>
              {t("guideCta1")}
            </Link>
            <Link className="fn-btn" href={`/${lang}/ai-studio`}>
              {t("guideCta2")}
            </Link>
          </div>
        </main>
        <FormaFooter />
      </div>
    </div>
  );
}
