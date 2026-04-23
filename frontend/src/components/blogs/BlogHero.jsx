"use client";
import { motion } from "framer-motion";
import React from "react";

const BlogHero = () => {
  return (
    <section className="relative bg-[#0F2555] text-white py-28 overflow-hidden">
      {/* === Subtle Aurora Background === */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,#08e5c022,#081b33_80%)] bg-[length:200%_200%] opacity-70"
      />

      {/* === Content === */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-8">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold"
        >
          Insights, <span className="text-[#08e5c0]">Tips</span> & Resources
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Stay ahead of the curve with actionable insights on technology,
          automation, and business growth.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 25px rgba(8,229,192,0.7)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200 }}
          href="#latest-posts"
          className="inline-block bg-[#08e5c0] text-[#081b33] px-10 py-4 rounded-full font-semibold shadow-lg mt-6 hover:bg-[#06cfae] transition-all"
        >
          Explore Latest Posts
        </motion.a>
      </div>

      {/* === Bottom Teal Glow === */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#08e5c044] to-transparent blur-2xl" />
    </section>
  );
};

export default BlogHero;
