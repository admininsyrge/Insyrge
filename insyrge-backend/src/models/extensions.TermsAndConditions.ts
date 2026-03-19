import { Schema, model, Document, Types } from "mongoose";

export interface IExtensionTermsAndConditions extends Document {
    extensionId: Types.ObjectId;
    title: string;
    content: string;
}

const tacExtensionSchema = new Schema<IExtensionTermsAndConditions>(
    {
        extensionId: { type: Schema.Types.ObjectId, ref: "Extension", required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

export const ExtensionTermsAndConditions = model<IExtensionTermsAndConditions>(
    "ExtensionTermsAndConditions",
    tacExtensionSchema
);
