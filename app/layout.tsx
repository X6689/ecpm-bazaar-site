import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "夏雨 | eCPM Bazaar",
  description: "夏雨的个人网站，记录正在推出的第一个产品 eCPM Bazaar。"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
