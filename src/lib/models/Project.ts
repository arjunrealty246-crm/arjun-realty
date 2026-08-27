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
  seoTitle?: string;
  tagline?: string;
  phases?: {
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
    documents?: { name: string; url: string; type?: string; description?: string }[];
  }[];
  documents?: { name: string; url: string; type?: string; description?: string }[];
  updates?: { title: string; description?: string; status: "completed" | "in-progress" | "planned" }[];
  layoutUrl?: string;
  locationUrl?: string;
  gallery?: { src: string; title?: string; category?: string; type?: string }[];
  developmentUpdates?: { date?: string; title: string; description?: string; images?: string[] }[];
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
    seoTitle: String,
    tagline: String,
    phases: [
      {
        name: String,
        status: String,
        description: String,
        details: [{ label: String, value: String }],
        highlights: [{ type: String }],
        photos: [{ type: String }],
        videos: [{ type: String }],
        masterPlanUrl: String,
        layoutUrl: String,
        layoutPdfUrl: String,
        brochureUrl: String,
        documents: [{ name: String, url: String, type: { type: String }, description: String }],
      },
    ],
    documents: [{ name: String, url: String, type: { type: String }, description: String }],
    updates: [{ title: String, description: String, status: String }],
    layoutUrl: String,
    locationUrl: String,
    gallery: [{ src: String, title: String, category: String, type: { type: String, default: "image" } }],
    developmentUpdates: [{ date: String, title: String, description: String, images: [String] }],
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default (mongoose.models.Project as mongoose.Model<IProject>) ||
  mongoose.model<IProject>("Project", ProjectSchema);
