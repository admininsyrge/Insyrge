"use client";
import { motion } from "framer-motion";
import React from "react";

const CTASection = ({ data }) => {
  return (
    <section className="relative bg-[#081b33] text-white py-28 text-center overflow-hidden">
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#08e5c022,#081b33_80%)] bg-[length:200%_200%]"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-[#08e5c0]"
        >
          {data.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed"
        >
          {data.subtitle}
        </motion.p>

        <motion.a
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 25px rgba(8,229,192,0.7)",
          }}
          href={"https://insyrge.zohobookings.com/#/4623360000000149002"}
          className="inline-block bg-[#08e5c0] text-[#081b33] px-10 py-4 rounded-full font-semibold shadow-lg"
        >
          {data.buttonText}
        </motion.a>
      </div>
    </section>
  );
};

export default CTASection;
