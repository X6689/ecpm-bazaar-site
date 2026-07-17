import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site-metadata";
import { LearnContent } from "./learn-content";

export const metadata: Metadata = pageMetadata(
  "Mobile Ad Revenue Diagnosis Guides",
  "Practical eCPM Bazaar guides for diagnosing AdMob revenue drops, match rate drops, rewarded ad fill issues, and mobile game ad monetization changes.",
  "/learn/"
);

export default function LearnPage() {
  return <LearnContent />;
}
