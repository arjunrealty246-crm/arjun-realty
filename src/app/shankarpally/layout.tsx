import type { Metadata } from "next";
import { seo } from "@/data/seo";
import siteConfig from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: seo["shankarpally"].title },
  description: seo["shankarpally"].description,
  keywords: seo["shankarpally"].keywords,
  alternates: {
    canonical: siteConfig.url + "/shankarpally",
  },
  openGraph: {
    title: seo["shankarpally"].title,
    description: seo["shankarpally"].description,
    url: siteConfig.url + "/shankarpally",
    type: "website",
    siteName: siteConfig.name,
    images: [{ url: "https://www.arjunrealty.co.in/og-image.png", width: 1200, height: 630, alt: `${siteConfig.name} - Open Plots in Shankarpally` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo["shankarpally"].title,
    description: seo["shankarpally"].description,
    images: ["https://www.arjunrealty.co.in/og-image.png"],
  },
};

export default function ShankarpallyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
