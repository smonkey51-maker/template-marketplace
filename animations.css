import { useEffect, useRef, useState } from "react";

interface ArtSectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
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
      style={{
        minHeight: "100svh",
        scrollSnapAlign: "start",
      }}
      data-entered={entered ? "true" : undefined}
    >
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              opacity: 0.3,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `rgba(0, 0, 0, ${overlayOpacity})`,
            }}
          />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
