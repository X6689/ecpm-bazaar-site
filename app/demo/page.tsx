"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Download,
  FileUp,
  Mail,
  Play,
  RotateCcw,
  ShieldCheck,
  Table2
} from "lucide-react";
import { demoRows } from "@/lib/demo-data";
import type { MetricRow } from "@/lib/types";

type Lang = "en" | "zh";
type Driver = "revenue" | "impressions" | "ecpm" | "fillRate";

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
    privacy: "CSV files are parsed in your browser for this public demo. Nothing is uploaded or stored.",
    contact: "Free diagnosis",
    sourceSample: "Sample CSV loaded",
    sourceDemo: "Built-in demo data",
    sourceUpload: "Uploaded CSV",
    diagnosis: "Diagnosis",
    headlineStable: "No major revenue drop detected",
    headlineDrop: "Revenue drop detected",
    likelyDriver: "Likely driver",
    nextCheck: "What to check first",
    totalRevenue: "Revenue",
    weightedEcpm: "Weighted eCPM",
    impressions: "Impressions",
    fillRate: "Fill rate",
    rows: "rows",
    dataPreview: "Data preview",
    noRows: "No rows loaded yet.",
    parseError: "Could not read this CSV. Check the column names and try again.",
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
    privacy: "这个公开演示只在浏览器本地解析 CSV，不上传、不保存你的文件。",
    contact: "免费诊断",
    sourceSample: "已载入样例 CSV",
    sourceDemo: "内置演示数据",
    sourceUpload: "已上传 CSV",
    diagnosis: "诊断结论",
    headlineStable: "没有发现明显收入下滑",
    headlineDrop: "发现收入下滑",
    likelyDriver: "最可能原因",
    nextCheck: "优先排查",
    totalRevenue: "收入",
    weightedEcpm: "加权 eCPM",
    impressions: "展示量",
    fillRate: "填充率",
    rows: "行数据",
    dataPreview: "数据预览",
    noRows: "还没有载入数据。",
    parseError: "无法读取这个 CSV，请检查字段名后再试。",
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

function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (const char of line) {
    if (char === "\"") {
      inQuotes = !inQuotes;
      continue;
    }
    if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }

  values.push(current.trim());
  return values;
}

function parseCsv(text: string): MetricRow[] {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const headers = parseCsvLine(lines[0] ?? "").map((header) => header.trim());
  if (!headers.includes("date") || !headers.includes("revenue") || !headers.includes("impressions")) {
    throw new Error("Missing required columns");
  }

  return lines.slice(1).map((line, index) => {
    const values = parseCsvLine(line);
    const record = Object.fromEntries(headers.map((header, columnIndex) => [header, values[columnIndex] ?? ""]));
    const requests = numberValue(record.requests);
    const fills = numberValue(record.fills);
    const impressions = numberValue(record.impressions);
    const revenue = numberValue(record.revenue);
    const ecpm = numberValue(record.ecpm) || (impressions ? (revenue / impressions) * 1000 : 0);
    const fillRate = numberValue(record.fillRate) || (requests ? (fills / requests) * 100 : 0);
    const clicks = numberValue(record.clicks);

    return {
      date: String(record.date || `row-${index + 1}`),
      appId: String(record.appId || record.appName || "app").toLowerCase().replace(/\s+/g, "_"),
      appName: String(record.appName || "Uploaded App"),
      placementId: String(record.placementId || record.placementName || "placement").toLowerCase().replace(/\s+/g, "_"),
      placementName: String(record.placementName || "All Placements"),
      country: String(record.country || "ALL"),
      network: String(record.network || record.adSource || "Uploaded Source"),
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

  const dropDrivers: Array<{ driver: Driver; change: number }> = [
    { driver: "fillRate" as const, change: changes.fillRate },
    { driver: "ecpm" as const, change: changes.ecpm },
    { driver: "impressions" as const, change: changes.impressions },
    { driver: "revenue" as const, change: changes.revenue }
  ].filter((item) => item.change < -3);
  const driver = (dropDrivers.sort((a, b) => a.change - b.change)[0]?.driver ?? "revenue") as Driver;

  const previousByKey = new Map(
    previousRows.map((row) => [`${row.appName}|${row.placementName}|${row.country}|${row.network}`, row])
  );
  const largestDrop = currentRows
    .map((row) => {
      const previousRow = previousByKey.get(`${row.appName}|${row.placementName}|${row.country}|${row.network}`);
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
    largestDrop,
    hasDrop: changes.revenue <= -5
  };
}

export default function DemoPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [rows, setRows] = useState<MetricRow[]>(demoRows);
  const [source, setSource] = useState<"demo" | "sample" | "upload">("demo");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedResult, setCopiedResult] = useState(false);
  const t = copy[lang];
  const report = useMemo(() => diagnose(rows), [rows]);
  const sourceLabel = source === "upload" ? t.sourceUpload : source === "sample" ? t.sourceSample : t.sourceDemo;
  const diagnosisText = useMemo(() => {
    const largestDrop = report.largestDrop
      ? `${report.largestDrop.row.appName} / ${report.largestDrop.row.placementName} / ${report.largestDrop.row.country} / ${report.largestDrop.row.network}: ${money(report.largestDrop.previousRow?.revenue ?? 0)} -> ${money(report.largestDrop.row.revenue)}`
      : "No row-level drop found";

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
        `优先排查：${t.advice[report.driver]}`,
        "Demo: https://ecpmbazaar.com/demo/"
      ].join("\n");
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
      `Check first: ${t.advice[report.driver]}`,
      "Demo: https://ecpmbazaar.com/demo/"
    ].join("\n");
  }, [lang, report, t.advice, t.driverLabels]);

  async function onUpload(file?: File) {
    if (!file) return;
    try {
      setRows(parseCsv(await file.text()));
      setSource("upload");
      setError("");
    } catch {
      setError(t.parseError);
    }
  }

  function loadSample() {
    setRows(parseCsv(sampleCsv));
    setSource("sample");
    setError("");
  }

  async function copyDemoLink() {
    const url = typeof window === "undefined" ? "" : window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  async function copyDiagnosis() {
    try {
      await navigator.clipboard.writeText(diagnosisText);
      setCopiedResult(true);
      window.setTimeout(() => setCopiedResult(false), 1600);
    } catch {
      setCopiedResult(false);
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
          <button className="ghost-action" type="button" onClick={() => setRows(demoRows)}>
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
      </section>
      {error ? <p className="demo-error">{error}</p> : null}

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
