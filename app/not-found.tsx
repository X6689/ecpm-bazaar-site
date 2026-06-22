import { ArrowLeft, FileSpreadsheet, Mail, Play, SearchX } from "lucide-react";
import { SiteFooter } from "./site-footer";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-panel" aria-labelledby="not-found-title">
        <p className="eyebrow">
          <SearchX size={16} aria-hidden="true" />
          Page not found
        </p>
        <h1 id="not-found-title">This eCPM Bazaar page is not available.</h1>
        <p>
          The demo, CSV templates, cases, and free diagnosis pages are still available. If you followed an old link, start from one of the
          product paths below.
        </p>
        <div className="not-found-actions">
          <a className="primary-action" href="/demo/">
            <Play size={18} aria-hidden="true" />
            Try demo
          </a>
          <a className="secondary-action" href="/templates/">
            <FileSpreadsheet size={18} aria-hidden="true" />
            CSV templates
          </a>
          <a className="secondary-action" href="/free-diagnosis/">
            <Mail size={18} aria-hidden="true" />
            Free diagnosis
          </a>
          <a className="ghost-action" href="/">
            <ArrowLeft size={17} aria-hidden="true" />
            Back home
          </a>
        </div>
      </section>
      <SiteFooter lang="en" />
    </main>
  );
}
