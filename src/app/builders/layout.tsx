import type { Metadata } from "next";
import { seo } from "@/data/seo";
import siteConfig from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: seo.builders.title },
  description: seo.builders.description,
  keywords: seo.builders.keywords,
  alternates: {
    canonical: siteConfig.url + "/builders",
  },
  openGraph: {
    title: seo.builders.title,
    description: seo.builders.description,
    url: siteConfig.url + "/builders",
    type: "website",
    siteName: siteConfig.name,
    images: [{ url: "https://www.arjunrealty.co.in/og-image.png", width: 1200, height: 630, alt: `${siteConfig.name} — Builders` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.builders.title,
    description: seo.builders.description,
    images: ["https://www.arjunrealty.co.in/og-image.png"],
  },
};

export default function BuildersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
