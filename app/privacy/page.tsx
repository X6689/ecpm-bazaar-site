import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site-metadata";
import { PrivacyContent } from "./privacy-content";

export const metadata: Metadata = pageMetadata(
  "Data Safety & Privacy",
  "How eCPM Bazaar handles browser-only CSV diagnosis, anonymized ad monetization data, and free diagnosis requests.",
  "/privacy/"
);

export default function PrivacyPage() {
  return <PrivacyContent />;
}
