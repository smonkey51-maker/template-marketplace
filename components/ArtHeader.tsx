import type { ReactNode } from "react";

/**
 * Page header — eyebrow, big Fraunces title, optional description, with the
 * page's painting as a faint full-bleed backdrop behind the text (same
 * masked-opacity treatment as the homepage splash's Vermeer, see
 * HomeSplash.tsx). Matches the Figma Make prototype's PageIntro.tsx layout
 * while keeping FORMA's paintings rather than a flat ground — plain
 * everywhere was tried first and read as decoration lost, not gained.
 *
 * Keeps the same export names and prop shape (`ArtHeader`, `PAINTINGS`,
 * `painting`/`kicker`/`title`/`subtitle`/`compact`) as a drop-in replacement,
 * so none of its call sites needed touching.
 */
export const PAINTINGS = {
  catalogo: "/paintings/seurat.jpg",
  guida: "/paintings/monet.jpg",
  studio: "/paintings/kandinsky.jpg",
  account: "/paintings/vangogh.jpg",
  manifesto: "/paintings/vermeer.jpg",
} as const;

export function ArtHeader({
  painting,
  kicker,
  title,
  subtitle,
  position = "center 42%",
  compact = false,
}: {
  painting?: string;
  kicker?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  position?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden ${compact ? "pb-4 pt-8" : "pb-4 pt-12 md:pt-16"}`}
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      {painting ? (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('${painting}')`,
            backgroundSize: "cover",
            backgroundPosition: position,
            opacity: 0.14,
            maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          }}
        />
      ) : null}
      <div className="relative">
        {kicker ? (
          <span
            className="block text-[11px] font-semibold uppercase"
            style={{ color: "var(--muted)", letterSpacing: "0.2em" }}
          >
            {kicker}
          </span>
        ) : null}
        <h1
          className={
            compact
              ? "mt-3 text-[clamp(1.75rem,4vw,2.5rem)]"
              : "mt-4 text-[clamp(2.25rem,5.5vw,4rem)]"
          }
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: "-0.01em",
            color: "var(--text)",
          }}
        >
          {title}
        </h1>
        {subtitle ? (
          <p
            className="mt-4 max-w-xl text-[15px] leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
