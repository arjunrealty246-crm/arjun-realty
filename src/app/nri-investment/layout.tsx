import type { Metadata } from "next";
import { seo } from "@/data/seo";
import siteConfig from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: seo["nri-investment"].title },
  description: seo["nri-investment"].description,
  keywords: seo["nri-investment"].keywords,
  alternates: {
    canonical: siteConfig.url + "/nri-investment",
  },
  openGraph: {
    title: seo["nri-investment"].title,
    description: seo["nri-investment"].description,
    url: siteConfig.url + "/nri-investment",
    type: "website",
    siteName: siteConfig.name,
    images: [{ url: "https://www.arjunrealty.co.in/og-image.png", width: 1200, height: 630, alt: `${siteConfig.name} — NRI Investment` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo["nri-investment"].title,
    description: seo["nri-investment"].description,
    images: ["https://www.arjunrealty.co.in/og-image.png"],
  },
};

export default function NRILayout({ children }: { children: React.ReactNode }) {
  return children;
}
