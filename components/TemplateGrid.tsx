"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Image from "next/image";
import { templates, Template } from "@/lib/templates";
import TemplateCard from "@/components/TemplateCard";
import StudioAccessButton from "@/components/StudioAccessButton";
import { useLang } from "@/components/LanguageProvider";
import { t, SEARCH_SYNONYMS, templateTranslations } from "@/lib/i18n";
import PreviewModal from "@/components/PreviewModal";
import { useRecentlyViewed } from "@/lib/useRecentlyViewed";

// ── Section definitions ──────────────────────────────────────────────────────

const SECTIONS: {
  id: string;
  emoji: string;
  gradientFrom: string;
  gradientTo: string;
  ids: string[];
}[] = [
  { id: "professionals",    emoji: "🏢", gradientFrom: "#1e3a5f", gradientTo: "#0f2a47", ids: ["real-estate-agent", "therapist-profile", "law-firm-services", "personal-trainer-profile", "ai-tech-portfolio"] },
  { id: "lifestyle-finance",emoji: "🏡", gradientFrom: "#0d3b2e", gradientTo: "#052a1f", ids: ["airbnb-property-listing", "budget-tracker", "personal-finance-dashboard", "adhd-focus-tracker"] },
  { id: "business",         emoji: "🛍️", gradientFrom: "#3b2000", gradientTo: "#2a1600", ids: ["artisan-product-catalog", "revenue-analytics", "pricing-table", "ecommerce-product-page", "invoice-html"] },
  { id: "startup",          emoji: "🚀", gradientFrom: "#2d1b69", gradientTo: "#1a0e47", ids: ["saas-landing-dark", "startup-product-launch", "hero-saas", "waiting-list-page", "saas-pricing-full"] },
  { id: "creative",         emoji: "🎨", gradientFrom: "#4a0d2e", gradientTo: "#330920", ids: ["creative-agency-portfolio", "freelance-tech-profile", "blog-card-grid"] },
  { id: "copywriting-ai",   emoji: "✍️", gradientFrom: "#0d2b4a", gradientTo: "#061c35", ids: ["cold-email-b2b", "product-description-ecom", "ai-assistant-system-prompt", "linkedin-prompt-pack", "youtube-script-pack"] },
  { id: "ai-productivity",  emoji: "🤖", gradientFrom: "#1a1a2e", gradientTo: "#0d0d1f", ids: ["claude-projects-pack", "ai-workflow-pack"] },
  { id: "hospitality",      emoji: "🍽️", gradientFrom: "#3b0a0a", gradientTo: "#2a0606", ids: ["restaurant-menu", "coffee-shop-landing", "hotel-booking"] },
  { id: "digital-product",  emoji: "📱", gradientFrom: "#003b4a", gradientTo: "#002535", ids: ["mobile-app-showcase", "feature-showcase", "saas-dashboard"] },
  { id: "personal-brand",   emoji: "🪪", gradientFrom: "#2d0e4a", gradientTo: "#1e0933", ids: ["digital-resume", "link-in-bio", "newsletter-landing"] },
  { id: "notion-workspace", emoji: "📓", gradientFrom: "#1c1c1c", gradientTo: "#0f0f0f", ids: ["notion-project-hub", "notion-freelancer-crm", "notion-content-calendar", "notion-finance-tracker", "notion-second-brain", "notion-job-tracker", "notion-weekly-review", "notion-client-portal"] },
];

// ── Category cover images (Unsplash) ─────────────────────────────────────────

const CATEGORY_IMAGES: Record<string, string> = {
  professionals:     "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=280&fit=crop&q=80&auto=format",
  "lifestyle-finance":"https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=280&fit=crop&q=80&auto=format",
  business:          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=280&fit=crop&q=80&auto=format",
  startup:           "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=280&fit=crop&q=80&auto=format",
  creative:          "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=280&fit=crop&q=80&auto=format",
  "copywriting-ai":  "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=280&fit=crop&q=80&auto=format",
  "ai-productivity": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=280&fit=crop&q=80&auto=format",
  hospitality:       "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=280&fit=crop&q=80&auto=format",
  "digital-product": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=280&fit=crop&q=80&auto=format",
  "personal-brand":  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=280&fit=crop&q=80&auto=format",
  "notion-workspace":"https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=280&fit=crop&q=80&auto=format",
};

const byId = Object.fromEntries(templates.map((tmpl) => [tmpl.id, tmpl]));

// ── Accent colours per category ───────────────────────────────────────────────

const SECTION_ACCENTS: Record<string, string> = {
  "professionals":    "#3B82F6",
  "lifestyle-finance":"#10B981",
  "business":         "#F59E0B",
  "startup":          "#8B5CF6",
  "creative":         "#EC4899",
  "copywriting-ai":   "#06B6D4",
  "ai-productivity":  "#6366F1",
  "hospitality":      "#EF4444",
  "digital-product":  "#14B8A6",
  "personal-brand":   "#A855F7",
  "notion-workspace": "#9CA3AF",
};

const SECTION_ACCENTS_RGB: Record<string, string> = {
  "professionals":    "59,130,246",
  "lifestyle-finance":"16,185,129",
  "business":         "245,158,11",
  "startup":          "139,92,246",
  "creative":         "236,72,153",
  "copywriting-ai":   "6,182,212",
  "ai-productivity":  "99,102,241",
  "hospitality":      "239,68,68",
  "digital-product":  "20,184,166",
  "personal-brand":   "168,85,247",
  "notion-workspace": "156,163,175",
};

// ── Scramble chars ────────────────────────────────────────────────────────────
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// ── Utilities ────────────────────────────────────────────────────────────────

function normalize(str: string): string {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// ── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-card border border-theme rounded-[22px] overflow-hidden animate-pulse">
      <div className="h-48 bg-theme/5" />
      <div className="p-4 flex flex-col gap-2.5">
        <div className="h-2 w-16 bg-theme/8 rounded-full" />
        <div className="h-3.5 w-3/4 bg-theme/8 rounded-full" />
        <div className="mt-2 flex items-center justify-between">
          <div className="h-3.5 w-10 bg-theme/8 rounded-full" />
          <div className="h-2.5 w-12 bg-theme/8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ── Category card thumbnail ───────────────────────────────────────────────────

function CategoryThumbnail({ section }: { section: (typeof SECTIONS)[number] }) {
  const imgSrc = CATEGORY_IMAGES[section.id];

  return (
    <div
      className="relative h-36 overflow-hidden"
      style={!imgSrc ? { background: `linear-gradient(135deg, ${section.gradientFrom}, ${section.gradientTo})` } : undefined}
    >
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt={section.id}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={false}
        />
      ) : (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="select-none" style={{ fontSize: "2.8rem", filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.5))", opacity: 0.85 }}>
              {section.emoji}
            </span>
          </div>
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
          />
        </>
      )}

      {/* Dark gradient overlay at the bottom for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.42) 70%, rgba(0,0,0,0.72) 100%)" }}
      />
    </div>
  );
}

// ── Category card ─────────────────────────────────────────────────────────────

type Lang = "it" | "en";

function CategoryCard({
  section,
  sectionTemplates,
  onClick,
  lang,
  index,
}: {
  section: (typeof SECTIONS)[number];
  sectionTemplates: Template[];
  onClick: () => void;
  lang: Lang;
  index: number;
}) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const [revealed, setRevealed] = useState(false);
  const sectionMeta = t[lang].sections[section.id as keyof typeof t[typeof lang]["sections"]];

  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(700px) rotateX(${(-y * 8).toFixed(1)}deg) rotateY(${(x * 8).toFixed(1)}deg) scale3d(1.025,1.025,1.025)`;
    });
  };

  const handleMouseLeave = () => {
    cancelAnimationFrame(frameRef.current);
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform .5s cubic-bezier(.34,1.2,.64,1)";
    el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    setTimeout(() => { if (el) el.style.transition = ""; }, 500);
  };

  return (
    <div
      ref={revealRef}
      className={`scroll-reveal${revealed ? " visible" : ""}`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => { addRipple(e); onClick(); }}
        className="group relative rounded-2xl h-full cursor-pointer"
        style={{ willChange: "transform" }}
      >
        {/* Ambient glow — follows category color */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 blur-xl"
          style={{ background: `radial-gradient(ellipse at 50% 80%, ${section.gradientFrom}99 0%, transparent 70%)` }}
        />

        {/* Card */}
        <div className="glass relative rounded-2xl overflow-hidden flex flex-col h-full active:opacity-90">
          {/* Specular top edge */}
          <div className="absolute top-0 left-[8%] right-[8%] h-px pointer-events-none z-10" style={{ background: "var(--glass-top-edge)" }} />

          {/* Thumbnail */}
          <CategoryThumbnail section={section} />

          {/* Hover CTA overlay — sits over the thumbnail */}
          <div className="absolute top-0 left-0 right-0 h-36 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <span className="bg-white/90 dark:bg-black/75 text-zinc-900 dark:text-zinc-100 text-[12px] font-bold px-3.5 py-1.5 rounded-xl shadow-sm backdrop-blur-sm">
              {lang === "it"
                ? `Vedi ${sectionTemplates.length} template →`
                : `View ${sectionTemplates.length} templates →`}
            </span>
          </div>

          {/* Info — compact */}
          <div className="px-3.5 py-3 flex items-center gap-2.5">
            {/* Emoji pill */}
            <span className="text-base flex-shrink-0 leading-none">{section.emoji}</span>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-[#0A84FF] transition-colors duration-200 truncate">
                <ScrambleText text={sectionMeta.label} />
              </h3>
              <p className="text-[11px] text-muted leading-snug truncate mt-0.5">
                {sectionMeta.subtitle}
              </p>
            </div>

            {/* Count + arrow */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 tabular-nums">
                {sectionTemplates.length}
              </span>
              <svg
                width="13" height="13" viewBox="0 0 14 14" fill="none"
                className="text-zinc-300 dark:text-zinc-600 group-hover:text-[#0A84FF] group-hover:translate-x-0.5 transition-all duration-200"
              >
                <path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SplitFlap counter ─────────────────────────────────────────────────────────

function SplitFlapDigit({ char }: { char: string }) {
  return <span key={char} className="split-flap-char">{char}</span>;
}

function SplitFlap({ to, duration = 1100 }: { to: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * to));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);

  const digits = String(value).split("");
  return (
    <span ref={ref} className="inline-flex tabular-nums">
      {digits.map((d, i) => <SplitFlapDigit key={`${i}-${d}`} char={d} />)}
    </span>
  );
}

// ── ScrambleText ──────────────────────────────────────────────────────────────

function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const frameRef = useRef(0);

  const scramble = () => {
    frameRef.current = 0;
    const totalFrames = Math.ceil(text.length * 2.5);
    clearInterval(timerRef.current!);
    timerRef.current = setInterval(() => {
      frameRef.current++;
      const revealed = Math.floor((frameRef.current / totalFrames) * text.length);
      setDisplay(
        text.split("").map((ch, i) => {
          if (i < revealed || ch === " " || ch === "&" || ch === "-") return ch;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join("")
      );
      if (frameRef.current >= totalFrames) {
        clearInterval(timerRef.current!);
        setDisplay(text);
      }
    }, 35);
  };

  const reset = () => { clearInterval(timerRef.current!); setDisplay(text); };
  useEffect(() => () => clearInterval(timerRef.current!), []);

  return <span onMouseEnter={scramble} onMouseLeave={reset}>{display}</span>;
}

// ── MagneticWrap ──────────────────────────────────────────────────────────────

function MagneticWrap({ children, strength = 0.38 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);

  const onMove = (e: React.MouseEvent) => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * strength;
      const dy = (e.clientY - (r.top  + r.height / 2)) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(raf.current);
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)";
    el.style.transform   = "translate(0px, 0px)";
    setTimeout(() => { if (el) el.style.transition = ""; }, 500);
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
}

// ── ScrollRevealCard ──────────────────────────────────────────────────────────

function ScrollRevealCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`scroll-reveal${visible ? " visible" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ── Ripple helper ─────────────────────────────────────────────────────────────
function addRipple(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const dot = document.createElement("span");
  dot.className = "ripple-dot";
  dot.style.left = `${e.clientX - rect.left}px`;
  dot.style.top = `${e.clientY - rect.top}px`;
  el.appendChild(dot);
  dot.addEventListener("animationend", () => dot.remove(), { once: true });
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function TemplateGrid({ externalQuery = "" }: { externalQuery?: string }) {
  const { lang } = useLang();
  const { ids: recentIds } = useRecentlyViewed();
  const recentTemplates = useMemo(
    () => recentIds.map((id) => byId[id]).filter(Boolean) as Template[],
    [recentIds]
  );
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [animKey, setAnimKey] = useState(0);
  const gridTopRef = useRef<HTMLDivElement>(null);
  const drillDirectionRef = useRef<"in" | "back">("in");

  const handleQuickView = useCallback((id: string) => setQuickViewId(id), []);

  // Dynamic accent colour when inside a category
  useEffect(() => {
    const root = document.documentElement;
    if (openCategoryId && SECTION_ACCENTS[openCategoryId]) {
      root.style.setProperty("--accent",     SECTION_ACCENTS[openCategoryId]);
      root.style.setProperty("--accent-rgb", SECTION_ACCENTS_RGB[openCategoryId]);
    } else {
      root.style.removeProperty("--accent");
      root.style.removeProperty("--accent-rgb");
    }
    return () => {
      root.style.removeProperty("--accent");
      root.style.removeProperty("--accent-rgb");
    };
  }, [openCategoryId]);

  useEffect(() => {
    fetch("/api/purchases")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => setPurchasedIds(data.templateIds ?? []))
      .catch(() => setPurchasedIds([]))
      .finally(() => setLoading(false));
  }, []);

  // Reset when query changes (from hero)
  useEffect(() => {
    if (externalQuery.trim()) {
      setOpenCategoryId(null);
      setVisibleCount(12);
      setAnimKey((k) => k + 1);
    }
  }, [externalQuery]);

  // Search results (when query active)
  const searchResults = useMemo(() => {
    const q = normalize(externalQuery.trim());
    if (!q) return [];
    const synonyms: string[] = SEARCH_SYNONYMS[q] ?? [];
    return templates.filter((tmpl) => {
      const itName = templateTranslations[tmpl.id]?.name ?? "";
      const itDesc = templateTranslations[tmpl.id]?.description ?? "";
      const matchesDirect =
        normalize(tmpl.name).includes(q) ||
        normalize(tmpl.description).includes(q) ||
        normalize(itName).includes(q) ||
        normalize(itDesc).includes(q) ||
        tmpl.tags.some((tag) => normalize(tag).includes(q));
      const matchesSynonym = synonyms.some((syn) =>
        normalize(tmpl.name).includes(normalize(syn)) ||
        normalize(tmpl.description).includes(normalize(syn)) ||
        tmpl.tags.some((tag) => normalize(tag).includes(normalize(syn)))
      );
      return matchesDirect || matchesSynonym;
    }).sort((a, b) => b.downloads - a.downloads);
  }, [externalQuery]);

  const isSearching = externalQuery.trim() !== "";

  // Current category data
  const openSection = openCategoryId ? SECTIONS.find((s) => s.id === openCategoryId) : null;
  const openSectionTemplates = openSection
    ? (openSection.ids.map((id) => byId[id]).filter(Boolean) as Template[])
    : [];
  const openSectionMeta = openSection
    ? t[lang].sections[openSection.id as keyof typeof t[typeof lang]["sections"]]
    : null;

  const handleOpenCategory = (id: string) => {
    drillDirectionRef.current = "in";
    setOpenCategoryId(id);
    setVisibleCount(12);
    setAnimKey((k) => k + 1);
    // Scroll to grid top
    setTimeout(() => {
      gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleBack = () => {
    drillDirectionRef.current = "back";
    setOpenCategoryId(null);
    setAnimKey((k) => k + 1);
    setTimeout(() => {
      gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div id="browse" className="px-4 sm:px-6 pb-24 max-w-5xl mx-auto">

      {/* Scroll anchor */}
      <div ref={gridTopRef} className="h-0 -mt-4" />

      {/* ── Studio Access hint ── */}
      <div className="mb-8 mt-4 flex items-center justify-between gap-3 px-1">
        <p className="text-[13px] text-muted">{t[lang].studioAccessBanner.title}</p>
        <MagneticWrap><StudioAccessButton compact /></MagneticWrap>
      </div>

      {/* ══════════════════════════════════════════════════
          VIEW 1 — Search results
      ══════════════════════════════════════════════════ */}
      {isSearching && (
        <div className="space-y-5">
          {searchResults.length > 0 ? (
            <>
              <p className="text-[13px] text-muted font-medium px-1">
                {t[lang].search.found.replace("{{n}}", String(searchResults.length))}
              </p>
              <div key={animKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                  : searchResults.slice(0, visibleCount).map((tmpl, i) => (
                      <ScrollRevealCard key={tmpl.id} delay={i * 35}>
                        <TemplateCard template={tmpl} purchasedIds={purchasedIds} onQuickView={handleQuickView} />
                      </ScrollRevealCard>
                    ))}
              </div>
              {!loading && searchResults.length > visibleCount && (
                <div className="flex justify-center mt-6">
                  <MagneticWrap>
                    <button
                      onClick={() => setVisibleCount((v) => v + 12)}
                      className="px-6 py-2.5 glass border border-theme rounded-2xl text-[13px] font-semibold text-muted hover:text-theme hover:border-[#0A84FF]/30 transition-all duration-200 ios-spring"
                    >
                      {lang === "it"
                        ? `Mostra altri ${Math.min(12, searchResults.length - visibleCount)} →`
                        : `Show ${Math.min(12, searchResults.length - visibleCount)} more →`}
                    </button>
                  </MagneticWrap>
                </div>
              )}
            </>
          ) : (
            <div className="py-24 flex flex-col items-center gap-4 text-center">
              <span className="text-5xl">🔍</span>
              <p className="text-[17px] font-semibold text-theme">{t[lang].search.notFound}</p>
              <p className="text-[14px] text-muted">{t[lang].search.notFoundDesc}</p>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          VIEW 2 — Category templates (drilled in)
      ══════════════════════════════════════════════════ */}
      {!isSearching && openCategoryId && openSection && openSectionMeta && (
        <div key={`drill-${animKey}`} className={drillDirectionRef.current === "in" ? "anim-drill-in" : "anim-drill-back"}>
          {/* Back header */}
          <div className="flex items-center gap-3 mb-7">
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-[13px] font-semibold text-muted hover:text-theme transition-colors duration-200 group"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                className="group-hover:-translate-x-0.5 transition-transform duration-200">
                <path d="M10 7H2M6 3l-4 4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {lang === "it" ? "Categorie" : "Categories"}
            </button>
            <span className="text-zinc-300 dark:text-zinc-600">/</span>
            <span className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
              {openSection.emoji} {openSectionMeta.label}
            </span>
            <span className="bg-[#0A84FF]/10 text-[#0A84FF] rounded-full px-2 py-0.5 text-[11px] font-bold">
              {openSectionTemplates.length}
            </span>
          </div>

          {/* Template cards */}
          <div key={animKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {loading
              ? Array.from({ length: openSectionTemplates.length || 3 }).map((_, i) => <SkeletonCard key={i} />)
              : openSectionTemplates.map((tmpl, i) => (
                  <ScrollRevealCard key={tmpl.id} delay={i * 45}>
                    <TemplateCard template={tmpl} purchasedIds={purchasedIds} onQuickView={handleQuickView} />
                  </ScrollRevealCard>
                ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          Recently viewed (default view only, no search)
      ══════════════════════════════════════════════════ */}
      {!isSearching && !openCategoryId && recentTemplates.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4 px-1">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="text-muted" aria-hidden>
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M7 4v3.5l2 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[11px] font-bold text-muted uppercase tracking-[0.15em]">
              {lang === "it" ? "Visti di recente" : "Recently viewed"}
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
            {recentTemplates.map((tmpl) => (
              <div key={tmpl.id} className="flex-shrink-0 w-[160px]">
                <TemplateCard template={tmpl} purchasedIds={purchasedIds} onQuickView={handleQuickView} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          VIEW 3 — Category cards grid (default)
      ══════════════════════════════════════════════════ */}
      {!isSearching && !openCategoryId && (
        <div key={`grid-${animKey}`} className={drillDirectionRef.current === "back" ? "anim-drill-back" : ""}>
          {/* Section label */}
          <div className="flex items-center gap-4 mb-6 px-1">
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-[10px] font-bold text-muted uppercase tracking-[0.18em] shrink-0">
              <SplitFlap to={templates.length} /> {lang === "it" ? "template disponibili" : "templates available"}
            </span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {SECTIONS.map((section, i) => {
              const sectionTemplates = section.ids.map((id) => byId[id]).filter(Boolean) as Template[];
              if (sectionTemplates.length === 0) return null;
              return (
                <CategoryCard
                  key={section.id}
                  section={section}
                  sectionTemplates={sectionTemplates}
                  onClick={() => handleOpenCategory(section.id)}
                  lang={lang}
                  index={i}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* ── Quick Preview Modal ── */}
      {quickViewId && (
        <PreviewModal templateId={quickViewId} onClose={() => setQuickViewId(null)} />
      )}
    </div>
  );
}
