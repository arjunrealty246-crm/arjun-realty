import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  role?: string;
  location?: string;
  text: string;
  rating?: number;
  image?: string;
  project?: string;
  featured: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    role: String,
    location: String,
    text: { type: String, required: true },
    rating: { type: Number, default: 5 },
    image: String,
    project: String,
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default (mongoose.models.Testimonial as mongoose.Model<ITestimonial>) ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
