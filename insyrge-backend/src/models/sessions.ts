import mongoose, { Schema, Document, Model } from 'mongoose';

const types = [null, 'USER', 'ADMIN'] as const;
const deviceTypes = [null, 'iOS', 'Android'] as const;

// 1. Interface
export interface ISession extends Document {
  type: typeof types[number];
  admin_id?: mongoose.Types.ObjectId | null;
  user_id?: mongoose.Types.ObjectId | null;
  service_provider_id?: mongoose.Types.ObjectId | null;
  access_token?: string | null;
  device_type: typeof deviceTypes[number];
  fcm_token?: string | null;
  token_gen_at?: string | null;
  expire_time?: string | null;
  created_at: string;
}

// 2. Schema
const SessionsSchema: Schema<ISession> = new Schema(
  {
    type: { type: String, enum: types, default: null },
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', default: null },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    service_provider_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', default: null },
    access_token: { type: String, default: null },
    device_type: { type: String, enum: deviceTypes, default: null },
    fcm_token: { type: String, default: null },
    token_gen_at: { type: String, default: null },
    expire_time: { type: String, default: null },
    created_at: { type: String, default: () => `${Date.now()}` }
  },
  { timestamps: false }
);

// 3. Model
export const Sessions: Model<ISession> = mongoose.model<ISession>('Sessions', SessionsSchema);
