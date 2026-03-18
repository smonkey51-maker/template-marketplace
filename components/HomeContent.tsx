"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { templates, bundles, formatPrice, Template } from "@/lib/templates";
import TemplateGrid from "@/components/TemplateGrid";
import NavButtons from "@/components/NavButtons";
import { useLang } from "@/components/LanguageProvider";
import { t, templateTranslations } from "@/lib/i18n";
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

function BundlesDropdown({ lang, purchasedIds }: { lang: "it" | "en"; purchasedIds: string[] }) {
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
                <Link
                  key={bundle.id}
                  href={`/bundle/${bundle.id}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors group cursor-pointer"
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
                </Link>
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

// ── Marquee template cards ────────────────────────────────────────────────────

// Carefully picked template IDs for the two marquee rows
const ROW1_IDS = [
  "hero-saas", "restaurant-menu", "personal-finance-dashboard", "saas-dashboard",
  "digital-resume", "cold-email-b2b", "hotel-booking", "creative-agency-portfolio",
  "ecommerce-product-page", "saas-pricing-full",
];
const ROW2_IDS = [
  "pricing-table", "ai-assistant-system-prompt", "link-in-bio", "revenue-analytics",
  "coffee-shop-landing", "mobile-app-showcase", "airbnb-property-listing",
  "linkedin-prompt-pack", "invoice-html", "budget-tracker",
];

const tmplById = Object.fromEntries(templates.map((t) => [t.id, t]));
const marqueeTemplates = ROW1_IDS.map((id) => tmplById[id]).filter(Boolean);
const marqueeTemplates2 = ROW2_IDS.map((id) => tmplById[id]).filter(Boolean);

// Category gradient for marquee cards
const CARD_GRADIENTS: Record<string, string> = {
  "hero-saas":                 "from-indigo-900 to-purple-900",
  "restaurant-menu":           "from-red-900 to-orange-900",
  "personal-finance-dashboard":"from-emerald-900 to-teal-900",
  "saas-dashboard":            "from-slate-800 to-zinc-900",
  "digital-resume":            "from-blue-900 to-indigo-900",
  "cold-email-b2b":            "from-zinc-800 to-slate-900",
  "hotel-booking":             "from-amber-900 to-yellow-900",
  "creative-agency-portfolio": "from-pink-900 to-rose-900",
  "ecommerce-product-page":    "from-stone-800 to-neutral-900",
  "saas-pricing-full":         "from-violet-900 to-purple-900",
  "pricing-table":             "from-sky-900 to-blue-900",
  "ai-assistant-system-prompt":"from-zinc-900 to-slate-800",
  "link-in-bio":               "from-fuchsia-900 to-pink-900",
  "revenue-analytics":         "from-green-900 to-emerald-900",
  "coffee-shop-landing":       "from-orange-900 to-amber-900",
  "mobile-app-showcase":       "from-cyan-900 to-sky-900",
  "airbnb-property-listing":   "from-teal-900 to-cyan-900",
  "linkedin-prompt-pack":      "from-blue-800 to-indigo-900",
  "invoice-html":              "from-gray-800 to-zinc-900",
  "budget-tracker":            "from-lime-900 to-green-900",
};

function MarqueeCard({ tmpl, lang }: { tmpl: Template; lang: "it" | "en" }) {
  const name = lang === "it" ? (templateTranslations[tmpl.id]?.name ?? tmpl.name) : tmpl.name;
  const grad = CARD_GRADIENTS[tmpl.id] ?? "from-zinc-800 to-zinc-900";
  return (
    <Link
      href={`/preview/${tmpl.id}`}
      className={`flex-shrink-0 w-[200px] h-[120px] rounded-xl bg-gradient-to-br ${grad} overflow-hidden relative group cursor-pointer`}
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
      tabIndex={-1}
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-2.5" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
        <p className="text-white text-[11px] font-semibold leading-tight truncate">{name}</p>
        <p className="text-white/50 text-[10px]">{formatPrice(tmpl.price)}</p>
      </div>
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </Link>
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
              <BundlesDropdown lang={lang} purchasedIds={purchasedIds} />
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

          {/* ── Nav search — compact ── */}
          <div className="hidden sm:flex items-center relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" width="14" height="14" viewBox="0 0 20 20" fill="none">
              <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.7"/>
              <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); if (e.target.value) document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" }); }}
              placeholder={lang === "it" ? "Cerca…" : "Search…"}
              className="bg-input border border-theme rounded-xl pl-8 pr-3 py-1.5 text-[13px] text-theme placeholder:text-muted outline-none focus:border-[#0A84FF]/40 transition-all duration-200 w-36 focus:w-52"
              style={{ transition: "width 0.2s ease" }}
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-theme">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
              </button>
            )}
          </div>

          <NavButtons />
        </div>
        {bundleError && (
          <p className="text-center text-[12px] text-red-500 mt-1">{bundleError}</p>
        )}
      </nav>

      {/* ═══════════════════════════════════════════
          HERO — full redesign
      ═══════════════════════════════════════════ */}
      <section className="relative z-10 px-4 sm:px-6 pt-12 pb-0 overflow-hidden">
        <div className="max-w-5xl mx-auto">

          {/* ── Top row: badge + tagline ── */}
          <div className="flex flex-col items-center text-center mb-10 pt-8 sm:pt-12">

            {/* Badge */}
            <div className="anim-fade-up delay-0 inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 mb-6 select-none">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-50" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-zinc-400 dark:bg-zinc-500" />
              </span>
              {t[lang].hero.badge}
            </div>

            {/* Headline — bigger, bolder */}
            <h1 className="anim-fade-up delay-75 text-[2.6rem] sm:text-[3.6rem] md:text-[4.2rem] font-extrabold leading-[1.04] tracking-[-0.04em] mb-5 text-zinc-900 dark:text-white max-w-3xl">
              {lang === "it" ? (
                <>
                  Template UI pronti.<br />
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, var(--accent) 0%, #C77DFF 50%, #FF6B6B 100%)" }}>
                    Personalizzati con AI.
                  </span>
                </>
              ) : (
                <>
                  Premium templates.<br />
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, var(--accent) 0%, #C77DFF 50%, #FF6B6B 100%)" }}>
                    Customized with AI.
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="anim-fade-up delay-150 text-[16px] sm:text-[17px] text-muted max-w-xl mx-auto mb-8 leading-relaxed font-normal">
              {lang === "it"
                ? "Compra un template professionale, poi adattalo in secondi con Claude AI. Nessun codice."
                : "Buy a professional template, then adapt it in seconds with Claude AI. No code required."}
            </p>

            {/* CTAs */}
            <div className="anim-fade-up delay-200 flex flex-col sm:flex-row items-center gap-3 mb-8">
              {/* Primary CTA */}
              <a
                href="#browse"
                onClick={(e) => { e.preventDefault(); document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white text-[15px] active:scale-[0.97] transition-all duration-200 shadow-lg"
                style={{ background: "linear-gradient(135deg, var(--accent), #9B59FF)", boxShadow: "0 8px 32px rgba(91,76,245,0.35)" }}
              >
                {lang === "it" ? "Sfoglia i template" : "Browse templates"}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-80">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              {/* AI Studio CTA */}
              <Link
                href="/studio"
                className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-[14px] font-semibold transition-all duration-200 border"
                style={{
                  background: "linear-gradient(135deg, rgba(167,139,250,0.07), rgba(139,92,246,0.05))",
                  borderColor: "rgba(167,139,250,0.22)",
                  color: "var(--accent)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse" style={{ background: "var(--accent)" }} />
                {lang === "it" ? "Prova l'AI Studio" : "Try AI Studio"}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-0.5 transition-transform duration-200 opacity-70">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="anim-fade-up delay-300 flex flex-wrap items-center justify-center gap-4 text-[12px] text-muted">
              <span className="flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l3 3 6-6" stroke="#30D158" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {animatedTemplates} {lang === "it" ? "template pronti" : "templates ready"}
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">·</span>
              <span className="flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l3 3 6-6" stroke="#30D158" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {lang === "it" ? "Pagamento sicuro Stripe" : "Secure Stripe payment"}
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">·</span>
              <span className="flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l3 3 6-6" stroke="#30D158" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {lang === "it" ? "Accesso immediato" : "Instant access"}
              </span>
            </div>
          </div>

          {/* ── Template marquee strip ── */}
          <div className="relative -mx-4 sm:-mx-6 overflow-hidden pb-12">
            {/* fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, var(--bg), transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, var(--bg), transparent)" }} />

            {/* Row 1 — scrolls left */}
            <div className="flex gap-3 mb-3" style={{ animation: "marquee-left 32s linear infinite", width: "max-content" }}>
              {[...marqueeTemplates, ...marqueeTemplates].map((tmpl, i) => (
                <MarqueeCard key={`r1-${i}`} tmpl={tmpl} lang={lang} />
              ))}
            </div>
            {/* Row 2 — scrolls right */}
            <div className="flex gap-3" style={{ animation: "marquee-right 28s linear infinite", width: "max-content" }}>
              {[...marqueeTemplates2, ...marqueeTemplates2].map((tmpl, i) => (
                <MarqueeCard key={`r2-${i}`} tmpl={tmpl} lang={lang} />
              ))}
            </div>
          </div>

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
