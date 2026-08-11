import type { Metadata } from "next";
import { seo } from "@/data/seo";

export const metadata: Metadata = {
  title: seo.builders.title,
  description: seo.builders.description,
  openGraph: {
    title: seo.builders.title,
    description: seo.builders.description,
  },
};

export default function BuildersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
