import type { MetricRow } from "./types";

export type DemoScenarioId = "ecpm-drop" | "fill-rate-drop" | "country-mix";

type DemoScenario = {
  id: DemoScenarioId;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  rows: MetricRow[];
};

function row(
  date: string,
  appName: string,
  placementName: string,
  country: string,
  network: string,
  revenue: number,
  ecpm: number,
  impressions: number,
  requests: number,
  fills: number,
  clicks: number
): MetricRow {
  return {
    date,
    appId: appName.toLowerCase().replace(/\s+/g, "_"),
    appName,
    placementId: placementName.toLowerCase().replace(/\s+/g, "_"),
    placementName,
    country,
    network,
    revenue,
    ecpm,
    impressions,
    requests,
    fills,
    clicks,
    fillRate: requests ? (fills / requests) * 100 : 0,
    ctr: impressions ? (clicks / impressions) * 100 : 0
  };
}

export const demoScenarios: DemoScenario[] = [
  {
    id: "ecpm-drop",
    title: {
      en: "eCPM drop",
      zh: "eCPM 下降"
    },
    description: {
      en: "Traffic and fill are close to stable, but pricing falls in the main rewarded-video segment.",
      zh: "流量和填充基本稳定，但主要激励视频分组的单价下降。"
    },
    rows: [
      row("2026-06-14", "Idle Ocean", "Rewarded Home", "US", "AdMob", 128.42, 18.7, 6868, 9200, 7100, 318),
      row("2026-06-15", "Idle Ocean", "Rewarded Home", "US", "AdMob", 93.0, 12.4, 7500, 9800, 7520, 286),
      row("2026-06-14", "Idle Ocean", "Interstitial Level", "BR", "AppLovin", 42.11, 5.4, 7798, 13000, 9100, 151),
      row("2026-06-15", "Idle Ocean", "Interstitial Level", "BR", "AppLovin", 45.02, 5.7, 7898, 12100, 8950, 166),
      row("2026-06-14", "Merge Farm", "Banner Bottom", "JP", "Unity Ads", 36.2, 2.8, 12928, 16500, 15100, 93),
      row("2026-06-15", "Merge Farm", "Banner Bottom", "JP", "Unity Ads", 36.4, 2.8, 13000, 16600, 15140, 94)
    ]
  },
  {
    id: "fill-rate-drop",
    title: {
      en: "Fill-rate drop",
      zh: "填充率下降"
    },
    description: {
      en: "Requests stay high and eCPM is stable, but fills drop sharply in one country / placement.",
      zh: "请求量仍高、eCPM 稳定，但某个国家和广告位的填充明显下降。"
    },
    rows: [
      row("2026-06-14", "Puzzle Grove", "Rewarded Boost", "US", "Unity Ads", 153.0, 18.0, 8500, 12000, 10800, 332),
      row("2026-06-15", "Puzzle Grove", "Rewarded Boost", "US", "Unity Ads", 122.4, 18.0, 6800, 12000, 6000, 268),
      row("2026-06-14", "Puzzle Grove", "Interstitial Level", "CA", "AdMob", 48.75, 7.5, 6500, 8200, 7600, 142),
      row("2026-06-15", "Puzzle Grove", "Interstitial Level", "CA", "AdMob", 48.75, 7.5, 6500, 8200, 7600, 142),
      row("2026-06-14", "Puzzle Grove", "Banner Bottom", "BR", "AppLovin", 26.4, 3.2, 8250, 10100, 9100, 70),
      row("2026-06-15", "Puzzle Grove", "Banner Bottom", "BR", "AppLovin", 26.4, 3.2, 8250, 10100, 9100, 70)
    ]
  },
  {
    id: "country-mix",
    title: {
      en: "Country mix",
      zh: "国家结构变化"
    },
    description: {
      en: "US eCPM is stable, but impression share shifts toward lower-eCPM countries and pulls down weighted eCPM.",
      zh: "美国 eCPM 稳定，但展示占比转向低 eCPM 国家，拉低了整体加权 eCPM。"
    },
    rows: [
      row("2026-06-14", "Merge Kingdom", "Rewarded Video", "US", "AdMob", 150.0, 20.0, 7500, 9000, 8100, 315),
      row("2026-06-15", "Merge Kingdom", "Rewarded Video", "US", "AdMob", 80.0, 20.0, 4000, 4800, 4320, 168),
      row("2026-06-14", "Merge Kingdom", "Interstitial", "BR", "AppLovin", 35.0, 5.0, 7000, 8500, 7600, 126),
      row("2026-06-15", "Merge Kingdom", "Interstitial", "BR", "AppLovin", 45.0, 5.0, 9000, 10900, 9810, 165),
      row("2026-06-14", "Merge Kingdom", "Banner", "IN", "Unity Ads", 15.0, 2.5, 6000, 7600, 6900, 42),
      row("2026-06-15", "Merge Kingdom", "Banner", "IN", "Unity Ads", 27.5, 2.5, 11000, 13900, 12500, 75)
    ]
  }
];

export const demoRows: MetricRow[] = demoScenarios[0].rows;

export function metricRowsToCsv(rows: MetricRow[]) {
  const header = "date,appName,placementName,country,network,revenue,ecpm,impressions,requests,fills,clicks";
  const lines = rows.map((item) =>
    [
      item.date,
      item.appName,
      item.placementName,
      item.country,
      item.network,
      item.revenue.toFixed(2),
      item.ecpm.toFixed(2),
      Math.round(item.impressions),
      Math.round(item.requests),
      Math.round(item.fills),
      Math.round(item.clicks)
    ].join(",")
  );

  return [header, ...lines].join("\n");
}
