# Holiday Wave 1 — image request (for image agent)

> Brand: **Words at Rest** · Site: https://wordsatrest.com  
> Art direction: follow [`IMAGE-BRIEF.md`](./IMAGE-BRIEF.md) (Warm Editorial Gouache + Soft Risograph).  
> Themes: `thanksgiving` · `winter` · `valentines` · `easter` · optional hub `/holidays`  
> Planning context: [`THEME-EXPANSION-PLAN.md`](./THEME-EXPANSION-PLAN.md)  
> **Temporary live covers:** each `public/images/themes/<slug>.webp` currently reuses nearby art (fall / christmas / food / garden). Drop new files on the exact paths below to swap — no code change needed for covers; after OG bases land, re-run `node scripts/generate-og.mjs`.

Do **not** put readable text, letters, logos, faces, or trademarked characters in any image. Quiet adult still lifes only.

---

## Shared style lock

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel
```

## Shared negative prompt

```
text, letters, typography, watermark, logo, brand name, UI mockup, photorealistic stock photo, glossy 3D render, plastic CGI, purple neon gradient, floating blobs, sparkles, glitter, lens flare, oversmoothed skin, beautiful young influencer face, children, kids cartoon, Disney, Marvel, anime, chibi, emoji, clipart, Busy Beaver, stock cafe cliché with latte art heart, cyberpunk, hyper-saturated, busy collage, chaotic composition, extra fingers, deformed anatomy, lowres, blurry, jpeg artifacts, cartoon turkey mascot, Santa face, cupid, bunny mascot, chocolate-box hearts explosion, neon valentine stickers
```

---

## 1) Thanksgiving — cover + OG

### Cover `themes/thanksgiving.webp`

| Field | Value |
|---|---|
| **Output path** | `/public/images/themes/thanksgiving.webp` |
| **Also deliver** | `/public/images/themes/thanksgiving-640.webp` (or derive with `node scripts/derive-images.mjs`) |
| **Size** | **1200 × 900** (4:3), WebP preferred |
| **Priority** | P0 |
| **Alt text (EN)** | `Thanksgiving word search — painted illustration of a harvest table with a pumpkin, corn, acorns and a linen napkin` |

**English prompt**

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. Square-safe 4:3 theme cover for 'Thanksgiving' word search. Motif: a quiet harvest table still life — small pumpkin, ears of corn, acorns, a folded linen napkin, a wooden spoon and a ceramic gravy boat on warm wood. Adult editorial mood, no cartoon turkey mascot, no faces. Leave bottom 20% slightly simpler for a white serif title overlay. No readable text. WordsAtRest editorial gouache risograph v1.
```

### OG base `og/og-theme-thanksgiving.png`

| Field | Value |
|---|---|
| **Output path (art base)** | `/design/og-base/og-theme-thanksgiving.png` |
| **Final social card** | `/public/og/themes/thanksgiving.jpg` via `node scripts/generate-og.mjs` |
| **Size** | **1200 × 630**, PNG |
| **Composition** | Motif on **left**; **right ~55–60% blank cream paper** |

**English prompt**

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. Open Graph 1200x630 for 'Thanksgiving' word-search theme. Motif cluster on the LEFT: harvest table still life — pumpkin, corn, acorns, linen napkin, gravy boat. RIGHT ~55–60% nearly empty warm cream paper with faint grain for title overlay. No cartoon turkey, no faces, no readable words. WordsAtRest editorial gouache risograph v1.
```

---

## 2) Winter — cover + OG

### Cover `themes/winter.webp`

| Field | Value |
|---|---|
| **Output path** | `/public/images/themes/winter.webp` (+ `-640.webp`) |
| **Size** | **1200 × 900** |
| **Priority** | P0 |
| **Alt text (EN)** | `Winter word search — painted illustration of cocoa, wool mittens and pine beside a frosted window` |

**English prompt**

```
…Style lock… Square-safe 4:3 theme cover for 'Winter' word search. Motif: a mug of cocoa, a pair of wool mittens, a pine sprig and soft frost on a window ledge — quiet midwinter still life for adults. No Santa, no snowman face, no Christmas trademark characters. Leave bottom 20% simpler for title overlay. No readable text. WordsAtRest editorial gouache risograph v1.
```

### OG base `og/og-theme-winter.png`

| **Output** | `/design/og-base/og-theme-winter.png` → `/public/og/themes/winter.jpg` |
| **Size** | 1200×630 · art **left**, blank paper **right ~55–60%** |

**English prompt**

```
…Style lock… Open Graph 1200x630 for 'Winter'. Motif LEFT: cocoa mug, mittens, pine, frosted window ledge. RIGHT ~55–60% empty cream paper. No Santa, no faces, no text. WordsAtRest editorial gouache risograph v1.
```

---

## 3) Valentine's Day — cover + OG

### Cover `themes/valentines.webp`

| Field | Value |
|---|---|
| **Output path** | `/public/images/themes/valentines.webp` (+ `-640.webp`) |
| **Size** | **1200 × 900** |
| **Priority** | P0 |
| **Alt text (EN)** | `Valentine's Day word search — painted illustration of a sealed letter, dried rose and ribbon on cream paper` |

**English prompt**

```
…Style lock… Square-safe 4:3 theme cover for 'Valentine's Day' word search. Motif: a sealed cream envelope with a soft wax seal, one dried rose, a narrow ribbon and a fountain pen on paper — calm adult romance, not a kids' valentine. No cupid, no cartoon hearts explosion, no faces. Leave bottom 20% simpler for title overlay. No readable text. WordsAtRest editorial gouache risograph v1.
```

### OG base `og/og-theme-valentines.png`

```
…Style lock… Open Graph 1200x630 for 'Valentine's Day'. Motif LEFT: sealed letter, dried rose, ribbon, pen. RIGHT ~55–60% empty cream paper. No cupid, no glitter hearts, no faces, no text. WordsAtRest editorial gouache risograph v1.
```

---

## 4) Easter — cover + OG

### Cover `themes/easter.webp`

| Field | Value |
|---|---|
| **Output path** | `/public/images/themes/easter.webp` (+ `-640.webp`) |
| **Size** | **1200 × 900** |
| **Priority** | P0 |
| **Alt text (EN)** | `Easter word search — painted illustration of a woven basket, pale eggs, daffodils and willow on a wooden table` |

**English prompt**

```
…Style lock… Square-safe 4:3 theme cover for 'Easter' word search. Motif: a woven basket, a few pale undecorated eggs, daffodils and willow twigs on a wooden table — quiet spring still life, non-denominational, adult mood. No bunny mascot face, no cartoon chicks with hats, no heavy cross-as-logo. Leave bottom 20% simpler for title overlay. No readable text. WordsAtRest editorial gouache risograph v1.
```

### OG base `og/og-theme-easter.png`

```
…Style lock… Open Graph 1200x630 for 'Easter'. Motif LEFT: basket, pale eggs, daffodils, willow. RIGHT ~55–60% empty cream paper. No bunny mascot, no faces, no cross-as-logo, no text. WordsAtRest editorial gouache risograph v1.
```

---

## 5) Optional — Holidays hub OG

| Field | Value |
|---|---|
| **Output path (art base)** | `/design/og-base/og-holidays.png` |
| **Final card** | `/public/og/holidays.jpg` via `node scripts/generate-og.mjs` (title **Holiday word search**) |
| **Size** | **1200 × 630** |
| **Composition** | Small cluster of seasonal still-life cues on **left** (tiny pumpkin + pine + rose + egg — abstract, not a collage mess); **right ~55–60% blank cream** |

**English prompt**

```
…Style lock… Open Graph 1200x630 for the Holidays hub. Motif LEFT: a compact adult still-life cluster suggesting four seasons of holiday calm — a mini pumpkin, a pine sprig, a dried rose bud and a pale egg on wood — not a loud collage. RIGHT ~55–60% empty cream paper for title. No mascots, no faces, no logos, no text. WordsAtRest editorial gouache risograph v1.
```

---

## Integrator notes

1. Replace files at the paths above (overwrite temporary stand-ins).  
2. Run `node scripts/derive-images.mjs` if you only deliver 1200×900 masters (regenerates `-640`).  
3. Run `node scripts/generate-og.mjs` after OG bases land.  
4. Motifs / alts are already registered in `lib/images.ts` (`THEME_MOTIF`); no code change required for a pure file swap.  
5. Do not edit application source or deploy from the image agent.

— End of holiday Wave 1 image request.
