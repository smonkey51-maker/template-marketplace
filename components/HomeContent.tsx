"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { templates, bundles, formatPrice } from "@/lib/templates";
import TemplateGrid from "@/components/TemplateGrid";
import NavButtons from "@/components/NavButtons";
import { useLang } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";
import EmailCapture from "@/components/EmailCapture";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

// ── Dropdown nav ────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "professionals",    emoji: "🏢", labelIt: "Professionisti",          labelEn: "Professionals" },
  { id: "lifestyle-finance",emoji: "🏡", labelIt: "Lifestyle & Finanza",     labelEn: "Lifestyle & Finance" },
  { id: "business",         emoji: "🛍️", labelIt: "Business",               labelEn: "Business" },
  { id: "startup",          emoji: "🚀", labelIt: "Startup & Lancio",        labelEn: "Startup & Launch" },
  { id: "creative",         emoji: "🎨", labelIt: "Agenzie & Freelance",     labelEn: "Agencies & Freelance" },
  { id: "copywriting-ai",   emoji: "✍️", labelIt: "Copywriting & AI",        labelEn: "Copywriting & AI" },
  { id: "ai-productivity",  emoji: "🤖", labelIt: "AI & Produttività",       labelEn: "AI & Productivity" },
  { id: "hospitality",      emoji: "🍽️", labelIt: "Ristorazione",           labelEn: "Hospitality" },
  { id: "digital-product",  emoji: "📱", labelIt: "App & Prodotto digitale", labelEn: "App & Digital" },
  { id: "personal-brand",   emoji: "🪪", labelIt: "Personal Brand",          labelEn: "Personal Brand" },
  { id: "notion-workspace", emoji: "📓", labelIt: "Notion Workspace",        labelEn: "Notion Workspace" },
];

const STEPS = [
  { n: "01", icon: "🔍", titleIt: "Scegli un template",    titleEn: "Choose a template",    descIt: "Anteprima completa prima di acquistare.", descEn: "Full preview before buying." },
  { n: "02", icon: "⚡", titleIt: "Acquista in un click",  titleEn: "Buy in one click",      descIt: "Pagamento sicuro con Stripe.",            descEn: "Secure Stripe payment." },
  { n: "03", icon: "🤖", titleIt: "Personalizza con AI",   titleEn: "Customize with AI",     descIt: "Claude AI applica le tue modifiche.",     descEn: "Claude AI applies your changes." },
];

function TemplatesDropdown({ lang }: { lang: "it" | "en" }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 w-[580px] max-w-[calc(100vw-2rem)]">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
        <div className="grid grid-cols-[180px_1fr] divide-x divide-zinc-100 dark:divide-zinc-800">
          {/* Left: steps */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950/50">
            <p className="text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-3 px-1">
              {lang === "it" ? "Come funziona" : "How it works"}
            </p>
            <div className="flex flex-col gap-1">
              {STEPS.map((s) => (
                <div key={s.n} className="flex items-start gap-2.5 px-2 py-2.5 rounded-xl">
                  <div className="w-7 h-7 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-sm flex-shrink-0 shadow-sm">
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 mb-0.5">{s.n}</p>
                    <p className="text-[12px] font-semibold text-zinc-800 dark:text-zinc-200 leading-tight">
                      {lang === "it" ? s.titleIt : s.titleEn}
                    </p>
                    <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5 leading-tight">
                      {lang === "it" ? s.descIt : s.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right: categories */}
          <div className="p-4">
            <p className="text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-3 px-1">
              {lang === "it" ? "Categorie" : "Categories"}
            </p>
            <div className="grid grid-cols-2 gap-0.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    const el = document.getElementById(`section-${cat.id}`);
                    if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); }
                    else {
                      const browse = document.getElementById("browse");
                      browse?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors group"
                >
                  <span className="text-sm flex-shrink-0">{cat.emoji}</span>
                  <span className="text-[12px] font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white leading-tight">
                    {lang === "it" ? cat.labelIt : cat.labelEn}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Footer hint */}
        <div className="px-4 py-2.5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/50">
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
            {templates.length} {lang === "it" ? "template disponibili" : "templates available"}
          </span>
          <button
            onClick={() => document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" })}
            className="text-[11px] font-semibold text-blue-500 hover:text-blue-400 transition-colors"
          >
            {lang === "it" ? "Vedi tutti →" : "Browse all →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function BundlesDropdown({
  lang,
  purchasedIds,
  onBuy,
}: {
  lang: "it" | "en";
  purchasedIds: string[];
  onBuy: (bundleId: string) => void;
}) {
  const accentMap: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-500",
    violet: "bg-violet-500/10 text-violet-500",
    emerald: "bg-emerald-500/10 text-emerald-500",
    purple: "bg-purple-500/10 text-purple-500",
    amber: "bg-amber-500/10 text-amber-500",
    orange: "bg-orange-500/10 text-orange-500",
  };

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 w-[440px] max-w-[calc(100vw-2rem)]">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
        <div className="p-3">
          <p className="text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-2 px-2">
            {lang === "it" ? "Bundle — risparmia fino al 55%" : "Bundles — save up to 55%"}
          </p>
          <div className="space-y-0.5">
            {bundles.map((bundle) => {
              const ownedCount = bundle.templateIds.filter((id) => purchasedIds.includes(id)).length;
              const fullyOwned = ownedCount === bundle.templateIds.length;
              return (
                <div
                  key={bundle.id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors group cursor-pointer"
                  onClick={() => !fullyOwned && onBuy(bundle.id)}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${accentMap[bundle.accentColor] ?? "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"}`}>
                    {bundle.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white leading-tight">
                      {bundle.name}
                    </p>
                    <p className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate leading-tight mt-0.5">
                      {bundle.tagline}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {fullyOwned ? (
                      <span className="text-[11px] text-emerald-500 font-semibold">✓ {lang === "it" ? "Tuo" : "Owned"}</span>
                    ) : (
                      <>
                        <p className="text-[13px] font-bold text-zinc-800 dark:text-zinc-200">{formatPrice(bundle.price)}</p>
                        <p className="text-[10px] text-zinc-400 line-through">{formatPrice(bundle.regularPrice)}</p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="px-5 py-2.5 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
            🎁 {lang === "it" ? "Ogni bundle ha accesso permanente + AI Studio incluso" : "Every bundle includes permanent access + AI Studio"}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── NavDropdown wrapper ──────────────────────────────────────────────────────
function NavDropdown({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 text-[14px] px-3 py-1.5 rounded-xl transition-colors duration-200 ${
          open
            ? "text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800"
            : "text-muted hover:text-theme hover:bg-card"
        }`}
      >
        {label}
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div onClick={() => setOpen(false)}>
          {children}
        </div>
      )}
    </div>
  );
}

// ── Hero search ──────────────────────────────────────────────────────────────
function HeroSearch({
  lang,
  query,
  setQuery,
}: {
  lang: "it" | "en";
  query: string;
  setQuery: (q: string) => void;
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        width="16" height="16" viewBox="0 0 20 20" fill="none"
      >
        <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={lang === "it" ? "Cerca tra tutti i template…" : "Search all templates…"}
        className="w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-zinc-200 dark:border-zinc-700 rounded-2xl pl-11 pr-32 py-3.5 text-[15px] text-zinc-900 dark:text-white placeholder:text-muted outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200 shadow-sm"
      />
      {query ? (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl text-[13px] font-semibold text-muted hover:text-theme transition-colors duration-200"
        >
          ✕
        </button>
      ) : (
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl text-[13px] font-bold text-white transition-all duration-200 active:scale-[0.97]"
          style={{ backgroundColor: "var(--accent)" }}
        >
          {lang === "it" ? "Cerca" : "Search"}
        </button>
      )}
    </form>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function HomeContent() {
  const { lang } = useLang();
  const router = useRouter();
  const animatedTemplates = templates.length;

  // Shared search query — lifted so hero search bar drives TemplateGrid
  const [query, setQuery] = useState("");

  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [bundleError, setBundleError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/purchases")
      .then((r) => r.ok ? r.json() : { templateIds: [] })
      .then((data) => setPurchasedIds(data.templateIds ?? []))
      .catch(() => {});
  }, []);

  const handleBundleBuy = useCallback(async (bundleId: string) => {
    setBundleError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bundleId }),
      });
      if (!res.ok) throw new Error("checkout_failed");
      const data = await res.json();
      if (data.url) router.push(data.url);
      else throw new Error("no_url");
    } catch {
      setBundleError(lang === "it"
        ? "Errore durante il checkout. Riprova."
        : "Checkout failed. Please try again.");
    }
  }, [router, lang]);

  return (
    <div className="min-h-screen bg-page relative overflow-x-hidden">

      {/* ── Hero ambient glow ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: "-180px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle, var(--accent-bg) 0%, transparent 68%)",
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 border-b border-theme bg-nav backdrop-blur-xl px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

          {/* Brand */}
          <span className="text-[17px] font-bold tracking-tight text-zinc-900 dark:text-white shrink-0 select-none">
            TemplateLab
          </span>

          {/* Desktop nav links + dropdowns */}
          <div className="hidden sm:flex items-center gap-0.5">
            <NavDropdown label={lang === "it" ? "Template" : "Templates"}>
              <TemplatesDropdown lang={lang} />
            </NavDropdown>
            <NavDropdown label={lang === "it" ? "Bundle" : "Bundles"}>
              <BundlesDropdown lang={lang} purchasedIds={purchasedIds} onBuy={handleBundleBuy} />
            </NavDropdown>
            <Link
              href="/guide"
              className="text-[14px] text-muted hover:text-theme transition-colors duration-200 px-3 py-1.5 rounded-xl hover:bg-card"
            >
              {t[lang].nav.guide}
            </Link>
            <Link
              href="/studio"
              className="text-[14px] text-muted hover:text-theme transition-colors duration-200 px-3 py-1.5 rounded-xl hover:bg-card"
            >
              {t[lang].nav.studio}
            </Link>
            <Link
              href="/account"
              className="text-[14px] text-muted hover:text-theme transition-colors duration-200 px-3 py-1.5 rounded-xl hover:bg-card"
            >
              {t[lang].nav.account}
            </Link>
          </div>

          <NavButtons />
        </div>
        {bundleError && (
          <p className="text-center text-[12px] text-red-500 mt-1">{bundleError}</p>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 px-4 sm:px-6 pt-14 pb-12 sm:pt-20 sm:pb-16 text-center max-w-2xl mx-auto">

        {/* Badge */}
        <div className="anim-fade-up delay-0 inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 mb-5 select-none">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-50" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-zinc-400 dark:bg-zinc-500" />
          </span>
          {t[lang].hero.badge}
        </div>

        {/* Heading */}
        <h1 className="anim-fade-up delay-75 text-[2rem] sm:text-[2.9rem] md:text-[3.4rem] font-black leading-[1.06] tracking-[-0.03em] mb-4 text-zinc-900 dark:text-white">
          {t[lang].hero.titleStart}{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, var(--accent), #C77DFF)" }}
          >
            {t[lang].hero.titleGradient.split("\n").map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </span>{" "}
          {t[lang].hero.titleEnd}
        </h1>

        {/* Subtitle */}
        <p className="anim-fade-up delay-150 text-[15px] sm:text-[16px] text-muted max-w-md mx-auto mb-8 leading-relaxed">
          {t[lang].hero.subtitle}
        </p>

        {/* ── Prominent search bar ── */}
        <div className="anim-fade-up delay-200 mb-6">
          <HeroSearch lang={lang} query={query} setQuery={setQuery} />
        </div>

        {/* AI Studio CTA — subtle but unmissable */}
        <div className="anim-fade-up delay-225 flex items-center justify-center">
          <Link
            href="/studio"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 border"
            style={{
              background: "linear-gradient(135deg, rgba(167,139,250,0.08), rgba(139,92,246,0.06))",
              borderColor: "rgba(167,139,250,0.25)",
              color: "var(--accent)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "var(--accent)", boxShadow: "0 0 6px var(--accent)" }}
            />
            {t[lang].hero.cta2}
            <svg
              width="12" height="12" viewBox="0 0 12 12" fill="none"
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            >
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Trust line */}
        <div className="anim-fade-up delay-300 flex items-center justify-center gap-3 mt-6 text-[12px] text-muted">
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-emerald-500">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {animatedTemplates} {t[lang].hero.statTemplates}
          </span>
          <span className="w-px h-3 bg-zinc-300 dark:bg-zinc-700" />
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-emerald-500">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t[lang].hero.statPayment}
          </span>
        </div>
      </section>

      {/* ── Template Grid ── */}
      <div className="relative z-10">
        <TemplateGrid externalQuery={query} />
      </div>

      {/* ── Newsletter — subtle ── */}
      <div className="relative z-10 border-t border-theme">
        <EmailCapture />
      </div>

      {/* ── Quote ── */}
      <div className="relative z-10 border-t border-theme px-4 sm:px-6 py-10">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[13px] text-muted/60 font-mono tracking-wide mb-2 select-none">
            {lang === "it" ? "— ogni grande prodotto inizia con un template —" : "— every great product starts with a template —"}
          </p>
          <p className="text-[11px] text-zinc-300 dark:text-zinc-600 italic">
            {lang === "it"
              ? "\"Il perfetto è nemico del fatto. Il template è amico di entrambi.\""
              : "\"Perfect is the enemy of done. A template is a friend of both.\""}
          </p>
        </div>
      </div>

      {/* ── Footer ── */}
      <Footer />

      <ScrollToTop />
    </div>
  );
}
