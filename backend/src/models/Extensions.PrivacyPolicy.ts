import { Schema, model, Document, Types } from "mongoose";

export interface IExtensionPrivacyPolicy extends Document {
    extensionId: Types.ObjectId;
    title: string;
    content: string;
}

const extensionPrivacySchema = new Schema<IExtensionPrivacyPolicy>(
    {
        extensionId: { type: Schema.Types.ObjectId, ref: "Extension", required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

export const ExtensionPrivacyPolicy = model<IExtensionPrivacyPolicy>(
    "ExtensionPrivacyPolicy",
    extensionPrivacySchema
);
