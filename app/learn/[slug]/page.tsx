import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ClipboardCheck, Mail, Route } from "lucide-react";
import { pageMetadata } from "@/lib/site-metadata";
import { defaultSeoGuideExample, getSeoGuide, seoGuides } from "@/lib/seo-pages";
import { SiteFooter } from "../../site-footer";

type GuidePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return seoGuides.map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({ params }: GuidePageProps): Metadata {
  const guide = getSeoGuide(params.slug);

  if (!guide) {
    return {};
  }

  return pageMetadata(guide.metaTitle ?? guide.title, guide.metaDescription ?? guide.description, `/learn/${guide.slug}/`);
}

export default function GuidePage({ params }: GuidePageProps) {
  const guide = getSeoGuide(params.slug);

  if (!guide) {
    notFound();
  }

  const relatedGuides = guide.related
    .map((slug) => getSeoGuide(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const example = guide.example ?? defaultSeoGuideExample;
  const [primaryMetric, ...supportingMetrics] = example.metrics;

  const formatMetric = (metric: (typeof example.metrics)[number]) => {
    const comparison = metric.before && metric.after ? `${metric.before} to ${metric.after}` : metric.value;
    return [comparison, metric.direction].filter(Boolean).join(" · ");
  };

  return (
    <main className="resource-page bazaar-page bazaar-resource-page bazaar-guide-page">
      <nav className="resource-nav" aria-label={`${guide.title} navigation`}>
        <a href="../../learn/">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to guides
        </a>
        <div>
          <a href="../../demo/">Demo</a>
          <a href="../../free-diagnosis/">Free diagnosis</a>
          <a href="../../templates/">Templates</a>
        </div>
      </nav>

      <article className="guide-article">
        <header className="guide-header">
          <p className="eyebrow">
            <ClipboardCheck size={16} aria-hidden="true" />
            {guide.eyebrow}
          </p>
          <h1>{guide.title}</h1>
          <p>{guide.intro}</p>
        </header>

        {guide.directAnswer ? (
          <section className="guide-section-list" aria-label="Direct answer">
            <article>
              <h2>Direct answer</h2>
              {guide.directAnswer.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          </section>
        ) : null}

        {guide.formula || guide.definitions ? (
          <section className="guide-section-list" aria-label="Metric definition">
            {guide.formula ? (
              <article>
                <h2>Start with the metric relationship</h2>
                <p><strong>{guide.formula.expression}</strong></p>
                <p>{guide.formula.explanation}</p>
              </article>
            ) : null}
            {guide.definitions?.map((definition) => (
              <article key={definition.term}>
                <h2>{definition.term}</h2>
                <p>{definition.definition}</p>
              </article>
            ))}
          </section>
        ) : null}

        {guide.diagnosticTable ? (
          <section className="guide-explanation" aria-labelledby="diagnostic-table-title">
            <h2 id="diagnostic-table-title">{guide.diagnosticTable.title}</h2>
            {guide.diagnosticTable.intro ? <p>{guide.diagnosticTable.intro}</p> : null}
            <div className="overflow-x-auto">
              <table className="guide-diagnostic-table">
                <thead>
                  <tr>
                    {guide.diagnosticTable.columns.map((column) => <th scope="col" key={column}>{column}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {guide.diagnosticTable.rows.map((row) => (
                    <tr key={row.cells[0]}>
                      {row.cells.map((cell, index) => (
                        <td key={cell}>
                          {cell}
                          {index === row.cells.length - 1 && row.guide ? (
                            <> <a href={`../${row.guide.slug}/`}>{row.guide.label}</a></>
                          ) : null}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {guide.sections ? (
          <section className="guide-section-list" aria-label="Guide sections">
            {guide.sections.map((section) => (
              <article key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </article>
            ))}
          </section>
        ) : null}

        <section className="guide-two-column">
          <div className="guide-checks">
            {guide.directAnswer ? (
              <h2 className="section-label">
                <Route size={16} aria-hidden="true" />
                {guide.checksTitle}
              </h2>
            ) : (
              <p className="section-label">
                <Route size={16} aria-hidden="true" />
                {guide.checksTitle}
              </p>
            )}
            <ol>
              {guide.checks.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ol>
          </div>

          <aside className="mini-diagnosis-card guide-diagnosis-card" aria-label="Illustrative sample diagnosis card">
            <span className="share-card-brand">eCPM Bazaar</span>
            <h2>{example.headline}</h2>
            {primaryMetric ? (
              <div className="mini-score">
                <span>{primaryMetric.label}</span>
                <strong>{formatMetric(primaryMetric)}</strong>
              </div>
            ) : null}
            <div className="mini-cause">
              <span>Most likely driver</span>
              <strong>{example.likelyDriver}</strong>
            </div>
            <dl>
              {supportingMetrics.map((metric) => (
                <div key={metric.label}>
                  <dt>{metric.label}</dt>
                  <dd>{formatMetric(metric)}</dd>
                </div>
              ))}
            </dl>
            <p>{example.summary}</p>
            <ul>
              {example.supportingSignals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </aside>
        </section>

        {guide.deepDiveSections ? (
          <section className="guide-section-list" aria-label="Detailed diagnostic guidance">
            {guide.deepDiveSections.map((section) => (
              <article key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.links ? (
                  <p>
                    {section.links.map((link, index) => (
                      <span key={link.slug}>
                        {index > 0 ? " · " : ""}
                        <a href={`../${link.slug}/`}>{link.label}</a>
                      </span>
                    ))}
                  </p>
                ) : null}
              </article>
            ))}
          </section>
        ) : null}

        {guide.caution ? (
          <section className="guide-explanation">
            <h2>{guide.caution.title}</h2>
            <p>{guide.caution.intro}</p>
            <ul>
              {guide.caution.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        ) : null}

        <section className="guide-explanation">
          <p className="section-label">How to read it</p>
          <h2>{guide.diagnosisTitle}</h2>
          <p>{guide.diagnosis}</p>
          <div className="guide-next-action">
            <CheckCircle2 size={20} aria-hidden="true" />
            <span>{guide.nextAction}</span>
          </div>
        </section>

        {guide.branchLinks ? (
          <section className="guide-related" aria-label={guide.branchLinks.title}>
            <h2>{guide.branchLinks.title}</h2>
            <p>{guide.branchLinks.intro}</p>
            <div>
              {guide.branchLinks.links.map((link) => (
                <a href={`../${link.slug}/`} key={link.slug}>
                  <strong>{link.label}</strong>
                  <span>Focused diagnostic branch</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>
        ) : null}

        <section className="guide-related" aria-label="Related diagnosis guides">
          <p className="section-label">Related guides</p>
          <div>
            {relatedGuides.map((related) => (
              <a href={`../${related.slug}/`} key={related.slug}>
                <strong>{related.title}</strong>
                <span>{related.eyebrow}</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
      </article>

      <section className="resource-cta guide-cta">
        <Mail size={24} aria-hidden="true" />
        <div>
          <h2>Start with the sample diagnosis, then escalate when needed.</h2>
          <p>Use anonymized before/after data. Do not send account access, API keys, or private identifiers.</p>
        </div>
        <a className="primary-action" href="../../demo/">
          Try demo with sample data
        </a>
        <a className="secondary-action" href="../../free-diagnosis/">
          Request free diagnosis
        </a>
      </section>

      <SiteFooter lang="en" />
    </main>
  );
}
