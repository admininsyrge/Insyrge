import { AboutHero } from "@/components/about/AboutHero";
import React from "react";
import { aboutData } from "@/data/aboutData";
import { MissionVision } from "@/components/about/MissionVision";
import { WhyStart } from "@/components/about/WhyStart";
import { CoreValues } from "@/components/about/CoreValues";
import { CTASection } from "@/components/about/CTASection";

// ✅ SEO metadata (server-side)
export const metadata = {
  title: "About Us | Insyrge Consultancy",
  description:
    "Learn more about Insyrge Consultancy — our mission, values, and commitment to empowering businesses through smart technology and automation.",
  icons: {
    icon: "/favicon.png",
  },
};

const page = () => {
  return (
    <div>
      <AboutHero data={aboutData.hero} />
      <MissionVision data={aboutData.missionVision} />
      <WhyStart data={aboutData.whyStart} />
      <CoreValues data={aboutData.coreValues} />
      <CTASection data={aboutData.cta} />
    </div>
  );
};

export default page;
