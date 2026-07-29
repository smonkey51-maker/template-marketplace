import { readFileSync } from "fs";
const raw = readFileSync(
  "C:/Users/nicol/.claude/projects/C--Users-nicol/a6e55778-4c24-4597-b862-6fa86f98a2c2/tool-results/toolu_01D4A2gGUPQUh1K6Dc7WXZzZ.txt",
  "utf8",
);

// Extract IDs by simple string search
const ids = new Set();
let i = 0;
while ((i = raw.indexOf("notion-", i)) !== -1) {
  let end = i + 7;
  while (end < raw.length && /[a-z0-9-]/.test(raw[end])) end++;
  const id = raw.slice(i, end);
  if (id.length > 10) ids.add(id);
  i = end;
}

// Extract bundle IDs
const bundleIds = new Set();
let j = 0;
while ((j = raw.indexOf("bundle-notion", j)) !== -1) {
  let end = j + 13;
  while (end < raw.length && /[a-z0-9-]/.test(raw[end])) end++;
  bundleIds.add(raw.slice(j, end));
  j = end;
}

// Extract prices near "price": patterns
const priceMatches = [...raw.matchAll(/"price":\\*"?(\d{3,4})/g)].map((m) => parseInt(m[1]));

console.log("Template IDs found:", [...ids]);
console.log("Bundle IDs:", [...bundleIds]);
console.log("Prices found:", priceMatches.slice(0, 15));

// Also print lines around "regularPrice"
const rIdx = raw.indexOf("regularPrice");
console.log("\nContext around regularPrice:", raw.slice(rIdx - 10, rIdx + 80));
