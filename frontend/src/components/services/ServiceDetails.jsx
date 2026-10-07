"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Calendar,
  ClipboardCheck,
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Zap,
} from "lucide-react";
import CrmAssessmentModal from "@/components/common/CrmAssessmentModal";

export default function ServiceDetails({ service }) {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const imageUrl = service.image?.url || (typeof service.image === "string" ? service.image : "/logo.png");

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#071831] via-[#0A1F45] to-[#071831] text-white py-16 px-4 sm:px-6 md:px-12 lg:px-20 relative overflow-hidden">
        {/* BG Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-[50%] h-[50%] bg-[#08e5c0]/10 blur-[180px] rounded-full absolute top-0 left-5" />
          <div className="w-[40%] h-[40%] bg-[#00e0ff]/10 blur-[160px] rounded-full absolute bottom-10 right-10" />
        </div>

        {/* Back navigation */}
        <div className="max-w-5xl mx-auto pt-8 pb-4 relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-[#08e5c0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Services
          </Link>
        </div>

        {/* HERO IMAGE */}
        <div className="flex justify-center my-4 md:my-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-[#08e5c0]/25 bg-black/20"
          >
            <div className="relative w-full h-[220px] sm:h-[320px] md:h-[450px]">
              <Image
                src={imageUrl}
                alt={service.title || "Service"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                priority
                className="object-cover object-center"
              />
            </div>
          </motion.div>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-5xl mx-auto space-y-12">
          {/* TITLE & TRUST BADGES */}
          <div className="text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              Enterprise Architecture Service
            </span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
            >
              {service.title}
            </motion.h1>

            {/* Micro trust row */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-gray-400 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#08e5c0]" />
                Bilateral NDA Protected
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#08e5c0]" />
                100% Client Code &amp; IP Ownership
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#08e5c0]" />
                2–4 Week Agile Sprints
              </span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div
            className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto prose prose-invert text-center"
            dangerouslySetInnerHTML={{ __html: service.description }}
          />

          {/* DELIVERABLES / CAPABILITIES */}
          {service.points?.length > 0 && (
            <section className="pt-8 border-t border-white/10">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  What You Receive
                </h2>
                <p className="text-xs sm:text-sm text-gray-400">
                  Measurable architectural milestones and tested deliverables included in this service.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {service.points.map((point, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-5 rounded-2xl bg-[#0B1C3D]/80 border border-white/10 hover:border-[#08e5c0]/40 transition-colors flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#08e5c0] shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-200 leading-relaxed font-medium">
                      {point}
                    </span>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* HIGH-CONVERTING CALL TO ACTION SECTION */}
          <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0b2142] to-[#071831] border border-[#08e5c0]/30 shadow-2xl text-center">
            <span className="text-xs font-mono uppercase tracking-wider text-[#08e5c0] font-bold block mb-2">
              Next Step: Bottleneck Review
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to Scope Your {service.title}?
            </h3>
            <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Book a free 45-minute architectural consultation or request a custom CRM assessment. We evaluate your current systems and prepare a clear, fixed-scope proposal.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://insyrge.zohobookings.com/#/4623360000000149002"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm bg-[#08e5c0] text-[#071831] shadow-[0_0_20px_rgba(8,229,192,0.4)] hover:scale-105 transition-all"
              >
                <Calendar className="w-4 h-4" />
                Book a 45-Min Discovery Call
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setIsAssessmentOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
              >
                <ClipboardCheck className="w-4 h-4 text-[#08e5c0]" />
                Get Free Assessment
              </button>
            </div>

            <div className="mt-6 text-xs text-gray-400">
              Average response time: under 2 business hours • Mutual NDA guaranteed
            </div>
          </div>
        </div>
      </div>

      <CrmAssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        defaultService={service.title}
      />
    </>
  );
}
