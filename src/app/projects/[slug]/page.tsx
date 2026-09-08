import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRelatedProjects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { getInsightBySlug, type Insight } from "@/data/insights";
import PremiumProjectDetailPage from "@/components/PremiumProjectDetailPage";
import siteConfig from "@/config/site";
import { connectDB } from "@/lib/mongodb";
import { getMergedProject, isUsableMediaUrl } from "@/lib/merged-project";
import { getProjectHref } from "@/lib/project-links";
import TestimonialModel from "@/lib/models/Testimonial";

// The project page is backed by admin-editable data in MongoDB. It is rendered
// dynamically on every request so that it always reflects the latest saved
// project media (gallery, layout, master plan, location map, brochure, etc.)
// after an Admin update. Static pre-rendering + ISR here caused stale HTML
// (e.g. an empty gallery) to be served from the CDN/browser cache long after an
// Admin edit, because `revalidatePath` only marks a route for revalidation on
// the next visit. Dynamic rendering removes that staleness window entirely.
export const dynamic = "force-dynamic";

function buildProjectKeywords(project: Project): string[] {
  const loc = project.location.split(",").map((s) => s.trim());
  const shortLoc = loc[0] || "Hyderabad";
  const primaryKeyword = `${project.name} ${shortLoc}`;
  const keywords = [
    primaryKeyword,
    project.name,
    `${project.name} plots`,
    `${project.name} Hyderabad`,
    project.location,
    `${project.projectType} Hyderabad`,
    "Hyderabad real estate",
    "real estate investment Hyderabad",
    `${shortLoc} plots`,
    `plots in ${shortLoc}`,
    `open plots near ${shortLoc}`,
    `${shortLoc} real estate`,
  ];
  if (project.approval.includes("HMDA") && !project.approval.toLowerCase().includes("under process")) keywords.push("HMDA approved plots Hyderabad", "HMDA approved plots");
  if (project.approval.includes("DTCP") && !project.approval.toLowerCase().includes("under process")) keywords.push("DTCP approved plots Hyderabad", "DTCP approved layouts");
  if (project.approval.includes("RERA") && !project.approval.toLowerCase().includes("under process")) keywords.push("RERA registered projects Hyderabad");
  if (project.approval.includes("FCDA") && !project.approval.toLowerCase().includes("under process")) keywords.push("FCDA approved plots Hyderabad", "Future City plots Hyderabad");
  if (project.isUpcoming || (project.badge && ["Upcoming", "Pre-Launch"].includes(project.badge))) {
    keywords.push(`upcoming projects in ${shortLoc}`, `upcoming projects near ${shortLoc}`);
    if (shortLoc.toLowerCase().includes("shankarpally")) {
      keywords.push("plots in Shankarpally", "open plots near Hyderabad", "residential plots near Shankarpally", "upcoming projects in Shankarpally");
    }
  }
  if (project.totalAcres) keywords.push(`${project.totalAcres} acre project Hyderabad`);
  return [...new Set(keywords)];
}

// Normalizes presentation-only formatting of an auto-generated project title
// part so dash/space styling stays consistent across the project detail system.
// It only touches separator formatting (spaced hyphens -> en dashes, whitespace
// collapsing/trimming) and never rewrites names, locations, types, or facts.
function normalizeTitlePart(text: string): string {
  if (!text) return text;
  return text
    .replace(/\s+-\s+/g, " – ") // spaced hyphen separator -> spaced en dash (site convention)
    .replace(/\s+/g, " ") // collapse stray whitespace
    .replace(/^\s+|\s+$/g, ""); // trim
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getMergedProject(slug);
  if (!project) return { robots: { index: false, follow: false } };

  const isUpcoming = project.status === "Upcoming";
  const isPreLaunch = project.status === "Pre-Launch";
  // Auto-generated title parts are normalized for consistent dash/space formatting.
  const nameTitle = normalizeTitlePart(project.name || "");
  const locShort = normalizeTitlePart(project.location.split(",")[0].replace(/^(Near |Close to )/, ""));
  const typeShort = normalizeTitlePart(project.projectType.replace(/\s*&\s*/g, " & ").split(" ").slice(0, 4).join(" ").replace(/\s*[&,]\s*$/, ""));

  let title: string;
  const explicitTitle = project.seoTitle?.trim();
  if (explicitTitle) {
    title = explicitTitle;
  } else if (isUpcoming) {
    title = `Upcoming ${typeShort} in ${locShort} | Arjun Realty`;
  } else if (isPreLaunch) {
    title = `${nameTitle} | Pre-Launch ${typeShort} in ${locShort}`;
  } else {
    title = `${nameTitle} | ${typeShort} in ${locShort}`;
  }
  if (!explicitTitle && title.length > 60) {
    const words = typeShort.split(" ");
    while (words.length > 1) {
      const candidate = `${nameTitle} | ${words.join(" ")}`;
      if (candidate.length <= 60) {
        title = candidate;
        break;
      }
      words.pop();
    }
    if (title.length > 60) title = `${nameTitle} | ${locShort}`;
  }
  if (title.length > 60) {
    const maxLocLen = 60 - nameTitle.length - 3;
    const trimmedLoc = locShort.slice(0, Math.max(10, maxLocLen)).replace(/\s+\S*$/, "");
    title = `${nameTitle} | ${trimmedLoc}`;
  }

  const hasValidPrice = project.startingPrice && project.startingPrice !== "Coming Soon" && project.startingPrice !== "Contact for Price" && project.startingPrice !== "Contact for Latest Price";

  let description: string;
  if (project.seoDescription?.trim()) {
    description = project.seoDescription.trim();
  } else if (isUpcoming) {
    description = `Upcoming ${project.projectType.toLowerCase()} in ${project.location}. ${project.approval}. Register for launch updates and pre-launch benefits from Arjun Realty.`;
  } else if (isPreLaunch) {
    const pricePart = hasValidPrice ? ` Plots from ${project.startingPrice}.` : "";
    description = `${project.name} — pre-launch ${project.projectType.toLowerCase()} in ${project.location}. ${project.approval}.${pricePart} Register for early access.`;
  } else if (project.description) {
    description = project.description.length > 160 ? project.description.slice(0, 157).replace(/\s+\S*$/, "") + "..." : project.description;
  } else {
    const pricePart = hasValidPrice ? ` Plots from ${project.startingPrice}.` : "";
    description = `${project.name} is a ${project.projectType.toLowerCase()} in ${project.location}. ${project.approval}.${pricePart} Enquire now with Arjun Realty.`;
  }
  if (description.length > 160) description = description.slice(0, 157) + "...";

  const rawImage = project.image || "/og-image.png";
  const ogImage = rawImage.endsWith(".svg") ? "/og-image.png" : rawImage;
  const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${siteConfig.url}${ogImage}`;

  return {
    title: { absolute: title },
    description,
    keywords: buildProjectKeywords(project),
    alternates: {
      canonical: slug === "shankarpally-45-acres"
        ? `${siteConfig.url}/shankarpally-45-acres`
        : `${siteConfig.url}/projects/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: slug === "shankarpally-45-acres"
        ? `${siteConfig.url}/shankarpally-45-acres`
        : `${siteConfig.url}/projects/${slug}`,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${project.name} — ${project.projectType} | Arjun Realty`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const project = await getMergedProject(slug);
  if (!project) notFound();

  const relatedProjects = getRelatedProjects(slug, 3);

  const relatedInsights: Insight[] = (project.relatedInsightSlugs ?? [])
    .map((s) => getInsightBySlug(s))
    .filter((i): i is Insight => Boolean(i));

  const usableImages = Array.isArray(project.images)
    ? project.images.filter((img) => isUsableMediaUrl(img))
    : [];
  project.images = usableImages.length ? usableImages : [];
  if (!isUsableMediaUrl(project.image)) {
    project.image = usableImages[0] || "";
  }

  if (Array.isArray(project.phases)) {
    project.phases = project.phases
      .map((phase) => {
        const p = { ...phase };
        p.photos = (p.photos || []).filter((url) => isUsableMediaUrl(url));
        p.videos = (p.videos || []).filter((url) => isUsableMediaUrl(url));
        if (p.masterPlanUrl && !isUsableMediaUrl(p.masterPlanUrl)) p.masterPlanUrl = undefined;
        if (p.layoutUrl && !isUsableMediaUrl(p.layoutUrl)) p.layoutUrl = undefined;
        if (p.layoutPdfUrl && !isUsableMediaUrl(p.layoutPdfUrl)) p.layoutPdfUrl = undefined;
        if (p.brochureUrl && !isUsableMediaUrl(p.brochureUrl)) p.brochureUrl = undefined;
        p.documents = (p.documents || []).filter((d) => d && d.url && isUsableMediaUrl(d.url));
        return p;
      })
      .filter((p) => Boolean(p.name));
  }

  if (Array.isArray(project.documents)) {
    project.documents = project.documents.filter((d) => d && d.url && isUsableMediaUrl(d.url));
  }

  for (const key of ["heroVideo", "videoUrl", "droneVideoUrl", "brochureUrl", "masterPlanUrl", "layoutPdfUrl", "layoutUrl", "locationMapUrl", "locationUrl"] as const) {
    const val = project[key];
    if (val && !isUsableMediaUrl(val)) {
      (project as unknown as Record<string, unknown>)[key] = undefined;
    }
  }

  if (Array.isArray(project.videos)) {
    project.videos = project.videos.filter((v) => isUsableMediaUrl(v));
  }

  if (Array.isArray(project.galleryImages)) {
    project.galleryImages = project.galleryImages.filter((url) => isUsableMediaUrl(url));
  }

  if (Array.isArray(project.gallery)) {
    project.gallery = project.gallery.filter((g) => g && g.src && isUsableMediaUrl(g.src));
  }

  let testimonials: { name: string; role?: string; location?: string; text: string; rating?: number; image?: string }[] = [];
  try {
    await connectDB();
    const raw = await TestimonialModel.find({ project: slug, name: { $not: { $regex: "^AI DRAFT" } } }).sort({ sortOrder: 1, createdAt: -1 }).lean();
    testimonials = raw.map((t) => ({
      name: String(t.name || ""),
      role: t.role ? String(t.role) : undefined,
      location: t.location ? String(t.location) : undefined,
      text: String(t.text || ""),
      rating: typeof t.rating === "number" ? t.rating : undefined,
      image: t.image ? String(t.image) : undefined,
    }));
  } catch {
    // DB unavailable — no testimonials
  }

  if (Array.isArray(project.developmentUpdates)) {
    project.developmentUpdates = project.developmentUpdates
      .map((u) => ({ ...u, images: (u.images || []).filter((img) => isUsableMediaUrl(img)) }))
      .filter((u) => Boolean(u && u.title));
  }

  const rawImg = project.image || "/og-image.png";
  const ogImage = rawImg.endsWith(".svg") ? "/og-image.png" : rawImg;
  const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${siteConfig.url}${ogImage}`;

  const productUrl = slug === "shankarpally-45-acres"
    ? `${siteConfig.url}/shankarpally-45-acres`
    : `${siteConfig.url}/projects/${slug}`;

  const projectSchema = {
    "@context": "https://schema.org",
    "@id": `${productUrl}#product`,
    "@type": "Product",
    name: project.name,
    description: project.description || `${project.name} is a ${project.projectType} located at ${project.location}. ${project.approval}. Plot sizes: ${project.plotSizes}.`,
    url: productUrl,
    image: ogImageUrl,
    brand: {
      "@type": "Organization",
      name: siteConfig.name,
      "@id": `${siteConfig.url}/#organization`,
    },
    category: project.projectType,
    additionalProperty: [
      { "@type": "PropertyValue", name: "Location", value: project.location },
      { "@type": "PropertyValue", name: "Approval", value: project.approval },
      { "@type": "PropertyValue", name: "Plot Sizes", value: project.plotSizes },
      ...(project.totalAcres ? [{ "@type": "PropertyValue", name: "Total Area", value: `${project.totalAcres} Acres` }] : []),
    ].filter((p) => p.value),
    ...(project.startingPrice && project.startingPrice !== "Coming Soon" && project.startingPrice !== "Contact for Price" && project.startingPrice !== "Contact for Latest Price" && /[0-9]/.test(project.startingPrice) ? {
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: project.startingPrice.replace(/[^0-9]/g, ""),
        url: productUrl,
        availability: project.isUpcoming ? "https://schema.org/PreOrder" : "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@id": `${siteConfig.url}/#organization` },
      },
    } : {}),
  };

  const faqSchema = Array.isArray(project.faqs) && project.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: project.faqs.map((faq: { q: string; a: string }) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${siteConfig.url}/projects` },
      { "@type": "ListItem", position: 3, name: project.name, item: `${siteConfig.url}${getProjectHref(slug)}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <PremiumProjectDetailPage project={project} relatedProjects={relatedProjects} relatedInsights={relatedInsights} testimonials={testimonials} />
    </>
  );
}
