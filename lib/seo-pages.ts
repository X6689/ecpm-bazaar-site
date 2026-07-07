export type SeoGuide = {
  slug: string;
  title: string;
  description: string;
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
          "If eCPM, match rate, and fill rate stay mostly stable while peak-hour impressions drop, the likely driver is audience behavior rather than demand collapse."
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
    slug: "mobile-game-ad-revenue-diagnosis-checklist",
    title: "Mobile game ad revenue diagnosis checklist",
    description:
      "A concise checklist for diagnosing mobile game ad revenue drops across impressions, eCPM, fill rate, country mix, placement, ad source, timing, and releases.",
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
      "A useful diagnosis should say: revenue changed by X, the likely driver is Y, the affected segment is Z, and the first check should be A. That is easier to act on than a dashboard screenshot.",
    nextAction: "Start with a before/after CSV and turn it into one diagnosis card.",
    related: ["why-did-my-admob-revenue-drop", "admob-match-rate-dropped", "admob-ecpm-dropped-impressions-stable"]
  }
];

export function getSeoGuide(slug: string) {
  return seoGuides.find((guide) => guide.slug === slug);
}
