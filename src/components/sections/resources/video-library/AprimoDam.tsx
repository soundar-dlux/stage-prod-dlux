"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import Link from "next/link";

const cards = [
 {
    id: 1,
    title: "Muti-Site Manager to streamline workflows using Adobe Experience Manager",
    cta: "View Portfolio",
    image:
      "https://images.ctfassets.net/pj0maraabon4/7EfPXl9ZZaHz8NjhtQOi8r/00837fb56fcd5783cb686252e2f06deb/aem-01_1.jpg",
    video:
      "https://videos.ctfassets.net/pj0maraabon4/7jf1qEjn6aNNHJsCCGHDkI/3b044468574c6305bee30852860c589a/2.mp4",
  },
  {
    id: 2,
    title: "AEM edge Delivery Services,Low to No-Code Solutions",
    image:
      "https://images.ctfassets.net/pj0maraabon4/38YY6qkHaUxL15zPsAVkCY/cdf50e80478f340216d1e26ad75241d9/AEM-image-02.jpg",
    video:
      "https://videos.ctfassets.net/pj0maraabon4/1lbUJKgwWFFmyroHWJtlEj/0c6888136c8950b0a656ba6ed0d1f692/4.mp4",
  },
  {
    id: 3,
    title: "Ultimate Solution for your Content Safety and Recovery|Adobe Experience Manager",
    cta: "See Details",
    image:
      "https://images.ctfassets.net/pj0maraabon4/1suQj4cSZfdQwX2bTltDiz/3f33f984161b01813a01b8245dc128d7/AEM-Image-04.jpg",
    video:
      "https://videos.ctfassets.net/pj0maraabon4/1ekQavAh7Sw8xySwzNttlA/ab0d40f4bcb651e3f716f5d5fd7edd5a/15.mp4",
  },
];

export default function AprimoDam() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);

  const handleNext = () => {
    setDirection("next");
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setDirection("prev");
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const getVisibleCards = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(cards[(activeIndex + i) % cards.length]);
    }
    return visible;
  };

  // Disable scroll when video popup is open
  useEffect(() => {
    document.body.style.overflow = activeVideo ? "hidden" : "auto";
  }, [activeVideo]);

  return (
    <section
      className="text-white w-full m-auto flex flex-col justify-center items-center md:px-16 py-2 px-4 lg:pl-[80px] lg:pr-[120px]"
      aria-label="Content Supply Chain Section"
    >
      <style>
        {`
          @keyframes slow-ping {
            0% { transform: scale(1); opacity: 0.8; }
            80% { transform: scale(2.2); opacity: 0; }
            100% { transform: scale(2.2); opacity: 0; }
          }
          .animate-slow-ping {
            animation: slow-ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
        `}
      </style>

      <div className="flex flex-col-reverse lg:flex-row items-start justify-between w-full">
        {/* Left column - Big Card */}
        <div className="flex items-end overflow-hidden w-full relative">
          <AnimatePresence mode="wait" custom={direction}>
            {getVisibleCards().map(
              (card, i) =>
                i === 0 && (
                  <motion.div
                    key={card.id}
                    custom={direction}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="relative rounded-2xl flex-shrink-0 w-[100%] h-[400px] lg:w-[629px] lg:h-[558px] bg-cover bg-center cursor-pointer"
                    style={{ backgroundImage: `url(${card.image})` }}
                    onClick={() => setActiveVideo(card.video)}
                    role="button"
                    aria-label={`Play video: ${card.title}`}
                    title={card.title}
                  >
                    <p className="absolute bottom-0 left-0 w-full h-[35%] content-end pr-[60px] text-sm lg:text-lg text-white font-semibold px-4 py-2 bg-gradient-to-t from-black/100 via-black/80 to-transparent">
                      {card.title}
                    </p>

                    {/* Play Button with Slow Ripple Animation */}
                    <div className="absolute bottom-6 right-6">
                      <div className="relative flex items-center justify-center">
                        <span className="absolute w-14 h-14 rounded-full bg-white/30 animate-slow-ping"></span>
                        <span
                          className="absolute w-14 h-14 rounded-full bg-white/20 animate-slow-ping"
                          style={{ animationDelay: "0.6s" }}
                        ></span>
                        <span
                          className="absolute w-14 h-14 rounded-full bg-white/10 animate-slow-ping"
                          style={{ animationDelay: "1.2s" }}
                        ></span>

                        <div className="relative w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                          <Play className="text-black w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

        {/* Right Side Content + Small Cards */}
        <div className="relative flex flex-col gap-1 lg:ml-6 w-full mb-10 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-10"
          >
            <h2 className="text-3xl lg:text-5xl font-semibold">
              Content Supply Chain
            </h2>
            <p className="mt-3 text-gray-300 text-sm lg:text-[16px]">
              Deep driving you to the polished version of – AI Agents & Automation,
              Aprimo AI Suite, Video asset Management, Ecosystem Integrations, DAM
              trends, Recognized Leadership.
            </p>
          </motion.div>

          <div className="flex justify-between items-center mt-6">
            <Link href="/aprimo" target="_blank" rel="noopener noreferrer">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-4 bg-gradient-to-r from-[#ff3901] to-[#F07800] relative rounded-full font-medium flex items-center gap-2 overflow-hidden text-white"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                aria-label="Navigate to Aprimo page"
              >
                {hovered && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 rounded-full backdrop-blur-md bg-white/10 border border-white/40"
                  />
                )}

                <span className="relative z-10 text-white">Get Started</span>

                <div className="relative w-5 h-5 overflow-hidden">
                  <AnimatePresence initial={false} mode="wait">
                    {hovered ? (
                      <motion.div
                        key="arrow-hover"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute"
                      >
                        <ArrowRight size={18} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="arrow-normal"
                        initial={{ x: 0, opacity: 1 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute"
                      >
                        <ArrowRight size={18} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            </Link>

            {/* Arrows */}
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                aria-label="Previous Slide"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff3901] to-[#F07800] text-white flex items-center justify-center"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Slide"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff3901] to-[#F07800] text-white flex items-center justify-center"
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          {/* Small Cards */}
          <div className="hidden lg:flex gap-4 mt-6 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              {getVisibleCards()
                .slice(1)
                .map((card) => (
                  <motion.div
                    key={card.id}
                    custom={direction}
                    initial={{
                      opacity: 0,
                      x: direction === "next" ? 100 : -100,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ x: direction === "next" ? -100 : 100 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="rounded-2xl flex-shrink-0 w-[315px] h-[298px] bg-cover bg-center cursor-pointer"
                    style={{ backgroundImage: `url(${card.image})` }}
                    onClick={() => setActiveVideo(card.video)}
                    role="button"
                    aria-label={`Play video: ${card.title}`}
                    title={card.title}
                  ></motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full mt-8">
        <div className="w-full h-1 bg-gray-700 rounded">
          <div
            className="h-1 bg-gradient-to-r from-[#ff3901] to-[#F07800] rounded"
            style={{
              width: `${((activeIndex + 1) / cards.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Video Popup Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative rounded-xl shadow-xl p-4 bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center w-full h-full justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <button
                className="absolute top-4 right-4 text-black bg-white/10 backdrop-blur-md border border-black/20 rounded-full p-2 hover:bg-white/20 transition"
                onClick={() => setActiveVideo(null)}
                aria-label="Close Video"
              >
                <X size={24} />
              </button>

              <video
                src={activeVideo}
                controls
                autoPlay
                title="Content Supply Chain Video"
                className="w-[800px] h-[450px] object-contain rounded-lg bg-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
