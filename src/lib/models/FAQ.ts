import mongoose, { Schema, Document } from "mongoose";

export interface IFAQ extends Document {
  q: string;
  a: string;
  category?: string;
  project?: string;
  featured: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const FAQSchema = new Schema<IFAQ>(
  {
    q: { type: String, required: true },
    a: { type: String, required: true },
    category: String,
    project: String,
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default (mongoose.models.FAQ as mongoose.Model<IFAQ>) ||
  mongoose.model<IFAQ>("FAQ", FAQSchema);
