"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import SiteNav from "@/components/SiteNav";
import { ArtHeader, PAINTINGS } from "@/components/ArtHeader";
import { useLang } from "@/components/LanguageProvider";
import { copy } from "@/lib/formaCopy";
import { FormaFooter } from "@/components/FormaFooter";
import { hasStudioAccess } from "@/lib/purchases";
import { isHTMLOutput } from "@/lib/studioUtils";
import { UIStyle, Tone } from "@/types/studio";
import GeneratePanel from "@/components/studio/GeneratePanel";
import OutputPreview from "@/components/studio/OutputPreview";
import AIUsageBanner from "@/components/studio/AIUsageBanner";

/**
 * The AI Studio landing page — and, since the redesign, the actual generator.
 *
 * This used to be a marketing page ("how it works" + examples) that pointed
 * visitors on to `/studio` for the real tool. It now hosts the real prompt →
 * generate → preview flow itself (same `/api/generate` streaming endpoint,
 * same `GeneratePanel`/`OutputPreview` components `/studio`'s Generate tab
 * uses), so a visitor who lands here can actually generate a template
 * without an extra hop. `/studio` remains the fuller tool (Generate +
 * Customize tabs, history) for anyone who wants it — this page links there
 * for that, same as before.
 */
export default function AIStudioPage() {
  const { lang } = useLang();
  const t = (k: keyof typeof copy.it) => copy[lang][k];

  // ── Real generation state — same shape as /studio's Generate tab ──
  const [genCategory, setGenCategory] = useState<"ui" | "prompt">("ui");
  const [genDescription, setGenDescription] = useState("");
  const [genStyle, setGenStyle] = useState<UIStyle>("modern");
  const [genSector, setGenSector] = useState("");
  const [genTone, setGenTone] = useState<Tone>("professional");
  const [genOutput, setGenOutput] = useState("");
  const [genLoading, setGenLoading] = useState(false);
  const [outputView, setOutputView] = useState<"code" | "preview">("code");
  const [copied, setCopied] = useState(false);
  const [showTimeoutHint, setShowTimeoutHint] = useState(false);
  const [limitError, setLimitError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { isLoaded: authLoaded, userId } = useAuth();
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const studioAccess = hasStudioAccess(purchasedIds);

  useEffect(() => {
    if (!authLoaded) return;
    fetch("/api/purchases")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`/api/purchases ${r.status}`))))
      .then((data) => setPurchasedIds(data.templateIds ?? []))
      .catch((e) => console.error("[ai-studio]", e));
  }, [authLoaded, userId]);

  const handleGenerate = useCallback(async () => {
    if (!genDescription.trim()) return;
    const sectorSuffix =
      genSector && genSector !== "Other / Custom" ? ` for a ${genSector} business` : "";
    const toneSuffix = genCategory === "ui" ? `, ${genTone} tone` : "";
    const enhancedDesc = `${genDescription}${sectorSuffix}${toneSuffix}`;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setGenOutput("");
    setGenLoading(true);
    setShowTimeoutHint(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowTimeoutHint(true), 22_000);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: genCategory, description: enhancedDesc, style: genStyle }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const err = await res.text();
        if (res.status === 403) {
          setLimitError(err);
          return;
        }
        setGenOutput(`Error: ${err}`);
        return;
      }
      setLimitError(null);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        setGenOutput((prev) => prev + chunk);
      }
      if (isHTMLOutput(result)) setOutputView("preview");
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setGenOutput(`Error: ${(err as Error).message}`);
      }
    } finally {
      setGenLoading(false);
      setShowTimeoutHint(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, [genDescription, genSector, genCategory, genTone, genStyle]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(genOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

          <AIUsageBanner />

          {limitError && (
            <div className="m3-surface flex flex-col sm:flex-row items-start sm:items-center gap-3 px-4 py-3 mt-4 text-[13px]">
              <span className="text-terra flex-1">{limitError}</span>
              <Link href={`/${lang}/studio`} className="btn-brand-sm shrink-0">
                {lang === "it" ? "Passa a Studio Access" : "Upgrade to Studio Access"}
              </Link>
            </div>
          )}

          {/* ── Prompt + options + live preview — the real generator ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <GeneratePanel
              genCategory={genCategory}
              setGenCategory={setGenCategory}
              genDescription={genDescription}
              setGenDescription={setGenDescription}
              genStyle={genStyle}
              setGenStyle={setGenStyle}
              genSector={genSector}
              setGenSector={setGenSector}
              genTone={genTone}
              setGenTone={setGenTone}
              genOutput={genOutput}
              genLoading={genLoading}
              hasStudioAccess={studioAccess}
              onGenerate={handleGenerate}
              lang={lang}
            />
            <OutputPreview
              output={genOutput}
              outputView={outputView}
              setOutputView={setOutputView}
              copied={copied}
              onCopy={copyToClipboard}
              showTimeoutHint={showTimeoutHint}
              isLoading={genLoading}
              isUIOutput={genCategory === "ui"}
              tab="generate"
              activeCategory={genCategory}
              lang={lang}
            />
          </div>

          {/* How it works */}
          <div className="fn-kicker" style={{ marginTop: 56, marginBottom: 16 }}>
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
              <div key={step.icon} className="m3-surface" style={{ padding: "28px 24px" }}>
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
                <button
                  key={ex.prompt}
                  type="button"
                  onClick={() => setGenDescription(ex.prompt)}
                  className="m3-surface m3-interactive text-left"
                  style={{
                    padding: "20px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 24,
                    flexWrap: "wrap",
                    width: "100%",
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
                </button>
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
