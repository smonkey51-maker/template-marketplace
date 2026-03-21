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

// ── Scroll progress bar ───────────────────────────────────────────────────────
function ScrollProgressBar() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    function update() {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setWidth(total > 0 ? (el.scrollTop / total) * 100 : 0);
    }
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none">
      <div style={{ width: `${width}%`, height: "100%", background: "linear-gradient(to right, var(--accent), #C77DFF, #FF6B6B)", transition: "width 0.1s linear" }} />
    </div>
  );
}

// ── Count-up hook ─────────────────────────────────────────────────────────────
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
  { id: "elearning",        emoji: "🎓", labelIt: "E-learning & Corsi",      labelEn: "E-learning & Courses" },
];

const STEPS = [
  { n: "01", icon: "🔍", titleIt: "Scegli un template",    titleEn: "Choose a template",    descIt: "Anteprima completa prima di acquistare.", descEn: "Full preview before buying." },
  { n: "02", icon: "⚡", titleIt: "Acquista in un click",  titleEn: "Buy in one click",      descIt: "Pagamento sicuro con Stripe.",            descEn: "Secure Stripe payment." },
  { n: "03", icon: "🤖", titleIt: "Personalizza con AI",   titleEn: "Customize with AI",     descIt: "Claude AI applica le tue modifiche.",     descEn: "Claude AI applies your changes." },
];

const TESTIMONIALS = [
  {
    nameIt: "Marco Ferretti", nameEn: "Marco Ferretti",
    roleIt: "Founder @ StartupMilano", roleEn: "Founder @ StartupMilano",
    quoteIt: "Ho lanciato la landing page del mio SaaS in meno di un giorno. Il template era perfetto e l'AI lo ha adattato al mio brand in pochi minuti.",
    quoteEn: "I launched my SaaS landing page in less than a day. The template was perfect and the AI adapted it to my brand in minutes.",
    rating: 5,
    initials: "MF",
    accent: "from-violet-500 to-purple-600",
  },
  {
    nameIt: "Sara Neri", nameEn: "Sara Neri",
    roleIt: "Freelance Designer", roleEn: "Freelance Designer",
    quoteIt: "Uso TemplateLab per tutti i miei clienti. Risparmio ore di lavoro e posso offrire risultati professionali a prezzi competitivi.",
    quoteEn: "I use TemplateLab for all my clients. I save hours of work and can deliver professional results at competitive prices.",
    rating: 5,
    initials: "SN",
    accent: "from-pink-500 to-rose-500",
  },
  {
    nameIt: "Luca Moretti", nameEn: "Luca Moretti",
    roleIt: "Marketing Manager", roleEn: "Marketing Manager",
    quoteIt: "I prompt template per LinkedIn hanno triplicato il mio engagement. Claude AI li personalizza perfettamente per ogni post.",
    quoteEn: "The LinkedIn prompt templates tripled my engagement. Claude AI perfectly customizes them for each post.",
    rating: 5,
    initials: "LM",
    accent: "from-blue-500 to-indigo-500",
  },
];

function TestimonialCard({
  testimonial,
  lang,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
  lang: "it" | "en";
}) {
  return (
    <div className="glass-subtle rounded-2xl p-5 flex flex-col gap-3.5">
      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <svg key={i} width="13" height="13" viewBox="0 0 10 10" fill="currentColor" className="text-amber-400" aria-hidden>
            <path d="M5 0l1.2 3.7H10L6.9 5.9l1.2 3.7L5 7.5l-3.1 2.1 1.2-3.7L0 3.7h3.8z"/>
          </svg>
        ))}
      </div>
      {/* Quote */}
      <p className="text-[13px] text-muted leading-relaxed flex-1">
        &ldquo;{lang === "it" ? testimonial.quoteIt : testimonial.quoteEn}&rdquo;
      </p>
      {/* Author */}
      <div className="flex items-center gap-2.5 pt-3 border-t border-theme">
        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${testimonial.accent} flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0`}>
          {testimonial.initials}
        </div>
        <div>
          <p className="text-[13px] font-semibold text-theme leading-tight">
            {lang === "it" ? testimonial.nameIt : testimonial.nameEn}
          </p>
          <p className="text-[11px] text-muted leading-tight">
            {lang === "it" ? testimonial.roleIt : testimonial.roleEn}
          </p>
        </div>
      </div>
    </div>
  );
}

function TemplatesDropdown({ lang }: { lang: "it" | "en" }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 w-[580px] max-w-[calc(100vw-2rem)]">
      <div className="border border-theme rounded-2xl shadow-2xl overflow-hidden" style={{ background: "var(--bg)" }}>
        <div className="grid grid-cols-[180px_1fr]">
          {/* Left: steps */}
          <div className="p-4" style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-3 px-1" style={{ color: "var(--muted)" }}>
              {lang === "it" ? "Come funziona" : "How it works"}
            </p>
            <div className="flex flex-col gap-1">
              {STEPS.map((s) => (
                <div key={s.n} className="flex items-start gap-2.5 px-2 py-2.5 rounded-xl">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0 shadow-sm border"
                    style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold mb-0.5" style={{ color: "var(--muted)" }}>{s.n}</p>
                    <p className="text-[12px] font-semibold leading-tight" style={{ color: "var(--text)" }}>
                      {lang === "it" ? s.titleIt : s.titleEn}
                    </p>
                    <p className="text-[11px] mt-0.5 leading-tight" style={{ color: "var(--muted)" }}>
                      {lang === "it" ? s.descIt : s.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right: categories */}
          <div className="p-4">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-3 px-1" style={{ color: "var(--muted)" }}>
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
                  className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-left transition-colors"
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--surface)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
                >
                  <span className="text-sm flex-shrink-0">{cat.emoji}</span>
                  <span className="text-[12px] font-medium leading-tight" style={{ color: "var(--text)", opacity: 0.8 }}>
                    {lang === "it" ? cat.labelIt : cat.labelEn}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Footer hint */}
        <div className="px-4 py-2.5 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
          <span className="text-[11px]" style={{ color: "var(--muted)" }}>
            {templates.length} {lang === "it" ? "template disponibili" : "templates available"}
          </span>
          <button
            onClick={() => document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" })}
            className="text-[11px] font-semibold transition-colors"
            style={{ color: "var(--accent)" }}
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
      <div className="border border-theme rounded-2xl shadow-2xl overflow-hidden" style={{ background: "var(--bg)" }}>
        <div className="p-3">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-2 px-2" style={{ color: "var(--muted)" }}>
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
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group cursor-pointer"
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--surface)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "transparent")}
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: "var(--accent-bg)", color: "var(--accent)" }}>
                    {bundle.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold leading-tight" style={{ color: "var(--text)" }}>
                      {bundle.name}
                    </p>
                    <p className="text-[11px] truncate leading-tight mt-0.5" style={{ color: "var(--muted)" }}>
                      {bundle.tagline}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {fullyOwned ? (
                      <span className="text-[11px] text-emerald-500 font-semibold">✓ {lang === "it" ? "Tuo" : "Owned"}</span>
                    ) : (
                      <>
                        <p className="text-[13px] font-bold" style={{ color: "var(--text)" }}>{formatPrice(bundle.price)}</p>
                        <p className="text-[10px] line-through" style={{ color: "var(--muted)" }}>{formatPrice(bundle.regularPrice)}</p>
                      </>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="px-5 py-2.5" style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
          <p className="text-[11px]" style={{ color: "var(--muted)" }}>
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

const BUNDLE_GRADIENTS: Record<string, { bg: string; glow: string; accent: string; badgeBg: string }> = {
  blue:    { bg: "linear-gradient(145deg,#1e3a8a 0%,#0f172a 100%)", glow: "59,130,246",   accent: "#93c5fd", badgeBg: "rgba(59,130,246,0.22)" },
  violet:  { bg: "linear-gradient(145deg,#4c1d95 0%,#0f0721 100%)", glow: "139,92,246",   accent: "#c4b5fd", badgeBg: "rgba(139,92,246,0.22)" },
  emerald: { bg: "linear-gradient(145deg,#064e3b 0%,#022c22 100%)", glow: "16,185,129",   accent: "#6ee7b7", badgeBg: "rgba(16,185,129,0.22)" },
  purple:  { bg: "linear-gradient(145deg,#581c87 0%,#1a0533 100%)", glow: "168,85,247",   accent: "#d8b4fe", badgeBg: "rgba(168,85,247,0.22)" },
  amber:   { bg: "linear-gradient(145deg,#78350f 0%,#1c0a00 100%)", glow: "245,158,11",   accent: "#fcd34d", badgeBg: "rgba(245,158,11,0.22)" },
  orange:  { bg: "linear-gradient(145deg,#7c2d12 0%,#1c0700 100%)", glow: "249,115,22",   accent: "#fed7aa", badgeBg: "rgba(249,115,22,0.22)" },
};

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
      className="flex-shrink-0 w-[290px] sm:w-[330px] rounded-[24px] overflow-hidden cursor-pointer flex flex-col"
      style={{ scrollSnapAlign: "start", willChange: "transform", background: g.bg, boxShadow: `0 8px 40px rgba(${g.glow},0.18), 0 2px 10px rgba(0,0,0,0.4)` }}
    >
      {/* Card body */}
      <div className="flex-1 px-5 pt-6 pb-4 relative">
        {/* Glow spot */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, rgba(${g.glow},0.18) 0%, transparent 70%)`, transform: "translate(30%,-30%)" }} />
        {/* Discount badge */}
        <span className="absolute top-4 right-4 text-[11px] font-black rounded-full px-2.5 py-1 border" style={{ background: g.badgeBg, color: g.accent, borderColor: `rgba(${g.glow},0.4)` }}>
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
            <div key={i} className="w-6 h-6 rounded-full border border-white/15 bg-white/8 flex items-center justify-center text-[9px] text-white/50 font-bold">{i + 1}</div>
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
          <div className="w-full py-2.5 rounded-2xl text-center text-[13px] font-bold text-white/40 bg-white/5 border border-white/10">
            {lang === "it" ? "✓ Già acquistato" : "✓ Already owned"}
          </div>
        ) : (
          <button
            onClick={async (e) => { e.stopPropagation(); setLoading(true); try { await onBuy(bundle.id); } finally { setLoading(false); } }}
            disabled={loading}
            className="w-full py-2.5 rounded-2xl text-[13px] font-bold text-white transition-opacity duration-200 active:scale-[0.97] disabled:opacity-50 border"
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
          <button onClick={() => scroll("prev")} aria-label="Precedente" className="w-9 h-9 flex items-center justify-center rounded-xl border border-theme bg-card hover:bg-surface text-muted hover:text-theme transition-colors">
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M6 1L1 6l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button onClick={() => scroll("next")} aria-label="Successivo" className="w-9 h-9 flex items-center justify-center rounded-xl border border-theme bg-card hover:bg-surface text-muted hover:text-theme transition-colors">
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
      className={`flex-shrink-0 w-[200px] h-[120px] rounded-[14px] bg-gradient-to-br ${grad} overflow-hidden relative group cursor-pointer`}
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="sm:hidden flex items-center justify-center w-9 h-9"
            style={{ color: "var(--muted)" }}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
                className="text-[11px] font-medium px-3 py-1.5 uppercase tracking-[0.1em] transition-colors duration-200"
                style={{ color: "var(--muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
              >
                {lang === "it" ? l.it : l.en}
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
              onChange={(e) => { setQuery(e.target.value); if (e.target.value) document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" }); }}
              placeholder={lang === "it" ? "Cerca…" : "Search…"}
              className="pl-8 pr-3 py-1.5 text-[12px] outline-none w-32 focus:w-48 transition-all duration-200"
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

          {/* Studio Access CTA */}
          <Link
            href="/studio"
            className="hidden sm:inline-flex items-center ml-2 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors duration-200"
            style={{ fontFamily: "var(--font-syne)", background: "var(--accent)", color: "var(--bg)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--text)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg)"; }}
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
            className="w-8 h-8 flex items-center justify-center rounded-xl text-muted hover:text-theme hover:bg-card transition-colors"
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
                if (e.target.value) {
                  setMobileMenuOpen(false);
                  setTimeout(() => document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" }), 150);
                }
              }}
              placeholder={lang === "it" ? "Cerca template…" : "Search templates…"}
              className="w-full bg-input border border-theme rounded-xl pl-9 pr-3 py-2.5 text-[14px] text-theme placeholder:text-muted outline-none focus:border-[#0A84FF]/40 transition-colors"
            />
          </div>
        </div>

        {/* Nav items */}
        <div className="px-2 py-2">

          {/* Templates accordion */}
          <button
            onClick={() => setMobileExpandTemplates((o) => !o)}
            className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-[14px] font-semibold text-theme hover:bg-card transition-colors"
          >
            <span>{lang === "it" ? "Template" : "Templates"}</span>
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
                  className="flex items-center gap-2 px-2.5 py-2.5 rounded-xl text-left hover:bg-card transition-colors"
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
            className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-[14px] font-semibold text-theme hover:bg-card transition-colors"
          >
            <span>{lang === "it" ? "Bundle" : "Bundles"}</span>
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
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-card transition-colors"
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
              className="flex items-center px-3 py-3 rounded-xl hover:bg-card transition-colors">
              <span className="text-[14px] font-medium text-theme">{t[lang].nav.guide}</span>
            </Link>
            <Link href="/studio" onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-3 py-3 rounded-xl hover:bg-card transition-colors">
              <span className="text-[14px] font-medium text-theme">{t[lang].nav.studio}</span>
            </Link>
            <Link href="/account" onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-3 py-3 rounded-xl hover:bg-card transition-colors">
              <span className="text-[14px] font-medium text-theme">{t[lang].nav.account}</span>
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
      <section
        className="relative z-10 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-center py-16 sm:py-20">

          {/* Left: copy */}
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 mb-7 text-[9px] tracking-[0.2em] uppercase font-medium" style={{ color: "var(--accent)" }}>
              <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
              {lang === "it" ? "Collezione Primavera 2026" : "Spring Collection 2026"}
            </div>

            {/* Headline */}
            <h1
              className="font-dm-serif leading-[1.06] mb-7"
              style={{
                fontSize: "clamp(48px, 6vw, 82px)",
                fontWeight: 400,
                letterSpacing: "-0.025em",
                color: "var(--text)",
                fontFamily: "var(--font-dm-serif), Georgia, serif",
              }}
            >
              {lang === "it" ? (
                <>
                  Template premium,<br />
                  <em style={{ fontStyle: "italic", color: "#C4622D" }}>plasmati con cura</em><br />
                  dall&apos;AI per te.
                </>
              ) : (
                <>
                  Premium templates,<br />
                  <em style={{ fontStyle: "italic", color: "#C4622D" }}>crafted with care</em><br />
                  by AI for you.
                </>
              )}
            </h1>

            {/* Sub */}
            <p className="text-[14px] leading-[1.78] mb-10 max-w-[420px] font-light" style={{ color: "var(--muted)" }}>
              {lang === "it"
                ? "Acquista un template professionale numerato, poi adattalo in secondi con Claude AI. Nessun codice. Nessun compromesso."
                : "Buy a numbered professional template, then customize it in seconds with Claude AI. No code. No compromise."}
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-6">
              <a
                href="#browse"
                onClick={(e) => { e.preventDefault(); document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-7 py-[13px] text-[10px] font-bold uppercase tracking-[0.14em] transition-colors duration-200 active:opacity-80"
                style={{
                  fontFamily: "var(--font-syne)",
                  background: "var(--accent)",
                  color: "var(--bg)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--text)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg)"; }}
              >
                {lang === "it" ? "Sfoglia il catalogo →" : "Browse catalog →"}
              </a>
              <Link
                href="/studio"
                className="text-[12px] flex items-center gap-1.5 transition-colors duration-200"
                style={{ color: "var(--muted)", letterSpacing: "0.06em" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
              >
                {lang === "it" ? "Prova l'AI Studio" : "Try AI Studio"}
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>

          {/* Right: catalog shelf widget */}
          <div className="hidden lg:block border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            {/* Header */}
            <div className="flex items-center justify-between px-[22px] py-[14px] border-b" style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}>
              <span className="font-dm-serif text-[13px] italic" style={{ fontFamily: "var(--font-dm-serif), serif", color: "var(--muted)" }}>
                {lang === "it" ? "Selezionati questa settimana" : "Selected this week"}
              </span>
              <span className="text-[9px] tracking-[0.18em] uppercase font-semibold" style={{ fontFamily: "var(--font-syne)", color: "var(--accent)", opacity: 0.75 }}>
                {countedTemplates} {lang === "it" ? "pezzi" : "pieces"}
              </span>
            </div>
            {/* Shelf items — top templates */}
            {[
              { num: "001", name: "SaaS Hero Section",       cat: lang === "it" ? "UI · Pick" : "UI · Pick",      price: "€ 12,99", featured: true,  id: "hero-saas" },
              { num: "002", name: "Pricing Table 3-Tier",    cat: "UI",                                             price: "€ 9,99",  featured: false, id: "pricing-table" },
              { num: "018", name: "LinkedIn Growth Kit",     cat: "Prompt",                                         price: "€ 7,99",  featured: false, id: "linkedin-prompt-pack" },
              { num: "031", name: "Portfolio Agency Dark",   cat: lang === "it" ? "UI · Nuovo" : "UI · New",        price: "€ 14,99", featured: false, id: "creative-agency-portfolio" },
              { num: "044", name: "E-learning Landing",      cat: "UI",                                             price: "€ 10,99", featured: false, id: "elearning-landing" },
            ].map((item) => (
              <Link
                key={item.num}
                href={`/preview/${item.id}`}
                className="flex items-center gap-3 px-[22px] py-[13px] border-b transition-colors duration-150 last:border-0"
                style={{
                  borderColor: "var(--border)",
                  background: item.featured ? "var(--accent-bg)" : "transparent",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cream-08, var(--input-bg))")}
                onMouseLeave={(e) => (e.currentTarget.style.background = item.featured ? "var(--accent-bg)" : "transparent")}
              >
                <span
                  className="w-[44px] flex-shrink-0 text-[11px] italic"
                  style={{ fontFamily: "var(--font-dm-serif), serif", color: "var(--accent)", opacity: item.featured ? 1 : 0.55 }}
                >
                  N° {item.num}
                </span>
                <span className="flex-1 text-[13px] font-normal truncate" style={{ color: "var(--text)" }}>
                  {item.name}
                </span>
                <span className="text-[9px] tracking-[0.12em] uppercase font-medium mr-3 hidden sm:block"
                  style={{ color: item.featured ? "var(--accent)" : "var(--muted)", opacity: item.featured ? 0.9 : 0.7 }}>
                  {item.cat}
                </span>
                <span className="text-[15px] italic flex-shrink-0" style={{ fontFamily: "var(--font-dm-serif), serif", color: "var(--accent)" }}>
                  {item.price}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
        className="relative z-10 border-b px-4 sm:px-8 py-[28px] flex items-baseline justify-between"
        style={{ borderColor: "var(--border)", background: "var(--bg)" }}
      >
        <h2
          className="text-[28px] sm:text-[32px] italic"
          style={{ fontFamily: "var(--font-dm-serif), serif", color: "var(--text)", fontWeight: 400 }}
        >
          {lang === "it" ? "Catalogo — Edizione Primavera" : "Catalog — Spring Edition"}
        </h2>
        <span
          className="text-[10px] tracking-[0.14em] uppercase font-semibold hidden sm:block"
          style={{ fontFamily: "var(--font-syne)", color: "var(--muted)" }}
        >
          {countedTemplates} {lang === "it" ? "template disponibili" : "templates available"}
        </span>
      </div>

      {/* ── Template Grid ── */}
      <div className="relative z-10">
        <TemplateGrid externalQuery={query} />
      </div>

      {/* ── Stats bar ── */}
      <div
        className="relative z-10 border-t border-b grid grid-cols-1 sm:grid-cols-3"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        {[
          { num: countedTemplates.toString(), label: lang === "it" ? "template\ndisponibili" : "templates\navailable" },
          { num: "12k+",                      label: lang === "it" ? "download\ncompleti"      : "completed\ndownloads" },
          { num: "Claude AI",                  label: lang === "it" ? "personalizzazione\nistantanea" : "instant\ncustomization" },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-8 py-6 border-b sm:border-b-0"
            style={{ borderColor: "var(--border)", borderRight: i < 2 ? "1px solid var(--border)" : "none" }}
          >
            <span
              className="text-[36px] sm:text-[40px] italic leading-none"
              style={{ fontFamily: "var(--font-dm-serif), serif", color: "var(--text)" }}
            >
              {stat.num}
            </span>
            <span
              className="text-[11px] leading-[1.5] font-light whitespace-pre-line"
              style={{ color: "var(--muted)" }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Studio banner ── */}
      <div
        className="relative z-10 mx-4 sm:mx-8 my-10 overflow-hidden"
        style={{ background: "var(--card-bg)", border: "var(--border-gold)" }}
      >
        {/* Gold ornament */}
        <div aria-hidden className="absolute right-[-24px] top-[-48px] text-[180px] sm:text-[220px] pointer-events-none select-none leading-none" style={{ color: "var(--gold-dim, rgba(200,169,110,0.06))" }}>✦</div>

        <div className="relative grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-8 items-center px-8 sm:px-12 py-10 sm:py-12">
          <div>
            <p className="text-[9px] tracking-[0.22em] uppercase font-semibold mb-3" style={{ fontFamily: "var(--font-syne)", color: "var(--accent)" }}>
              {lang === "it" ? "AI Studio — Accesso Premium" : "AI Studio — Premium Access"}
            </p>
            <h3
              className="text-[26px] sm:text-[30px] italic mb-2"
              style={{ fontFamily: "var(--font-dm-serif), serif", color: "var(--text)", fontWeight: 400, lineHeight: 1.2 }}
            >
              {lang === "it" ? "Non trovi il pezzo giusto?\nDescrivilo, lo costruiamo insieme." : "Can't find the right piece?\nDescribe it, we'll build it together."}
            </h3>
            <p className="text-[13px] font-light" style={{ color: "var(--muted)" }}>
              {lang === "it"
                ? "Componenti UI, prompt, landing page — AI Studio genera il template perfetto in secondi."
                : "UI components, prompts, landing pages — AI Studio generates the perfect template in seconds."}
            </p>
          </div>
          <Link
            href="/studio"
            className="shrink-0 inline-flex items-center px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors duration-200 whitespace-nowrap"
            style={{ fontFamily: "var(--font-syne)", background: "var(--accent)", color: "var(--bg)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--text)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg)"; }}
          >
            {lang === "it" ? "Inizia con Studio Access" : "Start with Studio Access"}
          </Link>
        </div>
      </div>

      {/* ── How it works — bento ── */}
      <div
        className="relative z-10 mx-4 sm:mx-8 mb-12 border"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] grid-rows-auto"
          style={{ background: "var(--border)", gap: "1px" }}
        >
          {/* Large card */}
          <div className="p-8 sm:p-9 sm:row-span-2" style={{ background: "var(--bg)" }}>
            <div
              className="text-[48px] sm:text-[52px] italic leading-none mb-3 font-normal"
              style={{ fontFamily: "var(--font-dm-serif), serif", color: "var(--accent)", opacity: 0.25 }}
            >
              01
            </div>
            <h4 className="text-[17px] font-bold mb-2 tracking-[-0.01em]" style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}>
              {lang === "it" ? "Scegli un template dal catalogo" : "Choose a template from the catalog"}
            </h4>
            <p className="text-[13px] font-light leading-[1.7]" style={{ color: "var(--muted)" }}>
              {lang === "it"
                ? "Ogni template è numerato, con anteprima completa prima dell'acquisto. Filtra per categoria, tecnologia, stile."
                : "Every template is numbered, with a full preview before purchase. Filter by category, technology, style."}
            </p>
          </div>
          {/* Step 02 */}
          <div className="p-7 sm:p-8" style={{ background: "var(--bg)" }}>
            <div className="text-[48px] italic leading-none mb-3 font-normal" style={{ fontFamily: "var(--font-dm-serif), serif", color: "var(--accent)", opacity: 0.25 }}>02</div>
            <h4 className="text-[16px] font-bold mb-1.5" style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}>
              {lang === "it" ? "Acquista in un click" : "Buy in one click"}
            </h4>
            <p className="text-[12px] font-light" style={{ color: "var(--muted)" }}>
              {lang === "it" ? "Pagamento sicuro Stripe. Download immediato." : "Secure Stripe payment. Instant download."}
            </p>
          </div>
          {/* Step 03 */}
          <div className="p-7 sm:p-8" style={{ background: "var(--bg)" }}>
            <div className="text-[48px] italic leading-none mb-3 font-normal" style={{ fontFamily: "var(--font-dm-serif), serif", color: "var(--accent)", opacity: 0.25 }}>03</div>
            <h4 className="text-[16px] font-bold mb-1.5" style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}>
              {lang === "it" ? "Personalizza con Claude AI" : "Customize with Claude AI"}
            </h4>
            <p className="text-[12px] font-light" style={{ color: "var(--muted)" }}>
              {lang === "it" ? "Descrivi le modifiche. L'AI le applica in secondi." : "Describe the changes. AI applies them in seconds."}
            </p>
          </div>
        </div>
      </div>

      {/* ── Testimonials — da aggiungere quando ci saranno utenti reali ── */}
      {/* <div className="relative z-10 border-t border-theme px-4 sm:px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[10px] font-bold text-muted uppercase tracking-[0.18em] mb-3">
              {lang === "it" ? "Recensioni" : "Reviews"}
            </p>
            <h2 className="text-[1.6rem] sm:text-[2rem] font-bold tracking-tight text-zinc-900 dark:text-white">
              {lang === "it" ? "Amato dai professionisti" : "Loved by professionals"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TESTIMONIALS.map((testimonial, i) => (
              <TestimonialCard key={i} testimonial={testimonial} lang={lang} />
            ))}
          </div>
        </div>
      </div> */}

      {/* ── Newsletter — subtle ── */}
      <div className="relative z-10 border-t border-theme">
        <EmailCapture />
      </div>

      {/* ── Ornamental quote ── */}
      <div className="relative z-10 border-t border-theme px-4 sm:px-6 py-10">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[11px] italic" style={{ color: "var(--muted)", opacity: 0.55, fontFamily: "var(--font-dm-serif), serif" }}>
            {lang === "it"
              ? <>&ldquo;Non c&rsquo;è niente di più definitivo di un template &lsquo;temporaneo&rsquo; che resterà in produzione per i prossimi otto anni.&rdquo;</>
              : <>&ldquo;There&rsquo;s nothing more permanent than a &lsquo;temporary&rsquo; template that ends up in production for the next eight years.&rdquo;</>}
          </p>
        </div>
      </div>

      {/* ── Footer ── */}
      <Footer />

      <ScrollToTop />
    </div>
  );
}
