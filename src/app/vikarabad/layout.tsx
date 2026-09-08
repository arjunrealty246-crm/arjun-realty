import type { Metadata } from "next";
import { seo } from "@/data/seo";
import siteConfig from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: seo["vikarabad"].title },
  description: seo["vikarabad"].description,
  keywords: seo["vikarabad"].keywords,
  alternates: {
    canonical: siteConfig.url + "/vikarabad",
  },
  openGraph: {
    title: seo["vikarabad"].title,
    description: seo["vikarabad"].description,
    url: siteConfig.url + "/vikarabad",
    type: "website",
    siteName: siteConfig.name,
    images: [{ url: "https://www.arjunrealty.co.in/og-image.png", width: 1200, height: 630, alt: `${siteConfig.name} — Vikarabad Plots` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo["vikarabad"].title,
    description: seo["vikarabad"].description,
    images: ["https://www.arjunrealty.co.in/og-image.png"],
  },
};

export default function VikarabadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
