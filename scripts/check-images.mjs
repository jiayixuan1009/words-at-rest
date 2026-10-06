#!/usr/bin/env node
// Every theme listed in lib/images.ts DIFFICULTY_ART_THEMES must ship all three levels
// (1200×900 master + 640w + 320w); no stray <slug>-<level> files for unlisted themes.
// Usage: node scripts/check-images.mjs
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const dir = join(root, "public/images/themes");
const src = readFileSync(join(root, "lib/images.ts"), "utf8");
const block = src.match(/DIFFICULTY_ART_THEMES[^=]*=\s*new Set\(\[([\s\S]*?)\]\)/);
if (!block) { console.log("✗ DIFFICULTY_ART_THEMES not found"); process.exit(1); }
const slugs = [...block[1].matchAll(/"([a-z-]+)"/g)].map((m) => m[1]);
let bad = 0;
for (const s of slugs)
  for (const l of ["easy", "medium", "hard"])
    for (const suf of ["", "-640", "-320"]) {
      const f = `${s}-${l}${suf}.webp`;
      if (!existsSync(join(dir, f))) { bad++; console.log(`✗ missing ${f}`); }
    }
for (const f of readdirSync(dir)) {
  const m = f.match(/^(.+)-(easy|medium|hard)(-\d+)?\.webp$/);
  if (m && !slugs.includes(m[1])) { bad++; console.log(`✗ unused ${f} (theme not in DIFFICULTY_ART_THEMES)`); }
}
console.log(bad ? `${bad} problem(s)` : `✓ difficulty art: ${slugs.length} themes × 3 levels × 3 sizes`);
process.exit(bad ? 1 : 0);
