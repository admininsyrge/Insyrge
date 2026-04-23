"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ServiceDetails({ service }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#071831] via-[#0A1F45] to-[#071831] text-white py-16 px-4 md:px-20 relative overflow-hidden">
      {/* BG Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[50%] h-[50%] bg-[#08e5c025] blur-[180px] rounded-full absolute top-0 left-5" />
        <div className="w-[40%] h-[40%] bg-[#07d6b025] blur-[160px] rounded-full absolute bottom-10 right-10" />
      </div>

      {/* HERO IMAGE */}
      <div className="flex justify-center my-6 md:my-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full md:w-10/12 rounded-3xl overflow-hidden shadow-2xl border border-[#1A2C55]/40 bg-black/20"
        >
          <div className="relative w-full h-[230px] sm:h-[320px] md:h-[530px]">
            <Image
              src={service.image.url}
              alt={service.title}
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </motion.div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-[#08e5c0] text-center drop-shadow-[0_0_16px_#08e5c055]"
        >
          {service.title}
        </motion.h1>

        {/* DESCRIPTION */}
        <div
          className="text-gray-300 text-lg leading-relaxed prose prose-invert mx-auto text-center"
          dangerouslySetInnerHTML={{ __html: service.description }}
        />

        {/* POINTS / FEATURES */}
        {service.points?.length > 0 && (
          <section className="pt-10 border-t border-white/10">
            <h2 className="text-3xl font-semibold text-[#08e5c0] mb-6 text-center">
              What You Get
            </h2>

            <ul className="grid sm:grid-cols-2 gap-6">
              {service.points.map((point, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="p-6 rounded-xl bg-[#0E224B]/70 border border-[#1D315F]/60 hover:border-[#08e5c0]/50"
                >
                  {point}
                </motion.li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA BUTTON */}
        {service.button && (
          <div className="text-center mt-12">
            <motion.a
              href="/contact" // change if needed
              whileHover={{ scale: 1.05 }}
              className="px-12 py-4 text-lg font-semibold rounded-full bg-[#08e5c0] text-[#0B1C3D] shadow-[0_0_40px_#08e5c040]"
            >
              {service.button}
            </motion.a>
          </div>
        )}
      </div>
    </main>
  );
}
