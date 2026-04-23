"use client";
import { motion } from "framer-motion";
import React from "react";

const ContactHero = () => {
  return (
    <section className="text-center py-24 px-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold mb-6 text-[#08e5c0]"
      >
        Let’s Talk Business
      </motion.h1>
      <p className="text-gray-300 max-w-2xl mx-auto text-lg">
        No sales pitch — just a genuine conversation about your goals and how we
        can help your business grow smarter and faster.
      </p>
    </section>
  );
};

export default ContactHero;
