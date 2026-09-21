"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  FileCode2,
  Calendar,
  Award,
  ExternalLink,
  CheckCircle,
  Briefcase,
  Users,
} from "lucide-react";

export default function FounderTrustSection() {
  return (
    <section className="relative bg-[#071831] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[500px] h-[500px] bg-[#08e5c0]/5 blur-[220px] rounded-full absolute -top-20 left-10" />
        <div className="w-[500px] h-[500px] bg-blue-500/5 blur-[220px] rounded-full absolute -bottom-20 right-10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Founder Profile & Background */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-4">
              <Users className="w-3.5 h-3.5" />
              Direct Engineering Leadership
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
              Led by Practitioners,{" "}
              <span className="bg-gradient-to-r from-[#08e5c0] via-[#33ffd0] to-[#00e0ff] bg-clip-text text-transparent">
                Not Account Managers
              </span>
            </h2>

            <div className="p-6 rounded-2xl bg-[#0B1C3D]/90 border border-white/10 mb-6 shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#08e5c0]/20 border border-[#08e5c0]/40 flex items-center justify-center text-[#08e5c0] font-extrabold text-xl shadow-[0_0_20px_#08e5c030]">
                  MS
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Manav Sharma</h3>
                  <p className="text-xs text-[#08e5c0] font-semibold">
                    Founder &amp; Principal Technology Architect
                  </p>
                  <a
                    href="https://in.linkedin.com/company/insyrge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-[#08e5c0] transition-colors mt-0.5"
                  >
                    <span>Connect on LinkedIn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                &ldquo;Too many contracting and home service companies get burned by generic agencies that sell high-level advice, only to hand the work off to junior developers who don&apos;t understand construction sales cycles, field handoffs, or Deluge limitations.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                At Insyrge, I personally design the CRM architecture, supervise the data pipelines, and verify every Deluge script. We focus obsessively on construction and field workflows because connecting sales, measurements, and job completion is where real profit is won or lost.&rdquo;
              </p>
            </div>

            {/* Quick credentials */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-xs font-bold text-white flex items-center gap-1.5 mb-1">
                  <Award className="w-3.5 h-3.5 text-[#08e5c0]" />
                  Zoho Marketplace
                </p>
                <p className="text-[11px] text-gray-400 leading-snug">
                  9 published extensions serving global enterprise users.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-xs font-bold text-white flex items-center gap-1.5 mb-1">
                  <Briefcase className="w-3.5 h-3.5 text-[#08e5c0]" />
                  HOVER Verified
                </p>
                <p className="text-[11px] text-gray-400 leading-snug">
                  Documented integration partner in HOVER&apos;s Help Center.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3 Core Client Protection Guarantees */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-4"
          >
            <div className="p-6 rounded-2xl bg-[#0B1C3D]/80 border border-white/10 hover:border-[#08e5c0]/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-[#08e5c0]/10 text-[#08e5c0]">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">
                  1. Bilateral Non-Disclosure Agreement (NDA)
                </h4>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed pl-11">
                Your customer databases, subcontractor rates, supplier pricing, and operational workflows represent your company&apos;s competitive advantage. We execute a mutual NDA prior to discovery or accessing your Zoho environment.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B1C3D]/80 border border-white/10 hover:border-[#08e5c0]/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <FileCode2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">
                  2. 100% Client Code &amp; IP Ownership
                </h4>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed pl-11">
                You retain complete intellectual property ownership over all custom Deluge functions, CRM widgets, client scripts, and database architectures created during our engagement. Zero proprietary lock-in or recurring code licensing fees.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B1C3D]/80 border border-white/10 hover:border-[#08e5c0]/30 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">
                  3. Transparent Milestones &amp; Post-Launch Warranty
                </h4>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed pl-11">
                Every project is governed by a detailed written scope of work, sandbox testing verification, user acceptance testing (UAT), and dedicated 30-day post-launch warranty support to ensure your team experiences flawless adoption.
              </p>
            </div>

            <div className="pt-2 pl-1">
              <a
                href="https://insyrge.zohobookings.com/#/4623360000000149002"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-sm bg-[#08e5c0] text-[#081b33] shadow-[0_0_20px_#08e5c050] hover:scale-105 transition-all"
              >
                <Calendar className="w-4 h-4" />
                Schedule Direct Consultation with Manav
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
