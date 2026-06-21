import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "eCPM Bazaar | Diagnose mobile game ad revenue drops",
  description:
    "eCPM Bazaar helps small mobile game and app teams diagnose why ad revenue dropped across eCPM, fill rate, impressions, countries, placements, and ad sources. / 帮小型游戏和 App 团队诊断广告收入为什么下降。"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
