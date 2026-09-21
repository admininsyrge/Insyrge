import React from "react";
import { AboutHero } from "@/components/about/AboutHero";
import { aboutData } from "@/data/aboutData";
import { MissionVision } from "@/components/about/MissionVision";
import { WhyStart } from "@/components/about/WhyStart";
import { CoreValues } from "@/components/about/CoreValues";
import { CTASection } from "@/components/about/CTASection";
import StructuredData from "@/components/seo/StructuredData";

export const metadata = {
  title: "About Us — Global IT Consulting & Digital Engineering",
  description:
    "Learn about Insyrge — our leadership, technology philosophy, and dedication to delivering enterprise IT consulting, custom software development, and cloud solutions.",
  alternates: {
    canonical: "https://insyrge.com/about",
  },
  openGraph: {
    title: "About Us — Global IT Consulting & Digital Engineering | Insyrge",
    description:
      "Learn about Insyrge — our leadership, technology philosophy, and dedication to delivering enterprise IT consulting, custom software development, and cloud solutions.",
    url: "https://insyrge.com/about",
    siteName: "Insyrge",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "About Insyrge - IT Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Insyrge IT Consulting",
    description:
      "Learn more about Insyrge — our mission, leadership, and commitment to delivering elite enterprise IT consultancy.",
    images: ["/logo.png"],
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Insyrge",
  url: "https://insyrge.com/about",
  mainEntity: {
    "@type": "Organization",
    name: "Insyrge",
    url: "https://insyrge.com",
    logo: "https://insyrge.com/logo.png",
    description:
      "Insyrge is a premier Zoho Consulting and Cloud Automation agency empowering businesses through tailored technology solutions.",
  },
};

export default function AboutPage() {
  return (
    <>
      <StructuredData data={aboutSchema} />
      <div>
        <AboutHero data={aboutData.hero} />
        <MissionVision data={aboutData.missionVision} />
        <WhyStart data={aboutData.whyStart} />
        <CoreValues data={aboutData.coreValues} />
        <CTASection data={aboutData.cta} />
      </div>
    </>
  );
}
