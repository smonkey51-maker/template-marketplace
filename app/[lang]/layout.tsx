import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, isLocale, toLocale } from "@/lib/locales";
import { Playfair_Display, Inter } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import LanguageProvider from "@/components/LanguageProvider";
import { PostHogProvider } from "@/components/PostHogProvider";
import { ToastProvider } from "@/components/Toast";
import PageTransition from "@/components/PageTransition";
import CommandPalette from "@/components/CommandPalette";
import "@/app/globals.css";

// Only the two brand families are loaded.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
  display: "swap",
});

// Playfair Display — elegant, slightly retro serif: old psychology books,
// investigation dossiers, Jane's own sartorial style. Used for hero/display
// headlines (h1–h3, article titles). Replaced Fraunces in the "Il Taccuino
// di Jane" content redesign — the CSS variable keeps the name --font-display
// (not --font-fraunces) so it names what it does rather than what it once
// loaded.
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://inspo.example.com";

// Localised per route segment rather than a single static object — an
// Italian-first site with English secondary needs the <title>/description
// that reach search results to match the locale actually being served.
const SITE_META = {
  it: {
    title: "INSPO — Il Mentalist e la psicologia dell'osservazione",
    description:
      'Analisi da fan su Patrick Jane e "Il Mentalist", più guide pratiche di psicologia: linguaggio del corpo, memoria, ascolto attivo, persuasione. Sito non ufficiale.',
  },
  en: {
    title: "INSPO — The Mentalist and the psychology of observation",
    description:
      'Fan analysis of Patrick Jane and "The Mentalist", plus practical psychology guides: body language, memory, active listening, persuasion. Unofficial fan site.',
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
      template: "%s — INSPO",
    },
    description: m.description,
    openGraph: {
      type: "website",
      siteName: "INSPO",
      title: m.title,
      description: m.description,
      images: [{ url: `/api/og?lang=${lang}`, width: 1200, height: 630, alt: "INSPO" }],
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
  // or /index.php would render the homepage with lang="wp-login.php" — an
  // unsupported locale is a missing page, not a broken render.
  if (!isLocale(resolvedParams?.lang)) {
    notFound();
  }
  const lang = resolvedParams.lang;

  return (
    <html
      lang={lang}
      className={`${playfairDisplay.variable} ${inter.variable}`}
      style={{ colorScheme: "light" }}
    >
      <head>
        {/* Applies the stored theme before first paint. Without this, the
            page always paints light (the SSR default above) and ThemeProvider's
            effect only flips it to dark after hydration — a flash on every
            full page load for anyone who has switched to dark mode. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}}catch(e){}})();",
          }}
        />
      </head>
      <body className="bg-page text-theme antialiased min-h-screen">
        <PostHogProvider>
          <ThemeProvider>
            <LanguageProvider>
              <ToastProvider>
                <PageTransition>
                  <div id="main-content">{children}</div>
                </PageTransition>
                <CommandPalette />
              </ToastProvider>
            </LanguageProvider>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
