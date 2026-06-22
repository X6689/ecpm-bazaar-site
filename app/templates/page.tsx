import type { Metadata } from "next";
import { TemplatesContent } from "./templates-content";

export const metadata: Metadata = {
  title: "CSV Templates | eCPM Bazaar",
  description:
    "Download CSV templates for diagnosing mobile ad revenue changes from AdMob, AppLovin MAX, Unity LevelPlay, TopOn, or generic mediation reports."
};

export default function TemplatesPage() {
  return <TemplatesContent />;
}
