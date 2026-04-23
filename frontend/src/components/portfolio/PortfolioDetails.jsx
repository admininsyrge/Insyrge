"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "@/API";

export default function PortfolioDetails({ project }) {
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1C3D] text-white text-2xl">
        Project Not Found 😢
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1C3D] text-white py-32 px-6 md:px-20 relative overflow-hidden">
      {/* === Background Effects === */}
      <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-[#08e5c0]/10 blur-[160px] rounded-full -z-10" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-[#08e5c0]/5 blur-[130px] rounded-full -z-10" />

      {/* === Back Button === */}
      <Link
        href="/portfolio"
        className="inline-block mb-6 text-[#08e5c0] hover:underline"
      >
        ← Back to Portfolio
      </Link>

      {/* === Project Header === */}
      <div className="relative w-full h-80 md:h-[450px] rounded-2xl overflow-hidden mb-10 border border-[#1A2C55] shadow-lg shadow-[#08e5c0]/20">
        <Image
          src={`${BASE_URL}/uploads/${project.image}`}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C3D]/80 to-transparent" />
      </div>

      {/* === Project Title === */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#08e5c0] mb-3 tracking-tight">
          {project.title}
        </h1>
        <p className="text-gray-400">
          {project.category} • {project.client}
        </p>
      </div>

      {/* === Details === */}
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Description */}
        <section>
          <h2 className="text-2xl font-semibold text-[#08e5c0] mb-4">
            Project Description
          </h2>
          <div
            className="text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
        </section>

        {/* Features */}
        {project.features && (
          <section>
            <h2 className="text-2xl font-semibold text-[#08e5c0] mb-4">
              Key Features
            </h2>
            <ul className="grid md:grid-cols-2 gap-4">
              {project.features.map((f, i) => (
                <li
                  key={i}
                  className="bg-[#101F44]/50 p-4 rounded-xl border border-[#1A2C55] text-gray-300 hover:border-[#08e5c0]/40 transition-all"
                >
                  <span className="text-[#08e5c0] mr-2">•</span>
                  {f}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-[#08e5c0] mb-4">
              Project Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((img, index) => (
                <div
                  key={index}
                  className="relative w-full h-52 rounded-xl overflow-hidden border border-[#1A2C55]"
                >
                  <Image
                    src={img.image.url}
                    alt={`Screenshot ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
