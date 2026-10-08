// Run after replacing source artwork. Content fingerprints allow immutable caching.
import sharp from "sharp";
import { createHash } from "node:crypto";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join, basename } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const images = join(root, "public/images");
const output = join(root, "public/art-assets");
await mkdir(output, { recursive: true });
const jobs = (await readdir(join(images, "themes"))).sort()
  .filter(f => /^[a-z_-]+\.webp$/.test(f) && !f.startsWith("_") && !/-(easy|medium|hard)\.webp$/.test(f))
  .map(f => [`themes/${f}`, [320, 640, 960, 1200]]);
for (const level of ["easy", "medium", "hard"]) jobs.push([`difficulty/badge-${level}.png`, [44, 88, 128]]);
jobs.push(["home/hero-desktop.webp", [640, 960, 1200, 1600]],
  ["home/section-difficulty.webp", [320, 480, 800]],
  ["home/section-themes-ornament.webp", [120, 240]],
  ["ads/neutral-spacer.webp", [364, 728]]);
const manifest = {};
for (const [rel, widths] of jobs) {
  const source = join(images, rel);
  const meta = await sharp(source).metadata();
  const renditions = [];
  for (const width of widths.filter(w => w <= meta.width)) {
    const { data, info } = await sharp(source).resize({ width, withoutEnlargement: true })
      .webp({ quality: 76, alphaQuality: 90, effort: 5 }).toBuffer({ resolveWithObject: true });
    const hash = createHash("sha256").update(data).digest("hex").slice(0, 16);
    const name = `${basename(rel).replace(/\.(png|webp)$/, "")}-${info.width}-${hash}.webp`;
    await writeFile(join(output, name), data);
    renditions.push([`/art-assets/${name}`, info.width, info.height, data.length]);
  }
  if (!renditions.length) throw new Error(`No rendition for ${rel}`);
  const largest = renditions.at(-1);
  manifest[`/images/${rel}`] = { src: largest[0], width: largest[1], height: largest[2],
    variants: renditions.slice(0, -1).map(([path, width]) => [path, width]) };
}
await writeFile(join(root, "lib/image-renditions.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`Optimized ${jobs.length} source images; manifest written.`);
