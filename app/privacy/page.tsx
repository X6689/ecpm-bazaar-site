import type { Metadata } from "next";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Data Safety & Privacy | eCPM Bazaar",
  description:
    "How eCPM Bazaar handles browser-only CSV diagnosis, anonymized ad monetization data, and free diagnosis requests."
};

const principles = [
  {
    title: "Browser-only public demo",
    text: "CSV files selected in the public demo are parsed in your browser. They are not uploaded or stored by eCPM Bazaar."
  },
  {
    title: "No credentials required",
    text: "Do not send AdMob, AppLovin MAX, Unity LevelPlay, TopOn, Google, or mediation login credentials. The early workflow only needs anonymized report rows."
  },
  {
    title: "Anonymize before sharing",
    text: "Replace app names, ad unit IDs, account IDs, package names, and any private identifiers before sending rows for manual review."
  },
  {
    title: "Diagnosis, not financial advice",
    text: "The output is a practical diagnosis to guide investigation. It is not a guarantee of revenue improvement or a recommendation to change business settings blindly."
  }
];

const doSend = [
  "date",
  "country or region",
  "placement or ad unit name, anonymized",
  "ad source or network, anonymized if needed",
  "revenue, impressions, eCPM",
  "requests, fills, fill or match rate when available"
];

const doNotSend = [
  "passwords or login sessions",
  "API keys or publisher keys",
  "private account IDs",
  "non-anonymized user-level data",
  "payment details",
  "screenshots containing private account identifiers"
];

export default function PrivacyPage() {
  return (
    <main className="resource-page">
      <nav className="resource-nav" aria-label="Privacy navigation">
        <a href="../">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to site
        </a>
        <div>
          <a href="../demo/">Demo</a>
          <a href="../templates/">Templates</a>
          <a href="../faq/">FAQ</a>
          <a href="../free-diagnosis/">Free diagnosis</a>
        </div>
      </nav>

      <section className="resource-hero">
        <p className="eyebrow">
          <ShieldCheck size={16} aria-hidden="true" />
          Data safety
        </p>
        <h1>Use anonymized ad monetization data. Keep account access private.</h1>
        <p>
          eCPM Bazaar is being validated with privacy-first workflows: browser-only CSV parsing, anonymized rows, and no
          account credentials.
        </p>
      </section>

      <section className="template-grid" aria-label="Privacy principles">
        {principles.map((item) => (
          <article className="resource-card" key={item.title}>
            <span className="resource-icon">
              <ShieldCheck size={22} aria-hidden="true" />
            </span>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="field-section">
        <div>
          <p className="section-label">Safe to share</p>
          <h2>Useful anonymized fields</h2>
        </div>
        <div className="field-table-wrap">
          <table className="field-table">
            <tbody>
              {doSend.map((item) => (
                <tr key={item}>
                  <th>OK</th>
                  <td>{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="field-section">
        <div>
          <p className="section-label">Do not send</p>
          <h2>Keep these private</h2>
        </div>
        <div className="field-table-wrap">
          <table className="field-table">
            <tbody>
              {doNotSend.map((item) => (
                <tr key={item}>
                  <th>Private</th>
                  <td>{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="resource-cta">
        <Mail size={24} aria-hidden="true" />
        <div>
          <h2>Need a manual diagnosis?</h2>
          <p>Use the free diagnosis page to copy the field list and prepare anonymized rows.</p>
        </div>
        <a className="primary-action" href="../free-diagnosis/">
          Free diagnosis
        </a>
      </section>
    </main>
  );
}
