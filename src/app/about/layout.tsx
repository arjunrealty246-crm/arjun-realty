import type { Metadata } from "next";
import { seo } from "@/data/seo";

export const metadata: Metadata = {
  title: seo.about.title,
  description: seo.about.description,
  openGraph: {
    title: seo.about.title,
    description: seo.about.description,
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
