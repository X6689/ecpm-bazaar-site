"use client";

import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { CaseMiniChart } from "../components/diagnosis-visuals";
import { ProductNav } from "../components/product-nav";
import { useLanguagePreference } from "@/lib/language";
import { SiteFooter } from "../site-footer";

type MethodStep = {
  key: string;
  number: string;
  title: string;
  answers: string;
  definition: string;
  misread: string;
  next: string;
  chart: "pricing" | "fill" | "geo" | "timing";
};

const copy: Record<"en" | "zh", { badge: string; title: string; lede: string; order: string; steps: MethodStep[]; limitsTitle: string; limits: string[]; demo: string; free: string }> = {
  en: {
    badge: "How the diagnosis works",
    title: "Why blended eCPM should be reviewed last.",
    lede: "Revenue is the final symptom. Work upstream from exposure and serving, then check mix, placement, sources, timing, and only then weighted pricing.",
    order: "Diagnosis order",
    steps: [
      { key: "impressions", number: "01", title: "Impressions", answers: "Did the revenue drop start with less ad exposure?", definition: "Count shown ads for a matching period. Pair it with DAU, sessions, or eligible moments when available.", misread: "Stable eCPM does not protect revenue when fewer ads are shown.", next: "Compare requests and fills for the same country and placement.", chart: "timing" },
      { key: "fills", number: "02", title: "Requests, matches and fills", answers: "Are requests still arriving, and are they turning into filled opportunities?", definition: "Keep requests, matched requests, fills, show rate, match rate, and fill rate distinct because platforms define them differently.", misread: "A low source-level rate is not automatically an app-level serving failure.", next: "Split the affected serving metric by country and format.", chart: "fill" },
      { key: "geo", number: "03", title: "Country mix", answers: "Did impression share move toward lower-value GEOs?", definition: "Compare country-level impressions, revenue contribution, and weighted eCPM across matching periods.", misread: "A lower blended eCPM does not prove global demand fell.", next: "Keep Tier 1 pricing separate from traffic composition.", chart: "geo" },
      { key: "placement", number: "04", title: "Placement and ad unit", answers: "Is one format, placement, or ad unit driving the movement?", definition: "Keep placement, ad unit, and format separate whenever the export distinguishes them.", misread: "A global average can hide a single rewarded or interstitial issue.", next: "Compare the same placement by country and app version.", chart: "timing" },
      { key: "source", number: "05", title: "Ad source and mediation", answers: "Did one bidder or waterfall source lose contribution?", definition: "Read bids, fills, wins, impressions, revenue share, and eCPM in the context the platform provides.", misread: "A bidder that wins less often may still be healthy if total serving is stable.", next: "Check availability, adapters, floors, consent, and source configuration.", chart: "fill" },
      { key: "timing", number: "06", title: "Time and external events", answers: "Was the decline concentrated in an important hour or event window?", definition: "Compare peak hours, nearby normal hours, event days, and non-event days instead of only daily totals.", misread: "A live event can look like a pricing or mediation failure in a daily chart.", next: "Inspect impressions per active user before changing settings.", chart: "timing" },
      { key: "pricing", number: "07", title: "Weighted eCPM", answers: "Did pricing move after upstream volume and mix signals stayed stable?", definition: "Use revenue divided by impressions, weighted across matching segments; never treat it as a raw mean of segment eCPMs.", misread: "A higher eCPM can still produce less revenue if fill or exposure fell.", next: "Compare country, format, source, and time-window pricing before changing floors.", chart: "pricing" }
    ],
    limitsTitle: "What this method does not claim",
    limits: ["It is a directional CSV diagnosis, not final attribution.", "It does not replace platform reporting or internal analytics.", "It does not guarantee higher revenue; it narrows the first checks."],
    demo: "Try demo with sample data",
    free: "Request free diagnosis"
  },
  zh: {
    badge: "诊断方法",
    title: "为什么加权 eCPM 应该最后再看。",
    lede: "收入是最终症状。先从曝光和投放向上排查，再看结构、广告位、广告源、时段，最后才解释加权价格。",
    order: "诊断顺序",
    steps: [
      { key: "impressions", number: "01", title: "展示量", answers: "收入下降是否先来自广告曝光减少？", definition: "比较匹配周期内的已展示广告；有条件时与 DAU、会话或可展示机会一起看。", misread: "eCPM 稳定并不能抵消展示下降造成的收入损失。", next: "比较同一国家和广告位的 requests 与 fills。", chart: "timing" },
      { key: "fills", number: "02", title: "请求、匹配与填充", answers: "请求是否仍在发生，并转化为有效填充？", definition: "requests、matched requests、fills、show rate、match rate 与 fill rate 要分开保留，因为各平台定义不同。", misread: "单个广告源比例低，并不自动代表全 App 投放失败。", next: "按国家和广告形式拆分受影响的投放指标。", chart: "fill" },
      { key: "geo", number: "03", title: "国家结构", answers: "展示占比是否向低价值 GEO 移动？", definition: "比较匹配周期中各国家的展示、收入贡献和加权 eCPM。", misread: "混合 eCPM 下降并不证明全球需求下降。", next: "把 Tier 1 价格和流量结构分开。", chart: "geo" },
      { key: "placement", number: "04", title: "广告位与广告单元", answers: "是否由某个广告形式、广告位或广告单元驱动？", definition: "只要导出有区分，就不要混淆 placement、ad unit 和 format。", misread: "全局均值会掩盖一个激励或插屏广告位问题。", next: "按国家和 App 版本比较相同广告位。", chart: "timing" },
      { key: "source", number: "05", title: "广告源与聚合", answers: "某个竞价或瀑布流广告源是否失去贡献？", definition: "按平台提供的上下文查看 bids、fills、wins、impressions、收入占比和 eCPM。", misread: "竞价胜出少的广告源，在总投放稳定时可能仍然正常。", next: "检查可用性、adapter、底价、同意状态和广告源配置。", chart: "fill" },
      { key: "timing", number: "06", title: "时段与外部事件", answers: "下降是否集中在重要的时段或事件窗口？", definition: "比较高峰时段、相邻正常时段、事件日和非事件日，而不是只看日总数。", misread: "大型赛事在日图中可能看起来像价格或聚合故障。", next: "修改设置前先检查每活跃用户展示。", chart: "timing" },
      { key: "pricing", number: "07", title: "加权 eCPM", answers: "在上游流量和结构信号稳定后，价格是否真的变化？", definition: "使用收入除以展示量，并在匹配分组中加权；不要直接平均各分组 eCPM。", misread: "填充或曝光下降时，较高 eCPM 仍可能带来更低收入。", next: "改底价前按国家、形式、广告源和时段比较价格。", chart: "pricing" }
    ],
    limitsTitle: "这个方法不声称什么",
    limits: ["它是方向性 CSV 诊断，不是最终归因。", "它不替代平台报表或内部分析。", "它不承诺提高收入，只缩小首轮检查范围。"],
    demo: "用样例数据试 Demo",
    free: "申请免费诊断"
  }
};

export function MethodContent() {
  const [lang, setLang] = useLanguagePreference("en");
  const t = copy[lang];

  return (
    <main className="bazaar-page bazaar-resource-page bazaar-method-page" lang={lang === "zh" ? "zh-CN" : "en"}>
      <ProductNav lang={lang} setLang={setLang} backHref="/" compact />
      <section className="method-hero bazaar-container">
        <p className="bazaar-eyebrow">{t.badge}</p>
        <h1>{t.title}</h1>
        <p>{t.lede}</p>
      </section>

      <section className="method-layout">
        <aside className="method-step-nav" aria-label={t.order}>
          <p>{t.order}</p>
          <nav>
            {t.steps.map((step) => <a href={`#${step.key}`} key={step.key}><span>{step.number}</span>{step.title}</a>)}
          </nav>
        </aside>
        <div className="method-step-content">
          {t.steps.map((step) => (
            <article id={step.key} key={step.key}>
              <div className="method-step-number">{step.number}</div>
              <div className="method-step-copy">
                <h2>{step.title}</h2>
                <dl>
                  <div><dt>What it answers</dt><dd>{step.answers}</dd></div>
                  <div><dt>Metric definition</dt><dd>{step.definition}</dd></div>
                  <div className="method-misread"><dt>Common misread</dt><dd>{step.misread}</dd></div>
                  <div><dt>What to check next</dt><dd>{step.next}</dd></div>
                </dl>
              </div>
              <CaseMiniChart type={step.chart} label="Directional sample" />
            </article>
          ))}
        </div>
      </section>

      <section className="method-limits bazaar-container">
        <ShieldCheck size={22} aria-hidden="true" />
        <div><p className="chapter-eyebrow">Directional diagnosis</p><h2>{t.limitsTitle}</h2><ul>{t.limits.map((item) => <li key={item}><CheckCircle2 size={15} aria-hidden="true" />{item}</li>)}</ul></div>
        <div className="bazaar-actions"><a className="bazaar-button bazaar-button-primary" href="/demo/">{t.demo}<ArrowRight size={16} aria-hidden="true" /></a><a className="bazaar-button bazaar-resource-outline" href="/free-diagnosis/">{t.free}</a></div>
      </section>
      <SiteFooter lang={lang} />
    </main>
  );
}
