"use client";

import { useEffect, useState } from "react";
import { ChevronDown, CircleHelp, Mail } from "lucide-react";
import { ProductNav } from "../components/product-nav";
import { useLanguagePreference } from "@/lib/language";
import { SiteFooter } from "../site-footer";

type Faq = { id: string; category: string; question: string; answer: string; link?: { href: string; label: string } };

const categories = ["Getting started", "CSV and fields", "Diagnosis method", "Privacy and safety", "Limitations", "Free diagnosis"] as const;
const faqs: Faq[] = [
  { id: "what-is-ecpm-bazaar", category: "Getting started", question: "What does eCPM Bazaar do?", answer: "It helps small mobile game and app teams investigate why ad revenue changed by comparing revenue, weighted eCPM, impressions, fill signals, country, placement, source, and timing." },
  { id: "who-is-it-for", category: "Getting started", question: "Who is this for?", answer: "It is for teams with live ad revenue and at least two comparable reporting periods, especially when there is no dedicated monetization analyst." },
  { id: "first-test", category: "Getting started", question: "What is the best first test?", answer: "Use latest day versus previous day, or last 7 days versus previous 7 days. Start with the public sample before exporting your own rows.", link: { href: "/demo/", label: "Open the demo" } },
  { id: "csv-upload", category: "CSV and fields", question: "Does the public demo upload my CSV?", answer: "No. The public demo parses CSV files locally in your browser and does not upload them. A compact email draft may be kept in browser session storage only when you choose to request a diagnosis." },
  { id: "csv-fields", category: "CSV and fields", question: "What fields should I include?", answer: "The minimum useful fields are date, revenue, and impressions. Add placement, country, source, eCPM, requests, fills, and clicks when they are available.", link: { href: "/templates/", label: "See CSV templates" } },
  { id: "anonymize", category: "CSV and fields", question: "Can I anonymize my data?", answer: "Yes. Replace app names, ad unit IDs, account IDs, and exact identifiers with neutral labels while keeping metric values and segment consistency intact." },
  { id: "match-versus-fill", category: "Diagnosis method", question: "Are match rate and fill rate the same thing?", answer: "Not automatically. Platform definitions vary, so the diagnosis keeps requests, matched requests, fills, match rate, and fill rate separate whenever they are exported.", link: { href: "/method/#fills", label: "Read the method" } },
  { id: "higher-ecpm", category: "Diagnosis method", question: "Will this automatically increase my eCPM?", answer: "No. eCPM Bazaar is a directional diagnosis tool, not a revenue guarantee. It helps decide which metric and segment should be checked first." },
  { id: "live-events", category: "Diagnosis method", question: "Can live events or time of day affect ad revenue?", answer: "Yes. Peak-hour impressions can fall during sports events, holidays, exams, work schedules, or local events even when fill and eCPM remain close to normal.", link: { href: "/learn/admob-revenue-drop-live-events/", label: "Read the timing guide" } },
  { id: "no-credentials", category: "Privacy and safety", question: "Do I need to share account access?", answer: "No. Do not send login credentials, API keys, payment details, private account IDs, or user-level personal data." },
  { id: "public-workflow", category: "Limitations", question: "Can I connect AdMob, MAX, LevelPlay, or TopOn?", answer: "No. The current public workflow supports only sample data and anonymized CSV rows. Account connections, API integrations, and automatic sync are not available." },
  { id: "free-diagnosis", category: "Free diagnosis", question: "What happens after I request a free diagnosis?", answer: "The form creates a draft in your email app. You decide what anonymized context to send. The expected output is a likely driver, supporting signals, first checks, and data limitations.", link: { href: "/free-diagnosis/", label: "Request a diagnosis" } }
];

export function FaqContent() {
  const [lang, setLang] = useLanguagePreference("en");
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("Getting started");
  const [openItems, setOpenItems] = useState<string[]>(["what-is-ecpm-bazaar"]);
  const visible = faqs.filter((item) => item.category === activeCategory);

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    const matched = faqs.find((item) => item.id === id);
    if (matched) {
      setActiveCategory(matched.category as (typeof categories)[number]);
      setOpenItems((current) => current.includes(id) ? current : [...current, id]);
    }
  }, []);

  function toggle(item: Faq) {
    setOpenItems((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id]);
    window.history.replaceState(null, "", `#${item.id}`);
  }

  return (
    <main className="bazaar-page bazaar-resource-page bazaar-faq-page" lang={lang === "zh" ? "zh-CN" : "en"}>
      <ProductNav lang={lang} setLang={setLang} backHref="/" compact />
      <section className="faq-data-hero bazaar-container">
        <p className="bazaar-eyebrow"><CircleHelp size={16} aria-hidden="true" />FAQ</p>
        <h1>Answers before you share a report.</h1>
        <p>Start with anonymized CSV rows, understand the first diagnosis, and keep private account data out of the conversation.</p>
      </section>
      <section className="faq-workspace">
        <nav className="faq-category-nav" aria-label="FAQ categories">
          {categories.map((category) => <button aria-current={activeCategory === category ? "page" : undefined} className={activeCategory === category ? "is-active" : ""} key={category} onClick={() => setActiveCategory(category)} type="button">{category}</button>)}
        </nav>
        <div className="faq-accordion-list">
          <p className="chapter-eyebrow">{activeCategory}</p>
          {visible.map((item) => {
            const expanded = openItems.includes(item.id);
            return (
              <article className="faq-accordion-item" id={item.id} key={item.id}>
                <h2><button aria-controls={`${item.id}-answer`} aria-expanded={expanded} onClick={() => toggle(item)} type="button"><span>{item.question}</span><ChevronDown className={expanded ? "is-open" : ""} size={20} aria-hidden="true" /></button></h2>
                <div hidden={!expanded} id={`${item.id}-answer`}><p>{item.answer}</p>{item.link ? <a href={item.link.href}>{item.link.label}</a> : null}</div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="faq-final-note bazaar-container"><Mail size={22} aria-hidden="true" /><div><h2>Still unsure which signal moved first?</h2><p>Try the sample diagnosis before you send a free-diagnosis request.</p></div><a className="bazaar-button bazaar-button-primary" href="/demo/">Try demo</a></section>
      <SiteFooter lang={lang} />
    </main>
  );
}
