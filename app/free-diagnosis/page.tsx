import type { Metadata } from "next";
import { FreeDiagnosisContent } from "./free-diagnosis-content";

export const metadata: Metadata = {
  title: "Free Ad Revenue Diagnosis | eCPM Bazaar",
  description:
    "Send anonymized mobile ad monetization data for a free eCPM Bazaar diagnosis. No login credentials or API keys required."
};

export default function FreeDiagnosisPage() {
  return <FreeDiagnosisContent />;
}
