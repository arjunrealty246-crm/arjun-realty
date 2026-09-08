import type { Metadata } from "next";
import { seo } from "@/data/seo";
import siteConfig from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: seo["srisailam-highway-future-city"].title },
  description: seo["srisailam-highway-future-city"].description,
  keywords: seo["srisailam-highway-future-city"].keywords,
  alternates: {
    canonical: siteConfig.url + "/srisailam-highway-future-city",
  },
  openGraph: {
    title: seo["srisailam-highway-future-city"].title,
    description: seo["srisailam-highway-future-city"].description,
    url: siteConfig.url + "/srisailam-highway-future-city",
    type: "website",
    siteName: siteConfig.name,
    images: [{ url: "https://www.arjunrealty.co.in/og-image.png", width: 1200, height: 630, alt: `${siteConfig.name} — Srisailam Highway & Future City Plots` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo["srisailam-highway-future-city"].title,
    description: seo["srisailam-highway-future-city"].description,
    images: ["https://www.arjunrealty.co.in/og-image.png"],
  },
};

export default function SrisailamHighwayFutureCityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
