import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

// Template previews run untrusted-ish HTML in a same-origin iframe and pull
// Tailwind from its CDN, so 'unsafe-inline'/'unsafe-eval' can't be dropped for
// scripts yet. Everything else is locked down.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://*.clerk.accounts.dev https://*.clerk.com https://js.stripe.com https://*.posthog.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://api.stripe.com https://*.supabase.co https://*.posthog.com https://*.ingest.sentry.io",
  "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://*.clerk.accounts.dev",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  experimental: {
    optimizePackageImports: ["@clerk/nextjs"],
  },
  // Paid product files live in content/products/ (NOT public/, which Next.js
  // would serve to anyone). They're read with fs at runtime, so the build has
  // to be told to ship them.
  outputFileTracingIncludes: {
    "/api/download/[templateId]": ["./content/products/**"],
    "/api/download-session": ["./content/products/**"],
    "/api/preview/[templateId]": ["./content/products/**"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Content-Security-Policy", value: CSP },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        // Prevent page-level routes from being embedded in external iframes,
        // but NOT /api/preview/* which must be loadable in same-origin iframes.
        source: "/((?!api/preview).*)",
        headers: [{ key: "X-Frame-Options", value: "SAMEORIGIN" }],
      },
      {
        source: "/_next/static/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/paintings/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/api/(.*)",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // Sentry org/project — fill in after creating the project on sentry.io
  org: process.env.SENTRY_ORG ?? "forma-design",
  project: process.env.SENTRY_PROJECT ?? "template-marketplace",

  // Only upload source maps when SENTRY_AUTH_TOKEN is set (CI / Vercel)
  silent: !process.env.SENTRY_AUTH_TOKEN,
  authToken: process.env.SENTRY_AUTH_TOKEN,

  widenClientFileUpload: true,
});
