import mongoose, { Schema, Document } from "mongoose";

export interface ISEO extends Document {
  page: string;
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SEOSchema = new Schema<ISEO>(
  {
    page: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: [{ type: String }],
    ogImage: String,
  },
  { timestamps: true }
);

export default (mongoose.models.SEO as mongoose.Model<ISEO>) ||
  mongoose.model<ISEO>("SEO", SEOSchema);
