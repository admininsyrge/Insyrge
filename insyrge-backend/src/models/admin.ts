import mongoose, { Schema, Document, Model } from 'mongoose';
import * as Models from './index';
import * as DAO from '../DAO/index';

export interface IAdmin extends Document {
  name: string | null;
  image: string | null;
  email: string | null;
  password: string | null;
  otp: string | null;
  security_code: string | null;
  role: string;
  remember_me: boolean;
}

const AdminSchema: Schema<IAdmin> = new Schema(
  {
    name: { type: String, default: null },
    image: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    otp: { type: String, default: null },
    security_code: { type: String, default: null },
    role: { type: String, default: 'ADMIN' },
    remember_me: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ✅ Document middleware (this = document, so this._id works)
AdminSchema.pre('deleteOne', { document: true }, async function (next) {
  const adminId = this._id; // now works
  console.log('admin ID in models', adminId);

  await DAO.removeMany(Models.Sessions, { admin_id: adminId });
  next();
});

export const Admin: Model<IAdmin> = mongoose.model<IAdmin>('Admin', AdminSchema);
