"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Layers, Users, Cpu, Unlink, Sparkles, Compass } from "lucide-react";
import Image from "next/image";

// ✨ Motion Variants
const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" },
  }),
};

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

const serviceSublinks = [
  {
    name: "Zoho CRM Consulting & Setup",
    path: "/services/zoho-crm-implementation",
    desc: "Pipelines, Blueprints, custom modules & analytics",
    icon: <Users className="w-4 h-4 text-[#08e5c0]" />,
  },
  {
    name: "Zoho One Enterprise Setup",
    path: "/services/zoho-one-consulting",
    desc: "45+ applications unified into one operating system",
    icon: <Layers className="w-4 h-4 text-[#00e0ff]" />,
  },
  {
    name: "Workflow & Process Automation",
    path: "/services/zoho-crm-automation",
    desc: "Deluge scripts, automated follow-ups & approvals",
    icon: <Cpu className="w-4 h-4 text-emerald-400" />,
  },
  {
    name: "API & 3rd-Party Integrations",
    path: "/services/crm-api-integration",
    desc: "Bi-directional sync with QuickBooks, Stripe & ERPs",
    icon: <Unlink className="w-4 h-4 text-purple-400" />,
  },
  {
    name: "AI + CRM Intelligent Agents",
    path: "/services/ai-automation-solutions",
    desc: "Autonomous 24/7 lead intake & Zia document OCR",
    icon: <Sparkles className="w-4 h-4 text-amber-400" />,
  },
  {
    name: "Solutions Architecture & Migration",
    path: "/services/solutions-architecture",
    desc: "Zero-downtime migration from Salesforce / HubSpot",
    icon: <Compass className="w-4 h-4 text-cyan-400" />,
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services", hasDropdown: true },
    { name: "Extensions", path: "/extensions" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Blogs", path: "/blogs" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#081b33]/95 backdrop-blur-xl shadow-[0_0_20px_#08e5c040] border-b border-[#08e5c040]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-3 sm:py-4 flex items-center justify-between relative">
        {/* 🔮 Logo */}
        <Link
          href="/"
          className="flex items-center shrink-0 group focus:outline-none"
          aria-label="Insyrge Home"
        >
          <Image
            src="/logo.png"
            alt="Insyrge - Zoho CRM & Business Automation Consulting"
            width={195}
            height={36}
            priority
            loading="eager"
            unoptimized
            className="h-8 sm:h-9 md:h-10 w-auto object-contain drop-shadow-[0_0_10px_#08e5c050] group-hover:drop-shadow-[0_0_20px_#08e5c080] transition-all duration-300"
          />
        </Link>

        {/* 🧭 Desktop Navigation */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-7 text-white/90 font-medium">
          {navLinks.map((link, i) => {
            const isActive =
              pathname === link.path ||
              (link.path !== "/" && pathname.startsWith(link.path));

            if (link.hasDropdown) {
              return (
                <div
                  key={link.path}
                  ref={dropdownRef}
                  className="relative group py-2"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <Link
                    href={link.path}
                    className={`inline-flex items-center gap-1 relative tracking-wide transition-all ${
                      isActive
                        ? "text-[#08e5c0]"
                        : "text-white/80 hover:text-[#08e5c0]"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                    {isActive && (
                      <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-gradient-to-r from-[#08e5c0] to-[#00e6ff]"></span>
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {servicesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -left-12 top-full pt-2 w-[420px] pointer-events-auto z-50"
                      >
                        <div className="bg-[#081d38] border border-[#08e5c0]/30 rounded-2xl p-4 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
                          <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400 font-semibold px-2 mb-2">
                            Core Capabilities
                          </div>
                          <div className="space-y-1">
                            {serviceSublinks.map((sub, sIdx) => (
                              <Link
                                key={sIdx}
                                href={sub.path}
                                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors group/item"
                              >
                                <span className="p-2 rounded-lg bg-white/5 border border-white/10 shrink-0 mt-0.5 group-hover/item:border-[#08e5c0]/40">
                                  {sub.icon}
                                </span>
                                <div>
                                  <div className="text-xs font-bold text-white group-hover/item:text-[#08e5c0] transition-colors">
                                    {sub.name}
                                  </div>
                                  <div className="text-[11px] text-gray-400 leading-snug">
                                    {sub.desc}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>

                          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between px-2 text-xs">
                            <Link
                              href="/services"
                              className="text-[#08e5c0] font-semibold hover:underline"
                            >
                              Explore All Services →
                            </Link>
                            <span className="text-[11px] text-gray-400">
                              Zoho Partner
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <motion.div
                key={link.path}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <Link
                  href={link.path}
                  className={`relative group tracking-wide transition-all ${
                    isActive
                      ? "text-[#08e5c0]"
                      : "text-white/80 hover:text-[#08e5c0]"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-[#08e5c0] to-[#00e6ff] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* 🚀 CTA Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="hidden md:block"
        >
          <a
            href="https://insyrge.zohobookings.com/#/4623360000000149002"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm text-[#081b33] bg-[#08e5c0] shadow-[0_0_20px_#08e5c050] hover:shadow-[0_0_25px_#08e5c080] transition-all duration-300 group"
          >
            <span className="relative z-10">Book a CRM Consultation</span>
          </a>
        </motion.div>

        {/* 📱 Mobile Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white lg:hidden z-50 p-2"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </motion.button>
      </div>

      {/* 📱 Mobile Dropdown */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden bg-[#081b33]/98 backdrop-blur-2xl border-t border-[#08e5c030] py-6 px-6 max-h-[calc(100dvh-5rem)] overflow-y-auto shadow-2xl"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-4 text-white text-base">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.path ||
                  (link.path !== "/" && pathname.startsWith(link.path));

                if (link.hasDropdown) {
                  return (
                    <div key={link.path} className="border-b border-white/5 pb-2">
                      <div className="flex items-center justify-between">
                        <Link
                          href={link.path}
                          onClick={() => setMenuOpen(false)}
                          className={`font-semibold ${
                            isActive ? "text-[#08e5c0]" : "text-white"
                          }`}
                        >
                          {link.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className="p-1 text-gray-400"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              mobileServicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {mobileServicesOpen && (
                        <div className="pl-4 mt-2 space-y-2 border-l border-white/10">
                          {serviceSublinks.map((sub, sIdx) => (
                            <Link
                              key={sIdx}
                              href={sub.path}
                              onClick={() => setMenuOpen(false)}
                              className="block text-xs text-gray-300 hover:text-[#08e5c0] py-1"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div key={link.path} className="border-b border-white/5 pb-2">
                    <Link
                      href={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`block font-semibold transition-all ${
                        isActive ? "text-[#08e5c0]" : "hover:text-[#08e5c0]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </div>
                );
              })}

              <div className="pt-4">
                <a
                  href="https://insyrge.zohobookings.com/#/4623360000000149002"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center bg-[#08e5c0] text-[#081b33] py-3 rounded-full font-bold text-sm shadow-[0_0_20px_#08e5c040] transition-all block"
                >
                  Book a CRM Consultation
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
