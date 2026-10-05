# Words at Rest — Search Console 与邮箱（下一步）

**站点：** https://wordsatrest.com  
**Sitemap：** https://wordsatrest.com/sitemap.xml  
**Zone ID：** `f9f6b8bea56ad0a4a2595f734af5ad7d`  
**Account ID：** `b79c11a97188ceeb150acb0b6c4cda97`  
**文档核对时间：** 2026-10-06（Asia/Shanghai），经 Cloudflare API **只读**核对 DNS / Email Routing 实况。

---

## 0. 当前实况（API 核对，勿臆造）

### DNS（zone DNS API）

目前 zone 里可见的用户/自定义域记录只有 **2 条**（Worker Custom Domain 常见形态）：

| Type | Name | Content | Proxied |
|------|------|---------|---------|
| AAAA | `wordsatrest.com` | `100::` | yes |
| AAAA | `www.wordsatrest.com` | `100::` | yes |

- **没有** Google Search Console 验证用的 `TXT`（`google-site-verification=…`）。
- 主 DNS 列表里 **看不到** MX / SPF / DKIM（见下：它们挂在 Email Routing 侧，且 Routing **尚未启用**）。

### Email Routing（zone + account API）

| 项 | 实况 |
|----|------|
| Email Routing | `enabled: false`，`status: unconfigured` |
| 目标地址（destination） | **0**（尚未添加/验证个人邮箱） |
| 转发规则 | 仅一条禁用的 catch-all `drop`，**没有** `hello@` → 个人邮箱规则 |
| Routing 预览 DNS（`/email/routing/dns`） | API 会返回 Cloudflare MX + SPF + DKIM 模板；**不等于已生效收信** |

结论：`hello@wordsatrest.com` **目前不能可靠收信**。AdSense / 商务邮件前必须先走完方案 A（或 B）。

---

## 1. Google Search Console（推荐：网域 + DNS TXT）

### 你必须亲自点的（Google 账号）

1. 打开 [Google Search Console](https://search.google.com/search-console) → **添加资源**。
2. 选 **网域（Domain）**，填 `wordsatrest.com`（不要 `www`、不要 `https://`）。
3. Google 给出一条 **TXT** 值，形如：`google-site-verification=xxxxxxxx`。把整段复制下来。
4. DNS 加好并传播后，回到 GSC 点 **验证**。
5. 验证成功后：左侧 **站点地图（Sitemaps）** → 提交：
   - `https://wordsatrest.com/sitemap.xml`  
   （当前站点是**单一** sitemap，不是 sitemap index；条目含静态页、主题、puzzle、以及 `DAILY_START` 起的 daily 归档。）
6. （可选）再加「网址前缀」资源 `https://wordsatrest.com`；主资源用 **网域** 即可覆盖裸域与 www（www 已 301 到裸域）。

### DNS 怎么加（Cloudflare）

**Dashboard（推荐你自己点）：**

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → 选账户 → **wordsatrest.com** → **DNS** → **Records** → **Add record**。
2. 填写：
   - **Type:** `TXT`
   - **Name:** `@`（根域；保存后显示为 `wordsatrest.com`）
   - **Content / Value:** 粘贴 Google 给出的**整段**字符串（含 `google-site-verification=`）
   - **TTL:** Auto
   - **Proxy：** TXT 不会走橙云；保持默认即可
3. Save → 回 GSC 点验证（通常几分钟；偶发数小时）。

**API（我们可代做，但需要你先把 TXT 字符串发给我们）：**

```http
POST /zones/f9f6b8bea56ad0a4a2595f734af5ad7d/dns_records
{
  "type": "TXT",
  "name": "wordsatrest.com",
  "content": "google-site-verification=PASTE_TOKEN_HERE",
  "ttl": 1
}
```

验证成功后我们**不能**代你点 GSC 里的「验证」或「提交 sitemap」——必须登录你的 Google 账号操作。

### 我们不能代做的

- 登录你的 Google 账号、创建 GSC 资源、点验证、提交 sitemap。
- 在未知 TXT 内容时发明一条验证记录。

---

## 2. 邮箱 `hello@wordsatrest.com`（AdSense 前必备）

联系页与 Privacy 使用 `hello@wordsatrest.com`。必须有真实可收信收件箱。

### 方案 A：Cloudflare Email Routing（免费、够用）— 推荐先做

**现状：** Routing **未启用**，无 destination，无 `hello@` 规则（见 §0）。

**你需要做的（Dashboard）：**

1. Cloudflare → **wordsatrest.com** → **Email** → **Email Routing** → **Get started / Enable**。
2. **Destination addresses** → 添加你的个人 Gmail（或其它）→ 打开验证邮件点确认。
3. **Routing rules** → **Custom address**：
   - Custom address: `hello`
   - Action: **Send to** → 刚验证的个人邮箱  
   - 启用规则
4. 确认 Cloudflare 写入 MX / SPF / DKIM（启用向导一般会自动处理；启用后可用 API 再核对）。
5. 从**外部**邮箱发一封测试信到 `hello@wordsatrest.com`，确认进个人收件箱（并检查垃圾箱）。

**说明：**

- Routing = **收信转发**。要用 Gmail「以 hello@ 发信」需另配「发送为」+ SMTP，或改用方案 B。
- 未启用前不要假设 MX 已对外生效；以 Dashboard 里 Routing 状态与实测收信为准。
- 我们**不应**在未得到你确认 destination 邮箱前，用 API 擅自 Enable + 建规则（会改你账号收信路径）。

### 方案 B：Google Workspace（付费、正式收发）

购买 Workspace，把域名 MX 指到 Google，创建 `hello@` 用户。适合长期品牌与 AdSense 沟通。若走 B，需先关掉/避免与 Cloudflare Email Routing MX 冲突。

---

## 3. AdSense 申请前检查清单

- [ ] Search Console **网域**已验证，sitemap 已提交  
- [ ] `hello@wordsatrest.com` 实测能收信  
- [ ] Privacy / Terms / About / Contact 可访问且内容可用  
- [ ] 内容以可玩 puzzle 为主（已就绪）  
- [ ] 广告位组件已预留；审核通过后再挂真实 AdSense 代码  
- [ ] （建议）GA4 Measurement ID 已写入 `NEXT_PUBLIC_GA_ID` 并重新部署  
- [ ] （EEA/UK）上线个性化广告前再启用 cookie / Consent Mode 横幅  

---

## 4. 站点对照

| 项 | 值 |
|----|-----|
| 正式域名 | `https://wordsatrest.com`（`www` → 裸域 **301**） |
| Worker | `words-at-rest` |
| 内容规模 | 约 15 主题、约 40 puzzle |
| Daily 归档起始 | `DAILY_START` / `SITE.dailyStart`（默认 **2026-10-06** UTC，见 `lib/site.ts`） |
| Sitemap | `https://wordsatrest.com/sitemap.xml` |

---

## 5. 分工一览

| 动作 | 谁做 |
|------|------|
| GSC 添加网域、复制 TXT、点验证、提交 sitemap | **你**（Google 账号） |
| Cloudflare 添加 GSC TXT | 你（Dashboard）或把 TXT 发给我们用 API |
| Email Routing 启用、验证 destination、建 `hello@` 规则、发测试信 | **你**（需选定个人收件箱） |
| 核对 DNS / Routing 是否已写入 | 我们（API 只读或按你授权写入 TXT） |
| 改代码里的法务文案、GA 开关、Daily 起始日 | 我们（代码库） |
