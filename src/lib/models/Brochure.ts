import mongoose, { Schema, Document } from "mongoose";

export interface IBrochure extends Document {
  title: string;
  file: string;
  project?: string;
  type: string;
  size?: string;
  downloads: number;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const BrochureSchema = new Schema<IBrochure>(
  {
    title: { type: String, required: true },
    file: { type: String, required: true },
    project: String,
    type: { type: String, default: "brochure" },
    size: String,
    downloads: { type: Number, default: 0 },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default (mongoose.models.Brochure as mongoose.Model<IBrochure>) ||
  mongoose.model<IBrochure>("Brochure", BrochureSchema);
