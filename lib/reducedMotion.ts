/**
 * Whether the visitor has asked their system for reduced motion.
 *
 * The CSS animations are already covered — `globals.css` has a
 * `@media (prefers-reduced-motion: reduce)` block that switches them off. gsap
 * does not read media queries, so every tween has to ask on its own, and until
 * it does a visitor who turned motion off still gets the page fade on every
 * navigation and the sheet sliding away on every close.
 *
 * Read at the moment the animation is about to run rather than cached in state:
 * the answer is only ever needed inside an effect or a handler, both of which
 * run on the client, and reading late means a mid-session change to the system
 * setting is picked up without a subscription.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * A gsap duration that collapses to zero when motion is unwanted.
 *
 * Zero rather than skipping the tween: gsap still applies the end state and
 * still fires `onComplete`, so animations that gate real behaviour — the sheet
 * close has to finish before the element unmounts — keep working, they just
 * arrive instantly.
 */
export function motionDuration(seconds: number): number {
  return prefersReducedMotion() ? 0 : seconds;
}
