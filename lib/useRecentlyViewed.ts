"use client";

import { useState, useEffect, useCallback } from "react";

const KEY = "tl_recent";
const MAX = 8;

export function useRecentlyViewed() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setIds(JSON.parse(stored));
    } catch (e) {
      console.error('[useRecentlyViewed]', e);
    }
  }, []);

  const track = useCallback((id: string) => {
    setIds((prev) => {
      const next = [id, ...prev.filter((x) => x !== id)].slice(0, MAX);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch (e) { console.error('[useRecentlyViewed]', e); }
      return next;
    });
  }, []);

  return { ids, track };
}
