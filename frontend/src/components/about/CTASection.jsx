"use client";
import { motion } from "framer-motion";

export const CTASection = ({ data }) => (
  <section className="bg-[#081b33] text-white py-24 text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-[#0b1d39] to-[#081b33]" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#08e5c0]/10 blur-[160px]" />

    <div className="relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-4 text-[#08e5c0]"
      >
        {data.title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-gray-300 max-w-2xl mx-auto mb-8"
      >
        {data.description}
      </motion.p>
      <motion.a
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 30px rgba(8,229,192,0.7)",
        }}
        href="https://insyrge.zohobookings.com/#/4623360000000149002"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-[#08e5c0] text-[#081b33] px-10 py-3 rounded-full font-semibold transition-all"
      >
        {data.button}
      </motion.a>
    </div>
  </section>
);
