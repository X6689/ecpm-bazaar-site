import type { Metadata } from "next";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { CopyEmailPanel } from "./copy-email-panel";

export const metadata: Metadata = {
  title: "Free Ad Revenue Diagnosis | eCPM Bazaar",
  description:
    "Send anonymized mobile ad monetization data for a free eCPM Bazaar diagnosis. No login credentials or API keys required."
};

const email = "xmmyy168@gmail.com";
const subject = "Free eCPM Bazaar diagnosis";
const fieldList = "date, appName, placementName, country, network, revenue, ecpm, impressions, requests, fills, clicks";
const body = [
  "Hi eCPM Bazaar,",
  "",
  "I would like a free ad revenue drop diagnosis.",
  "",
  "Platform: AdMob / AppLovin MAX / Unity LevelPlay / TopOn / Other",
  "App type: mobile game / app",
  "What changed: revenue / eCPM / impressions / fill rate / country mix / ad source",
  "Comparison period: latest day vs previous day / last 7 days vs previous 7 days",
  "",
  "I can share anonymized rows with these fields:",
  fieldList,
  "",
  "I will not send login credentials, API keys, private account IDs, or non-anonymized user data."
].join("\n");
const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const steps = [
  {
    title: "1. Anonymize your data",
    text: "Replace app names, ad unit IDs, and account identifiers with neutral names such as Game A or Rewarded Home."
  },
  {
    title: "2. Include two comparable periods",
    text: "The simplest version is latest day vs previous day. A 7-day comparison is also useful if your traffic is volatile."
  },
  {
    title: "3. Send fields, not account access",
    text: "CSV rows are enough for early diagnosis. Do not send passwords, login sessions, API keys, or private account screenshots."
  }
];

export default function FreeDiagnosisPage() {
  return (
    <main className="resource-page">
      <nav className="resource-nav" aria-label="Free diagnosis navigation">
        <a href="../">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to site
        </a>
        <div>
          <a href="../demo/">Demo</a>
          <a href="../templates/">Templates</a>
          <a href="../cases/">Cases</a>
          <a href="../faq/">FAQ</a>
          <a href="../privacy/">Privacy</a>
        </div>
      </nav>

      <section className="resource-hero">
        <p className="eyebrow">
          <Mail size={16} aria-hidden="true" />
          Free diagnosis
        </p>
        <h1>Send anonymized ad monetization data for a free diagnosis.</h1>
        <p>
          If your mobile game or app ad revenue changed and you are not sure why, send anonymized CSV-style rows. I will
          help check whether the movement looks more like eCPM, impressions, fill rate, country mix, placement, or ad
          source performance.
        </p>
        <div className="hero-actions">
          <a className="primary-action" href={mailto}>
            <Mail size={18} aria-hidden="true" />
            Email anonymized data
          </a>
          <a className="secondary-action" href="../templates/">
            Download templates
          </a>
        </div>
      </section>

      <section className="template-grid" aria-label="How to prepare data">
        {steps.map((step) => (
          <article className="resource-card" key={step.title}>
            <span className="resource-icon">
              <ShieldCheck size={22} aria-hidden="true" />
            </span>
            <h2>{step.title}</h2>
            <p>{step.text}</p>
          </article>
        ))}
      </section>

      <section className="field-section">
        <div>
          <p className="section-label">Request builder</p>
          <h2>Fill this in and generate an email diagnosis request</h2>
        </div>
        <CopyEmailPanel body={body} fieldList={fieldList} mailto={mailto} />
      </section>

      <section className="resource-cta danger-note">
        <ShieldCheck size={24} aria-hidden="true" />
        <div>
          <h2>No credentials needed</h2>
          <p>
            eCPM Bazaar does not need your AdMob, AppLovin MAX, Unity LevelPlay, TopOn, or Google login. For early
            feedback, anonymized report rows are enough.
          </p>
        </div>
        <a className="secondary-action" href="../privacy/">
          Data safety
        </a>
      </section>
    </main>
  );
}
