# 更新日志（Changelog）

本文件格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。日期为 commit 时间（Asia/Shanghai，UTC+8）。  
项目尚未打版本号，按日期 + commit 记录。完整产品说明 `docs/PRODUCT.md` 与后续计划 `docs/ROADMAP.md` 目前在分支 `subthemes-wave1`（`86de8e3`），尚未合入 master。

规模速查（主题 / 谜题）：`95609a5` 3 / 7 → `31aaf1b` 15 / 40 → `c46b10c` 16 / 46（当前线上 master）→ `0b358cc` 20 / 70 → `6ddb57c` 32 / 142。

---

## [未发布 Unreleased]

### 新增 — 子主题 Wave 1（分支 `subthemes-wave1`，未推送、未部署）
- `6ddb57c`（2026-10-06 13:04）Sports / Food / Music 拆出 12 个扁平子主题，每个 6 题：golf、baseball、tennis、fishing；baking、desserts、herbs、fruits；instruments、jazz、classical、music-terms。
  - Theme 新增可选 `parentSlug`；父主题页加 "Explore …" 子主题卡片；面包屑 `Themes → 父 → 子`。
  - 封面 / OG 暂用父主题图；出图需求 `design/SUBTHEME-IMAGE-REQUEST.md`；规划 `design/THEME-EXPANSION-PLAN.md` §15。
- `a613061`（2026-10-06 13:04）从子主题提交中移除误纳入的难度图文档（当时属于并行工作）。
- `86de8e3` 文档：`docs/PRODUCT.md`、`docs/ROADMAP.md`、`docs/README.md`、`CHANGELOG.md`；补入 `design/STRUCTURED-DATA-PLAN.md`、`design/DIFFICULTY-IMAGE-REQUEST.md`、`design/difficulty-image-manifest.csv`。

### 新增 — 节日 Wave 1（分支 `holidays-wave1`，未推送、未部署）
- `0b358cc`（2026-10-06 12:58）Thanksgiving、Winter、Valentine's Day、Easter 四个主题，每个 6 题（Bible 模板）；新增 `/holidays` 汇总页；接入顶部导航、页脚、sitemap、`llms.txt`。
  - 封面 / OG 暂借旧图（thanksgiving←fall、winter←christmas、valentines←food、easter←garden）；出图需求 `design/HOLIDAY-IMAGE-REQUEST.md`。
  - 新增规划 `design/THEME-EXPANSION-PLAN.md`。

---

## 2026-10-06 — master（已推送 origin/master）

### 新增 — 难度递进图（difficulty images，2026-10-06 晚间部署）
- `981b479`（19:30）
  - 16 个已上线主题各接入 Easy / Medium / Hard 三张同系列插画 `public/images/themes/<slug>-<easy|medium|hard>.webp`（1200×900），由 `scripts/derive-images.mjs` 派生 640w 和新增的 320w 缩略图。
  - 规则：`lib/images.ts` `puzzleArt()` — 主题在 `DIFFICULTY_ART_THEMES` 中则用难度图，否则回退主题封面；大字谜题复用 easy 图（按 `design/difficulty-image-manifest.csv`）。
  - 显示位置：谜题列表卡片（主题页、`/difficulty/*`、相关谜题、首页、大字页）桌面端 112px 缩略图；谜题页网格下方 "About this puzzle" 配图。手机端均隐藏 + 懒加载，不下载；无跨路由预加载；首屏 LCP 图不变。
  - JSON-LD：Game `image` 首项为难度图（ImageObject 1200×900），其后为 OG 卡。
  - 新增 `scripts/check-images.mjs`：校验名单内每主题 3 难度 × 3 尺寸齐全、无未使用图。
  - 节日主题（easter、thanksgiving、valentines、winter）原图暂存 `design/pending-difficulty/`，随 `holidays-wave1` 上线。

### 新增 — 信任元素（trust signals，2026-10-06 晚间部署）
- `02ab749`（15:08）
  - 事实条 `Free · No sign-up · No timer · Original word lists · Progress stays on your device`：全站页脚 + 谜题页网格下方（`components/TrustFacts.tsx`，inline SVG 图标）。每条均已对照代码核实；刻意不写 "ad-free"（AdSense 计划中）和 "no tracking"（GA4 已开）。
  - About：新增 "How we make our puzzles"（编辑撰写审核、美式拼写、难度规则从已发布谜题数据读取、纠错流程）与 "Our promises"（永不需要账号、谜题保持免费、不出售个人信息、进度只存本地、无倒计时且广告不遮挡谜题、错误会修正并更新日期）。两条长期承诺已经用户确认。
  - `/privacy` 顶部 "Privacy in plain English" 摘要框，链接到下方带锚点的章节。
  - 新页面 `/accessibility`：以 WCAG 2.2 AA 为目标，按实测写明大字、缩放、对比度、键盘、屏幕阅读器、触控目标与已知问题（网格暂不支持键盘选词等）；已接入页脚、sitemap、`llms.txt`，WebPage schema 带作者与日期。
  - 谜题按钮与页脚链接触控高度 ≥ 40px；网站文案英式拼写统一改为美式。

### 新增 / 修复 — GA4 与手机导航
- `bf63c6f`（15:02）GA4 默认开启（`SITE.gaId` = `G-QQWT6H8H2S`，env `NEXT_PUBLIC_GA_ID` 可覆盖，`off` 关闭），每页一个 gtag、afterInteractive、`anonymize_ip`；隐私页改为 "We use Google Analytics 4"。EEA/UK Consent Mode 尚未接入。手机（< 640px）顶部导航单独一行、两端对齐，"Large Print" 不再被截断；桌面不变。
- `bb6ad60`（14:46）404 页恢复导航改为醒目按钮（Play today's puzzle 主按钮 + Browse themes / Large print + 热门主题标签），仍返回 404 且 noindex。

### 新增 — SEO 结构化数据、作者身份、手机提速
- `f4ca360`（14:18）Reggie J 的 X（https://x.com/0xReggieJ）加入 Person.sameAs，About 页加 `rel="me"` 链接与 `twitter:creator`。
- `eee78b4`（13:53）手机提速：不再跨路由预加载图片、手机不加载装饰图、主题封面 640w 小图、纯 CSS "Read more" 折叠、静态资源缓存头。首页手机传输量 1247KB → 667KB。
- `a95af63`（13:09）全站 Person 作者 + 由 git 提交时间生成的 `datePublished` / `dateModified`（只有内容改动的页面才更新日期）+ sameAs 配置 + 指南页引用来源（NIA、Alzheimer's Society、ACB、WCAG）；语言统一 `en-US`；FAQ 折叠；网格标记精简。
- `2036c45`（13:06）`generateMetadata` 路由按请求渲染，title / canonical / OG 始终在 `<head>`；移除 proxy。

### 修复
- `c6fd050`（13:04）SSR / 爬虫：`generateMetadata()` 路由（主题、谜题、难度、Daily 日期页）的 title / description / canonical / OG 始终输出在 `<head>`，不再出现在 body 末尾等 JS 搬运；无 UA 请求给中性 UA，避免污染 ISR 缓存；404 插图不再在每页被高优先级预加载；PuzzleGrid 补齐 grid › row › gridcell ARIA 结构（布局不变）。线上抽查（13:07）主题页 `<title>` 已在 `<head>` 内；git 中没有部署记录。

### 变更
- `5dacf8f`（12:47）Bible 换上专属手绘封面（旧圣经、橄榄枝、陶油灯、麦穗），大图和 640 小图同步替换，并用新底图重做 OG 卡。
- `1f4ae12`（12:26）手机首页首屏：今日谜题卡在前，hero 在后；chips 可横滑；头部导航紧凑化；桌面双栏不变。

### 新增
- `c46b10c`（10:31）Bible 主题，6 道题（新旧约书卷、人物、地名、美德），尊重、非宗派；hub SEO、chips、OG、出图需求 `design/BIBLE-IMAGE-REQUEST.md`。
- `c550038`（09:49）接入 **82 张手作插画**（Warm Editorial Gouache + Soft Risograph，P0 22 / P1 30 / P2 30）；首页改为 Daily Launcher（当天真实网格预览，第一个单词高亮）；新品牌图标 + `site.webmanifest`；OG 卡改为无字手绘底图叠标题；移除全部 Unsplash 照片；新增 `components/Picture.tsx`、`scripts/derive-images.mjs`、`design/IMAGE-BRIEF.md`、`design/asset-manifest.csv`、`design/image-manifest.csv`。

### 修复 — SEO / GEO / AEO 审计（审计报告 12/30）
- `c3d2494`（01:47）OG 卡（1200×630）与 `summary_large_image`；Organization / Person / FAQPage / ContactPage schema；About 扩写（编辑 Reggie J）与可见署名；谜题页 meta 唯一化；主题图 alt；hub 扩写；Daily 去掉 "preview"；`/llms.txt`、`/.well-known/security.txt`、`apple-touch-icon`；`docs/ads.txt.example`。详见 `AUDIT-FIXES.md`。
- `c3a8d63`（01:48）谜题 meta：topic 去掉 pack 名，避免 "hard hard pack"。
- `2fc00c8`（01:48）谜题 meta：避免 description 被截断。

### 新增 — 独立上线准备
- `485f506`（01:15）基于 Cloudflare API 只读核对重写 `NEXT-STEPS-GSC-EMAIL.md`（GSC DNS TXT、Email Routing）；Privacy / Terms 扩写（AdSense 就绪）；`DAILY_START` 默认 2026-10-06；引擎加固（意外拼词清理 + 校验）与选词改进；GA4 与 Cookie Consent stub（由 `NEXT_PUBLIC_*` 控制，无真实 ID）。

### 新增 — 内容扩充与 Cloudflare 上线配置
- `31aaf1b`（00:48）扩到 15 主题 / 40 题；café-magazine 风格 UI（纸色、印刷感网格）；www → 裸域文档；GSC / `hello@` 邮箱文档。
- Cloudflare：Worker `words-at-rest` 承载 `wordsatrest.com` 与 `www`（Custom Domain，www → 裸域 301），据 `NEXT-STEPS-GSC-EMAIL.md` 与审计报告在 2026-10-06 已生效；此项为账户配置，没有对应 commit。

### 新增 — 初始脚手架
- `95609a5`（00:33）Week-1 脚手架：`create-vinext-app --platform cloudflare`（vinext 1.0.1、Vite 8、Cloudflare Workers）；全部路由 SSR；交互网格（拖动 / 点首尾、本地进度、大字切换）；3 主题 / 7 题样例；Privacy / Terms / About / Contact 等英文草稿；README / HANDOFF。
