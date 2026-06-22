import type { Metadata } from "next";

export const siteUrl = new URL("https://ecpmbazaar.com");

export const siteTitle = "eCPM Bazaar | Diagnose mobile game ad revenue drops";

export const siteDescription =
  "eCPM Bazaar helps small mobile game and app teams diagnose why ad revenue dropped across eCPM, fill rate, impressions, countries, placements, and ad sources.";

const ogImage = {
  url: "/og-image.png",
  width: 1672,
  height: 941,
  alt: "Ad revenue dropped? Find the real driver first with eCPM Bazaar."
};

export function pageMetadata(title: string, description: string, path: `/${string}`): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: "eCPM Bazaar",
      title: `${title} | eCPM Bazaar`,
      description,
      images: [ogImage]
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | eCPM Bazaar`,
      description,
      images: [ogImage.url]
    }
  };
}
