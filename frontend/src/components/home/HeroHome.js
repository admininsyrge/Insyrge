"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { BASE_URL } from "@/API";

const HeroHome = ({ data }) => {
  const sliderImages = data.sliderImages;

  return (
    <section className="relative w-full h-screen text-white overflow-hidden bg-[#081b33]">
      {/* === Futuristic Background Layer === */}
      <div className="absolute inset-0 bg-linear-to-b from-[#081b33] via-[#0a2642] to-[#081b33]" />
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_30%,#08e5c033,transparent_60%),radial-gradient(circle_at_80%_70%,#00e0ff33,transparent_60%)]" />
      {/* Moving Light Beam */}
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-transparent via-[#08e5c033] to-transparent"
        animate={{ x: ["-150%", "150%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* === Slider (Full Screen) === */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        speed={900}
        className="w-full h-full"
      >
        {sliderImages.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <Image
                src={`${BASE_URL}/uploads/${src.image}`}
                alt={`Slide ${i + 1}`}
                fill
                className="object-cover transition-transform duration-1000 ease-in-out scale-105 hover:scale-110"
                priority={i === 0}
              />

              {/* Overlay Tint */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />

              {/* Futuristic Glow Circles */}
              <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-[#08e5c0]/20 rounded-full blur-[120px]" />
              <div className="absolute bottom-[15%] right-[10%] w-64 h-64 bg-[#00e0ff]/20 rounded-full blur-[120px]" />

              {/* Text Overlay */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
                >
                  {data.title}{" "}
                  <span className="text-[#08e5c0] drop-shadow-[0_0_12px_#08e5c0]">
                    Insyrge
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="max-w-2xl text-gray-300 mb-8 text-lg"
                >
                  {data.subtitle}
                </motion.p>

                <motion.a
                  href="/services"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(8,229,192,0.7)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-[#08e5c0] text-[#081b33] px-10 py-3 rounded-full font-semibold shadow-lg transition-all hover:bg-[#06d8b2]"
                >
                  {data.buttonText}
                </motion.a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* === Optional: Bottom Subtle Glow Bar === */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-[#08e5c0] via-[#00e0ff] to-transparent opacity-60" />
    </section>
  );
};

export default HeroHome;
