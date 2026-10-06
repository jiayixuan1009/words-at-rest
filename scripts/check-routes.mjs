// HTTP checks for the actual SSR routes (run against dev or production preview).
import assert from "node:assert/strict";
const base = (process.argv[2] || "http://127.0.0.1:4173").replace(/\/$/, "");
const today = process.env.DAILY_TODAY || new Date().toISOString().slice(0, 10);
const future = new Date(new Date(today + "T00:00:00Z").getTime() + 86400000).toISOString().slice(0, 10);
for (const path of ["/daily/" + future, "/daily/calendar", "/daily/2026-10-05", "/daily/2026-02-30"]) {
  const res = await fetch(base + path);
  assert.equal(res.status, 404, path);
  const html = await res.text();
  assert.match(html, /name="robots"[^>]*content="[^"]*noindex/, path);
}
for (const path of ["/themes/halloween", "/themes/halloween/halloween-easy-01", "/daily/2026-10-06", "/calendar"]) {
  const res = await fetch(base + path);
  assert.equal(res.status, 200, path);
  const html = await res.text();
  const head = html.split("</head>")[0];
  assert.match(head, /<title>.+<\/title>/, path);
  assert.match(head, /rel="canonical"/, path);
}
const robots = await fetch(base + "/robots.txt");
assert.equal(robots.status, 200);
assert.match(await robots.text(), /Sitemap:\s*https:\/\/wordsatrest.com\/sitemap.xml/);
const sitemap = await fetch(base + "/sitemap.xml");
assert.equal(sitemap.status, 200);
const xml = await sitemap.text();
assert.match(xml, /https:\/\/wordsatrest.com\/daily\/2026-10-06/);
assert.ok(!xml.includes("/daily/" + future), "future dates must not be indexed");
console.log("Route checks OK — SSR metadata, 404/noindex, robots and published-date sitemap (today=" + today + ").");
