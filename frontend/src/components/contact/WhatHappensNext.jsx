"use client";
import React from "react";
import { CheckCircle2, FileSearch, Video, FileCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Requirement Review",
    time: "Within 2 Hours",
    icon: <FileSearch className="w-5 h-5 text-[#08e5c0]" />,
    desc: "A Senior Solutions Architect (not a sales rep) analyzes your systems, existing bottlenecks, and integration requirements.",
  },
  {
    step: "02",
    title: "Architectural Consultation",
    time: "45 Minutes",
    icon: <Video className="w-5 h-5 text-[#00e0ff]" />,
    desc: "We meet via Zoom to review live workflows, discuss Deluge/API possibilities, and define your desired operational state.",
  },
  {
    step: "03",
    title: "System Blueprint & SOW",
    time: "24–48 Hours",
    icon: <FileCheck className="w-5 h-5 text-[#33ffd0]" />,
    desc: "You receive a clear, fixed-scope statement of work detailing module architectures, sprint milestones, and exact pricing.",
  },
  {
    step: "04",
    title: "Agile Sprints & Delivery",
    time: "2–4 Weeks",
    icon: <CheckCircle2 className="w-5 h-5 text-[#08e5c0]" />,
    desc: "We build and test in a secure sandbox, execute clean data migration, train your staff, and launch with zero downtime.",
  },
];

export default function WhatHappensNext() {
  return (
    <div className="bg-[#0b2142]/80 border border-[#08e5c0]/25 rounded-3xl p-6 sm:p-8 mb-10 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#08e5c0] font-bold block mb-1">
            Our Transparent Engagement Engine
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            What Happens After You Reach Out?
          </h3>
        </div>
        <span className="text-xs text-gray-400 font-mono">
          Zero Sales Pressure • Pure Technical Advisory
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-[#071831]/80 border border-white/10 hover:border-[#08e5c0]/40 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#08e5c0]">
                  {item.icon}
                </span>
                <span className="text-xs font-mono font-bold text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                  {item.time}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5 flex items-center gap-1.5">
                <span className="text-[#08e5c0] font-mono">{item.step}.</span>
                <span>{item.title}</span>
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
