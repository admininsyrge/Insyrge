"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ExtensionCard({ extension, index = 0 }) {
  return (
    <Link href={`/extensions/${extension.slug}`} passHref>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: index * 0.06 }}
        whileHover={{
          y: -8,
          transition: { duration: 0.3 },
        }}
        className="
          group relative bg-[#0E1A35]/80 border border-[#1F2D4A]
          rounded-2xl overflow-hidden transition-all duration-500
          hover:border-[#08e5c0]/40 shadow-lg hover:shadow-[0_8px_40px_rgba(8,229,192,0.15)] cursor-pointer
          flex flex-col backdrop-blur-sm
          min-h-[420px] sm:min-h-[440px] md:min-h-[460px] lg:min-h-[500px]
        "
      >
        {/* Image Section */}
        <div
          className="
            relative w-full flex-shrink-0
            h-[160px] sm:h-[190px] md:h-[220px] lg:h-[250px]
          "
        >
          <Image
            src={extension.image.url}
            alt={extension.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={index < 3 ? "eager" : "lazy"}
            priority={index === 0}
            className="
              object-cover object-center
              transition-transform duration-700 group-hover:scale-110
            "
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A35] via-transparent to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="p-6 text-center relative flex flex-col flex-grow">
          {/* Soft Glow */}
          <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition duration-700">
            <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-[#08e5c018] blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-white mb-2.5 tracking-wide group-hover:text-[#08e5c0] transition-colors duration-300">
            {extension.title}
          </h3>

          <p className="text-sm text-gray-400 mb-6 line-clamp-3 leading-relaxed">
            {extension.description}
          </p>

          {/* Button */}
          <span
            className="mt-auto inline-block px-7 py-2.5 rounded-full
            bg-[#08e5c0] text-[#0B1C3D] font-semibold text-sm
            shadow-md group-hover:shadow-[0_0_25px_rgba(8,229,192,0.35)]
            transition-all duration-300 group-hover:px-8"
          >
            Explore →
          </span>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#08e5c0] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
      </motion.div>
    </Link>
  );
}
