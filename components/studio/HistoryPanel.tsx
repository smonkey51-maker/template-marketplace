"use client";

import { useState } from "react";
import { HistoryEntry, Tab } from "@/types/studio";

function relativeTime(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// Lightweight line diff — returns stats and first changed lines
function computeDiff(
  prev: string,
  next: string,
): {
  added: number;
  removed: number;
  preview: Array<{ type: "add" | "del" | "ctx"; text: string }>;
} {
  const prevLines = prev.split("\n");
  const nextLines = next.split("\n");

  // Build a simple set-based diff (not LCS, just changed line detection)
  const prevSet = new Set(prevLines);
  const nextSet = new Set(nextLines);

  const removed = prevLines.filter((l) => !nextSet.has(l)).length;
  const added = nextLines.filter((l) => !prevSet.has(l)).length;

  // Show the first few changed lines as preview
  const preview: Array<{ type: "add" | "del" | "ctx"; text: string }> = [];
  let count = 0;

  // Find first changed region
  const maxI = Math.min(prevLines.length, nextLines.length, 40);
  let firstDiff = -1;
  for (let i = 0; i < maxI; i++) {
    if (prevLines[i] !== nextLines[i]) {
      firstDiff = i;
      break;
    }
  }

  if (firstDiff >= 0) {
    // 1 line of context before
    if (firstDiff > 0) {
      preview.push({ type: "ctx", text: prevLines[firstDiff - 1].trim().slice(0, 60) });
    }
    for (let i = firstDiff; i < Math.min(firstDiff + 4, maxI) && count < 4; i++) {
      if (prevLines[i] !== nextLines[i]) {
        if (prevLines[i]?.trim())
          preview.push({ type: "del", text: prevLines[i].trim().slice(0, 60) });
        if (nextLines[i]?.trim())
          preview.push({ type: "add", text: nextLines[i].trim().slice(0, 60) });
        count++;
      }
    }
  }

  return { added, removed, preview };
}

type HistoryPanelProps = {
  genHistory: HistoryEntry[];
  customHistory: HistoryEntry[];
  activeTab: Tab;
  onSelectEntry: (entry: HistoryEntry) => void;
  onRestoreVersion: (output: string) => void;
  onClose: () => void;
  lang: string;
};

export default function HistoryPanel({
  genHistory,
  customHistory,
  activeTab,
  onSelectEntry,
  onRestoreVersion,
  lang,
}: HistoryPanelProps) {
  const history = activeTab === "generate" ? genHistory : customHistory;
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [diffVersionIdx, setDiffVersionIdx] = useState<number | null>(null);

  const isIt = lang === "it";

  if (history.length === 0) {
    return (
      <div className="mt-4 bg-surface border border-theme r-md p-6 text-center">
        <p className="text-[13px] text-muted">
          {isIt ? "Nessuna cronologia ancora." : "No history yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-surface border border-theme r-glass overflow-hidden">
      <p className="text-[11px] font-semibold text-muted uppercase tracking-widest px-4 pt-3 pb-2">
        {isIt ? "Cronologia" : "History"} · {history.length}
      </p>

      <ul className="divide-y divide-theme max-h-[480px] overflow-y-auto">
        {history.map((entry) => {
          const isExpanded = expandedId === entry.id;
          const hasVersions = (entry.versions?.length ?? 0) > 0;

          return (
            <li key={entry.id}>
              {/* Main entry row */}
              <div className="flex items-stretch">
                <button
                  onClick={() => onSelectEntry(entry)}
                  className="flex-1 text-left px-4 py-3 hover:bg-card transition-colors duration-150 group"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[13px] text-theme truncate flex-1 group-hover:text-accent transition-colors">
                      {entry.label || "Untitled"}
                    </span>
                    <span className="text-[11px] text-muted shrink-0 flex items-center gap-2">
                      <span
                        className="px-1.5 py-0.5 text-[10px] font-medium"
                        style={
                          entry.category === "ui"
                            ? { background: "var(--accent-bg)", color: "var(--accent)" }
                            : { background: "var(--terra-dim)", color: "var(--terra)" }
                        }
                      >
                        {entry.category.toUpperCase()}
                      </span>
                      {relativeTime(entry.timestamp)}
                    </span>
                  </div>
                  {entry.input && (
                    <p className="text-[11px] text-muted mt-0.5 truncate opacity-70">
                      {entry.input.slice(0, 80)}
                    </p>
                  )}
                </button>

                {/* Expand toggle (only if has versions) */}
                {hasVersions && (
                  <button
                    onClick={() => {
                      setExpandedId(isExpanded ? null : entry.id);
                      setDiffVersionIdx(null);
                    }}
                    className="px-3 border-l border-theme text-muted hover:text-theme hover:bg-card transition-colors text-[11px] flex flex-col items-center justify-center gap-0.5 shrink-0"
                    title={isIt ? "Mostra versioni precedenti" : "Show previous versions"}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path
                        d="M6 1v4l2.5 2"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    <span>{entry.versions!.length}</span>
                  </button>
                )}
              </div>

              {/* Versions panel */}
              {isExpanded && hasVersions && (
                <div className="border-t border-theme bg-card px-4 py-3 space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
                    {isIt ? "Versioni precedenti" : "Previous versions"}
                  </p>

                  {entry.versions!.map((ver, idx) => {
                    const isDiffOpen = diffVersionIdx === idx;
                    const diff = isDiffOpen ? computeDiff(ver.output, entry.output) : null;

                    return (
                      <div key={idx} className="border border-theme r-sm">
                        {/* Version row */}
                        <div className="flex items-center justify-between gap-2 px-3 py-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-muted">
                              v{entry.versions!.length - idx}
                            </span>
                            <span className="text-[11px] text-muted">
                              {relativeTime(ver.timestamp)}
                            </span>
                            <span className="text-[10px] text-muted opacity-60">
                              {Math.round(ver.output.length / 1000)}k chars
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {/* Diff toggle */}
                            <button
                              onClick={() => setDiffVersionIdx(isDiffOpen ? null : idx)}
                              className="text-[10px] font-semibold px-2 py-0.5 border border-theme r-pill hover:border-accent/40 text-muted hover:text-theme transition-colors"
                            >
                              {isDiffOpen ? "← " : ""}
                              {isIt ? "Diff" : "Diff"}
                            </button>
                            {/* Restore button */}
                            <button
                              onClick={() => onRestoreVersion(ver.output)}
                              className="text-[10px] font-semibold px-2 py-0.5 transition-colors"
                              style={{
                                background: "var(--accent-bg)",
                                color: "var(--accent)",
                                border: "1px solid var(--accent-dim, var(--accent-bg))",
                              }}
                            >
                              {isIt ? "Ripristina" : "Restore"}
                            </button>
                          </div>
                        </div>

                        {/* Diff view */}
                        {isDiffOpen && diff && (
                          <div className="border-t border-theme px-3 py-2 space-y-2">
                            {/* Stats bar */}
                            <div className="flex items-center gap-3 text-[11px]">
                              <span
                                className="font-semibold"
                                style={{ color: "var(--ios-green, #30D158)" }}
                              >
                                +{diff.added} {isIt ? "righe" : "lines"}
                              </span>
                              <span
                                className="font-semibold"
                                style={{ color: "var(--ios-red, #FF453A)" }}
                              >
                                -{diff.removed} {isIt ? "righe" : "lines"}
                              </span>
                              <span className="text-muted opacity-60 ml-auto">
                                {entry.output.length > ver.output.length ? "+" : ""}
                                {entry.output.length - ver.output.length} chars
                              </span>
                            </div>

                            {/* Line preview */}
                            {diff.preview.length > 0 && (
                              <div className="font-mono text-[10px] leading-relaxed space-y-0.5 overflow-hidden">
                                {diff.preview.map((line, i) => (
                                  <div
                                    key={i}
                                    className="px-2 py-0.5 truncate"
                                    style={
                                      line.type === "add"
                                        ? {
                                            background: "rgba(48,209,88,0.08)",
                                            color: "var(--ios-green, #30D158)",
                                          }
                                        : line.type === "del"
                                          ? {
                                              background: "rgba(255,69,58,0.08)",
                                              color: "var(--ios-red, #FF453A)",
                                            }
                                          : { color: "var(--muted)", opacity: 0.6 }
                                    }
                                  >
                                    {line.type === "add" ? "+ " : line.type === "del" ? "- " : "  "}
                                    {line.text || " "}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
