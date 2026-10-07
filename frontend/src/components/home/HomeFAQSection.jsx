"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { homeFaqs } from "@/data/homeFaqs";

export default function HomeFAQSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(0); // first open by default

  const categories = ["All", "Zoho CRM & Suite", "API & Integrations", "AI & Automation", "Process & Delivery", "Support & SLA"];

  const filteredFaqs = useMemo(() => {
    return homeFaqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All" || faq.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative bg-[#071831] py-24 text-white overflow-hidden border-t border-[#08e5c0]/15">
      {/* Background ambient glow - mobile GPU-friendly */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#08e5c0]/15 rounded-full blur-[50px] sm:blur-[140px] transform-gpu" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-4">
            Answers &amp; Technical Insights
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Everything you need to know about partnering with Insyrge for Zoho CRM implementations, custom Deluge software development, third-party API integrations, and AI workflow automation.
          </p>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="space-y-4 mb-10">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="faq-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g., Deluge, pricing, timelines, AI, migration)..."
              aria-label="Search frequently asked questions"
              className="w-full pl-12 pr-4 py-3 rounded-full bg-[#0b2142] border border-[#08e5c0]/25 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#08e5c0] focus:ring-1 focus:ring-[#08e5c0] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search query"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-gray-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="FAQ categories">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#08e5c0] text-[#071831] shadow-[0_0_15px_rgba(8,229,192,0.3)]"
                    : "bg-[#0c2242] text-gray-300 hover:text-white border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-16">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              No matching answers found for &ldquo;{searchQuery}&rdquo;. Try another search term or schedule a discovery call with our team.
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const buttonId = `faq-btn-${index}`;
              const panelId = `faq-panel-${index}`;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-[#0b2142] border-[#08e5c0]/50 shadow-[0_0_25px_rgba(8,229,192,0.15)]"
                      : "bg-[#091e3b]/80 border-white/10 hover:border-[#08e5c0]/30"
                  }`}
                >
                  <button
                    id={buttonId}
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/5 text-[#08e5c0]">
                        {faq.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? "bg-[#08e5c0] text-[#071831] rotate-180"
                          : "bg-white/10 text-gray-300"
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-6 pt-2 text-gray-300 text-sm sm:text-base leading-relaxed border-t border-white/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom CTA Card */}
        <div className="bg-[#0b2142] border border-[#08e5c0]/30 rounded-2xl p-8 text-center relative overflow-hidden">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Have a Specific Architectural or Integration Question?
          </h3>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-6">
            Speak directly with a senior Insyrge Zoho Solutions Architect. We will evaluate your technical landscape and explain how to achieve your desired workflow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://insyrge.zohobookings.com/#/4623360000000149002"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#08e5c0] text-[#071831] font-bold text-sm shadow-[0_0_20px_rgba(8,229,192,0.35)] hover:scale-105 transition-all"
            >
              Schedule 45-Minute Discovery Call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="#contact-form-section"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
            >
              Send Us a Message
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
