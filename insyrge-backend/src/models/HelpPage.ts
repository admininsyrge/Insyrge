import { Schema, model, Document, Types } from "mongoose";

export interface IHelpPage extends Document {
    extensionId: Types.ObjectId;
    title: string;
    content: string;
}

const helpPageSchema = new Schema<IHelpPage>(
    {
        extensionId: { type: Schema.Types.ObjectId, ref: "Extension", required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

export const HelpPage = model<IHelpPage>("HelpPage", helpPageSchema);
