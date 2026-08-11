export interface Milestone {
  year: string;
  title: string;
  desc: string;
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface Credential {
  text: string;
}

export const founderMilestones: Milestone[] = [
  { year: "2019", title: "Founded Arjun Realty", desc: "Started with a vision to bring transparency and trust to Hyderabad real estate." },
  { year: "2020", title: "First 100 Families", desc: "Reached the milestone of serving 100 happy investors within the first year." },
  { year: "2022", title: "500+ Happy Families", desc: "Expanded across all major Hyderabad corridors including Shamshabad, Kollur, Financial District." },
  { year: "2024", title: "1000+ Investors Served", desc: "Recognized as one of Hyderabad's trusted independent real estate advisories." },
];

export const founderCredentials: Credential[] = [
  { text: "5+ years of dedicated real estate advisory experience in Hyderabad" },
  { text: "Deep expertise in HMDA, DTCP and RERA approved projects" },
  { text: "Personally vetted 50+ projects across Hyderabad's growth corridors" },
  { text: "Trusted by NRI investors across UAE, USA, UK, Singapore and Canada" },
  { text: "Transparent, no-hidden-cost approach in every engagement" },
  { text: "Relationship-first philosophy — every client gets a dedicated advisor" },
];

export const teamMembers: TeamMember[] = [
  { name: "K. Nagarjuna", role: "Founder & Principal Advisor" },
  { name: "Arjun Realty Advisory Team", role: "Investment Advisors" },
  { name: "Arjun Realty Legal Desk", role: "Legal & Compliance" },
];

export const founderStats = [
  { icon: "TrendingUp", value: "1000+", label: "Families Served" },
  { icon: "Users", value: "4+", label: "Partner Builders" },
  { icon: "Award", value: "4.9★", label: "Google Rating" },
];

export const aboutMilestones: Milestone[] = [
  { year: "2019", title: "Founded", desc: "Arjun Realty was established with a vision to bring transparency and trust to Hyderabad real estate." },
  { year: "2020", title: "100 Families Served", desc: "Within the first year, 100 families trusted us with their real estate investments." },
  { year: "2022", title: "500+ Families", desc: "Expanded across all major Hyderabad growth corridors." },
  { year: "2024", title: "1000+ Investors", desc: "Became one of Hyderabad's trusted independent real estate advisories." },
];
