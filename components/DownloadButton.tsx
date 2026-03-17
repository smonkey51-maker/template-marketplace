"use client";

import { useState } from "react";
import { DownloadType } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";

type Variant = "full" | "compact";

interface Meta {
  labelIt: string;
  labelEn: string;
  icon: string;
  accent: string;
}

const DOWNLOAD_META: Record<DownloadType, Meta> = {
  html:    { labelIt: "Scarica HTML",        labelEn: "Download HTML",        icon: "💾", accent: "#0A84FF" },
  prompt:  { labelIt: "Scarica TXT",         labelEn: "Download TXT",         icon: "📄", accent: "#5E5CE6" },
  canva:   { labelIt: "Apri in Canva",       labelEn: "Open in Canva",        icon: "🎨", accent: "#7B61FF" },
  excel:   { labelIt: "Scarica Excel",       labelEn: "Download Excel",       icon: "📊", accent: "#1D6F42" },
  sheets:  { labelIt: "Apri Google Sheets",  labelEn: "Open Google Sheets",   icon: "📊", accent: "#0F9D58" },
  notion:  { labelIt: "Duplica su Notion",   labelEn: "Duplicate on Notion",  icon: "📝", accent: "#4A4A4A" },
  webflow: { labelIt: "Apri su Webflow",     labelEn: "Open in Webflow",      icon: "🌐", accent: "#4353FF" },
  framer:  { labelIt: "Apri su Framer",      labelEn: "Open in Framer",       icon: "🖼️", accent: "#0055FF" },
};

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

  const meta = DOWNLOAD_META[downloadType];
  const label = lang === "it" ? meta.labelIt : meta.labelEn;

  const handleDownload = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/download/${templateId}`);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? (lang === "it" ? "Download non disponibile" : "Download not available"));
        return;
      }

      const contentType = res.headers.get("content-type") ?? "";

      if (contentType.includes("application/json")) {
        // External link (canva, sheets, notion, webflow, framer)
        const data = await res.json();
        if (data.url) window.open(data.url, "_blank", "noopener,noreferrer");
      } else {
        // File download (html, prompt, excel)
        const blob = await res.blob();
        const disposition = res.headers.get("content-disposition") ?? "";
        const filename =
          disposition.match(/filename="(.+)"/)?.[1] ?? `${templateId}.txt`;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } finally {
      setLoading(false);
    }
  };

  if (variant === "compact") {
    return (
      <div className="flex flex-col items-start gap-1">
        <button
          onClick={handleDownload}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 glass-subtle border border-theme rounded-xl text-[12px] font-semibold text-muted hover:text-theme transition-all duration-200 active:scale-[0.97] ios-spring disabled:opacity-50"
        >
          {loading ? (
            <span className="w-3 h-3 border-2 border-muted border-t-transparent rounded-full animate-spin" />
          ) : (
            <span className="text-[13px]">{meta.icon}</span>
          )}
          {label}
        </button>
        {error && <p className="text-[#FF453A] text-[11px]">{error}</p>}
      </div>
    );
  }

  // full variant
  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleDownload}
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full glass-subtle border border-theme rounded-2xl px-6 py-3 text-[14px] font-semibold text-theme hover:border-[#0A84FF]/40 hover:text-[#0A84FF] transition-all duration-200 active:scale-[0.97] ios-spring disabled:opacity-50"
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-muted border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <span className="text-[16px]">{meta.icon}</span>
            {label}
          </>
        )}
      </button>
      {error && <p className="text-[#FF453A] text-[12px] text-center">{error}</p>}
    </div>
  );
}
