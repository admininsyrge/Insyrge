import { Schema, model, Document } from "mongoose";

export interface IPrivacy extends Document {
    content: string;
    updatedAt: Date;
}

const PrivacySchema = new Schema<IPrivacy>(
    {
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Privacy = model<IPrivacy>("Privacy", PrivacySchema);
