import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, isLocale, toLocale } from "@/lib/locales";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import LanguageProvider from "@/components/LanguageProvider";
import { PostHogProvider } from "@/components/PostHogProvider";
import PageTransition from "@/components/PageTransition";
import CommandPalette from "@/components/CommandPalette";
import GlassDock from "@/components/GlassDock";
import "@/app/globals.css";

// IBM Plex: a neutral, institutional grotesque for text and headings, with its
// matching mono for labels, dates and figures. Only these two are loaded.
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sandbox.example.com";

const SITE_META = {
  it: {
    title: "Sandbox — ambiente di prova",
    description:
      "Ambiente di test per layout, contenuti e componenti. I contenuti sono materiale di esempio.",
  },
  en: {
    title: "Sandbox — test environment",
    description:
      "Test environment for layouts, content and components. Content is sample material.",
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
    title: { default: m.title, template: "%s" },
    description: m.description,
    openGraph: {
      type: "website",
      siteName: "Sandbox",
      title: m.title,
      description: m.description,
      images: [{ url: `/api/og?lang=${lang}`, width: 1200, height: 630, alt: "Sandbox" }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [`/api/og?lang=${lang}`],
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
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // `[lang]` matches any single segment, so scanners requesting /wp-login.php
  // would render the homepage with lang="wp-login.php" — an unsupported locale
  // is a missing page, not a broken render.
  if (!isLocale(lang)) {
    notFound();
  }

  return (
    <html
      lang={lang}
      className={`${plexSans.variable} ${plexMono.variable}`}
      style={{ colorScheme: "light" }}
    >
      <head>
        {/* Applies the stored theme before first paint, avoiding a flash for
            anyone who has switched to dark mode. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}}catch(e){}})();",
          }}
        />
      </head>
      <body className="min-h-screen text-ink antialiased">
        <PostHogProvider>
          <ThemeProvider>
            <LanguageProvider>
              <PageTransition>
                <div id="main-content">{children}</div>
              </PageTransition>
              <CommandPalette />
              <GlassDock />
            </LanguageProvider>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
