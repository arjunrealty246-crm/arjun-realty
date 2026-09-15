export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogType?: "article" | "website" | "book" | "profile" | "music.song" | "music.album" | "music.playlist" | "music.radio_station" | "video.movie" | "video.episode" | "video.tv_show" | "video.other";
}

const baseKeywords = [
  "Arjun Realty",
  "Hyderabad real estate",
  "HMDA approved plots Hyderabad",
  "DTCP approved layouts",
  "HMDA approved plots",
  "DTCP approved plots Hyderabad",
  "real estate advisory Hyderabad",
  "K. Nagarjuna",
  "invest in Hyderabad",
  "residential plots Hyderabad",
  "NRI real estate investment",
  "property advisory Hyderabad",
  "real estate investment Hyderabad",
];

export const seo: Record<string, SEOData> = {
  home: {
    title: "Arjun Realty | HMDA & DTCP Approved Plots in Hyderabad",
    description:
      "Arjun Realty — Hyderabad's trusted advisor for verified HMDA, DTCP & RERA approved plots, gated communities and NRI investments.",
    keywords: [
      ...baseKeywords,
      "Arjun Realty Premium Advisory",
      "approved plots Hyderabad",
      "open plots Hyderabad",
      "HMDA plots",
      "DTCP plots",
    ],
  },
  about: {
    title: "About Arjun Realty | Hyderabad Real Estate Advisory",
    description:
      "Learn about Arjun Realty, an independent Hyderabad advisory led by K. Nagarjuna, helping investors and NRIs find verified HMDA, DTCP & RERA approved plots.",
    keywords: [...baseKeywords, "about Arjun Realty", "independent real estate advisory Hyderabad", "real estate advisor Hyderabad"],
  },
  projects: {
    title: "HMDA & DTCP Approved Plots in Hyderabad | Arjun Realty",
    description:
      "Explore verified HMDA, DTCP & RERA approved residential plots and gated communities across Hyderabad's top growth corridors with NRI-friendly guidance.",
    keywords: [...baseKeywords, "HMDA approved projects Hyderabad", "DTCP approved plots Hyderabad", "residential plots in Hyderabad", "gated communities Hyderabad"],
  },
  builders: {
    title: "Verified Plot Builders in Hyderabad | Arjun Realty",
    description:
      "Meet the verified builders behind Hyderabad's finest HMDA & DTCP approved plot communities — JB Infra and more. Every project legally vetted by Arjun Realty.",
    keywords: [...baseKeywords, "verified builders Hyderabad", "JB Infra", "Bhuvan Infra", "Future Crown Realty", "Synergy Estates", "plot developers Hyderabad"],
  },
  "nri-investment": {
    title: "NRI Property Investment in Hyderabad | Arjun Realty",
    description:
      "Complete NRI property investment advisory in Hyderabad — HMDA & DTCP approved plots, virtual tours, remote documentation and RBI-compliant payments.",
    keywords: [...baseKeywords, "NRI real estate investment Hyderabad", "NRI property advisory Hyderabad", "invest in Hyderabad from abroad", "NRI plots Hyderabad"],
  },
  "why-hyderabad": {
    title: "Why Invest in Hyderabad Real Estate | Arjun Realty",
    description:
      "Discover why Hyderabad is ideal for real estate investment — IT growth, infrastructure expansion and rising demand for HMDA, DTCP approved plots and villas.",
    keywords: [...baseKeywords, "why invest in Hyderabad", "Hyderabad real estate investment", "Hyderabad growth corridors", "Hyderabad property appreciation"],
    ogType: "article",
  },
  vikarabad: {
    title: "Plots in Vikarabad, West Hyderabad | Arjun Realty",
    description:
      "Vikarabad, West Hyderabad's growth corridor — DTCP & RERA approved 150-acre layouts near the Appa Junction expressway and proposed Hyderabad–Pune–Mumbai High-Speed Rail connectivity.",
    keywords: [
      ...baseKeywords,
      "Vikarabad plots",
      "plots in Vikarabad",
      "Vikarabad real estate",
      "approved plots Vikarabad",
      "West Hyderabad investment corridor",
      "Vikarabad bullet train",
      "JB Pristine City",
    ],
  },
  ibrahimpatnam: {
    title: "Plots in Ibrahimpatnam, Hyderabad | Arjun Realty",
    description:
      "HMDA & RERA approved plots and an upcoming 90-acre villa community in Ibrahimpatnam, South Hyderabad — near Sagar Highway, Adibatla and the airport corridor.",
    keywords: [
      ...baseKeywords,
      "Ibrahimpatnam plots",
      "plots in Ibrahimpatnam",
      "Ibrahimpatnam real estate",
      "residential plots Ibrahimpatnam",
      "Adibatla plots",
      "JB Serene City",
      "South Hyderabad plots",
    ],
  },
  "srisailam-highway-future-city": {
    title: "Srisailam Highway Plots | South Hyderabad | Arjun Realty",
    description:
      "Srisailam Highway plots and villa communities in South Hyderabad's Future City corridor — FCDA & DTCP approved, near the airport. Arjun Realty site visits.",
    keywords: [
      ...baseKeywords,
      "Srisailam Highway plots",
      "plots on Srisailam Highway",
      "Future City Hyderabad plots",
      "Srisailam Highway real estate",
      "FCDA approved plots",
      "JB Harmony Woods",
      "Future City growth corridor",
    ],
  },
  orr: {
    title: "Plots Near Hyderabad ORR (Outer Ring Road) | Arjun Realty",
    description:
      "Verified approved plots and villa communities near Hyderabad's Outer Ring Road (ORR) — connecting ORR Exit 13, 14 and 18 growth corridors across the city.",
    keywords: [
      ...baseKeywords,
      "Hyderabad ORR plots",
      "plots near Hyderabad ORR",
      "Outer Ring Road plots Hyderabad",
      "Hyderabad ORR real estate",
      "ORR ring plots Hyderabad",
      "ORR gated communities",
    ],
  },
  contact: {
    title: "Contact Arjun Realty | Hyderabad Plot Experts",
    description:
      "Contact Arjun Realty for free Hyderabad real estate advice — verified HMDA, DTCP & RERA approved plots and NRI support near ORR Exit 11. Call or WhatsApp.",
    keywords: [...baseKeywords, "contact Arjun Realty", "real estate advisor Hyderabad", "free real estate consultation", "HMDA plots near me"],
  },
  testimonials: {
    title: "Client Testimonials | Arjun Realty Hyderabad",
    description:
      "Read what investors and NRIs say about Arjun Realty — verified HMDA, DTCP & RERA approved plot purchases across Hyderabad's fastest-growing corridors.",
    keywords: [...baseKeywords, "Arjun Realty reviews", "client testimonials Hyderabad", "HMDA plots review Hyderabad"],
  },
  "schedule-site-visit": {
    title: "Schedule a Site Visit | Arjun Realty Hyderabad",
    description:
      "Book a free site visit to explore verified HMDA, DTCP & RERA approved plots in Hyderabad. WhatsApp or call Arjun Realty to schedule your visit today.",
    keywords: [...baseKeywords, "schedule site visit Hyderabad", "property site visit Hyderabad", "plots site visit Hyderabad"],
  },
  services: {
    title: "Real Estate Advisory Services in Hyderabad | Arjun Realty",
    description:
      "Arjun Realty's Hyderabad advisory — property consulting, legal verification, HMDA & DTCP approved plot guidance, investment analysis and NRI support.",
    keywords: [...baseKeywords, "real estate advisory services Hyderabad", "property consulting Hyderabad", "legal verification plots Hyderabad", "NRI real estate services"],
  },
  "plot-buyer-guide": {
    title: "Ultimate Plot Buyer Guide: HMDA, DTCP, FCDA & RERA",
    description:
      "Verified plot-buying checklist for Hyderabad: legal title clearance, 30-year encumbrance (EC), Dharani checks and HMDA, DTCP, FCDA & RERA approvals explained.",
    keywords: [
      ...baseKeywords,
      "how to verify a plot before buying",
      "plot buyer checklist Hyderabad",
      "land title verification Hyderabad",
      "encumbrance certificate 30 years",
      "Dharani survey number check",
      "HMDA vs DTCP vs FCDA approval",
      "RERA registered layouts Hyderabad",
    ],
  },
  insights: {
    title: "Hyderabad Real Estate Market Insights | Arjun Realty",
    description:
      "Market intelligence, growth-corridor analysis and land-buying guides from Arjun Realty — Hyderabad plot prices, corporate investments and due diligence.",
    keywords: [
      ...baseKeywords,
      "Hyderabad real estate market update",
      "Hyderabad plot investment tips",
      "Hyderabad growth corridors",
      "Vikarabad investment",
      "Future City Hyderabad",
      "land due diligence Hyderabad",
      "corporate investments Hyderabad real estate",
    ],
  },
  privacy: {
    title: "Privacy Policy | Arjun Realty",
    description:
      "Privacy policy for Arjun Realty — how we collect, use and protect your personal information when you use our Hyderabad real estate advisory services.",
    keywords: [...baseKeywords, "privacy policy"],
  },
  terms: {
    title: "Terms of Service | Arjun Realty",
    description:
      "Terms of service for Arjun Realty's Hyderabad real estate advisory, covering duty of care, disclaimers, liability and NRI investment support.",
    keywords: [...baseKeywords, "terms of service"],
  },
};