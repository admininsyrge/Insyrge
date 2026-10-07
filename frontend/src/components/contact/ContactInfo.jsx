"use client";
import React from "react";
import { Mail, Phone, Clock, MapPin, ShieldCheck, Zap } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="bg-[#101F44]/90 border border-[#1A2C55] rounded-3xl p-7 shadow-xl backdrop-blur-md">
      <span className="text-xs font-mono uppercase tracking-wider text-[#08e5c0] font-bold block mb-1">
        Direct Technical Channels
      </span>
      <h3 className="text-xl font-bold mb-4 text-white">
        Contact Information
      </h3>

      <div className="space-y-4 text-gray-300 text-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#08e5c0] shrink-0 mt-0.5">
            <Mail size={16} />
          </div>
          <div>
            <div className="text-[11px] font-mono text-gray-400 uppercase">Consulting Inquiries</div>
            <a
              href="mailto:info@insyrge.com"
              className="font-semibold text-white hover:text-[#08e5c0] transition-colors"
            >
              info@insyrge.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#08e5c0] shrink-0 mt-0.5">
            <Phone size={16} />
          </div>
          <div>
            <div className="text-[11px] font-mono text-gray-400 uppercase">Direct Phone</div>
            <a
              href="tel:+917973837217"
              className="font-semibold text-white hover:text-[#08e5c0] transition-colors"
            >
              +91 79738 37217
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#08e5c0] shrink-0 mt-0.5">
            <Clock size={16} />
          </div>
          <div>
            <div className="text-[11px] font-mono text-gray-400 uppercase">Response Time SLA</div>
            <div className="font-semibold text-white">
              Under 2 Business Hours
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#08e5c0] shrink-0 mt-0.5">
            <MapPin size={16} />
          </div>
          <div>
            <div className="text-[11px] font-mono text-gray-400 uppercase">Registered Office</div>
            <div className="text-xs text-gray-300 leading-relaxed">
              Unit 40, 8–10 Fourth Avenue, Blacktown, NSW 2148, Australia
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          Engineers On Standby
        </span>
        <span>Global Clients Served</span>
      </div>
    </div>
  );
}
