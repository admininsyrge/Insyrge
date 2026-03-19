"use client";
import { motion } from "framer-motion";
import React from "react";

const GuaranteeSection = ({ data, title }) => {
  return (
    <section className="relative bg-[#081b33] text-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-bold mb-16 text-[#08e5c0]"
        >
          {title}
          
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {data.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-[#0c2344] border border-[#08e5c033] rounded-2xl p-8 hover:shadow-[0_0_25px_#08e5c033] transition-all"
            >
              <div className="text-[#08e5c0] text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-[#08e5c0] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
