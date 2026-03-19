"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  {
    id: 1,
    icon: "/icons/zoho-implementation.svg",
    title: "Zoho Consulting & Implementation",
    description:
      "As an official Zoho Partner, we help simplify operations and build efficient systems tailored to your business needs.",
  },
  {
    id: 2,
    icon: "/icons/zoho-finance.svg",
    title: "Zoho Finance Services",
    description:
      "Streamline accounting and back-office workflows with our custom Zoho Finance solutions built for scalability.",
  },
  {
    id: 3,
    icon: "/icons/zoho-creator.svg",
    title: "Zoho Creator Solutions",
    description:
      "Empower your business with low-code applications through our expertise in Zoho Creator automation and UI design.",
  },
  {
    id: 4,
    icon: "/icons/training.svg",
    title: "Training & Support",
    description:
      "Upskill your team with hands-on training programs and ensure seamless adoption of Zoho tools across departments.",
  },
  {
    id: 5,
    icon: "/icons/marketplace.svg",
    title: "Marketplace Extensions",
    description:
      "Extend Zoho capabilities with our custom-built marketplace apps — smarter automation, better results.",
  },
];

export default function HomeServices() {
  return (
    <section className="relative bg-[#0B1C3D] text-white py-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,#08e5c030,transparent_60%),radial-gradient(circle_at_80%_70%,#00e6c030,transparent_70%)] blur-3xl" />

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center text-4xl md:text-5xl font-bold mb-14"
      >
        Our <span className="text-[#08e5c0]">Services</span>
      </motion.h2>

      {/* Services Grid */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-8 md:px-16">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-[#0E2555]/70 border border-[#08e5c0]/20 rounded-2xl p-8 shadow-lg hover:shadow-[0_0_25px_#08e5c040] transition-all duration-300 backdrop-blur-lg flex flex-col items-center text-center"
          >
            {/* Icon */}
            <div className="relative w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-[#0B1C3D] border border-[#08e5c0]/30 shadow-[0_0_20px_#08e5c040] group-hover:scale-105 transition-transform duration-300">
              <Image
                src={service.icon}
                alt={service.title}
                width={50}
                height={50}
                className="object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-[#08e5c0] mb-3">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed text-sm">
              {service.description}
            </p>

            {/* Glow Ring */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#08e5c0]/0 via-[#08e5c030] to-[#00e6ff]/0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700" />
          </motion.div>
        ))}
      </div>

      {/* Bottom Gradient Divider */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#08e5c044] to-transparent blur-2xl" />
    </section>
  );
}
