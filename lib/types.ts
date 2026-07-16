export type MetricRow = {
  date: string;
  appId: string;
  appName: string;
  placementId: string;
  placementName: string;
  adUnit?: string;
  adFormat?: string;
  country: string;
  network: string;
  mediation?: string;
  revenue: number;
  ecpm: number;
  impressions: number;
  requests: number;
  matchedRequests?: number;
  fills: number;
  clicks: number;
  fillRate: number;
  matchRate?: number;
  ctr: number;
};

export type AlertSeverity = "critical" | "warning" | "info";

export type Alert = {
  id: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  metric: "ecpm" | "revenue" | "fillRate" | "sync";
  date: string;
  appName?: string;
  current?: number;
  previous?: number;
  threshold?: number;
};

export type DataSnapshot = {
  updatedAt: string;
  source: "demo" | "topon";
  rows: MetricRow[];
  alerts: Alert[];
};

export type TopOnFullReportRequest = {
  startdate: number;
  enddate: number;
  time_zone?: string;
  app_id_list?: string[];
  unit_id_list?: string[];
  adsource_id_list?: number[];
  group_by?: string[];
  metric?: string[];
  start?: number;
  limit?: number;
};
