"use client";

import { useState, useRef, useCallback, Suspense, useEffect } from "react";
import { isHTMLOutput, useLocalStorageHistory } from "@/lib/studioUtils";
import { hasStudioAccess } from "@/lib/purchases";
import { useAuth } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { getTemplate } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";
import SiteNav from "@/components/SiteNav";
import { Tab, UIStyle, Tone, HistoryEntry } from "@/types/studio";
import GeneratePanel from "@/components/studio/GeneratePanel";
import CustomizePanel from "@/components/studio/CustomizePanel";
import OutputPreview from "@/components/studio/OutputPreview";
import HistoryPanel from "@/components/studio/HistoryPanel";
import AIUsageBanner from "@/components/studio/AIUsageBanner";

function StudioContent() {
  const searchParams = useSearchParams();
  const initialTemplateId = searchParams.get("templateId") ?? "";

  const [tab, setTab] = useState<Tab>(initialTemplateId ? "customize" : "generate");

  // Generate state
  const [genCategory, setGenCategory] = useState<"ui" | "prompt">("ui");
  const [genDescription, setGenDescription] = useState("");
  const [genStyle, setGenStyle] = useState<UIStyle>("modern");
  const [genSector, setGenSector] = useState("");
  const [genTone, setGenTone] = useState<Tone>("professional");
  const [genOutput, setGenOutput] = useState("");
  const [genLoading, setGenLoading] = useState(false);

  // History — persisted in localStorage
  const [genHistory, setGenHistory] = useState<HistoryEntry[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("tl_gen_history") ?? "[]");
    } catch {
      return [];
    }
  });
  const [customHistory, setCustomHistory] = useState<HistoryEntry[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("tl_custom_history") ?? "[]");
    } catch {
      return [];
    }
  });
  const [showHistory, setShowHistory] = useState(false);

  useLocalStorageHistory("tl_gen_history", genHistory, 50);
  useLocalStorageHistory("tl_custom_history", customHistory, 50);

  // Customize state
  const [selectedId, setSelectedId] = useState(initialTemplateId);
  const [customInstructions, setCustomInstructions] = useState("");
  const [customOutput, setCustomOutput] = useState("");
  const [customLoading, setCustomLoading] = useState(false);

  // Purchased templates
  const { isLoaded: authLoaded, userId } = useAuth();
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [purchasesLoaded, setPurchasesLoaded] = useState(false);
  const studioAccess = hasStudioAccess(purchasedIds);

  useEffect(() => {
    // Wait for Clerk to resolve auth before asking — and refetch whenever the
    // signed-in user changes (sign-in/out without a full page reload, e.g. via
    // the nav's UserButton), otherwise purchasedIds/studioAccess stay whatever
    // they were the first time this effect ran.
    if (!authLoaded) return;
    fetch("/api/purchases")
      // Guard on r.ok: a 500 returns an empty body, and calling .json() on it
      // throws an opaque "Unexpected end of JSON input" instead of the status.
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`/api/purchases ${r.status}`))))
      .then((data) => {
        setPurchasedIds(data.templateIds ?? []);
        setPurchasesLoaded(true);
      })
      .catch((e) => {
        console.error("[studio]", e);
        setPurchasesLoaded(true);
      });
  }, [authLoaded, userId]);

  const [copied, setCopied] = useState(false);
  const [outputView, setOutputView] = useState<"code" | "preview">("code");
  const [showTimeoutHint, setShowTimeoutHint] = useState(false);
  const [limitError, setLimitError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { lang } = useLang();
  const selectedTemplate = getTemplate(selectedId);

  const streamRequest = useCallback(
    async (
      url: string,
      body: Record<string, unknown>,
      setOutput: (v: string | ((prev: string) => string)) => void,
      setLoading: (v: boolean) => void,
      historyMeta: {
        label: string;
        category: "ui" | "prompt" | "guide" | "worksheet" | "tracker" | "script";
        tab: Tab;
        input?: string;
        templateId?: string;
      },
    ) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setOutput("");
      setLoading(true);
      setShowTimeoutHint(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShowTimeoutHint(true), 22_000);

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          const err = await res.text();
          if (res.status === 403) {
            setLimitError(err);
            return;
          }
          setOutput(`Error: ${err}`);
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
          setOutput((prev) => prev + chunk);
        }

        // Save to history
        if (result.trim()) {
          const baseEntry = {
            id: Math.random().toString(36).slice(2),
            output: result,
            label: historyMeta.label.slice(0, 60),
            category: historyMeta.category,
            tab: historyMeta.tab,
            timestamp: Date.now(),
            input: historyMeta.input,
            templateId: historyMeta.templateId,
          };
          if (historyMeta.tab === "generate") {
            setGenHistory((h) => [baseEntry, ...h].slice(0, 50));
          } else {
            setCustomHistory((h) => {
              // If re-customizing same template, carry over previous output as a version
              const prev = historyMeta.templateId
                ? h.find((e) => e.templateId === historyMeta.templateId)
                : null;
              const versions: HistoryEntry["versions"] = prev
                ? [...(prev.versions ?? []), { timestamp: prev.timestamp, output: prev.output }]
                : [];
              const entry: HistoryEntry = { ...baseEntry, versions };
              const filtered = historyMeta.templateId
                ? h.filter((e) => e.templateId !== historyMeta.templateId)
                : h;
              return [entry, ...filtered].slice(0, 50);
            });
          }
        }

        // Auto-switch to preview for UI output after streaming completes
        if (isHTMLOutput(result)) setOutputView("preview");
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setOutput(`Error: ${(err as Error).message}`);
        }
      } finally {
        setLoading(false);
        setShowTimeoutHint(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  const handleGenerate = () => {
    if (!genDescription.trim()) return;
    const sectorSuffix =
      genSector && genSector !== "Other / Custom" ? ` for a ${genSector} business` : "";
    const toneSuffix = genCategory === "ui" ? `, ${genTone} tone` : "";
    const enhancedDesc = `${genDescription}${sectorSuffix}${toneSuffix}`;
    streamRequest(
      "/api/generate",
      { category: genCategory, description: enhancedDesc, style: genStyle },
      setGenOutput,
      setGenLoading,
      { label: genDescription, category: genCategory, tab: "generate", input: genDescription },
    );
  };

  const handleCustomize = () => {
    if (!selectedTemplate || !customInstructions.trim()) return;
    streamRequest(
      "/api/customize",
      {
        templateContent: selectedTemplate.content,
        category: selectedTemplate.category,
        instructions: customInstructions,
      },
      setCustomOutput,
      setCustomLoading,
      {
        label: customInstructions,
        category: selectedTemplate.category,
        tab: "customize",
        input: customInstructions,
        templateId: selectedId,
      },
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeOutput = tab === "generate" ? genOutput : customOutput;
  const isLoading = tab === "generate" ? genLoading : customLoading;
  const activeCategory = tab === "generate" ? genCategory : (selectedTemplate?.category ?? "ui");
  const isUIOutput = activeCategory === "ui";

  const handleHistorySelect = (entry: HistoryEntry) => {
    if (tab === "generate") setGenOutput(entry.output);
    else setCustomOutput(entry.output);
    setShowHistory(false);
    setOutputView(isHTMLOutput(entry.output) ? "preview" : "code");
  };

  const activeHistory = tab === "generate" ? genHistory : customHistory;

  return (
    <div className="min-h-screen flex flex-col bg-page relative">
      <SiteNav />

      <AIUsageBanner />

      {limitError && (
        <div className="max-w-7xl mx-auto w-full px-6 pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-4 py-3 bg-terra/10 border border-terra/30 text-[13px] r-md">
            <span className="text-terra flex-1">{limitError}</span>
            <a
              href={`/${lang}/ai-studio`}
              className="shrink-0 px-3 py-1.5 bg-accent text-white text-[12px] font-semibold uppercase tracking-wide hover:bg-accent/90 transition-colors"
            >
              Upgrade to Studio
            </a>
          </div>
        </div>
      )}

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 relative z-10">
        <div className="mb-8">
          <h1 className="text-[28px] font-bold mb-1 tracking-tight">AI Template Studio</h1>
          <p className="text-[15px] text-muted">
            Generate new templates or customize existing ones with Claude.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Controls */}
          <div className="flex flex-col gap-6">
            {/* Tab switcher — iOS segmented control */}
            <div className="flex bg-card r-pill p-1 gap-1">
              {(["generate", "customize"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  disabled={t === "generate" && !studioAccess}
                  className={`flex-1 py-2 text-[15px] font-medium capitalize transition-all duration-200 ${
                    tab === t
                      ? "bg-surface text-theme shadow-sm"
                      : t === "generate" && !studioAccess
                        ? "text-muted cursor-not-allowed"
                        : "text-muted hover:text-theme"
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    {t === "generate" ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                          <path
                            d="M7 1v2M7 11v2M1 7h2M11 7h2M2.93 2.93l1.41 1.41M9.66 9.66l1.41 1.41M2.93 11.07l1.41-1.41M9.66 4.34l1.41-1.41"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                          />
                          <circle cx="7" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.4" />
                        </svg>
                        {lang === "it" ? "Genera" : "Generate"}
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                          <path
                            d="M9.5 2.5l2 2-7 7H2.5v-2l7-7z"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {lang === "it" ? "Personalizza" : "Customize"}
                      </>
                    )}
                    {t === "generate" && !studioAccess && (
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        aria-hidden
                        className="opacity-50"
                      >
                        <rect
                          x="2"
                          y="4.5"
                          width="7"
                          height="5"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="1.3"
                        />
                        <path
                          d="M3.5 4.5V3a2 2 0 014 0v1.5"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </span>
                </button>
              ))}
            </div>

            {tab === "generate" && (
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
            )}

            {tab === "customize" && (
              <CustomizePanel
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                customInstructions={customInstructions}
                setCustomInstructions={setCustomInstructions}
                customOutput={customOutput}
                customLoading={customLoading}
                purchasedIds={purchasedIds}
                purchasesLoaded={purchasesLoaded}
                hasStudioAccess={studioAccess}
                onCustomize={handleCustomize}
                lang={lang}
              />
            )}
          </div>

          {/* Right: Output */}
          <div className="flex flex-col">
            {/* History toggle button */}
            {activeHistory.length > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => setShowHistory((v) => !v)}
                  className={`flex items-center gap-1 px-2.5 py-1 text-[12px] font-medium border transition-all duration-200 ${
                    showHistory
                      ? "bg-accent/15 border-accent/40 text-accent"
                      : "border-theme text-muted hover:border-accent/50"
                  }`}
                >
                  History ({activeHistory.length})
                </button>
              </div>
            )}

            <OutputPreview
              output={activeOutput}
              outputView={outputView}
              setOutputView={setOutputView}
              copied={copied}
              onCopy={() => copyToClipboard(activeOutput)}
              showTimeoutHint={showTimeoutHint}
              isLoading={isLoading}
              isUIOutput={isUIOutput}
              tab={tab}
              selectedTemplateId={selectedTemplate?.id}
              selectedTemplateDownloadType={selectedTemplate?.downloadType}
              selectedTemplateDownloadUrl={selectedTemplate?.downloadUrl}
              activeCategory={activeCategory}
              lang={lang}
            />

            {showHistory && (
              <HistoryPanel
                genHistory={genHistory}
                customHistory={customHistory}
                activeTab={tab}
                onSelectEntry={handleHistorySelect}
                onRestoreVersion={(output) => {
                  if (tab === "generate") setGenOutput(output);
                  else setCustomOutput(output);
                  setShowHistory(false);
                  if (isHTMLOutput(output)) {
                    setOutputView("preview");
                  } else {
                    setOutputView("code");
                  }
                }}
                onClose={() => setShowHistory(false)}
                lang={lang}
              />
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default function StudioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-muted">Loading...</div>
      }
    >
      <StudioContent />
    </Suspense>
  );
}
