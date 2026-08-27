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
  type?: "image" | "video";
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
  seoTitle?: string;
  tagline?: string;
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
    projectType: "Premium Luxurious Semi-Villa Community Project",
    approval: "FCDA Approved",
    location: "Thummaloor, Future City Growth Corridor, Hyderabad",
    description: "JB Harmony Woods is a 53-acre FCDA approved premium luxurious semi-villa community project located in the Future City growth corridor off Srisailam Highway, Hyderabad. The gated community offers 524 villa plots ranging from 200 to 600 Sq. Yards and 50 boutique villas from 1,800 to 2,400 Sq. Ft., served by a 36,000 Sq. Ft. grand clubhouse with 30+ lifestyle amenities. The entire layout is engineered with advanced MEP (Mechanical, Electrical & Plumbing) infrastructure — featuring 100% underground cabling, dedicated ducting and streamlined utility lines — ensuring zero-disruption maintenance and rapid issue resolution without digging or layout damage in the future. Positioned just 2 minutes from Srisailam Highway and 15 minutes from Rajiv Gandhi International Airport, the project is surrounded by Future City, AI City, Foxconn, and Kaynes Technology — making it a strong proposition for both end-use and investment.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Thummaloor%2C%20Hyderabad",
    price: "Contact for Price",
    launchPrice: "Contact for Price",
    startingPrice: "₹25,000 / Sq. Yd.",
    status: "Live",
    badge: "Bookings Open",
    isUpcoming: false,
    usps: [
      "One of the first FCDA Approved premium villa plotting projects in the Future City growth corridor",
      "Premium Luxurious Semi-Villa Community Project",
      "53 Acres of premium living space",
      "524 premium villa plots with 50 boutique villas",
      "36,000 Sq. Ft. Grand Clubhouse with 30+ world-class amenities",
      "Advanced MEP Infrastructure – 100% underground cabling, dedicated ducting & streamlined utility lines",
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
      "Advanced MEP Infrastructure – 100% underground cabling, dedicated ducting & streamlined utility lines for zero-disruption maintenance without digging or layout damage",
      "Bank Loan Available for hassle-free investment",
      "Transparent pricing with clear title and legal compliance",
    ],
    highlights: [
      "FCDA Approved – one of the first projects in the corridor",
      "Premium Luxurious Semi-Villa Community Project",
      "Advanced MEP Infrastructure – 100% underground cabling, dedicated ducting & streamlined utility lines for zero-disruption maintenance without digging",
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
      "Premium Luxurious Semi-Villa Community Project",
      "524 premium villa plots & 50 limited edition boutique villas",
      "Unbeatable location: 2 min to Srisailam Highway, 8 min to ORR, 15 min to Airport",
      "Proximity to Future City, AI City, Foxconn, and Kaynes Technology",
      "Advanced MEP Infrastructure – 100% underground cabling, dedicated ducting & streamlined utility lines for zero-disruption maintenance without digging",
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
    description: "JB Hillside County is a 30-acre HMDA and RERA approved premium villa plotting community located directly on Sagar Highway, Hyderabad. The gated development offers 80 villa plots ranging from 228 to 800 Sq. Yards, served by a 15,000+ Sq. Ft. grand clubhouse with 20+ lifestyle amenities. Situated close to defence establishments including BDL, BEL, OCTOPUS Training Centre, and NSG Campus, the project benefits from strong institutional infrastructure and excellent connectivity to Hyderabad city via Sagar Highway.",
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
    faqs: [
      { q: "What is the total area of JB Hillside County?", a: "JB Hillside County spans 30 acres and offers 80 premium villa plots ranging from 228 to 800 Sq. Yards." },
      { q: "Is JB Hillside County approved?", a: "Yes, the project is HMDA Approved and RERA Registered with clear legal title." },
      { q: "What are the available plot sizes?", a: "Plots are available in 228, 267, 300, 400, 500, 600, and 800 Sq. Yards." },
      { q: "Is bank loan available?", a: "Yes, bank loan facility is available through leading financial institutions." },
      { q: "Where is the project located?", a: "JB Hillside County is located on Sagar Highway, close to BDL, BEL, OCTOPUS Training Centre, and NSG Campus in Hyderabad." },
      { q: "What amenities does the project offer?", a: "The project features a 15,000+ Sq. Ft. grand clubhouse with 20+ amenities including indoor games, multipurpose hall, jogging track, children's play area, CCTV surveillance, and 24x7 security." },
    ],
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
    description: "JB Serene County is an HMDA and TSRERA approved premium residential plotting project located near Kongarakalan along the Tata Greenfield Growth Corridor, just 1 KM from Patancheru. The layout offers plots ranging from 150 to 300 Sq. Yards with modern infrastructure including underground electricity, drainage, LED street lighting, and landscaped parks. Positioned close to ORR Exit No. 13 and 15 minutes from Rajiv Gandhi International Airport, the project is surrounded by major industrial anchors including Foxconn and Kaynes Technology.",
    mapsUrl: "https://maps.app.goo.gl/4pq5tv78XEe8BgQ29?g_st=ac",
    price: "Contact for Latest Price",
    startingPrice: "₹35,000 / Sq. Yd.",
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
    faqs: [
      { q: "Is JB Serene County approved?", a: "Yes, JB Serene County is HMDA Approved and TSRERA Registered with clear and secure title." },
      { q: "What are the available plot sizes?", a: "Plots are available in 150, 167, 183, 200, 250, and 300 Sq. Yards." },
      { q: "Where is the project located?", a: "The project is located near Kongarakalan along the Tata Greenfield Growth Corridor, just 1 KM from Patancheru and close to ORR Exit No. 13." },
      { q: "How far is the airport?", a: "Rajiv Gandhi International Airport is approximately 15 minutes from the project." },
      { q: "Is bank loan available?", a: "Yes, bank loan facility is available through leading financial institutions." },
      { q: "What industries are nearby?", a: "The project is close to Foxconn Manufacturing Plant and Kaynes Technology Manufacturing Unit, both major employment anchors in the corridor." },
    ],
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
    projectType: "150-Acre Mega DTCP & RERA Approved Community",
    approval: "DTCP & RERA Approved",
    location: "Vikarabad, Telangana",
    seoTitle: "JB Pristine City | 150-Acre Mega Venture in West Hyderabad",
    tagline: "The Next High-Growth Destination of West Hyderabad | 150-Acre Mega DTCP & RERA Approved Community",
    description: "JB Pristine City is a 150-acre mega master-planned DTCP & RERA approved gated layout situated in the fast-appreciating growth corridor of Vikarabad, West Hyderabad. Positioned within the high-growth West Hyderabad Investment Corridor, the project enjoys seamless road connectivity from major IT & financial hubs including Kokapet, Neopolis, Gachibowli, Nanakramguda, Gandipet, Mokila and Shankarpally via the four-lane expressway from ORR Exit No. 18. It also stands to benefit from the Central and State Government proposed High-Speed Rail / Bullet Train corridor, with a confirmed major station at Vikarabad promising rapid travel times to Hyderabad and exponential land value appreciation. The venture features a 150-acre gated layout with grand entrance arch, wide BT roads, underground utilities, clear titles and an immediate bank loan facility — making it an exceptional high-ROI opportunity for smart tech professionals and long-term investors.",
    mapsUrl: "https://maps.app.goo.gl/QPHZ7D8uQdS2nvyh7",
    price: "Contact for Latest Price",
    startingPrice: "₹13,999 / Sq. Yd.",
    status: "Pre-Launch",
    badge: "Pre-Launch",
    isUpcoming: false,
    totalAcres: "150",
    plotSizes: "150, 165, 183, 200, 220, 300, 400, 500, 600 Sq. Yards",
    amenities: [
      "Grand Entrance Arch", "Wide Black Top Roads", "Avenue Plantation",
      "Landscaped Parks", "Children's Play Area", "Walking & Jogging Track",
      "Underground Drainage", "Underground Electricity", "Water Supply Network",
      "LED Street Lighting", "CCTV Surveillance", "24×7 Security",
      "Compound Wall", "Rainwater Harvesting", "Open Green Spaces",
    ],
    connectivity: [
      "Seamless road connectivity from Kokapet, Neopolis, Gachibowli, Nanakramguda, Gandipet, Mokila & Shankarpally",
      "Proposed High-Speed Rail / Bullet Train with Confirmed Major Station at Vikarabad",
      "Just 2 KM from Vikarabad Railway Station",
      "Just 3.5 KM from Regional Ring Road (RRR)",
      "Near Four-Lane Expressway from ORR Exit No.18",
    ],
    nearbyLandmarks: [
      "Ananthagiri Hills", "Anantha Padmanabha Swamy Temple",
      "Kotepally Reservoir",
    ],
    usps: [
      "150-Acre Mega Master-Planned DTCP & RERA Approved Gated Venture",
      "High-Growth West Hyderabad Investment Corridor — seamless connectivity from Kokapet, Neopolis, Gachibowli, Nanakramguda, Gandipet, Mokila & Shankarpally",
      "Central & State Government Proposed High-Speed Rail / Bullet Train with Confirmed Major Station at Vikarabad",
      "Clear Titles & Immediate Bank Loan Facility",
      "Grand Entrance Arch, Wide BT Roads & Underground Utilities",
      "High-ROI Venture for Smart Tech Professionals & Long-Term Investors",
    ],
    investmentHighlights: [
      "150-Acre Mega Master-Planned DTCP & RERA Approved Gated Layout",
      "Clear Titles with Immediate Bank Loan Facility",
      "High-ROI Potential along West Hyderabad's Fastest-Appreciating Corridor",
      "Proposed Bullet Train Connectivity with Confirmed Major Vikarabad Station",
      "Rapid Connectivity from Kokapet, Neopolis, Gachibowli, Nanakramguda, Gandipet, Mokila & Shankarpally",
      "Ideal for Smart Tech Professionals & Long-Term Investors",
    ],
    highlights: [
      "150-Acre Mega Master-Planned DTCP & RERA Approved Community",
      "West Hyderabad Investment Corridor — Connected to Kokapet, Neopolis, Gachibowli, Nanakramguda, Gandipet, Mokila & Shankarpally",
      "Proposed High-Speed Rail / Bullet Train with Confirmed Major Station at Vikarabad",
      "Grand Entrance Arch, Wide BT Roads & Underground Utilities",
      "Clear Titles & Immediate Bank Loan Facility",
      "Fast-Appreciating Growth Corridor of Vikarabad",
      "High-ROI Opportunity for Smart Tech Professionals & Long-Term Investors",
    ],
    bankLoanAvailable: true,
    brochureUrl: "",
    image: "/images/projects/jb-pristine-city.svg",
    images: ["/images/projects/jb-pristine-city.svg"],
    faqs: [
      { q: "What is the total area of JB Pristine City?", a: "JB Pristine City is a 150-acre mega master-planned gated layout in Vikarabad, West Hyderabad." },
      { q: "What is the approval status?", a: "The project is a DTCP & RERA approved community with clear titles." },
      { q: "What are the available plot sizes?", a: "Plots are available in 150, 165, 183, 200, 220, 300, 400, 500, and 600 Sq. Yards." },
      { q: "What is the starting price?", a: "Plots start from ₹13,999 per Sq. Yard." },
      { q: "How is JB Pristine City connected to Hyderabad?", a: "It enjoys seamless road connectivity from major IT & financial hubs including Kokapet, Neopolis, Gachibowli, Nanakramguda, Gandipet, Mokila and Shankarpally via the four-lane expressway from ORR Exit No. 18." },
      { q: "What about the proposed Bullet Train?", a: "The Central and State Government proposed High-Speed Rail / Bullet Train corridor includes a confirmed major station at Vikarabad, promising rapid travel times to Hyderabad and strong land value appreciation." },
      { q: "Is bank loan available?", a: "Yes, immediate bank loan facility is available through leading financial institutions." },
    ],
    whatsappCta: "Get Pristine City Details",
    projectArea: "150-Acre Mega Gated Venture",
    locationAdvantages: [
      "Seamless connectivity from major IT & financial hubs — Kokapet, Neopolis, Gachibowli, Nanakramguda, Gandipet, Mokila & Shankarpally",
      "Proposed High-Speed Rail / Bullet Train with Confirmed Major Station at Vikarabad",
      "Just 2 KM from Vikarabad Railway Station",
      "Just 2.5 KM from Vikarabad Town",
      "Just 3.5 KM from Regional Ring Road (RRR)",
      "Close to Ananthagiri Hills",
      "Near Anantha Padmanabha Swamy Temple",
      "Close to Kotepally Reservoir",
      "Near Four-Lane Expressway from ORR Exit No.18 (Appa Junction) to Vikarabad",
    ],
    whyInvest: [
      "West Hyderabad's fastest-appreciating corridor with easy access to leading IT & financial hubs",
      "Proposed High-Speed Rail / Bullet Train with confirmed major station at Vikarabad — rapid travel times to Hyderabad",
      "150-acre master-planned DTCP & RERA approved layout with clear titles and bank loan facility",
      "High-ROI potential powered by smart tech professionals and long-term investor demand",
    ],
    updates: [
      {
        title: "DTCP & RERA Approvals",
        description: "The project is an approved 150-acre mega master-planned community with clear titles.",
        status: "completed",
      },
      {
        title: "Launch",
        description: "Pre-launch stage — details available on request.",
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
    description: "JB Serene City is a 660-acre HMDA and RERA approved premium integrated gated township located in Ibrahimpatnam, Hyderabad. One of the largest townships in South Hyderabad, it features a 5-acre grand clubhouse, 30+ world-class amenities, and over 100 families already residing in the community. Positioned on the highway with excellent connectivity to ORR, the airport, and Hyderabad's IT corridor, the township is surrounded by major government institutions including BDL, BEL, NSG Campus, and OCTOPUS Training Centre.",
    mapsUrl: "https://maps.app.goo.gl/HGnvd4xkmKnmEbkC7",
    price: "Contact for Latest Price",
    startingPrice: "₹14,000 / Sq. Yd.",
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
    faqs: [
      { q: "What is the total area of JB Serene City?", a: "JB Serene City is a 660-acre premium integrated township, one of the largest in South Hyderabad." },
      { q: "Is the project approved?", a: "Yes, JB Serene City is HMDA Approved and RERA Registered." },
      { q: "Are families already living there?", a: "Yes, over 100 families are already residing in the township." },
      { q: "What amenities does the township offer?", a: "The township features a 5-acre grand clubhouse, swimming pool, gymnasium, indoor games, jogging track, cycling track, yoga zone, landscaped gardens, and 30+ world-class amenities." },
      { q: "Is bank loan available?", a: "Yes, bank loan facility is available through leading financial institutions." },
      { q: "Where is the project located?", a: "The project is located in Ibrahimpatnam, Hyderabad, on the highway with excellent connectivity to ORR, airport, and the IT corridor." },
    ],
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
    description: "JB Nature Valley is a 720+ acre DTCP and RERA approved integrated satellite township located on NH-65 Hyderabad–Vijayawada Highway at Choutuppal, Telangana. One of Telangana's largest planned townships, it offers plots from 167 to 800 Sq. Yards at starting prices of ₹8,500 per Sq. Yard, served by two grand clubhouses, a 5-acre international cricket ground, and 40+ lifestyle amenities. Positioned on the six-lane NH-65 expansion corridor and close to the proposed Regional Ring Road (RRR), the project is surrounded by the Dry Port, MSME Industrial Cluster, and Logistics Hub.",
    mapsUrl: "https://maps.app.goo.gl/zeNriVXsD7KwSPSD9",
    price: "Contact for Latest Price",
    startingPrice: "₹8,500 / Sq. Yd.",
    status: "Live",
    badge: "Live",
    isUpcoming: false,
    totalAcres: "720+",
    plotSizes: "167 Sq. Yds, 200 Sq. Yds, 220 Sq. Yds, 250 Sq. Yds, 300 Sq. Yds, 333 Sq. Yds, 400 Sq. Yds, 467 Sq. Yds, 500 Sq. Yds, 600 Sq. Yds, 800 Sq. Yds",
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
    faqs: [
      { q: "What is the total area of JB Nature Valley?", a: "JB Nature Valley is a 720+ acre integrated satellite township, one of the largest in Telangana." },
      { q: "Is the project approved?", a: "Yes, JB Nature Valley is DTCP Approved and RERA Registered with clear legal title." },
      { q: "What is the starting price?", a: "Plots start from ₹8,500 per Sq. Yard." },
      { q: "What are the available plot sizes?", a: "Plots are available from 167 to 800 Sq. Yards across multiple size options." },
      { q: "What amenities does the township offer?", a: "The township features two grand clubhouses, a 5-acre international cricket ground, swimming pool, gymnasium, indoor and outdoor sports courts, 40+ lifestyle amenities, and premium infrastructure." },
      { q: "Where is the project located?", a: "The project is located on NH-65 Hyderabad–Vijayawada Highway at Choutuppal, close to the proposed Regional Ring Road (RRR), Dry Port, and MSME Industrial Cluster." },
    ],
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
    description: "An upcoming 90-acre premium gated villa community in Ibrahimpatnam, Hyderabad. The project is positioned very close to Sagar Highway and the Kongara Kalan growth corridor, with proximity to Adibatla Aerospace SEZ, TCS Adibatla Campus, and Foxconn Manufacturing Facility. Approval process is currently underway — register to receive launch updates.",
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
    faqs: [
      { q: "What is the total area of the upcoming Ibrahimpatnam project?", a: "The upcoming project spans 90 acres and is planned as a premium gated villa community." },
      { q: "What is the approval status?", a: "The approval process is currently underway. Register to receive launch updates." },
      { q: "Where is the project located?", a: "The project is located in Ibrahimpatnam, Hyderabad, very close to Sagar Highway and the Kongara Kalan growth corridor." },
      { q: "What nearby landmarks are there?", a: "The project is near Adibatla Aerospace SEZ, TCS Adibatla Campus, Foxconn Manufacturing Facility, Rangareddy District Collectorate, and Guru Nanak Institutions." },
      { q: "When will the project launch?", a: "The project is in the pre-approval stage. Register with us to receive timely launch updates." },
    ],
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
    description: "An upcoming 200-acre premium highway-facing gated residential township on Srisailam Highway, Hyderabad. The project is planned as a large-scale integrated township with premium infrastructure and modern master planning. DTCP and RERA approvals are currently under process — register to receive launch updates and pre-launch benefits.",
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
    faqs: [
      { q: "What is the total area of the upcoming Srisailam Highway project?", a: "The upcoming project spans 200 acres and is planned as a premium highway-facing gated residential township." },
      { q: "What is the approval status?", a: "DTCP and RERA approvals are currently under process." },
      { q: "Where is the project located?", a: "The project is located on Srisailam Highway, Hyderabad, with highway-facing frontage." },
      { q: "When will the project launch?", a: "The project is in the pre-approval stage. Register with us to receive launch updates and pre-launch benefits." },
    ],
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
    description: "An upcoming 108-acre premium HMDA open plotting community located approximately 10 minutes from Shankarpally on the Shankarpally–Nawabpet Highway in West Hyderabad's fastest-growing corridor. The project offers a highway-facing position with excellent connectivity to ORR and proximity to upcoming infrastructure developments. HMDA approval is currently under process — register for pre-launch updates.",
    mapsUrl: "",
    price: "₹25,000 / Sq. Yd.",
    startingPrice: "₹25,000 / Sq. Yd.",
    status: "Pre-Launch",
    badge: "Pre-Launch",
    isUpcoming: true,
    totalAcres: "108",
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
      "Early-Stage Investment Opportunity", "Modern Master Planning",
      "Early-Stage Growth Potential",
    ],
    highlights: [
      "Premium Highway Facing Project",
      "Fastest Growing West Hyderabad Corridor",
      "Premium HMDA Open Plotting Community",
      "Early-Stage Investment Opportunity", "Modern Master Planning",
      "Early-Stage Growth Potential",
    ],
    bankLoanAvailable: false,
    brochureUrl: "",
    image: "/images/projects/upcoming-shankarpally.svg",
    images: ["/images/projects/upcoming-shankarpally.svg"],
    faqs: [
      { q: "What is the approval status of the Shankarpally project?", a: "HMDA approval is currently under process — this is a pre-launch investment opportunity with a starting price of ₹25,000 per sq. yard. Register for pre-launch updates to stay informed." },
      { q: "Where is the project located?", a: "The 108-acre project is located approximately 10 minutes from Shankarpally on the Shankarpally–Nawabpet Highway in West Hyderabad's fastest-growing corridor." },
      { q: "What is special about this location?", a: "The project is highway-facing with excellent connectivity to ORR and is in West Hyderabad's fastest-growing residential and investment corridor." },
      { q: "When will the project launch?", a: "HMDA approval is currently under process, following submission of the application. Register with us to receive timely pre-launch updates." },
    ],
    whatsappCta: "Get Shankarpally Updates",
    projectArea: "108 Acres",
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
      "Early-stage investment potential with room for long-term value creation",
      "Ideal for early investment and future home construction",
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
