"use client";

import { ArrowUpRight, Mail, ShieldCheck } from "lucide-react";
import type { Lang } from "@/lib/language";
import { publicContactEmail } from "@/lib/site-contact";

type SiteFooterProps = {
  lang: Lang;
};


const copy = {
  en: {
    label: "eCPM Bazaar",
    title: "Diagnose mobile ad revenue changes before changing settings.",
    text:
      "Built for small game and app teams that need a fast read on eCPM, impressions, fill rate, country mix, placement, and ad source performance.",
    resources: "Resources",
    trust: "Trust",
    contact: "Contact",
    trustItems: ["Browser-only CSV demo", "Anonymized rows are enough", "No account login or API key required"],
    links: [
      { label: "Home", href: "/" },
      { label: "Demo", href: "/demo/" },
      { label: "CSV templates", href: "/templates/" },
      { label: "Cases", href: "/cases/" },
      { label: "Method", href: "/method/" },
      { label: "Guides", href: "/learn/" },
      { label: "Free diagnosis", href: "/free-diagnosis/" },
      { label: "FAQ", href: "/faq/" },
      { label: "Privacy", href: "/privacy/" }
    ],
    emailLabel: "Email",
    note: "Early validation product. No SDK, no signup wall, no revenue guarantee."
  },
  zh: {
    label: "eCPM Bazaar",
    title: "先诊断移动广告收入变化，再决定是否改配置。",
    text: "面向小型游戏和 App 团队，快速判断变化来自 eCPM、展示量、填充率、国家结构、广告位还是广告源。",
    resources: "资源",
    trust: "可信说明",
    contact: "联系",
    trustItems: ["CSV Demo 只在浏览器本地运行", "脱敏数据行即可", "不需要账号登录或 API key"],
    links: [
      { label: "首页", href: "/" },
      { label: "演示", href: "/demo/" },
      { label: "CSV 模板", href: "/templates/" },
      { label: "案例", href: "/cases/" },
      { label: "诊断方法", href: "/method/" },
      { label: "诊断指南", href: "/learn/" },
      { label: "免费诊断", href: "/free-diagnosis/" },
      { label: "常见问题", href: "/faq/" },
      { label: "数据安全", href: "/privacy/" }
    ],
    emailLabel: "邮箱",
    note: "早期验证产品。不接 SDK，不强制注册，也不承诺收入提升。"
  }
};

export function SiteFooter({ lang }: SiteFooterProps) {
  const t = copy[lang];

  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <div className="site-footer-brand">
          <p className="section-label">{t.label}</p>
          <h2>{t.title}</h2>
          <p>{t.text}</p>
        </div>

        <div className="site-footer-column">
          <h3>{t.resources}</h3>
          <nav aria-label={t.resources}>
            {t.links.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>

        <div className="site-footer-column">
          <h3>{t.trust}</h3>
          <div className="site-footer-trust">
            {t.trustItems.map((item) => (
              <span key={item}>
                <ShieldCheck size={15} aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="site-footer-column">
          <h3>{t.contact}</h3>
          <a className="site-footer-email" href={`mailto:${publicContactEmail}`}>
            <Mail size={16} aria-hidden="true" />
            <span>{publicContactEmail}</span>
          </a>
          <p>{t.note}</p>
        </div>
      </div>
    </footer>
  );
}
