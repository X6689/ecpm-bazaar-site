import type { ReactNode } from "react";
import { ArrowRight, Check, ShieldCheck, TriangleAlert } from "lucide-react";

type Tone = "neutral" | "positive" | "warning" | "danger" | "dark";

export function SectionChapterHeader({
  number,
  eyebrow,
  title,
  description,
  action
}: {
  number?: string;
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="chapter-header">
      <div className="chapter-header-copy">
        <p className="chapter-eyebrow">
          {number ? <span>{number}</span> : null}
          {eyebrow}
        </p>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div className="chapter-header-action">{action}</div> : null}
    </div>
  );
}

export function MetricTile({ label, value, delta, tone = "neutral", detail }: { label: string; value: string; delta?: string; tone?: Tone; detail?: string }) {
  return (
    <article className={`metric-tile metric-tile-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <div>
        {delta ? <em>{delta}</em> : null}
        {detail ? <small>{detail}</small> : null}
      </div>
    </article>
  );
}

function pointsFromValues(values: number[], width: number, height: number, padding: number) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  return values
    .map((value, index) => {
      const x = padding + (index / Math.max(1, values.length - 1)) * (width - padding * 2);
      const y = height - padding - ((value - min) / range) * (height - padding * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function MiniSparkline({
  label,
  values,
  tone = "neutral",
  currentLabel,
  previousLabel,
  className = ""
}: {
  label: string;
  values: number[];
  tone?: Tone;
  currentLabel?: string;
  previousLabel?: string;
  className?: string;
}) {
  const line = pointsFromValues(values, 260, 88, 10);
  const last = line.split(" ").at(-1)?.split(",") ?? ["250", "44"];

  return (
    <div className={`mini-sparkline mini-sparkline-${tone} ${className}`.trim()}>
      <div className="mini-sparkline-labels">
        <span>{previousLabel ?? "Previous"}</span>
        <strong>{label}</strong>
        <span>{currentLabel ?? "Current"}</span>
      </div>
      <svg viewBox="0 0 260 88" role="img" aria-label={`${label} trend, directional sample data`}>
        <title>{`${label} trend, directional sample data`}</title>
        <line x1="10" x2="250" y1="22" y2="22" stroke="currentColor" strokeDasharray="3 5" opacity="0.2" />
        <line x1="10" x2="250" y1="66" y2="66" stroke="currentColor" strokeDasharray="3 5" opacity="0.2" />
        <polyline points={line} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        <circle cx={last[0]} cy={last[1]} r="4.5" fill="currentColor" />
      </svg>
    </div>
  );
}

export function PeriodComparisonChart({
  label = "Revenue comparison",
  previous = 100,
  current = 79,
  previousLabel = "Previous period",
  currentLabel = "Current period"
}: {
  label?: string;
  previous?: number;
  current?: number;
  previousLabel?: string;
  currentLabel?: string;
}) {
  const max = Math.max(previous, current, 1);
  const previousHeight = Math.max(12, (previous / max) * 104);
  const currentHeight = Math.max(12, (current / max) * 104);

  return (
    <figure className="period-comparison-chart">
      <figcaption>{label}</figcaption>
      <svg viewBox="0 0 280 166" role="img" aria-label={`${label}: ${previousLabel} ${previous}, ${currentLabel} ${current}. Directional sample.`}>
        <title>{`${label}: ${previousLabel} ${previous}, ${currentLabel} ${current}. Directional sample.`}</title>
        <line x1="26" x2="262" y1="132" y2="132" stroke="currentColor" opacity="0.2" />
        <line x1="26" x2="262" y1="78" y2="78" stroke="currentColor" strokeDasharray="3 5" opacity="0.16" />
        <rect x="62" y={132 - previousHeight} width="48" height={previousHeight} rx="4" fill="currentColor" opacity="0.34" />
        <rect x="170" y={132 - currentHeight} width="48" height={currentHeight} rx="4" fill="currentColor" />
        <path d="M86 52 C122 48 148 68 194 59" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.55" />
        <text x="86" y="153" textAnchor="middle">{previousLabel}</text>
        <text x="194" y="153" textAnchor="middle">{currentLabel}</text>
      </svg>
    </figure>
  );
}

export function DiagnosisPreview({ lang = "en" }: { lang?: "en" | "zh" }) {
  const text = lang === "zh"
    ? {
        sample: "样例数据 / 方向性诊断",
        title: "收入变化概览",
        revenue: "收入",
        impressions: "展示量",
        fill: "填充率",
        ecpm: "加权 eCPM",
        driver: "最可能驱动因素",
        driverValue: "填充率下降",
        signal: "支持信号",
        action: "先检查广告源可用性与聚合设置。"
      }
    : {
        sample: "Sample data / directional diagnosis",
        title: "Revenue change overview",
        revenue: "Revenue",
        impressions: "Impressions",
        fill: "Fill rate",
        ecpm: "Weighted eCPM",
        driver: "Most likely driver",
        driverValue: "Fill rate dropped",
        signal: "Supporting signal",
        action: "Check source availability and mediation settings first."
      };

  return (
    <aside className="diagnosis-preview-visual" aria-label={text.title}>
      <div className="diagnosis-preview-topline">
        <span>{text.sample}</span>
        <span className="status-dot">Needs confirmation</span>
      </div>
      <div className="diagnosis-preview-heading">
        <div>
          <p>{text.title}</p>
          <strong>14 Jun - 15 Jun</strong>
        </div>
        <span className="preview-window">2 periods</span>
      </div>
      <div className="diagnosis-preview-metrics">
        <MetricTile label={text.revenue} value="$428" delta="-18.4%" tone="danger" />
        <MetricTile label={text.impressions} value="21.4k" delta="+0.8%" tone="positive" />
        <MetricTile label={text.fill} value="54.2%" delta="-21.8%" tone="danger" />
        <MetricTile label={text.ecpm} value="$3.84" delta="+2.6%" tone="positive" />
      </div>
      <div className="diagnosis-preview-chart-row">
        <MiniSparkline label={text.revenue} values={[100, 104, 97, 99, 84, 81]} tone="danger" />
        <PeriodComparisonChart label={text.revenue} previous={100} current={82} previousLabel="P1" currentLabel="P2" />
      </div>
      <div className="diagnosis-driver-card">
        <TriangleAlert size={18} aria-hidden="true" />
        <div>
          <span>{text.driver}</span>
          <strong>{text.driverValue}</strong>
        </div>
      </div>
      <div className="diagnosis-signal-row">
        <span>{text.signal}</span>
        <strong>Impressions stable / Fill down / eCPM stable</strong>
      </div>
      <p className="diagnosis-preview-action">{text.action}</p>
    </aside>
  );
}

export function DriverSignalMap({ items }: { items: Array<{ label: string; value: string; score: number; tone?: Tone }> }) {
  return (
    <div className="driver-signal-map" aria-label="Driver signal map">
      {items.map((item) => (
        <div className={`driver-signal-row driver-signal-${item.tone ?? "neutral"}`} key={item.label}>
          <span>{item.label}</span>
          <div aria-hidden="true"><i style={{ width: `${Math.min(100, Math.max(8, item.score))}%` }} /></div>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}

export function DiagnosisFlow({ steps }: { steps: ReadonlyArray<{ number: string; title: string; text: string }> }) {
  return (
    <ol className="diagnosis-flow">
      {steps.map((step, index) => (
        <li key={step.number}>
          <span className="diagnosis-flow-index">{step.number}</span>
          <div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
          {index < steps.length - 1 ? <ArrowRight className="diagnosis-flow-arrow" size={22} aria-hidden="true" /> : null}
        </li>
      ))}
    </ol>
  );
}

export function CaseMiniChart({ type, label }: { type: "pricing" | "fill" | "geo" | "timing"; label: string }) {
  const values = {
    pricing: [82, 83, 80, 80, 68, 62],
    fill: [85, 84, 83, 82, 64, 55],
    geo: [68, 70, 69, 67, 59, 55],
    timing: [82, 86, 89, 55, 52, 79]
  }[type];
  const line = pointsFromValues(values, 232, 88, 10);
  const className = type === "geo" ? "warning" : type === "timing" ? "neutral" : "danger";

  return (
    <figure className={`case-mini-chart case-mini-chart-${className}`}>
      <figcaption>{label}</figcaption>
      <svg viewBox="0 0 232 88" role="img" aria-label={`${label}, directional sample chart`}>
        <title>{`${label}, directional sample chart`}</title>
        <line x1="10" x2="222" y1="44" y2="44" stroke="currentColor" strokeDasharray="3 5" opacity="0.25" />
        <polyline points={line} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {type === "timing" ? <rect x="114" y="9" width="44" height="70" fill="currentColor" opacity="0.11" /> : null}
      </svg>
    </figure>
  );
}

export function DataSafetyDiagram({ lang = "en" }: { lang?: "en" | "zh" }) {
  const items = lang === "zh" ? ["脱敏 CSV", "浏览器解析", "诊断结果"] : ["Anonymized CSV", "Browser parser", "Diagnosis result"];
  return (
    <div className="data-safety-diagram" aria-label={lang === "zh" ? "数据安全流程" : "Data safety flow"}>
      {items.map((item, index) => (
        <div key={item}>
          <span>{index + 1}</span>
          <strong>{item}</strong>
          {index < items.length - 1 ? <ArrowRight size={20} aria-hidden="true" /> : null}
        </div>
      ))}
    </div>
  );
}

export function ExampleOutputCard({ lang = "en" }: { lang?: "en" | "zh" }) {
  const t = lang === "zh"
    ? {
        label: "示例输出 / 方向性诊断",
        driver: "最可能驱动因素",
        driverValue: "较低价值 GEO 占比上升",
        signals: "支持信号",
        checks: "先检查",
        limits: "数据限制：样例只有两个可比周期。"
      }
    : {
        label: "Example output / directional diagnosis",
        driver: "Most likely driver",
        driverValue: "Lower-value GEO share increased",
        signals: "Supporting signals",
        checks: "First checks",
        limits: "Data limitation: sample has two comparable periods."
      };

  return (
    <aside className="example-output-card">
      <p>{t.label}</p>
      <div className="example-output-driver">
        <span>{t.driver}</span>
        <strong>{t.driverValue}</strong>
      </div>
      <div className="example-output-signal">
        <span>{t.signals}</span>
        <p>Tier 1 pricing stable. Lower-value impression share increased.</p>
      </div>
      <div className="example-output-checks">
        <span>{t.checks}</span>
        <ul>
          <li><Check size={14} aria-hidden="true" /> Compare country impression share</li>
          <li><Check size={14} aria-hidden="true" /> Keep country eCPM separate</li>
          <li><Check size={14} aria-hidden="true" /> Review acquisition changes</li>
        </ul>
      </div>
      <small>{t.limits}</small>
    </aside>
  );
}

export function ResourceFeatureCard({
  label,
  title,
  text,
  href,
  size = "medium",
  icon,
  action = "Open"
}: {
  label: string;
  title: string;
  text?: string;
  href: string;
  size?: "large" | "medium" | "small";
  icon?: ReactNode;
  action?: string;
}) {
  return (
    <a className={`resource-feature-card resource-feature-${size}`} href={href}>
      <div className="resource-feature-topline">
        <span>{label}</span>
        {icon}
      </div>
      <div>
        <h3>{title}</h3>
        {text ? <p>{text}</p> : null}
      </div>
      <strong>{action} <ArrowRight size={15} aria-hidden="true" /></strong>
    </a>
  );
}

export function SafetyChecklist({ items }: { items: readonly string[] }) {
  return (
    <ul className="safety-checklist">
      {items.map((item) => (
        <li key={item}><ShieldCheck size={16} aria-hidden="true" />{item}</li>
      ))}
    </ul>
  );
}

export function TopicGlyph({ topic }: { topic: "Revenue" | "Traffic" | "Fill" | "GEO" | "Placement" | "Source" | "Pricing" | "Timing" }) {
  const icon = {
    Revenue: <path d="M12 39V25l18-12 16 11 18-14 24 12" />,
    Traffic: <><path d="M12 42h56" /><path d="M17 35 31 24l12 7 16-17 13 10" /></>,
    Fill: <><path d="M16 14h48L46 32v16l-12 7V32z" /><path d="M28 23h23" /></>,
    GEO: <><circle cx="40" cy="34" r="24" /><path d="M16 34h48M40 10c8 8 10 16 10 24s-2 16-10 24c-8-8-10-16-10-24s2-16 10-24" /></>,
    Placement: <><rect x="14" y="12" width="52" height="44" rx="4" /><path d="M25 25h30M25 35h18M25 45h25" /></>,
    Source: <><circle cx="20" cy="18" r="6" /><circle cx="60" cy="18" r="6" /><circle cx="40" cy="52" r="6" /><path d="M25 22 35 47M55 22 45 47M26 18h28" /></>,
    Pricing: <><path d="M18 47 31 32l12 7 19-23" /><path d="M57 16h5v5" /><path d="M19 54h42" /></>,
    Timing: <><circle cx="40" cy="34" r="23" /><path d="M40 20v15l11 7" /></>
  }[topic];

  return (
    <svg className="topic-glyph" viewBox="0 0 80 68" role="img" aria-label={`${topic} signal`} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <title>{`${topic} signal`}</title>
      {icon}
    </svg>
  );
}
