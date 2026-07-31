"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    // Sblocco forzato: previene il bug dell'overflow: hidden
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
  }, [pathname]); // Si riavvia ad ogni cambio di rotta

  return (
    <div ref={containerRef} className="anim-page-enter">
      {children}
    </div>
  );
}
