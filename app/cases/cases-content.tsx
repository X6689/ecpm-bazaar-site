"use client";

import { useState } from "react";
import { ArrowLeft, BarChart3, CheckCircle2, Copy, Mail, Play } from "lucide-react";
import type { DemoScenarioId } from "@/lib/demo-data";
import { writeClipboardText } from "@/lib/clipboard";
import { useLanguagePreference } from "@/lib/language";
import { trackEvent } from "@/lib/validation-events";
import { SiteFooter } from "../site-footer";

type DiagnosisCase = {
  scenarioId?: DemoScenarioId;
  en: {
    title: string;
    signal: string;
    diagnosis: string;
    meaning: string;
    takeaway: string;
    whatToAvoid: string;
    diagnosisLogic: string;
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
    meaning: string;
    takeaway: string;
    whatToAvoid: string;
    diagnosisLogic: string;
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
      meaning:
        "Traffic volume stayed stable, so the most likely driver is pricing, demand, source performance, floor settings, or country-level eCPM changes.",
      takeaway: "Do not change traffic or placement logic before checking whether pricing changed.",
      whatToAvoid:
        "Avoid treating a pricing drop as a traffic-quality problem before checking country-level eCPM and source performance.",
      diagnosisLogic:
        "When impressions stay stable but revenue falls, the first suspect is weighted eCPM, source demand, floor settings, or country-level pricing.",
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
      meaning: "流量体量基本稳定，所以更可能是价格、需求、广告源表现、底价设置或国家级 eCPM 变化导致。",
      takeaway: "在确认价格或需求是否变化之前，不要先改流量或广告位逻辑。",
      whatToAvoid: "在检查国家级 eCPM 和广告源表现之前，不要先把价格下降误判成流量质量问题。",
      diagnosisLogic: "当展示量稳定但收入下降时，优先怀疑加权 eCPM、广告源需求、底价设置或国家级价格变化。",
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
        "The eCPM number alone is misleading here. The most likely driver is fill or match pressure, so changing price floors blindly could make the diagnosis worse.",
      meaning: "Demand price may still be normal, but fewer requests are turning into filled impressions.",
      takeaway: "If fill rate drops while eCPM stays stable, blindly adjusting price floors can make the diagnosis worse.",
      whatToAvoid:
        "Avoid changing eCPM floors first when the real issue may be fewer requests turning into filled impressions.",
      diagnosisLogic:
        "Stable eCPM with lower fill rate usually points to source availability, timeout, SDK, mediation, or request logic issues.",
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
      meaning: "广告价格可能仍然正常，但更少请求变成了有效填充和展示。",
      takeaway: "如果填充率下降而 eCPM 稳定，盲目调底价可能会让诊断更糟。",
      whatToAvoid: "当真实问题可能是更少请求转化为填充展示时，不要先调整 eCPM 底价。",
      diagnosisLogic: "eCPM 稳定但填充率下降，通常指向广告源可用性、超时、SDK、聚合或请求逻辑问题。",
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
      meaning:
        "Blended eCPM can fall even when top-country eCPM stays stable, if more impressions come from lower-eCPM countries.",
      takeaway: "Do not treat a traffic mix shift as a global demand collapse.",
      whatToAvoid:
        "Avoid changing global mediation settings before separating Tier 1 trends from blended traffic mix changes.",
      diagnosisLogic:
        "Blended eCPM can fall even when top-country eCPM stays stable if more impressions shift toward lower-eCPM regions.",
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
      meaning: "即使头部国家 eCPM 稳定，只要更多展示来自低 eCPM 国家，混合 eCPM 也会下降。",
      takeaway: "不要把流量结构变化误判成全球广告需求崩塌。",
      whatToAvoid: "在分离 Tier 1 趋势和混合流量结构变化之前，不要先改全局聚合设置。",
      diagnosisLogic: "即使头部国家 eCPM 稳定，只要更多展示转向低 eCPM 地区，混合 eCPM 也会下降。",
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
  },
  {
    en: {
      title: "Case 4: live events reduced peak-hour impressions",
      signal:
        "Revenue looked weaker during the week, but eCPM and match rate stayed mostly stable. The real drop came from fewer impressions during the app's normal evening peak window.",
      diagnosis:
        "This looks less like an ad demand problem and more like an audience behavior shift. Daily averages can make the revenue trend look worse than the ad stack really is.",
      meaning:
        "Sports events, holidays, exams, work schedules, or local events can reduce user activity during the app's normal peak monetization window.",
      takeaway: "If revenue drops during the app's normal peak hours, split by hour before assuming eCPM, demand, or mediation failed.",
      whatToAvoid:
        "Avoid assuming the ad stack failed when impressions per user drops only during event hours or normal peak windows.",
      diagnosisLogic:
        "If eCPM and match rate stay stable while peak-hour impressions fall, the most likely driver is audience behavior rather than ad demand.",
      checks: [
        "Compare event days vs normal days",
        "Check the normal peak window separately",
        "Compare event hours vs nearby non-event hours",
        "Check impressions per user",
        "Confirm eCPM and match rate stayed stable"
      ],
      card: {
        problem: "Revenue dropped 19%",
        cause: "Peak-hour impressions dropped",
        severity: "Medium",
        country: "Sports-heavy GEO",
        placement: "Native + interstitial",
        source: "All sources",
        action: "Compare hourly impressions and impressions per user before changing mediation settings."
      }
    },
    zh: {
      title: "案例 4：现场赛事减少了高峰时段展示",
      signal:
        "这一周收入看起来变弱，但 eCPM 和匹配率基本稳定。真正下降来自 App 正常晚间高峰窗口内展示减少。",
      diagnosis:
        "这不像广告需求问题，更像用户行为变化。日均值会让收入趋势看起来比广告栈真实情况更糟。",
      meaning: "体育赛事、节假日、考试、工作节奏或本地事件，都可能减少 App 正常变现高峰期的用户活跃。",
      takeaway: "如果收入在正常高峰时段下降，先按小时拆分，再判断 eCPM、需求或聚合是否出问题。",
      whatToAvoid: "如果每用户展示只在事件时段或正常高峰窗口下降，不要先假设广告栈失效。",
      diagnosisLogic: "如果 eCPM 和匹配率稳定，但高峰时段展示下降，更可能是用户行为变化，而不是广告需求问题。",
      checks: ["比较事件日和正常日", "单独检查正常高峰窗口", "比较事件时段和相邻非事件时段", "检查每用户展示次数", "确认 eCPM 和匹配率是否稳定"],
      card: {
        problem: "收入下降 19%",
        cause: "高峰时段展示下降",
        severity: "中",
        country: "体育受众 GEO",
        placement: "原生 + 插屏",
        source: "全部广告源",
        action: "调整聚合配置前，先比较小时级展示和每用户展示次数。"
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
    badge: "Directional diagnosis examples",
    title: "See how a mobile ad revenue change is investigated before settings change.",
    lede:
      "Before sending your own data, review how eCPM Bazaar turns anonymized mobile ad monetization rows into a diagnosis card, most likely drivers, and recommended next tests.",
    example: "Directional example",
    scenario: "Scenario",
    observedChange: "Observed change",
    whyThisFits: "Why this interpretation fits",
    supportingSignals: "Supporting signals",
    dataLimitations: "Data limitations",
    dataLimitationsText: "This is a directional example. A real diagnosis should compare the same segments across matching periods.",
    diagnosisStatus: "Diagnosis status",
    directionalExample: "Directional example",
    mostLikelyDriver: "Most likely driver",
    severity: "Severity",
    country: "Country",
    placement: "Placement",
    source: "Ad source",
    whatThisMeans: "What this means",
    firstChecks: "First checks",
    takeaway: "Takeaway",
    whatToAvoid: "What to avoid",
    diagnosisLogic: "Diagnosis logic",
    recommendedChecks: "Recommended checks",
    actionsTitle: "Next action",
    ctaTitle: "Want to test your own data?",
    ctaText: "Use the browser-only demo or send anonymized fields to request a free directional diagnosis.",
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
    badge: "方向性诊断示例",
    title: "查看移动广告收入变化在修改设置前如何被排查。",
    lede:
      "发送自己的数据前，可以先看 eCPM Bazaar 如何把脱敏手游广告变现数据整理成诊断卡、可能原因和下一步测试建议。",
    example: "方向性示例",
    scenario: "场景",
    observedChange: "观察到的变化",
    whyThisFits: "为什么这个判断合理",
    supportingSignals: "支持信号",
    dataLimitations: "数据限制",
    dataLimitationsText: "这是方向性示例。真实诊断应在匹配的周期中比较相同分组。",
    diagnosisStatus: "诊断状态",
    directionalExample: "方向性示例",
    mostLikelyDriver: "最可能驱动因素",
    severity: "严重程度",
    country: "国家地区",
    placement: "广告位",
    source: "广告源",
    whatThisMeans: "这说明什么",
    firstChecks: "优先检查",
    takeaway: "关键提醒",
    whatToAvoid: "避免误判",
    diagnosisLogic: "诊断逻辑",
    recommendedChecks: "推荐检查项",
    actionsTitle: "下一步动作",
    ctaTitle: "想测试自己的数据？",
    ctaText: "可以使用浏览器本地 Demo，也可以发送脱敏字段申请一次免费方向性诊断。",
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
          const scenarioId = item.scenarioId;
          const hasDemoScenario = scenarioId !== undefined;
          return (
            <article className="case-card" key={current.title}>
              <div className="case-top-grid">
                <div className="case-explanation-panel">
                  <p className="section-label">{t.scenario}</p>
                  <h2>{current.title}</h2>
                  <h3>{t.observedChange}</h3>
                  <p className="case-signal">{current.signal}</p>
                  <div className="case-insight-grid">
                    <div className="case-insight-card">
                      <h3>{t.whyThisFits}</h3>
                      <p>{current.diagnosis}</p>
                    </div>
                    <div className="case-insight-card">
                      <h3>{t.supportingSignals}</h3>
                      <p>{current.meaning}</p>
                    </div>
                  </div>
                </div>
                <div className="case-card-output">
                  <div className="mini-diagnosis-card">
                    <span className="share-card-brand">eCPM Bazaar</span>
                    <h3>{current.card.problem}</h3>
                    <div className="mini-score">
                    <span>{t.diagnosisStatus}</span>
                      <strong>{t.directionalExample}</strong>
                    </div>
                    <div className="mini-cause">
                      <span>{t.mostLikelyDriver}</span>
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
                </div>
              </div>
              <div className="case-action-grid">
                <div className="case-action-left-stack">
                  <div className="case-takeaway">
                    <h3>{t.takeaway}</h3>
                    <p>{current.takeaway}</p>
                  </div>
                  <div className="case-guidance-card">
                    <h3>{t.whatToAvoid}</h3>
                    <p>{current.whatToAvoid}</p>
                  </div>
                  <div className="case-guidance-card">
                    <h3>{t.diagnosisLogic}</h3>
                    <p>{current.diagnosisLogic}</p>
                  </div>
                  <div className="case-guidance-card">
                    <h3>{t.dataLimitations}</h3>
                    <p>{t.dataLimitationsText}</p>
                  </div>
                </div>
                <div className="case-action-right-stack">
                <div className="recommended-checks-panel">
                  <h3>{t.recommendedChecks}</h3>
                  <div className="check-list">
                    {current.checks.map((check) => (
                      <span key={check}>
                        <CheckCircle2 size={17} aria-hidden="true" />
                        {check}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="case-actions-panel">
                  <h3>{t.actionsTitle}</h3>
                  <div className="case-card-actions">
                    {hasDemoScenario ? (
                      <a
                        className="case-demo-link"
                        href={`../demo/?case=${scenarioId}`}
                        onClick={() => trackEvent("case_demo_started", { page_path: "/cases/", source_cta: "case-card", case_type: scenarioId })}
                      >
                        <Play size={17} aria-hidden="true" />
                        {t.tryThisCase}
                      </a>
                    ) : null}
                    <a className="case-free-link" href={scenarioId ? `../free-diagnosis/?case=${scenarioId}` : "../free-diagnosis/"}>
                    <Mail size={17} aria-hidden="true" />
                    {t.requestThisCase}
                  </a>
                    {hasDemoScenario ? (
                      <button className="case-copy-link" type="button" onClick={() => copyCaseLink(scenarioId)}>
                        {copiedCase === scenarioId ? <CheckCircle2 size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
                        {copiedCase === scenarioId ? t.copiedCaseLink : t.copyCaseLink}
                      </button>
                    ) : null}
                  </div>
                </div>
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
