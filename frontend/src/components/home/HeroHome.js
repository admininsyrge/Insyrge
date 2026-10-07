"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import {
  CheckCircle,
  Calendar,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  Award,
} from "lucide-react";

export default function HeroHome({ data }) {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-start lg:justify-center items-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-[#071831] text-white overflow-hidden">
      {/* === Atmospheric Lighting & Grid === */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #08e5c0 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        {/* Glowing Orbs - GPU-accelerated and radius-adapted for mobile performance */}
        <div className="w-64 h-64 sm:w-[500px] sm:h-[500px] bg-[#08e5c0]/15 blur-[60px] sm:blur-[180px] rounded-full absolute -top-20 -left-10 sm:-top-40 sm:-left-20 transform-gpu pointer-events-none" />
        <div className="w-56 h-56 sm:w-[450px] sm:h-[450px] bg-[#00e0ff]/10 blur-[50px] sm:blur-[160px] rounded-full absolute top-1/3 -right-10 sm:-right-20 transform-gpu pointer-events-none" />
        <div className="hidden sm:block w-[350px] h-[350px] bg-[#08e5c0]/10 blur-[150px] rounded-full absolute -bottom-20 left-1/3 transform-gpu pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* === Left Column: Value Proposition & CTAs === */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Trust Badges Bar */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6 max-w-full"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#08e5c0]/10 text-[#08e5c0] border border-[#08e5c0]/30 backdrop-blur-md shadow-[0_0_15px_#08e5c020]">
                <Award className="w-3.5 h-3.5 shrink-0" />
                Zoho Marketplace Developer (9+ Extensions)
              </span>
              <a
                href="https://help.hover.to/en/articles/12651040-zoho-crm-integration"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 text-gray-200 border border-white/15 hover:border-[#08e5c0]/40 transition-colors backdrop-blur-md"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#08e5c0] shrink-0" />
                Featured in HOVER&apos;s Zoho CRM Docs
              </a>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 text-gray-300 border border-white/10 backdrop-blur-md">
                Bilateral NDA Protected
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.18] sm:leading-[1.12] mb-6 break-words"
            >
              Zoho CRM &amp; Business Automation for{" "}
              <span className="bg-gradient-to-r from-[#08e5c0] via-[#33ffd0] to-[#00e0ff] bg-clip-text text-transparent">
                Construction and Home Service
              </span>{" "}
              Companies
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6"
            >
              We design, implement and customize Zoho systems that connect
              sales, operations, estimating, documents, field workflows and
              customer communication — without forcing your team into a
              complicated technology stack.
            </motion.p>

            {/* Ecosystem Pills Strip */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8 text-xs font-medium text-gray-300"
            >
              <span className="px-3 py-1 rounded-md bg-[#0B1C3D] border border-white/10 text-[#08e5c0]">
                Zoho CRM
              </span>
              <span className="text-gray-500">•</span>
              <span className="px-3 py-1 rounded-md bg-[#0B1C3D] border border-white/10">
                Zoho One
              </span>
              <span className="text-gray-500">•</span>
              <span className="px-3 py-1 rounded-md bg-[#0B1C3D] border border-white/10 text-cyan-400">
                Custom Integrations
              </span>
              <span className="text-gray-500">•</span>
              <span className="px-3 py-1 rounded-md bg-[#0B1C3D] border border-white/10">
                Business Automation
              </span>
              <span className="text-gray-500">•</span>
              <span className="px-3 py-1 rounded-md bg-[#0B1C3D] border border-white/10 text-emerald-400">
                Zoho Extensions
              </span>
            </motion.div>

            {/* High-Converting CTA Action Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <a
                href="https://insyrge.zohobookings.com/#/4623360000000149002"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base text-center bg-[#08e5c0] text-[#081b33] shadow-[0_0_25px_#08e5c060] hover:shadow-[0_0_35px_#08e5c090] hover:scale-105 transition-all duration-300"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span>Book a Free 45-Minute Consultation</span>
              </a>
            </motion.div>

            {/* Micro-Trust Signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs sm:text-sm text-gray-400"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#08e5c0] shrink-0" />
                <span>100% Free Consultation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#08e5c0] shrink-0" />
                <span>No Long-Term Lock-in</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#08e5c0] shrink-0" />
                <span>100% NDA Protected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#08e5c0] shrink-0" />
                <span>2–4 Week Rapid Launch</span>
              </div>
            </motion.div>
          </div>

          {/* === Right Column: Interactive 3D Automation Cockpit === */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Glowing Backdrop Frame */}
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#08e5c0] via-[#00e0ff] to-[#08e5c0] rounded-3xl blur-lg sm:blur-xl opacity-20 sm:opacity-30 animate-pulseGlow transform-gpu" />

              <div className="relative rounded-2xl overflow-hidden border border-[#08e5c0]/30 bg-[#0B1C3D]/90 shadow-2xl">
                <Image
                  src="/images/hero-automation-dashboard.jpg"
                  alt="Insyrge Enterprise Business Automation Cockpit and Real-Time CRM Dashboard"
                  width={1200}
                  height={675}
                  priority={false}
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, (max-width: 1280px) 45vw, 550px"
                  className="w-full h-auto object-cover rounded-xl transition-transform duration-700 hover:scale-[1.02]"
                />

                {/* Floating Metric Badge 1 (Top Right) */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute top-4 right-4 bg-[#081b33]/90 border border-[#08e5c0]/40 rounded-xl px-3.5 py-2 backdrop-blur-md shadow-lg flex items-center gap-2.5"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#08e5c0] animate-ping" />
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                      Zoho Workflows
                    </p>
                    <p className="text-xs font-bold text-[#08e5c0]">
                      Real-Time Data Sync
                    </p>
                  </div>
                </motion.div>

                {/* Floating Metric Badge 2 (Bottom Left) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute bottom-4 left-4 bg-[#081b33]/90 border border-white/20 rounded-xl px-3.5 py-2 backdrop-blur-md shadow-lg flex items-center gap-2.5"
                >
                  <Activity className="w-4 h-4 text-[#00e0ff]" />
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                      Deluge Engine
                    </p>
                    <p className="text-xs font-bold text-white">
                      Automated Triggers Active
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Bottom live stats pill */}
              <div className="mt-4 flex items-center justify-between px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  End-to-End Zoho Integration
                </span>
                <span className="text-[#08e5c0] font-medium">
                  CRM • Creator • Books • APIs
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
