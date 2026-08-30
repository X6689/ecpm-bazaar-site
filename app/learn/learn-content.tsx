"use client";

import { ArrowRight, BookOpenCheck } from "lucide-react";
import { TopicGlyph } from "../components/diagnosis-visuals";
import { ProductNav } from "../components/product-nav";
import { useLanguagePreference } from "@/lib/language";
import { seoGuides } from "@/lib/seo-pages";
import { SiteFooter } from "../site-footer";

type Topic = "Revenue" | "Traffic" | "Fill" | "GEO" | "Placement" | "Source" | "Pricing" | "Timing";

const categories = [
  {
    title: "Revenue drops",
    description: "Start with the outcome, then identify whether volume, value, serving, or mix moved first.",
    slugs: ["why-did-my-admob-revenue-drop", "mobile-game-ad-revenue-diagnosis-checklist"]
  },
  {
    title: "Traffic & impressions",
    description: "Trace changes in users, sessions, ad opportunities, show behavior, and time-of-day patterns.",
    slugs: ["admob-impressions-dropped-ecpm-normal", "admob-revenue-drop-live-events"]
  },
  {
    title: "eCPM & country mix",
    description: "Separate demand movement from shifts in country, format, placement, source, and period mix.",
    slugs: ["admob-ecpm-dropped-impressions-stable", "country-mix-blended-ecpm"]
  },
  {
    title: "Match rate & fill rate",
    description: "Keep matching, filling, and showing distinct while you locate the affected request segment.",
    slugs: ["admob-match-rate-dropped", "rewarded-ads-fill-rate-dropped"]
  },
  {
    title: "Mediation & ad sources",
    description: "Anchor source and integration changes to a rollout boundary before changing the whole stack.",
    slugs: ["fill-rate-dropped-after-mediation-update", "one-ad-source-stopped-filling"]
  },
  {
    title: "Floors & monetization changes",
    description: "Measure total revenue and served volume together when pricing configuration changes.",
    slugs: ["revenue-dropped-after-changing-price-floors"]
  }
] as const;

const featuredSlugs = new Set([
  "why-did-my-admob-revenue-drop",
  "admob-match-rate-dropped",
  "admob-ecpm-dropped-impressions-stable"
]);

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
  const guideBySlug = new Map(seoGuides.map((guide) => [guide.slug, guide]));

  return (
    <main className="bazaar-page bazaar-resource-page bazaar-learn-page" lang={lang === "zh" ? "zh-CN" : "en"}>
      <ProductNav lang={lang} setLang={setLang} backHref="/" compact />
      <section className="learn-data-hero bazaar-container">
        <p className="bazaar-eyebrow"><BookOpenCheck size={16} aria-hidden="true" />Diagnosis guides</p>
        <h1>AdMob &amp; Mobile Ad Revenue Diagnosis Guides</h1>
        <p>Start with the metric that moved first. Revenue is the result; impressions, weighted eCPM, match rate, fill rate, country mix, placement exposure, ad-source contribution, and configuration changes are possible drivers. These guides help mobile app and game teams turn a blended account-level decline into a focused question before changing settings.</p>
        <p>First compare equal-length, completed periods with the same weekdays, timezone, apps, and inventory scope. Then segment the change by serving status, country, format, placement or ad unit, source, mediation setup, time, and floors. Keep match rate, fill rate, and show rate separate because they describe different stages between a request and an impression. Read the absolute counts behind each rate, not only the percentage.</p>
        <p>Blended averages often hide mix. Account eCPM can fall while country-level eCPMs remain stable if more impressions come from lower-value markets; revenue can fall while eCPM looks normal if impression volume drops. Choose the category that matches the first confirmed signal, follow the smallest affected segment, and make one controlled change at a time. The three highlighted guides provide the broadest starting paths for revenue, match-rate, and stable-impression eCPM declines.</p>
      </section>

      <section className="learn-content-shell">
        {categories.map((category) => (
          <section className="learn-guide-category" aria-labelledby={`category-${category.title.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`} key={category.title}>
            <div className="learn-category-heading">
              <h2 id={`category-${category.title.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`}>{category.title}</h2>
              <p>{category.description}</p>
            </div>
            <div className="learn-signal-grid">
              {category.slugs.map((slug) => guideBySlug.get(slug)).filter((guide): guide is (typeof seoGuides)[number] => Boolean(guide)).map((guide) => {
                const topic = topicFor(guide.slug);
                const featured = featuredSlugs.has(guide.slug);
                return (
                  <article className={`learn-signal-card learn-topic-${topic.toLowerCase()}${featured ? " is-featured" : ""}`} key={guide.slug}>
                    <div className="learn-card-visual"><TopicGlyph topic={topic} /><span>{topic}</span></div>
                    <div className="learn-card-meta"><span>{featured ? "Priority diagnosis" : guide.eyebrow}</span><span>{readTime(guide.slug)}</span></div>
                    <h3>{guide.title}</h3>
                    <p>{guide.description}</p>
                    <div className="learn-card-signal"><span>Key signal</span><strong>{guide.checks[0]}</strong></div>
                    <a href={`/learn/${guide.slug}/`}>{guide.title} <ArrowRight size={16} aria-hidden="true" /></a>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </section>
      <SiteFooter lang={lang} />
    </main>
  );
}
