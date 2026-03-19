import { Schema, model, Document } from "mongoose";

export interface IProject extends Document {
  slug: string;
  title: string;
  category: string;
  client: string;
  image: string;
  description: string;
  features: string[];
  gallery: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const projectSchema = new Schema<IProject>(
  {
    slug: {
      type: String,
      required: [true, "Slug is required!"],
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required!"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required!"],
      trim: true,
    },
    client: {
      type: String,
      required: [true, "Client name is required!"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Project main image is required!"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
      trim: true,
    },
    features: [
      {
        type: String,
        required: true,
      },
    ],
    gallery: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const Project = model<IProject>("Project", projectSchema);
