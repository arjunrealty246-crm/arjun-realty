import type { Metadata } from "next";
import { notFound } from "next/navigation";
import siteConfig from "@/config/site";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Shankarpally45AcresPage from "@/components/showcase/Shankarpally45AcresPage";
import { getMergedProject } from "@/lib/merged-project";
import type { Project } from "@/data/projects";

// This page mirrors the same project shown at /projects/shankarpally-45-acres.
// It is rendered dynamically and reads the Admin-edited project from MongoDB so
// that the gallery, hero video, master layout, location map and documents always
// reflect the latest saved Admin media/document URLs — never stale or missing.
export const dynamic = "force-dynamic";

const PROJECT_NAME = "Shankarpally 45 Acres Premium Layout";
const PROJECT_URL = `${siteConfig.url}/shankarpally-45-acres`;
const PROJECT_LOCATION = "Near Julkal Village, Shankarpally, West Hyderabad";

export const metadata: Metadata = {
  title: {
    absolute: "HMDA & RERA Approved 45-Acre Plotted Layout in Shankarpally | Arjun Realty",
  },
  description:
    "Explore Shankarpally 45 Acres — a 100% HMDA approved & RERA registered premium villa plotted development near Julkal Village on West Hyderabad's Premier Growth Corridor (The Golden Triangle). 25,000 SFT clubhouse, clear title with spot registration, 200–500+ sq. yd. plots. Book a free site visit.",
  keywords: [
    "HMDA approved plots Shankarpally",
    "RERA registered plots Hyderabad",
    "Shankarpally 45 acres",
    "villa plots Shankarpally",
    "plotted development West Hyderabad",
    "Shankarpally Kandi corridor",
    "plots near Julkal village",
    "Gachibowli Neopolis connectivity plots",
    "Hyderabad Golden Triangle plots",
  ],
  alternates: {
    canonical: PROJECT_URL,
  },
  openGraph: {
    title: "HMDA & RERA Approved 45-Acre Plotted Layout in Shankarpally | Arjun Realty",
    description:
      "100% HMDA approved & RERA registered premium villa plotted development on West Hyderabad's Premier Growth Corridor. 25,000 SFT clubhouse, clear title with spot registration, 200–500+ sq. yd. plots.",
    url: PROJECT_URL,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Shankarpally 45 Acres — HMDA & RERA Approved — Arjun Realty",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HMDA & RERA Approved 45-Acre Plotted Layout in Shankarpally | Arjun Realty",
    description:
      "100% HMDA approved & RERA registered premium villa plotted development on West Hyderabad's Premier Growth Corridor.",
    images: [`${siteConfig.url}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: PROJECT_NAME,
  description:
    "A 100% HMDA approved and RERA registered 45-acre premium villa plotted development near Julkal Village, Shankarpally, West Hyderabad — on the Golden Triangle of West Hyderabad (Kokapet/Neopolis – Shankarpally – IIT Hyderabad/Kandi). Plots from 200 to 500+ sq. yd. with a 25,000 sq. ft. luxury clubhouse at zero extra charges, clear title with spot registration, underground electricity cabling, dedicated water pipeline and bank loan facility from leading banks.",
  url: PROJECT_URL,
  brand: { "@type": "Brand", name: "Arjun Realty" },
  image: `${siteConfig.url}/og-image.png`,
  areaServed: { "@type": "Place", name: PROJECT_LOCATION },
  additionalProperty: [
    { "@type": "PropertyValue", name: "Total Extent", value: "45 Acres" },
    { "@type": "PropertyValue", name: "Approval Status", value: "100% HMDA Approved & RERA Registered" },
    { "@type": "PropertyValue", name: "Clubhouse", value: "25,000 Sq. Ft. Luxury Clubhouse (Zero Extra Charges)" },
    { "@type": "PropertyValue", name: "Title", value: "100% Clear Title with Spot Registration" },
    { "@type": "PropertyValue", name: "Plot Sizes", value: "200, 267, 350 & 500+ Sq. Yds." },
    { "@type": "PropertyValue", name: "Bank Loan Facility", value: "Available from Leading Banks" },
    { "@type": "PropertyValue", name: "Pricing", value: "Verified Pricing on Request" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the project HMDA approved and RERA registered?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The project is 100% HMDA approved and RERA registered, with a clear title and spot registration facility.",
      },
    },
    {
      "@type": "Question",
      name: "What amenities and infrastructure are included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 25,000 sq. ft. grand luxury clubhouse with zero extra charges, 100% underground electricity cabling, underground drainage, a dedicated water pipeline, wide BT roads with kerb stones, paver footpaths, a designer entrance arch and avenue plantation.",
      },
    },
    {
      "@type": "Question",
      name: "What plot sizes are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Premium plots of 200, 267, 350 and 500+ sq. yd. suited for villa development and long-term appreciation.",
      },
    },
    {
      "@type": "Question",
      name: "Why invest in Shankarpally right now?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Shankarpally sits on West Hyderabad's Premier Growth Corridor — the Golden Triangle connecting Kokapet/Neopolis, Shankarpally and IIT Hyderabad/Kandi — with a 20–30 minute drive to Gachibowli, Nanakramguda and the Financial District, plus Kollur SEZ, Tellapur and ORR nearby, where luxury villa ventures command ₹7 Cr to ₹15–20 Cr.",
      },
    },
  ],
};

export default async function Page() {
  const project = await getMergedProject("shankarpally-45-acres");
  if (!project) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <PageBreadcrumbs items={[{ name: "Shankarpally 45 Acres", url: "/shankarpally-45-acres" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Shankarpally45AcresPage project={project as Project} />
    </>
  );
}