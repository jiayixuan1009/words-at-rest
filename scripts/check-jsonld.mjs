#!/usr/bin/env node
// Validate JSON-LD on key pages: parses, coherent @graph (every {"@id"} reference
// resolves to a node on the same page), page nodes carry author + dates, no future dates.
// Usage: node scripts/check-jsonld.mjs [baseUrl]   (default http://localhost:4173)
const base = (process.argv[2] || "http://localhost:4173").replace(/\/$/, "");
const PAGES = [
  "/", "/daily", "/daily/2026-10-06", "/calendar", "/calendar/2026-10", "/themes", "/themes/bible", "/themes/bible/bible-easy-01",
  "/themes/halloween/halloween-hard-01", "/how-to-play", "/large-print", "/adults", "/about",
  "/contact", "/difficulty/easy", "/difficulty/hard",
];
const PAGE_TYPES = new Set(["WebPage", "CollectionPage", "AboutPage", "ContactPage", "ItemPage"]);
const now = Date.now() + 36 * 3600 * 1000; // tolerate time-zone skew
let failures = 0;
const fail = (path, msg) => { failures++; console.log(`  ✗ ${path}: ${msg}`); };

function walk(v, fn) {
  if (Array.isArray(v)) v.forEach((x) => walk(x, fn));
  else if (v && typeof v === "object") { fn(v); Object.values(v).forEach((x) => walk(x, fn)); }
}

for (const path of PAGES) {
  const res = await fetch(base + path);
  if (!res.ok) { fail(path, `HTTP ${res.status}`); continue; }
  const html = await res.text();
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const nodes = [];
  for (const b of blocks) {
    let d;
    try { d = JSON.parse(b); } catch (e) { fail(path, `invalid JSON: ${e.message}`); continue; }
    if (d["@context"] !== "https://schema.org") fail(path, "missing @context");
    nodes.push(...(d["@graph"] ?? [d]));
  }
  const ids = new Map();
  walk(nodes, (o) => { if (o["@id"] && Object.keys(o).length > 1) ids.set(o["@id"], o); });
  walk(nodes, (o) => {
    if (o["@id"] && Object.keys(o).length === 1 && !ids.has(o["@id"])) fail(path, `dangling reference ${o["@id"]}`);
    for (const k of ["datePublished", "dateModified", "dateCreated"]) {
      if (o[k] && (Number.isNaN(Date.parse(o[k])) || Date.parse(o[k]) > now)) fail(path, `bad ${k} ${o[k]}`);
    }
  });
  const page = nodes.find((n) => PAGE_TYPES.has(n["@type"]));
  if (!page) fail(path, "no WebPage-type node");
  else {
    if (!page.author?.["@id"]) fail(path, "page node has no author @id");
    if (!page.datePublished || !page.dateModified) fail(path, "page node missing datePublished/dateModified");
    if (page.inLanguage !== "en-US") fail(path, `inLanguage ${page.inLanguage}`);
  }
  for (const t of ["Organization", "Person", "WebSite"]) if (!nodes.some((n) => n["@type"] === t)) fail(path, `no ${t} node`);
  const lang = html.match(/<html[^>]*lang="([^"]+)"/)?.[1];
  if (lang !== "en-US") fail(path, `html lang=${lang}`);
  console.log(`  ✓ ${path}: ${blocks.length} blocks, ${nodes.length} nodes${page ? `, ${page["@type"]} ${page.datePublished} → ${page.dateModified}` : ""}${page?.citation ? `, ${page.citation.length} citations` : ""}`);
}
if (failures) { console.log(`\n${failures} problem(s)`); process.exit(1); }
console.log("\nJSON-LD OK");
