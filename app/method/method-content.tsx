"use client";

import { ArrowLeft, CheckCircle2, GitBranch, ShieldCheck } from "lucide-react";
import { useLanguagePreference } from "@/lib/language";
import { SiteFooter } from "../site-footer";

const copy = {
  en: {
    back: "Back to site",
    navDemo: "Demo",
    navTemplates: "Templates",
    navCases: "Cases",
    navFree: "Free diagnosis",
    navFaq: "FAQ",
    language: "Language",
    badge: "Method",
    title: "How eCPM Bazaar diagnoses mobile ad revenue drops.",
    lede:
      "Revenue is the final symptom. eCPM Bazaar first separates the movement into traffic, pricing, fill, country, placement, ad-source, and audience-timing signals so a small team knows what to check before changing floors or mediation settings.",
    logicTitle: "Revenue change is decomposed by",
    orderLabel: "Diagnosis order",
    orderTitle: "Check upstream signals before trusting blended eCPM.",
    order: [
      "Check impressions first",
      "Compare match rate / fill rate",
      "Split by country",
      "Split by placement or ad unit",
      "Check ad source / mediation source",
      "Check time-of-day and external events",
      "Only then look at blended eCPM"
    ],
    logic: [
      {
        title: "Impressions",
        text: "Did ad exposure fall because DAU, sessions, placement visibility, or impressions per DAU changed?"
      },
      {
        title: "Weighted eCPM",
        text: "Did pricing change after accounting for country, format, placement, and ad-source mix?"
      },
      {
        title: "Fill / match rate",
        text: "Did requests stay stable while fills dropped, pointing to demand, mediation, floor, or availability issues?"
      },
      {
        title: "Country mix",
        text: "Did traffic shift toward lower-value GEOs, lowering blended eCPM even if each country stayed normal?"
      },
      {
        title: "Placement exposure",
        text: "Did one rewarded, interstitial, or banner placement stop showing enough impressions?"
      },
      {
        title: "Ad source / mediation",
        text: "Did one source or mediation setup contribute most of the change?"
      },
      {
        title: "Audience timing / live events",
        text: "Did sports matches, holidays, seasonality, or time-of-day behavior reduce impressions and distort daily averages?"
      }
    ],
    exampleLabel: "Example",
    timingLabel: "Time-of-day and external events",
    timingTitle: "Audience behavior can look like an ad stack problem.",
    timingText:
      "Revenue changes can be caused by audience behavior, not only ad demand. If the app normally monetizes most strongly during a specific time window, live sports, holidays, exams, work schedules, or local events can reduce impressions during the hours that matter most. This is why daily averages can be misleading. eCPM Bazaar encourages checking hourly or period-level patterns before assuming eCPM, floors, or mediation failed.",
    exampleTitle: "A clear diagnosis is more useful than one more dashboard.",
    beforeLabel: "Before",
    before: "Revenue dropped 31%. eCPM looks normal. Not sure what changed.",
    afterLabel: "After",
    after:
      "Fill rate dropped from 78% to 54% in US rewarded video / Unity Ads. Check source availability, timeout, mediation release, and floor settings first.",
    limitsTitle: "What the method does not claim",
    limits: [
      "It is a directional CSV diagnosis, not final attribution.",
      "It does not replace AdMob, AppLovin MAX, Unity LevelPlay, TopOn, or your internal analytics.",
      "It does not guarantee higher revenue. It helps decide the first likely area to inspect."
    ],
    ctaTitle: "Test the method with sample data first.",
    demo: "Try demo with sample data",
    free: "Get free diagnosis"
  },
  zh: {
    back: "返回官网",
    navDemo: "演示",
    navTemplates: "模板",
    navCases: "案例",
    navFree: "免费诊断",
    navFaq: "常见问题",
    language: "语言",
    badge: "诊断方法",
    title: "eCPM Bazaar 如何诊断手游广告收入下降。",
    lede:
      "收入是最终症状。eCPM Bazaar 会先把变化拆成流量、价格、填充、国家结构、广告位、广告源和用户时间行为信号，让小团队在改底价或聚合配置前知道先查哪里。",
    logicTitle: "收入变化会按这些因素拆解",
    orderLabel: "诊断顺序",
    orderTitle: "先检查上游信号，再相信混合 eCPM。",
    order: [
      "先检查展示量",
      "比较匹配率 / 填充率",
      "按国家拆分",
      "按广告位或广告单元拆分",
      "检查广告源 / 聚合广告源",
      "检查一天中的时间和外部事件",
      "最后再看混合 eCPM"
    ],
    logic: [
      {
        title: "展示量",
        text: "广告曝光是否因为 DAU、会话、广告位曝光或人均展示变化而下降？"
      },
      {
        title: "加权 eCPM",
        text: "在考虑国家、广告形式、广告位和广告源结构后，价格是否真的变化？"
      },
      {
        title: "填充率 / 匹配率",
        text: "请求稳定但填充下降，是否指向需求、聚合、底价或广告源可用性问题？"
      },
      {
        title: "国家结构",
        text: "流量是否转向低价值 GEO，导致整体 eCPM 被拉低？"
      },
      {
        title: "广告位曝光",
        text: "是否某个激励视频、插屏或横幅广告位展示不足？"
      },
      {
        title: "广告源 / 聚合",
        text: "是否某个广告源或聚合设置贡献了大部分变化？"
      },
      {
        title: "用户时间行为 / 现实事件",
        text: "体育比赛、节假日、季节性或一天中的使用时间变化，是否减少了展示量并扭曲了日均数据？"
      }
    ],
    exampleLabel: "示例",
    timingLabel: "一天中的时间和外部事件",
    timingTitle: "用户行为变化可能看起来像广告栈问题。",
    timingText:
      "收入变化不一定只来自广告需求。如果 App 通常在特定时段变现最强，体育赛事、节假日、考试、工作节奏或本地事件都可能减少最重要时段的展示量。这也是日均值容易误导的原因。eCPM Bazaar 会鼓励先检查小时级或周期级模式，再判断 eCPM、底价或聚合是否失效。",
    exampleTitle: "清楚的诊断，比再多一个报表更有用。",
    beforeLabel: "Before",
    before: "收入下降 31%。eCPM 看起来正常。不确定到底发生了什么。",
    afterLabel: "After",
    after: "美国激励视频 / Unity Ads 填充率从 78% 降到 54%。先检查广告源可用性、超时、聚合发布和底价配置。",
    limitsTitle: "这个方法不声称什么",
    limits: [
      "它是方向性 CSV 诊断，不是最终归因。",
      "它不替代 AdMob、AppLovin MAX、Unity LevelPlay、TopOn 或内部数据系统。",
      "它不承诺提高收入，只帮你判断最该先检查哪里。"
    ],
    ctaTitle: "先用样例数据测试这个方法。",
    demo: "用样例数据试 Demo",
    free: "申请免费诊断"
  }
};

export function MethodContent() {
  const [lang, setLang] = useLanguagePreference("en");
  const t = copy[lang];

  return (
    <main className="resource-page" lang={lang === "zh" ? "zh-CN" : "en"}>
      <nav className="resource-nav" aria-label="Method navigation">
        <a href="../">
          <ArrowLeft size={17} aria-hidden="true" />
          {t.back}
        </a>
        <div>
          <a href="../demo/">{t.navDemo}</a>
          <a href="../templates/">{t.navTemplates}</a>
          <a href="../cases/">{t.navCases}</a>
          <a href="../free-diagnosis/">{t.navFree}</a>
          <a href="../faq/">{t.navFaq}</a>
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
          <GitBranch size={16} aria-hidden="true" />
          {t.badge}
        </p>
        <h1>{t.title}</h1>
        <p>{t.lede}</p>
        <div className="hero-actions">
          <a className="primary-action" href="../demo/">
            {t.demo}
          </a>
          <a className="secondary-action" href="../free-diagnosis/">
            {t.free}
          </a>
        </div>
      </section>

      <section className="template-section">
        <div className="resource-link-heading">
          <p className="section-label">{t.badge}</p>
          <h2>{t.logicTitle}</h2>
        </div>
        <div className="template-grid" aria-label={t.logicTitle}>
          {t.logic.map((item) => (
            <article className="resource-card" key={item.title}>
              <span className="resource-icon">
                <CheckCircle2 size={22} aria-hidden="true" />
              </span>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="method-order-section">
        <div className="resource-link-heading">
          <p className="section-label">{t.orderLabel}</p>
          <h2>{t.orderTitle}</h2>
        </div>
        <ol className="method-order-list">
          {t.order.map((item, index) => (
            <li key={item}>
              <span>{index + 1}</span>
              {item}
            </li>
          ))}
        </ol>
      </section>

      <section className="guide-explanation method-timing-section">
        <p className="section-label">{t.timingLabel}</p>
        <h2>{t.timingTitle}</h2>
        <p>{t.timingText}</p>
      </section>

      <section className="diagnosis-output-section" aria-label={t.exampleLabel}>
        <div className="diagnosis-output-copy">
          <p className="section-label">{t.exampleLabel}</p>
          <h2>{t.exampleTitle}</h2>
          <div className="method-before-after">
            <article>
              <span>{t.beforeLabel}</span>
              <p>{t.before}</p>
            </article>
            <article>
              <span>{t.afterLabel}</span>
              <p>{t.after}</p>
            </article>
          </div>
        </div>
        <div className="mini-diagnosis-card">
          <span className="share-card-brand">eCPM Bazaar</span>
          <h3>{t.afterLabel}</h3>
          <p>{t.after}</p>
        </div>
      </section>

      <section className="resource-cta danger-note">
        <ShieldCheck size={24} aria-hidden="true" />
        <div>
          <h2>{t.limitsTitle}</h2>
          <p>{t.limits.join(" ")}</p>
        </div>
        <a className="primary-action" href="../demo/">
          {t.demo}
        </a>
        <a className="secondary-action" href="../cases/">
          {t.navCases}
        </a>
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
