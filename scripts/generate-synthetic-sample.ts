import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type Segment = {
  country: string;
  format: string;
  placement: string;
  source: string;
  baseEcpm: number;
  baselineImpressions: number;
  comparisonImpressions: number;
};

const segments: Segment[] = [
  { country: "US", format: "Rewarded", placement: "Sample Rewarded Placement", source: "AdMob", baseEcpm: 6.3, baselineImpressions: 180_000, comparisonImpressions: 90_000 },
  { country: "US", format: "Rewarded", placement: "Sample Rewarded Placement", source: "AppLovin", baseEcpm: 5.8, baselineImpressions: 100_000, comparisonImpressions: 45_000 },
  { country: "US", format: "Interstitial", placement: "Sample Interstitial Placement", source: "AdMob", baseEcpm: 3.5, baselineImpressions: 50_000, comparisonImpressions: 25_000 },
  { country: "US", format: "Banner", placement: "Sample Banner Placement", source: "Unity Ads", baseEcpm: 1.0, baselineImpressions: 14_400, comparisonImpressions: 8_000 },
  { country: "BR", format: "Rewarded", placement: "Sample Rewarded Placement", source: "AppLovin", baseEcpm: 3.6, baselineImpressions: 40_000, comparisonImpressions: 45_000 },
  { country: "BR", format: "Interstitial", placement: "Sample Interstitial Placement", source: "AppLovin", baseEcpm: 2.3, baselineImpressions: 80_000, comparisonImpressions: 28_000 },
  { country: "BR", format: "Interstitial", placement: "Sample Interstitial Placement", source: "AdMob", baseEcpm: 1.9, baselineImpressions: 55_000, comparisonImpressions: 72_000 },
  { country: "BR", format: "Banner", placement: "Sample Banner Placement", source: "Unity Ads", baseEcpm: 0.6, baselineImpressions: 30_000, comparisonImpressions: 35_000 },
  { country: "IN", format: "Rewarded", placement: "Sample Rewarded Placement", source: "Unity Ads", baseEcpm: 2.2, baselineImpressions: 20_000, comparisonImpressions: 25_000 },
  { country: "IN", format: "Interstitial", placement: "Sample Interstitial Placement", source: "AppLovin", baseEcpm: 1.4, baselineImpressions: 55_000, comparisonImpressions: 25_000 },
  { country: "IN", format: "Interstitial", placement: "Sample Interstitial Placement", source: "AdMob", baseEcpm: 1.1, baselineImpressions: 49_000, comparisonImpressions: 68_000 },
  { country: "IN", format: "Banner", placement: "Sample Banner Placement", source: "Unity Ads", baseEcpm: 0.35, baselineImpressions: 40_000, comparisonImpressions: 50_000 },
  { country: "DE", format: "Rewarded", placement: "Sample Rewarded Placement", source: "AdMob", baseEcpm: 5.0, baselineImpressions: 20_000, comparisonImpressions: 15_000 },
  { country: "DE", format: "Interstitial", placement: "Sample Interstitial Placement", source: "AppLovin", baseEcpm: 4.0, baselineImpressions: 25_000, comparisonImpressions: 7_000 },
  { country: "DE", format: "Interstitial", placement: "Sample Interstitial Placement", source: "AdMob", baseEcpm: 3.4, baselineImpressions: 41_600, comparisonImpressions: 43_000 },
  { country: "DE", format: "Banner", placement: "Sample Banner Placement", source: "Unity Ads", baseEcpm: 0.8, baselineImpressions: 20_000, comparisonImpressions: 19_000 }
];

const header = [
  "date",
  "appName",
  "placementName",
  "adUnit",
  "adFormat",
  "country",
  "network",
  "mediation",
  "revenue",
  "ecpm",
  "impressions",
  "requests",
  "matchedRequests",
  "fills",
  "matchRate",
  "fillRate",
  "clicks"
];

function allocate(total: number, weights: number[]) {
  const weightTotal = weights.reduce((sum, weight) => sum + weight, 0);
  const raw = weights.map((weight) => (total * weight) / weightTotal);
  const values = raw.map(Math.floor);
  let remainder = total - values.reduce((sum, value) => sum + value, 0);
  const order = raw.map((value, index) => ({ index, fraction: value - Math.floor(value) })).sort((a, b) => b.fraction - a.fraction);
  for (let index = 0; index < remainder; index += 1) values[order[index].index] += 1;
  return values;
}

function splitAcrossDays(total: number) {
  return allocate(total, [1, 1, 1, 1, 1, 1, 1]);
}

function makePeriod(options: {
  dates: string[];
  impressionKey: "baselineImpressions" | "comparisonImpressions";
  requests: number;
  matchedRequests: number;
  targetRevenue: number;
}) {
  const impressions = segments.map((segment) => segment[options.impressionKey]);
  const requestTotals = allocate(options.requests, impressions);
  const matchedTotals = allocate(options.matchedRequests, impressions);
  const rawRevenue = segments.reduce((sum, segment) => sum + segment[options.impressionKey] * segment.baseEcpm / 1000, 0);
  const ecpmScale = options.targetRevenue / rawRevenue;

  return segments.flatMap((segment, segmentIndex) => {
    const dailyImpressions = splitAcrossDays(segment[options.impressionKey]);
    const dailyRequests = splitAcrossDays(requestTotals[segmentIndex]);
    const dailyMatched = splitAcrossDays(matchedTotals[segmentIndex]);
    const ecpm = segment.baseEcpm * ecpmScale;

    return options.dates.map((date, dayIndex) => {
      const rowImpressions = dailyImpressions[dayIndex];
      const requests = dailyRequests[dayIndex];
      const matchedRequests = dailyMatched[dayIndex];
      const revenue = rowImpressions * ecpm / 1000;
      return [
        date,
        "Sample Puzzle Game",
        segment.placement,
        `sample-${segment.format.toLowerCase()}-${segment.country.toLowerCase()}-${segment.source.toLowerCase().replace(/\s+/g, "-")}`,
        segment.format,
        segment.country,
        segment.source,
        "Sample Mediation",
        revenue.toFixed(6),
        ecpm.toFixed(6),
        rowImpressions,
        requests,
        matchedRequests,
        matchedRequests,
        requests ? ((matchedRequests / requests) * 100).toFixed(6) : "0",
        requests ? ((matchedRequests / requests) * 100).toFixed(6) : "0",
        Math.round(rowImpressions * 0.015)
      ].join(",");
    });
  });
}

const baselineDates = Array.from({ length: 7 }, (_, index) => `2026-06-${String(index + 1).padStart(2, "0")}`);
const comparisonDates = Array.from({ length: 7 }, (_, index) => `2026-06-${String(index + 8).padStart(2, "0")}`);
const baseline = makePeriod({
  dates: baselineDates,
  impressionKey: "baselineImpressions",
  requests: 1_250_000,
  matchedRequests: 1_050_000,
  targetRevenue: 2_870
});
const comparison = makePeriod({
  dates: comparisonDates,
  impressionKey: "comparisonImpressions",
  requests: 1_080_000,
  matchedRequests: 907_200,
  targetRevenue: 1_965
});

const outputDirectory = join(process.cwd(), "public", "demo-data");
mkdirSync(outputDirectory, { recursive: true });
writeFileSync(join(outputDirectory, "ecpm-baseline.csv"), [header.join(","), ...baseline].join("\n") + "\n");
writeFileSync(join(outputDirectory, "ecpm-comparison.csv"), [header.join(","), ...comparison].join("\n") + "\n");
