"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Fades and lifts each route into place.
 *
 * The animation is driven by gsap rather than a CSS class, and the reason is
 * `clearProps: "all"`: it removes the transform once the tween finishes. A
 * `transform` other than `none` makes an element the containing block for every
 * `position: fixed` descendant, and this wrapper is around every page — so a
 * transform left behind here anchors fixed children to the document instead of
 * the viewport. That broke real things: the catalogue's quick-view sheet
 * (`inset-0` + `items-end`) opened below the end of the page while the scroll
 * lock made it impossible to reach, and the sticky buy bars on the preview and
 * bundle pages sat at the bottom of a long document rather than on screen.
 *
 * The CSS `.anim-page-enter` utility this used to rely on is gone from
 * globals.css for the same reason — declared `animation-fill-mode: both`, it
 * kept `translateY(0)` applied forever.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Strip the language prefix so switching language doesn't re-run the fade — it
  // is the same page, and flashing it implies a navigation that didn't happen.
  const routeKey = pathname.replace(/^\/(it|en)/, "") || "/";

  // The scroll lock belongs to whatever set it, but a navigation can unmount
  // that component before its cleanup runs. Keyed on the raw pathname, not the
  // route key, so it also fires on a language switch.
  useEffect(() => {
    document.body.style.overflow = "";
  }, [pathname]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          clearProps: "all",
        },
      );
    }
  }, [routeKey]);

  return <div ref={containerRef}>{children}</div>;
}
