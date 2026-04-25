"use client";

import React from "react";
import HeroHome from "@/components/home/HeroHome";
import HomeServices from "@/components/home/HomeServices";
import PartnerSection from "@/components/home/PartnerSection";
import CaseStudies from "@/components/home/CaseStudies";
import ContentHighlights from "@/components/home/ContentHighlights";
import ContactSection from "@/components/home/ContactSection";
import { useUser } from "@/context/UserContext";
import CoreServices from "@/components/services/CoreServices";
import GuaranteeSection from "@/components/services/GuaranteeSection";
import { guarantees } from "@/data/servicesData";
import Script from "next/script";

export default function Home() {
  const { homeData, coreServices, loading, error } = useUser();

  // === Show loader until homeData is available ===
  if (loading || !homeData) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0B1C3D] text-gray-400 text-xl animate-pulse">
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

  <Script
    id="zoho-pagesense"
    src="https://cdn.pagesense.io/js/851039329/fe82d17f52e84f93bcbfafeffc63b037.js"
    strategy="afterInteractive"
  />;

  // === Render Home Page ===
  return (
    <>
      {homeData.hero && <HeroHome data={homeData.hero} />}
      {coreServices && <CoreServices data={coreServices} />}
      {homeData.partners && <PartnerSection data={homeData.partners} />}
      {guarantees && (
        <GuaranteeSection
          data={guarantees}
          title={"Why Companies Choose INSYRGE"}
        />
      )}
      {/* {homeData.caseStudies && <CaseStudies data={homeData.caseStudies} />} */}
      {/* {homeData.contentHighlights && (
        <ContentHighlights data={homeData.contentHighlights} />
      )} */}
      <ContactSection data={homeData.contact} />
    </>
  );
}
