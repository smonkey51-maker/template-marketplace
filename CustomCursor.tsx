"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ArtSectionProps {
  id: string;
  className?: string;
  children: ReactNode;
  backgroundImage?: string;
  overlayOpacity?: number;
}

export default function ArtSection({
  id,
  className = "",
  children,
  backgroundImage,
  overlayOpacity = 0.75,
}: ArtSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !entered) {
          setEntered(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [entered]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`forma-section relative ${className}`}
      data-entered={entered ? "true" : undefined}
      style={{
        minHeight: "100svh",
        scrollSnapAlign: "start",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat anim-bg"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              filter: "blur(0px)",
            }}
          />
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        </>
      )}

      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}
