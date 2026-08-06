import type { ComponentProps } from "react";
import type { ClerkProvider } from "@clerk/nextjs";

type Appearance = ComponentProps<typeof ClerkProvider>["appearance"];

/**
 * Re-skins Clerk's hosted auth UI — sign-in, sign-up, and the UserButton
 * menu — to match FORMA's own design system instead of Clerk's default blue
 * theme. Set once on <ClerkProvider> so every Clerk component picks it up,
 * rather than passed separately to each one.
 *
 * Colors are `var(--token)` references, not literal hex values: the same
 * custom properties already drive the rest of the site's light/dark theme
 * (see globals.css), so Clerk's UI follows the toggle for free instead of
 * needing its own light/dark branch kept in sync by hand.
 */
export const clerkAppearance: Appearance = {
  variables: {
    colorPrimary: "var(--accent)",
    colorBackground: "var(--surface)",
    colorText: "var(--text)",
    colorTextSecondary: "var(--muted)",
    colorInputBackground: "var(--input-bg)",
    colorInputText: "var(--text)",
    colorDanger: "var(--error)",
    colorSuccess: "var(--success)",
    borderRadius: "var(--r-md)",
    fontFamily: "var(--font-jakarta), sans-serif",
  },
  elements: {
    card: {
      backgroundColor: "var(--card-bg)",
      border: "1px solid var(--card-border)",
      borderRadius: "var(--glass-radius)",
      boxShadow: "var(--glass-shadow)",
    },
    headerTitle: {
      fontFamily: "var(--font-syne), sans-serif",
      color: "var(--text)",
    },
    headerSubtitle: {
      color: "var(--muted)",
    },
    // The primary CTA stays a solid gold pill everywhere else on the site
    // (globals.css: ".btn-brand ... not glass") — matched here rather than
    // left as Clerk's default rounded-rectangle blue button.
    //
    // No nested "&:hover" selector here: Clerk flags that as "structural
    // CSS" because it reaches into the internal DOM of its own component
    // (console warning, code=structural_css_pin_clerk_ui) and could break on
    // a future Clerk update. Clerk already derives its own hover/focus shades
    // from colorPrimary, which is good enough for a form button.
    formButtonPrimary: {
      backgroundColor: "var(--accent)",
      color: "var(--bg)",
      borderRadius: "var(--r-pill, 999px)",
      fontFamily: "var(--font-syne), sans-serif",
      textTransform: "none",
    },
    formFieldInput: {
      backgroundColor: "var(--input-bg)",
      borderColor: "var(--border)",
      borderRadius: "var(--r-md)",
      color: "var(--text)",
    },
    formFieldLabel: {
      color: "var(--text)",
    },
    footerActionLink: {
      color: "var(--accent)",
    },
    socialButtonsBlockButton: {
      backgroundColor: "var(--card-bg)",
      borderColor: "var(--border)",
      borderRadius: "var(--r-pill, 999px)",
      color: "var(--text)",
    },
    dividerLine: {
      backgroundColor: "var(--border)",
    },
    dividerText: {
      color: "var(--muted)",
    },
    userButtonPopoverCard: {
      backgroundColor: "var(--card-bg)",
      border: "1px solid var(--card-border)",
    },
  },
};
