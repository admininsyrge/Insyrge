"use client";
import React from "react";
import { CheckCircle } from "lucide-react";

const WhyChooseUs = () => {
  const points = [
    "Full Transparency",
    "Experienced Developers",
    "Fast Turnaround",
    "Premium Support",
  ];

  return (
    <div className="bg-[#101F44]/80 border border-[#1A2C55] rounded-3xl p-8 shadow-[0_0_20px_#08e5c030]">
      <h3 className="text-xl font-semibold mb-4 text-[#08e5c0]">
        Why Choose Us
      </h3>
      <ul className="space-y-3 text-gray-300">
        {points.map((point, i) => (
          <li key={i} className="flex items-center gap-2">
            <CheckCircle size={18} className="text-[#08e5c0]" /> {point}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhyChooseUs;
