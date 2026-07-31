"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";

interface PreviewContentProps {
  templateId: string;
  lang: string;
}

export default function PreviewContent({ templateId, lang }: PreviewContentProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "";

    if (overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }

    if (sheetRef.current) {
      gsap.fromTo(
        sheetRef.current,
        { y: "100vh" },
        {
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          clearProps: "transform",
        }
      );
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:p-4">
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
      />

      <div 
        ref={sheetRef}
        role="dialog" 
        aria-modal="true" 
        className="relative w-full max-w-[1000px] glass-panel fn-sheet-panel flex flex-col z-10 outline-none" 
        style={{ height: "92vh", borderRadius: "var(--glass-radius) var(--glass-radius) 0 0", overflow: "hidden" }}
      >
        <Link 
          href={`/${lang}/catalogo`}
          className="absolute top-6 right-6 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 text-white backdrop-blur-xl border border-white/10 hover:bg-black/60 transition-colors" 
          aria-label="Chiudi"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Link>
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 sm:p-12">
          
          {/* REINSERISCI QUI LA LOGICA DELL'ANTEPRIMA */}
          <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(32px, 4vw, 48px)" }}>
            Anteprima {templateId}
          </h2>
          
        </div>
      </div>
    </div>
  );
}
