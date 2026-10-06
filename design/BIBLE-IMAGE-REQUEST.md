# Bible theme — image request (for image agent)

> Brand: **Words at Rest** · Site: https://wordsatrest.com  
> Art direction: follow [`IMAGE-BRIEF.md`](./IMAGE-BRIEF.md) (Warm Editorial Gouache + Soft Risograph).  
> Theme slug: `bible` · Hub: `/themes/bible`  
> **Temporary live cover:** `public/images/themes/bible.webp` currently reuses the adults-hero desk painting. Drop the new files on these exact paths to swap — no code change needed for the cover; after OG base lands, re-run `node scripts/generate-og.mjs`.

Do **not** put readable text, letters, logos, faces, or heavy cross-as-logo iconography in either image. Prefer quiet Scripture-adjacent still life (closed Bible, ribbon, olive, lamp, wheat).

---

## 1) Theme cover — `themes/bible.webp`

| Field | Value |
|---|---|
| **Output path** | `/public/images/themes/bible.webp` |
| **Also deliver** | `/public/images/themes/bible-640.webp` (or we derive with `node scripts/derive-images.mjs`) |
| **Size** | **1200 × 900** (4:3), WebP preferred (PNG master OK) |
| **Transparent bg** | no |
| **Retina** | yes (master sharp enough to downscale) |
| **Priority** | P0 |
| **Alt text (EN)** | `Bible word search — painted illustration of a closed old Bible with a ribbon bookmark, an olive branch and an oil lamp on a wooden table` |

### English prompt

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. Square-safe 4:3 theme cover illustration for 'Bible' word search. Motif: a closed old leather-bound Bible with a soft ribbon bookmark, a small olive branch, a clay oil lamp, and a few stalks of wheat on a wooden table — quiet, respectful, non-denominational still life for adults. No crosses used as a logo mark, no faces, no glowing religious icons. Design as a magazine cover still-life: centered subject cluster, soft vignette toward edges so a white serif title can overlay at bottom (leave bottom 20% slightly darker/simpler). No readable text. WordsAtRest editorial gouache risograph v1.
```

### Negative prompt

```
text, letters, typography, watermark, logo, brand name, UI mockup, photorealistic stock photo, glossy 3D render, plastic CGI, purple neon gradient, floating blobs, sparkles, glitter, lens flare, oversmoothed skin, beautiful young influencer face, children, kids cartoon, Disney, Marvel, anime, chibi, emoji, clipart, Busy Beaver, stock cafe cliché with latte art heart, cyberpunk, hyper-saturated, busy collage, chaotic composition, extra fingers, deformed anatomy, lowres, blurry, jpeg artifacts, crucifix as logo, glowing cross icon, church clipart, halo, stained-glass cartoon, Jesus face, saints portrait, denominational symbols, megachurch stage
```

### Notes for integrator

- Theme cards and `/themes/bible` hero read `themeArt("bible")` → `/images/themes/bible.webp` (+ `-640` srcset).
- After replacing the file, optionally run: `node scripts/derive-images.mjs` (regenerates all `-640` variants including bible).

---

## 2) OG base — `og/og-theme-bible.png` (text-free)

| Field | Value |
|---|---|
| **Output path (art base)** | `/design/og-base/og-theme-bible.png` |
| **Final social card (generated)** | `/public/og/themes/bible.jpg` via `node scripts/generate-og.mjs` (overlays title **Bible Word Search**) |
| **Size** | **1200 × 630** (≈1.91:1), PNG |
| **Transparent bg** | no |
| **Composition** | Motif on **left**; **right ~55–60% blank cream paper** for type |
| **Priority** | P0 |
| **Alt / card purpose** | Social share for Bible theme — Words at Rest |

### English prompt

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. Open Graph 1200x630 for 'Bible' word-search theme. Motif cluster on the LEFT / center-left: closed old Bible with ribbon bookmark, olive branch, clay oil lamp, wheat on wood — calm adult devotion mood, non-denominational, no cross-as-logo, no faces. RIGHT ~55–60% must stay nearly empty warm cream paper with only faint grain, reserved for later title overlay ('Bible Word Search'). No readable words in the image. WordsAtRest editorial gouache risograph v1.
```

### Negative prompt

```
text, letters, typography, watermark, logo, brand name, UI mockup, photorealistic stock photo, glossy 3D render, plastic CGI, purple neon gradient, floating blobs, sparkles, glitter, lens flare, oversmoothed skin, beautiful young influencer face, children, kids cartoon, Disney, Marvel, anime, chibi, emoji, clipart, Busy Beaver, stock cafe cliché with latte art heart, cyberpunk, hyper-saturated, busy collage, chaotic composition, extra fingers, deformed anatomy, lowres, blurry, jpeg artifacts, crucifix as logo, glowing cross icon, church clipart, halo, stained-glass cartoon, Jesus face, saints portrait, denominational symbols, megachurch stage
```

### Notes for integrator

1. Save the text-free base to `design/og-base/og-theme-bible.png` (overwrite the temporary copy of `og-default.png`).
2. Run `node scripts/generate-og.mjs` — it titles the card **"Bible word search"** / theme name automatically from `data/themes/bible.json`.
3. Live metadata already points at `/og/themes/bible.jpg` via `themeOgImage("bible")`.

---

## Style lock (same as IMAGE-BRIEF)

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel
```

## Global negative (extended for faith-safe)

```
text, letters, typography, watermark, logo, brand name, UI mockup, photorealistic stock photo, glossy 3D render, plastic CGI, purple neon gradient, floating blobs, sparkles, glitter, lens flare, oversmoothed skin, beautiful young influencer face, children, kids cartoon, Disney, Marvel, anime, chibi, emoji, clipart, Busy Beaver, stock cafe cliché with latte art heart, cyberpunk, hyper-saturated, busy collage, chaotic composition, extra fingers, deformed anatomy, lowres, blurry, jpeg artifacts, crucifix as logo, glowing cross icon, church clipart, halo, stained-glass cartoon, Jesus face, saints portrait, denominational symbols, megachurch stage
```
