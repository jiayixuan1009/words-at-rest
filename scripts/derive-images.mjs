// Derives smaller responsive variants (…-640.webp / …-800.webp) from the hand-made art set
// in /public/images (see design/asset-manifest.csv). Run: node scripts/derive-images.mjs
import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const pub = join(root, "public/images");
const jobs = [];
const add = (rel, widths) => jobs.push({ rel, widths });

for (const f of readdirSync(join(pub, "themes"))) if (/^[a-z_-]+\.webp$/.test(f) && !f.startsWith("_")) add(`themes/${f}`, [640]);
for (const l of ["easy", "medium", "hard"]) add(`difficulty/${l}.webp`, [640]);
add("home/hero-desktop.webp", [1200]);
add("home/hero-mobile.webp", [800]);
add("home/aside-large-print.webp", [640]);
add("home/section-difficulty.webp", [480]);
add("adults/hero.webp", [800]);
add("large-print/promo-hero.webp", [800]);
add("cta/newsletter.webp", [640]);
add("themes/_index-banner.webp", [960]);
add("daily/header.webp", [960]);
add("how-to/banner.webp", [960]);
add("system/404.webp", [800]);
for (const s of ["01-pick", "02-wordlist", "03-select", "04-finish"]) add(`how-to/step-${s}.webp`, [480]);

for (const { rel, widths } of jobs) {
  for (const w of widths) {
    const out = join(pub, rel.replace(/\.webp$/, `-${w}.webp`));
    await sharp(join(pub, rel)).resize({ width: w }).webp({ quality: 74, effort: 6 }).toFile(out);
    console.log(out.replace(root, ""), Math.round(statSync(out).size / 1024) + "KB");
  }
}
// Header/footer lockup (the 1600×480 PNG is ~200KB; a 480px WebP is plenty on screen).
for (const w of [480]) {
  const out = join(pub, `brand/logo-lockup-${w}.webp`);
  await sharp(join(pub, "brand/logo-lockup.png")).resize({ width: w }).webp({ quality: 82, alphaQuality: 90 }).toFile(out);
  console.log(out.replace(root, ""), Math.round(statSync(out).size / 1024) + "KB");
}
