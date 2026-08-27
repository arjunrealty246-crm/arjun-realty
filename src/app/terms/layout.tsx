import type { Metadata } from "next";
import { seo } from "@/data/seo";
import siteConfig from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: seo.terms.title },
  description: seo.terms.description,
  keywords: seo.terms.keywords,
  alternates: {
    canonical: siteConfig.url + "/terms",
  },
  openGraph: {
    title: seo.terms.title,
    description: seo.terms.description,
    url: siteConfig.url + "/terms",
    type: "website",
    siteName: siteConfig.name,
    images: [{ url: "https://www.arjunrealty.co.in/og-image.png", width: 1200, height: 630, alt: `${siteConfig.name} — Terms` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.terms.title,
    description: seo.terms.description,
    images: ["https://www.arjunrealty.co.in/og-image.png"],
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
