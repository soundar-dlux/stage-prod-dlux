"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AemHero() {
  return (
    <section
      className="relative min-h-screen w-full bg-black overflow-hidden font-sans"
      aria-label="Adobe Experience Manager Hero Section"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="https://videos.ctfassets.net/pj0maraabon4/3o2G8BwlADTKKiWh4k3vD5/5fd146a64ef299e7d96913455d6a91cb/GettyImages-937055824.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-[1]" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-5xl text-center text-white">

          {/* Animated Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-4xl lg:text-[45px] font-semibold lg:leading-[50px]"
          >
            Adobe Experience Manager
            <br className="hidden md:block" />
            Edge Delivery Services & Latest AEM Innovations
          </motion.h1>

          {/* Animated Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-6 text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto"
          >
            Edge Delivery Services delivers ultra-fast, GEO-optimized experiences at the edge, powered by AEM’s performance-first architecture—boosting page speed, search visibility, developer velocity, and organic traffic without compromising governance or brand consistency.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 flex justify-center gap-4 flex-wrap"
          >
            <Link href="/resources/success-stories">
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#FE780C] to-[#FE3908] text-white font-semibold hover:scale-105 transition-transform duration-300">
                Watch Overview
              </button>
            </Link>

            <Link href="/contact-us">
              <button className="px-8 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-black transition duration-300">
                Contact Us
              </button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}