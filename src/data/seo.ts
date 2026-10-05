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
  "residential plots in Hyderabad",
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
      "open plots in Hyderabad",
      "HMDA plots in Hyderabad",
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
      "Browse HMDA and DTCP approved plots for sale in Hyderabad — verified RERA approved villa plots in Vikarabad, Choutuppal, Ibrahimpatnam and Srisailam Highway.",
    keywords: [...baseKeywords, "HMDA approved projects Hyderabad", "DTCP approved plots Hyderabad", "DTCP approved plots for sale in Hyderabad", "DTCP & RERA approved open plots", "open plots in Hyderabad", "plots for sale in Hyderabad", "residential plots in Hyderabad", "gated communities Hyderabad"],
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
      "NRI property investment in Hyderabad: HMDA & DTCP approved plots, virtual tours, property documentation guidance and remote investment support. Get a free consultation.",
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
      "Vikarabad, West Hyderabad's growth corridor — DTCP & RERA approved 150-acre layouts near the Appa Junction expressway and Hyderabad–Pune–Mumbai High-Speed Rail.",
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
    title: "Plot Buyer Checklist Telangana: HMDA, DTCP, FCDA & RERA",
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
    "future-city-2026-what-has-actually-changed": {
      title: "Future City Hyderabad 2026: What's Changed | Arjun Realty",
      description:
        "Beyond the hype: Discover verified ground updates in Hyderabad Future City for 2026, including FCDA progress, Radial Road-1, and AWS data center footprints.",
      ogType: "article",
      keywords: [
        ...baseKeywords,
        "Future City Hyderabad 2026",
        "Future City real estate updates",
        "FCDA developments",
        "Radial Road 1 Future City",
        "Open plots near Future City Hyderabad",
      ],
    },
    "srisailam-highway-2026-stretch-by-stretch-growth-guide": {
      title: "Srisailam Highway 2026: Plot Buying Guide | Arjun Realty",
      description:
        "Detailed 2026 corridor analysis of Srisailam Highway: Tukkuguda, Maheshwaram, Kandukur, Kadthal. Compare plot prices, RRR impact and investment feasibility.",
      ogType: "article",
      keywords: [
        ...baseKeywords,
        "Open plots in Srisailam Highway",
        "Srisailam Highway plots",
        "Plots for sale in Srisailam Highway",
        "Tukkuguda plots",
        "Future City plots",
        "Srisailam Highway investment",
      ],
    },
    "shankarpally-plot-investment-2026-buyers-guide": {
      title: "Shankarpally Plot Investment 2026 Checklist | Arjun Realty",
      description:
        "Evaluating plots in Shankarpally? Review key checks for 2026: HMDA vs DTCP approvals, title clearance, main road vs interior layouts, and resale liquidity.",
      ogType: "article",
      keywords: [
        ...baseKeywords,
        "Shankarpally plot investment",
        "plots in Shankarpally",
        "Shankarpally HMDA plots",
        "buy land in Shankarpally",
        "Shankarpally real estate 2026",
      ],
    },
    "hyderabad-south-vs-west-future-city-srisailam-shankarpally-comparison": {
      title: "Hyderabad South vs West 2026 Comparison | Arjun Realty",
      description:
        "Comparing Hyderabad South vs West for plot investment in 2026: Future City, Srisailam Highway, Shankarpally & Vikarabad on pricing, growth, and timeline.",
      ogType: "article",
      keywords: [
        ...baseKeywords,
        "Hyderabad South vs West real estate",
        "Future City vs Shankarpally plots",
        "Srisailam Highway investment 2026",
        "Vikarabad open plots",
        "Hyderabad land investment guide",
      ],
    },
    "nh-65-choutuppal-6-lane-expansion-real-estate-guide": {
      title: "NH-65 Choutuppal 6-Lane: Plot Guide | Arjun Realty",
      description:
        "Analyze NH-65 Vijayawada Highway 6-lane tender updates, Choutuppal RRR junction impact, dry port logistics, and DTCP plot price trends at JB Nature Valley.",
      ogType: "article",
      keywords: [
        ...baseKeywords,
        "Choutuppal plots for sale",
        "NH 65 6 lane expansion",
        "JB Nature Valley Choutuppal",
        "Vijayawada highway plots",
        "Choutuppal RRR real estate",
        "open plots in Choutuppal",
      ],
    },
    "vikarabad-industrial-parks-nh163-expansion-jb-pristine-city-guide": {
      title: "Vikarabad Plots 2026 & JB Pristine City | Arjun Realty",
      description:
        "Explore the 2026 transformation of Vikarabad: 4 new industrial parks (Lagacherla 1200 acres, Parigi, Doma), NH-163 4-laning, and DTCP plots at JB Pristine City.",
      ogType: "article",
      keywords: [
        ...baseKeywords,
        "Vikarabad plots for sale",
        "JB Pristine City Vikarabad",
        "plots in Vikarabad DTCP",
        "Vikarabad industrial parks",
        "Hyderabad Bijapur highway plots",
        "Vikarabad real estate 2026",
      ],
    },
    "hyderabad-gcc-boom-shankarpally-connectivity-investment-guide": {
      title: "Shankarpally Plots & Hyderabad GCC Boom | Arjun Realty",
      description:
        "Discover how Neopolis GCC growth, Kollur Radial Road and defense employment anchors drive residential plot appreciation across Shankarpally.",
      ogType: "article",
      keywords: [
        ...baseKeywords,
        "Shankarpally plots for sale",
        "Hyderabad GCC real estate impact",
        "Kollur to Shankarpally distance",
        "Neopolis to Shankarpally",
        "open plots in Shankarpally HMDA",
        "Shankarpally vs Mokila investment",
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