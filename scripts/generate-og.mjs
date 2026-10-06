// Generates the 1200×630 Open Graph cards in /public/og from the hand-painted, TEXT-FREE
// base images in design/og-base/ (art sits on the left; the right ~60% is blank paper
// reserved for type). Title / eyebrow / subtitle are overlaid as SVG text here.
// Run: node scripts/generate-og.mjs   (sharp from node_modules)
import sharp from "sharp";
import { mkdirSync, readFileSync, readdirSync, statSync, copyFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const pub = join(root, "public");
const base = (f) => join(root, "design/og-base", f);
mkdirSync(join(pub, "og", "themes"), { recursive: true });

const W = 1200, H = 630;

// Text column starts just right of the painted vignette: find the vignette's right edge by
// scanning columns for pixels that differ from the blank paper.
async function artEdge(file) {
  const { data, info } = await sharp(file).greyscale().raw().toBuffer({ resolveWithObject: true });
  const bg = data[(info.height - 20) * info.width + info.width - 20];
  let edge = 0;
  for (let x = 0; x < 900; x++) {
    let n = 0;
    for (let y = 0; y < info.height; y += 2) if (Math.abs(data[y * info.width + x] - bg) > 35) n++;
    if (n / (info.height / 2) > 0.02) edge = x;
  }
  return edge;
}
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function wrap(text, max) {
  const words = text.split(" "); const lines = []; let cur = "";
  for (const w of words) { if ((cur + " " + w).trim().length > max) { lines.push(cur.trim()); cur = w; } else cur += " " + w; }
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}

async function card(out, { eyebrow = "WORDS AT REST", title, subtitle, bg }) {
  const X = Math.max(470, (await artEdge(base(bg))) + 44);
  const maxW = W - 56 - X;
  let fs = 68;
  let tl = wrap(title, Math.floor(maxW / (fs * 0.52)));
  if (tl.length > 2) { fs = 56; tl = wrap(title, Math.floor(maxW / (fs * 0.52))); }
  const lh = fs + 6;
  const sl = wrap(subtitle, Math.floor(maxW / 14));
  const blockH = 40 + tl.length * lh + 24 + sl.length * 36;
  let y = Math.max(120, Math.round((H - blockH) / 2) + 10);
  const eyebrowY = y;
  y += 40 + fs - 8;
  const titleSvg = tl.map((l, i) => `<text x="${X}" y="${y + i * lh}" font-family="Fraunces" font-size="${fs}" font-weight="600" letter-spacing="-1" fill="#2c241b">${esc(l)}</text>`).join("");
  y += (tl.length - 1) * lh + 52;
  const subSvg = sl.map((l, i) => `<text x="${X}" y="${y + i * 36}" font-family="Source Serif 4, Source Serif Pro, serif" font-size="27" fill="#5c5348">${esc(l)}</text>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <text x="${X}" y="${eyebrowY}" font-family="Inter" font-size="18" letter-spacing="5" font-weight="600" fill="#3d5a45">${esc(eyebrow)}</text>
    <rect x="${X}" y="${eyebrowY + 14}" width="64" height="3" rx="1.5" fill="#e8c99b"/>
    ${titleSvg}${subSvg}
    <text x="${X}" y="${H - 48}" font-family="Inter" font-size="19" fill="#5c5348"><tspan font-weight="600" fill="#2c241b">Words at Rest</tspan>  ·  wordsatrest.com  ·  free  ·  no timer</text>
  </svg>`;
  await sharp(base(bg)).resize(W, H).composite([{ input: Buffer.from(svg), left: 0, top: 0 }]).jpeg({ quality: 80, mozjpeg: true, chromaSubsampling: "4:2:0" }).toFile(out);
  console.log("wrote", out.replace(root, ""), Math.round(statSync(out).size / 1024) + "KB");
}

const themes = readdirSync(join(root, "data/themes")).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(readFileSync(join(root, "data/themes", f), "utf8")));

await card(join(pub, "og/default.jpg"), { title: "Word search, at your own pace", subtitle: "Calm, free puzzles for adults and seniors — large print, daily and seasonal.", bg: "og-default.png" });
await card(join(pub, "og/daily.jpg"), { eyebrow: "DAILY PUZZLE", title: "Today's daily word search", subtitle: "A fresh, free grid every day. No timer, no sign-up.", bg: "og-daily.png" });
await card(join(pub, "og/large-print.jpg"), { eyebrow: "LARGE PRINT", title: "Large print word search", subtitle: "Big letters, 9×9 grids, strong contrast. Easy on the eyes.", bg: "og-large-print.png" });
await card(join(pub, "og/how-to-play.jpg"), { eyebrow: "HOW TO PLAY", title: "How to play word search", subtitle: "Drag or tap to select. Five simple steps and a few tips.", bg: "og-default.png" });
await card(join(pub, "og/adults.jpg"), { eyebrow: "FOR ADULTS", title: "Word search for adults", subtitle: "Thoughtful word lists, real challenge, no pop-up carnival.", bg: "og-theme-large-print-pack.png" });
for (const [lvl, sub, bg] of [["easy", "10×10 grids, words across and down only.", "og-default.png"], ["medium", "12×12 grids with diagonal words added.", "og-daily.png"], ["hard", "15×15 grids, all eight directions.", "og-theme-hard-pack.png"]]) {
  await card(join(pub, `og/difficulty-${lvl}.jpg`), { eyebrow: "DIFFICULTY", title: `${lvl[0].toUpperCase() + lvl.slice(1)} word search puzzles`, subtitle: sub, bg });
}
for (const t of themes) {
  await card(join(pub, `og/themes/${t.slug}.jpg`), { eyebrow: "THEME", title: `${t.name} word search`, subtitle: "Original word list, free to play online. Easy to hard, no timer.", bg: `og-theme-${t.slug}.png` });
}

// Brand rasters (Organization.logo must be raster, ≥112px square) from the new art set.
copyFileSync(join(pub, "images/brand/logo-mark.png"), join(pub, "logo.png"));
copyFileSync(join(pub, "images/brand/apple-touch-icon-180.png"), join(pub, "apple-touch-icon.png"));
console.log("copied /public/logo.png, /public/apple-touch-icon.png from images/brand");
