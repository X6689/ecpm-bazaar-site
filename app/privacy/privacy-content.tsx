"use client";

import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { useLanguagePreference } from "@/lib/language";
import { SiteFooter } from "../site-footer";

const principles = [
  {
    en: {
      title: "Browser-only public demo",
      text:
        "CSV files selected in the public demo are parsed in your browser and are not uploaded. If you choose Request free diagnosis, a compact draft may be kept in browser session storage to prefill the request page; it is not sent unless you use your email app."
    },
    zh: {
      title: "公开 Demo 只在浏览器本地运行",
      text:
        "你在公开 Demo 里选择的 CSV 文件只会在浏览器里解析，不会上传。如果选择申请免费诊断，浏览器可能在当前会话存储一份简短草稿预填请求页；只有使用邮件 App 时才会由你决定发送。"
    }
  },
  {
    en: {
      title: "No credentials required",
      text: "Do not send AdMob, AppLovin MAX, Unity LevelPlay, TopOn, Google, or mediation login credentials. The early workflow only needs anonymized report rows."
    },
    zh: {
      title: "不需要账号凭证",
      text: "不要发送 AdMob、AppLovin MAX、Unity LevelPlay、TopOn、Google 或聚合平台登录凭证。早期流程只需要脱敏报表行。"
    }
  },
  {
    en: {
      title: "Anonymize before sharing",
      text: "Replace app names, ad unit IDs, account IDs, package names, and any private identifiers before sending rows for a directional diagnosis."
    },
    zh: {
      title: "分享前先脱敏",
      text: "发送方向性诊断请求前，请替换 App 名、广告单元 ID、账号 ID、包名和任何私密标识。"
    }
  },
  {
    en: {
      title: "Diagnosis, not financial advice",
      text: "The output is a practical diagnosis to guide investigation. It is not a guarantee of revenue improvement or a recommendation to change business settings blindly."
    },
    zh: {
      title: "这是诊断，不是财务建议",
      text: "输出用于指导排查，不承诺收入提升，也不是让你盲目修改商业配置的建议。"
    }
  }
];

const doSend = [
  { en: "date", zh: "日期" },
  { en: "country or region", zh: "国家或地区" },
  { en: "placement or ad unit name, anonymized", zh: "脱敏后的广告位或广告单元名称" },
  { en: "ad source or network, anonymized if needed", zh: "广告源或广告网络，必要时脱敏" },
  { en: "revenue, impressions, eCPM", zh: "收入、展示量、eCPM" },
  { en: "requests, matched requests, fills, fill rate, and match rate when available (keep their platform definitions separate)", zh: "可用时提供 requests、matched requests、fills、fill rate 和 match rate，并保留各自的平台定义" }
];

const doNotSend = [
  { en: "passwords or login sessions", zh: "密码或登录会话" },
  { en: "API keys or publisher keys", zh: "API key 或 publisher key" },
  { en: "private account IDs", zh: "私密账号 ID" },
  { en: "non-anonymized user-level data", zh: "未脱敏的用户级数据" },
  { en: "payment details", zh: "付款信息" },
  { en: "screenshots containing private account identifiers", zh: "包含私密账号标识的截图" }
];

const copy = {
  en: {
    back: "Back to site",
    navDemo: "Demo",
    navTemplates: "Templates",
    navFaq: "FAQ",
    navFree: "Free diagnosis",
    language: "Language",
    badge: "Data safety",
    title: "Use anonymized ad monetization data. Keep account access private.",
    lede:
      "eCPM Bazaar is being validated with privacy-first workflows: browser-only CSV parsing, anonymized rows, no dashboard login, and no account credentials.",
    safeLabel: "Safe to share",
    safeTitle: "Useful anonymized fields",
    privateLabel: "Do not send",
    privateTitle: "Keep these private",
    ok: "OK",
    private: "Private",
    ctaTitle: "Need a directional diagnosis?",
    ctaText: "Use the free diagnosis page to copy the field list and prepare anonymized rows.",
    freeDiagnosis: "Free diagnosis"
  },
  zh: {
    back: "返回官网",
    navDemo: "演示",
    navTemplates: "模板",
    navFaq: "常见问题",
    navFree: "免费诊断",
    language: "语言",
    badge: "数据安全",
    title: "使用脱敏广告变现数据，账号权限保持私密。",
    lede: "eCPM Bazaar 现在用隐私优先的方式验证：浏览器本地 CSV 解析、脱敏数据行、不需要账号凭证。",
    safeLabel: "可以分享",
    safeTitle: "有用的脱敏字段",
    privateLabel: "不要发送",
    privateTitle: "这些信息请保持私密",
    ok: "可以",
    private: "私密",
    ctaTitle: "需要方向性诊断？",
    ctaText: "到免费诊断页复制字段列表，准备脱敏数据行即可。",
    freeDiagnosis: "免费诊断"
  }
};

export function PrivacyContent() {
  const [lang, setLang] = useLanguagePreference("en");
  const t = copy[lang];

  return (
    <main className="resource-page" lang={lang === "zh" ? "zh-CN" : "en"}>
      <nav className="resource-nav" aria-label="Privacy navigation">
        <a href="../">
          <ArrowLeft size={17} aria-hidden="true" />
          {t.back}
        </a>
        <div>
          <a href="../demo/">{t.navDemo}</a>
          <a href="../templates/">{t.navTemplates}</a>
          <a href="../faq/">{t.navFaq}</a>
          <a href="../free-diagnosis/">{t.navFree}</a>
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
          <ShieldCheck size={16} aria-hidden="true" />
          {t.badge}
        </p>
        <h1>{t.title}</h1>
        <p>{t.lede}</p>
      </section>

      <section className="template-grid" aria-label="Privacy principles">
        {principles.map((item) => (
          <article className="resource-card" key={item.en.title}>
            <span className="resource-icon">
              <ShieldCheck size={22} aria-hidden="true" />
            </span>
            <h2>{item[lang].title}</h2>
            <p>{item[lang].text}</p>
          </article>
        ))}
      </section>

      <section className="field-section">
        <div>
          <p className="section-label">{t.safeLabel}</p>
          <h2>{t.safeTitle}</h2>
        </div>
        <div className="field-table-wrap">
          <table className="field-table">
            <tbody>
              {doSend.map((item) => (
                <tr key={item.en}>
                  <th>{t.ok}</th>
                  <td>{item[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="field-section">
        <div>
          <p className="section-label">{t.privateLabel}</p>
          <h2>{t.privateTitle}</h2>
        </div>
        <div className="field-table-wrap">
          <table className="field-table">
            <tbody>
              {doNotSend.map((item) => (
                <tr key={item.en}>
                  <th>{t.private}</th>
                  <td>{item[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="resource-cta">
        <Mail size={24} aria-hidden="true" />
        <div>
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaText}</p>
        </div>
        <a className="primary-action" href="../free-diagnosis/">
          {t.freeDiagnosis}
        </a>
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
