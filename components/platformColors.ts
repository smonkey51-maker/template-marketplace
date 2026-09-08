/**
 * Platform accent colours, shared by the card thumbnail and the platform
 * mock-ups. Kept in its own module so importing the palette does not pull in
 * the ~600 lines of inline SVG mock-ups next to it — those load on demand.
 */
export const PLATFORM_COLORS: Record<string, { from: string; to: string; label: string }> = {
  notion: { from: "#2f3437", to: "#1a1a1a", label: "Notion" },
  canva: { from: "#7B61FF", to: "#4B3DB5", label: "Canva" },
  excel: { from: "#1D6F42", to: "#0d3d24", label: "Excel" },
  sheets: { from: "#0F9D58", to: "#086d3d", label: "Sheets" },
  webflow: { from: "#4353FF", to: "#2233cc", label: "Webflow" },
  framer: { from: "#0055FF", to: "#0033aa", label: "Framer" },
  shopify: { from: "#95BF47", to: "#5a7a1e", label: "Shopify" },
  wordpress: { from: "#21759B", to: "#0e4a6e", label: "WordPress" },
  html: { from: "#C49A3C", to: "#7A5220", label: "HTML" },
};
