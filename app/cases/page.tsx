import type { Metadata } from "next";
import { ArrowLeft, BarChart3, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Diagnosis Cases | eCPM Bazaar",
  description:
    "Anonymized mobile ad revenue diagnosis examples for eCPM drops, fill-rate drops, and country mix changes."
};

const cases = [
  {
    title: "Case 1: eCPM dropped, traffic stayed stable",
    signal: "Revenue fell 24%. Impressions were almost flat, but weighted eCPM dropped from $18.40 to $13.90.",
    diagnosis:
      "This looks more like a pricing or demand issue than a traffic issue. The first checks should be country mix, bidder/source performance, eCPM floors, seasonality, and recent mediation changes.",
    firstChecks: ["Compare eCPM by country", "Check top ad sources", "Review floor or waterfall changes", "Look for platform status or demand changes"]
  },
  {
    title: "Case 2: fill rate dropped before revenue dropped",
    signal: "Revenue fell 31%. eCPM stayed close to normal, but fill rate moved from 78% to 54%.",
    diagnosis:
      "The eCPM number alone is misleading here. The likely driver is fill or match pressure, so changing price floors blindly could make the diagnosis worse.",
    firstChecks: ["Split requests and fills by country", "Check timeout and request logic", "Review source availability", "Inspect recent SDK or mediation releases"]
  },
  {
    title: "Case 3: country mix made eCPM look worse",
    signal: "Total eCPM dropped 18%, but US eCPM was stable. More impressions came from lower-eCPM countries.",
    diagnosis:
      "This is probably a traffic mix issue, not a global pricing collapse. The team should compare revenue contribution by country before changing global mediation settings.",
    firstChecks: ["Compare impressions share by country", "Check UA campaigns and organic traffic sources", "Review placement exposure by region", "Separate country mix from source performance"]
  }
];

export default function CasesPage() {
  return (
    <main className="resource-page">
      <nav className="resource-nav" aria-label="Cases navigation">
        <a href="../">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to site
        </a>
        <div>
          <a href="../demo/">Demo</a>
          <a href="../templates/">Templates</a>
          <a href="../free-diagnosis/">Free diagnosis</a>
          <a href="../faq/">FAQ</a>
          <a href="../privacy/">Privacy</a>
        </div>
      </nav>

      <section className="resource-hero">
        <p className="eyebrow">
          <BarChart3 size={16} aria-hidden="true" />
          Anonymized cases
        </p>
        <h1>Three common reasons mobile ad revenue changes.</h1>
        <p>
          eCPM Bazaar is built around a simple idea: when ad revenue changes, diagnose the driver before changing
          mediation, floors, placements, or user acquisition decisions.
        </p>
      </section>

      <section className="case-list" aria-label="Diagnosis examples">
        {cases.map((item) => (
          <article className="case-card" key={item.title}>
            <div>
              <p className="section-label">Diagnosis example</p>
              <h2>{item.title}</h2>
              <p className="case-signal">{item.signal}</p>
              <p>{item.diagnosis}</p>
            </div>
            <div className="check-list">
              {item.firstChecks.map((check) => (
                <span key={check}>
                  <CheckCircle2 size={17} aria-hidden="true" />
                  {check}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="resource-cta">
        <BarChart3 size={24} aria-hidden="true" />
        <div>
          <h2>Want to test your own data?</h2>
          <p>Use the browser-only demo or send anonymized fields for a free manual diagnosis.</p>
        </div>
        <a className="primary-action" href="../demo/">
          Try demo
        </a>
        <a className="secondary-action" href="../free-diagnosis/">
          Free diagnosis
        </a>
        <a className="secondary-action" href="../faq/">
          FAQ
        </a>
      </section>
    </main>
  );
}
