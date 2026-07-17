"use client";

import { ArrowUpRight, ChevronLeft } from "lucide-react";
import type { Lang } from "@/lib/language";

type ProductNavProps = {
  lang: Lang;
  setLang: (next: Lang) => void;
  backHref?: string;
  compact?: boolean;
};

const labels = {
  en: {
    home: "eCPM Bazaar",
    subline: "Revenue diagnosis",
    back: "Back to home",
    demo: "Demo",
    templates: "Templates",
    cases: "Cases",
    method: "Method",
    learn: "Guides",
    free: "Free diagnosis",
    language: "Language"
  },
  zh: {
    home: "eCPM Bazaar",
    subline: "收入诊断",
    back: "返回首页",
    demo: "演示",
    templates: "模板",
    cases: "案例",
    method: "方法",
    learn: "指南",
    free: "免费诊断",
    language: "语言"
  }
} as const;

export function ProductNav({ lang, setLang, backHref = "/", compact = false }: ProductNavProps) {
  const t = labels[lang];

  return (
    <header className={`bazaar-nav${compact ? " bazaar-nav-compact" : ""}`}>
      <a className="bazaar-brand" href={backHref} aria-label={backHref === "/" ? t.home : t.back}>
        {backHref === "/" ? <span className="bazaar-brand-mark">EB</span> : <ChevronLeft size={19} aria-hidden="true" />}
        <span>
          <strong>{t.home}</strong>
          <small>{t.subline}</small>
        </span>
      </a>

      <div className="bazaar-nav-right">
        <nav className="bazaar-nav-links" aria-label="Product navigation">
          <a href="/demo/">{t.demo}</a>
          <a href="/templates/">{t.templates}</a>
          <a href="/cases/">{t.cases}</a>
          <a href="/method/">{t.method}</a>
          {!compact ? <a href="/learn/">{t.learn}</a> : null}
        </nav>
        <div className="bazaar-language-switch" aria-label={t.language}>
          <button aria-pressed={lang === "zh"} className={lang === "zh" ? "is-active" : ""} type="button" onClick={() => setLang("zh")}>
            中文
          </button>
          <button aria-pressed={lang === "en"} className={lang === "en" ? "is-active" : ""} type="button" onClick={() => setLang("en")}>
            EN
          </button>
        </div>
        <a className="bazaar-nav-cta" href="/free-diagnosis/">
          {t.free}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
