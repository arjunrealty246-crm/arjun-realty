import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  slug: string;
  name: string;
  builder: string;
  marketingPartner?: string;
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
  usps?: string[];
  units?: { type: string; count: string }[];
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
  faqs?: { q: string; a: string }[];
  testimonials?: { name: string; text: string }[];
  siteVisitBooking?: boolean;
  whatsappCta?: string;
  projectArea?: string;
  locationAdvantages: string[];
  whyInvest: string[];
  description?: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    builder: { type: String, required: true },
    marketingPartner: String,
    projectType: { type: String, required: true },
    approval: { type: String, required: true },
    location: { type: String, required: true },
    mapsUrl: { type: String, default: "" },
    price: { type: String, default: "" },
    launchPrice: String,
    currentPrice: String,
    startingPrice: { type: String, default: "" },
    status: { type: String, default: "Live" },
    badge: { type: String, default: "Live" },
    isUpcoming: { type: Boolean, default: false },
    totalAcres: String,
    totalPlots: String,
    plotSizes: { type: String, default: "" },
    villaInfo: String,
    clubhouseDetails: String,
    amenities: [{ type: String }],
    connectivity: [{ type: String }],
    nearbyLandmarks: [{ type: String }],
    investmentHighlights: [{ type: String }],
    highlights: [{ type: String }],
    usps: [{ type: String }],
    units: [{ type: { type: String }, count: String }],
    bankLoanAvailable: Boolean,
    brochureUrl: { type: String, default: "" },
    layoutPdfUrl: String,
    galleryImages: [{ type: String }],
    image: { type: String, default: "" },
    images: [{ type: String }],
    videos: [{ type: String }],
    videoUrl: String,
    droneVideoUrl: String,
    heroVideo: String,
    masterPlanUrl: String,
    locationMapUrl: String,
    faqs: [{ q: String, a: String }],
    testimonials: [{ name: String, text: String }],
    siteVisitBooking: Boolean,
    whatsappCta: String,
    projectArea: String,
    locationAdvantages: [{ type: String }],
    whyInvest: [{ type: String }],
    description: String,
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default (mongoose.models.Project as mongoose.Model<IProject>) ||
  mongoose.model<IProject>("Project", ProjectSchema);
