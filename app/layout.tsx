import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "eCPM Bazaar | Ad revenue diagnosis for mobile games",
  description:
    "eCPM Bazaar helps mobile game and app developers diagnose ad revenue changes across eCPM, fill rate, impressions, countries, placements, and ad sources. / 帮助小游戏和 App 开发者诊断广告收入波动。"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
