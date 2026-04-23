import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  subTitle: string;
  description: string;
  shortDescription: string;
  author: string;
  category: string;
  image: IImage;
}
export interface IImage {
  url: string;
  public_id: string;
}

const imageSchema = new Schema<IImage>(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  { _id: false }
);

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subTitle: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String },
    author: { type: String },
    category: { type: String },
    image: { type: imageSchema, required: false },
  },
  { timestamps: true }
);

export const Blog = mongoose.model<IBlog>("Blog", blogSchema);
