import type { Metadata } from "next";
import { seo } from "@/data/seo";

export const metadata: Metadata = {
  title: seo.contact.title,
  description: seo.contact.description,
  openGraph: {
    title: seo.contact.title,
    description: seo.contact.description,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
