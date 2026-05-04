"use client";
import { motion } from "framer-motion";
import React from "react";

const steps = [
  {
    num: "01",
    title: "Discovery",
    description: "We start by understanding your business, challenges, and goals through in-depth conversations with your team.",
    icon: "🔍",
  },
  {
    num: "02",
    title: "Strategy & Planning",
    description: "Our team designs a tailored solution roadmap, identifying the right tools and workflows for your needs.",
    icon: "📋",
  },
  {
    num: "03",
    title: "Implementation",
    description: "We build and configure your systems, ensuring minimal disruption and maximum efficiency from day one.",
    icon: "⚙️",
  },
  {
    num: "04",
    title: "Training & Support",
    description: "Your team receives hands-on training and ongoing support to ensure long-term success.",
    icon: "🚀",
  },
];

export default function ProcessSection() {
  return (
    <section className="relative bg-[#081b33] text-white py-24 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[30%] h-[50%] bg-[#08e5c010] blur-[200px] rounded-full absolute top-0 right-[15%]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-4">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How We{" "}
            <span className="bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            A proven four-step approach to transforming your business operations.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative group"
            >
              {/* Connector line (hidden on last item and mobile) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[calc(100%-20%)] h-[2px] bg-gradient-to-r from-[#08e5c0]/30 to-[#08e5c0]/10" />
              )}

              <div className="glass-card glass-card-hover p-6 text-center h-full flex flex-col items-center relative">
                {/* Step number */}
                <div className="w-14 h-14 rounded-2xl bg-[#08e5c0]/10 border border-[#08e5c0]/20 flex items-center justify-center mb-5 group-hover:bg-[#08e5c0]/20 transition-colors duration-300">
                  <span className="text-2xl">{step.icon}</span>
                </div>

                {/* Number badge */}
                <span className="absolute top-4 right-4 text-[#08e5c0]/20 text-4xl font-extrabold">
                  {step.num}
                </span>

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#08e5c0] transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
