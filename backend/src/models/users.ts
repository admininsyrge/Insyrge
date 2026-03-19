import mongoose, { Schema, Document, Model } from 'mongoose';
import * as Models from './index';
import * as DAO from '../DAO/index';

export interface IUsers extends Document {
  name: string;
  email: string;
  password: string;
  company?: string;
  reasonForInterest?: string;
  interestedProjects?: mongoose.Types.ObjectId[];
  approved: boolean;
  active: boolean;
  role: string;
  // otp?: string;
  security_code?: string;
}

const UserSchema: Schema<IUsers> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: [5, 'Email must have at least 5 characters!'],
      lowercase: true,
    },
    active: { type: Boolean, default: true },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    reasonForInterest: {
      type: String,
      trim: true,
    },
    interestedProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
    security_code: { type: String, default: null },
    approved: {
      type: Boolean,
      default: false,
    },
    role: { type: String, default: 'INVESTOR' },
    // otp: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
  }
);

// 3. Document middleware example
UserSchema.pre('deleteOne', { document: true }, async function (next) {
  const userId = this._id;
  console.log('user ID in models', userId);

  await DAO.removeMany(Models.Sessions, { user_id: userId });
  next();
});

// 4. Model
export const User: Model<IUsers> = mongoose.model<IUsers>('User', UserSchema);
