import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "TemplateLab — Template UI e Prompt AI pronti all'uso",
  description:
    "Scarica template HTML/UI e prompt AI professionali. Personalizzali con lo Studio AI integrato. Acquisto unico, nessun abbonamento.",
  openGraph: {
    title: "TemplateLab — Template UI e Prompt AI pronti all'uso",
    description:
      "Scarica template HTML/UI e prompt AI professionali. Personalizzali con lo Studio AI integrato.",
    type: "website",
  },
};

export default function Page() {
  return <HomeContent />;
}
