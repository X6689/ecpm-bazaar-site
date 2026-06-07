# How I Built an eCPM Comparison Dashboard for My Mini-Game in 3 Days

Every morning, before touching game design or code, I had to do the same annoying routine.

Open one ad network dashboard. Check yesterday's eCPM. Open another dashboard. Check the same country, the same ad format, the same placement. Then repeat it for three to five networks.

For a small mini-game, this sounds manageable at first. But once you have multiple ad formats, countries, and networks, the manual work grows quickly.

For example:

- 5 ad networks
- 3 ad formats
- 20 countries

That is already 300 data points to compare.

The worst part is not the clicking. The worst part is that the opportunity cost is invisible. If one network is paying 15% more in the US for rewarded video, but another network is better in Brazil for interstitials, I may not notice it until days later.

So I built a small eCPM comparison dashboard for my mini-game.

It is not a huge platform. It is a practical internal tool built in 3 days to answer one question:

**Which ad network performs best for each country and ad format right now?**

## The Idea: Borrowing the SMSBazaar Pattern

The idea was inspired by SMSBazaar.

SMSBazaar aggregates multiple SMS providers, normalizes pricing and availability, and helps users compare the best option. I realized the same pattern applies to ad monetization.

Instead of:

```text
SMS providers -> price + stock -> best provider
```

I could do:

```text
Ad networks -> eCPM + fill rate -> best network
```

The core pattern is simple:

```text
fetch -> normalize -> compare -> recommend
```

This pattern is not limited to SMS or ads. It works anywhere you need to compare multiple data sources with slightly different formats.

For ad monetization, the data sources are ad networks or mediation platforms. The normalized unit is usually country, ad format, placement, revenue, impressions, eCPM, and fill rate.

## Tech Stack

I wanted something boring and fast to build:

- Node.js
- Express
- React
- ECharts
- TopOn API

Node.js handles the API sync job. Express exposes a small internal API. React renders the dashboard. ECharts handles line charts and comparison tables.

TopOn is used as the first data source because it already aggregates multiple ad networks and provides reporting APIs. In the future, the same structure can support other sources like AdMob, AppLovin MAX, Unity LevelPlay, or custom CSV imports.

## Data Model

The most important part of this project was not the UI. It was the normalized data model.

Each provider may return slightly different field names, but the dashboard should only care about one stable shape.

Here is a simplified version:

```ts
type EcpmReportRow = {
  date: string;
  appId: string;
  appName: string;
  placementId: string;
  placementName: string;
  adFormat: "rewarded" | "interstitial" | "banner" | "native";
  country: string;
  network: string;
  revenue: number;
  impressions: number;
  requests: number;
  fills: number;
  clicks: number;
  ecpm: number;
  fillRate: number;
  ctr: number;
};
```

Once every row looks like this, the comparison logic becomes straightforward.

Group by:

```text
country + adFormat + placement
```

Then compare networks by:

```text
eCPM, revenue, fillRate, impressions
```

Finally, generate a recommendation:

```ts
function recommendBestNetwork(rows: EcpmReportRow[]) {
  return rows
    .filter((row) => row.impressions > 1000)
    .sort((a, b) => b.ecpm - a.ecpm)[0];
}
```

This is intentionally simple. I do not want to recommend a network with a high eCPM based on 10 impressions. So I filter out very low-volume rows first.

## What the Dashboard Does

The first version has four core views.

### 1. Revenue and eCPM Overview

This view shows total revenue, weighted eCPM, impressions, and fill rate.

Weighted eCPM is important. Averaging eCPM values directly can be misleading. The correct version is based on total revenue and total impressions:

```text
weighted eCPM = revenue / impressions * 1000
```

### 2. Country-Level Comparison

This is the most useful view.

For each country, the dashboard shows which network performs best for each ad format.

Example:

```text
US + rewarded video -> Network A
Brazil + interstitial -> Network B
Japan + rewarded video -> Network C
```

This matters because there is rarely one best network everywhere.

### 3. Trend Chart

The trend chart shows whether eCPM is stable, improving, or dropping.

A single daily number is not enough. I want to know whether yesterday was a one-day spike or part of a trend.

### 4. Alerts

The alert system checks for simple but useful problems:

- eCPM dropped more than 25%
- revenue dropped more than 30%
- fill rate dropped more than 20%
- API sync failed

These alerts are not "AI optimization" yet. They are just practical rules that save me from checking every row manually.

## Results

In early testing with sample and partner-like structures, I found 15-20% eCPM gaps between networks in the same country and ad format.

That does not mean every developer can increase revenue by 20% immediately. It means the gap often exists, but most small teams do not have a clean way to see it every day.

For a small mini-game, even a 10% improvement can be meaningful.

If a game makes $100/day from ads, 10% is $10/day. That is $300/month. For a solo developer, that can pay for tools, servers, or part of user acquisition experiments.

The bigger the traffic, the more important this becomes.

## What I Learned

The biggest lesson is that aggregation is often more valuable than prediction.

Before building a complex optimization algorithm, I needed a reliable way to answer:

- What happened?
- Where did it happen?
- Which source performed better?
- Is the difference large enough to care about?

The fetch-normalize-compare-recommend pattern gave me that.

```text
fetch      -> get data from TopOn or other APIs
normalize  -> convert different report formats into one schema
compare    -> rank networks by country, format, and placement
recommend  -> show the best current option
```

This pattern applies to many domains:

- SMS providers
- payment gateways
- cloud GPU pricing
- shipping providers
- affiliate networks
- ad monetization platforms

If multiple vendors provide the same kind of service, and performance differs by region or use case, a comparison dashboard can create value.

## What I Would Improve Next

The current version is still early. The next steps are:

- Add more data sources beyond TopOn
- Support scheduled sync
- Add Slack/Telegram/email alerts
- Add A/B test tracking
- Add confidence scoring based on sample size
- Build a public demo mode for developers who do not want to connect real data yet

I also want to test this with more real developers. My own test account is useful for API validation, but the product only becomes valuable when it sees real monetization data from real apps.

## Closing

This project started as a small internal tool, but I think the pattern is useful for many mobile game and app developers.

If you are running ads in a mini-game or mobile app, I would love to hear how you currently monitor eCPM and fill rate.

Do you check dashboards manually? Do you rely on mediation recommendations? Do you have your own scripts?

I am open to feedback, especially from developers who deal with ad monetization every day.

If you are interested in testing it, feel free to leave a comment or message me.

If there is interest, I will share more details about the TopOn API integration and the alert logic in a follow-up post.
