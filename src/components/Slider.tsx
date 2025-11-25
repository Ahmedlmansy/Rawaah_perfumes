"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";

interface SlideType {
  img: string;
  title: string;
  price: string;
}

const slides: SlideType[] = [
  {
    img: "/img/slider/slider-thumb1.jpg",
    title: "Scandinavians Collection",
    price: "$75.00",
  },
  {
    img: "/img/slider/slider-thumb2.jpg",
    title: "Scandinavians Collection",
    price: "$75.00",
  },
  {
    img: "/img/slider/slider-thumb3.jpg",
    title: "Scandinavians Collection",
    price: "$75.00",
  },
];

export default function SliderWithAnimation() {
  const [active, setActive] = useState(0);

  const container = {
    initial: { opacity: 0, x: 40 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, staggerChildren: 0.15 },
    },
  };

  const item = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{ clickable: true }}
      navigation
      modules={[Pagination, Navigation]}
      className="mySwiper h-[490px]"
      onSlideChange={(swiper) => setActive(swiper.realIndex)}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="relative">
          <Image src={slide.img} alt="" fill className="object-cover" />

          <motion.div
            key={active === index ? "active-" + index : "inactive-" + index}
            variants={container}
            initial="initial"
            animate="animate"
            className="absolute w-[250px] top-[90px] right-[75px]"
          >
            <motion.h5
              variants={item}
              className="text-[#ab8e66] text-[16px] font-semibold"
            >
              New Arrivals!
            </motion.h5>

            <motion.h3 variants={item} className="text-[30px] font-bold mt-2">
              {slide.title}
            </motion.h3>

            <motion.div
              variants={item}
              className="text-[18px] text-[#666] mt-3"
            >
              Price from:
              <span className="text-[28px] text-[#ab8e66] font-semibold ml-2">
                {slide.price}
              </span>
            </motion.div>

            <motion.a
              variants={item}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              href="#"
              className="underline mt-4 inline-block"
            >
              Shop now
            </motion.a>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
//  card : max-w-sm mx-auto bg-white/40 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg overflow-hidden
//
//
//
//
//
//
//
//
//
//
//
//
//
