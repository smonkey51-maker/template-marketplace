"use client";

import { useEffect } from "react";
import Nav from "@/components/redesign/Nav";
import Hero from "@/components/redesign/Hero";
import Manifesto from "@/components/redesign/Manifesto";
import CategoryRoom from "@/components/redesign/CategoryRoom";
import AIStudio from "@/components/redesign/AIStudio";
import TemplateMasonry from "@/components/redesign/TemplateMasonry";
import SiteFooter from "@/components/redesign/SiteFooter";

export default function HomeContentV3() {
  useEffect(() => {
    document.documentElement.classList.add("forma-v2");
    return () => {
      document.documentElement.classList.remove("forma-v2");
    };
  }, []);

  return (
    <div style={{ background: "#F5F0E8", minHeight: "100vh" }}>
      <div className="forma-grain" aria-hidden />
      <Nav />
      <main id="main-content">
        <Hero />
        <Manifesto />
        <CategoryRoom category="ui" sectionIndex={3} featuredId="hero-saas" />
        <CategoryRoom category="notion" sectionIndex={4} featuredId="notion-project-hub" />
        <CategoryRoom category="prompts" sectionIndex={5} featuredId="linkedin-prompt-pack" />
        <AIStudio />
        <TemplateMasonry />
      </main>
      <SiteFooter />
    </div>
  );
}
