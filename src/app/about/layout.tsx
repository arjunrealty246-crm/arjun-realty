import type { Metadata } from "next";
import { seo } from "@/data/seo";
import siteConfig from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: seo.about.title },
  description: seo.about.description,
  keywords: seo.about.keywords,
  alternates: {
    canonical: siteConfig.url + "/about",
  },
  openGraph: {
    title: seo.about.title,
    description: seo.about.description,
    url: siteConfig.url + "/about",
    type: "website",
    siteName: siteConfig.name,
    images: [{ url: "https://www.arjunrealty.co.in/og-image.png", width: 1200, height: 630, alt: `${siteConfig.name} — About` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.about.title,
    description: seo.about.description,
    images: ["https://www.arjunrealty.co.in/og-image.png"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
