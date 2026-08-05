"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

/**
 * "Indietro" — the one back control, used on every page that is not the home
 * page.
 *
 * Before this there were two of them, written separately: a fixed pill on the
 * bundle page and another on the preview page, each with its own hand-drawn
 * chevron and its own translation key. Every other inner page had nothing at
 * all, so whether a visitor could retrace a step depended on which page they
 * happened to be looking at.
 *
 * It goes back through history rather than to a fixed URL, because "indietro"
 * means the page before this one — from the catalogue that is the catalogue,
 * from a search result it is the search. A visitor who arrived straight from a
 * link has no history to pop, so that case falls back to the home page instead
 * of leaving the site.
 */
export default function BackLink({
  /** Where to go when this tab has no previous page — a direct link, a new tab. */
  fallbackHref,
  /** Fixed to the top-left corner, for the pages that carry no site nav. */
  floating = false,
  className = "",
}: {
  fallbackHref?: string;
  floating?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const { lang } = useLang();
  const label = lang === "it" ? "Indietro" : "Back";

  return (
    <button
      type="button"
      onClick={() => {
        // length > 1 means this tab has somewhere to go back to. On a page
        // opened directly it is 1, and router.back() would either do nothing
        // or walk the visitor off the site.
        if (typeof window !== "undefined" && window.history.length > 1) router.back();
        else router.push(fallbackHref ?? `/${lang}`);
      }}
      aria-label={label}
      className={[
        "fn-back r-pill inline-flex items-center gap-1.5",
        floating ? "fixed top-4 left-4 z-50" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <ChevronLeft size={16} strokeWidth={2} aria-hidden className="shrink-0" />
      {label}
    </button>
  );
}
