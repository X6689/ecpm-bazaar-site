"use client";

import { useState } from "react";
import { ArrowLeft, BarChart3, CheckCircle2, Copy, Mail, Play } from "lucide-react";
import type { DemoScenarioId } from "@/lib/demo-data";
import { writeClipboardText } from "@/lib/clipboard";
import { useLanguagePreference } from "@/lib/language";
import { SiteFooter } from "../site-footer";

type DiagnosisCase = {
  scenarioId: DemoScenarioId;
  en: {
    title: string;
    signal: string;
    diagnosis: string;
    checks: string[];
    card: {
      problem: string;
      cause: string;
      severity: string;
      country: string;
      placement: string;
      source: string;
      action: string;
    };
  };
  zh: {
    title: string;
    signal: string;
    diagnosis: string;
    checks: string[];
    card: {
      problem: string;
      cause: string;
      severity: string;
      country: string;
      placement: string;
      source: string;
      action: string;
    };
  };
};

const cases: DiagnosisCase[] = [
  {
    scenarioId: "ecpm-drop",
    en: {
      title: "Case 1: eCPM dropped, traffic stayed stable",
      signal: "Revenue fell 24%. Impressions were almost flat, but weighted eCPM dropped from $18.40 to $13.90.",
      diagnosis:
        "This looks more like a pricing or demand issue than a traffic issue. The first checks should be country mix, bidder/source performance, eCPM floors, seasonality, and recent mediation changes.",
      checks: ["Compare eCPM by country", "Check top ad sources", "Review floor or waterfall changes", "Look for platform status or demand changes"],
      card: {
        problem: "Revenue dropped 24%",
        cause: "eCPM dropped",
        severity: "Medium",
        country: "Mixed geos",
        placement: "Rewarded + interstitial",
        source: "Top demand sources",
        action: "Compare eCPM by country and source before changing traffic or placement logic."
      }
    },
    zh: {
      title: "案例 1：eCPM 下降，流量基本稳定",
      signal: "收入下降 24%。展示量几乎持平，但加权 eCPM 从 $18.40 降到 $13.90。",
      diagnosis:
        "这更像是价格或需求问题，而不是流量问题。优先检查国家结构、竞价/广告源表现、eCPM 底价、季节性和近期聚合配置变化。",
      checks: ["按国家比较 eCPM", "检查头部广告源", "复查底价或瀑布流变化", "查看平台状态或需求变化"],
      card: {
        problem: "收入下降 24%",
        cause: "eCPM 下降",
        severity: "中",
        country: "多国家组合",
        placement: "激励视频 + 插屏",
        source: "头部广告源",
        action: "先按国家和广告源比较 eCPM，再决定是否调整流量或广告位逻辑。"
      }
    }
  },
  {
    scenarioId: "fill-rate-drop",
    en: {
      title: "Case 2: fill rate dropped before revenue dropped",
      signal: "Revenue fell 31%. eCPM stayed close to normal, but fill rate moved from 78% to 54%.",
      diagnosis:
        "The eCPM number alone is misleading here. The likely driver is fill or match pressure, so changing price floors blindly could make the diagnosis worse.",
      checks: ["Split requests and fills by country", "Check timeout and request logic", "Review source availability", "Inspect recent SDK or mediation releases"],
      card: {
        problem: "Revenue dropped 31%",
        cause: "Fill rate dropped",
        severity: "High",
        country: "United States",
        placement: "Rewarded Video",
        source: "Unity Ads",
        action: "Check source availability, timeout, mediation release, and floor settings first."
      }
    },
    zh: {
      title: "案例 2：填充率先下降，随后收入下降",
      signal: "收入下降 31%。eCPM 接近正常，但填充率从 78% 降到 54%。",
      diagnosis:
        "这里只看 eCPM 会误导判断。更可能是填充或匹配压力，盲目改底价可能让问题更严重。",
      checks: ["按国家拆 requests 和 fills", "检查超时和请求逻辑", "复查广告源可用性", "检查近期 SDK 或聚合版本变更"],
      card: {
        problem: "收入下降 31%",
        cause: "填充率下降",
        severity: "高",
        country: "美国",
        placement: "激励视频",
        source: "Unity Ads",
        action: "先检查广告源可用性、超时、聚合版本和底价配置。"
      }
    }
  },
  {
    scenarioId: "country-mix",
    en: {
      title: "Case 3: country mix made eCPM look worse",
      signal: "Total eCPM dropped 18%, but US eCPM was stable. More impressions came from lower-eCPM countries.",
      diagnosis:
        "This is probably a traffic mix issue, not a global pricing collapse. The team should compare revenue contribution by country before changing global mediation settings.",
      checks: ["Compare impressions share by country", "Check UA campaigns and organic traffic sources", "Review placement exposure by region", "Separate country mix from source performance"],
      card: {
        problem: "Total eCPM dropped 18%",
        cause: "Country mix changed",
        severity: "Low",
        country: "US stable, BR/IN share up",
        placement: "All placements",
        source: "All sources",
        action: "Separate country mix from source pricing before changing global mediation settings."
      }
    },
    zh: {
      title: "案例 3：国家结构变化让总 eCPM 看起来变差",
      signal: "总 eCPM 下降 18%，但美国 eCPM 稳定。更多展示来自低 eCPM 国家。",
      diagnosis:
        "这更可能是流量结构变化，而不是全球价格崩了。团队应先按国家比较收入贡献，再决定是否改全局聚合配置。",
      checks: ["比较各国家展示占比", "检查买量和自然流量来源", "按地区复查广告位曝光", "把国家结构和广告源表现分开看"],
      card: {
        problem: "总 eCPM 下降 18%",
        cause: "国家结构变化",
        severity: "低",
        country: "美国稳定，巴西/印度占比上升",
        placement: "全部广告位",
        source: "全部广告源",
        action: "先把国家结构变化和广告源价格变化分开，再改全局聚合设置。"
      }
    }
  }
];

const copy = {
  en: {
    back: "Back to site",
    navDemo: "Demo",
    navTemplates: "Templates",
    navFree: "Free diagnosis",
    navFaq: "FAQ",
    navPrivacy: "Privacy",
    language: "Language",
    badge: "Anonymized cases",
    title: "Three common reasons mobile ad revenue changes.",
    lede:
      "eCPM Bazaar is built around a simple idea: when ad revenue changes, diagnose the driver before changing mediation, floors, placements, or user acquisition decisions.",
    example: "Diagnosis example",
    mainCause: "Main cause",
    severity: "Severity",
    country: "Country",
    placement: "Placement",
    source: "Ad source",
    ctaTitle: "Want to test your own data?",
    ctaText: "Use the browser-only demo or send anonymized fields for a free manual diagnosis.",
    tryDemo: "Try demo",
    tryThisCase: "Try this case in demo",
    requestThisCase: "Request diagnosis",
    copyCaseLink: "Copy case link",
    copiedCaseLink: "Copied link",
    freeDiagnosis: "Free diagnosis",
    faq: "FAQ"
  },
  zh: {
    back: "返回官网",
    navDemo: "演示",
    navTemplates: "模板",
    navFree: "免费诊断",
    navFaq: "常见问题",
    navPrivacy: "数据安全",
    language: "语言",
    badge: "脱敏案例",
    title: "移动广告收入变化的三类常见原因。",
    lede:
      "eCPM Bazaar 的核心思路很简单：收入变化时，先诊断驱动因素，再决定是否调整聚合、底价、广告位或买量策略。",
    example: "诊断案例",
    mainCause: "主要原因",
    severity: "严重程度",
    country: "国家地区",
    placement: "广告位",
    source: "广告源",
    ctaTitle: "想测试自己的数据？",
    ctaText: "可以使用浏览器本地 Demo，也可以发送脱敏字段申请一次免费人工诊断。",
    tryDemo: "试用演示",
    tryThisCase: "在 Demo 中打开这个案例",
    requestThisCase: "申请诊断",
    copyCaseLink: "复制案例链接",
    copiedCaseLink: "已复制链接",
    freeDiagnosis: "免费诊断",
    faq: "常见问题"
  }
};

export function CasesContent() {
  const [lang, setLang] = useLanguagePreference("en");
  const [copiedCase, setCopiedCase] = useState<DemoScenarioId | null>(null);
  const t = copy[lang];

  async function copyCaseLink(scenarioId: DemoScenarioId) {
    const url = new URL(`../demo/?case=${scenarioId}`, window.location.href);
    if (await writeClipboardText(url.toString())) {
      setCopiedCase(scenarioId);
      window.setTimeout(() => setCopiedCase(null), 1600);
    }
  }

  return (
    <main className="resource-page" lang={lang === "zh" ? "zh-CN" : "en"}>
      <nav className="resource-nav" aria-label="Cases navigation">
        <a href="../">
          <ArrowLeft size={17} aria-hidden="true" />
          {t.back}
        </a>
        <div>
          <a href="../demo/">{t.navDemo}</a>
          <a href="../templates/">{t.navTemplates}</a>
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
          <BarChart3 size={16} aria-hidden="true" />
          {t.badge}
        </p>
        <h1>{t.title}</h1>
        <p>{t.lede}</p>
      </section>

      <section className="case-list" aria-label="Diagnosis examples">
        {cases.map((item) => {
          const current = item[lang];
          return (
            <article className="case-card" key={current.title}>
              <div>
                <p className="section-label">{t.example}</p>
                <h2>{current.title}</h2>
                <p className="case-signal">{current.signal}</p>
                <p>{current.diagnosis}</p>
              </div>
              <div className="case-card-output">
                <div className="mini-diagnosis-card">
                  <span className="share-card-brand">eCPM Bazaar</span>
                  <h3>{current.card.problem}</h3>
                  <div className="mini-cause">
                    <span>{t.mainCause}</span>
                    <strong>{current.card.cause}</strong>
                  </div>
                  <dl>
                    <div>
                      <dt>{t.severity}</dt>
                      <dd>{current.card.severity}</dd>
                    </div>
                    <div>
                      <dt>{t.country}</dt>
                      <dd>{current.card.country}</dd>
                    </div>
                    <div>
                      <dt>{t.placement}</dt>
                      <dd>{current.card.placement}</dd>
                    </div>
                    <div>
                      <dt>{t.source}</dt>
                      <dd>{current.card.source}</dd>
                    </div>
                  </dl>
                  <p>{current.card.action}</p>
                </div>
                <div className="check-list">
                  {current.checks.map((check) => (
                    <span key={check}>
                      <CheckCircle2 size={17} aria-hidden="true" />
                      {check}
                    </span>
                  ))}
                </div>
                <div className="case-card-actions">
                  <a className="case-demo-link" href={`../demo/?case=${item.scenarioId}`}>
                    <Play size={17} aria-hidden="true" />
                    {t.tryThisCase}
                  </a>
                  <a className="case-free-link" href={`../free-diagnosis/?case=${item.scenarioId}`}>
                    <Mail size={17} aria-hidden="true" />
                    {t.requestThisCase}
                  </a>
                  <button className="case-copy-link" type="button" onClick={() => copyCaseLink(item.scenarioId)}>
                    {copiedCase === item.scenarioId ? <CheckCircle2 size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
                    {copiedCase === item.scenarioId ? t.copiedCaseLink : t.copyCaseLink}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="resource-cta">
        <BarChart3 size={24} aria-hidden="true" />
        <div>
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaText}</p>
        </div>
        <a className="primary-action" href="../demo/">
          {t.tryDemo}
        </a>
        <a className="secondary-action" href="../free-diagnosis/">
          {t.freeDiagnosis}
        </a>
        <a className="secondary-action" href="../faq/">
          {t.faq}
        </a>
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
