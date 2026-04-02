"use client";

import Link from "next/link";
import { useState, useEffect, useRef, Suspense, useCallback } from "react";
import { templates, bundles, formatPrice, getTemplate } from "@/lib/templates";
import { templateTranslations } from "@/lib/i18n";
import TemplateGrid from "@/components/TemplateGrid";
import NavButtons from "@/components/NavButtons";
import { useLang } from "@/components/LanguageProvider";
import { t } from "@/lib/i18n";
import { usePurchases } from "@/lib/usePurchases";
import { useToast } from "@/components/Toast";
import EmailCapture from "@/components/EmailCapture";
import Footer from "@/components/Footer";
import TemplatesDropdown from "@/components/home/TemplatesDropdown";
import BundlesDropdown from "@/components/home/BundlesDropdown";
import HeroSection from "@/components/home/HeroSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import { CATEGORIES } from "@/lib/homeData";
import ScrollRevealCard from "@/components/grid/ScrollRevealCard";

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

// ── Main component ────────────────────────────────────────────────────────────
export default function HomeContent() {
  const { lang } = useLang();
  const animatedTemplates = templates.length;

  // Shared search query — lifted so hero search bar drives TemplateGrid
  const [query, setQuery] = useState("");

  const { purchasedIds } = usePurchases();

  // Nav scroll shrink (BuildForWho-style: compact at scrollY > 60)
  const [navScrolled, setNavScrolled] = useState(false);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandTemplates, setMobileExpandTemplates] = useState(false);
  const [mobileExpandBundles, setMobileExpandBundles] = useState(false);

  const countedTemplates = useCountUp(animatedTemplates);
  const toast = useToast();

  // Bundle checkout handler — shared across all bundle cards in the homepage section
  const handleBundleBuy = useCallback(async (bundleId: string) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bundleId }),
      });
      if (res.status === 401) {
        const data = await res.json().catch(() => ({}));
        if (data.requireAuth) {
          window.location.href = `/sign-in?redirect_url=${encodeURIComponent(window.location.pathname)}`;
          return;
        }
      }
      if (!res.ok) throw new Error("checkout_failed");
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error("no_url");
    } catch {
      toast(
        lang === "it"
          ? "Errore durante il checkout. Riprova più tardi."
          : "Checkout failed. Please try again.",
        "error"
      );
    }
  }, [lang, toast]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Nav scroll shrink listener
  useEffect(() => {
    function onScroll() { setNavScrolled(window.scrollY > 60); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setMobileMenuOpen(false); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-page relative overflow-x-hidden anim-page-enter">
      {/* no ambient glow in hybrid — grain overlay handles warmth */}

      {/* ── Hybrid Nav ── */}
      <nav
        className="sticky top-0 z-50 border-b backdrop-blur-[14px] px-4 sm:px-8 transition-all duration-300"
        style={{ background: "var(--nav-bg)", borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center gap-3 transition-all duration-300"
          style={{ height: navScrolled ? "50px" : "60px" }}>
          {/* Logo */}
          <Link href="/" className="shrink-0 mr-6 hover:opacity-70 transition-opacity">
            <span className="text-[15px] leading-none tracking-[0.06em] uppercase" style={{ fontFamily: "var(--font-syne)", fontWeight: 800, color: "var(--text)" }}>
              For<span style={{ color: "var(--accent)" }}>ma</span>
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

          {/* Desktop search — minimal underline style */}
          <div className="hidden sm:flex items-center relative group">
            <svg className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200" width="13" height="13" viewBox="0 0 20 20" fill="none"
              style={{ color: query ? "var(--accent)" : "var(--muted)" }}>
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
              placeholder={lang === "it" ? "Cerca…" : "Search…"}
              className="pl-5 pr-5 py-1 text-[12px] outline-none w-28 focus:w-48 transition-all duration-300"
              style={{
                background: "transparent",
                borderBottom: "1px solid var(--border)",
                color: "var(--text)",
                caretColor: "var(--accent)",
              }}
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-0 top-1/2 -translate-y-1/2" style={{ color: "var(--muted)" }}>
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
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
            Forma
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
          HERO
      ═══════════════════════════════════════════ */}
      <HeroSection lang={lang} countedTemplates={countedTemplates} query={query} setQuery={setQuery} />

      {/* ── Free Starter Kit — banner prominente ── */}
      {(() => {
        const freeBundle = bundles.find((b) => b.id === "bundle-free-starter");
        if (!freeBundle) return null;
        return (
          <section className="relative z-10 border-t border-theme px-4 sm:px-8 py-10 sm:py-14 overflow-hidden">
            {/* Glow di sfondo */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(156,119,51,0.07), transparent)" }} />
            <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
              style={{ background: "linear-gradient(90deg,transparent,rgba(200,169,110,0.4),transparent)" }} />

            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">

                {/* Left — copy principale */}
                <ScrollRevealCard className="reveal flex-1 min-w-0" delay={0}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{freeBundle.emoji}</span>
                    <span className="inline-flex items-center gap-1.5 bg-accent/15 border border-accent/30 text-accent text-[10px] font-black uppercase tracking-widest px-2.5 py-1">
                      {lang === "it" ? "Gratis · Zero costi" : "Free · Zero cost"}
                    </span>
                  </div>

                  <h2 className="text-[26px] sm:text-[34px] font-black text-theme leading-tight tracking-tight mb-3">
                    {freeBundle.name}
                  </h2>
                  <p className="text-[14px] text-muted leading-relaxed mb-6 max-w-xl">
                    {lang === "it"
                      ? freeBundle.description
                      : "The complete starter pack: hero section, feature grid, email opt-in, testimonial cards and a cold email AI generator. Five ready-to-use templates, zero cost — discover Forma quality before buying."}
                  </p>

                  {/* Template pills */}
                  <div className="flex flex-wrap gap-1.5 mb-7">
                    {freeBundle.templateIds.map((id) => {
                      const tmpl = getTemplate(id);
                      const pillName = lang === "it"
                        ? (templateTranslations[id]?.name ?? tmpl?.name ?? id)
                        : (tmpl?.name ?? id);
                      return (
                        <span key={id}
                          className="text-[11px] px-2.5 py-1 border text-muted/80"
                          style={{ background: "var(--input-bg)", borderColor: "var(--border)" }}>
                          {pillName}
                        </span>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handleBundleBuy(freeBundle.id)}
                    className="btn-brand text-[14px]"
                    style={{ padding: "12px 28px" }}
                  >
                    {lang === "it" ? "Scarica il kit gratis →" : "Download the free kit →"}
                  </button>
                </ScrollRevealCard>

                {/* Right — highlights + numero template */}
                <ScrollRevealCard
                  className="reveal w-full lg:w-auto lg:shrink-0 lg:w-64 border border-accent/25 p-5 sm:p-6 relative"
                  delay={120}
                  style={{ background: "linear-gradient(135deg,rgba(156,119,51,0.06) 0%,rgba(13,11,8,0) 60%)" }}
                >
                  <div className="absolute top-0 inset-x-0 h-px"
                    style={{ background: "linear-gradient(90deg,transparent,rgba(200,169,110,0.4),transparent)" }} />

                  <p className="text-[10px] font-black uppercase tracking-widest text-muted/50 mb-4">
                    {lang === "it" ? "Cosa ottieni" : "What you get"}
                  </p>

                  <div className="space-y-3 mb-5">
                    {(lang === "it" ? freeBundle.highlights : [
                      "5 premium templates 100% free",
                      "4 UI sections + 1 AI tool included",
                      "Perfect for testing before purchasing",
                    ]).map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="shrink-0 mt-0.5" aria-hidden>
                          <path d="M2 6.5l3.5 3.5 5.5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)" }}/>
                        </svg>
                        <span className="text-[12px] text-theme/80 leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-accent/15 pt-4 flex items-baseline gap-2">
                    <span className="text-[28px] font-black leading-none"
                      style={{ color: "var(--accent)", fontFamily: "var(--font-dm-serif)" }}>
                      {lang === "it" ? "Gratis" : "Free"}
                    </span>
                    <span className="text-[12px] text-muted line-through">€19.99</span>
                  </div>
                </ScrollRevealCard>

              </div>
            </div>
          </section>
        );
      })()}

      {/* ── Zen divider + mon-ring ── */}
      <div className="relative z-10 px-4 sm:px-8">
        <div className="zen-divider" aria-hidden="true"><span>◇</span></div>
      </div>

      {/* ── Mon ring section marker ── */}
      <div className="relative z-10 flex items-center justify-center gap-6 py-2 px-4 sm:px-8" aria-hidden="true">
        <div className="torii-accent" />
        <div className="mon-ring">◆</div>
        <div className="torii-accent" style={{ transform: "scaleX(-1)" }} />
      </div>

      {/* ── Template Grid ── */}
      <div className="relative z-10">
        <Suspense fallback={null}>
          <TemplateGrid externalQuery={query} onClearSearch={() => setQuery("")} />
        </Suspense>
      </div>



      {/* ── Testimonials — da aggiungere quando ci saranno utenti reali ── */}
      {/* <TestimonialsSection lang={lang} /> */}

      {/* Bundle esclusivi rimossi dall'homepage — visibili su /bundle/:id */}

      {/* ── Newsletter — subtle ── */}
      <div className="relative z-10 border-t border-theme">
        <EmailCapture />
      </div>

      {/* ── Ornamental quote / CTA ── */}
      <CTASection lang={lang} />

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
