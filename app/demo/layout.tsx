import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata(
  "Public Demo",
  "Try the browser-only eCPM Bazaar demo with sample data, CSV upload, diagnosis cards, and latest-day or 7-day ad revenue comparison windows.",
  "/demo/"
);

export default function DemoLayout({ children }: { children: ReactNode }) {
  return children;
}
