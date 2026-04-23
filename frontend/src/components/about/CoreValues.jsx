"use client";
import { motion } from "framer-motion";

export const CoreValues = ({ data }) => (
  <section className="bg-[#0b1d39] text-white py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-t from-[#081b33] to-[#0b1d39]" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#08e5c0]/10 blur-[200px]" />

    <div className="relative z-10 container mx-auto px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-4 text-[#08e5c0]"
      >
        {data.title}
      </motion.h2>
      <p className="text-gray-400 max-w-2xl mx-auto mb-12">
        {data.description}
      </p>
      <div className="grid md:grid-cols-5 gap-6">
        {data.values.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="bg-[#081b33] p-6 rounded-2xl border border-[#08e5c0]/10 hover:shadow-[0_0_25px_#08e5c030] hover:border-[#08e5c0]/40 transition"
          >
            <h3 className="text-[#08e5c0] text-3xl font-bold mb-2">
              {v.letter}
            </h3>
            <h4 className="font-semibold mb-2">{v.title}</h4>
            <p className="text-gray-400 text-sm">{v.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
