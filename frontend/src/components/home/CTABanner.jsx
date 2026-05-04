"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="relative bg-[#061a33] text-white py-20 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle, #08e5c0 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }} />
        <div className="w-[60%] h-[100%] bg-[#08e5c015] blur-[200px] rounded-full absolute -left-[20%] top-0" />
        <div className="w-[40%] h-[80%] bg-[#08e5c010] blur-[200px] rounded-full absolute -right-[10%] top-[10%]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
            Ready to Transform Your{" "}
            <span className="bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] bg-clip-text text-transparent">
              Business
            </span>
            ?
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Join 100+ businesses that have streamlined their operations with
            Insyrge. Get a free consultation today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://insyrge.zohobookings.com/#/4623360000000149002"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#08e5c0] text-[#081b33] px-10 py-3.5 rounded-full font-semibold text-base shadow-lg animate-ctaPulse hover:scale-105 transition-transform duration-300"
            >
              Schedule Free Consultation
            </Link>
            <Link
              href="/contact"
              className="inline-block border border-[#08e5c0]/40 text-[#08e5c0] px-10 py-3.5 rounded-full font-semibold text-base hover:bg-[#08e5c0]/10 hover:border-[#08e5c0]/60 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
