import type { MetricRow } from "./types";

export function weightedEcpm(revenue: number, impressions: number) {
  return impressions > 0 ? (revenue / impressions) * 1000 : 0;
}

export function aggregateDiagnosisRows(rows: MetricRow[]) {
  const revenue = rows.reduce((total, row) => total + row.revenue, 0);
  const impressions = rows.reduce((total, row) => total + row.impressions, 0);
  const requests = rows.reduce((total, row) => total + row.requests, 0);
  const matchedRequests = rows.reduce((total, row) => total + (row.matchedRequests ?? 0), 0);
  const hasMatchedRequests = rows.some((row) => row.matchedRequests !== undefined);
  const fills = rows.reduce((total, row) => total + row.fills, 0);
  const rowsWithReportedMatchRate = rows.filter((row) => row.matchRate !== undefined && row.requests > 0);
  const reportedMatchRateRequests = rowsWithReportedMatchRate.reduce((total, row) => total + row.requests, 0);
  const reportedMatchRate =
    reportedMatchRateRequests > 0
      ? rowsWithReportedMatchRate.reduce((total, row) => total + (row.matchRate ?? 0) * row.requests, 0) / reportedMatchRateRequests
      : undefined;

  return {
    revenue,
    impressions,
    requests,
    matchedRequests,
    fills,
    ecpm: weightedEcpm(revenue, impressions),
    fillRate: requests > 0 ? (fills / requests) * 100 : 0,
    matchRate: hasMatchedRequests && requests > 0 ? (matchedRequests / requests) * 100 : reportedMatchRate
  };
}
