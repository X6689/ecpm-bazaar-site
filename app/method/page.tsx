import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site-metadata";
import { MethodContent } from "./method-content";

export const metadata: Metadata = pageMetadata(
  "Mobile ad revenue diagnosis method",
  "How eCPM Bazaar separates mobile ad revenue changes across impressions, weighted eCPM, fill rate, country mix, placement exposure, ad source signals, and audience timing.",
  "/method/"
);

export default function MethodPage() {
  return <MethodContent />;
}
