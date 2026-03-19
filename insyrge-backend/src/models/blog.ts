import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  subTitle: string;
  description: string;
  shortDescription: string;
  author: string;
  category: string;
  image: string;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subTitle: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String },
    author: { type: String },
    category: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export const Blog = mongoose.model<IBlog>("Blog", blogSchema);
