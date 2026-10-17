"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * The "Richiedi un colloquio" button, fixed at the bottom right on wide screens once you have
 * scrolled past the first screen (the hero already has the same button; below 1024 px it
 * would meet the bottom dock, and it is pointless on the contact page itself).
 * A plain flat button on purpose: the earlier liquid-glass-react version drew an SVG
 * displacement filter over the page behind it on every frame, which made the arrival
 * and the scrolling heavy.
 */
export default function FloatingCta() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/contatti" || !shown) return null;
  return (
    // `.btn` sets its own display, which beats `hidden`: hide the wrapper instead.
    <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
      <Link href="/contatti" className="btn btn-primary shadow-lg">
        Richiedi un colloquio
      </Link>
    </div>
  );
}
