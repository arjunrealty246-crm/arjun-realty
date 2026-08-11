export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogType?: string;
}

const baseKeywords = [
  "Arjun Realty",
  "Hyderabad real estate",
  "HMDA approved plots Hyderabad",
  "DTCP approved layouts",
  "real estate advisory Hyderabad",
  "K. Nagarjuna",
  "invest in Hyderabad",
  "residential plots Hyderabad",
  "property advisory Hyderabad",
  "real estate investment Hyderabad",
];

export const seo: Record<string, SEOData> = {
  home: {
    title: "Arjun Realty Premium Advisory – HMDA & DTCP Approved Plots Hyderabad",
    description: "Arjun Realty Premium Advisory is an independent real estate advisory helping investors find verified HMDA, DTCP and RERA approved properties across Hyderabad. Expert guidance, transparent advice, end-to-end support.",
    keywords: [...baseKeywords, "Arjun Realty Premium Advisory"],
  },
  about: {
    title: "About Arjun Realty Premium Advisory – Independent Real Estate Advisory Hyderabad",
    description: "Arjun Realty Premium Advisory is an independent real estate advisory company helping investors find verified HMDA, DTCP and RERA approved properties across Hyderabad. Founded by K. Nagarjuna.",
    keywords: [...baseKeywords, "about Arjun Realty", "independent real estate advisory Hyderabad"],
  },
  projects: {
    title: "HMDA & DTCP Approved Projects – Arjun Realty Premium Advisory",
    description: "Explore verified HMDA, DTCP and RERA approved residential plots and gated community projects across Hyderabad's highest-growth corridors. Transparent project comparison and expert guidance.",
    keywords: [...baseKeywords, "HMDA approved projects Hyderabad", "DTCP approved plots Hyderabad"],
  },
  builders: {
    title: "Our Trusted Builders – Arjun Realty Premium Advisory",
    description: "Meet our panel of verified, reputed builders including JB Infra, Bhuvan Infra, Future Crown Realty and Synergy Estates. Every project is legally vetted and compliance-approved.",
    keywords: [...baseKeywords, "verified builders Hyderabad", "JB Infra", "Bhuvan Infra", "Future Crown Realty", "Synergy Estates"],
  },
  "nri-investment": {
    title: "NRI Real Estate Investment Hyderabad – Arjun Realty Premium Advisory",
    description: "Seamless NRI property investment in Hyderabad. Virtual tours, remote documentation, RBI-compliant payments. Complete remote investment support for NRIs worldwide.",
    keywords: [...baseKeywords, "NRI real estate investment Hyderabad", "NRI property advisory Hyderabad", "invest in Hyderabad from abroad"],
  },
  "why-hyderabad": {
    title: "Why Invest in Hyderabad? – Arjun Realty Premium Advisory",
    description: "Discover why Hyderabad offers one of India's best real estate investment opportunities. Thriving IT hub, infrastructure growth, and consistent property appreciation across prime corridors.",
    keywords: [...baseKeywords, "why invest in Hyderabad", "Hyderabad real estate investment", "Hyderabad growth corridors"],
  },
  contact: {
    title: "Contact Arjun Realty Premium Advisory – Free Real Estate Consultation",
    description: "Get in touch with Arjun Realty Premium Advisory for a free consultation. Located near ORR Exit No. 11, Pedda Amberpet, Hyderabad. Call, WhatsApp or email us today.",
    keywords: [...baseKeywords, "contact Arjun Realty", "real estate advisor Hyderabad", "free real estate consultation"],
  },
  testimonials: {
    title: "Client Testimonials – Arjun Realty Premium Advisory",
    description: "Hear from 1000+ happy families who invested in verified HMDA, DTCP and RERA approved Hyderabad real estate through Arjun Realty Premium Advisory.",
    keywords: [...baseKeywords, "Arjun Realty reviews", "client testimonials Hyderabad"],
  },
  portfolio: {
    title: "Project Portfolio – Arjun Realty Premium Advisory",
    description: "Explore our curated portfolio of verified HMDA, DTCP and RERA approved real estate projects across Hyderabad's best locations.",
    keywords: [...baseKeywords, "project portfolio Hyderabad"],
  },
  "schedule-site-visit": {
    title: "Schedule a Site Visit – Arjun Realty Premium Advisory",
    description: "Schedule a free site visit to explore verified HMDA, DTCP and RERA approved plots and properties in Hyderabad. Call or WhatsApp us to book your visit.",
    keywords: [...baseKeywords, "schedule site visit Hyderabad", "property site visit Hyderabad"],
  },
  "projects/compare": {
    title: "Compare Projects – Arjun Realty Premium Advisory",
    description: "Compare HMDA, DTCP and RERA approved projects side by side. Make informed real estate investment decisions with expert guidance from Arjun Realty.",
    keywords: [...baseKeywords, "compare projects Hyderabad", "project comparison Hyderabad"],
  },
  privacy: {
    title: "Privacy Policy – Arjun Realty Premium Advisory",
    description: "Privacy policy for Arjun Realty Premium Advisory. Learn how we collect, use and protect your personal information.",
    keywords: [...baseKeywords, "privacy policy"],
  },
  terms: {
    title: "Terms of Service – Arjun Realty Premium Advisory",
    description: "Terms of service for Arjun Realty Premium Advisory. Understand the terms and conditions governing our real estate advisory services.",
    keywords: [...baseKeywords, "terms of service"],
  },
};
