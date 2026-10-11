# 更新日志（Changelog）

本文件格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。日期为 commit 时间（Asia/Shanghai，UTC+8）。  
项目尚未打版本号，按日期 + commit 记录。完整产品说明见 [`docs/PRODUCT.md`](docs/PRODUCT.md)，后续计划见 [`docs/ROADMAP.md`](docs/ROADMAP.md)。

规模速查（主题 / 谜题）：`95609a5` 3 / 7 → `31aaf1b` 15 / 40 → `c46b10c` / `de568d3` 16 / 46 → Package B **32 / 142** → Wave C **47 / 232** → Wave D **62 / 322** → Wave E **77 / 412** → Wave F **92 / 502** → Wave G **102 / 605** → Wave H **110 / 716** → Wave I **116 / 828** → Wave JK **121 / 1043**（**达成 ~1000**）。

---

## [未发布 Unreleased]

### 新增 — IndexNow 网站验证（2026-10-10）
- 按 Bing IndexNow 教程在网站根路径发布用户提供的 UTF-8 纯文本密钥文件；为验证文件明确纯文本响应头。保留现有 llms.txt、谜题与 Daily 数据，提交仅使用正式站已发布的 canonical URL。


### 改进 — 完整 llms.txt 网站导览（2026-10-09）
- 扩充现有英文 llms.txt：说明在线玩法、四种规格、设备内进度、UTC Daily、打印包与答案页，为主要内容/资源/政策入口提供逐项链接描述；避免易过期目录总数及未发布 Daily 链接。
- 明确娱乐用途、以页面FAQ/规格及条款为依据，不将免费访问描述为可任意转载；不添加不存在的Markdown镜像链接。
- 设置UTF-8纯文本及一小时缓存，在共享head添加rel=describedby导览链接。

### 改进 — 抓取响应头与图片替代文本（2026-10-08）
- robots.txt 已核实为有效纯文本、通用允许抓取与 Sitemap，按最终需求保留原规则；本次修改针对 Meta Robots 与 X-Robots-Tag。
- 页面 Meta Robots 默认 index/follow、大图预览，具体页面继续覆盖 noindex；动态响应头仅输出 max-image-preview:large，不与页面索引规则冲突。图片/PDF 静态资源通过 Cloudflare _headers 明确允许索引与大图预览。
- 谜题卡片使用原有主题插画描述作为 alt，打印预览补具体谜题标题；纯装饰图保留空 alt 并明确隐藏于可访问树，避免重复朗读。

### 改进 — 手机首屏加载与导航流量（2026-10-08）
- AdSense 使用框架 `lazyOnload` 策略，页面加载完成并空闲后再初始化；保留发布商编号、广告功能和跨源配置，避免与谜题首屏争用网络与主线程。
- 首页、页眉/页脚和首页谜题入口关闭自动链接预取，避免访客尚未导航就下载主题筛选、隐私偏好等其他页面代码；链接仍使用客户端导航。
- 首页下方装饰图使用对应 mobile 图源及真实固有尺寸，主题卡片 sizes 与实际两列布局一致；保留图片懒加载和全部可见内容。
- 线上复测后，将手机装饰图明确限定为现有 800px / 46,326 字节版本，避免高 DPR 选择 158,250 字节原图；桌面继续使用原桌面响应式画面。
- Chrome DevTools MCP 已用于慢 4G / 4 倍 CPU / 390px 追踪，验证日志记录在工作区 research；PageSpeed 与本机追踪采用不同方法，分数不混用。

### 改进 — 页脚与信任条意图文案（2026-10-08）
- `SiteFooter`：stock-photos 行改为 “Large-print online play plus free printable PDFs for home, libraries and senior centers — no account needed.”
- `TrustFacts`：「Original word lists」→「Printable PDFs」（图标与注释同步）。
- `public/llms.txt`：large-print/printables 利益向措辞；谜题量与每天最多 10 道 daily 同步。

### 改进 — Daily 每天 10 道（含主题目录）（2026-10-08）
- 每个 UTC 日目标 **10** 道：slot 1 为 featured（`/daily`、首页 embed、日历高亮）；slots 2–10 为 “Also today”，链到 `/themes/{theme}/{slug}`。
- 新题写入 `data/puzzles/`（`{theme}-{difficulty}-{nn}`），与 Daily 共用同一 id/进度键；legacy `daily-YYYY-MM-DD` featured 网格不改写。
- `getDailyPuzzles` / `getDailySiblingPuzzles`；`daily:add` / `daily:check` / 测试按 10/日；featured 难度仍按 UTC 星期，sibling 循环 easy/medium/hard。
- 过去日（如 2026-10-07）保持 1 道；今天起至缓冲窗补满 10 道。文档见 `docs/DAILY-PUZZLES.md`。

### 改进 — 独立找词图形品牌标志（2026-10-08）
- 将容易与站名连读的衬线 W 标志重新设计为苔绿色圆角网格与暖金色选词路径；页眉和页脚统一使用独立图形与真实文字组合，保留14–18px净间距及明确的移动/桌面尺寸。
- 同步 favicon、Apple/PWA图标、结构化数据logo和旧路径兼容资源；新消费路径带v2避免旧缓存，保留生成母图、提示词和可重复导出脚本。
- 首页品牌链接的可访问名称包含可见站名与副标题，图形为装饰，不重复朗读。整合最新Daily及页脚文案后，类型检查、15项回归、Daily校验/回归及生产构建通过；320/390/640/768/1440px预览无横向溢出，最终HTTP路由与27页JSON-LD通过。新页眉WebP为4070字节；生成资源及尺寸核对通过。

### 改进 — Wave #2 P1 主题 hub 加厚（2026-10-08）
- 加厚 7 个仍偏薄主题 hub（调研 P1）：Farming、Birds、Friendship、Flowers、Trees、Beach、Cycling。
- 各主题 `description` 扩至约 124–130 词；`THEME_EXTRA`（vocabulary / goodFor / tip）与 description 合计约 320–340 有用英文词，并点名相关主题与 large print / how to play。
- 语气面向成人与老年读者；Friendship 无医疗宣称；全批禁 IP / 禁品牌。修改 `data/themes/*.json` 与 `lib/theme-content.ts`。

### 改进 — 加深 Thanksgiving Large Print 打印包（2026-10-08）
- `/printables/thanksgiving` 从 2 题扩至 **6** 题（thanksgiving-large-01…06），Letter/A4 PDF 与预览图重生成；每文件 12 页（谜题奇页、答案偶页）。
- 落地页补充规格表、活动室用法、FAQ（字号/语气/许可/纸张/互链）；链到 `/themes/thanksgiving`、`/holidays`、`/printables/activity-directors`、`/printables`、`/large-print`；预览区仍无 AdSlot。
- `/printables` 索引与 Activity Director Kit 文案改为六题；未改写既有 easy/medium/hard 网格。

### 改进 — 季节主题 hub FAQ 加深（2026-10-08）
- Halloween / Thanksgiving / Christmas / Winter 主题 FAQ 各扩至 4–5 条（年龄向语气、打印包、相关主题、禁 IP）；Thanksgiving/Christmas FAQ 同步六题打印包事实。
- 修改 `lib/theme-faq.ts`；Faq 组件继续输出 FAQPage schema。

### 改进 — Wave #2 P0 主题 hub 加厚（2026-10-08）
- 加厚 8 个仍偏薄主题 hub（调研 P0）：Woodworking、Painting、Camping、Baking、Kindness、Chess、Museums、Astronomy。
- 各主题 `description` 扩至约 123–131 词；`THEME_EXTRA`（vocabulary / goodFor / tip）与 description 合计约 313–329 有用英文词，并点名相关主题与 large print / how to play。
- 语气面向成人与老年读者；Kindness 明确无医疗宣称、无品牌名；全批禁 IP / 禁品牌。修改 `data/themes/*.json` 与 `lib/theme-content.ts`。

### 改进 — 加深 Christmas Large Print 打印包（2026-10-08）
- `/printables/christmas` 从 2 题扩至 **6** 题（christmas-large-01…06），Letter/A4 PDF 与预览图重生成；每文件 12 页（谜题奇页、答案偶页）。
- 落地页补充规格表、活动室用法、FAQ（字号/语气/许可/纸张/互链）；链到 `/themes/christmas`、`/holidays`、`/printables`、`/large-print`；预览区仍无 AdSlot。
- `/printables` 索引卡片改为六题文案；新增 Activity Director Kit 入口。

### 改进 — Activity Director Kit 落地页（2026-10-08）
- 新增 `/printables/activity-directors`：Letter vs A4、谜题页与答案页、小组活动提示、许可/署名、FAQ；无邮件门。
- 包入口卡片链 Everyday Large Print（6）、Thanksgiving、Christmas（6）、Halloween（evergreen 秋日选项）；互链 `/printables`、`/large-print`、`/daily`。
- Schema/meta 与其它 printable 页一致。

### 改进 — 继续主题 hub 加厚 Loop（2026-10-08）
- 加厚下一批 8 个仍偏薄主题 hub：Sewing、Hiking、Pottery、Photography、Forests、Swimming、Gratitude、Mindfulness（排除 Wave #1 P0/P1 已做 15 个）。
- 各主题 `description` 扩至约 124–136 词；`THEME_EXTRA`（vocabulary / goodFor / tip）与 description 合计约 333–375 有用英文词，并点名相关主题与 large print / how to play。
- 语气面向成人与老年读者；Mindfulness / Gratitude 明确无医疗宣称、无品牌名；全批禁 IP。修改 `data/themes/*.json` 与 `lib/theme-content.ts`。

### 改进 — Wave #1 P1 第二批主题 hub 加厚（2026-10-08）
- 加厚 7 个偏薄主题 hub：Quilting、Volunteering、Reading、Home、Calligraphy、Dogs、Valentine's Day。
- 各主题 `description` 扩至约 104–124 词；`THEME_EXTRA`（vocabulary / goodFor / tip）合计约 288–351 有用英文词，并点名相关主题与 large print。
- Dogs / Valentine's FAQ 从 1 条扩至 3 条（年龄向语气、禁品牌/禁 IP、相关主题跳转）；不阻塞于节日汇总页 FAQ。
- 语气面向成人与老年读者；Volunteering 无医疗宣称；全批禁 IP / 禁品牌。修改 `data/themes/*.json`、`lib/theme-content.ts`、`lib/theme-faq.ts`。

### 改进 — 加深 Everyday Large Print 打印包（2026-10-08）
- `/printables/large-print` 从 2 题扩至 **6** 题（large-print-pack-large-01…06），Letter/A4 PDF 与预览图重生成；每文件 12 页（谜题奇页、答案偶页）。
- 落地页补充规格表、活动室用法、FAQ（字号/方向/许可/纸张/在线互链）；广告位仍不放在打印预览区。
- `/printables` 索引与 `/large-print` 互链加强；`generate-printables.py` 支持可变包大小。

### 改进 — Wave #1 主题 hub 加厚 Loop（2026-10-08）
- 加厚 8 个偏薄主题 hub：Meditation、Birdwatching、Journaling、Lighthouses、Apothecary、Yoga、Knitting、Libraries。
- 各主题 `description` 扩至约 110–134 词；`THEME_EXTRA`（vocabulary / goodFor / tip）扩至合计约 290–330 有用英文词，并点名相关主题与 large print / how to play。
- 语气面向成人与老年读者；Meditation / Yoga / Apothecary 明确无医疗宣称、无品牌名；禁 IP。
- 修改 `data/themes/*.json` 与 `lib/theme-content.ts`，themeDates 随 hub 文案自动 bump。


### 改进 — PageSpeed移动与桌面报告整改（2026-10-08）
- 修复统计同意提示Privacy details只靠颜色区分的问题；手机Read more复选框补可访问名称，桌面端移出焦点/可访问树。
- 主题封面补320/640/960/1200px WebP，难度徽章补44/88/128px WebP；首页插图/装饰增加按实际尺寸选择的资源，保留原图并使用内容指纹路径和一年immutable缓存。
- 首页桌面LCP插画使用high加载优先级；修正主题主卡sizes及徽章/装饰sizes。广告与Google同意管理保留，不将第三方未使用脚本直接删除。
- 提供scripts/optimize-card-images.mjs及生成清单，原画替换后可重新派生指纹资源；部署及复测结果另附验收报告。
- 指纹图使用独立/art-assets目录，避免Cloudflare将重叠缓存规则合并成冲突的max-age。

### 修复 — 整合SEO发布与后续广告/Clarity功能（2026-10-08）
- 将SEO分支完整整合到最新master：恢复打印资源、主题筛选、多主题精选、重复题名修复、真实Sitemap日期、分析提示CLS整改及卡片预取控制；保留首页介绍配图、Clarity统计同意与已上线AdSense全局脚本。
- Daily保留最新master既有日期/网格，接续恢复至2026-11-07及30天生成目标；修复历史月份lastmod随其他月份每日题漂移。
- 发布真实广告账户的ads.txt：pub-6775124504429409，使用Google官方DIRECT记录格式；不把脚本和ads.txt上线等同于审核通过或产生收益。
- Bible题名明确Word Search，同步生成器而不改ID/种子/网格/进度；补充Halloween、Thanksgiving、Christmas、Winter、Valentines和Dogs实用FAQ及匹配schema。
- 主题/大字页移动端隐藏封面使用1px源；修正Grid size → Larger指令；增加当前月份详情入口，明确大字/Hard Pack与完整目录的用途区分。
- 修改仍待生产验收；GSC/GA4/AdSense后台、认证广告CMP、实际收信和推广不属于本次代码完成证据。
- 日期生成器纳入合并提交相对第一父提交的真实文件变更，避免整合部署遗漏dateModified；新增临时Git仓库回归验证首次发布日期保持不变。

### 新增 — AdSense 全站脚本（2026-10-08）
- 根布局 head 加入用户提供的 Google AdSense 脚本，publisher `ca-pub-6775124504429409`，保留 `async` 与 `crossorigin="anonymous"`，全站页面共享。
- 更新广告占位组件注释以反映全局脚本已接入。
- **Deploy（2026-10-08）：** commit `9e3e55d` → master；Worker `42303117-298c-4372-8a0b-531f7a8be3c4`，100% 流量。typecheck、predeploy（每日校验及全部测试）、生产构建通过；线上 `/` 和 `/daily` 各一份脚本，位于 head，publisher、async、crossorigin 均正确，格子和 canonical 正常。

### 新增 — Microsoft Clarity（2026-10-08）
- 全站接入 Clarity 项目 `yubihvuzyv`，异步加载官方追踪脚本；沿用现有 Analytics choices，仅同意统计后加载，并传递 ConsentV2（analytics granted / ads denied）。
- 撤回同意立即停止 Clarity、清理 `_clck` / `_clsk`；再次允许时刷新页面恢复完整项目配置。隐私页补充热图、会话录制和 Microsoft 隐私政策；独立于 GA4 的启用状态。
- 增加撤回时 ConsentV2、停止录制及 Cookie 清理回归检查；浏览器验证未选择／拒绝不加载、允许后仅一份异步 `https://www.clarity.ms/tag/yubihvuzyv`、撤回移除加载器。
- **Deploy（2026-10-08 11:52 Asia/Shanghai）：** commit `c7ae38c` → master；Worker `82593479-4115-4098-9afa-a5a95feb9ef7`，100% 流量。typecheck、全部测试、生产构建通过。线上允许统计后加载官方 SDK，并观察到 `h.clarity.ms/collect`；未同意零 Clarity 请求，撤回后停止且两项 Cookie 清空。验证收据：工作区 `research/clarity-release-qa.json`。

### 改进 — 首页标题区右侧配图（2026-10-08）
- 在“Today's puzzle is ready below; mark words right here”所在标题／介绍行右侧铺设咖啡、字谜和窗边植物插画；底层画面柔化至纸色，仅覆盖介绍区域，整宽可玩题保持在下方。
- 桌面复用现有响应式图片；手机／平板隐藏装饰图并选择1px占位源，保留首屏文字和游戏顺序。装饰图不拦截点击，对读屏隐藏。
- typecheck／生产构建通过；浏览器验证1440／1024／768／390／320px无横向溢出、唯一H1、引用文案一致、游戏仍在介绍区域下方；1024px以下装饰源确为1px data URI。正确版本截图位于工作区 `research/home-intro-right-art-1440.png`（及其他四种屏宽）。

- **Deploy（2026-10-08 11:38 Asia/Shanghai）：** commit `2a081ee` → master；Worker version `f73457e3-012a-4a13-a93d-e1a0779cc657`，100% 流量。线上1440/390px验证配图桌面加载、移动端隐藏、无横向溢出、唯一H1、canonical正确、游戏位于介绍下方，Larger切换可用；保留最新每日谜题。

### Daily puzzles
- 2026-10-15 — Daily Word Search: Airplanes (Medium) (airplanes / medium).
### 改进 — SEO流量入口与打印资源（2026-10-08）
- 首页精选按UTC月份选择季节题，覆盖六个不同主题、大字及三个难度。
- Themes目录增加主题搜索、分组、结果数和清空；所有121个链接仍在SSR中。
- 新增 /printables 及四个资源页，八份A4/Letter PDF、八张预览；每份两题与两张答案，24pt黑白网格；链接大字页、相关主题和原在线题。
- 消除Beach/Camping三组同名题，保留ID、种子、网格与既有进度。
- Sitemap使用实际内容修改日期，纳入打印资源，保留全部已发布Daily（不再仅一年）；主题日期包含共享内容依赖。
- Daily生成目标30天，校验最低7天；补排到2026-11-06，既有日期不变。
- 更新未投广告文案；PDF下载事件遵守既有analytics同意；未启用广告，也未创建虚假ads.txt。
- 主题和谜题卡片关闭批量链接预取，减少目录加载时提前请求未选择的页面；正常点击仍可导航。
- 修复Lighthouse发现的分析同意提示插入导致的布局偏移：SSR输出新访客提示，首屏脚本读取已保存选择，返回访客无需等待hydration隐藏。
- 校验包含发现/筛选/资源数据与既有玩法、分页、Daily。广告账户、认证CMP、GSC/GA4后台验证仍需账户访问。

### Daily puzzles — 新增排期
- 2026-11-10 — 10 puzzles (featured: Animals / medium; +9 catalog siblings).
- 2026-11-09 — 10 puzzles (featured: American History / easy; +9 catalog siblings).
- 2026-11-08 — 10 puzzles (featured: Airplanes / easy; +9 catalog siblings).
- 2026-11-07 — Daily Word Search: Fall (Hard) (fall / hard).
- 2026-10-15 — Daily Word Search: Airplanes (Medium) (airplanes / medium).
- 2026-10-16 — Daily Word Search: American History (Medium) (american-history / medium).
- 2026-10-17 — Daily Word Search: Animals (Hard) (animals / hard).
- 2026-10-18 — Daily Word Search: Apothecary (Easy) (apothecary / easy).
- 2026-10-19 — Daily Word Search: Halloween (Easy) (halloween / easy).
- 2026-10-20 — Daily Word Search: Fall (Medium) (fall / medium).
- 2026-10-21 — Daily Word Search: Airplanes (Easy) (airplanes / easy).
- 2026-10-22 — Daily Word Search: American History (Medium) (american-history / medium).
- 2026-10-23 — Daily Word Search: Animals (Medium) (animals / medium).
- 2026-10-24 — Daily Word Search: Apothecary (Hard) (apothecary / hard).
- 2026-10-25 — Daily Word Search: Halloween (Easy) (halloween / easy).
- 2026-10-26 — Daily Word Search: Fall (Easy) (fall / easy).
- 2026-10-27 — Daily Word Search: Airplanes (Medium) (airplanes / medium).
- 2026-10-28 — Daily Word Search: American History (Easy) (american-history / easy).
- 2026-10-29 — Daily Word Search: Animals (Medium) (animals / medium).
- 2026-10-30 — Daily Word Search: Apothecary (Medium) (apothecary / medium).
- 2026-10-31 — Daily Word Search: Halloween (Hard) (halloween / hard).
- 2026-11-01 — Daily Word Search: Fall (Easy) (fall / easy).
- 2026-11-02 — Daily Word Search: Airplanes (Easy) (airplanes / easy).
- 2026-11-03 — Daily Word Search: American History (Medium) (american-history / medium).
- 2026-11-04 — Daily Word Search: Animals (Easy) (animals / easy).
- 2026-11-05 — Daily Word Search: Apothecary (Medium) (apothecary / medium).
- 2026-11-06 — Daily Word Search: Architecture (Medium) (architecture / medium).

### 改进 — 补齐全部主题难度递进图 + 节日 OG 底图（2026-10-08）
- Asrock `words-at-rest-current` 交付：此前缺失的 **101** 个主题 × Easy/Medium/Hard 插画（各 `1200×900` + `-640` + `-320`），共 **909** 个新 WebP；原有 **20** 组难度图字节未改。
- 全站难度递进图现为 **121 / 121** 主题齐全（`final-validation.json`：`availableTotalThemeSeries=121`、`missing=[]`、`uniqueDifficultyMasters=303`）。
- 独立 `design/og-base/og-holidays.png`（不再复用 fall）；同步 `public/images/holidays/og-holidays.png`；仅重生成 `/public/og/holidays.jpg`（**未**回写 Asrock 上过期的主题 OG JPG，避免回归）。
- `lib/images.ts` 的 `DIFFICULTY_ART_THEMES` 扩至全部 121 slug，谜题页 `puzzleArt` 可按难度选用递进图。
- 未改封面 / 主题 OG 底图（与 master MD5 一致）；未改谜题数据 / content dates；未提交 `tsbuildinfo`。
- 校验收据：`design/exports/difficulty-2026-10-08/{README.md,final-validation.json}`。
- **Deploy（2026-10-08 ~02:35 Asia/Shanghai）：** commit `842019d` → master；Worker version `714fedcd-3b65-4a8a-9cb3-f2e467b91a3c`（account `b79c11a97188ceeb150acb0b6c4cda97`）。线上 10/10 MD5 抽查 MATCH（含 airplanes 三难度、yoga-hard-640、museums-medium、weather-easy-320、food-easy、valentines 封面、`/og/holidays.jpg`、`/images/holidays/og-holidays.png`）；holidays OG ≠ fall。证据：`/workspace/reports/wordsatrest-images-complete-2026-10-08/`。

### 改进 — 难度 / 大字列表分页（2026-10-08）
- `/difficulty/easy|medium|hard` 与 `/large-print` 不再一次渲染全部 PuzzleCard（此前 easy ≈ **1.0 MB HTML / ~531 图**）。
- 每页 **24** 张卡片；可抓取路径 `/difficulty/{level}/page/{n}`、`/large-print/page/{n}`（第 1 页仍为裸路径，无 `/page/1`）。
- 分页控件：Previous / Next（`rel=prev|next`）+ 窗口页码，大触控目标；页顶 “Showing X–Y of Z”。
- 长文案 / FAQ / Sources / DifficultyTable 仅保留在第 1 页，后续页轻量并链回总览。
- `sitemap.xml` 纳入难度与大字后续页；`/page/1` 永久重定向到裸路径；越界页 404。
- 新增 `lib/pagination.ts`、`components/Pagination.tsx`、共享 `DifficultyLevelView` / `LargePrintView`；`scripts/test-pagination.mjs` 接入 `npm test`。
- 未改谜题数据 / 主题路由 / Daily；`/themes` 目录页仍为全量 ThemeCard（约 379 KB，后续可再分页）。
- **Deploy（2026-10-08 ~02:15 Asia/Shanghai）：** commit `e1115fa` → master；Worker version `38c40d3b-b6a1-4360-b576-df350e58d452`（account `b79c11a97188ceeb150acb0b6c4cda97`）。线上 easy HTML **1,024,596 → 109,219**（−89%），imgs ~531 → 29；page/2 可抓取；page/999 404。证据：`/workspace/reports/wordsatrest-difficulty-paginate-2026-10-08/`。

### 改进 — 首页嵌入今日可玩 Daily 格子（2026-10-08）
- 首页 `/` 首屏改为嵌入与 `/daily` **同一道**今日谜题的可交互 `PuzzleGrid`（词表、拖选／两点选、键盘、Grid size Larger、Reset 均可用）；不再用装饰性 mini-grid 预览卡跳转。
- 进度键仍为 `war:progress:${puzzleId}`，与 `/daily` 共用 localStorage，首页与每日页切换不丢进度。
- `/daily` 仍为 Daily 正式页（文案、归档、FAQ、canonical）；首页仅轻量标签 +「Full daily page / Calendar」链接，不整站重定向、不复制 Daily ItemPage JSON-LD。
- SEO 定义／主题／来源等仍在折线下方；`home-mid` 广告仍在主题区之后，不盖住字母格。
- 新增 `components/HomeDailyPuzzle.tsx`；精简 `DailyLauncher`（仅保留 LauncherChips）；`home-launcher` CSS 改为全宽 stack。
- 未改谜题数据 / content dates；未提交 `tsbuildinfo`。
- **Deploy（2026-10-08 ~01:35 Asia/Shanghai）：** commit `1eee66b` → master；Worker version `4489ca13-84c9-4c6c-a6eb-e96159d5e4cb`（account `b79c11a97188ceeb150acb0b6c4cda97`）。线上 `/` 可圈词且 URL 不跳转；`/daily` 共用 `war:progress:daily-2026-10-07`。证据：`/workspace/reports/wordsatrest-home-embed-2026-10-08/`。

### 改进 — 105 个主题专属封面与 OG 底图（2026-10-07）
- 用 Asrock `words-at-rest-current` 新出的专属插画替换此前复用父主题占位图的 **105** 个主题封面（`public/images/themes/{slug}.webp` + `-640.webp`）及对应 `design/og-base/og-theme-{slug}.png`；16 个 keeper（animals / bible / cats / christmas / dogs / fall / food / garden / halloween / hard-pack / large-print-pack / music / ocean / space / sports / travel）未改。
- 全站 **121 / 121** 主题封面与 OG 底图现均为独立 MD5；Asrock `final-validation.json`：`uniqueCoverHashes=121`、`uniqueOgHashes=121`、`issues=[]`。含 P0 节日：valentines、thanksgiving、winter、easter，以及 golf 等原复用组。
- 已有 `-640` 与校验收据一致，跳过 `derive-images`；运行 `node scripts/generate-og.mjs` 为 105 个主题重生成 `/public/og/themes/*.jpg`（keeper OG 卡字节未变）。
- 未改谜题 / hub 文案 / `data/themes`；未提交 `tsbuildinfo`。`/holidays` 的 `og-holidays.png` 仍与 fall 同源（用户未提供新 holidays 底图）。
- typecheck + 生产构建通过。
- **Deploy（2026-10-07 ~16:19 Asia/Shanghai）：** commit `c254de3` → master；Worker version `872c6c6e-1033-43e3-be36-a9d69f71885e`（account `b79c11a97188ceeb150acb0b6c4cda97`）。线上 MD5 抽查 valentines/thanksgiving/winter/easter/golf/yoga/apothecary 封面与 OG 均与仓库一致；上述原复用组相对 food/fall/christmas/garden/sports 已独立。证据：`/workspace/reports/wordsatrest-images-deploy-2026-10-07/`。

### 改进 — 强化解题反馈（2026-10-07，已上线）
- 根据竞品实测强化全部PuzzleGrid：拖选预览与实际答案改为连续圆角色带，四组柔和颜色保留不同答案；依据实际格子中心绘制，适配标准／大字、手机、横纵斜向和交叉路径，保留服务端字母及无JS高亮。
- 找词增加整路径扫亮、棋盘上方成功提示、词表勾选／强调及同步计数进度；保留剩余词数。通关增加一次短粒子庆祝、边缘光晕、完整成果与下一题预告。
- 字母不移动，输入不锁定，装饰不拦截指针；恢复、重复词不重播，Reset／卸载清理定时器及尺寸观察器。减少动态偏好禁用动画和粒子，保留色带／文字／勾选；打印隐藏装饰。
- 新增路径坐标回归用于横纵斜向、反向、单点与尺寸变化；typecheck／构建／七组game及Daily测试通过（1043题＋8 Daily，12943处合法选词）。浏览器验证指针BAT、键盘10/10／多条同时反馈／焦点保持、恢复与重复不重播、Reset清理、320px Larger无溢出和反向斜线CAULDRON扫亮；最终整合构建及线上验证均通过。
- 同步最新master `01e3bf8` 的20个主题hub文案及10月14日Daily排期；排期采用上游原始版本，未重复生成或覆盖已发布题目。
- [PR #3](https://github.com/jiayixuan1009/words-at-rest/pull/3)合并为 `44bf5f1`，本地文件树与GitHub提交树完整一致；正式合并版本重新构建并通过发布前全部检查。2026-10-07 10:56（UTC+8）发布 Worker `0d471ad6-5d65-4b34-8ca5-75584265ac23`，承接100%流量；回滚点为 `c97af9aa-6df3-46da-94e1-07d6f8caebfd`。
- 线上验证16页JSON-LD、metadata/canonical、404/noindex、robots及sitemap通过；浏览器恢复旧10/10无动画，再用指针BAT＋键盘完成新10/10，十条色带／勾选／完成卡片正常，下一题导航至Quiet Porch且进度独立0/10。动态帧、并行扫亮及粒子由本地浏览器验证；正式站自动操作较慢，未捕捉瞬时动画帧。上线截图在工作区 `research/release-strong-feedback-2026-10-07/production-complete.png`。
## 2026-10-07 — Hub 文案加厚（Wave C–K 偏薄主题，已部署）

### 维护 — Daily 缓冲补天
- `npm run daily:add`：补 `2026-10-14` Daily（Fall / Easy），满足 `DAILY_BUFFER_DAYS=7`。

### 变更 — 加厚 20 个偏薄主题 hub 英文 intro
- 目标：每个 hub 原创英文约 **250–450** 词（description + `THEME_EXTRA`），面向成人/大字友好，FAQ 式价值说明，链到相关主题 / how-to-play / large-print；无关键词堆砌、无医疗宣称、无 IP。
- **加厚主题（20）：** farm-animals、gardening-tools、national-parks、board-games、american-history、world-capitals、human-body、us-states、music-terms、coffee-tea、fathers-day、mothers-day、independence-day、st-patricks、kitchen、breakfast、vegetables、soccer、basketball、deserts。
- 优先：缺 `THEME_EXTRA` 的 Wave H/C 等新主题、季节 hub、Food/Sports/Music/Garden 子主题与地理长尾；已较厚的 halloween 等跳过。
- `data/themes/*.json` description 扩写；`lib/theme-content.ts` 补全/加厚 vocabulary / goodFor / tip。
- `themeDates()` 纳入对应 `data/themes/{id}.json`，hub 文案提交后 `dateModified` 随 git 自然更新（仅改文案的 hub，不碰谜题文件）。
- **Commits:** `c5a7417`（文案）→ `3c842dd`（Daily 缓冲）。
- **Deploy:** Worker version `c97af9aa-6df3-46da-94e1-07d6f8caebfd` → wordsatrest.com（account `b79c11a97188ceeb150acb0b6c4cda97`），2026-10-07 约 09:31 Asia/Shanghai。
- **线上抽查：** `/themes/farm-animals`、`coffee-tea`、`soccer`、`deserts`、`mothers-day` 均含加厚 description + EXTRA 段落。

## 2026-10-07 — Wave JK（冲过 ~1000，已部署）

### 新增 — Wave JK（+5 主题 / +215 谜题 → **1043**）
- **新主题（各 6）：** meditation、birdwatching、lighthouses、journaling、apothecary。
- **加深（+185）：** 全部 86 个仅 6 题的 hub 各 +2（easy-03 / medium-03）；hard-pack +5；large-print-pack +8。新词表与网格，不覆盖旧题。
- **规模：** 主题 116→**121**，谜题 828→**1043**（**达成 ~1000 目标**）。
- **Deploy:** Worker version `19995dd6` → wordsatrest.com（account `b79c11a97188ceeb150acb0b6c4cda97`）。

## 2026-10-07 — Wave I（加深季节/爱好 + 新工艺主题，已部署）

### 新增 — Wave I（+6 主题 / +112 谜题）
- **新主题（各 6）：** pottery、woodworking、calligraphy、libraries、volunteering、gardening-tools。
- **加深既有 hub（+76）：** travel/music/cats/dogs/space/beach/camping/mountains 各 +4；knitting/reading/painting/sewing/quilting/hiking/cycling/swimming/tools 各 +2；christmas/halloween/animals/garden/ocean/fall/winter/thanksgiving/food/sports/bible 加深；large-print-pack +4。新词表与网格，不覆盖旧题。
- **规模：** 主题 110→**116**，谜题 716→**828**（朝 ~1000）。
- **Deploy:** Worker version `335086c4` → wordsatrest.com（account `b79c11a97188ceeb150acb0b6c4cda97`）。

## 2026-10-07 — Wave H（加深高流量 + 新主题，已部署）

### 新增 — Wave H（+8 主题 / +111 谜题）
- **新主题（各 6）：** chess、national-parks、landmarks、farm-animals、home、astronomy、board-games、yoga。
- **加深既有 hub（+63）：** christmas / halloween / bible / animals / food / sports / garden / ocean / fall 各 +4；travel / music / cats / dogs 各 +4；winter / thanksgiving 各 +2；large-print-pack +4；space +3。新词表与网格，不覆盖旧题。
- **规模：** 主题 102→**110**，谜题 605→**716**（朝 ~1000）。
- **Deploy:** Worker version `18848d8e` → wordsatrest.com（account `b79c11a97188ceeb150acb0b6c4cda97`）。

## 2026-10-07 — Wave G（新主题 + 高流量加深，已部署）

### 新增 — Wave G（+10 主题 / +103 谜题）
- **新主题（各 6）：** sewing、quilting、swimming、hiking、cycling、geology、architecture、islands、emotions、photography。
- **加深既有 hub（+43）：** halloween / christmas / fall / animals / food / sports / ocean / garden 各 +4；bible +3；thanksgiving / winter 各 +2；large-print-pack +4。新词表与网格，不覆盖旧题。
- **规模：** 主题 92→**102**，谜题 502→**605**（朝 ~1000）。
- **Deploy:** Worker version `a48dbe45` → wordsatrest.com（account `b79c11a97188ceeb150acb0b6c4cda97`）。

### 改进 — 解题反馈动效（2026-10-07，已上线）
- [PR #2](https://github.com/jiayixuan1009/words-at-rest/pull/2)已合并，正式源代码master `9ecd5c3`包含最新Wave JK的121主题/1043谜题；2026-10-07 02:36（UTC+8）部署到wordsatrest.com，版本 `ef2aeba3-961d-46cf-a60f-359c857e89d1` 承接100%流量。
- 最终master重新通过typecheck、Daily检查、12932处合法选词回归与完整构建；线上16页JSON-LD、SSR metadata/404/noindex/robots/sitemap通过。正式域名复验恢复旧10/10进度及新完成卡片，再用指针与键盘完成新10/10；网格/词表/进度和完成态均正常。
- 发布前回滚版本 `19995dd6-b720-4ef6-b47b-5ce591aed4dc` 已记录；Worker启动53ms（不代表页面LCP）。线上截图与发布证据保存在工作区 `research/release-motion-2026-10-07/`。
- 选区加强色带与首尾描边；点击/键盘首字母光圈；新找到词按实际路径依次柔和亮起，词表划线和计数联动，细进度条平滑前进；不匹配选区淡出并给出温和提示。
- 完成态统一为词表旁的简洁完成卡片与下一题入口，增加一次网格光晕；不移动字母或改变格子尺寸，不阻止连续输入，无自动音效或粒子。
- 动效只针对本次新找到的词；恢复进度不重播，重复词不加分/重播，Reset及卸载清理反馈定时器。支持prefers-reduced-motion，打印时隐藏动效装饰。
- 验证：typecheck、691处合法选词与Daily回归、生产构建通过；浏览器键盘连续完成10/10，多个成功反馈并行；指针首尾、错误选区、重复词、恢复无动画、Reset清理、下一题及320px Larger无溢出通过；减少动态的CSS覆盖已确认，无浏览器error日志。说明见 `docs/PUZZLE-FEEDBACK.md`。
- 发布前同步master `532fd09`（Wave G，102主题/605题），仅CHANGELOG发生冲突，双方记录均保留；整合后typecheck、7594处合法选词/Daily回归与完整生产构建重新通过。
## 2026-10-07 — Wave F（地理/手作/庆典/科学神话/地貌/博物馆，已部署）

### 新增 — Wave F 批量内容（+15 主题 / +90 谜题）
- 主题：countries、continents、cities、knitting、reading、painting、birthday、wedding、chemistry、mythology、volcanoes、forests、rivers、deserts、museums（各 6 题）。
- mythology 仅通用神话名词，无影视游戏 IP；chemistry / money 类不做品牌与医疗建议。
- `parentSlug`：forests → trees；rivers → lakes。
- **规模：** 主题 77→**92**，谜题 412→**502**（朝 ~1000）。
- **已部署：** Worker `words-at-rest` 版本 `7bbc1c6f-33f1-41f9-b47d-7a4ff4da959b`；commit `f7f574d`；sitemap ≈**612** `<loc>`；`llms.txt` 92/502。
- **下一波建议（Wave G）：** gardening-tools / sewing / quilting； swimming / hiking / cycling； astronomy（dup space skip）/ geology / weather-already； emotions / hobbies； architecture / buildings； islands / coasts； orthography skip；或给热门主题再各加 2–4 道变体谜题冲数量。


## 2026-10-07 — Wave E（软主题 + 颜色/工具 + 球类 + 历史/科学 + 烹饪/购物，已部署）

### 新增 — Wave E 批量内容（+15 主题 / +90 谜题）
- 对齐竞品主题名；自写词表与网格；不做具名 IP / 俱乐部 / 银行品牌。
- **主题：** kindness、gratitude、mindfulness、colors、tools、soccer、basketball、american-history、presidents、dinosaurs、insects、reptiles、cooking、shopping、money（各 6 题）。
- `parentSlug`：soccer/basketball → sports；reptiles → animals；cooking → food。
- 封面 / OG 暂借邻近主题图。
- **规模：** 主题 62→**77**，谜题 322→**412**（朝 ~1000）。
- **已部署：** Worker `words-at-rest` 版本 `395dc560-0c80-45f1-875f-519f6230715f`；commit `35b33b4`；sitemap ≈**507** `<loc>`；`llms.txt` 77/412。
- **下一波建议（Wave F）：** countries / continents / cities； knitting / reading / painting； birthday / wedding； chemistry / mythology / volcanoes / forests；或加厚偏薄 hub + 专属封面。


## 2026-10-07 — Wave D（地理/教育 + 户外/交通 + 软主题，已部署）

### 新增 — Wave D 批量内容（+15 主题 / +90 谜题）
- 对齐竞品公开主题目录（地理、人体、露营、交通、农场、湖山、学校、职业、友谊等 **主题名**），自写词表与网格。
- **主题：** us-states、world-capitals、human-body、camping、horses、cars、trains、airplanes、farming、beach、mountains、lakes、school、jobs、friendship（各 6 题）。
- `parentSlug`：horses → animals；beach → ocean。
- 封面 / OG 暂借 travel / ocean / fall / animals / space / garden / bible / valentines。
- **规模：** 主题 47→**62**，谜题 232→**322**（朝 ~1000）。
- **已部署：** Worker `words-at-rest` 版本 `dc80faf2-31e1-4d72-9de2-2ccd29122285`；commit `c85285b`；sitemap ≈**402** `<loc>`；`llms.txt` 62/322。
- **下一波建议（Wave E）：** kindness / gratitude / mindfulness；colors / shapes；tools / gardening-tools；soccer / basketball；history（american-history / presidents）；或加厚偏薄 hub + 专属封面。


## 2026-10-07 — Wave C（节日二波 + 厨房/自然，已部署）

### 新增 — Wave C 批量内容（+15 主题 / +90 谜题）
- 对齐竞品公开主题目录（purewordsearch / thewordsearch 等 **主题名**），自写词表与网格，不整页照搬。
- **节日 / 季节：** new-year、st-patricks、mothers-day、fathers-day、independence-day、spring、summer（各 6 题：2 easy / 2 medium / 1 hard / 1 large）。
- **厨房 / 自然：** vegetables、breakfast、coffee-tea、kitchen、birds、flowers、trees、weather（各 6 题）。
- `parentSlug`：vegetables/breakfast → food；birds → animals；flowers/trees → garden。
- `/holidays` 扩展为 11 个季节主题；`llms.txt`、主题索引页文案同步。
- 封面 / OG 暂借邻近主题图（见 `lib/images.ts` Wave C 注释）；难度图回退主题封面。
- **规模：** 主题 32→**47**，谜题 142→**232**（朝 ~1000 分波推进）。
- **已部署：** Worker `words-at-rest` 版本 `d609cf06-ecfb-42f4-b4be-cd79afc2296f`；commit `96f2c0e`；正式域名复验 sitemap **297** `<loc>`，`llms.txt` 47/232；15 个新 hub 与抽样谜题 200；GA 默认 HTML 无 gtag；页眉仍 4 项。
- **下一波建议（Wave D）：** 地理/教育长尾（us-states、world-capitals、human-body、camping、horses）或给偏薄主题 hub 加厚文案 + 专属封面；继续少功能、多内容。


### 发布 — 全站审计优先整改（2026-10-07，UTC+8）
- [PR #1](https://github.com/jiayixuan1009/words-at-rest/pull/1) 已合并；生产源代码为 master `ebcf70a`，原整改提交 `8f9dfd5`。
- 00:20 部署到现有 Worker `words-at-rest`，版本 `00f1fac4-8150-443b-a2de-48d0598e124c`，承接100%流量；正式域名 `https://wordsatrest.com` 已复验。
- 合并后重新通过typecheck、Daily缓冲、6组回归与生产构建；线上16页JSON-LD、SSR metadata、404/noindex、robots与sitemap通过。浏览器确认10/10进度恢复、重复BAT不加分、网格单一Tab入口、拒绝分析无Google标签以及下一题进入Fall Easy。
- 发布前版本 `06f31cf7-8e5d-431c-a8d9-2ad18cd7f02d` 已记录供回滚。真实广告/CMP、GA到账/GSC、邮箱、读屏与性能仍待验收。

### 修复 — 全站审计优先整改（已合并部署，基于 master `58608c3`）
- `8f9dfd5`（2026-10-06 23:31，UTC+8）：以下优先整改代码与测试；验证结果见 `docs/AUDIT-REMEDIATION.md`。
- 验证工具：图片检查修复Windows文件URL转路径；README移除过时的hash Daily说明；Analytics关闭时不排队游戏事件。
- HTTP回归：检查SSR head标签、未来/无效日期404和noindex、robots与sitemap；移动指针只处理当前被捕获的指针。
- 测量参数：各游戏事件携带grid_mode与入口路径，page_view保留真实URL的UTM参数以支持来源归因。
- 整改状态与证据写入 `docs/AUDIT-REMEDIATION.md`，同步工作区问题列表；明确区分已实现、待部署及账户/广告/性能待验收项。
- 发布过程：GitHub集成写入返回403后，使用用户授权的本机Git登录推送并创建PR；2026-10-07已合并部署，补丁保留为历史交付。
- F14：主题目录分为Seasonal、Anytime与Large print/Challenge packs，提供锚点跳转，保持所有主题的可抓取链接；手机隐藏目录装饰图。
- 发布前置：`predeploy`执行Daily缓冲与回归测试；无障碍声明同步键盘与朗读能力，保留NVDA/VoiceOver/TalkBack未验收说明；Daily运维说明禁止替换已公开题目。
- 回归验证：新增真实选词/路径迁移/方向限制与全题库检查，Daily测试改为直接调用实现（tsx开发依赖）；仅已同意的事件可等待GA初始化，拒绝/撤回会清空队列，未授权游戏行为不回填。
- F04 / F05：主题、大字、成人页在标题旁提供直接开玩入口，手机介绍折叠/装饰图隐藏；首页与Daily提供具体Easy和9×9题入口，Daily手机装饰图后置。
- F12 / F18：谜题页移除重复通用拼写/WCAG引语，保留有明确主题依据的来源；玩法说明同步键盘与 Grid size → Larger。
- F07 / F10：GA改为接受分析后才加载（Basic consent mode），广告权限保持denied；提供拒绝、隐私页撤回与页脚入口，游戏事件不含所选路径/字母，SPA显式page_view；后台到账、Enhanced Measurement去重和正式广告CMP仍待账户验收。
- F11：首日题冻结为独立JSON，保留原ID/进度；缺失日期不再hash回退，Daily/首页显示暂未就绪，日期页404，日历/sitemap仅链接已发布日期。
- F18：Daily说明改用 Grid size → Larger，与当前控件一致。
- F01：选词按实际字母与题目允许方向匹配，接受非预设正确位置；保存实际路径，兼容旧版已找到词数组，恢复时校验数据。
- F03：网格单一 Tab 入口、方向键/Home/End移动、Enter/Space选首尾、Escape取消，行列与找到状态朗读；pointercancel只取消选择。
- F13 / F07：完成态提供同难度下一题；游戏事件仅在接受分析且GA可用时发送。键盘与辅助技术全面验收仍待实机验证。

### 发布 — Package B：节日 Wave 1 + 全部 12 个子主题（2026-10-07，UTC+8）
- 用户确认方案 B（节日与 12 个子主题同批上线）。分支 `holidays-rebase`（worktree `/workspace/war-holidays`）基于 master `de568d3`。
- **节日 Wave 1**（`e731b3f` ← `0b358cc`）：Thanksgiving、Winter、Valentine's Day、Easter，各 6 题；`/holidays` 汇总页；页脚入口；难度递进图已从 `design/pending-difficulty/` 接入 `public/images/themes/`（`DIFFICULTY_ART_THEMES`）。封面 / OG 暂借旧图。
- **子主题 Wave 1**（`f46526d` ← `6ddb57c`）：Sports → golf / baseball / tennis / fishing；Food → baking / desserts / herbs / fruits；Music → instruments / jazz / classical / music-terms；各 6 题。`parentSlug`、父页 Explore 卡片、面包屑 Themes → 父 → 子。封面 / OG 暂用父主题图。
- **文档**合入：`docs/PRODUCT.md`、`docs/ROADMAP.md`、`docs/README.md`、`design/STRUCTURED-DATA-PLAN.md`。
- **导航：** 顶部仍 4 项（Daily / Themes / Large Print / How to Play）；Holidays 在页脚。
- **规模：** 主题 16→**32**，谜题 46→**142**。`llms.txt` / sitemap 同步。
- 本地验证（`holidays-rebase`）：typecheck、build、check-images（20 主题难度图）、check-jsonld、check-routes、daily:check、daily:test、`npm test`（142 catalog）均通过；预览 sitemap ≈192 `<loc>`。
- **已部署：** Worker `words-at-rest` 版本 `a4473ae1-345a-4d06-9fe6-d50c330f45bc`，流量 100%；正式域名 `https://wordsatrest.com` 复验：`/holidays` 与 32 个主题 hub、抽样谜题 200；sitemap **191** `<loc>`；`llms.txt` 32 / 142；无效主题与未来 Daily 404+noindex；GA 默认 HTML 无 gtag（同意后才加载）；页脚 Holidays 入口在。
- 回滚版本：`00f1fac4-8150-443b-a2de-48d0598e124c`（Package B 前的 audit 部署）。


- 规划：`design/THEME-EXPANSION-PLAN.md`；出图：`design/HOLIDAY-IMAGE-REQUEST.md`、`design/SUBTHEME-IMAGE-REQUEST.md`。

---

## 2026-10-06 — master（已推送 origin/master）

### 新增 — 谜题网格尺寸 Standard | Larger（grid size，2026-10-06 晚间部署）
- `bf82377`（21:14）：每个谜题页（主题谜题、`/daily`、`/daily/<date>`、大字谜题）网格上方一个两段式开关 "Grid size: Standard | Larger"，取代原来每题的 "Large print / Standard print" 按钮（不再有两个互相竞争的按钮）。`aria-pressed`、≥44px、键盘可用、橙色焦点框。只改谜题网格与单词表，不缩放全站文字。
  - 全站一个偏好：`localStorage` `war:gridSize`；`app/layout.tsx` `<head>` 内联小脚本在首屏绘制前给 `<html>` 设 `data-grid-size`，尺寸与布局全部由 CSS 决定，无闪烁、无 CLS（实测 0）。服务器 HTML 对所有人相同，默认 Standard。旧键 `war:largePrint`（"1" → Larger、"0" → Standard）自动迁移。无 cookie、无上报。
  - 大字谜题（9×9）没有选择时默认 Larger；用户选过 Standard 则也按 Standard。`/large-print` 合集与页面保留为内容。
  - Larger 设计：手机网格贴满屏幕宽度（两侧各留 10px，避开边缘返回手势）；桌面最大约 736px 且不高于窗口；单词表移到网格下方、24px、按最长单词自动分列（13 字母长词不断词）；网格线与边框加深，已找到格子底色加深（`#bcd8b4`）。字母 0.78 × 格宽（16–52px），上限 0.84 × 格宽，始终在格内。
  - 实测字号（Standard → Larger）：390px easy 21→29px、medium 18→24px、hard 14→19px；1280px easy 30→52px、medium 29→46.5px、hard 23→37px；320px hard 14→16px；大字谜题 390px 24→32px、1280px 30→52px。320–1280 两种模式均无横向滚动。
  - 文案同步：`/accessibility`（新 "Grid size and large print" 一节与触控、键盘说明）、`/privacy`（本地保存 "grid size preference"）、`/daily` 与 `/large-print` FAQ、首页 "Easy on the eyes"、dogs 主题描述。
  - 顺带：`/calendar` 两页 stone-500/600 文字改为 `--ink-soft`（stone-500 约 4.2:1 → 8.0:1），与排版 P1 一致。
  - 验证：typecheck、build、check-jsonld、check-images、daily:check、daily:test 通过；Lighthouse（手机，本地 preview，hard 谜题，3 次）LCP ≈6.65s、CLS 0、无障碍 100，与改动前相同。

### 改进 — 字体排版 P0 + P1（typography，2026-10-06 晚间部署）
- `10f8113`（2026-10-06 20:51，原 `64a03ee`，已 rebase 到 origin/master `eb082a0`；页脚保留 Daily / Calendar 并加 Hard puzzles）按 2026-10-06 排版审计（报告未入库）落地 P0 + P1；用户与爬虫同一 HTML，暖色杂志风与衬线标题不变。
  - 网格字母：Courier New 600 → 粗体无衬线（Verdana / Segoe UI / Roboto / Noto Sans 栈，700），字号随格子宽度：0.62 × 格宽（14–30px），Large print 0.75 ×（16–44px）；用容器查询单位 `cqi` + `--n`（每行字母数），旧浏览器按视口宽度估算。390px 手机：easy 16→21px、medium 16→18px、hard 16→14px（字形更大，cap 9.5→10.3px）；1280px：20→30 / 29 / 23px。
  - 手机端所有难度格子恢复正方形：hard 22.9×26 → 22.9×22.9（网格 358×404 → 358×358）；hard + Large print 22.9×34 → 正方形（网格 524 → 358 高）。
  - 已找到单词 `#a89880`（2.5:1）→ `#736452`（5.0:1），保留删除线。
  - Large print / Reset 按钮与计数 14px → 17px，最小高度 40 → 44px；Tip 14px → 17px 无衬线；谜题卡片 meta 12px 大写 → 15px 句首大写（"Easy · 10×10 · 10 words"）。
  - 单词表 16 → 18px（桌面 20px，Large print 24px）；列宽不小于最长单词（全数据最长 13 字母，如 CONCENTRATION），长词改单列而不是断词。
  - 面包屑、署名、事实条、引用说明、图注 14–15px → 16px；`<cite>` 改正体。眉标 12.8px / 0.22em → 14px / 0.1em；11.2px 标签（首页每日卡日期、页头标语）→ 14px。
  - 次要文字 `--ink-soft` `#5c5348`（6.6:1）→ `#4f473d`（8.0:1）；stone-500/600 文字统一为 ink-soft。
  - 顶部导航 13–15.2px → 17px，5 项减为 4 项：**Hard** 移到页脚（"Hard puzzles"），Large Print 保留；手机行允许换行兜底；标语改为 md 起显示，640px 导航也恢复单行。页脚小字 14px 衬线 → 16px 无衬线。
  - `/accessibility`：更新字号、格子、对比度（次要文字 8:1、已找到单词 5:1）与触控高度（≥44px）；删除已修复的"已找到单词对比度不足"已知问题，其余已知问题保留。
  - 验证：typecheck、build、check-jsonld、check-images 通过；320/360/390/430/1280 无横向溢出；Lighthouse（手机，本地 preview，3 次）LCP ≈6.65s → ≈6.65s、CLS 0 → 0、无障碍 100 → 100。

### 新增 — Daily 日程与日历（daily calendar，2026-10-06 晚间部署）
- `d549e91` … `9e6f70f`（约 20:45–20:50）从 2026-10-07 起每天预生成一道**唯一** Daily 谜题（`data/daily.json`），缓冲 today+7；`npm run daily:add` / `daily:check` / `daily:test`。2026-10-06 仍走原 hash 选中（`animals-hard-01` Hard Animals，与线上一致），不入日程。
  - 难度按 UTC 星期：日 / 一 / 三 easy；二 / 四 / 五 medium；六 hard；主题轮换避开 packs、5 天内不重复，十月优先 Halloween / Fall；词集与同主题重叠 &lt;70%；永不 large print。
  - 新页 `/calendar`、`/calendar/YYYY-MM`：月历（≥44px 触控、手机列表）+ 倒序 “What’s new” 日志；未来日灰显且不链出；`/daily/calendar` 非日期 → 404。
  - `/daily` 加 “See the full calendar”；日期页点明主题/难度并链主题页；页脚、sitemap、`llms.txt`、JSON-LD（CollectionPage + ItemList）已接。
  - 文档 `docs/DAILY-PUZZLES.md`（含每日运维与 CHANGELOG 一行/日约定）；`DAILY_TODAY` 可经 Vite `define` 本地模拟日期。
- 已排队（至 2026-10-13）：10-07 Halloween Easy · 10-08 Fall Medium · 10-09 Animals Medium · 10-10 Bible Hard · 10-11 Cats Easy · 10-12 Dogs Easy · 10-13 Halloween Medium。

### 新增 — 引用与引语（citations，2026-10-06 晚间部署）
- `c5129af`（约 19:40）
  - 首页新增 "Why word puzzles?"（MobileMore 折叠，用户与爬虫同一 HTML）：引用 NIA 完整 blockquote、Alzheimer’s Society 原句、W3C WCAG 1.4.4 resize-text；Sources 列表 + JSON-LD `citation`。
  - 主题 hub：bible / garden / ocean / space 各挂可核实来源（Project Gutenberg KJV 公有领域、USDA 耐寒区、NOAA 海水占比、NASA 八大行星）并配原句 blockquote；其余主题用 Merriam-Webster 美式拼写说明。
  - 谜题页 "About this puzzle" 轻量 Source 行 + 链到 How to play 的 WCAG 引语；`/daily`、`/difficulty/*`、`/themes`、About 同步补引。
  - 注册表 `lib/citations.ts`；UI `Quote` / `SourceNote` / `InlineSource`；对照表 `design/CITATIONS.md`（每条含核对日 2026-10-06 与原文支撑句）。不编造数据、无医疗夸大。

### 新增 — 难度递进图（difficulty images，2026-10-06 晚间部署）
- `981b479`（19:30）
  - 16 个已上线主题各接入 Easy / Medium / Hard 三张同系列插画 `public/images/themes/<slug>-<easy|medium|hard>.webp`（1200×900），由 `scripts/derive-images.mjs` 派生 640w 和新增的 320w 缩略图。
  - 规则：`lib/images.ts` `puzzleArt()` — 主题在 `DIFFICULTY_ART_THEMES` 中则用难度图，否则回退主题封面；大字谜题复用 easy 图（按 `design/difficulty-image-manifest.csv`）。
  - 显示位置：谜题列表卡片（主题页、`/difficulty/*`、相关谜题、首页、大字页）桌面端 112px 缩略图；谜题页网格下方 "About this puzzle" 配图。手机端均隐藏 + 懒加载，不下载；无跨路由预加载；首屏 LCP 图不变。
  - JSON-LD：Game `image` 首项为难度图（ImageObject 1200×900），其后为 OG 卡。
  - 新增 `scripts/check-images.mjs`：校验名单内每主题 3 难度 × 3 尺寸齐全、无未使用图。
  - 节日主题（easter、thanksgiving、valentines、winter）难度图已随 Package B 接入 `public/images/themes/`。

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
