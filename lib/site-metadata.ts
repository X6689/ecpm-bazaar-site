import type { Metadata } from "next";

export const siteUrl = new URL("https://ecpmbazaar.com");

export const siteTitle = "eCPM Bazaar | Diagnose mobile ad revenue drops";

export const siteDescription =
  "Find what most likely caused your mobile ad revenue drop with a browser-only, anonymized CSV diagnosis before changing floors or mediation.";

const ogImage = {
  url: "/og-image.png",
  width: 1672,
  height: 941,
  alt: "Ad revenue dropped? Find the real driver first with eCPM Bazaar."
};

export function pageMetadata(title: string, description: string, path: `/${string}`): Metadata {
  const canonical = new URL(path, siteUrl).toString();
  const socialTitle = title.includes("eCPM Bazaar") ? title : `${title} | eCPM Bazaar`;

  return {
    title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "eCPM Bazaar",
      title: socialTitle,
      description,
      images: [ogImage]
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [ogImage.url]
    }
  };
}
