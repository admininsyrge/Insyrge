"use client";
import { motion } from "framer-motion";
import React from "react";

const ProcessSection = ({ data }) => {
  return (
    <section className="relative bg-[#081b33] text-white py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-bold mb-16 text-[#08e5c0]"
        >
          Our Process
        </motion.h2>

        <div className="grid md:grid-cols-4 gap-10">
          {data.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="p-6 rounded-2xl bg-[#0c2344] border border-[#08e5c033] hover:shadow-[0_0_20px_#08e5c033]"
            >
              <div className="text-5xl font-bold text-[#08e5c0] mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
