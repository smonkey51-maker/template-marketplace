import { describe, it, expect } from "vitest";
import { subscribeSchema, contactSchema } from "@/lib/schemas";

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

describe("contactSchema", () => {
  const valid = {
    name: "Mario Rossi",
    company: "Rossi Srl",
    email: "Mario@Rossi.it",
    message: "Vorremmo un primo colloquio per un progetto di selezione.",
    consent: true,
  };

  it("accepts a complete message and normalises the email", () => {
    const result = contactSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("mario@rossi.it");
      expect(result.data.phone).toBe("");
    }
  });

  it("requires the privacy consent to be an explicit yes", () => {
    expect(contactSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, consent: undefined }).success).toBe(false);
  });

  it("keeps a filled honeypot value so the route can drop the message silently", () => {
    const result = contactSchema.safeParse({ ...valid, website: "http://spam.example" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.website).toBe("http://spam.example");
  });

  it("rejects a too-short message and an invalid phone", () => {
    expect(contactSchema.safeParse({ ...valid, message: "ciao" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, phone: "abc" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, phone: "+39 02 1234 5678" }).success).toBe(true);
  });
});
