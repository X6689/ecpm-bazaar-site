"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  CircleDot,
  Mail,
  ShieldCheck,
  Sparkles,
  TriangleAlert
} from "lucide-react";
import { useLanguagePreference } from "@/lib/language";
import { publicContactMailto } from "@/lib/site-contact";
import { trackEvent } from "@/lib/validation-events";
import { SiteFooter } from "./site-footer";

const copy = {
  zh: {
    name: "夏雨",
    role: "eCPM Bazaar 发起人",
    navHowItWorks: "如何运作",
    navResources: "资源",
    navDemo: "演示",
    navTemplates: "模板",
    navCases: "案例",
    navMethod: "方法",
    navGuides: "指南",
    navFree: "免费诊断",
    navContact: "联系",
    contact: "联系我",
    languageLabel: "语言",
    eyebrow: "移动广告收入下降诊断",
    title: "先找出移动广告收入下降最可能的原因。",
    lede:
      "使用脱敏 CSV 行，分离展示量、填充率、国家结构、广告位、广告源、一天中的时间和加权 eCPM 变化，再决定是否调整底价或聚合设置。",
    primary: "用样例数据试 Demo",
    secondary: "申请免费诊断",
    tertiary: "查看 CSV 模板",
    trustItems: ["无需 SDK", "无需后台登录", "浏览器本地诊断"],
    sampleLink: "先看 CSV 模板",
    positioningNote: "适合第一轮排查，在修改广告栈或寻求变现顾问帮助之前先整理证据。",
    flowNote: "先试样例 Demo，再查看诊断结果；需要时再申请免费诊断。",
    useCaseLabel: "典型问题",
    useCaseTitle: "当你不知道收入为什么掉了，先把问题拆开。",
    useCases: [
      "AdMob 收入下降，但展示量看起来正常",
      "AppLovin MAX 调整底价或聚合后 eCPM 变化",
      "某个 GEO 的激励视频收入突然下滑",
      "eCPM 稳定，但 fill rate / match rate 下降",
      "国家流量结构变化导致整体 eCPM 被拉低",
      "需要一段可贴到社区回复、邮件或团队讨论里的短诊断"
    ],
    safetyLabel: "数据安全",
    safetyTitle: "先用脱敏数据验证，不要交出账号权限。",
    safetyItems: [
      "公开 Demo 在浏览器本地解析 CSV",
      "不需要 AdMob、AppLovin、LevelPlay、TopOn 登录",
      "不接 SDK，不要发送 API key 或密码",
      "请移除 App 名、广告位 ID、包名、账号 ID 和付款信息"
    ],
    driverChips: ["Low eCPM?", "Poor fill rate?", "Rewarded ads not performing?", "Low ARPDAU?", "Mediation not working?"],
    fitLabel: "适合谁",
    fitTitle: "Best for",
    fitText: "适合已有广告收入、并能提供两个可比报告周期的移动 App 或游戏团队。",
    fitItems: [
      "已有广告收入的线上移动 App 或游戏",
      "AdMob、AppLovin MAX、Unity LevelPlay、TopOn 或自定义聚合报表",
      "至少有两个可比较的报表周期",
      "可以提供脱敏 CSV 数据行",
      "涉及流量、填充、GEO、广告位、广告源、时段或 eCPM 的收入下降"
    ],
    notFitLabel: "不适合处理的情况",
    notFitTitle: "Not designed for",
    notFitItems: ["AdMob 账号审核或政策申诉", "尚无有效广告流量的 App", "用户级跟踪或个人数据分析", "保证追回收入", "自动修改聚合或价格底线"],
    cardSectionLabel: "Diagnosis Card",
    cardSectionTitle: "把广告收入下降，变成一张看得懂、能分享、能行动的诊断卡。",
    cardSectionText:
      "Demo 不只是展示图表，还会把 CSV 里的变化整理成一张短诊断卡：问题是什么、主要原因是什么、影响哪个国家/广告位/广告源、下一步该先查哪里。",
    cardSectionPoints: ["适合发到团队群、邮件或社区回复", "比一屏指标更容易让别人理解", "后续免费诊断也会按这个格式返回"],
    cardAssetLink: "打开诊断卡图",
    homeCardHeadline: "收入下降诊断卡",
    homeCardProblem: "收入下降 31%，但 eCPM 基本稳定。",
    homeCardDetails: [
      { label: "最可能驱动因素", value: "填充率下降" },
      { label: "国家地区", value: "美国" },
      { label: "广告位", value: "激励视频" },
      { label: "广告源", value: "Unity Ads" }
    ],
    homeCardActionLabel: "建议动作",
    homeCardAction: "先检查该广告源可用性、瀑布流/底价配置和平台状态。",
    validationLabel: "产品边界",
    validationTitle: "先诊断。需要时再升级处理。",
    validationText:
      "eCPM Bazaar 用于第一轮排查：在调整聚合设置、联系广告平台或聘请变现顾问前，先把现有报表中的证据整理清楚。",
    validationItems: [
      {
        title: "从样例开始",
        text: "先用公开 Demo 了解诊断结构，再决定是否导入自己的脱敏数据。"
      },
      {
        title: "把证据拆开",
        text: "用可比周期分离流量、填充、国家结构、广告位、广告源、时段和价格信号。"
      },
      {
        title: "有需要再升级",
        text: "当报表无法解释变化时，再带着结构化证据联系平台或更深入的变现支持。"
      }
    ],
    howItWorksLabel: "诊断流程",
    howItWorksTitle: "从样例或脱敏 CSV 开始，再判断下一步。",
    howItWorksText:
      "用两个可比周期拆开流量、填充、国家结构、广告位、广告源、时段和价格信号，先理解发生了什么，再决定是否调整配置。",
    diagnosisTitle: "诊断示例",
    diagnosisText:
      "美国激励视频收入下降主要由填充率从 78% 降到 54% 导致，eCPM 基本稳定。建议优先检查该广告位的广告源填充、底价配置和平台状态。",
    previewTitle: "收入下降诊断",
    previewStatus: "示例报告",
    signals: [
      { label: "收入", value: "$428", trend: "-18.4%", tone: "warn" },
      { label: "eCPM", value: "$3.84", trend: "+2.6%", tone: "good" },
      { label: "填充率", value: "54.2%", trend: "-21.8%", tone: "warn" }
    ],
    drivers: [
      { label: "激励视频 / 美国", value: "主要下滑", width: "92%" },
      { label: "插屏 / 巴西", value: "稳定", width: "48%" },
      { label: "横幅 / 日本", value: "小幅增长", width: "33%" }
    ],
    steps: [
      { title: "使用样例或上传脱敏 CSV", note: "当前仅支持样例数据和 CSV" },
      { title: "对比两个报告周期", note: "分离收入、展示量、eCPM 和填充变化" },
      { title: "先检查最可能的原因", note: "再决定是否需要更深入的支持" }
    ],
    resourceLabel: "Validation Resources",
    resourceTitle: "先用真实报表验证诊断是否有用。",
    resourceText:
      "先从公开 Demo 开始，对照 CSV 模板整理字段，再看脱敏案例和诊断方法，判断收入下降更可能来自流量、eCPM、填充率、国家结构还是广告源变化。",
    resourceOrderTitle: "建议使用顺序",
    resourceOrder: ["试用公开 Demo", "下载 CSV 模板", "查看脱敏案例", "阅读诊断方法和 FAQ"],
    resourceSafetyTitle: "安全设计",
    resourceSafety: ["无需 SDK", "无需后台登录", "浏览器本地解析 CSV", "脱敏数据行就够"],
    resources: [
      { title: "公开 Demo", text: "上传 CSV 或使用样例数据，直接生成一段诊断结果。", href: "demo/" },
      { title: "CSV 模板", text: "下载 AdMob、AppLovin MAX、LevelPlay / TopOn 模板。", href: "templates/" },
      { title: "脱敏案例", text: "查看 eCPM、填充率、国家结构三类常见变化案例。", href: "cases/" },
      { title: "诊断方法", text: "了解收入变化如何拆成展示量、eCPM、填充、国家和广告源信号。", href: "method/" },
      { title: "诊断指南", text: "阅读 AdMob 收入下降、match rate、eCPM 和 fill rate 长尾诊断指南。", href: "learn/" },
      { title: "免费诊断", text: "用匿名数据发邮件，不需要账号密码或 API key。", href: "free-diagnosis/" },
      { title: "常见问题", text: "解释浏览器本地 CSV、字段要求、数据脱敏和适用团队。", href: "faq/" },
      { title: "数据安全", text: "说明哪些字段可以分享，哪些账号和隐私信息不要发送。", href: "privacy/" }
    ]
  },
  en: {
    name: "Xia Yu",
    role: "Founder of eCPM Bazaar",
    navHowItWorks: "How it works",
    navResources: "Resources",
    navDemo: "Demo",
    navTemplates: "Templates",
    navCases: "Cases",
    navMethod: "Method",
    navGuides: "Guides",
    navFree: "Free diagnosis",
    navContact: "Contact",
    contact: "Contact",
    languageLabel: "Language",
    eyebrow: "Mobile ad revenue drop diagnosis",
    title: "Find what most likely caused your mobile ad revenue drop.",
    lede:
      "Use anonymized CSV rows to separate changes in impressions, fill rate, country mix, placement, ad source, time of day, and weighted eCPM before changing floors or mediation settings.",
    primary: "Try demo with sample data",
    secondary: "Request free diagnosis",
    tertiary: "See sample CSV",
    trustItems: ["No SDK required", "No dashboard login", "Browser-only diagnosis"],
    sampleLink: "See sample CSV",
    positioningNote: "Built for the first investigation, before you change your ad stack or hire a monetization consultant.",
    flowNote: "Try the sample demo, see the diagnosis result, then request a free diagnosis only when you need it.",
    useCaseLabel: "Use cases",
    useCaseTitle: "Use eCPM Bazaar when the revenue drop is real, but the cause is unclear.",
    useCases: [
      "AdMob revenue dropped but impressions look normal",
      "AppLovin MAX eCPM changed after a mediation or floor update",
      "Rewarded video revenue fell in one GEO",
      "Fill rate dropped while eCPM stayed stable",
      "Total eCPM dropped because traffic shifted to lower-value countries",
      "You need a short report for community replies, email, or team discussion"
    ],
    safetyLabel: "Data safety",
    safetyTitle: "Validate with anonymized rows before sharing any account access.",
    safetyItems: [
      "The public demo parses CSV in your browser",
      "No AdMob, AppLovin, LevelPlay, or TopOn login required",
      "No SDK, API key, password, or payment detail needed",
      "Remove app names, ad unit IDs, package names, account IDs, and private identifiers"
    ],
    driverChips: ["Low eCPM?", "Poor fill rate?", "Rewarded ads not performing?", "Low ARPDAU?", "Mediation not working?"],
    fitLabel: "Fit",
    fitTitle: "Best for",
    fitText: "Live mobile apps or games already earning ad revenue with at least two comparable reporting periods.",
    fitItems: [
      "Live mobile apps or games already earning ad revenue",
      "AdMob, AppLovin MAX, Unity LevelPlay, TopOn, or custom mediation reports",
      "Teams with at least two comparable reporting periods",
      "Developers who can provide anonymized CSV rows",
      "Revenue drops involving traffic, fill, GEO, placement, ad source, timing, or eCPM changes"
    ],
    notFitLabel: "Boundary",
    notFitTitle: "Not designed for",
    notFitItems: ["AdMob account approval or policy appeals", "Apps with no meaningful ad traffic yet", "User-level tracking or personal data analysis", "Guaranteed revenue recovery", "Automatic mediation or price-floor changes"],
    cardSectionLabel: "Diagnosis Card",
    cardSectionTitle: "Turn an ad revenue drop into a card your team can understand and act on.",
    cardSectionText:
      "The demo does more than show metrics. It turns CSV changes into a short diagnosis card: what happened, the most likely driver, which country / placement / ad source was affected, and what to check first.",
    cardSectionPoints: ["Useful for team chat, email, or community replies", "Easier to understand than a wall of metrics", "Free diagnosis requests will use the same output shape"],
    cardAssetLink: "Open diagnosis card image",
    homeCardHeadline: "Revenue drop diagnosis card",
    homeCardProblem: "Revenue dropped 31%, while eCPM stayed close to normal.",
    homeCardDetails: [
      { label: "Most likely driver", value: "Fill rate dropped" },
      { label: "Country", value: "United States" },
      { label: "Placement", value: "Rewarded Video" },
      { label: "Ad source", value: "Unity Ads" }
    ],
    homeCardActionLabel: "Suggested action",
    homeCardAction: "Check source availability, waterfall / floor settings, and platform status first.",
    validationLabel: "Product boundary",
    validationTitle: "Start with the diagnosis. Escalate only when needed.",
    validationText:
      "eCPM Bazaar is designed for the first investigation. It helps organize the evidence before you change mediation, contact an ad platform, or hire a monetization consultant.",
    validationItems: [
      {
        title: "Start with a sample",
        text: "Use the public demo to see the diagnosis structure before importing your own anonymized rows."
      },
      {
        title: "Separate the evidence",
        text: "Use comparable periods to separate traffic, fill, country mix, placement, source, timing, and pricing signals."
      },
      {
        title: "Escalate with context",
        text: "When the report is not enough, bring a structured evidence trail to your platform or deeper monetization support."
      }
    ],
    howItWorksLabel: "How it works",
    howItWorksTitle: "Start with a sample or anonymized CSV, then decide what to check next.",
    howItWorksText:
      "Use two comparable periods to separate traffic, fill, country mix, placement, source, timing, and pricing signals before deciding whether a setting needs to change.",
    diagnosisTitle: "Diagnosis Example",
    diagnosisText:
      "US rewarded video revenue fell mainly because fill rate dropped from 78% to 54%, while eCPM stayed stable. Prioritize checking ad source fill, floor settings, and platform status for this placement.",
    previewTitle: "Revenue drop diagnosis",
    previewStatus: "Example report",
    signals: [
      { label: "Revenue", value: "$428", trend: "-18.4%", tone: "warn" },
      { label: "eCPM", value: "$3.84", trend: "+2.6%", tone: "good" },
      { label: "Fill Rate", value: "54.2%", trend: "-21.8%", tone: "warn" }
    ],
    drivers: [
      { label: "Rewarded Video / US", value: "Main drop", width: "92%" },
      { label: "Interstitial / BR", value: "Stable", width: "48%" },
      { label: "Banner / JP", value: "Minor lift", width: "33%" }
    ],
    steps: [
      { title: "Use sample data or upload an anonymized CSV", note: "The public workflow supports sample data and CSV only" },
      { title: "Compare two reporting periods", note: "Separate revenue, impressions, eCPM, and fill changes" },
      { title: "Check the most likely driver first", note: "Escalate only when the report needs more context" }
    ],
    resourceLabel: "Validation Resources",
    resourceTitle: "Validate the diagnosis with real report data first.",
    resourceText:
      "Start with the public demo, compare your CSV structure with templates, then review anonymized cases and the method page before sending a diagnosis request.",
    resourceOrderTitle: "Suggested order",
    resourceOrder: ["Try the public demo", "Download CSV templates", "Review anonymized cases", "Read the method and FAQ"],
    resourceSafetyTitle: "Safe by design",
    resourceSafety: ["No SDK required", "No dashboard login", "Browser-only CSV parsing", "Anonymized rows are enough"],
    resources: [
      { title: "Public demo", text: "Upload a CSV or use sample data to copy a diagnosis result.", href: "demo/" },
      { title: "CSV templates", text: "Download AdMob, AppLovin MAX, and LevelPlay / TopOn templates.", href: "templates/" },
      { title: "Anonymized cases", text: "Review eCPM, fill-rate, and country-mix diagnosis examples.", href: "cases/" },
      { title: "Method", text: "See how revenue changes are separated into traffic, pricing, fill, GEO, and ad-source signals.", href: "method/" },
      { title: "Diagnosis guides", text: "Read long-tail guides for AdMob revenue drops, match rate, eCPM, and fill-rate issues.", href: "learn/" },
      { title: "Free diagnosis", text: "Send anonymized rows by email. No login or API key needed.", href: "free-diagnosis/" },
      { title: "FAQ", text: "Understand browser-only CSV parsing, required fields, anonymization, and fit.", href: "faq/" },
      { title: "Data safety", text: "See what is safe to share and what account data should stay private.", href: "privacy/" }
    ]
  }
};

export default function Home() {
  const [lang, setLang] = useLanguagePreference("en");
  const t = copy[lang];
  const mailto = publicContactMailto;

  return (
    <main className="site-page" lang={lang === "zh" ? "zh-CN" : "en"}>
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="identity" href="#top" aria-label="Xia Yu home">
          <span className="identity-mark">XY</span>
          <span>
            <strong>{t.name}</strong>
            <small>{t.role}</small>
          </span>
        </a>
        <div className="nav-links">
          <a href="#how-it-works">{t.navHowItWorks}</a>
          <a href="#resources">{t.navResources}</a>
          <a href="demo/">{t.navDemo}</a>
          <a href="templates/">{t.navTemplates}</a>
          <a href="cases/">{t.navCases}</a>
          <a href="method/">{t.navMethod}</a>
          <a href="learn/">{t.navGuides}</a>
          <a href="free-diagnosis/">{t.navFree}</a>
          <a href={mailto}>{t.navContact}</a>
          <div className="language-switch" aria-label={t.languageLabel}>
            <button
              aria-pressed={lang === "zh"}
              className={lang === "zh" ? "active" : ""}
              type="button"
              onClick={() => setLang("zh")}
            >
              中文
            </button>
            <button
              aria-pressed={lang === "en"}
              className={lang === "en" ? "active" : ""}
              type="button"
              onClick={() => setLang("en")}
            >
              English
            </button>
          </div>
          <a className="nav-action" href={mailto}>
            <Mail size={16} aria-hidden="true" />
            {t.contact}
          </a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">
            <Sparkles size={16} aria-hidden="true" />
            {t.eyebrow}
          </p>
          <h1>{t.title}</h1>
          <p className="hero-lede">{t.lede}</p>
          <div className="hero-actions">
            <a
              className="primary-action"
              href="demo/"
              onClick={() => trackEvent("sample_demo_started", { page_path: "/", source_cta: "homepage-hero", sample_type: "default" })}
            >
              {t.primary}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a
              className="secondary-action"
              href="free-diagnosis/"
              onClick={() => trackEvent("free_diagnosis_clicked", { page_path: "/", source_cta: "homepage-hero" })}
            >
              {t.secondary}
            </a>
          </div>
          <p className="hero-flow-note">{t.flowNote}</p>
          <a className="inline-resource-link" href="templates/">
            {t.sampleLink}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <div className="hero-trust-list" aria-label="Safe testing notes">
            {t.trustItems.map((item) => (
              <span key={item}>
                <CheckCircle2 size={15} aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
          <p className="positioning-note">{t.positioningNote}</p>
        </div>

        <div className="hero-side">
          <div className="diagnosis-preview" aria-label="eCPM Bazaar diagnosis preview">
            <div className="preview-top">
              <div>
                <p className="preview-kicker">eCPM Bazaar</p>
                <h2>{t.previewTitle}</h2>
              </div>
              <span className="status-pill">
                <CircleDot size={14} aria-hidden="true" />
                {t.previewStatus}
              </span>
            </div>
            <div className="signal-grid">
              {t.signals.map((signal) => (
                <div className="signal-card" key={signal.label}>
                  <span>{signal.label}</span>
                  <strong>{signal.value}</strong>
                  <em className={signal.tone === "warn" ? "down" : undefined}>{signal.trend}</em>
                </div>
              ))}
            </div>
            <div className="diagnosis-box">
              <span className="warning-icon">
                <TriangleAlert size={20} aria-hidden="true" />
              </span>
              <div>
                <h3>{t.diagnosisTitle}</h3>
                <p>{t.diagnosisText}</p>
              </div>
            </div>
            <div className="driver-list">
              {t.drivers.map((driver) => (
                <div className="driver-row" key={driver.label}>
                  <div>
                    <span>{driver.label}</span>
                    <strong>{driver.value}</strong>
                  </div>
                  <i style={{ width: driver.width }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="function-section" id="how-it-works" aria-label={t.howItWorksLabel}>
        <div className="function-copy">
          <p className="section-label">{t.howItWorksLabel}</p>
          <h2>{t.howItWorksTitle}</h2>
          <p>{t.howItWorksText}</p>
        </div>
        <div className="function-steps">
          {t.steps.map((step, index) => (
            <div className="step-row" key={step.title}>
              <span>{index + 1}</span>
              <div>
                <strong>{step.title}</strong>
                <small>{step.note}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="use-case-section" aria-label={t.useCaseLabel}>
        <div className="use-case-heading">
          <p className="section-label">{t.useCaseLabel}</p>
          <h2>{t.useCaseTitle}</h2>
        </div>
        <div className="use-case-grid">
          {t.useCases.map((item) => (
            <article className="use-case-card" key={item}>
              <CheckCircle2 size={18} aria-hidden="true" />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="fit-boundary-section" aria-label={t.fitTitle}>
        <article className="fit-boundary-card fit-boundary-card-positive">
          <p className="section-label">{t.fitLabel}</p>
          <h2>{t.fitTitle}</h2>
          <p>{t.fitText}</p>
          <ul>
            {t.fitItems.map((item) => (
              <li key={item}>
                <CheckCircle2 size={16} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </article>
        <article className="fit-boundary-card fit-boundary-card-neutral">
          <p className="section-label">{t.notFitLabel}</p>
          <h2>{t.notFitTitle}</h2>
          <ul>
            {t.notFitItems.map((item) => (
              <li key={item}>
                <CheckCircle2 size={16} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="validation-section" aria-label="Free test diagnosis program">
        <div className="validation-copy">
          <p className="section-label">
            <ShieldCheck size={16} aria-hidden="true" />
            {t.validationLabel}
          </p>
          <h2>{t.validationTitle}</h2>
          <p>{t.validationText}</p>
        </div>
        <div className="validation-card-grid">
          {t.validationItems.map((item) => (
            <article className="validation-card" key={item.title}>
              <span className="focus-icon">
                <ShieldCheck size={22} aria-hidden="true" />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="resource-link-section" id="resources" aria-label="eCPM Bazaar resources">
        <div className="resource-link-heading">
          <div>
            <p className="section-label">{t.resourceLabel}</p>
            <h2>{t.resourceTitle}</h2>
            <p>{t.resourceText}</p>
          </div>
          <div className="resource-guide-card">
            <h3>{t.resourceOrderTitle}</h3>
            <ol>
              {t.resourceOrder.map((item, index) => (
                <li key={item}>
                  <span>{index + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
          <div className="resource-safety-card">
            <h3>{t.resourceSafetyTitle}</h3>
            <ul>
              {t.resourceSafety.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={15} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="resource-link-grid">
          {t.resources.map((resource) => (
            <a className="resource-link-card" href={resource.href} key={resource.title}>
              <strong>{resource.title}</strong>
              <span>{resource.text}</span>
              <em>
                <ArrowUpRight size={16} aria-hidden="true" />
              </em>
            </a>
          ))}
        </div>
      </section>
      <section className="home-card-section" aria-label={t.cardSectionLabel}>
        <div className="home-card-copy">
          <p className="section-label">
            <CheckCircle2 size={16} aria-hidden="true" />
            {t.cardSectionLabel}
          </p>
          <h2>{t.cardSectionTitle}</h2>
          <p>{t.cardSectionText}</p>
          <div className="home-card-points">
            {t.cardSectionPoints.map((item) => (
              <span key={item}>
                <CheckCircle2 size={16} aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
          <div className="validation-actions">
            <a
              className="primary-action"
              href="demo/"
              onClick={() => trackEvent("sample_demo_started", { page_path: "/", source_cta: "homepage-final", sample_type: "default" })}
            >
              {t.primary}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a
              className="secondary-action"
              href="free-diagnosis/"
              onClick={() => trackEvent("free_diagnosis_clicked", { page_path: "/", source_cta: "homepage-final" })}
            >
              {t.secondary}
            </a>
          </div>
          <a className="inline-resource-link" href="revenue-drop-diagnosis-card.svg">
            {t.cardAssetLink}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>

        <div className="home-diagnosis-card" aria-label={t.homeCardHeadline}>
          <span className="share-card-brand">eCPM Bazaar</span>
          <h3>{t.homeCardHeadline}</h3>
          <p>{t.homeCardProblem}</p>
          <dl>
            {t.homeCardDetails.map((detail) => (
              <div key={detail.label}>
                <dt>{detail.label}</dt>
                <dd>{detail.value}</dd>
              </div>
            ))}
          </dl>
          <div className="home-card-action">
            <span>{t.homeCardActionLabel}</span>
            <p>{t.homeCardAction}</p>
          </div>
        </div>
      </section>


      <SiteFooter lang={lang} />
    </main>
  );
}
