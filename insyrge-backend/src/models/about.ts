import { Schema, model, Document } from "mongoose";

// ────────────────────────────────
// Interfaces
// ────────────────────────────────

export interface IHero {
    title: string;
    description: string;
    button: string;
    image: string;
}

export interface IMissionVision {
    mission: {
        title: string;
        text: string;
    };
    vision: {
        title: string;
        text: string;
    };
}

export interface IWhyStart {
    title: string;
    text: string;
}

export interface ICoreValue {
    letter: string;
    title: string;
    text: string;
}

export interface ICoreValues {
    title: string;
    description: string;
    values: ICoreValue[];
}

export interface ICta {
    title: string;
    description: string;
    button: string;
}

export interface IAbout extends Document {
    hero: IHero;
    missionVision: IMissionVision;
    whyStart: IWhyStart;
    coreValues: ICoreValues;
    cta: ICta;
    createdAt?: Date;
    updatedAt?: Date;
}

// ────────────────────────────────
// Schemas
// ────────────────────────────────

const heroSchema = new Schema<IHero>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        button: { type: String, required: true, trim: true },
        image: { type: String, required: true, trim: true },
    },
    { _id: false }
);

const missionVisionSchema = new Schema<IMissionVision>(
    {
        mission: {
            title: { type: String, required: true, trim: true },
            text: { type: String, required: true, trim: true },
        },
        vision: {
            title: { type: String, required: true, trim: true },
            text: { type: String, required: true, trim: true },
        },
    },
    { _id: false }
);

const whyStartSchema = new Schema<IWhyStart>(
    {
        title: { type: String, required: true, trim: true },
        text: { type: String, required: true, trim: true },
    },
    { _id: false }
);

const coreValueSchema = new Schema<ICoreValue>(
    {
        letter: { type: String, required: true, trim: true },
        title: { type: String, required: true, trim: true },
        text: { type: String, required: true, trim: true },
    },
    { _id: false }
);

const coreValuesSchema = new Schema<ICoreValues>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        values: [coreValueSchema],
    },
    { _id: false }
);

const ctaSchema = new Schema<ICta>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        button: { type: String, required: true, trim: true },
    },
    { _id: false }
);

// ────────────────────────────────
// Main Schema
// ────────────────────────────────

const aboutSchema = new Schema<IAbout>(
    {
        hero: { type: heroSchema, required: true },
        missionVision: { type: missionVisionSchema, required: true },
        whyStart: { type: whyStartSchema, required: true },
        coreValues: { type: coreValuesSchema, required: true },
        cta: { type: ctaSchema, required: true },
    },
    { timestamps: true }
);

// ────────────────────────────────
// Export Model
// ────────────────────────────────

export const About = model<IAbout>("About", aboutSchema);
