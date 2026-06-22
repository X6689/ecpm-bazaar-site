"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Mail, Play, ShieldCheck } from "lucide-react";
import { demoScenarios, fourteenDaySampleRows, metricRowsToCsv, type DemoScenarioId } from "@/lib/demo-data";
import { useLanguagePreference } from "@/lib/language";
import { CopyEmailPanel, type DiagnosisRequestPreset } from "./copy-email-panel";
import { SiteFooter } from "../site-footer";

const email = "xmmyy168@gmail.com";
const subject = "Free eCPM Bazaar diagnosis";
const fieldList = "date, appName, placementName, country, network, revenue, ecpm, impressions, requests, fills, clicks";
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
    title: "Send anonymized ad monetization data for a free diagnosis.",
    lede:
      "If your mobile game or app ad revenue changed and you are not sure why, send anonymized CSV-style rows. I will help check whether the movement looks more like eCPM, impressions, fill rate, country mix, placement, or ad source performance.",
    emailButton: "Email anonymized data",
    templatesButton: "Download templates",
    steps: [
      {
        title: "1. Anonymize your data",
        text: "Replace app names, ad unit IDs, and account identifiers with neutral names such as Game A or Rewarded Home."
      },
      {
        title: "2. Include two comparable periods",
        text: "The simplest version is latest day vs previous day. A 7-day comparison is also useful if your traffic is volatile."
      },
      {
        title: "3. Send fields, not account access",
        text: "CSV rows are enough for early diagnosis. Do not send passwords, login sessions, API keys, or private account screenshots."
      }
    ],
    outputLabel: "What you get back",
    outputTitle: "A diagnosis card and a short report, not a sales call.",
    outputText:
      "The first version is intentionally lightweight. I will look at the anonymized rows and return a clear diagnosis you can act on or discuss with your team.",
    outputs: [
      {
        label: "Diagnosis card",
        value: "Problem, main cause, severity, country, placement, ad source, and next action."
      },
      {
        label: "Paste-ready report",
        value: "A short explanation you can paste into email, Reddit, or an internal team thread."
      },
      {
        label: "First checks",
        value: "A small priority list so you know what to inspect before changing mediation settings."
      }
    ],
    mainCause: "Main cause",
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
    builderTitle: "Fill this in and generate an email diagnosis request",
    caseLoadedLabel: "Case loaded",
    caseLoadedTitle: "This request has been prefilled from a diagnosis case.",
    caseLoadedText:
      "Use it as a starter. Replace the sample rows with your own anonymized data before sending the request.",
    sampleLoadedLabel: "Sample loaded",
    sampleLoadedTitle: "This request has been prefilled from the 14-day demo sample.",
    sampleLoadedText:
      "Use this to test the manual diagnosis workflow. Replace the sample rows with your own anonymized export before sending.",
    openCaseDemo: "Open matching demo",
    safetyTitle: "No credentials needed",
    safetyText:
      "eCPM Bazaar does not need your AdMob, AppLovin MAX, Unity LevelPlay, TopOn, or Google login. For early feedback, anonymized report rows are enough.",
    dataSafety: "Data safety",
    requestBody: [
      "Hi eCPM Bazaar,",
      "",
      "I would like a free ad revenue drop diagnosis.",
      "",
      "Platform: AdMob / AppLovin MAX / Unity LevelPlay / TopOn / Other",
      "App type: mobile game / app",
      "What changed: revenue / eCPM / impressions / fill rate / country mix / ad source",
      "Comparison period: latest day vs previous day / last 7 days vs previous 7 days",
      "Preferred output: diagnosis card + paste-ready short report",
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
    title: "发送脱敏广告变现数据，申请一次免费诊断。",
    lede:
      "如果你的移动游戏或 App 广告收入发生变化，但不确定原因，可以发送 CSV 风格的脱敏数据行。我会帮你判断更像是 eCPM、展示量、填充率、国家结构、广告位还是广告源导致。",
    emailButton: "发送脱敏数据邮件",
    templatesButton: "下载模板",
    steps: [
      {
        title: "1. 先做数据脱敏",
        text: "把 App 名、广告位 ID、账号标识替换成 Game A、Rewarded Home 这类中性名称。"
      },
      {
        title: "2. 提供两个可比周期",
        text: "最简单是最近一天 vs 前一天。如果流量波动大，也可以用最近 7 天 vs 前 7 天。"
      },
      {
        title: "3. 只发送字段，不发送账号权限",
        text: "早期诊断只需要 CSV 行。不要发送密码、登录会话、API key 或包含私密账号信息的截图。"
      }
    ],
    outputLabel: "你会拿到什么",
    outputTitle: "返回诊断卡和短报告，不是销售沟通。",
    outputText: "第一版会刻意保持轻量。我会查看脱敏数据行，返回一段你能行动、也能拿去和团队讨论的清晰诊断。",
    outputs: [
      {
        label: "诊断卡",
        value: "包含问题、主要原因、严重程度、国家、广告位、广告源和下一步动作。"
      },
      {
        label: "可复制短报告",
        value: "适合粘贴到邮件、Reddit 或团队内部讨论。"
      },
      {
        label: "优先检查清单",
        value: "告诉你改聚合设置前，应该先检查哪些地方。"
      }
    ],
    mainCause: "主要原因",
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
    builderTitle: "填写这些信息，生成一封诊断请求邮件",
    caseLoadedLabel: "已载入案例",
    caseLoadedTitle: "这封请求已根据诊断案例预填。",
    caseLoadedText: "可以把它当成起点。发送前，把样例数据行替换成你自己的脱敏数据。",
    sampleLoadedLabel: "已载入样例",
    sampleLoadedTitle: "这封请求已根据 14 天 Demo 样例预填。",
    sampleLoadedText: "可以用它测试人工诊断流程。发送前，把样例数据替换成你自己的脱敏导出数据。",
    openCaseDemo: "打开对应 Demo",
    safetyTitle: "不需要账号权限",
    safetyText:
      "eCPM Bazaar 不需要你的 AdMob、AppLovin MAX、Unity LevelPlay、TopOn 或 Google 登录权限。早期反馈只需要脱敏报表行。",
    dataSafety: "数据安全",
    requestBody: [
      "Hi eCPM Bazaar,",
      "",
      "我想申请一次免费的广告收入下降诊断。",
      "",
      "平台：AdMob / AppLovin MAX / Unity LevelPlay / TopOn / Other",
      "App 类型：mobile game / app",
      "发生了什么变化：revenue / eCPM / impressions / fill rate / country mix / ad source",
      "对比周期：latest day vs previous day / last 7 days vs previous 7 days",
      "希望输出：diagnosis card + paste-ready short report",
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
            : "I am using the eCPM Bazaar 14-day sample as a reference. I want to compare the latest 7 days against the previous 7 days and identify the main driver plus first checks.",
        dataSample: metricRowsToCsv(fourteenDaySampleRows)
      };
    }

    if (activeScenario) {
      return {
        key: `${lang}-${activeScenario.id}`,
        platform: activeScenario.id === "fill-rate-drop" ? "Unity LevelPlay" : activeScenario.id === "country-mix" ? "Other" : "AdMob",
        changeIndex: changeIndexByCase[activeScenario.id],
        periodIndex: 0,
        notes:
          lang === "zh"
            ? `我正在参考 eCPM Bazaar 的「${activeScenario.title.zh}」案例。我的数据可能也有类似问题：${activeScenario.description.zh}。请帮我判断主要原因和优先检查项。`
            : `I am using the eCPM Bazaar "${activeScenario.title.en}" case as a reference. My data may show a similar pattern: ${activeScenario.description.en}. Please help me identify the main driver and first checks.`,
        dataSample: metricRowsToCsv(activeScenario.rows)
      };
    }

    return null;
  }, [activeSample, activeScenario, lang]);
  const prefillNote = useMemo(() => {
    if (activeSample) {
      return {
        label: t.sampleLoadedLabel,
        title: t.sampleLoadedTitle,
        text: t.sampleLoadedText,
        href: "../demo/?sample=14-day&compare=last-7-days"
      };
    }

    if (activeScenario) {
      return {
        label: t.caseLoadedLabel,
        title: t.caseLoadedTitle,
        text: t.caseLoadedText,
        href: `../demo/?case=${activeScenario.id}`
      };
    }

    return null;
  }, [activeSample, activeScenario, t]);
  const mailto = useMemo(
    () => `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(t.requestBody)}`,
    [t.requestBody]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const linkedSampleId = normalizeSampleId(params.get("sample"));
    setSampleId(linkedSampleId);
    setCaseId(linkedSampleId ? null : normalizeScenarioId(params.get("case")));
  }, []);

  return (
    <main className="resource-page" lang={lang === "zh" ? "zh-CN" : "en"}>
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

      <section className="resource-hero">
        <p className="eyebrow">
          <Mail size={16} aria-hidden="true" />
          {t.badge}
        </p>
        <h1>{t.title}</h1>
        <p>{t.lede}</p>
        <div className="hero-actions">
          <a className="primary-action" href={mailto}>
            <Mail size={18} aria-hidden="true" />
            {t.emailButton}
          </a>
          <a className="secondary-action" href="../templates/">
            {t.templatesButton}
          </a>
        </div>
      </section>

      <section className="template-grid" aria-label="How to prepare data">
        {t.steps.map((step) => (
          <article className="resource-card" key={step.title}>
            <span className="resource-icon">
              <ShieldCheck size={22} aria-hidden="true" />
            </span>
            <h2>{step.title}</h2>
            <p>{step.text}</p>
          </article>
        ))}
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
        </div>

        <div className="mini-diagnosis-card free-diagnosis-preview-card">
          <span className="share-card-brand">eCPM Bazaar</span>
          <h3>{t.previewProblem}</h3>
          <div className="mini-cause">
            <span>{t.mainCause}</span>
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

      <section className="field-section">
        <div>
          <p className="section-label">{t.builderLabel}</p>
          <h2>{t.builderTitle}</h2>
          {prefillNote ? (
            <div className="case-prefill-note">
              <p className="section-label">{prefillNote.label}</p>
              <h3>{prefillNote.title}</h3>
              <p>{prefillNote.text}</p>
              <a href={prefillNote.href}>
                <Play size={16} aria-hidden="true" />
                {t.openCaseDemo}
              </a>
            </div>
          ) : null}
        </div>
        <CopyEmailPanel body={t.requestBody} fieldList={fieldList} lang={lang} mailto={mailto} preset={preset} />
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
