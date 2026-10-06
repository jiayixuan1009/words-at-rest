# 难度递进图出图需求 — DIFFICULTY IMAGE REQUEST

> 品牌：**Words at Rest** · 站点：https://wordsatrest.com · 仓库：`/workspace/words-at-rest`  
> 艺术方向：遵循 [`IMAGE-BRIEF.md`](./IMAGE-BRIEF.md)（Warm Editorial Gouache + Soft Risograph）  
> 配套 CSV：[`difficulty-image-manifest.csv`](./difficulty-image-manifest.csv)  
> 生成日期：2026-10-06 · **本文档仅供图像 agent / 出图；勿改业务代码、勿部署。**  
> 覆盖范围：master 上 16 个主题 + `holidays-wave1` 的 4 个节日主题 = **20 主题 × 3 难度 = 60 张主图**（另各需 640 宽变体，可由 `derive-images.mjs` 生成）。

---

## 0) 用户需求（中文）

「同一个主题的简单、中等、难，也希望能有图片，且画面有递进感觉。」

每个主题除现有封面外，再出 **Easy / Medium / Hard** 三张同系列图：机位、调色、构图骨架固定，场景从疏到密、从少到满。**Large Print（大字）谜题复用 Easy 图**，不再单独出第四张。

---

## 1) 全局规格

| 字段 | 值 |
|---|---|
| 风格 | Warm Editorial Gouache + Soft Risograph，与现有主题封面一致 |
| 主图尺寸 | **1200 × 900**（4:3），WebP |
| 小图 | `/public/images/themes/<slug>-<level>-640.webp`（可派生） |
| 透明底 | 否 |
| 图内文字 | **禁止**可读文字、字母、logo、人脸 |
| Large Print | **复用该主题的 easy 图**（`…-easy.webp`） |
| 命名 | `public/images/themes/<slug>-easy.webp` / `-medium.webp` / `-hard.webp` |

### 递进规则（所有主题共用）

- **固定机位**：同一视角、同一桌面/窗台/长凳平面、同一柔和散射光、同一奶油纸底。
- **同一道具语言**：每档只增减物件数量与场景丰满度，不要换题材或换角度。
- **Easy**：1–3 个主体物件，**大量负空间**，安静、一眼可读。
- **Medium**：约 5–8 个物件，场景「正在展开」。
- **Hard**：物件更满、细节更密，但仍须 **平静、可呼吸**，禁止嘈杂拼贴。
- 建议出图时加锚点：`WordsAtRest difficulty progression v1` + 主题 slug。

### Style Lock（每个 prompt 前缀）

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel
```

### Progression Lock（每个 prompt 中段）

```
FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic.
```

### Global Negative Prompt

```
text, letters, typography, watermark, logo, brand name, UI mockup, photorealistic stock photo, glossy 3D render, plastic CGI, purple neon gradient, floating blobs, sparkles, glitter, lens flare, oversmoothed skin, beautiful young influencer face, children, kids cartoon, Disney, Marvel, anime, chibi, emoji, clipart, Busy Beaver, stock cafe cliché with latte art heart, cyberpunk, hyper-saturated, busy collage, chaotic composition, extra fingers, deformed anatomy, lowres, blurry, jpeg artifacts, Santa face, cupid, bunny mascot, cartoon turkey mascot, crucifix as logo, glowing cross icon
```

---

## 2) 优先级（先出谁）

### P0 · Bible

`bible`

### P0 · Holidays Wave 1

`thanksgiving`, `winter`, `valentines`, `easter`

### P1 · Top-traffic / evergreen covers already live

`halloween`, `fall`, `christmas`, `animals`, `garden`, `ocean`, `dogs`, `cats`, `food`

### P2 · Remaining master themes + packs

`sports`, `music`, `travel`, `space`, `large-print-pack`, `hard-pack`

建议：**先完整交付某一主题的 easy+medium+hard 三连**，再开下一主题，便于审核「递进是否成立」。

---

## 3) 接线说明（稍后实现，本次只出文档）

- 主题页 / 谜题卡片：若存在 `/images/themes/<slug>-<difficulty>.webp`，则显示该难度图；否则回退到主题封面 `/images/themes/<slug>.webp`。
- `large` / Large Print 难度：映射到 **easy** 文件。
- 本次 **不改** `lib/images.ts`、组件或路由；图像落地后再接线。

---

## 4) 逐主题递进概念 + 完整英文 Prompt

### `bible` — Bible（P0）

**递进概念：** 同一木桌虔诚静物：从一本合上的旧圣经，到橄榄枝与陶灯加入，再到麦穗、丝带与丰满桌面。

| Level | Filename | Objects feel |
|---|---|---|
| easy | `themes/bible-easy.webp` | 1–3 · 大留白 |
| medium | `themes/bible-medium.webp` | ~5–8 · 展开中 |
| hard | `themes/bible-hard.webp` | 丰满 · 细节密仍安静 |

> Large Print 谜题使用 `themes/bible-easy.webp`。

#### easy

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Bible' (bible), DIFFICULTY LEVEL: EASY. Motif: a single closed old leather-bound Bible with a soft ribbon bookmark centered on a wooden table, generous empty cream-paper negative space around it (1–2 objects only). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — bible-easy.
```

**Negative:** 见全局 Negative + 本主题补充：`crucifix as logo, glowing cross icon, church clipart, halo, Jesus face, saints portrait`

#### medium

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Bible' (bible), DIFFICULTY LEVEL: MEDIUM. Motif: the same closed Bible plus a small olive branch and a clay oil lamp on the same wooden table (~5 objects), scene beginning to feel like a quiet devotion still life. Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — bible-medium.
```

**Negative:** 见全局 Negative + 本主题补充：`crucifix as logo, glowing cross icon, church clipart, halo, Jesus face, saints portrait`

#### hard

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Bible' (bible), DIFFICULTY LEVEL: HARD. Motif: the same Bible, olive branch and oil lamp now joined by wheat stalks, a second soft ribbon curl and warm wood grain richness — full respectful adult still life, dense but calm, non-denominational, no cross-as-logo. Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — bible-hard.
```

**Negative:** 见全局 Negative + 本主题补充：`crucifix as logo, glowing cross icon, church clipart, halo, Jesus face, saints portrait`

### `thanksgiving` — Thanksgiving（P0）

**递进概念：** 同一丰收桌面：从一只小南瓜，到玉米与餐巾加入，再到完整感恩节静物。

| Level | Filename | Objects feel |
|---|---|---|
| easy | `themes/thanksgiving-easy.webp` | 1–3 · 大留白 |
| medium | `themes/thanksgiving-medium.webp` | ~5–8 · 展开中 |
| hard | `themes/thanksgiving-hard.webp` | 丰满 · 细节密仍安静 |

> Large Print 谜题使用 `themes/thanksgiving-easy.webp`。

#### easy

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Thanksgiving' (thanksgiving), DIFFICULTY LEVEL: EASY. Motif: a single small pumpkin on a warm wooden harvest table, lots of empty cream negative space (1 object). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — thanksgiving-easy.
```

**Negative:** 见全局 Negative + 本主题补充：`cartoon turkey mascot`

#### medium

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Thanksgiving' (thanksgiving), DIFFICULTY LEVEL: MEDIUM. Motif: the same pumpkin with ears of corn and a folded linen napkin on the same table (~5 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — thanksgiving-medium.
```

**Negative:** 见全局 Negative + 本主题补充：`cartoon turkey mascot`

#### hard

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Thanksgiving' (thanksgiving), DIFFICULTY LEVEL: HARD. Motif: the same harvest table now full: pumpkin, corn, acorns, napkin, wooden spoon and ceramic gravy boat — rich but quiet adult Thanksgiving still life, no cartoon turkey. Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — thanksgiving-hard.
```

**Negative:** 见全局 Negative + 本主题补充：`cartoon turkey mascot`

### `winter` — Winter（P0）

**递进概念：** 同一窗台冬日：从一杯热可可，到毛线手套加入，再到松枝与霜窗的完整冬景。

| Level | Filename | Objects feel |
|---|---|---|
| easy | `themes/winter-easy.webp` | 1–3 · 大留白 |
| medium | `themes/winter-medium.webp` | ~5–8 · 展开中 |
| hard | `themes/winter-hard.webp` | 丰满 · 细节密仍安静 |

> Large Print 谜题使用 `themes/winter-easy.webp`。

#### easy

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Winter' (winter), DIFFICULTY LEVEL: EASY. Motif: a single mug of cocoa on a frosted window ledge, generous empty cream space (1–2 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — winter-easy.
```

**Negative:** 见全局 Negative + 本主题补充：`Santa face, snowman face, Christmas trademark characters`

#### medium

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Winter' (winter), DIFFICULTY LEVEL: MEDIUM. Motif: the same cocoa mug with a pair of wool mittens on the same ledge (~5 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — winter-medium.
```

**Negative:** 见全局 Negative + 本主题补充：`Santa face, snowman face, Christmas trademark characters`

#### hard

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Winter' (winter), DIFFICULTY LEVEL: HARD. Motif: the same ledge now fuller: cocoa, mittens, pine sprig and soft frost on the window — quiet midwinter still life, no Santa, no snowman face. Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — winter-hard.
```

**Negative:** 见全局 Negative + 本主题补充：`Santa face, snowman face, Christmas trademark characters`

### `valentines` — Valentine's Day（P0）

**递进概念：** 同一桌面成人情书：从一封蜡封信，到干玫瑰加入，再到丝带与钢笔的完整静物。

| Level | Filename | Objects feel |
|---|---|---|
| easy | `themes/valentines-easy.webp` | 1–3 · 大留白 |
| medium | `themes/valentines-medium.webp` | ~5–8 · 展开中 |
| hard | `themes/valentines-hard.webp` | 丰满 · 细节密仍安静 |

> Large Print 谜题使用 `themes/valentines-easy.webp`。

#### easy

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Valentine's Day' (valentines), DIFFICULTY LEVEL: EASY. Motif: a single sealed cream envelope with a soft wax seal on paper, lots of negative space (1–2 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — valentines-easy.
```

**Negative:** 见全局 Negative + 本主题补充：`cupid, chocolate-box hearts explosion, neon valentine stickers`

#### medium

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Valentine's Day' (valentines), DIFFICULTY LEVEL: MEDIUM. Motif: the same sealed envelope with one dried rose beside it (~4–5 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — valentines-medium.
```

**Negative:** 见全局 Negative + 本主题补充：`cupid, chocolate-box hearts explosion, neon valentine stickers`

#### hard

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Valentine's Day' (valentines), DIFFICULTY LEVEL: HARD. Motif: the same still life now complete: sealed letter, dried rose, narrow ribbon and fountain pen on cream paper — calm adult romance, no cupid, no heart explosion. Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — valentines-hard.
```

**Negative:** 见全局 Negative + 本主题补充：`cupid, chocolate-box hearts explosion, neon valentine stickers`

### `easter` — Easter（P0）

**递进概念：** 同一木桌春日：从一枚淡色蛋，到藤篮加入，再到水仙与柳枝的完整复活节静物。

| Level | Filename | Objects feel |
|---|---|---|
| easy | `themes/easter-easy.webp` | 1–3 · 大留白 |
| medium | `themes/easter-medium.webp` | ~5–8 · 展开中 |
| hard | `themes/easter-hard.webp` | 丰满 · 细节密仍安静 |

> Large Print 谜题使用 `themes/easter-easy.webp`。

#### easy

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Easter' (easter), DIFFICULTY LEVEL: EASY. Motif: a single pale undecorated egg on a wooden table, generous empty cream space (1 object). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — easter-easy.
```

**Negative:** 见全局 Negative + 本主题补充：`bunny mascot face, cartoon chicks with hats, crucifix as logo`

#### medium

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Easter' (easter), DIFFICULTY LEVEL: MEDIUM. Motif: a woven basket with a few pale eggs on the same table (~5 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — easter-medium.
```

**Negative:** 见全局 Negative + 本主题补充：`bunny mascot face, cartoon chicks with hats, crucifix as logo`

#### hard

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Easter' (easter), DIFFICULTY LEVEL: HARD. Motif: the same table now rich: woven basket, pale eggs, daffodils and willow twigs — quiet spring still life, non-denominational, no bunny mascot. Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — easter-hard.
```

**Negative:** 见全局 Negative + 本主题补充：`bunny mascot face, cartoon chicks with hats, crucifix as logo`

### `halloween` — Halloween（P1）

**递进概念：** 同一桌面成人万圣：从一只小南瓜，到烛台加入，再到剪纸蝙蝠与干叶的完整静物。

| Level | Filename | Objects feel |
|---|---|---|
| easy | `themes/halloween-easy.webp` | 1–3 · 大留白 |
| medium | `themes/halloween-medium.webp` | ~5–8 · 展开中 |
| hard | `themes/halloween-hard.webp` | 丰满 · 细节密仍安静 |

> Large Print 谜题使用 `themes/halloween-easy.webp`。

#### easy

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Halloween' (halloween), DIFFICULTY LEVEL: EASY. Motif: a single small pumpkin on a wooden table, generous empty cream space (1 object). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — halloween-easy.
```

**Negative:** 见全局 Negative + 本主题补充：`scary gore, kids costume party chaos`

#### medium

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Halloween' (halloween), DIFFICULTY LEVEL: MEDIUM. Motif: the same pumpkin with a candle stub and a few dried leaves (~5 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — halloween-medium.
```

**Negative:** 见全局 Negative + 本主题补充：`scary gore, kids costume party chaos`

#### hard

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Halloween' (halloween), DIFFICULTY LEVEL: HARD. Motif: the same table now fuller: pumpkin, candle, paper bat cutout and dried leaves — cozy adult Halloween, not spooky-kids. Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — halloween-hard.
```

**Negative:** 见全局 Negative + 本主题补充：`scary gore, kids costume party chaos`

### `fall` — Fall（P1）

**递进概念：** 同一秋桌：从一片枫叶，到橡子加入，再到围巾与琥珀色光的完整秋日静物。

| Level | Filename | Objects feel |
|---|---|---|
| easy | `themes/fall-easy.webp` | 1–3 · 大留白 |
| medium | `themes/fall-medium.webp` | ~5–8 · 展开中 |
| hard | `themes/fall-hard.webp` | 丰满 · 细节密仍安静 |

> Large Print 谜题使用 `themes/fall-easy.webp`。

#### easy

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Fall' (fall), DIFFICULTY LEVEL: EASY. Motif: a single maple leaf on a wooden table, lots of negative space (1 object). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — fall-easy.
```

**Negative:** 见全局 Negative + 本主题补充：`Halloween props, jack-o-lantern`

#### medium

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Fall' (fall), DIFFICULTY LEVEL: MEDIUM. Motif: the same maple leaf with an acorn and a soft amber light pool (~4–5 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — fall-medium.
```

**Negative:** 见全局 Negative + 本主题补充：`Halloween props, jack-o-lantern`

#### hard

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Fall' (fall), DIFFICULTY LEVEL: HARD. Motif: the same autumn still life now full: maple leaf, acorn, wool scarf fold and amber light — no Halloween props. Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — fall-hard.
```

**Negative:** 见全局 Negative + 本主题补充：`Halloween props, jack-o-lantern`

### `christmas` — Christmas（P1）

**递进概念：** 同一冬夜桌面：从一枝松针，到肉桂加入，再到丝带与蜡烛的完整圣诞静物。

| Level | Filename | Objects feel |
|---|---|---|
| easy | `themes/christmas-easy.webp` | 1–3 · 大留白 |
| medium | `themes/christmas-medium.webp` | ~5–8 · 展开中 |
| hard | `themes/christmas-hard.webp` | 丰满 · 细节密仍安静 |

> Large Print 谜题使用 `themes/christmas-easy.webp`。

#### easy

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Christmas' (christmas), DIFFICULTY LEVEL: EASY. Motif: a single pine sprig on a wooden table, generous empty cream space (1 object). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — christmas-easy.
```

**Negative:** 见全局 Negative + 本主题补充：`Santa face, elves, reindeer mascot`

#### medium

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Christmas' (christmas), DIFFICULTY LEVEL: MEDIUM. Motif: the same pine sprig with a cinnamon stick (~4 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — christmas-medium.
```

**Negative:** 见全局 Negative + 本主题补充：`Santa face, elves, reindeer mascot`

#### hard

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Christmas' (christmas), DIFFICULTY LEVEL: HARD. Motif: the same calm December still life now full: pine sprig, cinnamon stick, soft ribbon and candle — adult cozy, not Santa/elves. Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — christmas-hard.
```

**Negative:** 见全局 Negative + 本主题补充：`Santa face, elves, reindeer mascot`

### `animals` — Animals（P1）

**递进概念：** 同一田野静物语言：从狐狸剪影，到小鸟加入，再到爪印与丰满自然小景。

| Level | Filename | Objects feel |
|---|---|---|
| easy | `themes/animals-easy.webp` | 1–3 · 大留白 |
| medium | `themes/animals-medium.webp` | ~5–8 · 展开中 |
| hard | `themes/animals-hard.webp` | 丰满 · 细节密仍安静 |

> Large Print 谜题使用 `themes/animals-easy.webp`。

#### easy

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Animals' (animals), DIFFICULTY LEVEL: EASY. Motif: a single stylized fox silhouette on cream paper with soft ground, generous negative space (1 motif). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — animals-easy.
```

**Negative:** 见全局 Negative + 本主题补充：`zoo realism, Disney animals, anthropomorphic mascots`

#### medium

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Animals' (animals), DIFFICULTY LEVEL: MEDIUM. Motif: the same fox silhouette with a small bird nearby (~4–5 motifs). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — animals-medium.
```

**Negative:** 见全局 Negative + 本主题补充：`zoo realism, Disney animals, anthropomorphic mascots`

#### hard

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Animals' (animals), DIFFICULTY LEVEL: HARD. Motif: the same gentle wildlife scene now richer: fox silhouette, bird and paw-print stamps — stylized, no zoo realism, calm adult mood. Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — animals-hard.
```

**Negative:** 见全局 Negative + 本主题补充：`zoo realism, Disney animals, anthropomorphic mascots`

### `garden` — Garden（P1）

**递进概念：** 同一花圃视角：从一盆幼苗，到开花花床，再到盛开的完整花园（画面递进范例）。

| Level | Filename | Objects feel |
|---|---|---|
| easy | `themes/garden-easy.webp` | 1–3 · 大留白 |
| medium | `themes/garden-medium.webp` | ~5–8 · 展开中 |
| hard | `themes/garden-hard.webp` | 丰满 · 细节密仍安静 |

> Large Print 谜题使用 `themes/garden-easy.webp`。

#### easy

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Garden' (garden), DIFFICULTY LEVEL: EASY. Motif: a single terracotta pot with one small seedling on a wooden potting bench, lots of empty cream negative space (1–2 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — garden-easy.
```

**Negative:** 见全局 Negative + 本主题补充：`garden gnome cartoon, kids playground`

#### medium

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Garden' (garden), DIFFICULTY LEVEL: MEDIUM. Motif: the same bench now showing a developing flower bed: a few pots with budding blooms and a small trowel (~5–7 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — garden-medium.
```

**Negative:** 见全局 Negative + 本主题补充：`garden gnome cartoon, kids playground`

#### hard

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Garden' (garden), DIFFICULTY LEVEL: HARD. Motif: the same viewpoint now a garden in full bloom: terracotta pots, flowering greens, trowel and soil crumbs — rich, tactile, soil-under-nails feel, still calm. Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — garden-hard.
```

**Negative:** 见全局 Negative + 本主题补充：`garden gnome cartoon, kids playground`

### `ocean` — Ocean（P1）

**递进概念：** 同一潮间带视角：从一只贝壳，到浪线加入，再到灯塔与浪花的完整海景静物。

| Level | Filename | Objects feel |
|---|---|---|
| easy | `themes/ocean-easy.webp` | 1–3 · 大留白 |
| medium | `themes/ocean-medium.webp` | ~5–8 · 展开中 |
| hard | `themes/ocean-hard.webp` | 丰满 · 细节密仍安静 |

> Large Print 谜题使用 `themes/ocean-easy.webp`。

#### easy

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Ocean' (ocean), DIFFICULTY LEVEL: EASY. Motif: a single seashell on sand-toned paper, generous empty cream space (1 object). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — ocean-easy.
```

**Negative:** 见全局 Negative + 本主题补充：`pirate cartoon, shark attack drama`

#### medium

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Ocean' (ocean), DIFFICULTY LEVEL: MEDIUM. Motif: the same seashell with a soft painted wave line and seafoam hint (~4–5 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — ocean-medium.
```

**Negative:** 见全局 Negative + 本主题补充：`pirate cartoon, shark attack drama`

#### hard

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Ocean' (ocean), DIFFICULTY LEVEL: HARD. Motif: the same tidal calm scene now fuller: seashell, wave line, distant lighthouse silhouette and seafoam — slow tempo, quiet. Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — ocean-hard.
```

**Negative:** 见全局 Negative + 本主题补充：`pirate cartoon, shark attack drama`

### `dogs` — Dogs（P1）

**递进概念：** 同一门廊静物：从一卷牵绳，到爪印加入，再到狗剪影与食碗的完整温馨景。

| Level | Filename | Objects feel |
|---|---|---|
| easy | `themes/dogs-easy.webp` | 1–3 · 大留白 |
| medium | `themes/dogs-medium.webp` | ~5–8 · 展开中 |
| hard | `themes/dogs-hard.webp` | 丰满 · 细节密仍安静 |

> Large Print 谜题使用 `themes/dogs-easy.webp`。

#### easy

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Dogs' (dogs), DIFFICULTY LEVEL: EASY. Motif: a single coiled leash on a wooden floor, generous empty cream space (1 object). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — dogs-easy.
```

**Negative:** 见全局 Negative + 本主题补充：`breed trademark, dog face extreme close-up, cartoon dog mascot`

#### medium

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Dogs' (dogs), DIFFICULTY LEVEL: MEDIUM. Motif: the same leash with a paw print stamp and a soft collar (~4–5 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — dogs-medium.
```

**Negative:** 见全局 Negative + 本主题补充：`breed trademark, dog face extreme close-up, cartoon dog mascot`

#### hard

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Dogs' (dogs), DIFFICULTY LEVEL: HARD. Motif: the same affectionate dog still life now full: leash curl, paw print, soft dog silhouette and a simple bowl — no breed IP, no face close-up required. Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — dogs-hard.
```

**Negative:** 见全局 Negative + 本主题补充：`breed trademark, dog face extreme close-up, cartoon dog mascot`

### `cats` — Cats（P1）

**递进概念：** 同一窗台夜晚：从一团毛线，到窗台加入，再到蜷猫剪影的完整室内景。

| Level | Filename | Objects feel |
|---|---|---|
| easy | `themes/cats-easy.webp` | 1–3 · 大留白 |
| medium | `themes/cats-medium.webp` | ~5–8 · 展开中 |
| hard | `themes/cats-hard.webp` | 丰满 · 细节密仍安静 |

> Large Print 谜题使用 `themes/cats-easy.webp`。

#### easy

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Cats' (cats), DIFFICULTY LEVEL: EASY. Motif: a single yarn ball on a windowsill, lots of negative space (1 object). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — cats-easy.
```

**Negative:** 见全局 Negative + 本主题补充：`cartoon cat mascot, anime cat`

#### medium

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Cats' (cats), DIFFICULTY LEVEL: MEDIUM. Motif: the same yarn ball on the windowsill with evening light (~4 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — cats-medium.
```

**Negative:** 见全局 Negative + 本主题补充：`cartoon cat mascot, anime cat`

#### hard

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Cats' (cats), DIFFICULTY LEVEL: HARD. Motif: the same indoor evening scene now full: yarn ball, windowsill and a curled cat silhouette — soft adult mood, no cartoon cat face. Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — cats-hard.
```

**Negative:** 见全局 Negative + 本主题补充：`cartoon cat mascot, anime cat`

### `food` — Food（P1）

**递进概念：** 同一厨房台面：从一只陶碗，到木勺与香草加入，再到面包的完整厨事静物。

| Level | Filename | Objects feel |
|---|---|---|
| easy | `themes/food-easy.webp` | 1–3 · 大留白 |
| medium | `themes/food-medium.webp` | ~5–8 · 展开中 |
| hard | `themes/food-hard.webp` | 丰满 · 细节密仍安静 |

> Large Print 谜题使用 `themes/food-easy.webp`。

#### easy

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Food' (food), DIFFICULTY LEVEL: EASY. Motif: a single ceramic bowl on a wooden kitchen table, generous empty cream space (1 object). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — food-easy.
```

**Negative:** 见全局 Negative + 本主题补充：`fast-food branding, latte art heart cliché`

#### medium

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Food' (food), DIFFICULTY LEVEL: MEDIUM. Motif: the same bowl with a wooden spoon and a few herb sprigs (~5 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — food-medium.
```

**Negative:** 见全局 Negative + 本主题补充：`fast-food branding, latte art heart cliché`

#### hard

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Food' (food), DIFFICULTY LEVEL: HARD. Motif: the same kitchen still life now rich: ceramic bowl, herbs, bread loaf and wooden spoon — warm, unhurried adult cooking mood. Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — food-hard.
```

**Negative:** 见全局 Negative + 本主题补充：`fast-food branding, latte art heart cliché`

### `sports` — Sports（P2）

**递进概念：** 同一更衣室长凳视角：从一颗网球，到步行鞋加入，再到自行车轮的完整休闲运动静物。

| Level | Filename | Objects feel |
|---|---|---|
| easy | `themes/sports-easy.webp` | 1–3 · 大留白 |
| medium | `themes/sports-medium.webp` | ~5–8 · 展开中 |
| hard | `themes/sports-hard.webp` | 丰满 · 细节密仍安静 |

> Large Print 谜题使用 `themes/sports-easy.webp`。

#### easy

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Sports' (sports), DIFFICULTY LEVEL: EASY. Motif: a single tennis ball on a wooden bench, lots of negative space (1 object). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — sports-easy.
```

**Negative:** 见全局 Negative + 本主题补充：`stadium spectacle, trophy confetti, team logos`

#### medium

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Sports' (sports), DIFFICULTY LEVEL: MEDIUM. Motif: the same tennis ball with a pair of walking shoes (~4–5 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — sports-medium.
```

**Negative:** 见全局 Negative + 本主题补充：`stadium spectacle, trophy confetti, team logos`

#### hard

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Sports' (sports), DIFFICULTY LEVEL: HARD. Motif: the same adult leisure sports still life now full: tennis ball, walking shoes and a bicycle wheel — calm, not arena spectacle. Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — sports-hard.
```

**Negative:** 见全局 Negative + 本主题补充：`stadium spectacle, trophy confetti, team logos`

### `music` — Music（P2）

**递进概念：** 同一听音角落：从一副耳机，到黑胶封套加入，再到乐谱架与水壶的完整练习景。

| Level | Filename | Objects feel |
|---|---|---|
| easy | `themes/music-easy.webp` | 1–3 · 大留白 |
| medium | `themes/music-medium.webp` | ~5–8 · 展开中 |
| hard | `themes/music-hard.webp` | 丰满 · 细节密仍安静 |

> Large Print 谜题使用 `themes/music-easy.webp`。

#### easy

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Music' (music), DIFFICULTY LEVEL: EASY. Motif: a single pair of headphones on a side table, generous empty cream space (1–2 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — music-easy.
```

**Negative:** 见全局 Negative + 本主题补充：`neon DJ stage, brand logos on devices`

#### medium

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Music' (music), DIFFICULTY LEVEL: MEDIUM. Motif: the same headphones with a vinyl sleeve edge (~4–5 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — music-medium.
```

**Negative:** 见全局 Negative + 本主题补充：`neon DJ stage, brand logos on devices`

#### hard

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Music' (music), DIFFICULTY LEVEL: HARD. Motif: the same quiet practice corner now full: headphones, vinyl sleeve edge, music stand and a kettle — listening mood, no readable text on sleeve. Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — music-hard.
```

**Negative:** 见全局 Negative + 本主题补充：`neon DJ stage, brand logos on devices`

### `travel` — Travel（P2）

**递进概念：** 同一出发桌面：从一只指南针，到邮票加入，再到地图与行李箱角的完整旅行静物。

| Level | Filename | Objects feel |
|---|---|---|
| easy | `themes/travel-easy.webp` | 1–3 · 大留白 |
| medium | `themes/travel-medium.webp` | ~5–8 · 展开中 |
| hard | `themes/travel-hard.webp` | 丰满 · 细节密仍安静 |

> Large Print 谜题使用 `themes/travel-easy.webp`。

#### easy

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Travel' (travel), DIFFICULTY LEVEL: EASY. Motif: a single brass compass on a wooden desk, lots of negative space (1 object). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — travel-easy.
```

**Negative:** 见全局 Negative + 本主题补充：`airline logos, passport photo faces, readable map text`

#### medium

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Travel' (travel), DIFFICULTY LEVEL: MEDIUM. Motif: the same compass with a postage stamp (~4 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — travel-medium.
```

**Negative:** 见全局 Negative + 本主题补充：`airline logos, passport photo faces, readable map text`

#### hard

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Travel' (travel), DIFFICULTY LEVEL: HARD. Motif: the same armchair-travel still life now full: folded map, suitcase corner, stamp and compass — gentle wanderlust, no readable place names. Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — travel-hard.
```

**Negative:** 见全局 Negative + 本主题补充：`airline logos, passport photo faces, readable map text`

### `space` — Space（P2）

**递进概念：** 同一夜空观察角：从一弯新月，到星点加入，再到望远镜的完整沉思景。

| Level | Filename | Objects feel |
|---|---|---|
| easy | `themes/space-easy.webp` | 1–3 · 大留白 |
| medium | `themes/space-medium.webp` | ~5–8 · 展开中 |
| hard | `themes/space-hard.webp` | 丰满 · 细节密仍安静 |

> Large Print 谜题使用 `themes/space-easy.webp`。

#### easy

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Space' (space), DIFFICULTY LEVEL: EASY. Motif: a soft crescent moon alone on cream night-tint paper, generous empty space (1 motif). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — space-easy.
```

**Negative:** 见全局 Negative + 本主题补充：`spaceship CGI, alien cartoon, neon galaxy`

#### medium

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Space' (space), DIFFICULTY LEVEL: MEDIUM. Motif: the same crescent moon with sparse star paint flecks (~4–5 motifs). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — space-medium.
```

**Negative:** 见全局 Negative + 本主题补充：`spaceship CGI, alien cartoon, neon galaxy`

#### hard

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Space' (space), DIFFICULTY LEVEL: HARD. Motif: the same contemplative night-sky scene now fuller: crescent moon, sparse stars and a telescope silhouette — quiet, not sci-fi chaos. Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — space-hard.
```

**Negative:** 见全局 Negative + 本主题补充：`spaceship CGI, alien cartoon, neon galaxy`

### `large-print-pack` — Large Print Pack（P2）

**递进概念：** 同一阅读舒适角：从一副老花镜，到台灯加入，再到抽象大字母形的完整舒适景（大字谜题复用 easy 图）。

| Level | Filename | Objects feel |
|---|---|---|
| easy | `themes/large-print-pack-easy.webp` | 1–3 · 大留白 |
| medium | `themes/large-print-pack-medium.webp` | ~5–8 · 展开中 |
| hard | `themes/large-print-pack-hard.webp` | 丰满 · 细节密仍安静 |

> Large Print 谜题使用 `themes/large-print-pack-easy.webp`。

#### easy

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Large Print Pack' (large-print-pack), DIFFICULTY LEVEL: EASY. Motif: a single pair of reading glasses on cream paper, generous empty space (1–2 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — large-print-pack-easy.
```

**Negative:** 见全局 Negative + 本主题补充：`readable words, eye-chart letters spelling words`

#### medium

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Large Print Pack' (large-print-pack), DIFFICULTY LEVEL: MEDIUM. Motif: the same glasses with a soft lamp glow nearby (~4–5 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — large-print-pack-medium.
```

**Negative:** 见全局 Negative + 本主题补充：`readable words, eye-chart letters spelling words`

#### hard

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Large Print Pack' (large-print-pack), DIFFICULTY LEVEL: HARD. Motif: the same comfort-reading still life now fuller: reading glasses, soft lamp and oversized letterforms as abstract shapes ONLY (no readable words). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — large-print-pack-hard.
```

**Negative:** 见全局 Negative + 本主题补充：`readable words, eye-chart letters spelling words`

### `hard-pack` — Hard Pack（P2）

**递进概念：** 同一书桌挑战感：从一支钢笔，到稀疏网格暗示，再到深胡桃色密集排线的完整严肃谜题景。

| Level | Filename | Objects feel |
|---|---|---|
| easy | `themes/hard-pack-easy.webp` | 1–3 · 大留白 |
| medium | `themes/hard-pack-medium.webp` | ~5–8 · 展开中 |
| hard | `themes/hard-pack-hard.webp` | 丰满 · 细节密仍安静 |

> Large Print 谜题使用 `themes/hard-pack-easy.webp`。

#### easy

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Hard Pack' (hard-pack), DIFFICULTY LEVEL: EASY. Motif: a single fountain pen on a wooden desk, generous empty cream space (1 object). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — hard-pack-easy.
```

**Negative:** 见全局 Negative + 本主题补充：`YOU WIN trophy, confetti, neon game UI`

#### medium

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Hard Pack' (hard-pack), DIFFICULTY LEVEL: MEDIUM. Motif: the same fountain pen with a faint sparse ink-grid suggestion (~4–5 objects). Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — hard-pack-medium.
```

**Negative:** 见全局 Negative + 本主题补充：`YOU WIN trophy, confetti, neon game UI`

#### hard

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel. FIXED CAMERA / SAME SERIES RULES: identical viewpoint, camera distance, table or shelf plane, palette, and soft indoor light as the other two difficulty frames for this theme. Same prop base language — only object count and scene fullness change. Keep calm adult editorial mood; denser detail must still feel quiet, never chaotic. Square-safe 4:3 difficulty illustration for Words at Rest theme 'Hard Pack' (hard-pack), DIFFICULTY LEVEL: HARD. Motif: the same challenge mood now dense: fountain pen, deep walnut tones and a richer ink crosshatch grid suggestion — serious adult puzzle, still calm not chaotic. Leave bottom ~20% slightly simpler for optional UI overlay. No readable text. WordsAtRest editorial gouache risograph v1. WordsAtRest difficulty progression v1 — hard-pack-hard.
```

**Negative:** 见全局 Negative + 本主题补充：`YOU WIN trophy, confetti, neon game UI`

---

## 5) 数量汇总

| 项 | 数量 |
|---|---|
| 主题 | **20**（master 16 + 节日 4） |
| 主图 1200×900 | **60**（每主题 easy/medium/hard） |
| 640w 变体 | **60**（派生即可） |
| Large Print 专属图 | **0**（复用 easy） |

## 6) 图像 agent 派工提示

```
Read design/DIFFICULTY-IMAGE-REQUEST.md and design/difficulty-image-manifest.csv.
Generate only the 1200x900 masters first, in priority order (Bible → holidays → P1 → P2).
For each theme, deliver easy THEN medium THEN hard as a matched set before moving on.
Obey FIXED CAMERA / SAME SERIES RULES. Export exactly to public/images/themes/<slug>-<level>.webp.
Do not edit application source or deploy. Large-print puzzles will reuse *-easy.webp.
```

— End of difficulty image request.
