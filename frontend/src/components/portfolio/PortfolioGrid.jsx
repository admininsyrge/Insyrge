"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "@/API";

export default function PortfolioGrid({ projects }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {projects.map((project) => (
        <Link
          key={project._id}
          href={`/portfolio/${project.slug}`}
          className="group relative rounded-2xl overflow-hidden bg-[#101F44] border border-[#1A2C55] hover:border-[#08e5c0]/60 transition-all duration-500 shadow-lg hover:shadow-[#08e5c0]/30"
        >
          {/* Project Image */}
          <div className="relative w-full h-56 overflow-hidden">
            <Image
              src={project.image.url}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C3D]/70 to-transparent" />
          </div>

          {/* Project Info */}
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-[#08e5c0] group-hover:translate-x-1 transition-transform">
              {project.title}
            </h3>
            <p className="text-sm text-gray-400 mb-2">{project.category}</p>

            <div
              className="text-gray-300 text-sm leading-relaxed line-clamp-3"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </div>

          {/* Hover Glow */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#08e5c0]/0 via-[#08e5c0]/20 to-[#08e5c0]/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
        </Link>
      ))}
    </div>
  );
}
