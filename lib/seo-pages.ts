export type SeoGuide = {
  slug: string;
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  eyebrow: string;
  intro: string;
  sections?: {
    title: string;
    text: string;
  }[];
  checksTitle: string;
  checks: string[];
  diagnosisTitle: string;
  diagnosis: string;
  nextAction: string;
  related: string[];
};

export const seoGuides: SeoGuide[] = [
  {
    slug: "why-did-my-admob-revenue-drop",
    title: "Why did my AdMob revenue drop?",
    description:
      "A practical checklist for diagnosing AdMob revenue drops by separating impressions, eCPM, match rate, country mix, placements, and ad sources.",
    metaTitle: "Why did my AdMob revenue drop?",
    metaDescription:
      "Diagnose AdMob revenue drops by checking impressions, match rate, fill rate, country mix, placements, ad sources, and eCPM in the right order.",
    eyebrow: "AdMob revenue drop",
    intro:
      "A revenue drop is only the final symptom. Before changing floors, SDKs, or mediation settings, split the drop into traffic, fill, pricing, and mix changes.",
    checksTitle: "Check in this order",
    checks: [
      "Did impressions or requests drop first?",
      "Did match rate, fill rate, or show rate move?",
      "Did traffic shift by country or device?",
      "Did one ad unit, placement, or format change?",
      "Did one ad source or mediation source stop filling?",
      "Did time-of-day behavior, holidays, or live events reduce peak-hour impressions?",
      "Did eCPM fall after the upstream metrics stayed stable?"
    ],
    diagnosisTitle: "Common interpretation",
    diagnosis:
      "If impressions and fill are stable but eCPM dropped, the issue may be demand or auction pricing. If fill or impressions moved first, the revenue drop is probably not an eCPM problem.",
    nextAction: "Use anonymized before/after rows to identify which metric moved first.",
    related: ["admob-match-rate-dropped", "country-mix-blended-ecpm", "admob-revenue-drop-live-events"]
  },
  {
    slug: "admob-match-rate-dropped",
    title: "AdMob match rate dropped: what should you check?",
    description:
      "Diagnose an AdMob match rate drop by checking account status, ad serving limits, consent, country mix, ad format, placement, and request quality.",
    metaTitle: "AdMob match rate dropped: what to check",
    metaDescription:
      "Check AdMob match rate drops across ad serving limits, consent, country mix, ad format, placement, request quality, and mediation changes.",
    eyebrow: "Match rate diagnosis",
    intro:
      "A match rate drop usually means requests are still happening, but fewer requests are turning into matched ads. That can crush revenue even when eCPM looks normal.",
    checksTitle: "First checks",
    checks: [
      "Look for policy center messages or ad serving limits.",
      "Compare match rate by country, format, and ad unit.",
      "Check consent / CMP changes for EEA, UK, and Switzerland traffic.",
      "Review recent SDK, mediation, app release, or app-ads.txt changes.",
      "Check whether requests increased from low-quality or unexpected traffic.",
      "Avoid changing multiple mediation settings at once while diagnosing."
    ],
    diagnosisTitle: "Common interpretation",
    diagnosis:
      "If requests stay high but match rate collapses across many segments, treat it as a serving, policy, consent, or traffic-quality issue before blaming eCPM.",
    nextAction: "Create a simple timeline of app releases, traffic changes, consent changes, and account notices.",
    related: ["why-did-my-admob-revenue-drop", "rewarded-ads-fill-rate-dropped", "mobile-game-ad-revenue-diagnosis-checklist"]
  },
  {
    slug: "admob-ecpm-dropped-impressions-stable",
    title: "AdMob eCPM dropped but impressions are stable",
    description:
      "What to check when AdMob eCPM drops while impressions remain stable, including country mix, format mix, placement, advertiser demand, and seasonality.",
    metaTitle: "AdMob eCPM dropped but impressions stayed stable",
    metaDescription:
      "Diagnose AdMob eCPM drops when impressions are stable by separating country mix, ad format, placement exposure, seasonality, and demand changes.",
    eyebrow: "Stable impressions, lower eCPM",
    intro:
      "When impressions are stable but eCPM drops, the problem may be pricing, demand, traffic mix, or format mix. The goal is to avoid treating blended eCPM as one clean signal.",
    checksTitle: "Useful splits",
    checks: [
      "Split eCPM by country before judging the blended average.",
      "Compare rewarded, interstitial, banner, native, and MREC separately.",
      "Check whether one placement now gets different user attention.",
      "Compare weekdays, weekends, holidays, and major live-event windows.",
      "Check ad source contribution if you use mediation.",
      "Compare the same country and format across before/after periods."
    ],
    diagnosisTitle: "Common interpretation",
    diagnosis:
      "If every country and format dropped at the same time, demand may have moved. If only one country or format changed, the blended eCPM is hiding the real driver.",
    nextAction: "Diagnose country mix and format mix before making SDK or floor changes.",
    related: ["why-did-my-admob-revenue-drop", "country-mix-blended-ecpm", "admob-revenue-drop-live-events"]
  },
  {
    slug: "admob-revenue-drop-live-events",
    title: "Why AdMob revenue can drop during live events even when eCPM is normal",
    description:
      "Learn why sports events, holidays, exams, work schedules, and time-of-day behavior can reduce AdMob impressions during peak hours even when eCPM and match rate look stable.",
    metaTitle: "AdMob revenue drops during live events",
    metaDescription:
      "Diagnose AdMob revenue drops caused by peak-hour traffic changes, live events, holidays, or time-of-day behavior before changing eCPM floors or mediation.",
    eyebrow: "Time-of-day diagnosis",
    intro:
      "A revenue drop can look like a monetization problem at first. But if impressions fall during the app's normal peak hours while eCPM and match rate stay stable, the issue may be user behavior, not ad demand.",
    sections: [
      {
        title: "Why daily revenue can be misleading",
        text:
          "Daily totals hide when the movement happened. A short drop during the app's strongest monetization window can reduce revenue even if the rest of the day looks normal."
      },
      {
        title: "Check hourly impressions before changing mediation",
        text:
          "Before changing floors, SDKs, or ad source settings, compare hourly impressions and impressions per user. If the drop is concentrated in a peak window, the ad stack may not be the first suspect."
      },
      {
        title: "Compare event days vs normal days",
        text:
          "Sports matches, holidays, exams, work schedules, local events, and seasonal behavior can shift audience attention. Compare event days with nearby normal days, not only this week against last week."
      },
      {
        title: "Separate impressions per user from total impressions",
        text:
          "Total impressions can fall because fewer users visited, or because active users saw fewer ad moments. Impressions per user helps separate traffic volume from session behavior."
      },
      {
        title: "When it is probably not an eCPM problem",
        text:
          "If eCPM, match rate, and fill rate stay mostly stable while peak-hour impressions drop, the most likely driver is audience behavior rather than demand collapse."
      },
      {
        title: "Try a browser-only CSV diagnosis",
        text:
          "Use anonymized rows to compare affected hours, normal hours, country mix, placement, ad source, and weighted eCPM before deciding what to change."
      }
    ],
    checksTitle: "Practical checklist",
    checks: [
      "Compare normal peak hours vs affected hours.",
      "Compare event days vs non-event days.",
      "Check impressions per user.",
      "Check match rate / fill rate.",
      "Check eCPM by country and placement.",
      "Only then decide whether demand or mediation changed."
    ],
    diagnosisTitle: "Common interpretation",
    diagnosis:
      "If revenue dropped during peak hours but eCPM and match rate stayed stable, the first explanation to test is audience timing. Daily averages can make a behavior shift look like an ad demand problem.",
    nextAction:
      "If your revenue dropped but you are not sure whether the driver is eCPM, fill rate, traffic, country mix, ad source, or time-of-day behavior, try the browser-only demo or send anonymized rows for a free diagnosis.",
    related: ["why-did-my-admob-revenue-drop", "country-mix-blended-ecpm", "mobile-game-ad-revenue-diagnosis-checklist"]
  },
  {
    slug: "country-mix-blended-ecpm",
    title: "Why country mix can make blended eCPM look worse",
    description:
      "Understand how blended eCPM can drop when impressions shift toward lower-eCPM countries, even if top-country eCPM and ad demand remain stable.",
    metaTitle: "Country mix and blended eCPM drops",
    metaDescription:
      "See how traffic shifts toward lower-eCPM countries can pull down blended eCPM, and what to check before changing mediation or ad source settings.",
    eyebrow: "Country mix diagnosis",
    intro:
      "Blended eCPM can drop even when your top-country eCPM is stable. If more impressions shift toward lower-eCPM countries, the average can look worse without a global demand collapse.",
    sections: [
      {
        title: "What blended eCPM hides",
        text:
          "Blended eCPM compresses every country, placement, format, and ad source into one average. That makes it useful as a headline metric but risky as a diagnosis."
      },
      {
        title: "Why country mix matters",
        text:
          "A larger share of impressions from lower-eCPM countries can pull the average down even if Tier 1 eCPM is unchanged. The revenue problem may be traffic mix, not demand."
      },
      {
        title: "Compare country-level eCPM before changing global settings",
        text:
          "Changing global floors or mediation rules before splitting by country can make the wrong segment worse. First compare eCPM, impressions, and revenue contribution by GEO."
      },
      {
        title: "Separate Tier 1 trends from blended trends",
        text:
          "If US, UK, CA, or other top GEOs are stable but blended eCPM is lower, inspect whether lower-value GEOs gained impression share."
      },
      {
        title: "What to check before changing mediation",
        text:
          "Review UA campaigns, organic traffic sources, placement exposure by region, and ad source contribution. A source issue and a country-mix issue can look similar in the blended average."
      }
    ],
    checksTitle: "Practical checklist",
    checks: [
      "Compare impressions share by country.",
      "Compare revenue contribution by country.",
      "Check top GEOs separately.",
      "Compare placement exposure by region.",
      "Review UA campaigns and organic traffic sources.",
      "Do not change global mediation settings before separating country mix from source performance."
    ],
    diagnosisTitle: "Common interpretation",
    diagnosis:
      "If country-level eCPM is stable but lower-eCPM GEOs gained share, the blended eCPM drop is probably a mix issue. If the same country and placement dropped across multiple sources, then demand or source pricing becomes more likely.",
    nextAction: "Use the demo or templates to compare country-level eCPM, impression share, and revenue contribution before changing global settings.",
    related: ["admob-ecpm-dropped-impressions-stable", "why-did-my-admob-revenue-drop", "mobile-game-ad-revenue-diagnosis-checklist"]
  },
  {
    slug: "rewarded-ads-fill-rate-dropped",
    title: "Rewarded ads fill rate dropped",
    description:
      "A practical diagnosis flow for rewarded ad fill-rate drops across requests, fills, show rate, placement exposure, mediation, countries, and ad sources.",
    metaTitle: "Rewarded ads fill rate dropped",
    metaDescription:
      "Diagnose rewarded ad fill-rate drops by comparing requests, fills, show rate, placement exposure, country mix, mediation, and ad source performance.",
    eyebrow: "Rewarded ads",
    intro:
      "Rewarded ads often drive a large share of mobile game ad revenue. When fill rate drops, revenue can fall even if player activity and eCPM do not look terrible.",
    checksTitle: "What to inspect",
    checks: [
      "Compare rewarded requests, fills, impressions, and show rate.",
      "Split by country because rewarded demand can differ sharply by GEO.",
      "Check whether placement exposure or reward flow changed.",
      "Review mediation source availability and waterfall / bidding status.",
      "Check timeout, load timing, and whether ads are ready when players ask.",
      "Compare app versions if a release changed the rewarded flow."
    ],
    diagnosisTitle: "Common interpretation",
    diagnosis:
      "If requests are stable but fills drop, start with mediation, source availability, country mix, consent, and platform status. If fills are stable but impressions drop, inspect show rate and placement logic.",
    nextAction: "Separate fill-rate problems from show-rate problems before changing reward placement.",
    related: ["admob-match-rate-dropped", "why-did-my-admob-revenue-drop", "mobile-game-ad-revenue-diagnosis-checklist"]
  },
  {
    slug: "admob-impressions-dropped-ecpm-normal",
    title: "AdMob impressions dropped but eCPM stayed normal",
    description:
      "What to check when AdMob impressions fall while eCPM remains normal, including DAU, sessions, ad requests, placement exposure, show rate, and timing.",
    metaTitle: "AdMob impressions dropped but eCPM stayed normal",
    metaDescription:
      "Diagnose AdMob impression drops with stable eCPM by checking DAU, sessions, requests, placement exposure, show rate, country, and time-of-day patterns.",
    eyebrow: "Impression diagnosis",
    intro:
      "Stable eCPM does not protect revenue if fewer ads are shown. When impressions fall, start with traffic and ad exposure before changing floors, bidders, or mediation settings.",
    sections: [
      {
        title: "Separate fewer users from fewer ad opportunities",
        text:
          "Impressions can fall because DAU or sessions fell, or because active users reached fewer eligible ad moments. Compare impressions per DAU or per session when the data is available."
      },
      {
        title: "Check requests, fills, and show rate in order",
        text:
          "A request drop points to trigger logic or user activity. Stable requests with fewer impressions can point to fill, readiness, visibility, or show-rate behavior instead."
      },
      {
        title: "Find whether the drop is concentrated",
        text:
          "Split impressions by country, placement, ad unit, format, app version, and hour. One affected rewarded placement should not be diagnosed as a global eCPM issue."
      }
    ],
    checksTitle: "First checks",
    checks: [
      "Compare DAU, sessions, and impressions per DAU or session.",
      "Compare ad requests, fills, show rate, and impressions for the same placement.",
      "Check recent product releases, frequency rules, and ad trigger logic.",
      "Split the drop by country, placement, ad unit, format, and app version.",
      "Compare normal peak hours with the affected hours.",
      "Review eCPM only after exposure and serving signals are separated."
    ],
    diagnosisTitle: "Common interpretation",
    diagnosis:
      "If eCPM is stable while impressions drop, the most likely driver is lower traffic or ad exposure. A pricing change becomes more likely only after requests, fills, and placement exposure are stable.",
    nextAction: "Use two comparable periods to find the first upstream signal that changed before changing monetization settings.",
    related: ["why-did-my-admob-revenue-drop", "admob-revenue-drop-live-events", "mobile-game-ad-revenue-diagnosis-checklist"]
  },
  {
    slug: "fill-rate-dropped-after-mediation-update",
    title: "Fill rate dropped after a mediation update",
    description:
      "A diagnosis checklist for fill-rate drops after a mediation update, covering requests, fills, match rate, source availability, SDK releases, floors, and rollout scope.",
    metaTitle: "Fill rate dropped after a mediation update",
    metaDescription:
      "Check a post-update fill-rate drop by comparing requests, fills, match rate, source availability, rollout scope, SDK changes, and price floors before changing more settings.",
    eyebrow: "Mediation update diagnosis",
    intro:
      "A fill-rate drop after a mediation change is a timing signal, not proof that the update caused it. Compare the same segments before and after the rollout, then inspect what changed in serving behavior.",
    sections: [
      {
        title: "Confirm the rollout boundary",
        text:
          "Record the app version, SDK version, mediation configuration, and rollout time. A change that began before the rollout needs a different explanation."
      },
      {
        title: "Keep match rate and fill rate separate",
        text:
          "Match rate and fill rate use platform-specific definitions. Compare requests, matched requests when available, fills, and impressions without assuming that one rate proves the behavior of the other."
      },
      {
        title: "Check the source and segment level",
        text:
          "A global average can hide a source, country, format, or ad-unit failure. Look for the smallest segment that changed immediately after the update."
      }
    ],
    checksTitle: "Post-update checks",
    checks: [
      "Compare the same country, placement, and ad source before and after the rollout.",
      "Check requests, matched requests when available, fills, impressions, and show rate separately.",
      "Verify SDK and adapter versions, initialization, consent, and error logging.",
      "Review source availability, bidding or waterfall configuration, and timeout behavior.",
      "Check price-floor and instance changes made near the update.",
      "Avoid changing multiple configuration items until the affected segment is confirmed."
    ],
    diagnosisTitle: "Common interpretation",
    diagnosis:
      "If requests are stable but fills fall in the newly released segments, the update, a source configuration, or a serving condition deserves investigation. If the movement is broad across unchanged versions too, demand or traffic may be the stronger explanation.",
    nextAction: "Build a narrow before/after comparison for the affected version and keep a rollback or controlled test path available.",
    related: ["rewarded-ads-fill-rate-dropped", "one-ad-source-stopped-filling", "admob-match-rate-dropped"]
  },
  {
    slug: "one-ad-source-stopped-filling",
    title: "One ad source stopped filling: what should you check?",
    description:
      "How to diagnose an ad source that stopped filling without confusing a low source-level rate with app-level fill, bidding competition, or revenue contribution.",
    metaTitle: "One ad source stopped filling: what to check",
    metaDescription:
      "Diagnose a source that stopped filling by separating app-level serving from source-level bids, fills, wins, impressions, revenue share, configuration, and demand availability.",
    eyebrow: "Ad source diagnosis",
    intro:
      "A weak source-level fill or match rate does not automatically mean the whole app cannot serve ads. In bidding and waterfall setups, another source may win, fill, or take most of the eligible volume.",
    sections: [
      {
        title: "Start at the app and ad-unit level",
        text:
          "Check whether app-level requests, fills, impressions, show rate, and revenue actually changed. A source-level decline matters most when it changes total serving or revenue contribution."
      },
      {
        title: "Read source metrics in context",
        text:
          "Compare bids, eligible responses, fills, wins, impressions, revenue share, and eCPM where the platform exposes them. Low source-level volume can be normal when other sources win."
      },
      {
        title: "Verify serving conditions",
        text:
          "Check source status, SDK or adapter initialization, consent, placement mapping, floors, geo availability, and recent changes to the mediation configuration."
      }
    ],
    checksTitle: "Source-level checks",
    checks: [
      "Confirm whether app-level fill, impressions, or revenue also declined.",
      "Compare the source by country, placement, ad unit, format, and app version.",
      "Review bids, fills, wins, impressions, revenue share, and eCPM where available.",
      "Check source status, adapter versions, initialization, consent, and placement mapping.",
      "Review floor rules and mediation changes near the movement.",
      "Do not remove a source only because one platform-specific rate is low."
    ],
    diagnosisTitle: "Common interpretation",
    diagnosis:
      "If app-level serving remains healthy while one bidder loses volume, auction competition or source demand may have shifted. If total fill and revenue fall with that source, its configuration or availability becomes more important to investigate.",
    nextAction: "Document total serving and source contribution before making a source removal, floor, or mediation change.",
    related: ["fill-rate-dropped-after-mediation-update", "admob-match-rate-dropped", "rewarded-ads-fill-rate-dropped"]
  },
  {
    slug: "revenue-dropped-after-changing-price-floors",
    title: "Revenue dropped after changing price floors",
    description:
      "What to check when mobile ad revenue falls after changing price floors, including requests, fills, impressions, eCPM, country mix, source behavior, and rollout scope.",
    metaTitle: "Revenue dropped after changing price floors",
    metaDescription:
      "Diagnose a revenue drop after changing price floors by checking request volume, fills, impressions, weighted eCPM, country mix, source behavior, and the rollout before changing floors again.",
    eyebrow: "Price-floor diagnosis",
    intro:
      "A higher floor can raise the price of some winning impressions while reducing eligible demand or total fills. Diagnose total revenue per request and per impression before deciding whether a floor change helped.",
    sections: [
      {
        title: "Do not judge only by eCPM",
        text:
          "An eCPM lift can still produce less total revenue if requests, fills, or impressions fall more sharply. Compare revenue, weighted eCPM, fills, and impressions together."
      },
      {
        title: "Check the affected rollout segments",
        text:
          "Compare countries, ad units, formats, and sources that received the floor change against unchanged or comparable segments. Broad averages hide where the trade-off occurred."
      },
      {
        title: "Use comparable windows",
        text:
          "A single day can be distorted by weekday patterns, seasonality, demand budgets, or traffic mix. Use matching periods and record the exact floor and rollout time."
      }
    ],
    checksTitle: "Floor-change checks",
    checks: [
      "Record the previous floor, new floor, rollout time, and affected segments.",
      "Compare requests, fills, impressions, weighted eCPM, and revenue per 1,000 requests before and after.",
      "Split results by country, format, placement or ad unit, and ad source.",
      "Check whether the eCPM lift was offset by lower fills or impressions.",
      "Compare changed segments with a controlled or unchanged segment where possible.",
      "Avoid repeatedly moving floors before the trade-off is visible in the report."
    ],
    diagnosisTitle: "Common interpretation",
    diagnosis:
      "If weighted eCPM rose but total revenue fell, the floor may have reduced the volume of eligible or filled opportunities. If both eCPM and fill fell, source demand, traffic mix, or a broader configuration change may need separate investigation.",
    nextAction: "Use a matching before/after CSV to decide whether the floor changed pricing, fill, traffic composition, or several signals at once.",
    related: ["admob-ecpm-dropped-impressions-stable", "fill-rate-dropped-after-mediation-update", "why-did-my-admob-revenue-drop"]
  },
  {
    slug: "mobile-game-ad-revenue-diagnosis-checklist",
    title: "Mobile game ad revenue diagnosis checklist",
    description:
      "A concise checklist for diagnosing mobile game ad revenue drops across impressions, eCPM, fill rate, country mix, placement, ad source, timing, and releases.",
    metaTitle: "Mobile game ad revenue diagnosis checklist",
    metaDescription:
      "Use a practical checklist to diagnose mobile game ad revenue drops across impressions, eCPM, fill rate, country mix, placements, ad sources, and timing.",
    eyebrow: "Diagnosis checklist",
    intro:
      "Small teams do not need another wall of metrics first. They need to know what changed first, which segment changed most, and what to inspect before making risky monetization changes.",
    checksTitle: "Checklist",
    checks: [
      "Check impressions and requests before revenue.",
      "Compare match rate, fill rate, and show rate.",
      "Split by country / GEO before trusting blended eCPM.",
      "Split by format, ad unit, and placement.",
      "Check ad source or mediation source contribution.",
      "Compare time of day, holidays, live events, and seasonality.",
      "Add recent releases, SDK changes, floor changes, consent changes, and campaigns to the timeline."
    ],
    diagnosisTitle: "Output format",
    diagnosis:
      "A useful diagnosis should say: revenue changed by X, the most likely driver is Y, the affected segment is Z, and the first check should be A. That is easier to act on than a dashboard screenshot.",
    nextAction: "Start with a before/after CSV and turn it into one diagnosis card.",
    related: ["why-did-my-admob-revenue-drop", "admob-match-rate-dropped", "admob-ecpm-dropped-impressions-stable"]
  }
];

export function getSeoGuide(slug: string) {
  return seoGuides.find((guide) => guide.slug === slug);
}
