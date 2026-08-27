import type { Metadata } from "next";
import { seo } from "@/data/seo";
import siteConfig from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: seo.services.title },
  description: seo.services.description,
  keywords: seo.services.keywords,
  alternates: {
    canonical: siteConfig.url + "/services",
  },
  openGraph: {
    title: seo.services.title,
    description: seo.services.description,
    url: siteConfig.url + "/services",
    type: "website",
    siteName: siteConfig.name,
    images: [{ url: "https://www.arjunrealty.co.in/og-image.png", width: 1200, height: 630, alt: `${siteConfig.name} — Services` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.services.title,
    description: seo.services.description,
    images: ["https://www.arjunrealty.co.in/og-image.png"],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
