"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";

const Footer = () => {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative bg-[#081b33] text-gray-300 py-16 px-6 sm:px-10 overflow-hidden border-t border-[#08e5c0]/20">
      {/* === Decorative Top Border === */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#08e5c0]/50 to-transparent" />

      {/* === Background Glow Effects === */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#08e5c020] blur-[180px] rounded-full opacity-25" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#08e5c015] blur-[180px] rounded-full opacity-20" />

      {/* === Main Footer Content === */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* === Brand & Info === */}
        <div className="space-y-5">
          <Link href="/" className="inline-block" aria-label="Insyrge Home">
            <Image
              src="/logo.png"
              alt="Insyrge - Zoho CRM & Business Automation Consulting"
              width={195}
              height={36}
              unoptimized
              className="h-9 w-auto object-contain hover:opacity-90 transition-opacity duration-300"
            />
          </Link>

          <p className="text-gray-400 leading-relaxed text-sm">
            Certified Zoho consulting partner and solutions architecture firm. Helping growing enterprises implement, customize, and automate Zoho CRM, Zoho One, Deluge scripting, and intelligent business workflows.
          </p>

          <div className="space-y-3 mt-5">
            <div className="flex items-start gap-3">
              <FaPhoneAlt className="text-[#08e5c0] mt-1 shrink-0" aria-hidden="true" />
              <a
                href="tel:+917973837217"
                className="hover:text-[#08e5c0] transition-colors duration-200 text-sm"
              >
                +91 79738 37217
              </a>
            </div>

            <div className="flex items-start gap-3">
              <FaEnvelope className="text-[#08e5c0] mt-1 shrink-0" aria-hidden="true" />
              <a
                href="mailto:info@insyrge.com"
                className="hover:text-[#08e5c0] transition-colors duration-200 text-sm"
              >
                info@insyrge.com
              </a>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-[#08e5c0] mt-1 shrink-0" aria-hidden="true" />
              <address className="not-italic text-sm text-gray-400">
                Unit 40, 8–10 Fourth Avenue, Blacktown,
                <br />
                New South Wales, 2148, Australia
              </address>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-6">
            {[
              {
                icon: <FaLinkedin aria-hidden="true" />,
                label: "Follow Insyrge on LinkedIn",
                href: "https://www.linkedin.com/company/insyrge/",
              },
              {
                icon: <FaInstagram aria-hidden="true" />,
                label: "Follow Insyrge on Instagram",
                href: "https://instagram.com/insyrge",
              },
              {
                icon: <FaTwitter aria-hidden="true" />,
                label: "Follow Insyrge on X (formerly Twitter)",
                href: "https://x.com/insyrge",
              },
              {
                icon: <FaFacebook aria-hidden="true" />,
                label: "Follow Insyrge on Facebook",
                href: "https://facebook.com/insyrge",
              },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="text-gray-400 hover:text-[#08e5c0] transition-all duration-300 text-lg hover:drop-shadow-[0_0_8px_#08e5c0]"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* === Zoho Services === */}
        <div className="sm:mx-auto">
          <h3 className="text-white font-bold text-base mb-4 font-mono uppercase tracking-wider text-[#08e5c0]">
            Core Services
          </h3>
          <ul className="space-y-2.5 text-sm text-gray-400">
            {[
              { name: "Zoho CRM Implementation", href: "/services/zoho-crm-implementation" },
              { name: "Zoho One Enterprise Setup", href: "/services/zoho-one-consulting" },
              { name: "Workflow Automation", href: "/services/zoho-crm-automation" },
              { name: "API & ERP Integrations", href: "/services/crm-api-integration" },
              { name: "AI + CRM Solutions", href: "/services/ai-automation-solutions" },
              { name: "Solutions Architecture", href: "/services/solutions-architecture" },
              { name: "All Enterprise Services", href: "/services" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="hover:text-[#08e5c0] transition-colors duration-200 inline-block"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* === Products & Company === */}
        <div className="sm:mx-auto">
          <h3 className="text-white font-bold text-base mb-4 font-mono uppercase tracking-wider text-[#08e5c0]">
            Platform &amp; Firm
          </h3>
          <ul className="space-y-2.5 text-sm text-gray-400">
            {[
              { name: "Marketplace Extensions", href: "/extensions" },
              { name: "HOVER Integration", href: "/extensions/hover-integration-for-zoho-crm" },
              { name: "Verified Case Studies", href: "/portfolio" },
              { name: "Technical Blog & Guides", href: "/blogs" },
              { name: "About Leadership", href: "/about" },
              { name: "Privacy Policy", href: "/privacy-policy" },
              { name: "Terms & Conditions", href: "/terms-and-conditions" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="hover:text-[#08e5c0] transition-colors duration-200 inline-block"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* === CTA Section === */}
        <div className="lg:text-left sm:mt-0">
          <h3 className="text-white font-bold text-base mb-4 font-mono uppercase tracking-wider text-[#08e5c0]">
            Get Started
          </h3>
          <p className="text-gray-400 mb-5 text-sm leading-relaxed">
            Ready to eliminate manual bottlenecks and scale your operations with Zoho? Schedule your free 45-minute discovery consultation.
          </p>

          <a
            href="https://insyrge.zohobookings.com/#/4623360000000149002"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-bold text-xs sm:text-sm px-6 py-3 rounded-full text-[#081b33] bg-[#08e5c0] hover:bg-[#00e6a8] transition-all duration-300 shadow-[0_0_20px_#08e5c060] hover:shadow-[0_0_30px_#08e5c090]"
          >
            Book a CRM Consultation
          </a>

          <div className="my-3" />

          <a
            href="https://support.insyrge.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-semibold text-xs px-5 py-2.5 rounded-full text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all"
          >
            Help Desk Portal
          </a>

          <div className="mt-4 text-xs text-gray-500 font-mono">
            Average Response: &lt; 2 Business Hours
          </div>
        </div>
      </div>

      {/* === Footer Bottom === */}
      <div className="relative z-10 mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-3">
          <Link
            href="/privacy-policy"
            className="hover:text-[#08e5c0] transition duration-200"
          >
            Privacy Policy
          </Link>
          <span className="hidden sm:block text-gray-700">|</span>
          <Link
            href="/terms-and-conditions"
            className="hover:text-[#08e5c0] transition duration-200"
          >
            Terms &amp; Conditions
          </Link>
        </div>
        © {year} <span className="text-[#08e5c0] font-medium">Insyrge</span>.
        All rights reserved. 100% Client Code &amp; IP Ownership.
      </div>
    </footer>
  );
};

export default Footer;
