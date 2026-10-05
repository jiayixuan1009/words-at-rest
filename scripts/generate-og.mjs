// Generates static 1200×630 Open Graph cards + logo PNGs into /public.
// Run: node scripts/generate-og.mjs   (uses sharp from node_modules; no AI imagery)
// Temporary until the hand-made art pipeline (design/IMAGE-BRIEF.md) delivers final covers.
import sharp from "sharp";
import { mkdirSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const pub = join(root, "public");
const img = (f) => join(pub, "images", f);
mkdirSync(join(pub, "og", "themes"), { recursive: true });

const W = 1200, H = 630, PHOTO_X = 640;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Small deterministic letter strip with one word "found" — a quiet word-search motif.
function letterStrip(word, seed) {
  const cols = 11, rows = 2, size = 40;
  const abc = "AEILNORSTUDHMCPBGWY";
  let h = seed >>> 0;
  const rnd = () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) + 1013904223) >>> 0) / 4294967296;
  const w = word.toUpperCase().replace(/[^A-Z]/g, "").slice(0, cols);
  const start = Math.floor((cols - w.length) / 2);
  let out = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isWord = r === 0 && c >= start && c < start + w.length;
      const ch = isWord ? w[c - start] : abc[Math.floor(rnd() * abc.length)];
      const x = 64 + c * size, y = 470 + r * size;
      out += `<text x="${x + size / 2}" y="${y + 28}" text-anchor="middle" font-family="Inter" font-size="22" font-weight="600" fill="${isWord ? "#2c241b" : "#a39886"}">${ch}</text>`;
    }
  }
  const hx = 64 + start * size + 3, hw = w.length * size - 6;
  return `<rect x="${hx}" y="474" width="${hw}" height="32" rx="16" fill="#e8c99b" opacity="0.85"/>` + out;
}

function wrap(text, max) {
  const words = text.split(" "); const lines = []; let cur = "";
  for (const w of words) { if ((cur + " " + w).trim().length > max) { lines.push(cur.trim()); cur = w; } else cur += " " + w; }
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}

async function card(out, { eyebrow = "WORDS AT REST", title, subtitle, photo, word, seed = 7 }) {
  const tl = wrap(title, 16);
  const fs = tl.length > 2 ? 56 : 66;
  const titleSvg = tl.map((l, i) => `<text x="64" y="${170 + i * (fs + 8)}" font-family="Fraunces" font-size="${fs}" font-weight="600" fill="#2c241b">${esc(l)}</text>`).join("");
  const subY = 170 + tl.length * (fs + 8) + 16;
  const sl = wrap(subtitle, 34);
  const subSvg = sl.map((l, i) => `<text x="64" y="${subY + i * 34}" font-family="Source Serif Pro" font-size="26" fill="#5c5348">${esc(l)}</text>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="#f4efe6"/>
    <rect x="0" y="0" width="${W}" height="8" fill="#3d5a45"/>
    <text x="64" y="92" font-family="Inter" font-size="18" letter-spacing="5" font-weight="600" fill="#3d5a45">${esc(eyebrow)}</text>
    ${titleSvg}${subSvg}
    ${letterStrip(word || title.split(" ")[0], seed)}
    <text x="64" y="${H - 40}" font-family="Inter" font-size="18" fill="#5c5348">wordsatrest.com · free · large print · no timer</text>
  </svg>`;
  const photoBuf = await sharp(photo).resize(W - PHOTO_X, H, { fit: "cover", position: "attention" }).modulate({ saturation: 0.85 }).toBuffer();
  await sharp(Buffer.from(svg)).composite([{ input: photoBuf, left: PHOTO_X, top: 0 }]).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  console.log("wrote", out.replace(root, ""));
}

const themes = readdirSync(join(root, "data/themes")).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(readFileSync(join(root, "data/themes", f), "utf8")));
// Must mirror lib/images.ts themeImage()
const themePhoto = {
  halloween: "theme-autumn.jpg", fall: "theme-autumn.jpg", christmas: "theme-cozy.jpg", animals: "theme-garden.jpg",
  space: "theme-letters.jpg", sports: "theme-coffee.jpg", food: "theme-coffee.jpg", ocean: "theme-ocean.jpg",
  dogs: "theme-cozy.jpg", cats: "theme-cozy.jpg", travel: "theme-ocean.jpg", music: "theme-letters.jpg",
  garden: "theme-garden.jpg", "large-print-pack": "theme-letters.jpg", "hard-pack": "theme-letters.jpg",
};

await card(join(pub, "og/default.jpg"), { title: "Word search, at your own pace", subtitle: "Calm, free puzzles for adults and seniors — large print, daily and seasonal.", photo: img("hero-cafe.jpg"), word: "RESTFUL", seed: 1 });
await card(join(pub, "og/daily.jpg"), { eyebrow: "DAILY PUZZLE", title: "Today's daily word search", subtitle: "A fresh, free grid every day. No timer, no sign-up.", photo: img("hero-cafe.jpg"), word: "MORNING", seed: 2 });
await card(join(pub, "og/large-print.jpg"), { eyebrow: "LARGE PRINT", title: "Large print word search", subtitle: "Big letters, 9×9 grids, strong contrast. Easy on the eyes.", photo: img("theme-letters.jpg"), word: "CLEAR", seed: 3 });
await card(join(pub, "og/how-to-play.jpg"), { eyebrow: "HOW TO PLAY", title: "How to play word search", subtitle: "Drag or tap to select. Five simple steps and a few tips.", photo: img("how-to-paper.jpg"), word: "FIND", seed: 4 });
await card(join(pub, "og/adults.jpg"), { eyebrow: "FOR ADULTS", title: "Word search for adults", subtitle: "Thoughtful word lists, real challenge, no pop-up carnival.", photo: img("empty-desk.jpg"), word: "FOCUS", seed: 5 });
for (const [lvl, sub, word] of [["easy", "10×10 grids, words across and down only.", "GENTLE"], ["medium", "12×12 grids with diagonal words added.", "STEADY"], ["hard", "15×15 grids, all eight directions.", "CHALLENGE"]]) {
  await card(join(pub, `og/difficulty-${lvl}.jpg`), { eyebrow: "DIFFICULTY", title: `${lvl[0].toUpperCase() + lvl.slice(1)} word search puzzles`, subtitle: sub, photo: img("theme-letters.jpg"), word, seed: lvl.length * 11 });
}
let i = 0;
for (const t of themes) {
  const longest = [...t.words].sort((a, b) => b.length - a.length).find((w) => w.length <= 10) || t.words[0];
  await card(join(pub, `og/themes/${t.slug}.jpg`), { eyebrow: "THEME", title: `${t.name} word search`, subtitle: "Original word list, free to play online. Easy to hard, no timer.", photo: img(themePhoto[t.slug] || "theme-letters.jpg"), word: longest, seed: 100 + i++ });
}

// Logo PNGs (Organization.logo should be raster, ≥112px square).
const logoSvg = readFileSync(join(root, "app/icon.svg"), "utf8").replace('font-family="Georgia, serif"', 'font-family="Libre Baskerville"');
await sharp(Buffer.from(logoSvg), { density: 600 }).resize(512, 512).png().toFile(join(pub, "logo.png"));
await sharp(Buffer.from(logoSvg), { density: 300 }).resize(180, 180).png().toFile(join(pub, "apple-touch-icon.png"));
console.log("wrote /public/logo.png, /public/apple-touch-icon.png");
