export type InsightCategorySlug = "market-updates" | "corporate-growth" | "buyer-guides";

export interface InsightCategory {
  slug: InsightCategorySlug;
  label: string;
  description: string;
}

export interface InsightAuthor {
  name: string;
  role: string;
}

export interface InsightSection {
  heading?: string;
  body: string[];
}

export interface Insight {
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  category: string;
  categorySlug: InsightCategorySlug;
  publishedAt: string;
  author: InsightAuthor;
  featuredProjectSlugs?: string[];
  sections: InsightSection[];
}

export const insightCategories: InsightCategory[] = [
  {
    slug: "market-updates",
    label: "Market Updates",
    description: "Prices, corridors and demand trends shaping Hyderabad's plot and land market.",
  },
  {
    slug: "corporate-growth",
    label: "Corporate Investments & Growth",
    description: "How corporate campuses, industrial parks and mega-projects move land values.",
  },
  {
    slug: "buyer-guides",
    label: "Buyer Guides",
    description: "Step-by-step guidance on approvals, documents and due diligence for land buyers.",
  },
];

const researchDesk: InsightAuthor = {
  name: "Arjun Realty Research Desk",
  role: "Market Research & Advisory",
};

const nagarjuna: InsightAuthor = {
  name: "K. Nagarjuna",
  role: "Founder & Principal Advisor",
};

export const insights: Insight[] = [
  {
    slug: "hyderabad-real-estate-market-update-q3-2026",
    title: "Hyderabad Real Estate Market Update: Q3 2026",
    excerpt: "Demand for open plots has shifted decisively toward the ORR rings — Shankarpally, Kokapet and Vikarabad are leading the West's price action while the core consolidates.",
    category: "Market Updates",
    categorySlug: "market-updates",
    publishedAt: "2026-08-22",
    author: researchDesk,
    featuredProjectSlugs: ["jb-pristine-city", "jb-harmony-woods"],
    sections: [
      {
        heading: "Where demand is moving",
        body: [
          "Hyderabad's residential plot market continues to favor the western and south-western growth rings. The [Outer Ring Road (ORR)](/orr) has matured into a defended address of its own: buyers who once looked only at Gachibowli and HITEC City are now comparing Kannur, Kollur, Mokila and Shankarpally against the Inner Ring, because the ORR has equalized commute times to the IT and financial districts.",
          "What changed in Q3 is speed. Transaction velocity in corridors like [Vikarabad](/insights/why-vikarabad-is-west-hyderabads-next-hotspot) and the Srisailam Highway belt has outpaced the more established ORR nodes, as early-stage pricing on approved layouts still sits well below the prices commanded by fully-developed Inner Ring communities.",
        ],
      },
      {
        heading: "Price action by corridor",
        body: [
          "The Inner Ring remains the highest-value, lowest-yield space — predictable appreciation, premium per-square-yard pricing and limited inventory. The ORR ring offers the balance most investors want: institutional-grade connectivity, satellite-town amenities and better entry points.",
          "West Hyderabad's Vikarabad corridor is the outlier this quarter. Priced at a fraction of Gachibowli and Kokapet, it is absorbing buyers on the strength of two factors: the proposed high-speed rail corridor and the continued industrialization of the belt toward the Future City / AI City zone.",
        ],
      },
      {
        heading: "What this means for investors",
        body: [
          "For long-term holders, the pragmatic play is a diversified corridor posture — a mix of an ORR-node layout with quick liquidity and a West-corridor layout that captures the airport, industrial and bullet-train upside at entry pricing.",
          "As always, price is the last thing to verify in any corridor. Title, encumbrance and approval status should come first. Corridors that jump fastest also attract the loudest marketing — a clean 30-year EC and a valid HMDA, DTCP, FCDA or RERA approval remain non-negotiable.",
        ],
      },
    ],
  },
  {
    slug: "why-vikarabad-is-west-hyderabads-next-hotspot",
    title: "Why Vikarabad Is Becoming West Hyderabad's Next Investment Hotspot",
    seoTitle: "Why Vikarabad Is West Hyderabad's Next Hotspot",
    excerpt: "Proposed Hyderabad–Pune–Mumbai high-speed rail connectivity, the Appa Junction expressway and land prices far below Gachibowli are pulling smart money toward Vikarabad.",
    category: "Market Updates",
    categorySlug: "market-updates",
    publishedAt: "2026-08-15",
    author: researchDesk,
    featuredProjectSlugs: ["jb-pristine-city"],
    sections: [
      {
        heading: "The three triggers",
        body: [
          "Every growth corridor follows the same script: connectivity arrives first, employment follows, and land values catch up last. Vikarabad is running that script on fast-forward.",
          "First, the four-lane expressway connecting ORR Exit No. 18 (Appa Junction) has collapsed the perceived distance between Vikarabad and the Financial District. Second, the Central and State Governments have proposed a Hyderabad–Pune–Mumbai high-speed rail / bullet-train corridor relevant to the wider Vikarabad region — scope and station details remain subject to official announcements. Third, the West-belt industrial expansion — including plants coming up along the [Srisailam axis](/srisailam-highway-future-city) — is drawing construction-linked employment to the district.",
        ],
      },
      {
        heading: "The price gap",
        body: [
          "Approved layouts in [Vikarabad](/vikarabad) currently transact at a fraction of the per-square-yard prices in Kokapet, Neopolis and Mokila, yet a buyer travels the same highways to reach the same job nodes. That gap is exactly what early investors in Shankarpally and Tellapur exploited a decade ago.",
          "What matters is that the pricing gap is not a quality gap. Ventured, 150-acre DTCP layouts with clear titles, bank loan facility and underground utilities are available in Vikarabad — the infrastructure standard is comparable, the entry price is dramatically lower.",
        ],
      },
      {
        heading: "How to position yourself",
        body: [
          "Vikarabad suits investors whose time horizon is 5-10 years and who want to pre-position ahead of the bullet-train working population. End-users should weigh commute reality today rather than the promotional renders of tomorrow.",
          "Whichever profile you fit, verify the approval authority for the specific layout you choose — DTCP and RERA signals are the safest gateways — and confirm the Dharani record sits clean before committing capital.",
        ],
      },
    ],
  },
  {
    slug: "future-city-growth-corridor-whats-driving-land-values",
    title: "The Future City Growth Corridor: What's Driving Land Values",
    seoTitle: "Future City Corridor: What's Driving Land Values",
    excerpt: "FCDA approval, airport proximity and the Foxconn-led electronics belt are converging on the Srisailam Highway — and land prices are responding.",
    category: "Market Updates",
    categorySlug: "market-updates",
    publishedAt: "2026-08-08",
    author: nagarjuna,
    featuredProjectSlugs: ["jb-harmony-woods"],
    sections: [
      {
        heading: "A corridor built on certainty",
        body: [
          "The Future City growth corridor along the [Srisailam Highway](/srisailam-highway-future-city) has moved from proposal to pipeline. FCDA (Future City Development Authority) is now approving layouts with a defined infrastructure expectations framework, and residential communities are coming up within minutes of the Rajiv Gandhi International Airport.",
          "Airport adjacency is the single most dependable land-multiplier in Indian real estate. Add a government-anchored industrial ecosystem and you have the classic recipe for sustained appreciation.",
        ],
      },
      {
        heading: "The employer engine",
        body: [
          "The electronics and mobility cluster forming between the airport and the Srisailam axis — anchored by global manufacturers setting up large campuses — is bringing tens of thousands of jobs. Engineers, technicians and suppliers need housing within a commutable radius, and the corridor's approved layouts are squarely in that radius.",
          "Projects with strong internal infrastructure (100% underground utilities, wide roads, dedicated MEP ducts) are outperforming their neighbors because they can absorb a skilled working population without the teething problems of unserviced layouts.",
        ],
      },
      {
        heading: "Signals for buyers",
        body: [
          "Track three indicators before buying in the corridor: the pace of actual construction starts, the number of FCDA approvals being issued, and the extent of underground infrastructure already deployed in the layout you are evaluating.",
          "The corridor's early movers — FCDA-approved, amenity-complete communities like [JB Harmony Woods near Thummaloor](/projects/jb-harmony-woods) — demonstrate what the post-development baseline looks like. Buying ahead of full build-out, on verified approvals, remains the highest-risk-adjusted entry.",
        ],
      },
    ],
  },
  {
    slug: "foxconn-ai-city-and-the-srisailam-belt",
    title: "Foxconn, AI City & the Srisailam Belt: How Corporate Investment Reshapes Hyderabad's South-West",
    seoTitle: "Foxconn, AI City & the Srisailam Belt",
    excerpt: "Multi-billion-dollar campuses along the Srisailam axis are converting farmland into commuter towns — and plot prices are moving with the shovels.",
    category: "Corporate Investments & Growth",
    categorySlug: "corporate-growth",
    publishedAt: "2026-08-19",
    author: researchDesk,
    featuredProjectSlugs: ["jb-harmony-woods"],
    sections: [
      {
        heading: "Follow the shovels, not the announcements",
        body: [
          "Corporate investment moves land markets with a lag — first the land assembly, then the plant, then the housing, then the plot appreciation. The Srisailam Highway belt is now in the third phase.",
          "Large-scale electronics manufacturing campuses in the Airport-Future City arc have crossed the announcement stage into commissioning. Beyond their direct employment, they trigger a multiplier: logistics, component suppliers, hospitality and housing follow the anchor factory within months, not years.",
        ],
      },
      {
        heading: "The AI City variable",
        body: [
          "AI City adds a second, gentler force on the same corridor. Data centers, R&D labs and chip-design offices draw a white-collar workforce that prefers planned communities over ad-hoc neighborhoods. That preference is precisely what FCDA-approved, clubhouse-led plotted developments are built to serve.",
          "When digital-economy campuses and heavy manufacturing share a corridor, the housing demand is double-decked: blue-collar rentals and white-collar ownership. Both layers convert into plot demand.",
        ],
      },
      {
        heading: "What serious investors should do",
        body: [
          "Prefer communities whose capacity matches the incoming workforce — gated projects with underground utilities, wide roads and security can absorb growth that unserviced pockets cannot.",
          "Keep liquidity in mind: corporate-anchored corridors eventually attract institutions and secondary resale volume, but the horizon here is medium-to-long term. Buy the corridor's verified front-runners, not its remotest promises.",
        ],
      },
    ],
  },
  {
    slug: "kokapet-neopolis-the-corporate-hub-effect",
    title: "Kokapet to Neopolis: The Corporate Hub Effect on Residential Plots",
    seoTitle: "Kokapet to Neopolis: The Corporate Hub Effect",
    excerpt: "Financial-district campuses have already turned Kokapet and Neopolis into premium addresses — the same mechanism is now radiating west along the ORR.",
    category: "Corporate Investments & Growth",
    categorySlug: "corporate-growth",
    publishedAt: "2026-08-12",
    author: researchDesk,
    featuredProjectSlugs: ["jb-pristine-city"],
    sections: [
      {
        heading: "The Neopolis playbook",
        body: [
          "Neopolis' quantum leaps followed a repeatable sequence: corporate campuses signed, floor-space index (FSI) and public infrastructure upgraded, and then residential prices compounded for a full decade. Kokapet and Narsingi are living through the same sequence now.",
          "The corporate hub effect is not confined to the immediate ring. It radiates outward along the highway it sits on — and the Western ORR arms, leading toward Gandipet, Mokila and beyond, are the current radiation zones.",
        ],
      },
      {
        heading: "Spillover economics",
        body: [
          "When a bedroom community matures, its commute corridor becomes the next bedroom community. The expressways from Kokapet-Neopolis point west to exactly that: land that is 30-40 percent cheaper today, with the same job node reachable on a road project that is already funded and under construction.",
          "Venture-scale layouts on the corridor — 150-acre master developments with loans and clear titles — are absorbing the spillover demand before adjacent smaller pockets do, because banks and buyers both look for institutional-grade approvals.",
        ],
      },
      {
        heading: "Practical application",
        body: [
          "For investors, the question is simple: can you hold through the construction phase of the connecting infrastructure? If yes, the western corridor's pre-consolidation pricing is the opportunity.",
          "Project selection remains king — a DTCP & RERA approved layout on the corridor, like JB Pristine City in Vikarabad, pairs the hub-driven thesis with the safety of verifiable legal status.",
        ],
      },
    ],
  },
  {
    slug: "corporate-land-assemblies-reading-hyderabads-next-growth-corridors",
    title: "Corporate Land Assemblies: Reading Hyderabad's Next Growth Corridors",
    seoTitle: "Corporate Land Assemblies as Market Signals",
    excerpt: "The best early signal for a plot investor is not a brochure — it's a corporate land purchase. Here's how to read where the next corridors will form.",
    category: "Corporate Investments & Growth",
    categorySlug: "corporate-growth",
    publishedAt: "2026-07-30",
    author: researchDesk,
    featuredProjectSlugs: ["jb-nature-valley", "upcoming-srisailam-highway"],
    sections: [
      {
        heading: "Why land assemblies are leading indicators",
        body: [
          "Corporates do not buy land on marketing hunches. They assemble parcels after feasibility, zoning, water, power and connectivity studies. A large, completed land acquisition is therefore a high-confidence, pre-priced signal that a corridor is about to develop.",
          "The Hyderabad pattern is consistent: every major corridor — from the Financial District to the airport belt — first appears in the market as a quiet land-assembly story, then as infrastructure notices, and finally as residential plot appreciation.",
        ],
      },
      {
        heading: "Where the current assemblies point",
        body: [
          "Three arcs are active today: the Srisailam Highway electronics belt, the western ORR arms, and the industrial zones along NH-65/Shamshabad axis. Assembly activity in each is already documented through registered purchase instruments visible in EC records and Dharani mutation data.",
          "You do not need insider sources to track them. Periodic EC checks around assembly hotspots, and mutation alerts on specific villages, are enough to stay ahead of the crowd.",
        ],
      },
      {
        heading: "Converting signals into decisions",
        body: [
          "Use assemblies as a screen, not a trigger. Filter corridors that have assembly momentum AND approved residential layouts. Within those corridors, select projects with clean titles and institutional approvals — those are the assets institutions themselves eventually buy.",
          "The discipline that separates profitable land investors from casual buyers is the same every cycle: verify legal status first, price second, and treat 'hotspot' talk as a research lead rather than a reason to hurry.",
        ],
      },
    ],
  },
  {
    slug: "dtcp-hmda-fcda-approvals-which-to-choose",
    title: "DTCP, HMDA or FCDA Approval: Which Is Best for Your Plot Investment?",
    seoTitle: "DTCP vs HMDA vs FCDA: Choosing Your Plot Approval",
    excerpt: "Three approval authorities, three different value profiles. A plain-English breakdown of HMDA, DTCP and FCDA layouts — and how to choose between them.",
    category: "Buyer Guides",
    categorySlug: "buyer-guides",
    publishedAt: "2026-08-16",
    author: nagarjuna,
    featuredProjectSlugs: ["jb-pristine-city", "jb-serene-county", "jb-harmony-woods"],
    sections: [
      {
        heading: "Why approval authority matters",
        body: [
          "A layout's approval authority determines three practical things: how readily banks finance plots in it, how smoothly resale and registration go, and how prepared the land is for future construction and regularization.",
          "In Telangana, most residential layouts fall under one of three authorities: DTCP (Directorate of Town & Country Planning), HMDA (Hyderabad Metropolitan Development Authority), or FCDA (Future City Development Authority).",
        ],
      },
      {
        heading: "DTCP layouts",
        body: [
          "DTCP approves layouts across municipal and town-planning areas — the default approval for open-plots in Hyderabad's fast-growing municipal corridors. DTCP approval signals a structured layout drawing, roads and drainage, and it is broadly accepted by banks and registration.",
          "Choose DTCP for mainstream growth-corridor plots with strong liquidity and lower entry prices.",
        ],
      },
      {
        heading: "HMDA layouts",
        body: [
          "HMDA governs layouts within the Hyderabad Metropolitan Region. HMDA-approved projects carry a widely-recognized brand with banks, and they typically sit in better-serviced, higher-appreciation zones — at a correspondingly higher per-square-yard price.",
          "Choose HMDA for ORR-ring and core-ring plots where you prioritize institutional recognition and established infrastructure.",
        ],
      },
      {
        heading: "FCDA layouts",
        body: [
          "FCDA (Future City Development Authority) approves layouts in the [Future City growth corridor](/srisailam-highway-future-city) around the airport and the Srisailam axis. It is the youngest authority but offers early-mover pricing inside a corridor with government-anchored infrastructure commitment.",
          "Choose FCDA for long-horizon positions near the airport, AI City and the manufacturing belt — where appreciation potential outpaces current liquidity.",
        ],
      },
      {
        heading: "The deciding rule",
        body: [
          "All three are legitimate authorities; the right one depends on your horizon and budget. What is never a matter of choice is verification: confirm the specific layout's approval letter and survey numbers, pull the [30-year EC](/insights/encumbrance-certificates-explained-before-buying-land), and match the Dharani record before any payment.",
        ],
      },
    ],
  },
  {
    slug: "encumbrance-certificates-explained-before-buying-land",
    title: "Encumbrance Certificates Explained: How to Read One Before Buying Land",
    seoTitle: "Encumbrance Certificates Explained for Land Buyers",
    excerpt: "A 30-year Encumbrance Certificate is your land title's MRI scan. Here's what an EC is, where to get it, and how to spot the red flags hidden in it.",
    category: "Buyer Guides",
    categorySlug: "buyer-guides",
    publishedAt: "2026-08-02",
    author: nagarjuna,
    sections: [
      {
        heading: "What an EC actually is",
        body: [
          "An Encumbrance Certificate (EC) is a chronological record of all registered instruments (sale deeds, mortgages, gifts, leases, wills) that affected a specific property over a given period. Telangana's Sub-Registrars issue it from the books of the sub-registry concerned.",
          "The name undersells its usefulness: an EC is not a certificate of clean title — it is a complete ledger of every legal event. Whether that ledger is empty or busy tells you exactly what has happened to the land.",
        ],
      },
      {
        heading: "Why 30 years",
        body: [
          "Indian courts and lending institutions conventionally treat an undisturbed 30-year possession as the backbone of a marketable title. A continuous, gap-free EC spanning 30 years means no adverse claim surfaced over three decades — the strongest practical evidence of clear title you can produce at resale time.",
          "Shorter ECs leave a window of uncertainty; lenders, buyers and registrars all discount them.",
        ],
      },
      {
        heading: "How to spot red flags",
        body: [
          "Read the EC for four things: unexplained gaps in the date sequence (missing years often hide transactions), registered mortgages or charges that were never released, gifts or settlement instruments (which can carry contestable family claims), and duplicate registrations on the same parcel.",
          "Cross-each entry against the Dharani record: the names, survey numbers and extents must reconcile. Mismatch between EC and Dharani is the most common — and most dangerous — silent defect.",
        ],
      },
      {
        heading: "Where and how to get one",
        body: [
          "ECs are available from the respective Sub-Registrar office online or in person in Telangana, typically within a working day. Order it in the name that will buy — sellers' ECs prove their history; a fresh EC in the buyer's name documents the latest transaction.",
          "Ask for the certified copy of the oldest entry in the chain too. A clean, linked, 30-year paper trail is the cheapest insurance policy in real estate.",
        ],
      },
    ],
  },
  {
    slug: "first-time-plot-investor-checklist-hyderabad",
    title: "First-Time Plot Investor? A 7-Step Pre-Purchase Checklist for Hyderabad",
    seoTitle: "First-Time Plot Investor Checklist: 7 Steps",
    excerpt: "Seven checks — approvals, EC, Dharani, zoning, ownership, infrastructure and exit — that keep a first plot purchase from becoming a first object lesson.",
    category: "Buyer Guides",
    categorySlug: "buyer-guides",
    publishedAt: "2026-07-25",
    author: nagarjuna,
    sections: [
      {
        heading: "The seven checks",
        body: [
          "Step 1: Approval. Establish which authority approved the layout and pull the approval document. HMDA, DTCP, FCDA or RERA all qualify; an unapproved copy of an approved name does not.",
          "Step 2: Encumbrance. Obtain a 30-year EC and confirm a continuous, transaction-free history in the current owner share.",
          "Step 3: Dharani. Verify the survey/patta number, the khata name and the land classification on the Dharani portal — the record must reconcile with the sale deed.",
          "Step 4: Zoning. Confirm the Master Plan shows Residential use — not conservation, green, water or road-widening reservations.",
          "Step 5: Ownership. Match the seller's identity to the registered documents and check whether co-owners or family members have legally valid claims.",
          "Step 6: Infrastructure. Visit the land in person — roads, drainage, water, underground utilities, entrance and neighbors speak louder than any brochure.",
          "Step 7: Exit. Before you buy, ask how you would sell: is the plot bankable, resale-recognized and part of an institutionally acceptable layout? Liquidity is a feature, not an afterthought.",
        ],
      },
      {
        heading: "Avoiding the classic first-buyer mistakes",
        body: [
          "Three errors repeat across Hyderabad's first-time buyers: trusting verbal 'approved' claims without documents, skipping the physical visit, and letting price dictate project choice instead of legal status and infrastructure quality.",
          "A plot that clears all seven checks, even at a moderate premium, beats an unverified bargain at any price.",
        ],
      },
      {
        heading: "When to involve a professional",
        body: [
          "If any step produces ambiguity — a sliver of unmatched survey numbers, a lien on the EC, a family claim — get independent legal verification before transacting. A few thousand rupees of professional due diligence routinely saves lakhs.",
          "Independent advisory, done correctly, has no conflict: it verifies, compares and advises across builders, which keeps both the checks and the investor's interests honest.",
        ],
      },
    ],
  },
];

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export function getInsightsByProject(projectSlug: string, count = 3): Insight[] {
  return insights
    .filter((i) => (i.featuredProjectSlugs ?? []).includes(projectSlug))
    .slice(0, count);
}

export function getInsightsByCategory(categorySlug: InsightCategorySlug): Insight[] {
  return insights.filter((i) => i.categorySlug === categorySlug);
}

export function getRelatedInsights(current: Insight, count = 3): Insight[] {
  const sameCategory = insights.filter((i) => i.slug !== current.slug && i.categorySlug === current.categorySlug);
  const others = insights.filter((i) => i.slug !== current.slug && i.categorySlug !== current.categorySlug);
  return [...sameCategory, ...others].slice(0, count);
}

export function getReadingMinutes(insight: Insight): number {
  const text = [insight.title, insight.excerpt, ...insight.sections.flatMap((s) => s.body)].join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatInsightDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
}