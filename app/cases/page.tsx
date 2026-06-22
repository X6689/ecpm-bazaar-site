import type { Metadata } from "next";
import { CasesContent } from "./cases-content";

export const metadata: Metadata = {
  title: "Diagnosis Cases | eCPM Bazaar",
  description:
    "Anonymized mobile ad revenue diagnosis examples for eCPM drops, fill-rate drops, and country mix changes."
};

export default function CasesPage() {
  return <CasesContent />;
}
