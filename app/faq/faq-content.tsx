"use client";

import { ArrowLeft, CircleHelp, Mail } from "lucide-react";
import { useLanguagePreference } from "@/lib/language";
import { SiteFooter } from "../site-footer";

const faqs = [
  {
    en: {
      question: "What does eCPM Bazaar do?",
      answer:
        "eCPM Bazaar helps small mobile game and app teams diagnose why ad revenue changed. It compares revenue, weighted eCPM, impressions, fill rate, country, placement, and ad source signals so you can decide what to check first."
    },
    zh: {
      question: "eCPM Bazaar 是做什么的？",
      answer:
        "eCPM Bazaar 帮小型移动游戏和 App 团队诊断广告收入为什么变化。它会比较收入、加权 eCPM、展示量、填充率、国家、广告位和广告源信号，帮助你决定先检查哪里。"
    }
  },
  {
    en: {
      question: "Does the public demo upload my CSV?",
      answer: "No. The public demo parses CSV files in your browser. The file is not uploaded or stored by eCPM Bazaar."
    },
    zh: {
      question: "公开 Demo 会上传我的 CSV 吗？",
      answer: "不会。公开 Demo 只在你的浏览器本地解析 CSV 文件，不会上传，也不会由 eCPM Bazaar 保存。"
    }
  },
  {
    en: {
      question: "Do I need to connect AdMob, AppLovin MAX, Unity LevelPlay, or TopOn?",
      answer:
        "Not for the public demo. Start with CSV rows or the sample CSV. API connections can come later only after the diagnosis workflow is useful with real data."
    },
    zh: {
      question: "我需要连接 AdMob、AppLovin MAX、Unity LevelPlay 或 TopOn 吗？",
      answer: "公开 Demo 不需要。先用 CSV 行或样例 CSV 测试。只有诊断流程被真实数据证明有用后，才考虑真实 API 接入。"
    }
  },
  {
    en: {
      question: "What fields should I include?",
      answer:
        "The minimum useful fields are date, revenue, and impressions. For better diagnosis, include app name, placement, country, ad source, eCPM, requests, fills, and clicks."
    },
    zh: {
      question: "我应该包含哪些字段？",
      answer: "最少需要 date、revenue 和 impressions。为了更好诊断，建议包含 App 名、广告位、国家、广告源、eCPM、requests、fills 和 clicks。"
    }
  },
  {
    en: {
      question: "Can I anonymize my data?",
      answer:
        "Yes. Replace app names, ad unit IDs, account IDs, and exact identifiers with neutral names such as Game A, Rewarded Home, or Source 1."
    },
    zh: {
      question: "可以脱敏数据吗？",
      answer: "可以。把 App 名、广告单元 ID、账号 ID 和精确标识替换成 Game A、Rewarded Home、Source 1 这类中性名称。"
    }
  },
  {
    en: {
      question: "Will this automatically increase my eCPM?",
      answer:
        "No. eCPM Bazaar is a diagnosis tool, not a revenue guarantee. It helps you understand whether the change looks more like traffic, pricing, fill, country mix, placement, or ad source performance."
    },
    zh: {
      question: "它会自动提高我的 eCPM 吗？",
      answer: "不会。eCPM Bazaar 是诊断工具，不承诺收入提升。它帮助你判断变化更像是流量、价格、填充、国家结构、广告位还是广告源表现导致。"
    }
  },
  {
    en: {
      question: "Can live events or time of day affect AdMob revenue?",
      answer:
        "Yes. A revenue drop is not always caused by ad demand, eCPM, or mediation changes. In some apps, user activity changes during specific hours because of sports events, holidays, exams, work schedules, or local events. If revenue drops during the app's normal peak window, compare hourly impressions, impressions per user, match rate, and eCPM before changing floors or mediation settings. A useful check is event days vs normal days, and peak hours vs nearby non-event hours. If eCPM and match rate stay stable while impressions drop, the likely driver is audience behavior rather than ad demand."
    },
    zh: {
      question: "大型活动或一天中的时间会影响 AdMob 收入吗？",
      answer:
        "会。收入下降不一定来自广告需求、eCPM 或聚合配置变化。有些 App 的用户活跃会在特定时段受到体育赛事、节假日、考试、工作节奏或本地事件影响。如果收入在 App 正常高峰窗口下降，先比较小时级展示、每用户展示、匹配率和 eCPM，再决定是否调整底价或聚合设置。一个有用检查是比较事件日与正常日、高峰时段与相邻非事件时段。如果 eCPM 和匹配率稳定但展示下降，更可能是用户行为变化，而不是广告需求问题。"
    }
  },
  {
    en: {
      question: "What is the best first test?",
      answer:
        "Use two comparable periods, such as latest day vs previous day or last 7 days vs previous 7 days. Then upload a CSV in the demo and copy the diagnosis result."
    },
    zh: {
      question: "第一次测试最好怎么做？",
      answer: "使用两个可比周期，例如最近一天 vs 前一天，或最近 7 天 vs 前 7 天。然后在 Demo 上传 CSV，并复制诊断结果。"
    }
  },
  {
    en: {
      question: "Who is this for?",
      answer: "It is mainly for indie developers and small mobile game/app teams that monetize with ads but do not have a dedicated data analyst."
    },
    zh: {
      question: "这个产品适合谁？",
      answer: "主要适合用广告变现、但没有专职数据分析师的独立开发者和小型移动游戏 / App 团队。"
    }
  }
];

const copy = {
  en: {
    back: "Back to site",
    navDemo: "Demo",
    navTemplates: "Templates",
    navCases: "Cases",
    navMethod: "Method",
    navPrivacy: "Privacy",
    language: "Language",
    badge: "FAQ",
    title: "Questions small teams usually ask before trying eCPM Bazaar.",
    lede: "The short version: start with anonymized CSV rows, diagnose the movement, and avoid sharing account access or private identifiers.",
    ctaTitle: "Still unsure?",
    ctaText: "Send anonymized rows or describe what changed. No login credentials or API keys are needed.",
    freeDiagnosis: "Free diagnosis"
  },
  zh: {
    back: "返回官网",
    navDemo: "演示",
    navTemplates: "模板",
    navCases: "案例",
    navMethod: "方法",
    navPrivacy: "数据安全",
    language: "语言",
    badge: "常见问题",
    title: "小团队在试用 eCPM Bazaar 前常问的问题。",
    lede: "简短版本：先用脱敏 CSV 行诊断变化，不要分享账号权限或私密标识。",
    ctaTitle: "还是不确定？",
    ctaText: "可以发送脱敏数据行，或简单描述发生了什么变化。不需要登录凭证或 API key。",
    freeDiagnosis: "免费诊断"
  }
};

export function FaqContent() {
  const [lang, setLang] = useLanguagePreference("en");
  const t = copy[lang];

  return (
    <main className="resource-page" lang={lang === "zh" ? "zh-CN" : "en"}>
      <nav className="resource-nav" aria-label="FAQ navigation">
        <a href="../">
          <ArrowLeft size={17} aria-hidden="true" />
          {t.back}
        </a>
        <div>
          <a href="../demo/">{t.navDemo}</a>
          <a href="../templates/">{t.navTemplates}</a>
          <a href="../cases/">{t.navCases}</a>
          <a href="../method/">{t.navMethod}</a>
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
          <CircleHelp size={16} aria-hidden="true" />
          {t.badge}
        </p>
        <h1>{t.title}</h1>
        <p>{t.lede}</p>
      </section>

      <section className="faq-list" aria-label="Frequently asked questions">
        {faqs.map((item) => (
          <article className="faq-item" key={item.en.question}>
            <h2>{item[lang].question}</h2>
            <p>{item[lang].answer}</p>
          </article>
        ))}
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
