import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Rickrolled",
  robots: { index: false, follow: false },
};

/** The whole page is one image: public/rickrolled.png (swap in a .gif to animate it). */
export default function RickrolledPage() {
  return (
    <PageShell>
      <div className="flex items-center justify-center px-4 py-12">
        <div className="glass-panel w-full max-w-[463px] p-2">
          {/* A plain <img>, so a GIF dropped in later would still animate. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/rickrolled.png"
            alt="Rickrolled"
            width={447}
            height={447}
            className="h-auto w-full rounded-2xl"
          />
        </div>
      </div>
    </PageShell>
  );
}
