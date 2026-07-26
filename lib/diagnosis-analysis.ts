import { aggregateDiagnosisRows } from "./diagnosis-math";
import type { MetricRow } from "./types";

export type Driver = "revenue" | "impressions" | "ecpm" | "fillRate" | "countryMix";

export function percentChange(current: number, previous: number) {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

export function chooseDriver(changes: Record<Driver, number>, showRateChange = 0): Driver {
  if (changes.impressions < -8 && showRateChange < -8 && changes.ecpm > -10) {
    return "impressions";
  }
  if (changes.countryMix < -5) return "countryMix";
  if (changes.fillRate < -8 && changes.ecpm > -6) return "fillRate";
  if (changes.ecpm < -8 && changes.fillRate > -8) return "ecpm";
  if (changes.impressions < -8 && changes.fillRate > -8) return "impressions";

  const specificDrivers = [
    { driver: "fillRate" as const, change: changes.fillRate },
    { driver: "ecpm" as const, change: changes.ecpm },
    { driver: "impressions" as const, change: changes.impressions },
    { driver: "countryMix" as const, change: changes.countryMix }
  ].filter((item) => item.change < -3);

  return specificDrivers.sort((a, b) => a.change - b.change)[0]?.driver ?? "revenue";
}

export type DiagnosisDimension = "country" | "adFormat" | "network";

export type DimensionMovement = {
  label: string;
  previousImpressions: number;
  currentImpressions: number;
  impressionChange: number;
  previousShare: number;
  currentShare: number;
  sharePointChange: number;
  previousRevenue: number;
  currentRevenue: number;
};

export function buildDimensionMovements(
  currentRows: MetricRow[],
  previousRows: MetricRow[],
  dimension: DiagnosisDimension
): DimensionMovement[] {
  const labelFor = (row: MetricRow) => {
    if (dimension === "adFormat") return row.adFormat || "Unknown format";
    return row[dimension] || `Unknown ${dimension}`;
  };
  const currentTotal = aggregateDiagnosisRows(currentRows);
  const previousTotal = aggregateDiagnosisRows(previousRows);
  const labels = new Set([...currentRows.map(labelFor), ...previousRows.map(labelFor)]);

  return [...labels]
    .map((label) => {
      const current = aggregateDiagnosisRows(currentRows.filter((row) => labelFor(row) === label));
      const previous = aggregateDiagnosisRows(previousRows.filter((row) => labelFor(row) === label));
      const previousShare = previousTotal.impressions > 0 ? (previous.impressions / previousTotal.impressions) * 100 : 0;
      const currentShare = currentTotal.impressions > 0 ? (current.impressions / currentTotal.impressions) * 100 : 0;

      return {
        label,
        previousImpressions: previous.impressions,
        currentImpressions: current.impressions,
        impressionChange: percentChange(current.impressions, previous.impressions),
        previousShare,
        currentShare,
        sharePointChange: currentShare - previousShare,
        previousRevenue: previous.revenue,
        currentRevenue: current.revenue
      };
    })
    .sort((a, b) => Math.abs(b.currentImpressions - b.previousImpressions) - Math.abs(a.currentImpressions - a.previousImpressions));
}
