"use client";

import { useState, useEffect, useCallback } from "react";

const KEY = "tl_cart";

/**
 * Cart state — localStorage only, no DB sync. Unlike useWishlist (which
 * merges with a Supabase-backed list for signed-in users), the cart is
 * meant to be emptied at checkout, so there is nothing worth persisting
 * server-side: a wishlist survives across devices on purpose, a cart does
 * not need to.
 */
export function useCart() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setIds(JSON.parse(stored));
    } catch (e) {
      console.error("[useCart]", e);
    }
  }, []);

  const persist = useCallback((next: string[]) => {
    setIds(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch (e) {
      console.error("[useCart]", e);
    }
  }, []);

  const add = useCallback((templateId: string) => {
    setIds((prev) => {
      if (prev.includes(templateId)) return prev;
      const next = [...prev, templateId];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch (e) {
        console.error("[useCart]", e);
      }
      return next;
    });
  }, []);

  const remove = useCallback((templateId: string) => {
    setIds((prev) => {
      const next = prev.filter((id) => id !== templateId);
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch (e) {
        console.error("[useCart]", e);
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => persist([]), [persist]);
  const has = useCallback((templateId: string) => ids.includes(templateId), [ids]);

  return { ids, add, remove, clear, has };
}
