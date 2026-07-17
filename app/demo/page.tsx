"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
import { acceptedAliasGroups } from "@/lib/content/monetization-terms";
import { CsvParseError, getCsvParseErrorCategory, getMissingRequiredFieldCategory, getUnsupportedFileType, isInvalidNumericValue, type CsvParseErrorCategory } from "@/lib/csv-upload-validation";
import { aggregateDiagnosisRows } from "@/lib/diagnosis-math";
import { demoRows, demoScenarios, fourteenDaySampleRows, metricRowsToCsv, type DemoScenarioId } from "@/lib/demo-data";
import { useLanguagePreference } from "@/lib/language";
import { demoReviewDraftStorageKey, type DemoReviewDraft } from "@/lib/review-draft";
import type { MetricRow } from "@/lib/types";
import { missingRequiredFieldCount, rowCountBucket, trackEvent } from "@/lib/validation-events";
import { SiteFooter } from "../site-footer";

type Driver = "revenue" | "impressions" | "ecpm" | "fillRate" | "countryMix";
type DiagnosisSeverity = "high" | "medium" | "low";
type ComparisonMode = "latest-day" | "last-7-days";
type DemoSampleId = "14-day";
type BreakdownRow = {
  key: string;
  label: string;
  appName: string;
  placementName: string;
  country: string;
  network: string;
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
  | "adUnit"
  | "adFormat"
  | "country"
  | "network"
  | "mediation"
  | "revenue"
  | "ecpm"
  | "impressions"
  | "requests"
  | "matchedRequests"
  | "fills"
  | "clicks"
  | "fillRate"
  | "matchRate";

type FieldStatus = {
  field: CsvField;
  label: string;
  required: boolean;
  matchedHeader?: string;
};

type IssueKey =
  | "fallbackIssue"
  | "twoDatesIssue"
  | "sevenDayIssue"
  | "fillIssue"
  | "ecpmIssue"
  | "matchRateDefinitionNote"
  | "rowMatchIssue"
  | "lowVolumeIssue";

type ParseCsvResult = {
  rows: MetricRow[];
  fields: FieldStatus[];
  issues: IssueKey[];
};
type FeedbackState = {
  usefulness?: "yes" | "no" | "not-sure";
  driverClarity?: "clear" | "partly-clear" | "unclear";
  nextCheck?: "impressions" | "match-fill" | "country-mix" | "placement" | "ad-source" | "time-of-day" | "ecpm" | "not-sure";
};


const fieldLabels: Record<CsvField, string> = {
  date: "date",
  appName: "appName",
  placementName: "placementName",
  adUnit: "adUnit",
  adFormat: "adFormat",
  country: "country",
  network: "network",
  mediation: "mediation",
  revenue: "revenue",
  ecpm: "ecpm",
  impressions: "impressions",
  requests: "requests",
  matchedRequests: "matchedRequests",
  fills: "fills",
  clicks: "clicks",
  fillRate: "fillRate",
  matchRate: "matchRate"
};

const fieldAliases = Object.fromEntries(
  acceptedAliasGroups.map(({ field, aliases }) => [field, [...aliases]])
) as Record<CsvField, string[]>;

const requiredFields: CsvField[] = ["date", "revenue", "impressions"];
const displayFields: CsvField[] = [
  "date",
  "appName",
  "placementName",
  "adUnit",
  "adFormat",
  "country",
  "network",
  "mediation",
  "revenue",
  "ecpm",
  "impressions",
  "requests",
  "matchedRequests",
  "fills",
  "clicks",
  "fillRate",
  "matchRate"
];

const numericFields: CsvField[] = [
  "revenue",
  "ecpm",
  "impressions",
  "requests",
  "matchedRequests",
  "fills",
  "clicks",
  "fillRate",
  "matchRate"
];

function normalizeScenarioId(value: string | null): DemoScenarioId | null {
  if (demoScenarios.some((scenario) => scenario.id === value)) {
    return value as DemoScenarioId;
  }

  return null;
}

function normalizeComparisonMode(value: string | null): ComparisonMode | null {
  if (value === "latest-day" || value === "last-7-days") {
    return value;
  }

  return null;
}

function normalizeSampleId(value: string | null): DemoSampleId | null {
  return value === "14-day" ? value : null;
}

function changeIndexForDriver(driver: Driver) {
  const indexByDriver: Record<Driver, number> = {
    revenue: 0,
    ecpm: 1,
    fillRate: 2,
    impressions: 3,
    countryMix: 4
  };

  return indexByDriver[driver];
}

function periodIndexForComparison(mode: ComparisonMode) {
  return mode === "last-7-days" ? 1 : 0;
}

const copy = {
  en: {
    back: "Back to site",
    badge: "Public demo",
    title: "Diagnose a mobile ad revenue drop in one minute.",
    lede:
      "Use the sample data or upload a CSV. eCPM Bazaar compares the selected period with the previous period and explains whether revenue moved because of eCPM, impressions, fill rate, country, placement, or ad source changes.",
    useSample: "Load sample CSV",
    useFourteenDaySample: "Load 14-day sample",
    downloadSample: "Download current CSV",
    scenarioLabel: "Diagnosis cases",
    scenarioTitle: "Try three common ad revenue drop scenarios",
    scenarioHelp:
      "Switch between anonymized cases to see how the diagnosis changes when the most likely driver is pricing, fill, or traffic mix.",
    comparisonLabel: "Comparison period",
    comparisonTitle: "Choose how to compare the report",
    latestDay: "Latest day",
    latestDayHelp: "Compare the latest date with the previous date.",
    lastSevenDays: "Last 7 days",
    lastSevenDaysHelp: "Compare the latest 7 dates with the previous 7 dates.",
    activeWindow: "Active window",
    copyLink: "Copy demo link",
    copyResult: "Copy diagnosis",
    copied: "Copied",
    reset: "Reset demo",
    upload: "Upload CSV",
    uploadHelp: "CSV columns: date, appName, placementName, country, network, revenue, ecpm, impressions, requests, matchedRequests, fills, clicks.",
    pasteCsv: "Paste CSV",
    pasteCsvTitle: "Paste CSV or copied report rows",
    pasteCsvHelp: "Paste comma-separated CSV or tab-separated rows copied from a spreadsheet export.",
    pastePlaceholder:
      "date,appName,placementName,country,network,revenue,ecpm,impressions,requests,fills,clicks\n2026-06-14,Game A,Rewarded Home,US,AdMob,128.42,18.70,6868,9200,7100,318",
    analyzePastedCsv: "Analyze pasted data",
    clearPaste: "Clear",
    privacy:
      "CSV files are parsed locally in this public demo and are not uploaded. If you choose Request free diagnosis, a compact draft can be kept in this browser session to prefill the next page.",
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
    requestReview: "Request diagnosis",
    sourceSample: "Sample CSV loaded",
    sourceFourteenDaySample: "14-day sample loaded",
    sourceScenario: "Diagnosis case loaded",
    sourceDemo: "Built-in demo data",
    sourceUpload: "Uploaded CSV",
    sourcePaste: "Pasted CSV",
    diagnosis: "Diagnosis",
    headlineStable: "No major revenue drop detected",
    headlineDrop: "Revenue drop detected",
    likelyDriver: "Most likely driver",
    supportingSignals: "Supporting signals",
    recommendedChecks: "Recommended checks",
    whatToAvoid: "What to avoid",
    diagnosisLogic: "Diagnosis logic",
    dataLimitations: "Data limitations",
    nextAction: "Next action",
    driverBreakdown: "Driver breakdown",
    driverBreakdownTitle: "Top segment drops",
    driverBreakdownNote:
      "Ranked by revenue loss across matching app, placement, country, and ad source segments. Use this to decide where to investigate first.",
    segment: "Segment",
    revenueChange: "Revenue change",
    ecpmChange: "eCPM",
    impressionChange: "Impressions",
    fillChange: "Fill",
    reason: "Most likely driver",
    noBreakdown: "No comparable segment drop found for the selected comparison window.",
    shareReport: "Shareable report",
    shareReportTitle: "Copy a diagnosis report",
    shareReportHelp:
      "Use this version in community replies, support emails, or internal notes. It includes driver ranking, suggested checks, and caveats.",
    reportPreview: "Report preview",
    diagnosisCard: "Diagnosis card",
    diagnosisCardTitle: "Share the result as a diagnosis card",
    diagnosisCardHelp:
      "A short card for community replies, X posts, support emails, or a team chat. It keeps the result easy to scan and easy to act on.",
    copyCard: "Copy card text",
    downloadCard: "Download card PNG",
    cardCopied: "Card copied",
    cardDownloaded: "Card downloaded",
    cardProblem: "Problem",
    cardMainCause: "Most likely driver",
    cardSeverity: "Severity",
    cardCountry: "Country",
    cardPlacement: "Placement",
    cardAdSource: "Ad source",
    cardSuggestedAction: "Suggested action",
    cardPeriod: "Period",
    severityLabels: {
      high: "High",
      medium: "Medium",
      low: "Low"
    },
    driverRanking: "Driver ranking",
    checklist: "Recommended checks",
    caveats: "Data limitations",
    copyReport: "Copy report",
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
    parseErrors: {
      unsupported_file_type: "This public demo accepts CSV files only.",
      empty_file: "This CSV has no report rows. Add a header row and at least one row of data, then try again.",
      missing_date: "We could not identify a date column. Rename it to date, report date, or another accepted alias, then try again.",
      missing_revenue: "We could not identify a revenue column. Rename it to revenue, estimated revenue, or another accepted alias, then try again.",
      missing_impressions: "We could not identify an impressions column. Rename it to impressions, ad impressions, or another accepted alias, then try again.",
      invalid_numeric_values: "Some metric values are not valid numbers. Check revenue, impressions, rates, and counts for text or malformed values.",
      insufficient_periods: "Add at least two report dates for a latest-day comparison, or 14 dates for a 7-day comparison.",
      unmapped_columns: "We could not recognize any CSV columns. Use the accepted aliases or start from a CSV template.",
      unknown: "We could not read this CSV. Check the format and accepted column names, then try again."
    },
    acceptedAliases: "View accepted aliases",
    trySample: "Try sample data",
    feedback: {
      title: "Was this diagnosis useful?",
      usefulness: "Did this identify something you had not checked?",
      clarity: "Was the most likely driver understandable?",
      nextCheck: "What will you check next?",
      yes: "Yes",
      no: "No",
      notSure: "Not sure",
      clear: "Clear",
      partlyClear: "Partly clear",
      unclear: "Unclear",
      impressions: "Impressions",
      matchFill: "Match / fill rate",
      countryMix: "Country mix",
      placement: "Placement",
      adSource: "Ad source",
      timeOfDay: "Time of day",
      ecpm: "eCPM"
    },
    fallbackIssue: "Some optional fields are missing, so the diagnosis will be less precise.",
    twoDatesIssue: "Add at least two dates to compare the latest day with the previous day.",
    sevenDayIssue: "Add at least 14 dates for a 7-day comparison. The current diagnosis falls back to latest day vs previous day.",
    fillIssue: "Requests and fills are missing or zero, so fill-rate diagnosis is limited.",
    ecpmIssue: "eCPM was missing for some rows and was calculated from revenue and impressions.",
    matchRateDefinitionNote:
      "Match rate is kept separate from fill rate because platform definitions can differ. Include requests and fills for a fill-rate diagnosis.",
    rowMatchIssue: "No matching app / placement / country / source rows were found across the selected comparison window.",
    lowVolumeIssue: "Some rows have low impressions. Treat row-level eCPM changes carefully.",
    driverLabels: {
      revenue: "Revenue",
      impressions: "Impressions",
      ecpm: "eCPM",
      fillRate: "Fill rate",
      countryMix: "Country mix"
    },
    advice: {
      impressions: "Traffic or placement exposure changed. Check sessions, ad request logic, retention, and recent product releases.",
      ecpm: "Pricing changed. Check country mix, bidder/source performance, floors, seasonality, and mediation waterfall changes.",
      fillRate: "Fill changed. Check match/fill rate by country, ad source availability, floor settings, and platform status.",
      countryMix: "The weighted eCPM moved because impression share shifted between countries. Compare country-level share and eCPM before changing global settings.",
      revenue: "The drop is broad. Start with the largest country, placement, and ad source contributors before changing settings."
    },
    whatToAvoidText: {
      impressions: "Avoid changing floors or mediation before confirming whether user activity, ad requests, or placement exposure moved first.",
      ecpm: "Avoid treating blended eCPM as proof of a global pricing issue before splitting by country, placement, and ad source.",
      fillRate: "Avoid changing price floors first when fewer requests may be turning into filled impressions.",
      countryMix: "Avoid changing global mediation settings before separating a country-share shift from country-level pricing changes.",
      revenue: "Avoid changing multiple settings at once before the largest affected segment is identified."
    },
    diagnosisLogicText: {
      impressions: "Revenue can fall when fewer ads are shown. Impressions, requests, and placement exposure are upstream signals to inspect before pricing.",
      ecpm: "When impressions and fill are comparatively stable while revenue falls, weighted eCPM, demand, source performance, and traffic composition become stronger explanations.",
      fillRate: "When eCPM is comparatively stable but fills fall relative to requests, availability, source behavior, timeout, or mediation conditions may be the stronger explanation.",
      countryMix: "A blended eCPM can fall even when segment-level pricing is stable if lower-eCPM countries gain impression share.",
      revenue: "The supplied rows do not isolate one upstream movement strongly enough, so the next step is to inspect the largest country, placement, and source segment first."
    },
    nextActionText: "Use the recommended checks first. If the report still cannot explain the change, prepare anonymized before/after rows for a directional diagnosis request.",
    summaryPrefix: "The largest drop is concentrated in",
    summarySuffix: "compared with the previous period."
  },
  zh: {
    back: "返回官网",
    badge: "公开演示",
    title: "一分钟诊断移动广告收入为什么下降。",
    lede:
      "使用样例数据或上传 CSV。eCPM Bazaar 会比较所选周期和上一周期，判断收入变化更可能来自 eCPM、展示量、填充率、国家地区、广告位还是广告来源。",
    useSample: "载入样例 CSV",
    useFourteenDaySample: "载入 14 天样例",
    downloadSample: "下载当前 CSV",
    scenarioLabel: "诊断案例",
    scenarioTitle: "试试三类常见广告收入下降场景",
    scenarioHelp: "切换脱敏案例，看看主要原因是单价、填充还是流量结构时，诊断结论会如何变化。",
    comparisonLabel: "对比周期",
    comparisonTitle: "选择报表对比方式",
    latestDay: "最近一天",
    latestDayHelp: "比较最近日期和前一个日期。",
    lastSevenDays: "最近 7 天",
    lastSevenDaysHelp: "比较最近 7 个日期和前 7 个日期。",
    activeWindow: "当前对比",
    copyLink: "复制演示链接",
    copyResult: "复制诊断结果",
    copied: "已复制",
    reset: "重置演示",
    upload: "上传 CSV",
    uploadHelp: "CSV 字段：date, appName, placementName, country, network, revenue, ecpm, impressions, requests, matchedRequests, fills, clicks。",
    pasteCsv: "粘贴 CSV",
    pasteCsvTitle: "粘贴 CSV 或报表行",
    pasteCsvHelp: "可粘贴英文逗号分隔 CSV，也可粘贴从表格导出的制表符分隔行。",
    pastePlaceholder:
      "date,appName,placementName,country,network,revenue,ecpm,impressions,requests,fills,clicks\n2026-06-14,Game A,Rewarded Home,US,AdMob,128.42,18.70,6868,9200,7100,318",
    analyzePastedCsv: "分析粘贴数据",
    clearPaste: "清空",
    privacy:
      "这个公开演示只在浏览器本地解析 CSV，不上传文件。如果选择申请免费诊断，浏览器会在当前会话里保留一份简短草稿，用于预填下一页。",
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
    requestReview: "申请诊断",
    sourceSample: "已载入样例 CSV",
    sourceFourteenDaySample: "已载入 14 天样例",
    sourceScenario: "已载入诊断案例",
    sourceDemo: "内置演示数据",
    sourceUpload: "已上传 CSV",
    sourcePaste: "已粘贴 CSV",
    diagnosis: "诊断结论",
    headlineStable: "没有发现明显收入下滑",
    headlineDrop: "发现收入下滑",
    likelyDriver: "最可能驱动因素",
    supportingSignals: "支持信号",
    recommendedChecks: "推荐检查项",
    whatToAvoid: "避免误判",
    diagnosisLogic: "诊断逻辑",
    dataLimitations: "数据限制",
    nextAction: "下一步动作",
    driverBreakdown: "驱动明细",
    driverBreakdownTitle: "主要下滑分组",
    driverBreakdownNote:
      "按 App、广告位、国家地区、广告源组合聚合，并按收入损失排序。先看这里，再决定优先排查哪里。",
    segment: "分组",
    revenueChange: "收入变化",
    ecpmChange: "eCPM",
    impressionChange: "展示量",
    fillChange: "填充",
    reason: "最可能驱动因素",
    noBreakdown: "当前对比周期内没有找到可比较的下滑分组。",
    shareReport: "可分享报告",
    shareReportTitle: "复制一段诊断报告",
    shareReportHelp:
      "这版适合发到社区回复、邮件或团队沟通里，包含原因排序、建议检查项和注意事项。",
    reportPreview: "报告预览",
    diagnosisCard: "诊断卡",
    diagnosisCardTitle: "把结果变成一张诊断卡",
    diagnosisCardHelp:
      "适合发到社区回复、X、邮件或团队群里。让别人一眼看懂问题、原因和下一步检查项。",
    copyCard: "复制卡片文本",
    downloadCard: "下载卡片 PNG",
    cardCopied: "卡片已复制",
    cardDownloaded: "卡片已下载",
    cardProblem: "问题",
    cardMainCause: "最可能驱动因素",
    cardSeverity: "严重程度",
    cardCountry: "国家地区",
    cardPlacement: "广告位",
    cardAdSource: "广告源",
    cardSuggestedAction: "建议动作",
    cardPeriod: "周期",
    severityLabels: {
      high: "高",
      medium: "中",
      low: "低"
    },
    driverRanking: "原因排序",
    checklist: "推荐检查项",
    caveats: "数据限制",
    copyReport: "复制报告",
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
    parseErrors: {
      unsupported_file_type: "这个公开 Demo 目前只接受 CSV 文件。",
      empty_file: "这个 CSV 没有可用的报表行。请加入表头和至少一行数据后重试。",
      missing_date: "无法识别 date 列。请改为 date、report date 或其他可识别别名后重试。",
      missing_revenue: "无法识别 revenue 列。请改为 revenue、estimated revenue 或其他可识别别名后重试。",
      missing_impressions: "无法识别 impressions 列。请改为 impressions、ad impressions 或其他可识别别名后重试。",
      invalid_numeric_values: "部分指标不是有效数字。请检查收入、展示量、比例和计数列中是否混入文字或格式错误的数值。",
      insufficient_periods: "最近一天对比至少需要两个报表日期，7 天对比至少需要 14 个日期。",
      unmapped_columns: "没有识别到可用的 CSV 列。请使用可识别别名，或从 CSV 模板开始。",
      unknown: "无法读取这个 CSV。请检查格式和可识别字段名后重试。"
    },
    acceptedAliases: "查看可识别别名",
    trySample: "试用样例数据",
    fallbackIssue: "部分可选字段缺失，诊断精度会降低。",
    feedback: {
      title: "这次诊断有帮助吗？",
      usefulness: "它有没有提示你一个之前没有检查过的方向？",
      clarity: "最可能的原因是否容易理解？",
      nextCheck: "你接下来准备先检查什么？",
      yes: "有",
      no: "没有",
      notSure: "不确定",
      clear: "清楚",
      partlyClear: "部分清楚",
      unclear: "不清楚",
      impressions: "展示量",
      matchFill: "匹配率 / 填充率",
      countryMix: "国家结构",
      placement: "广告位",
      adSource: "广告源",
      timeOfDay: "一天中的时段",
      ecpm: "eCPM"
    },
    twoDatesIssue: "至少需要两个日期，才能比较最近一天和前一天。",
    sevenDayIssue: "7 天对比至少需要 14 个日期。当前诊断会退回到最近一天 vs 前一天。",
    fillIssue: "requests 和 fills 缺失或为 0，填充率诊断会受限。",
    ecpmIssue: "部分行缺少 eCPM，已用收入和展示量自动计算。",
    matchRateDefinitionNote:
      "match rate 会与 fill rate 分开保留，因为各平台定义可能不同。诊断填充率时请提供 requests 和 fills。",
    rowMatchIssue: "当前对比周期之间没有找到相同 App / 广告位 / 国家 / 广告源的行。",
    lowVolumeIssue: "部分行展示量较低，行级 eCPM 变化需要谨慎判断。",
    driverLabels: {
      revenue: "收入",
      impressions: "展示量",
      ecpm: "eCPM",
      fillRate: "填充率",
      countryMix: "国家结构"
    },
    advice: {
      impressions: "流量或广告位曝光发生变化。先检查会话、广告请求逻辑、留存和最近产品改动。",
      ecpm: "单价发生变化。先检查国家结构、广告源表现、底价、季节性和瀑布流配置。",
      fillRate: "填充发生变化。先按国家检查 match/fill rate、广告源可用性、底价配置和平台状态。",
      countryMix: "加权 eCPM 变化主要来自国家展示占比变化。先比较各国家展示占比和国家级 eCPM，再改全局配置。",
      revenue: "下滑比较分散。先从贡献最大的国家、广告位和广告来源开始拆解，不急着改配置。"
    },
    whatToAvoidText: {
      impressions: "在确认用户活跃、广告请求或广告位曝光是否先变化前，不要急着改底价或聚合配置。",
      ecpm: "在按国家、广告位和广告源拆分前，不要把混合 eCPM 当作全局价格问题的证据。",
      fillRate: "当更少请求可能转成填充展示时，不要先调整价格底线。",
      countryMix: "在分离国家占比变化和国家级价格变化前，不要改全局聚合设置。",
      revenue: "在定位到最大受影响分组前，不要一次修改多个配置。"
    },
    diagnosisLogicText: {
      impressions: "展示减少会让收入下降。展示量、请求量和广告位曝光都是比价格更上游的信号。",
      ecpm: "当展示和填充相对稳定但收入下降时，加权 eCPM、需求、广告源表现和流量结构更值得优先解释。",
      fillRate: "当 eCPM 相对稳定但 fills 相对 requests 下降时，可用性、广告源行为、超时或聚合条件更可能是原因。",
      countryMix: "即使国家分组价格稳定，只要低 eCPM 国家占比上升，混合 eCPM 也可能下降。",
      revenue: "现有数据不足以明确分离单一上游变化，下一步应先检查损失最大的国家、广告位和广告源分组。"
    },
    nextActionText: "先执行推荐检查项。如果报表仍无法解释变化，再准备前后两个周期的脱敏数据行申请一次方向性诊断。",
    summaryPrefix: "最大下滑集中在",
    summarySuffix: "相较上一周期。"
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
    matchedHeader: fieldMap === undefined ? fieldLabels[field] : fieldMap.get(field)
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

  if (lines.length < 2) {
    throw new CsvParseError("empty_file");
  }

  const delimiter = detectDelimiter(lines[0] ?? "");
  const headers = parseCsvLine(lines[0] ?? "", delimiter).map((header) => header.trim());
  const fieldMap = buildFieldMap(headers);
  if (fieldMap.size === 0) {
    throw new CsvParseError("unmapped_columns");
  }

  const missingRequiredCategory = getMissingRequiredFieldCategory([...fieldMap.keys()]);
  if (missingRequiredCategory) {
    throw new CsvParseError(missingRequiredCategory);
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

    if (numericFields.some((field) => isInvalidNumericValue(valueFrom(record, field)))) {
      throw new CsvParseError("invalid_numeric_values");
    }

    const requests = numberValue(valueFrom(record, "requests"));
    const matchedRequests = numberValue(valueFrom(record, "matchedRequests"));
    const fills = numberValue(valueFrom(record, "fills"));
    const impressions = numberValue(valueFrom(record, "impressions"));
    const revenue = numberValue(valueFrom(record, "revenue"));
    const providedEcpm = numberValue(valueFrom(record, "ecpm"));
    const ecpm = providedEcpm || (impressions ? (revenue / impressions) * 1000 : 0);
    const providedFillRate = numberValue(valueFrom(record, "fillRate"));
    const fillRate = providedFillRate || (requests ? (fills / requests) * 100 : 0);
    const matchRate = numberValue(valueFrom(record, "matchRate"));
    const clicks = numberValue(valueFrom(record, "clicks"));

    return {
      date: String(valueFrom(record, "date") || `row-${index + 1}`),
      appId: String(valueFrom(record, "appName") || "app").toLowerCase().replace(/\s+/g, "_"),
      appName: String(valueFrom(record, "appName") || "Uploaded App"),
      placementId: String(valueFrom(record, "placementName") || valueFrom(record, "adUnit") || valueFrom(record, "adFormat") || "placement")
        .toLowerCase()
        .replace(/\s+/g, "_"),
      placementName: String(valueFrom(record, "placementName") || valueFrom(record, "adUnit") || valueFrom(record, "adFormat") || "All Placements"),
      adUnit: String(valueFrom(record, "adUnit") || "") || undefined,
      adFormat: String(valueFrom(record, "adFormat") || "") || undefined,
      country: String(valueFrom(record, "country") || "ALL"),
      network: String(valueFrom(record, "network") || "Uploaded Source"),
      mediation: String(valueFrom(record, "mediation") || "") || undefined,
      revenue,
      ecpm,
      impressions,
      requests,
      matchedRequests: fieldMap.has("matchedRequests") ? matchedRequests : undefined,
      fills,
      clicks,
      fillRate,
      matchRate: fieldMap.has("matchRate") ? matchRate : undefined,
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

  if (fieldMap.has("matchRate") || fieldMap.has("matchedRequests")) {
    issues.add("matchRateDefinitionNote");
  }

  if (rows.some((row) => row.impressions > 0 && row.impressions < 1000)) {
    issues.add("lowVolumeIssue");
  }

  return [...issues];
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

function chooseSeverity(revenueChange: number): DiagnosisSeverity {
  if (revenueChange <= -25) return "high";
  if (revenueChange <= -10) return "medium";
  return "low";
}

function wrapCanvasText(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    if (context.measureText(word).width > maxWidth) {
      if (current) {
        lines.push(current);
        current = "";
      }
      let fragment = "";
      for (const char of word) {
        const test = `${fragment}${char}`;
        if (context.measureText(test).width <= maxWidth || !fragment) {
          fragment = test;
        } else {
          lines.push(fragment);
          fragment = char;
        }
      }
      if (fragment) current = fragment;
      continue;
    }

    const test = current ? `${current} ${word}` : word;
    if (context.measureText(test).width <= maxWidth || !current) {
      current = test;
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function drawRoundRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.lineTo(x + width - r, y);
  context.quadraticCurveTo(x + width, y, x + width, y + r);
  context.lineTo(x + width, y + height - r);
  context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  context.lineTo(x + r, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - r);
  context.lineTo(x, y + r);
  context.quadraticCurveTo(x, y, x + r, y);
  context.closePath();
}

function totals(rows: MetricRow[]) {
  return aggregateDiagnosisRows(rows);
}

function countryMixChange(currentRows: MetricRow[], previousRows: MetricRow[]) {
  const current = totals(currentRows);
  const previous = totals(previousRows);
  const globalEcpmChange = percentChange(current.ecpm, previous.ecpm);

  if (globalEcpmChange > -5 || current.impressions === 0 || previous.impressions === 0) {
    return 0;
  }

  const countries = new Set([...currentRows.map((row) => row.country), ...previousRows.map((row) => row.country)]);
  let shareShift = 0;
  let weightedCountryEcpmMovement = 0;

  for (const country of countries) {
    const currentCountry = totals(currentRows.filter((row) => row.country === country));
    const previousCountry = totals(previousRows.filter((row) => row.country === country));

    if (previousCountry.impressions === 0 || currentCountry.impressions === 0) {
      continue;
    }

    const previousShare = previousCountry.impressions / previous.impressions;
    const currentShare = currentCountry.impressions / current.impressions;
    const shareDelta = currentShare - previousShare;
    const isLowerValueCountry = previousCountry.ecpm < previous.ecpm * 0.75;
    const isHigherValueCountry = previousCountry.ecpm > previous.ecpm * 1.15;

    if ((isLowerValueCountry && shareDelta > 0.03) || (isHigherValueCountry && shareDelta < -0.03)) {
      shareShift += Math.abs(shareDelta);
    }

    weightedCountryEcpmMovement += Math.abs(percentChange(currentCountry.ecpm, previousCountry.ecpm)) * currentShare;
  }

  if (shareShift >= 0.12 && weightedCountryEcpmMovement < Math.abs(globalEcpmChange) * 0.7) {
    return -Math.max(Math.abs(globalEcpmChange), shareShift * 100);
  }

  return 0;
}

function chooseDriver(changes: Record<Driver, number>): Driver {
  if (changes.countryMix < -5) {
    return "countryMix";
  }

  if (changes.fillRate < -8 && changes.ecpm > -6) {
    return "fillRate";
  }

  if (changes.ecpm < -8 && changes.fillRate > -8) {
    return "ecpm";
  }

  if (changes.impressions < -8 && changes.fillRate > -8) {
    return "impressions";
  }

  const specificDrivers: Array<{ driver: Driver; change: number }> = [
    { driver: "fillRate" as const, change: changes.fillRate },
    { driver: "ecpm" as const, change: changes.ecpm },
    { driver: "impressions" as const, change: changes.impressions },
    { driver: "countryMix" as const, change: changes.countryMix }
  ].filter((item) => item.change < -3);

  return specificDrivers.sort((a, b) => a.change - b.change)[0]?.driver ?? "revenue";
}

function segmentKey(row: MetricRow) {
  return `${row.appName}|${row.placementName}|${row.country}|${row.network}`;
}

function segmentPartsFromKey(key: string) {
  const [appName, placementName, country, network] = key.split("|");
  return { appName, placementName, country, network };
}

function segmentLabelFromKey(key: string) {
  const { appName, placementName, country, network } = segmentPartsFromKey(key);
  return `${appName} / ${placementName} / ${country} / ${network}`;
}

function formatDateWindow(dates: string[]) {
  if (dates.length === 0) {
    return "";
  }

  if (dates.length === 1) {
    return dates[0];
  }

  return `${dates[0]} - ${dates.at(-1)}`;
}

function comparisonWindow(rows: MetricRow[], mode: ComparisonMode) {
  const dates = [...new Set(rows.map((row) => row.date))].sort();
  const canUseSevenDayWindow = mode === "last-7-days" && dates.length >= 14;
  const currentDates = canUseSevenDayWindow ? dates.slice(-7) : dates.slice(-1);
  const previousDates = canUseSevenDayWindow ? dates.slice(-14, -7) : dates.slice(-2, -1);
  const currentDateSet = new Set(currentDates);
  const previousDateSet = new Set(previousDates);

  return {
    currentRows: rows.filter((row) => currentDateSet.has(row.date)),
    previousRows: rows.filter((row) => previousDateSet.has(row.date)),
    currentDate: formatDateWindow(currentDates),
    previousDate: formatDateWindow(previousDates),
    insufficientSevenDayWindow: mode === "last-7-days" && dates.length < 14
  };
}

function buildBreakdowns(currentRows: MetricRow[], previousRows: MetricRow[]): BreakdownRow[] {
  const keys = new Set([...currentRows.map(segmentKey), ...previousRows.map(segmentKey)]);

  return [...keys]
    .map((key) => {
      const parts = segmentPartsFromKey(key);
      const current = totals(currentRows.filter((row) => segmentKey(row) === key));
      const previous = totals(previousRows.filter((row) => segmentKey(row) === key));
      const changes = {
        revenue: percentChange(current.revenue, previous.revenue),
        impressions: percentChange(current.impressions, previous.impressions),
        ecpm: percentChange(current.ecpm, previous.ecpm),
        fillRate: percentChange(current.fillRate, previous.fillRate),
        countryMix: 0
      };

      return {
        key,
        label: segmentLabelFromKey(key),
        ...parts,
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

function diagnose(rows: MetricRow[], comparisonMode: ComparisonMode) {
  const { currentRows, previousRows, currentDate, previousDate, insufficientSevenDayWindow } = comparisonWindow(rows, comparisonMode);
  const current = totals(currentRows);
  const previous = totals(previousRows);
  const changes = {
    revenue: percentChange(current.revenue, previous.revenue),
    impressions: percentChange(current.impressions, previous.impressions),
    ecpm: percentChange(current.ecpm, previous.ecpm),
    fillRate: percentChange(current.fillRate, previous.fillRate),
    countryMix: countryMixChange(currentRows, previousRows)
  };

  const driver = chooseDriver(changes);
  const breakdowns = buildBreakdowns(currentRows, previousRows);
  const largestDrop = breakdowns[0];

  return {
    current,
    previous,
    changes,
    currentDate,
    previousDate,
    driver,
    breakdowns,
    largestDrop,
    insufficientSevenDayWindow,
    hasDrop: changes.revenue <= -5
  };
}

export default function DemoPage() {
  const [lang, setLang] = useLanguagePreference("en");
  const [rows, setRows] = useState<MetricRow[]>(demoRows);
  const [fieldStatuses, setFieldStatuses] = useState<FieldStatus[]>(createFieldStatuses());
  const [csvIssues, setCsvIssues] = useState<IssueKey[]>([]);
  const [source, setSource] = useState<"demo" | "sample" | "sample14" | "scenario" | "upload" | "paste">("demo");
  const [activeScenarioId, setActiveScenarioId] = useState<DemoScenarioId>(demoScenarios[0].id);
  const [comparisonMode, setComparisonMode] = useState<ComparisonMode>("latest-day");
  const [parseErrorCategory, setParseErrorCategory] = useState<CsvParseErrorCategory | null>(null);
  const [pastedCsv, setPastedCsv] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedResult, setCopiedResult] = useState(false);
  const [copiedCard, setCopiedCard] = useState(false);
  const [downloadedCard, setDownloadedCard] = useState(false);
  const [manualCopyText, setManualCopyText] = useState("");
  const t = copy[lang];
  const report = useMemo(() => diagnose(rows, comparisonMode), [comparisonMode, rows]);
  const [feedback, setFeedback] = useState<FeedbackState>({});
  const viewedResultKeys = useRef(new Set<string>());

  const activeScenario = demoScenarios.find((scenario) => scenario.id === activeScenarioId) ?? demoScenarios[0];
  const currentCsv = useMemo(() => metricRowsToCsv(rows), [rows]);
  const sourceLabel =
    source === "upload"
      ? t.sourceUpload
      : source === "paste"
        ? t.sourcePaste
        : source === "sample14"
          ? t.sourceFourteenDaySample
          : source === "sample"
            ? t.sourceSample
            : source === "scenario"
              ? `${t.sourceScenario}: ${activeScenario.title[lang]}`
              : t.sourceDemo;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const linkedComparisonMode = normalizeComparisonMode(params.get("compare"));
    const linkedSampleId = normalizeSampleId(params.get("sample"));
    const linkedScenarioId = normalizeScenarioId(params.get("case"));

    if (linkedSampleId === "14-day") {
      setComparisonMode(linkedComparisonMode ?? "last-7-days");
      const csv = metricRowsToCsv(fourteenDaySampleRows);
      const parsed = parseCsv(csv);
      setRows(parsed.rows);
      setFieldStatuses(parsed.fields);
      setCsvIssues(parsed.issues);
      setParseErrorCategory(null);
      setManualCopyText("");
      setFeedback({});
      trackEvent("sample_demo_started", { page_path: "/demo/", source_cta: "shared-link", comparison_period: linkedComparisonMode ?? "last-7-days", sample_type: "14-day" });
      setSource("sample14");
      setPastedCsv(csv);
      return;
    }

    if (linkedScenarioId) {
      setComparisonMode("latest-day");
      const scenario = demoScenarios.find((item) => item.id === linkedScenarioId) ?? demoScenarios[0];
      const parsed = parseCsv(metricRowsToCsv(scenario.rows));
      setRows(parsed.rows);
      setFieldStatuses(parsed.fields);
      setCsvIssues(parsed.issues);
      setParseErrorCategory(null);
      setManualCopyText("");
      setFeedback({});
      trackEvent("case_demo_started", { page_path: "/demo/", source_cta: "shared-link", case_type: scenario.id });
      setSource("scenario");
      setActiveScenarioId(scenario.id);
      setPastedCsv(metricRowsToCsv(scenario.rows));
      return;
    }

    if (linkedComparisonMode) {
      setComparisonMode(linkedComparisonMode);
    }
  }, []);

  useEffect(() => {
    if (source === "demo" || rows.length === 0) {
      return;
    }

    const resultKey = `${source}:${comparisonMode}:${rows.length}:${report.previousDate ?? ""}:${report.currentDate ?? ""}:${activeScenarioId}`;
    if (viewedResultKeys.current.has(resultKey)) {
      return;
    }

    viewedResultKeys.current.add(resultKey);
    trackEvent("diagnosis_result_viewed", {
      page_path: "/demo/",
      source_cta: source === "upload" ? "csv-upload" : source === "paste" ? "csv-paste" : source === "scenario" ? "diagnosis-cases" : "sample-demo",
      comparison_period: comparisonMode,
      row_count_bucket: rowCountBucket(rows.length),
      case_type: source === "scenario" ? activeScenarioId : undefined
    });
  }, [activeScenarioId, comparisonMode, report.currentDate, report.previousDate, rows.length, source]);

  function buildDemoUrl(scenarioId: DemoScenarioId | null, mode: ComparisonMode, sampleId: DemoSampleId | null = null) {
    if (typeof window === "undefined") {
      return "";
    }

    const url = new URL("/demo/", window.location.origin);
    if (sampleId) {
      url.searchParams.set("sample", sampleId);
    } else if (scenarioId) {
      url.searchParams.set("case", scenarioId);
    }
    if (mode !== "latest-day" || sampleId) {
      url.searchParams.set("compare", mode);
    }
    return url.toString();
  }

  function replaceDemoUrl(scenarioId: DemoScenarioId | null, mode: ComparisonMode, sampleId: DemoSampleId | null = null) {
    if (typeof window === "undefined") {
      return;
    }

    const url = buildDemoUrl(scenarioId, mode, sampleId);
    window.history.replaceState(null, "", url);
  }

  function shouldShareScenario(nextSource = source) {
    return nextSource === "demo" || nextSource === "sample" || nextSource === "scenario";
  }

  function shouldShareFourteenDaySample(nextSource = source) {
    return nextSource === "sample14";
  }

  const freeDiagnosisHref = shouldShareFourteenDaySample()
    ? "../free-diagnosis/?sample=14-day"
    : shouldShareScenario()
      ? `../free-diagnosis/?case=${activeScenarioId}`
      : "../free-diagnosis/?draft=demo";

  const dataIssues = useMemo(() => {
    const issues = new Set(csvIssues);
    if (rows.length > 0 && report.previousDate && report.currentDate && !report.largestDrop) {
      issues.add("rowMatchIssue");
    }
    if (report.insufficientSevenDayWindow) {
      issues.add("sevenDayIssue");
    }
    return [...issues];
  }, [csvIssues, report.currentDate, report.insufficientSevenDayWindow, report.largestDrop, report.previousDate, rows.length]);
  const hasRequiredFields = fieldStatuses
    .filter((field) => field.required)
    .every((field) => Boolean(field.matchedHeader));
  const rankedDrivers = useMemo(
    () =>
      (["countryMix", "ecpm", "impressions", "fillRate", "revenue"] as Driver[])
        .map((driver) => ({ driver, change: report.changes[driver] }))
        .sort((a, b) => a.change - b.change),
    [report.changes]
  );
  const suggestedChecks = useMemo(() => {
    const checks: Record<Driver, string[]> =
      lang === "zh"
        ? {
            ecpm: [
              "按国家、广告位、广告源拆分 eCPM，看是否集中在某个高价值流量段。",
              "检查 mediation waterfall、bidding source、底价和最近配置改动。",
              "对照平台状态、节假日/季节性和主要广告源预算变化。"
            ],
            impressions: [
              "先确认 DAU、会话、广告请求量和展示机会是否同步变化。",
              "检查最近版本、广告触发逻辑、广告位展示频率和埋点是否改动。",
              "按国家和广告位看展示量下降是否只发生在某个流量段。"
            ],
            fillRate: [
              "按国家、广告位、广告源检查 requests、fills、match/fill rate。",
              "查看底价、广告源可用性、平台状态和是否有请求错误。",
              "如果 eCPM 稳定但 fill 下降，优先排查填充和瀑布流，而不是先改价格。"
            ],
            countryMix: [
              "比较各国家展示占比是否从高 eCPM 国家转向低 eCPM 国家。",
              "分别检查 US、BR、IN 等国家级 eCPM 是否稳定，避免误判为全局价格下降。",
              "先看买量、自然流量来源和地区分布，再改全局 mediation 配置。"
            ],
            revenue: [
              "先看 top segment drops，不要先改全局配置。",
              "按国家、广告位、广告源逐层拆分，确认主要收入损失来自哪里。",
              "同时检查 eCPM、展示量、填充率，避免把混合问题误判成单一指标。"
            ]
          }
        : {
            ecpm: [
              "Split eCPM by country, placement, and ad source to see whether the drop is concentrated.",
              "Check mediation waterfall, bidding sources, floor rules, and recent pricing changes.",
              "Compare against platform status, seasonality, and major demand-source budget shifts."
            ],
            impressions: [
              "Confirm whether DAU, sessions, ad requests, and ad opportunities moved in the same direction.",
              "Check recent releases, ad trigger logic, placement frequency, and reporting instrumentation.",
              "Break impressions down by country and placement before changing monetization settings."
            ],
            fillRate: [
              "Review requests, fills, and match/fill rate by country, placement, and ad source.",
              "Check floor settings, source availability, platform status, and request errors.",
              "If eCPM is stable but fill dropped, investigate fill and waterfall availability before changing pricing."
            ],
            countryMix: [
              "Compare whether impression share moved from high-eCPM countries toward lower-eCPM countries.",
              "Check whether country-level eCPM stayed stable before treating this as a global pricing issue.",
              "Review UA, organic traffic sources, and regional distribution before changing global mediation settings."
            ],
            revenue: [
              "Start from the top segment drops instead of changing global settings first.",
              "Break the loss down by country, placement, and ad source to find the biggest contributor.",
              "Check eCPM, impressions, and fill together so a mixed issue is not mistaken for one metric."
            ]
          };

    return checks[report.driver];
  }, [lang, report.driver]);
  const supportingSignals = useMemo(() => {
    const labels =
      lang === "zh"
        ? { revenue: "收入", impressions: "展示量", ecpm: "加权 eCPM", fillRate: "填充率", largest: "最大下滑分组" }
        : { revenue: "Revenue", impressions: "Impressions", ecpm: "Weighted eCPM", fillRate: "Fill rate", largest: "Largest segment drop" };
    const signals = [
      `${labels.revenue}: ${money(report.previous.revenue)} -> ${money(report.current.revenue)} (${pct(report.changes.revenue)})`,
      `${labels.impressions}: ${Math.round(report.previous.impressions).toLocaleString("en-US")} -> ${Math.round(report.current.impressions).toLocaleString("en-US")} (${pct(report.changes.impressions)})`,
      `${labels.ecpm}: ${money(report.previous.ecpm)} -> ${money(report.current.ecpm)} (${pct(report.changes.ecpm)})`,
      `${labels.fillRate}: ${report.previous.fillRate.toFixed(1)}% -> ${report.current.fillRate.toFixed(1)}% (${pct(report.changes.fillRate)})`
    ];

    if (report.largestDrop) {
      signals.push(`${labels.largest}: ${report.largestDrop.label}`);
    }

    return signals;
  }, [lang, report]);
  const caveats = useMemo(() => {
    const base =
      lang === "zh"
        ? [
            "这是基于 CSV 的方向性诊断，不是广告平台归因结论。",
            "如果样本量很小，eCPM 和填充率波动可能会被放大。",
            "不要在没有确认主要分组前修改全局底价或 mediation 配置。"
          ]
        : [
            "This is a directional CSV diagnosis, not a final attribution from the ad platform.",
            "If volume is low, eCPM and fill-rate movements can be noisy.",
            "Avoid changing global floors or mediation settings before confirming the main segment."
          ];
    const issueNotes = dataIssues.map((issue) => t[issue]);
    return [...issueNotes, ...base];
  }, [dataIssues, lang, t]);
  const diagnosisCard = useMemo(() => {
    const dropSegment = report.largestDrop;
    const severity = chooseSeverity(report.changes.revenue);
    const period = `${report.previousDate ?? "previous"} -> ${report.currentDate ?? "latest"}`;
    const problem =
      lang === "zh"
        ? `收入 ${money(report.previous.revenue)} -> ${money(report.current.revenue)} (${pct(report.changes.revenue)})`
        : `Revenue ${money(report.previous.revenue)} -> ${money(report.current.revenue)} (${pct(report.changes.revenue)})`;
    const sourceChange =
      dropSegment
        ? `${money(dropSegment.previous.revenue)} -> ${money(dropSegment.current.revenue)}`
        : lang === "zh"
          ? "混合分组"
          : "Mixed segments";

    return {
      period,
      problem,
      sourceChange,
      severity,
      mainCause: t.driverLabels[report.driver],
      country: report.driver === "countryMix" ? (lang === "zh" ? "国家结构变化" : "Country mix shift") : dropSegment?.country ?? (lang === "zh" ? "混合" : "Mixed"),
      placement: report.driver === "countryMix" ? (lang === "zh" ? "全部广告位" : "All placements") : dropSegment?.placementName ?? (lang === "zh" ? "混合广告位" : "Mixed placements"),
      adSource: report.driver === "countryMix" ? (lang === "zh" ? "全部广告源" : "All sources") : dropSegment?.network ?? (lang === "zh" ? "混合广告源" : "Mixed sources"),
      suggestedAction: suggestedChecks[0] ?? t.advice[report.driver],
      headline: report.hasDrop
        ? lang === "zh"
          ? "收入下降诊断卡"
          : "Ad revenue diagnosis card"
        : lang === "zh"
          ? "收入变化诊断卡"
          : "Ad revenue change card"
    };
  }, [lang, report, suggestedChecks, t.advice, t.driverLabels]);
  const diagnosisCardText = useMemo(
    () =>
      [
        diagnosisCard.headline,
        `${t.cardPeriod}: ${diagnosisCard.period}`,
        `${t.cardProblem}: ${diagnosisCard.problem}`,
        `${t.cardMainCause}: ${diagnosisCard.mainCause}`,
        `${t.cardSeverity}: ${t.severityLabels[diagnosisCard.severity]}`,
        `${t.cardCountry}: ${diagnosisCard.country}`,
        `${t.cardPlacement}: ${diagnosisCard.placement}`,
        `${t.cardAdSource}: ${diagnosisCard.adSource}`,
        `${t.cardSuggestedAction}: ${diagnosisCard.suggestedAction}`,
        "http://ecpmbazaar.com/demo/"
      ].join("\n"),
    [diagnosisCard, t]
  );
  const diagnosisText = useMemo(() => {
    const largestDrop = report.largestDrop
      ? `${report.largestDrop.label}: ${money(report.largestDrop.previous.revenue)} -> ${money(report.largestDrop.current.revenue)}`
      : "No comparable segment drop found";
    const topBreakdowns = report.breakdowns.slice(0, 3).map((item) => {
      return `- ${item.label}: ${money(item.previous.revenue)} -> ${money(item.current.revenue)} (${pct(item.changes.revenue)}), ${t.driverLabels[item.driver]}`;
    });
    const driverRankingLines = rankedDrivers.map((item, index) => {
      return `${index + 1}. ${t.driverLabels[item.driver]}: ${pct(item.change)}`;
    });
    const suggestedCheckLines = suggestedChecks.map((item) => `- ${item}`);
    const caveatLines = caveats.map((item) => `- ${item}`);

    if (lang === "zh") {
      return [
        "eCPM Bazaar 诊断报告",
        `对比周期：${report.previousDate ?? "上一天"} -> ${report.currentDate ?? "最近一天"}`,
        `收入：${money(report.previous.revenue)} -> ${money(report.current.revenue)} (${pct(report.changes.revenue)})`,
        `加权 eCPM：${money(report.previous.ecpm)} -> ${money(report.current.ecpm)} (${pct(report.changes.ecpm)})`,
        `展示量：${Math.round(report.previous.impressions).toLocaleString("en-US")} -> ${Math.round(report.current.impressions).toLocaleString("en-US")} (${pct(report.changes.impressions)})`,
        `填充率：${report.previous.fillRate.toFixed(1)}% -> ${report.current.fillRate.toFixed(1)}% (${pct(report.changes.fillRate)})`,
        `最可能驱动因素：${t.driverLabels[report.driver]}`,
        `最大下滑：${largestDrop}`,
        "",
        "支持信号：",
        ...supportingSignals.map((item) => `- ${item}`),
        "",
        "驱动因素排序：",
        ...driverRankingLines,
        "",
        topBreakdowns.length ? "主要下滑分组：" : "",
        ...topBreakdowns,
        "",
        "推荐检查项：",
        ...suggestedCheckLines,
        "",
        "避免误判：",
        `- ${t.whatToAvoidText[report.driver]}`,
        "",
        "诊断逻辑：",
        `- ${t.diagnosisLogicText[report.driver]}`,
        "",
        "数据限制：",
        ...caveatLines,
        "",
        "下一步动作：",
        `- ${t.nextActionText}`,
        "Demo: http://ecpmbazaar.com/demo/"
      ].filter(Boolean).join("\n");
    }

    return [
      "eCPM Bazaar diagnosis report",
      `Period: ${report.previousDate ?? "previous day"} -> ${report.currentDate ?? "latest day"}`,
      `Revenue: ${money(report.previous.revenue)} -> ${money(report.current.revenue)} (${pct(report.changes.revenue)})`,
      `Weighted eCPM: ${money(report.previous.ecpm)} -> ${money(report.current.ecpm)} (${pct(report.changes.ecpm)})`,
      `Impressions: ${Math.round(report.previous.impressions).toLocaleString("en-US")} -> ${Math.round(report.current.impressions).toLocaleString("en-US")} (${pct(report.changes.impressions)})`,
      `Fill rate: ${report.previous.fillRate.toFixed(1)}% -> ${report.current.fillRate.toFixed(1)}% (${pct(report.changes.fillRate)})`,
      `Most likely driver: ${t.driverLabels[report.driver]}`,
      `Largest segment drop: ${largestDrop}`,
      "",
      "Supporting signals:",
      ...supportingSignals.map((item) => `- ${item}`),
      "",
      "Driver ranking:",
      ...driverRankingLines,
      "",
      topBreakdowns.length ? "Top segment drops:" : "",
      ...topBreakdowns,
      "",
      "Recommended checks:",
      ...suggestedCheckLines,
      "",
      "What to avoid:",
      `- ${t.whatToAvoidText[report.driver]}`,
      "",
      "Diagnosis logic:",
      `- ${t.diagnosisLogicText[report.driver]}`,
      "",
      "Data limitations:",
      ...caveatLines,
      "",
      "Next action:",
      `- ${t.nextActionText}`,
      "Demo: http://ecpmbazaar.com/demo/"
    ].filter(Boolean).join("\n");
  }, [caveats, lang, rankedDrivers, report, suggestedChecks, supportingSignals, t]);

  function applyParsedRows(parsed: ParseCsvResult) {
    setRows(parsed.rows);
    setFieldStatuses(parsed.fields);
    setCsvIssues(parsed.issues);
    setParseErrorCategory(null);
    setManualCopyText("");
    setFeedback({});
  }

  function trackParseSuccess(parsed: ParseCsvResult, inputSource: "file" | "paste") {
    const detectedColumnCount = parsed.fields.filter((field) => Boolean(field.matchedHeader)).length;
    const missingFieldCount = parsed.fields.filter((field) => field.required && !field.matchedHeader).length;

    trackEvent("csv_parse_success", {
      page_path: "/demo/",
      source_cta: inputSource === "file" ? "csv-upload" : "csv-paste",
      row_count_bucket: rowCountBucket(parsed.rows.length),
      detected_column_count: detectedColumnCount,
      missing_required_field_count: missingRequiredFieldCount(missingFieldCount)
    });
  }

  function handleParseFailure(error: unknown, inputSource: "file" | "paste") {
    const category = getCsvParseErrorCategory(error);
    setParseErrorCategory(category);
    trackEvent("csv_parse_failed", {
      page_path: "/demo/",
      source_cta: inputSource === "file" ? "csv-upload" : "csv-paste",
      parse_error_category: category,
      input_source: inputSource
    });
  }

  async function onUpload(file?: File) {
    if (!file) return;
    trackEvent("csv_upload_started", { page_path: "/demo/", source_cta: "csv-upload", input_source: "file" });

    const unsupportedFileType = getUnsupportedFileType(file);
    if (unsupportedFileType) {
      handleParseFailure(new CsvParseError(unsupportedFileType), "file");
      return;
    }

    try {
      const parsed = parseCsv(await file.text());
      applyParsedRows(parsed);
      trackParseSuccess(parsed, "file");
      setSource("upload");
      replaceDemoUrl(null, comparisonMode);
    } catch (error) {
      handleParseFailure(error, "file");
    }
  }

  function analyzePastedCsv() {
    trackEvent("csv_upload_started", { page_path: "/demo/", source_cta: "csv-paste", input_source: "paste" });

    try {
      const parsed = parseCsv(pastedCsv);
      applyParsedRows(parsed);
      trackParseSuccess(parsed, "paste");
      setSource("paste");
      replaceDemoUrl(null, comparisonMode);
    } catch (error) {
      handleParseFailure(error, "paste");
    }
  }

  function loadSample() {
    const mode: ComparisonMode = "latest-day";
    const csv = metricRowsToCsv(demoRows);
    const parsed = parseCsv(csv);
    applyParsedRows(parsed);
    trackEvent("sample_demo_started", { page_path: "/demo/", source_cta: "demo-hero", comparison_period: mode, sample_type: "default" });
    setSource("sample");
    setActiveScenarioId(demoScenarios[0].id);
    setComparisonMode(mode);
    setPastedCsv(csv);
    replaceDemoUrl(demoScenarios[0].id, mode);
  }

  function loadFourteenDaySample() {
    const csv = metricRowsToCsv(fourteenDaySampleRows);
    const parsed = parseCsv(csv);
    const mode: ComparisonMode = "last-7-days";
    applyParsedRows(parsed);
    trackEvent("sample_demo_started", { page_path: "/demo/", source_cta: "demo-hero", comparison_period: mode, sample_type: "14-day" });
    setSource("sample14");
    setPastedCsv(csv);
    setComparisonMode(mode);
    replaceDemoUrl(null, mode, "14-day");
  }

  function loadScenario(scenarioId: DemoScenarioId) {
    const mode: ComparisonMode = "latest-day";
    const scenario = demoScenarios.find((item) => item.id === scenarioId) ?? demoScenarios[0];
    const csv = metricRowsToCsv(scenario.rows);
    const parsed = parseCsv(csv);
    applyParsedRows(parsed);
    trackEvent("case_demo_started", { page_path: "/demo/", source_cta: "diagnosis-cases", case_type: scenario.id });
    setSource("scenario");
    setActiveScenarioId(scenario.id);
    setComparisonMode(mode);
    setPastedCsv(csv);
    replaceDemoUrl(scenario.id, mode);
  }

  function resetDemo() {
    setRows(demoRows);
    setFieldStatuses(createFieldStatuses());
    setCsvIssues([]);
    setSource("demo");
    setActiveScenarioId(demoScenarios[0].id);
    setComparisonMode("latest-day");
    setParseErrorCategory(null);
    setPastedCsv("");
    setManualCopyText("");
    replaceDemoUrl(null, "latest-day");
  }

  function selectComparisonMode(mode: ComparisonMode) {
    setFeedback({});
    setComparisonMode(mode);
    replaceDemoUrl(shouldShareScenario() ? activeScenarioId : null, mode, shouldShareFourteenDaySample() ? "14-day" : null);
  }

  function saveDemoReviewDraft() {
    if (typeof window === "undefined") {
      return;
    }

    const maxDraftRows = 200;
    const draftRows = rows.slice(0, maxDraftRows);
    const draft: DemoReviewDraft = {
      version: 1,
      createdAt: new Date().toISOString(),
      sourceLabel,
      comparisonMode,
      rowCount: rows.length,
      truncated: rows.length > maxDraftRows,
      changeIndex: changeIndexForDriver(report.driver),
      periodIndex: periodIndexForComparison(comparisonMode),
      diagnosisText,
      dataSample: metricRowsToCsv(draftRows)
    };

    try {
      window.sessionStorage.setItem(demoReviewDraftStorageKey, JSON.stringify(draft));
    } catch {
      // If private browsing blocks storage, the normal free diagnosis page still works.
    }
  }

  function recordFeedback(nextFeedback: FeedbackState) {
    const mergedFeedback = { ...feedback, ...nextFeedback };
    setFeedback(mergedFeedback);
    trackEvent("diagnosis_feedback_recorded", {
      page_path: "/demo/",
      source_cta: "diagnosis-feedback",
      usefulness: mergedFeedback.usefulness,
      driver_clarity: mergedFeedback.driverClarity,
      next_check: mergedFeedback.nextCheck
    });
  }

  async function copyDemoLink() {
    const url = buildDemoUrl(shouldShareScenario() ? activeScenarioId : null, comparisonMode, shouldShareFourteenDaySample() ? "14-day" : null);
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

  async function copyDiagnosisCard() {
    if (await writeClipboardText(diagnosisCardText)) {
      setCopiedCard(true);
      setManualCopyText("");
      window.setTimeout(() => setCopiedCard(false), 1600);
    } else {
      setCopiedCard(false);
      setManualCopyText(diagnosisCardText);
    }
  }

  function downloadDiagnosisCard() {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 675;
    const context = canvas.getContext("2d");
    if (!context) return;

    const gradient = context.createLinearGradient(0, 0, 1200, 675);
    gradient.addColorStop(0, "#10251f");
    gradient.addColorStop(1, "#0f3a34");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 1200, 675);

    context.strokeStyle = "rgba(185, 246, 220, 0.08)";
    context.lineWidth = 1;
    for (let x = 0; x <= 1200; x += 60) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, 675);
      context.stroke();
    }
    for (let y = 0; y <= 675; y += 60) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(1200, y);
      context.stroke();
    }

    context.fillStyle = "rgba(255, 255, 255, 0.96)";
    drawRoundRect(context, 68, 58, 1064, 560, 18);
    context.fill();

    context.fillStyle = "#0f766e";
    drawRoundRect(context, 100, 92, 180, 38, 8);
    context.fill();
    context.fillStyle = "#effff7";
    context.font = "700 18px Inter, system-ui, sans-serif";
    context.fillText("eCPM Bazaar", 120, 117);

    context.fillStyle = "#10251f";
    context.font = "800 46px Inter, system-ui, sans-serif";
    context.fillText(diagnosisCard.headline, 100, 184);

    context.fillStyle = "#4e5b56";
    context.font = "600 22px Inter, system-ui, sans-serif";
    context.fillText(`${t.cardPeriod}: ${diagnosisCard.period}`, 100, 224);

    context.fillStyle = "#172026";
    context.font = "800 34px Inter, system-ui, sans-serif";
    wrapCanvasText(context, diagnosisCard.problem, 670).slice(0, 2).forEach((line, index) => {
      context.fillText(line, 100, 292 + index * 42);
    });

    context.fillStyle = "#f0fdf4";
    drawRoundRect(context, 100, 356, 500, 88, 10);
    context.fill();
    context.fillStyle = "#166534";
    context.font = "800 17px Inter, system-ui, sans-serif";
    context.fillText(t.cardMainCause.toUpperCase(), 124, 388);
    context.fillStyle = "#10251f";
    context.font = "800 34px Inter, system-ui, sans-serif";
    context.fillText(diagnosisCard.mainCause, 124, 426);

    const severityColor = diagnosisCard.severity === "high" ? "#b45309" : diagnosisCard.severity === "medium" ? "#d97706" : "#15803d";
    context.fillStyle = diagnosisCard.severity === "low" ? "#f0fdf4" : "#fff7ed";
    drawRoundRect(context, 624, 356, 220, 88, 10);
    context.fill();
    context.fillStyle = severityColor;
    context.font = "800 17px Inter, system-ui, sans-serif";
    context.fillText(t.cardSeverity.toUpperCase(), 648, 388);
    context.font = "800 34px Inter, system-ui, sans-serif";
    context.fillText(t.severityLabels[diagnosisCard.severity], 648, 426);

    const detailRows = [
      [t.cardCountry, diagnosisCard.country],
      [t.cardPlacement, diagnosisCard.placement],
      [t.cardAdSource, diagnosisCard.adSource],
      [lang === "zh" ? "分组变化" : "Segment change", diagnosisCard.sourceChange]
    ];
    context.font = "700 17px Inter, system-ui, sans-serif";
    detailRows.forEach(([label, value], index) => {
      const x = 100 + (index % 2) * 374;
      const y = 492 + Math.floor(index / 2) * 58;
      context.fillStyle = "#65727d";
      context.fillText(label, x, y);
      context.fillStyle = "#172026";
      context.font = "800 22px Inter, system-ui, sans-serif";
      wrapCanvasText(context, value, 320).slice(0, 1).forEach((line) => context.fillText(line, x, y + 30));
      context.font = "700 17px Inter, system-ui, sans-serif";
    });

    context.fillStyle = "#10251f";
    drawRoundRect(context, 878, 92, 220, 452, 14);
    context.fill();
    context.fillStyle = "#a7f3d0";
    context.font = "800 18px Inter, system-ui, sans-serif";
    context.fillText(t.cardSuggestedAction, 906, 136);
    context.fillStyle = "#f2fff8";
    context.font = "700 24px Inter, system-ui, sans-serif";
    wrapCanvasText(context, diagnosisCard.suggestedAction, 164).slice(0, 7).forEach((line, index) => {
      context.fillText(line, 906, 188 + index * 34);
    });
    context.fillStyle = "#b9c9c2";
    context.font = "700 18px Inter, system-ui, sans-serif";
    context.fillText("ecpmbazaar.com/demo", 906, 506);

    const link = document.createElement("a");
    link.download = "ecpm-bazaar-diagnosis-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    setDownloadedCard(true);
    window.setTimeout(() => setDownloadedCard(false), 1600);
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
          <button className="secondary-action" type="button" onClick={loadFourteenDaySample}>
            <Table2 size={18} aria-hidden="true" />
            {t.useFourteenDaySample}
          </button>
          <a
            className="secondary-action"
            download="ecpm-bazaar-sample.csv"
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(currentCsv)}`}
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

      <section className="demo-panel scenario-panel" aria-label={t.scenarioLabel}>
        <div className="demo-panel-header">
          <div>
            <p className="section-label">{t.scenarioLabel}</p>
            <h2>{t.scenarioTitle}</h2>
          </div>
        </div>
        <p className="scenario-help">{t.scenarioHelp}</p>
        <div className="scenario-card-grid">
          {demoScenarios.map((scenario) => (
            <button
              className={scenario.id === activeScenarioId && (source === "demo" || source === "sample" || source === "scenario") ? "scenario-card active" : "scenario-card"}
              key={scenario.id}
              type="button"
              onClick={() => loadScenario(scenario.id)}
            >
              <strong>{scenario.title[lang]}</strong>
              <span>{scenario.description[lang]}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="demo-panel comparison-panel" aria-label={t.comparisonLabel}>
        <div className="demo-panel-header">
          <div>
            <p className="section-label">{t.comparisonLabel}</p>
            <h2>{t.comparisonTitle}</h2>
          </div>
        </div>
        <div className="comparison-toggle">
          <button
            aria-pressed={comparisonMode === "latest-day"}
            className={comparisonMode === "latest-day" ? "comparison-option active" : "comparison-option"}
            type="button"
            onClick={() => selectComparisonMode("latest-day")}
          >
            <strong>{t.latestDay}</strong>
            <span>{t.latestDayHelp}</span>
          </button>
          <button
            aria-pressed={comparisonMode === "last-7-days"}
            className={comparisonMode === "last-7-days" ? "comparison-option active" : "comparison-option"}
            type="button"
            onClick={() => selectComparisonMode("last-7-days")}
          >
            <strong>{t.lastSevenDays}</strong>
            <span>{t.lastSevenDaysHelp}</span>
          </button>
        </div>
        <p className="comparison-window">
          {t.activeWindow}: {report.previousDate || "previous"} {" -> "} {report.currentDate || "latest"}
        </p>
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
      {parseErrorCategory ? (
        <aside className="demo-error" role="alert">
          <p>{t.parseErrors[parseErrorCategory]}</p>
          <div className="demo-error-actions">
            <a href="../templates/#accepted-aliases">{t.acceptedAliases}</a>
            <button type="button" onClick={loadSample}>
              <Table2 size={16} aria-hidden="true" />
              {t.trySample}
            </button>
          </div>
        </aside>
      ) : null}

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
              ? `${t.summaryPrefix} ${report.largestDrop.label}: ${money(report.largestDrop.previous.revenue)} -> ${money(report.largestDrop.current.revenue)} ${t.summarySuffix}`
              : t.noRows}
          </p>

          <div className="driver-callout">
            <span>{t.likelyDriver}</span>
            <strong>{t.driverLabels[report.driver]}</strong>
            <p>{t.advice[report.driver]}</p>
          </div>

          <div className="diagnosis-guidance-grid">
            <section>
              <h3>{t.supportingSignals}</h3>
              <ul>
                {supportingSignals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            </section>
            <section>
              <h3>{t.recommendedChecks}</h3>
              <ol>
                {suggestedChecks.map((check) => (
                  <li key={check}>{check}</li>
                ))}
              </ol>
            </section>
            <section>
              <h3>{t.whatToAvoid}</h3>
              <p>{t.whatToAvoidText[report.driver]}</p>
            </section>
            <section>
              <h3>{t.diagnosisLogic}</h3>
              <p>{t.diagnosisLogicText[report.driver]}</p>
            </section>
            <section>
              <h3>{t.dataLimitations}</h3>
              <ul>
                {caveats.slice(0, 3).map((caveat) => (
                  <li key={caveat}>{caveat}</li>
                ))}
              </ul>
            </section>
            <section>
              <h3>{t.nextAction}</h3>
              <p>{t.nextActionText}</p>
              <a
                className="next-action-link"
                href={freeDiagnosisHref}
                onClick={() => {
                  trackEvent("free_diagnosis_clicked", { page_path: "/demo/", source_cta: "diagnosis-next-action" });
                  saveDemoReviewDraft();
                }}
              >
                <Mail size={16} aria-hidden="true" />
                {t.requestReview}
              </a>
            </section>
          </div>

          <section className="diagnosis-feedback-panel" aria-label={t.feedback.title}>
            <h3>{t.feedback.title}</h3>
            <div className="diagnosis-feedback-grid">
              <fieldset>
                <legend>{t.feedback.usefulness}</legend>
                <div className="feedback-option-list">
                  <button
                    aria-pressed={feedback.usefulness === "yes"}
                    className={feedback.usefulness === "yes" ? "active" : ""}
                    type="button"
                    onClick={() => recordFeedback({ usefulness: "yes" })}
                  >
                    {t.feedback.yes}
                  </button>
                  <button
                    aria-pressed={feedback.usefulness === "no"}
                    className={feedback.usefulness === "no" ? "active" : ""}
                    type="button"
                    onClick={() => recordFeedback({ usefulness: "no" })}
                  >
                    {t.feedback.no}
                  </button>
                  <button
                    aria-pressed={feedback.usefulness === "not-sure"}
                    className={feedback.usefulness === "not-sure" ? "active" : ""}
                    type="button"
                    onClick={() => recordFeedback({ usefulness: "not-sure" })}
                  >
                    {t.feedback.notSure}
                  </button>
                </div>
              </fieldset>
              <fieldset>
                <legend>{t.feedback.clarity}</legend>
                <div className="feedback-option-list">
                  <button
                    aria-pressed={feedback.driverClarity === "clear"}
                    className={feedback.driverClarity === "clear" ? "active" : ""}
                    type="button"
                    onClick={() => recordFeedback({ driverClarity: "clear" })}
                  >
                    {t.feedback.clear}
                  </button>
                  <button
                    aria-pressed={feedback.driverClarity === "partly-clear"}
                    className={feedback.driverClarity === "partly-clear" ? "active" : ""}
                    type="button"
                    onClick={() => recordFeedback({ driverClarity: "partly-clear" })}
                  >
                    {t.feedback.partlyClear}
                  </button>
                  <button
                    aria-pressed={feedback.driverClarity === "unclear"}
                    className={feedback.driverClarity === "unclear" ? "active" : ""}
                    type="button"
                    onClick={() => recordFeedback({ driverClarity: "unclear" })}
                  >
                    {t.feedback.unclear}
                  </button>
                </div>
              </fieldset>
              <fieldset className="feedback-next-check">
                <legend>{t.feedback.nextCheck}</legend>
                <div className="feedback-option-list">
                  {[
                    ["impressions", t.feedback.impressions],
                    ["match-fill", t.feedback.matchFill],
                    ["country-mix", t.feedback.countryMix],
                    ["placement", t.feedback.placement],
                    ["ad-source", t.feedback.adSource],
                    ["time-of-day", t.feedback.timeOfDay],
                    ["ecpm", t.feedback.ecpm],
                    ["not-sure", t.feedback.notSure]
                  ].map(([value, label]) => (
                    <button
                      aria-pressed={feedback.nextCheck === value}
                      className={feedback.nextCheck === value ? "active" : ""}
                      key={value}
                      type="button"
                      onClick={() => recordFeedback({ nextCheck: value as NonNullable<FeedbackState["nextCheck"]> })}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          </section>

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

      <section className="demo-panel diagnosis-card-panel" aria-label={t.diagnosisCard}>
        <div className="demo-panel-header">
          <div>
            <p className="section-label">{t.diagnosisCard}</p>
            <h2>{t.diagnosisCardTitle}</h2>
          </div>
          <div className="diagnosis-tools">
            <button className="copy-result-button" type="button" onClick={copyDiagnosisCard}>
              <Copy size={16} aria-hidden="true" />
              {copiedCard ? t.cardCopied : t.copyCard}
            </button>
            <button className="copy-result-button" type="button" onClick={downloadDiagnosisCard}>
              <Download size={16} aria-hidden="true" />
              {downloadedCard ? t.cardDownloaded : t.downloadCard}
            </button>
          </div>
        </div>
        <p className="report-help">{t.diagnosisCardHelp}</p>

        <div className="share-card-preview">
          <div className="share-card-main">
            <span className="share-card-brand">eCPM Bazaar</span>
            <h3>{diagnosisCard.headline}</h3>
            <p>{diagnosisCard.problem}</p>
            <div className="share-card-driver">
              <span>{t.cardMainCause}</span>
              <strong>{diagnosisCard.mainCause}</strong>
            </div>
          </div>

          <div className="share-card-side">
            <span className={`severity-pill ${diagnosisCard.severity}`}>
              {t.cardSeverity}: {t.severityLabels[diagnosisCard.severity]}
            </span>
            <dl>
              <div>
                <dt>{t.cardCountry}</dt>
                <dd>{diagnosisCard.country}</dd>
              </div>
              <div>
                <dt>{t.cardPlacement}</dt>
                <dd>{diagnosisCard.placement}</dd>
              </div>
              <div>
                <dt>{t.cardAdSource}</dt>
                <dd>{diagnosisCard.adSource}</dd>
              </div>
            </dl>
          </div>

          <div className="share-card-action">
            <span>{t.cardSuggestedAction}</span>
            <p>{diagnosisCard.suggestedAction}</p>
          </div>
        </div>
      </section>

      <section className="demo-panel report-panel" aria-label={t.shareReport}>
        <div className="demo-panel-header">
          <div>
            <p className="section-label">{t.shareReport}</p>
            <h2>{t.shareReportTitle}</h2>
          </div>
          <button className="copy-result-button" type="button" onClick={copyDiagnosis}>
            <Copy size={16} aria-hidden="true" />
            {copiedResult ? t.copied : t.copyReport}
          </button>
        </div>
        <p className="report-help">{t.shareReportHelp}</p>
        <div className="report-summary-grid" aria-label={t.driverRanking}>
          {rankedDrivers.map((item, index) => (
            <div className="report-rank-card" key={item.driver}>
              <span>{index + 1}</span>
              <strong>{t.driverLabels[item.driver]}</strong>
              <em className={item.change < 0 ? "negative" : "positive"}>{pct(item.change)}</em>
            </div>
          ))}
        </div>
        <div className="report-detail-grid">
          <div>
            <h3>{t.checklist}</h3>
            <ul>
              {suggestedChecks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{t.caveats}</h3>
            <ul>
              {caveats.slice(0, 4).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h3 className="report-preview-title">{t.reportPreview}</h3>
          <pre className="email-template report-preview">{diagnosisText}</pre>
        </div>
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
          <a
            href={freeDiagnosisHref}
            onClick={() => {
              trackEvent("free_diagnosis_clicked", { page_path: "/demo/", source_cta: "data-preview" });
              saveDemoReviewDraft();
            }}
          >
            <Mail size={17} aria-hidden="true" />
            {t.requestReview}
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

      <SiteFooter lang={lang} />
    </main>
  );
}
