"use client";

import { ArrowRight, BookOpen, FileSpreadsheet, Layers3, Play, ShieldCheck, Sparkles } from "lucide-react";
import { useLanguagePreference } from "@/lib/language";
import { trackEvent } from "@/lib/validation-events";
import {
  CaseMiniChart,
  DataSafetyDiagram,
  DiagnosisFlow,
  DiagnosisPreview,
  ResourceFeatureCard,
  SafetyChecklist,
  SectionChapterHeader
} from "./components/diagnosis-visuals";
import { ProductNav } from "./components/product-nav";
import { SignalTabs } from "./components/signal-tabs";
import { SiteFooter } from "./site-footer";

const copy = {
  en: {
    heroEyebrow: "Mobile ad revenue drop diagnosis",
    heroTitle: "Find what most likely caused your mobile ad revenue drop.",
    heroText: "Use anonymized CSV rows to separate impressions, fill rate, country mix, placement, ad source, time of day, and weighted eCPM before changing floors or mediation settings.",
    heroPrimary: "Try demo with sample data",
    heroSecondary: "Request free diagnosis",
    heroTemplate: "See sample CSV",
    trust: ["Browser-only CSV parsing", "No SDK", "No dashboard login", "Anonymized rows"],
    signalEyebrow: "01 / Diagnose",
    signalTitle: "Seven signals before you blame eCPM.",
    signalText: "Start with the signal that moved first. A blended number is a headline, not a diagnosis.",
    flowEyebrow: "02 / Separate",
    flowTitle: "A short evidence trail, not another dashboard.",
    flowText: "The public workflow keeps the first decision simple: compare matching periods, find the strongest signal, then decide what deserves a deeper check.",
    flowSteps: [
      { number: "01", title: "Upload", text: "Use sample data or an anonymized CSV." },
      { number: "02", title: "Separate", text: "Compare traffic, fill, GEO, placement, source, and pricing." },
      { number: "03", title: "Act", text: "Get a likely driver, supporting signals, and first checks." }
    ],
    scenariosEyebrow: "03 / Patterns",
    scenariosTitle: "Four common ways a revenue drop is misread.",
    scenariosText: "Every chart below is a directional sample, not customer data. The case pages explain the evidence to look for.",
    observed: "Observed change",
    driver: "Most likely driver",
    viewCase: "View case",
    scenarios: [
      { id: "case-i", type: "pricing" as const, title: "Impressions stable, weighted eCPM down", observed: "Exposure stays close to normal while rewarded pricing falls.", driver: "Pricing or demand movement after mix checks" },
      { id: "case-ii", type: "fill" as const, title: "Fill rate dropped before revenue", observed: "Requests remain present, but fewer opportunities are filled.", driver: "Source availability or mediation serving" },
      { id: "case-iii", type: "geo" as const, title: "Country mix distorts blended eCPM", observed: "Top-country pricing is stable; lower-value GEO share grows.", driver: "Traffic composition, not a global price collapse" },
      { id: "case-iv", type: "timing" as const, title: "Live events reduce peak-hour impressions", observed: "Peak exposure falls while price and fill stay close to normal.", driver: "Audience timing or product behavior" }
    ],
    fitEyebrow: "04 / Fit",
    fitTitle: "Built for the first investigation.",
    fitText: "Start with the diagnosis. Escalate only when you have a clearer evidence trail for a platform, mediation partner, or deeper review.",
    bestFor: "Best for",
    notFor: "Not designed for",
    bestItems: ["Live mobile apps or games with ad revenue", "Two comparable reporting periods", "AdMob, MAX, LevelPlay, TopOn, or custom exports", "Teams able to share anonymized CSV rows", "Questions about traffic, fill, GEO, placement, source, timing, or pricing"],
    notItems: ["Account approval or policy appeals", "Apps without meaningful ad traffic", "User-level or personal-data analysis", "Guaranteed revenue recovery", "Automatic mediation or price-floor changes"],
    safetyEyebrow: "05 / Safety and method",
    safetyTitle: "Your account stays out of the first diagnosis.",
    safetyText: "The public demo parses CSV locally in the browser. Remove private identifiers before sharing anything for a second look.",
    safetyItems: ["No account credentials", "No API keys", "No SDK", "Remove private identifiers", "CSV stays in the browser"],
    readMethod: "Read the method",
    readPrivacy: "View data safety",
    resourcesEyebrow: "06 / Resources",
    resourcesTitle: "Use the right level of help for the question.",
    resourcesText: "Begin with a sample diagnosis, then move into templates, cases, and method notes only when you need more context.",
    finalTitle: "Not sure what changed?",
    finalText: "Try the sample diagnosis first. Send anonymized rows only when you need a second look.",
    finalDemo: "Try demo",
    finalFree: "Request free diagnosis"
  },
  zh: {
    heroEyebrow: "移动广告收入下降诊断",
    heroTitle: "先找出移动广告收入下降最可能的原因。",
    heroText: "使用脱敏 CSV 行，分离展示量、填充率、国家结构、广告位、广告源、时段和加权 eCPM 变化，再决定是否调整底价或聚合设置。",
    heroPrimary: "用样例数据试 Demo",
    heroSecondary: "申请免费诊断",
    heroTemplate: "查看 CSV 模板",
    trust: ["浏览器本地解析 CSV", "无需 SDK", "无需后台登录", "脱敏数据行"],
    signalEyebrow: "01 / 诊断",
    signalTitle: "别急着怪 eCPM，先看七个信号。",
    signalText: "先找到最早发生变化的信号。混合指标只是一句标题，不是诊断本身。",
    flowEyebrow: "02 / 分离",
    flowTitle: "一条简短的证据链，而不是又一个仪表盘。",
    flowText: "公开流程把第一步保持简单：对比可匹配周期，找到最强信号，再决定哪些问题值得深入检查。",
    flowSteps: [
      { number: "01", title: "导入", text: "使用样例数据或脱敏 CSV。" },
      { number: "02", title: "分离", text: "比较流量、填充、GEO、广告位、广告源和价格。" },
      { number: "03", title: "行动", text: "获得最可能驱动、支持信号和首轮检查。" }
    ],
    scenariosEyebrow: "03 / 常见模式",
    scenariosTitle: "广告收入下降最常被误读的四种情况。",
    scenariosText: "所有图表都是方向性样例，不是客户数据。案例页会解释需要寻找哪些证据。",
    observed: "观察到的变化",
    driver: "最可能驱动因素",
    viewCase: "查看案例",
    scenarios: [
      { id: "case-i", type: "pricing" as const, title: "展示稳定，加权 eCPM 下降", observed: "曝光量接近正常，但激励广告价格下降。", driver: "在排除结构变化后，可能是价格或需求移动" },
      { id: "case-ii", type: "fill" as const, title: "收入前，填充率先下降", observed: "请求仍在发生，但可填充机会减少。", driver: "广告源可用性或聚合投放" },
      { id: "case-iii", type: "geo" as const, title: "国家结构扭曲混合 eCPM", observed: "高价值国家价格稳定，低价值 GEO 的展示占比增加。", driver: "流量结构，而非全局价格崩塌" },
      { id: "case-iv", type: "timing" as const, title: "大型活动减少高峰展示", observed: "高峰曝光下降，但价格与填充接近正常。", driver: "用户时段行为或产品行为" }
    ],
    fitEyebrow: "04 / 适配边界",
    fitTitle: "为第一轮排查而建。",
    fitText: "先完成诊断。只有在拿到更清晰的证据链后，才升级给广告平台、聚合伙伴或更深入的分析支持。",
    bestFor: "适合",
    notFor: "不适合处理",
    bestItems: ["已有广告收入的线上 App 或游戏", "至少两个可比较的报表周期", "AdMob、MAX、LevelPlay、TopOn 或自定义导出", "可以提供脱敏 CSV 数据行的团队", "流量、填充、GEO、广告位、广告源、时段或价格问题"],
    notItems: ["账号审核或政策申诉", "还没有有效广告流量的 App", "用户级或个人数据分析", "保证追回收入", "自动修改聚合或底价"],
    safetyEyebrow: "05 / 安全与方法",
    safetyTitle: "第一轮诊断不需要接触你的账号。",
    safetyText: "公开 Demo 在浏览器本地解析 CSV。任何需要进一步查看的数据，都应先移除私密标识。",
    safetyItems: ["无需账号凭证", "无需 API key", "无需 SDK", "移除私密标识", "CSV 停留在浏览器中"],
    readMethod: "阅读诊断方法",
    readPrivacy: "查看数据安全",
    resourcesEyebrow: "06 / 资源",
    resourcesTitle: "为问题选择合适的支持层级。",
    resourcesText: "从样例诊断开始；只有需要更多背景时，再进入模板、案例与方法说明。",
    finalTitle: "还不确定哪里变了？",
    finalText: "先试样例诊断。只有需要第二轮判断时，才发送脱敏数据行。",
    finalDemo: "试用 Demo",
    finalFree: "申请免费诊断"
  }
} as const;

export default function HomeVisual() {
  const [lang, setLang] = useLanguagePreference("en");
  const t = copy[lang];

  return (
    <main className="bazaar-page bazaar-home" lang={lang === "zh" ? "zh-CN" : "en"}>
      <ProductNav lang={lang} setLang={setLang} />
      <section className="bazaar-hero" id="top">
        <div className="bazaar-hero-copy">
          <p className="bazaar-eyebrow"><Sparkles size={15} aria-hidden="true" />{t.heroEyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p className="bazaar-hero-lede">{t.heroText}</p>
          <div className="bazaar-actions">
            <a className="bazaar-button bazaar-button-primary" href="/demo/" onClick={() => trackEvent("sample_demo_started", { page_path: "/", source_cta: "visual-home-hero", sample_type: "default" })}><Play size={17} aria-hidden="true" />{t.heroPrimary}</a>
            <a className="bazaar-button bazaar-button-secondary" href="/free-diagnosis/" onClick={() => trackEvent("free_diagnosis_clicked", { page_path: "/", source_cta: "visual-home-hero" })}>{t.heroSecondary}<ArrowRight size={17} aria-hidden="true" /></a>
          </div>
          <a className="bazaar-text-link" href="/templates/">{t.heroTemplate}<ArrowRight size={15} aria-hidden="true" /></a>
          <div className="bazaar-trust-chips" aria-label="Data safety features">{t.trust.map((item) => <span key={item}><ShieldCheck size={15} aria-hidden="true" />{item}</span>)}</div>
        </div>
        <DiagnosisPreview lang={lang} />
      </section>

      <section className="bazaar-section bazaar-section-muted"><div className="bazaar-container">
        <SectionChapterHeader number={t.signalEyebrow.split(" / ")[0]} eyebrow={t.signalEyebrow.split(" / ")[1] ?? t.signalEyebrow} title={t.signalTitle} description={t.signalText} />
        <SignalTabs lang={lang} />
      </div></section>

      <section className="bazaar-section"><div className="bazaar-container">
        <SectionChapterHeader number={t.flowEyebrow.split(" / ")[0]} eyebrow={t.flowEyebrow.split(" / ")[1] ?? t.flowEyebrow} title={t.flowTitle} description={t.flowText} />
        <DiagnosisFlow steps={t.flowSteps} />
      </div></section>

      <section className="bazaar-section bazaar-scenarios-section"><div className="bazaar-container">
        <SectionChapterHeader number={t.scenariosEyebrow.split(" / ")[0]} eyebrow={t.scenariosEyebrow.split(" / ")[1] ?? t.scenariosEyebrow} title={t.scenariosTitle} description={t.scenariosText} />
        <div className="scenario-diagnosis-grid">{t.scenarios.map((scenario) => (
          <article className="scenario-diagnosis-card" key={scenario.id}>
            <CaseMiniChart type={scenario.type} label="Directional sample" />
            <h3>{scenario.title}</h3>
            <dl><div><dt>{t.observed}</dt><dd>{scenario.observed}</dd></div><div><dt>{t.driver}</dt><dd>{scenario.driver}</dd></div></dl>
            <a href={`/cases/#${scenario.id}`}>{t.viewCase}<ArrowRight size={15} aria-hidden="true" /></a>
          </article>
        ))}</div>
      </div></section>

      <section className="bazaar-section"><div className="bazaar-container">
        <SectionChapterHeader number={t.fitEyebrow.split(" / ")[0]} eyebrow={t.fitEyebrow.split(" / ")[1] ?? t.fitEyebrow} title={t.fitTitle} description={t.fitText} />
        <div className="fit-boundary-panel"><article><p>{t.bestFor}</p><ul>{t.bestItems.map((item) => <li key={item}><span aria-hidden="true">+</span>{item}</li>)}</ul></article><article><p>{t.notFor}</p><ul>{t.notItems.map((item) => <li key={item}><span aria-hidden="true">-</span>{item}</li>)}</ul></article></div>
      </div></section>

      <section className="bazaar-section bazaar-section-safety"><div className="bazaar-container safety-layout">
        <div><p className="chapter-eyebrow"><span>{t.safetyEyebrow.split(" / ")[0]}</span>{t.safetyEyebrow.split(" / ")[1] ?? t.safetyEyebrow}</p><h2>{t.safetyTitle}</h2><p>{t.safetyText}</p><SafetyChecklist items={t.safetyItems} /><div className="bazaar-inline-links"><a href="/method/">{t.readMethod}<ArrowRight size={15} aria-hidden="true" /></a><a href="/privacy/">{t.readPrivacy}<ArrowRight size={15} aria-hidden="true" /></a></div></div>
        <DataSafetyDiagram lang={lang} />
      </div></section>

      <section className="bazaar-section bazaar-resource-section" id="resources"><div className="bazaar-container">
        <SectionChapterHeader number={t.resourcesEyebrow.split(" / ")[0]} eyebrow={t.resourcesEyebrow.split(" / ")[1] ?? t.resourcesEyebrow} title={t.resourcesTitle} description={t.resourcesText} />
        <div className="resource-feature-grid">
          <ResourceFeatureCard label="Primary" title="Demo" text="Use sample data or an anonymized CSV to get a directional diagnosis." href="/demo/" size="large" icon={<Play size={20} aria-hidden="true" />} action="Open demo" />
          <ResourceFeatureCard label="Prepare" title="Templates" text="Map export columns before you upload." href="/templates/" size="medium" icon={<FileSpreadsheet size={20} aria-hidden="true" />} action="View templates" />
          <ResourceFeatureCard label="Patterns" title="Cases" text="See how common drops can be misread." href="/cases/" size="medium" icon={<Layers3 size={20} aria-hidden="true" />} action="View cases" />
          <ResourceFeatureCard label="Method" title="Diagnosis order" href="/method/" size="small" action="Read" />
          <ResourceFeatureCard label="Guides" title="Learn" href="/learn/" size="small" icon={<BookOpen size={18} aria-hidden="true" />} action="Browse" />
          <ResourceFeatureCard label="Trust" title="FAQ and privacy" href="/faq/" size="small" action="Open" />
        </div>
      </div></section>

      <section className="bazaar-final-cta"><div className="bazaar-container"><div><p className="bazaar-eyebrow">eCPM Bazaar</p><h2>{t.finalTitle}</h2><p>{t.finalText}</p></div><div className="bazaar-actions"><a className="bazaar-button bazaar-button-light" href="/demo/">{t.finalDemo}<ArrowRight size={17} aria-hidden="true" /></a><a className="bazaar-button bazaar-button-dark-outline" href="/free-diagnosis/">{t.finalFree}</a></div></div></section>
      <SiteFooter lang={lang} />
    </main>
  );
}
