"use client";
import React from "react";
import { Mail, Phone, Clock } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="bg-[#101F44]/80 border border-[#1A2C55] rounded-3xl p-8 shadow-[0_0_20px_#08e5c030]">
      <h3 className="text-xl font-semibold mb-4 text-[#08e5c0]">
        Get in Touch
      </h3>
      <div className="space-y-3 text-gray-300">
        <p className="flex items-center gap-2">
          <Phone className="text-[#08e5c0]" size={18} /> +91 79738 37217
        </p>
        <p className="flex items-center gap-2">
          <Mail className="text-[#08e5c0]" size={18} /> info@insyrge.com
        </p>
        <p className="flex items-center gap-2">
          <Clock className="text-[#08e5c0]" size={18} /> Mon - Fri: 9 AM - 6 PM
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
