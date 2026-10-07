"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Code2,
  Zap,
  TrendingUp,
  Headphones,
  Lock,
  CheckCircle,
} from "lucide-react";

const pillars = [
  {
    icon: <Code2 className="w-6 h-6 text-[#08e5c0]" />,
    title: "Certified Zoho Engineers & Architects",
    desc: "We don't just configure settings—we write custom Deluge code, build private widgets, engineer REST APIs, and develop custom Zoho Creator portals that standard consultants cannot deliver.",
  },
  {
    icon: <Lock className="w-6 h-6 text-[#08e5c0]" />,
    title: "100% IP & Source Code Ownership",
    desc: "You retain full ownership of all custom code, workflows, automation scripts, and database architectures. No proprietary agency locks, no hostage software, and zero hidden licensing fees.",
  },
  {
    icon: <Zap className="w-6 h-6 text-[#08e5c0]" />,
    title: "Rapid 2–4 Week Agile Sprints",
    desc: "Avoid traditional consulting agency bloat that takes 6 months to launch basic CRM fields. We execute in focused agile sprints, delivering functional, tested automation in weeks, not quarters.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-[#08e5c0]" />,
    title: "Measurable ROI & Business-First Design",
    desc: "Every automation, integration, and dashboard we build is tied directly to measurable KPIs: reducing administrative hours, accelerating lead response time, and increasing customer lifetime value.",
  },
  {
    icon: <Headphones className="w-6 h-6 text-[#08e5c0]" />,
    title: "End-to-End Adoption & 24/7 Governance",
    desc: "A CRM is useless if your staff won't use it. We provide recorded Loom walkthroughs, live employee training sessions, written SOP playbooks, and continuous SLA support to guarantee high adoption.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#08e5c0]" />,
    title: "Enterprise-Grade Security & Compliance",
    desc: "We follow strict security protocols including encrypted API handshakes, granular role-based access control, HIPAA/GDPR alignment, and comprehensive audit logs to keep your business safe.",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="relative bg-[#071831] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background accents - mobile GPU-friendly */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[500px] h-[500px] bg-[#08e5c0]/5 blur-[60px] sm:blur-[200px] rounded-full absolute -top-40 right-10 transform-gpu" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-4">
            The Insyrge Difference
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5">
            Why High-Growth Companies Choose{" "}
            <span className="bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] bg-clip-text text-transparent">
              Insyrge
            </span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            We bridge the gap between high-level business strategy and deep
            technical engineering, delivering systems that actually work for
            your team from day one.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-8 rounded-2xl bg-[#0B1C3D]/80 border border-white/10 hover:border-[#08e5c0]/40 shadow-xl backdrop-blur-md flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#08e5c0]/10 border border-[#08e5c0]/25 flex items-center justify-center mb-6 group-hover:bg-[#08e5c0]/20 group-hover:border-[#08e5c0]/50 transition-colors">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#08e5c0] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-[#08e5c0]">
                <CheckCircle className="w-4 h-4" />
                <span>Enterprise Guaranteed</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
