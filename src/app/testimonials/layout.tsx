import type { Metadata } from "next";
import { seo } from "@/data/seo";

export const metadata: Metadata = {
  title: seo.testimonials.title,
  description: seo.testimonials.description,
  openGraph: {
    title: seo.testimonials.title,
    description: seo.testimonials.description,
  },
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
