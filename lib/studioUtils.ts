/** Returns true if the AI output text looks like HTML (UI template). */
export function isHTMLOutput(text: string): boolean {
  return (
    text.trim().startsWith("<") ||
    text.includes("<div") ||
    text.includes("<section")
  );
}
