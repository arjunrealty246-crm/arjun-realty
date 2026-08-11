import type { Metadata } from "next";
import { seo } from "@/data/seo";

export const metadata: Metadata = {
  title: seo.terms.title,
  description: seo.terms.description,
  openGraph: {
    title: seo.terms.title,
    description: seo.terms.description,
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
