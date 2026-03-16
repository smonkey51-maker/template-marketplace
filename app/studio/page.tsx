"use client";

import { useState, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
// UserButton handles its own visibility — shows nothing when signed out
import { templates, getTemplate, formatPrice } from "@/lib/templates";

type Tab = "generate" | "customize";
type UIStyle = "modern" | "minimal" | "bold" | "glassmorphism" | "retro";

function StudioContent() {
  const searchParams = useSearchParams();
  const initialTemplateId = searchParams.get("templateId") ?? "";

  const [tab, setTab] = useState<Tab>(initialTemplateId ? "customize" : "generate");

  // Generate state
  const [genCategory, setGenCategory] = useState<"ui" | "prompt">("ui");
  const [genDescription, setGenDescription] = useState("");
  const [genStyle, setGenStyle] = useState<UIStyle>("modern");
  const [genOutput, setGenOutput] = useState("");
  const [genLoading, setGenLoading] = useState(false);

  // Customize state
  const [selectedId, setSelectedId] = useState(initialTemplateId);
  const [customInstructions, setCustomInstructions] = useState("");
  const [customOutput, setCustomOutput] = useState("");
  const [customLoading, setCustomLoading] = useState(false);

  const [copied, setCopied] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const selectedTemplate = getTemplate(selectedId);

  const streamRequest = useCallback(
    async (
      url: string,
      body: Record<string, unknown>,
      setOutput: (v: string | ((prev: string) => string)) => void,
      setLoading: (v: boolean) => void
    ) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setOutput("");
      setLoading(true);

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

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          setOutput((prev) => prev + decoder.decode(value, { stream: true }));
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setOutput(`Error: ${(err as Error).message}`);
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleGenerate = () => {
    if (!genDescription.trim()) return;
    streamRequest(
      "/api/generate",
      { category: genCategory, description: genDescription, style: genStyle },
      setGenOutput,
      setGenLoading
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
      setCustomLoading
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeOutput = tab === "generate" ? genOutput : customOutput;
  const isLoading = tab === "generate" ? genLoading : customLoading;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="border-b border-white/10 bg-gray-950/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-extrabold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"
          >
            TemplateLab
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              AI Studio
            </span>
            <UserButton />
          </div>
        </div>
      </nav>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">AI Template Studio</h1>
          <p className="text-gray-400">
            Generate new templates or customize existing ones with Claude.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Controls */}
          <div className="flex flex-col gap-6">
            {/* Tabs */}
            <div className="flex rounded-xl bg-white/5 border border-white/10 p-1 gap-1">
              {(["generate", "customize"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition ${
                    tab === t
                      ? "bg-violet-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {t === "generate" ? "✨ Generate New" : "🎨 Customize"}
                </button>
              ))}
            </div>

            {/* Generate Panel */}
            {tab === "generate" && (
              <div className="flex flex-col gap-4">
                {/* Category */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Template type
                  </label>
                  <div className="flex gap-3">
                    {(["ui", "prompt"] as const).map((c) => (
                      <button
                        key={c}
                        onClick={() => setGenCategory(c)}
                        className={`flex-1 py-2 rounded-xl text-sm font-medium border transition ${
                          genCategory === c
                            ? "bg-violet-600/20 border-violet-500 text-violet-300"
                            : "border-white/10 text-gray-400 hover:border-white/30"
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
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
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
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize border transition ${
                            genStyle === s
                              ? "bg-cyan-600/20 border-cyan-500 text-cyan-300"
                              : "border-white/10 text-gray-400 hover:border-white/30"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
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
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 resize-none"
                  />
                  <p className="text-xs text-gray-600 mt-1">⌘+Enter to generate</p>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={genLoading || !genDescription.trim()}
                  className="py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed font-semibold transition flex items-center justify-center gap-2"
                >
                  {genLoading ? (
                    <>
                      <span className="animate-spin">⟳</span> Generating...
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
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Select a template to customize
                  </label>
                  <select
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                    className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="">— Choose a template —</option>
                    <optgroup label="UI Templates">
                      {templates
                        .filter((t) => t.category === "ui")
                        .map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name} ({formatPrice(t.price)})
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="Prompt Templates">
                      {templates
                        .filter((t) => t.category === "prompt")
                        .map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name} ({formatPrice(t.price)})
                          </option>
                        ))}
                    </optgroup>
                  </select>
                </div>

                {/* Template preview */}
                {selectedTemplate && (
                  <div className="rounded-xl bg-white/3 border border-white/10 p-4">
                    <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                      Template preview
                    </p>
                    <pre className="text-xs text-gray-500 font-mono overflow-hidden line-clamp-5">
                      {selectedTemplate.content.slice(0, 300)}...
                    </pre>
                  </div>
                )}

                {/* Instructions */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
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
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 resize-none"
                  />
                  <p className="text-xs text-gray-600 mt-1">⌘+Enter to customize</p>
                </div>

                <button
                  onClick={handleCustomize}
                  disabled={
                    customLoading ||
                    !selectedTemplate ||
                    !customInstructions.trim()
                  }
                  className="py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed font-semibold transition flex items-center justify-center gap-2"
                >
                  {customLoading ? (
                    <>
                      <span className="animate-spin">⟳</span> Customizing...
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
              <h2 className="text-sm font-semibold text-gray-300">Output</h2>
              {activeOutput && (
                <button
                  onClick={() => copyToClipboard(activeOutput)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium transition"
                >
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              )}
            </div>

            <div className="flex-1 relative rounded-2xl border border-white/10 bg-gray-900 overflow-hidden min-h-[500px]">
              {!activeOutput && !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm">
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
                  <div className="flex items-center gap-3 text-gray-400">
                    <span className="animate-spin text-2xl">⟳</span>
                    <span className="text-sm">
                      Claude is thinking
                      <span className="animate-pulse">...</span>
                    </span>
                  </div>
                </div>
              )}

              {activeOutput && (
                <pre className="p-5 text-xs font-mono text-gray-300 overflow-auto h-full leading-relaxed whitespace-pre-wrap">
                  {activeOutput}
                  {isLoading && (
                    <span className="inline-block w-2 h-4 bg-violet-400 animate-pulse ml-0.5 align-middle" />
                  )}
                </pre>
              )}
            </div>

            {activeOutput && (
              <p className="text-xs text-gray-600 mt-2 text-right">
                {activeOutput.length.toLocaleString()} characters
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
      <StudioContent />
    </Suspense>
  );
}
