import type { Metadata } from "next";
import { seo } from "@/data/seo";
import siteConfig from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: seo.insights.title },
  description: seo.insights.description,
  keywords: seo.insights.keywords,
  alternates: {
    canonical: siteConfig.url + "/insights",
  },
  openGraph: {
    title: seo.insights.title,
    description: seo.insights.description,
    url: siteConfig.url + "/insights",
    type: "website",
    siteName: siteConfig.name,
    images: [{ url: siteConfig.url + "/og-image.png", width: 1200, height: 630, alt: `${siteConfig.name} — Insights & Market Updates` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.insights.title,
    description: seo.insights.description,
    images: [siteConfig.url + "/og-image.png"],
  },
};

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return children;
}