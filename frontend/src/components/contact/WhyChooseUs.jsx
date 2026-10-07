"use client";
import React from "react";
import { ShieldCheck, Lock, Code2, Zap, Award } from "lucide-react";

export default function WhyChooseUs() {
  const differentiators = [
    {
      icon: <Lock className="w-4 h-4 text-[#08e5c0]" />,
      title: "100% IP & Code Ownership",
      desc: "You retain full ownership of all Deluge functions, database schemas, and custom widgets.",
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#08e5c0]" />,
      title: "Mutual NDA Protected",
      desc: "Strict confidentiality for your client database, pricing models, and trade secrets.",
    },
    {
      icon: <Award className="w-4 h-4 text-[#08e5c0]" />,
      title: "Senior Architect Led",
      desc: "Direct communication with experienced technical practitioners, not junior account reps.",
    },
    {
      icon: <Zap className="w-4 h-4 text-[#08e5c0]" />,
      title: "2–4 Week Agile Sprints",
      desc: "Milestone-based delivery with working automation tested and deployed in weeks, not quarters.",
    },
  ];

  return (
    <div className="bg-[#101F44]/90 border border-[#1A2C55] rounded-3xl p-7 shadow-xl backdrop-blur-md">
      <span className="text-xs font-mono uppercase tracking-wider text-[#08e5c0] font-bold block mb-1">
        Client Protections
      </span>
      <h3 className="text-xl font-bold mb-4 text-white">
        Why Consult Insyrge
      </h3>

      <div className="space-y-4">
        {differentiators.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 shrink-0 mt-0.5">
              {item.icon}
            </div>
            <div>
              <div className="text-xs font-bold text-white mb-0.5">
                {item.title}
              </div>
              <div className="text-[11px] text-gray-400 leading-snug">
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
