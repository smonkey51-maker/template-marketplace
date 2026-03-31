import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getTemplate } from "@/lib/templates";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const templateId = searchParams.get("id");
  const template = templateId ? getTemplate(templateId) : null;

  if (template) {
    const categoryLabel = template.category === "ui" ? "UI Template" : "AI Prompt";
    const priceLabel = `€${(template.price / 100).toFixed(2)}`;

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #000000 0%, #0A0A0A 60%, #111111 100%)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            position: "relative",
            overflow: "hidden",
            padding: "80px",
          }}
        >
          {/* Glows */}
          <div style={{ position: "absolute", top: "-120px", left: "50%", transform: "translateX(-50%)", width: "900px", height: "500px", background: "radial-gradient(ellipse, rgba(200,169,110,0.18) 0%, transparent 65%)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", top: "100px", right: "-100px", width: "400px", height: "400px", background: "radial-gradient(ellipse, rgba(196,98,45,0.10) 0%, transparent 70%)", borderRadius: "50%" }} />

          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "48px" }}>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#C8A96E", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Forma
            </div>
            <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.15)" }} />
            <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>
              {categoryLabel}
            </div>
          </div>

          {/* Template name */}
          <div style={{ fontSize: "56px", fontWeight: 900, color: "#FFFFFF", letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: "24px", maxWidth: "900px" }}>
            {template.name}
          </div>

          {/* Description */}
          <div style={{ fontSize: "22px", color: "rgba(255,255,255,0.45)", lineHeight: 1.5, maxWidth: "800px", marginBottom: "48px" }}>
            {template.description}
          </div>

          {/* Bottom row */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "auto" }}>
            <div style={{ background: "rgba(200,169,110,0.15)", border: "1px solid rgba(200,169,110,0.3)", borderRadius: "100px", padding: "10px 22px", fontSize: "18px", color: "#C8A96E", fontWeight: 700 }}>
              {priceLabel}
            </div>
            {template.tags.slice(0, 3).map((tag) => (
              <div
                key={tag}
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "100px", padding: "10px 22px", fontSize: "15px", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  // Default generic OG
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
        <div style={{ position: "absolute", top: "-120px", left: "50%", transform: "translateX(-50%)", width: "900px", height: "500px", background: "radial-gradient(ellipse, rgba(200,169,110,0.18) 0%, transparent 65%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: "100px", right: "-100px", width: "400px", height: "400px", background: "radial-gradient(ellipse, rgba(196,98,45,0.10) 0%, transparent 70%)", borderRadius: "50%" }} />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", position: "relative", padding: "0 80px" }}>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "#C8A96E", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Forma
          </div>
          <div style={{ fontSize: "60px", fontWeight: 900, color: "#FFFFFF", textAlign: "center", letterSpacing: "-0.03em", lineHeight: 1.08 }}>
            Template premium,{"\n"}personalizzati con AI
          </div>
          <div style={{ fontSize: "22px", color: "rgba(255,255,255,0.45)", textAlign: "center", maxWidth: "620px", lineHeight: 1.5 }}>
            Template UI e Prompt AI pronti all&apos;uso — personalizzabili in secondi con Claude.
          </div>
          <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
            {["UI Templates", "AI Prompts", "Claude AI"].map((label) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "100px", padding: "10px 22px", fontSize: "15px", color: "rgba(255,255,255,0.65)", fontWeight: 600 }}>
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
