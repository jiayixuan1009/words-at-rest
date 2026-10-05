# Words at Rest · wordsatrest.com

Calm, free word search puzzles for adults & seniors — large print, daily and seasonal.
面向成人 / 长者 / 大字 / 放松定位的找词（Word Search）站。**不做 kids-first，不用任何影视/商标 IP 词表。**

**Stack:** [vinext](https://github.com/cloudflare/vinext) (Next.js App Router API on Vite 8) → **Cloudflare Workers**
(scaffolded with `create-vinext-app --platform cloudflare`; not OpenNext). TypeScript + Tailwind v4.

---

## 简体中文

### 本地运行
需要 Node ≥ 22.18（推荐 24）。

```bash
npm install
npm run dev          # 开发服务器（workerd 运行时），默认 http://localhost:5173
npm run build        # 生产构建 → .cloudflare/output/
npm run start        # 本地预览生产构建（vite preview，同样跑在 workerd）
npm run typecheck    # tsc --noEmit
npm run generate     # 重新生成谜题 JSON（data/puzzles/*.json + index.ts）
```

### 目录
```
app/                      App Router 页面（/、/daily、/daily/[date]、/themes/...、/difficulty/[level]、
                          /large-print、/how-to-play、/adults、/privacy、/terms、/about、/contact）
app/sitemap.ts, robots.ts sitemap.xml / robots.txt
components/PuzzleGrid.tsx 交互网格（client；拖动或点首尾字母选词，localStorage 存进度，大字切换）
components/AdSlot.tsx     AdSense 占位（不加载任何广告脚本）
lib/engine.ts             占位生成引擎（确定性种子；上线前加固或替换为 MIT 引擎）
lib/data.ts               数据访问 + Daily 轮换
data/themes/*.json        主题词表（自建）
data/puzzles/*.json       预生成谜题（提交入库，保证 SSR 内容稳定）
scripts/generate-puzzles.ts  谜题生成脚本
```

### 加主题 / 加谜题
1. 新建 `data/themes/<slug>.json`，并在 `data/themes/index.ts` 注册。
2. 在 `scripts/generate-puzzles.ts` 的 `PUZZLE_SPECS` 里加条目（每条固定 `seed`）。
3. `npm run generate` → 提交生成的 JSON。**已上线谜题不要改 seed**（会改变网格内容）。

### 部署到 Cloudflare（重要）
vinext 的产物是 **Cloudflare Worker**，不是 Pages 静态站。现有 Pages 项目 `words-at-rest`（words-at-rest.pages.dev）
**不能直接承载** 这个 SSR 应用。推荐两条路：

**方案 A（推荐）：Workers Builds 连 Git**
1. 把本仓库推到 GitHub（如 `words-at-rest`）。
2. Cloudflare Dashboard → Workers & Pages → Create → **Import a repository**（创建 *Worker*，不是 Pages）。
   - Project / Worker name：`words-at-rest`
   - Build command：`npm run build`
   - Deploy command：`npx vinext-cloudflare deploy --skip-build`（或 `npm run deploy`）
   - 环境变量：`CLOUDFLARE_ACCOUNT_ID`（如构建环境未自动提供）；可选 `SITE_URL`、`DAILY_START`
3. 首次部署成功、`*.workers.dev` 能打开后，**迁移自定义域**：
   - Pages 项目 `words-at-rest` → Custom domains → 移除 `wordsatrest.com`、`www.wordsatrest.com`
   - 删除指向 `words-at-rest.pages.dev` 的两条 CNAME
   - Worker `words-at-rest` → Settings → Domains & Routes → 添加 Custom Domain `wordsatrest.com` 和 `www.wordsatrest.com`
   - 之后可加 www → 裸域 301（Redirect Rule），并删除空的 Pages 项目
4. 之后每次 push 到 main 自动部署；PR 生成预览。

**方案 B：本机命令行部署**
```bash
npx cf auth login                # 或设置 CLOUDFLARE_API_TOKEN（"Edit Cloudflare Workers" 模板）
export CLOUDFLARE_ACCOUNT_ID=<账号ID>
npm run deploy:dry-run           # 只校验，不部署
npm run deploy                   # 构建 + 部署 Worker "words-at-rest"
```
然后按上面第 3 步迁移域名。

### 仍是占位（Stub）
- 引擎：自写确定性放置算法；上线前加固（防误生成重复词、提高交叉率）或换 MIT 引擎（如 tcha-tcho/wordfind）。
- Daily：按日期哈希轮换；谜题够多后改为提交 `data/daily.json`（日期→谜题）固定排期。
- 联系邮箱 `hello@wordsatrest.com` 需真实可收信（AdSense 审核会看）。
- Privacy / Terms 为草稿，非法律意见；开 GA4 / AdSense / Consent 前复核。
- 无 GA4、无 AdSense 脚本、无 Consent 横幅（广告位仅占位）。

---

## English (brief)

**Run locally:** `npm install && npm run dev`. Build with `npm run build`, preview the production Worker with `npm run start`.
Regenerate puzzles with `npm run generate` (committed JSON keeps SSR output stable).

**Deploy:** vinext outputs a **Cloudflare Worker**, so the existing Pages project `words-at-rest` can't serve it as-is.
Preferred: push to GitHub → Workers & Pages → Create → *Import a repository* as a **Worker** named `words-at-rest`
(build `npm run build`, deploy `npx vinext-cloudflare deploy --skip-build`). Once `*.workers.dev` works, move the
custom domains `wordsatrest.com` + `www` off the Pages project (and delete the two CNAMEs to `words-at-rest.pages.dev`)
and attach them to the Worker as Custom Domains. CLI alternative: `npx cf auth login` (or `CLOUDFLARE_API_TOKEN`) +
`CLOUDFLARE_ACCOUNT_ID`, then `npm run deploy:dry-run` / `npm run deploy`.

**Stubbed:** placement engine (swap/harden; MIT engine TBD), hashed daily rotation, contact inbox, legal drafts,
analytics/ads/consent not wired.
