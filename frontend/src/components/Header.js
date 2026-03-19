"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Services", path: "/services" },
    { name: "Blogs", path: "/blogs" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Extensions", path: "/extensions" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#081b33]/90 backdrop-blur-xl shadow-[0_0_20px_#08e5c040] border-b border-[#08e5c040]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between relative">
        {/* 🔮 Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/logo.png"
              alt="INSYRGE Logo"
              width={140}
              height={50}
              className="object-contain w-auto h-auto drop-shadow-[0_0_10px_#08e5c050] group-hover:drop-shadow-[0_0_20px_#08e5c080] transition-all duration-300"
              priority
            />
          </motion.div>
        </Link>

        {/* 🧭 Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-white/90 font-medium">
          {navLinks.map((link, i) => {
            const isActive =
              pathname === link.path ||
              (link.path !== "/" && pathname.startsWith(link.path));

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

                  {/* Neon underline (visible if active) */}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-linear-to-r from-[#08e5c0] to-[#00e6ff] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>

                  {/* Glow effect */}
                  {isActive && (
                    <div className="absolute -inset-x-2 -inset-y-2 bg-[#08e5c040] blur-lg rounded-lg opacity-30 transition-all duration-500"></div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* 🚀 CTA Button */}
        <motion.div
          whileHover={{ scale: 1.06 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="hidden md:block"
        >
          <a
            href="https://insyrge.zohobookings.com/#/4623360000000149002"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center px-6 py-2 rounded-full font-semibold text-[#081b33] bg-[#08e5c0] overflow-hidden transition-all duration-300 group"
          >
            <span className="relative z-10">Book a Consultancy Call</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#08e5c0] to-[#00e6ff] opacity-0 group-hover:opacity-100 blur-md transition-all duration-500"></div>
          </a>
        </motion.div>

        {/* 📱 Mobile Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white md:hidden z-50"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      {/* 📱 Mobile Dropdown */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-[#081b33]/95 backdrop-blur-2xl border-t border-[#08e5c030] text-center py-8"
          >
            <motion.div
              className="flex flex-col space-y-6 text-white text-lg"
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link, i) => {
                const isActive =
                  pathname === link.path ||
                  (link.path !== "/" && pathname.startsWith(link.path));

                return (
                  <motion.div
                    key={link.path}
                    custom={i}
                    variants={navItemVariants}
                    onClick={() => setMenuOpen(false)}
                  >
                    <Link
                      href={link.path}
                      className={`transition-all ${
                        isActive ? "text-[#08e5c0]" : "hover:text-[#08e5c0]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="bg-[#08e5c0] hover:bg-[#00e6ff] text-[#081b33] px-6 py-2 rounded-full font-semibold shadow-[0_0_20px_#08e5c040] transition-all"
                >
                  Book a Call
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
