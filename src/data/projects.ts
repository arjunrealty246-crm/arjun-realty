export interface FAQ {
  q: string;
  a: string;
}

export interface ProjectTestimonial {
  name: string;
  text: string;
}

export interface ProjectUnit {
  type: string;
  count: string;
}

export interface ProjectMediaItem {
  type: "image" | "video";
  src: string;
  label?: string;
  poster?: string;
}

export interface ProjectDocument {
  name: string;
  url: string;
  type?: "pdf" | "image" | "link";
  description?: string;
}

export interface ProjectPhase {
  name: string;
  status?: string;
  description?: string;
  details?: { label: string; value: string }[];
  highlights?: string[];
  photos?: string[];
  videos?: string[];
  masterPlanUrl?: string;
  layoutUrl?: string;
  layoutPdfUrl?: string;
  brochureUrl?: string;
  documents?: ProjectDocument[];
}

export interface ProjectUpdate {
  title: string;
  description?: string;
  status: "completed" | "in-progress" | "planned";
}

export interface ProjectGalleryItem {
  src: string;
  title?: string;
  category?: string;
}

export interface DevelopmentUpdate {
  date?: string;
  title: string;
  description?: string;
  images?: string[];
}

export interface Project {
  slug: string;
  name: string;
  builder: string;
  marketingPartner?: string;
  usps?: string[];
  units?: ProjectUnit[];
  projectType: string;
  approval: string;
  location: string;
  mapsUrl: string;
  price: string;
  launchPrice?: string;
  currentPrice?: string;
  startingPrice: string;
  status: string;
  badge: string;
  isUpcoming: boolean;
  totalAcres?: string;
  totalPlots?: string;
  plotSizes: string;
  villaInfo?: string;
  clubhouseDetails?: string;
  amenities: string[];
  connectivity?: string[];
  nearbyLandmarks?: string[];
  investmentHighlights?: string[];
  highlights: string[];
  bankLoanAvailable?: boolean;
  brochureUrl: string;
  layoutPdfUrl?: string;
  galleryImages?: string[];
  image: string;
  images: string[];
  videos?: string[];
  videoUrl?: string;
  droneVideoUrl?: string;
  heroVideo?: string;
  masterPlanUrl?: string;
  locationMapUrl?: string;
  faqs?: FAQ[];
  testimonials?: ProjectTestimonial[];
  siteVisitBooking?: boolean;
  whatsappCta?: string;
  projectArea?: string;
  locationAdvantages: string[];
  whyInvest: string[];
  description?: string;
  phases?: ProjectPhase[];
  documents?: ProjectDocument[];
  updates?: ProjectUpdate[];
  layoutUrl?: string;
  locationUrl?: string;
  gallery?: ProjectGalleryItem[];
  developmentUpdates?: DevelopmentUpdate[];
}

export const projects: Project[] = [
  {
    slug: "jb-harmony-woods",
    name: "JB Harmony Woods",
    builder: "bhuvan-infra",
    marketingPartner: "JB Infra Group",
    projectType: "Premium Villa Plotting & Boutique Villas",
    approval: "FCDA Approved",
    location: "Thummaloor, Future City Growth Corridor, Hyderabad",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Thummaloor%2C%20Hyderabad",
    price: "Contact for Price",
    launchPrice: "Contact for Price",
    startingPrice: "Contact for Price",
    status: "Live",
    badge: "Bookings Open",
    isUpcoming: false,
    usps: [
      "One of the first FCDA Approved premium villa plotting projects in the Future City growth corridor",
      "53 Acres of premium living space",
      "524 premium villa plots with 50 boutique villas",
      "36,000 Sq. Ft. Grand Clubhouse with 30+ world-class amenities",
    ],
    units: [
      { type: "Premium Villa Plots", count: "524" },
      { type: "Boutique Villas", count: "50" },
    ],
    totalAcres: "53",
    totalPlots: "574",
    plotSizes: "Villa Plots: 200 – 600 Sq. Yards | Boutique Villas: 1,800 – 2,400 Sq. Ft.",
    clubhouseDetails: "36,000 Sq. Ft. Grand Clubhouse",
    amenities: [
      "Swimming Pool", "Kids Pool", "Fitness Gym", "Yoga Area", "Meditation Lawn",
      "Pickleball Court", "Half Basketball Court", "Badminton Court", "Indoor Games",
      "Open Air Theatre", "Banquet Hall", "Guest Rooms", "Rooftop Garden",
      "Children's Play Area", "Party Lawn", "Central Island", "Temple",
      "Tree-Shaded Seating", "Landscaped Parks", "Jogging Track", "Walking Track",
      "Avenue Plantation", "Underground Drainage", "Underground Electricity",
      "LED Street Lighting", "24×7 Security", "CCTV Surveillance",
      "Compound Wall", "Grand Entrance Arch", "Water Supply", "Rainwater Harvesting",
      "Premium Internal Roads",
    ],
    connectivity: [
      "2 Minutes to Srisailam Highway",
      "8 Minutes to ORR Exit 14",
      "10 Minutes to FCDA Headquarters",
      "15 Minutes to Rajiv Gandhi International Airport",
      "15 Minutes to Collector Office",
      "16 Minutes to Foxconn",
      "5 Minutes to Future City",
      "10 Minutes to AI City & AI Skill University",
      "10 Minutes to Wonderla",
      "16 Minutes to Kaynes Technology",
      "35 Minutes to Financial District",
      "35 Minutes to Gachibowli",
      "40 Minutes to Neopolis Knowledge City",
    ],
    nearbyLandmarks: [
      "Future City", "AI City & AI Skill University", "FCDA Headquarters",
      "Foxconn", "Kaynes Technology", "Wonderla", "Collector Office",
      "Srisailam Highway", "ORR Exit 14",
    ],
    investmentHighlights: [
      "53 Acres – one of the largest FCDA approved villa plotting projects in the region",
      "FCDA Approval ensures long-term development certainty in the Future City growth corridor",
      "Rapidly appreciating corridor driven by AI City, Foxconn, and large-scale industrial investment",
      "Boutique Villas galore – limited inventory for premium end-users & NRIs",
      "Bank Loan Available for hassle-free investment",
      "Transparent pricing with clear title and legal compliance",
    ],
    highlights: [
      "FCDA Approved – one of the first projects in the corridor",
      "53 Acres gated community with 36,000 Sq. Ft. clubhouse",
      "524 Premium Villa Plots + 50 Boutique Villas",
      "2 Minutes to Srisailam Highway | 8 Minutes to ORR Exit 14",
      "15 Minutes to Rajiv Gandhi International Airport",
      "30+ World-Class Lifestyle Amenities",
    ],
    bankLoanAvailable: true,
    brochureUrl: "/uploads/projects/1786897494386-Flyer.pdf",
    layoutUrl: "/uploads/projects/1786891339080-HarmonyWoods_Layout18x25-2.pdf",
    heroVideo: "/uploads/projects/1786891090927-InShot_20260730_1836175241.mp4",
    image: "/images/projects/jb-harmony-woods.svg",
    images: ["/images/projects/jb-harmony-woods.svg"],
    faqs: [
      { q: "What is the total size of JB Harmony Woods?", a: "JB Harmony Woods spans 53 Acres with 524 premium villa plots and 50 boutique villas." },
      { q: "Is JB Harmony Woods FCDA approved?", a: "Yes, JB Harmony Woods is one of the first FCDA approved premium villa plotting projects in the Future City growth corridor." },
      { q: "What are the available plot sizes?", a: "Villa plots range from 200 to 600 Sq. Yards. Boutique villas range from 1,800 to 2,400 Sq. Ft." },
      { q: "Is bank loan available?", a: "Yes, bank loan facility is available for both villa plots and boutique villas. We are empaneled with leading banks and financial institutions." },
      { q: "What amenities does the project offer?", a: "The project features a 36,000 Sq. Ft. Grand Clubhouse with 30+ world-class amenities including swimming pool, fitness gym, pickleball court, indoor games, banquet hall, and more." },
      { q: "What is the location advantage of JB Harmony Woods?", a: "The project is just 2 minutes from Srisailam Highway, 8 minutes from ORR Exit 14, 15 minutes from the airport, and minutes away from Future City, AI City, Foxconn, and major landmarks." },
      { q: "Is this project suitable for NRIs?", a: "Absolutely. The FCDA approval, prime location near Future City and AI City, and high appreciation potential make it an ideal investment for NRIs looking for long-term value." },
      { q: "How is the connectivity to IT hubs?", a: "Financial District and Gachibowli are reachable within 35 minutes, Neopolis Knowledge City within 40 minutes, making it convenient for IT professionals." },
    ],
    testimonials: [
      { name: "Ravi K., Investor", text: "Impressed with the scale of the project and the FCDA approval. The location near Future City and AI City sealed the deal for me." },
      { name: "Priya S., NRI Buyer", text: "As an NRI, finding a fully approved large-scale project was a priority. JB Harmony Woods exceeded my expectations with its transparency and world-class amenities." },
      { name: "Vikram Reddy, End-User", text: "The 36,000 Sq. Ft. clubhouse and 30+ amenities convinced me to build our dream villa here. It's a complete lifestyle community." },
    ],
    siteVisitBooking: true,
    whatsappCta: "Book JB Harmony Woods",
    projectArea: "53 Acres",
    locationAdvantages: [
      "2 Minutes to Srisailam Highway",
      "8 Minutes to ORR Exit 14",
      "10 Minutes to FCDA Headquarters",
      "15 Minutes to Rajiv Gandhi International Airport",
      "15 Minutes to Collector Office",
      "16 Minutes to Foxconn",
      "5 Minutes to Future City",
      "10 Minutes to AI City & AI Skill University",
      "10 Minutes to Wonderla",
      "16 Minutes to Kaynes Technology",
      "35 Minutes to Financial District",
      "35 Minutes to Gachibowli",
      "40 Minutes to Neopolis Knowledge City",
    ],
    whyInvest: [
      "FCDA Approved project in the fast-growing Future City corridor",
      "53 Acres of premium living space with 36,000 Sq. Ft. Grand Clubhouse",
      "524 premium villa plots & 50 limited edition boutique villas",
      "Unbeatable location: 2 min to Srisailam Highway, 8 min to ORR, 15 min to Airport",
      "Proximity to Future City, AI City, Foxconn, and Kaynes Technology",
      "30+ world-class amenities for a complete lifestyle experience",
      "Bank loan available with flexible payment options",
      "High appreciation potential driven by massive industrial & infrastructure growth",
    ],
    updates: [
      {
        title: "FCDA Approval",
        description:
          "One of the first FCDA approved premium villa plotting projects in the Future City growth corridor.",
        status: "completed",
      },
      {
        title: "Bookings Open",
        description:
          "Bookings are open for 524 premium villa plots and 50 boutique villas.",
        status: "in-progress",
      },
    ],
  },
  {
    slug: "jb-hillside-county",
    name: "JB Hillside County",
    builder: "jb-infra",
    projectType: "Premium Gated Villa Plotting Community",
    approval: "HMDA Approved · RERA Registered",
    location: "Sagar Highway, Hyderabad",
    mapsUrl: "https://maps.app.goo.gl/1Uh5BDYMKnrfaF58A?g_st=ac",
    price: "₹20,000/Sq. Yd",
    launchPrice: "₹20,000/Sq. Yd",
    startingPrice: "₹20,000/Sq. Yd",
    status: "Live",
    badge: "Live",
    isUpcoming: false,
    totalAcres: "30",
    totalPlots: "80",
    plotSizes: "228, 267, 300, 400, 500, 600, 800 Sq. Yards",
    clubhouseDetails: "15,000+ Sq. Ft. Grand Clubhouse",
    amenities: [
      "15,000+ Sq. Ft. Clubhouse", "40 Feet & Above Black Top Roads", "Entrance Arch",
      "Avenue Plantation", "Landscaped Parks", "Children's Play Area", "Jogging Track",
      "Walking Track", "Indoor Games", "Multipurpose Hall", "CCTV Surveillance",
      "24×7 Security", "Compound Wall", "Underground Electricity", "Underground Drainage",
      "Water Supply", "Street Lights", "Rain Water Harvesting",
    ],
    connectivity: [
      "Sagar Highway Facing Project",
      "Excellent Connectivity to Hyderabad",
    ],
    nearbyLandmarks: [
      "BDL", "BEL", "OCTOPUS Training Centre", "NSG Campus",
      "Guru Nanak Institutions", "Sri Indu College", "St. Mary's Institutions",
      "CVR College of Engineering",
    ],
    investmentHighlights: [
      "30 Acres Premium Villa Plotting", "15,000+ Sq. Ft. Grand Clubhouse",
      "20+ Premium Lifestyle Amenities", "HMDA & RERA Approved",
      "Bank Loan Facility Available", "High Appreciation Potential",
    ],
    highlights: [
      "30 Acres Premium Villa Plotting", "15,000+ Sq. Ft. Grand Clubhouse",
      "20+ Premium Lifestyle Amenities", "HMDA & RERA Approved",
      "Bank Loan Facility Available", "High Appreciation Potential",
    ],
    bankLoanAvailable: true,
    brochureUrl: "",
    image: "/images/projects/jb-hillside-county.svg",
    images: ["/images/projects/jb-hillside-county.svg"],
    whatsappCta: "Get Hillside County Details",
    projectArea: "30 Acres",
    locationAdvantages: [
      "Sagar Highway Facing Project", "Near BDL", "Near BEL",
      "Near OCTOPUS Training Centre", "Near NSG Campus", "Near Guru Nanak Institutions",
      "Near Sri Indu College", "Near St. Mary's Institutions",
      "Near CVR College of Engineering", "Excellent Connectivity to Hyderabad",
    ],
    whyInvest: [
      "HMDA & RERA Approved Project", "Bank Loan Facility",
      "Government Institutions Nearby", "Educational Hub",
      "Premium Villa Community", "High Growth Corridor",
      "Excellent Long-Term Appreciation",
    ],
    updates: [
      {
        title: "HMDA & RERA Approval",
        description: "HMDA Approved · RERA Registered.",
        status: "completed",
      },
      {
        title: "Bookings Open",
        description:
          "Premium villa plots available in 228, 267, 300, 400, 500, 600 and 800 Sq. Yards.",
        status: "in-progress",
      },
    ],
  },
  {
    slug: "jb-serene-county",
    name: "JB Serene County",
    builder: "jb-infra",
    projectType: "Premium HMDA Residential Plotting Project",
    approval: "HMDA Approved · TSRERA Registered",
    location: "Near Kongarakalan – Tata Greenfield Growth Corridor, Hyderabad",
    mapsUrl: "https://maps.app.goo.gl/4pq5tv78XEe8BgQ29?g_st=ac",
    price: "Contact for Latest Price",
    startingPrice: "Contact for Latest Price",
    status: "Live",
    badge: "Live",
    isUpcoming: false,
    plotSizes: "150, 167, 183, 200, 250, 300 Sq. Yards",
    amenities: [
      "Grand Entrance Arch", "Wide Black Top Roads", "Landscaped Parks",
      "Children's Play Area", "Avenue Plantation", "Underground Electricity",
      "Underground Drainage System", "Water Supply Network", "LED Street Lighting",
      "Walking & Jogging Track", "24×7 Security", "CCTV Surveillance",
      "Compound Wall", "Rainwater Harvesting",
    ],
    connectivity: [
      "Just 1 KM from Patancheru – Tata Greenfield Highway",
      "Close to ORR Exit No. 13",
      "Just 15 Minutes to Rajiv Gandhi International Airport",
    ],
    nearbyLandmarks: [
      "District Collector Office", "Foxconn Manufacturing Plant",
      "Kaynes Technology Manufacturing Unit",
    ],
    investmentHighlights: [
      "Premium HMDA Approved Layout", "TSRERA Registered",
      "Clear & Secure Title", "Bank Loan Facility Available",
      "High Appreciation Potential", "Rapidly Developing Growth Corridor",
    ],
    highlights: [
      "Premium HMDA Approved Layout", "TSRERA Registered",
      "Clear & Secure Title", "Bank Loan Facility Available",
      "High Appreciation Potential", "Rapidly Developing Growth Corridor",
    ],
    bankLoanAvailable: true,
    brochureUrl: "",
    image: "/images/projects/jb-serene-county.svg",
    images: ["/images/projects/jb-serene-county.svg"],
    whatsappCta: "Get Serene County Details",
    locationAdvantages: [
      "Just 1 KM from Patancheru – Tata Greenfield Highway",
      "Close to District Collector Office", "Near Foxconn Manufacturing Plant",
      "Near Kaynes Technology Manufacturing Unit",
      "Close to ORR Exit No. 13",
      "Just 15 Minutes to Rajiv Gandhi International Airport",
      "Excellent Connectivity to Hyderabad Growth Corridor",
    ],
    whyInvest: [
      "HMDA & TSRERA Approved Project",
      "Clear Title with Bank Loan Facility",
      "Surrounded by Major Industries & Employment Zones",
      "Excellent Connectivity to Highways & ORR",
      "Ideal for Investment and Residential Development",
      "Strong Short-Term and Long-Term Appreciation Potential",
    ],
    updates: [
      {
        title: "HMDA & TSRERA Registration",
        description: "HMDA Approved · TSRERA Registered.",
        status: "completed",
      },
      {
        title: "Bookings Open",
        description:
          "Plots available in 150, 167, 183, 200, 250 and 300 Sq. Yards.",
        status: "in-progress",
      },
    ],
  },
  {
    slug: "jb-pristine-city",
    name: "JB Pristine City",
    builder: "jb-infra",
    projectType: "Premium DTCP Villa Plotting Project",
    approval: "DTCP (Under Approval)",
    location: "Vikarabad, Telangana",
    mapsUrl: "https://maps.app.goo.gl/QPHZ7D8uQdS2nvyh7",
    price: "Contact for Latest Price",
    startingPrice: "Contact for Latest Price",
    status: "Pre-Launch",
    badge: "Pre-Launch",
    isUpcoming: false,
    totalAcres: "150+",
    plotSizes: "150, 165, 183, 200, 220, 300, 400, 500, 600 Sq. Yards",
    amenities: [
      "Grand Entrance Arch", "Wide Black Top Roads", "Avenue Plantation",
      "Landscaped Parks", "Children's Play Area", "Walking & Jogging Track",
      "Underground Drainage", "Underground Electricity", "Water Supply Network",
      "LED Street Lighting", "CCTV Surveillance", "24×7 Security",
      "Compound Wall", "Rainwater Harvesting", "Open Green Spaces",
    ],
    connectivity: [
      "Just 2 KM from Vikarabad Railway Station",
      "Just 3.5 KM from Regional Ring Road (RRR)",
      "Near Four-Lane Expressway from ORR Exit No.18",
    ],
    nearbyLandmarks: [
      "Ananthagiri Hills", "Anantha Padmanabha Swamy Temple",
      "Kotepally Reservoir",
    ],
    investmentHighlights: [
      "Premium 150+ Acres Residential Layout", "Clear Title Property",
      "Bank Loan Facility Available", "Excellent Investment Opportunity",
      "Fast Growing Development Zone", "Ideal for Investment & Villa Construction",
    ],
    highlights: [
      "Premium 150+ Acres Residential Layout", "Clear Title Property",
      "Bank Loan Facility Available", "Excellent Investment Opportunity",
      "Fast Growing Development Zone", "Ideal for Investment & Villa Construction",
    ],
    bankLoanAvailable: true,
    brochureUrl: "",
    image: "/images/projects/jb-pristine-city.svg",
    images: ["/images/projects/jb-pristine-city.svg"],
    whatsappCta: "Get Pristine City Details",
    projectArea: "150+ Acres Premium Residential Layout",
    locationAdvantages: [
      "Just 2 KM from Vikarabad Railway Station", "Just 2.5 KM from Vikarabad Town",
      "Just 1 KM from Proposed Vikarabad Ring Road",
      "Just 3.5 KM from Regional Ring Road (RRR)", "Close to Ananthagiri Hills",
      "Near Anantha Padmanabha Swamy Temple", "Close to Kotepally Reservoir",
      "Near Four-Lane Expressway from ORR Exit No.18 (Appa Junction) to Vikarabad",
    ],
    whyInvest: [],
    updates: [
      {
        title: "DTCP Approval",
        description:
          "The project is currently under the DTCP approval process.",
        status: "in-progress",
      },
      {
        title: "Launch",
        description:
          "Pre-launch stage — details available on request.",
        status: "planned",
      },
    ],
  },
  {
    slug: "jb-serene-city",
    name: "JB Serene City",
    builder: "jb-infra",
    projectType: "Premium HMDA Gated Residential Township",
    approval: "HMDA Approved · RERA Registered",
    location: "Ibrahimpatnam, Hyderabad",
    mapsUrl: "https://maps.app.goo.gl/HGnvd4xkmKnmEbkC7",
    price: "Contact for Latest Price",
    startingPrice: "Contact for Latest Price",
    status: "Live",
    badge: "Live",
    isUpcoming: false,
    totalAcres: "660",
    plotSizes: "Contact for Available Sizes",
    clubhouseDetails: "5 Acres Grand Clubhouse",
    amenities: [
      "5 Acres Grand Clubhouse", "Swimming Pool", "Gymnasium", "Indoor Games",
      "Multipurpose Hall", "Children's Play Area", "Jogging Track", "Cycling Track",
      "Yoga & Meditation Zone", "Outdoor Sports Courts", "Landscaped Gardens",
      "Wide Black Top Roads", "Underground Electricity", "Underground Drainage",
      "Water Supply", "Avenue Plantation", "LED Street Lighting", "CCTV Surveillance",
      "24×7 Security", "Compound Wall", "Grand Entrance Plaza",
    ],
    connectivity: [
      "Highway Facing Project",
      "Excellent Connectivity to ORR, Airport & Hyderabad IT Corridor",
    ],
    nearbyLandmarks: [
      "BDL", "BEL", "NSG Campus", "OCTOPUS Training Centre",
      "Rangareddy District Collectorate", "Guru Nanak University",
      "Sri Indu Institutions", "CVR College of Engineering",
    ],
    investmentHighlights: [
      "660 Acres Premium Integrated Township", "Highway Facing Project",
      "5 Acres Grand Clubhouse", "30+ World-Class Amenities",
      "100+ Families Already Residing", "High Appreciation Investment Corridor",
    ],
    highlights: [
      "660 Acres Premium Integrated Township", "Highway Facing Project",
      "5 Acres Grand Clubhouse", "30+ World-Class Amenities",
      "100+ Families Already Residing", "High Appreciation Investment Corridor",
    ],
    bankLoanAvailable: true,
    brochureUrl: "",
    image: "/images/projects/jb-serene-city.svg",
    images: ["/images/projects/jb-serene-city.svg"],
    whatsappCta: "Get Serene City Details",
    projectArea: "660 Acres Integrated Township",
    locationAdvantages: [
      "Highway Facing Project", "Near BDL (Bharat Dynamics Limited)",
      "Near BEL (Bharat Electronics Limited)", "Near NSG Campus",
      "Near OCTOPUS Training Centre", "Near Rangareddy District Collectorate",
      "Near Guru Nanak University", "Near Sri Indu Institutions",
      "Near CVR College of Engineering", "Near AVN College",
      "Close to Pallavi International School", "Close to AVN Life School",
      "Close to Florist International School",
      "Excellent Connectivity to ORR, Airport & Hyderabad IT Corridor",
    ],
    whyInvest: [
      "One of the largest integrated townships in South Hyderabad",
      "HMDA & RERA approved development",
      "Premium lifestyle with world-class infrastructure",
      "Surrounded by government organizations, industries and educational institutions",
      "Excellent choice for both investment and future villa construction",
      "Strong long-term appreciation potential",
    ],
    updates: [
      {
        title: "HMDA & RERA Approval",
        description: "HMDA Approved · RERA Registered.",
        status: "completed",
      },
      {
        title: "Community Residency",
        description:
          "100+ families are already residing in the township.",
        status: "completed",
      },
      {
        title: "Bookings Open",
        description:
          "Plots available in the 660-acre integrated township.",
        status: "in-progress",
      },
    ],
  },
  {
    slug: "jb-nature-valley",
    name: "JB Nature Valley",
    builder: "jb-infra",
    projectType: "Premium DTCP & RERA Approved Integrated Satellite Township",
    approval: "DTCP Approved · RERA Registered",
    location: "NH-65, Hyderabad – Vijayawada Highway, Choutuppal, Telangana",
    mapsUrl: "https://maps.app.goo.gl/zeNriVXsD7KwSPSD9",
    price: "Contact for Latest Price",
    startingPrice: "Contact for Latest Price",
    status: "Live",
    badge: "Live",
    isUpcoming: false,
    totalAcres: "720+",
    plotSizes: "Contact for Available Sizes",
    clubhouseDetails: "2 Grand Clubhouses",
    amenities: [
      "Two Grand Clubhouses", "5 Acres International Cricket Ground", "Sports Arena",
      "Swimming Pool", "Gymnasium", "Indoor Games", "Outdoor Sports Courts",
      "Children's Play Area", "Jogging Track", "Cycling Track",
      "Yoga & Meditation Zone", "Landscaped Parks", "Avenue Plantation",
      "100 Feet Main Road", "Wide Internal CC Roads", "Underground Electricity",
      "Underground Drainage", "Water Supply", "LED Street Lights",
      "CCTV Surveillance", "24×7 Security", "Compound Wall",
      "Rainwater Harvesting", "Amphitheatre", "Senior Citizen Park",
    ],
    connectivity: [
      "NH-65 Hyderabad – Vijayawada Highway Facing",
      "Close to Proposed Regional Ring Road (RRR)",
      "Six-Lane NH-65 Expansion Corridor",
      "Excellent Connectivity to Hyderabad",
    ],
    nearbyLandmarks: [
      "Dry Port", "MSME Industrial Cluster", "Logistics Hub",
    ],
    investmentHighlights: [
      "720+ Acres Premium Integrated Satellite Township",
      "Fully Highway Facing Project",
      "Hyderabad's Premier Eco-Friendly Township",
      "2 Grand Clubhouses", "5 Acres Cricket Ground",
      "40+ World-Class Lifestyle Amenities",
    ],
    highlights: [
      "720+ Acres Premium Integrated Satellite Township",
      "Fully Highway Facing Project",
      "Hyderabad's Premier Eco-Friendly Township",
      "2 Grand Clubhouses", "5 Acres Cricket Ground",
      "40+ World-Class Lifestyle Amenities",
    ],
    bankLoanAvailable: true,
    brochureUrl: "",
    image: "/images/projects/jb-nature-valley.svg",
    images: ["/images/projects/jb-nature-valley.svg"],
    whatsappCta: "Get Nature Valley Details",
    projectArea: "720+ Acres Integrated Township",
    locationAdvantages: [
      "NH-65 Hyderabad – Vijayawada Highway Facing",
      "Close to Proposed Regional Ring Road (RRR)", "Near Dry Port",
      "Close to MSME Industrial Cluster", "Near Logistics Hub",
      "Excellent Connectivity to Hyderabad",
      "Six-Lane NH-65 Expansion Corridor",
      "Surrounded by Rapid Industrial & Infrastructure Development",
    ],
    whyInvest: [
      "One of Telangana's largest integrated satellite townships",
      "DTCP & RERA approved with clear legal title",
      "Excellent appreciation potential due to NH-65 expansion and RRR",
      "Premium lifestyle with world-class amenities",
      "Ideal for long-term investment and future villa construction",
      "Bank loan facility from leading financial institutions",
    ],
    updates: [
      {
        title: "DTCP & RERA Approval",
        description: "DTCP Approved · RERA Registered.",
        status: "completed",
      },
      {
        title: "Bookings Open",
        description:
          "Plots available across the 720+ acre satellite township.",
        status: "in-progress",
      },
    ],
  },
  {
    slug: "upcoming-ibrahimpatnam",
    name: "Upcoming Project – Ibrahimpatnam",
    builder: "jb-infra",
    projectType: "Premium Gated Villa Community",
    approval: "Approval Process Underway",
    location: "Ibrahimpatnam, Hyderabad",
    mapsUrl: "",
    price: "Coming Soon",
    startingPrice: "Coming Soon",
    status: "Upcoming",
    badge: "Upcoming",
    isUpcoming: true,
    totalAcres: "90",
    plotSizes: "Details Coming Soon",
    clubhouseDetails: "Grand Clubhouse",
    amenities: [
      "Grand Clubhouse", "Swimming Pool", "Children's Play Area",
      "Landscaped Gardens", "Jogging Track", "Cycling Track", "Indoor Games",
      "Outdoor Sports Courts", "Multipurpose Hall", "Yoga & Meditation Zone",
      "Wide Internal Roads", "Avenue Plantation", "Underground Electricity",
      "Underground Drainage", "Water Supply", "LED Street Lighting",
      "CCTV Surveillance", "24×7 Security", "Compound Wall", "Grand Entrance Arch",
    ],
    connectivity: [
      "Very Close to Sagar Highway",
      "Close to Kongara Kalan Growth Corridor",
    ],
    nearbyLandmarks: [
      "Ibrahimpatnam Town", "Adibatla Aerospace SEZ", "TCS Adibatla Campus",
      "Foxconn Manufacturing Facility", "Rangareddy District Collectorate",
      "Guru Nanak Institutions",
    ],
    investmentHighlights: [
      "Premium 90 Acres Villa Community", "Gated Residential Development",
      "Premium Lifestyle Infrastructure", "Modern Master Planning",
      "Excellent Investment Opportunity", "Fastest Growing Corridor",
    ],
    highlights: [
      "Premium 90 Acres Villa Community", "Gated Residential Development",
      "Premium Lifestyle Infrastructure", "Modern Master Planning",
      "Excellent Investment Opportunity", "Fastest Growing Corridor",
    ],
    bankLoanAvailable: true,
    brochureUrl: "",
    image: "/images/projects/upcoming-ibrahimpatnam.svg",
    images: ["/images/projects/upcoming-ibrahimpatnam.svg"],
    whatsappCta: "Get Ibrahimpatnam Updates",
    projectArea: "90 Acres Premium Villa Community",
    locationAdvantages: [
      "Very Close to Sagar Highway", "Close to Ibrahimpatnam Town",
      "Near Adibatla Aerospace SEZ", "Near TCS Adibatla Campus",
      "Close to Kongara Kalan Growth Corridor", "Near Foxconn Manufacturing Facility",
      "Close to Rangareddy District Collectorate", "Near Guru Nanak Institutions",
    ],
    whyInvest: [],
    updates: [
      {
        title: "Approval Process",
        description:
          "Approval process is underway for the 90-acre gated villa community.",
        status: "in-progress",
      },
      {
        title: "Launch",
        description: "Coming soon — register to receive updates.",
        status: "planned",
      },
    ],
  },
  {
    slug: "upcoming-srisailam-highway",
    name: "Upcoming Project – Srisailam Highway",
    builder: "jb-infra",
    projectType: "Premium Highway Facing Gated Residential Township",
    approval: "DTCP & RERA Under Process",
    location: "Srisailam Highway, Hyderabad",
    mapsUrl: "",
    price: "Coming Soon",
    startingPrice: "Coming Soon",
    status: "Upcoming",
    badge: "Upcoming",
    isUpcoming: true,
    totalAcres: "200",
    plotSizes: "Details Coming Soon",
    amenities: [
      "Grand Clubhouse", "Swimming Pool", "Children's Play Area",
      "Landscaped Gardens", "Jogging Track", "Sports Courts",
      "Wide Internal Roads", "Underground Utilities", "24×7 Security",
      "CCTV Surveillance", "Grand Entrance Arch", "Premium Green Spaces",
    ],
    investmentHighlights: [
      "200 Acres Premium Integrated Township",
      "Fully Highway Facing Project", "Premium Gated Community",
      "Modern Master Planning", "Excellent Investment Opportunity",
      "Designed for Premium Residential Living",
    ],
    highlights: [
      "200 Acres Premium Integrated Township",
      "Fully Highway Facing Project", "Premium Gated Community",
      "Modern Master Planning", "Excellent Investment Opportunity",
      "Designed for Premium Residential Living",
    ],
    bankLoanAvailable: false,
    brochureUrl: "",
    image: "/images/projects/upcoming-srisailam-highway.svg",
    images: ["/images/projects/upcoming-srisailam-highway.svg"],
    whatsappCta: "Get Srisailam Highway Updates",
    projectArea: "200 Acres",
    locationAdvantages: [],
    whyInvest: [
      "Prime location on Srisailam Highway",
      "Large-scale integrated township with premium infrastructure",
      "Excellent long-term appreciation potential",
      "Ideal for investment and future residential development",
      "Launching soon with attractive pre-launch benefits",
    ],
    updates: [
      {
        title: "DTCP & RERA Approval",
        description:
          "DTCP and RERA approvals are under process.",
        status: "in-progress",
      },
      {
        title: "Launch",
        description: "Coming soon — register to receive updates.",
        status: "planned",
      },
    ],
  },
  {
    slug: "upcoming-shankarpally",
    name: "Upcoming Project – Shankarpally",
    builder: "jb-infra",
    projectType: "Premium HMDA Open Plotting Community",
    approval: "HMDA Approval Under Process",
    location: "Shankarpally – Nawabpet Highway, West Hyderabad",
    mapsUrl: "",
    price: "Coming Soon",
    startingPrice: "Coming Soon",
    status: "Upcoming",
    badge: "Upcoming",
    isUpcoming: true,
    plotSizes: "Details Coming Soon",
    amenities: [
      "Grand Entrance Arch", "Wide Internal Roads", "Landscaped Parks",
      "Children's Play Area", "Walking & Jogging Track", "Avenue Plantation",
      "Underground Electricity", "Underground Drainage", "Water Supply",
      "LED Street Lighting", "CCTV Surveillance", "24×7 Security",
      "Compound Wall", "Premium Green Spaces",
    ],
    connectivity: [
      "Highway Facing on Shankarpally – Nawabpet Highway",
      "Excellent Connectivity to ORR",
    ],
    nearbyLandmarks: [
      "West Hyderabad Growth Corridor",
    ],
    investmentHighlights: [
      "Premium Highway Facing Project",
      "Fastest Growing West Hyderabad Corridor",
      "Premium HMDA Open Plotting Community",
      "Excellent Investment Destination", "Modern Master Planning",
      "High Appreciation Potential",
    ],
    highlights: [
      "Premium Highway Facing Project",
      "Fastest Growing West Hyderabad Corridor",
      "Premium HMDA Open Plotting Community",
      "Excellent Investment Destination", "Modern Master Planning",
      "High Appreciation Potential",
    ],
    bankLoanAvailable: false,
    brochureUrl: "",
    image: "/images/projects/upcoming-shankarpally.svg",
    images: ["/images/projects/upcoming-shankarpally.svg"],
    whatsappCta: "Get Shankarpally Updates",
    projectArea: "To Be Announced",
    locationAdvantages: [
      "Highway Facing on Shankarpally – Nawabpet Highway",
      "Fastest Growing West Hyderabad Corridor",
      "Excellent Connectivity to ORR",
      "Proximity to upcoming infrastructure developments",
      "Emerging residential and investment hub",
    ],
    whyInvest: [
      "Premium location on Shankarpally – Nawabpet Highway",
      "West Hyderabad's fastest growing corridor",
      "HMDA approval under process with clear title",
      "Modern master-planned community",
      "Excellent long-term appreciation potential",
      "Ideal for investment and future home construction",
    ],
    updates: [
      {
        title: "HMDA Approval",
        description:
          "HMDA approval is under process.",
        status: "in-progress",
      },
      {
        title: "Launch",
        description: "Coming soon — register to receive updates.",
        status: "planned",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(currentSlug: string, count = 3): Project[] {
  return projects.filter((p) => p.slug !== currentSlug).slice(0, count);
}
