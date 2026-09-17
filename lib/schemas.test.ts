import { describe, it, expect } from "vitest";
import { subscribeSchema } from "@/lib/schemas";

describe("subscribeSchema", () => {
  it("accepts a valid email", () => {
    const result = subscribeSchema.safeParse({ email: "person@example.com" });
    expect(result.success).toBe(true);
  });

  it("lowercases and trims the email", () => {
    const result = subscribeSchema.safeParse({ email: "  Person@Example.com  " });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.email).toBe("person@example.com");
  });

  it("rejects an invalid email", () => {
    const result = subscribeSchema.safeParse({ email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects an email over 254 chars", () => {
    const long = `${"a".repeat(250)}@a.com`;
    const result = subscribeSchema.safeParse({ email: long });
    expect(result.success).toBe(false);
  });

  it("rejects a missing email", () => {
    const result = subscribeSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
