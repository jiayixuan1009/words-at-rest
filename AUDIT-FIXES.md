# SEO / GEO / AEO 审计修复记录（2026-10-06）

对应审计报告：`/workspace/reports/wordsatrest-seo-geo-aeo-full-2026-10-06.md`（12/30）。

## 已在代码中修复

| # | 问题 | 修复 | 位置 |
|---|---|---|---|
| 1 | 全站无 `og:image`，Twitter 为 `summary` | 生成 1200×630 品牌社交卡（纸色 + 字母格 + 现有照片，无人像）：默认、Daily、Large Print、How to Play、Adults、3 个难度、15 个主题；每页 `og:image` + `twitter:summary_large_image`；puzzle 用所属主题卡 | `scripts/generate-og.mjs` → `public/og/`；`lib/seo.ts` `seo()` |
| 2 | 无 Organization schema | 根 layout 输出 Organization（name/url/logo PNG/email/contactPoint/founder）；`sameAs` 为空则不输出 | `app/layout.tsx`、`lib/seo.ts`、`public/logo.png` |
| 3 | E-E-A-T 弱 | About 扩写：具名编辑 Reggie J、站点由来、谜题制作方式、原则、更正流程；Person schema；`<meta name="author">`；内容页可见署名 + 更新日期；WebPage/CollectionPage schema 带 author/publisher/dateModified | `app/about/page.tsx`、`components/Byline.tsx`、`components/HubSchema.tsx` |
| 4 | 无 FAQ / FAQPage | `/how-to-play`、`/large-print`、`/adults`、`/daily` 各 5 条真实问答 + FAQPage JSON-LD；问句式 H2 | `components/Faq.tsx` |
| 5 | 无定义块 / 对比表 | “What is a word search?” 定义块（how-to-play + 首页）；难度对比表（首页、how-to-play、3 个难度页），数值与生成器一致 | `components/DifficultyTable.tsx` |
| 6 | puzzle meta 模板化、标题超长 | 每题描述含本题最长 3 个词 + 剩余词数 + 网格 + 方向；标题全部 ≤60（超长时去掉 “— Play Free”） | `lib/puzzle-seo.ts` |
| 7 | 主题卡 `alt=""` | 主题卡与主题页大图 alt = 主题名 + 照片真实描述；同时修正了与图片不符的旧 alt | `lib/images.ts` |
| 8 | 枢纽页单薄 | 首页 / About / Adults / Large Print / How to Play / Themes / 难度页 / 15 个主题页扩写（主题页每个有独立的词汇说明、适合人群、解题提示 + 完整词库） | `lib/theme-content.ts` 等 |
| 9 | 404 标题复用首页 | `Page not found \| Words at Rest`，noindex | `app/not-found.tsx` |
| 10 | Daily H1 含 “(preview)” | 去掉 preview：`currentDailyDate()` = max(今天 UTC, DAILY_START)。轮换仍按 **UTC 午夜**（全球同一题、日期 URL 永不漂移）；上线当天 UTC 晚于上海的 8 小时内直接显示上线日谜题。dated URL 从 DAILY_START 起进 sitemap | `lib/data.ts`、`app/daily/*`、`app/sitemap.ts` |
| 11 | 无 `/llms.txt` | 新增站点摘要（事实、难度参数、主要页面） | `public/llms.txt` |
| 12 | `/ads.txt` 404 | **未上线假文件**（无真实 pub ID）；模板放在 `docs/ads.txt.example` | 见下方“需要你” |
| 13 | WebSite 无 SearchAction | 站内无搜索 → 不加 SearchAction；WebSite 增加 `@id` + publisher 关联 Organization | `app/page.tsx` |
| 14 | Contact 弱 | 新标题/描述、ContactPage schema、编辑署名、补充说明 | `app/contact/page.tsx` |
| 15 | 无 Speakable | `/how-to-play` WebPage 带 SpeakableSpecification（`#definition`、`.faq-answer`） | `components/HubSchema.tsx` |
| 16 | 无可见更新时间 | 内容页署名行 “By Reggie J · Updated October 6, 2026”（改 `SITE.contentUpdated` 即可） | `lib/site.ts` |
| + | 其他 | `/.well-known/security.txt`、`apple-touch-icon.png`、puzzle 页 “About this puzzle” 段落 + 主题提示、Game schema 补 image/author/publisher、主题页 ItemList | — |

图片调整：原 `large-print-glasses.jpg` 实为一张图库人像笑脸、`adults-reading.jpg` 是带商业书名的书脊，均与 alt 和品牌不符，已改用现有的书页 / 书桌照片（临时，等新美术方案的图）。

## 仍需要你（无法在代码里代办）

1. **Google Search Console**：DNS TXT 验证 + 提交 `https://wordsatrest.com/sitemap.xml`（步骤见 `NEXT-STEPS-GSC-EMAIL.md`）。
2. **GA4**：创建媒体资源后把 Measurement ID（`G-…`）给我，设为构建变量 `NEXT_PUBLIC_GA_ID` 再部署。
3. **AdSense / ads.txt**：AdSense 批准后，把后台给的那一行（`google.com, pub-你的ID, DIRECT, f08c47fec0942fa0`）放进 `public/ads.txt` 再部署。现在不放假的 pub ID。
4. **社交账号 sameAs**：有真实的 X / Pinterest / Facebook 等主页后，把 URL 填入 `lib/site.ts` 的 `SITE.sameAs`。
5. **编辑简介**：About 页的 Reggie J 简介是保守的通用写法，需要你确认或补充真实经历（不要写没有的资历）。改 `lib/site.ts` 的 `editor` 和 `app/about/page.tsx`。
6. **邮箱**：`hello@wordsatrest.com` 仍需启用 Cloudflare Email Routing（Organization/ContactPage 已引用此邮箱）。
7. **最终美术**：社交卡和页面配图都是临时的，等 `design/IMAGE-BRIEF.md` 的图交回后重跑 `node scripts/generate-og.mjs`（或直接替换 `public/og/*`）。

## 重新生成社交卡

```bash
node scripts/generate-og.mjs   # 需要 node_modules 里的 sharp
```
