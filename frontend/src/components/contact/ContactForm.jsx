"use client";
import { motion } from "framer-motion";
import React from "react";

const ContactForm = () => {
  return (
    <div className="bg-[#101F44]/80 backdrop-blur-lg border border-[#1A2C55] rounded-3xl shadow-[0_0_30px_#08e5c030] p-8 md:p-10">
      <h2 className="text-2xl font-semibold mb-6 text-[#08e5c0]">
        Fill out the form, and we’ll get back to you soon
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="rounded-xl overflow-hidden"
      >
        <iframe
          aria-label="Contact Us"
          frameBorder="0"
          style={{ height: "500px", width: "100%", border: "none" }}
          src="https://forms.zohopublic.com/insyrge/form/ContactUs/formperma/IrI485KNuG35FSmcP70DwXyfKLyerjLlpsqu6tLM6-k"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default ContactForm;
