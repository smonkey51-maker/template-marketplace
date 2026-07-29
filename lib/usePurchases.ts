"use client";
import { useState, useEffect } from "react";

/**
 * Shared hook — fetches /api/purchases once and returns the list of template IDs
 * the current user (or guest) has purchased, plus a loading flag.
 */
export function usePurchases() {
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/purchases")
      .then((r) => (r.ok ? r.json() : { templateIds: [] }))
      .then((d) => setPurchasedIds(d.templateIds ?? []))
      .catch((e) => console.error("[usePurchases]", e))
      .finally(() => setLoading(false));
  }, []);

  return { purchasedIds, loading };
}
