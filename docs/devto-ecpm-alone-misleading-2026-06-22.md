---
title: Why eCPM Alone Can Mislead You When Mobile Game Ad Revenue Drops
published: false
description: A practical diagnosis framework for small mobile game and app teams that monetize with ads.
tags: gamedev, mobile, analytics, monetization
---

# Why eCPM Alone Can Mislead You When Mobile Game Ad Revenue Drops

When mobile game ad revenue drops, it is tempting to open the ad dashboard and check one number first:

**eCPM.**

If eCPM is down, it feels like the answer is obvious. Demand is worse. The network is paying less. Maybe the mediation setup is broken.

But in practice, eCPM alone can be a misleading first signal.

For small mobile game and app teams, the better question is:

**Which driver actually changed first?**

## Revenue Is Not Just eCPM

At a simple level:

```text
ad revenue = impressions / 1000 * eCPM
```

That means revenue can drop even when eCPM is stable.

It can also look like eCPM dropped when the real issue is that your traffic mix changed.

Before changing floors, mediation settings, ad units, or user acquisition decisions, I like to split the movement into a few practical drivers.

## The Six Drivers I Check

When revenue drops, I usually check these in order:

```text
1. impressions
2. fill rate / match rate
3. eCPM
4. country mix
5. placement exposure
6. ad source / mediation source
```

This is not a perfect science, but it prevents a lot of premature conclusions.

## Case 1: Revenue Down, eCPM Stable

Imagine this:

```text
Revenue: -28%
eCPM: stable
Impressions: stable
Fill rate: 78% -> 54%
```

This is probably not an eCPM problem.

If eCPM stayed stable but fill rate dropped sharply, the first checks should be serving and mediation:

- did one ad source stop filling?
- did match rate drop in one country?
- did a floor or waterfall setting change?
- did a platform or SDK issue affect requests?
- did timeout behavior change?

Changing eCPM floors at this point may make the problem harder to diagnose.

## Case 2: eCPM Down, Country Mix Changed

Now imagine this:

```text
Revenue: -18%
Total eCPM: -20%
US eCPM: stable
US impressions share: down
Lower-eCPM countries: up
```

At first glance, this looks like demand got worse.

But if your high-value countries lost share and lower-eCPM countries gained share, total eCPM can drop even when pricing inside each country is normal.

In this case, I would check:

- traffic source changes
- user acquisition campaigns
- organic installs by country
- country-level impressions share
- placement exposure by region

This is a traffic mix issue before it is a pricing issue.

## Case 3: One Placement Lost Exposure

Another common pattern:

```text
Revenue: -22%
eCPM: mostly stable
Fill rate: mostly stable
Rewarded video impressions: down
Interstitial impressions: stable
```

This may be a product or placement exposure issue.

Maybe a button was moved. Maybe a rewarded entry point became less visible. Maybe an update changed level flow or session length.

In this case, the ad dashboard alone may not explain the drop. You need to compare placement exposure with product behavior.

## A Simple Diagnosis Table

Here is the rough mental model I use:

| What changed? | More likely issue |
| --- | --- |
| Revenue down, impressions down | traffic, product flow, placement exposure |
| Revenue down, fill rate down | serving, mediation, source availability |
| Revenue down, eCPM down | demand, pricing, country mix, source performance |
| Total eCPM down, top-country eCPM stable | country mix |
| One placement down | UI, session flow, placement logic |
| One source down | mediation, bidding, source status, floor setup |

The goal is not to magically increase revenue from one table.

The goal is to avoid fixing the wrong thing.

## Why This Matters For Small Teams

Large studios often have analysts, dashboards, alerting, and internal data pipelines.

Small teams usually do not.

They may be checking AdMob, AppLovin MAX, Unity LevelPlay, TopOn, Unity Ads, or CSV exports manually.

That makes diagnosis slow. It also makes it easy to overreact to one number.

For a small team, even a simple daily workflow can help:

```text
compare latest period vs previous period
split by country, placement, and source
rank the largest revenue losses
explain the likely driver
decide what to check first
```

## What I Am Building

I am building a small tool called **eCPM Bazaar** around this diagnosis workflow.

The current version is intentionally simple:

- browser-only demo
- CSV templates
- anonymized examples
- copyable diagnosis output
- free test diagnosis by email

It is not meant to replace AdMob, AppLovin MAX, Unity LevelPlay, TopOn, or any mediation dashboard.

The goal is narrower:

**help small mobile game and app teams understand why ad revenue changed.**

If you monetize a mobile game or app with ads, I would love to know:

- what do you check first when revenue drops?
- do you trust eCPM as the first signal?
- do you look at fill rate, country mix, placement exposure, or source performance?
- would a short copyable diagnosis report be useful?

I am looking for a few developers with anonymized ad monetization data to test the workflow.

Public demo:

https://ecpmbazaar.com/demo/

Free diagnosis:

https://ecpmbazaar.com/free-diagnosis/
