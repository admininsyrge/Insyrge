"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
    <footer className="relative bg-[#081b33] text-gray-300 py-16 px-6 sm:px-10 overflow-hidden">
      {/* === Background Glow Effects === */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#08e5c025] blur-[160px] rounded-full opacity-30" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#08e5c020] blur-[160px] rounded-full opacity-20" />

      {/* === Main Footer Content === */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* === Brand & Info === */}
        <div className="space-y-5">
          <Link href="/" className="inline-block">
            <img
              src="/logo.png"
              alt="Insyrge Logo"
              className="w-auto h-10 object-contain hover:opacity-90 transition-opacity duration-300"
            />
          </Link>

          <p className="text-gray-400 leading-relaxed">
            Empowering businesses with smart technology solutions and honest,
            straightforward service.
          </p>

          <div className="space-y-3 mt-5">
            <div className="flex items-start gap-3">
              <FaPhoneAlt className="text-[#08e5c0] mt-1 shrink-0" />
              <a
                href="tel:+917973837217"
                className="hover:text-[#08e5c0] transition-colors duration-200"
              >
                +91 79738 37217
              </a>
            </div>

            <div className="flex items-start gap-3">
              <FaEnvelope className="text-[#08e5c0] mt-1 shrink-0" />
              <a
                href="mailto:info@insyrge.com"
                className="hover:text-[#08e5c0] transition-colors duration-200"
              >
                info@insyrge.com
              </a>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-[#08e5c0] mt-1 shrink-0" />
              <address className="not-italic">
                Unit 40, 8–10 Fourth Avenue, Blacktown,
                <br />
                New South Wales, 2148, Australia
              </address>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-6">
            {[
              {
                icon: <FaLinkedin />,
                href: "https://www.linkedin.com/company/insyrge/",
              },
              { icon: <FaInstagram />, href: "https://instagram.com/insyrge" },
              { icon: <FaTwitter />, href: "https://x.com/insyrge" },
              { icon: <FaFacebook />, href: "https://facebook.com/insyrge" },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#08e5c0] transition-all duration-300 text-lg hover:drop-shadow-[0_0_8px_#08e5c0]"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* === Quick Links === */}
        <div className="sm:mx-auto">
          <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            {[
              { name: "About Us", href: "/about" },
              { name: "Our Services", href: "/services" },
              { name: "Blogs", href: "/blogs" },
              { name: "Portfolio", href: "/portfolio" },
              { name: "Extensions", href: "/extensions" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="relative group transition duration-200 inline-block"
                >
                  <span className="group-hover:text-[#08e5c0] transition duration-200">
                    {item.name}
                  </span>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#08e5c0] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* === Legal Section === */}
        <div className="sm:mx-auto">
          <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-400">
            {[
              { name: "Privacy Policy", href: "/privacy-policy" },
              { name: "Terms & Conditions", href: "/terms-and-conditions" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="relative group transition duration-200 inline-block"
                >
                  <span className="group-hover:text-[#08e5c0] transition duration-200">
                    {item.name}
                  </span>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#08e5c0] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* === CTA Section === */}
        <div className="lg:text-left sm:mt-0">
          <h3 className="text-white font-semibold text-lg mb-4">Get Started</h3>
          <p className="text-gray-400 mb-4 max-w-sm">
            Ready to transform your business? Schedule your free consultation
            today.
          </p>

          <Link
            href="https://insyrge.zohobookings.com/#/4623360000000149002"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-semibold px-6 py-3 rounded-full text-[#081b33] bg-[#08e5c0] hover:bg-[#00e6a8] transition-all duration-300 shadow-[0_0_20px_#08e5c060] hover:shadow-[0_0_30px_#08e5c090]"
          >
            Book Consultation
          </Link>
          <div className="my-4" />
         <Link
  href="https://support.insyrge.com/"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block font-semibold px-6 py-3 rounded-full text-[#081b33] bg-[#08e5c0] hover:bg-[#00e6a8] transition-all duration-300 shadow-[0_0_20px_#08e5c060] hover:shadow-[0_0_30px_#08e5c090]"
>
  Help Desk Portal
</Link>
        </div>
      </div>

      {/* === Footer Bottom (Updated with Legal Links) === */}
      <div className="relative z-10 mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-3">
          <Link
            href="/privacy-policy"
            className="hover:text-[#08e5c0] transition duration-200 relative group"
          >
            Privacy Policy
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#08e5c0] group-hover:w-full transition-all duration-300"></span>
          </Link>

          <span className="hidden sm:block text-gray-600">|</span>

          <Link
            href="/terms-and-conditions"
            className="hover:text-[#08e5c0] transition duration-200 relative group"
          >
            Terms & Conditions
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#08e5c0] group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
        © {year} <span className="text-[#08e5c0] font-medium">Insyrge</span>.
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
