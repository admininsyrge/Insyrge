"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ExtensionCard({ extension }) {
  return (
    <Link href={`/extensions/${extension.slug}`} passHref>
      <div
        className="
          group relative bg-[#0E1A35]/80 border border-[#1F2D4A]
          rounded-2xl overflow-hidden transition-all duration-300
          hover:border-[#08e5c0]/40 shadow-lg hover:shadow-[0_8px_30px_rgba(8,229,192,0.12)] cursor-pointer
          flex flex-col backdrop-blur-sm
          min-h-[420px] sm:min-h-[440px] md:min-h-[460px] lg:min-h-[500px]
        "
      >
        {/* Image Section */}
        <div className="relative w-full flex-shrink-0 h-[160px] sm:h-[190px] md:h-[220px] lg:h-[250px]">
          <Image
            src={extension.image.url}
            alt={extension.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A35] via-transparent to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="p-6 text-center relative flex flex-col flex-grow">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2.5 tracking-wide group-hover:text-[#08e5c0] transition-colors duration-200">
            {extension.title}
          </h3>

          <p className="text-sm text-gray-400 mb-6 line-clamp-3 leading-relaxed">
            {extension.description}
          </p>

          {/* Button */}
          <span
            className="mt-auto inline-block px-6 py-2.5 rounded-full
            bg-[#08e5c0] text-[#0B1C3D] font-semibold text-sm
            shadow-md transition-all duration-200 hover:px-7"
          >
            Explore →
          </span>
        </div>

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#08e5c0] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
      </div>
    </Link>
  );
}