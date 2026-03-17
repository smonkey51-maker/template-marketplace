import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "@/components/ThemeProvider";
import LanguageProvider from "@/components/LanguageProvider";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "TemplateLab — AI-Powered Template Marketplace",
  description:
    "Buy premium UI and prompt templates. Customize any template instantly with Claude AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`dark ${geist.variable}`}>
        <body className="bg-page text-theme antialiased min-h-screen">
          <ThemeProvider><LanguageProvider>{children}</LanguageProvider></ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
