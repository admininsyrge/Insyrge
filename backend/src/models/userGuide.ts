import { Schema, model, Document, Types } from "mongoose";

export interface IUserGuide extends Document {
    extensionId: Types.ObjectId;
    title: string;
    content: string;
}

const userGuideSchema = new Schema<IUserGuide>(
    {
        extensionId: { type: Schema.Types.ObjectId, ref: "Extension", required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

export const UserGuide = model<IUserGuide>("UserGuide", userGuideSchema);
