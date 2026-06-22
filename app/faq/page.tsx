import type { Metadata } from "next";
import { FaqContent } from "./faq-content";

export const metadata: Metadata = {
  title: "FAQ | eCPM Bazaar",
  description:
    "Frequently asked questions about eCPM Bazaar, browser-only CSV diagnosis, anonymized ad revenue data, and mobile ad monetization workflows."
};

export default function FaqPage() {
  return <FaqContent />;
}
