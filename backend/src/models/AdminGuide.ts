import { Schema, model, Document, Types } from "mongoose";

export interface IAdminGuide extends Document {
    extensionId: Types.ObjectId;
    title: string;
    content: string;
}

const adminGuideSchema = new Schema<IAdminGuide>(
    {
        extensionId: { type: Schema.Types.ObjectId, ref: "Extension", required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

export const AdminGuide = model<IAdminGuide>("AdminGuide", adminGuideSchema);
