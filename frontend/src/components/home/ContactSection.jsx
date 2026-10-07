"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

export default function ContactSection() {
  const [formLoaded, setFormLoaded] = useState(false);

  return (
    <section
      id="contact-form-section"
      className="relative bg-gradient-to-b from-[#071831] via-[#091e3d] to-[#040e1f] text-white py-24 overflow-hidden border-t border-[#08e5c0]/20"
    >
      {/* Background glow highlights - mobile GPU-friendly */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[50%] h-[50%] bg-[#08e5c0]/15 blur-[60px] sm:blur-[180px] rounded-full absolute -top-24 left-[10%] transform-gpu" />
        <div className="w-[40%] h-[40%] bg-[#4dffe4]/10 blur-[60px] sm:blur-[160px] rounded-full absolute bottom-0 right-[5%] transform-gpu" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: High-Converting Value Prop & Deliverables */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-5">
              Enterprise Lead Generation &amp; Discovery
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              Ready to Transform Your Business with{" "}
              <span className="bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] bg-clip-text text-transparent">
                Zoho &amp; AI Automation?
              </span>
            </h2>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
              Book a free 45-minute architectural consultation. Our senior Zoho developers and business process strategists will audit your workflows and formulate a precise roadmap for scale.
            </p>

            {/* Value checklist: What You Receive */}
            <div className="bg-[#0b2142]/80 border border-[#08e5c0]/25 rounded-2xl p-6 mb-8 shadow-xl">
              <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-[#08e5c0] mb-4">
                What Happens on Your 45-Minute Discovery Session:
              </h3>
              <ul className="space-y-3.5">
                {[
                  {
                    title: "Operational Bottleneck Diagnosis",
                    desc: "We pinpoint exactly where manual tasks, duplicate entry, and lost leads drain revenue.",
                  },
                  {
                    title: "Zoho Architecture & Deluge Roadmap",
                    desc: "A tailored blueprint comparing Zoho CRM vs. Zoho One with necessary API integrations.",
                  },
                  {
                    title: "AI & Workflow Automation Potential",
                    desc: "Identify how autonomous AI agents, lead scoring, and automated pipelines can streamline repetitive workflows and accelerate response speed.",
                  },
                  {
                    title: "Transparent Milestones & Fixed-Scope Proposal",
                    desc: "Clear deliverables, realistic sprint timelines, and ROI metrics with zero hourly surprises.",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-200">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#08e5c0]/20 text-[#08e5c0] flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <div>
                      <strong className="text-white font-semibold">{item.title}:</strong>{" "}
                      <span className="text-gray-300">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking Button & Quick Contacts */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <Link
                href="https://insyrge.zohobookings.com/#/4623360000000149002"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#08e5c0] text-[#071831] font-bold text-base shadow-[0_0_25px_rgba(8,229,192,0.4)] hover:shadow-[0_0_35px_rgba(8,229,192,0.6)] hover:scale-105 transition-all duration-300"
              >
                Schedule 45-Min Discovery Call
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Direct Channel Badges */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#08e5c0]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 font-mono uppercase">Direct Email</div>
                  <a href="mailto:info@insyrge.com" className="text-xs font-semibold text-white hover:text-[#08e5c0]">
                    info@insyrge.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#08e5c0]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 font-mono uppercase">Direct Phone</div>
                  <a href="tel:+917973837217" className="text-xs font-semibold text-white hover:text-[#08e5c0]">
                    +91-7973837217
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Zoho Official Inbound Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 bg-[#0b2142] border border-[#08e5c0]/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative"
          >
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white">Send Us a Direct Message</h3>
                <p className="text-xs text-gray-400">Average response time: under 2 business hours</p>
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Inquiries Open
              </span>
            </div>

            <div className="relative w-full rounded-xl overflow-hidden bg-[#071831] border border-white/10">
              {!formLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#071831] z-10">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <svg className="animate-spin w-5 h-5 text-[#08e5c0]" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading Secure Form...
                  </div>
                </div>
              )}
              <iframe
                title="Contact Us Form"
                aria-label="Contact Us"
                frameBorder="0"
                loading="lazy"
                style={{ height: "540px", width: "100%", border: "none", display: "block" }}
                src="https://forms.zohopublic.com/insyrge/form/ContactUs/formperma/IrI485KNuG35FSmcP70DwXyfKLyerjLlpsqu6tLM6-k"
                onLoad={() => setFormLoaded(true)}
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-gray-400 font-mono">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[#08e5c0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                256-bit SSL Encrypted &amp; Confidential
              </span>
              <span>Mutual NDA Available</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
