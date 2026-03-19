"use client";

import React, { useEffect, useState } from "react";
import CoreServices from "@/components/services/CoreServices";
import CTASection from "@/components/services/CTASection";
import GuaranteeSection from "@/components/services/GuaranteeSection";
import ProcessSection from "@/components/services/ProcessSection";
import ServicesHero from "@/components/services/ServicesHero";
import {
  heroData,
  processSteps,
  guarantees,
  ctaData,
} from "@/data/servicesData";
import { useUser } from "@/context/UserContext";

const ServicesClient = () => {
  const { coreServices, loading, error } = useUser();

  // ✅ Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F2555] text-white text-lg animate-pulse">
        <div className="bars"></div>
      </div>
    );
  }

  // ✅ Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F2555] text-red-400 text-lg text-center px-4">
        <div className="bars"></div>
        {error}
      </div>
    );
  }

  // ✅ Page Layout
  return (
    <div className="bg-[#0F2555] text-white overflow-hidden">
      <ServicesHero data={heroData} />
      <CoreServices data={coreServices} /> {/* ✅ Dynamic Data */}
      <ProcessSection data={processSteps} />
      <GuaranteeSection data={guarantees} title={"Our Commitment to You"} />
      <CTASection data={ctaData} />
    </div>
  );
};

export default ServicesClient;
