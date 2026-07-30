"use client";

import { usePathname } from "next/navigation";

/**
 * Fades and lifts each route into place.
 *
 * CSS animation keyed on the route, not framer-motion. This component was the
 * library's last real user, and it was pulling in a full animation runtime — on
 * the first paint of every page — for one fade.
 *
 * One behaviour genuinely changes: there is no exit animation. framer's
 * `AnimatePresence mode="wait"` kept the outgoing page mounted while it faded and
 * only then mounted the new one, so every navigation waited 200ms before anything
 * new appeared. Without the library the old tree unmounts immediately and the new
 * one animates in, which is that much quicker. Getting the fade-out back would
 * take a view transition, not a dependency.
 *
 * `key` on the wrapper is what restarts the animation: React discards the old
 * element and mounts a fresh one, so the CSS animation runs again instead of
 * being already-finished on a reused node.
 *
 * It reuses the `.anim-page-enter` utility that already existed in globals.css
 * rather than adding a class of its own — that one is already listed in the
 * reduced-motion block, and defining a second `page-enter` keyframes would have
 * silently overridden the existing one for every other caller.
 *
 * gsap stays — it drives the catalogue's detail sheet, and that is a real use.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Strip the language prefix so switching language doesn't re-run the fade — it
  // is the same page, and flashing it implies a navigation that didn't happen.
  const routeKey = pathname.replace(/^\/(it|en)/, "") || "/";

  return (
    <div key={routeKey} className="anim-page-enter">
      {children}
    </div>
  );
}
