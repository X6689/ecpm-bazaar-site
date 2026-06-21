import type { Metadata } from "next";
import { ArrowLeft, CircleHelp, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ | eCPM Bazaar",
  description:
    "Frequently asked questions about eCPM Bazaar, browser-only CSV diagnosis, anonymized ad revenue data, and mobile ad monetization workflows."
};

const faqs = [
  {
    question: "What does eCPM Bazaar do?",
    answer:
      "eCPM Bazaar helps small mobile game and app teams diagnose why ad revenue changed. It compares revenue, weighted eCPM, impressions, fill rate, country, placement, and ad source signals so you can decide what to check first."
  },
  {
    question: "Does the public demo upload my CSV?",
    answer:
      "No. The public demo parses CSV files in your browser. The file is not uploaded or stored by eCPM Bazaar."
  },
  {
    question: "Do I need to connect AdMob, AppLovin MAX, Unity LevelPlay, or TopOn?",
    answer:
      "Not for the public demo. Start with CSV rows or the sample CSV. API connections can come later only after the diagnosis workflow is useful with real data."
  },
  {
    question: "What fields should I include?",
    answer:
      "The minimum useful fields are date, revenue, and impressions. For better diagnosis, include app name, placement, country, ad source, eCPM, requests, fills, and clicks."
  },
  {
    question: "Can I anonymize my data?",
    answer:
      "Yes. Replace app names, ad unit IDs, account IDs, and exact identifiers with neutral names such as Game A, Rewarded Home, or Source 1."
  },
  {
    question: "Will this automatically increase my eCPM?",
    answer:
      "No. eCPM Bazaar is a diagnosis tool, not a revenue guarantee. It helps you understand whether the change looks more like traffic, pricing, fill, country mix, placement, or ad source performance."
  },
  {
    question: "What is the best first test?",
    answer:
      "Use two comparable periods, such as latest day vs previous day or last 7 days vs previous 7 days. Then upload a CSV in the demo and copy the diagnosis result."
  },
  {
    question: "Who is this for?",
    answer:
      "It is mainly for indie developers and small mobile game/app teams that monetize with ads but do not have a dedicated data analyst."
  }
];

export default function FaqPage() {
  return (
    <main className="resource-page">
      <nav className="resource-nav" aria-label="FAQ navigation">
        <a href="../">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to site
        </a>
        <div>
          <a href="../demo/">Demo</a>
          <a href="../templates/">Templates</a>
          <a href="../cases/">Cases</a>
          <a href="../privacy/">Privacy</a>
        </div>
      </nav>

      <section className="resource-hero">
        <p className="eyebrow">
          <CircleHelp size={16} aria-hidden="true" />
          FAQ
        </p>
        <h1>Questions small teams usually ask before trying eCPM Bazaar.</h1>
        <p>
          The short version: start with anonymized CSV rows, diagnose the movement, and avoid sharing account access or
          private identifiers.
        </p>
      </section>

      <section className="faq-list" aria-label="Frequently asked questions">
        {faqs.map((item) => (
          <article className="faq-item" key={item.question}>
            <h2>{item.question}</h2>
            <p>{item.answer}</p>
          </article>
        ))}
      </section>

      <section className="resource-cta">
        <Mail size={24} aria-hidden="true" />
        <div>
          <h2>Still unsure?</h2>
          <p>Send anonymized rows or describe what changed. No login credentials or API keys are needed.</p>
        </div>
        <a className="primary-action" href="../free-diagnosis/">
          Free diagnosis
        </a>
      </section>
    </main>
  );
}
