import type { ReactNode } from "react";

/**
 * Page header — eyebrow, big Fraunces title, optional description. Matches
 * the Figma Make prototype's PageIntro.tsx: plain ground, no artwork.
 *
 * This replaced the painting-behind-a-veil treatment ("gallery rooms": each
 * inner page wore the same painting as its homepage bento cell). The bento
 * hub that motivated it is gone — the homepage is a plain splash now (see
 * HomeSplash.tsx) — so a painting here read as decoration left over from a
 * homepage that no longer exists.
 *
 * Keeps the same export names and prop shape (`ArtHeader`, `PAINTINGS`,
 * `painting`/`kicker`/`title`/`subtitle`/`compact`) as a drop-in replacement,
 * so none of its call sites needed touching — `painting` is accepted and
 * ignored rather than removed everywhere at once.
 */
export const PAINTINGS = {
  catalogo: "/paintings/seurat.jpg",
  guida: "/paintings/monet.jpg",
  studio: "/paintings/kandinsky.jpg",
  account: "/paintings/vangogh.jpg",
} as const;

export function ArtHeader({
  kicker,
  title,
  subtitle,
  compact = false,
}: {
  /** Unused now — kept so call sites didn't need to change. */
  painting?: string;
  kicker?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  position?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={compact ? "pb-4 pt-8" : "pb-4 pt-12 md:pt-16"}
      style={{ borderBottom: "1px solid var(--border)" }}
    >
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
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
