"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = "";

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
        }
      );
    }
  }, [pathname]);

  return (
    <div ref={containerRef} className="anim-page-enter">
      {children}
    </div>
  );
}
