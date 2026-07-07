"use client";

import { ArrowLeft, Download, FileSpreadsheet, Play, ShieldCheck } from "lucide-react";
import { useLanguagePreference } from "@/lib/language";
import { SiteFooter } from "../site-footer";

const templates = [
  {
    href: "admob-ecpm-bazaar-template.csv",
    fields: "date, appName, placementName, country, network, revenue, ecpm, impressions, requests, fills, clicks",
    en: {
      title: "AdMob template",
      note: "Use this when you export AdMob or AdMob-like report rows by date, country, and ad unit."
    },
    zh: {
      title: "AdMob 模板",
      note: "适合从 AdMob 或类似报表按日期、国家和广告单元导出的数据。"
    }
  },
  {
    href: "applovin-max-ecpm-bazaar-template.csv",
    fields: "date, appName, placementName, country, network, revenue, ecpm, impressions, requests, fills, clicks",
    en: {
      title: "AppLovin MAX template",
      note: "Use this for MAX reporting exports after mapping ad unit or placement names into placementName."
    },
    zh: {
      title: "AppLovin MAX 模板",
      note: "适合 MAX 报表导出，把广告单元或广告位名称映射到 placementName 后使用。"
    }
  },
  {
    href: "levelplay-topon-ecpm-bazaar-template.csv",
    fields: "date, appName, placementName, country, network, revenue, ecpm, impressions, requests, fills, clicks",
    en: {
      title: "Unity LevelPlay / TopOn template",
      note: "Use this for mediation reports where one row represents a date, country, placement, and ad source."
    },
    zh: {
      title: "Unity LevelPlay / TopOn 模板",
      note: "适合一行代表日期、国家、广告位和广告源组合的聚合变现报表。"
    }
  },
  {
    href: "14-day-ecpm-bazaar-sample.csv",
    demoHref: "../demo/?sample=14-day&compare=last-7-days",
    fields: "14 dates, 2 segments, eCPM-drop example",
    en: {
      title: "14-day sample",
      note: "Use this ready-made sample to test Last 7 days vs previous 7 days in the public demo."
    },
    zh: {
      title: "14 天示例",
      note: "用这个现成示例测试公开演示里的最近 7 天 vs 前 7 天对比。"
    }
  }
];

const requiredFields = [
  ["date", { en: "Report date. Use YYYY-MM-DD when possible.", zh: "报表日期。建议使用 YYYY-MM-DD。" }],
  ["appName", { en: "Game or app name. This can be anonymized.", zh: "游戏或 App 名称，可以脱敏。" }],
  ["placementName", { en: "Ad unit, placement, or ad format name.", zh: "广告单元、广告位或广告形式名称。" }],
  ["country", { en: "Country code or country name.", zh: "国家代码或国家名称。" }],
  ["network", { en: "Ad source, mediation platform, or aggregate source.", zh: "广告源、聚合平台或汇总来源。" }],
  ["revenue", { en: "Estimated ad revenue in USD.", zh: "预估广告收入，建议使用美元。" }],
  ["impressions", { en: "Ad impressions for the row.", zh: "这一行对应的广告展示次数。" }]
] as const;

const recommendedFields = [
  ["ecpm", { en: "Revenue / impressions * 1000. eCPM Bazaar can calculate it if missing.", zh: "收入 / 展示量 * 1000。缺失时 eCPM Bazaar 可以自动计算。" }],
  ["requests", { en: "Ad requests. Needed for fill-rate diagnosis.", zh: "广告请求数，用于诊断填充率。" }],
  ["fills", { en: "Matched or filled requests. Needed for fill-rate diagnosis.", zh: "匹配或填充请求数，用于诊断填充率。" }],
  ["clicks", { en: "Optional, useful for CTR sanity checks.", zh: "可选字段，可用于 CTR 合理性检查。" }]
] as const;

const acceptedAliases = [
  ["date", "date, day, report date"],
  ["appName", "app name, app, application"],
  ["placementName", "placement, ad unit, ad unit name, ad format, format"],
  ["country", "country, country code, geo, region"],
  ["network", "network, ad source, demand source, mediation, platform"],
  ["revenue", "revenue, estimated revenue, estimated earnings, earnings, income, ad revenue"],
  ["ecpm", "ecpm, eCPM, observed eCPM, average eCPM"],
  ["impressions", "impressions, ad impressions, shows"],
  ["requests", "requests, ad requests, attempts"],
  ["fills", "fills, matched requests, filled requests, responses, matches"],
  ["fillRate", "fill rate, fillRate, match rate, matchRate, matched rate"],
  ["clicks", "clicks, ad clicks"]
] as const;

const comparisonWindows = [
  [
    "latest day",
    {
      en: "Needs at least 2 report dates. The demo compares the latest date with the previous date.",
      zh: "至少需要 2 个报表日期。Demo 会比较最近日期和前一个日期。"
    }
  ],
  [
    "last 7 days",
    {
      en: "Needs at least 14 report dates. The demo compares the latest 7 dates with the previous 7 dates.",
      zh: "至少需要 14 个报表日期。Demo 会比较最近 7 个日期和前 7 个日期。"
    }
  ],
  [
    "segment rows",
    {
      en: "Keep the same app, placement, country, and ad source names across periods so segment drops can be matched.",
      zh: "两个周期里尽量保持相同的 App、广告位、国家和广告源名称，这样才能匹配分组下滑。"
    }
  ]
] as const;

const copy = {
  en: {
    back: "Back to site",
    navDemo: "Demo",
    navCases: "Cases",
    navFree: "Free diagnosis",
    navFaq: "FAQ",
    navPrivacy: "Privacy",
    language: "Language",
    badge: "CSV templates",
    title: "Prepare ad monetization data for diagnosis.",
    lede:
      "These templates help small mobile game and app teams compare the latest day or latest 7 days against the previous period by revenue, weighted eCPM, impressions, fill rate, country, placement, and ad source. You can anonymize app names before using the demo.",
    download: "Download CSV",
    comparisonLabel: "Comparison windows",
    comparisonTitle: "How much data should I prepare?",
    requiredLabel: "Required fields",
    requiredTitle: "Minimum data needed for a useful diagnosis",
    recommendedLabel: "Recommended fields",
    recommendedTitle: "Better fields for finding the real driver",
    aliasesLabel: "Accepted aliases",
    aliasesTitle: "You do not have to rename every export column",
    dataRequirementsLabel: "Data requirements",
    dataRequirementsTitle: "Prepare the minimum fields needed for a reliable revenue-drop diagnosis.",
    dataRequirementsText:
      "Use this page to check which CSV columns are required, which fields improve diagnosis quality, and which export column names can be recognized automatically.",
    quickChecklistTitle: "Quick checklist",
    quickChecklist: [
      "At least 2 report dates for latest-day comparison",
      "At least 14 report dates for 7-day comparison",
      "Keep segment names consistent across periods",
      "Include revenue and impressions at minimum"
    ],
    bestFieldsTitle: "Best fields to include",
    bestFields: ["date", "app or game name", "placement / ad unit", "country", "ad source / network", "revenue", "impressions", "requests and fills if available"],
    safeAnonymizeTitle: "Safe to anonymize",
    safeAnonymize: ["appName", "placementName", "ad unit names", "package names", "account IDs"],
    safeAnonymizeNote: "Keep metric values and segment consistency intact.",
    sectionNotes: {
      comparison: {
        text: "Use enough report dates to compare the selected period against a matching previous period.",
        why:
          "One-day drops can be noisy. Matching comparison windows reduce false positives from weekday patterns, holidays, or traffic timing changes."
      },
      required: {
        text: "These fields are the minimum needed to produce a useful diagnosis card.",
        why:
          "Without date, country, network, revenue, and impressions, the diagnosis cannot reliably separate traffic drops from pricing or source-level changes."
      },
      recommended: {
        text: "These fields make the diagnosis more precise and help identify the real driver.",
        why:
          "Requests and fills are especially useful for detecting fill-rate or match-rate problems. Clicks can help sanity-check CTR changes."
      },
      aliases: {
        text: "You do not need to manually rename every export column before testing.",
        why:
          "The parser can recognize common column names from AdMob, AppLovin MAX, LevelPlay, TopOn, and custom reports as long as the meaning is clear."
      }
    },
    whyItMatters: "Why it matters",
    privacyTitle: "Privacy first",
    privacyText:
      "The public demo parses CSV files in your browser. Nothing is uploaded or stored. For manual review, remove app IDs, exact app names, and any private account identifiers before sending data.",
    tryDemo: "Try the demo",
    tryThisSample: "Try 14-day demo",
    dataSafety: "Data safety"
  },
  zh: {
    back: "返回官网",
    navDemo: "演示",
    navCases: "案例",
    navFree: "免费诊断",
    navFaq: "常见问题",
    navPrivacy: "数据安全",
    language: "语言",
    badge: "CSV 模板",
    title: "准备可用于诊断的广告变现数据。",
    lede:
      "这些模板帮助小型移动游戏和 App 团队按收入、加权 eCPM、展示量、填充率、国家、广告位和广告源，对比最近一天或最近 7 天与上一周期。使用 Demo 前可以先把 App 名称脱敏。",
    download: "下载 CSV",
    comparisonLabel: "对比周期",
    comparisonTitle: "应该准备多少数据？",
    requiredLabel: "必填字段",
    requiredTitle: "一次有用诊断需要的最少数据",
    recommendedLabel: "建议字段",
    recommendedTitle: "更容易找到真实原因的字段",
    aliasesLabel: "可识别别名",
    aliasesTitle: "不一定要手动重命名所有导出列",
    dataRequirementsLabel: "数据要求",
    dataRequirementsTitle: "准备可靠收入下降诊断所需的最少字段。",
    dataRequirementsText: "用这个页面确认哪些 CSV 列是必需的，哪些字段能提升诊断质量，以及哪些导出列名可以被自动识别。",
    quickChecklistTitle: "快速检查清单",
    quickChecklist: ["最近一天对比至少需要 2 个报表日期", "7 天对比至少需要 14 个报表日期", "两个周期内分组名称保持一致", "至少包含收入和展示量"],
    bestFieldsTitle: "最好包含的字段",
    bestFields: ["date", "app 或 game name", "placement / ad unit", "country", "ad source / network", "revenue", "impressions", "requests 和 fills（如果有）"],
    safeAnonymizeTitle: "可以脱敏的内容",
    safeAnonymize: ["appName", "placementName", "广告单元名称", "包名", "账号 ID"],
    safeAnonymizeNote: "保留指标数值和分组一致性，不要打乱对比关系。",
    sectionNotes: {
      comparison: {
        text: "准备足够的报表日期，用所选周期对比一个匹配的上一周期。",
        why: "单日下降可能有噪音。匹配的对比窗口可以减少工作日规律、节假日或流量时段变化带来的误判。"
      },
      required: {
        text: "这些字段是生成有用诊断卡所需的最低数据。",
        why: "如果没有日期、国家、广告源、收入和展示量，就很难可靠地区分流量下降、价格变化或广告源级变化。"
      },
      recommended: {
        text: "这些字段会让诊断更精确，更容易找到真实原因。",
        why: "requests 和 fills 对发现填充率或匹配率问题特别有用。clicks 可以帮助检查 CTR 变化是否合理。"
      },
      aliases: {
        text: "测试前不需要手动重命名每一个导出列。",
        why: "只要含义清楚，解析器可以识别 AdMob、AppLovin MAX、LevelPlay、TopOn 和自定义报表里的常见列名。"
      }
    },
    whyItMatters: "为什么重要",
    privacyTitle: "隐私优先",
    privacyText:
      "公开 Demo 只在浏览器本地解析 CSV，不上传、不保存。申请人工诊断前，请移除 App ID、精确 App 名称和任何私密账号标识。",
    tryDemo: "试用演示",
    tryThisSample: "试用 14 天演示",
    dataSafety: "数据安全"
  }
};

export function TemplatesContent() {
  const [lang, setLang] = useLanguagePreference("en");
  const t = copy[lang];

  return (
    <main className="resource-page" lang={lang === "zh" ? "zh-CN" : "en"}>
      <nav className="resource-nav" aria-label="Templates navigation">
        <a href="../">
          <ArrowLeft size={17} aria-hidden="true" />
          {t.back}
        </a>
        <div>
          <a href="../demo/">{t.navDemo}</a>
          <a href="../cases/">{t.navCases}</a>
          <a href="../free-diagnosis/">{t.navFree}</a>
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
          <FileSpreadsheet size={16} aria-hidden="true" />
          {t.badge}
        </p>
        <h1>{t.title}</h1>
        <p>{t.lede}</p>
      </section>

      <section className="template-grid" aria-label="Download CSV templates">
        {templates.map((template) => (
          <article className="resource-card" key={template.href}>
            <span className="resource-icon">
              <FileSpreadsheet size={22} aria-hidden="true" />
            </span>
            <h2>{template[lang].title}</h2>
            <p>{template[lang].note}</p>
            <code>{template.fields}</code>
            <div className="resource-card-actions">
              <a className="primary-action" download href={template.href}>
                <Download size={18} aria-hidden="true" />
                {t.download}
              </a>
              {template.demoHref ? (
                <a className="secondary-action" href={template.demoHref}>
                  <Play size={18} aria-hidden="true" />
                  {t.tryThisSample}
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </section>

      <section className="data-requirements-overview" aria-label={t.dataRequirementsLabel}>
        <aside className="data-requirements-copy">
          <p className="section-label">{t.dataRequirementsLabel}</p>
          <h2>{t.dataRequirementsTitle}</h2>
          <p>{t.dataRequirementsText}</p>
        </aside>
        <div className="data-requirements-cards">
          <article className="data-requirements-card">
            <h3>{t.quickChecklistTitle}</h3>
            <ul>
              {t.quickChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="data-requirements-card">
            <h3>{t.bestFieldsTitle}</h3>
            <ul>
              {t.bestFields.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="data-requirements-card data-requirements-safe-card">
            <h3>{t.safeAnonymizeTitle}</h3>
            <ul>
              {t.safeAnonymize.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>{t.safeAnonymizeNote}</p>
          </article>
        </div>
      </section>

      <section className="field-section template-field-section">
        <div className="field-section-copy">
          <p className="section-label">{t.comparisonLabel}</p>
          <h2>{t.comparisonTitle}</h2>
          <p>{t.sectionNotes.comparison.text}</p>
          <div className="field-note-card">
            <h3>{t.whyItMatters}</h3>
            <p>{t.sectionNotes.comparison.why}</p>
          </div>
        </div>
        <div className="field-table-wrap">
          <table className="field-table">
            <tbody>
              {comparisonWindows.map(([windowName, description]) => (
                <tr key={windowName}>
                  <th>{windowName}</th>
                  <td>{description[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="field-section template-field-section">
        <div className="field-section-copy">
          <p className="section-label">{t.requiredLabel}</p>
          <h2>{t.requiredTitle}</h2>
          <p>{t.sectionNotes.required.text}</p>
          <div className="field-note-card">
            <h3>{t.whyItMatters}</h3>
            <p>{t.sectionNotes.required.why}</p>
          </div>
        </div>
        <div className="field-table-wrap">
          <table className="field-table">
            <tbody>
              {requiredFields.map(([field, description]) => (
                <tr key={field}>
                  <th>{field}</th>
                  <td>{description[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="field-section template-field-section">
        <div className="field-section-copy">
          <p className="section-label">{t.recommendedLabel}</p>
          <h2>{t.recommendedTitle}</h2>
          <p>{t.sectionNotes.recommended.text}</p>
          <div className="field-note-card">
            <h3>{t.whyItMatters}</h3>
            <p>{t.sectionNotes.recommended.why}</p>
          </div>
        </div>
        <div className="field-table-wrap">
          <table className="field-table">
            <tbody>
              {recommendedFields.map(([field, description]) => (
                <tr key={field}>
                  <th>{field}</th>
                  <td>{description[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="field-section template-field-section">
        <div className="field-section-copy">
          <p className="section-label">{t.aliasesLabel}</p>
          <h2>{t.aliasesTitle}</h2>
          <p>{t.sectionNotes.aliases.text}</p>
          <div className="field-note-card">
            <h3>{t.whyItMatters}</h3>
            <p>{t.sectionNotes.aliases.why}</p>
          </div>
        </div>
        <div className="field-table-wrap">
          <table className="field-table alias-table">
            <tbody>
              {acceptedAliases.map(([field, aliases]) => (
                <tr key={field}>
                  <th>{field}</th>
                  <td>{aliases}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="resource-cta">
        <ShieldCheck size={24} aria-hidden="true" />
        <div>
          <h2>{t.privacyTitle}</h2>
          <p>{t.privacyText}</p>
        </div>
        <a className="secondary-action" href="../demo/">
          {t.tryDemo}
        </a>
        <a className="secondary-action" href="../privacy/">
          {t.dataSafety}
        </a>
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
