import type { Metadata } from "next";
import { PrivacyContent } from "./privacy-content";

export const metadata: Metadata = {
  title: "Data Safety & Privacy | eCPM Bazaar",
  description:
    "How eCPM Bazaar handles browser-only CSV diagnosis, anonymized ad monetization data, and free diagnosis requests."
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
