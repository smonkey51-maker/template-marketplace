"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Loaded on demand and only in the browser: the refraction layer is an extra
// ~180 KB that no visitor needs for the first paint.
const LiquidGlass = dynamic(() => import("liquid-glass-react"), { ssr: false });

/**
 * A floating glass pill, fixed at the bottom right, linking to the contact
 * page. liquid-glass-react draws real refraction (SVG displacement filter) and
 * is built for fixed, content-sized elements like this one — not for panels in
 * the page flow. The pill's content is a real link, so it is keyboard- and
 * screen-reader-reachable. Skipped for reduced motion/transparency, below 1024 px (where it would meet the
 * bottom dock) and on the contact page itself.
 */
export default function GlassDock() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const q = window.matchMedia(
      "(max-width: 1023px), (prefers-reduced-motion: reduce), (prefers-reduced-transparency: reduce)",
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
      style={{
        position: "fixed",
        top: "calc(100% - 52px)",
        left: "calc(100% - 128px)",
        zIndex: 40,
      }}
    >
      {/* A brand-coloured glass button: the navy fill keeps the white label legible whatever
          is behind it, and the library still bends the backdrop at the rim. (The library also
          names its inner element `glass`, which is why our own panel class is `glass-panel`.) */}
      <Link
        href="/contatti"
        className="block whitespace-nowrap rounded-full bg-brand/90 px-5 py-2.5 font-sans text-[14px] font-medium text-brand-fg"
      >
        Richiedi un colloquio
      </Link>
    </LiquidGlass>
  );
}
