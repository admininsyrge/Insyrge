import { Schema, model, Document } from "mongoose";

// 🧩 Interfaces
export interface ISlider {
    image: string;
}

export interface IPartnerLogo {
    image: string;
}

export interface IContentItem {
    icon: string;
    title: string;
    desc: string;
}

export interface ICaseStudy {
    title: string;
    category: string;
    image: string;
}

export interface IContactInfo {
    title: string;
    highlights: string[];
}

export interface IHome extends Document {
    hero: {
        title: string;
        subtitle: string;
        buttonText: string;
        sliderImages: ISlider[];
    };
    
    partners: IPartnerLogo[];
    contentHighlights: IContentItem[];
    caseStudies: ICaseStudy[];
    contact: IContactInfo;
    createdAt?: Date;
    updatedAt?: Date;
}

// 🧱 Sub-Schemas
const sliderSchema = new Schema<ISlider>(
    {
        image: { type: String, required: true, trim: true },
    },
    { _id: false }
);

const partnerSchema = new Schema<IPartnerLogo>(
    {
        image: { type: String, required: true, trim: true },
    },
    { _id: false }
);

const contentSchema = new Schema<IContentItem>(
    {
        icon: { type: String, required: true, trim: true },
        title: { type: String, required: true, trim: true },
        desc: { type: String, required: true, trim: true },
    },
    { _id: false }
);

const contactSchema = new Schema<IContactInfo>(
    {
        title: { type: String, required: true, trim: true },
        highlights: [{ type: String, required: true }],
    },
    { _id: false }
);

// 🏗️ Main Schema
const homeSchema = new Schema<IHome>(
    {
        hero: {
            title: { type: String, required: true },
            subtitle: { type: String, required: true },
            buttonText: { type: String, required: true },
            sliderImages: [sliderSchema],
        },
        partners: [partnerSchema],
        contentHighlights: [contentSchema],
        contact: contactSchema,
    },
    { timestamps: true }
);

// ✅ Export Model
export const Home = model<IHome>("Home", homeSchema);
