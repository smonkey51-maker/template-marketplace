"use client";

import { useRef, useState, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/components/LanguageProvider";
import TemplateGrid from "@/components/TemplateGrid";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function TemplateShowcase() {
  const { lang } = useLang();
  const headRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headRef, { once: true, margin: "-60px" });
  const [query, setQuery] = useState("");

  return (
    <section
      id="browse"
      style={{
        background: "var(--apple-bg)",
        padding: "clamp(80px, 12vw, 140px) 5vw clamp(60px, 8vw, 100px)",
        borderTop: "1px solid var(--apple-divider)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section header */}
        <div
          ref={headRef}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "24px",
            marginBottom: "clamp(40px, 5vw, 60px)",
          }}
        >
          <div style={{ maxWidth: "560px" }}>
            <motion.p
              className="apple-eyebrow"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: "12px" }}
            >
              {lang === "it" ? "Catalogo" : "Catalog"}
            </motion.p>
            <motion.h2
              className="apple-headline"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease }}
              style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}
            >
              {lang === "it" ? "Sfoglia il catalogo." : "Browse the catalog."}
            </motion.h2>
          </div>

          {/* Inline search */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label htmlFor="catalog-search" className="sr-only">
              {lang === "it" ? "Cerca template" : "Search templates"}
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 16px",
                border: "1px solid var(--apple-border)",
                background: "var(--apple-surface)",
                minWidth: "clamp(200px, 30vw, 300px)",
                transition: "border-color 0.15s ease",
              }}
              onFocusCapture={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--apple-text)";
              }}
              onBlurCapture={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--apple-border)";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: "var(--apple-text-tertiary)", flexShrink: 0 }}>
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                id="catalog-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={lang === "it" ? "Cerca per nome, stile…" : "Search by name, style…"}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: "13px",
                  color: "var(--apple-text)",
                  fontFamily: "var(--font-jakarta), sans-serif",
                }}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--apple-text-tertiary)",
                    display: "flex",
                    padding: "0",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Template grid — uses existing component */}
        <Suspense
          fallback={
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "1px",
                background: "var(--apple-border)",
                border: "1px solid var(--apple-border)",
              }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: "280px",
                    background: "var(--apple-surface)",
                  }}
                />
              ))}
            </div>
          }
        >
          <TemplateGrid externalQuery={query} />
        </Suspense>
      </div>
    </section>
  );
}
