"use client";

import { BASE_URL } from "@/API";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function PartnerSection({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <section className="relative bg-[#081A39] text-white py-24 overflow-hidden">
      {/* === Background Glow === */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#08e5c030,transparent_70%),radial-gradient(circle_at_70%_70%,#00e6c030,transparent_70%)] blur-3xl opacity-60" />

      <div className="max-w-6xl mx-auto text-center px-6 relative z-10">
        {/* === Heading === */}
        <h2 className="text-3xl md:text-4xl font-bold mb-14">
          Trusted by{" "}
          <span className="text-[#08e5c0] drop-shadow-[0_0_12px_#08e5c0]">
            100+ Clients
          </span>{" "}
          Across Industries
        </h2>

        {/* === Slider === */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          loop
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={4000}
          allowTouchMove={false}
          className="flex items-center"
        >
          {data.concat(data).map((logo, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center"
            >
              {/* === Card Container === */}
              <motion.div
                // whileHover={{
                //   scale: 1.08,
                //   boxShadow: "0 0 30px rgba(0,255,136,0.2)",
                // }}
                className="w-32 md:w-36 h-24 md:h-28 bg-white/10 border border-[#1A2C55] backdrop-blur-sm rounded-2xl flex justify-center items-center"
              >
                <motion.img
                  src={`${BASE_URL}/uploads/${logo.image}`}
                  alt={`Client Logo ${index + 1}`}
                  className="max-h-[60%] max-w-[70%] object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* === Bottom Glow === */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#08e5c0] via-[#00e6c0] to-transparent opacity-50" />
    </section>
  );
}
