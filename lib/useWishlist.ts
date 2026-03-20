"use client";

import { useState, useEffect, useCallback } from "react";

const KEY = "tl_wishlist";

export function useWishlist() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setIds(JSON.parse(stored));
    } catch {}
  }, []);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const isWishlisted = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, toggle, isWishlisted };
}
