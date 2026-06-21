# eCPM Bazaar 海外市场潜力调研笔记

调研日期：2026-06-21

调研目标：判断 eCPM Bazaar 面向海外移动游戏/应用开发者做“广告收入下滑诊断”的市场潜力、机会边界、竞品压力和 90 天验证方向。

## 关键问题

1. 海外移动游戏与应用广告变现市场是否足够大，是否仍然需要工具型产品？
2. 开发者是否真实存在 eCPM、fill rate、match rate、country mix、ad source performance 等诊断痛点？
3. 现有竞品是否已经满足小团队“快速知道为什么收入变了”的需求？
4. eCPM Bazaar 应该切入哪个最小可行市场，避免变成泛泛的数据看板？
5. 未来 90 天应该验证哪些信号，才能判断是否继续投入？

## 当前产品理解

- eCPM Bazaar 当前已有英文优先官网、中文切换、公开 `/demo` 页面。
- `/demo` 支持样例数据和浏览器本地 CSV 解析，不上传、不保存用户文件。
- 核心诊断维度：revenue、weighted eCPM、impressions、fill rate、country、placement、ad source/network。
- 代码中已有 TopOn reporting API client、签名、数据标准化、告警规则雏形，但仍缺少真实用户数据验证。
- 当前增长动作集中在 DEV.to、Indie Hackers、Reddit、Fazier、X/Twitter、TinyLaunch/Uneed 等免费渠道。

## 发现

### 1. 海外市场规模：大盘足够大，但增长逻辑变了

- Sensor Tower 2026 State of Mobile 指出，2025 年全球 iOS + Google Play 的 IAP/付费应用与游戏收入达到 1670 亿美元，同比增长 10.6%；但增长重点从下载/新增用户转向变现和存量用户经营。来源：https://sensortower.com/blog/state-of-mobile-2026
- Sensor Tower 2026 State of Gaming 披露，2025 年移动游戏 IAP 收入约 820 亿美元，移动游戏每分钟下载约 95,000 次；但下载增长放缓，移动游戏进入更成熟阶段。来源：https://www.prnewswire.com/news-releases/sensor-tower-state-of-gaming-gaming-drove-94-billion-in-revenue-in-2025-downloads-reached-52-billion-302696284.html
- Newzoo 2025 Global Games Market Report free page显示，2025 年全球游戏市场收入预计 1888 亿美元，玩家约 36 亿；但移动在成熟市场增长放缓。来源：https://newzoo.com/resources/trend-reports/newzoo-global-games-market-report-2025
- Grand View Research 估算，全球 in-app advertising 市场 2024 年为 1820.6 亿美元，2025 年约 2004.6 亿美元，2033 年预计 4814.7 亿美元，2025-2033 CAGR 12.1%。来源：https://www.grandviewresearch.com/industry-analysis/in-app-advertising-market

判断：eCPM Bazaar 不是在找一个小市场，而是在一个巨大但成熟、竞争强、效率要求更高的市场里找一个窄切口。

### 2. 趋势：广告变现仍重要，混合变现和诊断复杂度上升

- Sensor Tower 的表述是“Gaming Continues Shift From Scale To Efficiency”：下载更难增长时，团队要靠 retention、reactivation、payer management、payback/conversion discipline 提升 LTV。来源：https://sensortower.com/blog/state-of-mobile-2026
- AppsFlyer 2026 gaming marketing 页面强调 AI、UA、区域、IAA/IAP/hybrid monetization 都在重塑游戏增长问题。来源：https://www.appsflyer.com/resources/reports/gaming-app-marketing/
- Unity 建议免费游戏采用 IAP + system-initiated ads + user-initiated ads 的 hybrid monetization，特别强调 rewarded ads 和不要破坏玩家体验。来源：https://unity.com/blog/iap-to-hybrid-monetization
- Liftoff 2026 in-app advertising guide 引用 AppsFlyer/Sensor Tower 数据，指出游戏内广告收入仍增长，hybrid monetization 是结构性驱动之一。来源：https://liftoff.ai/blog/in-app-advertising-in-2026-a-complete-guide-for-mobile-marketers/

判断：广告变现不是过时方向，但单纯“看 eCPM”不够。真正需求是把 eCPM、fill/match、展示量、国家、广告位、广告源、用户留存/流量结构放在一起解释。

### 3. 用户痛点：社区中持续出现 eCPM/match/fill/revenue drop 问题

- r/admob 近期有帖子问 “AdMob eCPM dropped while impressions increased. What should I check?”，回复中提到 eCPM 随流量扩大可能下降，收入不随 impressions 线性增长。来源：https://www.reddit.com/r/admob/comments/1tzh71l/admob_ecpm_dropped_while_impressions_increased/
- r/admob 另有帖子讨论 2026 年 3 月以来 eCPM 和 match rate 同时下滑，评论建议先看 eCPM floors 与 fill rate 的关系，不要直接判断是账号惩罚。来源：https://www.reddit.com/r/admob/comments/1s5ls2y/ecpm_and_match_rate_drop_since_the_beginning_of/
- r/admob 中也有 fill rate 大幅下滑案例，开发者后来发现是请求并发过多、需要 timeout/limit。来源：https://www.reddit.com/r/admob/comments/1nsslt3/admob_fill_rates_drop/
- r/gamedev 中有开发者讨论 mobile games 的广告收入、eCPM 范围、国家差异和流量规模问题。来源：https://www.reddit.com/r/gamedev/comments/1hp0x9w/do_mobile_games_really_make_less_money_from/

判断：真实痛点存在，而且开发者常常不是缺一个数字，而是缺“怎么拆解原因”的顺序。

### 4. 竞品格局：大平台强在集成和优化，小工具机会在轻量诊断

- AppLovin MAX Advanced Reporting 已支持 requests、responses、fill rate、impressions、estimated revenue、eCPM，以及 country、ad unit、placement、network 等粒度。来源：https://support.applovin.com/en/max/max-dashboard/reports/advanced-reporting
- Unity LevelPlay performance reports 支持 revenue、eCPM、impressions、sessions、user engagement 等过滤、拆分、可视化和导出。来源：https://docs.unity.com/grow/levelplay/platform/measurement/performance-reports
- TopOn Full Report 说明 eCPM、revenue、impression API、CTR API 等指标，并提示 eCPM API 有 1 天延迟且不同统计口径会导致差异。来源：https://help.toponad.net/docs/Full-Report
- Google AdMob API 提供 metrics/dimensions，但有兼容关系和报表类型限制。来源：https://developers.google.com/admob/api/v1/report-metrics-dimensions
- Tenjin 提供 mobile attribution、ROI dashboard、ad monetization suite、LTV prediction 等全套能力，价格页显示 full access 为 $200/month。来源：https://tenjin.com/pricing/
- GameAnalytics 的 monetization dashboard 支持 IAP、ad monetization、webshops，并能识别 revenue drops/spikes；定价页部分高级能力显示 $499/mo。来源：https://docs.gameanalytics.com/products-and-features/analytics-iq/monetization/ 与 https://www.gameanalytics.com/pricing
- Appfigures 提供 all revenue streams 聚合、ad KPI、eCPM/fill rate anomaly 识别、无需新 SDK；说明了“异常下滑提前发现”是已有竞品也在强调的价值。来源：https://appfigures.com/analytics/integrations/monetization/unity

判断：竞品不是没有。eCPM Bazaar 不能宣传“我有 dashboard”，应该宣传“比大平台更快给你一段可读的诊断结论，先用 CSV/匿名数据就能试，不需要换 mediation 或接 SDK”。

### 5. 当前产品和市场切口匹配度

- 已有公开 demo、browser-only CSV、sample CSV、诊断结论，正好降低海外开发者对数据隐私/账号授权的顾虑。
- TopOn API client 有雏形，但海外冷启动不应先绑定 TopOn；更通用的 CSV schema 和 AdMob/AppLovin/LevelPlay 导入会更容易被 Reddit/DEV.to/Indie Hackers 用户试用。
- 当前最大缺口不是页面，而是：真实样本数、可信诊断案例、导入格式兼容性、复制诊断结果、邮件/表单收集匿名数据。

## 阶段摘要

### 阶段摘要（第 1 轮）

海外市场值得继续做，但不能按“大而全广告数据平台”做。大平台已经覆盖报表、聚合、归因和优化，eCPM Bazaar 的机会在独立开发者和小团队的轻量场景：当收入突然变动时，用 CSV 或只读报表快速拆解“是 eCPM、fill/match、展示量、国家结构、广告位还是广告源导致”。这类需求在 Reddit/AdMob 社区有持续信号，且公开 demo 的 browser-only 定位和用户隐私顾虑匹配。

## 调研结论

### 一句话结论

eCPM Bazaar 值得继续做，但应该定位成“广告收入波动诊断助手”，先服务有真实广告收入但没有数据分析能力的小型移动游戏/应用团队；不要一开始做成泛广告聚合平台、归因平台或完整 BI。

### 适不适合做

适合继续做，但要小步验证。

理由：

1. 市场足够大：移动游戏和 in-app advertising 都是千亿美元级相关市场。
2. 痛点真实：Reddit/AdMob 社区持续出现 eCPM、match rate、fill rate、收入突然下降的问题。
3. 竞品存在但不完全吃掉机会：AppLovin、Unity LevelPlay、AdMob、TopOn、Appfigures、Tenjin、GameAnalytics 都有报表，但小团队仍然需要“我该先查什么”的诊断路径。
4. 当前产品已经有切入点：browser-only CSV demo 解决了海外用户最担心的“我不想给账号权限/不想上传收入数据”。

不适合的方向：

- 不要承诺“提高 eCPM”或“自动帮你赚钱”。
- 不要做泛 SaaS 大看板。
- 不要先做重登录、团队权限、复杂数据库、多平台全自动 API。
- 不要在 Reddit 硬广链接；先做无链接帮助型回复。

### 目标用户

P0 用户：

- 独立移动游戏开发者、小型 app 团队、小游戏/休闲游戏团队。
- 已有 AdMob、AppLovin MAX、Unity LevelPlay、TopOn、ironSource 等广告收入。
- 每日广告收入大概 $5-$500，足够关心波动，但通常没有专职 BI/数据分析师。
- 最常见问题：昨天收入掉了，不知道是流量、eCPM、fill/match、国家结构还是广告源问题。

P1 用户：

- 帮客户做移动应用增长/变现咨询的小工作室。
- 使用多个广告平台、需要给客户解释“为什么广告收入变了”的运营人员。

暂时不优先：

- 大型游戏公司：他们已有内部 BI、MMP、数据仓库和商业分析师。
- 纯 IAP 游戏：广告变现不是主要收入。
- 完全没有真实展示量的新开发者：无法验证诊断价值。

### 核心痛点

1. eCPM 是结果，不是原因。收入 = 展示量 * eCPM / 1000，但实际还受 requests、matched requests、fill/show rate、country、placement、format、ad source 影响。
2. 大平台报表能查，但查因果很慢。小团队会在 AdMob/MAX/LevelPlay/TopOn 后台反复筛选导出。
3. 新手容易误判。例如 eCPM 下降但 impressions 上升，或者 eCPM 稳定但 fill rate 下降，处理方式完全不同。
4. 隐私阻力大。海外开发者不愿随便给账号权限、API key、收入截图。
5. 没有标准复盘模板。社区提问经常缺字段，别人无法判断问题。

### MVP 功能优先级

已做/基本方向正确：

- `/demo` 公开页面。
- 样例 CSV。
- 浏览器本地解析，不上传、不保存。
- 基于 latest day vs previous day 的简单诊断。
- 邮箱入口。

下一步必须做：

1. 增加“复制诊断结果”按钮：用户可把结论贴回 Reddit/邮件。
2. 增加 3 个 CSV 模板：AdMob、AppLovin MAX、Unity LevelPlay/TopOn 通用格式。
3. 增加“匿名诊断样例库”：展示 3-5 个假数据/脱敏案例，比如 eCPM drop、fill drop、country mix、ad source drop。
4. 增加“字段检查器”：上传 CSV 后告诉用户缺哪些字段、哪些字段被识别。
5. 增加“发给我人工免费诊断”的邮件模板：自动生成主题和字段说明。

暂缓：

- 登录系统。
- 用户数据云端保存。
- 多团队权限。
- 自动订阅付款。
- 重 API 集成。

### 页面结构建议

1. 首页：一句话说明 + Try demo + Send anonymized data。
2. `/demo`：上传 CSV、加载样例、诊断结论、复制结果。
3. `/templates`：AdMob/MAX/LevelPlay/TopOn CSV 模板下载。
4. `/cases`：脱敏诊断案例。
5. `/free-diagnosis`：收集邮箱和匿名 CSV 的说明，不强制上传。

### 技术方案

近期：

- 保持 GitHub Pages / 静态部署。
- 继续在浏览器端解析 CSV，避免后端和隐私压力。
- 诊断逻辑用纯 TypeScript 函数沉淀，方便后续测试。
- 先兼容 CSV schema，再接 API。

中期：

- 用轻量后端或 serverless 收集邮箱/等待名单。
- 数据存储只保存用户授权的脱敏样本和诊断结果。
- 真实 API 优先级：AdMob CSV/API > AppLovin MAX CSV/API > Unity LevelPlay CSV/API > TopOn API。

### 变现方式

第一阶段：免费诊断换样本和信任。

- 免费：公开 demo、样例 CSV、1 次匿名诊断。
- $9-$19/月：保存历史 CSV、每日提醒、复制报告、更多案例。
- $49-$99/月：小团队版，多 app、多广告位、邮件告警。
- $199+ 一次性服务：人工变现诊断报告，适合有收入但没数据分析能力的小团队。

我的判断：短期最可能先收钱的是“人工诊断服务 + 工具辅助”，不是纯 SaaS 订阅。

### 主要风险

1. 真实数据难拿：需要用 browser-only、匿名模板、免费诊断降低信任门槛。
2. 竞品强：大平台已有报表，差异化必须是“诊断结论”和“小团队友好”，不是“我也有 dashboard”。
3. 样本不足时诊断会误导：必须展示置信度、数据量提醒、不要对低 impressions 过度解释。
4. 平台推广容易被删：Reddit 尤其不要链接先行。
5. eCPM 波动不可控：产品不能承诺增长，只能承诺更快定位原因。

### 90 天验证计划

第 1-2 周：

- 完成复制诊断结果、CSV 字段检查、3 个模板。
- 每天找 1 个 Reddit/论坛真实问题，写无链接诊断回复。
- DEV.to/X 每 3-4 天发一条“诊断框架/案例”内容。

第 3-4 周：

- 收集 5 个真实或半真实匿名 CSV。
- 输出 3 个脱敏案例页。
- 做一个“free ad revenue drop diagnosis”页面。

第 5-8 周：

- 验证是否有人愿意发匿名数据。
- 统计：demo 访问、CSV 上传、邮件点击、回复率、真实诊断数。
- 优先支持 AdMob CSV，因为社区信号最多。

第 9-12 周：

- 如果有 10+ 个真实诊断样本，并且至少 3 人愿意持续试用，再做账户/保存/自动告警。
- 如果只有访问没有数据，转向“免费诊断模板/内容站”获客。
- 如果无人愿意给数据，停止重开发，继续做轻量内容验证。

### 最小成功标准

90 天内达到以下任意 2 条，才值得继续加大开发：

- 至少 10 个真实开发者发来匿名数据或详细指标。
- 至少 3 个开发者说“这个诊断帮我决定下一步查什么/改什么”。
- 至少 1 个开发者愿意为人工诊断或自动告警付费。
- Reddit/DEV.to/X 每周自然带来 demo 访问和邮件咨询。

### 下一步行动

1. 产品上先做“复制诊断结果”和“CSV 模板页”。
2. 增加 3 个英文脱敏案例，专门解释 eCPM drop、fill rate drop、country mix。
3. 用 Reddit/DEV.to 继续找真实问题，不要急着丢链接。
4. 把官网文案从“dashboard”进一步改成“diagnose why ad revenue changed”。
5. 做一个简单等待名单/免费诊断表单，邮箱继续用 xmmyy168@gmail.com。

## 来源列表

| 来源 | URL | 发布/更新 | 可信度 | 用途 |
| --- | --- | --- | --- | --- |
| Sensor Tower State of Mobile 2026 | https://sensortower.com/blog/state-of-mobile-2026 | 2026-01 | 高 | 移动市场总趋势、游戏转向效率 |
| Sensor Tower State of Gaming 2026 PR | https://www.prnewswire.com/news-releases/sensor-tower-state-of-gaming-gaming-drove-94-billion-in-revenue-in-2025-downloads-reached-52-billion-302696284.html | 2026-02-25 | 高 | 游戏收入、下载、移动游戏成熟化 |
| Newzoo Global Games Market Report 2025 | https://newzoo.com/resources/trend-reports/newzoo-global-games-market-report-2025 | 2025 | 高 | 全球游戏市场规模 |
| Grand View Research In-app Advertising | https://www.grandviewresearch.com/industry-analysis/in-app-advertising-market | 2025/2026 | 中 | in-app advertising 市场规模 |
| AppsFlyer State of Gaming Marketing 2026 | https://www.appsflyer.com/resources/reports/gaming-app-marketing/ | 2026 | 高 | UA、IAA/IAP/hybrid 趋势 |
| Unity Hybrid Monetization | https://unity.com/blog/iap-to-hybrid-monetization | 2025 | 高 | 游戏混合变现趋势 |
| Liftoff In-app Advertising 2026 Guide | https://liftoff.ai/blog/in-app-advertising-in-2026-a-complete-guide-for-mobile-marketers/ | 2026 | 中 | in-app ads/hybrid monetization 趋势 |
| Reddit r/admob eCPM dropped while impressions increased | https://www.reddit.com/r/admob/comments/1tzh71l/admob_ecpm_dropped_while_impressions_increased/ | 2026 | 中 | 社区痛点样本 |
| Reddit r/admob eCPM and match rate drop | https://www.reddit.com/r/admob/comments/1s5ls2y/ecpm_and_match_rate_drop_since_the_beginning_of/ | 2026 | 中 | 社区痛点样本 |
| Reddit r/admob fill rates drop | https://www.reddit.com/r/admob/comments/1nsslt3/admob_fill_rates_drop/ | 2025 | 中 | fill rate 问题样本 |
| AppLovin MAX Advanced Reporting | https://support.applovin.com/en/max/max-dashboard/reports/advanced-reporting | 2026 | 高 | 竞品/平台报表能力 |
| Unity LevelPlay Performance Reports | https://docs.unity.com/grow/levelplay/platform/measurement/performance-reports | 2026 | 高 | 竞品/平台报表能力 |
| TopOn Full Report | https://help.toponad.net/docs/Full-Report | 2025 | 高 | 数据字段和统计口径 |
| Google AdMob API metrics/dimensions | https://developers.google.com/admob/api/v1/report-metrics-dimensions | 2025 | 高 | 数据字段和 API 复杂度 |
| Tenjin pricing | https://tenjin.com/pricing/ | 2026 | 高 | 竞品价格带 |
| GameAnalytics Monetization Docs | https://docs.gameanalytics.com/products-and-features/analytics-iq/monetization/ | 2026 | 高 | 竞品功能 |
| GameAnalytics pricing | https://www.gameanalytics.com/pricing | 2026 | 高 | 竞品价格带 |
| Appfigures Unity Ads Analytics | https://appfigures.com/analytics/integrations/monetization/unity | 2026 | 高 | 竞品功能与定位 |
