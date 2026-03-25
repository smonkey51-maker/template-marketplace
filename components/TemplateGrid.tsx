"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Image from "next/image";
import { templates, bundles, Template, getDownloadType, DownloadType } from "@/lib/templates";
import TemplateCard from "@/components/TemplateCard";
import StudioAccessButton from "@/components/StudioAccessButton";
import { useLang } from "@/components/LanguageProvider";
import { t, SEARCH_SYNONYMS, templateTranslations } from "@/lib/i18n";
import PreviewModal from "@/components/PreviewModal";
import { useRecentlyViewed } from "@/lib/useRecentlyViewed";

// ── Platform macro-categories ────────────────────────────────────────────────

type PlatformFilter = "all" | DownloadType;

const PLATFORMS: {
  id: PlatformFilter;
  label: { it: string; en: string };
  icon: string;
  color?: string;
}[] = [
  { id: "all",       label: { it: "Tutte",       en: "All" },        icon: "⊞" },
  { id: "html",      label: { it: "HTML",        en: "HTML" },       icon: "🌐", color: "var(--accent)" },
  { id: "shopify",   label: { it: "Shopify",     en: "Shopify" },    icon: "🛒", color: "var(--platform-shopify)" },
  { id: "wordpress", label: { it: "WordPress",   en: "WordPress" },  icon: "📝", color: "var(--platform-wordpress)" },
  { id: "notion",    label: { it: "Notion",      en: "Notion" },     icon: "📓", color: "var(--platform-notion)" },
  { id: "canva",     label: { it: "Canva",       en: "Canva" },      icon: "🎨", color: "var(--platform-canva)" },
  { id: "webflow",   label: { it: "Webflow",     en: "Webflow" },    icon: "🔷", color: "var(--platform-webflow)" },
  { id: "framer",    label: { it: "Framer",      en: "Framer" },     icon: "◆",  color: "var(--platform-framer)" },
  { id: "excel",     label: { it: "Excel",       en: "Excel" },      icon: "📊", color: "var(--platform-excel)" },
  { id: "sheets",    label: { it: "Sheets",      en: "Sheets" },     icon: "📋", color: "var(--platform-sheets)" },
];

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
  { id: "elearning", emoji: "🎓", gradientFrom: "#1a3a5c", gradientTo: "#0d2240", ids: ["course-landing-page", "webinar-registration", "course-curriculum-builder", "student-success-story", "course-email-welcome"] },
  { id: "shopify-ecommerce", emoji: "🛒", gradientFrom: "#2d4a1b", gradientTo: "#1a2e0d", ids: ["shopify-product-landing", "shopify-collection-grid", "shopify-announcement-bar"] },
  { id: "wordpress-themes", emoji: "📝", gradientFrom: "#0d3b5c", gradientTo: "#06243a", ids: ["wordpress-business-theme", "wordpress-blog-theme", "wordpress-portfolio-theme"] },
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
  "elearning":           "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=280&fit=crop&q=80&auto=format",
  "shopify-ecommerce":   "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=280&fit=crop&q=80&auto=format",
  "wordpress-themes":    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=280&fit=crop&q=80&auto=format",
};

const byId = Object.fromEntries(templates.map((tmpl) => [tmpl.id, tmpl]));


// ── Scramble chars ────────────────────────────────────────────────────────────
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// ── Utilities ────────────────────────────────────────────────────────────────

function normalize(str: string): string {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// ── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-card border border-theme rounded-none overflow-hidden animate-pulse">
      <div className="h-48 bg-theme/5" />
      <div className="p-4 flex flex-col gap-2.5">
        <div className="h-2 w-16 bg-theme/8" />
        <div className="h-3.5 w-3/4 bg-theme/8" />
        <div className="mt-2 flex items-center justify-between">
          <div className="h-3.5 w-10 bg-theme/8" />
          <div className="h-2.5 w-12 bg-theme/8" />
        </div>
      </div>
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
  const cardRef   = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const frameRef  = useRef<number>(0);
  const [revealed, setRevealed] = useState(false);
  const sectionMeta = t[lang].sections[section.id as keyof typeof t[typeof lang]["sections"]];
  const imgSrc = CATEGORY_IMAGES[section.id];

  // Scroll reveal
  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // 3-D tilt — respect reduced motion
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      el.style.transform = `perspective(700px) rotateX(${(-y * 6).toFixed(1)}deg) rotateY(${(x * 6).toFixed(1)}deg) scale3d(1.02,1.02,1.02)`;
    });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    cancelAnimationFrame(frameRef.current);
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 0.4s cubic-bezier(0.34,1.2,0.64,1)";
    el.style.transform   = "perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    setTimeout(() => { if (el) el.style.transition = ""; }, 400);
  };

  return (
    <div
      ref={revealRef}
      className={`scroll-reveal${revealed ? " visible" : ""}`}
      style={{ transitionDelay: `${index * 45}ms` }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 blur-2xl"
        style={{ background: `radial-gradient(ellipse at 50% 100%, ${section.gradientFrom}88 0%, transparent 70%)` }}
      />
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => { addRipple(e); onClick(); }}
        className="group relative rounded-none overflow-hidden cursor-pointer border border-white/10 dark:border-white/8"
        style={{ willChange: "transform", height: "172px" }}
      >
        {/* Background — Unsplash image or gradient fallback */}
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={section.id}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            priority={false}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${section.gradientFrom}, ${section.gradientTo})` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="select-none" style={{ fontSize: "3rem", filter: "drop-shadow(0 2px 14px rgba(0,0,0,0.6))", opacity: 0.7 }}>
                {section.emoji}
              </span>
            </div>
          </div>
        )}

        {/* Permanent gradient — ensures text readability */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.22) 52%, rgba(0,0,0,0.06) 100%)" }}
        />

        {/* Hover tint — category colour */}
        <div
          className="absolute inset-0 z-[5] opacity-0 group-hover:opacity-20 transition-opacity duration-150 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${section.gradientFrom}, ${section.gradientTo})` }}
        />

        {/* Specular top edge */}
        <div
          className="absolute top-0 left-[8%] right-[8%] h-px pointer-events-none z-30"
          style={{ background: "var(--glass-top-edge)" }}
        />

        {/* Index — top right */}
        <span className="absolute top-3 right-3.5 z-20 text-[9px] font-bold text-white/20 tabular-nums select-none tracking-wider">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Text content — bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-3.5 pb-3">
          <p className="text-white/60 text-[9.5px] font-semibold uppercase tracking-[0.12em] mb-1.5 select-none">
            {section.emoji}&nbsp;&nbsp;{sectionTemplates.length}&nbsp;{lang === "it" ? "template" : "templates"}
          </p>
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="text-white text-[13.5px] font-semibold leading-snug truncate">
                <ScrambleText text={sectionMeta.label} />
              </h3>
              <p className="text-white/55 text-[10.5px] leading-snug mt-0.5 truncate">
                {sectionMeta.subtitle}
              </p>
            </div>
            <svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              className="text-white/50 sm:text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-150 flex-shrink-0 mb-1"
            >
              <path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
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
  const rafRef = useRef<number>(0);
  const startRef = useRef(0);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const scramble = () => {
    if (reducedMotion) return;
    startRef.current = performance.now();
    const duration = text.length * 2.5 * 35; // same total duration as before
    const animate = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const revealed = Math.floor(progress * text.length);
      setDisplay(
        text.split("").map((ch, i) => {
          if (i < revealed || ch === " " || ch === "&" || ch === "-") return ch;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join("")
      );
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
      else setDisplay(text);
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
  };

  const reset = () => { cancelAnimationFrame(rafRef.current); setDisplay(text); };
  useEffect(() => { reset(); return () => cancelAnimationFrame(rafRef.current); }, [text]);

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

export default function TemplateGrid({ externalQuery = "", onClearSearch }: { externalQuery?: string; onClearSearch?: () => void }) {
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
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("all");
  const gridTopRef = useRef<HTMLDivElement>(null);
  const drillDirectionRef = useRef<"in" | "back">("in");

  const handleQuickView = useCallback((id: string) => setQuickViewId(id), []);

  // Accent colour stays brand gold across all categories

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

  // Search filter state
  const [searchTypeFilter, setSearchTypeFilter] = useState<"all" | "ui" | "prompt">("all");
  const [searchSort, setSearchSort] = useState<"relevance" | "popular" | "price-asc" | "price-desc">("relevance");

  // Search results with relevance scoring
  const searchResults = useMemo(() => {
    const raw = normalize(externalQuery.trim());
    if (!raw) return [];
    const words = raw.split(/\s+/).filter(Boolean);
    if (words.length === 0) return [];

    // Collect all synonym expansions for each word
    const allTerms = new Set<string>(words);
    for (const w of words) {
      const syns = SEARCH_SYNONYMS[w];
      if (syns) syns.forEach((s) => allTerms.add(normalize(s)));
    }
    const terms = Array.from(allTerms);

    // Score each template for relevance
    const scored = templates.map((tmpl) => {
      const itName = templateTranslations[tmpl.id]?.name ?? "";
      const itDesc = templateTranslations[tmpl.id]?.description ?? "";
      const nameNorm = normalize(tmpl.name);
      const itNameNorm = normalize(itName);
      const descNorm = normalize(tmpl.description);
      const itDescNorm = normalize(itDesc);
      const tagsNorm = tmpl.tags.map(normalize).join(" ");
      const haystack = [nameNorm, descNorm, itNameNorm, itDescNorm, tagsNorm].join(" ");

      let score = 0;
      for (const term of terms) {
        if (!haystack.includes(term)) continue;
        // Exact name match = highest score
        if (nameNorm === term || itNameNorm === term) score += 100;
        // Name contains term
        else if (nameNorm.includes(term) || itNameNorm.includes(term)) score += 50;
        // Tags match
        else if (tagsNorm.includes(term)) score += 20;
        // Description match
        else if (descNorm.includes(term) || itDescNorm.includes(term)) score += 10;
      }
      // Tiny tiebreaker for popularity (max 2 points — won't override relevance)
      score += Math.min(tmpl.downloads / 500, 2);
      return { tmpl, score };
    }).filter(({ score }) => score > 0);

    // Apply type filter
    const filtered = scored.filter(({ tmpl }) => {
      if (searchTypeFilter === "all") return true;
      return tmpl.category === searchTypeFilter;
    });

    // Sort
    if (searchSort === "relevance") {
      filtered.sort((a, b) => b.score - a.score);
    } else if (searchSort === "popular") {
      filtered.sort((a, b) => b.tmpl.downloads - a.tmpl.downloads);
    } else if (searchSort === "price-asc") {
      filtered.sort((a, b) => a.tmpl.price - b.tmpl.price);
    } else {
      filtered.sort((a, b) => b.tmpl.price - a.tmpl.price);
    }

    return filtered.map(({ tmpl }) => tmpl);
  }, [externalQuery, searchTypeFilter, searchSort]);

  const isSearching = externalQuery.trim() !== "";

  // Platform-filtered sections — only show sections that have templates matching the selected platform
  const filteredSections = useMemo(() => {
    if (platformFilter === "all") return SECTIONS;
    return SECTIONS.map((section) => {
      const matchingIds = section.ids.filter((id) => {
        const tmpl = byId[id];
        if (!tmpl) return false;
        return getDownloadType(tmpl) === platformFilter;
      });
      return { ...section, ids: matchingIds };
    }).filter((section) => section.ids.length > 0);
  }, [platformFilter]);

  // Count templates per platform for badges
  const platformCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const tmpl of templates) {
      const dt = getDownloadType(tmpl);
      counts[dt] = (counts[dt] || 0) + 1;
    }
    counts["all"] = templates.length;
    return counts;
  }, []);

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
        <div className="space-y-5" role="region" aria-live="polite" aria-label={lang === "it" ? "Risultati ricerca" : "Search results"}>
          {/* Search toolbar: filters + sort */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-[13px] text-muted font-medium">
                {t[lang].search.found.replace("{{n}}", String(searchResults.length))}
              </p>
              {/* Type filter chips */}
              <div className="flex items-center gap-1 ml-2">
                {(["all", "ui", "prompt"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => { setSearchTypeFilter(type); setVisibleCount(12); }}
                    className={`px-2.5 py-1 text-[11px] font-semibold border transition-all duration-150 ${
                      searchTypeFilter === type
                        ? "border-accent/40 text-accent"
                        : "border-theme text-muted hover:text-theme hover:border-accent/20"
                    }`}
                    style={searchTypeFilter === type ? { background: "var(--accent-bg)" } : undefined}
                  >
                    {type === "all" ? (lang === "it" ? "Tutti" : "All") :
                     type === "ui" ? "UI" : "Prompt"}
                  </button>
                ))}
              </div>
            </div>
            {/* Sort dropdown */}
            <select
              value={searchSort}
              onChange={(e) => setSearchSort(e.target.value as typeof searchSort)}
              className="text-[11px] font-medium text-muted bg-input border border-theme rounded-none px-2.5 py-1.5 outline-none focus:border-accent transition-colors"
              style={{ color: "var(--muted)", background: "var(--input-bg)" }}
            >
              <option value="relevance">{lang === "it" ? "Più rilevanti" : "Most relevant"}</option>
              <option value="popular">{lang === "it" ? "Più scaricati" : "Most popular"}</option>
              <option value="price-asc">{lang === "it" ? "Prezzo ↑" : "Price ↑"}</option>
              <option value="price-desc">{lang === "it" ? "Prezzo ↓" : "Price ↓"}</option>
            </select>
          </div>

          {searchResults.length > 0 ? (
            <>
              <div key={animKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                  : searchResults.slice(0, visibleCount).map((tmpl, i) => (
                      <div key={tmpl.id} className="opacity-0"
                        style={{ animation: "cardEntrance 0.4s ease forwards", animationDelay: `${Math.min(i * 40, 400)}ms` }}>
                        <TemplateCard template={tmpl} purchasedIds={purchasedIds} onQuickView={handleQuickView} />
                      </div>
                    ))}
              </div>
              {!loading && searchResults.length > visibleCount && (
                <div className="flex justify-center mt-6">
                  <MagneticWrap>
                    <button
                      onClick={() => setVisibleCount((v) => v + 12)}
                      className="px-6 py-2.5 glass border border-theme rounded-none text-[13px] font-semibold text-muted hover:text-theme hover:border-accent/30 transition-all duration-200 ios-spring"
                    >
                      {lang === "it"
                        ? `Mostra altri ${Math.min(12, searchResults.length - visibleCount)} di ${searchResults.length} →`
                        : `Show ${Math.min(12, searchResults.length - visibleCount)} more of ${searchResults.length} →`}
                    </button>
                  </MagneticWrap>
                </div>
              )}
            </>
          ) : (
            <div className="py-16 flex flex-col items-center gap-4 text-center">
              <p className="text-[32px]" style={{ color: "var(--muted)", opacity: 0.4 }}>—</p>
              <p className="text-[17px] font-semibold text-theme">{t[lang].search.notFound}</p>
              <p className="text-[14px] text-muted">{t[lang].search.notFoundDesc}</p>
              {onClearSearch && (
                <button
                  onClick={onClearSearch}
                  className="mt-2 btn-brand-sm"
                >
                  {t[lang].search.resetCta} →
                </button>
              )}
              {/* Popular suggestions */}
              <div className="mt-8 w-full max-w-3xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted mb-4">
                  {lang === "it" ? "Più popolari" : "Most popular"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {templates.sort((a, b) => b.downloads - a.downloads).slice(0, 3).map((tmpl) => (
                    <TemplateCard key={tmpl.id} template={tmpl} purchasedIds={purchasedIds} onQuickView={handleQuickView} />
                  ))}
                </div>
              </div>
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
            <span style={{ color: "var(--border)" }}>/</span>
            <span className="text-[13px] font-semibold text-theme">
              {openSection.emoji} {openSectionMeta.label}
            </span>
            <span className="bg-accent/10 text-accent rounded-none px-2 py-0.5 text-[11px] font-bold">
              {openSectionTemplates.length}
            </span>
          </div>

          {/* Template cards */}
          <div key={animKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {loading
              ? Array.from({ length: openSectionTemplates.length || 3 }).map((_, i) => <SkeletonCard key={i} />)
              : openSectionTemplates.map((tmpl, i) => (
                  <div key={tmpl.id} className="opacity-0"
                    style={{ animation: "cardEntrance 0.4s ease forwards", animationDelay: `${Math.min(i * 45, 400)}ms` }}>
                    <TemplateCard template={tmpl} purchasedIds={purchasedIds} onQuickView={handleQuickView} />
                  </div>
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
          <div className="relative">
            <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
              {recentTemplates.map((tmpl) => (
                <div key={tmpl.id} className="flex-shrink-0 w-[160px]">
                  <TemplateCard template={tmpl} purchasedIds={purchasedIds} onQuickView={handleQuickView} />
                </div>
              ))}
            </div>
            {/* Fade edges to signal horizontal scroll */}
            <div className="absolute inset-y-0 right-0 w-12 pointer-events-none" style={{ background: "linear-gradient(to left, var(--bg), transparent)" }} />
            <div className="absolute inset-y-0 left-0 w-6 pointer-events-none" style={{ background: "linear-gradient(to right, var(--bg), transparent)" }} />
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          VIEW 3 — Category cards grid (default)
      ══════════════════════════════════════════════════ */}
      {!isSearching && !openCategoryId && (
        <div key={`grid-${animKey}`} className={drillDirectionRef.current === "back" ? "anim-drill-back" : ""}>

          {/* ── Platform filter bar ── */}
          <div className="mb-6">
            <p className="text-[10px] font-bold text-muted uppercase tracking-[0.15em] mb-3 px-1">
              {lang === "it" ? "Filtra per piattaforma" : "Filter by platform"}
            </p>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
              {PLATFORMS.filter((p) => p.id === "all" || (platformCounts[p.id] ?? 0) > 0).map((p) => {
                const isActive = platformFilter === p.id;
                const count = platformCounts[p.id] ?? 0;
                return (
                  <button
                    key={p.id}
                    onClick={() => { setPlatformFilter(p.id); setAnimKey((k) => k + 1); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold border whitespace-nowrap transition-all duration-150 shrink-0 ${
                      isActive
                        ? "border-accent/40 text-accent"
                        : "border-theme text-muted hover:text-theme hover:border-accent/20"
                    }`}
                    style={isActive ? { background: "var(--accent-bg)", borderColor: p.color ? `${p.color}44` : undefined, color: p.color || undefined } : undefined}
                  >
                    <span className="text-[13px]">{p.icon}</span>
                    {p.label[lang]}
                    {p.id !== "all" && <span className="text-[9px] opacity-60 ml-0.5">{count}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section label */}
          <div className="flex items-center gap-4 mb-6 px-1">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <span className="text-[10px] font-bold text-muted uppercase tracking-[0.18em] shrink-0">
              {platformFilter === "all" ? (
                <><SplitFlap to={templates.length} /> {lang === "it" ? "template" : "templates"} · {bundles.length} bundle</>
              ) : (
                <>{filteredSections.reduce((sum, s) => sum + s.ids.length, 0)} {platformFilter} {lang === "it" ? "template" : "templates"}</>
              )}
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>

          {filteredSections.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredSections.map((section, i) => {
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
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted text-[13px]">
                {lang === "it"
                  ? "Nessun template per questa piattaforma ancora. Resta sintonizzato!"
                  : "No templates for this platform yet. Stay tuned!"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Quick Preview Modal ── */}
      {quickViewId && (
        <PreviewModal templateId={quickViewId} onClose={() => setQuickViewId(null)} />
      )}
    </div>
  );
}
