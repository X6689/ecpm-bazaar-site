"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  CircleDot,
  Globe2,
  LineChart,
  Mail,
  MapPinned,
  Radar,
  Sparkles,
  TriangleAlert
} from "lucide-react";

type Lang = "zh" | "en";

const signals = [
  { label: "Revenue", value: "$428", trend: "-18.4%", tone: "warn" },
  { label: "eCPM", value: "$3.84", trend: "+2.6%", tone: "good" },
  { label: "Fill Rate", value: "54.2%", trend: "-21.8%", tone: "warn" }
];

const drivers = [
  { label: "Rewarded Video / US", value: "Main drop", width: "92%" },
  { label: "Interstitial / BR", value: "Stable", width: "48%" },
  { label: "Banner / JP", value: "Minor lift", width: "33%" }
];

const contactEmail = "xiashi6689@163.com";

const copy = {
  zh: {
    name: "夏雨",
    role: "eCPM Bazaar 发起人",
    navProduct: "产品",
    navFunction: "功能",
    navContact: "联系",
    contact: "联系我",
    eyebrow: "个人网站 / 第一个产品",
    title: "我在做一个帮开发者看懂广告收入波动的工具。",
    lede:
      "eCPM Bazaar 是一个广告数据集市，服务小游戏/App 小团队。它的核心能力不是做一张更漂亮的报表，而是帮助开发者定位收入异常来自哪里。",
    primary: "查看产品定位",
    secondary: "聊聊真实数据",
    productLabel: "Product Direction",
    productTitle: "eCPM Bazaar",
    productText:
      "一个帮开发者看懂广告收入波动的广告数据集市。先聚合 eCPM、填充率、广告位、国家地区等关键数据，再把收入变化拆成可排查的原因。",
    functionLabel: "Core Function",
    functionTitle: "广告收入异常诊断工具",
    functionText:
      "当收入波动出现时，eCPM Bazaar 会判断主要问题是 eCPM、填充率、展示量、国家地区、广告位，还是广告平台/广告源拖累，并给出优先排查建议。",
    diagnosisTitle: "诊断示例",
    diagnosisText:
      "美国激励视频收入下降主要由填充率从 78% 降到 54% 导致，eCPM 基本稳定。建议优先检查该广告位的广告源填充、底价配置和平台状态。",
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
    serviceLabel: "Who I Serve",
    serviceTitle: "先服务小团队，不做大而全的平台。",
    serviceText:
      "目标用户是每天关注广告收入、eCPM 和填充率的小游戏/App 开发者。他们可能没有数据分析师，但需要快速知道收入为什么涨跌。",
    aboutLabel: "About Me",
    aboutTitle: "我会先用真实开发者数据验证这个方向。",
    aboutText:
      "在有足够真实数据之前，我不会急着把产品做重。先把诊断能力做准，再决定是否做完整 Web 工具、API 接入或微信小程序入口。"
  },
  en: {
    name: "Xia Yu",
    role: "Founder of eCPM Bazaar",
    navProduct: "Product",
    navFunction: "Function",
    navContact: "Contact",
    contact: "Contact",
    eyebrow: "Personal site / First product",
    title: "I am building a tool that helps developers understand ad revenue changes.",
    lede:
      "eCPM Bazaar is an ad data bazaar for small mini game and app teams. Its core value is not another prettier dashboard, but helping developers locate where revenue anomalies come from.",
    primary: "View positioning",
    secondary: "Talk real data",
    productLabel: "Product Direction",
    productTitle: "eCPM Bazaar",
    productText:
      "An ad data bazaar that helps developers understand ad revenue changes. It brings together eCPM, fill rate, placements, countries, and key monetization signals, then turns revenue movement into traceable causes.",
    functionLabel: "Core Function",
    functionTitle: "Ad revenue anomaly diagnosis",
    functionText:
      "When revenue changes, eCPM Bazaar identifies whether the main driver is eCPM, fill rate, impressions, country, placement, or a specific ad platform/source, then suggests where to check first.",
    diagnosisTitle: "Diagnosis Example",
    diagnosisText:
      "US rewarded video revenue fell mainly because fill rate dropped from 78% to 54%, while eCPM stayed stable. Prioritize checking ad source fill, floor settings, and platform status for this placement.",
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
    serviceLabel: "Who I Serve",
    serviceTitle: "Starting with small teams, not a giant platform.",
    serviceText:
      "The target users are mini game and app developers who check ad revenue, eCPM, and fill rate every day. They may not have a data analyst, but they need to know why revenue moved.",
    aboutLabel: "About Me",
    aboutTitle: "I will validate this with real developer data first.",
    aboutText:
      "Before making the product heavy, I want to make the diagnosis useful and accurate. After real data validation, I can decide whether to build a full web tool, API integrations, or a WeChat mini program entry."
  }
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("zh");
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
          <a href="#contact">{t.navContact}</a>
          <div className="language-switch" aria-label="Language switch">
            <button className={lang === "zh" ? "active" : ""} type="button" onClick={() => setLang("zh")}>
              中文
            </button>
            <button className={lang === "en" ? "active" : ""} type="button" onClick={() => setLang("en")}>
              EN
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
            <a className="primary-action" href="#product">
              {t.primary}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="secondary-action" href={mailto}>
              {t.secondary}
            </a>
          </div>
        </div>

        <div className="diagnosis-preview" aria-label="eCPM Bazaar diagnosis preview">
          <div className="preview-top">
            <div>
              <p className="preview-kicker">eCPM Bazaar</p>
              <h2>{lang === "zh" ? "广告收入异常诊断" : "Revenue anomaly diagnosis"}</h2>
            </div>
            <span className="status-pill">
              <CircleDot size={14} aria-hidden="true" />
              {lang === "zh" ? "诊断中" : "Watching"}
            </span>
          </div>
          <div className="signal-grid">
            {signals.map((signal) => (
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
            {drivers.map((driver) => (
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
          {[
            {
              title: lang === "zh" ? "导入数据" : "Import data",
              note: "CSV / Excel / API"
            },
            {
              title: lang === "zh" ? "识别异常" : "Detect anomaly",
              note: lang === "zh" ? "收入、eCPM、填充率" : "Revenue, eCPM, fill rate"
            },
            {
              title: lang === "zh" ? "输出建议" : "Explain next step",
              note: lang === "zh" ? "先查最可能原因" : "Check the likely cause first"
            }
          ].map((step, index) => (
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
    </main>
  );
}
