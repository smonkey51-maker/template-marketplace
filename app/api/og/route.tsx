import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const runtime = "edge";

export async function GET() {
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
        Consulenza HR
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 88, fontWeight: 700, color: "#0B3558", letterSpacing: "0.04em" }}>
          {SITE.name.toUpperCase()}
        </div>
        <div style={{ fontSize: 30, color: "#14202E" }}>{SITE.tagline}</div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
