# Sub-theme Wave 1 — image request (for image agent)

> Brand: **Words at Rest** · https://wordsatrest.com  
> Art direction: [`IMAGE-BRIEF.md`](./IMAGE-BRIEF.md) (Warm Editorial Gouache + Soft Risograph).  
> Parents: `sports` · `food` · `music`  
> Children (12): golf, baseball, tennis, fishing · baking, desserts, herbs, fruits · instruments, jazz, classical, music-terms  
> Planning: [`THEME-EXPANSION-PLAN.md`](./THEME-EXPANSION-PLAN.md) §15  
> **Temporary covers:** each child currently reuses its **parent** theme art. Swap files at the paths below — no code change needed; then `node scripts/derive-images.mjs` + `node scripts/generate-og.mjs`.

No readable text, letters, logos, faces, team marks, or artist likenesses.

## Style lock

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel
```

## Shared negative

```
text, letters, typography, watermark, logo, brand name, team logo, jersey numbers, NFL, NBA, MLB marks, artist portrait, band merch, UI mockup, photorealistic stock photo, glossy 3D render, plastic CGI, purple neon gradient, floating blobs, sparkles, glitter, children, kids cartoon, Disney, Marvel, anime, chibi, emoji, clipart, busy collage, extra fingers, deformed anatomy, lowres, blurry
```

For each slug deliver:
1. Cover `/public/images/themes/{slug}.webp` — **1200×900**, + optional `-640.webp`
2. OG base `/design/og-base/og-theme-{slug}.png` — **1200×630**, motif **LEFT**, right **~55–60% blank cream**

---

### Sports children

| slug | Cover motif | Alt (EN) |
|---|---|---|
| `golf` | Tee, ball, putter on cropped grass | Golf word search — painted golf tee, ball and putter on grass |
| `baseball` | Glove, ball, bat on wooden bench | Baseball word search — painted glove, ball and bat on a bench |
| `tennis` | Racket, balls, towel by clay edge | Tennis word search — painted racket and balls by a clay court |
| `fishing` | Rod, reel, tackle by lakeshore | Fishing word search — painted rod, reel and tackle by a lake |

### Food children

| slug | Cover motif | Alt (EN) |
|---|---|---|
| `baking` | Loaf, rolling pin, flour bowl | Baking word search — painted loaf, rolling pin and flour bowl |
| `desserts` | Cake slice, berry tart, cream jug | Desserts word search — painted cake slice and berry tart |
| `herbs` | Basil, thyme, rosemary, mortar | Herbs & spices word search — painted herb bundles and mortar |
| `fruits` | Basket of apple, citrus, berries | Fruits word search — painted market basket of fruit |

### Music children

| slug | Cover motif | Alt (EN) |
|---|---|---|
| `instruments` | Violin, flute, sheet music on stand | Instruments word search — painted violin, flute and sheet music |
| `jazz` | Muted trumpet, brushes, stool | Jazz word search — painted muted trumpet and drum brushes |
| `classical` | Baton, open score, quiet chair | Classical word search — painted baton and concert score |
| `music-terms` | Theory workbook, pencil, metronome | Musical terms word search — painted workbook and metronome |

### Prompt pattern (cover)

```
{Style lock}. Square-safe 4:3 theme cover for '{Name}' word search. Motif: {motif}. Adult editorial still life, no faces, no logos. Leave bottom 20% slightly simpler for a white serif title overlay. No readable text. WordsAtRest editorial gouache risograph v1.
```

### Prompt pattern (OG)

```
{Style lock}. Open Graph 1200x630 for '{Name}'. Motif cluster on the LEFT: {motif}. RIGHT ~55–60% nearly empty warm cream paper with faint grain for title overlay. No faces, no logos, no readable words. WordsAtRest editorial gouache risograph v1.
```

### Integrator notes

1. Overwrite temporary parent-reuse files.  
2. `node scripts/derive-images.mjs` then `node scripts/generate-og.mjs`.  
3. Motifs already in `lib/images.ts` (`THEME_MOTIF`).  
4. Do not edit app code or deploy from the image agent.

— End of sub-theme Wave 1 image request.
