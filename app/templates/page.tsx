import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site-metadata";
import { TemplatesContent } from "./templates-content";

export const metadata: Metadata = pageMetadata(
  "CSV Templates",
  "Download CSV templates and a 14-day sample for diagnosing mobile ad revenue changes from AdMob, AppLovin MAX, Unity LevelPlay, TopOn, or generic mediation reports.",
  "/templates/"
);

export default function TemplatesPage() {
  return <TemplatesContent />;
}
