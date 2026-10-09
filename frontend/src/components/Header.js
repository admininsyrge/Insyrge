"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Layers,
  Users,
  Cpu,
  Unlink,
  Sparkles,
  Compass,
  FileText,
  Code2,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Calendar,
  Award,
} from "lucide-react";
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

// 🏛️ Structured Service Capabilities for Mega Menu
const architectureServices = [
  {
    name: "Zoho CRM Consulting & Setup",
    path: "/services/zoho-crm-implementation",
    desc: "Pipelines, Blueprints, custom modules & KPI dashboards",
    icon: <Users className="w-4 h-4 text-[#08e5c0]" />,
    badge: "Popular",
    badgeStyle: "bg-[#08e5c0]/15 text-[#08e5c0] border-[#08e5c0]/30",
  },
  {
    name: "Zoho One Enterprise Setup",
    path: "/services/zoho-one-consulting",
    desc: "45+ applications unified into one operating system",
    icon: <Layers className="w-4 h-4 text-[#00e0ff]" />,
    badge: "Enterprise",
    badgeStyle: "bg-[#00e0ff]/15 text-[#00e0ff] border-[#00e0ff]/30",
  },
  {
    name: "Solutions Architecture & Migration",
    path: "/services/solutions-architecture",
    desc: "Zero-downtime cutover from Salesforce, HubSpot or legacy CRM",
    icon: <Compass className="w-4 h-4 text-cyan-400" />,
    badge: "Migration",
    badgeStyle: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  },
  {
    name: "Business Process Consulting",
    path: "/services/business-process-technology-consulting",
    desc: "Operational workflow audits & tech stack ROI roadmaps",
    icon: <FileText className="w-4 h-4 text-indigo-400" />,
  },
];

const engineeringServices = [
  {
    name: "Workflow & Deluge Automation",
    path: "/services/zoho-crm-automation",
    desc: "Advanced Deluge scripts, automated follow-ups & approvals",
    icon: <Cpu className="w-4 h-4 text-emerald-400" />,
    badge: "High ROI",
    badgeStyle: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  {
    name: "API & 3rd-Party Integrations",
    path: "/services/crm-api-integration",
    desc: "Bi-directional sync with QuickBooks, Stripe, ERPs & custom APIs",
    icon: <Unlink className="w-4 h-4 text-purple-400" />,
  },
  {
    name: "AI + CRM Intelligent Agents",
    path: "/services/ai-automation-solutions",
    desc: "Autonomous 24/7 lead intake, Zia OCR & AI agentic workflows",
    icon: <Sparkles className="w-4 h-4 text-amber-400" />,
    badge: "AI-Powered",
    badgeStyle: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
  {
    name: "Custom Extensions & Portals",
    path: "/services/custom-extension-development",
    desc: "9+ published apps, custom React widgets & Creator portals",
    icon: <Code2 className="w-4 h-4 text-rose-400" />,
    badge: "9+ Apps",
    badgeStyle: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
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

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 180);
  };

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
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
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        servicesDropdownOpen ? "rotate-180 text-[#08e5c0]" : "group-hover:rotate-180"
                      }`}
                    />
                    {isActive && (
                      <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-gradient-to-r from-[#08e5c0] to-[#00e6ff]" />
                    )}
                  </Link>

                  {/* 🚀 Enhanced Mega-Menu Dropdown */}
                  <AnimatePresence>
                    {servicesDropdownOpen && (
                      <>
                        {/* Subtle background dim overlay for maximum contrast and focus */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="fixed inset-0 top-[70px] bg-black/40 backdrop-blur-[2px] -z-10 pointer-events-none"
                        />

                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          style={{ backgroundColor: "#06172d", borderRadius: "1rem" }}
                          className="absolute left-1/2 -translate-x-[30%] xl:-translate-x-[26%] top-full pt-2.5 w-[920px] xl:w-[980px] max-w-[calc(100vw-2.5rem)] pointer-events-auto z-50 shadow-[0_30px_90px_rgba(0,0,0,0.98)]"
                        >
                          <div
                            style={{ backgroundColor: "#06172d" }}
                            className="border border-[#08e5c0]/35 rounded-2xl p-5 relative overflow-hidden"
                          >
                            {/* Ambient Cyber Light Glow */}
                            <div className="absolute -top-24 -left-20 w-64 h-64 bg-[#08e5c0]/15 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-24 -right-20 w-64 h-64 bg-[#00e0ff]/10 rounded-full blur-3xl pointer-events-none" />

                          <div className="grid grid-cols-12 gap-5 relative z-10">
                            {/* === Left 8 Columns: Categorized Capabilities Grid === */}
                            <div className="col-span-8 flex flex-col justify-between">
                              <div className="grid grid-cols-2 gap-4">
                                {/* Column 1: Core Zoho & Architecture */}
                                <div>
                                  <div className="flex items-center gap-1.5 px-2 mb-2 text-[11px] font-mono uppercase tracking-wider text-[#08e5c0] font-bold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#08e5c0]" />
                                    <span>Core Architecture</span>
                                  </div>
                                  <div className="space-y-1">
                                    {architectureServices.map((sub, sIdx) => (
                                      <Link
                                        key={sIdx}
                                        href={sub.path}
                                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/[0.06] border border-transparent hover:border-[#08e5c0]/30 transition-all group/item"
                                      >
                                        <span className="p-1.5 rounded-lg bg-white/5 border border-white/10 shrink-0 mt-0.5 group-hover/item:border-[#08e5c0]/50 group-hover/item:bg-[#08e5c0]/10 transition-colors">
                                          {sub.icon}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                          <div className="flex items-center gap-1.5 flex-wrap">
                                            <span className="text-xs font-bold text-white group-hover/item:text-[#08e5c0] transition-colors leading-snug">
                                              {sub.name}
                                            </span>
                                            {sub.badge && (
                                              <span
                                                className={`text-[9px] font-mono px-1.5 py-0.2 rounded border font-semibold shrink-0 ${sub.badgeStyle}`}
                                              >
                                                {sub.badge}
                                              </span>
                                            )}
                                          </div>
                                          <div className="text-[11px] text-gray-400 leading-snug group-hover/item:text-gray-300 mt-0.5">
                                            {sub.desc}
                                          </div>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                </div>

                                {/* Column 2: Automation, Integrations & AI */}
                                <div>
                                  <div className="flex items-center gap-1.5 px-2 mb-2 text-[11px] font-mono uppercase tracking-wider text-[#00e0ff] font-bold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00e0ff]" />
                                    <span>Automation &amp; AI</span>
                                  </div>
                                  <div className="space-y-1">
                                    {engineeringServices.map((sub, sIdx) => (
                                      <Link
                                        key={sIdx}
                                        href={sub.path}
                                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/[0.06] border border-transparent hover:border-[#00e0ff]/30 transition-all group/item"
                                      >
                                        <span className="p-1.5 rounded-lg bg-white/5 border border-white/10 shrink-0 mt-0.5 group-hover/item:border-[#00e0ff]/50 group-hover/item:bg-[#00e0ff]/10 transition-colors">
                                          {sub.icon}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                          <div className="flex items-center gap-1.5 flex-wrap">
                                            <span className="text-xs font-bold text-white group-hover/item:text-[#08e5c0] transition-colors leading-snug">
                                              {sub.name}
                                            </span>
                                            {sub.badge && (
                                              <span
                                                className={`text-[9px] font-mono px-1.5 py-0.2 rounded border font-semibold shrink-0 ${sub.badgeStyle}`}
                                              >
                                                {sub.badge}
                                              </span>
                                            )}
                                          </div>
                                          <div className="text-[11px] text-gray-400 leading-snug group-hover/item:text-gray-300 mt-0.5">
                                            {sub.desc}
                                          </div>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* === Right 4 Columns: Spotlight & High-Conversion Showcase === */}
                            <div className="col-span-4 bg-gradient-to-br from-[#0c2447] via-[#091e3b] to-[#07162d] rounded-xl p-3.5 border border-[#08e5c0]/30 flex flex-col justify-between shadow-inner">
                              <div>
                                {/* Spotlight Card: Free Consultation */}
                                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#08e5c0]/40 transition-colors mb-3">
                                  <div className="flex items-center gap-1.5 mb-1.5">
                                    <span className="p-1 rounded-md bg-[#08e5c0]/15 text-[#08e5c0]">
                                      <Calendar className="w-3.5 h-3.5" />
                                    </span>
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#08e5c0]">
                                      Free Consultation
                                    </span>
                                  </div>
                                  <h4 className="text-xs font-bold text-white mb-1">
                                    45-Min Architecture Audit
                                  </h4>
                                  <p className="text-[11px] text-gray-300 leading-snug mb-2.5">
                                    Diagnose CRM bottlenecks and map a fixed-scope automation blueprint.
                                  </p>
                                  <a
                                    href="https://insyrge.zohobookings.com/#/4623360000000149002"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#081b33] bg-[#08e5c0] px-3 py-1.5 rounded-lg hover:bg-[#33ffd0] shadow-[0_0_12px_#08e5c040] transition-all w-full justify-center"
                                  >
                                    <span>Book Architecture Call</span>
                                    <ArrowRight className="w-3 h-3" />
                                  </a>
                                </div>

                                {/* Marketplace Apps Direct Pill */}
                                <Link
                                  href="/extensions"
                                  className="block p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#00e0ff]/40 hover:bg-white/[0.05] transition-all group/ext"
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-1.5">
                                      <Award className="w-3.5 h-3.5 text-[#00e0ff]" />
                                      <span className="text-[11px] font-bold text-white group-hover/ext:text-[#00e0ff] transition-colors">
                                        Zoho Marketplace Apps
                                      </span>
                                    </div>
                                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#00e0ff]/15 text-[#00e0ff] border border-[#00e0ff]/30 font-semibold">
                                      9+ Apps
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-gray-400 leading-snug">
                                    Explore verified enterprise plugins trusted worldwide.
                                  </p>
                                </Link>
                              </div>

                              {/* Trust Guarantees */}
                              <div className="pt-2.5 mt-2.5 border-t border-white/10 space-y-1 text-[10px] text-gray-300 font-medium">
                                <div className="flex items-center gap-1.5">
                                  <ShieldCheck className="w-3 h-3 text-[#08e5c0] shrink-0" />
                                  <span>100% Code &amp; IP Ownership</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <CheckCircle className="w-3 h-3 text-[#08e5c0] shrink-0" />
                                  <span>Mutual NDA Protected</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* === Bottom Bar: View All & Verification === */}
                          <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between px-2 text-xs">
                            <Link
                              href="/services"
                              className="inline-flex items-center gap-1.5 text-[#08e5c0] font-bold hover:text-white transition-colors group/all"
                            >
                              <span>Explore All 12 Capabilities &amp; Services</span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/all:translate-x-1" />
                            </Link>
                            <div className="flex items-center gap-2 text-gray-400 text-[11px]">
                              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              <span>Verified Zoho Consulting &amp; Marketplace Developer</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </>
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
                  />
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

      {/* 📱 Mobile Dropdown Menu */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden bg-[#081b33]/98 backdrop-blur-2xl border-t border-[#08e5c030] py-6 px-4 sm:px-6 max-h-[calc(100dvh-4.5rem)] overflow-y-auto shadow-2xl"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-3.5 text-white text-base">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.path ||
                  (link.path !== "/" && pathname.startsWith(link.path));

                if (link.hasDropdown) {
                  return (
                    <div key={link.path} className="border-b border-white/5 pb-3">
                      <div className="flex items-center justify-between">
                        <Link
                          href={link.path}
                          onClick={() => setMenuOpen(false)}
                          className={`font-semibold text-lg ${
                            isActive ? "text-[#08e5c0]" : "text-white"
                          }`}
                        >
                          {link.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className="p-2 text-gray-300 hover:text-[#08e5c0] transition-colors"
                          aria-label="Toggle Services submenu"
                        >
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-200 ${
                              mobileServicesOpen ? "rotate-180 text-[#08e5c0]" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {/* 📱 Enhanced Mobile Services Accordion */}
                      {mobileServicesOpen && (
                        <div className="mt-3 space-y-4 pt-2">
                          {/* Section 1: Core Architecture */}
                          <div>
                            <div className="text-[11px] font-mono uppercase tracking-wider text-[#08e5c0] font-bold px-1 mb-2">
                              Core Architecture
                            </div>
                            <div className="space-y-1.5">
                              {architectureServices.map((sub, sIdx) => (
                                <Link
                                  key={sIdx}
                                  href={sub.path}
                                  onClick={() => setMenuOpen(false)}
                                  className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.03] active:bg-[#08e5c0]/10 border border-white/5 transition-colors"
                                >
                                  <span className="p-1.5 rounded-lg bg-white/5 border border-white/10 shrink-0 mt-0.5">
                                    {sub.icon}
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="text-xs font-bold text-white truncate">
                                        {sub.name}
                                      </span>
                                      {sub.badge && (
                                        <span
                                          className={`text-[9px] font-mono px-1 py-0.2 rounded border font-semibold ${sub.badgeStyle}`}
                                        >
                                          {sub.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-gray-400 line-clamp-1 leading-tight mt-0.5">
                                      {sub.desc}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Section 2: Automation & AI */}
                          <div>
                            <div className="text-[11px] font-mono uppercase tracking-wider text-[#00e0ff] font-bold px-1 mb-2">
                              Automation &amp; AI
                            </div>
                            <div className="space-y-1.5">
                              {engineeringServices.map((sub, sIdx) => (
                                <Link
                                  key={sIdx}
                                  href={sub.path}
                                  onClick={() => setMenuOpen(false)}
                                  className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.03] active:bg-[#00e0ff]/10 border border-white/5 transition-colors"
                                >
                                  <span className="p-1.5 rounded-lg bg-white/5 border border-white/10 shrink-0 mt-0.5">
                                    {sub.icon}
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="text-xs font-bold text-white truncate">
                                        {sub.name}
                                      </span>
                                      {sub.badge && (
                                        <span
                                          className={`text-[9px] font-mono px-1 py-0.2 rounded border font-semibold ${sub.badgeStyle}`}
                                        >
                                          {sub.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-gray-400 line-clamp-1 leading-tight mt-0.5">
                                      {sub.desc}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Quick Mobile Action Links */}
                          <div className="pt-2 flex flex-col gap-2">
                            <Link
                              href="/services"
                              onClick={() => setMenuOpen(false)}
                              className="text-center py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-[#08e5c0] flex items-center justify-center gap-1.5"
                            >
                              <span>Explore All Services &amp; Capabilities</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>

                            <a
                              href="https://insyrge.zohobookings.com/#/4623360000000149002"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setMenuOpen(false)}
                              className="text-center py-2 px-3 rounded-xl bg-[#08e5c0]/15 border border-[#08e5c0]/30 text-xs font-bold text-white flex items-center justify-center gap-1.5"
                            >
                              <Calendar className="w-3.5 h-3.5 text-[#08e5c0]" />
                              <span>Free 45-Min Architecture Audit</span>
                            </a>
                          </div>
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
                      className={`block font-semibold text-lg transition-all ${
                        isActive ? "text-[#08e5c0]" : "hover:text-[#08e5c0]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </div>
                );
              })}

              <div className="pt-3">
                <a
                  href="https://insyrge.zohobookings.com/#/4623360000000149002"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center bg-[#08e5c0] text-[#081b33] py-3.5 rounded-full font-bold text-sm shadow-[0_0_20px_#08e5c040] transition-all block"
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
