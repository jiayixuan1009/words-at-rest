# Words at Rest — 结构化数据升级规划

> **状态：** 仅规划，未实现、未提交、未部署  
> **站点：** https://wordsatrest.com  
> **仓库：** `/workspace/words-at-rest`（vinext / Next.js on Cloudflare Workers）  
> **审计日期：** 2026-10-06（Asia/Shanghai）  
> **依据：** 线上 HTML 实抓 + 代码（`components/JsonLd.tsx`、`HubSchema.tsx`、`Breadcrumbs.tsx`、`Faq.tsx`、`PuzzleView.tsx`、`lib/seo.ts`、`lib/site.ts`、`app/layout.tsx`）+ Google Search Central 现行文档

---

## 0. 诚实前提：Google 富结果 vs 语义价值

本站是**成人休闲找词站**，不是政府/健康权威站，也不是新闻出版商。因此：

| 标记类型 | 对 Google 富结果？ | 对 GEO / AEO / LLM？ | 本规划态度 |
|---|---|---|---|
| `BreadcrumbList` | **有**（桌面端可显示路径） | 有（站点层级清晰） | **保留并强化** |
| `Organization` + `logo` | **有**（站名/知识面板信号；logo 可影响展示） | 有（实体消歧） | **保留并强化**（首页/About 为主） |
| `WebSite`（站点名） | **有**（Site Name 偏好） | 有 | **保留**；**不加** `SearchAction` |
| `FAQPage` | **基本无**（2023-08 起仅权威政府/健康站常规展示） | **有**（问答块易被 AI 摘取） | **保留可见 FAQ + 标记**；不指望富结果；不滥加 |
| `HowTo` | **无**（2023-09 起桌面也已废弃） | 有（步骤语义） | **保留**在 `/how-to-play`；不扩展到其他页 |
| `Speakable` | **无**（Beta，仅新闻 + 美区 Assistant） | 极低 | **从非新闻页移除**（避免假装支持） |
| Sitelinks Search Box / `WebSite.potentialAction` `SearchAction` | **无**（2024-11-21 起全局下线） | 无（且本站无站内搜索） | **不要添加** |
| `Game` / `CreativeWork` | Google 无专门「Game 富结果」 | **有**（实体：免费、难度、主题、受众） | **强化为语义主轴** |
| `AggregateRating` / 假评论 | 违规风险高 | 伤害信任 | **禁止** |
| `Article` | 不适用（非文章站） | — | **不加** |
| Carousel（Recipe/Course/Movie…） | 类型不匹配 | — | **不加** |

结论：**升级的主收益是实体清晰度（GEO/AEO）+ Breadcrumb/Organization/Site Name；不是「FAQ 星标框」。**

---

## 1. 现状盘点（线上 HTML，2026-10-06）

### 1.1 按页面类型

| 页面 | JSON-LD 块数 | 类型 | 有稳定 `@id`？ | 备注 |
|---|---|---|---|---|
| `/` | 2 | `WebSite`, `Organization` | Website `#website`, Org `#organization` | **缺** `WebPage`；无面包屑 |
| `/daily` | 4 | `BreadcrumbList`, `WebPage`(+嵌套 `Game`), `FAQPage`, `Organization` | 仅 Org；WebPage **无** `#webpage` | Game 无独立 `@id`；无系列 |
| `/daily/2026-10-06` | 3 | `BreadcrumbList`, `WebPage`(+`Game`), `Organization` | 仅 Org | 同 puzzle 页骨架 |
| `/themes` | 3 | `BreadcrumbList`, `CollectionPage`, `Organization` | CollectionPage `#webpage`, Org | **缺** 主题 `ItemList` |
| `/themes/halloween` | 4 | `BreadcrumbList`, `CollectionPage`, `ItemList`, `Organization` | CollectionPage `#webpage`, Org | `ItemList` **未**通过 `mainEntity` 挂到页面 |
| `/themes/…/halloween-easy-01` | 3 | `BreadcrumbList`, `WebPage`(+`Game`), `Organization` | 仅 Org；WebPage **无** `@id` | Game 描述偏薄；无 `PlayAction` |
| `/difficulty/easy` | 3 | `BreadcrumbList`, `CollectionPage`, `Organization` | CollectionPage `#webpage` | **缺** `ItemList` |
| `/large-print` | 4 | `BreadcrumbList`, `FAQPage`, `CollectionPage`, `Organization` | CollectionPage `#webpage` | **缺** `ItemList` |
| `/how-to-play` | 5 | `BreadcrumbList`, `FAQPage`, `HowTo`, `WebPage`(+`speakable`), `Organization` | WebPage `#webpage` | Speakable 对本站无效 |
| `/adults` | 4 | `BreadcrumbList`, `FAQPage`, `WebPage`, `Organization` | WebPage `#webpage` | OK，可并入 `@graph` |
| `/about` | 4 | `BreadcrumbList`, `AboutPage`, `Person`, `Organization` | AboutPage `#webpage`, Person `#editor`, Org | Person 仅此页完整展开 |
| `/contact` | 3 | `BreadcrumbList`, `ContactPage`, `Organization` | ContactPage `#webpage` | OK |
| `/privacy`, `/terms` | 2 | `BreadcrumbList`, `Organization` | 仅 Org | **缺** `WebPage`（可用 `WebPage`） |
| 404 | 1 | `Organization` | Org | 可接受；勿堆砌 |

### 1.2 代码发射点

| 文件 | 职责 |
|---|---|
| `components/JsonLd.tsx` | 单对象 → 一个 `<script type="application/ld+json">` |
| `app/layout.tsx` | **每页**注入完整 `organizationSchema()` |
| `app/page.tsx` | 首页 `WebSite` |
| `components/HubSchema.tsx` | 内容枢纽 `WebPage`/`CollectionPage`/`AboutPage`/`ContactPage`（含可选 Speakable） |
| `components/Breadcrumbs.tsx` | 可见面包屑 + `BreadcrumbList` |
| `components/Faq.tsx` | 可见 FAQ + `FAQPage` |
| `components/PuzzleView.tsx` | puzzle / daily 的 `WebPage` + 嵌套 `Game` |
| `app/themes/[theme]/page.tsx` | 主题 `ItemList` |
| `app/how-to-play/page.tsx` | 内联 `HowTo` |
| `app/about/page.tsx` | `editorSchema()` Person |
| `lib/seo.ts` | `organizationSchema` / `editorSchema` / `ORG_ID` / `WEBSITE_ID` / `EDITOR_ID` |
| `lib/site.ts` | `SITE.sameAs`（空数组，正确） |

### 1.3 实体图现状（薄弱处）

- **多 script、非单图：** 每页 2–5 个独立 JSON-LD，用 `@id` 弱引用，但不是统一 `@graph`，也缺少页面节点上的 `mainEntity` / `breadcrumb` / `primaryImageOfPage` 互指。
- **`@id` 不一致：** 枢纽页有 `{url}#webpage`；puzzle / daily 的 `WebPage` **没有** `@id`；`BreadcrumbList` / `FAQPage` / `HowTo` / `ItemList` / 嵌套 `Game` 都无 `@id`。
- **`isPartOf` 两种写法：** HubSchema 用 `{ "@id": WEBSITE_ID, ... }`；PuzzleView 内联完整 `WebSite` 对象且**不带** `@id` → 图上像两个 Website。
- **Organization 全站重复展开：** layout 每页完整 dump；对爬虫无害，但对维护与「一图一实体」不优雅。Google 建议 Org 放在首页或 About；其他页用 `@id` 引用即可。
- **Game 属性偏瘦：** 有 name / genre / description / image / audience / isAccessibleForFree / author / publisher / dateCreated；缺 `url`、`@id`、`datePublished`/`dateModified`、`keywords`、`about`（主题）、`isPartOf`（系列）、`potentialAction`（PlayAction）、字数/网格等结构化扩展。
- **Daily 无系列实体：** 每日谜题未声明 `CreativeWorkSeries`「Daily Word Search」。
- **列表页不完整：** 仅主题 hub 有 `ItemList`；`/themes`、难度 hub、`/large-print`、`/daily` 归档区均无列表标记。
- **Speakable 误用：** `/how-to-play` 带 `SpeakableSpecification`；该功能仅面向新闻 + Assistant，对本站无富结果收益。

### 1.4 校验结论（对照 Google 要求）

- JSON 可解析；类型名均为合法 schema.org。
- **无** 明显非法必填字段导致的 Breadcrumb / Organization「硬错误」。
- **无效预期（不是语法错）：** 指望 FAQ / HowTo / Speakable 出 Google 富结果 —— **对本站不会发生**。
- **过时/应避免：** 添加 `SearchAction`（Sitelinks Search Box 已退役）；继续宣传 Speakable。
- **风险项（当前未做，必须继续不做）：** 假 `AggregateRating`、假 `sameAs`、与可见内容不符的 FAQ 灌水。

---

## 2. 目标架构

### 2.1 原则

1. **每页一个** `<script type="application/ld+json">`，根为：
   ```json
   { "@context": "https://schema.org", "@graph": [ ... ] }
   ```
2. **稳定 `@id`（全站统一）：**
   - `https://wordsatrest.com/#organization`
   - `https://wordsatrest.com/#website`
   - `https://wordsatrest.com/about#editor`
   - `{pageUrl}#webpage`
   - `{pageUrl}#breadcrumb`
   - `{pageUrl}#primaryimage`
   - 谜题：`{puzzleUrl}#game`
   - Daily 系列：`https://wordsatrest.com/daily#series`
   - 列表：`{pageUrl}#itemlist`
   - FAQ（若保留）：`{pageUrl}#faq`
   - HowTo：`https://wordsatrest.com/how-to-play#howto`
3. **引用用 `@id`，展开只在「权威页」：** Organization 完整节点放在 `/` 与 `/about`；其他页只 `{ "@id": "...#organization" }`。Person 完整节点放在 `/about`；其他页只引用。
4. **可见内容优先：** JSON-LD 只描述页面上真实存在的东西（FAQ 文案、步骤、谜题标题、列表项）。
5. **类型选择诚实：** 找词谜题用 `Game`（可叠加 `CreativeWork` 属性），**不用** `VideoGame`（非电子游戏发行）。

### 2.2 按页面类型映射

| 页面类型 | `@graph` 节点 | Google 富结果期望 | GEO/AEO 价值 |
|---|---|---|---|
| 首页 `/` | Organization（全量）, WebSite, WebPage, ImageObject(`#primaryimage`) | Site Name + Org/logo | 高：站点实体根 |
| `/about` | Organization（全量或引用）, Person（全量）, AboutPage, BreadcrumbList, ImageObject | Org / 人物消歧 | 高：E-E-A-T |
| `/contact` | ContactPage, BreadcrumbList, Org 引用 | 低 | 中 |
| `/privacy`, `/terms` | WebPage, BreadcrumbList, Org 引用 | 无 | 低（完整性） |
| `/themes` | CollectionPage, ItemList（15 主题）, BreadcrumbList, Org 引用 | Breadcrumb | 高：主题目录 |
| `/themes/{slug}` | CollectionPage, ItemList（该主题 puzzles）, BreadcrumbList, ImageObject, Org/Person 引用；可选 DefinedTermSet（见下） | Breadcrumb | 高 |
| `/difficulty/{level}` | CollectionPage, ItemList（该难度 puzzles）, BreadcrumbList, ImageObject | Breadcrumb | 高 |
| `/large-print` | CollectionPage, ItemList, FAQPage（保留）, BreadcrumbList, ImageObject | Breadcrumb only | 高（问答摘取） |
| `/daily` | WebPage, Game（今日）, CreativeWorkSeries, ItemList（归档近期）, FAQPage, BreadcrumbList, ImageObject | Breadcrumb | 高 |
| `/daily/{date}` | WebPage, Game, CreativeWorkSeries 引用, BreadcrumbList, ImageObject | Breadcrumb | 高 |
| `/themes/.../{slug}`（谜题） | WebPage, Game(+PlayAction), BreadcrumbList, ImageObject, Org/Person 引用 | Breadcrumb | **最高**（主内容实体） |
| `/how-to-play` | WebPage, HowTo, FAQPage, BreadcrumbList, ImageObject | Breadcrumb only | 高（定义+步骤） |
| `/adults` | WebPage, FAQPage, BreadcrumbList, ImageObject | Breadcrumb | 中高 |
| 404 | 可仅 Org 引用或省略 | 无 | 无 |

### 2.3 关键类型设计细节

#### Organization（权威展开：`/` + `/about`）

保留现有：`name`, `url`, `logo`（ImageObject 512×512）, `image`, `description`, `email`, `contactPoint`, `founder` → `#editor`。  
待用户提供真实社交后再填 `sameAs`（**禁止占位 URL**）。  
可选后续：`foundingDate: "2026-10-06"`（与 `SITE.dailyStart` / 上线日一致）。  
**不要** `LocalBusiness` / 假地址 / 假电话。

#### WebSite

`@id` `#website`；`name`, `url`, `description`, `inLanguage: "en"`, `publisher` → `#organization`。  
**不加** `potentialAction` / `SearchAction`（功能已退役且无站内搜索）。

#### Person（权威展开：`/about`）

保持 `editorSchema()`：`name`, `jobTitle`, `url`, `worksFor`, `knowsAbout`。  
可选：真实个人主页再加 `sameAs`。

#### Game（谜题 / Daily 的 `mainEntity`）

```
@type: "Game"
@id: {puzzleUrl}#game
url: {puzzleUrl}
name, description（用 puzzleDescription() 长描述，与 meta 对齐）
genre: "Word search puzzle"
inLanguage: "en"
isAccessibleForFree: true
image → #primaryimage 或主题 OG
audience: PeopleAudience suggestedMinAge 13
author → #editor
publisher → #organization
datePublished / dateModified（ISO 日；Daily 用归档日）
about: { @type: "Thing", name: "{Theme} word search", url: theme hub }
keywords: "word search, {theme}, {difficulty}, large print?"
isPartOf: 主题 CollectionPage 或 Daily series
numberOfPlayers: { minValue: 1, maxValue: 1 }  // 可选
potentialAction: {
  @type: "PlayAction",
  target: { @type: "EntryPoint", urlTemplate: "{puzzleUrl}", actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"] }
}
```

**不用** `VideoGame`、`SoftwareApplication`（除非以后真上架 App Store）。

#### CreativeWorkSeries（Daily）

```
@type: "CreativeWorkSeries"
@id: https://wordsatrest.com/daily#series
name: "Daily Word Search"
url: https://wordsatrest.com/daily
description: "One free word search puzzle each day at midnight UTC."
publisher → #organization
```

每日 `Game.isPartOf` → `#series`；可用 `position`/`datePublished` 表达日期。

#### ItemList

- 主题 hub / 难度 hub / large-print / themes 索引 / daily 归档：`itemListElement` 用 `ListItem` + `position` + `url` + `name`（与现主题 hub 一致）。
- `CollectionPage.mainEntity` → `{ "@id": "{pageUrl}#itemlist" }`，把列表挂进页面图。

#### FAQPage / HowTo

- **保留**现有可见 FAQ 与 `/how-to-play` HowTo（对 LLM 摘取有用）。
- 在 `@graph` 里给 `@id`，并由 `WebPage.mainEntity` 或 `hasPart` 引用（FAQ 与 HowTo 并存时用 `hasPart` 数组，或 `mainEntity` 指 HowTo、`hasPart` 指 FAQ）。
- **不要**为「多占 FAQ 富结果」而复制问答到无关页面。

#### DefinedTermSet（可选，P2）

主题页已展示完整词库。可增加：

```
@type: "DefinedTermSet"
@id: {themeUrl}#wordbank
name: "{Theme} word search word bank"
hasDefinedTerm: [ { @type: "DefinedTerm", name: "BROOMSTICK" }, ... ]
```

**价值：** GEO 上帮助模型理解「这个主题包含哪些词」；**Google 无对应富结果**。词很多时注意 HTML 体积（可只标前 N 个或整表，需实测）。

#### 明确不做

| 项 | 原因 |
|---|---|
| `AggregateRating` / `Review` | 无真实评价系统；伪造 = 垃圾标记风险 |
| 假 `sameAs` | 伤害实体信任 |
| `SiteNavigationElement` 全站导航 schema | 收益极低，维护成本高 |
| `SearchAction` | 功能退役 + 无搜索 |
| `Speakable`（非新闻） | 无效；从 HubSchema 移除 |
| `VideoGame` / 假 `offers` | 类型不符 |
| FAQ 灌水到每个 puzzle | 内容稀薄、像 spam |
| 在 404 堆结构化数据 | 无意义 |

---

## 3. 完整示例 `@graph`（英文 JSON-LD）

### 3.1 首页 `/`

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://wordsatrest.com/#organization",
      "name": "Words at Rest",
      "url": "https://wordsatrest.com",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://wordsatrest.com/#logo",
        "url": "https://wordsatrest.com/logo.png",
        "width": 512,
        "height": 512
      },
      "image": "https://wordsatrest.com/og/default.jpg",
      "description": "Calm, free word search puzzles for adults — large print, daily and seasonal.",
      "email": "hello@wordsatrest.com",
      "foundingDate": "2026-10-06",
      "contactPoint": [{
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "hello@wordsatrest.com",
        "availableLanguage": ["en"]
      }],
      "founder": { "@id": "https://wordsatrest.com/about#editor" }
    },
    {
      "@type": "WebSite",
      "@id": "https://wordsatrest.com/#website",
      "name": "Words at Rest",
      "url": "https://wordsatrest.com",
      "description": "Calm, free word search puzzles for adults — large print, daily and seasonal.",
      "inLanguage": "en",
      "publisher": { "@id": "https://wordsatrest.com/#organization" }
    },
    {
      "@type": "WebPage",
      "@id": "https://wordsatrest.com/#webpage",
      "url": "https://wordsatrest.com/",
      "name": "Free Large Print & Daily Word Search | Words at Rest",
      "description": "Calm, free word search puzzles for adults and seniors. Large print, daily puzzles and seasonal themes — no download, no sign-up, no timer.",
      "isPartOf": { "@id": "https://wordsatrest.com/#website" },
      "about": { "@id": "https://wordsatrest.com/#organization" },
      "primaryImageOfPage": { "@id": "https://wordsatrest.com/#primaryimage" },
      "publisher": { "@id": "https://wordsatrest.com/#organization" },
      "inLanguage": "en"
    },
    {
      "@type": "ImageObject",
      "@id": "https://wordsatrest.com/#primaryimage",
      "url": "https://wordsatrest.com/og/default.jpg",
      "width": 1200,
      "height": 630
    }
  ]
}
```

### 3.2 主题 hub `/themes/halloween`

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@id": "https://wordsatrest.com/#organization" },
    { "@id": "https://wordsatrest.com/#website" },
    { "@id": "https://wordsatrest.com/about#editor" },
    {
      "@type": "BreadcrumbList",
      "@id": "https://wordsatrest.com/themes/halloween#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://wordsatrest.com/" },
        { "@type": "ListItem", "position": 2, "name": "Themes", "item": "https://wordsatrest.com/themes" },
        { "@type": "ListItem", "position": 3, "name": "Halloween", "item": "https://wordsatrest.com/themes/halloween" }
      ]
    },
    {
      "@type": "ImageObject",
      "@id": "https://wordsatrest.com/themes/halloween#primaryimage",
      "url": "https://wordsatrest.com/og/themes/halloween.jpg",
      "width": 1200,
      "height": 630
    },
    {
      "@type": "ItemList",
      "@id": "https://wordsatrest.com/themes/halloween#itemlist",
      "name": "Halloween word search puzzles",
      "numberOfItems": 3,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Easy Halloween Word Search",
          "url": "https://wordsatrest.com/themes/halloween/halloween-easy-01"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Medium Halloween Word Search",
          "url": "https://wordsatrest.com/themes/halloween/halloween-medium-01"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Hard Halloween Word Search",
          "url": "https://wordsatrest.com/themes/halloween/halloween-hard-01"
        }
      ]
    },
    {
      "@type": "CollectionPage",
      "@id": "https://wordsatrest.com/themes/halloween#webpage",
      "url": "https://wordsatrest.com/themes/halloween",
      "name": "Halloween Word Search",
      "description": "Settle in with a Halloween word search made for grown-up puzzlers. …",
      "inLanguage": "en",
      "isPartOf": { "@id": "https://wordsatrest.com/#website" },
      "breadcrumb": { "@id": "https://wordsatrest.com/themes/halloween#breadcrumb" },
      "primaryImageOfPage": { "@id": "https://wordsatrest.com/themes/halloween#primaryimage" },
      "mainEntity": { "@id": "https://wordsatrest.com/themes/halloween#itemlist" },
      "author": { "@id": "https://wordsatrest.com/about#editor" },
      "publisher": { "@id": "https://wordsatrest.com/#organization" },
      "datePublished": "2026-10-06",
      "dateModified": "2026-10-06"
    }
  ]
}
```

> 注：`{ "@id": "..." }` 裸引用在部分校验器中会警告「节点过瘦」。实现时可在非权威页对 Org/WebSite/Person 使用**最小引用对象** `{ "@type": "Organization", "@id": "..." }`（带 `@type`），或仅依赖权威页展开 + 同站 `@id` 解析。推荐：**引用时带 `@type`，权威页带全字段**。

### 3.3 谜题页 `/themes/halloween/halloween-easy-01`

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://wordsatrest.com/#organization" },
    { "@type": "WebSite", "@id": "https://wordsatrest.com/#website" },
    { "@type": "Person", "@id": "https://wordsatrest.com/about#editor", "name": "Reggie J" },
    {
      "@type": "BreadcrumbList",
      "@id": "https://wordsatrest.com/themes/halloween/halloween-easy-01#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://wordsatrest.com/" },
        { "@type": "ListItem", "position": 2, "name": "Themes", "item": "https://wordsatrest.com/themes" },
        { "@type": "ListItem", "position": 3, "name": "Halloween", "item": "https://wordsatrest.com/themes/halloween" },
        { "@type": "ListItem", "position": 4, "name": "Easy Halloween Word Search", "item": "https://wordsatrest.com/themes/halloween/halloween-easy-01" }
      ]
    },
    {
      "@type": "ImageObject",
      "@id": "https://wordsatrest.com/themes/halloween/halloween-easy-01#primaryimage",
      "url": "https://wordsatrest.com/og/themes/halloween.jpg",
      "width": 1200,
      "height": 630
    },
    {
      "@type": "Game",
      "@id": "https://wordsatrest.com/themes/halloween/halloween-easy-01#game",
      "url": "https://wordsatrest.com/themes/halloween/halloween-easy-01",
      "name": "Easy Halloween Word Search",
      "description": "Find broomstick, cobweb, lantern and 7 more words in this easy halloween word search: 10×10 grid, words run across and down. Free online, no timer.",
      "genre": "Word search puzzle",
      "inLanguage": "en",
      "isAccessibleForFree": true,
      "image": { "@id": "https://wordsatrest.com/themes/halloween/halloween-easy-01#primaryimage" },
      "audience": { "@type": "PeopleAudience", "suggestedMinAge": 13 },
      "author": { "@id": "https://wordsatrest.com/about#editor" },
      "publisher": { "@id": "https://wordsatrest.com/#organization" },
      "datePublished": "2026-10-06",
      "dateModified": "2026-10-06",
      "keywords": "halloween word search, easy word search, free word search",
      "about": {
        "@type": "Thing",
        "name": "Halloween word search",
        "url": "https://wordsatrest.com/themes/halloween"
      },
      "isPartOf": {
        "@type": "CollectionPage",
        "@id": "https://wordsatrest.com/themes/halloween#webpage"
      },
      "potentialAction": {
        "@type": "PlayAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://wordsatrest.com/themes/halloween/halloween-easy-01",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform"
          ]
        }
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://wordsatrest.com/themes/halloween/halloween-easy-01#webpage",
      "url": "https://wordsatrest.com/themes/halloween/halloween-easy-01",
      "name": "Easy Halloween Word Search",
      "description": "Find broomstick, cobweb, lantern and 7 more words in this easy halloween word search: 10×10 grid, words run across and down. Free online, no timer.",
      "isPartOf": { "@id": "https://wordsatrest.com/#website" },
      "breadcrumb": { "@id": "https://wordsatrest.com/themes/halloween/halloween-easy-01#breadcrumb" },
      "primaryImageOfPage": { "@id": "https://wordsatrest.com/themes/halloween/halloween-easy-01#primaryimage" },
      "mainEntity": { "@id": "https://wordsatrest.com/themes/halloween/halloween-easy-01#game" },
      "publisher": { "@id": "https://wordsatrest.com/#organization" },
      "author": { "@id": "https://wordsatrest.com/about#editor" },
      "inLanguage": "en",
      "datePublished": "2026-10-06",
      "dateModified": "2026-10-06"
    }
  ]
}
```

---

## 4. 实现计划（文件级）

### 4.1 新建 / 改造

| 改动 | 说明 |
|---|---|
| **新建 `lib/schema.ts`** | 纯函数构建节点与 `@graph`：`orgNode()`, `websiteNode()`, `personRef()`, `breadcrumbNode()`, `imageNode()`, `webPageNode()`, `gameNode()`, `itemListNode()`, `seriesNode()`, `faqNode()`, `howToNode()`, `buildGraph(nodes)` |
| **改造 `components/JsonLd.tsx`** | 支持 `data: object`；若检测到已是 `@graph` 则原样输出；新增可选 `GraphLd({ nodes })` 包装 |
| **改造 / 收敛发射点** | `layout.tsx`：**停止**每页 dump 完整 Org（改为仅首页/About 全量，或 layout 只输出 `{@type, @id}` 引用——推荐完全交给页面级 `buildGraph`，layout 不再发 JSON-LD） |
| **替换 `HubSchema.tsx`** | 改为调用 `lib/schema.ts`，输出整图；移除 Speakable 参数 |
| **改造 `Breadcrumbs.tsx`** | **只渲染可见导航**；JSON-LD 改由页面图的 `breadcrumbNode` 提供（避免双份 BreadcrumbList） |
| **改造 `Faq.tsx`** | 可见 FAQ 保留；JSON-LD 改为导出数据给页面图，或接受 `emitLd={false}` |
| **改造 `PuzzleView.tsx`** | 用 `gameNode` + `webPageNode` + breadcrumb + image 组图；description 复用 `puzzleDescription()` |
| **页面更新** | `app/page.tsx`, themes 索引/主题/难度/large-print/daily/daily/[date]/how-to-play/adults/about/contact/privacy/terms` |
| **`lib/site.ts`** | 可选 `foundingDate`；`sameAs` 仍空直至真实资料 |

### 4.2 与 `llms.txt` 对齐

`public/llms.txt` 已陈述站点事实。结构化数据应与之**数字一致**（主题数、难度规则、Daily UTC、编辑者、联系邮箱）。实现后做一次人工对照清单。

---

## 5. 分阶段推进（P0 / P1 / P2）

### P0 — 图连通 + 可获富结果基线（约 0.5–1 天）

1. 引入 `lib/schema.ts` + 单 `@graph` 输出。  
2. 统一 `@id`；puzzle/daily WebPage 补 `#webpage`；Game 独立 `#game`。  
3. `isPartOf` / `publisher` / `author` / `breadcrumb` / `primaryImageOfPage` / `mainEntity` 全部用 `@id` 互指。  
4. Breadcrumbs 组件停止单独发 JSON-LD（并入图）。  
5. layout 去掉全页 Org dump；首页 + About 权威展开 Org/Person。  
6. 难度 hub、`/themes`、`/large-print` 补 `ItemList` + `mainEntity`。  
7. 移除 Speakable。  
8. 校验：Rich Results Test（Breadcrumb）、Schema Markup Validator、抽查 5 类 URL。

### P1 — 谜题实体加厚 + Daily 系列（约 0.5 天）

1. `Game`：长描述、`datePublished`/`dateModified`、`keywords`、`about`、`url`、`PlayAction`。  
2. `CreativeWorkSeries` Daily + 每日 `isPartOf`。  
3. `/daily` 归档 `ItemList`（近期 N 天或当月）。  
4. FAQ/HowTo 并入 `@graph` 并挂 `hasPart`/`mainEntity`。  
5. privacy/terms 补简单 `WebPage`。  
6. 构建期自动化：对 `generateStaticParams` 路由抽样解析 JSON-LD，断言 `@graph`、必需 `@id`、无双份 BreadcrumbList。

### P2 — GEO 增强与维护（约 0.5 天，可延后）

1. 主题 `DefinedTermSet` 词库（控制体积）。  
2. 用户提供社交后写入 `sameAs`。  
3. Organization `foundingDate`、logo `@id` 细化。  
4. GSC「增强功能」监控 Breadcrumbs；无 FAQ/HowTo 报告属预期。  
5. 文档：在 `AUDIT-FIXES.md` 或本文件末追加「已实现」勾选。

**总工作量估计：** 1.5–2.5 人天（含测试与部署），不含等社交账号。

---

## 6. 验证与监控清单

### 发布前

- [ ] [Rich Results Test](https://search.google.com/test/rich-results)：首页、主题 hub、谜题、daily、about —— 预期检出 **Breadcrumbs**；Organization 相关信号；**不要**期待 FAQ/HowTo 富结果合格徽章。  
- [ ] [Schema Markup Validator](https://validator.schema.org/)：无严重错误；`@id` 可解析。  
- [ ] 本地脚本：`curl` 各模板 URL → `JSON.parse` 每个 ld+json → 断言恰好 **1** 个 script（或明确允许多个过渡期）且含 `@graph`。  
- [ ] 断言无 `AggregateRating`、无空 `sameAs`、无 `SearchAction`、无 `Speakable`。  
- [ ] 可见 FAQ / HowTo 文案与 JSON-LD `text` 一致。  
- [ ] 与 `llms.txt` 数字/日期一致。

### 发布后

- [ ] GSC → 增强功能 → **Breadcrumbs**（有效/无效项）。  
- [ ] URL 检查工具抽查上述模板。  
- [ ] 勿因「FAQ 增强报告为空」而误判失败（对本站是正常的）。  
- [ ] 3–4 周后看站名展示是否稳定（WebSite name）。

---

## 7. 明确不要做的事（再次强调）

1. **不要**伪造评分、评论、用户数、下载量。  
2. **不要**填写未开通的 `sameAs`。  
3. **不要**为了富结果而把 FAQ 复制到每个谜题页。  
4. **不要**添加已退役的 Sitelinks `SearchAction`。  
5. **不要**把 `Speakable` 当 AEO 银弹留在非新闻页。  
6. **不要**使用 `VideoGame` / `SoftwareApplication` 硬套浏览器找词。  
7. **不要**在未实现前向用户承诺「上线后会出现 FAQ 下拉富结果」。

---

## 8. 成功标准

| 标准 | 度量 |
|---|---|
| 单图连通 | 抽查页均 1× `@graph`，Org/WebSite/WebPage/Game/Breadcrumb 经 `@id` 相连 |
| Google | Rich Results Test 稳定检出 Breadcrumbs；无手动操作/垃圾标记 |
| 实体 | 谜题 `Game` 含免费、受众、主题、日期、PlayAction；Daily 有 Series |
| 诚实 | 代码与文档均写明 FAQ/HowTo **无**常规富结果 |
| GEO | 与 `llms.txt`、About、可见 FAQ 事实一致，便于模型引用 |

---

## 9. 建议下一步（实现时）

用户确认本规划后，按 **P0 → 部署 → Rich Results 抽查 → P1 → P2** 执行。实现 PR 应引用本文路径：`design/STRUCTURED-DATA-PLAN.md`。

**本文仅规划；未改业务代码、未 commit、未 deploy。**
