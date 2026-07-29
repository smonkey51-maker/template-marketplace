"use client";

import { UIStyle, Tone } from "@/types/studio";

const SECTORS = [
  "SaaS / Tech",
  "E-commerce",
  "Portfolio / Freelance",
  "Restaurant / Food",
  "Health & Wellness",
  "Finance / Fintech",
  "Agency / Creative",
  "Real Estate",
  "Education",
  "Other / Custom",
];

type GeneratePanelProps = {
  genCategory: "ui" | "prompt";
  setGenCategory: (v: "ui" | "prompt") => void;
  genDescription: string;
  setGenDescription: (v: string) => void;
  genStyle: UIStyle;
  setGenStyle: (v: UIStyle) => void;
  genSector: string;
  setGenSector: (v: string) => void;
  genTone: Tone;
  setGenTone: (v: Tone) => void;
  genOutput: string;
  genLoading: boolean;
  hasStudioAccess: boolean;
  onGenerate: () => void;
  lang: string;
};

export default function GeneratePanel({
  genCategory,
  setGenCategory,
  genDescription,
  setGenDescription,
  genStyle,
  setGenStyle,
  genSector,
  setGenSector,
  genTone,
  setGenTone,
  genLoading,
  hasStudioAccess,
  onGenerate,
  lang,
}: GeneratePanelProps) {
  if (!hasStudioAccess) {
    return (
      <div className="bg-surface border border-theme p-8 text-center flex flex-col items-center gap-4">
        <div className="w-14 h-14 bg-accent/10 flex items-center justify-center">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
            <rect
              x="4"
              y="11"
              width="18"
              height="13"
              rx="3"
              stroke="var(--accent)"
              strokeWidth="1.8"
            />
            <path
              d="M8 11V8a5 5 0 0110 0v3"
              stroke="var(--accent)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h3 className="font-semibold text-theme text-[17px]">
          {lang === "it" ? "Studio Access richiesto" : "Studio Access required"}
        </h3>
        <p className="text-[15px] text-muted">
          {lang === "it"
            ? "Acquista Studio Access per generare template illimitati con l'AI."
            : "Get Studio Access to generate unlimited templates with AI."}
        </p>
        <button
          onClick={async () => {
            const res = await fetch("/api/checkout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ templateId: "studio-access" }),
            });
            const data = await res.json();
            if (data.requireAuth) {
              window.location.href = "/sign-in?redirect_url=/studio";
              return;
            }
            if (data.url) window.location.href = data.url;
          }}
          className="btn-brand text-[15px]"
          style={{ padding: "12px 24px" }}
        >
          {lang === "it" ? "€9.99/mese — Abbonati →" : "€9.99/mo — Subscribe →"}
        </button>
        {process.env.NEXT_PUBLIC_STUDIO_LIFETIME_AVAILABLE === "true" && (
          <>
            <span className="text-[12px] text-muted">— {lang === "it" ? "oppure" : "or"} —</span>
            <button
              onClick={async () => {
                const res = await fetch("/api/checkout", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ templateId: "studio-access-lifetime" }),
                });
                const data = await res.json();
                if (data.requireAuth) {
                  window.location.href = "/sign-in?redirect_url=/studio";
                  return;
                }
                if (data.url) window.location.href = data.url;
              }}
              className="px-6 py-2.5 glass-subtle border border-theme font-semibold text-[14px] text-theme transition-all duration-200 active:scale-[0.97] ios-spring"
            >
              {lang === "it" ? "✦ Lifetime — €49 una volta sola" : "✦ Lifetime — €49 one-time"}
            </button>
          </>
        )}
      </div>
    );
  }

  return (
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
              className={`flex-1 py-2.5 text-[15px] font-medium border transition-all duration-200 active:scale-[0.97] ios-spring ${
                genCategory === c
                  ? "bg-accent/15 border-accent/40 text-accent"
                  : "border-theme text-muted hover:border-accent/50"
              }`}
            >
              {c === "ui" ? "UI Component" : "Prompt Template"}
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
            {(["modern", "minimal", "bold", "glassmorphism", "retro"] as UIStyle[]).map((s) => (
              <button
                key={s}
                onClick={() => setGenStyle(s)}
                className={`px-3.5 py-1.5 text-[13px] font-medium capitalize border transition-all duration-200 active:scale-[0.97] ios-spring ${
                  genStyle === s
                    ? "bg-accent/15 border-accent/40 text-accent"
                    : "border-theme text-muted hover:border-accent/50"
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
          Industry / Sector <span className="normal-case text-muted font-normal">(optional)</span>
        </label>
        <select
          value={genSector}
          onChange={(e) => setGenSector(e.target.value)}
          className="w-full bg-input border border-theme px-4 py-2.5 text-[15px] text-theme focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-200"
        >
          <option value="">— Any sector —</option>
          {SECTORS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
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
                className={`px-3.5 py-1.5 text-[13px] font-medium capitalize border transition-all duration-200 active:scale-[0.97] ios-spring ${
                  genTone === t
                    ? "bg-accent/15 border-accent/40 text-accent"
                    : "border-theme text-muted hover:border-accent/50"
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
            if (e.key === "Enter" && e.metaKey) onGenerate();
          }}
          rows={4}
          placeholder={
            genCategory === "ui"
              ? "e.g. A testimonial section with 3 cards, star ratings, and customer photos"
              : "e.g. A LinkedIn connection request message for B2B SaaS outreach"
          }
          className="w-full bg-input border border-theme px-4 py-3 text-[15px] text-theme placeholder-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 resize-none transition-all duration-200"
        />
        <p className="text-[11px] text-muted mt-1 px-1">⌘+Enter to generate</p>
      </div>

      <button
        onClick={onGenerate}
        disabled={genLoading || !genDescription.trim()}
        className="btn-brand w-full justify-center text-[15px] gap-2"
        style={{ padding: "14px 24px" }}
      >
        {genLoading ? (
          <>
            <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⟳</span>{" "}
            Generating...
          </>
        ) : lang === "it" ? (
          "Genera Template"
        ) : (
          "Generate Template"
        )}
      </button>
    </div>
  );
}
