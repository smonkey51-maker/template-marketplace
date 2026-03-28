"use client";

import { HistoryEntry, Tab } from "@/types/studio";

function relativeTime(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

type HistoryPanelProps = {
  genHistory: HistoryEntry[];
  customHistory: HistoryEntry[];
  activeTab: Tab;
  onSelectEntry: (entry: HistoryEntry) => void;
  onClose: () => void;
  lang: string;
};

export default function HistoryPanel({
  genHistory,
  customHistory,
  activeTab,
  onSelectEntry,
  lang: _lang,
}: HistoryPanelProps) {
  const history = activeTab === "generate" ? genHistory : customHistory;

  return (
    <div className="mt-4 bg-surface border border-theme overflow-hidden">
      <p className="text-[11px] font-semibold text-muted uppercase tracking-widest px-4 pt-3 pb-2">
        Recent generations
      </p>
      <ul className="divide-y divide-theme max-h-64 overflow-y-auto">
        {history.map((entry) => (
          <li key={entry.id}>
            <button
              onClick={() => onSelectEntry(entry)}
              className="w-full text-left px-4 py-3 hover:bg-card transition-colors duration-150 flex items-center justify-between gap-3 group"
            >
              <span className="text-[13px] text-theme truncate flex-1 group-hover:text-accent transition-colors">
                {entry.label || "Untitled"}
              </span>
              <span className="text-[11px] text-muted shrink-0 flex items-center gap-2">
                <span
                  className="px-1.5 py-0.5 rounded text-[10px] font-medium"
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
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
