"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FeaturedExtensions({ extensions }) {
  if (!extensions || extensions.length === 0) return null;

  // Show max 4 extensions
  const featured = extensions.slice(0, 4);

  return (
    <section className="relative bg-[#071831] text-white py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[40%] h-[40%] bg-[#08e5c015] blur-[200px] rounded-full absolute bottom-0 left-[20%]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-4">
            Marketplace
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] bg-clip-text text-transparent">
              Extensions
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
            Supercharge your Zoho experience with our custom-built marketplace extensions.
          </p>
        </motion.div>

        {/* Extensions Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((ext, i) => (
            <Link key={ext._id} href={`/extensions/${ext.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group glass-card glass-card-hover overflow-hidden cursor-pointer h-full flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full h-[140px] sm:h-[160px] flex-shrink-0">
                  <Image
                    src={ext.image.url}
                    alt={ext.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E224B] via-transparent to-transparent opacity-70" />
                </div>

                {/* Content */}
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-base font-semibold text-white mb-2 group-hover:text-[#08e5c0] transition-colors duration-300 line-clamp-2">
                    {ext.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-4">
                    {ext.description}
                  </p>
                  <span className="mt-auto text-[#08e5c0] text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/extensions"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#08e5c0]/30 text-[#08e5c0] font-medium hover:bg-[#08e5c0]/10 hover:border-[#08e5c0]/50 transition-all duration-300"
          >
            View All Extensions
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
