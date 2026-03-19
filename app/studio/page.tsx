"use client";

import { useState, useRef, useCallback, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
// UserButton handles its own visibility — shows nothing when signed out
import { templates, getTemplate, formatPrice } from "@/lib/templates";

type Tab = "generate" | "customize";
type UIStyle = "modern" | "minimal" | "bold" | "glassmorphism" | "retro";
type Tone = "professional" | "minimal" | "playful" | "bold";

type HistoryEntry = {
  id: string;
  output: string;
  label: string;
  category: "ui" | "prompt";
  tab: Tab;
  timestamp: number;
};

const SECTORS = [
  "SaaS / Tech", "E-commerce", "Portfolio / Freelance", "Restaurant / Food",
  "Health & Wellness", "Finance / Fintech", "Agency / Creative",
  "Real Estate", "Education", "Other / Custom",
];

function relativeTime(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

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

  // History
  const [genHistory, setGenHistory] = useState<HistoryEntry[]>([]);
  const [customHistory, setCustomHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Customize state
  const [selectedId, setSelectedId] = useState(initialTemplateId);
  const [customInstructions, setCustomInstructions] = useState("");
  const [customOutput, setCustomOutput] = useState("");
  const [customLoading, setCustomLoading] = useState(false);

  // Purchased templates
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const hasStudioAccess = purchasedIds.includes("studio-access");

  useEffect(() => {
    fetch("/api/purchases")
      .then((r) => r.json())
      .then((data) => setPurchasedIds(data.templateIds ?? []))
      .catch(() => {});
  }, []);

  const [copied, setCopied] = useState(false);
  const [outputView, setOutputView] = useState<"code" | "preview">("code");
  const [showTimeoutHint, setShowTimeoutHint] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedTemplate = getTemplate(selectedId);

  const streamRequest = useCallback(
    async (
      url: string,
      body: Record<string, unknown>,
      setOutput: (v: string | ((prev: string) => string)) => void,
      setLoading: (v: boolean) => void,
      historyMeta: { label: string; category: "ui" | "prompt"; tab: Tab }
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
          setOutput(`Error: ${err}`);
          return;
        }

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
          const entry: HistoryEntry = {
            id: Math.random().toString(36).slice(2),
            output: result,
            label: historyMeta.label.slice(0, 60),
            category: historyMeta.category,
            tab: historyMeta.tab,
            timestamp: Date.now(),
          };
          if (historyMeta.tab === "generate") {
            setGenHistory((h) => [entry, ...h].slice(0, 10));
          } else {
            setCustomHistory((h) => [entry, ...h].slice(0, 10));
          }
        }

        // Auto-switch to preview for UI output after streaming completes
        if (result.trim().startsWith("<") || result.includes("<div") || result.includes("<section")) {
          setOutputView("preview");
        }
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
    []
  );

  const handleGenerate = () => {
    if (!genDescription.trim()) return;
    const sectorSuffix = genSector && genSector !== "Other / Custom" ? ` for a ${genSector} business` : "";
    const toneSuffix = genCategory === "ui" ? `, ${genTone} tone` : "";
    const enhancedDesc = `${genDescription}${sectorSuffix}${toneSuffix}`;
    streamRequest(
      "/api/generate",
      { category: genCategory, description: enhancedDesc, style: genStyle },
      setGenOutput,
      setGenLoading,
      { label: genDescription, category: genCategory, tab: "generate" }
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
      { label: customInstructions, category: selectedTemplate.category, tab: "customize" }
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeOutput = tab === "generate" ? genOutput : customOutput;
  const isLoading = tab === "generate" ? genLoading : customLoading;
  const activeCategory =
    tab === "generate" ? genCategory : selectedTemplate?.category ?? "ui";
  const isUIOutput = activeCategory === "ui";

  return (
    <div className="min-h-screen flex flex-col bg-page relative">

      {/* Nav — iOS liquid glass */}
      <nav className="border-b border-theme backdrop-blur-2xl bg-nav px-4 sm:px-6 py-3.5 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Back */}
          <Link href="/" className="flex items-center gap-1 text-[#0A84FF] text-[15px] font-medium hover:opacity-70 transition-opacity ios-spring shrink-0">
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" className="shrink-0">
              <path d="M8 1L1.5 7.5L8 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="hidden sm:inline">Marketplace</span>
          </Link>

          <span className="text-[13px] text-muted font-semibold uppercase tracking-widest">AI Studio</span>

          <UserButton />
        </div>
      </nav>

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
            <div className="flex bg-card rounded-[12px] p-1 gap-1">
              {(["generate", "customize"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  disabled={t === "generate" && !hasStudioAccess}
                  className={`flex-1 py-2 rounded-[10px] text-[15px] font-medium capitalize transition-all duration-200 ${
                    tab === t
                      ? "bg-surface text-theme shadow-sm"
                      : t === "generate" && !hasStudioAccess
                      ? "text-[#48484A] cursor-not-allowed"
                      : "text-muted hover:text-theme"
                  }`}
                >
                  {t === "generate" ? "✨ Generate New" : "🎨 Customize"}
                  {t === "generate" && !hasStudioAccess && (
                    <span className="ml-1 text-xs">🔒</span>
                  )}
                </button>
              ))}
            </div>

            {/* Generate locked */}
            {tab === "generate" && !hasStudioAccess && (
              <div className="bg-surface border border-theme rounded-[28px] p-8 text-center flex flex-col items-center gap-4">
                <div className="text-5xl">🔒</div>
                <h3 className="font-semibold text-theme text-[17px]">Studio Access richiesto</h3>
                <p className="text-[15px] text-muted">
                  Acquista Studio Access per generare template illimitati con l&apos;AI.
                </p>
                <button
                  onClick={async () => {
                    const res = await fetch("/api/checkout", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ templateId: "studio-access" }),
                    });
                    const data = await res.json();
                    if (data.requireAuth) { window.location.href = "/sign-in?redirect_url=/studio"; return; }
                    if (data.url) window.location.href = data.url;
                  }}
                  className="px-6 py-3 bg-[#0A84FF] hover:bg-[#409CFF] rounded-2xl font-bold text-[15px] text-white transition-all duration-200 shadow-[0_4px_20px_rgba(10,132,255,0.25)] active:scale-[0.97] ios-spring"
                >
                  €9.99/mese — Abbonati →
                </button>
                {process.env.NEXT_PUBLIC_STUDIO_LIFETIME_AVAILABLE === "true" && (
                  <>
                    <span className="text-[12px] text-muted">— oppure —</span>
                    <button
                      onClick={async () => {
                        const res = await fetch("/api/checkout", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ templateId: "studio-access-lifetime" }),
                        });
                        const data = await res.json();
                        if (data.requireAuth) { window.location.href = "/sign-in?redirect_url=/studio"; return; }
                        if (data.url) window.location.href = data.url;
                      }}
                      className="px-6 py-2.5 glass-subtle border border-theme rounded-2xl font-semibold text-[14px] text-theme transition-all duration-200 active:scale-[0.97] ios-spring"
                    >
                      ✦ Lifetime — €49 una volta sola
                    </button>
                  </>
                )}
              </div>
            )}

            {tab === "generate" && hasStudioAccess && (
              <div className="flex flex-col gap-4">
                {/* Category */}
                <div>
                  <label className="text-[11px] font-semibold text-muted uppercase tracking-widest mb-2 block px-1">
                    Template type
                  </label>
                  <div className="flex gap-3">
                    {(["ui", "prompt"] as const).map((c) => (
                      <button
                        key={c}
                        onClick={() => setGenCategory(c)}
                        className={`flex-1 py-2.5 rounded-2xl text-[15px] font-medium border transition-all duration-200 active:scale-[0.97] ios-spring ${
                          genCategory === c
                            ? "bg-[#007AFF]/15 border-[#007AFF]/40 text-[#007AFF]"
                            : "border-theme text-muted hover:border-[#0A84FF]/50"
                        }`}
                      >
                        {c === "ui" ? "🖼 UI Component" : "📝 Prompt Template"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style (UI only) */}
                {genCategory === "ui" && (
                  <div>
                    <label className="text-[11px] font-semibold text-muted uppercase tracking-widest mb-2 block px-1">
                      Visual style
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(
                        [
                          "modern",
                          "minimal",
                          "bold",
                          "glassmorphism",
                          "retro",
                        ] as UIStyle[]
                      ).map((s) => (
                        <button
                          key={s}
                          onClick={() => setGenStyle(s)}
                          className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium capitalize border transition-all duration-200 active:scale-[0.97] ios-spring ${
                            genStyle === s
                              ? "bg-[#007AFF]/15 border-[#007AFF]/40 text-[#007AFF]"
                              : "border-theme text-muted hover:border-[#0A84FF]/50"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sector */}
                <div>
                  <label className="text-[11px] font-semibold text-muted uppercase tracking-widest mb-2 block px-1">
                    Industry / Sector <span className="normal-case text-[#48484A] font-normal">(optional)</span>
                  </label>
                  <select
                    value={genSector}
                    onChange={(e) => setGenSector(e.target.value)}
                    className="w-full bg-input border border-theme rounded-2xl px-4 py-2.5 text-[15px] text-theme focus:outline-none focus:border-[#007AFF]/50 focus:ring-1 focus:ring-[#007AFF]/30 transition-all duration-200"
                  >
                    <option value="">— Any sector —</option>
                    {SECTORS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Tone (UI only) */}
                {genCategory === "ui" && (
                  <div>
                    <label className="text-[11px] font-semibold text-muted uppercase tracking-widest mb-2 block px-1">
                      Tone
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["professional", "minimal", "playful", "bold"] as Tone[]).map((t) => (
                        <button
                          key={t}
                          onClick={() => setGenTone(t)}
                          className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium capitalize border transition-all duration-200 active:scale-[0.97] ios-spring ${
                            genTone === t
                              ? "bg-[#30D158]/15 border-[#30D158]/40 text-[#30D158]"
                              : "border-theme text-muted hover:border-[#30D158]/50"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <label className="text-[11px] font-semibold text-muted uppercase tracking-widest mb-2 block px-1">
                    Describe what you want
                  </label>
                  <textarea
                    value={genDescription}
                    onChange={(e) => setGenDescription(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.metaKey) handleGenerate();
                    }}
                    rows={4}
                    placeholder={
                      genCategory === "ui"
                        ? "e.g. A testimonial section with 3 cards, star ratings, and customer photos"
                        : "e.g. A LinkedIn connection request message for B2B SaaS outreach"
                    }
                    className="w-full bg-input border border-theme rounded-2xl px-4 py-3 text-[15px] text-theme placeholder-muted focus:outline-none focus:border-[#007AFF]/50 focus:ring-1 focus:ring-[#007AFF]/30 resize-none transition-all duration-200"
                  />
                  <p className="text-[11px] text-[#48484A] mt-1 px-1">⌘+Enter to generate</p>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={genLoading || !genDescription.trim()}
                  className="py-3.5 rounded-2xl bg-[#0A84FF] hover:bg-[#409CFF] disabled:opacity-40 disabled:cursor-not-allowed font-bold text-[15px] text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(10,132,255,0.25)] active:scale-[0.97] ios-spring"
                >
                  {genLoading ? (
                    <>
                      <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⟳</span> Generating...
                    </>
                  ) : (
                    "✨ Generate Template"
                  )}
                </button>
              </div>
            )}

            {/* Customize Panel */}
            {tab === "customize" && (
              <div className="flex flex-col gap-4">
                {/* Template picker */}
                <div>
                  <label className="text-[11px] font-semibold text-muted uppercase tracking-widest mb-2 block px-1">
                    Select a template to customize
                  </label>
                  {purchasedIds.length === 0 ? (
                    <div className="bg-surface border border-theme rounded-2xl px-4 py-6 text-center text-[15px] text-muted">
                      Non hai ancora acquistato nessun template.{" "}
                      <Link href="/" className="text-[#007AFF] hover:underline">
                        Vai al marketplace →
                      </Link>
                    </div>
                  ) : (
                    <select
                      value={selectedId}
                      onChange={(e) => setSelectedId(e.target.value)}
                      className="w-full bg-input border border-theme rounded-2xl px-4 py-3 text-[15px] text-theme focus:outline-none focus:border-[#007AFF]/50 focus:ring-1 focus:ring-[#007AFF]/30 transition-all duration-200"
                    >
                      <option value="">— Choose a template —</option>
                      {["ui", "prompt"].map((cat) => {
                        const group = templates.filter(
                          (t) => t.category === cat && purchasedIds.includes(t.id)
                        );
                        if (group.length === 0) return null;
                        return (
                          <optgroup
                            key={cat}
                            label={cat === "ui" ? "UI Templates" : "Prompt Templates"}
                          >
                            {group.map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.name} ({formatPrice(t.price)})
                              </option>
                            ))}
                          </optgroup>
                        );
                      })}
                    </select>
                  )}
                </div>

                {/* Template preview */}
                {selectedTemplate && (
                  <div className="bg-surface border border-theme rounded-2xl overflow-hidden">
                    <p className="text-[11px] font-semibold text-muted px-4 pt-3 pb-2 uppercase tracking-widest">
                      Template preview
                    </p>
                    {selectedTemplate.category === "ui" ? (
                      <div className="h-40 overflow-hidden relative">
                        <div className="absolute inset-0 pointer-events-none" style={{ transform: "scale(0.38)", transformOrigin: "top left", width: "263%", height: "263%" }}>
                          <iframe
                            src={`/api/preview/${selectedTemplate.id}`}
                            title={selectedTemplate.name}
                            className="w-full border-0"
                            style={{ height: "420px" }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="px-4 pb-3">
                        <pre className="text-[11px] text-muted font-mono overflow-hidden line-clamp-4 leading-relaxed">
                          {selectedTemplate.content.slice(0, 200)}...
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                {/* Instructions */}
                <div>
                  <label className="text-[11px] font-semibold text-muted uppercase tracking-widest mb-2 block px-1">
                    Customization instructions
                  </label>
                  <textarea
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.metaKey) handleCustomize();
                    }}
                    rows={4}
                    placeholder={
                      selectedTemplate?.category === "ui"
                        ? "e.g. Change the color scheme to dark green, add an animation on the headline, make the CTA button larger"
                        : "e.g. Make it more casual and friendly, add a variable for company size, shorten to under 100 words"
                    }
                    className="w-full bg-input border border-theme rounded-2xl px-4 py-3 text-[15px] text-theme placeholder-muted focus:outline-none focus:border-[#007AFF]/50 focus:ring-1 focus:ring-[#007AFF]/30 resize-none transition-all duration-200"
                  />
                  <p className="text-[11px] text-[#48484A] mt-1 px-1">⌘+Enter to customize</p>
                </div>

                <button
                  onClick={handleCustomize}
                  disabled={
                    customLoading ||
                    !selectedTemplate ||
                    !customInstructions.trim()
                  }
                  className="py-3.5 rounded-2xl bg-[#0A84FF] hover:bg-[#409CFF] disabled:opacity-40 disabled:cursor-not-allowed font-bold text-[15px] text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(10,132,255,0.25)] active:scale-[0.97] ios-spring"
                >
                  {customLoading ? (
                    <>
                      <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⟳</span> Customizing...
                    </>
                  ) : (
                    "🎨 Customize Template"
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right: Output */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-[13px] font-semibold text-muted uppercase tracking-widest">Output</h2>
                {/* History toggle */}
                {(tab === "generate" ? genHistory : customHistory).length > 0 && (
                  <button
                    onClick={() => setShowHistory((v) => !v)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[12px] font-medium border transition-all duration-200 ${
                      showHistory
                        ? "bg-[#007AFF]/15 border-[#007AFF]/40 text-[#007AFF]"
                        : "border-theme text-muted hover:border-[#0A84FF]/50"
                    }`}
                  >
                    🕐 History ({(tab === "generate" ? genHistory : customHistory).length})
                  </button>
                )}
                {activeOutput && isUIOutput && (
                  <div className="flex bg-card rounded-[12px] p-0.5 gap-0.5">
                    <button
                      onClick={() => setOutputView("code")}
                      className={`px-3 py-1 rounded-[10px] text-[13px] font-medium transition-all duration-200 ${
                        outputView === "code"
                          ? "bg-surface text-theme shadow-sm"
                          : "text-muted hover:text-theme"
                      }`}
                    >
                      &lt;/&gt; Code
                    </button>
                    <button
                      onClick={() => setOutputView("preview")}
                      className={`px-3 py-1 rounded-[10px] text-[13px] font-medium transition-all duration-200 ${
                        outputView === "preview"
                          ? "bg-surface text-theme shadow-sm"
                          : "text-muted hover:text-theme"
                      }`}
                    >
                      👁 Preview
                    </button>
                  </div>
                )}
              </div>
              {activeOutput && (
                <button
                  onClick={() => copyToClipboard(activeOutput)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2C2C2E] hover:bg-[#3A3A3C] rounded-xl text-[13px] font-medium transition-all duration-200 active:scale-[0.97] ios-spring"
                >
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              )}
            </div>

            <div className="flex-1 relative bg-surface border border-theme rounded-[28px] overflow-hidden min-h-[500px]">
              {!activeOutput && !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center text-[#48484A] text-[15px]">
                  <div className="text-center">
                    <div className="text-4xl mb-3">
                      {tab === "generate" ? "✨" : "🎨"}
                    </div>
                    <p>
                      {tab === "generate"
                        ? "Describe a template to generate"
                        : "Select a template and add instructions"}
                    </p>
                  </div>
                </div>
              )}

              {isLoading && !activeOutput && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4 text-muted px-6 text-center">
                    <span style={{ display: "inline-block", animation: "spin 1s linear infinite", fontSize: "1.5rem", color: "#0A84FF" }}>⟳</span>
                    <span className="text-[15px]">
                      Claude is thinking
                      <span className="animate-pulse">...</span>
                    </span>
                    {showTimeoutHint && (
                      <p className="text-[12px] text-[#48484A] max-w-[260px] leading-relaxed">
                        Ci sta pensando su 🧠 — i template UI con extended thinking possono richiedere fino a 60 secondi.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {activeOutput && (outputView === "code" || !isUIOutput) && (
                <pre className="p-5 text-[12px] font-mono text-muted overflow-auto h-full leading-relaxed whitespace-pre-wrap">
                  {activeOutput}
                  {isLoading && (
                    <span className="inline-block w-2 h-4 bg-[#0A84FF] animate-pulse ml-0.5 align-middle" />
                  )}
                </pre>
              )}

              {activeOutput && isUIOutput && outputView === "preview" && (
                <iframe
                  srcDoc={`<!DOCTYPE html><html><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><script src="https://cdn.tailwindcss.com"><\/script><style>body{margin:0}</style></head><body>${activeOutput}</body></html>`}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin"
                  title="Template Preview"
                />
              )}
            </div>

            {activeOutput && (
              <p className="text-[11px] text-[#48484A] mt-2 text-right">
                {activeOutput.length.toLocaleString()} characters
              </p>
            )}

            {/* History panel */}
            {showHistory && (
              <div className="mt-4 bg-surface border border-theme rounded-[20px] overflow-hidden">
                <p className="text-[11px] font-semibold text-muted uppercase tracking-widest px-4 pt-3 pb-2">
                  Recent generations
                </p>
                <ul className="divide-y divide-theme max-h-64 overflow-y-auto">
                  {(tab === "generate" ? genHistory : customHistory).map((entry) => (
                    <li key={entry.id}>
                      <button
                        onClick={() => {
                          if (tab === "generate") setGenOutput(entry.output);
                          else setCustomOutput(entry.output);
                          setShowHistory(false);
                          if (entry.output.trim().startsWith("<") || entry.output.includes("<div") || entry.output.includes("<section")) {
                            setOutputView("preview");
                          } else {
                            setOutputView("code");
                          }
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-card transition-colors duration-150 flex items-center justify-between gap-3 group"
                      >
                        <span className="text-[13px] text-theme truncate flex-1 group-hover:text-[#007AFF] transition-colors">
                          {entry.label || "Untitled"}
                        </span>
                        <span className="text-[11px] text-[#48484A] shrink-0 flex items-center gap-2">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                            entry.category === "ui"
                              ? "bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                              : "bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400"
                          }`}>
                            {entry.category.toUpperCase()}
                          </span>
                          {relativeTime(entry.timestamp)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function StudioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted">Loading...</div>}>
      <StudioContent />
    </Suspense>
  );
}
