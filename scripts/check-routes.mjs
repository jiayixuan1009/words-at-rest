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
for (const path of ["/themes/halloween", "/themes/halloween/halloween-easy-01", "/daily/2026-10-06", "/calendar", "/printables", "/printables/large-print", "/printables/halloween", "/printables/thanksgiving", "/printables/christmas"]) {
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
for (const pack of ["large-print", "halloween", "thanksgiving", "christmas"]) {
  assert.ok(xml.includes(`/printables/${pack}`), "Printable landing missing from sitemap");
  for (const format of ["a4", "letter"]) {
    const path = `/printables/${pack}-${format}.pdf`;
    const res = await fetch(base + path);
    assert.equal(res.status, 200, path);
    assert.match(res.headers.get("content-type") || "", /application\/pdf/, path);
    assert.equal(res.headers.get("link"), `<https://wordsatrest.com/printables/${pack}>; rel="canonical"`, path);
    const bytes = new Uint8Array(await res.arrayBuffer());
    assert.equal(new TextDecoder().decode(bytes.slice(0, 5)), "%PDF-", path);
  }
}
const unknownPack = await fetch(base + "/printables/not-a-pack");
assert.equal(unknownPack.status, 404, "Unknown printable must be a real 404");
console.log("Route checks OK — SSR metadata, 404/noindex, robots and published-date sitemap (today=" + today + ").");
