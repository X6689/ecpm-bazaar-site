import crypto from "node:crypto";
import type { MetricRow, TopOnFullReportRequest } from "./types";

const endpoint = process.env.TOPON_API_URL ?? "https://api.toponad.net/v2/fullreport";

function md5Upper(value: string) {
  return crypto.createHash("md5").update(value).digest("hex").toUpperCase();
}

function buildSignature({
  method,
  contentMd5,
  contentType,
  timestamp,
  resource,
  publisherKey
}: {
  method: string;
  contentMd5: string;
  contentType: string;
  timestamp: string;
  resource: string;
  publisherKey: string;
}) {
  const canonicalHeaders = `X-Up-Key:${publisherKey}\nX-Up-Timestamp:${timestamp}`;
  return md5Upper(`${method}\n${contentMd5}\n${contentType}\n${canonicalHeaders}\n${resource}`);
}

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function toReportDate(date: Date) {
  return Number(toIsoDate(date).replaceAll("-", ""));
}

function beijingDateDaysAgo(daysAgo: number) {
  const date = new Date(Date.now() + 8 * 60 * 60 * 1000);
  date.setUTCDate(date.getUTCDate() - daysAgo);
  return date;
}

export function defaultReportWindow() {
  const end = beijingDateDaysAgo(1);
  const start = beijingDateDaysAgo(2);
  return {
    startdate: toReportDate(start),
    enddate: toReportDate(end)
  };
}

export function buildReportRequest(): TopOnFullReportRequest {
  const appIds = process.env.TOPON_APP_IDS?.split(",").map((item) => item.trim()).filter(Boolean);
  const placementIds = process.env.TOPON_PLACEMENT_IDS?.split(",").map((item) => item.trim()).filter(Boolean);
  const adsourceIds = process.env.TOPON_ADSOURCE_IDS?.split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map(Number)
    .filter(Number.isFinite);

  const manualStartDate = Number(process.env.TOPON_STARTDATE);
  const manualEndDate = Number(process.env.TOPON_ENDDATE);
  const window =
    Number.isFinite(manualStartDate) && manualStartDate > 0 && Number.isFinite(manualEndDate) && manualEndDate > 0
      ? { startdate: manualStartDate, enddate: manualEndDate }
      : defaultReportWindow();

  return {
    ...window,
    time_zone: process.env.TOPON_TIME_ZONE ?? "UTC+8",
    app_id_list: appIds?.length ? appIds : undefined,
    unit_id_list: placementIds?.length ? placementIds : undefined,
    adsource_id_list: adsourceIds?.length ? adsourceIds : undefined,
    group_by: ["date", "app", "placement", "area", "adsource"],
    metric: ["request", "fillrate", "impression", "click", "revenue", "ecpm", "ctr"],
    start: 0,
    limit: 1000
  };
}

export async function fetchTopOnFullReport(request = buildReportRequest()) {
  const publisherKey = process.env.TOPON_PUBLISHER_KEY;
  if (!publisherKey) {
    throw new Error("Missing TOPON_PUBLISHER_KEY. Copy .env.example to .env.local and add your TopOn publisher key.");
  }

  const body = JSON.stringify(request);
  const contentType = "application/json";
  const contentMd5 = md5Upper(body);
  const timestamp = Date.now().toString();
  const resource = new URL(endpoint).pathname;
  const signature = buildSignature({
    method: "POST",
    contentMd5,
    contentType,
    timestamp,
    resource,
    publisherKey
  });

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": contentType,
      "Content-MD5": contentMd5,
      "X-Up-Key": publisherKey,
      "X-Up-Timestamp": timestamp,
      "X-Up-Signature": signature
    },
    body
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`TopOn API failed with ${response.status}: ${text}`);
  }

  return response.json();
}

const valueFrom = (record: Record<string, unknown>, keys: string[], fallback = "") => {
  for (const key of keys) {
    const value = record[key];
    if (value !== undefined && value !== null && value !== "") return String(value);
  }
  return fallback;
};

const numberFrom = (record: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const value = Number(record[key]);
    if (Number.isFinite(value)) return value;
  }
  return 0;
};

const nestedRecord = (record: Record<string, unknown>, key: string) => {
  const value = record[key];
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
};

const percentFrom = (record: Record<string, unknown>, keys: string[]) => {
  const value = numberFrom(record, keys);
  return value > 0 && value <= 1 ? value * 100 : value;
};

export function normalizeTopOnReport(payload: unknown): MetricRow[] {
  const root = payload as Record<string, unknown>;
  const list =
    (Array.isArray(root.data) && root.data) ||
    (Array.isArray(root.list) && root.list) ||
    (Array.isArray(root.records) && root.records) ||
    [];

  return list.map((item) => {
    const record = item as Record<string, unknown>;
    const app = nestedRecord(record, "app");
    const placement = nestedRecord(record, "placement");
    const adsource = nestedRecord(record, "adsource");
    const impressions = numberFrom(record, ["impression", "impressions", "show", "shows"]);
    const requests = numberFrom(record, ["request", "requests"]);
    const fills = numberFrom(record, ["request_filled", "loads_filled", "fill", "fills", "filled"]);
    const clicks = numberFrom(record, ["click", "clicks"]);
    const revenue = numberFrom(record, ["revenue", "income", "earning"]);
    const ecpm = numberFrom(record, ["ecpm", "eCPM"]) || (impressions ? (revenue / impressions) * 1000 : 0);

    return {
      date: valueFrom(record, ["date", "day", "time"], "unknown"),
      appId: valueFrom(app, ["id"], valueFrom(record, ["app_id", "appId"])),
      appName: valueFrom(app, ["name"], valueFrom(record, ["app_name", "appName"], "Unknown app")),
      placementId: valueFrom(placement, ["id"], valueFrom(record, ["placement_id", "placementId", "adunit_id"])),
      placementName: valueFrom(
        placement,
        ["name"],
        valueFrom(record, ["placement_name", "placementName", "adunit_name"], "Unknown placement")
      ),
      country: valueFrom(record, ["area", "country", "country_code"], "ALL"),
      network: valueFrom(adsource, ["name"], valueFrom(record, ["network", "adsource_name", "ad_source"], "TopOn")),
      revenue,
      ecpm,
      impressions,
      requests,
      fills,
      clicks,
      fillRate: percentFrom(record, ["fillrate", "fill_rate", "fillRate"]) || (requests ? (fills / requests) * 100 : 0),
      ctr: percentFrom(record, ["ctr"]) || (impressions ? (clicks / impressions) * 100 : 0)
    };
  });
}
