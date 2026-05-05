"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useUser } from "@/context/UserContext";

// 🔥 Lazy load heavy components
const HeroHome = dynamic(() => import("@/components/home/HeroHome"));
const PartnerSection = dynamic(() => import("@/components/home/PartnerSection"));
const ContactSection = dynamic(() => import("@/components/home/ContactSection"));
const ProcessSection = dynamic(() => import("@/components/home/ProcessSection"));
const FeaturedExtensions = dynamic(() => import("@/components/home/FeaturedExtensions"));
const BlogHighlights = dynamic(() => import("@/components/home/BlogHighlights"));
const CTABanner = dynamic(() => import("@/components/home/CTABanner"));
const CoreServices = dynamic(() => import("@/components/services/CoreServices"));
const GuaranteeSection = dynamic(() => import("@/components/services/GuaranteeSection"));

import { guarantees } from "@/data/servicesData";

export default function Home() {
  const { homeData, coreServices, extensions, blogs } = useUser();

  return (
    <>
      {/* ✅ Hero (fast render) */}
      {homeData?.hero ? (
        <HeroHome data={homeData.hero} />
      ) : (
        <div className="h-[70vh] bg-[#0B1C3D] animate-pulse" />
      )}

      {/* ✅ Core Services */}
      {coreServices?.length ? (
        <CoreServices data={coreServices} />
      ) : (
        <div className="h-[400px] bg-[#0B1C3D] animate-pulse" />
      )}

      {/* ✅ Process */}
      <ProcessSection />

      {/* ✅ Partners */}
      {homeData?.partners && (
        <PartnerSection data={homeData.partners} />
      )}

      {/* ✅ Guarantee */}
      <GuaranteeSection
        data={guarantees}
        title={"Why Companies Choose"}
      />

      {/* ✅ Extensions */}
      {extensions?.length ? (
        <FeaturedExtensions extensions={extensions} />
      ) : (
        <div className="h-[300px] bg-[#0B1C3D] animate-pulse" />
      )}

      {/* ✅ CTA */}
      <CTABanner />

      {/* ✅ Blogs */}
      {blogs?.length ? (
        <BlogHighlights blogs={blogs} />
      ) : (
        <div className="h-[300px] bg-[#0B1C3D] animate-pulse" />
      )}

      {/* ✅ Contact */}
      {homeData?.contact && (
        <ContactSection data={homeData.contact} />
      )}
    </>
  );
}