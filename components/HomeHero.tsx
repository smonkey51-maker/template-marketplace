import Link from "next/link";
import { copy, type Lang } from "@/lib/i18n";

export default function HomeHero({ lang }: { lang: Lang }) {
  const t = (k: keyof typeof copy.it) => copy[lang][k];

  return (
    <section className="relative overflow-hidden border-b border-theme">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--bg) 0%, color-mix(in srgb, var(--bg) 88%, transparent) 44%, color-mix(in srgb, var(--bg) 68%, transparent) 100%), url('/paintings/vermeer.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.22,
        }}
      />
      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-8">
          <span
            className="block text-[11px] font-semibold uppercase"
            style={{ color: "var(--accent)", letterSpacing: "0.2em" }}
          >
            {t("heroKicker")}
          </span>

          <h1
            className="mt-5 max-w-[820px] text-[clamp(2.7rem,6.7vw,5.4rem)]"
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontWeight: 700,
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              color: "var(--text)",
            }}
          >
            {t("heroTitle")}
          </h1>

          <p
            className="mt-6 max-w-[620px] text-[clamp(1.05rem,2.2vw,1.35rem)] italic"
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontWeight: 500,
              color: "var(--accent)",
            }}
          >
            {t("heroTagline")}
          </p>

          <p className="mt-6 max-w-[700px] text-[16px] leading-7" style={{ color: "var(--muted)" }}>
            {t("heroSub")}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
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

        <aside className="self-end border-l border-theme pl-6 lg:col-span-4 lg:mb-2">
          <p
            className="text-[10px] font-semibold uppercase"
            style={{ color: "var(--muted)", letterSpacing: "0.17em" }}
          >
            OSSERVATORIO / 01
          </p>
          <p
            className="mt-3 max-w-[280px] text-[1.15rem] leading-snug"
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              color: "var(--text)",
            }}
          >
            {lang === "it"
              ? "The Mentalist come lente. La psicologia come verifica."
              : "The Mentalist as the lens. Psychology as the check."}
          </p>
        </aside>
      </div>
    </section>
  );
}
