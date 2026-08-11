import type { Metadata } from "next";
import { seo } from "@/data/seo";

export const metadata: Metadata = {
  title: seo["why-hyderabad"].title,
  description: seo["why-hyderabad"].description,
  openGraph: {
    title: seo["why-hyderabad"].title,
    description: seo["why-hyderabad"].description,
  },
};

export default function WhyHyderabadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
