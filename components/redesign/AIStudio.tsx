"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

const PROMPT_IT = "Rendi questo hero più essenziale. Sfondo kinari, testo sumi, un solo CTA.";
const PROMPT_EN = "Make this hero more essential. Kinari background, sumi text, single CTA.";

const OUTPUT_LINES = [
  '<section style="min-height:100vh;',
  "  background:#F5F0E8;",
  "  display:flex;align-items:center;",
  '  padding:0 8vw">',
  "  <div>",
  '    <h1 style="font-family:Cormorant;',
  "      font-size:clamp(80px,12vw,160px);",
  '      font-weight:400;color:#1A1815">',
  "      Forma",
  "    </h1>",
  '    <p style="font-size:16px;',
  '      font-weight:300;color:#4A4642">',
  "      Template come oggetti curati.",
  "    </p>",
  '    <a href="#" style="display:inline-block;',
  "      margin-top:32px;padding:12px 28px;",
  "      background:#1A1815;color:#F5F0E8;",
  '      font-size:11px;letter-spacing:.08em">',
  "      Sfoglia →",
  "    </a>",
  "  </div>",
  "</section>",
];

function TypingBlock({ lines, active }: { lines: string[]; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) { setCount(0); return; }
    setCount(0);
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= lines.length) { clearInterval(id); return c; }
        return c + 1;
      });
    }, 80);
    return () => clearInterval(id);
  }, [active, lines]);

  return (
    <div
      style={{
        fontFamily: "'SF Mono', 'Fira Code', monospace",
        fontSize: "11px",
        lineHeight: "1.75",
        color: "#8B6F47",
        padding: "20px 24px",
        minHeight: "200px",
        overflowX: "auto",
      }}
    >
      {lines.slice(0, count).map((line, i) => (
        <div key={i} style={{ whiteSpace: "pre", display: "flex" }}>
          <span style={{ color: "#4A4642", opacity: 0.3, userSelect: "none", minWidth: "24px", marginRight: "12px", textAlign: "right" }}>
            {i + 1}
          </span>
          <span>{line}</span>
        </div>
      ))}
      {count < lines.length && (
        <div style={{ display: "flex" }}>
          <span style={{ color: "#4A4642", opacity: 0.3, minWidth: "24px", marginRight: "12px", textAlign: "right" }}>
            {count + 1}
          </span>
          <span className="cursor-blink" style={{ color: "#8B6F47" }}>▌</span>
        </div>
      )}
    </div>
  );
}

export default function AIStudio() {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-120px" });
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setTyping(true), 500);
      return () => clearTimeout(t);
    }
  }, [inView]);

  return (
    <section
      id="studio"
      ref={sectionRef}
      className="forma-snap forma-v2-section"
      style={{
        minHeight: "100svh",
        background: "var(--forma-bg-dark-section)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        padding: "clamp(80px, 10vw, 120px) 8vw",
      }}
    >
      {/* Section number */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "clamp(80px, 10vw, 120px)",
          left: "8vw",
          fontFamily: "monospace",
          fontSize: "11px",
          fontWeight: 300,
          letterSpacing: "0.04em",
          color: "#F5F0E8",
          opacity: 0.25,
        }}
      >
        06
      </span>

      <div
        className="forma-section-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6vw",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {/* ── Left: text ── */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              fontFamily: "monospace",
              fontSize: "10px",
              fontWeight: 300,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#8B6F47",
              marginBottom: "clamp(16px, 2vw, 24px)",
            }}
          >
            AI Studio
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(40px, 6.5vw, 72px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "0.01em",
              color: "#F5F0E8",
              marginBottom: "clamp(20px, 2.5vw, 32px)",
            }}
          >
            {lang === "it"
              ? <>Personalizza con<br />una frase.</>
              : <>Customize with<br />one sentence.</>}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            style={{
              fontFamily: "var(--font-inter), var(--font-jakarta), sans-serif",
              fontSize: "clamp(14px, 1.4vw, 16px)",
              fontWeight: 300,
              lineHeight: 1.75,
              color: "rgba(245,240,232,0.6)",
              maxWidth: "380px",
              marginBottom: "clamp(28px, 3.5vw, 48px)",
            }}
          >
            {lang === "it"
              ? "Descrivi la modifica in linguaggio naturale. Lo Studio traduce la tua intenzione in codice HTML preciso, in tempo reale."
              : "Describe the change in natural language. The Studio translates your intention into precise HTML code, in real time."}
          </motion.p>

          {/* Features — minimal list */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 clamp(28px, 3.5vw, 48px) 0",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {(lang === "it"
              ? ["Generazione da zero o da template", "Personalizzazione iterativa istantanea", "Export HTML senza dipendenze"]
              : ["Generate from scratch or from template", "Instant iterative customization", "Dependency-free HTML export"]
            ).map((f) => (
              <li
                key={f}
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "rgba(245,240,232,0.55)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  lineHeight: 1.5,
                }}
              >
                {/* Sabi accent dot — the single accent in this section */}
                <span
                  style={{
                    display: "inline-block",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "#A0522D",
                    marginTop: "6px",
                    flexShrink: 0,
                  }}
                />
                {f}
              </li>
            ))}
          </motion.ul>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          >
            <Link
              href="/studio"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "12px",
                fontWeight: 400,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#F5F0E8",
                border: "1px solid rgba(245,240,232,0.3)",
                padding: "12px 28px",
                textDecoration: "none",
                display: "inline-block",
                borderRadius: "2px",
                transition: "border-color 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,240,232,0.7)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,240,232,0.3)"; }}
            >
              {lang === "it" ? "Apri Studio" : "Open Studio"}
            </Link>
          </motion.div>
        </div>

        {/* ── Right: terminal panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="hidden md:block"
        >
          <div
            style={{
              border: "1px solid rgba(245,240,232,0.10)",
              background: "#111009",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            {/* Terminal header */}
            <div
              style={{
                padding: "10px 16px",
                borderBottom: "1px solid rgba(245,240,232,0.07)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div style={{ display: "flex", gap: "5px" }}>
                {["#FF5F57", "#FFBD2E", "#27C840"].map((c) => (
                  <div key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c, opacity: 0.5 }} />
                ))}
              </div>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "10px",
                  color: "rgba(245,240,232,0.25)",
                  letterSpacing: "0.04em",
                }}
              >
                AI Studio — Forma
              </span>
            </div>

            {/* Prompt input */}
            <div
              style={{
                padding: "14px 20px",
                borderBottom: "1px solid rgba(245,240,232,0.07)",
              }}
            >
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: "9px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(245,240,232,0.25)",
                  marginBottom: "8px",
                }}
              >
                {lang === "it" ? "Istruzione" : "Instruction"}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "12px",
                  fontWeight: 300,
                  color: "rgba(245,240,232,0.55)",
                  lineHeight: 1.6,
                  padding: "8px 12px",
                  border: "1px solid rgba(245,240,232,0.08)",
                  borderRadius: "2px",
                }}
              >
                {lang === "it" ? PROMPT_IT : PROMPT_EN}
              </p>
            </div>

            {/* Output */}
            <div>
              <div
                style={{
                  padding: "8px 20px",
                  borderBottom: "1px solid rgba(245,240,232,0.07)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "9px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(245,240,232,0.25)",
                  }}
                >
                  Output
                </span>
                {typing && (
                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "#8B6F47",
                        display: "inline-block",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: "9px",
                        color: "#8B6F47",
                        letterSpacing: "0.06em",
                      }}
                    >
                      claude-opus-4-6
                    </span>
                  </span>
                )}
              </div>
              <TypingBlock lines={OUTPUT_LINES} active={typing} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
