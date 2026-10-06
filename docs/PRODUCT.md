# Words at Rest — 产品设计文档（PRODUCT）

> **站点：** https://wordsatrest.com  
> **仓库：** GitHub `jiayixuan1009/words-at-rest`（本地 `/workspace/words-at-rest`）  
> **负责人 / 编辑：** Reggie J  
> **文档日期：** 2026-10-06（Asia/Shanghai）  
> **依据：** 对话决策 + `git log --all` + `design/*.md`、`AUDIT-FIXES.md`、`NEXT-STEPS-GSC-EMAIL.md`、审计报告 `wordsatrest-seo-geo-aeo-full-2026-10-06`。  
> 本文只记录已发生或已决定的事实；未决事项见 [`ROADMAP.md`](./ROADMAP.md)，版本记录见 [`../CHANGELOG.md`](../CHANGELOG.md)。

---

## 1. 产品定位

**一句话：** 面向成人、长者、大字需求与"想放松一下"玩家的免费英文 Word Search（找词）站，浏览器直接玩，无下载、无账号、无计时。

| 维度 | 决定 |
|---|---|
| 语言 / 市场 | 英文内容，美国英语（en-US）为准，主要面向美国用户 |
| 受众 | Adults、Seniors、Large-print / low-vision、休闲放松型玩家 |
| **不做** | **不做 kids-first**（不面向 13 岁以下、不做年级/课堂题）；不做竞速、排行、强制计时 |
| 商业模式 | SEO 自然流量 + Google AdSense 广告（广告不得遮挡谜题） |
| **No-IP 规则** | 词表、标题、URL、图片**不使用**影视/品牌/商标 IP（角色名、剧名、球队名、艺人名、logo）。流行文化只用泛称（见 §4.4、§11） |
| 健康声明 | 不做医疗 / "脑力训练"功效承诺（`public/llms.txt` 已写明） |
| 气质 | 安静、温暖、编辑感（独立杂志 / 成人益智书），不是游戏化、不是儿童卡通 |

## 2. 目标用户

| 人群 | 需求 | 我们的回应 |
|---|---|---|
| 50+ / 长者 | 字大、操作简单、不催促 | Large Print 9×9、点首尾字母选词、无计时、进度本地保存 |
| 低视力 / 平板手机用户 | 可读性 | 大字切换、高对比纸色、移动端优先布局 |
| 每天来一题的习惯玩家 | 固定入口、每天不同 | Daily：全球同一题，UTC 00:00 轮换，带日期归档 |
| 主题 / 季节玩家 | 节日、信仰、兴趣题材 | 季节 / 常青 / 子主题 / 节日枢纽 |
| 打印 / 熟练玩家 | 更难、更大 | Hard（15×15，八方向含反向）、Hard Pack |

## 3. 核心体验

### 3.1 首页 = Daily Launcher
- 首屏即"今天的谜题"：`components/DailyLauncher.tsx` 用**当天真实网格**生成预览卡，整卡链接到 `/daily`。
- **预览卡保留第一个单词的高亮**（提示"这就是玩法"）——已决定保留（见 §12）。
- 手机端（`1f4ae12`）：标题 → Daily 预览网格 + Play 按钮 → 可横滑的难度/主题 chips → 懒加载的简短 hero；桌面保持双栏。

### 3.2 难度与网格（数值与生成器一致，来源 `components/DifficultyTable.tsx`）

| 难度 | 网格 | 词数 | 方向 | 适合 |
|---|---|---|---|---|
| Easy | 10×10 | 10 | 横、竖（仅正向） | 热身、新手、眼睛累的时候 |
| Medium | 12×12 | 14 | 横、竖、斜（无反向） | 常规玩家 |
| Hard | 15×15 | 18 | 全部 8 个方向，含反向 | 熟练玩家 |
| Large print | 9×9 | 8 | 横、竖，超大字母 | 长者、低视力、手机平板 |

每个新主题按 **Bible 模板 6 题**：`easy-01`、`easy-02`、`medium-01`、`medium-02`、`hard-01`、`large-01`（每个主题**必须**带一道 large print）。

### 3.3 玩法与状态
- 选词：拖动划过整词，或先点首字母再点尾字母。
- 进度：`localStorage` 本地保存，刷新不丢；无账号。
- 大字切换：每道题都可开。
- **无计时**：这是相对 AARP 等竞品的差异化卖点。
- 完成态：柔和提示，不做礼花 / 奖杯 / "YOU WIN" 式游戏化。

### 3.4 Daily
- 全球同一题，按 **UTC 午夜**轮换（日期 URL 永不漂移）；`currentDailyDate() = max(今天 UTC, DAILY_START)`。
- `DAILY_START` 默认 `2026-10-06`；之前的日期 404 且不进 sitemap。
- 归档：`/daily/YYYY-MM-DD`。当前为日期哈希轮换（非 Large Print 题池）；题量足够后计划改为提交 `data/daily.json` 固定排期。

### 3.5 谜题引擎与数据
- `lib/engine.ts`：自写确定性放置算法（mulberry32 种子），`485f506` 加固了"意外拼出词"清理与校验。
- 谜题预生成为 JSON 入库（`data/puzzles/*.json`），保证 SSR 输出稳定。**已上线谜题不要改 seed**。
- 加主题流程：`data/themes/<slug>.json` → 注册 `data/themes/index.ts` → `scripts/generate-puzzles.ts` 加规格 → `npm run generate`。

## 4. 信息架构与 URL 地图

### 4.1 现有路由

| URL | 说明 |
|---|---|
| `/` | 首页（Daily Launcher、定义块、难度表、主题入口） |
| `/daily`、`/daily/[date]` | 今日题 + 日期归档 |
| `/themes` | 全部主题（Seasonal / Evergreen / Packs 分组文案） |
| `/themes/[theme]` | 主题 hub（介绍、词汇说明、适合人群、提示、完整词库、谜题列表；父主题额外有子主题卡片） |
| `/themes/[theme]/[slug]` | 谜题页，slug 形如 `halloween-easy-01` |
| `/difficulty/easy\|medium\|hard` | 难度 hub |
| `/large-print` | 大字落地页 |
| `/how-to-play` | 定义、步骤、难度表、FAQ |
| `/adults` | 成人定位落地页 |
| `/about`、`/contact`、`/privacy`、`/terms` | 信任与法务页 |
| `/holidays` | 节日枢纽（`holidays-wave1` 分支，**未上线**） |
| `/sitemap.xml`、`/robots.txt`、`/llms.txt`、`/.well-known/security.txt`、`/site.webmanifest` | 机器可读文件 |

### 4.2 主题清单（`subthemes-wave1` 分支状态：32 主题 / 142 题）

| 分组 | slug |
|---|---|
| Seasonal | `halloween`、`fall`、`christmas`；节日 Wave 1（未上线）：`thanksgiving`、`winter`、`valentines`、`easter` |
| Evergreen | `bible`、`animals`、`space`、`sports`、`food`、`ocean`、`dogs`、`cats`、`travel`、`music`、`garden` |
| 子主题（未上线） | sports → `golf`、`baseball`、`tennis`、`fishing`；food → `baking`、`desserts`、`herbs`、`fruits`；music → `instruments`、`jazz`、`classical`、`music-terms` |
| Packs | `large-print-pack`、`hard-pack` |

线上（master）为 16 主题 / 46 题；`holidays-wave1` 为 20 / 70；`subthemes-wave1` 为 32 / 142。

### 4.3 子主题：扁平 URL + `parentSlug`
- 子主题用 **扁平** URL：`/themes/golf`，**不用** `/themes/sports/golf`。原因：路由第二段已是谜题 slug，嵌套会冲突；`golf word search` 这种关键词形态更贴扁平 slug。
- 数据上在 theme JSON 加可选 `parentSlug`（`lib/types.ts`），`lib/data.ts#getChildThemes()` 取子主题；父 hub 渲染 "Explore …" 子卡片网格；面包屑 `Themes → Sports → Golf`；`/themes` 仍列出全部。

### 4.4 规划中的板块（详见 `design/THEME-EXPANSION-PLAN.md`）

| 板块 | 入口 | 状态 |
|---|---|---|
| 节日与季节 Holidays | `/holidays` | Wave 1 已在分支完成，待上线 |
| 地理 / 历史 / 科学 | `/geography`、`/history`、`/science`（或挂在 `/themes` 分组） | 规划：`us-states`、`world-capitals`、`landmarks`、`weather`、`human-body`、`birds`、`american-history`、`ancient-world`、`presidents` |
| 流行文化（泛称） | `/pop-culture` | 规划：`superheroes`、`sitcoms`、可选 `classic-tv`。**不做** `/themes/marvel` 这类商标 slug |
| 打印与长者 | 强化 `/large-print`、`/adults`，可选 `/printables` | 规划 |

## 5. 内容规则

- **词表：** 全部自写；只用通用名词、类型词、公有事实（如总统姓氏）。不用角色名、剧名、球队/联赛名、艺人名、品牌名。Bible 词表尊重、非宗派（书卷、人物、地名、美德）。Jazz / Classical 只用风格和乐理词。
- **文案语气：** 平静、成人、具体；不幼稚、不夸大、不做健康承诺；问句式 H2 + 直接回答（利于摘要）。
- **语言：** 美国英语 en-US（拼写、`<html lang>`、`og:locale`、JSON-LD `inLanguage` 统一，处理中，见 CHANGELOG）。
- **作者：** 所有内容页署名 **Reggie J**（Editor and publisher），可见署名行 "By Reggie J · Updated …"；简介只写真实信息，不编资历。
- **流行文化页（规划）：** 固定 "Not affiliated with…" 免责声明；FAQ 回答 "Are these official …? No"。
- **引用：** 只在指南页（How to Play、Large Print 等）引用 NIH、视障机构等正规来源，逐条核对原文，谜题页不硬塞引用（处理中）。

## 6. 视觉设计系统

### 6.1 艺术方向：Warm Editorial Gouache + Soft Risograph
像独立文学杂志内页 / 成人益智书封面：水粉厚涂 + 轻微套色错位，印在奶油纸上；安静、可触摸、偏 40+ 读者。详见 `design/IMAGE-BRIEF.md`。

| Token | Hex | 用途 |
|---|---|---|
| Paper | `#F4EFE6` | 主背景 |
| Paper deep | `#EBE4D6` | 卡片 |
| Ink | `#2C241B` | 主文字 |
| Ink soft | `#5C5348` | 次要文字 |
| Walnut | `#6B4F3A` / `#4A3426` | 强调 |
| Moss | `#3D5A45` / `#2F5D43` | Logo、链接、完成态 |
| Ochre highlight | `#E8C99B` | 选中高亮 |
| Found soft | `#D4E5D0` | 已找到的词 |
| Border | `#D4CBB8` | 线框 |

**硬性规则：** 图内无可读文字（品牌 lockup / W 图标除外）、无真实人脸、无儿童卡通、无 Disney/Marvel/IP、无霓虹渐变 / 3D / 礼花；每张 prompt 用同一 Style Lock + Global Negative。

### 6.2 图片规格

| 类型 | 规格 | 路径 |
|---|---|---|
| 主题封面 | 1200×900 WebP（4:3）+ `-640` 小图；底部约 20% 留给标题叠字 | `public/images/themes/{slug}.webp` |
| OG 底图 | 1200×630 PNG，**无字**；主体在左，右侧约 55–60% 空白奶油纸 | `design/og-base/og-theme-{slug}.png` |
| OG 成品 | 脚本叠标题后输出 JPG（约 40–80KB） | `public/og/…`、`public/og/themes/{slug}.jpg` |
| 难度递进图（规划） | 每主题 Easy / Medium / Hard 三张，1200×900 WebP + 640；固定机位、调色、桌面，只增加物件与丰满度；Large Print 复用 Easy | `public/images/themes/{slug}-{easy\|medium\|hard}.webp` |
| 响应式变体 | `-480/-640/-800/-960/-1200.webp` | `node scripts/derive-images.mjs` |

体积目标：主题卡 ≤180KB，hero ≤250KB，OG ≤300KB，sRGB。

### 6.3 回退（fallback）
- 新主题没出图前**借用相近旧图**：节日 Wave 1 中 thanksgiving→fall、winter→christmas、valentines→food、easter→garden（valentines 借 food 不太搭，已提专属出图需求）；12 个子主题暂用父主题图。
- 换图**只替换文件**，不改代码，然后重跑 `derive-images.mjs` + `generate-og.mjs`。
- 难度图（规划）：存在 `{slug}-{level}.webp` 就显示，否则回退主题封面，可分批交付。

### 6.4 已交付美术
- `c550038`：82 张手作插画全套（P0 22 / P1 30 / P2 30）、品牌图标与 webmanifest，移除全部 Unsplash 图片。
- `5dacf8f`：Bible 专属封面（旧圣经、橄榄枝、陶油灯、麦穗）+ OG 卡。

## 7. 移动端原则

1. **快：** 手机只加载小尺寸图（srcset）；首屏以下懒加载；仅 LCP 图 `priority`；装饰性图片在手机上不加载；不要把非首屏图预加载。
2. **简化靠"收起"，不靠"删除"：** 长文字（FAQ、词库、主题说明）在手机上默认折叠，用户点"展开"可看；相关谜题列表缩短；主要内容（谜题）放最前。
3. **同一份 HTML：** 用户、搜索引擎、AI 爬虫拿到**完全相同**的 HTML，全文与图片说明都在 HTML 里，仅用 CSS / `<details>` 控制展示。
4. **禁止 cloaking：** 不按 UA 给爬虫和用户不同内容（会被 Google 降权或移出索引，也影响 AdSense）。
5. 首屏：Daily 预览 + Play 按钮优先（`1f4ae12`）。

## 8. SEO / GEO / AEO 原则

- **SSR 内容：** 网格字母、词表、每日题、metadata 都应在初始 HTML 中，而不是 JS 运行后才出现（审计提示约 40% 内容依赖 JS；`c6fd050` 已让 metadata 稳定输出在 `<head>`，正文 SSR 处理中）。
- **结构化数据：** 目标为每页单个 `@graph`，稳定 `@id`（`#organization`、`#website`、`/about#editor`、`{url}#webpage`、`#breadcrumb`、`#game`、`/daily#series`…），节点用 `@id` 互指。规划见 `design/STRUCTURED-DATA-PLAN.md`（P0/P1/P2）。
- **不做：** 假评分 / 评论、未开通的 `sameAs`、`SearchAction`（已退役）、在非新闻页用 Speakable、把 FAQ 灌到每个谜题页。
- **作者与日期：** Person（Reggie J，url → About，sameAs）作为全站 author；`datePublished` / `dateModified`（处理中）。
- **sameAs：** 只填真实存在的主页；目前只有 GitHub 仓库可用，维基百科 / 维基数据没有条目，不编造。
- **引用：** 指南页引用权威来源（处理中）。
- **llms.txt：** `public/llms.txt` 写站点事实、难度参数、主要页面，需与页面和 JSON-LD 数字一致。
- **Sitemap：** `app/sitemap.ts` 自动包含主题、谜题、难度、Daily 日期页（从 `DAILY_START` 起）；`robots.txt` 允许抓取。
- **其他：** 每页唯一 title（≤60）/ description、self-canonical、BreadcrumbList、OG 1200×630 + `summary_large_image`、FAQ 可见内容与标记一致、www → 裸域 301。

## 9. 技术栈与部署

| 项 | 值 |
|---|---|
| 框架 | [vinext](https://github.com/cloudflare/vinext) 1.0.x（Next.js App Router API on Vite 8），React 19，TypeScript，Tailwind v4 |
| 运行 | **Cloudflare Workers**（Worker 名 `words-at-rest`，`cloudflare.config.ts`，`nodejs_compat`），不是 Pages、不是 OpenNext |
| 域名 | `wordsatrest.com`（Worker Custom Domain），`www` → 裸域 301 |
| 代码 | GitHub `jiayixuan1009/words-at-rest`，默认分支 `master` |
| Node | ≥ 22.18 |

常用命令：

```bash
npm install
npm run dev            # 本地开发（workerd）
npm run build          # 生产构建
npm run typecheck
npm run generate       # 重新生成谜题 JSON
node scripts/derive-images.mjs   # 生成响应式图片变体
node scripts/generate-og.mjs     # 用 design/og-base/ 无字底图叠标题 → public/og/*.jpg（需 sharp）
npm run deploy:dry-run # 只校验
npm run deploy         # = vinext-cloudflare deploy（构建 + 部署 Worker）
```

部署凭据通过环境变量提供（`CLOUDFLARE_ACCOUNT_ID`、`CLOUDFLARE_API_TOKEN`），**绝不提交到仓库**；见 `.env.example`。

## 10. 分析与变现（目前均为 stub）

| 项 | 现状 | 开启方式 |
|---|---|---|
| GA4 | `components/Analytics.tsx`，未设 ID 时不加载任何脚本 | 构建变量 `NEXT_PUBLIC_GA_ID=G-…` 后重新部署 |
| AdSense | `components/AdSlot.tsx` 只预留位置，不加载广告脚本；广告不遮挡谜题 | 审核通过后设 `ADSENSE_CLIENT`，并放 `public/ads.txt`（模板 `docs/ads.txt.example`，不放假 pub ID） |
| Cookie / Consent | `components/CookieConsent.tsx` stub | `NEXT_PUBLIC_COOKIE_CONSENT=1`；EEA/UK 个性化广告前启用 |
| 联系邮箱 | `hello@wordsatrest.com` 已被页面和 schema 引用 | 需启用 Cloudflare Email Routing（目前未启用） |

## 11. 决策记录（Decisions log）

> 日期均为 Asia/Shanghai；有 commit 的写 commit，没有 commit 的来自对话决策。

| 日期 | 决策 | 依据 / 位置 |
|---|---|---|
| 2026-10-06 | 定位成人 / 长者 / 大字 / 放松，不做 kids-first；词表不用任何影视 / 商标 IP | `95609a5` README |
| 2026-10-06 | 技术栈用 vinext + Cloudflare Workers（非 Pages / OpenNext）；域名迁到 Worker，www → 裸域 301 | `95609a5`、`31aaf1b` |
| 2026-10-06 | Daily 按 UTC 午夜轮换，`DAILY_START=2026-10-06`，Daily 标题去掉 "preview" | `485f506`、`c3d2494` |
| 2026-10-06 | 不加 SearchAction（站内无搜索）；`sameAs` 为空时不输出，不编造社交主页 | `c3d2494` |
| 2026-10-06 | 美术方向选 Warm Editorial Gouache + Soft Risograph，移除全部图库照片 | `c550038`、`design/IMAGE-BRIEF.md` |
| 2026-10-06 | 首页改为 Daily Launcher；**预览卡保留第一个单词的高亮** | `c550038`、对话决策 |
| 2026-10-06 | 手机首屏：今日谜题卡在前，hero 在后 | `1f4ae12` |
| 2026-10-06 | Bible 主题上线，尊重、非宗派词表 | `c46b10c`、`5dacf8f` |
| 2026-10-06 | 主题扩展顺序：节日 → 地理/科学等常青 → 流行文化泛称；先做风险最低的 | `design/THEME-EXPANSION-PLAN.md`、对话决策 |
| 2026-10-06 | 流行文化只用泛称（Superheroes、Sitcoms、Classic TV），不做 Marvel / Friends / The Office 命名页 | 同上 |
| 2026-10-06 | 节日 Wave 1 锁定 Thanksgiving、Winter、Valentine's、Easter + `/holidays` hub；没出图前借用旧图 | `0b358cc` |
| 2026-10-06 | 子主题用扁平 URL + `parentSlug`，Wave 1 共 12 个 | `6ddb57c`、THEME-EXPANSION-PLAN §15 |
| 2026-10-06 | 难度递进图：每主题 3 张，同机位逐级丰富，Large Print 复用 Easy，缺图回退主题封面 | `design/DIFFICULTY-IMAGE-REQUEST.md` |
| 2026-10-06 | 移动端简化靠折叠，不对爬虫和用户返回不同内容（拒绝 cloaking） | 对话决策 |
| 2026-10-06 | 语言标签统一为 en-US；全站作者 Person = Reggie J；sameAs 只用真实链接 | 对话决策（实现中） |
| 2026-10-06 | 引用只加在指南页，来源逐条核对，不夸大健康功效 | 对话决策（实现中） |
