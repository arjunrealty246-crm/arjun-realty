import type { Metadata } from "next";
import { seo } from "@/data/seo";
import siteConfig from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: seo.contact.title },
  description: seo.contact.description,
  keywords: seo.contact.keywords,
  alternates: {
    canonical: siteConfig.url + "/contact",
  },
  openGraph: {
    title: seo.contact.title,
    description: seo.contact.description,
    url: siteConfig.url + "/contact",
    type: "website",
    siteName: siteConfig.name,
    images: [{ url: "https://www.arjunrealty.co.in/og-image.png", width: 1200, height: 630, alt: `${siteConfig.name} — Contact` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.contact.title,
    description: seo.contact.description,
    images: ["https://www.arjunrealty.co.in/og-image.png"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
