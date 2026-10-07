"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, FileText, ShieldCheck, Lock, ExternalLink, ArrowRight } from "lucide-react";

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState("form"); // "form" | "calendar"
  const [formLoaded, setFormLoaded] = useState(false);

  return (
    <div className="bg-[#101F44]/90 backdrop-blur-lg border border-[#1A2C55] rounded-3xl shadow-[0_0_40px_rgba(8,229,192,0.15)] p-6 sm:p-8 md:p-10">
      {/* Switcher Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#081a33] border border-white/10 mb-6 max-w-md">
        <button
          type="button"
          onClick={() => setActiveTab("form")}
          className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "form"
              ? "bg-[#08e5c0] text-[#071831] shadow-[0_0_15px_rgba(8,229,192,0.3)]"
              : "text-gray-300 hover:text-white"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Submit Project Details</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("calendar")}
          className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "calendar"
              ? "bg-[#08e5c0] text-[#071831] shadow-[0_0_15px_rgba(8,229,192,0.3)]"
              : "text-gray-300 hover:text-white"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Book Discovery Call</span>
        </button>
      </div>

      {activeTab === "form" ? (
        <div>
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Submit Your Consultation Request
              </h2>
              <p className="text-xs sm:text-sm text-gray-300">
                Guaranteed response within 2 business hours by a Senior Solutions Architect.
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Inquiries Open
            </span>
          </div>

          {/* Tips for high quality scoping */}
          <div className="mb-4 p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-gray-300 flex flex-wrap items-center justify-between gap-2">
            <span>Helpful details: Current CRM / tools • Team size • Integration goals</span>
            <span className="text-[#08e5c0] font-semibold flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> 100% Confidential
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl overflow-hidden bg-[#071831] border border-white/10 relative"
          >
            {!formLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#071831] z-10 min-h-[500px]">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <svg className="animate-spin w-5 h-5 text-[#08e5c0]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Loading Secure Zoho Inbound Form...
                </div>
              </div>
            )}
            <iframe
              title="Contact Us Form"
              aria-label="Contact Us"
              loading="lazy"
              style={{ height: "540px", width: "100%", border: "none", display: "block" }}
              src="https://forms.zohopublic.com/insyrge/form/ContactUs/formperma/IrI485KNuG35FSmcP70DwXyfKLyerjLlpsqu6tLM6-k"
              onLoad={() => setFormLoaded(true)}
            />
          </motion.div>

          <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#08e5c0]" />
              256-Bit SSL Encrypted &amp; Confidential
            </span>
            <span>Bilateral NDA Executed on Request</span>
          </div>
        </div>
      ) : (
        /* CALENDAR TAB */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#08e5c0]/15 text-[#08e5c0] border border-[#08e5c0]/30 mx-auto flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">
            Schedule a 45-Minute Discovery Session
          </h3>
          <p className="text-gray-300 text-sm max-w-lg mx-auto mb-6 leading-relaxed">
            Pick a time directly on our live calendar to speak 1-on-1 with a Principal Zoho Solutions Architect. We&apos;ll diagnose operational bottlenecks and discuss your technical roadmap.
          </p>

          <div className="p-6 rounded-2xl bg-[#071831] border border-white/10 max-w-lg mx-auto mb-6 text-left space-y-2.5 text-xs text-gray-300">
            <div className="font-bold text-white text-sm mb-1 text-[#08e5c0]">
              What We&apos;ll Cover on the Call:
            </div>
            <div>• Current CRM &amp; business software audit</div>
            <div>• Manual tasks &amp; process bottlenecks diagnosis</div>
            <div>• Zoho CRM vs. Zoho One architecture options</div>
            <div>• Deluge scripts, API connections &amp; AI opportunities</div>
            <div>• Realistic sprint milestones and budget estimates</div>
          </div>

          <a
            href="https://insyrge.zohobookings.com/#/4623360000000149002"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-[#08e5c0] text-[#071831] shadow-[0_0_25px_rgba(8,229,192,0.4)] hover:shadow-[0_0_35px_rgba(8,229,192,0.6)] hover:scale-105 transition-all"
          >
            Open Live Calendar in New Window
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      )}
    </div>
  );
}
