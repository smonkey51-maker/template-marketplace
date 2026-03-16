import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

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
      <html lang="en">
        <body className="bg-gray-950 text-white antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
