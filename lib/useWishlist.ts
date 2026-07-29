"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";

const KEY = "tl_wishlist";

export function useWishlist() {
  const { user, isLoaded } = useUser();
  const [ids, setIds] = useState<string[]>([]);
  const [synced, setSynced] = useState(false);

  // On mount: load from localStorage immediately
  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setIds(JSON.parse(stored));
    } catch (e) {
      console.error("[useWishlist]", e);
    }
  }, []);

  // When auth is loaded: sync with DB
  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      // Not logged in — use localStorage only
      setSynced(true);
      return;
    }
    // Fetch from DB and merge with localStorage
    fetch("/api/wishlist")
      .then((r) => r.json())
      .then((data) => {
        const dbIds: string[] = data.ids ?? [];
        const stored = (() => {
          try {
            return JSON.parse(localStorage.getItem(KEY) ?? "[]") as string[];
          } catch {
            return [] as string[];
          }
        })();
        // Merge: union of DB + localStorage (push localStorage items to DB)
        const merged = Array.from(new Set([...dbIds, ...stored]));
        // Sync localStorage-only items to DB
        const toSync = stored.filter((id) => !dbIds.includes(id));
        Promise.all(
          toSync.map((id) =>
            fetch("/api/wishlist", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ templateId: id }),
            }),
          ),
        ).catch((e) => console.error("[useWishlist sync]", e));
        setIds(merged);
        try {
          localStorage.setItem(KEY, JSON.stringify(merged));
        } catch (e) {
          console.error("[useWishlist]", e);
        }
        setSynced(true);
      })
      .catch((e) => {
        console.error("[useWishlist fetch]", e);
        setSynced(true);
      });
  }, [isLoaded, user]);

  const toggle = useCallback(
    (id: string) => {
      setIds((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch (e) {
          console.error("[useWishlist]", e);
        }
        return next;
      });
      // Sync to DB (fire and forget)
      if (user) {
        fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ templateId: id }),
        }).catch((e) => console.error("[useWishlist toggle]", e));
      }
    },
    [user],
  );

  const isWishlisted = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, toggle, isWishlisted, synced };
}
