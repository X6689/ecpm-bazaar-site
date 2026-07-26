import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { buildDimensionMovements, chooseDriver, percentChange } from "../lib/diagnosis-analysis";
import { combineCsvReports, parseCsv } from "../lib/csv-parser";
import { aggregateDiagnosisRows } from "../lib/diagnosis-math";

const root = process.cwd();
const baselineCsv = readFileSync(join(root, "public/demo-data/ecpm-baseline.csv"), "utf8");
const comparisonCsv = readFileSync(join(root, "public/demo-data/ecpm-comparison.csv"), "utf8");
const parsed = parseCsv(combineCsvReports([baselineCsv, comparisonCsv]));
const baselineRows = parsed.rows.filter((row) => row.date >= "2026-06-01" && row.date <= "2026-06-07");
const comparisonRows = parsed.rows.filter((row) => row.date >= "2026-06-08" && row.date <= "2026-06-14");
const baseline = aggregateDiagnosisRows(baselineRows);
const comparison = aggregateDiagnosisRows(comparisonRows);

function closeTo(actual: number, expected: number, tolerance = 0.001) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} is not within ${tolerance} of ${expected}`);
}

test("synthetic reports use the production parser and cover fourteen dates", () => {
  assert.equal(parsed.rows.length, 224);
  assert.equal(new Set(parsed.rows.map((row) => row.date)).size, 14);
  assert.equal(parsed.fields.find((field) => field.field === "matchedRequests")?.matchedHeader, "matchedRequests");
  assert.equal(parsed.fields.find((field) => field.field === "adFormat")?.matchedHeader, "adFormat");
});

test("every synthetic row is internally consistent", () => {
  for (const row of parsed.rows) {
    closeTo(row.revenue, row.impressions * row.ecpm / 1000, 0.00002);
    closeTo(row.matchRate ?? 0, row.requests ? (row.matchedRequests ?? 0) / row.requests * 100 : 0, 0.00002);
  }
});

test("synthetic period totals and changes match the recording case", () => {
  closeTo(baseline.requests, 1_250_000);
  closeTo(baseline.matchedRequests, 1_050_000);
  closeTo(baseline.impressions, 820_000);
  closeTo(baseline.revenue, 2_870, 0.001);
  closeTo(baseline.ecpm, 3.5, 0.0001);
  closeTo(baseline.matchRate ?? 0, 84);
  closeTo(baseline.showRate ?? 0, 78.095238, 0.0001);

  closeTo(comparison.requests, 1_080_000);
  closeTo(comparison.matchedRequests, 907_200);
  closeTo(comparison.impressions, 600_000);
  closeTo(comparison.revenue, 1_965, 0.001);
  closeTo(comparison.ecpm, 3.275, 0.0001);
  closeTo(comparison.matchRate ?? 0, 84);
  closeTo(comparison.showRate ?? 0, 66.137566, 0.0001);

  closeTo(percentChange(comparison.revenue, baseline.revenue), -31.5331, 0.001);
  closeTo(percentChange(comparison.impressions, baseline.impressions), -26.8293, 0.001);
  closeTo(percentChange(comparison.ecpm, baseline.ecpm), -6.4286, 0.001);
  closeTo(percentChange(comparison.showRate ?? 0, baseline.showRate ?? 0), -15.3117, 0.001);
});

test("generic driver logic treats delivery loss as primary when eCPM is comparatively stable", () => {
  const showRateChange = percentChange(comparison.showRate ?? 0, baseline.showRate ?? 0);
  const driver = chooseDriver({
    revenue: percentChange(comparison.revenue, baseline.revenue),
    impressions: percentChange(comparison.impressions, baseline.impressions),
    ecpm: percentChange(comparison.ecpm, baseline.ecpm),
    fillRate: percentChange(comparison.fillRate, baseline.fillRate),
    countryMix: -14
  }, showRateChange);

  assert.equal(driver, "impressions");
});

test("country, format, and source evidence is calculated from report rows", () => {
  const countries = buildDimensionMovements(comparisonRows, baselineRows, "country");
  const formats = buildDimensionMovements(comparisonRows, baselineRows, "adFormat");
  const sources = buildDimensionMovements(comparisonRows, baselineRows, "network");
  const us = countries.find((row) => row.label === "US");
  const rewarded = formats.find((row) => row.label === "Rewarded");
  const appLovin = sources.find((row) => row.label === "AppLovin");

  closeTo(us?.previousShare ?? 0, 42);
  closeTo(us?.currentShare ?? 0, 28);
  assert.equal(rewarded?.previousImpressions, 360_000);
  assert.equal(rewarded?.currentImpressions, 220_000);
  closeTo(appLovin?.impressionChange ?? 0, -50);
});

test("normal single-file CSV upload aliases still parse", () => {
  const upload = [
    "report date,application name,format,country code,ad source,estimated earnings,ad impressions,ad requests,matched requests",
    "2026-07-01,Uploaded Test App,Rewarded,US,AdMob,12.50,2500,4000,3000",
    "2026-07-02,Uploaded Test App,Rewarded,US,AdMob,10.00,2000,3500,2800"
  ].join("\n");
  const result = parseCsv(upload);

  assert.equal(result.rows.length, 2);
  assert.equal(result.rows[0].appName, "Uploaded Test App");
  assert.equal(result.rows[0].adFormat, "Rewarded");
  assert.equal(result.rows[0].ecpm, 5);
});

test("demo page exposes the sample CTA and both public reports", () => {
  const page = readFileSync(join(root, "app/demo/page.tsx"), "utf8");
  assert.match(page, /Try with sample data/);
  assert.match(page, /\/demo-data\/ecpm-baseline\.csv/);
  assert.match(page, /\/demo-data\/ecpm-comparison\.csv/);
  assert.match(page, /This demonstration does not contain real customer or app data/);
});
