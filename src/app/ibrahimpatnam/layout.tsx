import type { Metadata } from "next";
import { seo } from "@/data/seo";
import siteConfig from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: seo["ibrahimpatnam"].title },
  description: seo["ibrahimpatnam"].description,
  keywords: seo["ibrahimpatnam"].keywords,
  alternates: {
    canonical: siteConfig.url + "/ibrahimpatnam",
  },
  openGraph: {
    title: seo["ibrahimpatnam"].title,
    description: seo["ibrahimpatnam"].description,
    url: siteConfig.url + "/ibrahimpatnam",
    type: "website",
    siteName: siteConfig.name,
    images: [{ url: "https://www.arjunrealty.co.in/og-image.png", width: 1200, height: 630, alt: `${siteConfig.name} — Ibrahimpatnam Plots` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo["ibrahimpatnam"].title,
    description: seo["ibrahimpatnam"].description,
    images: ["https://www.arjunrealty.co.in/og-image.png"],
  },
};

export default function IbrahimpatnamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
