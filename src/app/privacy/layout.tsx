import type { Metadata } from "next";
import { seo } from "@/data/seo";

export const metadata: Metadata = {
  title: seo.privacy.title,
  description: seo.privacy.description,
  openGraph: {
    title: seo.privacy.title,
    description: seo.privacy.description,
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
