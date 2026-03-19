"use client";
import { motion } from "framer-motion";

export const WhyStart = ({ data }) => (
  <section className="bg-[#081b33] text-white py-20 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-[#081b33] to-[#0b1d39]" />
    <div className="absolute -left-20 top-10 w-96 h-96 bg-[#08e5c0]/15 blur-[180px]" />

    <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6 text-[#08e5c0]"
      >
        {data.title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-gray-300 leading-relaxed text-lg"
      >
        {data.text}
      </motion.p>
    </div>
  </section>
);
