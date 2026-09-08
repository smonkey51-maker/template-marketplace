"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ClipboardList } from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";
import { Template, formatPrice, getDownloadType } from "@/lib/templates";
import { useLang } from "@/components/LanguageProvider";
import { templateTranslations } from "@/lib/i18n";
import { useWishlist } from "@/lib/useWishlist";
import { getKindLabel } from "@/lib/categories";
import { PLATFORM_COLORS } from "@/components/platformColors";

// The platform mock-ups are ~600 lines of inline SVG that only external-format
// cards ever show, so they are fetched on demand rather than shipped with every
// page that renders a card. The placeholder is the card's own platform colour,
// which is what sits behind the mock-up anyway.
const PlatformPreview = dynamic(() => import("@/components/PlatformPreview"), {
  ssr: false,
});

type Lang = "it" | "en";

/* ── Lazy iframe thumbnail ──────────────────────────────────────────── */
function UIThumbnail({
  template,
  isPurchased,
  lang,
}: {
  template: Template;
  isPurchased: boolean;
  lang: Lang;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const dlType = getDownloadType(template);
  const platformData = PLATFORM_COLORS[dlType] ?? PLATFORM_COLORS.html;
  const isExternal = dlType !== "html" && dlType !== "shopify" && dlType !== "wordpress";

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-52 overflow-hidden"
      style={{ background: platformData.from }}
    >
      {/* For external platforms: faithful mini-preview of each platform's UI */}
      {isExternal ? (
        <div className="absolute inset-0 overflow-hidden">
          <PlatformPreview type={dlType} />
        </div>
      ) : (
        <>
          {/* Skeleton while loading */}
          {(!visible || !iframeLoaded) && (
            <div
              className="absolute inset-0 flex flex-col p-4 gap-3"
              style={{
                background: `linear-gradient(145deg, ${platformData.from}cc, ${platformData.to}aa)`,
              }}
            >
              <div className="h-3 w-2/3 skeleton-shimmer" style={{ opacity: 0.3 }} />
              <div className="h-2 w-full skeleton-shimmer" style={{ opacity: 0.2 }} />
              <div className="h-2 w-5/6 skeleton-shimmer" style={{ opacity: 0.2 }} />
              <div className="flex-1" />
              <div className="flex gap-2">
                <div className="h-6 w-20 skeleton-shimmer" style={{ opacity: 0.25 }} />
                <div className="h-6 w-16 skeleton-shimmer" style={{ opacity: 0.2 }} />
              </div>
            </div>
          )}
          {/* Scaled-down iframe preview */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: "scale(0.36)",
              transformOrigin: "top left",
              width: "278%",
              height: "278%",
            }}
          >
            {visible && (
              <iframe
                src={`/api/preview/${template.id}`}
                title={template.name}
                sandbox="allow-scripts"
                loading="lazy"
                className="w-full border-0"
                style={{ height: "530px" }}
                onLoad={() => setIframeLoaded(true)}
              />
            )}
          </div>
        </>
      )}

      {/* Bottom gradient overlay — elegant fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      {/* Platform badge — top-left */}
      <div
        className="absolute top-2 left-2 z-20 flex items-center gap-1 px-1.5 py-0.5"
        style={{
          background: "rgba(0,0,0,0.48)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/90">
          {platformData.label}
        </span>
      </div>

      {/* isNew / editorsPick badge — top-right */}
      {(template.isNew || template.editorsPick) && (
        <div
          className="absolute top-2 right-2 z-20 px-1.5 py-0.5"
          style={{
            background: template.editorsPick ? "var(--accent)" : "rgba(0,0,0,0.48)",
            backdropFilter: "blur(6px)",
            border: template.editorsPick ? "none" : "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/95">
            {template.editorsPick
              ? lang === "it"
                ? "✦ Staff"
                : "✦ Staff Pick"
              : lang === "it"
                ? "Nuovo"
                : "New"}
          </span>
        </div>
      )}

      {/* Purchased badge */}
      {isPurchased && <PurchasedBadge lang={lang} />}
    </div>
  );
}

function PurchasedBadge({ lang }: { lang: Lang }) {
  return (
    <span
      className="absolute bottom-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm"
      style={{ background: "var(--success)", color: "var(--bg)" }}
    >
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M2 6l2.8 3 5.2-5"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {lang === "it" ? "Acquistato" : "Purchased"}
    </span>
  );
}

/* ── Spotlight hook — tracks mouse relative to card, outputs a CSS radial gradient ──
 *
 * Mutates the overlay's DOM style directly instead of going through React
 * state: `onMouseMove` used to call `setStyle` on every single event, and a
 * browser fires dozens of these per second, so hovering a card meant a React
 * re-render (and a fresh gradient string) at the same rate — noticeably
 * janky with several cards in a grid. The mouse position is cheap to store in
 * a ref on every event; the expensive parts (`getBoundingClientRect`, writing
 * the gradient) are coalesced to once per animation frame, and never touch
 * React's render cycle at all. */
function useSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const prefersReduced = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const applyFrame = useCallback(() => {
    rafRef.current = null;
    const el = ref.current;
    const overlay = overlayRef.current;
    if (!el || !overlay) return;
    const rect = el.getBoundingClientRect();
    const x = ((posRef.current.x - rect.left) / rect.width) * 100;
    const y = ((posRef.current.y - rect.top) / rect.height) * 100;
    overlay.style.background = `radial-gradient(circle at ${x}% ${y}%, var(--glow-gold) 0%, transparent 65%)`;
    overlay.style.opacity = "1";
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced.current) return;
      posRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(applyFrame);
      }
    },
    [applyFrame],
  );

  const onMouseLeave = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (overlayRef.current) overlayRef.current.style.opacity = "0";
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { ref, overlayRef, onMouseMove, onMouseLeave };
}

/* ── Main card ──────────────────────────────────────────────────────── */
export default function TemplateCard({
  template,
  purchasedIds,
  onQuickView,
}: {
  template: Template;
  purchasedIds: string[];
  onQuickView?: (id: string) => void;
}) {
  const { lang } = useLang();
  const { toggle, isWishlisted } = useWishlist();
  const [heartPopping, setHeartPopping] = useState(false);
  const isPurchased = purchasedIds.includes(template.id);
  const displayName =
    lang === "it" ? (templateTranslations[template.id]?.name ?? template.name) : template.name;
  const displayDesc =
    lang === "it"
      ? (templateTranslations[template.id]?.description ?? template.description)
      : template.description;
  const saved = isWishlisted(template.id);
  const { ref: spotlightRef, overlayRef, onMouseMove, onMouseLeave } = useSpotlight();

  const handleWishlist = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggle(template.id);
      setHeartPopping(true);
      setTimeout(() => setHeartPopping(false), 400);
    },
    [toggle, template.id],
  );

  return (
    <div
      ref={spotlightRef}
      className="group relative h-full transition-all duration-300 ease-premium hover:-translate-y-0.5"
      style={{ "--card-hover-shadow": "0 16px 48px rgba(0,0,0,0.22)" } as React.CSSProperties}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Spotlight overlay — rendered outside the Link to avoid z-index conflicts.
          Its background/opacity are written directly to the DOM by useSpotlight,
          not via React state — see the hook for why. */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
      />
      <Link
        href={`/${lang}/templates/${template.id}`}
        aria-label={displayName}
        className="shoji-card card-sweep card-tilt shine-sweep bg-card border border-theme r-glass relative overflow-hidden flex flex-col h-full active:opacity-90 block transition-shadow duration-300 group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.22)]"
      >
        {/* Thumbnail */}
        <div
          className="relative"
          onClick={(e) => {
            if (onQuickView) {
              // Rispettiamo Cmd/Ctrl/Shift/Alt click per permettere l'apertura in nuova scheda
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(template.id);
              }
            }
          }}
        >
          <UIThumbnail template={template} isPurchased={isPurchased} lang={lang} />
          {/* Hover overlay — quick view label (Mobbin-style) */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-250 pointer-events-none flex items-center justify-center">
            <span
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[11px] font-bold uppercase tracking-widest text-white/90 border border-white/30 px-3 py-1.5"
              style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
            >
              {lang === "it" ? "Anteprima" : "Preview"}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div
          className="px-4 py-4 flex flex-col flex-1"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {/* Category eyebrow — mono index label, matching the Figma
              editorial redesign's ProductCard structure */}
          <span
            className="mb-1.5 text-[9px] font-semibold uppercase"
            style={{ color: "var(--muted)", letterSpacing: "0.12em" }}
          >
            {getKindLabel(template, lang)}
          </span>

          {/* Name */}
          <h3
            className="text-[13px] font-semibold leading-snug mb-1.5 tracking-[-0.01em]"
            style={{ fontFamily: "var(--font-inter)", color: "var(--text)" }}
          >
            {displayName}
          </h3>

          {/* Description — one line only, visual is the protagonist */}
          <p
            className="text-[11px] font-light leading-snug line-clamp-1 flex-1 opacity-70"
            style={{ color: "var(--muted)" }}
          >
            {displayDesc}
          </p>

          {/* Price + wishlist */}
          <div
            className="mt-3 pt-3 flex items-center justify-between"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <span
              className="display-serif text-[22px] leading-none"
              style={{ color: "var(--accent)" }}
            >
              {template.price === 0
                ? lang === "it"
                  ? "Gratis"
                  : "Free"
                : formatPrice(template.price)}
            </span>
            <button
              onClick={handleWishlist}
              aria-label={
                saved
                  ? lang === "it"
                    ? "Rimuovi dai salvati"
                    : "Remove from saved"
                  : lang === "it"
                    ? "Salva"
                    : "Save"
              }
              className={`p-1 transition-colors duration-200 ${
                saved
                  ? "text-[var(--terra)]"
                  : "text-muted hover:text-[var(--terra)] opacity-0 group-hover:opacity-100"
              }`}
              style={
                heartPopping
                  ? { animation: "heart-pop 0.35s cubic-bezier(0.34,1.56,0.64,1) both" }
                  : undefined
              }
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M7 12S1 8 1 4.5A3.5 3.5 0 017 2.1a3.5 3.5 0 016 2.4C13 8 7 12 7 12z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                  fill={saved ? "currentColor" : "none"}
                />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
