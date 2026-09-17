"use client";

import { useState, useEffect, useMemo, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

const SLIDES = [
  {
    key: "connect",
    text: "Connect smarter workflows",
    image:
      "https://images.ctfassets.net/pj0maraabon4/6vDoSXPPzlRf3DBUlmVmlH/1cb641a867c893fd3b9d124935dfd454/connect.png",
  },
  {
    key: "ai",
    text: "AI-powered automation",
    image:
      "https://images.ctfassets.net/pj0maraabon4/1yyjAjVB3onE3f7gBDwEpK/05740731cfb39529c5949085651b128b/ai_brain.png",
  },
];

const ImageLeft = ({ imageLeft, content1, content2 }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = useMemo(
    () => [
      { ...SLIDES[0], text: content1 },
      { ...SLIDES[1], text: content2 },
    ],
    [content1, content2]
  );

  useEffect(() => {
    if (!imageLeft) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(id);
  }, [imageLeft, slides.length]);

  if (!imageLeft) return null;

  const titleParts = imageLeft.title?.split(".") ?? [];
  const descParts = imageLeft.description?.split(".") ?? [];

  return (
    <section className="relative w-full bg-black text-white py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute -left-32 top-[-100px] w-[400px] h-[400px] bg-orange-500/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute right-[-150px] bottom-[-120px] w-[350px] h-[350px] bg-orange-400/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* 🔥 LEFT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center lg:justify-start"
        >
          <div className="relative w-[280px] sm:w-[340px] md:w-[400px] lg:w-[460px] aspect-square">

            {/* Main Image */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(255,80,0,0.25)]">
              <Image
                src={imageLeft.url || "/placeholder.png"}
                alt={imageLeft.title || "Fusion"}
                fill
                sizes="(max-width: 768px) 90vw, 460px"
                className="object-cover hover:scale-105 transition duration-700"
                priority
              />
            </div>

            {/* 🔥 Floating Glass Card */}
            <div className="
              absolute
              right-[-8%] md:right-[-10%]
              bottom-4
              w-[60%] sm:w-[50%] md:w-[42%]
              max-w-[240px]
              rounded-2xl
              p-4
              backdrop-blur-xl
              bg-white/10
              border border-white/20
              shadow-[0_15px_40px_rgba(0,0,0,0.4)]
            ">

              {/* Slide */}
              <div className="relative h-[140px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slides[activeIndex].key}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -25 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center"
                  >
                    <Image
                      src={slides[activeIndex].image}
                      alt="Slide"
                      width={50}
                      height={50}
                      className="mb-2 object-contain"
                    />

                    <p className="text-xs sm:text-sm font-semibold leading-snug text-white">
                      {slides[activeIndex].text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: index === activeIndex ? "22px" : "12px",
                      background:
                        index === activeIndex
                          ? BRAND.primary
                          : "rgba(255,255,255,0.3)",
                    }}
                  />
                ))}
              </div>
            </div>

          </div>
        </motion.div>

        {/* 🔥 RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-xl text-center lg:text-left mx-auto lg:mx-0"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="text-white">{titleParts[0]}</span>
            {titleParts[1] && (
              <>
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
                  }}
                >
                  {titleParts[1]}
                </span>
              </>
            )}
          </h2>

          <div className="mt-6 space-y-4 text-white/70 text-base md:text-lg leading-7">
            {descParts.slice(0, 4).map((text: string, i: number) => (
              <p key={i}>{text}</p>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex justify-center lg:justify-start">
            <button
              className="px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
                boxShadow: "0 10px 30px rgba(255,80,0,0.35)",
              }}
            >
              Explore Features →
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default memo(ImageLeft);