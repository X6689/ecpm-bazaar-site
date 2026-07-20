# eCPM Bazaar Outreach Log

Last updated: 2026-06-22

This file is the running record for eCPM Bazaar outreach, free launch sites, forum posts, comments, assets, and follow-up actions.

## Core Links

| Item | URL | Notes |
| --- | --- | --- |
| Landing page | https://ecpmbazaar.com/ | Public website, English-first with Chinese toggle. |
| Public demo | https://ecpmbazaar.com/demo/ | Browser-only CSV demo, no upload/storage. |
| CSV templates | https://ecpmbazaar.com/templates/ | AdMob, AppLovin MAX, Unity LevelPlay / TopOn CSV templates. |
| Diagnosis cases | https://ecpmbazaar.com/cases/ | Three anonymized English cases: eCPM drop, fill-rate drop, country mix. |
| Free diagnosis | https://ecpmbazaar.com/free-diagnosis/ | Mailto-based intake for anonymized ad monetization rows; no account access. |
| FAQ | https://ecpmbazaar.com/faq/ | Common questions about browser-only CSV diagnosis, fields, anonymization, and fit. |
| Data safety | https://ecpmbazaar.com/privacy/ | Privacy-first guidance for what to share and what to keep private. |
| Contact email | xia.business.systems@gmail.com | Overseas-facing contact address. |
| GitHub repo | https://github.com/X6689/ecpm-bazaar-site | Source and GitHub Pages deployment. |

## Product Positioning

Current positioning:

```text
eCPM Bazaar helps small mobile game and app teams diagnose why ad revenue changed.
```

Chinese working line:

```text
帮小型游戏/App 团队快速诊断广告收入为什么变了。
```

Execution focus:

- Keep the product centered on diagnosis, not a generic dashboard.
- Use browser-only CSV and anonymized data to lower trust friction.
- Do not claim to magically increase eCPM; explain the likely driver first.
- Prioritize real user data, copied diagnosis output, CSV templates, and anonymized cases before login/API/payment.

2026-06-21 product progress:

- Homepage now leads with the narrower promise: diagnose why mobile game/app ad revenue dropped.
- Homepage primary CTA now points to the free test diagnosis flow; demo and CSV templates remain secondary CTAs.
- Homepage added trust notes: no signup, no SDK/API permission, anonymized report fields only, and paste-ready results.
- Homepage added a first-testers section for the first 10 small game/app teams.
- Public demo now supports copying a diagnosis result for Reddit/email follow-up.
- Demo CSV upload recognizes common exported field aliases such as estimated earnings, ad impressions, ad unit, match rate, and ad source.
- Demo shows a CSV field check and data-quality notes before the diagnosis.
- Homepage now links directly to demo, templates, anonymized cases, and free diagnosis.
- Templates page now documents accepted CSV aliases so users do not have to rename every export column manually.
- Free diagnosis page now supports copying the email template and field list before opening an email draft.
- FAQ page added for common trust and workflow questions before users try eCPM Bazaar.
- Data safety page added to explain browser-only demo behavior, anonymized sharing, and private fields users should not send.
- Demo now includes a segment-level driver breakdown ranked by revenue loss across app, placement, country, and ad source.
- Copied diagnosis output now includes the top segment drops so users can paste a more useful summary into Reddit, email, or support conversations.
- Demo and free-diagnosis copy buttons now use a clipboard fallback; demo also shows a manual-copy textarea when browser clipboard access is blocked.
- Demo now supports pasted CSV or tab-separated report rows, so users can test rows copied from spreadsheets without selecting a file.
- Free diagnosis now has a browser-only request builder for contact email, ad platform, change type, comparison period, notes, and anonymized rows; it generates an email draft to `xia.business.systems@gmail.com`.
- Demo now includes a shareable diagnosis report with driver ranking, suggested checks, caveats, and a copy-ready report preview for Reddit/email/team discussion.

## X / Twitter Positioning Assets

Recommended account direction:

```text
Do not run the account as a generic tool promotion account.
Run it as a mobile game ad revenue diagnosis account.
```

Bio option 1:

```text
I help indie mobile game/app teams find why ad revenue dropped: eCPM, impressions, fill rate, country, placement, and ad source.
Building eCPM Bazaar. Free test reports available.
```

Short bio option:

```text
Find why your mobile ad revenue dropped.
eCPM · impressions · fill rate · country · placement · ad source
Built for indie game/app teams.
```

Banner line:

```text
Why did your ad revenue drop? Find the real driver in minutes.
```

Pinned post:

```text
Mobile game ad revenue dropped?
Don't only check eCPM.

Revenue can drop because of:

impressions
fill rate
country mix
placement exposure
ad source performance
eCPM

I'm building eCPM Bazaar, a small diagnosis tool for indie game/app teams.

If you have AdMob / AppLovin / Unity Ads data and want a free test diagnosis, reply "audit" or DM me.
```

Daily content buckets:

- Problem diagnosis posts: what to check when revenue drops.
- Case breakdown posts: eCPM stable but fill rate/country mix changed.
- Build-in-public updates: what diagnosis function was added today.
- Question posts: ask developers what they check first.

Useful X search keywords:

```text
AdMob eCPM dropped
AppLovin revenue drop
Unity Ads low eCPM
Ad revenue dropped mobile game
fill rate dropped AdMob
MAX mediation issue
rewarded ads revenue down
```

Helpful reply template:

```text
It may not be only an eCPM issue.
I would check: impressions, fill rate, country mix, placement exposure, and ad source performance.

If fill rate dropped while impressions stayed stable, it may be mediation or source availability.

I'm building a small tool for this. Happy to test with anonymized data.
```

## 7-Day Outreach Plan

| Day | Action |
| --- | --- |
| Day 1 | Update X bio, pinned post, and website Free test diagnosis framing. |
| Day 2 | Post three diagnosis posts: eCPM drop, fill-rate drop, and country-mix change. |
| Day 3 | Search X keywords and write helpful replies to relevant posts. Target quality over count. |
| Day 4 | Turn the DEV article into an X long thread. |
| Day 5 | Publish or comment on Reddit / Indie Hackers / DEV with the angle: `What I check when mobile game ad revenue drops`. |
| Day 6 | Share an anonymous demo case image: `Revenue down 28%, but eCPM is stable. What happened?` |
| Day 7 | Recruit testers: `I'm looking for 10 indie game/app teams to test eCPM Bazaar. Send anonymized ad revenue data. I'll return a simple diagnosis report for free.` |

## Daily Outreach Operating Plan

Daily goal:

```text
Find real mobile game/app developers with ad monetization pain, help first, and only share eCPM Bazaar when the context naturally asks for a tool, demo, or diagnosis.
```

2026-06-27 update:

- Adopted the pain-led Reddit / X SOP from `docs/ecpm-bazaar-positioning-and-promotion-plan.md`.
- Daily outreach should start from real complaints such as `AdMob eCPM dropped`, `AppLovin revenue down`, `rewarded ads fill rate dropped`, and `MAX mediation revenue drop`.
- Convert one real complaint into either a diagnostic reply, a short X post, or a `Revenue Drop Diagnosis` card.
- Main conversion path: developer pain -> useful diagnosis framework -> free diagnosis page -> anonymized case -> future paid report/tool.

Daily limits:

- 1 new post maximum across all platforms.
- 2-3 helpful comments maximum across all platforms.
- No links in first replies on new or sensitive accounts.
- Do not repost the same wording across platforms.
- Do not post again on a platform if an account is under review, temporarily held, or recently filtered.
- Stop for the day after a removal, hold, or spam warning.

Daily workflow:

| Step | Action | Output |
| --- | --- | --- |
| 1 | Check account health and pending reviews. | Record status changes before posting. |
| 2 | Browse target communities for 10-15 minutes. | Prefer recent posts from real developers. |
| 3 | Choose one primary action. | Either one soft topic post or one strong helpful comment. |
| 4 | Write platform-native wording. | No hard sell; no repeated template. |
| 5 | Record the result. | Platform, URL if available, action type, text summary, link used yes/no, status, next follow-up date. |

Platform rotation:

| Priority | Platform | Frequency | What to do |
| --- | --- | --- | --- |
| 1 | GameMaker Community | 3-4 days/week | Active game developer forum; look for Game Design, Development, And Publishing plus tags such as ads, admob-ads, mobile-ads, monetization. |
| 2 | GameDev.tv Community | 2-3 days/week | Good fit for Unity/mobile learning discussions; comment on mobile monetization topics first. |
| 3 | Unity Discussions | Paused until account hold clears | Browse only. Resume with replies, not new topics. |
| 4 | Reddit | 2-3 days/week | One no-link helpful comment only; avoid r/admob links unless asked. |
| 5 | DEV.to | 1 post every 5-7 days | Publish framework/case posts, not daily updates. |
| 6 | itch.io / Godot forums | 1-2 days/week | Soft research questions; no product link at first. |
| 7 | X | Opportunistic | Only reply when a real developer has a direct ad revenue/eCPM/fill-rate pain. |
| 8 | GameDev.net | Low priority | Games Business and Law appears to surface many old threads; use only if a recent relevant thread is found. |

Post themes to rotate:

- What to check when mobile game ad revenue drops.
- eCPM stayed stable but fill rate dropped.
- Country mix made total eCPM look worse.
- Placement exposure dropped after a release or UI change.
- One ad source / mediation source lost volume.
- Browser-only CSV diagnosis with anonymized data.

Comment style:

```text
I would split this before changing settings.

First compare requests, impressions, match/fill rate, show rate, eCPM, country, placement, and ad source.

If fill or show rate moved first, it may be serving/mediation. If traffic and fill stayed stable but eCPM dropped, demand/pricing/country mix is more likely.
```

Only share link after someone asks:

```text
I have a small browser-only demo for this workflow. It works with anonymized CSV rows and tries to explain whether the movement came from eCPM, impressions, fill rate, country, placement, or ad source.

Demo: https://ecpmbazaar.com/demo/
```

## Daily Outreach Log

| Date | Platform | Action | Link Used | Status | Notes | Next Follow-Up |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-06-22 | Unity Discussions | Posted a soft discussion topic under Unity Services about how developers diagnose mobile game ad revenue drops. | No | Account temporarily on hold / pending staff review | Replied to admin appeal explaining it was a discussion, not promotion. Do not post or reply again until hold clears. | Check after 2026-06-23 or 2026-06-24. |
| 2026-06-22 | GameDev.net | Created profile `ecpm_insights` / display name `Ad Revenue Notes`; added non-promotional bio and visuals. | No | Active profile | Do not use Blog Post for outreach. Next action should be forum browsing and possibly Games Business and Law topic. | Start with browsing and one forum action on 2026-06-22/23. |
| 2026-06-22 | GameDev.net | Checked Games Business and Law search/results. | No | Deprioritized | The target forum area appears to show many very old topics, so it is not a good daily primary channel. Keep the profile, but move daily outreach focus to more active game-dev forums. | Revisit only if a recent relevant thread is found. |
| 2026-06-22 | GameDev.net | Submitted a new forum topic in Game Design and Theory: `How do you diagnose mobile game ad revenue drops?` | No | Approved / active discussion | Soft discussion post, no eCPM Bazaar mention and no link. A moderator/user `frob` replied that studios often have dedicated metrics/business-development people, daily glance-at-graphs meetings, weekly deep dives, dashboards for week-long and multi-month trends, and project-specific cycles. | Follow-up reply was approved/published on 2026-06-23. Wait for further replies; do not add another message unless someone responds. |
| 2026-06-22 | DEV.to | Published article: `Why eCPM Alone Can Mislead You When Mobile Game Ad Revenue Drops`. | Yes | Published | Article explains why eCPM alone can mislead and links to the public demo plus free diagnosis page. Final edit restored the missing second half of the post and simplified the formula formatting. URL not captured yet. | Add public article URL when available; check comments tomorrow. |
| 2026-06-22 | Indie Hackers | Commented on a SaaS launch-priorities discussion with a no-link, no-promo validation framework. | No | Posted | Main posting is still locked for the new account, so today's safe action was one thoughtful comment to build authentic contribution history. | Check for replies/likes tomorrow; continue 1 thoughtful no-link comment/day until posting privileges unlock. |
| 2026-06-22 | Indie Hackers | Commented on `One week into my launch. Zero sales, but a couple of interesting numbers.` with a no-link early-launch validation reply. | No | Posted | Second thoughtful comment focused on reading weak launch signals, positioning, and manual follow-up. No eCPM Bazaar mention. | Stop Indie Hackers actions for today; check replies tomorrow. |
| 2026-06-22 | Reddit r/admob | Commented on `Why is eCPM for rewarded ad so low?` with a no-link diagnostic reply about small-sample eCPM volatility, country/ad-unit split, requests, match/fill rate, show rate, and rewarded placement timing. | No | Removed by Reddit | Screenshot showed `[ Removed by Reddit ]` after about 27 minutes. Since there was no link or product mention, likely platform/subreddit spam filtering tied to account trust, r/admob sensitivity, repeated technical outreach pattern, or network/account signals. | Pause r/admob commenting; do not retry today. Build account trust elsewhere and use r/admob only for reading until confidence improves. |
| 2026-06-23 | Daily outreach check | Chose today's safe primary action: wait for the GameDev.net no-link follow-up reply to pass moderator review. | No | Completed | The GameDev.net reply was approved/published. Reddit should be used only for low-risk ordinary game feedback/warm-up today, not product or ad-monetization discussion. | Watch for replies on GameDev.net tomorrow; do not bump the thread without a response. |

## Product Directory / Launch Platform Status

| Platform | Status | Public / Admin URL | Date / Schedule | Account / Notes | Next Action |
| --- | --- | --- | --- | --- | --- |
| Fazier | Published | https://fazier.com/launches/ecpm-bazaar | Submitted on 2026-06-20 | Maker profile: https://fazier.com/p/ai-xia. Product title: `eCPM Bazaar`; tagline: `Diagnose mobile game ad revenue drops`; price: Free. Fazier badge was added to site footer for free submission. Public page still exposes the old GitHub Pages URL after custom-domain migration. | Try manual edit/support later; the Edit route currently redirects to `/launch`. Check comments/upvotes occasionally. Do not self-upvote. |
| Uneed | Scheduled | Admin/dashboard only for now | Scheduled for 2026-11-06 | Account shown as `xmmyy1688-cdfe`. Category: Marketing. Tags: Analytics, Advertising, Stats. Free launch queue is very long. | Leave as-is; do not pay for queue skip. Check later for review/status. |
| TinyLaunch | Approved / scheduled | https://tinylaunch.com/launch/16633 | Launch date: 2026-07-20 at midnight PT | Approved email received from Chris at TinyLaunch on 2026-06-22. Product: `eCPM Bazaar`. Category selected: Gaming. Free launch slot used. Paid directory submission skipped. | Ask close contacts to hit `Notify me` before launch; prepare launch-day post for 2026-07-20. |
| BetaList | Attempted, paused | https://betalist.com/submit | 2026-06-20 | Registration/form flow reset and lost input. Not worth continuing that day. | Retry later only after logging in first. |
| Product Hunt | Not submitted | https://www.producthunt.com/launch | Later | Keep for formal launch after custom domain, stronger screenshots, maybe demo GIF/video. | Prepare a proper launch kit before using. |
| Hacker News Show HN | Not submitted | https://news.ycombinator.com/show | Later | Should be technical, not marketing. Possible title: `Show HN: Browser-only CSV demo for diagnosing mobile ad revenue drops`. | Use only when demo/product is more polished. |
| MicroLaunch | Candidate | https://microlaunch.net/ | Not started | Suggested as next lightweight launch platform. | Try after TinyLaunch review. |
| Launching Next | Candidate | https://www.launchingnext.com/submit/ | Not started | Startup directory candidate. | Submit only if free/simple. |
| Startup Fame | Candidate | https://startupfa.me/submit-startup/ | Not started | Startup directory candidate. | Submit only if free/simple. |
| DevHunt | Candidate | https://devhunt.org/ | Not started | Developer-tool audience; may or may not fit analytics/game monetization. | Check submission rules later. |

## Content / Community Platforms

| Platform | Status | URL | Date | Notes | Next Action |
| --- | --- | --- | --- | --- | --- |
| DEV.to profile | Active | https://dev.to/mmyy | Joined 2026-06-14 | Profile bio says building eCPM Bazaar for mobile game/app ad revenue diagnosis. | Continue with useful posts every few days, not daily spam. |
| DEV.to article 1 | Published | https://dev.to/mmyy/how-i-built-an-ecpm-diagnosis-dashboard-for-mobile-game-ad-revenue-1hij | 2026-06-14 | Title: `How I Built an eCPM Diagnosis Dashboard for Mobile Game Ad Revenue`. Tags: saas, mobile, gamedev, analytics. | Watch comments. |
| DEV.to article 2 | Published | https://dev.to/mmyy/what-small-mobile-game-teams-should-check-when-ad-revenue-drops-2i6a | 2026-06-16 | Title: `What Small Mobile Game Teams Should Check When Ad Revenue Drops`. Tags: analytics, gamedev, marketing, mobile. | Watch comments; next post should use a different angle. |
| Indie Hackers profile | Active | https://www.indiehackers.com/Xmmyy?id=36k1OIjtFZVJhr5gTvRtYtjwqbj1 | 2026-06 | Profile says building eCPM Bazaar. Main posting required membership; do not buy membership. | Use helpful comments only. |
| Indie Hackers comment | Posted | Link not captured | 2026-06 | Posted a soft comment on a video-games/SaaS niche post. | Recheck for replies/likes when logged in. |
| Reddit profile | Active but sensitive | https://www.reddit.com/user/Forward_Ad3308/comments/ | 2026-06 | Username: `Forward_Ad3308`. Several normal comments posted for account warm-up. | Continue 1 helpful non-link comment/day max. |
| Reddit r/admob | Joined / relevant but sensitive | https://www.reddit.com/r/admob/ | 2026-06-22 | Google AdMob community for app developers discussing eCPM, fill rate, match rate, revenue drops, payments, policy, and ad serving. Highly relevant for eCPM Bazaar demand discovery, but links and self-promo are risky. | Join is OK. Use no-link diagnosis replies only; do not mention eCPM Bazaar unless someone explicitly asks for a tool or demo. |
| Reddit r/admob link comment | Removed by Reddit | https://www.reddit.com/r/admob/comments/1u8cq53/sudden_drop_in_admob_observed_ecpm_on_android_us/ | 2026-06-21 | Comment with GitHub Pages demo link was removed within minutes as `[ Removed by Reddit ]`. Likely automated anti-spam/self-promo. | Do not post links in r/admob unless OP explicitly asks for the link. |
| Reddit r/SideProject | Some comments survived | Links not fully captured | 2026-06 | SideProject has been safer than r/admob/r/gamedev. A project-drop style comment survived better. | Prefer no-link comments; only add link in explicit project-share/feedback threads. |
| Reddit r/gamedev / r/admob | High deletion risk | N/A | 2026-06 | Earlier comments/posts were deleted or filtered. | Avoid self-promo. Reply with diagnosis steps only. |

## Link Replacement Audit

2026-06-21 target links:

- Landing page: `https://ecpmbazaar.com/`
- Demo page: `https://ecpmbazaar.com/demo/`

Checked public pages:

- Fazier product page still contains old links:
  - `https://x6689.github.io/ecpm-bazaar-site/`
  - `https://x6689.github.io/ecpm-bazaar-site/demo/`
- DEV.to public article/profile pages did not expose the old GitHub Pages link in the fetched public HTML.
- Indie Hackers public profile did not expose the old GitHub Pages link in the fetched public HTML.

Fazier update attempt:

- `/pages` shows the eCPM Bazaar card and an `Edit` button.
- The front-end route is `/launch-new?slug=<product id>`, with product id `9981`.
- Directly opening `/launch-new?slug=9981`, clicking the UI button through browser automation, and running a bookmarklet click all redirected to `/launch`.
- Current interpretation: the published launch editor does not load the existing product data through this path. Try manual UI again later, contact Fazier support, or resubmit only if editing remains impossible.

## Reddit Rules Learned

- For `r/admob`, do not include product links in first reply.
- Avoid wording like `I'm building` + `Demo:` in the same comment unless the post explicitly asks for tools/projects.
- 2026-06-22 account diagnosis: `Forward_Ad3308` comments in `r/admob` were removed even without links or product mentions. Combined with username/avatar customization problems, treat this account as low-trust or possibly flagged for spam/inauthentic activity. Reddit Premium is not a fix for username changes, avatar upload restrictions, or comment filtering.
- Use a two-step flow:
  1. First reply with useful diagnosis steps and no link.
  2. If OP asks for a tool/link, then share the demo.
- Daily Reddit limit: one short helpful comment, then stop.
- Prefer posts from the last 24 hours; acceptable up to 3 days.
- Avoid repeated templates.

## Reusable Safe Reddit Reply

```text
I would split this before changing anything.

For this kind of drop, I’d first compare Android / US by ad unit, ad format, requests, impressions, match rate, fill rate, show rate, CTR, eCPM floors, and mediation/bidding source.

If eCPM dropped but impressions and fill stayed stable, it may be demand or pricing. If match rate, fill rate, or show rate moved at the same time, the eCPM number alone can be misleading.
```

If OP asks for a link:

```text
I have a small browser-only demo for this workflow. It compares the latest day with the previous day and tries to explain whether the change came from eCPM, impressions, fill rate, country, placement, or ad source.

Demo: https://ecpmbazaar.com/demo/
```

## Product Submission Copy

### Name

```text
eCPM Bazaar
```

### Tagline

```text
Diagnose mobile game ad revenue drops
```

### Short Description

```text
eCPM Bazaar helps mobile game and app developers diagnose ad revenue changes by splitting the movement into eCPM, impressions, fill rate, country, placement, and ad source performance.

The public demo supports sample data and browser-only CSV upload, then generates a short diagnosis explaining the most likely driver of the change.
```

### Long Description

```text
eCPM Bazaar helps mobile game and app developers diagnose why ad revenue changes.

Instead of only showing a dashboard, it breaks revenue movement into practical drivers such as eCPM, impressions, fill rate, country, placement, and ad source performance.

The public demo currently supports built-in sample data and browser-only CSV upload. No data is uploaded or stored. It compares the latest day with the previous day and generates a short diagnosis that explains the most likely reason behind the revenue change.

The first version is built for small teams that monetize with ads but do not have a dedicated data analyst. I am looking for feedback from developers who use AdMob, AppLovin MAX, Unity LevelPlay, TopOn, or other mediation/ad platforms.
```

### Features

```text
- Diagnose ad revenue changes by eCPM, impressions, fill rate, country, placement, and ad source
- Public browser-only demo with built-in sample data
- CSV upload demo without storing or uploading user data
- Automatic comparison between the latest day and the previous day
- Short diagnosis summary explaining the most likely revenue driver
- Built for small mobile game and app teams without a dedicated data analyst
```

### Use Cases

```text
- Check why mobile game ad revenue dropped yesterday
- Separate eCPM drops from impression, fill rate, or traffic mix changes
- Compare monetization performance by country, placement, and ad source
- Sanity-check CSV ad monetization reports before changing mediation settings
- Help indie developers understand AdMob, AppLovin MAX, Unity LevelPlay, or TopOn report changes
```

### Free Deal / Offer

```text
Free early feedback review for the first 5 mobile game or app developers who share anonymized ad monetization data.
```

## Assets

Desktop copies:

| Asset | Path | Use |
| --- | --- | --- |
| Logo | `D:\OneDrive\桌面\ecpm-bazaar-logo-250.png` | Square logo, 250x250. |
| Gallery 1 | `D:\OneDrive\桌面\01-ecpm-bazaar-home-en.png` | Homepage / social preview. |
| Gallery 2 | `D:\OneDrive\桌面\02-ecpm-bazaar-demo-en.png` | Demo page screenshot. |
| Gallery 3 | `D:\OneDrive\桌面\03-ecpm-bazaar-features-en.png` | Feature explanation image. |

Workspace copies:

| Asset | Path |
| --- | --- |
| Gallery folder | `E:\eCPM Bazaar\fazier-gallery\` |

## Site / Deployment Notes

- Public site is deployed to GitHub Pages with the custom domain `ecpmbazaar.com`.
- Fazier badge added to footer for free Fazier submission.
- Source commits on `main`:
  - `5dfeffb Add Fazier launch badge`
  - `cdfae17 Keep GitHub Pages assets unprocessed`
- Manual deploy branch: `gh-pages`.
- `.nojekyll` is present so GitHub Pages serves `_next` assets correctly.

## Current Follow-Up Queue

1. Prepare TinyLaunch launch-day assets and reminder for 2026-07-20.
2. Ask a small number of close contacts to click `Notify me` on https://tinylaunch.com/launch/16633 before launch.
3. Resolve Fazier old-link issue by manual edit, support request, or resubmission if necessary.
4. Leave Uneed scheduled; do not pay for queue skip.
5. Continue Reddit account warm-up with non-link comments only.
6. Try MicroLaunch next if it has a simple/free flow.
7. Retry BetaList later only after logging in first.

## 2026-06-22 X Content Draft

Status: Prepared, not posted yet.

Primary angle: Turn ad revenue drops into a shareable diagnosis card instead of only showing raw dashboard numbers.

Suggested X post:

```text
Mobile game ad revenue dropped?

Don't stop at "eCPM is down."

A better diagnosis should turn the drop into a clear card:

- Problem: revenue down
- Main cause: eCPM / impressions / fill rate / country mix
- Placement: rewarded, interstitial, banner
- Ad source: which network changed
- Next action: what to check first

That is the direction I am building for eCPM Bazaar:
turn messy ad monetization reports into diagnosis cards small teams can actually act on.
```

Optional shorter version:

```text
Mobile game ad revenue dropped?

Instead of only checking eCPM, turn the change into a diagnosis card:

Main cause
Country
Placement
Ad source
Next action

This is the product direction for eCPM Bazaar: make ad revenue drops easier for small game/app teams to understand.
```

Asset:

- New X image: `D:\OneDrive\桌面\x-ecpm-diagnosis-card-2026-06-22.png`
- Previous desktop image moved into: `D:\OneDrive\桌面\eCPM Bazaar Outreach Assets\x-ad-revenue-real-driver-2026-06-22.png`

## 2026-06-22 X Content Draft - AI App Case

Status: Prepared, not posted yet.

Primary angle: A viral AI app does not need to create a new world. It can add a collection/share layer to real-world objects. Use this as a light bridge to eCPM Bazaar's diagnosis-card direction.

Suggested X post:

```text
这个抓猫 App 的思路很值得拆。

它厉害的地方不是 AI 技术本身，而是把现实世界里已经存在的东西，包装成一个可收集、可炫耀、可分享的游戏系统。

底层公式其实很简单：

现实中的高情绪对象
+ 拍照识别
+ AI 风格化
+ 图鉴收集
+ 稀有度/等级/数据页
= 轻量版现实世界游戏。

猫天然有情绪价值，路边猫天然有偶遇感，图鉴天然有收集欲。所以用户不需要被教育，一看就懂。

这个公式还能扩展到抓狗、植物图鉴、城市怪物图鉴、餐厅图鉴、老物件图鉴。

真正的关键不是“猫”，而是：

把普通现实物体，变成可收藏、可升级、可分享的角色卡。

这对 eCPM Bazaar 也有启发：

B2B 工具不一定只能给一堆表格，也可以把一次广告收入下跌，生成一张清晰的“诊断卡”：

Problem: revenue dropped
Main cause: fill rate / eCPM / country mix
Placement: rewarded video
Ad source: Unity Ads / AdMob / AppLovin
Next action: what to check first

好产品不是把数据变多，而是让人一眼知道下一步该做什么。
```

Optional shorter version:

```text
这个抓猫 App 的底层公式很简单：

现实中的高情绪对象
+ AI 识别
+ 风格化
+ 图鉴收集
+ 稀有度/等级
+ 分享卡
= 轻量版现实世界游戏。

真正关键不是“猫”，而是把普通现实物体变成可收藏、可分享的角色卡。

这个思路也能用在 B2B 工具上。

比如 eCPM Bazaar 不只展示广告收入数据，而是把一次收入下跌变成一张诊断卡：

收入掉了多少？
主因是 eCPM、fill rate、国家结构，还是广告源？
下一步应该先查哪里？

工具的价值不是给更多数字，而是让用户更快做判断。
```

Asset:

- New X image: `D:\OneDrive\桌面\x-ai-reality-collection-card.png`

## 2026-06-24 Reddit Warm-Up - r/IndieDev Reply

Status: Author replied to the user's no-link r/IndieDev comment. User posted a short no-link follow-up reply. This is a positive account-warm-up signal because the comment stayed visible long enough to receive a normal conversation reply.

Context:

- Platform: Reddit
- Subreddit: r/IndieDev
- Topic context: Indie/mobile app testing and Google paid app testing friction.
- Current action: Posted one short no-link follow-up reply. Keep monitoring; avoid mentioning eCPM Bazaar or adding a URL in this thread unless the author explicitly asks.

Suggested follow-up:

```text
That makes sense. Google testing rules can be surprisingly painful for small teams, especially when you just want a quick external sanity check.

For early testing, I’d probably keep the scope very small: a few trusted testers, one clear feedback goal, and no pressure to make the first build feel “launch ready.”
```

Next follow-up:

- If this reply stays visible, continue using this Reddit account for normal no-link game/app feedback.
- Do not post product links on Reddit unless someone explicitly asks for the tool or demo.

## 2026-06-24 Platform Candidates - Game Developer Communities

Status: New candidate list prepared. Priority is game developer communities first, product directories second.

Recommended next platforms:

1. itch.io Community / Devlogs
   - URL: https://itch.io/community
   - Best action: start with 1-2 helpful comments on devlogs or feedback threads; later post a discussion-style checklist.
   - Angle: "How do small mobile game teams debug ad revenue drops?"
   - Avoid: direct product link in the first comment.

2. GameDev.net
   - Status: already working. Main post approved; follow-up reply approved.
   - Best action: wait for further replies; do not repost the same topic.

3. GameDev.tv Community
   - URL: https://community.gamedev.tv/
   - Best action: search for mobile ads, AdMob, Unity Ads, monetization threads; reply with practical checklist.
   - Avoid: hard promotion.

4. Unity Discussions
   - URL: https://discussions.unity.com/
   - Best action: only reply when the topic is directly about mobile monetization, AdMob, Unity Ads, mediation, or reporting.
   - Avoid: starting a product promo thread.

5. B4X Forum
   - URL: https://www.b4x.com/android/forum/
   - Best action: observe/register later; good for Android/iOS app developers using AdMob.

6. GameMaker Community
   - URL: https://forum.gamemaker.io/
   - Best action: monitor monetization/mobile game discussions.

Product directory lane:

- TinyLaunch: already scheduled, launch URL https://tinylaunch.com/launch/16633
- Fazier / Uneed / BetaList / MicroLaunch: use for product listing and SEO, not daily warm-up.
- Product Hunt: prepare later after demo/free diagnosis pages feel complete.

Research file:

- `E:\eCPM Bazaar\_knowledge_base\research-ecpm-bazaar-outreach-platforms-20260624.md`

## 2026-06-25 GameDev.net Reply - TiltBump Feedback

Status: User posted a no-link feedback reply on a GameDev.net mobile browser game thread. The author replied positively and the user's comment received Like / Helpful / Thanks reactions.

Context:

- Platform: GameDev.net
- Thread context: TiltBump mobile browser arcade game using phone tilt controls.
- User feedback angle: make the motion permission step clear, especially for first-run users; make the first 30 seconds forgiving while players learn tilt sensitivity.
- Author response: agreed that iOS permission rejection is a problem because the prompt cannot be shown again; said first-time helper behavior exists but likely needs further calibration.

Suggested follow-up:

```text
That makes sense, especially on iOS. If the permission prompt is basically a one-shot moment, the screen before it probably matters almost as much as the prompt itself.

One small idea: before triggering the browser permission dialog, show a short in-game explanation with a tiny visual demo of tilting the phone. Then the system prompt feels expected instead of surprising.

Good luck with the calibration. Mobile browser controls are tricky, but the idea is easy to understand.
```

Next follow-up:

- If the author replies again, keep the conversation about mobile UX/testing.
- Do not mention eCPM Bazaar or add a link in this thread.

## 2026-06-26 itch.io Warm-Up - Survival Game Feedback

Status: User posted one no-link feedback comment on itch.io after watching the author's devlog/video.

Context:

- Platform: itch.io
- Thread: Survival Game Devlog_01 - Feedback
- URL: https://itch.io/t/6329264/survival-game-devlog-01-feedback
- Feedback angle: some parts of the video/gameplay looked too dark; keep atmosphere but improve visibility for important objects, threats, and interactable areas.

Posted comment:

```text
Nice start. I watched the video and one thing I noticed is that some parts feel a bit too dark, so it is hard to read what is happening on screen.

For a survival game, dark atmosphere can work well, but I’d try to keep important gameplay objects, threats, and interactable areas more visible.

Maybe a small brightness pass, stronger highlights, or clearer contrast around key objects would make the video and gameplay easier to understand.
```

Next follow-up:

- Monitor whether the author replies.
- Keep itch.io first week to normal feedback comments only; avoid posting eCPM Bazaar links until the account has some organic history.

## 2026-06-27 itch.io Warm-Up - Nymble 2 Demo Devlog

Status: User posted one no-link feedback comment on itch.io. Comment is visible immediately.

Context:

- Platform: itch.io
- Devlog: Video Devlog #1: Jumping Changes Everything
- Game: Nymble 2 Demo
- URL: not captured yet.
- Feedback angle: changing jump rules affects both movement feel and puzzle readability; early levels should teach the new jump behavior through safe, obvious setups; turn-based puzzle-platformer is a strong hook.

Posted comment:

```text
Nice devlog. The idea of changing the jump rules in a puzzle-platformer is interesting because it can affect both movement feel and puzzle readability.

One thing I’d watch closely is whether players understand the new jump behavior from the level design itself, without needing too much explanation. If the first few levels teach the rule through safe, obvious setups, the later puzzles can probably get much more creative.

The turn-based puzzle-platformer mix is a strong hook.
```

Next follow-up:

- Do not post more itch.io comments today.
- Monitor whether the author replies.

## 2026-06-26 X Post - Small Team Diagnosis

Status: Posted by user.

Post angle:

- Small mobile game teams do not need another giant analytics dashboard.
- They need to know why ad revenue changed.
- Potential drivers: eCPM, impressions, fill rate, country mix, placement exposure, ad source.

Next follow-up:

- Check likes/replies tomorrow.
- If someone replies with a monetization problem, ask for the metric context first instead of immediately sending a link.

## 2026-06-27 Reddit Plan - r/IndieDev Tomorrow

Status: Reminder created for 2026-06-28 10:00 Asia/Shanghai.

Plan:

- Focus on r/IndieDev tomorrow.
- Find one fresh post from the last 24 hours or last 3 days.
- Prefer posts where the author asks for feedback on gameplay, art, onboarding, trailer, demo, or launch preparation.
- Write one no-link, no-product-mention English comment.
- Avoid eCPM Bazaar links or ad-revenue talk unless the post is explicitly about monetization.

Automation:

- `r-indiedev-comment-tomorrow`

## 2026-06-27 Reddit r/IndieDev - ZombiSeed Character Art

Status: User's no-link feedback comment received 2 upvotes and a detailed author reply. Positive Reddit account signal.

Context:

- Platform: Reddit
- Subreddit: r/IndieDev
- Topic: From Sketch to Final: Character Intro for dark fantasy game ZombiSeed.
- User feedback angle: flower zombie concept is memorable; keep silhouette readable in battle because final art has many details; maintain clear color contrast during card combat.
- Author response: thanked user, explained Joseimuke/female-oriented audience and avoiding gore/censorship; said battle system is the most difficult part now and the readability/silhouette advice is helpful and will be incorporated.

Suggested follow-up:

```text
That direction makes a lot of sense. Beautiful but unsettling is a stronger identity than just making the enemy more graphic.

For the combat side, one thing that might help is testing the character at the smallest in-game size first. If the silhouette still reads there, the full art will probably work even better in dialogue or card detail views.

Good luck with the battle system. It sounds like you’re making thoughtful choices around the audience and tone.
```

Next follow-up:

- Reply once, then stop unless the author continues the conversation.
- No link and no eCPM Bazaar mention.

## 2026-06-26 Platform Pick - Solar2D Forum

Status: Registered by user, then account temporarily suspended after the first monetization-related reply. Pause Solar2D until the account is restored or reviewed.

Why it fits:

- Solar2D is a 2D/mobile game engine community.
- The forum has recent/visible monetization-related topics such as Unity Ads updates and AdMob plugin support.
- Historical topics include AdMob mediation, AppLovin MAX, and mobile ads issues.

URL:

- https://forums.solar2d.com/

Recommended setup:

- Username/display name: `Ad Revenue Notes` or `adrevenuenotes`
- Profile bio: `I’m interested in 2D mobile games, game analytics, and how small teams understand player and ad revenue signals.`
- First action after registration: browse Marketing and Monetization / General Questions, then leave one no-link helpful reply if a relevant thread exists.

Do not:

- Post eCPM Bazaar link on day one.
- Start a promotional thread before the account has normal activity.

First relevant thread found:

- Thread: appLovinMAX or ironSource???
- URL: https://forums.solar2d.com/t/applovinmax-or-ironsource/357817
- Why relevant: directly discusses Solar2D ad monetization, AppLovin MAX, ironSource, AdMob, fill rate, and daily ad revenue.
- Recommended first action: one no-link comment asking a practical diagnostic question / adding a useful checklist. Do not mention eCPM Bazaar yet.

Suggested comment:

```text
This is a useful thread. One thing I would also compare is not only total daily revenue, but why it changes after switching mediation.

For example, I’d look at:

- fill rate before and after the switch
- eCPM by country
- rewarded vs interstitial performance
- which network gets real impressions, not just requests
- whether the revenue lift stays after the first few weeks

Sometimes mediation looks better at first, then settles back to the old baseline. In that case the diagnosis is different from a real long-term eCPM improvement.
```

Outcome / caution:

- After the first comment attempt, the forum showed "Account temporarily suspended".
- The pasted Guidelines/FAQ text is generic Discourse community guidance, not a specific suspension reason.
- Likely trigger: brand-new account + immediate reply in monetization/ad network thread + commercial keywords such as AppLovin, ironSource, AdMob, eCPM, revenue.
- Next action: do not repost. Check email for verification/suspension notice. If needed, send a short appeal and wait 24-48 hours.

## 2026-06-24 GameDev.net Draft - Minimum Metrics Discussion

Status: Approved and live on GameDev.net. This confirms the different discussion angle worked better than repeating the previous ad revenue drop diagnosis topic.

Recommended forum:

- Games Business and Law

Draft title:

```text
What is the minimum useful dashboard for a small mobile game team?
```

Draft body:

```text
For small mobile game teams that monetize with ads, I’m curious what people consider the minimum useful set of metrics to review regularly.

Larger studios often have dedicated people watching dashboards, daily graph checks, and weekly deep dives. But many small teams do not have a data analyst or business person looking at this every day.

If a small team only had time to check a simple weekly dashboard, what would you include?

My current shortlist would be:

- revenue
- impressions
- eCPM
- fill rate / match rate
- country split
- placement performance
- ad source / mediation source performance

The part I’m still thinking through is how to make this actionable instead of just another table of numbers.

For example:

- if revenue drops but eCPM is stable, check impressions, fill, placement exposure, or country mix
- if impressions and fill are stable but eCPM drops, check pricing, demand, ad source, or country mix
- if one country or placement changed sharply, look there before changing global settings

For developers who have shipped or operated mobile games:

What metrics would you actually check every week?
What would you remove from this list?
And what would make a dashboard useful enough that a small team would keep looking at it?
```

Posting note:

- No eCPM Bazaar name.
- No URL.
- If someone asks why you are asking, say you are organizing a practical checklist for small mobile/app teams.

Outcome:

- 2026-06-25: GameDev.net moderation email confirmed the topic was approved and is now live.
- Next action: click "View Details", copy/save the public topic URL, and monitor replies. Do not bump the topic unless someone replies.

## 2026-06-27 GameDev.net Reply Approved - Colony Simulation Decision Model

Status: Approved and live.

Platform:

- GameDev.net

Thread:

```text
A decision-making model for running a colony simulation.
```

Approved reply excerpt:

```text
I’d keep the system as debuggable as possible before trying anything like a neural network.
A weighted utility system is useful because you can inspect why a character picked one action over another...
```

Notes:

- This was a normal technical reply, not a promotion.
- No eCPM Bazaar URL.
- Good account-building signal: the reply passed moderation and is now live.
- Next action: click "View Details", confirm the public page, and continue with low-risk technical/helpful replies. Do not add links in follow-up unless someone explicitly asks.

## 2026-06-28 itch.io Reply Notification - Video Devlog Comment

Status: Received reply notification.

Platform:

- itch.io

Account:

- Ad Revenue Notes

Thread / page:

```text
Video Devlog #1: Jumping Changes Everything comments
```

Notification:

```text
Reply by xalezar
```

Notes:

- This means the previous itch.io comment got engagement.
- itch.io continues to look healthier for normal no-link community comments.
- Next action: open the notification link, read the reply, then respond with a short natural no-link comment if appropriate.

Follow-up:

- User played the demo briefly and replied with feedback about the manageable difficulty curve, gradual rule introduction, and asked whether later levels add usable items/tools or mainly combine jump mechanics.
- xalezar replied that the jumping mechanic is the main hook, the game is still being designed/built out, and items/tools are possible.
- This is a healthy two-way interaction. Keep the next reply short and do not mention eCPM Bazaar.

Suggested next reply:

```text
That makes sense. Keeping the jump mechanic as the main hook is probably the right foundation.

If you do add items or tools later, I’d introduce them slowly and make sure they support the jump puzzles rather than compete with them. The strongest part so far is that the rules feel easy to follow while still leaving room for more complex combinations.
```

## 2026-06-29 GameDev.net Draft - Actionable Metrics Discussion

Status: Submitted; pending moderator review.

Recommended forum:

- Game Design and Theory

Draft title:

```text
How do you decide whether a metric should change your game design?
```

Draft body:

```text
I’ve been thinking about the difference between a metric that is interesting to look at and a metric that actually changes what a small game team does next.

For example, a team might track things like:

- retention
- session length
- level completion
- fail points
- tutorial drop-off
- ad impressions or ad revenue
- wishlists or conversion rate

But a number by itself does not always lead to a decision.

If retention drops, the next question is where players are leaving.
If a level has a high fail rate, the next question is whether it is frustrating, unclear, or intentionally difficult.
If revenue drops, the next question is whether traffic, pricing, country mix, placement exposure, or something else changed.

So I’m curious how other developers think about this:

When does a metric become actionable for you?

Do you only trust it after seeing the same pattern for several days?
Do you need player feedback or recordings before changing the design?
Do you prefer a few simple metrics that map directly to decisions?
Or do you mostly use metrics as a warning signal and then investigate manually?

For small teams without a dedicated analyst, I feel like the real challenge is not collecting more numbers. It is turning one change in the data into a clear next question.

What is one metric you actually use to make development or business decisions?
And what would make you ignore a metric even if it looks important?
```

Posting notes:

- No eCPM Bazaar name.
- No URL.
- This avoids repeating the previous two topics while still reinforcing the product's diagnosis positioning.
- If approved, monitor for replies but do not bump unless someone responds.

Submission notes:

- User selected Games Business and Law.
- Tags used: game-design, business, production, analytics, IndieGameDev.
- GameDev.net moderation email/screen confirmed the topic is pending moderator review and says not to repost it.
- Next action: wait for approval email or visible topic. Do not repost or edit aggressively while pending.

## 2026-06-29 Candidate Comment - itch.io Under Heaven Or Hell Devlog

Status: Candidate selected; waiting for user to comment.

Platform:

- itch.io

Account:

- Ad Revenue Notes

Candidate:

```text
Devlog #12 - New Trailer + Small Update
```

Project:

```text
Under Heaven Or Hell [DEMO]
```

Reason:

- Visible on itch.io Developer Logs page.
- Trailer/update devlog is suitable for normal feedback.
- Better than commenting on a sale-only post.
- No eCPM Bazaar mention and no link.

Suggested no-link comment:

```text
Nice update. A new trailer is a good moment to make the core hook as clear as possible in the first few seconds.

One thing I’d watch is whether a new viewer can understand the main tension quickly: who the player is, what kind of choice or conflict drives the story, and what makes this project different from other narrative demos.

If the trailer already gives a strong emotional tone and one clear reason to try the demo, that is usually more useful than showing too many disconnected moments.
```

Next action:

- User can open the devlog, watch/read briefly, then post the comment if it fits.

## 2026-06-29 Candidate Comment - Reddit Mobile Monetization Strategy

Status: Candidate selected; waiting for user to comment.

Platform:

- Reddit

Subreddit:

- r/IndieDev

Thread:

```text
Mobile game devs: one-time purchase vs subscription vs ad-based, what revenue strategy did you choose?
```

URL:

```text
https://www.reddit.com/r/IndieDev/comments/1txhrl3/mobile_game_devs_onetime_purchase_vs_subscription/
```

Reason:

- Directly relevant to mobile/F2P/ad monetization.
- Safer than r/admob for the current Reddit account trust level.
- No eCPM Bazaar mention and no link.

Suggested no-link reply:

```text
For small mobile games, I’d usually start by matching monetization to session length and player intent, not by picking the model first.

Short-session arcade/puzzle games often fit rewarded ads + optional remove-ads IAP because the ad can be tied to a clear moment: retry, revive, extra reward, daily bonus, etc.

One-time purchase is cleaner for players, but on mobile it can be hard unless the game already has a strong hook, brand, or audience before launch. Subscription feels like the hardest fit unless there is ongoing content or a service layer.

The main thing I’d watch with ad-based monetization is not just revenue, but whether the ad moments hurt retention. If retention drops after adding ads, the revenue model may look better in the short term but worse over time.
```

Next action:

- User can post the reply, then monitor whether it remains visible.

## 2026-06-29 Candidate Comment - Reddit r/SideProject PromptEval

Status: Candidate selected; waiting for user to comment.

Platform:

- Reddit

Subreddit:

- r/SideProject

Thread:

```text
Got my first paying user today and I genuinely couldn't believe it at first. Thank you all.
```

Product:

```text
PromptEval
```

URL:

```text
https://prompt-eval.com/en
```

Reason:

- Recent post shown by user: 5 hours old.
- SaaS/product-founder audience is relevant for learning landing page positioning and launch copy.
- Not directly eCPM Bazaar target, but useful for account-building and product-page pattern research.
- No eCPM Bazaar mention and no link.

Suggested no-link reply:

```text
Congrats, that first paid user is a huge validation signal.

I checked the product page and the positioning feels very clear. What stood out to me is that the page explains the outcome first, not just the features: evaluate prompts, compare versions, and catch regressions before shipping.

That makes it much easier to understand why someone would pay.

Curious: do you know where the first paying user came from? Reddit, search, direct outreach, or somewhere else?
```

Next action:

- User can post the reply on the r/SideProject thread.
- If the author replies with acquisition channel, record it as a useful launch signal.

## 2026-06-28 Candidate Comment - GameDev.net Prototype Milestone Thread

Status: Candidate selected; waiting for user to post.

Platform:

- GameDev.net

Thread:

```text
I have a prototype but don't know my next production milestone. What would you do next?
```

URL:

```text
https://gamedev.net/forums/topic/720100-i-have-a-prototype-but-dont-know-my-next-production-milestone-what-would-you-do-next/
```

Reason:

- Recent post.
- 0 replies at discovery time.
- Low-risk topic: production milestone / prototype feedback.
- No eCPM Bazaar mention and no URL needed.

Recommended no-link reply:

```text
If this were my project, I’d try to turn the next milestone into a very specific validation step rather than a bigger production step.

For example:

- define the smallest vertical slice that proves the combat loop is fun with strangers, not only with people who already understand the design
- run a small playtest with 10-20 players and watch where they get confused, bored, or excited
- write down what must be true before it makes sense to look for collaborators or funding
- avoid adding more scope until the prototype gives you one clear reason people want to keep playing

From what you described, I’d probably treat the next bottleneck as validation and positioning, not production polish yet. A better-looking prototype helps, but only if it answers a concrete question: who is this for, and do they want more after playing it?
```

Next action:

- User can post the reply, then monitor moderation/likes/replies.

## 2026-06-28 Forum View Metrics

Status: Logged observed topic performance.

Platform / site forum:

- eCPM Bazaar site forum / public forum area shown by user

Observed topics:

```text
对于小型手游团队来说，最基本的实用仪表盘是什么样的？
```

- Views: 136
- Replies: 0
- Age: 4 days 3 hours

```text
如何诊断手机游戏广告收入下降的问题？
```

- Views: 183
- Replies: 2
- Age: 6 days 6 hours

Notes:

- 100+ views means the topics are getting seen.
- Reply rate is still low, so future titles should invite specific answers rather than broad discussion.
- Better next format: ask for one concrete workflow, example, or first metric checked.

## 2026-06-28 Candidate Comment - Reddit r/IndieDev Browser Word Game

Status: Candidate selected; waiting for user to comment.

Platform:

- Reddit

Subreddit:

- r/IndieDev

Thread:

```text
Looking for honest feedback on my browser word game
```

URL:

```text
https://www.reddit.com/r/IndieDev/comments/1ub66la/looking_for_honest_feedback_on_my_browser_word/
```

Reason:

- Author explicitly asks for feedback.
- Low-risk normal game feedback topic.
- No eCPM Bazaar mention and no URL.
- At discovery time, Reddit page showed no comments yet.

Recommended no-link reply:

```text
The core idea sounds easy to understand: build words, score points, and compete quickly.

For first-time players, I’d pay close attention to onboarding and the first 30 seconds. If someone immediately understands what a good move looks like, the game has a much better chance of feeling competitive instead of random.

For Blitz mode, I’d probably test a few timer lengths. Too short can make it feel stressful before players understand the strategy, but too long may remove the tension that makes the mode interesting.

One small thing that could help replay value is showing players why they lost or won after a round: best word, missed opportunity, score difference, or fastest move. That gives people a reason to try again instead of just seeing a final score.
```

Next action:

- User can post the reply, then watch whether it remains visible after a few minutes.

## 2026-06-28 Recommended Reddit Community To Join - r/playmygame

Status: Recommended for joining.

Platform:

- Reddit

Community:

```text
r/playmygame
```

URL:

```text
https://www.reddit.com/r/playmygame/
```

Reason:

- Community is built around indie developers sharing playable games and receiving feedback.
- Good fit for account-building through real gameplay feedback.
- Better for no-link helpful comments than direct eCPM Bazaar promotion.

Caution:

- Follow "give more than you take".
- Do not post eCPM Bazaar or external links there.
- Use it to comment on games, playtests, onboarding, UI, retention, difficulty, and feedback loops.

Next action:

- Join the community.
- Comment on 1 low-risk post after reading/trying the game.

## 2026-06-28 Reddit r/playmygame Comment - Football Manager Team 11

Status: Posted by user; monitor whether it stays visible.

Platform:

- Reddit

Community:

- r/playmygame

Thread:

```text
Football Manager: Team 11 - a free football draft game (iOS & Android), looking for feedback
```

Comment angle:

- Feedback on draft/spin loop.
- Suggested making randomness feel directed rather than purely punishing.
- Suggested visible tradeoffs after each pick: chemistry, position fit, formation strength, risk/reward.
- Mentioned 30-day challenge as a retention hook.

Promotion:

- No eCPM Bazaar mention.
- No external link.

Next action:

- Check after a few minutes/hours whether the comment remains visible.
- If the author replies, respond naturally to their specific point.

## 2026-07-10 Reddit Post - Mediation Source Match Rate Discussion

Status: Posted by user; public URL not yet provided.

Platform:

- Reddit

Community:

- r/admob

Flair:

- Question

Title:

```text
How do you interpret low match rate for one bidding source when app-level fill is healthy?
```

Post angle:

- A focused discussion of app/ad-unit level fill versus mediation or bidding-source match rates.
- Asked how developers distinguish requests -> matched -> impressions -> show rate from source-level bidding, wins, serving, and revenue contribution.
- Mentioned eCPM Bazaar transparently as a browser-based CSV diagnosis workflow for small mobile teams.

Promotion:

- No external link.
- No claim of revenue improvement.
- No request for sensitive data.

Current status:

- Posted.
- Public URL / screenshot status: not yet supplied.

Next action:

- Monitor replies and answer only questions that add useful technical context.
- Do not bump the thread; add the public URL here when available.
