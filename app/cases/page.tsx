import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site-metadata";
import { CasesContent } from "./cases-content";

export const metadata: Metadata = pageMetadata(
  "Diagnosis Cases",
  "Anonymized mobile ad revenue diagnosis examples for eCPM drops, fill-rate drops, and country mix changes.",
  "/cases/"
);

export default function CasesPage() {
  return <CasesContent />;
}
