import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getArticle, getCategoryLabel } from "@/lib/articles";
import { toLocale } from "@/lib/locales";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const article = slug ? getArticle(slug) : null;
  // Callers that omit ?lang get Italian, matching the site default; pages
  // that embed this image pass their own locale so the card matches the
  // page that was shared.
  const lang = toLocale(searchParams.get("lang"));

  if (article) {
    const locale = article[lang];
    const categoryLabel = getCategoryLabel(article.category, lang);

    return new ImageResponse(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #FDFBF7 0%, #F8F2E6 60%, #EAEFE9 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
          padding: "80px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "900px",
            height: "500px",
            background: "radial-gradient(ellipse, rgba(139, 38, 53, 0.14) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "48px" }}>
          <div
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#8B2635",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            OSSERVATORIO
          </div>
          <div style={{ width: "1px", height: "18px", background: "rgba(27, 54, 47, 0.14)" }} />
          <div style={{ fontSize: "14px", color: "rgba(27, 54, 47, 0.4)", fontWeight: 500 }}>
            {categoryLabel}
          </div>
        </div>

        <div
          style={{
            fontSize: "48px",
            fontWeight: 900,
            color: "#1B362F",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "24px",
            maxWidth: "900px",
          }}
        >
          {locale.title}
        </div>

        <div
          style={{
            fontSize: "20px",
            color: "rgba(27, 54, 47, 0.55)",
            lineHeight: 1.5,
            maxWidth: "800px",
            marginBottom: "48px",
          }}
        >
          {locale.description}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "auto" }}>
          {article.tags.slice(0, 3).map((tag) => (
            <div
              key={tag}
              style={{
                background: "rgba(27, 54, 47, 0.05)",
                border: "1px solid rgba(27, 54, 47, 0.14)",
                borderRadius: "100px",
                padding: "10px 22px",
                fontSize: "15px",
                color: "rgba(27, 54, 47, 0.6)",
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>,
      { width: 1200, height: 630 },
    );
  }

  // Default generic OG
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #FDFBF7 0%, #F8F2E6 60%, #EAEFE9 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "500px",
          background: "radial-gradient(ellipse, rgba(139, 38, 53, 0.14) 0%, transparent 65%)",
          borderRadius: "50%",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          position: "relative",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#8B2635",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          OSSERVATORIO
        </div>
        <div
          style={{
            fontSize: "56px",
            fontWeight: 900,
            color: "#1B362F",
            textAlign: "center",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Il Mentalist &amp; la psicologia{"\n"}dell&apos;osservazione
        </div>
        <div
          style={{
            fontSize: "22px",
            color: "rgba(27, 54, 47, 0.55)",
            textAlign: "center",
            maxWidth: "620px",
            lineHeight: 1.5,
          }}
        >
          Analisi da fan e guide pratiche di psicologia — osservazione, memoria, ascolto,
          persuasione.
        </div>
        <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
          {["Fan commentary", "Psicologia", "Osservazione"].map((label) => (
            <div
              key={label}
              style={{
                background: "rgba(27, 54, 47, 0.05)",
                border: "1px solid rgba(27, 54, 47, 0.14)",
                borderRadius: "100px",
                padding: "10px 22px",
                fontSize: "15px",
                color: "rgba(27, 54, 47, 0.65)",
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
