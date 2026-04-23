"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CoreServices = ({ data }) => {
  return (
    <section className="bg-[#061a33] py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10">
          {data.map((service, i) => (
            <Link key={service._id} href={`/services/${service.slug || ""}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                  rotateX: 2,
                  rotateY: -2,
                }}
                className="
                  group relative bg-[#0E1A35] border border-[#1F2D4A]
                  rounded-2xl overflow-hidden transition-all duration-500
                  hover:border-[#08e5c0]/40 shadow-lg hover:shadow-[#08e5c0]/20 cursor-pointer
                  flex flex-col
                  min-h-[420px] sm:min-h-[450px] md:min-h-[480px] lg:min-h-[520px]
                "
              >
                {/* === IMAGE (TOP SAME AS EXTENSION) === */}
                <div
                  className="
                    relative w-full flex-shrink-0
                    h-[160px]
                    sm:h-[190px]
                    md:h-[220px]
                    lg:h-[260px]
                  "
                >
                  <Image
                    src={service.image.url}
                    alt={service.title}
                    fill
                    className="
                      object-contain object-center
                      transition-transform duration-700 group-hover:scale-110
                    "
                  />
                </div>

                {/* === CONTENT === */}
                <div className="p-6 text-center relative flex flex-col flex-grow">
                  {/* Glow */}
                  <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition duration-700">
                    <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-[#08e5c022] blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-[#08e5c0] mb-2 tracking-wide">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <div
                    className="text-sm text-gray-300 mb-5 line-clamp-4 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: service.description,
                    }}
                  />

                  {/* CTA */}
                  {service.button && (
                    <motion.span
                      whileHover={{ scale: 1.07 }}
                      className="mt-auto inline-block px-6 py-2 rounded-full
                      bg-[#08e5c0] text-[#0B1C3D] font-semibold shadow-md
                      hover:px-7 hover:shadow-[#08e5c0]/40 transition-all duration-300"
                    >
                      Explore →
                    </motion.span>
                  )}
                </div>

                {/* Shine */}
                <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-[0.1] transition duration-700 pointer-events-none" />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
