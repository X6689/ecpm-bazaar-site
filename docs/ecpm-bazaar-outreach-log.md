# eCPM Bazaar Outreach Log

Last updated: 2026-06-21

This file is the running record for eCPM Bazaar outreach, free launch sites, forum posts, comments, assets, and follow-up actions.

## Core Links

| Item | URL | Notes |
| --- | --- | --- |
| Landing page | https://ecpmbazaar.com/ | Public website, English-first with Chinese toggle. |
| Public demo | https://ecpmbazaar.com/demo/ | Browser-only CSV demo, no upload/storage. |
| Contact email | xmmyy168@gmail.com | Overseas-facing contact address. |
| GitHub repo | https://github.com/X6689/ecpm-bazaar-site | Source and GitHub Pages deployment. |

## Product Directory / Launch Platform Status

| Platform | Status | Public / Admin URL | Date / Schedule | Account / Notes | Next Action |
| --- | --- | --- | --- | --- | --- |
| Fazier | Published | https://fazier.com/launches/ecpm-bazaar | Submitted on 2026-06-20 | Maker profile: https://fazier.com/p/ai-xia. Product title: `eCPM Bazaar`; tagline: `Diagnose mobile game ad revenue drops`; price: Free. Fazier badge was added to site footer for free submission. | Check comments/upvotes occasionally. Do not self-upvote. |
| Uneed | Scheduled | Admin/dashboard only for now | Scheduled for 2026-11-06 | Account shown as `xmmyy1688-cdfe`. Category: Marketing. Tags: Analytics, Advertising, Stats. Free launch queue is very long. | Leave as-is; do not pay for queue skip. Check later for review/status. |
| TinyLaunch | Scheduled / pending review | Admin/dashboard only for now | Scheduled for 2026-07-20, pending review, usually less than 24h | Category selected: Gaming. Free launch slot used. Paid directory submission skipped. | Check review result within 24h. Save public URL once approved. |
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
| Reddit r/admob link comment | Removed by Reddit | https://www.reddit.com/r/admob/comments/1u8cq53/sudden_drop_in_admob_observed_ecpm_on_android_us/ | 2026-06-21 | Comment with GitHub Pages demo link was removed within minutes as `[ Removed by Reddit ]`. Likely automated anti-spam/self-promo. | Do not post links in r/admob unless OP explicitly asks for the link. |
| Reddit r/SideProject | Some comments survived | Links not fully captured | 2026-06 | SideProject has been safer than r/admob/r/gamedev. A project-drop style comment survived better. | Prefer no-link comments; only add link in explicit project-share/feedback threads. |
| Reddit r/gamedev / r/admob | High deletion risk | N/A | 2026-06 | Earlier comments/posts were deleted or filtered. | Avoid self-promo. Reply with diagnosis steps only. |

## Reddit Rules Learned

- For `r/admob`, do not include product links in first reply.
- Avoid wording like `I'm building` + `Demo:` in the same comment unless the post explicitly asks for tools/projects.
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

1. Check TinyLaunch review result after 2026-06-22.
2. Save TinyLaunch public URL when approved.
3. Check Fazier product page for comments/upvotes.
4. Leave Uneed scheduled; do not pay for queue skip.
5. Continue Reddit account warm-up with non-link comments only.
6. Try MicroLaunch next if it has a simple/free flow.
7. Retry BetaList later only after logging in first.
