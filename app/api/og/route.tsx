import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { toLocale } from "@/lib/locales";
import { copy } from "@/lib/i18n";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lang = toLocale(searchParams.get("lang"));

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: "#FFFFFF",
        padding: "72px",
        fontFamily: "system-ui, sans-serif",
        borderTop: "16px solid #0B3558",
      }}
    >
      <div
        style={{
          fontSize: 22,
          letterSpacing: "0.16em",
          color: "#4A5968",
          textTransform: "uppercase",
        }}
      >
        {copy[lang].envLabel}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 88, fontWeight: 700, color: "#0B3558", letterSpacing: "0.04em" }}>
          SANDBOX
        </div>
        <div style={{ fontSize: 30, color: "#14202E" }}>{copy[lang].envNote}</div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
