import type { Metadata } from "next";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site-metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteTitle,
    template: "%s | eCPM Bazaar"
  },
  description: `${siteDescription} / 帮小型游戏和 App 团队诊断广告收入为什么下降。`,
  applicationName: "eCPM Bazaar",
  authors: [{ name: "Xia Yu", url: siteUrl }],
  creator: "Xia Yu",
  publisher: "eCPM Bazaar",
  keywords: [
    "mobile ad revenue",
    "eCPM",
    "AdMob",
    "AppLovin MAX",
    "Unity LevelPlay",
    "TopOn",
    "fill rate",
    "mobile game monetization",
    "ad revenue diagnosis"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "eCPM Bazaar",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1672,
        height: 941,
        alt: "Ad revenue dropped? Find the real driver first with eCPM Bazaar."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
