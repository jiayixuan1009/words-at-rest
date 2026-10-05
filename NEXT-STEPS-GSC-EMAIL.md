# Words at Rest — 下一步：Search Console 与邮箱（简体中文）

站点已上线：https://wordsatrest.com  
Sitemap：https://wordsatrest.com/sitemap.xml

## 1. Google Search Console 验证（推荐 DNS TXT）

1. 打开 [Google Search Console](https://search.google.com/search-console) → **添加资源** → 选择 **网域** 类型，填入 `wordsatrest.com`（不要带 `www`）。
2. Google 会给出一条 **TXT 记录**，形如：`google-site-verification=xxxxxxxx`。
3. 到 Cloudflare Dashboard → **wordsatrest.com** → **DNS** → **Add record**：
   - Type: `TXT`
   - Name: `@`（根域）
   - Content: 粘贴 Google 给出的整段验证字符串
   - Proxy status: DNS only（TXT 本来就不会橙云）
4. 保存后回到 Search Console 点 **验证**。DNS 传播通常几分钟内完成，偶发要等更久。
5. 验证成功后，在左侧 **站点地图** 提交：`https://wordsatrest.com/sitemap.xml`。
6. （可选）再加一个「网址前缀」资源 `https://wordsatrest.com`，用同一 TXT 或 HTML 标签均可；主资源用 **网域** 类型即可覆盖 www 与裸域（www 已 301 到裸域）。

## 2. 邮箱 `hello@wordsatrest.com`（AdSense 前必备）

联系页与 Privacy 里会用到 `hello@wordsatrest.com`。**必须有真实可收信的邮箱**，否则 AdSense / 商务邮件会丢。

### 方案 A：Cloudflare Email Routing（免费、够用）

1. Cloudflare Dashboard → **wordsatrest.com** → **Email** → **Email Routing** → 启用。
2. 添加自定义地址：`hello@wordsatrest.com` → 转发到你个人 Gmail（或其它收件箱）。
3. 按提示在 DNS 里确认 MX / TXT（Cloudflare 通常会自动加）。
4. 发一封测试信到 `hello@`，确认能进个人邮箱。

说明：Routing 主要是**收信转发**；若要用 Outlook/Gmail **以 hello@ 发信**，需另配「发送为」或改用方案 B。

### 方案 B：Google Workspace（付费、正式）

购买 Google Workspace，把域名 MX 指到 Google，创建 `hello@wordsatrest.com` 用户。适合长期品牌与 AdSense 沟通。

## 3. AdSense 申请前检查清单

- [ ] Search Console 已验证，sitemap 已提交  
- [ ] `hello@wordsatrest.com` 能真实收信  
- [ ] Privacy / Terms / About / Contact 页面可访问  
- [ ] 内容以原创词表与可玩 puzzle 为主（已就绪）  
- [ ] 广告位组件已预留，通过审核后再打开真实广告代码  

## 4. 当前站点状态（供对照）

- 正式域名：`https://wordsatrest.com`（`www` → 裸域 **301**）  
- Cloudflare Worker：`words-at-rest`  
- 约 15 个主题、约 40 个 puzzle 页  
