import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  phone: string;
  email: string;
  address?: string;
  whatsapp?: string;
  workingHours?: string;
  mapUrl?: string;
  socialLinks?: { label: string; url: string }[];
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: String,
    whatsapp: String,
    workingHours: String,
    mapUrl: String,
    socialLinks: [{ label: String, url: String }],
  },
  { timestamps: true }
);

export default (mongoose.models.Contact as mongoose.Model<IContact>) ||
  mongoose.model<IContact>("Contact", ContactSchema);
