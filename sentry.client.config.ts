import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.1,

  // Disable Sentry entirely if DSN is not configured (local dev)
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Replay only for sessions with errors in production
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0,
});
