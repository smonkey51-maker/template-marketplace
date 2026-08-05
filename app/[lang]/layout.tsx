import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { LOCALES, isLocale, toLocale } from "@/lib/locales";
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
import GlassEnhancements from "@/components/GlassEnhancements";
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

// Localised per route segment rather than a single static object. The site is
// Italian-first, but middleware.ts routes any non-Italian browser to /en, and a
// visitor who lands there was still served an Italian <title> and an Italian
// description — the part of the page that reaches search results and link
// previews, where it is least likely to be noticed and most likely to matter.
const SITE_META = {
  it: {
    title: "FORMA — Template come oggetti curati.",
    description:
      "Template digitali pronti all'uso: prompt AI, guide, fogli di calcolo e tracker. Ogni file è un gesto preciso, non una soluzione generica.",
  },
  en: {
    title: "FORMA — Templates as considered objects.",
    description:
      "Ready-to-use digital templates: AI prompts, guides, spreadsheets and trackers. Every file is a precise gesture, not a generic solution.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const m = SITE_META[lang];
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: m.title,
      // Pages set a bare title; this appends the brand. A page that spells the
      // suffix out itself gets it twice.
      template: "%s — FORMA",
    },
    description: m.description,
    openGraph: {
      type: "website",
      siteName: "FORMA",
      title: m.title,
      description: m.description,
      images: [{ url: `/api/og?lang=${lang}`, width: 1200, height: 630, alt: "FORMA" }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [`/api/og?lang=${lang}`],
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: { it: `${SITE_URL}/it`, en: `${SITE_URL}/en` },
    },
  };
}

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
          <GlassEnhancements />
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
