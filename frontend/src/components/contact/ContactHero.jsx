"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Award, Lock } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="text-center pt-24 pb-12 px-6 max-w-5xl mx-auto">
      {/* Top trust pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-5 font-mono"
      >
        <Lock className="w-3.5 h-3.5" />
        Confidential Consultation &amp; Architectural Review
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-tight leading-tight"
      >
        Tell Us About Your Project.{" "}
        <span className="bg-gradient-to-r from-[#08e5c0] via-[#33ffd0] to-[#00e0ff] bg-clip-text text-transparent">
          Let&apos;s Build a Solution.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed mb-8"
      >
        Whether you need to fix a broken Zoho CRM configuration, orchestrate a complete Zoho One deployment, build custom Deluge algorithms, or automate complex business workflows—our senior solutions architects are ready to evaluate your requirements.
      </motion.p>

      {/* Trust reassurance pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400"
      >
        <span className="flex items-center gap-1.5 bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-white/10">
          <Clock className="w-4 h-4 text-[#08e5c0]" />
          Response Time: &lt; 2 Business Hours
        </span>
        <span className="flex items-center gap-1.5 bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-white/10">
          <ShieldCheck className="w-4 h-4 text-[#08e5c0]" />
          Bilateral NDA Protected
        </span>
        <span className="flex items-center gap-1.5 bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-white/10">
          <Award className="w-4 h-4 text-[#08e5c0]" />
          100% Code &amp; IP Ownership
        </span>
      </motion.div>
    </section>
  );
}
