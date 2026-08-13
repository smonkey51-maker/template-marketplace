"use client";

import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import { ArtHeader, PAINTINGS } from "@/components/ArtHeader";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { FormaFooter } from "@/components/FormaFooter";

export default function AIStudioPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];

  const steps = [
    { icon: t("aiStep1Icon"), title: t("aiStep1Title"), desc: t("aiStep1Desc") },
    { icon: t("aiStep2Icon"), title: t("aiStep2Title"), desc: t("aiStep2Desc") },
    { icon: t("aiStep3Icon"), title: t("aiStep3Title"), desc: t("aiStep3Desc") },
  ];

  const examples = [
    { prompt: t("aiEx1Prompt"), output: t("aiEx1Output") },
    { prompt: t("aiEx2Prompt"), output: t("aiEx2Output") },
    { prompt: t("aiEx3Prompt"), output: t("aiEx3Output") },
  ];

  return (
    <div className="fn-bg">
      <div className="fn-shell">
        <SiteNav />
        <main className="fn-simple">
          <ArtHeader
            painting={PAINTINGS.studio}
            kicker={t("aiStudioKicker")}
            title={t("aiStudioTitle")}
            subtitle={t("aiStudioSub")}
          />

          {/* How it works */}
          <div className="fn-kicker" style={{ marginTop: 48, marginBottom: 16 }}>
            {t("aiStudioHowKicker")}
          </div>
          <div
            style={{
              display: "grid",
              // Not `repeat(3,1fr)`: three fixed tracks on a 390px phone left
              // each card ~120px wide and pushed the third one 48px past the
              // viewport, where `.fn-bg`'s overflow-x:hidden clipped it — so
              // the third step's heading and half its text were cut off with
              // no way to scroll to them. auto-fit collapses to one column
              // when the tracks no longer fit, which is what a phone needs.
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: 12,
            }}
          >
            {steps.map((step) => (
              <div key={step.icon} className="glass-surface" style={{ padding: "28px 24px" }}>
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: 40,
                    fontWeight: 300,
                    color: "var(--accent)",
                    lineHeight: 1,
                    marginBottom: 14,
                  }}
                >
                  {step.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontWeight: 400,
                    fontSize: 22,
                    margin: "0 0 8px",
                    color: "var(--text)",
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.65, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Examples */}
          <div style={{ marginTop: 56 }}>
            <div className="fn-kicker" style={{ marginBottom: 10 }}>
              {t("aiExamplesKicker")}
            </div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(26px,4vw,42px)",
                margin: "0 0 22px",
                color: "var(--text)",
              }}
            >
              {t("aiExamplesTitle")}
            </h2>
            <div
              style={{
                display: "grid",
                gap: 12,
              }}
            >
              {examples.map((ex) => (
                <div
                  key={ex.prompt}
                  className="glass-surface"
                  style={{
                    padding: "20px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 24,
                    flexWrap: "wrap",
                  }}
                >
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: 14,
                      lineHeight: 1.55,
                      margin: 0,
                      fontStyle: "italic",
                      flex: 1,
                    }}
                  >
                    &ldquo;{ex.prompt}&rdquo;
                  </p>
                  <span
                    style={{
                      color: "var(--accent)",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: ".14em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {ex.output}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 52, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="fn-btn primary" href={`/${lang}/studio`}>
              {t("aiStudioCta")}
            </Link>
            <Link className="fn-btn" href={`/${lang}/catalogo`}>
              {t("browseAll")}
            </Link>
          </div>
        </main>
        <FormaFooter />
      </div>
    </div>
  );
}
