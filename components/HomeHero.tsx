import Link from "next/link";
import { copy, type Lang } from "@/lib/i18n";

/**
 * Homepage hero. A plain server component (no interactivity needed) kept
 * separate from `page.tsx` mainly so the page stays scannable.
 */
export default function HomeHero({ lang }: { lang: Lang }) {
  const t = (k: keyof typeof copy.it) => copy[lang][k];

  return (
    <section className="relative overflow-hidden border-b border-theme">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/paintings/kandinsky.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 38%",
          opacity: 0.1,
          maskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)",
        }}
      />
      <div className="relative mx-auto max-w-[900px] px-4 py-20 text-center sm:px-6 md:py-28">
        <span
          className="block text-[11px] font-semibold uppercase"
          style={{ color: "var(--muted)", letterSpacing: "0.2em" }}
        >
          {t("heroKicker")}
        </span>
        <h1
          className="mt-5 text-[clamp(2.25rem,6vw,3.75rem)]"
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            color: "var(--text)",
          }}
        >
          {t("heroTitle")}
        </h1>
        <p
          className="mx-auto mt-4 max-w-[520px] text-[clamp(1.05rem,2.4vw,1.3rem)] italic"
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontWeight: 500,
            color: "var(--accent)",
          }}
        >
          {t("heroTagline")}
        </p>
        <p
          className="mx-auto mt-6 max-w-[620px] text-[16px] leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {t("heroSub")}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href={`/${lang}/articoli`} className="btn-brand">
            {t("heroCtaArticoli")}
          </Link>
          <Link
            href={`/${lang}/chi-siamo`}
            className="r-md inline-flex items-center justify-center border border-theme px-6 py-3 text-[15px] font-semibold transition-colors hover:bg-[var(--surface)]"
            style={{ color: "var(--text)" }}
          >
            {t("heroCtaChiSiamo")}
          </Link>
        </div>
      </div>
    </section>
  );
}
