import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Use FORMA — Guide",
  description:
    "Learn how to use FORMA: browse premium HTML and prompt templates, customize them with Claude AI, and deploy in seconds. No code required.",
  openGraph: {
    title: "How to Use FORMA — Guide",
    description:
      "Browse premium templates, customize with AI, and deploy instantly. Step-by-step guide.",
  },
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
