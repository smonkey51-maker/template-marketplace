import { readFileSync, writeFileSync, mkdirSync } from "fs";

const raw = readFileSync(
  "C:/Users/nicol/.claude/projects/C--Users-nicol/a6e55778-4c24-4597-b862-6fa86f98a2c2/tool-results/toolu_01D4A2gGUPQUh1K6Dc7WXZzZ.txt",
  "utf8",
);

// Strip double line prefixes like "     1→     1→"
const clean = raw.replace(/[ \t]*\d+→[ \t]*\d+→/g, "");

// The outer structure is a JSON array of {type, text} objects
// But it's corrupted. Instead, find the embedded JSON block directly by text search.
// The content field is a JSON-escaped string: look for the first ``` json occurrence

// Since the text is JSON-escaped inside the outer structure,
// find the actual JSON by looking for the pattern as literal escaped text
const marker = "```json\\n{";
const markerIdx = clean.indexOf(marker);
if (markerIdx === -1) {
  // Try unescaped
  const m2 = clean.indexOf("```json\n{");
  if (m2 !== -1) {
    const end = clean.indexOf("\n```", m2 + 8);
    const jsonStr = clean.slice(m2 + 8, end).trim();
    const parsed = JSON.parse(jsonStr);
    writeFileSync("./scripts/notion-templates-data.json", JSON.stringify(parsed, null, 2));
    console.log("Written (unescaped path). Templates:", parsed.templates.length);
    process.exit(0);
  }
  console.error("Marker not found");
  process.exit(1);
}

// Extract the escaped JSON string
const endMarker = "\\n```";
const endIdx = clean.indexOf(endMarker, markerIdx + marker.length);
let escaped = clean.slice(markerIdx + "```json\\n".length, endIdx);

// Unescape: the content is stored as a JSON string value
// Replace \\n → \n, \\" → ", \\t → \t, \\u#### → unicode
const jsonStr = escaped
  .replace(/\\n/g, "\n")
  .replace(/\\t/g, "\t")
  .replace(/\\r/g, "\r")
  .replace(/\\"/g, '"')
  .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));

try {
  const parsed = JSON.parse(jsonStr);
  console.log("Templates:", parsed.templates.length);
  parsed.templates.forEach((t) => console.log(" -", t.id, t.price, t.name));
  console.log("Bundle:", parsed.bundle.id, parsed.bundle.price, "/", parsed.bundle.regularPrice);
  writeFileSync("./scripts/notion-templates-data.json", JSON.stringify(parsed, null, 2));
  console.log("Written OK");
} catch (e) {
  console.error("Parse error:", e.message);
  // Write raw for debugging
  writeFileSync("./scripts/debug-raw.txt", jsonStr.slice(0, 2000));
  console.log("Debug file written");
}
