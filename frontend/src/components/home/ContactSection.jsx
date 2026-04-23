"use client";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section className="bg-[#0B1C3D] text-white py-20 relative">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-8 items-start">
        {/* Left Side */}
        <div>
          <h2 className="text-4xl font-bold mb-6">
            Let’s <span className="text-[#08e5c0]">Talk Business</span>
          </h2>
          <ul className="space-y-4 text-gray-300">
            <li>✅ Zoho Premium Partner</li>
            <li>✅ Expert Developers & Strategists</li>
            <li>✅ 100+ Successful Implementations</li>
            <li>✅ Data-driven Business Solutions</li>
          </ul>
        </div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <iframe
            aria-label="Contact Us"
            frameBorder="0"
            style={{ height: "500px", width: "100%", border: "none" }}
            src="https://forms.zohopublic.com/insyrge/form/ContactUs/formperma/IrI485KNuG35FSmcP70DwXyfKLyerjLlpsqu6tLM6-k"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
