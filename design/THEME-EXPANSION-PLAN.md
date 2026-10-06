# Words at Rest — 主题与板块扩展规划（THEME EXPANSION PLAN）

> **品牌：** Words at Rest · https://wordsatrest.com  
> **仓库：** `/workspace/words-at-rest` · vinext on Cloudflare Workers  
> **写给：** Reggie J（规划审批用）  
> **日期：** 2026-10-06（Asia/Shanghai）  
> **状态：** **仅规划 · 不上线 · 不改代码 · 不 commit · 不 deploy**  
> **重要：** 本文不是法律意见（Not legal advice）。商标 / 版权 / AdSense 结论仅供产品决策参考，正式商业化前请咨询律师。

---

## 0. 一句话结论

1. **竞品真正堆量的词**，按公开证据强度排序大致是：  
   **节日/季节 → Large Print / Seniors → Animals / Nature → Bible / Faith → Food & Home → Geography / History / Science（教育向）→ Movies & TV / Pop culture → Superheroes / Marvel 命名页**。  
2. **我们已有缺口最大、又最贴合成人/长者受众的，是「节日季节枢纽」**（Thanksgiving / Winter / Easter / Valentine’s 等）——此前已排队，**应继续排在流行文化之前**。  
3. **流行文化（漫威 / 2000 年前后美剧）搜索需求真实存在**，但与站内既定 **「无 IP」** 规则冲突；推荐用 **泛称安全框（方案 A）** 做 1–2 个 hub，而不是直接上「Marvel / Friends」命名页。  
4. **建议新增 6 个板块（sections）**，URL 用 `/themes/...` 主题页 + 可选 hub 落地页（如 `/holidays`、`/pop-culture`），分三波上线。

---

## 1. 研究方法与数据局限

### 1.1 做了什么

| 来源 | 用途 | 结果 |
|---|---|---|
| Semrush MCP（`organic_research` / `domain_overview` / `keyword_research`） | 竞品 organic 关键词与流量 | **全部失败**（MCP `-32600`：有 output schema 但未返回 structured content）。**本文无任何虚构的月搜索量数字。** |
| 竞品首页 / 分类导航 / 专题集合页 | 看对方「堆了哪些主题」= 间接需求信号 | 定性证据充足（见 §2） |
| 公开 SERP / 打印站 / 亚马逊图书 | 「marvel word search」「friends word search」等是否有大量专用页 | 有专用集合页、打印 PDF、甚至独立图书 |
| 站内仓库 | 现有主题、Bible 模板词表难度、IMAGE-BRIEF / 无 IP 文案 | 已核对 |

### 1.2 怎么读「流量证据」

没有 Semrush 数字时，采用以下**证据强度**（从强到弱）：

1. **竞品把该主题做成独立大集合**（例如 WordSearchZen 的 Marvel = 15 puzzles 一整页）。  
2. **多个头部站都有同主题导航入口**（TheWordSearch 首页 Sitcoms / TV；Education.com holidays）。  
3. **存在付费图书 / 品牌站产品**（如 Thunder Bay《The Office Word Search…》、Brain Games Bible Large Print）。  
4. **打印/UGC 站大量用户自制同主题**（WordMint Friends / Office）。  
5. 仅偶发单页 —— 弱信号。

文中凡写「需求强 / 中 / 弱」，均指上述公开证据，**不是**捏造的 volume。

---

## 2. 竞品地图与高证据主题排序

### 2.1 主要竞品（与我们定位的关系）

| 竞品 | 定位 | 对 Words at Rest 的启示 |
|---|---|---|
| [thewordsearch.com](https://thewordsearch.com/) | 在线玩 + 打印；首页直接推 **Television / Sitcoms / Disney / Kids / Food** | Pop culture 与日常词表都是默认流量入口；我们缺 TV hub |
| [wordsearchzen.com](https://wordsearchzen.com/) | 打印 PDF 大库；分类计数可见（Animals **140+**、Geography **96+**、Movies&TV **68+**、Science **64+**、American History **57+**、US States **57+**…） | 教育/地域/历史是「长尾库存」；Movies&TV、Marvel 集合是「命名流量」 |
| [puzzles.ca](https://www.puzzles.ca/word-search/) | 打印 + **Large Print** 专门入口 + Daily | Large Print / Daily 是长者向强信号，与我们一致 |
| [wordsearchlabs.com](https://wordsearchlabs.com/browse) | UGC maker + browse；题材极散（states、football、health…） | 长尾主题无限，不适合我们全抄；可挑 evergreen 教育词 |
| [education.com](https://www.education.com/resources/?game-type=word-search&occasion=holidays) | 学校/作业；**Holidays / Science / Social Studies** | 节日与学科词 SEO 稳，但受众偏儿童——我们要「成人语气」改写 |
| [games.aarp.org](https://games.aarp.org/games/word-search) | 长者 Daily Easy/Medium/Hard | 验证 **Daily + 三难度 + 档案** 对 50+ 人群是标配产品形态（我们已有 Daily） |
| WordMint / FreeWordSearchGames / WordSearchBattle | UGC / 玩法站；Friends、Office、Superheroes 大量页 | 证明粉丝检索词存在；质量与品牌气质不如我们，可差异化（成人、无定时、大字） |
| 图书市场（Simon & Schuster Bible Large Print、Thunder Bay Office book 等） | 付费证明「主题 × Large Print」「主题 × 剧粉」可变现 | AdSense 站更应抢 **可安全做的主题**（Bible 我们已上；节日 / 地理 / 科学优先） |

### 2.2 按公开证据排序的「高流量主题簇」

| 排名（证据强度） | 主题簇 | 公开证据摘要 | 来源 URL（代表） |
|---|---|---|---|
| 1 | **节日 / 季节** | Education.com 专设 holidays；WordSearchZen 整段 Seasonal（Christmas/Easter/Thanksgiving/Valentine’s/St Patrick’s/4th of July…）；头部站几乎都有 | [education.com holidays](https://www.education.com/resources/?game-type=word-search&occasion=holidays) · [wordsearchzen.com](https://wordsearchzen.com/) |
| 2 | **Large Print / Seniors / Easy** | Puzzles.ca 首页 Large Print；AARP 专做 Daily Easy/Med/Hard；图书市场大量 Large Print Bible/Animals | [puzzles.ca](https://www.puzzles.ca/) · [AARP Word Search](https://games.aarp.org/games/word-search) |
| 3 | **Animals / Nature / Pets** | WordSearchZen Animals **140+**（全站最大类之一）；图书「100 Large Print Animal」系列 | [wordsearchzen Animals](https://wordsearchzen.com/) |
| 4 | **Bible / Faith** | 多部畅销 Large Print Bible 找词书；打印站常见；**我们已上线** | [Simon & Schuster Bible LP](https://www.simonandschuster.com/books/The-Everything-Jumbo-Book-of-Large-Print-Bible-Word-Searches/Charles-Timmerman/Everything-Series/9781507210611) |
| 5 | **Food / Kitchen / Home** | TheWordSearch 首页 Food & Drink + General（Kitchen Items）；Zen Food & Drink 专类 | [thewordsearch.com](https://thewordsearch.com/) |
| 6 | **Geography / US States / Landmarks** | Zen Geography **96+**、US States **57+**；Labs 有 states 浏览标签 | [wordsearchzen.com](https://wordsearchzen.com/) · [wordsearchlabs browse](https://wordsearchlabs.com/browse) |
| 7 | **History / Famous People / Science** | Zen American History **57+**、World History **48+**、Science **64+**、Famous People **51+**；Education.com Science & Social Studies | 同上 |
| 8 | **Movies & TV / Sitcoms** | TheWordSearch 首页 **Television + Sitcoms** 置顶；Zen Movies&TV **68+**；Friends/Office/Gilmore/Grey’s/Lost/Seinfeld/Breaking Bad 等均有专用页 | [thewordsearch Sitcoms](https://thewordsearch.com/) · [thewordsearch TV cat](https://thewordsearch.com/cat/television-shows/) · [WordMint Friends](https://wordmint.com/public_puzzles/4099350) · [WordMint Office](https://wordmint.com/public_puzzles/730248) · [Amazon Office book](https://www.amazon.com/Office-Search-Quips-Quotes-Coloring/dp/164517607X) |
| 9 | **Superheroes / Marvel 命名** | Zen：**Marvel 15-puzzle 集合** + **Superhero 16-puzzle 集合**；多站「Marvel Characters」打印页 | [Marvel WS Zen](https://wordsearchzen.com/marvel-word-search/) · [Superhero WS Zen](https://wordsearchzen.com/superhero-word-search/) · [easywordsearchmaker MCU](https://easywordsearchmaker.com/puzzle/marvel-cinematic-universe) |
| 10 | **Disney / Harry Potter / Anime（儿童/强 IP）** | Zen Disney **37+**；官方 Bloomsbury 也发 Hogwarts Word Search PDF | [Bloomsbury HP worksheets](https://www.bloomsbury.com/media/cmdjo3jh/hp-activity-sheet-reskinfinal.pdf) |

**对我们站的含义：**  
竞品流量重心并不全是漫威——**节日、大字、动物、圣经、食物、地理/历史**同样（甚至更）「堆货」。漫威/美剧是 **可见粉丝词**，但 IP 与受众（偏年轻/孩子）与 Words at Rest 的成人放松定位需要刻意取舍。

---

## 3. 与现有主题的差距（Gap）

### 3.1 现有主题（仓库 `data/themes/`，2026-10-06）

`animals` · `bible` · `cats` · `christmas` · `dogs` · `fall` · `food` · `garden` · `halloween` · `hard-pack` · `large-print-pack` · `music` · `ocean` · `space` · `sports` · `travel`

难度模板（以 Bible 为范本，`scripts/generate-puzzles` 一致）：

| 难度 | 词数 | 网格 | 文件后缀 |
|---|---|---|---|
| Easy | 10 | 10×10 | `*-easy-01/02` |
| Medium | 14 | 12×12 | `*-medium-01/02` |
| Hard | 18 | 15×15 | `*-hard-01` |
| Large print | 8 | 9×9 | `*-large-01` |

新主题默认也按 **6 题**：easy-01/02、medium-01/02、hard-01、large-01。

### 3.2 差距清单

| 竞品强主题 | 我们现状 | 差距类型 |
|---|---|---|
| Thanksgiving / Easter / Valentine’s / Winter / St Patrick’s / July 4 | 仅有 Halloween、Fall、Christmas | **P0 缺口**（时间敏感 SEO） |
| Large Print 作为产品线 | 有 `large-print` 落地页 + pack，但缺「季节 × 大字」「圣经大字第二批」等交叉 | 产品交叉不够 |
| Animals 深挖（鸟类、农场、雨林…） | 有 animals/dogs/cats/ocean | 可后补子主题，非紧急 |
| Geography / US States / Capitals | 无 | **P1 缺口**（evergreen 教育词，成人/移民/家长也搜） |
| History / Science（非太空） | 仅 space | **P1 缺口** |
| TV / Sitcoms / Superheroes | 无（且政策禁止直做 IP） | **P2 需安全框** |
| Printable 专页 / 「打印友好」枢纽 | 有打印能力，无 SEO 枢纽页 | **P1 产品+SEO** |
| Seniors hub（不止 large-print） | `/adults` + `/large-print` | 可合并叙事、加「无定时 / 放松」交叉链 |

站内文案已明确 **无特许角色**：如 Christmas「avoids trademarked characters」、Space「no film or franchise names」、Halloween「no film characters」、HANDOFF「Themes (self-written, no IP)」、IMAGE-BRIEF negative 含 Disney/Marvel。

---

## 4. 建议新板块（Sections）总览

> 板块 = SEO/导航枢纽，不一定立刻改路由架构。优先用现有 `/themes/[theme]`，再按需加轻量 hub（`/holidays`、`/pop-culture` 等）。

| # | 板块名 | 建议入口 URL | 优先级 | 与现有关系 | 首批主题（slug） |
|---|---|---|---|---|---|
| A | **节日与季节 Holidays** | `/holidays` → 链到各 `/themes/...` | **P0** | 扩展 Halloween/Fall/Christmas | `thanksgiving`, `winter`, `easter`, `valentines`（下一波：`st-patricks`, `new-year`, `independence-day`） |
| B | **流行文化 Pop Culture（安全框）** | `/pop-culture` | **P2**（排在节日后） | 全新 | `superheroes`（泛称）, `sitcoms`（泛称）, 可选 `classic-tv` / `movie-night` |
| C | **地理与旅行 Geography** | `/geography` 或挂在 Themes 分组 | **P1** | 扩展 travel | `us-states`, `world-capitals`, `landmarks` |
| D | **历史与人文 History** | `/history` | **P1–P2** | 全新 | `american-history`, `ancient-world`, `presidents`（名词为主、无肖像 logo） |
| E | **科学与自然 Science** | `/science` | **P1** | 扩展 space/ocean/garden | `weather`, `human-body`, `birds`（或 `nature`） |
| F | **打印与长者 Print & Seniors** | 强化 `/large-print` + `/adults`；可选 `/printables` | **P0–P1**（页面强化，少新建主题） | 已有 | 交叉：每个新节日主题必含 large-01；FAQ「printable word search for seniors」 |

**内部链接原则：**

- 每个主题 hub：链到同板块其他主题、对应难度页、Daily、Large Print、How to Play。  
- 节日板块：日历顺序导航（下一节日 CTA）。  
- Pop culture：页脚固定 **「Not affiliated with…」** 免责声明 + 链回安全主题（Animals / Bible / Holidays）。  
- FAQ（主题页 + hub）：「Is this free?」「Large print?」「Printable?」「Any timer?」——抓 featured snippet。

---

## 5. IP / 商标 / AdSense 风险（实用摘要 · 非法律意见）

### 5.1 三档方案

| 方案 | 做法 | 风险 | 适用 |
|---|---|---|---|
| **A · 泛称安全框（推荐默认）** | 标题用 *Superhero / Sitcom / 2000s TV classics / Movie night*；词表用**类型通用词**（CAPE, SIDEKICK, COUCH, LAUGH TRACK…），避免角色名与剧名 | 低 | 首选上线路径 |
| **B · 提名使用（谨慎）** | 标题如 *Words from Friends* / *Marvel-universe vocabulary*；纯文字词表可含角色名；**无**官方图、logo、角色肖像；免责「not affiliated / not endorsed」 | 中（Disney/Marvel 维权积极；标题与 URL 用商标更易被投诉） | 仅在你明确接受投诉/下架风险后 |
| **C · 避免** | 不做该命名页 | 无 | Harry Potter / Disney 公主 / 动漫强 IP；任何需官方美术的主题 |

**实务要点（业界常见说法，非法律意见）：**

- 词表里出现角色名，通常低于 **使用 logo / 官方画风 / 暗示官方授权** 的风险。  
- **页面标题、H1、URL slug、OG 图**若带注册商标（Marvel®、FRIENDS 标识等），风险高于「词表里藏一个 ROSS」。  
- AdSense 本身不「批准」商标用法；政策重点是站内体验与禁止内容，**不能**把 AdSense 当成 IP 护身符。  
- 参考阅读（第三方科普，非律师函）：[puzzlebooks.cloud fan-puzzle legal guide](https://puzzlebooks.cloud/legal-guide-for-fan-puzzle-creators-navigating-copyright-and)。

### 5.2 本规划对流行文化的默认选择

| 候选 | 推荐方案 | 说明 |
|---|---|---|
| Superheroes（泛称） | **A** | 覆盖漫威需求的安全替代 |
| Sitcoms / Classic TV（泛称） | **A** | 覆盖 Friends/Office/Seinfeld 等需求 |
| Movie night / Classic films（泛称） | **A** | 对象、类型词，不写片名角色 |
| 「Marvel」「Friends」「The Office」命名页 | **C（默认）或 B（仅你批准）** | 与站内 no-IP 规则冲突；建议先不做 |
| Harry Potter / Disney | **C** | 官方也在发活动 PDF，商标极敏感 |

---

## 6. 板块 A — 节日与季节（P0，优先于流行文化）

> 此前对话已排队 Thanksgiving / Winter / Easter / Valentine’s。**流行文化批次排在其后。**

### 6.1 为什么优先

- 竞品与 Education.com 把 holidays 做成一级分类。  
- 时间敏感：Thanksgiving（美加 11 月）、Winter、Valentine’s（2 月）、Easter（春）——**错过窗口等于浪费 SEO**。  
- 受众：成人/长者家庭聚会、教室家长打印、教会季（与 Bible 可交叉）。  
- IP 风险最低（通用节日词）。

### 6.2 首批 4 主题（各 6 题模板）

#### A1 · Thanksgiving · `/themes/thanksgiving`

| 字段 | 建议 |
|---|---|
| H1 / Title | Thanksgiving Word Search |
| 主关键词 | thanksgiving word search |
| 受众契合 | **高**（家庭、长者、美国读者） |
| 风险 | 低 |
| 封面概念 | 玉米、南瓜、橡果、格纹餐巾、烛台静物（无人脸、无卡通火鸡吉祥物） |

**词表草稿：**

1. **easy-01 · Harvest Table**（10）：GRAVY, MAIZE, CIDER, ROLL, YAMS, PIE, FEAST, AUTUMN, GUEST, TABLE  
2. **easy-02 · Grateful Words**（10）：THANKS, KIND, SHARE, HOME, FAMILY, WARMTH, BLESSING, PEACE, HARVEST, JOY  
3. **medium-01 · Kitchen Prep**（14）：STUFFING, CRANBERRY, POTATO, TURKEY, CARVING, GIBLET, CORNBREAD, CASSEROLE, LEFTOVER, PARSLEY, BUTTER, OVEN, BASTE, PLATTER  
4. **medium-02 · Autumn Walk**（14）：GOURD, ACORN, SQUASH, HAYRIDE, ORCHARD, CORNFIELD, FOLIAGE, PUMPKIN, SCARECROW, HARVEST, CIDER, BARN, WAGON, CORNUCOPIA  
5. **hard-01 · Tradition & Travel**（18）：PILGRIM, MAYFLOWER, PLYMOUTH, PARADE, FOOTBALL, REUNION, HOSPITALITY, GRATITUDE, ABUNDANCE, PROVISION, FEASTING, GATHERING, HOMESTEAD, FIREPLACE, TABLECLOTH, CENTERPIECE, WISHBONE, LEFTOVERS  
6. **large-01 · Simple Thanks**（8）：PIE, YAMS, ROLL, FEAST, HOME, THANKS, WARM, SHARE  

#### A2 · Winter · `/themes/winter`

| H1 | Winter Word Search | 主词 | winter word search |
| 受众 | **高** | 风险 | 低 |
| 封面 | 毛衣、热可可、窗霜、松枝、雪靴静物 |

词表方向：SNOWFLAKE, ICICLE, MITTEN, COCOA, FIREPLACE, SOLSTICE, BLIZZARD, FROST…（避免圣诞角色；Christmas 主题已存在，本主题偏「季节」）

#### A3 · Easter · `/themes/easter`

| H1 | Easter Word Search | 主词 | easter word search |
| 受众 | **高**（可与 Bible 互链） | 风险 | 低（避免 exclusive 教派符号堆砌） |
| 封面 | 彩蛋、水仙、柳枝、藤篮（无卡通兔人脸） |

#### A4 · Valentine’s · `/themes/valentines`

| H1 | Valentine's Day Word Search | 主词 | valentine word search / valentines day word search |
| 受众 | **中高**（成人语气，避免儿童闪粉风） | 风险 | 低 |
| 封面 | 信笺、蜡封、干玫瑰、热巧克力（无爱心爆炸贴纸感） |

### 6.3 节日板块 SEO

- Hub：`/holidays` — 按日历排列卡片 + FAQ。  
- 互链：Halloween ↔ Thanksgiving ↔ Christmas ↔ Winter；Easter ↔ Bible。  
- 上线节奏建议：先 Thanksgiving + Winter（贴近期），再 Valentine’s + Easter。

---

## 7. 板块 B — 流行文化（P2 · 安全框详细方案）

### 7.1 需求证据（定性）

| 主题 | 证据 | URL |
|---|---|---|
| Marvel | Zen 整页 15 puzzles；多站 MCU/Characters 打印 | https://wordsearchzen.com/marvel-word-search/ |
| Superhero（泛称） | Zen 16 puzzles；Twinkl/Printfern 等 | https://wordsearchzen.com/superhero-word-search/ |
| Friends | WordMint 多页、Monster WS、WordSearchBattle 专题 | https://wordmint.com/public_puzzles/4099350 |
| The Office | WordMint；**独立图书** Thunder Bay | https://www.amazon.com/Office-Search-Quips-Quotes-Coloring/dp/164517607X |
| 其他 2000 前后剧 | TheWordSearch TV 分类含 Grey’s、Gilmore、Lost、Seinfeld、House、Breaking Bad、24… | https://thewordsearch.com/cat/television-shows/ |
| Harry Potter | 官方出版社活动 PDF + 大量粉丝打印页 | https://assets.ctfassets.net/usf1vwtuqyxm/1zfEkXkeZzfLK2Bz1wF5yU/…/Hogwarts_Word_Search.pdf |

**受众提醒：** 核心玩家偏成人/长者——Friends / Seinfeld / Office / Sopranos / CSI 契合度高于 MCU 儿童粉；Superheroes 泛称对「看过漫威电影的中年人」仍可用，但不要做成儿童派对风。

### 7.2 推荐上线的安全主题（方案 A）

以下 3 个优先；命名页（Marvel/Friends）默认不做。

#### B1 · Superheroes · slug `superheroes` · **方案 A**

| 字段 | 建议 |
|---|---|
| H1 | Superhero Word Search |
| 主关键词 | superhero word search |
| 受众契合 | 中（成年电影观众 OK；长者弱于节日） |
| 风险 | 低–中（勿画面具角色肖像；negative 禁止 Marvel/DC logo） |
| 封面/OG | 斗篷剪影、腰带、城市天际线夜景静物、漫画圆点纸纹——**无脸、无胸标** |

**6 题词表草稿：**

1. **easy-01 · Cape & Mask**（10）：CAPE, MASK, HERO, POWER, CITY, BRAVE, RESCUE, FLIGHT, SHIELD, JUSTICE  
2. **easy-02 · Secret Base**（10）：LAIR, CAVE, SIGNAL, BADGE, ARMOR, BOOTS, GLOVES, UTILITY, COMIC, PANEL  
3. **medium-01 · Powers**（14）：FLIGHT, STRENGTH, INVISIBILITY, TELEPATHY, HEALING, SPEED, SHIELD, LASER, FORCE, ORIGIN, MUTANT, ALIEN, ARMOR, SIDEKICK  
4. **medium-02 · Teamwork**（14）：ALLIANCE, TEAM, LEADER, PARTNER, MENTOR, ROOKIE, VETERAN, MISSION, BRIEFING, HEADQUARTERS, PATROL, ALARM, SIREN, SKYLINE  
5. **hard-01 · Villains & Lore**（18）：VILLAIN, NEMESIS, SCHEME, HOSTAGE, HENCHMAN, ULTIMATUM, INTRIGUE, DISGUISE, DOUBLECROSS, UNDERWORLD, LABYRINTH, CITADEL, FORTRESS, MEGALOMANIA, REDEMPTION, ORIGIN, LEGACY, MYTHOS  
6. **large-01 · Quiet Hero**（8）：CAPE, MASK, HERO, BRAVE, CITY, POWER, RESCUE, HOPE  

#### B2 · Sitcoms · slug `sitcoms` · **方案 A**

| H1 | Sitcom Word Search | 主词 | sitcom word search / funny tv word search |
| 受众 | **中高**（Friends/Office 一代已 40+） | 风险 | 低 |
| 封面 | 咖啡店卡座、马克杯、沙发靠垫、遥控器、笑声字幕板（抽象，无商标） |

**6 题词表草稿：**

1. **easy-01 · Living Room**（10）：COUCH, LAUGH, JOKE, FRIEND, APARTMENT, NEIGHBOR, COFFEE, REMOTE, EPISODE, CREDITS  
2. **easy-02 · Studio Night**（10）：AUDIENCE, CLAPBOARD, REHEARSAL, SCRIPT, PUNCHLINE, TAKE, SCENE, CAST, CREW, PILOT  
3. **medium-01 · Workplace Comedy**（14）：OFFICE, DESK, BOSS, MEMO, CUBICLE, BREAKROOM, WATERCOOLER, MEETING, PROMOTION, INTERN, PAPERWORK, DEADLINE, QUIRK, BANTER  
4. **medium-02 · City Friends**（14）：LANDLORD, ROOMMATE, DINER, SUBWAY, SIDEWALK, WEDDING, THANKSGIVING, REUNION, FLASHBACK, CAMEO, RERUN, SYNDICATION, FINALE, CASTING  
5. **hard-01 · Comedy Craft**（18）：SITCOM, LAUGHTRACK, COLDOPEN, CATCHPHRASE, RUNNINGGAG, ENSEMBLE, CAMEO, CROSSTALK, IMPROV, BLOCKING, MULTICAMERA, AFFECTION, AWKWARD, SARCASM, IRONY, CALLBACK, TAGSCENE, CLIFFHANGER  
6. **large-01 · Easy Laughs**（8）：COUCH, JOKE, LAUGH, FRIEND, COFFEE, REMOTE, EPISODE, SMILE  

#### B3 · Classic TV · slug `classic-tv` · **方案 A**

| H1 | Classic TV Word Search | 主词 | classic tv word search / 90s tv word search |
| 受众 | **高（长者）** | 风险 | 低 |
| 封面 | 老式木壳电视、天线、TV Guide 风格杂志（无真实封面字）、爆米花碗 |

词表方向：ANTENNA, RERUN, CHANNEL, PRIME TIME, COMMERCIAL, THEME SONG, FINALE, SYNDICATION, REMOTE, DIAL…（可第二批再拆 Crime Drama / Medical Drama **泛称**）

#### B4–B10 · 命名页候选（默认 **不做**，仅列需求）

| 候选 | 需求证据 | 建议 |
|---|---|---|
| Marvel 命名 | Zen 15 puzzles | **C**；用 `superheroes` 承接 |
| Friends | 多站 + TPT | **C**；用 `sitcoms` |
| The Office | 图书证明 | **C**；用 `sitcoms` workplace puzzle |
| Seinfeld / Sopranos / Lost / Grey’s / Gilmore / CSI / House / 24 / Sex and the City | TheWordSearch 分类有页 | **C**；可将来做 `crime-drama` / `medical-drama` **泛称** |
| Breaking Bad（略晚于 2000） | 有专用页 | **C** |
| Harry Potter | 官方也在发 | **C 坚决不做** |
| Movie night（泛称） | Zen Movie Night / Genres | 可作为 B 批次第 4 个 **A 方案** |

### 7.3 Pop culture SEO 结构

- Hub：`/pop-culture` — 说明「genre vocabulary, not licensed shows」+ 三张主题卡。  
- **不要**做 `/themes/marvel` 之类 slug。  
- 每页 FAQ：*Are these official Marvel/Friends puzzles?* → No; original word lists inspired by the **genre**.  
- 内链：从 `/themes` 分组「Pop culture」；从 Adults 页可提「TV night puzzles」。

---

## 8. 板块 C–E — 教育 Evergreen（P1）

### 8.1 Geography（`/geography`）

| slug | H1 | 主词 | 风险 | 首批 |
|---|---|---|---|---|
| `us-states` | US States Word Search | us states word search | 低 | 6 题：区域拆分（Northeast / South…） |
| `world-capitals` | World Capitals Word Search | world capitals word search | 低 | 易：常见首都；难：较长国名 |
| `landmarks` | World Landmarks Word Search | landmarks word search | 低 | 建筑/自然奇观英文通名 |

封面：折叠地图、指南针、邮戳 —— 无国旗商标堆砌。

### 8.2 History（`/history`）

| slug | H1 | 注意 |
|---|---|---|
| `american-history` | American History Word Search | 事件/文件/地点名词；避免党派口号 |
| `ancient-world` | Ancient World Word Search | Egypt/Greece/Rome **通名**（PYRAMID, FORUM, PHARAOH） |
| `presidents` | US Presidents Word Search | **姓氏**可作词表（公有事实）；封面勿用官方肖像照片风格 |

### 8.3 Science（`/science`）

| slug | H1 |
|---|---|
| `weather` | Weather Word Search |
| `human-body` | Human Body Word Search |
| `birds` | Birds Word Search（补 Animals 长尾） |

与现有 `space` / `ocean` / `garden` 互链。

---

## 9. 板块 F — Print & Seniors（产品强化）

不必先堆新主题，优先：

1. `/large-print` 文案强调「holiday large print」「bible large print」交叉。  
2. 每个新主题 **必须** 带 `*-large-01`。  
3. 可选 `/printables`：说明如何打印、字号、无账号；目标词 *printable word search for adults/seniors*。  
4. 对标 AARP：Daily 已有；保持 **无强制计时** 差异化（我们的卖点）。

---

## 10. 优先上线顺序（Rollout）

| 波次 | 内容 | 理由 |
|---|---|---|
| **Wave 0（进行中/并行）** | 结构化数据 P0/P1；手机 Daily 预览体验 | 不阻塞主题，但影响整体 SEO |
| **Wave 1 · 节日 P0** | Thanksgiving → Winter → Valentine’s → Easter | 时间窗 + 零 IP 风险 + 竞品证据最强 |
| **Wave 2 · Print/Seniors + Geography P1** | 强化 large-print 交叉；`us-states` + `weather` 或 `world-capitals` | Evergreen；适合长者与家长 |
| **Wave 3 · Pop culture 安全框 P2** | `superheroes` + `sitcoms`（+ 可选 `classic-tv`） | 满足「漫威/美剧」诉求且守 no-IP |
| **Wave 4** | History / 更多 Science / 节日第二批（St Patrick’s, New Year, July 4） | 填教育长尾 |
| **暂缓** | 任何 Marvel/Friends/Office/Harry Potter **命名**页 | 除非你书面接受方案 B 风险 |

**流行文化相对节日的位置：**  
**明确排在 Wave 1 节日之后。** 若只能先做 3–4 个新主题：选 **Thanksgiving、Winter、Valentine’s（或 Easter）、us-states** —— 而不是漫威。

---

## 11. 出图需求清单（给图像 agent）

规格同 [`IMAGE-BRIEF.md`](./IMAGE-BRIEF.md) / [`BIBLE-IMAGE-REQUEST.md`](./BIBLE-IMAGE-REQUEST.md)：

- 封面：`public/images/themes/{slug}.webp` **1200×900** + `{slug}-640.webp`  
- OG 底图：`design/og-base/og-theme-{slug}.png` **1200×630**，左侧题材、右侧 ~55–60% 空白奶油纸  
- Style lock / Negative：沿用 IMAGE-BRIEF；**额外禁止**角色肖像、胸标、剧名 logo、漫威/迪士尼美术

| 批次 | slug | 封面动机（无角色） |
|---|---|---|
| W1 | thanksgiving | 丰收桌静物 |
| W1 | winter | 可可与窗霜 |
| W1 | easter | 蛋与水仙藤篮 |
| W1 | valentines | 蜡封印信与干花 |
| W2 | us-states | 地图与指南针 |
| W2 | weather | 气压计、云、雨伞 |
| W3 | superheroes | 斗篷与城市天际线剪影 |
| W3 | sitcoms | 咖啡店卡座与马克杯 |
| W3 | classic-tv | 木壳电视与天线 |

每主题交付后：`node scripts/derive-images.mjs` + `node scripts/generate-og.mjs`（**届时再改代码接线，本规划阶段不动**）。

---

## 12. 单主题落地检查清单（上线时用，现在不做）

复制 Bible 流程：

1. `data/themes/{slug}.json`（name、primaryKeyword、description、words 总表）  
2. 6 个 `data/puzzles/{slug}-*.json`（generate 脚本）  
3. `lib/theme-content.ts` 增加 vocabulary / goodFor / tip  
4. 封面 + OG 底图 → derive + generate-og  
5. Themes index / hub 内链 / FAQ  
6. sitemap 自动含新路由  
7. 免责声明（仅 pop-culture）  
8. **仍不 commit/deploy 除非你下令**

---

## 13. 待你拍板的问题

1. **Wave 1 是否锁定 Thanksgiving + Winter + Valentine’s + Easter？**（推荐是）  
2. **流行文化是否接受「只做方案 A 泛称」、不做 Marvel/Friends 命名页？**（推荐是）  
3. **Wave 2 地理选 `us-states` 还是 `world-capitals` 先做？**  
4. **要不要单独 `/holidays`、`/pop-culture` hub 页，还是暂只用 `/themes` 分组文案？**  
5. 结构化数据 P0/P1、手机 Daily 预览 —— 是否与 Wave 1 并行？

---

## 14. 附录 · 现有主题 vs 竞品大类速查

| 竞品大类 | 我们 | 行动 |
|---|---|---|
| Holidays | 部分 | **补齐** |
| Animals | 有 | 后补细分 |
| Bible | 有 | 可加深（LP 第二批） |
| Food | 有 | 可加 kitchen 子题 |
| Geography | 无 | **新建板块** |
| History / Science | 弱（仅 space） | **新建** |
| Movies & TV | 无 | **安全框板块** |
| Marvel / Disney / HP | 无 | **避免命名** |
| Large Print | 有 | **强化交叉** |
| Kids / Grade | 故意不做 | 保持成人定位 |

---

*— End of THEME-EXPANSION-PLAN.md. 无代码变更。Semrush 未提供可用数字；需求判断基于公开竞品结构与专用页证据。*

---

## 15. 子主题拆解 — Sports / Food / Music（2026-10-06 增补）

> 用户请求：把 sports、food、music 拆成更细。本节省仅规划 + Wave 1 实现说明。  
> Semrush 仍不可用；证据为竞品专用页 / 分类（定性）。

### 15.1 URL / 信息架构决策：**扁平子主题**（推荐并已采用）

| 方案 | URL 例 | 结论 |
|---|---|---|
| **A · 扁平**（选用） | `/themes/golf`，父页 `/themes/sports` 链出子卡 | ✅ |
| B · 嵌套 | `/themes/sports/golf` | ❌ 与现有谜题路由 `/themes/[theme]/[slug]` 冲突 |

**理由：**

1. 现路由第二段已是 **puzzle slug**；嵌套子主题会与谜题路径撞车。  
2. 主关键词形态是 `golf word search` / `baking word search`，扁平 slug 更贴 SEO。  
3. Theme 数据模型本就是扁平列表；加可选 `parentSlug` 即可在父 hub 渲染子卡，无需新动态段。  
4. 面包屑：`Themes → Sports → Golf`；sitemap 照常收录每个 `/themes/{slug}`。

### 15.2 竞品证据摘要（定性）

| 父主题 | 高频细分（竞品有专用页） | 代表来源 |
|---|---|---|
| Sports | Baseball, Basketball, Football (US), Soccer, Tennis, Golf, Fishing, Hockey, Bowling, Olympics 混词 | [Puzzletainment sports set](https://www.puzzletainment.com/printable-sports-word-searches-for-kids/) · [Summer sports: soccer/tennis/golf](https://manyjoyfulthings.com/2026/06/09/free-printable-summer-sports-word-searches/) · [My Joyfilled Life baseball/football/basketball](https://www.myjoyfilledlife.com/sports-word-search/) · [Cluegrid sports](https://cluegrid.org/word-search/sports) |
| Food | Baking, Fruits, Vegetables, Desserts, Herbs & Spices, Breakfast, Cooking methods / terms | [Suncatcher Studio food set](https://suncatcherstudio.com/printables/word-search/food-word-search/) · [BrightSprout baking / herbs](https://brightsprout.com/browse/middle-school/life-skills/cooking/word-searches) · [Baked goods](https://www.wordsearchaddict.com/baked-goods-printable-word-search-puzzle/) |
| Music | Instruments, Jazz, Classical/terms, Genres, Orchestra, Guitar/Piano；大量 **艺人命名页**（我们不做） | [WordSearchZen music hub](https://wordsearchzen.com/free-music-word-searches/) · [Musical Terms](https://wordsearchwizard.com/puzzles/musical-terms/) · [Genres](https://wordsearchland.com/puzzles/genres-of-music-word-search-419) |

**受众 / IP：** 优先长者友好（Golf、Fishing、Baking、Classical terms、Instruments）。词表与标题 **不用** NFL/NBA 队名、联赛商标、乐队/艺人姓名；Jazz/Classical 用风格与乐理词。

### 15.3 完整候选清单

**Sports：** golf · baseball · tennis · fishing · basketball · football（美式规则词，非队名）· soccer · hockey · bowling · olympics（项目通名）· swimming · yoga  

**Food：** baking · desserts · herbs（herbs & spices）· fruits · vegetables · breakfast · cooking（methods/terms）· bbq · pasta · bread  

**Music：** instruments · jazz · classical · music-terms · orchestra · piano · guitar · genres（通名）· choir · opera  

### 15.4 Wave 1 首选（每父 4 个 = 12）

| 父 | slug | H1 / 主词 | 选因 |
|---|---|---|---|
| sports | `golf` | Golf word search | 竞品夏日专题；长者契合高 |
| sports | `baseball` | Baseball word search | 多站专用页 |
| sports | `tennis` | Tennis word search | 夏日专题；成人观众 |
| sports | `fishing` | Fishing word search | 户外放松；长者契合 |
| food | `baking` | Baking word search | 烘焙术语页极多 |
| food | `desserts` | Desserts word search | Suncatcher 等标准细分 |
| food | `herbs` | Herbs and spices word search | 厨房 evergreen |
| food | `fruits` | Fruits word search | 高频打印主题 |
| music | `instruments` | Musical instruments word search | Zen 专页；无艺人 |
| music | `jazz` | Jazz word search | Zen Jazz Music；用风格词 |
| music | `classical` | Classical music word search | 曲式/力度词，不用艺人标题 |
| music | `music-terms` | Musical terms word search | 乐理词专用页多 |

每子主题 **6 题**（Bible 模板）：easy-01/02、medium-01/02、hard-01、large-01。

### 15.5 父 hub 行为

- `/themes/sports|food|music` 在谜题列表上方增加 **「Explore …」** 子主题卡片网格。  
- 子主题页面包屑含父主题；文案链回父 hub。  
- 主题总览 `/themes` 仍列出全部（含子主题），便于发现与索引。

