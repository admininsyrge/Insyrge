"use client";
import { motion } from "framer-motion";

export const MissionVision = ({ data }) => (
  <section className="bg-[#0b1d39] text-white py-20 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-t from-[#081b33] to-[#0b1d39]" />
    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#08e5c0]/10 blur-[160px]" />

    <div className="relative z-10 container mx-auto px-6 grid md:grid-cols-2 gap-10">
      {[data.mission, data.vision].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
          className="bg-[#081b33] p-8 rounded-2xl shadow-[0_0_20px_#08e5c020] border border-[#08e5c0]/10 hover:border-[#08e5c0]/40 transition"
        >
          <h3 className="text-xl font-semibold mb-3 text-[#08e5c0]">
            {item.title}
          </h3>
          <p className="text-gray-300">{item.text}</p>
        </motion.div>
      ))}
    </div>
  </section>
);
