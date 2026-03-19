import { Schema, model, Document, Types } from "mongoose";

export interface IFeature {
  title: string;
  description: string;
}

export interface IBenefit {
  title: string;
  description: string;
}

export interface IExtension extends Document {
  slug: string;
  title: string;
  image: string;
  description: string;
  longDescription: string;
  link: string;
  features: IFeature[];
  benefits: IBenefit[];
  userGuide: Types.ObjectId;
  adminGuide: Types.ObjectId
  helpPage: Types.ObjectId
  caseStudy: Types.ObjectId
  overView: Types.ObjectId;
  termsAndConditions: Types.ObjectId;
  privacyPolicy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const featureSchema = new Schema<IFeature>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const benefitSchema = new Schema<IBenefit>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const extensionSchema = new Schema<IExtension>(
  {
    slug: {
      type: String,
      required: [true, "Slug is required!"],
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required!"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required!"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Short description is required!"],
      trim: true,
    },
    longDescription: {
      type: String,
      required: [true, "Long description is required!"],
      trim: true,
    },

    userGuide: { type: Schema.Types.ObjectId, ref: "UserGuide", default: null },
    overView: { type: Schema.Types.ObjectId, ref: "OverView", default: null },
    termsAndConditions: {
      type: Schema.Types.ObjectId,
      ref: "ExtensionTermsAndConditions",
      default: null
    },
    privacyPolicy: {
      type: Schema.Types.ObjectId,
      ref: "ExtensionPrivacyPolicy",
      default: null
    },
    adminGuide: { type: Schema.Types.ObjectId, ref: "AdminGuide", default: null },
    helpPage: { type: Schema.Types.ObjectId, ref: "HelpPage", default: null },
    caseStudy: { type: Schema.Types.ObjectId, ref: "CaseStudy", default: null },
    link: {
      type: String,
      required: [true, "Link is required!"],
      trim: true,
    },
    features: [featureSchema],
    benefits: [benefitSchema],
  },
  { timestamps: true }
);

export const Extension = model<IExtension>("Extension", extensionSchema);
