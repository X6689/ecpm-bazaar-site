"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  CircleDot,
  Globe2,
  LineChart,
  Mail,
  MapPinned,
  Radar,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  Users
} from "lucide-react";
import { useLanguagePreference } from "@/lib/language";
import { SiteFooter } from "./site-footer";

const contactEmail = "xmmyy168@gmail.com";

const copy = {
  zh: {
    name: "夏雨",
    role: "eCPM Bazaar 发起人",
    navProduct: "产品",
    navFunction: "功能",
    navDemo: "演示",
    navTemplates: "模板",
    navCases: "案例",
    navFree: "免费诊断",
    navContact: "联系",
    contact: "联系我",
    languageLabel: "语言",
    eyebrow: "手游广告收益诊断工具",
    title: "找到你的手游广告收入为什么低。",
    lede:
      "eCPM Bazaar 是面向海外移动游戏开发者的免费 eCPM 和广告变现诊断工具。它帮助没有专职 monetization manager 的小团队判断低收入来自 eCPM、ARPDAU、展示量、填充率、国家结构、广告形式、广告位还是广告源。",
    primary: "申请免费诊断",
    secondary: "试用公开演示",
    tertiary: "下载 CSV 模板",
    trustItems: ["无需注册或后台登录", "无需 SDK 或 API 授权", "只看脱敏报表字段", "可复制结果到 Reddit / 邮件讨论"],
    driverChips: ["Low eCPM?", "Poor fill rate?", "Rewarded ads not performing?", "Low ARPDAU?", "Mediation not working?"],
    fitLabel: "Best fit",
    fitTitle: "专注有广告收入的移动游戏，不服务所有游戏项目。",
    fitText:
      "第一批目标客户是已经接入 AdMob、Unity Ads、AppLovin MAX、Unity LevelPlay / ironSource 或 TopOn 的移动游戏和 App 团队。",
    fitItems: [
      "独立手游开发者",
      "Casual / hybrid-casual 小团队",
      "使用广告聚合的 App 团队",
      "没有专职变现经理的小型工作室"
    ],
    notFitLabel: "Not first",
    notFitItems: ["PC / Steam 付费游戏", "主机游戏", "尚未上线的游戏", "完全没有广告数据的项目"],
    cardSectionLabel: "Diagnosis Card",
    cardSectionTitle: "把广告收入下降，变成一张看得懂、能分享、能行动的诊断卡。",
    cardSectionText:
      "Demo 不只是展示图表，还会把 CSV 里的变化整理成一张短诊断卡：问题是什么、主要原因是什么、影响哪个国家/广告位/广告源、下一步该先查哪里。",
    cardSectionPoints: ["适合发到团队群、邮件或 Reddit", "比一屏指标更容易让别人理解", "后续免费诊断也会按这个格式返回"],
    homeCardHeadline: "收入下降诊断卡",
    homeCardProblem: "收入下降 31%，但 eCPM 基本稳定。",
    homeCardDetails: [
      { label: "主要原因", value: "填充率下降" },
      { label: "国家地区", value: "美国" },
      { label: "广告位", value: "激励视频" },
      { label: "广告源", value: "Unity Ads" }
    ],
    homeCardActionLabel: "建议动作",
    homeCardAction: "先检查该广告源可用性、瀑布流/底价配置和平台状态。",
    validationLabel: "Free Test Diagnosis",
    validationTitle: "正在寻找首批 10 个小型游戏/App 团队测试诊断流程。",
    validationText:
      "如果你的 AdMob、AppLovin MAX、Unity Ads、Unity LevelPlay 或 TopOn 收入最近有波动，可以发送两段可对比的匿名报表字段。我会返回一段简单诊断，说明最可能的变化驱动因素。",
    validationItems: [
      {
        title: "匿名数据即可",
        text: "替换 App 名、广告位 ID 和账号标识，不需要发送用户级数据。"
      },
      {
        title: "先诊断原因",
        text: "优先判断是 eCPM、展示量、填充率、国家结构、广告位还是广告源导致。"
      },
      {
        title: "输出可粘贴结论",
        text: "返回适合贴到 Reddit、邮件或团队讨论里的短诊断结果。"
      }
    ],
    productLabel: "Product Direction",
    productTitle: "eCPM Bazaar",
    productText:
      "一个面向海外移动游戏和 App 团队的广告收益诊断助手。它不承诺神奇提高收入，而是先帮开发者判断问题更可能来自 eCPM、ARPDAU、展示量、填充、国家结构、广告形式、广告位还是广告源。",
    functionLabel: "Core Function",
    functionTitle: "广告收入异常诊断工具",
    functionText:
      "当广告收益偏低或波动时，eCPM Bazaar 会判断主要问题是 eCPM、ARPDAU、填充率、展示频次、国家地区、广告形式、广告位，还是广告平台/广告源拖累，并给出优先排查建议。",
    diagnosisTitle: "诊断示例",
    diagnosisText:
      "美国激励视频收入下降主要由填充率从 78% 降到 54% 导致，eCPM 基本稳定。建议优先检查该广告位的广告源填充、底价配置和平台状态。",
    previewTitle: "广告收入异常诊断",
    previewStatus: "诊断中",
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
      { title: "导入数据", note: "CSV / Excel / API" },
      { title: "识别异常", note: "收入、eCPM、填充率" },
      { title: "输出建议", note: "先查最可能原因" }
    ],
    cards: [
      {
        icon: LineChart,
        title: "看懂波动",
        text: "把收入变化拆成展示量、eCPM、填充率等原因，而不是只看到一个下降百分比。"
      },
      {
        icon: MapPinned,
        title: "定位维度",
        text: "按国家地区、广告位、广告形式和平台拆解，找出最影响收入的具体位置。"
      },
      {
        icon: Radar,
        title: "给出建议",
        text: "把异常转成开发者能行动的排查清单，先查最可能影响收入的地方。"
      }
    ],
    resourceLabel: "Validation Resources",
    resourceTitle: "先用真实报表验证诊断是否有用。",
    resources: [
      { title: "公开 Demo", text: "上传 CSV 或使用样例数据，直接生成一段诊断结果。", href: "demo/" },
      { title: "CSV 模板", text: "下载 AdMob、AppLovin MAX、LevelPlay / TopOn 模板。", href: "templates/" },
      { title: "脱敏案例", text: "查看 eCPM、填充率、国家结构三类常见变化案例。", href: "cases/" },
      { title: "免费诊断", text: "用匿名数据发邮件，不需要账号密码或 API key。", href: "free-diagnosis/" },
      { title: "常见问题", text: "解释浏览器本地 CSV、字段要求、数据脱敏和适用团队。", href: "faq/" },
      { title: "数据安全", text: "说明哪些字段可以分享，哪些账号和隐私信息不要发送。", href: "privacy/" }
    ],
    serviceLabel: "Who I Serve",
    serviceTitle: "先服务小团队，不做大而全的平台。",
    serviceText:
      "目标用户是每天关注广告收入、eCPM、ARPDAU 和填充率的小游戏/App 开发者。他们可能没有数据分析师或变现经理，但需要快速知道收益为什么低、为什么波动。",
    aboutLabel: "About Me",
    aboutTitle: "我会先用真实开发者数据验证这个方向。",
    aboutText:
      "当前目标不是把功能做重，而是先找到真实测试用户、沉淀匿名案例和反馈。诊断逻辑验证清楚后，再考虑登录系统、真实 API 接入或更完整的 Web 工具。"
  },
  en: {
    name: "Xia Yu",
    role: "Founder of eCPM Bazaar",
    navProduct: "Product",
    navFunction: "Function",
    navDemo: "Demo",
    navTemplates: "Templates",
    navCases: "Cases",
    navFree: "Free diagnosis",
    navContact: "Contact",
    contact: "Contact",
    languageLabel: "Language",
    eyebrow: "Mobile game ad revenue diagnostic tool",
    title: "Find why your mobile game ad revenue is low.",
    lede:
      "eCPM Bazaar is a free eCPM and ad monetization diagnostic tool for mobile game developers. It helps small teams without a monetization manager understand whether low revenue comes from eCPM, ARPDAU, impressions, fill rate, country mix, ad format, placement, mediation, or ad source performance.",
    primary: "Get free revenue diagnosis",
    secondary: "Try public demo",
    tertiary: "Download CSV templates",
    trustItems: ["No signup or dashboard login", "No SDK or API permission", "Anonymized report fields only", "Copy results into Reddit or email"],
    driverChips: ["Low eCPM?", "Poor fill rate?", "Rewarded ads not performing?", "Low ARPDAU?", "Mediation not working?"],
    fitLabel: "Best fit",
    fitTitle: "Built for mobile games with ad revenue, not every game project.",
    fitText:
      "The first users are teams already using AdMob, Unity Ads, AppLovin MAX, Unity LevelPlay / ironSource, TopOn, or similar ad monetization setups.",
    fitItems: [
      "Indie mobile game developers",
      "Casual / hybrid-casual teams",
      "Small app teams using ads",
      "Studios without a monetization manager"
    ],
    notFitLabel: "Not first",
    notFitItems: ["PC / premium Steam games", "Console games", "Pre-launch games", "Projects with no ad data"],
    cardSectionLabel: "Diagnosis Card",
    cardSectionTitle: "Turn an ad revenue drop into a card your team can understand and act on.",
    cardSectionText:
      "The demo does more than show metrics. It turns CSV changes into a short diagnosis card: what happened, the likely driver, which country / placement / ad source was affected, and what to check first.",
    cardSectionPoints: ["Useful for team chat, email, or Reddit replies", "Easier to understand than a wall of metrics", "Free diagnosis requests will use the same output shape"],
    homeCardHeadline: "Revenue drop diagnosis card",
    homeCardProblem: "Revenue dropped 31%, while eCPM stayed close to normal.",
    homeCardDetails: [
      { label: "Main cause", value: "Fill rate dropped" },
      { label: "Country", value: "United States" },
      { label: "Placement", value: "Rewarded Video" },
      { label: "Ad source", value: "Unity Ads" }
    ],
    homeCardActionLabel: "Suggested action",
    homeCardAction: "Check source availability, waterfall / floor settings, and platform status first.",
    validationLabel: "Free Test Diagnosis",
    validationTitle: "Looking for the first 10 small game/app teams to test the workflow.",
    validationText:
      "If your AdMob, AppLovin MAX, Unity Ads, Unity LevelPlay, or TopOn revenue recently moved, send two comparable anonymized report periods. I will return a simple diagnosis explaining the most likely driver.",
    validationItems: [
      {
        title: "Anonymized rows are enough",
        text: "Replace app names, ad unit IDs, and account identifiers. No user-level data needed."
      },
      {
        title: "Find the likely driver first",
        text: "Separate eCPM, impressions, fill rate, country mix, placement exposure, and ad source issues."
      },
      {
        title: "Get a paste-ready answer",
        text: "Use the result in Reddit threads, support emails, or internal team discussions."
      }
    ],
    productLabel: "Product Direction",
    productTitle: "eCPM Bazaar",
    productText:
      "A diagnosis assistant for overseas mobile game and app teams. It does not promise to magically increase revenue; it helps developers understand whether low performance came from eCPM, ARPDAU, impressions, fill, country mix, ad format, placement, mediation, or ad source performance.",
    functionLabel: "Core Function",
    functionTitle: "Ad revenue anomaly diagnosis",
    functionText:
      "When ad revenue is low or changes, eCPM Bazaar identifies whether the main driver is eCPM, ARPDAU, fill rate, impressions per DAU, country, ad format, placement, or a specific ad platform/source, then suggests where to check first.",
    diagnosisTitle: "Diagnosis Example",
    diagnosisText:
      "US rewarded video revenue fell mainly because fill rate dropped from 78% to 54%, while eCPM stayed stable. Prioritize checking ad source fill, floor settings, and platform status for this placement.",
    previewTitle: "Revenue anomaly diagnosis",
    previewStatus: "Watching",
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
      { title: "Import data", note: "CSV / Excel / API" },
      { title: "Detect anomaly", note: "Revenue, eCPM, fill rate" },
      { title: "Explain next step", note: "Check the likely cause first" }
    ],
    cards: [
      {
        icon: LineChart,
        title: "Understand Movement",
        text: "Break revenue changes into impressions, eCPM, fill rate, and other drivers instead of staring at one percentage drop."
      },
      {
        icon: MapPinned,
        title: "Locate Dimensions",
        text: "Split by country, placement, format, and platform to find the exact area dragging revenue down."
      },
      {
        icon: Radar,
        title: "Suggest Checks",
        text: "Turn anomalies into a practical checklist so developers can inspect the most likely cause first."
      }
    ],
    resourceLabel: "Validation Resources",
    resourceTitle: "Validate the diagnosis with real report data first.",
    resources: [
      { title: "Public demo", text: "Upload a CSV or use sample data to copy a diagnosis result.", href: "demo/" },
      { title: "CSV templates", text: "Download AdMob, AppLovin MAX, and LevelPlay / TopOn templates.", href: "templates/" },
      { title: "Anonymized cases", text: "Review eCPM, fill-rate, and country-mix diagnosis examples.", href: "cases/" },
      { title: "Free diagnosis", text: "Send anonymized rows by email. No login or API key needed.", href: "free-diagnosis/" },
      { title: "FAQ", text: "Understand browser-only CSV parsing, required fields, anonymization, and fit.", href: "faq/" },
      { title: "Data safety", text: "See what is safe to share and what account data should stay private.", href: "privacy/" }
    ],
    serviceLabel: "Who I Serve",
    serviceTitle: "Starting with small teams, not a giant platform.",
    serviceText:
      "The target users are mini game and app developers who check ad revenue, eCPM, ARPDAU, and fill rate every day. They may not have a data analyst or monetization manager, but they need to know why revenue is low or moving.",
    aboutLabel: "About Me",
    aboutTitle: "I will validate this with real developer data first.",
    aboutText:
      "The current goal is not to overbuild. I want real test users, anonymized cases, and direct feedback first. After the diagnosis logic proves useful, the next step can be login, real API integrations, or a fuller web tool."
  }
};

export default function Home() {
  const [lang, setLang] = useLanguagePreference("en");
  const t = copy[lang];
  const mailto = `mailto:${contactEmail}`;

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
          <a href="#product">{t.navProduct}</a>
          <a href="#function">{t.navFunction}</a>
          <a href="demo/">{t.navDemo}</a>
          <a href="templates/">{t.navTemplates}</a>
          <a href="cases/">{t.navCases}</a>
          <a href="free-diagnosis/">{t.navFree}</a>
          <a href="#contact">{t.navContact}</a>
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
            <a className="primary-action" href="free-diagnosis/">
              {t.primary}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="secondary-action" href="demo/">
              {t.secondary}
            </a>
            <a className="secondary-action" href="templates/">
              {t.tertiary}
            </a>
          </div>
          <div className="hero-trust-list" aria-label="Safe testing notes">
            {t.trustItems.map((item) => (
              <span key={item}>
                <CheckCircle2 size={15} aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
          <div className="driver-chip-row" aria-label="Diagnosis drivers">
            {t.driverChips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
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
          <div className="fit-split" aria-label="Target customer fit">
            <div className="fit-card">
              <p className="section-label">{t.fitLabel}</p>
              <h2>{t.fitTitle}</h2>
              <p>{t.fitText}</p>
              <div className="fit-list">
                {t.fitItems.map((item) => (
                  <span key={item}>
                    <CheckCircle2 size={15} aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="fit-card fit-card-muted">
              <p className="section-label">{t.notFitLabel}</p>
              <div className="fit-list">
                {t.notFitItems.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
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
            <a className="primary-action" href="demo/">
              {t.secondary}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="secondary-action" href="free-diagnosis/">
              {t.primary}
            </a>
          </div>
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

      <section className="validation-section" aria-label="Free test diagnosis program">
        <div className="validation-copy">
          <p className="section-label">
            <Users size={16} aria-hidden="true" />
            {t.validationLabel}
          </p>
          <h2>{t.validationTitle}</h2>
          <p>{t.validationText}</p>
          <div className="validation-actions">
            <a className="primary-action" href="free-diagnosis/">
              {t.primary}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="secondary-action" href="templates/">
              {t.tertiary}
            </a>
          </div>
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

      <section className="intro-band" id="product">
        <div>
          <p className="section-label">{t.productLabel}</p>
          <h2>{t.productTitle}</h2>
        </div>
        <p>{t.productText}</p>
      </section>

      <section className="function-section" id="function">
        <div className="function-copy">
          <p className="section-label">{t.functionLabel}</p>
          <h2>{t.functionTitle}</h2>
          <p>{t.functionText}</p>
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

      <section className="focus-grid">
        {t.cards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="focus-card" key={card.title}>
              <span className="focus-icon">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          );
        })}
      </section>

      <section className="resource-link-section" aria-label="eCPM Bazaar resources">
        <div className="resource-link-heading">
          <p className="section-label">{t.resourceLabel}</p>
          <h2>{t.resourceTitle}</h2>
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

      <section className="about-section" id="contact">
        <div className="about-copy">
          <p className="section-label">{t.serviceLabel}</p>
          <h2>{t.serviceTitle}</h2>
          <p>{t.serviceText}</p>
        </div>
        <div className="about-body">
          <div className="founder-note">
            <CheckCircle2 size={22} aria-hidden="true" />
            <div>
              <p className="section-label">{t.aboutLabel}</p>
              <h3>{t.aboutTitle}</h3>
              <p>{t.aboutText}</p>
            </div>
          </div>
          <a href={mailto}>
            <Globe2 size={18} aria-hidden="true" />
            {contactEmail}
          </a>
        </div>
      </section>

      <section className="launch-badge-section" aria-label="Launch badges">
        <a className="fazier-badge" href="https://fazier.com" target="_blank" rel="noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=featured&theme=light"
            width={250}
            height={106}
            alt="Fazier badge"
          />
        </a>
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
