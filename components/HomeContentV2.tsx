"use client";

import Nav from "@/components/redesign/Nav";
import Hero from "@/components/redesign/Hero";
import CategoryLineup from "@/components/redesign/CategoryLineup";
import AIStudioShowcase from "@/components/redesign/AIStudioShowcase";
import TemplateShowcase from "@/components/redesign/TemplateShowcase";
import Pricing from "@/components/redesign/Pricing";
import HomeFooter from "@/components/redesign/HomeFooter";

export default function HomeContentV2() {
  return (
    <div
      style={{
        background: "var(--apple-bg)",
        minHeight: "100vh",
      }}
    >
      <Nav />
      <main id="main-content">
        <Hero />
        <CategoryLineup />
        <AIStudioShowcase />
        <TemplateShowcase />
        <Pricing />
      </main>
      <HomeFooter />
    </div>
  );
}
