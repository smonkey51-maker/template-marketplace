"use client";

type OutputPreviewProps = {
  output: string;
  outputView: "code" | "preview";
  setOutputView: (v: "code" | "preview") => void;
  copied: boolean;
  onCopy: () => void;
  showTimeoutHint: boolean;
  isLoading: boolean;
  isUIOutput: boolean;
  tab: "generate" | "customize";
  selectedTemplateId?: string;
  selectedTemplateDownloadType?: string;
  selectedTemplateDownloadUrl?: string;
  activeCategory: "ui" | "prompt" | "guide" | "worksheet" | "tracker" | "script";
  lang: string;
};

export default function OutputPreview({
  output,
  outputView,
  setOutputView,
  copied,
  onCopy,
  showTimeoutHint,
  isLoading,
  isUIOutput,
  tab,
  selectedTemplateId,
  selectedTemplateDownloadType,
  selectedTemplateDownloadUrl,
  activeCategory,
  lang,
}: OutputPreviewProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-[13px] font-semibold text-muted uppercase tracking-widest">Output</h2>
          {output && isUIOutput && (
            <div className="flex bg-card r-pill p-0.5 gap-0.5">
              <button
                onClick={() => setOutputView("code")}
                className={`px-3 py-1 text-[13px] font-medium transition-all duration-200 ${
                  outputView === "code"
                    ? "bg-surface text-theme shadow-sm"
                    : "text-muted hover:text-theme"
                }`}
              >
                &lt;/&gt; Code
              </button>
              <button
                onClick={() => setOutputView("preview")}
                className={`px-3 py-1 text-[13px] font-medium transition-all duration-200 ${
                  outputView === "preview"
                    ? "bg-surface text-theme shadow-sm"
                    : "text-muted hover:text-theme"
                }`}
              >
                Preview
              </button>
            </div>
          )}
        </div>
        {output && (
          <div className="flex items-center gap-2">
            <button
              onClick={onCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-input hover:bg-surface text-[13px] font-medium transition-all duration-200 active:scale-[0.97] ios-spring"
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
            <button
              onClick={() => {
                const dlType =
                  tab === "customize"
                    ? (selectedTemplateDownloadType ??
                      (activeCategory === "ui" ? "html" : "prompt"))
                    : activeCategory === "ui"
                      ? "html"
                      : "prompt";
                const isHtmlOutput =
                  activeCategory === "ui" ||
                  ![
                    "notion",
                    "canva",
                    "excel",
                    "sheets",
                    "webflow",
                    "framer",
                    "shopify",
                    "wordpress",
                  ].includes(dlType as string);
                const ext = isHtmlOutput ? "html" : "txt";
                const mime = isHtmlOutput ? "text/html" : "text/plain";
                const blob = new Blob([output], { type: mime });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = selectedTemplateId
                  ? `${selectedTemplateId}-custom-${Date.now()}.${ext}`
                  : `template-${Date.now()}.${ext}`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-input hover:bg-surface text-[13px] font-medium transition-all duration-200 active:scale-[0.97] ios-spring"
              aria-label={lang === "it" ? "Scarica file" : "Download file"}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M7 1v8M4 7l3 3 3-3M2 12h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {lang === "it" ? "Scarica" : "Download"}
              {tab === "customize" &&
                selectedTemplateDownloadType &&
                selectedTemplateDownloadType !== "html" && (
                  <span className="text-[10px] opacity-60 ml-0.5">
                    .{activeCategory === "ui" ? "html" : "txt"}
                  </span>
                )}
            </button>
            {tab === "customize" && selectedTemplateDownloadUrl && (
              <a
                href={selectedTemplateDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-input hover:bg-surface text-[13px] font-medium transition-all duration-200 active:scale-[0.97] ios-spring"
                title={lang === "it" ? "Apri template originale" : "Open original template"}
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path
                    d="M1 11L11 1M11 1H5M11 1v6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {selectedTemplateDownloadType?.charAt(0).toUpperCase()}
                {selectedTemplateDownloadType?.slice(1)}
              </a>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 relative bg-surface border border-theme overflow-hidden min-h-[500px]">
        {!output && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-muted text-[15px]">
            <div className="text-center">
              <div className="flex justify-center mb-3 text-muted">
                {tab === "generate" ? (
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
                    <path
                      d="M18 4v4M18 28v4M4 18h4M28 18h4M7.76 7.76l2.83 2.83M25.41 25.41l2.83 2.83M7.76 28.24l2.83-2.83M25.41 10.59l2.83-2.83"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="18" cy="18" r="6" stroke="currentColor" strokeWidth="2" />
                  </svg>
                ) : (
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
                    <path
                      d="M24 8l4 4-18 18H6v-4L24 8z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <p>
                {tab === "generate"
                  ? lang === "it"
                    ? "Descrivi un template da generare"
                    : "Describe a template to generate"
                  : lang === "it"
                    ? "Seleziona un template e aggiungi istruzioni"
                    : "Select a template and add instructions"}
              </p>
            </div>
          </div>
        )}

        {isLoading && !output && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-muted px-6 text-center">
              <span
                style={{
                  display: "inline-block",
                  animation: "spin 1s linear infinite",
                  fontSize: "1.5rem",
                  color: "var(--accent)",
                }}
              >
                ⟳
              </span>
              <span className="text-[15px]">
                Claude is thinking
                <span className="animate-pulse">...</span>
              </span>
              {showTimeoutHint && (
                <p className="text-[12px] text-muted max-w-[260px] leading-relaxed">
                  {lang === "it"
                    ? "Ci sta pensando su 🧠 — i template UI con extended thinking possono richiedere fino a 60 secondi."
                    : "Still thinking 🧠 — UI templates with extended thinking can take up to 60 seconds."}
                </p>
              )}
            </div>
          </div>
        )}

        {output && (outputView === "code" || !isUIOutput) && (
          <pre className="p-5 text-[12px] font-mono text-muted overflow-auto h-full leading-relaxed whitespace-pre-wrap">
            {output}
            {isLoading && (
              <span className="inline-block w-2 h-4 bg-accent animate-pulse ml-0.5 align-middle" />
            )}
          </pre>
        )}

        {output && isUIOutput && outputView === "preview" && (
          <iframe
            srcDoc={`<!DOCTYPE html><html><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><script src="https://cdn.tailwindcss.com"><\/script><style>body{margin:0}</style></head><body>${output}</body></html>`}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin"
            title="Template Preview"
          />
        )}
      </div>

      {output && (
        <p className="text-[11px] text-muted mt-2 text-right">
          {output.length.toLocaleString()} characters
        </p>
      )}
    </div>
  );
}
