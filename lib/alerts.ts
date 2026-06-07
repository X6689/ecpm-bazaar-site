import type { Alert, MetricRow } from "./types";

const numberEnv = (name: string, fallback: number) => {
  const value = Number(process.env[name]);
  return Number.isFinite(value) ? value : fallback;
};

const percentDrop = (current: number, previous: number) => {
  if (previous <= 0) return 0;
  return ((previous - current) / previous) * 100;
};

export function evaluateAlerts(rows: MetricRow[]): Alert[] {
  const ecpmThreshold = numberEnv("ECPM_DROP_THRESHOLD", 25);
  const revenueThreshold = numberEnv("REVENUE_DROP_THRESHOLD", 30);
  const fillRateThreshold = numberEnv("FILL_RATE_DROP_THRESHOLD", 20);
  const sortedRows = [...rows].sort((a, b) => a.date.localeCompare(b.date));
  const alerts: Alert[] = [];

  for (const row of sortedRows) {
    const previous = sortedRows
      .filter(
        (candidate) =>
          candidate.date < row.date &&
          candidate.appId === row.appId &&
          candidate.placementId === row.placementId &&
          candidate.country === row.country
      )
      .at(-1);

    if (!previous) continue;

    const checks = [
      {
        metric: "ecpm" as const,
        label: "eCPM",
        current: row.ecpm,
        previous: previous.ecpm,
        threshold: ecpmThreshold
      },
      {
        metric: "revenue" as const,
        label: "Revenue",
        current: row.revenue,
        previous: previous.revenue,
        threshold: revenueThreshold
      },
      {
        metric: "fillRate" as const,
        label: "Fill rate",
        current: row.fillRate,
        previous: previous.fillRate,
        threshold: fillRateThreshold
      }
    ];

    for (const check of checks) {
      const drop = percentDrop(check.current, check.previous);
      if (drop >= check.threshold) {
        alerts.push({
          id: `${row.date}-${row.appId}-${row.placementId}-${row.country}-${check.metric}`,
          severity: drop >= check.threshold * 1.5 ? "critical" : "warning",
          title: `${check.label} dropped ${drop.toFixed(1)}%`,
          message: `${row.appName} / ${row.placementName} / ${row.country}`,
          metric: check.metric,
          date: row.date,
          appName: row.appName,
          current: check.current,
          previous: check.previous,
          threshold: check.threshold
        });
      }
    }
  }

  return alerts;
}
