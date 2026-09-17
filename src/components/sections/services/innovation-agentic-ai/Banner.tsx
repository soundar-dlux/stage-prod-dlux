"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedDivider from "@/src/components/ui/Banners/AnimatedDivider";

const Banner: FC = () => {
  const premiumEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section className="relative w-full h-screen overflow-hidden">
      
      {/* 🎥 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.ctfassets.net/pj0maraabon4/6lXk8P6wnOUDwso2SLZq7j/20447ba45900b5c53fb23e52ac57fea0/GettyImages-970820198.mp4"
          type="video/mp4"
        />
      </video>

      {/* 🌑 Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      {/* 🔥 Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="max-w-5xl"
        >
          <h1 className="font-semibold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            <span className="text-white block">
              Innovation Agentic AI
            </span>

            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent block mt-2">
              Professional Services
            </span>
          </h1>
        </motion.div>

        {/* Sub Text */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: premiumEase }}
          className="mt-6 sm:mt-8 text-white/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed"
        >
          DLUX designs and deploys autonomous, multi-agent marketing
          systems engineered to maximise performance, speed, and
          intelligence — with governance built in.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: premiumEase }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          <Link
            href="/resources/video-library"
            className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 rounded-full border border-orange-500 text-white hover:bg-orange-500/10 hover:scale-105 transition-all duration-300"
          >
            Watch Demo Videos
          </Link>

          <Link
            href="/contact-us"
            className="w-full sm:w-auto text-center px-8 sm:px-10 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 font-semibold text-white hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(249,115,22,0.5)]"
          >
            Book a Free Strategy Call
          </Link>
        </motion.div>

        {/* Divider */}
        <div className="mt-10 sm:mt-12 w-full max-w-xl">
          <AnimatedDivider />
        </div>
      </div>
    </section>
  );
};

export default Banner;