import type { ReactNode } from "react";

type Tone = "white" | "soft" | "blue" | "yellow";

/**
 * A full-width section band. The site is divided into bands of different tones instead of
 * floating rounded cards: white, soft blue-white, blue and yellow. A tone only redefines
 * the colour tokens (see `.tone-*` in globals.css), so every `text-ink`, `text-muted`,
 * `border-line` and button inside adapts on its own.
 */
export default function Band({
  tone = "white",
  id,
  label,
  className = "",
  inner = "",
  children,
}: {
  tone?: Tone;
  id?: string;
  /** Accessible name of the section, when it has no heading of its own to point at. */
  label?: string;
  className?: string;
  /** Extra classes for the centred container. */
  inner?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-label={label} className={`band tone-${tone} ${className}`}>
      <div className={`mx-auto max-w-[1200px] px-4 sm:px-6 ${inner}`}>{children}</div>
    </section>
  );
}
