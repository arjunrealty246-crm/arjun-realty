import type { Metadata } from "next";
import { seo } from "@/data/seo";
import siteConfig from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: seo["why-hyderabad"].title },
  description: seo["why-hyderabad"].description,
  keywords: seo["why-hyderabad"].keywords,
  alternates: {
    canonical: siteConfig.url + "/why-hyderabad",
  },
  openGraph: {
    title: seo["why-hyderabad"].title,
    description: seo["why-hyderabad"].description,
    url: siteConfig.url + "/why-hyderabad",
    type: seo["why-hyderabad"].ogType ?? "website",
    siteName: siteConfig.name,
    images: [{ url: seo["why-hyderabad"].ogImage ?? "https://www.arjunrealty.co.in/og-image.png", width: 1200, height: 630, alt: `${siteConfig.name} — Why Hyderabad` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo["why-hyderabad"].title,
    description: seo["why-hyderabad"].description,
    images: ["https://www.arjunrealty.co.in/og-image.png"],
  },
};

export default function WhyHyderabadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
