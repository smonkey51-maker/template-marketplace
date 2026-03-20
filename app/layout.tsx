import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Syne } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import LanguageProvider from "@/components/LanguageProvider";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

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
      <html lang="en" className={`dark ${syne.variable}`}>
        <body className="bg-page text-theme antialiased min-h-screen">
          <CustomCursor />
          <ThemeProvider><LanguageProvider>{children}</LanguageProvider></ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
