import type { Metadata } from "next";
import "./globals.css";

const siteUrl = new URL("https://ecpmbazaar.com");
const siteTitle = "eCPM Bazaar | Diagnose mobile game ad revenue drops";
const siteDescription =
  "eCPM Bazaar helps small mobile game and app teams diagnose why ad revenue dropped across eCPM, fill rate, impressions, countries, placements, and ad sources.";

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
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
