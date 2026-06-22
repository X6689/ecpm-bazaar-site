"use client";

import { ArrowLeft, Download, FileSpreadsheet, ShieldCheck } from "lucide-react";
import { useLanguagePreference } from "@/lib/language";

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
      "These templates help small mobile game and app teams compare the latest day with the previous day by revenue, weighted eCPM, impressions, fill rate, country, placement, and ad source. You can anonymize app names before using the demo.",
    download: "Download CSV",
    requiredLabel: "Required fields",
    requiredTitle: "Minimum data needed for a useful diagnosis",
    recommendedLabel: "Recommended fields",
    recommendedTitle: "Better fields for finding the real driver",
    aliasesLabel: "Accepted aliases",
    aliasesTitle: "You do not have to rename every export column",
    privacyTitle: "Privacy first",
    privacyText:
      "The public demo parses CSV files in your browser. Nothing is uploaded or stored. For manual review, remove app IDs, exact app names, and any private account identifiers before sending data.",
    tryDemo: "Try the demo",
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
      "这些模板帮助小型移动游戏和 App 团队按收入、加权 eCPM、展示量、填充率、国家、广告位和广告源，对比最近一天与前一天。使用 Demo 前可以先把 App 名称脱敏。",
    download: "下载 CSV",
    requiredLabel: "必填字段",
    requiredTitle: "一次有用诊断需要的最少数据",
    recommendedLabel: "建议字段",
    recommendedTitle: "更容易找到真实原因的字段",
    aliasesLabel: "可识别别名",
    aliasesTitle: "不一定要手动重命名所有导出列",
    privacyTitle: "隐私优先",
    privacyText:
      "公开 Demo 只在浏览器本地解析 CSV，不上传、不保存。申请人工诊断前，请移除 App ID、精确 App 名称和任何私密账号标识。",
    tryDemo: "试用演示",
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
            <a className="primary-action" download href={template.href}>
              <Download size={18} aria-hidden="true" />
              {t.download}
            </a>
          </article>
        ))}
      </section>

      <section className="field-section">
        <div>
          <p className="section-label">{t.requiredLabel}</p>
          <h2>{t.requiredTitle}</h2>
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

      <section className="field-section">
        <div>
          <p className="section-label">{t.recommendedLabel}</p>
          <h2>{t.recommendedTitle}</h2>
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

      <section className="field-section">
        <div>
          <p className="section-label">{t.aliasesLabel}</p>
          <h2>{t.aliasesTitle}</h2>
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
    </main>
  );
}
