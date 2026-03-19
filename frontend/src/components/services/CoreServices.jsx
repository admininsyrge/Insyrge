"use client";
import { BASE_URL } from "@/API";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const CoreServices = ({ data }) => {
  return (
    <section className="relative bg-[#081b33] text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* === Section Title === */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#08e5c0]"
        >
          Our Services
        </motion.h2>

        {/* === Services Grid === */}
        <div className="grid md:grid-cols-3 gap-10">
          {data.map((service, i) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group bg-gradient-to-b from-[#0c2344]/80 to-[#0a1d38]/90 backdrop-blur-xl border border-[#08e5c022] rounded-3xl p-8 shadow-[0_0_0_0_rgba(8,229,192,0)] hover:shadow-[0_0_25px_rgba(8,229,192,0.25)] hover:border-[#08e5c066] transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center space-y-6">
                {/* === Image === */}
                <div className="relative w-48 h-48 rounded-xl overflow-hidden bg-[#081b33] flex items-center justify-center">
                  <Image
                    src={`${BASE_URL}/uploads/${service.image}`}
                    alt={service.title}
                    width={200}
                    height={200}
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-xl shadow-[0_0_25px_#08e5c022]" />
                </div>

                {/* === Title === */}
                <h3 className="text-2xl font-bold text-[#08e5c0] tracking-wide">
                  {service.title}
                </h3>

                {/* === Divider === */}
                <div className="w-16 h-[2px] bg-[#08e5c0]/40 rounded-full" />

                {/* === Description === */}
                <div
                  className="text-gray-300 text-sm leading-relaxed px-2"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />

                {/* === Points List === */}
                {service.points?.length > 0 && (
                  <ul className="text-gray-400 text-sm space-y-1 text-left list-disc list-inside mt-2">
                    {service.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                )}

                {/* === CTA Button === */}
                {service.button && (
                  <motion.a
                    whileHover={{
                      scale: 1.08,
                      boxShadow: "0 0 20px rgba(8,229,192,0.5)",
                    }}
                    href={service.url}
                    className="bg-[#08e5c0] text-[#081b33] px-8 py-2.5 rounded-full font-semibold mt-6 shadow-[0_0_10px_rgba(8,229,192,0.3)] hover:shadow-[0_0_25px_rgba(8,229,192,0.5)] transition-all duration-300"
                  >
                    {service.button}
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
