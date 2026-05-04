"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section className="relative bg-gradient-to-b from-[#0B1C3D] to-[#071831] text-white py-24 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[40%] h-[40%] bg-[#08e5c010] blur-[200px] rounded-full absolute -top-20 left-[10%]" />
        <div className="w-[30%] h-[30%] bg-[#08e5c008] blur-[180px] rounded-full absolute bottom-0 right-[10%]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-5">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Let&apos;s{" "}
              <span className="bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] bg-clip-text text-transparent">
                Talk Business
              </span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-md">
              Ready to transform your business operations? Schedule a free
              consultation and discover how we can help.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Zoho Premium Partner",
                "Expert Developers & Strategists",
                "100+ Successful Implementations",
                "Data-driven Business Solutions",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#08e5c0]/15 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#08e5c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>

            <Link
              href="https://insyrge.zohobookings.com/#/4623360000000149002"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#08e5c0] text-[#081b33] font-semibold shadow-lg animate-ctaPulse hover:scale-105 transition-transform duration-300"
            >
              Book Free Consultation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>

          {/* Right Side — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-2 rounded-2xl"
          >
            <iframe
              aria-label="Contact Us"
              frameBorder="0"
              style={{ height: "520px", width: "100%", border: "none", borderRadius: "14px" }}
              src="https://forms.zohopublic.com/insyrge/form/ContactUs/formperma/IrI485KNuG35FSmcP70DwXyfKLyerjLlpsqu6tLM6-k"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
