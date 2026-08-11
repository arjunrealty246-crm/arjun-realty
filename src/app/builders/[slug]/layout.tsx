import type { Metadata } from "next";
import { seo } from "@/data/seo";
import { builderProfilePage } from "@/data/content";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: builderProfilePage.pageTitle(name),
    description: builderProfilePage.pageDescription(name),
  };
}

export default function BuilderDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
