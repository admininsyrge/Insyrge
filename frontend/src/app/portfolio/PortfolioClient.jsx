"use client";

import React, { useEffect, useState } from "react";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import { BASE_URL_USER } from "@/API";
import { useUser } from "@/context/UserContext";

export default function PortfolioClient() {
  const { projects, loading, error } = useUser();
  console.log(projects);

  return (
    <div className="min-h-screen bg-[#0B1C3D] text-white py-32 px-6 md:px-20 relative overflow-hidden">
      {/* === Background Neon Blurs === */}
      <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-[#08e5c0]/10 blur-[160px] rounded-full -z-10" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-[#08e5c0]/5 blur-[130px] rounded-full -z-10" />

      {/* === Heading === */}
      <div className="text-center mb-14 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-[#08e5c0] mb-3">
          Our Portfolio
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A collection of our recent projects — combining innovation,
          creativity, and technology to deliver outstanding results.
        </p>
      </div>

      {/* === Grid Section === */}
      <div className="relative z-10">
        {loading ? (
          <div className="flex justify-center items-center text-gray-400 animate-pulse ">
            <div className="bars"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-20">{error}</div>
        ) : projects?.length > 0 ? (
          <PortfolioGrid projects={projects} />
        ) : (
          <div className="text-center text-gray-400 py-20">
            No projects found.
          </div>
        )}
      </div>
    </div>
  );
}
