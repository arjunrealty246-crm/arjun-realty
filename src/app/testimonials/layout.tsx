import type { Metadata } from "next";
import { seo } from "@/data/seo";
import siteConfig from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: seo.testimonials.title },
  description: seo.testimonials.description,
  keywords: seo.testimonials.keywords,
  alternates: {
    canonical: siteConfig.url + "/testimonials",
  },
  openGraph: {
    title: seo.testimonials.title,
    description: seo.testimonials.description,
    url: siteConfig.url + "/testimonials",
    type: "website",
    siteName: siteConfig.name,
    images: [{ url: "https://www.arjunrealty.co.in/og-image.png", width: 1200, height: 630, alt: `${siteConfig.name} — Testimonials` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.testimonials.title,
    description: seo.testimonials.description,
    images: ["https://www.arjunrealty.co.in/og-image.png"],
  },
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
