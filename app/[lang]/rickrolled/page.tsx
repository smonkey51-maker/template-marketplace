import type { Metadata } from "next";
import { toLocale } from "@/lib/locales";
import { copy } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import SiteNav from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  const m = pageMeta(lang, "/rickrolled", "Rickrolled — Sandbox", copy[lang].siteTagline);
  return { ...m, robots: { index: false, follow: false } };
}

/** The whole page is one image: public/rickrolled.png (swap in a .gif to animate it). */
export default async function RickrolledPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLocale((await params).lang);

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <SiteNav />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        {/* A plain <img>, so a GIF dropped in later would still animate. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/rickrolled.png"
          alt="Rickrolled"
          width={447}
          height={447}
          className="h-auto w-full max-w-[447px] rounded-sm border border-line"
        />
      </main>
      <SiteFooter />
    </div>
  );
}
