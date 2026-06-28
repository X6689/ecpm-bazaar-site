# Reddit Signal Log

用于记录 Reddit 上和 eCPM Bazaar 相关的真实用户问题。每次看到帖子，不急着推产品，先记录痛点、上下文和可回答角度。

## 记录格式

| Date | Subreddit | URL | User Pain | Metrics Mentioned | Reply Angle | Product Relevance | Status |
|---|---|---|---|---|---|---|---|
| 2026-06-16 | r/admob | https://www.reddit.com/r/admob/comments/1s5ls2y/ecpm_and_match_rate_drop_since_the_beginning_of/ | eCPM and match rate drop | eCPM, match rate, country/fill | split by ad-unit, country, requests, impressions, match/fill | high | reference |
| 2026-06-16 | r/admob | https://www.reddit.com/r/admob/comments/1nsslt3/admob_fill_rates_drop/ | fill rate dropped sharply | fill rate, requests, mediation | diagnose request pressure, country, ad source availability | high | reference |
| 2026-06-16 | r/gamedev | https://www.reddit.com/r/gamedev/comments/1sqvqnn/advice_on_how_often_to_self_promote_on_reddit/ | self-promotion sensitivity | community rules | participate first, avoid product-first posting | medium | rule |
| 2026-06-22 | r/admob | https://www.reddit.com/r/admob/comments/1u8d421/why_is_ecpm_for_rewarded_ad_so_low/ | Rewarded ad eCPM fell from about $50 to about $3; OP has low volume and asks what to fix | rewarded ads, eCPM, impressions, ad timing | explained sample-size volatility first, then suggested checking country, ad unit, requests, match/fill rate, show rate, and rewarded placement timing before changing settings | high | removed by Reddit |

## 常见痛点词

- eCPM dropped
- match rate dropped
- fill rate low
- revenue dropped
- high requests but low impressions
- country mix
- ad unit
- rewarded video
- interstitial
- mediation
- floor price

## 可切入的问题

1. 收入下降到底来自 eCPM、展示量还是填充率？
2. Match rate 下降是否集中在某个国家或广告位？
3. eCPM 下降是否只是国家流量结构变化导致？
4. 调底价之前应该先看哪些指标？
5. 为什么收入掉了但 eCPM 没掉？
