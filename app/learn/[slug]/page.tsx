import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ClipboardCheck, Mail, Route } from "lucide-react";
import { pageMetadata } from "@/lib/site-metadata";
import { getSeoGuide, seoGuides } from "@/lib/seo-pages";
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

  return pageMetadata(guide.title, guide.description, `/learn/${guide.slug}/`);
}

export default function GuidePage({ params }: GuidePageProps) {
  const guide = getSeoGuide(params.slug);

  if (!guide) {
    notFound();
  }

  const relatedGuides = guide.related
    .map((slug) => getSeoGuide(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <main className="resource-page">
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
            <p className="section-label">
              <Route size={16} aria-hidden="true" />
              {guide.checksTitle}
            </p>
            <ol>
              {guide.checks.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ol>
          </div>

          <aside className="mini-diagnosis-card guide-diagnosis-card" aria-label="Example diagnosis card">
            <span className="share-card-brand">eCPM Bazaar</span>
            <h2>Example diagnosis card</h2>
            <div className="mini-score">
              <span>Revenue</span>
              <strong>-32%</strong>
            </div>
            <div className="mini-cause">
              <span>Likely driver</span>
              <strong>Fill rate drop</strong>
            </div>
            <dl>
              <div>
                <dt>eCPM</dt>
                <dd>Stable</dd>
              </div>
              <div>
                <dt>Impressions</dt>
                <dd>Stable</dd>
              </div>
              <div>
                <dt>Fill rate</dt>
                <dd>81% to 54%</dd>
              </div>
              <div>
                <dt>Severity</dt>
                <dd>High</dd>
              </div>
            </dl>
            <p>Check mediation source availability, waterfall / floor settings, and platform status first.</p>
          </aside>
        </section>

        <section className="guide-explanation">
          <p className="section-label">How to read it</p>
          <h2>{guide.diagnosisTitle}</h2>
          <p>{guide.diagnosis}</p>
          <div className="guide-next-action">
            <CheckCircle2 size={20} aria-hidden="true" />
            <span>{guide.nextAction}</span>
          </div>
        </section>

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
          <h2>Want a free diagnosis for your own rows?</h2>
          <p>Use anonymized before/after data. Do not send account access, API keys, or private identifiers.</p>
        </div>
        <a className="primary-action" href="../../free-diagnosis/">
          Get free diagnosis
        </a>
      </section>

      <SiteFooter lang="en" />
    </main>
  );
}
