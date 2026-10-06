# 更新日志（Changelog）

本文件格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。日期为 commit 时间（Asia/Shanghai，UTC+8）。  
项目尚未打版本号，按日期 + commit 记录。完整产品说明见 [`docs/PRODUCT.md`](docs/PRODUCT.md)，后续计划见 [`docs/ROADMAP.md`](docs/ROADMAP.md)。

规模速查（主题 / 谜题）：`95609a5` 3 / 7 → `31aaf1b` 15 / 40 → `c46b10c` / `de568d3` 16 / 46 → Package B **32 / 142** → Wave C **47 / 232** → Wave D **62 / 322** → Wave E **77 / 412** → Wave F **92 / 502** → Wave G **102 / 605**（朝 ~1000）。

---

## [未发布 Unreleased]

## 2026-10-07 — Wave G（新主题 + 高流量加深，已部署）

### 新增 — Wave G（+10 主题 / +103 谜题）
- **新主题（各 6）：** sewing、quilting、swimming、hiking、cycling、geology、architecture、islands、emotions、photography。
- **加深既有 hub（+43）：** halloween / christmas / fall / animals / food / sports / ocean / garden 各 +4；bible +3；thanksgiving / winter 各 +2；large-print-pack +4。新词表与网格，不覆盖旧题。
- **规模：** 主题 92→**102**，谜题 502→**605**（朝 ~1000）。
- **Deploy:** Worker version `a48dbe45` → wordsatrest.com（account `b79c11a97188ceeb150acb0b6c4cda97`）。

### 改进 — 解题反馈动效（2026-10-07，已验证、待部署）
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
