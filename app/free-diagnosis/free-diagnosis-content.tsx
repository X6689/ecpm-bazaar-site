"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Mail, Play, ShieldCheck } from "lucide-react";
import { demoScenarios, fourteenDaySampleRows, metricRowsToCsv, type DemoScenarioId } from "@/lib/demo-data";
import { useLanguagePreference } from "@/lib/language";
import { demoReviewDraftStorageKey, parseDemoReviewDraft, type DemoReviewDraft } from "@/lib/review-draft";
import { publicContactEmail, publicContactMailto } from "@/lib/site-contact";
import { trackEvent } from "@/lib/validation-events";
import { CopyEmailPanel, type DiagnosisRequestPreset } from "./copy-email-panel";
import { ExampleOutputCard } from "../components/diagnosis-visuals";
import { SiteFooter } from "../site-footer";

const email = publicContactEmail;
const subject = "Free eCPM Bazaar diagnosis";
const fieldList =
  "date, gameName, platform, adNetwork, mediation, adFormat, placementName, adUnit, country, revenue, ecpm, arpDau, dau, impressions, impressionsPerDau, requests, matchedRequests, fills, matchRate, fillRate";
type DemoSampleId = "14-day";
const changeIndexByCase: Record<DemoScenarioId, number> = {
  "ecpm-drop": 1,
  "fill-rate-drop": 2,
  "country-mix": 4
};

function normalizeScenarioId(value: string | null): DemoScenarioId | null {
  if (demoScenarios.some((scenario) => scenario.id === value)) {
    return value as DemoScenarioId;
  }

  return null;
}

function normalizeSampleId(value: string | null): DemoSampleId | null {
  return value === "14-day" ? value : null;
}

const copy = {
  en: {
    back: "Back to site",
    navDemo: "Demo",
    navTemplates: "Templates",
    navCases: "Cases",
    navFaq: "FAQ",
    navPrivacy: "Privacy",
    language: "Language",
    badge: "Free diagnosis",
    title: "Apply for a free revenue-drop diagnosis.",
    lede:
      "Send anonymized report rows and separate the change into traffic, fill, country, placement, ad-source, time-of-day, and pricing signals.",
    conversionText:
      "No dashboard access. No SDK. No account credentials. The email builder is only the submission method; the point is a directional diagnosis of the revenue change.",
    emailButton: "Email anonymized data",
    templatesButton: "Download templates",
    benefits: [
      {
        title: "Most likely driver",
        text: "A directional read of whether the change started with traffic, fill, country mix, placement, source, timing, or pricing."
      },
      {
        title: "Supporting signals",
        text: "The report changes that support the interpretation, plus clear caveats when the supplied data is insufficient."
      },
      {
        title: "Three first checks",
        text: "A short priority list to run before changing mediation, floors, or placement logic."
      },
      {
        title: "Team-ready explanation",
        text: "A concise explanation you can share with your team, an ad platform, or a deeper monetization review."
      }
    ],
    steps: [
      {
        title: "1. Anonymize your data",
        text: "Replace app names, ad unit IDs, and account identifiers with neutral names such as Game A or Rewarded Home."
      },
      {
        title: "2. Include two comparable periods",
        text: "The simplest version is latest day vs previous day. A 7-day comparison is also useful if your DAU or country mix is volatile."
      },
      {
        title: "3. Send fields, not account access",
        text: "CSV rows are enough for early diagnosis. Do not send passwords, login sessions, API keys, or private account screenshots."
      }
    ],
    outputLabel: "What you get back",
    outputTitle: "A directional diagnosis format, not a guaranteed fix.",
    outputText:
      "When the supplied rows are sufficient, the response is structured around the most likely driver, supporting signals, three recommended checks, and clear data limitations.",
    cardAssetLink: "Open sample diagnosis card",
    outputs: [
      {
        label: "Diagnosis card",
        value: "Observed change, most likely driver, supporting signals, affected segments, and the next action."
      },
      {
        label: "Short team explanation",
        value: "A concise explanation you can paste into an email, community reply, or internal team thread."
      },
      {
        label: "Recommended checks and caveats",
        value: "Three first checks plus clear notes about missing fields, short history, low volume, or platform-definition differences."
      }
    ],
    mostLikelyDriver: "Most likely driver",
    diagnosisStatus: "Diagnosis status",
    diagnosisStatusValue: "Directional example",
    previewProblem: "Revenue dropped 31%",
    previewCause: "Fill rate dropped",
    severity: "Severity",
    severityValue: "High",
    country: "Country",
    countryValue: "United States",
    placement: "Placement",
    placementValue: "Rewarded Video",
    source: "Ad source",
    sourceValue: "Unity Ads",
    previewAction: "Check source availability, waterfall / floor settings, and platform status first.",
    builderLabel: "Request builder",
    builderTitle: "Diagnosis request details",
    builderText:
      "Use approximate or anonymized values. The more structured the rows are, the easier it is to identify whether the drop starts from traffic, fill, pricing, placement, country mix, or ad source performance.",
    goodForTitle: "Good for",
    goodFor: [
      "AdMob revenue drops",
      "AppLovin MAX or mediation changes",
      "Fill-rate or match-rate drops",
      "Country mix changes",
      "Placement-level revenue changes",
      "One ad source suddenly losing volume",
      "Peak-hour or live-event impression drops",
      "Stable impressions with lower weighted eCPM"
    ],
    minimumDataTitle: "Minimum useful data",
    minimumData: [
      "At least two comparable report dates",
      "Preferably 14 or more dates for 7-day comparisons",
      "Revenue and impressions",
      "Country, placement, or ad-source segments when available",
      "Requests and fills for fill-rate diagnosis"
    ],
    caseLoadedLabel: "Case loaded",
    caseLoadedTitle: "This request has been prefilled from a diagnosis case.",
    caseLoadedText:
      "Use it as a starter. Replace the sample rows with your own anonymized data before sending the request.",
    sampleLoadedLabel: "Sample loaded",
    sampleLoadedTitle: "This request has been prefilled from the 14-day demo sample.",
    sampleLoadedText:
      "Use this to test the directional diagnosis workflow. Replace the sample rows with your own anonymized export before sending.",
    demoDraftLoadedLabel: "Demo draft loaded",
    demoDraftLoadedTitle: "This request has been prefilled from your current demo result.",
    demoDraftLoadedText:
      "The CSV rows and diagnosis summary stayed in your browser session. Review or anonymize them before sending.",
    openCaseDemo: "Open matching demo",
    openDemo: "Open demo",
    safetyTitle: "No credentials needed",
    safetyText:
      "eCPM Bazaar does not need your AdMob, AppLovin MAX, Unity LevelPlay, TopOn, or Google login. Do not include API keys, account credentials, payment details, user-level personal data, or screenshots containing private identifiers.",
    dataSafety: "Data safety",
    doNotIncludeTitle: "Do not include",
    doNotInclude: ["API keys", "account IDs", "payment details", "private screenshots", "user-level personal data"],
    safeIncludeTitle: "Safe to include",
    safeInclude: ["anonymized daily rows", "country-level metrics", "placement-level metrics", "ad format", "revenue, eCPM, impressions, requests, fills, fill rate"],
    requestBody: [
      "Hi eCPM Bazaar,",
      "",
      "I would like a free ad revenue drop diagnosis.",
      "",
      "Platform: AdMob / AppLovin MAX / Unity LevelPlay / TopOn / Other",
      "App type: mobile game / app",
      "Game stage: live with ad revenue / soft launch / testing",
      "Ad network: AdMob / Unity Ads / AppLovin MAX / ironSource / TopOn / Other",
      "Mediation: none / AdMob mediation / AppLovin MAX / Unity LevelPlay / TopOn / not sure",
      "Main ad format: rewarded / interstitial / banner / mixed",
      "Main GEO: US / Tier 1 / Tier 3 / mixed / other",
      "DAU range: <1k / 1k-10k / 10k-100k / 100k+",
      "Approx monthly ad revenue: Under $100 / $100–$500 / $500–$2,000 / $2,000–$10,000 / $10,000+ / Prefer not to say",
      "Report history available: 2–6 days / 7–13 days / 14–29 days / 30+ days / Not sure",
      "App status: Live app with active ad traffic / Soft launch / Recently launched / Testing only",
      "Main concern: revenue dropped / eCPM dropped / fill or match rate dropped / impressions dropped / country mix changed / placement performance changed / ad source stopped filling / peak-hour traffic changed / not sure",
      "Approx metrics: eCPM, ARPDAU, fill rate, impressions per DAU",
      "What changed: revenue / eCPM / ARPDAU / impressions / fill rate / country mix / ad source",
      "Comparison period: latest day vs previous day / last 7 days vs previous 7 days",
      "Preferred output: most likely driver + supporting signals + recommended checks + data limitations",
      "",
      "I can share anonymized rows with these fields:",
      fieldList,
      "",
      "I will not send login credentials, API keys, private account IDs, or non-anonymized user data."
    ].join("\n")
  },
  zh: {
    back: "返回官网",
    navDemo: "演示",
    navTemplates: "模板",
    navCases: "案例",
    navFaq: "常见问题",
    navPrivacy: "数据安全",
    language: "语言",
    badge: "免费诊断",
    title: "申请一次免费的广告收入下降诊断。",
    lede:
      "发送脱敏报表行，把变化拆成流量、填充、国家、广告位、广告源、一天中的时间和价格信号。",
    conversionText:
      "无需后台访问、无需 SDK、无需账号凭证。邮件生成器只是提交方式，核心是对收入变化做一次方向性诊断。",
    emailButton: "发送脱敏数据邮件",
    templatesButton: "下载模板",
    benefits: [
      {
        title: "最可能的驱动因素",
        text: "方向性判断变化更像由流量、填充、国家结构、广告位、广告源、时段还是价格触发。"
      },
      {
        title: "支持信号",
        text: "指出哪些报表变化支持这项判断，并在数据不足时明确给出限制。"
      },
      {
        title: "三个优先检查项",
        text: "在调整聚合、底价或广告位逻辑前，先执行一小段有优先级的检查。"
      },
      {
        title: "可给团队解释的短结论",
        text: "用一段简短说明和团队、广告平台或更深入的变现支持沟通。"
      }
    ],
    steps: [
      {
        title: "1. 先做数据脱敏",
        text: "把 App 名、广告位 ID、账号标识替换成 Game A、Rewarded Home 这类中性名称。"
      },
      {
        title: "2. 提供两个可比周期",
        text: "最简单是最近一天 vs 前一天。如果 DAU 或国家结构波动大，也可以用最近 7 天 vs 前 7 天。"
      },
      {
        title: "3. 只发送字段，不发送账号权限",
        text: "早期诊断只需要 CSV 行。不要发送密码、登录会话、API key 或包含私密账号信息的截图。"
      }
    ],
    outputLabel: "你会拿到什么",
    outputTitle: "方向性诊断格式，不是保证修复。",
    outputText: "当提供的数据足够时，输出会围绕最可能驱动因素、支持信号、三个推荐检查项和清晰的数据限制组织。",
    cardAssetLink: "打开诊断卡样图",
    outputs: [
      {
        label: "诊断卡",
        value: "包含观察到的变化、最可能驱动因素、支持信号、受影响分组和下一步动作。"
      },
      {
        label: "团队可读短说明",
        value: "适合粘贴到邮件、社区回复或团队内部讨论。"
      },
      {
        label: "推荐检查项和限制",
        value: "给出三个优先检查项，并说明缺少字段、历史过短、样本过小或平台定义差异。"
      }
    ],
    mostLikelyDriver: "最可能驱动因素",
    diagnosisStatus: "诊断状态",
    diagnosisStatusValue: "方向性示例",
    previewProblem: "收入下降 31%",
    previewCause: "填充率下降",
    severity: "严重程度",
    severityValue: "高",
    country: "国家地区",
    countryValue: "美国",
    placement: "广告位",
    placementValue: "激励视频",
    source: "广告源",
    sourceValue: "Unity Ads",
    previewAction: "先检查广告源可用性、瀑布流 / 底价配置和平台状态。",
    builderLabel: "请求生成器",
    builderTitle: "诊断请求信息",
    builderText:
      "可以使用近似值或脱敏值。数据越结构化，越容易判断收入下降是从流量、填充、价格、广告位、国家结构还是广告源开始的。",
    goodForTitle: "适合这些情况",
    goodFor: [
      "AdMob 收入下降",
      "AppLovin MAX 或聚合问题",
      "填充率或匹配率下降",
      "国家结构变化",
      "广告位级收入变化",
      "一个广告源突然失去量级",
      "高峰时段或现场事件导致展示下降",
      "展示稳定但加权 eCPM 下降"
    ],
    minimumDataTitle: "最少有效数据",
    minimumData: ["至少两个可比的报表日期", "7 天对比最好有 14 个或更多日期", "收入和展示量", "可用时提供国家、广告位或广告源分组", "诊断填充率时提供 requests 和 fills"],
    caseLoadedLabel: "已载入案例",
    caseLoadedTitle: "这封请求已根据诊断案例预填。",
    caseLoadedText: "可以把它当成起点。发送前，把样例数据行替换成你自己的脱敏数据。",
    sampleLoadedLabel: "已载入样例",
    sampleLoadedTitle: "这封请求已根据 14 天 Demo 样例预填。",
    sampleLoadedText: "可以用它测试方向性诊断流程。发送前，把样例数据替换成你自己的脱敏导出数据。",
    demoDraftLoadedLabel: "已载入 Demo 草稿",
    demoDraftLoadedTitle: "这封请求已根据你当前的 Demo 结果预填。",
    demoDraftLoadedText: "CSV 行和诊断摘要只保存在你的浏览器会话中。发送前请再次检查并脱敏。",
    openCaseDemo: "打开对应 Demo",
    openDemo: "打开 Demo",
    safetyTitle: "不需要账号权限",
    safetyText:
      "eCPM Bazaar 不需要你的 AdMob、AppLovin MAX、Unity LevelPlay、TopOn 或 Google 登录权限。不要包含 API key、账号凭证、付款信息、用户级个人数据或带有私密标识的截图。",
    dataSafety: "数据安全",
    doNotIncludeTitle: "不要包含",
    doNotInclude: ["API key", "账号 ID", "付款信息", "私密截图", "用户级个人数据"],
    safeIncludeTitle: "可以包含",
    safeInclude: ["脱敏日级数据行", "国家级指标", "广告位级指标", "广告形式", "收入、eCPM、展示、请求、填充、填充率"],
    requestBody: [
      "Hi eCPM Bazaar,",
      "",
      "我想申请一次免费的广告收入下降诊断。",
      "",
      "平台：AdMob / AppLovin MAX / Unity LevelPlay / TopOn / Other",
      "App 类型：mobile game / app",
      "游戏阶段：live with ad revenue / soft launch / testing",
      "广告平台：AdMob / Unity Ads / AppLovin MAX / ironSource / TopOn / Other",
      "聚合平台：none / AdMob mediation / AppLovin MAX / Unity LevelPlay / TopOn / not sure",
      "主要广告形式：rewarded / interstitial / banner / mixed",
      "主要 GEO：US / Tier 1 / Tier 3 / mixed / other",
      "DAU 范围：<1k / 1k-10k / 10k-100k / 100k+",
      "每月广告收入大致范围：Under $100 / $100–$500 / $500–$2,000 / $2,000–$10,000 / $10,000+ / Prefer not to say",
      "可用的报表历史：2–6 days / 7–13 days / 14–29 days / 30+ days / Not sure",
      "App 状态：Live app with active ad traffic / Soft launch / Recently launched / Testing only",
      "主要关注的问题：revenue dropped / eCPM dropped / fill or match rate dropped / impressions dropped / country mix changed / placement performance changed / ad source stopped filling / peak-hour traffic changed / not sure",
      "大致指标：eCPM、ARPDAU、fill rate、impressions per DAU",
      "发生了什么变化：revenue / eCPM / ARPDAU / impressions / fill rate / country mix / ad source",
      "对比周期：latest day vs previous day / last 7 days vs previous 7 days",
      "希望输出：最可能原因 + 支持信号 + 推荐检查项 + 数据限制",
      "",
      "我可以分享包含这些字段的脱敏数据行：",
      fieldList,
      "",
      "我不会发送登录凭证、API key、私密账号 ID 或未脱敏的用户级数据。"
    ].join("\n")
  }
};

export function FreeDiagnosisContent() {
  const [lang, setLang] = useLanguagePreference("en");
  const [caseId, setCaseId] = useState<DemoScenarioId | null>(null);
  const [sampleId, setSampleId] = useState<DemoSampleId | null>(null);
  const [demoDraft, setDemoDraft] = useState<DemoReviewDraft | null>(null);
  const t = copy[lang];
  const activeScenario = useMemo(() => demoScenarios.find((scenario) => scenario.id === caseId) ?? null, [caseId]);
  const activeSample = sampleId === "14-day";
  const preset = useMemo<DiagnosisRequestPreset | null>(() => {
    if (activeSample) {
      return {
        key: `${lang}-14-day-sample`,
        platform: "AdMob",
        changeIndex: 1,
        periodIndex: 1,
        notes:
          lang === "zh"
            ? "我正在参考 eCPM Bazaar 的 14 天样例。我的数据也想按最近 7 天 vs 前 7 天做对比，请帮我判断主要收入变化原因和优先检查项。"
            : "I am using the eCPM Bazaar 14-day sample as a reference. I want to compare the latest 7 days against the previous 7 days and identify the most likely driver plus first checks.",
        dataSample: metricRowsToCsv(fourteenDaySampleRows)
      };
    }

    if (activeScenario) {
      return {
        key: `${lang}-${activeScenario.id}`,
        platform: activeScenario.id === "fill-rate-drop" ? "Unity LevelPlay / ironSource" : activeScenario.id === "country-mix" ? "Other" : "AdMob",
        changeIndex: changeIndexByCase[activeScenario.id],
        periodIndex: 0,
        notes:
          lang === "zh"
            ? `我正在参考 eCPM Bazaar 的「${activeScenario.title.zh}」案例。我的数据可能也有类似问题：${activeScenario.description.zh}。请帮我判断主要原因和优先检查项。`
            : `I am using the eCPM Bazaar "${activeScenario.title.en}" case as a reference. My data may show a similar pattern: ${activeScenario.description.en}. Please help me identify the most likely driver and first checks.`,
        dataSample: metricRowsToCsv(activeScenario.rows)
      };
    }

    if (demoDraft) {
      const rowNote = demoDraft.truncated
        ? lang === "zh"
          ? `\n\n注意：草稿只包含前 200 行，共 ${demoDraft.rowCount} 行。请在邮件中附上完整脱敏 CSV。`
          : `\n\nNote: the draft includes the first 200 rows out of ${demoDraft.rowCount}. Please attach the full anonymized CSV in email.`
        : "";

      return {
        key: `${lang}-demo-draft-${demoDraft.createdAt}`,
        platform: "Other",
        changeIndex: demoDraft.changeIndex,
        periodIndex: demoDraft.periodIndex,
        notes:
          lang === "zh"
            ? `我在 eCPM Bazaar 公开 Demo 中生成了一个诊断结果。\n\n数据来源：${demoDraft.sourceLabel}\n对比方式：${demoDraft.comparisonMode}\n\n${demoDraft.diagnosisText}${rowNote}`
            : `I generated this diagnosis in the public eCPM Bazaar demo.\n\nSource: ${demoDraft.sourceLabel}\nComparison: ${demoDraft.comparisonMode}\n\n${demoDraft.diagnosisText}${rowNote}`,
        dataSample: demoDraft.dataSample
      };
    }

    return null;
  }, [activeSample, activeScenario, demoDraft, lang]);
  const prefillNote = useMemo(() => {
    if (activeSample) {
      return {
        label: t.sampleLoadedLabel,
        title: t.sampleLoadedTitle,
        text: t.sampleLoadedText,
        href: "../demo/?sample=14-day&compare=last-7-days",
        linkLabel: t.openDemo
      };
    }

    if (demoDraft) {
      return {
        label: t.demoDraftLoadedLabel,
        title: t.demoDraftLoadedTitle,
        text: t.demoDraftLoadedText,
        href: "../demo/",
        linkLabel: t.openDemo
      };
    }

    if (activeScenario) {
      return {
        label: t.caseLoadedLabel,
        title: t.caseLoadedTitle,
        text: t.caseLoadedText,
        href: `../demo/?case=${activeScenario.id}`,
        linkLabel: t.openCaseDemo
      };
    }

    return null;
  }, [activeSample, activeScenario, demoDraft, t]);
  const formSource = activeSample ? "sample" : demoDraft ? "demo-draft" : activeScenario ? "case" : "direct";
  const mailto = useMemo(
    () => `${publicContactMailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(t.requestBody)}`,
    [t.requestBody]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const linkedSampleId = normalizeSampleId(params.get("sample"));
    const linkedDraft = params.get("draft") === "demo";
    setSampleId(linkedSampleId);
    setDemoDraft(linkedDraft ? parseDemoReviewDraft(window.sessionStorage.getItem(demoReviewDraftStorageKey)) : null);
    setCaseId(linkedSampleId || linkedDraft ? null : normalizeScenarioId(params.get("case")));
  }, []);

  return (
    <main className="resource-page bazaar-page bazaar-resource-page bazaar-free-diagnosis-page" lang={lang === "zh" ? "zh-CN" : "en"}>
      <nav className="resource-nav" aria-label="Free diagnosis navigation">
        <a href="../">
          <ArrowLeft size={17} aria-hidden="true" />
          {t.back}
        </a>
        <div>
          <a href="../demo/">{t.navDemo}</a>
          <a href="../templates/">{t.navTemplates}</a>
          <a href="../cases/">{t.navCases}</a>
          <a href="../faq/">{t.navFaq}</a>
          <a href="../privacy/">{t.navPrivacy}</a>
          <div className="language-switch" aria-label={t.language}>
            <button aria-pressed={lang === "zh"} className={lang === "zh" ? "active" : ""} type="button" onClick={() => setLang("zh")}>
              中文
            </button>
            <button aria-pressed={lang === "en"} className={lang === "en" ? "active" : ""} type="button" onClick={() => setLang("en")}>
              English
            </button>
          </div>
        </div>
      </nav>

      <section className="resource-hero bazaar-resource-hero diagnosis-intro-section">
        <p className="eyebrow">
          <Mail size={16} aria-hidden="true" />
          {t.badge}
        </p>
        <h1>{t.title}</h1>
        <p>{t.lede}</p>
        <p className="diagnosis-conversion-note">{t.conversionText}</p>
        <div className="hero-actions">
          <a
            className="primary-action"
            href={mailto}
            onClick={() => trackEvent("email_draft_generated", { page_path: "/free-diagnosis/", form_source: "direct" })}
          >
            <Mail size={18} aria-hidden="true" />
            {t.emailButton}
          </a>
          <a className="secondary-action" href="../templates/">
            {t.templatesButton}
          </a>
        </div>
      </section>

      <section className="diagnosis-benefit-grid" aria-label="Free diagnosis safeguards">
        {t.benefits.map((benefit) => (
          <article className="diagnosis-benefit-card" key={benefit.title}>
            <span className="resource-icon">
              <ShieldCheck size={22} aria-hidden="true" />
            </span>
            <h2>{benefit.title}</h2>
            <p>{benefit.text}</p>
          </article>
        ))}
      </section>

      <section className="diagnosis-request-section">
        <div className="diagnosis-request-card">
          <div className="diagnosis-request-heading">
            <div>
              <p className="section-label">{t.builderLabel}</p>
              <h2>{t.builderTitle}</h2>
              <p>{t.builderText}</p>
            </div>
            <div className="diagnosis-heading-aside">
              {prefillNote ? (
                <div className="case-prefill-note">
                  <p className="section-label">{prefillNote.label}</p>
                  <h3>{prefillNote.title}</h3>
                  <p>{prefillNote.text}</p>
                  <a href={prefillNote.href}>
                    <Play size={16} aria-hidden="true" />
                    {prefillNote.linkLabel ?? t.openCaseDemo}
                  </a>
                </div>
              ) : null}
              <ExampleOutputCard lang={lang} />
              <div className="diagnosis-good-fit-card">
                <h3>{t.goodForTitle}</h3>
                <ul>
                  {t.goodFor.map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={15} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="diagnosis-good-fit-card">
                <h3>{t.minimumDataTitle}</h3>
                <ul>
                  {t.minimumData.map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={15} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <CopyEmailPanel body={t.requestBody} fieldList={fieldList} lang={lang} mailto={mailto} preset={preset} formSource={formSource} />
        </div>
      </section>

      <section className="privacy-reminder-grid" aria-label={t.safetyTitle}>
        <article className="privacy-reminder-card privacy-reminder-card-danger">
          <h2>{t.doNotIncludeTitle}</h2>
          <ul>
            {t.doNotInclude.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="privacy-reminder-card privacy-reminder-card-safe">
          <h2>{t.safeIncludeTitle}</h2>
          <ul>
            {t.safeInclude.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="diagnosis-output-section" aria-label={t.outputLabel}>
        <div className="diagnosis-output-copy">
          <p className="section-label">{t.outputLabel}</p>
          <h2>{t.outputTitle}</h2>
          <p>{t.outputText}</p>
          <div className="diagnosis-output-list">
            {t.outputs.map((item) => (
              <span key={item.label}>
                <CheckCircle2 size={17} aria-hidden="true" />
                <strong>{item.label}</strong>
                {item.value}
              </span>
            ))}
          </div>
          <a className="inline-resource-link" href="../revenue-drop-diagnosis-card.svg">
            {t.cardAssetLink}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>

        <div className="mini-diagnosis-card free-diagnosis-preview-card">
          <span className="share-card-brand">eCPM Bazaar</span>
          <h3>{t.previewProblem}</h3>
          <div className="mini-score">
            <span>{t.diagnosisStatus}</span>
            <strong>{t.diagnosisStatusValue}</strong>
          </div>
          <div className="mini-cause">
            <span>{t.mostLikelyDriver}</span>
            <strong>{t.previewCause}</strong>
          </div>
          <dl>
            <div>
              <dt>{t.severity}</dt>
              <dd>{t.severityValue}</dd>
            </div>
            <div>
              <dt>{t.country}</dt>
              <dd>{t.countryValue}</dd>
            </div>
            <div>
              <dt>{t.placement}</dt>
              <dd>{t.placementValue}</dd>
            </div>
            <div>
              <dt>{t.source}</dt>
              <dd>{t.sourceValue}</dd>
            </div>
          </dl>
          <p>{t.previewAction}</p>
        </div>
      </section>

      <section className="resource-cta danger-note">
        <ShieldCheck size={24} aria-hidden="true" />
        <div>
          <h2>{t.safetyTitle}</h2>
          <p>{t.safetyText}</p>
        </div>
        <a className="secondary-action" href="../privacy/">
          {t.dataSafety}
        </a>
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
