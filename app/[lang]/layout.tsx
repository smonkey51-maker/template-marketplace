import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { LOCALES, isLocale } from "@/lib/locales";
import {
  Montserrat,
  DM_Serif_Display,
  Instrument_Sans,
  Cormorant_Garamond,
  Fraunces,
  Inter,
} from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import LanguageProvider from "@/components/LanguageProvider";
import { PostHogProvider } from "@/components/PostHogProvider";
import { ToastProvider } from "@/components/Toast";
import MobileNav from "@/components/MobileNav";
import PageTransition from "@/components/PageTransition";
import CommandPalette from "@/components/CommandPalette";
import GsapProvider from "@/app/providers/GsapProvider";
import "@/app/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
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
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
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
    default: "FORMA — Template come oggetti curati.",
    template: "%s — FORMA",
  },
  description:
    "Template digitali pronti all'uso: HTML, Notion, Shopify, WordPress. Ogni file è un gesto preciso, non una soluzione generica.",
  openGraph: {
    type: "website",
    siteName: "FORMA",
    title: "FORMA — Template come oggetti curati.",
    description:
      "Template digitali pronti all'uso: HTML, Notion, Shopify, WordPress. Ogni file è un gesto preciso, non una soluzione generica.",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "FORMA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FORMA — Template come oggetti curati.",
    description:
      "Template digitali pronti all'uso: HTML, Notion, Shopify, WordPress. Ogni file è un gesto preciso, non una soluzione generica.",
    images: ["/api/og"],
  },
  alternates: {
    languages: {
      it: SITE_URL,
      en: `${SITE_URL}?lang=en`,
    },
  },
};

/** Only /it and /en exist. Anything else is a 404, not a render. */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }> | any;
}) {
  const resolvedParams = await params;

  // `[lang]` matches any single segment, so scanners requesting /wp-login.php
  // or /index.php rendered the homepage with lang="wp-login.php" — every
  // `copy[lang]` lookup then returned undefined and the page threw a 500 while
  // reading `.heroTagline` off it. An unsupported locale is a missing page.
  if (!isLocale(resolvedParams?.lang)) {
    notFound();
  }
  const lang = resolvedParams.lang;

  return (
    <ClerkProvider>
      <html
        lang={lang}
        className={`dark ${montserrat.variable} ${jakarta.variable} ${dmSerif.variable} ${cormorant.variable} ${fraunces.variable} ${inter.variable}`}
        style={{ colorScheme: "dark" }}
      >
        <link rel="preload" as="image" href="/paintings/vermeer.jpg" />
        <body className="bg-page text-theme antialiased min-h-screen">
          <PostHogProvider>
            <ThemeProvider>
              <LanguageProvider>
                <ToastProvider>
                  <GsapProvider>
                    <PageTransition>
                      <div id="main-content">{children}</div>
                    </PageTransition>
                    <MobileNav />
                    <CommandPalette />
                  </GsapProvider>
                </ToastProvider>
              </LanguageProvider>
            </ThemeProvider>
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
