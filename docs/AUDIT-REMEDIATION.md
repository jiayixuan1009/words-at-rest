# 全站审计整改状态

实现参考：[W3C交互网格键盘规范](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)；[Google同意模式开发指南](https://developers.google.com/tag-platform/security/guides/consent)。这些规范链接不代表本站已通过完整无障碍或法律合规认证。

基线：master `58608c3`；整改分支：`fix/audit-priority`，代码提交`8f9dfd5`（2026-10-06 23:31，UTC+8）。状态：[PR #1](https://github.com/jiayixuan1009/words-at-rest/pull/1)已合并，生产源代码master `ebcf70a`已于2026-10-07 00:20（UTC+8）部署。首次审计与复核报告位于工作区 `../research/audit-2026-10-06/`；代码上线不代表用户、收入或排名成效已验证。

发布记录：GitHub集成仍返回403，已通过用户授权的本机Git登录完成推送、PR创建和合并；Cloudflare官方CLI登录后部署到现有Worker。版本`00f1fac4-8150-443b-a2de-48d0598e124c`承接100%流量；发布前版本`06f31cf7-8e5d-431c-a8d9-2ad18cd7f02d`保留供回滚。未修改域名、DNS或广告配置。

## 已完成代码整改

| 编号 | 改动 | 验证 |
|---|---|---|
| F01 | 按实际所选文字和难度允许方向接受答案；保存实际路径；兼容旧词数组并校验损坏数据 | 两处BAT均通过；46道目录题+7道Daily的691处合法出现可选择；浏览器验证第二处高亮、刷新保留、重复不加分 |
| F03 | 单一Tab入口，方向键/Home/End/Ctrl+Home/End移动，Enter/Space首尾选择，Escape取消；行列/选择/找到状态与词表found朗读 | 浏览器纯键盘完成Halloween Easy 10/10；NVDA/VoiceOver/TalkBack兼容性仍待实机验收 |
| F04 | 首页与Daily提供实际Easy和9×9题链接 | Daily困难日也有简单入口，不改变全球每日题 |
| F05 | 主题/大字/成人页直接开玩；手机隐藏装饰图，主题介绍折叠 | 390px入口顶部：Halloween约263px（此前1187px），Large Print约275px，Adults约243px；无横向溢出 |
| F06 | 从真实远端创建独立Git工作副本，在修复分支工作，保留旧目录 | 当前可修改项目为`words-at-rest-current/`；旧`words-at-rest/`未覆盖 |
| F11 | 独立冻结首日JSON；缺失日期不hash回退；首页/Daily显示未就绪；日期页404；日历/归档/sitemap不链缺失日；发布前检查缓冲和测试 | 真正实现回归验证扩题/排序/目录首日题修改都不改变首日；缓冲耗尽不产生新答案 |
| F13 | 完成词表旁提供同难度下一题 | 10/10后链接进入Fall Easy，不强制升级难度 |
| F14 | 目录按Seasonal、Anytime、Packs分组并提供锚点跳转 | 全部主题链接保留在SSR HTML中；未引入复杂搜索 |
| F18 | Daily、大字、玩法页同步Grid size → Larger文案，增加键盘说明 | 已移除旧按钮指令；9×9题型与尺寸模式保持区分 |

F02在上一轮已关闭。本分支额外抽查320px Daily Larger：单格约18.97px、字号15.94px、无横向溢出；手机困难网格仍密集，不代表触控/放大/低视力体验全面达标。

## 主要代码已完成，仍需后续验收

- **F07：测量。** 已加入puzzle_start、word_found、puzzle_complete、progress_resume、reset、grid_size_change、next_puzzle；含puzzle_id、difficulty、grid_size、grid_mode与入口路径，不上报所选词/字母/路径。page_view显式支持SPA并保留URL来源参数。只测量接受分析后的活动；不会回填拒绝时的行为。仍需在GA4关闭Enhanced Measurement中的浏览器历史自动PV，以免重复，并用DebugView验证到账。此次未向真实GA账户发送测试事件。
- **F10：分析同意。** 所有访客默认不加载Google标签；接受后才加载Basic consent mode，广告三项权限始终denied。拒绝/撤回清空待发事件、停止新的游戏事件并清理当前域可访问的GA cookies；隐私页与页脚提供入口。浏览器验证未选择/拒绝状态均无Google标签，接受/撤回队列逻辑以本地替身单测验证。正式AdSense所需CMP/TCF、地域规则及全网络行为仍需专门验收，本方案不是认证广告CMP。
- **F12：内容精简。** 谜题页移除重复的通用拼写来源和WCAG引语，保留直接相关主题来源与玩法指引。指南/主题目录仍有编辑说明和来源，不把正常依据列成事实错误。

## 仍待解决

1. **F08/F09：真实广告接入与布局。** 仍未加载真实广告，没有publisher/slot配置和填充/可见率/RPM/收入数据。接入时确定各尺寸的预留空间，复核距网格/词表/控制按钮的间距、误触、慢加载、空填充及CLS；当前占位不能代表真实广告效果。
2. **F15：Search Console。** 正式域名robots/sitemap/metadata/404检查已通过；仍需GSC的sitemap处理、URL检查、canonical选择、Googlebot访问和索引覆盖证据。生产HTTP通过不代表搜索收录已验证。
3. **F16：邮箱。** 未取得当前账户路由状态或实际收信结果；需核对配置并完成收信/回复验证。
4. **F17：LCP。** 上游记录的约6.65秒是本地preview的Lighthouse值，此次没有性能trace/Lighthouse工具，未独立复现、未宣称速度已达标。手机装饰减少只是布局改动，不能当作量化性能修复。下一步保存线上/生产构建trace，定位LCP元素、TTFB、加载与渲染阶段，并取得足够现场样本。

## 验证与发布

- `npm run typecheck`、`npm test`（6组游戏/同意回归+真实Daily实现）、`npm run daily:check`、`npm run build`通过。
- `node scripts/check-images.mjs`通过：16主题×3难度×3尺寸；修复了原脚本在Windows的文件URL路径问题。
- 本地服务器：`node scripts/check-jsonld.mjs http://127.0.0.1:4173`覆盖16页通过；`node scripts/check-routes.mjs http://127.0.0.1:4173`通过SSR head、未来/无效日期404/noindex、robots与sitemap检查。
- 浏览器：键盘完整解题、第二处BAT、实际路径恢复、重复不计分、下一题、390px入口、320px困难网格和拒绝分析后继续游戏通过。截图保存在工作区`research/audit-2026-10-06/fixes/`。
- 构建仍有上游vinext的ineffective dynamic import与路由静态分类提示，构建成功；本次不改框架内部实现。
- Daily缓冲当前截至2026-10-13；`predeploy`能阻止缓冲不足的npm部署，但不能代替运营人员持续补充和部署日程。任何数据补充按现有CHANGELOG逐日记录。
- 全部代码批次与本次合并部署记在现有CHANGELOG。线上16页JSON-LD和HTTP路由检查通过；浏览器确认既有10/10进度恢复、重复BAT仍10/10、一个网格Tab入口、拒绝分析后Google标签为0、下一题进入Fall Easy。上线截图位于工作区`research/audit-2026-10-06/fixes/production-2026-10-07.png`。读屏、GA实际到账、搜索收录、广告和性能证据仍保持待验收。
