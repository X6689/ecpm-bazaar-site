import assert from "node:assert/strict";
import test from "node:test";
import { aggregateDiagnosisRows, weightedEcpm } from "../lib/diagnosis-math";
import type { MetricRow } from "../lib/types";

function row(
  revenue: number,
  impressions: number,
  options: { requests?: number; fills?: number; matchedRequests?: number; matchRate?: number } = {}
): MetricRow {
  const requests = options.requests ?? impressions * 2;
  const fills = options.fills ?? impressions;

  return {
    date: "2026-07-16",
    appId: "app",
    appName: "App",
    placementId: "placement",
    placementName: "Placement",
    country: "US",
    network: "Source",
    revenue,
    ecpm: impressions ? (revenue / impressions) * 1000 : 0,
    impressions,
    requests,
    matchedRequests: options.matchedRequests,
    fills,
    clicks: 0,
    fillRate: requests ? (fills / requests) * 100 : 0,
    matchRate: options.matchRate,
    ctr: 0
  };
}

test("weighted eCPM uses total revenue divided by total impressions", () => {
  const rows = [row(10, 100), row(1, 1000)];
  const aggregate = aggregateDiagnosisRows(rows);
  const rowLevelAverage = (100 + 1) / 2;

  assert.equal(weightedEcpm(11, 1100), 10);
  assert.equal(aggregate.ecpm, 10);
  assert.notEqual(aggregate.ecpm, rowLevelAverage);
});

test("aggregate fill rate uses totals instead of a row-level average", () => {
  const rows = [row(10, 1000, { requests: 1000, fills: 900 }), row(1, 100, { requests: 100, fills: 0 })];
  const aggregate = aggregateDiagnosisRows(rows);

  assert.equal(aggregate.fillRate, 900 / 1100 * 100);
  assert.equal(aggregate.requests, 1100);
  assert.equal(aggregate.fills, 900);
  assert.notEqual(aggregate.fillRate, 45);
});

test("match rate remains separate from fill rate", () => {
  const rows = [
    row(10, 1000, { requests: 1000, matchedRequests: 800, fills: 600 }),
    row(1, 100, { requests: 100, matchedRequests: 50, fills: 20 })
  ];
  const aggregate = aggregateDiagnosisRows(rows);

  assert.equal(aggregate.matchRate, 850 / 1100 * 100);
  assert.equal(aggregate.fillRate, 620 / 1100 * 100);
});
