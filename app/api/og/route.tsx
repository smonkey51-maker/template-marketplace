import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #000000 0%, #0A0A0A 60%, #111111 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top glow */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "900px",
            height: "500px",
            background: "radial-gradient(ellipse, rgba(10,132,255,0.18) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />
        {/* Purple glow right */}
        <div
          style={{
            position: "absolute",
            top: "100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(94,92,230,0.12) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", position: "relative", padding: "0 80px" }}>
          {/* Brand */}
          <div style={{ fontSize: "20px", fontWeight: 700, color: "#0A84FF", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            TemplateLab
          </div>

          {/* Headline */}
          <div style={{ fontSize: "60px", fontWeight: 900, color: "#FFFFFF", textAlign: "center", letterSpacing: "-0.03em", lineHeight: 1.08 }}>
            Template premium,{"\n"}personalizzati con AI
          </div>

          {/* Subtitle */}
          <div style={{ fontSize: "22px", color: "rgba(255,255,255,0.45)", textAlign: "center", maxWidth: "620px", lineHeight: 1.5 }}>
            Template UI e Prompt AI pronti all&apos;uso — personalizzabili in secondi con Claude.
          </div>

          {/* Pills */}
          <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
            {["UI Templates", "AI Prompts", "Claude AI"].map((label) => (
              <div
                key={label}
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "100px",
                  padding: "10px 22px",
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.65)",
                  fontWeight: 600,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
