"use client";

import { useMemo, useState } from "react";
import { ArrowRight, BookOpenCheck } from "lucide-react";
import { TopicGlyph } from "../components/diagnosis-visuals";
import { ProductNav } from "../components/product-nav";
import { useLanguagePreference } from "@/lib/language";
import { seoGuides } from "@/lib/seo-pages";
import { SiteFooter } from "../site-footer";

const filters = ["All", "Revenue", "Traffic", "Fill", "GEO", "Placement", "Source", "Pricing", "Timing"] as const;
type Filter = (typeof filters)[number];
type Topic = Exclude<Filter, "All">;

function topicFor(slug: string): Topic {
  if (slug.includes("match") || slug.includes("fill-rate") || slug.includes("rewarded")) return "Fill";
  if (slug.includes("country")) return "GEO";
  if (slug.includes("impressions")) return "Traffic";
  if (slug.includes("live-events")) return "Timing";
  if (slug.includes("source") || slug.includes("mediation")) return "Source";
  if (slug.includes("ecpm") || slug.includes("floors")) return "Pricing";
  return "Revenue";
}

function readTime(slug: string) {
  return slug.includes("checklist") ? "3 min checklist" : slug.includes("live-events") || slug.includes("country") ? "5 min guide" : "4 min guide";
}

export function LearnContent() {
  const [lang, setLang] = useLanguagePreference("en");
  const [filter, setFilter] = useState<Filter>("All");
  const guides = useMemo(() => seoGuides.map((guide) => ({ ...guide, topic: topicFor(guide.slug) })), []);
  const visibleGuides = filter === "All" ? guides : guides.filter((guide) => guide.topic === filter);

  return (
    <main className="bazaar-page bazaar-resource-page bazaar-learn-page" lang={lang === "zh" ? "zh-CN" : "en"}>
      <ProductNav lang={lang} setLang={setLang} backHref="/" compact />
      <section className="learn-data-hero bazaar-container">
        <p className="bazaar-eyebrow"><BookOpenCheck size={16} aria-hidden="true" />Diagnosis guides</p>
        <h1>Find the signal behind an ad revenue change.</h1>
        <p>Short, structured guides for mobile app and game teams separating traffic, fill, GEO, placement, source, pricing, and timing before changing settings.</p>
      </section>

      <section className="learn-content-shell">
        <div className="learn-filter-bar" role="toolbar" aria-label="Guide category filter">
          {filters.map((item) => (
            <button aria-pressed={filter === item} className={filter === item ? "is-active" : ""} key={item} onClick={() => setFilter(item)} type="button">
              {item}
            </button>
          ))}
        </div>
        <div className="learn-signal-grid" aria-live="polite">
          {visibleGuides.map((guide) => (
            <article className={`learn-signal-card learn-topic-${guide.topic.toLowerCase()}`} key={guide.slug}>
              <div className="learn-card-visual"><TopicGlyph topic={guide.topic} /><span>{guide.topic}</span></div>
              <div className="learn-card-meta"><span>{guide.eyebrow}</span><span>{readTime(guide.slug)}</span></div>
              <h2>{guide.title}</h2>
              <p>{guide.description}</p>
              <div className="learn-card-signal"><span>Key signal</span><strong>{guide.checks[0]}</strong></div>
              <a href={`/learn/${guide.slug}/`}>Read guide <ArrowRight size={16} aria-hidden="true" /></a>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter lang={lang} />
    </main>
  );
}
