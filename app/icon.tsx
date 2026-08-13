import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 4,
        background: "linear-gradient(135deg, #D4AF37 0%, #B8962E 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        fontWeight: 800,
        fontSize: 20,
        color: "#1C1A17",
      }}
    >
      F
    </div>,
    { ...size },
  );
}
