"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    title: "Clean Codebase",
    text: "DLUX has been one of our most invaluable assets in the continued usage and uptake of Workfront across our business. Lux and his team have provided us with unique and customized solutions, and proactive engagement. Couldn't have done it without them!",
    name: "- Head of Campaign Operations and Delivery",
    location: "USA",
  },
  {
    id: 2,
    title: "Great Execution!",
    text: "DLUX's seamless integration with Adobe Workfront has been a game-changer for our project management efforts. The fully customizable and flexible workflow has saved time and boosted productivity.",
    name: "- Marketing Head",
    location: "USA",
  },
  {
    id: 3,
    title: "Tremendous Job Team",
    text: "I have thoroughly enjoyed my brainstorming sessions with the DLUX team. Their knowledge of the Workfront solution and professional services have always exceeded our expectations.",
    name: "– Group Project Manager",
    location: "UK",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentSlides = [
    testimonials[index % testimonials.length],
    testimonials[(index + 1) % testimonials.length],
  ];

  return (
    <section
      className="relative w-full text-white py-16 px-6 md:px-16 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Glow Background */}
      <div className="absolute top-[15%] left-[40%] w-80 h-80 rounded-full bg-gradient-to-r from-[#F12D06] to-[#F17C06] blur-[100px] opacity-70 -z-10" />

      <div className="flex flex-col-reverse lg:flex-row gap-10 2xl:justify-center items-center relative">
        {/* LEFT IMAGE */}
        <motion.div
          className="relative lg:pb-[250px]"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative w-full lg:w-[526px] lg:h-[413px] h-[300px]">
            <Image
              src="https://images.ctfassets.net/pj0maraabon4/41J54pCB5auSK01fbl2S1w/fbae03cb12070c737b18d86b09b2cf0b/90.png"
              alt="DLUX Client Success Testimonial"
              title="Client Success Story"
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width:768px) 100vw, 526px"
              priority
            />
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative m-auto lg:m-0"
        >
          <div className="absolute top-[30%] left-[10%] w-80 h-80 rounded-full bg-gradient-to-r from-[#BB7CE4] to-[#02162F] blur-[100px] opacity-80 z-0" />

          <p className="text-xl font-bold mb-2">
            <span className="border-2 border-[#ff3901] text-[#ff3901] px-2 py-[3px] rounded-md">
              Testimonials
            </span>
          </p>

          <h2
            id="testimonials-heading"
            className="text-3xl lg:text-5xl font-bold leading-snug mb-8"
          >
            <span className="bg-gradient-to-r from-[#ff3901] to-[#F07800] bg-clip-text text-transparent mr-1">
              Behind
            </span>
            Every Workflow,<br /> There's a Story!
          </h2>

          <div className="relative lg:-left-[20%]">
            {/* MOBILE */}
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide lg:hidden">
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="snap-center shrink-0 bg-neutral-900 rounded-xl p-6 w-full max-w-[80%] shadow-lg"
                >
                  <Quote className="w-6 h-6 mb-4 text-[#ff3901]" />
                  <p className="text-sm mb-4 leading-relaxed">
                    {item.text}
                  </p>
                  <p className="text-sm font-semibold">{item.name}</p>
                </div>
              ))}
            </div>

            {/* DESKTOP & TABLET */}
            <div className="hidden lg:flex gap-6 overflow-hidden h-auto lg:h-[280px]">
              <AnimatePresence mode="popLayout">
                {currentSlides.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ x: i === 0 ? 200 : 400, opacity: 0 }}
                    animate={{ x: i * 500, opacity: 1 }}
                    exit={{ x: -200, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative lg:absolute top-0 bg-neutral-900 rounded-xl p-6 w-full lg:w-[453px] lg:h-[296px] shadow-lg"
                  >
                    {i === 0 && (
                      <Quote className="absolute top-4 left-4 w-6 h-6 text-[#ff3901]" />
                    )}

                    <div className="pt-8 flex flex-col justify-between h-full">
                      <p className="text-sm lg:text-base mb-4 leading-relaxed flex-grow">
                        {item.text}
                      </p>
                      <p className="text-sm font-semibold">{item.name}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* DOTS */}
            <div className="hidden md:flex gap-2 mt-14 pl-[20%]">
              {testimonials.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === index
                      ? "bg-gradient-to-r from-[#EA7F60] to-[#F07800]"
                      : "bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
