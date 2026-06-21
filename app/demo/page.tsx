"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clipboard,
  Copy,
  Download,
  FileUp,
  Mail,
  Play,
  RotateCcw,
  ShieldCheck,
  Table2
} from "lucide-react";
import { writeClipboardText } from "@/lib/clipboard";
import { demoRows } from "@/lib/demo-data";
import type { MetricRow } from "@/lib/types";

type Lang = "en" | "zh";
type Driver = "revenue" | "impressions" | "ecpm" | "fillRate";
type BreakdownRow = {
  key: string;
  label: string;
  current: ReturnType<typeof totals>;
  previous: ReturnType<typeof totals>;
  changes: Record<Driver, number>;
  driver: Driver;
  revenueDelta: number;
};
type CsvField =
  | "date"
  | "appName"
  | "placementName"
  | "country"
  | "network"
  | "revenue"
  | "ecpm"
  | "impressions"
  | "requests"
  | "fills"
  | "clicks"
  | "fillRate";

type FieldStatus = {
  field: CsvField;
  label: string;
  required: boolean;
  matchedHeader?: string;
};

type IssueKey = "fallbackIssue" | "twoDatesIssue" | "fillIssue" | "ecpmIssue" | "rowMatchIssue" | "lowVolumeIssue";

type ParseCsvResult = {
  rows: MetricRow[];
  fields: FieldStatus[];
  issues: IssueKey[];
};

const fieldLabels: Record<CsvField, string> = {
  date: "date",
  appName: "appName",
  placementName: "placementName",
  country: "country",
  network: "network",
  revenue: "revenue",
  ecpm: "ecpm",
  impressions: "impressions",
  requests: "requests",
  fills: "fills",
  clicks: "clicks",
  fillRate: "fillRate"
};

const fieldAliases: Record<CsvField, string[]> = {
  date: ["date", "day", "report date", "report_date", "reportdate"],
  appName: ["appName", "app name", "app_name", "app", "application", "application name"],
  placementName: [
    "placementName",
    "placement name",
    "placement",
    "ad unit",
    "ad_unit",
    "ad unit name",
    "adUnit",
    "adUnitName",
    "unit name",
    "unit_name",
    "format",
    "ad format"
  ],
  country: ["country", "country code", "country_code", "geo", "region", "location"],
  network: [
    "network",
    "adSource",
    "ad source",
    "ad_source",
    "adsource",
    "demand source",
    "demand_source",
    "mediation",
    "platform"
  ],
  revenue: [
    "revenue",
    "estimated revenue",
    "estimated_revenue",
    "estimatedRevenue",
    "estimated earnings",
    "estimated_earnings",
    "earnings",
    "income",
    "ad revenue"
  ],
  ecpm: ["ecpm", "eCPM", "observed eCPM", "observed_ecpm", "observedEcpm", "avg eCPM", "average eCPM"],
  impressions: ["impressions", "impression", "ad impressions", "ad_impressions", "adImpressions", "shows"],
  requests: ["requests", "request", "ad requests", "ad_requests", "adRequests", "attempts"],
  fills: [
    "fills",
    "fill",
    "matched requests",
    "matched_requests",
    "matchedRequests",
    "filled requests",
    "filled_requests",
    "responses",
    "matches"
  ],
  clicks: ["clicks", "click", "ad clicks", "ad_clicks", "adClicks"],
  fillRate: ["fillRate", "fill rate", "fill_rate", "matchRate", "match rate", "match_rate", "matched rate"]
};

const requiredFields: CsvField[] = ["date", "revenue", "impressions"];
const displayFields: CsvField[] = [
  "date",
  "appName",
  "placementName",
  "country",
  "network",
  "revenue",
  "ecpm",
  "impressions",
  "requests",
  "fills",
  "clicks",
  "fillRate"
];

const sampleCsv = `date,appName,placementName,country,network,revenue,ecpm,impressions,requests,fills,clicks
2026-06-14,Idle Ocean,Rewarded Home,US,AdMob,128.42,18.70,6868,9200,7100,318
2026-06-15,Idle Ocean,Rewarded Home,US,AdMob,84.10,12.40,6782,9300,6280,261
2026-06-14,Idle Ocean,Interstitial Level,BR,AppLovin,42.11,5.40,7798,13000,9100,151
2026-06-15,Idle Ocean,Interstitial Level,BR,AppLovin,45.02,5.70,7898,12100,8950,166
2026-06-14,Merge Farm,Banner Bottom,JP,Unity Ads,36.20,2.80,12928,16500,15100,93
2026-06-15,Merge Farm,Banner Bottom,JP,Unity Ads,31.08,2.76,11260,16300,14980,81`;

const copy = {
  en: {
    back: "Back to site",
    badge: "Public demo",
    title: "Diagnose a mobile ad revenue drop in one minute.",
    lede:
      "Use the sample data or upload a CSV. eCPM Bazaar compares the latest day with the previous day and explains whether revenue moved because of eCPM, impressions, fill rate, country, placement, or ad source changes.",
    useSample: "Load sample CSV",
    downloadSample: "Download sample CSV",
    copyLink: "Copy demo link",
    copyResult: "Copy diagnosis",
    copied: "Copied",
    reset: "Reset demo",
    upload: "Upload CSV",
    uploadHelp: "CSV columns: date, appName, placementName, country, network, revenue, ecpm, impressions, requests, fills, clicks.",
    pasteCsv: "Paste CSV",
    pasteCsvTitle: "Paste CSV or copied report rows",
    pasteCsvHelp: "Paste comma-separated CSV or tab-separated rows copied from a spreadsheet export.",
    pastePlaceholder:
      "date,appName,placementName,country,network,revenue,ecpm,impressions,requests,fills,clicks\n2026-06-14,Game A,Rewarded Home,US,AdMob,128.42,18.70,6868,9200,7100,318",
    analyzePastedCsv: "Analyze pasted data",
    clearPaste: "Clear",
    privacy: "CSV files are parsed in your browser for this public demo. Nothing is uploaded or stored.",
    fieldCheck: "CSV field check",
    dataQuality: "Data quality notes",
    matched: "Matched",
    missing: "Missing",
    required: "Required",
    recommended: "Recommended",
    ready: "Ready for diagnosis",
    needsWork: "Needs field mapping",
    templates: "CSV templates",
    contact: "Free diagnosis",
    sourceSample: "Sample CSV loaded",
    sourceDemo: "Built-in demo data",
    sourceUpload: "Uploaded CSV",
    sourcePaste: "Pasted CSV",
    diagnosis: "Diagnosis",
    headlineStable: "No major revenue drop detected",
    headlineDrop: "Revenue drop detected",
    likelyDriver: "Likely driver",
    driverBreakdown: "Driver breakdown",
    driverBreakdownTitle: "Top segment drops",
    driverBreakdownNote:
      "Ranked by revenue loss across matching app, placement, country, and ad source segments. Use this to decide where to investigate first.",
    segment: "Segment",
    revenueChange: "Revenue change",
    ecpmChange: "eCPM",
    impressionChange: "Impressions",
    fillChange: "Fill",
    reason: "Likely reason",
    noBreakdown: "No comparable segment drop found for the latest two dates.",
    manualCopyTitle: "Copy manually",
    manualCopyHelp: "Automatic clipboard access was blocked. Select this text and copy it manually.",
    nextCheck: "What to check first",
    totalRevenue: "Revenue",
    weightedEcpm: "Weighted eCPM",
    impressions: "Impressions",
    fillRate: "Fill rate",
    rows: "rows",
    dataPreview: "Data preview",
    noRows: "No rows loaded yet.",
    parseError: "Could not read this CSV. Check the column names and try again.",
    fallbackIssue: "Some optional fields are missing, so the diagnosis will be less precise.",
    twoDatesIssue: "Add at least two dates to compare the latest day with the previous day.",
    fillIssue: "Requests and fills are missing or zero, so fill-rate diagnosis is limited.",
    ecpmIssue: "eCPM was missing for some rows and was calculated from revenue and impressions.",
    rowMatchIssue: "No matching app / placement / country / source rows were found across the two latest dates.",
    lowVolumeIssue: "Some rows have low impressions. Treat row-level eCPM changes carefully.",
    driverLabels: {
      revenue: "Revenue",
      impressions: "Impressions",
      ecpm: "eCPM",
      fillRate: "Fill rate"
    },
    advice: {
      impressions: "Traffic or placement exposure changed. Check sessions, ad request logic, retention, and recent product releases.",
      ecpm: "Pricing changed. Check country mix, bidder/source performance, floors, seasonality, and mediation waterfall changes.",
      fillRate: "Fill changed. Check match/fill rate by country, ad source availability, floor settings, and platform status.",
      revenue: "The drop is broad. Start with the largest country, placement, and ad source contributors before changing settings."
    },
    summaryPrefix: "The largest drop is concentrated in",
    summarySuffix: "compared with the previous day."
  },
  zh: {
    back: "返回官网",
    badge: "公开演示",
    title: "一分钟诊断移动广告收入为什么下降。",
    lede:
      "使用样例数据或上传 CSV。eCPM Bazaar 会比较最近一天和前一天，判断收入变化更可能来自 eCPM、展示量、填充率、国家地区、广告位还是广告来源。",
    useSample: "载入样例 CSV",
    downloadSample: "下载样例 CSV",
    copyLink: "复制演示链接",
    copyResult: "复制诊断结果",
    copied: "已复制",
    reset: "重置演示",
    upload: "上传 CSV",
    uploadHelp: "CSV 字段：date, appName, placementName, country, network, revenue, ecpm, impressions, requests, fills, clicks。",
    pasteCsv: "粘贴 CSV",
    pasteCsvTitle: "粘贴 CSV 或报表行",
    pasteCsvHelp: "可粘贴英文逗号分隔 CSV，也可粘贴从表格导出的制表符分隔行。",
    pastePlaceholder:
      "date,appName,placementName,country,network,revenue,ecpm,impressions,requests,fills,clicks\n2026-06-14,Game A,Rewarded Home,US,AdMob,128.42,18.70,6868,9200,7100,318",
    analyzePastedCsv: "分析粘贴数据",
    clearPaste: "清空",
    privacy: "这个公开演示只在浏览器本地解析 CSV，不上传、不保存你的文件。",
    fieldCheck: "CSV 字段检查",
    dataQuality: "数据质量提示",
    matched: "已识别",
    missing: "缺失",
    required: "必填",
    recommended: "建议",
    ready: "可以诊断",
    needsWork: "需要调整字段",
    templates: "CSV 模板",
    contact: "免费诊断",
    sourceSample: "已载入样例 CSV",
    sourceDemo: "内置演示数据",
    sourceUpload: "已上传 CSV",
    sourcePaste: "已粘贴 CSV",
    diagnosis: "诊断结论",
    headlineStable: "没有发现明显收入下滑",
    headlineDrop: "发现收入下滑",
    likelyDriver: "最可能原因",
    driverBreakdown: "驱动明细",
    driverBreakdownTitle: "主要下滑分组",
    driverBreakdownNote:
      "按 App、广告位、国家地区、广告源组合聚合，并按收入损失排序。先看这里，再决定优先排查哪里。",
    segment: "分组",
    revenueChange: "收入变化",
    ecpmChange: "eCPM",
    impressionChange: "展示量",
    fillChange: "填充",
    reason: "可能原因",
    noBreakdown: "最近两个日期没有找到可比较的下滑分组。",
    manualCopyTitle: "手动复制",
    manualCopyHelp: "浏览器阻止了自动复制。选中下面这段文本手动复制即可。",
    nextCheck: "优先排查",
    totalRevenue: "收入",
    weightedEcpm: "加权 eCPM",
    impressions: "展示量",
    fillRate: "填充率",
    rows: "行数据",
    dataPreview: "数据预览",
    noRows: "还没有载入数据。",
    parseError: "无法读取这个 CSV，请检查字段名后再试。",
    fallbackIssue: "部分可选字段缺失，诊断精度会降低。",
    twoDatesIssue: "至少需要两个日期，才能比较最近一天和前一天。",
    fillIssue: "requests 和 fills 缺失或为 0，填充率诊断会受限。",
    ecpmIssue: "部分行缺少 eCPM，已用收入和展示量自动计算。",
    rowMatchIssue: "最近两个日期之间没有找到相同 App / 广告位 / 国家 / 广告源的行。",
    lowVolumeIssue: "部分行展示量较低，行级 eCPM 变化需要谨慎判断。",
    driverLabels: {
      revenue: "收入",
      impressions: "展示量",
      ecpm: "eCPM",
      fillRate: "填充率"
    },
    advice: {
      impressions: "流量或广告位曝光发生变化。先检查会话、广告请求逻辑、留存和最近产品改动。",
      ecpm: "单价发生变化。先检查国家结构、广告源表现、底价、季节性和瀑布流配置。",
      fillRate: "填充发生变化。先按国家检查 match/fill rate、广告源可用性、底价配置和平台状态。",
      revenue: "下滑比较分散。先从贡献最大的国家、广告位和广告来源开始拆解，不急着改配置。"
    },
    summaryPrefix: "最大下滑集中在",
    summarySuffix: "相较前一天。"
  }
};

function numberValue(value: unknown) {
  const parsed = Number(String(value ?? "").replace(/[$,%]/g, "").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeHeader(header: string) {
  return header.replace(/^\uFEFF/, "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

const aliasLookup = new Map<string, CsvField>();
for (const field of displayFields) {
  for (const alias of fieldAliases[field]) {
    aliasLookup.set(normalizeHeader(alias), field);
  }
}

function createFieldStatuses(fieldMap?: Map<CsvField, string>): FieldStatus[] {
  return displayFields.map((field) => ({
    field,
    label: fieldLabels[field],
    required: requiredFields.includes(field),
    matchedHeader: fieldMap?.get(field) ?? fieldLabels[field]
  }));
}

function buildFieldMap(headers: string[]) {
  const fieldMap = new Map<CsvField, string>();

  for (const header of headers) {
    const field = aliasLookup.get(normalizeHeader(header));
    if (field && !fieldMap.has(field)) {
      fieldMap.set(field, header);
    }
  }

  return fieldMap;
}

function valueFrom(record: Record<CsvField, string>, field: CsvField) {
  return record[field] ?? "";
}

function detectDelimiter(headerLine: string) {
  const tabCount = headerLine.split("\t").length;
  const commaCount = headerLine.split(",").length;
  return tabCount > commaCount ? "\t" : ",";
}

function parseCsvLine(line: string, delimiter = ",") {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (const char of line) {
    if (char === "\"") {
      inQuotes = !inQuotes;
      continue;
    }
    if (char === delimiter && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }

  values.push(current.trim());
  return values;
}

function parseCsv(text: string): ParseCsvResult {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const delimiter = detectDelimiter(lines[0] ?? "");
  const headers = parseCsvLine(lines[0] ?? "", delimiter).map((header) => header.trim());
  const fieldMap = buildFieldMap(headers);
  const missingRequired = requiredFields.filter((field) => !fieldMap.has(field));
  if (missingRequired.length) {
    throw new Error("Missing required columns");
  }

  const rows = lines.slice(1).map((line, index) => {
    const values = parseCsvLine(line, delimiter);
    const record = Object.fromEntries(displayFields.map((field) => [field, ""])) as Record<CsvField, string>;

    headers.forEach((header, columnIndex) => {
      const field = aliasLookup.get(normalizeHeader(header));
      if (field) {
        record[field] = values[columnIndex] ?? "";
      }
    });

    const requests = numberValue(valueFrom(record, "requests"));
    const fills = numberValue(valueFrom(record, "fills"));
    const impressions = numberValue(valueFrom(record, "impressions"));
    const revenue = numberValue(valueFrom(record, "revenue"));
    const providedEcpm = numberValue(valueFrom(record, "ecpm"));
    const ecpm = providedEcpm || (impressions ? (revenue / impressions) * 1000 : 0);
    const providedFillRate = numberValue(valueFrom(record, "fillRate"));
    const fillRate = providedFillRate || (requests ? (fills / requests) * 100 : 0);
    const clicks = numberValue(valueFrom(record, "clicks"));

    return {
      date: String(valueFrom(record, "date") || `row-${index + 1}`),
      appId: String(valueFrom(record, "appName") || "app").toLowerCase().replace(/\s+/g, "_"),
      appName: String(valueFrom(record, "appName") || "Uploaded App"),
      placementId: String(valueFrom(record, "placementName") || "placement").toLowerCase().replace(/\s+/g, "_"),
      placementName: String(valueFrom(record, "placementName") || "All Placements"),
      country: String(valueFrom(record, "country") || "ALL"),
      network: String(valueFrom(record, "network") || "Uploaded Source"),
      revenue,
      ecpm,
      impressions,
      requests,
      fills,
      clicks,
      fillRate,
      ctr: impressions ? (clicks / impressions) * 100 : 0
    };
  });

  return {
    rows,
    fields: createFieldStatuses(fieldMap),
    issues: analyzeCsvIssues(rows, fieldMap)
  };
}

function analyzeCsvIssues(rows: MetricRow[], fieldMap: Map<CsvField, string>): IssueKey[] {
  const issues = new Set<IssueKey>();
  const dates = new Set(rows.map((row) => row.date));
  const optionalFields: CsvField[] = ["appName", "placementName", "country", "network", "ecpm", "requests", "fills"];

  if (optionalFields.some((field) => !fieldMap.has(field))) {
    issues.add("fallbackIssue");
  }

  if (dates.size < 2) {
    issues.add("twoDatesIssue");
  }

  if (!fieldMap.has("requests") || !fieldMap.has("fills") || rows.every((row) => row.requests === 0 || row.fills === 0)) {
    issues.add("fillIssue");
  }

  if (!fieldMap.has("ecpm")) {
    issues.add("ecpmIssue");
  }

  if (rows.some((row) => row.impressions > 0 && row.impressions < 1000)) {
    issues.add("lowVolumeIssue");
  }

  return [...issues];
}

function sum(rows: MetricRow[], field: "revenue" | "impressions" | "requests" | "fills") {
  return rows.reduce((total, row) => total + row[field], 0);
}

function percentChange(current: number, previous: number) {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

function pct(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function totals(rows: MetricRow[]) {
  const requests = sum(rows, "requests");
  const fills = sum(rows, "fills");
  const impressions = sum(rows, "impressions");
  const revenue = sum(rows, "revenue");
  return {
    revenue,
    impressions,
    ecpm: impressions ? (revenue / impressions) * 1000 : 0,
    fillRate: requests ? (fills / requests) * 100 : 0
  };
}

function chooseDriver(changes: Record<Driver, number>): Driver {
  const dropDrivers: Array<{ driver: Driver; change: number }> = [
    { driver: "fillRate" as const, change: changes.fillRate },
    { driver: "ecpm" as const, change: changes.ecpm },
    { driver: "impressions" as const, change: changes.impressions },
    { driver: "revenue" as const, change: changes.revenue }
  ].filter((item) => item.change < -3);

  return dropDrivers.sort((a, b) => a.change - b.change)[0]?.driver ?? "revenue";
}

function segmentKey(row: MetricRow) {
  return `${row.appName}|${row.placementName}|${row.country}|${row.network}`;
}

function segmentLabelFromKey(key: string) {
  const [appName, placementName, country, network] = key.split("|");
  return `${appName} / ${placementName} / ${country} / ${network}`;
}

function buildBreakdowns(currentRows: MetricRow[], previousRows: MetricRow[]): BreakdownRow[] {
  const keys = new Set([...currentRows.map(segmentKey), ...previousRows.map(segmentKey)]);

  return [...keys]
    .map((key) => {
      const current = totals(currentRows.filter((row) => segmentKey(row) === key));
      const previous = totals(previousRows.filter((row) => segmentKey(row) === key));
      const changes = {
        revenue: percentChange(current.revenue, previous.revenue),
        impressions: percentChange(current.impressions, previous.impressions),
        ecpm: percentChange(current.ecpm, previous.ecpm),
        fillRate: percentChange(current.fillRate, previous.fillRate)
      };

      return {
        key,
        label: segmentLabelFromKey(key),
        current,
        previous,
        changes,
        driver: chooseDriver(changes),
        revenueDelta: current.revenue - previous.revenue
      };
    })
    .filter((item) => item.revenueDelta < 0)
    .sort((a, b) => a.revenueDelta - b.revenueDelta);
}

function diagnose(rows: MetricRow[]) {
  const dates = [...new Set(rows.map((row) => row.date))].sort();
  const currentDate = dates.at(-1);
  const previousDate = dates.at(-2);
  const currentRows = rows.filter((row) => row.date === currentDate);
  const previousRows = rows.filter((row) => row.date === previousDate);
  const current = totals(currentRows);
  const previous = totals(previousRows);
  const changes = {
    revenue: percentChange(current.revenue, previous.revenue),
    impressions: percentChange(current.impressions, previous.impressions),
    ecpm: percentChange(current.ecpm, previous.ecpm),
    fillRate: percentChange(current.fillRate, previous.fillRate)
  };

  const driver = chooseDriver(changes);
  const breakdowns = buildBreakdowns(currentRows, previousRows);
  const previousByKey = new Map(
    previousRows.map((row) => [segmentKey(row), row])
  );
  const largestDrop = currentRows
    .map((row) => {
      const previousRow = previousByKey.get(segmentKey(row));
      return { row, previousRow, delta: row.revenue - (previousRow?.revenue ?? 0) };
    })
    .filter((item) => item.previousRow)
    .sort((a, b) => a.delta - b.delta)[0];

  return {
    current,
    previous,
    changes,
    currentDate,
    previousDate,
    driver,
    breakdowns,
    largestDrop,
    hasDrop: changes.revenue <= -5
  };
}

export default function DemoPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [rows, setRows] = useState<MetricRow[]>(demoRows);
  const [fieldStatuses, setFieldStatuses] = useState<FieldStatus[]>(createFieldStatuses());
  const [csvIssues, setCsvIssues] = useState<IssueKey[]>([]);
  const [source, setSource] = useState<"demo" | "sample" | "upload" | "paste">("demo");
  const [error, setError] = useState("");
  const [pastedCsv, setPastedCsv] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedResult, setCopiedResult] = useState(false);
  const [manualCopyText, setManualCopyText] = useState("");
  const t = copy[lang];
  const report = useMemo(() => diagnose(rows), [rows]);
  const sourceLabel =
    source === "upload" ? t.sourceUpload : source === "paste" ? t.sourcePaste : source === "sample" ? t.sourceSample : t.sourceDemo;
  const dataIssues = useMemo(() => {
    const issues = new Set(csvIssues);
    if (rows.length > 0 && report.previousDate && report.currentDate && !report.largestDrop) {
      issues.add("rowMatchIssue");
    }
    return [...issues];
  }, [csvIssues, report.currentDate, report.largestDrop, report.previousDate, rows.length]);
  const hasRequiredFields = fieldStatuses
    .filter((field) => field.required)
    .every((field) => Boolean(field.matchedHeader));
  const diagnosisText = useMemo(() => {
    const largestDrop = report.largestDrop
      ? `${report.largestDrop.row.appName} / ${report.largestDrop.row.placementName} / ${report.largestDrop.row.country} / ${report.largestDrop.row.network}: ${money(report.largestDrop.previousRow?.revenue ?? 0)} -> ${money(report.largestDrop.row.revenue)}`
      : "No row-level drop found";
    const topBreakdowns = report.breakdowns.slice(0, 3).map((item) => {
      return `- ${item.label}: ${money(item.previous.revenue)} -> ${money(item.current.revenue)} (${pct(item.changes.revenue)}), ${t.driverLabels[item.driver]}`;
    });

    if (lang === "zh") {
      return [
        "eCPM Bazaar 诊断结果",
        `对比周期：${report.previousDate ?? "上一天"} -> ${report.currentDate ?? "最近一天"}`,
        `收入：${money(report.previous.revenue)} -> ${money(report.current.revenue)} (${pct(report.changes.revenue)})`,
        `加权 eCPM：${money(report.previous.ecpm)} -> ${money(report.current.ecpm)} (${pct(report.changes.ecpm)})`,
        `展示量：${Math.round(report.previous.impressions).toLocaleString("en-US")} -> ${Math.round(report.current.impressions).toLocaleString("en-US")} (${pct(report.changes.impressions)})`,
        `填充率：${report.previous.fillRate.toFixed(1)}% -> ${report.current.fillRate.toFixed(1)}% (${pct(report.changes.fillRate)})`,
        `最可能原因：${t.driverLabels[report.driver]}`,
        `最大下滑：${largestDrop}`,
        topBreakdowns.length ? "主要下滑分组：" : "",
        ...topBreakdowns,
        `优先排查：${t.advice[report.driver]}`,
        "Demo: https://ecpmbazaar.com/demo/"
      ].filter(Boolean).join("\n");
    }

    return [
      "eCPM Bazaar diagnosis",
      `Period: ${report.previousDate ?? "previous day"} -> ${report.currentDate ?? "latest day"}`,
      `Revenue: ${money(report.previous.revenue)} -> ${money(report.current.revenue)} (${pct(report.changes.revenue)})`,
      `Weighted eCPM: ${money(report.previous.ecpm)} -> ${money(report.current.ecpm)} (${pct(report.changes.ecpm)})`,
      `Impressions: ${Math.round(report.previous.impressions).toLocaleString("en-US")} -> ${Math.round(report.current.impressions).toLocaleString("en-US")} (${pct(report.changes.impressions)})`,
      `Fill rate: ${report.previous.fillRate.toFixed(1)}% -> ${report.current.fillRate.toFixed(1)}% (${pct(report.changes.fillRate)})`,
      `Likely driver: ${t.driverLabels[report.driver]}`,
      `Largest row-level drop: ${largestDrop}`,
      topBreakdowns.length ? "Top segment drops:" : "",
      ...topBreakdowns,
      `Check first: ${t.advice[report.driver]}`,
      "Demo: https://ecpmbazaar.com/demo/"
    ].filter(Boolean).join("\n");
  }, [lang, report, t.advice, t.driverLabels]);

  async function onUpload(file?: File) {
    if (!file) return;
    try {
      const parsed = parseCsv(await file.text());
      setRows(parsed.rows);
      setFieldStatuses(parsed.fields);
      setCsvIssues(parsed.issues);
      setSource("upload");
      setError("");
      setManualCopyText("");
    } catch {
      setError(t.parseError);
    }
  }

  function analyzePastedCsv() {
    try {
      const parsed = parseCsv(pastedCsv);
      setRows(parsed.rows);
      setFieldStatuses(parsed.fields);
      setCsvIssues(parsed.issues);
      setSource("paste");
      setError("");
      setManualCopyText("");
    } catch {
      setError(t.parseError);
    }
  }

  function loadSample() {
    const parsed = parseCsv(sampleCsv);
    setRows(parsed.rows);
    setFieldStatuses(parsed.fields);
    setCsvIssues(parsed.issues);
    setSource("sample");
    setError("");
    setPastedCsv(sampleCsv);
    setManualCopyText("");
  }

  function resetDemo() {
    setRows(demoRows);
    setFieldStatuses(createFieldStatuses());
    setCsvIssues([]);
    setSource("demo");
    setError("");
    setPastedCsv("");
    setManualCopyText("");
  }

  async function copyDemoLink() {
    const url = typeof window === "undefined" ? "" : window.location.href;
    if (await writeClipboardText(url)) {
      setCopied(true);
      setManualCopyText("");
      window.setTimeout(() => setCopied(false), 1600);
    } else {
      setCopied(false);
      setManualCopyText(url);
    }
  }

  async function copyDiagnosis() {
    if (await writeClipboardText(diagnosisText)) {
      setCopiedResult(true);
      setManualCopyText("");
      window.setTimeout(() => setCopiedResult(false), 1600);
    } else {
      setCopiedResult(false);
      setManualCopyText(diagnosisText);
    }
  }

  return (
    <main className="demo-page" lang={lang === "zh" ? "zh-CN" : "en"}>
      <nav className="demo-nav" aria-label="Demo navigation">
        <a href="../">
          <ArrowLeft size={17} aria-hidden="true" />
          {t.back}
        </a>
        <div className="language-switch" aria-label={lang === "zh" ? "语言" : "Language"}>
          <button aria-pressed={lang === "zh"} className={lang === "zh" ? "active" : ""} onClick={() => setLang("zh")}>
            中文
          </button>
          <button aria-pressed={lang === "en"} className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
            English
          </button>
        </div>
      </nav>

      <section className="demo-hero">
        <div>
          <p className="eyebrow">
            <Play size={16} aria-hidden="true" />
            {t.badge}
          </p>
          <h1>{t.title}</h1>
          <p>{t.lede}</p>
        </div>
        <div className="demo-actions">
          <button className="primary-action" type="button" onClick={loadSample}>
            <Table2 size={18} aria-hidden="true" />
            {t.useSample}
          </button>
          <a
            className="secondary-action"
            download="ecpm-bazaar-sample.csv"
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(sampleCsv)}`}
          >
            <Download size={18} aria-hidden="true" />
            {t.downloadSample}
          </a>
          <label className="secondary-action upload-action">
            <FileUp size={18} aria-hidden="true" />
            {t.upload}
            <input accept=".csv,text/csv" type="file" onChange={(event) => onUpload(event.target.files?.[0])} />
          </label>
          <button className="ghost-action" type="button" onClick={copyDemoLink}>
            <Copy size={17} aria-hidden="true" />
            {copied ? t.copied : t.copyLink}
          </button>
          <button className="ghost-action" type="button" onClick={resetDemo}>
            <RotateCcw size={17} aria-hidden="true" />
            {t.reset}
          </button>
        </div>
      </section>

      <section className="demo-status">
        <span>{sourceLabel}</span>
        <span>{rows.length} {t.rows}</span>
        <span>{t.uploadHelp}</span>
      </section>
      <section className="demo-privacy">
        <ShieldCheck size={18} aria-hidden="true" />
        <span>{t.privacy}</span>
        <a href="../privacy/">{lang === "zh" ? "查看数据安全说明" : "View data safety"}</a>
      </section>
      {error ? <p className="demo-error">{error}</p> : null}

      <section className="demo-panel paste-panel" aria-label={t.pasteCsv}>
        <div className="demo-panel-header">
          <div>
            <p className="section-label">
              <Clipboard size={16} aria-hidden="true" />
              {t.pasteCsv}
            </p>
            <h2>{t.pasteCsvTitle}</h2>
          </div>
        </div>
        <p>{t.pasteCsvHelp}</p>
        <textarea
          aria-label={t.pasteCsvTitle}
          placeholder={t.pastePlaceholder}
          value={pastedCsv}
          onChange={(event) => setPastedCsv(event.target.value)}
        />
        <div className="paste-actions">
          <button className="primary-action" type="button" onClick={analyzePastedCsv}>
            <Table2 size={18} aria-hidden="true" />
            {t.analyzePastedCsv}
          </button>
          <button className="secondary-action" type="button" onClick={() => setPastedCsv("")}>
            <RotateCcw size={17} aria-hidden="true" />
            {t.clearPaste}
          </button>
        </div>
      </section>

      <section className="demo-assist-grid" aria-label={lang === "zh" ? "CSV 检查" : "CSV checks"}>
        <article className="demo-panel field-check-panel">
          <div className="demo-panel-header">
            <div>
              <p className="section-label">{t.fieldCheck}</p>
              <h2>{hasRequiredFields ? t.ready : t.needsWork}</h2>
            </div>
            <a href="../templates/">
              <Download size={17} aria-hidden="true" />
              {t.templates}
            </a>
          </div>
          <div className="field-chip-grid">
            {fieldStatuses.map((field) => (
              <span className={field.matchedHeader ? "field-chip matched" : "field-chip missing"} key={field.field}>
                <strong>{field.label}</strong>
                <em>{field.required ? t.required : t.recommended}</em>
                <small>{field.matchedHeader ? `${t.matched}: ${field.matchedHeader}` : t.missing}</small>
              </span>
            ))}
          </div>
        </article>

        <article className="demo-panel quality-panel">
          <div className="demo-panel-header">
            <div>
              <p className="section-label">{t.dataQuality}</p>
              <h2>{dataIssues.length ? `${dataIssues.length} ${lang === "zh" ? "条提示" : "notes"}` : t.ready}</h2>
            </div>
          </div>
          <div className="quality-list">
            {dataIssues.length ? (
              dataIssues.map((issue) => (
                <span key={issue}>
                  <AlertTriangle size={17} aria-hidden="true" />
                  {t[issue]}
                </span>
              ))
            ) : (
              <span className="quality-good">
                <CheckCircle2 size={17} aria-hidden="true" />
                {lang === "zh" ? "字段和对比数据足够开始一次基础诊断。" : "Fields and comparison data are enough for a basic diagnosis."}
              </span>
            )}
          </div>
        </article>
      </section>

      <section className="demo-grid">
        <article className="demo-panel diagnosis-panel">
          <div className="demo-panel-header">
            <div>
              <p className="section-label">{t.diagnosis}</p>
              <h2>{report.hasDrop ? t.headlineDrop : t.headlineStable}</h2>
            </div>
            <div className="diagnosis-tools">
              <span className={report.hasDrop ? "diagnosis-badge warning" : "diagnosis-badge good"}>
                {report.hasDrop ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
                {pct(report.changes.revenue)}
              </span>
              <button className="copy-result-button" type="button" onClick={copyDiagnosis}>
                <Copy size={16} aria-hidden="true" />
                {copiedResult ? t.copied : t.copyResult}
              </button>
            </div>
          </div>

          <p className="diagnosis-summary">
            {report.largestDrop
              ? `${t.summaryPrefix} ${report.largestDrop.row.appName} / ${report.largestDrop.row.placementName} / ${report.largestDrop.row.country} / ${report.largestDrop.row.network}: ${money(report.largestDrop.previousRow?.revenue ?? 0)} -> ${money(report.largestDrop.row.revenue)} ${t.summarySuffix}`
              : t.noRows}
          </p>

          <div className="driver-callout">
            <span>{t.likelyDriver}</span>
            <strong>{t.driverLabels[report.driver]}</strong>
            <p>{t.advice[report.driver]}</p>
          </div>

          {manualCopyText ? (
            <div className="manual-copy-panel">
              <strong>{t.manualCopyTitle}</strong>
              <p>{t.manualCopyHelp}</p>
              <textarea readOnly value={manualCopyText} onFocus={(event) => event.currentTarget.select()} />
            </div>
          ) : null}
        </article>

        <article className="demo-panel metric-panel">
          {[
            { label: t.totalRevenue, value: money(report.current.revenue), change: report.changes.revenue },
            { label: t.weightedEcpm, value: money(report.current.ecpm), change: report.changes.ecpm },
            { label: t.impressions, value: Math.round(report.current.impressions).toLocaleString("en-US"), change: report.changes.impressions },
            { label: t.fillRate, value: `${report.current.fillRate.toFixed(1)}%`, change: report.changes.fillRate }
          ].map((metric) => (
            <div className="demo-metric" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <em className={metric.change < 0 ? "negative" : "positive"}>{pct(metric.change)}</em>
            </div>
          ))}
        </article>
      </section>

      <section className="demo-panel breakdown-panel" aria-label={t.driverBreakdown}>
        <div className="demo-panel-header">
          <div>
            <p className="section-label">{t.driverBreakdown}</p>
            <h2>{t.driverBreakdownTitle}</h2>
          </div>
        </div>
        <p className="breakdown-note">{t.driverBreakdownNote}</p>
        {report.breakdowns.length ? (
          <div className="breakdown-table-wrap">
            <table className="breakdown-table">
              <thead>
                <tr>
                  <th>{t.segment}</th>
                  <th>{t.revenueChange}</th>
                  <th>{t.ecpmChange}</th>
                  <th>{t.impressionChange}</th>
                  <th>{t.fillChange}</th>
                  <th>{t.reason}</th>
                </tr>
              </thead>
              <tbody>
                {report.breakdowns.slice(0, 5).map((item) => (
                  <tr key={item.key}>
                    <td className="segment-cell">
                      <strong>{item.label}</strong>
                      <small>
                        {money(item.previous.revenue)}
                        {" -> "}
                        {money(item.current.revenue)}
                      </small>
                    </td>
                    <td>
                      <strong className="delta-negative">{money(item.revenueDelta)}</strong>
                      <span>{pct(item.changes.revenue)}</span>
                    </td>
                    <td>
                      {money(item.previous.ecpm)}
                      {" -> "}
                      {money(item.current.ecpm)}
                      <span className={item.changes.ecpm < 0 ? "delta-negative" : "delta-positive"}>{pct(item.changes.ecpm)}</span>
                    </td>
                    <td>
                      {Math.round(item.previous.impressions).toLocaleString("en-US")}
                      {" -> "}
                      {Math.round(item.current.impressions).toLocaleString("en-US")}
                      <span className={item.changes.impressions < 0 ? "delta-negative" : "delta-positive"}>
                        {pct(item.changes.impressions)}
                      </span>
                    </td>
                    <td>
                      {item.previous.fillRate.toFixed(1)}%
                      {" -> "}
                      {item.current.fillRate.toFixed(1)}%
                      <span className={item.changes.fillRate < 0 ? "delta-negative" : "delta-positive"}>
                        {pct(item.changes.fillRate)}
                      </span>
                    </td>
                    <td>
                      <span className="driver-tag">{t.driverLabels[item.driver]}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty-breakdown">{t.noBreakdown}</p>
        )}
      </section>

      <section className="demo-panel data-panel">
        <div className="demo-panel-header">
          <h2>{t.dataPreview}</h2>
          <a href="../free-diagnosis/">
            <Mail size={17} aria-hidden="true" />
            {t.contact}
          </a>
        </div>
        <div className="demo-table-wrap">
          <table className="demo-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>App</th>
                <th>Placement</th>
                <th>Country</th>
                <th>Source</th>
                <th>Revenue</th>
                <th>eCPM</th>
                <th>Impressions</th>
                <th>Fill</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${row.date}-${row.appName}-${row.placementName}-${row.country}-${index}`}>
                  <td>{row.date}</td>
                  <td>{row.appName}</td>
                  <td>{row.placementName}</td>
                  <td>{row.country}</td>
                  <td>{row.network}</td>
                  <td>{money(row.revenue)}</td>
                  <td>{money(row.ecpm)}</td>
                  <td>{row.impressions.toLocaleString("en-US")}</td>
                  <td>{row.fillRate.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
