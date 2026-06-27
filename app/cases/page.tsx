import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site-metadata";
import { CasesContent } from "./cases-content";

export const metadata: Metadata = pageMetadata(
  "Sample Diagnosis Reports",
  "Sample mobile game ad revenue diagnosis reports for eCPM drops, fill-rate drops, ARPDAU issues, and country mix changes.",
  "/cases/"
);

export default function CasesPage() {
  return <CasesContent />;
}
