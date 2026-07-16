import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site-metadata";
import { FreeDiagnosisContent } from "./free-diagnosis-content";

export const metadata: Metadata = pageMetadata(
  "Free Mobile Ad Revenue Diagnosis",
  "Request a directional diagnosis of a mobile ad revenue drop using anonymized report rows across traffic, fill, country mix, placement, ad source, timing, and weighted eCPM.",
  "/free-diagnosis/"
);

export default function FreeDiagnosisPage() {
  return <FreeDiagnosisContent />;
}
