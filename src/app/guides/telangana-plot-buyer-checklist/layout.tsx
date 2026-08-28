import type { Metadata } from "next";
import { seo } from "@/data/seo";
import siteConfig from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: seo["plot-buyer-guide"].title },
  description: seo["plot-buyer-guide"].description,
  keywords: seo["plot-buyer-guide"].keywords,
  alternates: {
    canonical: siteConfig.url + "/guides/telangana-plot-buyer-checklist",
  },
  openGraph: {
    title: seo["plot-buyer-guide"].title,
    description: seo["plot-buyer-guide"].description,
    url: siteConfig.url + "/guides/telangana-plot-buyer-checklist",
    type: "article",
    siteName: siteConfig.name,
    images: [{ url: "https://www.arjunrealty.co.in/og-image.png", width: 1200, height: 630, alt: `${siteConfig.name} — Plot Buyer Guide` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo["plot-buyer-guide"].title,
    description: seo["plot-buyer-guide"].description,
    images: ["https://www.arjunrealty.co.in/og-image.png"],
  },
};

export default function PlotBuyerGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}