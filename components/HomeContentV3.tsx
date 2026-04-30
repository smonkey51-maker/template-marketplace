"use client";

import { useEffect } from "react";
import { LayoutProvider, useLayoutMode } from "@/components/redesign/LayoutContext";
import Nav from "@/components/redesign/Nav";
import Hero from "@/components/redesign/Hero";
import Manifesto from "@/components/redesign/Manifesto";
import CategoryRoom from "@/components/redesign/CategoryRoom";
import AIStudio from "@/components/redesign/AIStudio";
import TemplateMasonry from "@/components/redesign/TemplateMasonry";
import SiteFooter from "@/components/redesign/SiteFooter";

function HomeV3Inner() {
  const { mode } = useLayoutMode();

  useEffect(() => {
    if (mode === "editorial") {
      document.documentElement.classList.add("forma-v2");
    } else {
      document.documentElement.classList.remove("forma-v2");
    }
    document.documentElement.classList.toggle("forma-compact", mode === "compact");
    return () => {
      document.documentElement.classList.remove("forma-v2");
      document.documentElement.classList.remove("forma-compact");
    };
  }, [mode]);

  return (
    <div style={{ background: "var(--forma-bg)", minHeight: "100vh", transition: "background 0.3s ease" }}>
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

export default function HomeContentV3() {
  return (
    <LayoutProvider>
      <HomeV3Inner />
    </LayoutProvider>
  );
}
