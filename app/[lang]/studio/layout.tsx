import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Studio — Customize Templates with Claude",
  description:
    "Use the Forma AI Studio to customize any HTML or prompt template with Claude AI. Describe changes in plain language — Claude applies them instantly.",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
