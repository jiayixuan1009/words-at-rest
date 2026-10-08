// Deterministic production sizes from the approved ImageGen master; no artwork redrawing.
import sharp from "sharp";
import { mkdir, copyFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const pub = join(root, "public");
const brand = join(pub, "images/brand");
await mkdir(brand, { recursive: true });
const master = await sharp(join(root, "design/brand-v2/master.png"))
  .trim({ threshold: 10 }).png().toBuffer();
const rgba = { r: 0, g: 0, b: 0, alpha: 0 };
const sized = (size) => sharp(master).resize(size, size, { fit: "contain", background: rgba });
const save = (name, image) => image.toFile(join(brand, name));

await save("logo-mark-v2.png", sized(512).png());
await save("header-mark-v2.webp", sized(96).webp({ quality: 92, alphaQuality: 100 }));
for (const size of [16, 32, 48]) {
  await save(`favicon-v2-${size}.png`, sized(size).png());
}
for (const size of [180, 192, 512]) {
  const padding = Math.round(size * 0.0625);
  const symbol = await sized(size - padding * 2).png().toBuffer();
  const icon = sharp({ create: { width: size, height: size, channels: 4, background: "#f4efe6" } })
    .composite([{ input: symbol, gravity: "centre" }]).png();
  await save(size === 180 ? "apple-touch-icon-v2.png" : `icon-v2-${size}.png`, icon);
}
await save("icon-maskable-v2-512.png",
  sharp({ create: { width: 512, height: 512, channels: 4, background: "#f4efe6" } })
    .composite([{ input: await sized(280).png().toBuffer(), gravity: "centre" }]).png());

// Multi-resolution ICO with PNG entries supported by modern browsers and Windows.
const sizes = [16, 32, 48];
const buffers = await Promise.all(sizes.map(size => sized(size).png().toBuffer()));
const icoHeader = Buffer.alloc(6 + sizes.length * 16);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(sizes.length, 4);
let offset = icoHeader.length;
sizes.forEach((size, index) => {
  const pos = 6 + index * 16;
  icoHeader[pos] = size;
  icoHeader[pos + 1] = size;
  icoHeader.writeUInt16LE(1, pos + 4);
  icoHeader.writeUInt16LE(32, pos + 6);
  icoHeader.writeUInt32LE(buffers[index].length, pos + 8);
  icoHeader.writeUInt32LE(offset, pos + 12);
  offset += buffers[index].length;
});
await writeFile(join(brand, "favicon-v2.ico"), Buffer.concat([icoHeader, ...buffers]));

// Keep historic public entry points consistent with the new identity.
for (const [from, to] of [
  ["logo-mark-v2.png", "logo-mark.png"],
  ["favicon-v2-16.png", "favicon-16.png"],
  ["favicon-v2-32.png", "favicon-32.png"],
  ["apple-touch-icon-v2.png", "apple-touch-icon-180.png"],
  ["icon-v2-192.png", "icon-192.png"],
  ["icon-v2-512.png", "icon-512.png"],
  ["icon-maskable-v2-512.png", "icon-maskable-512.png"],
]) await copyFile(join(brand, from), join(brand, to));
await save("header-mark-32.png", sized(64).png());
await copyFile(join(brand, "favicon-v2.ico"), join(pub, "favicon.ico"));
await copyFile(join(brand, "apple-touch-icon-v2.png"), join(pub, "apple-touch-icon.png"));
await copyFile(join(brand, "logo-mark-v2.png"), join(pub, "logo.png"));

const wordmark = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="740" height="144"><text x="0" y="102" font-family="Georgia,serif" font-size="92" font-weight="600" fill="#2c241b">Words <tspan font-style="italic" font-weight="400">at</tspan> Rest</text></svg>');
await save("logo-wordmark.png", sharp(wordmark).png());
const lockup = sharp({ create: { width: 960, height: 288, channels: 4, background: rgba } })
  .composite([
    { input: await sized(160).png().toBuffer(), left: 20, top: 64 },
    { input: await sharp(wordmark).png().toBuffer(), left: 220, top: 72 },
  ]);
const lockupPng = await lockup.png().toBuffer();
await writeFile(join(brand, "logo-lockup.png"), lockupPng);
await save("logo-lockup-480.webp", sharp(lockupPng).resize(480, 144).webp({ quality: 92 }));
console.log("Brand mark, header, lockups, favicons and PWA assets exported.");
