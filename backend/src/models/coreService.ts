import { Schema, model, Document } from "mongoose";

export interface ICoreService extends Document {
    title: string;
    description: string;
    slug: string
    points: string[];
    button: string;
    image: string;
    url: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const coreServiceSchema = new Schema<ICoreService>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        slug: { type: String, required: true, trim: true, unique: true },
        url: { type: String, required: true, trim: true },
        points: [{ type: String, required: true }],
        button: { type: String, required: true, trim: true },
        image: { type: String, required: true, trim: true },
    },
    { timestamps: true }
);

export const CoreService = model<ICoreService>("CoreService", coreServiceSchema);
