export type Tab = "generate" | "customize";
export type UIStyle = "modern" | "minimal" | "bold" | "glassmorphism" | "retro";
export type Tone = "professional" | "minimal" | "playful" | "bold";

export type HistoryEntry = {
  id: string;
  output: string;
  label: string;
  category: "ui" | "prompt" | "guide" | "worksheet" | "tracker" | "script";
  tab: Tab;
  timestamp: number;
  input?: string;
  templateId?: string;
  versions?: Array<{ timestamp: number; output: string }>;
};
