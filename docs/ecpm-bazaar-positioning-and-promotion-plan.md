# eCPM Bazaar Positioning and Promotion Plan

Last updated: 2026-06-27

## Core Positioning

eCPM Bazaar should be positioned as a **mobile game ad revenue diagnostic tool**, not a generic game advertising or ad buying diagnosis product.

Primary English message:

```text
Find Why Your Mobile Game Ad Revenue Is Low
```

Supporting message:

```text
A free eCPM and ad monetization diagnostic tool for mobile game developers.
```

Chinese positioning:

```text
帮海外移动游戏开发者诊断广告收益为什么低。
```

## Target Customers

Best-fit users:

- Indie mobile game developers with existing ad revenue.
- Casual / hybrid-casual small teams watching ARPDAU, fill rate, and ad format performance.
- Developers using AdMob, Unity Ads, AppLovin MAX, ironSource / Unity LevelPlay, TopOn, or similar mediation tools.
- Small publishers with multiple games and unstable ad revenue.
- Overseas mini-game studios without a dedicated monetization manager.

Possible later users:

- User acquisition teams that need to connect CPI, retention, and ad revenue payback.
- Small publishers that need batch diagnosis across several games.

Not the right first users:

- PC-only indie games.
- Premium Steam games with no ads.
- Console games.
- Teams that have not launched yet.
- Games with no ad monetization data.

## Pain Points to Lead With

Website and outreach content should directly call out these questions:

- Low eCPM?
- Poor fill rate?
- Rewarded ads not performing?
- Ad revenue lower than expected?
- Not sure if mediation is working?
- More impressions but no revenue lift?
- Unsure whether the issue is GEO mix, placement, ad format, or ad network?

## Metrics the Product Should Collect

Free diagnosis V1 should ask for ranges or anonymized rows around:

- eCPM
- ARPDAU
- Fill rate / match rate
- Impressions
- Impressions per DAU
- DAU range
- Ad format: rewarded, interstitial, banner
- Ad placement
- Country / GEO
- Mediation platform
- Ad network / source
- Retention context when available

## Website Changes Required

Immediate changes:

1. Update the homepage hero to lead with "Find Why Your Mobile Game Ad Revenue Is Low".
2. Add a clear "who this is for / not for" section.
3. Add the key pain questions near the top of the page.
4. Expand the free diagnosis form to include ad format, eCPM, fill rate, ARPDAU, DAU range, top GEO, and mediation.
5. Make the sample report/cases page feel like "View Sample Diagnosis Report".
6. Keep the early conversion path focused on free diagnosis, not subscriptions.

Later changes:

- Add a "10 free diagnosis slots" page/section.
- Add deeper sample reports with Revenue Health Score.
- Add paid diagnosis packages after real user feedback exists.
- Add an admin/export flow for inbound diagnosis requests.

## Recommended Promotion Loop

1. Find pain on Reddit / Unity / game developer forums.
2. Reply with diagnosis frameworks, not links.
3. Publish useful diagnostic posts.
4. Offer a free diagnosis if someone asks or shows a real problem.
5. Collect email / X / Discord contact.
6. Return a diagnosis card and short report.
7. Convert successful free diagnoses into anonymous cases.
8. Later sell one-time deeper reports before building a full SaaS subscription.

## Pain-Led Reddit / X Content SOP

Use this workflow instead of generic "tool promotion" posts.

### 1. Search for customer-language pain

Search Reddit, X, and developer communities with:

```text
AdMob eCPM dropped
AppLovin revenue down
Unity Ads low eCPM
mobile game ad revenue dropped
rewarded ads fill rate dropped
MAX mediation revenue drop
AdMob fill rate issue
```

Look for real developer complaints such as:

- "My AdMob revenue dropped 40% this week."
- "Rewarded ads stopped filling in Brazil."
- "eCPM is down but impressions are stable."
- "AppLovin MAX revenue suddenly dropped."

These phrases are the target user's language and should shape posts, replies, and website copy.

### 2. Turn one pain into a diagnosis post

Example post:

```text
If your mobile game ad revenue dropped 30%, don't check eCPM first.

Check this order:

1. Did impressions drop?
2. Did fill rate drop?
3. Did country mix change?
4. Did one placement stop showing?
5. Did one ad source stop filling?
6. Did eCPM actually drop?

Most teams look at revenue first.
But revenue is only the final symptom.
```

### 3. Pair posts with a diagnosis-card image

Use report-style graphics, not generic AI art.

```text
Revenue Drop Diagnosis

Revenue: -32%
eCPM: stable
Impressions: stable
Fill Rate: 81% -> 54%
Main Cause: Fill Rate Drop
Likely Issue: Mediation / Ad Source Availability
Severity: High
```

### 4. Daily cadence

Post no more than two pieces per day:

- One short diagnosis post.
- One case-style breakdown.

Short diagnosis example:

```text
Revenue dropped, but eCPM is stable?

Then it is probably not an eCPM problem.

Check:
- fill rate
- impressions
- country mix
- placement exposure
- ad source availability
```

Case breakdown example:

```text
Example:

Revenue: -28%
eCPM: +3%
Impressions: -2%
Fill rate: 79% -> 51%

This is not a pricing issue.
This is likely a fill / mediation issue.
```

### 5. Reply under other people's posts

This is more valuable than only posting on the eCPM Bazaar account.

Reply pattern:

```text
I would not check revenue alone.

Try splitting it by:
1. country
2. placement
3. ad source
4. fill rate
5. impressions
6. eCPM

If impressions are stable but fill rate dropped, it may be a mediation or ad source availability issue.
```

Only add a soft product mention if the context is clearly relevant:

```text
I'm building a small diagnostic tool for this. Happy to test with anonymized data.
```

Do not drop a link in the first reply unless someone asks for the tool/demo.

### 6. Website conversion path

Lead users to:

```text
Get a free ad revenue drop diagnosis.
```

The intake should support:

- revenue before / after
- eCPM before / after
- impressions before / after
- fill rate before / after
- country
- placement
- ad source
- anonymous CSV rows

### 7. Turn real diagnoses into anonymized cases

After helping a real developer, remove private details and publish a case:

```text
Case study:

A small mobile game team saw revenue drop by 35%.

At first, they thought eCPM collapsed.

But the real issue was:
- Brazil traffic increased
- rewarded video fill rate dropped
- one ad source stopped filling
- placement exposure was stable

Diagnosis:
Not an eCPM problem.
It was a country + fill rate issue.
```

The business path is not generic X ad revenue. It is:

```text
Reddit/X developer pain -> professional diagnosis content -> website test user -> real case -> paid report/tool
```

## Channel Priority

1. Reddit: r/gamedev, r/IndieDev, r/Unity3D, r/androiddev, r/adops.
2. Unity / game engine forums: Unity Discussions, GameDev.net, itch.io devlogs, Solar2D only if account hold resolves.
3. LinkedIn: mobile game developer, game monetization manager, UA/growth/product roles.
4. Product directories: TinyLaunch, Product Hunt, Indie Hackers, Fazier, Uneed, MicroLaunch.
5. Cold email: only to very relevant mobile game/app teams with ad monetization.

## Pricing Direction

Do not sell subscriptions first. Start with:

- Free basic diagnosis: $0.
- Deep PDF report: $29-$49.
- Manual expert diagnosis: $99-$199.
- Multi-game publisher diagnosis: $299-$999.
- Monthly monitoring later: $19-$99/month.

## Guardrails

- Do not promise guaranteed revenue increase.
- Say "possible causes", "suggested tests", and "optimization ideas".
- Do not ask for account passwords, API keys, or user-level data.
- Let users send ranges instead of exact revenue if they prefer.
- Keep outreach helpful and no-link until someone asks for the tool.
