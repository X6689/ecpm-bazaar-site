import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site-metadata";
import { CasesContent } from "./cases-content";

export const metadata: Metadata = pageMetadata(
  "Mobile Ad Revenue Diagnosis Examples",
  "Directional mobile ad revenue diagnosis examples for eCPM drops, fill-rate drops, country mix shifts, and peak-hour impression changes.",
  "/cases/"
);

export default function CasesPage() {
  return <CasesContent />;
}
