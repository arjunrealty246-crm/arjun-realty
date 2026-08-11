import type { Metadata } from "next";
import { seo } from "@/data/seo";

export const metadata: Metadata = {
  title: seo["nri-investment"].title,
  description: seo["nri-investment"].description,
  openGraph: {
    title: seo["nri-investment"].title,
    description: seo["nri-investment"].description,
  },
};

export default function NRILayout({ children }: { children: React.ReactNode }) {
  return children;
}
