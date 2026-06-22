import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site-metadata";
import { FaqContent } from "./faq-content";

export const metadata: Metadata = pageMetadata(
  "FAQ",
  "Frequently asked questions about eCPM Bazaar, browser-only CSV diagnosis, anonymized ad revenue data, and mobile ad monetization workflows.",
  "/faq/"
);

export default function FaqPage() {
  return <FaqContent />;
}
