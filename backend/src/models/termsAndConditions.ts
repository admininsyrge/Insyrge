import { Schema, model, Document } from "mongoose";

export interface ITerms extends Document {
    content: string;
    updatedAt: Date;
}

const TermsSchema = new Schema<ITerms>(
    {
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Terms = model<ITerms>("Terms", TermsSchema);
