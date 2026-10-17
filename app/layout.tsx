import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { PostHogProvider } from "@/components/PostHogProvider";
import PageTransition from "@/components/PageTransition";
import FloatingCta from "@/components/FloatingCta";
import InteractionFx from "@/components/InteractionFx";
import { SITE, SITE_URL } from "@/lib/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: "%s" },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ["/api/og"],
  },
  // While the site is a draft it must not be indexed as if it were final.
  robots: SITE.draft ? { index: false, follow: false } : undefined,
};

// viewport-fit=cover lets env(safe-area-inset-*) work on notched phones; the
// theme colour matches the page so the browser chrome does too.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="it"
      className={`${plexSans.variable} ${plexMono.variable}`}
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <head>
        {/* Keeps the home page's intro hidden until HeroReady starts it (failsafe: 2.5 s). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(location.pathname==='/'&&!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('hero-pending');setTimeout(function(){d.classList.remove('hero-pending')},2500)}}catch(e){}})();",
          }}
        />
      </head>
      <body className="min-h-screen text-ink antialiased">
        <PostHogProvider>
          <PageTransition>
            <div id="main-content">{children}</div>
          </PageTransition>
          <FloatingCta />
          <InteractionFx />
        </PostHogProvider>
      </body>
    </html>
  );
}
