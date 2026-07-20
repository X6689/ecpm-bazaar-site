"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Copy, Mail, Send } from "lucide-react";
import { writeClipboardText } from "@/lib/clipboard";
import { publicContactMailto } from "@/lib/site-contact";
import { trackEvent } from "@/lib/validation-events";

type Lang = "en" | "zh";

export type DiagnosisRequestPreset = {
  key: string;
  platform?: string;
  changeIndex?: number;
  periodIndex?: number;
  notes?: string;
  dataSample?: string;
};

type FormSource = "direct" | "case" | "sample" | "demo-draft";

type CopyEmailPanelProps = {
  body: string;
  fieldList: string;
  lang?: Lang;
  mailto: string;
  preset?: DiagnosisRequestPreset | null;
  formSource?: FormSource;
};

const platformOptions = ["AdMob", "Unity Ads", "AppLovin MAX", "Unity LevelPlay / ironSource", "TopOn", "Other"];
const mediationOptions = ["None", "AdMob mediation", "AppLovin MAX", "Unity LevelPlay / ironSource", "TopOn", "Not sure"];
const adFormatOptions = ["Rewarded", "Interstitial", "Banner", "Mixed"];
const dauRangeOptions = ["<1k", "1k-10k", "10k-100k", "100k+", "Not sure"];
const monthlyRevenueOptions = ["Under $100", "$100–$500", "$500–$2,000", "$2,000–$10,000", "$10,000+", "Prefer not to say"];
const reportHistoryOptions = ["2–6 days", "7–13 days", "14–29 days", "30+ days", "Not sure"];
const appStatusOptions = ["Live app with active ad traffic", "Soft launch", "Recently launched", "Testing only"];
const optionValues = {
  change: [
    "Revenue dropped",
    "eCPM dropped",
    "Fill / match rate dropped",
    "Impressions dropped",
    "Country mix changed",
    "Placement performance changed",
    "Ad source stopped filling",
    "Peak-hour traffic changed",
    "Not sure"
  ],
  period: ["Latest day vs previous day", "Last 7 days vs previous 7 days", "Custom period"]
};

const copy = {
  en: {
    emailLabel: "Your email",
    platformLabel: "Ad platform",
    mediationLabel: "Mediation",
    adFormatLabel: "Main ad format",
    topGeoLabel: "Top GEO",
    dauRangeLabel: "DAU range",
    monthlyRevenueLabel: "Approx monthly ad revenue",
    reportHistoryLabel: "Report history available",
    appStatusLabel: "App status",
    metricLabel: "Approx metrics",
    metricPlaceholder: "Example: eCPM $4.20, ARPDAU $0.035, fill rate 62%, impressions/DAU 2.4",
    changeLabel: "Main concern",
    periodLabel: "Comparison period",
    changedLabel: "What changed?",
    changedPlaceholder: "Example: US rewarded video revenue dropped yesterday, but impressions were almost stable.",
    rowsLabel: "Anonymized rows or field notes",
    submit: "Generate email draft",
    formNote: "The form runs in your browser and opens your email app. No account credentials, API keys, or private user data.",
    opened: "Email draft opened. If nothing appeared, copy the generated request below.",
    openStarter: "Open starter draft",
    copiedRequest: "Copied request",
    copyRequest: "Copy generated request",
    copiedTemplate: "Copied template",
    copyTemplate: "Copy email template",
    copiedFields: "Copied fields",
    copyFields: "Copy field list",
    emailFallback: "[your email]",
    notesFallback: "[briefly describe what changed and what you already checked]",
    rowsFallback: "paste rows with fields",
    requestIntro: "Hi eCPM Bazaar,",
    requestLine: "I would like a free ad revenue change diagnosis.",
    contactLine: "My contact email",
    platformLine: "Platform",
    mediationLine: "Mediation",
    adFormatLine: "Main ad format",
    topGeoLine: "Top GEO",
    dauRangeLine: "DAU range",
    monthlyRevenueLine: "Approx monthly ad revenue",
    reportHistoryLine: "Report history available",
    appStatusLine: "App status",
    metricLine: "Approx metrics",
    changeLine: "Main change",
    periodLine: "Comparison period",
    outputLine: "Preferred output: diagnosis card + paste-ready short report",
    contextLine: "Context / question:",
    rowsLine: "Anonymized data rows or column notes:",
    safetyLine: "I will not send login credentials, API keys, private account IDs, or non-anonymized user data.",
    subject: "Free eCPM Bazaar diagnosis request",
    changeLabels: optionValues.change,
    periodLabels: optionValues.period
  },
  zh: {
    emailLabel: "你的邮箱",
    platformLabel: "广告平台",
    mediationLabel: "聚合平台",
    adFormatLabel: "主要广告形式",
    topGeoLabel: "主要 GEO",
    dauRangeLabel: "DAU 范围",
    monthlyRevenueLabel: "每月广告收入大致范围",
    reportHistoryLabel: "可用的报表历史",
    appStatusLabel: "App 状态",
    metricLabel: "大致指标",
    metricPlaceholder: "示例：eCPM $4.20，ARPDAU $0.035，填充率 62%，展示/DAU 2.4",
    changeLabel: "主要关注的问题",
    periodLabel: "对比周期",
    changedLabel: "发生了什么变化？",
    changedPlaceholder: "示例：美国激励视频昨天收入下降，但展示量基本稳定。",
    rowsLabel: "脱敏数据行或字段说明",
    submit: "生成邮件草稿",
    formNote: "表单只在浏览器里运行，并打开你的邮件 App。不需要账号密码、API key 或私密用户数据。",
    opened: "邮件草稿已打开。如果没有弹出，请复制下方生成的请求内容。",
    openStarter: "打开基础草稿",
    copiedRequest: "已复制请求",
    copyRequest: "复制生成请求",
    copiedTemplate: "已复制模板",
    copyTemplate: "复制邮件模板",
    copiedFields: "已复制字段",
    copyFields: "复制字段列表",
    emailFallback: "[你的邮箱]",
    notesFallback: "[简单描述收入变化，以及你已经检查过什么]",
    rowsFallback: "粘贴包含这些字段的数据行",
    requestIntro: "Hi eCPM Bazaar,",
    requestLine: "我想申请一次免费的广告收入变化诊断。",
    contactLine: "我的联系邮箱",
    platformLine: "平台",
    mediationLine: "聚合平台",
    adFormatLine: "主要广告形式",
    topGeoLine: "主要 GEO",
    dauRangeLine: "DAU 范围",
    monthlyRevenueLine: "每月广告收入大致范围",
    reportHistoryLine: "可用的报表历史",
    appStatusLine: "App 状态",
    metricLine: "大致指标",
    changeLine: "主要变化",
    periodLine: "对比周期",
    outputLine: "希望输出：诊断卡 + 可复制短报告",
    contextLine: "背景 / 问题：",
    rowsLine: "脱敏数据行或字段说明：",
    safetyLine: "我不会发送登录凭证、API key、私密账号 ID 或未脱敏的用户级数据。",
    subject: "Free eCPM Bazaar diagnosis request",
    changeLabels: ["收入下降", "eCPM 下降", "填充率 / 匹配率下降", "展示量下降", "国家结构变化", "广告位表现变化", "广告源停止填充", "高峰时段流量变化", "不确定"],
    periodLabels: ["最近一天 vs 前一天", "最近 7 天 vs 前 7 天", "自定义周期"]
  }
};

function trimOrFallback(value: string, fallback: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

export function CopyEmailPanel({ body, fieldList, lang = "en", mailto, preset, formSource = "direct" }: CopyEmailPanelProps) {
  const [copied, setCopied] = useState<"request" | "body" | "fields" | null>(null);
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState(platformOptions[0]);
  const [mediation, setMediation] = useState(mediationOptions[0]);
  const [adFormat, setAdFormat] = useState(adFormatOptions[0]);
  const [topGeo, setTopGeo] = useState("");
  const [dauRange, setDauRange] = useState(dauRangeOptions[0]);
  const [monthlyRevenue, setMonthlyRevenue] = useState(monthlyRevenueOptions[5]);
  const [reportHistory, setReportHistory] = useState(reportHistoryOptions[4]);
  const [appStatus, setAppStatus] = useState(appStatusOptions[0]);
  const [metrics, setMetrics] = useState("");
  const [changeIndex, setChangeIndex] = useState(0);
  const [periodIndex, setPeriodIndex] = useState(0);
  const [notes, setNotes] = useState("");
  const formStartedRef = useRef(false);
  const [dataSample, setDataSample] = useState("");
  const [openedDraft, setOpenedDraft] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    if (!preset) {
      return;
    }

    if (preset.platform && platformOptions.includes(preset.platform)) {
      setPlatform(preset.platform);
    }

    if (typeof preset.changeIndex === "number") {
      setChangeIndex(preset.changeIndex);
    }

    if (typeof preset.periodIndex === "number") {
      setPeriodIndex(preset.periodIndex);
    }

    setNotes(preset.notes ?? "");
    setDataSample(preset.dataSample ?? "");
    setOpenedDraft(false);
  }, [preset]);

  const diagnosisRequest = [
    t.requestIntro,
    "",
    t.requestLine,
    "",
    `${t.contactLine}: ${trimOrFallback(email, t.emailFallback)}`,
    `${t.platformLine}: ${platform}`,
    `${t.mediationLine}: ${mediation}`,
    `${t.adFormatLine}: ${adFormat}`,
    `${t.topGeoLine}: ${trimOrFallback(topGeo, "[US / Tier 1 / Tier 3 / mixed / other]")}`,
    `${t.dauRangeLine}: ${dauRange}`,
    `${t.monthlyRevenueLine}: ${monthlyRevenue}`,
    `${t.reportHistoryLine}: ${reportHistory}`,
    `${t.appStatusLine}: ${appStatus}`,
    `${t.metricLine}: ${trimOrFallback(metrics, "[eCPM / ARPDAU / fill rate / impressions per DAU]")}`,
    `${t.changeLine}: ${t.changeLabels[changeIndex]}`,
    `${t.periodLine}: ${t.periodLabels[periodIndex]}`,
    t.outputLine,
    "",
    t.contextLine,
    trimOrFallback(notes, t.notesFallback),
    "",
    t.rowsLine,
    trimOrFallback(dataSample, `[${t.rowsFallback}: ${fieldList}]`),
    "",
    t.safetyLine
  ].join("\n");

  const diagnosisMailto = `${publicContactMailto}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(diagnosisRequest)}`;

  async function copyText(kind: "request" | "body" | "fields", text: string) {
    if (await writeClipboardText(text)) {
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 1600);
    } else {
      setCopied(null);
    }
  }

  function trackFormStarted() {
    if (formStartedRef.current) {
      return;
    }

    formStartedRef.current = true;
    trackEvent("diagnosis_form_started", { page_path: "/free-diagnosis/", form_source: formSource });
  }

  function trackDraftGenerated() {
    trackEvent("email_draft_generated", { page_path: "/free-diagnosis/", form_source: formSource });
  }

  function openDraft() {
    trackFormStarted();
    trackDraftGenerated();
    setOpenedDraft(true);
    window.location.href = diagnosisMailto;
  }

  return (
    <div className="copy-panel">
      <form
        className="diagnosis-request-form"
        onFocus={trackFormStarted}
        onSubmit={(event) => {
          event.preventDefault();
          openDraft();
        }}
      >
        <div className="form-grid">
          <label className="form-field">
            <span>{t.emailLabel}</span>
            <input
              autoComplete="email"
              inputMode="email"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label className="form-field">
            <span>{t.platformLabel}</span>
            <select value={platform} onChange={(event) => setPlatform(event.target.value)}>
              {platformOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span>{t.mediationLabel}</span>
            <select value={mediation} onChange={(event) => setMediation(event.target.value)}>
              {mediationOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span>{t.adFormatLabel}</span>
            <select value={adFormat} onChange={(event) => setAdFormat(event.target.value)}>
              {adFormatOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span>{t.topGeoLabel}</span>
            <input placeholder="US / Tier 1 / BR / IN / mixed" value={topGeo} onChange={(event) => setTopGeo(event.target.value)} />
          </label>
          <label className="form-field">
            <span>{t.dauRangeLabel}</span>
            <select value={dauRange} onChange={(event) => setDauRange(event.target.value)}>
              {dauRangeOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span>{t.monthlyRevenueLabel}</span>
            <select value={monthlyRevenue} onChange={(event) => setMonthlyRevenue(event.target.value)}>
              {monthlyRevenueOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span>{t.reportHistoryLabel}</span>
            <select value={reportHistory} onChange={(event) => setReportHistory(event.target.value)}>
              {reportHistoryOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span>{t.appStatusLabel}</span>
            <select value={appStatus} onChange={(event) => setAppStatus(event.target.value)}>
              {appStatusOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span>{t.changeLabel}</span>
            <select value={changeIndex} onChange={(event) => setChangeIndex(Number(event.target.value))}>
              {optionValues.change.map((option, index) => (
                <option key={option} value={index}>
                  {t.changeLabels[index]}
                </option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span>{t.periodLabel}</span>
            <select value={periodIndex} onChange={(event) => setPeriodIndex(Number(event.target.value))}>
              {optionValues.period.map((option, index) => (
                <option key={option} value={index}>
                  {t.periodLabels[index]}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field form-wide">
            <span>{t.metricLabel}</span>
            <input placeholder={t.metricPlaceholder} value={metrics} onChange={(event) => setMetrics(event.target.value)} />
          </label>

          <label className="form-field form-wide">
            <span>{t.changedLabel}</span>
            <textarea placeholder={t.changedPlaceholder} value={notes} onChange={(event) => setNotes(event.target.value)} />
          </label>

          <label className="form-field form-wide">
            <span>{t.rowsLabel}</span>
            <textarea
              placeholder={`date,gameName,platform,adNetwork,mediation,adFormat,placementName,adUnit,country,revenue,ecpm,arpDau,dau,impressions,impressionsPerDau,requests,matchedRequests,fills,matchRate,fillRate\n2026-06-14,Game A,Android,AdMob,AppLovin MAX,Rewarded,Rewarded Home,Rewarded_01,US,128.42,18.70,0.035,3650,6868,1.88,9200,7600,7100,82.6,77.2`}
              value={dataSample}
              onChange={(event) => setDataSample(event.target.value)}
            />
          </label>
        </div>

        <div className="form-footer">
          <button className="primary-action" type="submit">
            <Send size={18} aria-hidden="true" />
            {t.submit}
          </button>
          <p>{t.formNote}</p>
        </div>
        {openedDraft ? <p className="form-status">{t.opened}</p> : null}
      </form>

      <div className="copy-actions">
        <a
          className="primary-action"
          href={mailto}
          onClick={() => {
            trackFormStarted();
            trackDraftGenerated();
          }}
        >
          <Mail size={18} aria-hidden="true" />
          {t.openStarter}
        </a>
        <button className="copy-action-button" type="button" onClick={() => copyText("request", diagnosisRequest)}>
          {copied === "request" ? <CheckCircle2 size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
          {copied === "request" ? t.copiedRequest : t.copyRequest}
        </button>
        <button className="copy-action-button" type="button" onClick={() => copyText("body", body)}>
          {copied === "body" ? <CheckCircle2 size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
          {copied === "body" ? t.copiedTemplate : t.copyTemplate}
        </button>
        <button className="copy-action-button" type="button" onClick={() => copyText("fields", fieldList)}>
          {copied === "fields" ? <CheckCircle2 size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
          {copied === "fields" ? t.copiedFields : t.copyFields}
        </button>
      </div>
      <pre className="email-template">{diagnosisRequest}</pre>
    </div>
  );
}
