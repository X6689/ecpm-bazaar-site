export type SeoGuide = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
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
      "Did eCPM fall after the upstream metrics stayed stable?"
    ],
    diagnosisTitle: "Common interpretation",
    diagnosis:
      "If impressions and fill are stable but eCPM dropped, the issue may be demand or auction pricing. If fill or impressions moved first, the revenue drop is probably not an eCPM problem.",
    nextAction: "Use anonymized before/after rows to identify which metric moved first.",
    related: ["admob-match-rate-dropped", "admob-ecpm-dropped-impressions-stable", "mobile-game-ad-revenue-diagnosis-checklist"]
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
    related: ["why-did-my-admob-revenue-drop", "mobile-game-ad-revenue-diagnosis-checklist", "rewarded-ads-fill-rate-dropped"]
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
