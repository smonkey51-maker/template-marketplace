"use client";

import Link from "next/link";
import { sellableTemplates, formatPrice, getTemplate } from "@/lib/templates";

type CustomizePanelProps = {
  selectedId: string;
  setSelectedId: (v: string) => void;
  customInstructions: string;
  setCustomInstructions: (v: string) => void;
  customOutput: string;
  customLoading: boolean;
  purchasedIds: string[];
  purchasesLoaded: boolean;
  hasStudioAccess: boolean;
  onCustomize: () => void;
  lang: string;
};

export default function CustomizePanel({
  selectedId,
  setSelectedId,
  customInstructions,
  setCustomInstructions,
  customLoading,
  purchasedIds,
  purchasesLoaded,
  hasStudioAccess,
  onCustomize,
  lang,
}: CustomizePanelProps) {
  const selectedTemplate = getTemplate(selectedId);

  return (
    <div className="flex flex-col gap-4">
      {/* Template picker */}
      <div>
        <label className="text-[11px] font-semibold text-muted uppercase tracking-widest mb-2 block px-1">
          {lang === "it"
            ? "Seleziona un template da personalizzare"
            : "Select a template to customize"}
          {hasStudioAccess && (
            <span className="ml-2 normal-case tracking-normal font-normal text-accent">
              {lang === "it"
                ? "— tutti disponibili con Studio Access"
                : "— all unlocked with Studio Access"}
            </span>
          )}
        </label>
        {!purchasesLoaded ? (
          <div className="w-full h-12 bg-surface r-md animate-pulse" />
        ) : !hasStudioAccess &&
          purchasedIds.filter((id) => id !== "studio-access" && id !== "studio-access-lifetime")
            .length === 0 ? (
          <div className="bg-surface border border-theme r-md px-4 py-6 text-center text-[15px] text-muted">
            {lang === "it"
              ? "Non hai ancora acquistato nessun template."
              : "You haven't purchased any templates yet."}{" "}
            <Link href={`/${lang}`} className="text-accent hover:underline">
              {lang === "it" ? "Vai al marketplace →" : "Go to marketplace →"}
            </Link>
          </div>
        ) : (
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full bg-input border border-theme r-md px-4 py-3 text-[15px] text-theme focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-200"
          >
            <option value="">
              — {lang === "it" ? "Scegli un template" : "Choose a template"} —
            </option>
            {["ui", "prompt"].map((cat) => {
              const group = sellableTemplates.filter(
                (t) => t.category === cat && (hasStudioAccess || purchasedIds.includes(t.id)),
              );
              if (group.length === 0) return null;
              return (
                <optgroup key={cat} label={cat === "ui" ? "UI Templates" : "Prompt Templates"}>
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
        <div className="bg-surface border border-theme r-glass overflow-hidden">
          <p className="text-[11px] font-semibold text-muted px-4 pt-3 pb-2 uppercase tracking-widest">
            Template preview
          </p>
          {selectedTemplate.category === "ui" ? (
            <div className="h-40 overflow-hidden relative">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  transform: "scale(0.38)",
                  transformOrigin: "top left",
                  width: "263%",
                  height: "263%",
                }}
              >
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
            if (e.key === "Enter" && e.metaKey) onCustomize();
          }}
          rows={4}
          placeholder={
            selectedTemplate?.category === "ui"
              ? "e.g. Change the color scheme to dark green, add an animation on the headline, make the CTA button larger"
              : "e.g. Make it more casual and friendly, add a variable for company size, shorten to under 100 words"
          }
          className="w-full bg-input border border-theme r-md px-4 py-3 text-[15px] text-theme placeholder-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 resize-none transition-all duration-200"
        />
        <p className="text-[11px] text-muted mt-1 px-1">⌘+Enter to customize</p>
      </div>

      <button
        onClick={onCustomize}
        disabled={customLoading || !selectedTemplate || !customInstructions.trim()}
        className="btn-brand w-full justify-center text-[15px] gap-2"
        style={{ padding: "14px 24px" }}
      >
        {customLoading ? (
          <>
            <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⟳</span>{" "}
            Customizing...
          </>
        ) : lang === "it" ? (
          "Personalizza Template"
        ) : (
          "Customize Template"
        )}
      </button>
    </div>
  );
}
