import { describe, it, expect } from "vitest";
import { escapeHtml } from "@/lib/email";

describe("escapeHtml", () => {
  it("escapes markup so visitor text cannot inject HTML into the email", () => {
    expect(escapeHtml(`<img src=x onerror="a()">&'`)).toBe(
      "&lt;img src=x onerror=&quot;a()&quot;&gt;&amp;&#39;",
    );
  });

  it("leaves plain text alone", () => {
    expect(escapeHtml("Buongiorno, vorrei un preventivo.")).toBe(
      "Buongiorno, vorrei un preventivo.",
    );
  });
});
