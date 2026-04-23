import { Schema, model, Document, Types } from "mongoose";

export interface IOverView extends Document {
    extensionId: Types.ObjectId;
    title: string;
    content: string;
}

const overviewSchema = new Schema<IOverView>(
    {
        extensionId: { type: Schema.Types.ObjectId, ref: "Extension", required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

export const OverView = model<IOverView>("OverView", overviewSchema);
