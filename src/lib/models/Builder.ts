import mongoose, { Schema, Document } from "mongoose";

export interface IBuilder extends Document {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  website?: string;
  established?: string;
  projectCount: number;
  projectTypes?: string;
  highlights?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BuilderSchema = new Schema<IBuilder>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    logo: String,
    website: String,
    established: String,
    projectCount: { type: Number, default: 0 },
    projectTypes: String,
    highlights: [{ type: String }],
  },
  { timestamps: true }
);

export default (mongoose.models.Builder as mongoose.Model<IBuilder>) ||
  mongoose.model<IBuilder>("Builder", BuilderSchema);
