"use client";

import { useState } from "react";
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
 * being already-finished on a reused node. It also resets `finished` below for
 * free, since the new element starts with fresh state.
 *
 * It reuses the `.anim-page-enter` utility that already existed in globals.css
 * rather than adding a class of its own — that one is already listed in the
 * reduced-motion block, and defining a second `page-enter` keyframes would have
 * silently overridden the existing one for every other caller.
 *
 * gsap stays — it drives the catalogue's detail sheet, and that is a real use.
 *
 * ── Why the class is removed once the animation ends ──────────────────────
 *
 * `page-enter` is declared `both`, so when it finishes the element keeps the
 * final keyframe: `transform: translateY(0)`. That is a transform, and any
 * transform other than `none` makes an element the containing block for every
 * `position: fixed` descendant — so nothing inside this wrapper was anchored to
 * the viewport at all. It was anchored to the page.
 *
 * That broke real things, not just the animation:
 *   · the catalogue's detail sheet (`inset-0` + `items-end`) opened at the
 *     bottom of the *document*, below everything, while the scroll lock made it
 *     impossible to scroll down to — it opened, and nothing appeared;
 *   · the sticky buy bars on the preview and bundle pages (`fixed bottom-0`)
 *     sat at the end of a long document instead of staying on screen.
 *
 * Dropping the class afterwards leaves the element with no transform, which is
 * what it should have had all along — the animation has already run, and its
 * end state is visually identical to no animation at all.
 *
 * `animationend` bubbles, so the guard matters: without it, any animation
 * finishing anywhere inside the page would end this one early.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Strip the language prefix so switching language doesn't re-run the fade — it
  // is the same page, and flashing it implies a navigation that didn't happen.
  const routeKey = pathname.replace(/^\/(it|en)/, "") || "/";

  return <PageFade key={routeKey}>{children}</PageFade>;
}

function PageFade({ children }: { children: React.ReactNode }) {
  const [finished, setFinished] = useState(false);

  return (
    <div
      className={finished ? undefined : "anim-page-enter"}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) setFinished(true);
      }}
    >
      {children}
    </div>
  );
}
