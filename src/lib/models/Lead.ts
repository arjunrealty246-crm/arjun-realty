import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {
  name: string;
  mobile: string;
  whatsapp?: string;
  email?: string;
  project?: string;
  source: string;
  leadType?: string;
  message?: string;
  preferredDate?: string;
  preferredTime?: string;
  country?: string;
  investmentBudget?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true, index: true },
    whatsapp: String,
    email: { type: String, trim: true, lowercase: true },
    project: String,
    source: { type: String, required: true },
    leadType: String,
    message: String,
    preferredDate: String,
    preferredTime: String,
    country: String,
    investmentBudget: String,
  },
  { timestamps: true }
);

LeadSchema.index({ mobile: 1, source: 1, project: 1, createdAt: -1 });

export default (mongoose.models.Lead as mongoose.Model<ILead>) ||
  mongoose.model<ILead>("Lead", LeadSchema);
