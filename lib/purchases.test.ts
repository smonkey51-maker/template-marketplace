import { describe, it, expect, vi, beforeEach } from "vitest";
import { hasStudioAccess, isStudioProduct, getUserPurchases } from "@/lib/purchases";

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => Promise.resolve({ data: [], error: null })),
        })),
      })),
    })),
  })),
}));

describe("hasStudioAccess", () => {
  it("returns true when studio-access is in purchases", () => {
    expect(hasStudioAccess(["studio-access", "hero-saas"])).toBe(true);
  });

  it("returns true when studio-access-lifetime is in purchases", () => {
    expect(hasStudioAccess(["studio-access-lifetime"])).toBe(true);
  });

  it("returns false when no studio product purchased", () => {
    expect(hasStudioAccess(["hero-saas", "landing-page"])).toBe(false);
  });

  it("returns false for empty array", () => {
    expect(hasStudioAccess([])).toBe(false);
  });
});

describe("isStudioProduct", () => {
  it("returns true for studio-access", () => {
    expect(isStudioProduct("studio-access")).toBe(true);
  });

  it("returns true for studio-access-lifetime", () => {
    expect(isStudioProduct("studio-access-lifetime")).toBe(true);
  });

  it("returns false for regular template", () => {
    expect(isStudioProduct("hero-saas")).toBe(false);
  });
});

describe("getUserPurchases", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SUPABASE_URL = "https://test.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-key";
  });

  it("returns template ids on success", async () => {
    const { createClient } = await import("@supabase/supabase-js");
    vi.mocked(createClient).mockReturnValue({
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() =>
            Promise.resolve({
              data: [{ template_id: "hero-saas" }, { template_id: "studio-access" }],
              error: null,
            }),
          ),
        })),
      })),
    } as never);

    const result = await getUserPurchases("user_123");
    expect(result).toEqual(["hero-saas", "studio-access"]);
  });

  it("returns empty array on supabase error", async () => {
    const { createClient } = await import("@supabase/supabase-js");
    vi.mocked(createClient).mockReturnValue({
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => Promise.resolve({ data: null, error: { message: "DB error" } })),
        })),
      })),
    } as never);

    const result = await getUserPurchases("user_123");
    expect(result).toEqual([]);
  });
});
