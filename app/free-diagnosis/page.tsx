import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site-metadata";
import { FreeDiagnosisContent } from "./free-diagnosis-content";

export const metadata: Metadata = pageMetadata(
  "Free Ad Revenue Diagnosis",
  "Send anonymized mobile ad monetization data for a free eCPM Bazaar diagnosis. No login credentials or API keys required.",
  "/free-diagnosis/"
);

export default function FreeDiagnosisPage() {
  return <FreeDiagnosisContent />;
}
