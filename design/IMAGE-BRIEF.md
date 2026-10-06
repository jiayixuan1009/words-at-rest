# Words at Rest — 图像艺术方向与出图清单 (IMAGE BRIEF)

> 品牌：**Words at Rest** · 站点：https://wordsatrest.com · 仓库：`/workspace/words-at-rest`  
> 受众：成人 / 长者 · Large print · 放松找词 · **非儿童向** · 无影视 IP · 图中无人脸肖像  
> 配套 CSV：[`image-manifest.csv`](./image-manifest.csv)  
> 生成日期：2026-10-06 · **本文件仅供另一图像 agent 执行；勿改业务代码。**

---

## 1) 诊断：为什么现在看起来像「AI 模板站」

基于仓库与线上页面（已核对 `lib/images.ts`、`ThemeCard.tsx`、`app/page.tsx`、`globals.css`、`public/images/*`）：

1. **图库是通用 Unsplash 生活方式照**（咖啡、眼镜、书桌），不是品牌插画系统；ATTRIBUTION.md 也写明来源。这类图是「禅意 SaaS / 模板主题」的标配，立刻显廉价。
2. **15 个主题共用 6 张图**：`themeImage()` 把 halloween/fall → 同一张 autumn，dogs/cats/christmas → cozy，sports/food → coffee……主题卡没有视觉身份，像占位符。
3. **英雄区是「渐变色块 + 右侧库存图」**（`.hero-band` 线性渐变 + `hero-cafe.jpg`），典型 AI 落地页分栏，缺少手工编辑气质。
4. **圆角胶囊 CTA + 系统衬线栈**（Iowan/Palatino fallback）+ 全站同一套边框色 `#d4cbb8`，版式整齐但无角色；图标只是 SVG 绿底字母 W（`app/icon.svg`）。
5. **主题卡底部黑渐变叠白字**（`ThemeCard` `bg-gradient-to-t from-[rgba(44,36,27,0.55)]`）是通用卡片套路，照片一糊就更像模板。
6. **缺品牌资产**：无真正 logo lockup、无 OG 图、无 how-to 分步图、无完成态、无各主题专属封面；大量页面（difficulty / daily / about / contact / legal）几乎纯文字。
7. **纸纹只是 SVG 噪声**（`paper-grain.svg` 32 行 feTurbulence），体感弱，撑不起「印刷品」承诺。

结论：不是「再多贴几张库存图」，而是换成 **同一套手工编辑插画语言**，让每个路由都有专属、可识别的画面。

---

## 2) 艺术方向（选定）

### 名称：**Warm Editorial Gouache + Soft Risograph**（暖编辑胶印 / 水粉）

一句话：像独立文学杂志内页与成人益智书封面——水粉厚涂 + 轻微套色错位（risograph），印在奶油纸上；安静、可触摸、偏 40+ 读者，绝不儿童卡通。

### 调色板（与现有 CSS tokens 对齐）

| Token | Hex | 用途 |
|---|---|---|
| Paper | `#F4EFE6` | 主背景 / 插画底 |
| Paper deep | `#EBE4D6` | 卡片 / 深纸 |
| Ink | `#2C241B` | 主线 / 深色块 |
| Ink soft | `#5C5348` | 次要 |
| Walnut accent | `#6B4F3A` / `#4A3426` | 强调 |
| Moss | `#3D5A45` / `#2F5D43` | Logo / 链接 / 完成态 |
| Ochre highlight | `#E8C99B` | 选中高亮呼应 |
| Found soft | `#D4E5D0` | 找到词的柔和绿 |
| Border | `#D4CBB8` | 线框（插画里少用硬线） |

### 材质与光

- **可见笔触**：颜料边缘略干、纸齿、偶尔漏白。
- **Risograph 错位**：1–2px 套色偏移（moss 与 ochre 轻微分开），增加印刷感。
- **光**：室内散射软光，无戏剧性体积光、无镜头光斑。
- **构图**：静物为主；主体偏中或中左；**为 UI 叠字留空**（主题卡底部 20%、OG 右侧 ~55%）。
- **纹理**：全局无缝纸纹 tile；插画本身也要带纸感，不要塑料光滑。

### 一致性规则（所有生成共用）

- **同一风格前缀**（见 CSV `english_prompt` 开头与下文 Style Lock）。
- **同一 negative prompt**（见 CSV 与下文）。
- **禁止图内可读文字**（唯一例外：品牌 lockup / wordmark / 单字母 W 图标）。
- **禁止真实人脸 / 可识别模特**；手可用剪影。
- **禁止儿童向、Disney/IP、炫光 3D、紫粉渐变、漂浮 blob、礼花爆炸式庆祝。**
- **主题必须一对一**：15 个 slug 各一张封面，禁止再映射复用。
- 建议生成时固定风格锚点短语：`WordsAtRest editorial gouache risograph v1`。

### Style Lock（复制进每个 prompt 前）

```
Hand-painted gouache and soft risograph illustration on warm cream paper, editorial magazine style, visible brush texture and slight ink misregistration, muted earth tones (paper #F4EFE6, ink #2C241B, moss #3D5A45, ochre #E8C99B, walnut #6B4F3A), flat soft lighting, quiet adult mood, no people faces, no text, no letters, no logos, no watermarks, square-safe composition with breathing room, tactile handmade feel
```

### Global Negative Prompt

```
text, letters, typography, watermark, logo, brand name, UI mockup, photorealistic stock photo, glossy 3D render, plastic CGI, purple neon gradient, floating blobs, sparkles, glitter, lens flare, oversmoothed skin, beautiful young influencer face, children, kids cartoon, Disney, Marvel, anime, chibi, emoji, clipart, Busy Beaver, stock cafe cliché with latte art heart, cyberpunk, hyper-saturated, busy collage, chaotic composition, extra fingers, deformed anatomy, lowres, blurry, jpeg artifacts
```

### 刻意避免的「AI 味」清单

- 光滑 3D 图标、玻璃拟态、霓虹紫蓝渐变
- 过美面孔 / 网红模特 / 儿童卡通吉祥物
- 图内大段营销文案、假 UI 截图
- 咖啡拉花爱心等陈词滥调库存构图（可用杯子，但要画成静物插画）
- Confetti / 奖杯 / 「YOU WIN」游戏化

---

## 3) 完整图像清单（摘要表）

**总计 82 张** · P0=22 · P1=30 · P2=30

完整逐行字段见 CSV（含英文 prompt）。下方按类别列出 ID → 文件 → 优先级。

| ID | Filename | Priority | Purpose |
|---|---|---|---|
| | **品牌 / 图标 / Logo** | | |
| `ICO-16` | `/public/images/brand/favicon-16.png` | **P0** | Favicon 16×16 |
| `ICO-32` | `/public/images/brand/favicon-32.png` | **P0** | Favicon 32×32 |
| `ICO-180` | `/public/images/brand/apple-touch-icon-180.png` | **P0** | Apple touch icon |
| `ICO-192` | `/public/images/brand/icon-192.png` | **P1** | Android / PWA icon 192 |
| `ICO-512` | `/public/images/brand/icon-512.png` | **P1** | PWA icon 512 |
| `ICO-MASK` | `/public/images/brand/icon-maskable-512.png` | **P1** | Maskable icon with safe zone |
| `LOGO-MARK` | `/public/images/brand/logo-mark.png` | **P0** | Standalone logo mark (W stamp) |
| `LOGO-LOCKUP` | `/public/images/brand/logo-lockup.png` | **P0** | Mark + wordmark lockup |
| `LOGO-WORDMARK` | `/public/images/brand/logo-wordmark.png` | **P1** | Wordmark only (no mark) |
| `HEADER-MARK-INLINE` | `/public/images/brand/header-mark-32.png` | **P0** | Inline header mark 32px |
| | **OG / Social** | | |
| `OG-DEFAULT` | `/public/images/og/og-default.png` | **P0** | Default social share card |
| `OG-THEME-HALLOWEEN` | `/public/images/og/og-theme-halloween.png` | **P1** | OG share card for Halloween theme |
| `OG-THEME-FALL` | `/public/images/og/og-theme-fall.png` | **P1** | OG share card for Fall theme |
| `OG-THEME-CHRISTMAS` | `/public/images/og/og-theme-christmas.png` | **P1** | OG share card for Christmas theme |
| `OG-THEME-ANIMALS` | `/public/images/og/og-theme-animals.png` | **P2** | OG share card for Animals theme |
| `OG-THEME-SPACE` | `/public/images/og/og-theme-space.png` | **P2** | OG share card for Space theme |
| `OG-THEME-SPORTS` | `/public/images/og/og-theme-sports.png` | **P2** | OG share card for Sports theme |
| `OG-THEME-FOOD` | `/public/images/og/og-theme-food.png` | **P2** | OG share card for Food theme |
| `OG-THEME-OCEAN` | `/public/images/og/og-theme-ocean.png` | **P2** | OG share card for Ocean theme |
| `OG-THEME-DOGS` | `/public/images/og/og-theme-dogs.png` | **P2** | OG share card for Dogs theme |
| `OG-THEME-CATS` | `/public/images/og/og-theme-cats.png` | **P2** | OG share card for Cats theme |
| `OG-THEME-TRAVEL` | `/public/images/og/og-theme-travel.png` | **P2** | OG share card for Travel theme |
| `OG-THEME-MUSIC` | `/public/images/og/og-theme-music.png` | **P2** | OG share card for Music theme |
| `OG-THEME-GARDEN` | `/public/images/og/og-theme-garden.png` | **P2** | OG share card for Garden theme |
| `OG-THEME-LARGE_PRINT_PACK` | `/public/images/og/og-theme-large-print-pack.png` | **P1** | OG share card for Large Print Pack theme |
| `OG-THEME-HARD_PACK` | `/public/images/og/og-theme-hard-pack.png` | **P1** | OG share card for Hard Pack theme |
| `OG-DAILY` | `/public/images/og/og-daily.png` | **P1** | OG for daily puzzle hub |
| `OG-LARGE` | `/public/images/og/og-large-print.png` | **P1** | OG for large print landing |
| | **首页 Home** | | |
| `HOME-HERO-DESKTOP` | `/public/images/home/hero-desktop.webp` | **P0** | Home hero right panel — desktop crop |
| `HOME-HERO-MOBILE` | `/public/images/home/hero-mobile.webp` | **P0** | Home hero — mobile crop (tighter) |
| `HOME-SECTION-THEMES` | `/public/images/home/section-themes-ornament.webp` | **P2** | Small decorative ornament beside Themes H2 |
| `HOME-SECTION-DIFFICULTY` | `/public/images/home/section-difficulty.webp` | **P2** | Small illustration above difficulty links |
| `HOME-ASIDE-LARGEPRINT` | `/public/images/home/aside-large-print.webp` | **P0** | Home aside promo image for large print |
| | **15 主题封面 + Themes index** | | |
| `THEME-HALLOWEEN` | `/public/images/themes/halloween.webp` | **P0** | Theme cover card image for Halloween |
| `THEME-FALL` | `/public/images/themes/fall.webp` | **P0** | Theme cover card image for Fall |
| `THEME-CHRISTMAS` | `/public/images/themes/christmas.webp` | **P0** | Theme cover card image for Christmas |
| `THEME-ANIMALS` | `/public/images/themes/animals.webp` | **P0** | Theme cover card image for Animals |
| `THEME-SPACE` | `/public/images/themes/space.webp` | **P1** | Theme cover card image for Space |
| `THEME-SPORTS` | `/public/images/themes/sports.webp` | **P1** | Theme cover card image for Sports |
| `THEME-FOOD` | `/public/images/themes/food.webp` | **P1** | Theme cover card image for Food |
| `THEME-OCEAN` | `/public/images/themes/ocean.webp` | **P0** | Theme cover card image for Ocean |
| `THEME-DOGS` | `/public/images/themes/dogs.webp` | **P1** | Theme cover card image for Dogs |
| `THEME-CATS` | `/public/images/themes/cats.webp` | **P1** | Theme cover card image for Cats |
| `THEME-TRAVEL` | `/public/images/themes/travel.webp` | **P1** | Theme cover card image for Travel |
| `THEME-MUSIC` | `/public/images/themes/music.webp` | **P1** | Theme cover card image for Music |
| `THEME-GARDEN` | `/public/images/themes/garden.webp` | **P0** | Theme cover card image for Garden |
| `THEME-LARGE_PRINT_PACK` | `/public/images/themes/large-print-pack.webp` | **P0** | Theme cover card image for Large Print Pack |
| `THEME-HARD_PACK` | `/public/images/themes/hard-pack.webp` | **P0** | Theme cover card image for Hard Pack |
| `THEMES-INDEX-BANNER` | `/public/images/themes/_index-banner.webp` | **P2** | Themes index page header illustration |
| | **难度 Difficulty** | | |
| `DIFF-EASY` | `/public/images/difficulty/easy.webp` | **P1** | Difficulty landing illustration — easy |
| `DIFF-BADGE-EASY` | `/public/images/difficulty/badge-easy.png` | **P2** | Small badge icon for easy |
| `DIFF-MEDIUM` | `/public/images/difficulty/medium.webp` | **P1** | Difficulty landing illustration — medium |
| `DIFF-BADGE-MEDIUM` | `/public/images/difficulty/badge-medium.png` | **P2** | Small badge icon for medium |
| `DIFF-HARD` | `/public/images/difficulty/hard.webp` | **P1** | Difficulty landing illustration — hard |
| `DIFF-BADGE-HARD` | `/public/images/difficulty/badge-hard.png` | **P2** | Small badge icon for hard |
| | **Large print** | | |
| `LG-PROMO` | `/public/images/large-print/promo-hero.webp` | **P0** | Large print landing hero |
| `LG-SPOT` | `/public/images/large-print/comfort-spot.webp` | **P2** | Secondary comfort illustration |
| | **Daily** | | |
| `DAILY-HEADER` | `/public/images/daily/header.webp` | **P1** | Daily puzzle header illustration |
| `DAILY-ARCHIVE-EMPTY` | `/public/images/daily/archive-empty.webp` | **P2** | Empty past-archive illustration |
| | **How to play** | | |
| `HOWTO-BANNER` | `/public/images/how-to/banner.webp` | **P0** | How-to page wide banner |
| `HOWTO-STEP-01` | `/public/images/how-to/step-01-pick.webp` | **P1** | How-to step illustration: Pick a puzzle |
| `HOWTO-STEP-02` | `/public/images/how-to/step-02-wordlist.webp` | **P1** | How-to step illustration: Read the word list |
| `HOWTO-STEP-03` | `/public/images/how-to/step-03-select.webp` | **P1** | How-to step illustration: Select a word |
| `HOWTO-STEP-04` | `/public/images/how-to/step-04-finish.webp` | **P1** | How-to step illustration: Finish at your pace |
| | **Adults** | | |
| `ADULTS-HERO` | `/public/images/adults/hero.webp` | **P0** | Adults landing hero |
| `ADULTS-SPOT-NO-TIMER` | `/public/images/adults/spot-no-timer.webp` | **P2** | Spot art reinforcing no-timer calm |
| | **About / Contact / Legal** | | |
| `ABOUT-SPOT` | `/public/images/about/spot.webp` | **P1** | About page spot illustration |
| `CONTACT-SPOT` | `/public/images/contact/spot.webp` | **P2** | Contact page spot |
| `LEGAL-SPOT` | `/public/images/legal/spot-ornament.webp` | **P2** | Shared small ornament for legal pages |
| | **404 / Empty / Loading** | | |
| `ERR-404` | `/public/images/system/404.webp` | **P1** | 404 illustration |
| `SYS-EMPTY` | `/public/images/system/empty-state.webp` | **P2** | Generic empty state |
| `SYS-LOADING` | `/public/images/system/loading.webp` | **P2** | Loading indicator art (static) |
| | **Puzzle complete** | | |
| `PUZZLE-COMPLETE` | `/public/images/puzzle/complete.webp` | **P1** | Celebration art when all words found |
| `PUZZLE-COMPLETE-COMPACT` | `/public/images/puzzle/complete-compact.png` | **P2** | Compact completion mark |
| | **Textures / Ornaments** | | |
| `TEX-PAPER` | `/public/images/textures/paper-grain.webp` | **P0** | Seamless paper grain texture tile |
| `TEX-PAPER-DEEP` | `/public/images/textures/paper-deep.webp` | **P1** | Slightly deeper paper tile for cards |
| `DIV-RULE` | `/public/images/ornaments/divider-rule.png` | **P2** | Hand-drawn horizontal divider |
| `DIV-FLOURISH` | `/public/images/ornaments/flourish.png` | **P2** | Small flourish ornament |
| `ORN-CORNER` | `/public/images/ornaments/corner.png` | **P2** | Corner ornament for puzzle board |
| | **Print / CTA / Ads** | | |
| `PRINT-HEADER` | `/public/images/print/header-ornament.png` | **P2** | Printable page header ornament |
| `CTA-NEWSLETTER` | `/public/images/cta/newsletter.webp` | **P2** | Newsletter / return-tomorrow CTA art |
| `AD-SPACER` | `/public/images/ads/neutral-spacer.webp` | **P2** | Neutral decorative spacer near ads — never look like an ad |

### 15 个主题 slug（与仓库一致）

| slug | name | Cover file |
|---|---|---|
| `halloween` | Halloween | `/public/images/themes/halloween.webp` |
| `fall` | Fall | `/public/images/themes/fall.webp` |
| `christmas` | Christmas | `/public/images/themes/christmas.webp` |
| `animals` | Animals | `/public/images/themes/animals.webp` |
| `space` | Space | `/public/images/themes/space.webp` |
| `sports` | Sports | `/public/images/themes/sports.webp` |
| `food` | Food | `/public/images/themes/food.webp` |
| `ocean` | Ocean | `/public/images/themes/ocean.webp` |
| `dogs` | Dogs | `/public/images/themes/dogs.webp` |
| `cats` | Cats | `/public/images/themes/cats.webp` |
| `travel` | Travel | `/public/images/themes/travel.webp` |
| `music` | Music | `/public/images/themes/music.webp` |
| `garden` | Garden | `/public/images/themes/garden.webp` |
| `large-print-pack` | Large Print Pack | `/public/images/themes/large-print-pack.webp` |
| `hard-pack` | Hard Pack | `/public/images/themes/hard-pack.webp` |

---

## 4) 交付规格

### 命名与目录

```
public/images/
  brand/          # favicon, logo, header mark
  og/              # 1200×630 social
  home/
  themes/          # {slug}.webp ×15 + _index-banner
  difficulty/
  large-print/
  daily/
  how-to/
  adults/
  about/ contact/ legal/
  system/          # 404, empty, loading
  puzzle/
  textures/
  ornaments/
  print/
  cta/
  ads/
```

文件名必须与 CSV `filename` 列完全一致（便于后续改 `lib/images.ts`）。

### 尺寸 / 格式 / 体积目标

| 类型 | 格式 | 体积目标 | 色彩 |
|---|---|---|---|
| 照片级插画 hero/theme | WebP q80–85 | 单张 ≤180KB（主题卡），hero ≤250KB | sRGB |
| OG 1200×630 | PNG 或 WebP | ≤300KB | sRGB |
| 透明图标/徽章/装饰 | PNG-24 | ≤80KB | sRGB + alpha |
| Favicon | PNG | 尽量小 | sRGB |
| 纸纹 tile 512 | WebP | ≤40KB | sRGB |
| Logo 主文件 | PNG + **建议另交 SVG** | — | — |

- **Retina**：标了 `retina_2x=yes` 的，按表内像素交付（已是 2× 逻辑尺寸）。
- **不要**在图里烧录长标题；OG 可留空给 HTML overlay。
- 所有图 **sRGB**，无嵌入奇怪 ICC。

### 如何放进仓库（图像 agent 做完后）

1. 按 CSV 路径写入 `words-at-rest/public/images/...`（可先放 `design/exports/` 再复制）。
2. 不要覆盖本 brief；可删除或归档旧 Unsplash：`hero-cafe.jpg` 等（接线时再删）。
3. 更新 `public/images/ATTRIBUTION.md`：改为「原创生成插画 / 品牌资产」，去掉 Unsplash 声明。

### 接线时会改到的代码文件（本任务不改代码，仅标注）

| 文件 | 用途 |
|---|---|
| `lib/images.ts` | 集中路径；`themeImage()` 改为 15 slug → `/images/themes/{slug}.webp` |
| `app/page.tsx` | hero、aside large-print、可选 section 装饰 |
| `components/ThemeCard.tsx` | 主题封面；可减弱黑渐变 |
| `app/how-to-play/page.tsx` | banner + 4 step 图 |
| `app/adults/page.tsx` | hero |
| `app/large-print/page.tsx` | hero |
| `app/not-found.tsx` | 404 图 |
| `app/daily/page.tsx`, `daily/[date]/page.tsx` | header |
| `app/difficulty/[level]/page.tsx` | 难度头图 |
| `app/themes/page.tsx`, `themes/[theme]/page.tsx` | banner / hub 图；metadata OG |
| `app/about/page.tsx`, `contact/page.tsx`, `privacy/page.tsx`, `terms/page.tsx` | spot |
| `components/PuzzleGrid.tsx` | complete 插画 |
| `components/SiteHeader.tsx` | header mark + 可选 wordmark |
| `app/layout.tsx` | icons、default OG |
| `app/globals.css` | `paper-grain` → 新 tile |
| `app/icon.svg` | 可保留或改为引用 PNG |

---

## 5) 给图像生成 Agent 的一键派工提示（先 P0）

把下面整段复制给图像 agent：

```
You are the image-generation agent for Words at Rest (wordsatrest.com),
a calm adult/senior word-search site. Read and obey:
  /workspace/words-at-rest/design/IMAGE-BRIEF.md
  /workspace/words-at-rest/design/image-manifest.csv

Art direction (mandatory): Warm Editorial Gouache + Soft Risograph on cream paper.
Palette: #F4EFE6 #EBE4D6 #2C241B #5C5348 #6B4F3A #3D5A45 #E8C99B.
No readable text in images (except brand lockup / single W monogram).
No real faces, no kids/cartoon/Disney/IP, no glossy 3D, no purple gradients,
no sparkles/confetti trophies, no stock-photo look.

Use each row's english_prompt + the shared negative_prompt from the CSV.
Export files EXACTLY to the filename paths under the repo (create folders).
sRGB. Respect size_px, format, transparent_bg, retina notes.
Compression targets in IMAGE-BRIEF §4.

BATCH ORDER — do ALL P0 rows first (complete the set before P1):
  ICO-16, ICO-32, ICO-180, LOGO-MARK, LOGO-LOCKUP, HEADER-MARK-INLINE,
  OG-DEFAULT, HOME-HERO-DESKTOP, HOME-HERO-MOBILE, HOME-ASIDE-LARGEPRINT,
  THEME-HALLOWEEN, THEME-FALL, THEME-CHRISTMAS, THEME-ANIMALS,
  THEME-OCEAN, THEME-GARDEN, THEME-LARGE_PRINT_PACK, THEME-HARD_PACK,
  LG-PROMO, HOWTO-BANNER, ADULTS-HERO, TEX-PAPER
Then all remaining P1, then P2.
For the 15 themes, slug filenames must match the repo exactly.
When done, list exported paths + any rows you skipped.
Do not edit application source code (.tsx/.css) or deploy.
```

---

## 附：当前线上/仓库图像对照（将被替换）

| 现文件 | 被谁复用 | 替换为 |
|---|---|---|
| `hero-cafe.jpg` | Home hero | `home/hero-desktop.webp` + mobile |
| `large-print-glasses.jpg` | Home aside + `/large-print` | `home/aside-large-print.webp` + `large-print/promo-hero.webp` |
| `how-to-paper.jpg` | `/how-to-play` | `how-to/banner.webp` |
| `adults-reading.jpg` | `/adults` | `adults/hero.webp` |
| `empty-desk.jpg` | 404 | `system/404.webp` |
| `theme-autumn.jpg` | halloween + fall | `themes/halloween.webp`, `themes/fall.webp` |
| `theme-cozy.jpg` | christmas + dogs + cats | 各自主题 webp |
| `theme-coffee.jpg` | sports + food | 各自 |
| `theme-garden.jpg` | animals + garden | 各自 |
| `theme-letters.jpg` | space + music + hard-pack | 各自 |
| `theme-ocean.jpg` | ocean + travel | 各自 |
| `paper-grain.svg` | body bg | `textures/paper-grain.webp` (+ 可保留 svg 兜底) |
| `app/icon.svg` | favicon | brand PNG set |

— End of brief. Manifest rows: **82**. CSV: `design/image-manifest.csv`.