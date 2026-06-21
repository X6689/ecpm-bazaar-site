import type { Metadata } from "next";
import { ArrowLeft, Download, FileSpreadsheet, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "CSV Templates | eCPM Bazaar",
  description:
    "Download CSV templates for diagnosing mobile ad revenue changes from AdMob, AppLovin MAX, Unity LevelPlay, TopOn, or generic mediation reports."
};

const templates = [
  {
    title: "AdMob template",
    href: "admob-ecpm-bazaar-template.csv",
    note: "Use this when you export AdMob or AdMob-like report rows by date, country, and ad unit.",
    fields: "date, appName, placementName, country, network, revenue, ecpm, impressions, requests, fills, clicks"
  },
  {
    title: "AppLovin MAX template",
    href: "applovin-max-ecpm-bazaar-template.csv",
    note: "Use this for MAX reporting exports after mapping ad unit or placement names into placementName.",
    fields: "date, appName, placementName, country, network, revenue, ecpm, impressions, requests, fills, clicks"
  },
  {
    title: "Unity LevelPlay / TopOn template",
    href: "levelplay-topon-ecpm-bazaar-template.csv",
    note: "Use this for mediation reports where one row represents a date, country, placement, and ad source.",
    fields: "date, appName, placementName, country, network, revenue, ecpm, impressions, requests, fills, clicks"
  }
];

const requiredFields = [
  ["date", "Report date. Use YYYY-MM-DD when possible."],
  ["appName", "Game or app name. This can be anonymized."],
  ["placementName", "Ad unit, placement, or ad format name."],
  ["country", "Country code or country name."],
  ["network", "Ad source, mediation platform, or aggregate source."],
  ["revenue", "Estimated ad revenue in USD."],
  ["impressions", "Ad impressions for the row."]
];

const recommendedFields = [
  ["ecpm", "Revenue / impressions * 1000. eCPM Bazaar can calculate it if missing."],
  ["requests", "Ad requests. Needed for fill-rate diagnosis."],
  ["fills", "Matched or filled requests. Needed for fill-rate diagnosis."],
  ["clicks", "Optional, useful for CTR sanity checks."]
];

const acceptedAliases = [
  ["date", "date, day, report date"],
  ["appName", "app name, app, application"],
  ["placementName", "placement, ad unit, ad unit name, ad format, format"],
  ["country", "country, country code, geo, region"],
  ["network", "network, ad source, demand source, mediation, platform"],
  ["revenue", "revenue, estimated revenue, estimated earnings, earnings, income, ad revenue"],
  ["ecpm", "ecpm, eCPM, observed eCPM, average eCPM"],
  ["impressions", "impressions, ad impressions, shows"],
  ["requests", "requests, ad requests, attempts"],
  ["fills", "fills, matched requests, filled requests, responses, matches"],
  ["fillRate", "fill rate, fillRate, match rate, matchRate, matched rate"],
  ["clicks", "clicks, ad clicks"]
];

export default function TemplatesPage() {
  return (
    <main className="resource-page">
      <nav className="resource-nav" aria-label="Templates navigation">
        <a href="../">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to site
        </a>
        <div>
          <a href="../demo/">Demo</a>
          <a href="../cases/">Cases</a>
          <a href="../free-diagnosis/">Free diagnosis</a>
        </div>
      </nav>

      <section className="resource-hero">
        <p className="eyebrow">
          <FileSpreadsheet size={16} aria-hidden="true" />
          CSV templates
        </p>
        <h1>Prepare ad monetization data for diagnosis.</h1>
        <p>
          These templates help small mobile game and app teams compare the latest day with the previous day by revenue,
          weighted eCPM, impressions, fill rate, country, placement, and ad source. You can anonymize app names before
          using the demo.
        </p>
      </section>

      <section className="template-grid" aria-label="Download CSV templates">
        {templates.map((template) => (
          <article className="resource-card" key={template.title}>
            <span className="resource-icon">
              <FileSpreadsheet size={22} aria-hidden="true" />
            </span>
            <h2>{template.title}</h2>
            <p>{template.note}</p>
            <code>{template.fields}</code>
            <a className="primary-action" download href={template.href}>
              <Download size={18} aria-hidden="true" />
              Download CSV
            </a>
          </article>
        ))}
      </section>

      <section className="field-section">
        <div>
          <p className="section-label">Required fields</p>
          <h2>Minimum data needed for a useful diagnosis</h2>
        </div>
        <div className="field-table-wrap">
          <table className="field-table">
            <tbody>
              {requiredFields.map(([field, description]) => (
                <tr key={field}>
                  <th>{field}</th>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="field-section">
        <div>
          <p className="section-label">Recommended fields</p>
          <h2>Better fields for finding the real driver</h2>
        </div>
        <div className="field-table-wrap">
          <table className="field-table">
            <tbody>
              {recommendedFields.map(([field, description]) => (
                <tr key={field}>
                  <th>{field}</th>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="field-section">
        <div>
          <p className="section-label">Accepted aliases</p>
          <h2>You do not have to rename every export column</h2>
        </div>
        <div className="field-table-wrap">
          <table className="field-table alias-table">
            <tbody>
              {acceptedAliases.map(([field, aliases]) => (
                <tr key={field}>
                  <th>{field}</th>
                  <td>{aliases}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="resource-cta">
        <ShieldCheck size={24} aria-hidden="true" />
        <div>
          <h2>Privacy first</h2>
          <p>
            The public demo parses CSV files in your browser. Nothing is uploaded or stored. For manual review, remove
            app IDs, exact app names, and any private account identifiers before sending data.
          </p>
        </div>
        <a className="secondary-action" href="../demo/">
          Try the demo
        </a>
      </section>
    </main>
  );
}
