"use client";

import React from "react";
import HeroHome from "@/components/home/HeroHome";
import PartnerSection from "@/components/home/PartnerSection";
import ContactSection from "@/components/home/ContactSection";
import StatsSection from "@/components/home/StatsSection";
import ProcessSection from "@/components/home/ProcessSection";
import FeaturedExtensions from "@/components/home/FeaturedExtensions";
import BlogHighlights from "@/components/home/BlogHighlights";
import CTABanner from "@/components/home/CTABanner";
import { useUser } from "@/context/UserContext";
import CoreServices from "@/components/services/CoreServices";
import GuaranteeSection from "@/components/services/GuaranteeSection";
import { guarantees } from "@/data/servicesData";

export default function Home() {
  const { homeData, coreServices, extensions, blogs, loading, error } =
    useUser();

  // === Show loader until homeData is available ===
  if (loading || !homeData) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0B1C3D] text-gray-400 text-xl">
        <div className="bars"></div>
      </div>
    );
  }

  // === Error state ===
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0B1C3D] text-red-400 text-xl">
        {error}
      </div>
    );
  }

  // === Render Home Page ===
  return (
    <>
      {/* 1. Hero Section */}
      {homeData.hero && <HeroHome data={homeData.hero} />}

      {/* 2. Stats Counter */}
      {/* <StatsSection /> */}

      {/* 3. Core Services */}
      {coreServices && <CoreServices data={coreServices} />}

      {/* 4. How We Work */}
      <ProcessSection />

      {/* 5. Partner Logos */}
      {homeData.partners && <PartnerSection data={homeData.partners} />}

      {/* 6. Why Choose Us */}
      {guarantees && (
        <GuaranteeSection
          data={guarantees}
          title={"Why Companies Choose"}
        />
      )}

      {/* 7. Featured Extensions */}
      {extensions && <FeaturedExtensions extensions={extensions} />}

      {/* 8. CTA Banner */}
      <CTABanner />

      {/* 9. Latest Blog Posts */}
      {blogs && <BlogHighlights blogs={blogs} />}

      {/* 10. Contact Section */}
      <ContactSection data={homeData.contact} />
    </>
  );
}
