"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function PartnerSection({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <section className="relative bg-[#081A39] text-white py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#08e5c018,transparent_60%)] opacity-80" />

      <div className="max-w-6xl mx-auto text-center px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
        </motion.div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={40}
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
              <div className="w-32 md:w-36 h-24 md:h-28 glass-card flex justify-center items-center">
                <img
                  src={logo.image.url}
                  alt={`Client Logo ${index + 1}`}
                  className="max-h-[55%] max-w-[65%] object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Accent line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#08e5c0]/30 to-transparent" />
    </section>
  );
}
