import type { Metadata } from "next";
import { seo } from "@/data/seo";
import siteConfig from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: seo["orr"].title },
  description: seo["orr"].description,
  keywords: seo["orr"].keywords,
  alternates: {
    canonical: siteConfig.url + "/orr",
  },
  openGraph: {
    title: seo["orr"].title,
    description: seo["orr"].description,
    url: siteConfig.url + "/orr",
    type: "website",
    siteName: siteConfig.name,
    images: [{ url: "https://www.arjunrealty.co.in/og-image.png", width: 1200, height: 630, alt: `${siteConfig.name} — Plots Near Hyderabad ORR` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo["orr"].title,
    description: seo["orr"].description,
    images: ["https://www.arjunrealty.co.in/og-image.png"],
  },
};

export default function OrrLayout({ children }: { children: React.ReactNode }) {
  return children;
}
