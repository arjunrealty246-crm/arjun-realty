import type { Metadata } from "next";
import { seo } from "@/data/seo";

export const metadata: Metadata = {
  title: seo.projects.title,
  description: seo.projects.description,
  openGraph: {
    title: seo.projects.title,
    description: seo.projects.description,
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
