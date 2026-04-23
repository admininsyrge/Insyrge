import mongoose, { Schema, Document, Model } from 'mongoose';

const types = ['SUCCESS', 'ERROR'] as const;

// 1. Interface
export interface IResMessages extends Document {
  type: typeof types[number];
  message_type?: string | null;
  status_code: number;
  msg_in_english?: string | null;
  status: boolean;
  code: number;
  created_at: string;
}

// 2. Schema
const ResMessagesSchema: Schema<IResMessages> = new Schema(
  {
    type: { type: String, enum: types, required: true },
    message_type: { type: String, default: null },
    status_code: { type: Number, default: 0 },
    msg_in_english: { type: String, default: null },
    status: { type: Boolean, default: false },
    code: { type: Number, default: 400 },
    created_at: { type: String, default: () => `${Date.now()}` }
  },
  { timestamps: false }
);

// 3. Model
export const ResMessages: Model<IResMessages> = mongoose.model<IResMessages>(
  'ResMessages',
  ResMessagesSchema
);
