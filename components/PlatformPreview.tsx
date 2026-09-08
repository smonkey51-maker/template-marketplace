"use client";

import { ClipboardList } from "lucide-react";
import { PLATFORM_COLORS } from "@/components/platformColors";

/**
 * Platform-faithful mini mock-ups for the external formats (Notion, Canva,
 * Excel, Sheets, Webflow, Framer, Shopify, WordPress).
 *
 * These are ~600 lines of hand-drawn SVG and div art. They used to sit inside
 * TemplateCard, so every page rendering a card shipped and parsed all of them
 * even when no external-format card was on screen. Split out and loaded with
 * next/dynamic from the card, they now arrive only when a card actually needs
 * one. Same artwork, same props.
 */
/* ── Platform icon set ──────────────────────────────────────────────── */
function PlatformIcon({ type, size = 28 }: { type: string; size?: number }) {
  const s = size;
  if (type === "notion")
    return (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" aria-hidden>
        <rect
          x="4"
          y="3"
          width="20"
          height="22"
          rx="2"
          stroke="white"
          strokeWidth="1.8"
          strokeOpacity="0.9"
        />
        <path
          d="M9 9h10M9 13h10M9 17h6"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
      </svg>
    );
  if (type === "canva")
    return (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" aria-hidden>
        <circle cx="14" cy="14" r="10" stroke="white" strokeWidth="1.8" strokeOpacity="0.9" />
        <path
          d="M9.5 14a4.5 4.5 0 009 0"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
      </svg>
    );
  if (type === "shopify")
    return (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" aria-hidden>
        <path
          d="M19 8c-.2-1.3-1.4-2-2.4-2l-1.3 3.7M9.4 22l1.8-8.5M14.4 6l-5 16M19 8l-3 14"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.85"
        />
      </svg>
    );
  if (type === "wordpress")
    return (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" aria-hidden>
        <circle cx="14" cy="14" r="10" stroke="white" strokeWidth="1.8" strokeOpacity="0.9" />
        <path
          d="M4 14h20M14 4c-3 3-3 14 0 20M14 4c3 3 3 14 0 20"
          stroke="white"
          strokeWidth="1.4"
          strokeOpacity="0.6"
        />
      </svg>
    );
  if (type === "webflow" || type === "framer")
    return (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" aria-hidden>
        <rect
          x="5"
          y="5"
          width="18"
          height="18"
          rx="2"
          stroke="white"
          strokeWidth="1.8"
          strokeOpacity="0.9"
        />
        <path d="M5 11h18M11 11v12" stroke="white" strokeWidth="1.4" strokeOpacity="0.6" />
      </svg>
    );
  if (type === "excel" || type === "sheets")
    return (
      <svg width={s} height={s} viewBox="0 0 28 28" fill="none" aria-hidden>
        <rect
          x="4"
          y="4"
          width="20"
          height="20"
          rx="2"
          stroke="white"
          strokeWidth="1.8"
          strokeOpacity="0.9"
        />
        <path d="M4 11h20M4 17h20M11 4v20" stroke="white" strokeWidth="1.4" strokeOpacity="0.6" />
      </svg>
    );
  // html default
  return (
    <svg width={s} height={s} viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M5 4l2 16 7 4 7-4 2-16H5z"
        stroke="white"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeOpacity="0.9"
      />
      <path
        d="M9 10h10M10 14l8-0M11 18l6-0"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
    </svg>
  );
}

/* ── Platform-faithful mini-preview mockups ────────────────────────── */
export default function PlatformPreview({ type }: { type: string }) {
  if (type === "canva")
    return (
      <div className="absolute inset-0 flex flex-col" style={{ background: "#ffffff" }}>
        {/* Canva toolbar */}
        <div
          className="shrink-0 flex items-center px-2 gap-1.5"
          style={{ height: "26px", background: "#7B61FF" }}
        >
          <div className="flex gap-0.5">
            {[24, 32, 20].map((w, i) => (
              <div
                key={i}
                className="h-2.5 rounded-full"
                style={{ width: w, background: "rgba(255,255,255,0.35)" }}
              />
            ))}
          </div>
          <div
            className="flex-1 mx-2 h-3.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.25)" }}
          />
          <div className="w-12 h-4.5 rounded" style={{ background: "rgba(255,255,255,0.2)" }} />
        </div>
        {/* Main area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar */}
          <div
            className="w-9 shrink-0 flex flex-col items-center gap-2 pt-2"
            style={{ background: "#F0EDFF", borderRight: "1px solid #E0DBF5" }}
          >
            {["#7B61FF", "#C5BCEE", "#C5BCEE", "#C5BCEE", "#C5BCEE"].map((c, i) => (
              <div key={i} className="w-6 h-6 rounded-md" style={{ background: c }} />
            ))}
          </div>
          {/* Canvas */}
          <div
            className="flex-1 flex items-center justify-center p-2"
            style={{ background: "#F0EDFF" }}
          >
            <div
              className="relative shadow-sm"
              style={{
                width: "78%",
                height: "90%",
                background: "#fff",
                border: "1px solid #ddd6fe",
              }}
            >
              <div
                className="absolute inset-x-3 top-3 h-4 rounded-md"
                style={{ background: "#7B61FF" }}
              />
              <div
                className="absolute left-3 top-9 w-16 h-2 rounded-full"
                style={{ background: "#d1d5db" }}
              />
              <div
                className="absolute left-3 top-13 w-12 h-1.5 rounded-full"
                style={{ background: "#e5e7eb" }}
              />
              <div className="absolute bottom-4 left-3 flex gap-1.5">
                {["#7B61FF", "#F472B6", "#FBBF24"].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-md" style={{ background: c }} />
                ))}
              </div>
              <div
                className="absolute bottom-4 right-3 w-8 h-14 rounded-md"
                style={{ background: "#E0DBF5" }}
              />
            </div>
          </div>
        </div>
      </div>
    );

  if (type === "notion")
    return (
      <div className="absolute inset-0 flex overflow-hidden" style={{ background: "#ffffff" }}>
        {/* Sidebar */}
        <div
          className="w-16 shrink-0 flex flex-col px-2 pt-3 gap-1.5"
          style={{ background: "#F7F6F3", borderRight: "1px solid #E9E9E7" }}
        >
          <div className="w-8 h-2.5 rounded-full mb-1" style={{ background: "#C9C9C7" }} />
          {[1, 0, 0, 1, 0, 0, 0].map((active, i) => (
            <div
              key={i}
              className="flex items-center gap-1 px-1 py-0.5 rounded-md"
              style={{ background: active ? "#E9E9E7" : "transparent" }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: active ? "#37352F" : "#C9C9C7" }}
              />
              <div
                className="h-1.5 flex-1 rounded-full"
                style={{ background: active ? "#37352F" : "#C9C9C7", opacity: active ? 0.7 : 0.4 }}
              />
            </div>
          ))}
        </div>
        {/* Document */}
        <div className="flex-1 px-3 py-4 overflow-hidden">
          <div className="flex items-start gap-1.5 mb-3">
            <ClipboardList aria-hidden size={16} strokeWidth={1.75} style={{ color: "#37352F" }} />
            <div
              className="h-4 w-24 rounded-md mt-0.5"
              style={{ background: "#37352F", opacity: 0.85 }}
            />
          </div>
          <div
            className="h-2 w-20 rounded-full mb-3"
            style={{ background: "#37352F", opacity: 0.25 }}
          />
          {[92, 75, 88, 60, 80, 66, 72].map((w, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full mb-1.5"
              style={{ width: `${w}%`, background: "#37352F", opacity: i % 4 === 0 ? 0.2 : 0.1 }}
            />
          ))}
          <div
            className="mt-2 p-2 rounded-md"
            style={{ background: "#F7F6F3", border: "1px solid #E9E9E7" }}
          >
            {[100, 85, 60].map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full mb-1"
                style={{ width: `${w}%`, background: "#37352F", opacity: 0.12 }}
              />
            ))}
          </div>
        </div>
      </div>
    );

  if (type === "excel" || type === "sheets") {
    const accent = type === "excel" ? "#1D6F42" : "#0F9D58";
    const cols = ["A", "B", "C", "D", "E"];
    const rowColors = [
      [accent, accent, accent, accent, accent],
      [null, null, null, null, null],
      [`${accent}22`, null, null, `${accent}22`, null],
      [null, null, null, null, null],
      [`${accent}14`, null, null, `${accent}14`, null],
      [null, null, null, null, null],
    ];
    return (
      <div
        className="absolute inset-0 flex flex-col overflow-hidden"
        style={{ background: "#ffffff" }}
      >
        {/* App header */}
        <div
          className="shrink-0 flex items-center px-2 gap-1.5"
          style={{ height: "22px", background: accent }}
        >
          <div className="w-3.5 h-3.5 rounded-md" style={{ background: "rgba(255,255,255,0.4)" }} />
          <div
            className="flex-1 h-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.2)" }}
          />
          <div className="flex gap-0.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2.5 h-2 rounded-full opacity-60"
                style={{ background: "white" }}
              />
            ))}
          </div>
        </div>
        {/* Ribbon */}
        <div
          className="shrink-0 flex items-center px-2 gap-1 border-b"
          style={{ height: "20px", background: "#f9fafb", borderColor: "#e5e7eb" }}
        >
          {["File", "Inserisci", "Formule", "Dati"].map((l) => (
            <span key={l} style={{ fontSize: "7px", color: "#374151" }}>
              {l}
            </span>
          ))}
        </div>
        {/* Col headers */}
        <div
          className="shrink-0 flex"
          style={{ height: "15px", background: "#f3f4f6", borderBottom: "1px solid #e5e7eb" }}
        >
          <div className="w-8 shrink-0 border-r" style={{ borderColor: "#e5e7eb" }} />
          {cols.map((c) => (
            <div
              key={c}
              className="flex-1 flex items-center justify-center border-r"
              style={{ fontSize: "7px", color: "#6b7280", borderColor: "#e5e7eb" }}
            >
              {c}
            </div>
          ))}
        </div>
        {/* Rows */}
        {rowColors.map((row, ri) => (
          <div
            key={ri}
            className="flex shrink-0"
            style={{ height: "20px", borderBottom: "1px solid #f3f4f6" }}
          >
            <div
              className="w-8 shrink-0 flex items-center justify-center border-r"
              style={{
                background: "#f3f4f6",
                fontSize: "7px",
                color: "#9ca3af",
                borderColor: "#e5e7eb",
              }}
            >
              {ri + 1}
            </div>
            {row.map((bg, ci) => (
              <div
                key={ci}
                className="flex-1 border-r"
                style={{ background: bg ?? "transparent", borderColor: "#f3f4f6" }}
              >
                {ri === 0 && (
                  <div
                    className="h-full w-full flex items-center justify-center"
                    style={{ fontSize: "7px", color: "white", fontWeight: 600 }}
                  >
                    {["Prodotto", "Q1", "Q2", "Q3", "Tot."][ci]}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (type === "webflow" || type === "framer") {
    const isDark = type === "framer";
    const bg = isDark ? "#0F0F0F" : "#1A1A2E";
    const panel = isDark ? "#1A1A1A" : "#16213E";
    const accent2 = isDark ? "#0055FF" : "#4353FF";
    return (
      <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: bg }}>
        {/* App header */}
        <div
          className="shrink-0 flex items-center px-2 gap-2"
          style={{ height: "24px", background: panel }}
        >
          <div className="flex gap-0.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ background: ["#FF5F57", "#FFBD2E", "#28C840"][i] }}
              />
            ))}
          </div>
          <div
            className="flex-1 h-2.5 rounded-full mx-4"
            style={{ background: "rgba(255,255,255,0.1)" }}
          />
          <div className="w-10 h-4 rounded-md" style={{ background: accent2 }} />
        </div>
        {/* Main panel */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left layers */}
          <div
            className="w-12 shrink-0 pt-2 px-1 flex flex-col gap-1"
            style={{ background: panel, borderRight: "1px solid rgba(255,255,255,0.06)" }}
          >
            {[1, 0, 0, 1, 0, 0].map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-1 px-1 py-0.5 rounded-md"
                style={{ background: a ? "rgba(255,255,255,0.08)" : "transparent" }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: a ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)" }}
                />
                <div
                  className="flex-1 h-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                />
              </div>
            ))}
          </div>
          {/* Canvas */}
          <div
            className="flex-1 flex items-center justify-center p-3"
            style={{ background: isDark ? "#141414" : "#0D0D1F" }}
          >
            <div
              className="relative"
              style={{
                width: "80%",
                height: "85%",
                background: "white",
                borderRadius: "2px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-6"
                style={{ background: isDark ? "#1E1E1E" : bg }}
              />
              <div
                className="absolute top-8 left-3 right-3 h-3 rounded-md"
                style={{ background: accent2, opacity: 0.85 }}
              />
              <div
                className="absolute top-13 left-3 w-16 h-1.5 rounded-full"
                style={{ background: "#e5e7eb" }}
              />
              <div
                className="absolute bottom-3 left-3 right-3 h-6 rounded-md"
                style={{ background: accent2, opacity: 0.15 }}
              />
            </div>
          </div>
          {/* Right properties */}
          <div
            className="w-12 shrink-0 pt-2 px-1 flex flex-col gap-1.5"
            style={{ background: panel, borderLeft: "1px solid rgba(255,255,255,0.06)" }}
          >
            {[40, 30, 40, 30, 35].map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full"
                style={{
                  width: `${w + 16}px`,
                  maxWidth: "100%",
                  background: "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "shopify")
    return (
      <div
        className="absolute inset-0 flex flex-col overflow-hidden"
        style={{ background: "#F6F6F7" }}
      >
        {/* Admin header */}
        <div
          className="shrink-0 flex items-center px-3 gap-2"
          style={{ height: "26px", background: "#1A1A1A" }}
        >
          <div className="w-4 h-4 rounded-md" style={{ background: "#95BF47" }} />
          <div className="flex gap-2">
            {[28, 22, 26].map((w, i) => (
              <div
                key={i}
                className="h-2 rounded-full opacity-50"
                style={{ width: w, background: "white" }}
              />
            ))}
          </div>
        </div>
        {/* Store page */}
        <div
          className="flex-1 flex flex-col"
          style={{
            background: "#fff",
            margin: "4px",
            borderRadius: "2px",
            border: "1px solid #E4E5E7",
          }}
        >
          {/* Product image */}
          <div className="shrink-0" style={{ height: "80px", background: "#f3f4f6" }}>
            <div className="h-full flex items-center justify-center">
              <div className="w-12 h-12 rounded" style={{ background: "#e5e7eb" }} />
            </div>
          </div>
          {/* Product info */}
          <div className="px-3 py-2 flex flex-col gap-1.5">
            <div className="h-3 w-24 rounded-md" style={{ background: "#1A1A1A", opacity: 0.8 }} />
            <div className="h-2.5 w-12 rounded-full" style={{ background: "#95BF47" }} />
            <div className="h-1.5 w-32 rounded-full" style={{ background: "#d1d5db" }} />
            <div className="h-1.5 w-28 rounded-full" style={{ background: "#d1d5db" }} />
            <div
              className="mt-1 h-6 rounded-md flex items-center justify-center"
              style={{ background: "#95BF47" }}
            >
              <div
                className="h-2 w-16 rounded-full"
                style={{ background: "rgba(255,255,255,0.8)" }}
              />
            </div>
          </div>
        </div>
      </div>
    );

  if (type === "wordpress")
    return (
      <div
        className="absolute inset-0 flex flex-col overflow-hidden"
        style={{ background: "#f0f0f1" }}
      >
        {/* WP Admin bar */}
        <div
          className="shrink-0 flex items-center px-2 gap-1.5"
          style={{ height: "22px", background: "#1d2327" }}
        >
          <div className="w-3.5 h-3.5 rounded-md" style={{ background: "#21759B" }} />
          {[28, 20, 24].map((w, i) => (
            <div
              key={i}
              className="h-2 rounded-full opacity-50"
              style={{ width: w, background: "white" }}
            />
          ))}
        </div>
        {/* Dashboard split */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div
            className="w-14 shrink-0 pt-2 flex flex-col gap-0.5"
            style={{ background: "#1d2327" }}
          >
            {[1, 0, 0, 0, 0, 0].map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-1 mx-1 px-1 py-1 rounded-md"
                style={{ background: a ? "#2271b1" : "transparent" }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "rgba(255,255,255,0.4)" }}
                />
                <div
                  className="flex-1 h-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                />
              </div>
            ))}
          </div>
          {/* Content */}
          <div className="flex-1 p-2 overflow-hidden">
            <div
              className="h-3.5 w-24 rounded-md mb-2"
              style={{ background: "#1d2327", opacity: 0.7 }}
            />
            {[
              { w: "100%", h: 32 },
              { w: "70%", h: 12 },
              { w: "85%", h: 12 },
            ].map(({ w, h }, i) => (
              <div
                key={i}
                className="rounded-md mb-1.5"
                style={{
                  width: w,
                  height: h,
                  background: i === 0 ? "#2271b1" : "white",
                  border: i > 0 ? "1px solid #dcdcde" : "none",
                }}
              />
            ))}
            <div className="mt-2 grid grid-cols-2 gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 rounded-md"
                  style={{ background: "white", border: "1px solid #dcdcde" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );

  // fallback
  const p = PLATFORM_COLORS[type] ?? PLATFORM_COLORS.html;
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3"
      style={{ background: `linear-gradient(145deg, ${p.from}, ${p.to})` }}
    >
      <PlatformIcon type={type} size={36} />
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white opacity-70">
        {p.label}
      </p>
    </div>
  );
}
