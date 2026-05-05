"use client";
import React from "react";

const ServicesHero = ({ data }) => {
  return (
    <section className="relative bg-[#081b33] text-white py-28 overflow-hidden">

      {/* Static Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#08e5c022,#081b33_80%)] opacity-70" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-8">

        <h1 className="text-4xl md:text-6xl font-extrabold text-[#08e5c0]">
          {data.title}
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          {data.subtitle}
        </p>

        <a
          href="https://insyrge.zohobookings.com/#/4623360000000149002"
          className="
            inline-block bg-[#08e5c0] text-[#081b33]
            px-10 py-4 rounded-full font-semibold mt-6
            shadow-md transition-all duration-300
            hover:shadow-[0_0_20px_rgba(8,229,192,0.5)]
            hover:scale-105
          "
        >
          {data.buttonText}
        </a>

      </div>
    </section>
  );
};

export default ServicesHero;