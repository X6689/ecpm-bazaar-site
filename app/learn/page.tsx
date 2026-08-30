import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site-metadata";
import { LearnContent } from "./learn-content";

export const metadata: Metadata = pageMetadata(
  "Mobile Ad Revenue Diagnosis Guides",
  "Diagnose AdMob and mobile ad revenue drops by starting with the metric that moved first, then follow focused guides for traffic, fill, eCPM, and mix.",
  "/learn/"
);

export default function LearnPage() {
  return <LearnContent />;
}
