export interface Builder {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  website?: string;
  established?: string;
  projectCount: number;
  projectTypes?: string;
  highlights?: string[];
}

export const builders: Builder[] = [
  {
    id: "jb-infra",
    name: "JB Infra",
    slug: "jb-infra",
    description: "A reputed Hyderabad-based real estate developer known for premium gated communities, villa plotting projects, and integrated townships with world-class infrastructure.",
    website: "",
    established: "2015",
    projectCount: 6,
    projectTypes: "Gated Communities, Villa Plots, Open Plots",
    highlights: ["100+ Acres Developed", "HMDA & DTCP Approved", "Premium Gated Communities"],
  },
  {
    id: "bhuvan-infra",
    name: "Bhuvan Infra",
    slug: "bhuvan-infra",
    description: "An emerging force in Hyderabad real estate, specializing in premium villa plotting projects, strategically located open plot developments along high-growth corridors with FCDA approvals and transparent dealings.",
    website: "",
    established: "2017",
    projectCount: 5,
    projectTypes: "Premium Villa Plots, Boutique Villas, Open Plots, Farm Plots, Residential Layouts",
    highlights: ["Strategic Locations", "FCDA Approved", "Transparent Pricing", "Premium Villa Communities"],
  },
  {
    id: "future-crown",
    name: "Future Crown Realty",
    slug: "future-crown",
    description: "A trusted name in Hyderabad's plotted development segment, Future Crown Realty focuses on affordable luxury plots with comprehensive infrastructure and legal compliance.",
    website: "",
    established: "2018",
    projectCount: 5,
    projectTypes: "Affordable Luxury Plots, Gated Communities",
    highlights: ["Budget-Friendly Options", "RERA Registered", "Infrastructure Ready"],
  },
  {
    id: "synergy-estates",
    name: "Synergy Estates",
    slug: "synergy-estates",
    description: "A premium developer delivering landmark plotted developments with a focus on sustainable infrastructure, modern amenities, and superior location selection across Hyderabad.",
    website: "",
    established: "2016",
    projectCount: 4,
    projectTypes: "Premium Plots, Integrated Townships",
    highlights: ["Sustainable Development", "Modern Infrastructure", "Premium Locations"],
  },
];

export function getBuilderBySlug(slug: string): Builder | undefined {
  return builders.find((b) => b.slug === slug);
}

export function getBuilderById(id: string): Builder | undefined {
  return builders.find((b) => b.id === id);
}
