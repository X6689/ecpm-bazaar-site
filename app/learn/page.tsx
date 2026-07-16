import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, BookOpenCheck, Mail } from "lucide-react";
import { pageMetadata } from "@/lib/site-metadata";
import { seoGuides } from "@/lib/seo-pages";
import { SiteFooter } from "../site-footer";

export const metadata: Metadata = pageMetadata(
  "Mobile Ad Revenue Diagnosis Guides",
  "Practical eCPM Bazaar guides for diagnosing AdMob revenue drops, match rate drops, rewarded ad fill issues, and mobile game ad monetization changes.",
  "/learn/"
);

export default function LearnPage() {
  return (
    <main className="resource-page">
      <nav className="resource-nav" aria-label="Guides navigation">
        <a href="../">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to site
        </a>
        <div>
          <a href="../demo/">Demo</a>
          <a href="../free-diagnosis/">Free diagnosis</a>
          <a href="../templates/">Templates</a>
        </div>
      </nav>

      <section className="resource-hero learn-hero">
        <p className="eyebrow">
          <BookOpenCheck size={16} aria-hidden="true" />
          Diagnosis guides
        </p>
        <h1>Find what most likely caused your mobile ad revenue drop.</h1>
        <p>
          These short guides are built for mobile app and game teams diagnosing AdMob, AppLovin,
          Unity Ads, LevelPlay, or mediation revenue changes from anonymized report rows.
        </p>
        <div className="hero-actions">
          <a className="primary-action" href="../demo/">
            Try demo with sample data
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a className="secondary-action" href="../free-diagnosis/">
            Request free diagnosis
          </a>
        </div>
      </section>

      <section className="learn-grid" aria-label="SEO diagnosis guides">
        {seoGuides.map((guide) => (
          <article className="learn-card" key={guide.slug}>
            <span>{guide.eyebrow}</span>
            <h2>{guide.title}</h2>
            <p>{guide.description}</p>
            <a href={`${guide.slug}/`}>
              Read guide
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </article>
        ))}
      </section>

      <section className="resource-cta">
        <Mail size={24} aria-hidden="true" />
        <div>
          <h2>Have anonymized before/after rows?</h2>
          <p>Use anonymized before/after rows for a directional diagnosis. No dashboard login, SDK, or API key needed.</p>
        </div>
        <a className="primary-action" href="../free-diagnosis/">
          Request free diagnosis
        </a>
      </section>

      <SiteFooter lang="en" />
    </main>
  );
}
