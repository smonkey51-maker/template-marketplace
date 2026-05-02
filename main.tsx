"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "catalogo", label: "Catalogo" },
  { id: "guida", label: "Guida" },
  { id: "studio", label: "Studio" },
  { id: "account", label: "Account" },
];

export default function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observers = sections.map((section, index) => {
      const element = document.getElementById(section.id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(index);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const scrollToSection = (index: number) => {
    const element = document.getElementById(sections[index].id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop: Vertical text + dots */}
      <div className="hidden md:block fixed left-6 top-1/2 -translate-y-1/2 z-50">
        <div className="flex flex-col items-center gap-6">
          <span
            className="text-[10px] tracking-[0.3em] uppercase opacity-40"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            Scroll Down
          </span>
          <div className="flex flex-col gap-3">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(index)}
                className="group relative w-2 h-2"
                aria-label={`Go to ${section.label}`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeSection === index
                      ? "bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.6)]"
                      : "bg-white/20 group-hover:bg-white/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Dots on right */}
      <div className="md:hidden fixed right-4 top-1/2 -translate-y-1/2 z-50">
        <div className="flex flex-col gap-3">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(index)}
              className="group relative w-2 h-2"
              aria-label={`Go to ${section.label}`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all ${
                  activeSection === index
                    ? "bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.6)]"
                    : "bg-white/20 group-hover:bg-white/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
