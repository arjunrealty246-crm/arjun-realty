import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryItem extends Document {
  title: string;
  image: string;
  category: string;
  project?: string;
  featured: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, default: "general" },
    project: String,
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default (mongoose.models.GalleryItem as mongoose.Model<IGalleryItem>) ||
  mongoose.model<IGalleryItem>("GalleryItem", GalleryItemSchema);
