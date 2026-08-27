import type { Metadata } from "next";
import { seo } from "@/data/seo";
import siteConfig from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: seo.privacy.title },
  description: seo.privacy.description,
  keywords: seo.privacy.keywords,
  alternates: {
    canonical: siteConfig.url + "/privacy",
  },
  openGraph: {
    title: seo.privacy.title,
    description: seo.privacy.description,
    url: siteConfig.url + "/privacy",
    type: "website",
    siteName: siteConfig.name,
    images: [{ url: "https://www.arjunrealty.co.in/og-image.png", width: 1200, height: 630, alt: `${siteConfig.name} — Privacy` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.privacy.title,
    description: seo.privacy.description,
    images: ["https://www.arjunrealty.co.in/og-image.png"],
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
