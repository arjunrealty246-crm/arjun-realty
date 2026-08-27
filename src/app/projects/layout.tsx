import type { Metadata } from "next";
import { seo } from "@/data/seo";
import siteConfig from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: seo.projects.title },
  description: seo.projects.description,
  keywords: seo.projects.keywords,
  alternates: {
    canonical: siteConfig.url + "/projects",
  },
  openGraph: {
    title: seo.projects.title,
    description: seo.projects.description,
    url: siteConfig.url + "/projects",
    type: "website",
    siteName: siteConfig.name,
    images: [{ url: "https://www.arjunrealty.co.in/og-image.png", width: 1200, height: 630, alt: `${siteConfig.name} — Projects` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.projects.title,
    description: seo.projects.description,
    images: ["https://www.arjunrealty.co.in/og-image.png"],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
