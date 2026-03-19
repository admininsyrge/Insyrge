"use client";
import React from "react";
import { motion } from "framer-motion";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import WhyChooseUs from "@/components/contact/WhyChooseUs";

export default function ContactClient() {
  // === Animation Variants ===
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <main className="min-h-screen bg-[#0B1C3D] text-white relative overflow-hidden">
      {/* === Optimized Glowing Background === */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#08e5c050,transparent_60%),radial-gradient(circle_at_80%_80%,#00b3ff25,transparent_60%)] blur-[100px] opacity-70 will-change-transform"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.2 }}
      />

      {/* === Page Content === */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10"
      >
        {/* Hero Section */}
        <ContactHero />

        {/* Contact Layout */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6 md:px-10 pb-24">
          {/* === Contact Form === */}
          <motion.div
            variants={childVariants}
            className="md:col-span-2 will-change-transform"
          >
            <ContactForm />
          </motion.div>

          {/* === Side Info === */}
          <motion.div
            variants={childVariants}
            transition={{ delay: 0.2 }}
            className="space-y-8 will-change-transform"
          >
            <ContactInfo />
            <WhyChooseUs />
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
