import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site-metadata";
import { FreeDiagnosisContent } from "./free-diagnosis-content";

export const metadata: Metadata = pageMetadata(
  "Free Ad Revenue Diagnosis",
  "Get a free diagnosis for low mobile game ad revenue across eCPM, ARPDAU, fill rate, GEO, ad format, mediation, and ad source performance.",
  "/free-diagnosis/"
);

export default function FreeDiagnosisPage() {
  return <FreeDiagnosisContent />;
}
