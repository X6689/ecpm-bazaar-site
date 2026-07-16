export type MonetizationTerm = {
  id: string;
  canonicalTerm: string;
  displayLabel: string;
  shortDefinition: string;
  formula?: string;
  acceptedAliases: string[];
  caveat?: string;
  relatedTerms: string[];
};

export const monetizationTerms: MonetizationTerm[] = [
  {
    id: "ad-revenue",
    canonicalTerm: "ad revenue",
    displayLabel: "Ad revenue",
    shortDefinition: "Estimated advertising earnings reported for the selected period.",
    acceptedAliases: ["revenue", "estimated revenue", "estimated earnings", "earnings", "income", "ad revenue"],
    caveat: "Reported revenue may differ from finalized payments.",
    relatedTerms: ["ecpm", "weighted-ecpm", "revenue-drop"]
  },
  {
    id: "impressions",
    canonicalTerm: "impressions",
    displayLabel: "Impressions",
    shortDefinition: "The number of times ads were displayed or counted as impressions by the reporting platform.",
    acceptedAliases: ["impressions", "impression", "ad impressions", "shows"],
    relatedTerms: ["ad-requests", "impressions-per-dau", "ecpm"]
  },
  {
    id: "ad-requests",
    canonicalTerm: "ad requests",
    displayLabel: "Ad requests",
    shortDefinition: "The number of attempts or opportunities sent to an ad platform or mediation layer.",
    acceptedAliases: ["requests", "request", "ad requests", "attempts"],
    relatedTerms: ["matched-requests", "fills", "match-rate", "fill-rate"]
  },
  {
    id: "matched-requests",
    canonicalTerm: "matched requests",
    displayLabel: "Matched requests",
    shortDefinition: "Requests for which an ad source returned an eligible ad response, subject to platform definitions.",
    acceptedAliases: ["matched requests", "matched request", "matched_requests", "matchedRequests", "matches"],
    caveat: "Platforms can define the eligible response differently.",
    relatedTerms: ["ad-requests", "match-rate"]
  },
  {
    id: "fills",
    canonicalTerm: "fills",
    displayLabel: "Fills",
    shortDefinition: "Requests or opportunities that resulted in an available or served ad, depending on the reporting platform.",
    acceptedAliases: ["fills", "fill", "filled requests", "responses"],
    caveat: "Definitions vary across platforms.",
    relatedTerms: ["ad-requests", "fill-rate"]
  },
  {
    id: "match-rate",
    canonicalTerm: "match rate",
    displayLabel: "Match rate",
    shortDefinition: "Matched requests divided by ad requests, according to the platform's reporting definition.",
    formula: "matched requests / ad requests × 100",
    acceptedAliases: ["match rate", "matchRate", "matched rate", "matched request rate"],
    caveat: "Do not automatically treat match rate and fill rate as identical.",
    relatedTerms: ["matched-requests", "ad-requests", "fill-rate"]
  },
  {
    id: "fill-rate",
    canonicalTerm: "fill rate",
    displayLabel: "Fill rate",
    shortDefinition: "The percentage of ad requests or eligible opportunities that resulted in an available or served ad.",
    formula: "fills / ad requests × 100",
    acceptedAliases: ["fill rate", "fillRate", "fill_rate"],
    caveat: "Exact definitions vary across AdMob, AppLovin MAX, LevelPlay, TopOn, and custom reports.",
    relatedTerms: ["fills", "ad-requests", "match-rate"]
  },
  {
    id: "ecpm",
    canonicalTerm: "eCPM",
    displayLabel: "eCPM",
    shortDefinition: "Estimated revenue per 1,000 impressions.",
    formula: "revenue / impressions × 1,000",
    acceptedAliases: ["ecpm", "eCPM", "observed eCPM", "average eCPM"],
    relatedTerms: ["ad-revenue", "impressions", "weighted-ecpm", "blended-ecpm"]
  },
  {
    id: "weighted-ecpm",
    canonicalTerm: "weighted eCPM",
    displayLabel: "Weighted eCPM",
    shortDefinition: "Aggregate eCPM calculated from total revenue divided by total impressions, rather than averaging row-level eCPM values.",
    formula: "total revenue / total impressions × 1,000",
    acceptedAliases: ["weighted ecpm", "aggregate ecpm"],
    caveat: "Never use a simple average of row-level eCPM values for an aggregate result.",
    relatedTerms: ["ecpm", "blended-ecpm", "country-mix"]
  },
  {
    id: "blended-ecpm",
    canonicalTerm: "blended eCPM",
    displayLabel: "Blended eCPM",
    shortDefinition: "An aggregate eCPM across multiple countries, placements, formats, or ad sources.",
    acceptedAliases: ["blended ecpm", "overall ecpm", "total ecpm"],
    caveat: "It can change because traffic composition changed even when segment-level pricing stayed stable.",
    relatedTerms: ["weighted-ecpm", "country-mix", "traffic-mix"]
  },
  {
    id: "country-mix",
    canonicalTerm: "country mix",
    displayLabel: "Country mix",
    shortDefinition: "The share of impressions, users, or revenue contributed by each country or GEO.",
    acceptedAliases: ["country mix", "geo mix", "GEO mix", "regional mix"],
    relatedTerms: ["blended-ecpm", "traffic-mix", "impressions"]
  },
  {
    id: "traffic-mix",
    canonicalTerm: "traffic mix",
    displayLabel: "Traffic mix",
    shortDefinition: "The composition of traffic across countries, placements, formats, acquisition sources, devices, or time periods.",
    acceptedAliases: ["traffic mix", "audience mix"],
    relatedTerms: ["country-mix", "ad-format", "time-of-day-pattern"]
  },
  {
    id: "placement",
    canonicalTerm: "placement",
    displayLabel: "Placement",
    shortDefinition: "A specific ad location, monetization context, or named inventory position inside an app.",
    acceptedAliases: ["placement", "placement name"],
    caveat: "Placement, ad unit, and ad format are related but not always identical.",
    relatedTerms: ["ad-unit", "ad-format", "impressions"]
  },
  {
    id: "ad-unit",
    canonicalTerm: "ad unit",
    displayLabel: "Ad unit",
    shortDefinition: "A platform-defined ad inventory unit or identifier.",
    acceptedAliases: ["ad unit", "ad unit name", "adUnit", "unit name"],
    caveat: "An ad unit can represent a placement, but reports should preserve the source meaning where possible.",
    relatedTerms: ["placement", "ad-format"]
  },
  {
    id: "ad-format",
    canonicalTerm: "ad format",
    displayLabel: "Ad format",
    shortDefinition: "The format in which the ad is presented, such as rewarded, interstitial, banner, native, app open, or rewarded interstitial.",
    acceptedAliases: ["ad format", "format", "adFormat"],
    caveat: "Do not use format as proof that two placements or ad units are identical.",
    relatedTerms: ["placement", "ad-unit", "traffic-mix"]
  },
  {
    id: "ad-source",
    canonicalTerm: "ad source",
    displayLabel: "Ad source",
    shortDefinition: "A demand source, ad network, bidder, or reporting source that contributes ad responses and revenue.",
    acceptedAliases: ["ad source", "adSource", "network", "demand source"],
    caveat: "A reporting platform or mediation layer is not always the same thing as an ad source.",
    relatedTerms: ["mediation", "bidding", "waterfall"]
  },
  {
    id: "mediation",
    canonicalTerm: "mediation",
    displayLabel: "Mediation",
    shortDefinition: "A layer that manages and compares multiple ad sources through bidding, waterfall logic, or both.",
    acceptedAliases: ["mediation", "mediation platform", "mediation layer"],
    relatedTerms: ["ad-source", "bidding", "waterfall", "price-floor"]
  },
  {
    id: "bidding",
    canonicalTerm: "bidding",
    displayLabel: "Bidding",
    shortDefinition: "Real-time competition among eligible demand sources for an ad opportunity.",
    acceptedAliases: ["bidding", "in-app bidding", "auction"],
    relatedTerms: ["mediation", "ad-source", "waterfall"]
  },
  {
    id: "waterfall",
    canonicalTerm: "waterfall",
    displayLabel: "Waterfall",
    shortDefinition: "A prioritized sequence of ad sources or instances evaluated according to configured order or pricing.",
    acceptedAliases: ["waterfall", "mediation waterfall"],
    relatedTerms: ["mediation", "ad-source", "price-floor"]
  },
  {
    id: "price-floor",
    canonicalTerm: "price floor",
    displayLabel: "Price floor",
    shortDefinition: "A minimum pricing threshold used to accept, prioritize, or route demand, depending on the platform.",
    acceptedAliases: ["price floor", "floor", "ecpm floor", "minimum CPM"],
    caveat: "Increasing floors does not automatically increase total revenue.",
    relatedTerms: ["mediation", "waterfall", "ecpm"]
  },
  {
    id: "dau",
    canonicalTerm: "DAU",
    displayLabel: "DAU",
    shortDefinition: "Daily active users.",
    acceptedAliases: ["dau", "daily active users"],
    relatedTerms: ["impressions-per-dau", "ad-arpdau"]
  },
  {
    id: "impressions-per-dau",
    canonicalTerm: "impressions per DAU",
    displayLabel: "Impressions per DAU",
    shortDefinition: "Total ad impressions divided by daily active users.",
    formula: "impressions / DAU",
    acceptedAliases: ["impressions per dau", "impressions/dau", "imp dau"],
    caveat: "It helps separate lower user activity or ad exposure from pricing changes.",
    relatedTerms: ["impressions", "dau", "ad-arpdau"]
  },
  {
    id: "ad-arpdau",
    canonicalTerm: "ad ARPDAU",
    displayLabel: "Ad ARPDAU",
    shortDefinition: "Daily ad revenue divided by daily active users.",
    formula: "daily ad revenue / DAU",
    acceptedAliases: ["ad arpdau", "advertising arpdau"],
    caveat: "Distinguish ad ARPDAU from total revenue ARPDAU.",
    relatedTerms: ["ad-revenue", "dau", "impressions-per-dau"]
  },
  {
    id: "ctr",
    canonicalTerm: "CTR",
    displayLabel: "CTR",
    shortDefinition: "Clicks divided by impressions.",
    formula: "clicks / impressions × 100",
    acceptedAliases: ["ctr", "click through rate"],
    caveat: "Use it mainly as a sanity check, not as the primary revenue-drop signal.",
    relatedTerms: ["impressions", "ad-revenue"]
  },
  {
    id: "time-of-day-pattern",
    canonicalTerm: "time-of-day pattern",
    displayLabel: "Time-of-day pattern",
    shortDefinition: "Changes in impressions, users, or revenue across hourly or peak-period windows.",
    acceptedAliases: ["hourly pattern", "time of day", "peak hour"],
    relatedTerms: ["external-events", "impressions", "traffic-mix"]
  },
  {
    id: "external-events",
    canonicalTerm: "external events",
    displayLabel: "External events",
    shortDefinition: "Sports events, holidays, exams, work schedules, outages, seasonal behavior, or local events that can change audience activity.",
    acceptedAliases: ["live events", "seasonality", "holidays"],
    relatedTerms: ["time-of-day-pattern", "impressions"]
  },
  {
    id: "revenue-drop",
    canonicalTerm: "revenue drop",
    displayLabel: "Revenue drop",
    shortDefinition: "A decrease in reported ad revenue between matching comparison periods.",
    acceptedAliases: ["revenue decline", "earnings drop", "ad revenue drop"],
    relatedTerms: ["comparison-period", "most-likely-driver", "directional-diagnosis"]
  },
  {
    id: "comparison-period",
    canonicalTerm: "comparison period",
    displayLabel: "Comparison period",
    shortDefinition: "The current reporting window compared against an equivalent previous window, such as latest day versus previous day or latest 7 days versus previous 7 days.",
    acceptedAliases: ["comparison window", "date range"],
    relatedTerms: ["revenue-drop", "directional-diagnosis"]
  },
  {
    id: "most-likely-driver",
    canonicalTerm: "most likely driver",
    displayLabel: "Most likely driver",
    shortDefinition: "The change most strongly supported by the supplied report rows.",
    acceptedAliases: ["likely driver", "main driver"],
    caveat: "This is a directional interpretation, not final platform attribution.",
    relatedTerms: ["directional-diagnosis", "supporting-signals"]
  },
  {
    id: "supporting-signals",
    canonicalTerm: "supporting signals",
    displayLabel: "Supporting signals",
    shortDefinition: "The report changes that support a directional interpretation, such as stable impressions alongside lower weighted eCPM.",
    acceptedAliases: ["evidence", "supporting evidence"],
    relatedTerms: ["most-likely-driver", "directional-diagnosis"]
  },
  {
    id: "directional-diagnosis",
    canonicalTerm: "directional diagnosis",
    displayLabel: "Directional diagnosis",
    shortDefinition: "An evidence-based first investigation that identifies likely drivers and next checks, but does not replace platform-level debugging or a full monetization audit.",
    acceptedAliases: ["first investigation", "initial diagnosis"],
    relatedTerms: ["most-likely-driver", "comparison-period", "data-limitations"]
  },
  {
    id: "data-limitations",
    canonicalTerm: "data limitations",
    displayLabel: "Data limitations",
    shortDefinition: "Missing fields, short history, low volume, unmatched segments, or platform-definition differences that reduce diagnosis confidence.",
    acceptedAliases: ["data quality", "caveats"],
    relatedTerms: ["directional-diagnosis", "comparison-period"]
  }
];

export const monetizationTermsById = new Map(monetizationTerms.map((term) => [term.id, term]));

export function getMonetizationTerm(id: string) {
  return monetizationTermsById.get(id);
}

export const diagnosisOrder = [
  "impressions",
  "ad-requests",
  "matched-requests",
  "fills",
  "match-rate",
  "fill-rate",
  "country-mix",
  "placement",
  "ad-source",
  "time-of-day-pattern",
  "weighted-ecpm"
] as const;

export const acceptedAliasGroups = [
  { field: "date", aliases: ["date", "day", "report date", "report_date", "reportdate"] },
  { field: "appName", aliases: ["appName", "app name", "app_name", "app", "application", "application name"] },
  { field: "placementName", aliases: ["placementName", "placement name", "placement"] },
  { field: "adUnit", aliases: ["ad unit", "ad_unit", "ad unit name", "adUnit", "adUnitName", "unit name", "unit_name"] },
  { field: "adFormat", aliases: ["format", "ad format", "ad_format", "adFormat"] },
  { field: "country", aliases: ["country", "country code", "country_code", "geo", "region", "location"] },
  { field: "network", aliases: ["network", "adSource", "ad source", "ad_source", "adsource", "demand source", "demand_source"] },
  { field: "mediation", aliases: ["mediation", "mediation platform", "mediation layer"] },
  {
    field: "revenue",
    aliases: ["revenue", "estimated revenue", "estimated_revenue", "estimatedRevenue", "estimated earnings", "estimated_earnings", "earnings", "income", "ad revenue"]
  },
  { field: "ecpm", aliases: ["ecpm", "eCPM", "observed eCPM", "observed_ecpm", "observedEcpm", "avg eCPM", "average eCPM"] },
  { field: "impressions", aliases: ["impressions", "impression", "ad impressions", "ad_impressions", "adImpressions", "shows"] },
  { field: "requests", aliases: ["requests", "request", "ad requests", "ad_requests", "adRequests", "attempts"] },
  { field: "matchedRequests", aliases: ["matched requests", "matched_request", "matched_requests", "matchedRequests", "matches"] },
  { field: "fills", aliases: ["fills", "fill", "filled requests", "filled_requests", "responses"] },
  { field: "fillRate", aliases: ["fillRate", "fill rate", "fill_rate"] },
  { field: "matchRate", aliases: ["matchRate", "match rate", "match_rate", "matched rate", "matched request rate"] },
  { field: "clicks", aliases: ["clicks", "click", "ad clicks", "ad_clicks", "adClicks"] }
] as const;
