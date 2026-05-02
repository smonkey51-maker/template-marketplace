"use client";

import { useEffect, useState } from "react";

const sections = ["hero", "catalogo", "guida", "studio", "account"];

export default function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(index);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const scrollToSection = (index: number) => {
    const el = document.getElementById(sections[index]);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {sections.map((_, index) => (
        <button
          key={index}
          onClick={() => scrollToSection(index)}
          className="group relative"
          aria-label={`Go to section ${index + 1}`}
        >
          <div
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              activeSection === index
                ? "border-[#D4AF37] bg-[#D4AF37] scale-125"
                : "border-[#D4AF37] bg-transparent hover:bg-[#D4AF37]/30"
            }`}
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {String(index + 1).padStart(2, "0")}
          </span>
        </button>
      ))}
    </div>
  );
}
