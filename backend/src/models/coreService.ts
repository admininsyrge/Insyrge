import { Schema, model, Document } from "mongoose";

export interface ICoreService extends Document {
    title: string;
    description: string;
    slug: string
    points: string[];
    button: string;
    image: IImage;
    url: string;
    createdAt?: Date;
    updatedAt?: Date;
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

const coreServiceSchema = new Schema<ICoreService>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        slug: { type: String, required: true, trim: true, unique: true },
        url: { type: String, required: true, trim: true },
        points: [{ type: String, required: true }],
        button: { type: String, required: true, trim: true },
        image: { type: imageSchema, required: true, trim: true },
    },
    { timestamps: true }
);

export const CoreService = model<ICoreService>("CoreService", coreServiceSchema);
