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
  
  
  
];

export function getBuilderBySlug(slug: string): Builder | undefined {
  return builders.find((b) => b.slug === slug);
}

export function getBuilderById(id: string): Builder | undefined {
  return builders.find((b) => b.id === id);
}

