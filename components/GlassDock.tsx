"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Loaded on demand and only in the browser: the refraction layer is an extra
// ~180 KB that no visitor needs for the first paint.
const LiquidGlass = dynamic(() => import("liquid-glass-react"), { ssr: false });

/**
 * A floating glass pill, fixed at the bottom centre, linking to the contact
 * page. liquid-glass-react draws real refraction (SVG displacement filter) and
 * is built for fixed, content-sized elements like this one — not for panels in
 * the page flow. The pill's content is a real link, so it is keyboard- and
 * screen-reader-reachable. Skipped for reduced motion/transparency and on small
 * screens, and on the contact page itself.
 */
export default function GlassDock() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const q = window.matchMedia(
      "(max-width: 767px), (prefers-reduced-motion: reduce), (prefers-reduced-transparency: reduce)",
    );
    const update = () => setShow(!q.matches);
    update();
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);

  if (!show || pathname === "/contatti") return null;

  return (
    <LiquidGlass
      cornerRadius={999}
      displacementScale={30}
      blurAmount={0.2}
      saturation={150}
      aberrationIntensity={1.4}
      elasticity={0.25}
      padding="0"
      style={{ position: "fixed", top: "calc(100% - 52px)", left: "50%", zIndex: 40 }}
    >
      {/* The library layers blend modes and a dark shadow meant for photos; on a pale page they
          read as grey. A light plate over them keeps the pill clean, with the refraction at its edge. The library
          also sets its own system font, so the site font is restored on the link. */}
      <Link
        href="/contatti"
        className="block rounded-full bg-bg/80 px-5 py-2.5 font-sans text-[14px] font-medium text-ink"
      >
        Richiedi un colloquio
      </Link>
    </LiquidGlass>
  );
}
