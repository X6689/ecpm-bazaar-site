"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Database, KeyRound, RefreshCw, Rocket, ToggleLeft } from "lucide-react";
import { evaluateAlerts } from "@/lib/alerts";
import { demoRows } from "@/lib/demo-data";
import type { DataSnapshot, MetricRow } from "@/lib/types";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const number = new Intl.NumberFormat("en-US");

function sum(rows: MetricRow[], field: "revenue" | "impressions" | "requests" | "fills" | "clicks") {
  return rows.reduce((total, row) => total + row[field], 0);
}

function weightedEcpm(rows: MetricRow[]) {
  const impressions = sum(rows, "impressions");
  const revenue = sum(rows, "revenue");
  return impressions ? (revenue / impressions) * 1000 : 0;
}

function trendRows(rows: MetricRow[]) {
  const byDate = new Map<string, { date: string; revenue: number; ecpm: number; impressions: number }>();
  for (const row of rows) {
    const existing = byDate.get(row.date) ?? { date: row.date, revenue: 0, ecpm: 0, impressions: 0 };
    existing.revenue += row.revenue;
    existing.impressions += row.impressions;
    existing.ecpm = existing.impressions ? (existing.revenue / existing.impressions) * 1000 : 0;
    byDate.set(row.date, existing);
  }
  return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
}

function linePath(values: number[], width: number, height: number, max: number) {
  if (values.length === 0) return "";
  return values
    .map((value, index) => {
      const x = values.length === 1 ? width / 2 : (index / (values.length - 1)) * width;
      const y = height - (max ? value / max : 0) * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function SimpleTrendChart({ rows }: { rows: MetricRow[] }) {
  const trend = trendRows(rows);
  const width = 760;
  const height = 220;
  const revenueMax = Math.max(...trend.map((row) => row.revenue), 1);
  const ecpmMax = Math.max(...trend.map((row) => row.ecpm), 1);
  const revenuePath = linePath(
    trend.map((row) => row.revenue),
    width,
    height,
    revenueMax
  );
  const ecpmPath = linePath(
    trend.map((row) => row.ecpm),
    width,
    height,
    ecpmMax
  );

  return (
    <div className="svg-chart" role="img" aria-label="Revenue and eCPM trend chart">
      <svg viewBox={`0 0 ${width + 70} ${height + 56}`} preserveAspectRatio="none">
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = 12 + ratio * height;
          return <line className="grid-line" x1="48" x2={width + 48} y1={y} y2={y} key={ratio} />;
        })}
        <g transform="translate(48 12)">
          <path className="line revenue-line" d={revenuePath} />
          <path className="line ecpm-line" d={ecpmPath} />
          {trend.map((row, index) => {
            const x = trend.length === 1 ? width / 2 : (index / (trend.length - 1)) * width;
            return (
              <g key={row.date}>
                <text className="axis-label" x={x} y={height + 24} textAnchor={index === 0 ? "start" : "end"}>
                  {row.date}
                </text>
              </g>
            );
          })}
        </g>
        <text className="axis-label" x="2" y="18">
          {money.format(revenueMax)}
        </text>
        <text className="axis-label" x={width + 66} y="18" textAnchor="end">
          {money.format(ecpmMax)}
        </text>
      </svg>
      <div className="legend">
        <span>
          <i className="legend-dot revenue-dot" /> Revenue
        </span>
        <span>
          <i className="legend-dot ecpm-dot" /> eCPM
        </span>
      </div>
    </div>
  );
}

function buildOptimizationTips(rows: MetricRow[]) {
  if (rows.length === 0) {
    return [
      "接入真实开发者账号后，优先看 eCPM、Fill rate、Revenue 三个指标是否同时变化。",
      "第一版告警建议每天跑一次，先发现 eCPM 跌幅超过 25% 的 App/广告位/国家组合。",
      "试点开发者需要提供可撤销的 Publisher Key 或子权限 Key，避免使用主账号密码。"
    ];
  }

  const lowFill = [...rows].sort((a, b) => a.fillRate - b.fillRate)[0];
  const highEcpm = [...rows].sort((a, b) => b.ecpm - a.ecpm)[0];
  const weakRevenue = [...rows].sort((a, b) => a.revenue - b.revenue)[0];

  return [
    `${lowFill.appName} / ${lowFill.placementName} 的填充率最低，是优先排查广告源瀑布流和国家流量质量的入口。`,
    `${highEcpm.country} 的 eCPM 最高，可以作为预算和买量国家的参考样本。`,
    `${weakRevenue.appName} / ${weakRevenue.placementName} 收入最低，建议结合展示量判断是流量不足还是单价不足。`
  ];
}

export function Dashboard({ initialSnapshot }: { initialSnapshot: DataSnapshot }) {
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [mode, setMode] = useState<"real" | "demo">(initialSnapshot.rows.length ? "real" : "demo");

  async function refreshSnapshot() {
    const response = await fetch("/api/snapshot");
    setSnapshot(await response.json());
  }

  const realRows = snapshot.rows;
  const rows = mode === "demo" ? demoRows : realRows;
  const effectiveAlerts = mode === "demo" ? evaluateAlerts(demoRows) : snapshot.alerts;
  const realConnectedEmpty = snapshot.source === "topon" && realRows.length === 0;
  const tips = buildOptimizationTips(rows);
  const totals = useMemo(() => {
    const requests = sum(rows, "requests");
    const fills = sum(rows, "fills");
    return {
      revenue: sum(rows, "revenue"),
      ecpm: weightedEcpm(rows),
      impressions: sum(rows, "impressions"),
      fillRate: requests ? (fills / requests) * 100 : 0
    };
  }, [rows]);

  return (
    <main className="page">
      <div className="shell">
        <header className="topbar">
          <div className="brand">
            <div className="mark">eB</div>
            <div>
              <h1>eCPM Bazaar</h1>
              <p className="subtle">Ad monetization data desk for real API runs</p>
            </div>
          </div>
          <div className="pill">
            <Database size={15} />
            {mode === "demo" ? "DEMO VIEW" : snapshot.source.toUpperCase()} /{" "}
            {new Date(snapshot.updatedAt).toLocaleString()}
          </div>
        </header>

        <section className="mode-bar panel">
          <div>
            <h2>{mode === "demo" ? "Demo value preview" : "Real TopOn workspace"}</h2>
            <p>
              {mode === "demo"
                ? "Use demo rows to show developers the dashboard, alerts, and optimization workflow before they connect data."
                : "Use synced TopOn report data for developer-facing monitoring and diagnosis."}
            </p>
          </div>
          <div className="segmented" aria-label="Data mode">
            <button className={mode === "real" ? "active" : ""} onClick={() => setMode("real")}>
              Real
            </button>
            <button className={mode === "demo" ? "active" : ""} onClick={() => setMode("demo")}>
              Demo
            </button>
          </div>
        </section>

        <section className="grid metrics">
          <div className="panel metric">
            <div className="metric-label">Revenue</div>
            <div className="metric-value">{money.format(totals.revenue)}</div>
          </div>
          <div className="panel metric">
            <div className="metric-label">Weighted eCPM</div>
            <div className="metric-value">{money.format(totals.ecpm)}</div>
          </div>
          <div className="panel metric">
            <div className="metric-label">Impressions</div>
            <div className="metric-value">{number.format(totals.impressions)}</div>
          </div>
          <div className="panel metric">
            <div className="metric-label">Fill rate</div>
            <div className="metric-value">{totals.fillRate.toFixed(1)}%</div>
          </div>
        </section>

        {realConnectedEmpty ? (
          <section className="empty-state panel">
            <div>
              <h2>TopOn API connected, no report data yet</h2>
              <p>
                The Publisher Key is valid and the full-report request completed successfully. This TopOn account has no
                monetization records in the current date window yet.
              </p>
            </div>
            <div className="empty-actions">
              <code>npm run sync:topon</code>
              <span>Run again after the app starts generating impressions or revenue.</span>
            </div>
          </section>
        ) : null}

        <section className="grid playbook">
          <div className="panel guide-panel">
            <div className="guide-icon">
              <KeyRound size={18} />
            </div>
            <div>
              <h2>接入状态</h2>
              <p>
                {snapshot.source === "topon"
                  ? "Publisher Key 已通过真实 API 验证。当前账号暂无变现记录，可以继续邀请已有收入的开发者试点。"
                  : "当前使用 demo 数据。填入 TopOn Publisher Key 后运行同步即可切换真实 API。"}
              </p>
            </div>
          </div>
          <div className="panel guide-panel">
            <div className="guide-icon">
              <Rocket size={18} />
            </div>
            <div>
              <h2>开发者接入向导</h2>
              <ol>
                <li>开发者在 TopOn 后台生成 Publisher Key 或子权限 Key。</li>
                <li>只读接入报表数据，不索要账号密码，不要求广告后台操作权限。</li>
                <li>同步最近 7-10 天数据，输出 eCPM、收入、填充率异常诊断。</li>
              </ol>
            </div>
          </div>
          <div className="panel guide-panel">
            <div className="guide-icon">
              <ToggleLeft size={18} />
            </div>
            <div>
              <h2>Demo / 真实数据双模式</h2>
              <p>没有真实数据时展示产品价值；接入开发者账号后切换到真实数据并保留同一套图表和告警。</p>
            </div>
          </div>
        </section>

        <section className="grid main">
          <div className="grid">
            <div className="panel">
              <div className="panel-header">
                <h2>Revenue and eCPM trend</h2>
                <button className="icon-button" onClick={refreshSnapshot} aria-label="Refresh snapshot">
                  <RefreshCw size={17} />
                </button>
              </div>
              <div className="chart">
                <SimpleTrendChart rows={rows} />
              </div>
            </div>

            <div className="panel table-wrap">
              <div className="panel-header">
                <h2>Developer rows</h2>
                <span className="subtle">{rows.length} rows</span>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>App</th>
                    <th>Placement</th>
                    <th>Country</th>
                    <th>Network</th>
                    <th>Revenue</th>
                    <th>eCPM</th>
                    <th>Impressions</th>
                    <th>Fill</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={`${row.date}-${row.appId}-${row.placementId}-${row.country}`}>
                      <td>{row.date}</td>
                      <td>{row.appName}</td>
                      <td>{row.placementName}</td>
                      <td>{row.country}</td>
                      <td>{row.network}</td>
                      <td>{money.format(row.revenue)}</td>
                      <td>{money.format(row.ecpm)}</td>
                      <td>{number.format(row.impressions)}</td>
                      <td>{row.fillRate.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="panel">
            <div className="panel-header">
              <h2>Alerts</h2>
              <AlertTriangle size={17} />
            </div>
            {effectiveAlerts.length ? (
              <div className="alert-list">
                {effectiveAlerts.map((alert) => (
                  <div className={`alert ${alert.severity}`} key={alert.id}>
                    <div className="alert-title">{alert.title}</div>
                    <p className="subtle">{alert.message}</p>
                    <p className="subtle">
                      {alert.previous?.toFixed(2)} to {alert.current?.toFixed(2)} on {alert.date}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty">No active alerts for the current snapshot.</div>
            )}

            <div className="panel-subsection">
              <div className="mini-title">
                <CheckCircle2 size={16} />
                Optimization notes
              </div>
              <ul className="tip-list">
                {tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
