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
import { useToast } from "@/components/Toast";
import ScrollProgressBar from "@/components/home/ScrollProgressBar";
import TemplatesDropdown from "@/components/home/TemplatesDropdown";
import BundlesDropdown from "@/components/home/BundlesDropdown";
import HeroSection from "@/components/home/HeroSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import { CATEGORIES, BUNDLE_GRADIENTS } from "@/lib/homeData";

// ── Count-up hook (local — only used in this file) ───────────────────────────
function useCountUp(target: number, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!target) return;
    const t0 = performance.now();
    function step(now: number) {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [target, duration]);
  return value;
}

// ── Dropdown nav ────────────────────────────────────────────────────────────
// CATEGORIES, STEPS, TESTIMONIALS, BUNDLE_GRADIENTS → imported from @/lib/homeData
// TestimonialCard → imported from @/components/home/TestimonialCard
// TemplatesDropdown → imported from @/components/home/TemplatesDropdown
// BundlesDropdown → imported from @/components/home/BundlesDropdown

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
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) { setOpen(false); }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const focusMenuItems = (direction: "first" | "last" | "next" | "prev") => {
    const items = ref.current?.querySelectorAll<HTMLElement>('[role="menuitem"], a, button:not([aria-haspopup])');
    if (!items || items.length === 0) return;
    const arr = Array.from(items).filter((el) => !el.closest('[aria-hidden="true"]'));
    if (arr.length === 0) return;
    const idx = arr.indexOf(document.activeElement as HTMLElement);
    if (direction === "first") arr[0]?.focus();
    else if (direction === "last") arr[arr.length - 1]?.focus();
    else if (direction === "next") arr[Math.min(idx + 1, arr.length - 1)]?.focus();
    else if (direction === "prev") arr[Math.max(idx - 1, 0)]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((o) => !o);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      setTimeout(() => focusMenuItems("first"), 50);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) setOpen(true);
      setTimeout(() => focusMenuItems("last"), 50);
    }
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusMenuItems("next");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusMenuItems("prev");
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex items-center gap-1 text-[14px] px-3 py-1.5 rounded-none transition-colors duration-200 ${
          open
            ? "bg-surface text-theme"
            : "text-muted hover:text-theme hover:bg-card"
        }`}
      >
        <span className="link-underline">{label}</span>
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {/* Always rendered — animated with opacity + transform */}
      <div
        role="menu"
        onKeyDown={handleMenuKeyDown}
        className="transition-all duration-[180ms] ease-out"
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transform: open ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.97)",
          transformOrigin: "top center",
        }}
        aria-hidden={!open}
      >
        {children}
      </div>
    </div>
  );
}

// ── Bundle scroll section ─────────────────────────────────────────────────────
// BUNDLE_GRADIENTS → imported from @/lib/homeData

function BundleScrollCard({ bundle, purchasedIds, onBuy, lang }: {
  bundle: typeof bundles[number];
  purchasedIds: string[];
  onBuy: (id: string) => Promise<void>;
  lang: "it" | "en";
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const g = BUNDLE_GRADIENTS[bundle.accentColor] ?? BUNDLE_GRADIENTS.blue;
  const savings = bundle.regularPrice - bundle.price;
  const savingsPct = Math.round((savings / bundle.regularPrice) * 100);
  const isOwned = bundle.templateIds.every((id) => purchasedIds.includes(id));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(1)}deg) rotateY(${(x * 5).toFixed(1)}deg) scale3d(1.02,1.02,1.02)`;
    });
  };
  const handleMouseLeave = () => {
    cancelAnimationFrame(rafRef.current);
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform .5s cubic-bezier(.34,1.2,.64,1)";
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    setTimeout(() => { if (el) el.style.transition = ""; }, 500);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => router.push(`/bundle/${bundle.id}`)}
      className="flex-shrink-0 w-[290px] sm:w-[330px] rounded-none overflow-hidden cursor-pointer flex flex-col"
      style={{ scrollSnapAlign: "start", willChange: "transform", background: g.bg, boxShadow: `0 8px 40px rgba(${g.glow},0.18), 0 2px 10px rgba(0,0,0,0.4)` }}
    >
      {/* Card body */}
      <div className="flex-1 px-5 pt-6 pb-4 relative">
        {/* Glow spot */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, rgba(${g.glow},0.18) 0%, transparent 70%)`, transform: "translate(30%,-30%)" }} />
        {/* Discount badge */}
        <span className="absolute top-4 right-4 text-[11px] font-black rounded-none px-2.5 py-1 border" style={{ background: g.badgeBg, color: g.accent, borderColor: `rgba(${g.glow},0.4)` }}>
          –{savingsPct}%
        </span>
        {/* Emoji */}
        <div className="text-4xl mb-4">{bundle.emoji}</div>
        {/* Name & tagline */}
        <h3 className="text-[17px] font-black text-white leading-tight mb-1.5">{bundle.name}</h3>
        <p className="text-[12px] leading-snug" style={{ color: g.accent }}>{bundle.tagline}</p>
        {/* Template count chips */}
        <div className="flex items-center gap-1.5 mt-4 flex-wrap">
          {Array.from({ length: Math.min(bundle.templateIds.length, 5) }).map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-none border border-white/15 bg-white/8 flex items-center justify-center text-[9px] text-white/50 font-bold">{i + 1}</div>
          ))}
          <span className="text-[11px] text-white/35 ml-0.5">{bundle.templateIds.length} template</span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-5 pb-5 pt-4 bg-black/25 relative">
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: `linear-gradient(90deg,transparent,rgba(${g.glow},0.4),transparent)` }} />
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-[22px] font-black text-white leading-none">{formatPrice(bundle.price)}</p>
            <p className="text-[11px] text-white/35 line-through mt-0.5">{formatPrice(bundle.regularPrice)}</p>
          </div>
          <p className="text-[11px] font-bold mb-0.5" style={{ color: g.accent }}>
            {lang === "it" ? `Risparmi ${formatPrice(savings)}` : `Save ${formatPrice(savings)}`}
          </p>
        </div>
        {isOwned ? (
          <div className="w-full py-2.5 rounded-none text-center text-[13px] font-bold text-white/40 bg-white/5 border border-white/10">
            {lang === "it" ? "✓ Già acquistato" : "✓ Already owned"}
          </div>
        ) : (
          <button
            onClick={async (e) => { e.stopPropagation(); setLoading(true); try { await onBuy(bundle.id); } finally { setLoading(false); } }}
            disabled={loading}
            className="w-full py-2.5 rounded-none text-[13px] font-bold text-white transition-opacity duration-200 active:scale-[0.97] disabled:opacity-50 border"
            style={{ background: `rgba(${g.glow},0.3)`, borderColor: `rgba(${g.glow},0.5)` }}
          >
            {loading ? "…" : lang === "it" ? `Acquista — ${formatPrice(bundle.price)}` : `Buy — ${formatPrice(bundle.price)}`}
          </button>
        )}
      </div>
    </div>
  );
}

function BundleShowcase({ lang, purchasedIds, onBuy }: { lang: "it" | "en"; purchasedIds: string[]; onBuy: (id: string) => Promise<void> }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scroll = (dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = window.innerWidth < 640 ? 290 + 16 : 330 + 16;
    el.scrollBy({ left: dir === "next" ? cardW : -cardW, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => {
      const cardW = window.innerWidth < 640 ? 290 + 16 : 330 + 16;
      setActiveIdx(Math.min(Math.round(el.scrollLeft / cardW), bundles.length - 1));
    };
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="relative z-10 border-t border-theme py-12 overflow-hidden">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-7 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-2">Bundle</p>
          <h2 className="text-[1.5rem] sm:text-[1.9rem] font-extrabold tracking-tight text-theme">
            {lang === "it" ? "Risparmia di più, crea di più" : "Save more, build more"}
          </h2>
          <p className="text-[13px] text-muted mt-1.5">
            {lang === "it" ? "Fino al 55% di sconto rispetto all'acquisto singolo." : "Up to 55% off vs. buying individually."}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button onClick={() => scroll("prev")} aria-label="Precedente" className="w-9 h-9 flex items-center justify-center rounded-none border border-theme bg-card hover:bg-surface text-muted hover:text-theme transition-colors">
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M6 1L1 6l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button onClick={() => scroll("next")} aria-label="Successivo" className="w-9 h-9 flex items-center justify-center rounded-none border border-theme bg-card hover:bg-surface text-muted hover:text-theme transition-colors">
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>

      {/* Scroll rail */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-4 sm:px-6 pb-3"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        {bundles.map((bundle) => (
          <BundleScrollCard key={bundle.id} bundle={bundle} purchasedIds={purchasedIds} onBuy={onBuy} lang={lang} />
        ))}
        {/* Trailing spacer so last card doesn't hug the edge */}
        <div className="flex-shrink-0 w-4 sm:w-6" />
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {bundles.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const el = scrollRef.current;
              if (!el) return;
              const cardW = window.innerWidth < 640 ? 290 + 16 : 330 + 16;
              el.scrollTo({ left: i * cardW, behavior: "smooth" });
              setActiveIdx(i);
            }}
            className={`rounded-full transition-all duration-300 ${i === activeIdx ? "w-5 h-1.5" : "w-1.5 h-1.5"}`}
            style={{ background: i === activeIdx ? "var(--text)" : "var(--border)" }}
            aria-label={`Bundle ${i + 1}`}
          />
        ))}
      </div>
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
  "hero-saas":                 "from-[#2a2010] to-[#0d0b08]",
  "restaurant-menu":           "from-[#3a1a0a] to-[#0d0b08]",
  "personal-finance-dashboard":"from-[#1a2810] to-[#0d0b08]",
  "saas-dashboard":            "from-[#1e1a16] to-[#0d0b08]",
  "digital-resume":            "from-[#2a2010] to-[#161310]",
  "cold-email-b2b":            "from-[#161310] to-[#0d0b08]",
  "hotel-booking":             "from-[#3d2e14] to-[#0d0b08]",
  "creative-agency-portfolio": "from-[#3a1a0a] to-[#161310]",
  "ecommerce-product-page":    "from-[#1e1a16] to-[#0d0b08]",
  "saas-pricing-full":         "from-[#2a2010] to-[#0d0b08]",
  "pricing-table":             "from-[#3d2e14] to-[#161310]",
  "ai-assistant-system-prompt":"from-[#161310] to-[#0d0b08]",
  "link-in-bio":               "from-[#3a1a0a] to-[#0d0b08]",
  "revenue-analytics":         "from-[#1a2810] to-[#0d0b08]",
  "coffee-shop-landing":       "from-[#4a2510] to-[#0d0b08]",
  "mobile-app-showcase":       "from-[#2a2010] to-[#161310]",
  "airbnb-property-listing":   "from-[#1e1a16] to-[#0d0b08]",
  "linkedin-prompt-pack":      "from-[#3d2e14] to-[#0d0b08]",
  "invoice-html":              "from-[#1e1a16] to-[#0d0b08]",
  "budget-tracker":            "from-[#1a2810] to-[#0d0b08]",
};

function MarqueeCard({ tmpl, lang }: { tmpl: Template; lang: "it" | "en" }) {
  const name = lang === "it" ? (templateTranslations[tmpl.id]?.name ?? tmpl.name) : tmpl.name;
  const grad = CARD_GRADIENTS[tmpl.id] ?? "from-[#1e1a16] to-[#0d0b08]";
  return (
    <Link
      href={`/preview/${tmpl.id}`}
      className={`flex-shrink-0 w-[200px] h-[120px] rounded-none bg-gradient-to-br ${grad} overflow-hidden relative group cursor-pointer`}
      style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)" }}
      tabIndex={-1}
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "20px 20px" }} />

      {/* Browser chrome bar */}
      <div className="absolute top-0 left-0 right-0 h-[22px] flex items-center px-2.5 gap-1.5" style={{ background: "rgba(0,0,0,0.28)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex gap-[3px]">
          <div className="w-[5px] h-[5px] rounded-full bg-[#FF5F57] opacity-75" />
          <div className="w-[5px] h-[5px] rounded-full bg-[#FFBD2E] opacity-75" />
          <div className="w-[5px] h-[5px] rounded-full bg-[#28C840] opacity-75" />
        </div>
        <span className="ml-auto text-[7px] font-semibold text-white/25 uppercase tracking-[0.1em]">
          {tmpl.category === "ui" ? "UI" : "AI"}
        </span>
      </div>

      {/* Top-edge specular line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 px-2.5 pt-4 pb-2.5" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }}>
        <p className="text-white text-[11px] font-semibold leading-tight truncate">{name}</p>
        <p className="text-white/40 text-[9px] mt-0.5 font-medium">{formatPrice(tmpl.price)}</p>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.05] transition-colors duration-300" />
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
  const [marqueePaused, setMarqueePaused] = useState(false);
  const toast = useToast();

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandTemplates, setMobileExpandTemplates] = useState(false);
  const [mobileExpandBundles, setMobileExpandBundles] = useState(false);

  const countedTemplates = useCountUp(animatedTemplates);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setMobileMenuOpen(false); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    fetch("/api/purchases")
      .then((r) => r.ok ? r.json() : { templateIds: [] })
      .then((data) => setPurchasedIds(data.templateIds ?? []))
      .catch(() => {});
  }, []);

  const handleBundleBuy = useCallback(async (bundleId: string) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bundleId }),
      });
      if (!res.ok) throw new Error("checkout_failed");
      const data = await res.json();
      if (data.requireAuth) { window.location.href = "/sign-in?redirect_url=/"; return; }
      if (data.url) router.push(data.url);
      else throw new Error("no_url");
    } catch {
      toast(lang === "it" ? "Errore durante il checkout. Riprova." : "Checkout failed. Please try again.", "error");
    }
  }, [router, lang, toast]);

  return (
    <div className="min-h-screen bg-page relative overflow-x-hidden anim-page-enter">
      <ScrollProgressBar />

      {/* no ambient glow in hybrid — grain overlay handles warmth */}

      {/* ── Hybrid Nav ── */}
      <nav
        className="sticky top-0 z-50 border-b backdrop-blur-[14px] px-4 sm:px-8"
        style={{ background: "var(--nav-bg)", borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center h-[60px] gap-3">
          {/* Logo */}
          <Link href="/" className="shrink-0 flex flex-col gap-0.5 mr-4 hover:opacity-80 transition-opacity">
            <span className="text-[15px] leading-none tracking-[0.06em] uppercase" style={{ fontFamily: "var(--font-syne)", fontWeight: 800, color: "var(--text)" }}>
              Template<span style={{ color: "var(--accent)" }}>Lab</span>
            </span>
            <span className="hidden sm:block text-[8px] tracking-[0.18em] uppercase leading-none" style={{ color: "var(--accent)", opacity: 0.65, fontWeight: 500 }}>
              {lang === "it" ? "Mercato del digitale artigianale" : "Artisan digital marketplace"}
            </span>
          </Link>

          {/* Mobile spacer + hamburger */}
          <div className="sm:hidden flex-1" />
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="sm:hidden flex items-center justify-center w-10 h-10 -mr-1"
            style={{ color: "var(--muted)" }}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-0.5">
            <NavDropdown label={lang === "it" ? "Template" : "Templates"}>
              <TemplatesDropdown lang={lang} />
            </NavDropdown>
            <NavDropdown label={lang === "it" ? "Bundle" : "Bundles"}>
              <BundlesDropdown lang={lang} purchasedIds={purchasedIds} />
            </NavDropdown>
            {[
              { href: "/guide",   it: "Guida",     en: "Guide" },
              { href: "/studio",  it: "AI Studio",  en: "AI Studio" },
              { href: "/account", it: "Account",    en: "Account" },
            ].map((l) => (
              <Link key={l.href} href={l.href}
                className="text-[11px] font-medium px-3 py-1.5 uppercase tracking-[0.1em] transition-colors duration-200 text-muted hover:text-theme"
              >
                <span className="link-underline">{lang === "it" ? l.it : l.en}</span>
              </Link>
            ))}
          </div>

          <div className="flex-1" />

          {/* Desktop search */}
          <div className="hidden sm:flex items-center relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ color: "var(--muted)" }}>
              <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.7"/>
              <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim()) {
                  document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              placeholder={lang === "it" ? "Cerca template, es. landing page…" : "Search templates, e.g. landing page…"}
              className="pl-8 pr-3 py-1.5 text-[12px] outline-none w-32 focus:w-52 transition-all duration-200"
              style={{
                background: "var(--input-bg)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                caretColor: "var(--accent)",
              }}
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2" style={{ color: "var(--muted)" }}>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
              </button>
            )}
          </div>

          {/* Studio Access CTA — hidden on tight viewports to make room for toggles */}
          <Link
            href="/studio"
            className="hidden lg:inline-flex btn-brand btn-brand-sm ml-2"
          >
            Studio Access
          </Link>

          <NavButtons showMobileLinks={false} />
        </div>
      </nav>

      {/* ── Mobile menu overlay ── */}
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm sm:hidden transition-opacity duration-300"
        style={{ opacity: mobileMenuOpen ? 1 : 0, pointerEvents: mobileMenuOpen ? "auto" : "none" }}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden
      />
      {/* Slide-down panel */}
      <div
        className="fixed top-0 left-0 right-0 z-[95] bg-page border-b border-theme shadow-2xl sm:hidden max-h-[90vh] overflow-y-auto"
        style={{
          transform: mobileMenuOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s cubic-bezier(0.32,0.72,0,1)",
        }}
        aria-modal={mobileMenuOpen}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-theme">
          <span className="text-[17px] font-bold tracking-tight text-theme">
            TemplateLab
          </span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-none text-muted hover:text-theme hover:bg-card transition-colors"
            aria-label="Close menu"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-theme">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" width="14" height="14" viewBox="0 0 20 20" fill="none">
              <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.7"/>
              <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              defaultValue={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim()) {
                  setMobileMenuOpen(false);
                  setTimeout(() => document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" }), 150);
                }
              }}
              placeholder={lang === "it" ? "Cerca template, es. landing page…" : "Search templates, e.g. landing page…"}
              className="w-full bg-input border border-theme rounded-none pl-9 pr-9 py-2.5 text-[14px] text-theme placeholder:text-muted outline-none focus:border-accent transition-colors"
            />
            {/* Search submit button */}
            <button
              onClick={() => {
                if (query.trim()) {
                  setMobileMenuOpen(false);
                  setTimeout(() => document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" }), 150);
                }
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-accent transition-colors"
              aria-label={lang === "it" ? "Cerca" : "Search"}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Nav items */}
        <div className="px-2 py-2">

          {/* Templates accordion */}
          <button
            onClick={() => setMobileExpandTemplates((o) => !o)}
            className="w-full flex items-center justify-between px-3 py-3 rounded-none text-[14px] font-semibold text-theme hover:bg-card transition-colors"
          >
            <span className="link-underline">{lang === "it" ? "Template" : "Templates"}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
              className={`text-muted transition-transform duration-200 ${mobileExpandTemplates ? "rotate-180" : ""}`}>
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {mobileExpandTemplates && (
            <div className="px-2 pb-2 grid grid-cols-2 gap-0.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setTimeout(() => document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" }), 150);
                  }}
                  className="flex items-center gap-2 px-2.5 py-2.5 rounded-none text-left hover:bg-card transition-colors"
                >
                  <span className="text-sm flex-shrink-0">{cat.emoji}</span>
                  <span className="text-[12px] text-muted leading-tight">{lang === "it" ? cat.labelIt : cat.labelEn}</span>
                </button>
              ))}
            </div>
          )}

          {/* Bundles accordion */}
          <button
            onClick={() => setMobileExpandBundles((o) => !o)}
            className="w-full flex items-center justify-between px-3 py-3 rounded-none text-[14px] font-semibold text-theme hover:bg-card transition-colors"
          >
            <span className="link-underline">{lang === "it" ? "Bundle" : "Bundles"}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
              className={`text-muted transition-transform duration-200 ${mobileExpandBundles ? "rotate-180" : ""}`}>
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {mobileExpandBundles && (
            <div className="px-2 pb-2 space-y-0.5">
              {bundles.map((bundle) => (
                <Link
                  key={bundle.id}
                  href={`/bundle/${bundle.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-none hover:bg-card transition-colors"
                >
                  <span className="text-lg">{bundle.emoji}</span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-theme leading-tight">{bundle.name}</p>
                    <p className="text-[11px] text-muted">{formatPrice(bundle.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Other links */}
          <div className="mt-1 pt-1 border-t border-theme/50 space-y-0.5">
            <Link href="/guide" onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-3 py-3 rounded-none hover:bg-card transition-colors">
              <span className="text-[14px] font-medium text-theme link-underline">{t[lang].nav.guide}</span>
            </Link>
            <Link href="/studio" onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-3 py-3 rounded-none hover:bg-card transition-colors">
              <span className="text-[14px] font-medium text-theme link-underline">{t[lang].nav.studio}</span>
            </Link>
            <Link href="/account" onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-3 py-3 rounded-none hover:bg-card transition-colors">
              <span className="text-[14px] font-medium text-theme link-underline">{t[lang].nav.account}</span>
            </Link>
          </div>

          {/* Mobile Studio Access CTA */}
          <div className="px-3 pt-3 pb-2 border-t border-theme/50">
            <Link
              href="/studio"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-brand w-full justify-center text-[12px]"
              style={{ padding: "14px 20px" }}
            >
              {lang === "it" ? "Inizia con Studio Access →" : "Start with Studio Access →"}
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          HYBRID TICKER
      ═══════════════════════════════════════════ */}
      <div className="border-b overflow-hidden py-[9px]" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="flex gap-[72px] white-space-nowrap ticker-animate" style={{ width: "max-content", whiteSpace: "nowrap" }}>
          {[
            "UI Template", "Prompt Pack", lang === "it" ? "Personalizzabili con Claude AI" : "Customize with Claude AI",
            `N° ${countedTemplates} ${lang === "it" ? "pezzi in catalogo" : "templates available"}`,
            "Editor's Pick", "Startup · SaaS · Portfolio",
            "UI Template", "Prompt Pack", lang === "it" ? "Personalizzabili con Claude AI" : "Customize with Claude AI",
            `N° ${countedTemplates} ${lang === "it" ? "pezzi in catalogo" : "templates available"}`,
            "Editor's Pick", "Startup · SaaS · Portfolio",
          ].map((item, i) => (
            <span key={i} className="text-[9px] tracking-[0.22em] uppercase" style={{ color: "var(--muted)" }}>
              {item}
              <span className="mx-[10px]" style={{ color: "var(--accent)" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          HYBRID HERO — 2 col
      ═══════════════════════════════════════════ */}
      <HeroSection lang={lang} countedTemplates={countedTemplates} query={query} setQuery={setQuery} />

      {/* ── Marquee strip — kept below hero ── */}
      <div
        className="relative overflow-hidden border-b py-3"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        onMouseEnter={() => setMarqueePaused(true)}
        onMouseLeave={() => setMarqueePaused(false)}
      >
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, var(--surface), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, var(--surface), transparent)" }} />
        <div className="flex gap-3 mb-2.5" style={{ animation: "marquee-left 32s linear infinite", animationPlayState: marqueePaused ? "paused" : "running", width: "max-content" }}>
          {[...marqueeTemplates, ...marqueeTemplates].map((tmpl, i) => (
            <MarqueeCard key={`r1-${i}`} tmpl={tmpl} lang={lang} />
          ))}
        </div>
        <div className="flex gap-3" style={{ animation: "marquee-right 28s linear infinite", animationPlayState: marqueePaused ? "paused" : "running", width: "max-content" }}>
          {[...marqueeTemplates2, ...marqueeTemplates2].map((tmpl, i) => (
            <MarqueeCard key={`r2-${i}`} tmpl={tmpl} lang={lang} />
          ))}
        </div>
      </div>

      {/* ── Catalog header ── */}
      <div
        className="relative z-10 border-b px-4 sm:px-8 py-5 sm:py-[28px] flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4"
        style={{ borderColor: "var(--border)", background: "var(--bg)" }}
      >
        <h2
          className="text-[22px] sm:text-[32px] italic"
          style={{ fontFamily: "var(--font-dm-serif), serif", color: "var(--text)", fontWeight: 400 }}
        >
          {lang === "it" ? "Catalogo — Edizione Primavera" : "Catalog — Spring Edition"}
        </h2>
        <span
          className="text-[10px] tracking-[0.14em] uppercase font-semibold"
          style={{ fontFamily: "var(--font-syne)", color: "var(--muted)" }}
        >
          {countedTemplates} {lang === "it" ? "template" : "templates"} · {bundles.length} bundle
        </span>
      </div>

      {/* ── Template Grid ── */}
      <div className="relative z-10">
        <TemplateGrid externalQuery={query} onClearSearch={() => setQuery("")} />
      </div>



      {/* ── Testimonials — da aggiungere quando ci saranno utenti reali ── */}
      {/* <TestimonialsSection lang={lang} /> */}

      {/* ── Newsletter — subtle ── */}
      <div className="relative z-10 border-t border-theme">
        <EmailCapture />
      </div>

      {/* ── Ornamental quote / CTA ── */}
      <CTASection lang={lang} />

      {/* ── Footer ── */}
      <Footer />

      <ScrollToTop />
    </div>
  );
}
