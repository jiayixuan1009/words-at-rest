# Words at Rest — 路线图（ROADMAP）

> 更新：2026-10-06（Asia/Shanghai）。状态以 git 分支为准：线上 = `master`；`holidays-wave1`、`subthemes-wave1` 均**未推送、未部署**。  
> 产品原则见 [`PRODUCT.md`](./PRODUCT.md)；已完成事项见 [`../CHANGELOG.md`](../CHANGELOG.md)。  
> 规则：**任何上线 / 部署都要等 Reggie 确认。**

---

## 1. 内容波次（Waves）

| 波次 | 内容 | 状态 | 依据 |
|---|---|---|---|
| Wave 0 | SEO 修复第二批（audit-fix-2）：正文 SSR、作者 / 日期 / Person / sameAs、引用、en-US、移动端提速与折叠 | **进行中**（worktree `war-fix`） | 审计反馈、对话 |
| Wave 1 · 节日 | Thanksgiving、Winter、Valentine's、Easter + `/holidays` | **Package B 待部署**（`holidays-rebase`）；难度图已接；封面仍借旧图 | THEME-EXPANSION-PLAN §6 |
| Wave 1b · 子主题 | Sports：golf / baseball / tennis / fishing；Food：baking / desserts / herbs / fruits；Music：instruments / jazz / classical / music-terms | **Package B 待部署**（与节日同批）；封面借父主题图 | THEME-EXPANSION-PLAN §15 |
| Wave 2 · 常青教育 + 打印/长者 | Geography 先做 `us-states` 或 `world-capitals`（待定）+ `weather`；强化 `/large-print` 交叉（holiday / bible large print），可选 `/printables` | 规划 | §8、§9 |
| Wave 3 · 流行文化（泛称） | `/pop-culture`：`superheroes`、`sitcoms`，可选 `classic-tv`；"Not affiliated" 免责；不做商标命名页 | 规划 | §7 |
| Wave 4 | History（`american-history`、`ancient-world`、`presidents`）、更多 Science（`human-body`、`birds`）、节日第二批（St. Patrick's、New Year、Independence Day） | 规划 | §10 |
| 子主题后续 | Sports：basketball、football（规则词）、soccer、hockey、bowling…；Food：vegetables、breakfast、cooking、bbq、pasta、bread；Music：orchestra、piano、guitar、genres、choir、opera | 候选 | §15.3 |
| 暂缓 | Marvel / Friends / The Office / Harry Potter 等**命名**页 | 不做（除非书面接受风险） | §5 |

**合并顺序（建议）：** audit-fix-2 合入 master 并部署 → `holidays-wave1`、`subthemes-wave1` rebase 到其后，套用移动端简化 → 确认后上线。

## 2. 出图队列（按优先级）

| 优先级 | 内容 | 数量 | 需求文档 | 备注 |
|---|---|---|---|---|
| ✅ 已完成 | 首批全站插画 | 82 | `design/IMAGE-BRIEF.md` | `c550038` |
| ✅ 已完成 | Bible 封面 + OG 底图 | 2 | `design/BIBLE-IMAGE-REQUEST.md` | `5dacf8f` |
| **P0** | 节日 Wave 1 封面 + OG 底图（thanksgiving、winter、valentines、easter），可选 `/holidays` OG | 8（+1） | `design/HOLIDAY-IMAGE-REQUEST.md` | Valentine's 现借 food 图最不搭，最先出 |
| **P0** | 难度递进图：Bible + 4 节日 | 15 | `design/DIFFICULTY-IMAGE-REQUEST.md` | 建议一个主题三连一起交，便于看递进 |
| P1 | 子主题 Wave 1 封面 + OG 底图 | 24 | `design/SUBTHEME-IMAGE-REQUEST.md` | 现借父主题图 |
| P1 | 难度递进图：halloween、fall、christmas、animals、garden、ocean、dogs、cats、food | 27 | 同上 DIFFICULTY | |
| P2 | 难度递进图：sports、music、travel、space、large-print-pack、hard-pack | 18 | 同上 DIFFICULTY | 子主题的难度图不在本清单内，需要时另写 |
| 后续 | Wave 2：`us-states`、`weather`（地图指南针、气压计雨伞） | 各封面 + OG | THEME-EXPANSION-PLAN §11 | |
| 后续 | Wave 3：`superheroes`、`sitcoms`、`classic-tv`（斗篷剪影、咖啡店卡座、木壳电视；无角色、无 logo） | 各封面 + OG | 同上 | |

难度图合计 60 张主图（1200×900），640 小图由 `scripts/derive-images.mjs` 派生；清单 `design/difficulty-image-manifest.csv`。  
**接线（待做）：** 难度图代码在 audit-fix-2 与两批内容合并后再接：有 `{slug}-{level}.webp` 就显示，否则回退主题封面；Large Print 用 Easy。  
每批图交付后：替换文件 → `node scripts/derive-images.mjs` → `node scripts/generate-og.mjs` → 本地检查 → 等确认后部署。

## 3. 结构化数据（`design/STRUCTURED-DATA-PLAN.md`）

| 阶段 | 内容 | 状态 |
|---|---|---|
| 已有 | Organization、WebSite、Person（About）、BreadcrumbList、FAQPage、HowTo、ContactPage、CollectionPage、ItemList（主题页）、WebPage + Game（谜题页）（`c3d2494`） | 已上线 |
| P0 | 单 `@graph` + 稳定 `@id`；puzzle/daily 补 `#webpage`、`#game`；`@id` 互指；Breadcrumb 并入图；layout 不再每页展开 Org；`/themes`、难度、`/large-print` 补 ItemList；移除 Speakable | **待你批准**（规划完成，未实现） |
| P1 | Game 加厚（长描述、`datePublished`/`dateModified`、keywords、about、url、PlayAction）；Daily `CreativeWorkSeries`；`/daily` 归档 ItemList；privacy/terms WebPage；构建期 JSON-LD 断言 | **待你批准**；其中作者 / 日期部分已在 audit-fix-2 中实现中 |
| P2 | 主题 `DefinedTermSet`；真实社交 `sameAs`；Organization `foundingDate`；GSC 监控 | 延后；`sameAs` 等你提供真实链接（audit-fix-2 先接 GitHub 仓库） |

## 4. 待你拍板（Open decisions）

1. **节日 Wave 1 上线时机：** 先用借来的旧图上线（赶 11 月感恩节前），还是等专属封面出好再上？
2. **结构化数据 P0 / P1：** 是否按 STRUCTURED-DATA-PLAN 实施？
3. **手机首屏的 Daily 预览：** 预览网格要不要裁小一点，或者把每日题固定为 Easy / Medium？
4. **Wave 2 地理先做哪个：** `us-states` 还是 `world-capitals`？
5. **真实社交主页：** 有没有 X、LinkedIn、Pinterest、Facebook 等个人或品牌主页？有就发链接，用于 `sameAs`。
6. （来自 THEME-EXPANSION-PLAN §13）`/pop-culture` 是否单独做 hub，还是先只在 `/themes` 分组？

## 5. 需要你亲自做的事（User-owned）

| # | 事项 | 说明 / 参考 |
|---|---|---|
| 1 | **Google Search Console** | 添加网域资源 → 在 Cloudflare DNS 加 `google-site-verification` TXT → 验证 → 提交 `https://wordsatrest.com/sitemap.xml`。步骤见 `NEXT-STEPS-GSC-EMAIL.md` |
| 2 | **GA4** | 创建媒体资源，把 Measurement ID（`G-…`）发来，设为 `NEXT_PUBLIC_GA_ID` 后重新部署 |
| 3 | **AdSense / ads.txt** | 审核通过后，把后台给的 `google.com, pub-…, DIRECT, f08c47fec0942fa0` 那一行发来放进 `public/ads.txt`（模板 `docs/ads.txt.example`；不放假 ID） |
| 4 | **社交主页链接** | 用于 `SITE.sameAs` 和 Person `sameAs`，只填真实存在的 |
| 5 | **作者署名确认** | 确认 About 页 Reggie J 的简介，补充真实经历（不写没有的资历） |
| 6 | **邮箱 `hello@wordsatrest.com`** | 启用 Cloudflare Email Routing：添加并验证个人收件箱 → 建 `hello@` 转发规则 → 发测试信（AdSense 前必备；目前 Routing 未启用） |
| 7 | **上线确认** | 每一批（audit-fix-2、节日、子主题）上线前看截图并点头 |
