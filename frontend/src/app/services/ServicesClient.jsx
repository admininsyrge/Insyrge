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
  coreServices as fallbackCoreServices,
} from "@/data/servicesData";
import { useUser } from "@/context/UserContext";

const ServicesClient = ({ initialServices = [] }) => {
  const { coreServices: contextServices, loading, error } = useUser();
  const services =
    initialServices && initialServices.length > 0
      ? initialServices
      : contextServices && contextServices.length > 0
      ? contextServices
      : fallbackCoreServices;

  // ✅ Page Layout
  return (
    <div className="bg-[#0F2555] text-white overflow-hidden">
      <ServicesHero data={heroData} />
      <CoreServices data={services} loading={loading && !services.length} error={error} />
      <ProcessSection data={processSteps} />
      <GuaranteeSection data={guarantees} title={"Our Commitment to You"} />
      <CTASection data={ctaData} />
    </div>
  );
};

export default ServicesClient;
