"use client";
import { motion } from "framer-motion";
import React from "react";

const GuaranteeSection = ({ data, title }) => {
  return (
    <section className="relative bg-[#081b33] text-white py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[35%] h-[40%] bg-[#08e5c010] blur-[200px] rounded-full absolute bottom-0 left-[30%]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-4">
            Our Promise
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {title || "Why Companies Choose"}{" "}
            <span className="bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] bg-clip-text text-transparent">
              INSYRGE
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="glass-card glass-card-hover p-8 text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#08e5c0]/10 border border-[#08e5c0]/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#08e5c0]/20 transition-colors duration-300">
                <span className="text-3xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#08e5c0] transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
