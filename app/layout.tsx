import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Syne } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import LanguageProvider from "@/components/LanguageProvider";
import { PostHogProvider } from "@/components/PostHogProvider";
import { ToastProvider } from "@/components/Toast";
import MobileNav from "@/components/MobileNav";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://templatelab.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TemplateLab — AI-Powered Template Marketplace",
    template: "%s — TemplateLab",
  },
  description:
    "Buy premium UI and prompt templates. Customize any template instantly with Claude AI. No code required.",
  openGraph: {
    type: "website",
    siteName: "TemplateLab",
    title: "TemplateLab — AI-Powered Template Marketplace",
    description:
      "Buy premium UI and prompt templates. Customize any template instantly with Claude AI.",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "TemplateLab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TemplateLab — AI-Powered Template Marketplace",
    description:
      "Buy premium UI and prompt templates. Customize any template instantly with Claude AI.",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="it" className={`dark ${syne.variable} ${jakarta.variable}`}>
        <body className="bg-page text-theme antialiased min-h-screen">
          <CustomCursor />
          <PostHogProvider><ThemeProvider><LanguageProvider><ToastProvider>{children}<MobileNav /></ToastProvider></LanguageProvider></ThemeProvider></PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
