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

export const fourteenDaySampleRows: MetricRow[] = [
  row("2026-06-08", "Sample Game", "Rewarded Home", "US", "AdMob", 120.0, 20.0, 6000, 7800, 6900, 280),
  row("2026-06-09", "Sample Game", "Rewarded Home", "US", "AdMob", 122.0, 20.0, 6100, 7900, 7000, 286),
  row("2026-06-10", "Sample Game", "Rewarded Home", "US", "AdMob", 118.0, 20.0, 5900, 7700, 6800, 272),
  row("2026-06-11", "Sample Game", "Rewarded Home", "US", "AdMob", 124.0, 20.0, 6200, 8050, 7100, 291),
  row("2026-06-12", "Sample Game", "Rewarded Home", "US", "AdMob", 126.0, 20.0, 6300, 8150, 7200, 296),
  row("2026-06-13", "Sample Game", "Rewarded Home", "US", "AdMob", 121.0, 20.0, 6050, 7850, 6950, 284),
  row("2026-06-14", "Sample Game", "Rewarded Home", "US", "AdMob", 123.0, 20.0, 6150, 8000, 7050, 288),
  row("2026-06-15", "Sample Game", "Rewarded Home", "US", "AdMob", 88.5, 15.0, 5900, 7900, 6900, 230),
  row("2026-06-16", "Sample Game", "Rewarded Home", "US", "AdMob", 90.0, 15.0, 6000, 8000, 7000, 236),
  row("2026-06-17", "Sample Game", "Rewarded Home", "US", "AdMob", 87.0, 15.0, 5800, 7750, 6800, 225),
  row("2026-06-18", "Sample Game", "Rewarded Home", "US", "AdMob", 91.5, 15.0, 6100, 8100, 7100, 240),
  row("2026-06-19", "Sample Game", "Rewarded Home", "US", "AdMob", 93.0, 15.0, 6200, 8200, 7200, 244),
  row("2026-06-20", "Sample Game", "Rewarded Home", "US", "AdMob", 89.25, 15.0, 5950, 7950, 6950, 232),
  row("2026-06-21", "Sample Game", "Rewarded Home", "US", "AdMob", 90.75, 15.0, 6050, 8050, 7050, 238),
  row("2026-06-08", "Sample Game", "Interstitial", "BR", "AppLovin", 42.0, 6.0, 7000, 9000, 7900, 130),
  row("2026-06-09", "Sample Game", "Interstitial", "BR", "AppLovin", 42.6, 6.0, 7100, 9100, 8000, 132),
  row("2026-06-10", "Sample Game", "Interstitial", "BR", "AppLovin", 41.4, 6.0, 6900, 8900, 7800, 128),
  row("2026-06-11", "Sample Game", "Interstitial", "BR", "AppLovin", 43.2, 6.0, 7200, 9200, 8100, 134),
  row("2026-06-12", "Sample Game", "Interstitial", "BR", "AppLovin", 43.8, 6.0, 7300, 9300, 8200, 136),
  row("2026-06-13", "Sample Game", "Interstitial", "BR", "AppLovin", 42.3, 6.0, 7050, 9050, 7950, 131),
  row("2026-06-14", "Sample Game", "Interstitial", "BR", "AppLovin", 42.9, 6.0, 7150, 9150, 8050, 133),
  row("2026-06-15", "Sample Game", "Interstitial", "BR", "AppLovin", 42.0, 6.0, 7000, 9000, 7900, 130),
  row("2026-06-16", "Sample Game", "Interstitial", "BR", "AppLovin", 42.6, 6.0, 7100, 9100, 8000, 132),
  row("2026-06-17", "Sample Game", "Interstitial", "BR", "AppLovin", 41.4, 6.0, 6900, 8900, 7800, 128),
  row("2026-06-18", "Sample Game", "Interstitial", "BR", "AppLovin", 43.2, 6.0, 7200, 9200, 8100, 134),
  row("2026-06-19", "Sample Game", "Interstitial", "BR", "AppLovin", 43.8, 6.0, 7300, 9300, 8200, 136),
  row("2026-06-20", "Sample Game", "Interstitial", "BR", "AppLovin", 42.3, 6.0, 7050, 9050, 7950, 131),
  row("2026-06-21", "Sample Game", "Interstitial", "BR", "AppLovin", 42.9, 6.0, 7150, 9150, 8050, 133)
];

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
