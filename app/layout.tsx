import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Montserrat, DM_Serif_Display, Plus_Jakarta_Sans, Cormorant_Garamond, Fraunces, Inter } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import LanguageProvider from "@/components/LanguageProvider";
import { PostHogProvider } from "@/components/PostHogProvider";
import { ToastProvider } from "@/components/Toast";
import MobileNav from "@/components/MobileNav";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import CommandPalette from "@/components/CommandPalette";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

// Cormorant Garamond — calligraphic high-contrast serif, zen editorial aesthetic
// Replaces Gatsunaga (paid). Same brush-like stroke contrast, free on Google Fonts.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
  display: "swap",
});

// Fraunces — variable display serif, editorial magazine feel.
// Used only for hero/display headlines (h1, .display-serif). Tuned with higher
// optical size + soft axis for a more calligraphic Japandi tone.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://forma.design";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FORMA — Arte, in tasca.",
    template: "%s — FORMA",
  },
  description:
    "Template multipiattaforma pronti all'uso: Notion, Web, Mobile e Pitch. Personalizza in pochi minuti, pubblica con una qualità che si vede.",
  openGraph: {
    type: "website",
    siteName: "FORMA",
    title: "FORMA — Infrastructure for Digital Structure",
    description:
      "FORMA turns scattered initiatives into modular projects, visible flows and decision-ready systems.",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Forma" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FORMA — Infrastructure for Digital Structure",
    description:
      "FORMA turns scattered initiatives into modular projects, visible flows and decision-ready systems.",
    images: ["/api/og"],
  },
  alternates: {
    languages: {
      "it": SITE_URL,
      "en": `${SITE_URL}?lang=en`,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="it" className={`${montserrat.variable} ${jakarta.variable} ${dmSerif.variable} ${cormorant.variable} ${fraunces.variable} ${inter.variable}`}>
        <body className="bg-page text-theme antialiased min-h-screen">
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:text-[13px] focus:font-bold" style={{ background: "var(--accent)", color: "var(--bg)" }}>
            Skip to content
          </a>
          <PostHogProvider><ThemeProvider><LanguageProvider><ToastProvider><PageTransition><div id="main-content">{children}</div></PageTransition><MobileNav /><CommandPalette /></ToastProvider></LanguageProvider></ThemeProvider></PostHogProvider>
          <CustomCursor />
        </body>
      </html>
    </ClerkProvider>
  );
}
