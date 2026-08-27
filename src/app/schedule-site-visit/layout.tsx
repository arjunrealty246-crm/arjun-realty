import type { Metadata } from "next";
import { seo } from "@/data/seo";
import siteConfig from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: seo["schedule-site-visit"].title },
  description: seo["schedule-site-visit"].description,
  keywords: seo["schedule-site-visit"].keywords,
  alternates: {
    canonical: siteConfig.url + "/schedule-site-visit",
  },
  openGraph: {
    title: seo["schedule-site-visit"].title,
    description: seo["schedule-site-visit"].description,
    url: siteConfig.url + "/schedule-site-visit",
    type: "website",
    siteName: siteConfig.name,
    images: [{ url: "https://www.arjunrealty.co.in/og-image.png", width: 1200, height: 630, alt: `${siteConfig.name} — Schedule a Visit` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo["schedule-site-visit"].title,
    description: seo["schedule-site-visit"].description,
    images: ["https://www.arjunrealty.co.in/og-image.png"],
  },
};

export default function ScheduleSiteVisitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
