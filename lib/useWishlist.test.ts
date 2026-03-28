import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useWishlist } from "./useWishlist";

// Mock @clerk/nextjs
vi.mock("@clerk/nextjs", () => ({
  useUser: () => ({ user: null, isLoaded: true }),
}));

describe("useWishlist", () => {
  it("starts with empty ids", () => {
    const { result } = renderHook(() => useWishlist());
    expect(result.current.ids).toEqual([]);
  });

  it("toggles a template id on/off", () => {
    const { result } = renderHook(() => useWishlist());
    act(() => { result.current.toggle("tmpl-1"); });
    expect(result.current.ids).toContain("tmpl-1");
    act(() => { result.current.toggle("tmpl-1"); });
    expect(result.current.ids).not.toContain("tmpl-1");
  });

  it("isWishlisted returns correct boolean", () => {
    const { result } = renderHook(() => useWishlist());
    act(() => { result.current.toggle("tmpl-2"); });
    expect(result.current.isWishlisted("tmpl-2")).toBe(true);
    expect(result.current.isWishlisted("tmpl-99")).toBe(false);
  });

  it("persists to localStorage on toggle", () => {
    const { result } = renderHook(() => useWishlist());
    act(() => { result.current.toggle("tmpl-3"); });
    const stored = JSON.parse(localStorage.getItem("tl_wishlist") ?? "[]");
    expect(stored).toContain("tmpl-3");
  });
});
