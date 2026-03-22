"use client";

import { useState } from "react";
import { DownloadType } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";

type Variant = "full" | "compact";

interface Meta {
  labelIt: string;
  labelEn: string;
  icon: React.ReactNode;
  accent: string;
}

function Icon({ d, viewBox = "0 0 16 16" }: { d: string; viewBox?: string }) {
  return (
    <svg width="15" height="15" viewBox={viewBox} fill="none" aria-hidden>
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const DOWNLOAD_META: Record<DownloadType, Meta> = {
  html: {
    labelIt: "Scarica HTML",
    labelEn: "Download HTML",
    icon: <Icon d="M4 3h8l2 3-6 7-6-7 2-3zM8 13V6M5 6h6" />,
    accent: "#C8A96E",
  },
  prompt: {
    labelIt: "Scarica TXT",
    labelEn: "Download TXT",
    icon: <Icon d="M4 4h8M4 8h6M4 12h5" />,
    accent: "#C4622D",
  },
  canva: {
    labelIt: "Apri in Canva",
    labelEn: "Open in Canva",
    icon: <Icon d="M8 2a6 6 0 100 12A6 6 0 008 2zM5.5 8a2.5 2.5 0 005 0" />,
    accent: "#7B61FF",
  },
  excel: {
    labelIt: "Scarica Excel",
    labelEn: "Download Excel",
    icon: <Icon d="M3 3h10v10H3zM3 8h10M8 3v10M5.5 5.5l5 5M10.5 5.5l-5 5" />,
    accent: "#1D6F42",
  },
  sheets: {
    labelIt: "Apri Google Sheets",
    labelEn: "Open Google Sheets",
    icon: <Icon d="M4 2h8v12H4zM4 6h8M4 10h8M8 2v12" />,
    accent: "#0F9D58",
  },
  notion: {
    labelIt: "Duplica su Notion",
    labelEn: "Duplicate on Notion",
    icon: <Icon d="M4 4h8M4 8h8M4 12h5" />,
    accent: "#6E6E6E",
  },
  webflow: {
    labelIt: "Apri su Webflow",
    labelEn: "Open in Webflow",
    icon: <Icon d="M2 8l3-5 3 4 2-2 4 3" />,
    accent: "#4353FF",
  },
  framer: {
    labelIt: "Apri su Framer",
    labelEn: "Open in Framer",
    icon: <Icon d="M4 2h8v6H8l4 6H4l4-6H4V2z" />,
    accent: "#0055FF",
  },
};

/* ── Language picker modal ─────────────────────────────────────────── */
function LangModal({
  onSelect,
  onClose,
  loading,
}: {
  onSelect: (lang: "it" | "en") => void;
  onClose: () => void;
  loading: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      {/* panel */}
      <div
        className="relative z-10 w-full max-w-xs border border-theme p-5 shadow-2xl"
        style={{ background: "var(--card-bg)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-theme text-[15px] font-semibold mb-1">
          Lingua del template
        </h3>
        <p className="text-muted text-[12px] mb-4 leading-relaxed">
          Scegli in quale lingua vuoi scaricare il template.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onSelect("it")}
            disabled={loading}
            className="flex-1 flex flex-col items-center gap-2 py-3 border border-theme hover:border-accent transition-colors disabled:opacity-50"
            style={{ background: "var(--bg)" }}
          >
            <span className="text-[11px] font-black uppercase tracking-[0.15em] text-muted" style={{ fontFamily: "var(--font-syne)" }}>IT</span>
            <span className="text-theme text-[13px] font-semibold">Italiano</span>
          </button>
          <button
            onClick={() => onSelect("en")}
            disabled={loading}
            className="flex-1 flex flex-col items-center gap-2 py-3 border border-theme hover:border-accent transition-colors disabled:opacity-50"
            style={{ background: "var(--bg)" }}
          >
            <span className="text-[11px] font-black uppercase tracking-[0.15em] text-muted" style={{ fontFamily: "var(--font-syne)" }}>EN</span>
            <span className="text-theme text-[13px] font-semibold">English</span>
          </button>
        </div>
        {loading && (
          <p className="text-muted text-[11px] text-center mt-3">
            Preparazione in corso…
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Main component ────────────────────────────────────────────────── */
export default function DownloadButton({
  templateId,
  downloadType,
  variant = "full",
}: {
  templateId: string;
  downloadType: DownloadType;
  variant?: Variant;
}) {
  const { lang } = useLang();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLangModal, setShowLangModal] = useState(false);

  const meta = DOWNLOAD_META[downloadType];
  const label = lang === "it" ? meta.labelIt : meta.labelEn;

  /* Downloads require lang choice only for file-based types */
  const needsLangChoice = downloadType === "html" || downloadType === "prompt";

  const executeDownload = async (dlLang: "it" | "en") => {
    setLoading(true);
    setError("");
    try {
      const url = `/api/download/${templateId}?lang=${dlLang}`;
      const res = await fetch(url);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(
          data.error ??
            (lang === "it" ? "Download non disponibile" : "Download not available")
        );
        return;
      }

      const contentType = res.headers.get("content-type") ?? "";

      if (contentType.includes("application/json")) {
        const data = await res.json();
        if (data.url) window.open(data.url, "_blank", "noopener,noreferrer");
      } else {
        const blob = await res.blob();
        const disposition = res.headers.get("content-disposition") ?? "";
        const filename =
          disposition.match(/filename="(.+)"/)?.[1] ?? `${templateId}.txt`;
        const objectUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = objectUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);
      }
    } finally {
      setLoading(false);
      setShowLangModal(false);
    }
  };

  const handleClick = () => {
    if (needsLangChoice) {
      setShowLangModal(true);
    } else {
      executeDownload(lang as "it" | "en");
    }
  };

  const handleLangSelect = (dlLang: "it" | "en") => {
    executeDownload(dlLang);
  };

  if (variant === "compact") {
    return (
      <div className="flex flex-col items-start gap-1">
        <button
          onClick={handleClick}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 glass-subtle border border-theme text-[12px] font-semibold text-muted hover:text-theme transition-all duration-200 active:scale-[0.97] ios-spring disabled:opacity-50"
        >
          {loading ? (
            <span className="w-3 h-3 border-2 border-muted border-t-transparent rounded-full animate-spin" />
          ) : (
            <span className="flex-shrink-0 text-muted">{meta.icon}</span>
          )}
          {label}
        </button>
        {error && <p className="text-[11px]" style={{ color: "var(--error)" }}>{error}</p>}
        {showLangModal && (
          <LangModal
            onSelect={handleLangSelect}
            onClose={() => setShowLangModal(false)}
            loading={loading}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleClick}
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full glass-subtle border border-theme px-6 py-3 text-[14px] font-semibold text-theme hover:border-accent/40 hover:text-accent transition-all duration-200 active:scale-[0.97] ios-spring disabled:opacity-50"
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-muted border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <span className="flex-shrink-0">{meta.icon}</span>
            {label}
          </>
        )}
      </button>
      {error && <p className="text-[12px] text-center" style={{ color: "var(--error)" }}>{error}</p>}
      {showLangModal && (
        <LangModal
          onSelect={handleLangSelect}
          onClose={() => setShowLangModal(false)}
          loading={loading}
        />
      )}
    </div>
  );
}
