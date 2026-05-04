"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const HeroHome = ({ data }) => {
  const sliderImages = data.sliderImages;

  return (
    <section className="relative w-full h-screen text-white overflow-hidden bg-[#081b33]">
      {/* === Background === */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#081b33] via-[#0a2642] to-[#081b33]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_30%,#08e5c025,transparent_50%),radial-gradient(circle_at_80%_70%,#00e0ff20,transparent_50%)]" />

      {/* === Slider (Full Screen) === */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={1200}
        className="w-full h-full"
      >
        {sliderImages.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              <Image
                src={src.image.url}
                alt={`Slide ${i + 1}`}
                fill
                sizes="100vw"
                className="object-cover"
                priority={i === 0}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#081b33]/70 via-black/50 to-[#081b33]/80" />

              {/* Glow accents */}
              <div className="absolute top-[15%] left-[5%] w-80 h-80 bg-[#08e5c0]/10 rounded-full blur-[150px]" />
              <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-[#00e0ff]/10 rounded-full blur-[150px]" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* === Text Content (overlaid on slider) === */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium bg-[#08e5c0]/10 text-[#08e5c0] border border-[#08e5c0]/20 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#08e5c0] animate-pulseGlow" />
            Zoho Premium Partner
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 leading-[1.1] max-w-5xl"
        >
          {data.title}{" "}
          <span className="bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] bg-clip-text text-transparent">
            Insyrge
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-2xl text-gray-300/90 mb-10 text-base sm:text-lg leading-relaxed"
        >
          {data.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="/services"
            className="inline-block bg-[#08e5c0] text-[#081b33] px-10 py-3.5 rounded-full font-semibold text-base shadow-lg animate-ctaPulse hover:scale-105 transition-transform duration-300"
          >
            {data.buttonText || "Explore Services"}
          </a>
          <a
            href="https://insyrge.zohobookings.com/#/4623360000000149002"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-[#08e5c0]/40 text-[#08e5c0] px-10 py-3.5 rounded-full font-semibold text-base backdrop-blur-sm hover:bg-[#08e5c0]/10 hover:border-[#08e5c0]/60 transition-all duration-300"
          >
            Book Free Consultation
          </a>
        </motion.div>
      </div>

      {/* === Scroll indicator === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-gray-400 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-gray-500 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-[#08e5c0] rounded-full" />
        </motion.div>
      </motion.div>

      {/* === Bottom accent === */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#08e5c0]/50 to-transparent z-10" />
    </section>
  );
};

export default HeroHome;
