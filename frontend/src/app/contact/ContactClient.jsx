"use client";
import React from "react";
import { motion } from "framer-motion";
import ContactHero from "@/components/contact/ContactHero";
import WhatHappensNext from "@/components/contact/WhatHappensNext";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import WhyChooseUs from "@/components/contact/WhyChooseUs";

export default function ContactClient() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-[#071831] text-white relative overflow-hidden">
      {/* === Atmospheric Glowing Background === */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[500px] h-[500px] bg-[#08e5c0]/10 blur-[140px] rounded-full absolute -top-40 left-1/4 transform-gpu" />
        <div className="w-[450px] h-[450px] bg-[#00e0ff]/10 blur-[140px] rounded-full absolute bottom-1/4 right-10 transform-gpu" />
      </div>

      {/* === Page Content === */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10"
      >
        {/* 1. Hero Section */}
        <ContactHero />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pb-24">
          {/* 2. What Happens Next Onboarding Timeline */}
          <motion.div variants={childVariants}>
            <WhatHappensNext />
          </motion.div>

          {/* 3. Form & Contact Details Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <motion.div
              variants={childVariants}
              className="lg:col-span-8 will-change-transform"
            >
              <ContactForm />
            </motion.div>

            {/* Sidebar Column */}
            <motion.div
              variants={childVariants}
              className="lg:col-span-4 space-y-6 will-change-transform"
            >
              <ContactInfo />
              <WhyChooseUs />
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
