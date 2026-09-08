"use client";

import { useEffect } from "react";

/**
 * PostHog, loaded only if it is actually going to be used.
 *
 * `import posthog from "posthog-js"` at the top of this file put the whole SDK
 * — 200 KB, plus the 112 KB of core-js it depends on — into the initial client
 * bundle of *every* route, because this component sits in the root layout. It
 * was downloaded even when NEXT_PUBLIC_POSTHOG_KEY was unset: the init below
 * bailed out correctly, but only after the browser had already paid for the
 * library. Importing it inside the effect means an unconfigured deployment
 * ships none of it, and a configured one fetches it after hydration rather
 * than ahead of first paint.
 *
 * The `PostHogProvider` from "posthog-js/react" used to wrap the tree here and
 * is gone with it: nothing in the app calls `usePostHog()` or captures an event
 * by hand, so the context had no consumer. All the analytics this site does is
 * the automatic pageview/pageleave capture configured below, which the SDK does
 * on its own once initialised — so the behaviour is unchanged.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";
    if (!key) return; // gracefully disabled if not configured

    let cancelled = false;
    // A navigation can unmount this before the chunk arrives; initialising then
    // would start a tracker for a page the visitor has already left.
    import("posthog-js").then(({ default: posthog }) => {
      if (cancelled) return;
      posthog.init(key, {
        api_host: host,
        capture_pageview: true,
        capture_pageleave: true,
        persistence: "memory", // GDPR-friendly: no cookies
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return <>{children}</>;
}
