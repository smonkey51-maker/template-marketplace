import { useEffect } from "react";

/** Returns true if the AI output text looks like HTML (UI template). */
export function isHTMLOutput(text: string): boolean {
  return (
    text.trim().startsWith("<") ||
    text.includes("<div") ||
    text.includes("<section")
  );
}

/** Persists an array to localStorage whenever it changes, capped at maxItems. */
export function useLocalStorageHistory<T>(key: string, value: T[], maxItems: number) {
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value.slice(0, maxItems)));
    } catch (e) {
      console.error(`[localStorage] ${key}:`, e);
    }
  }, [key, value, maxItems]);
}
