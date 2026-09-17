"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedDivider from "../../ui/Banners/AnimatedDivider";

const HERO_BG =
  "https://images.ctfassets.net/pj0maraabon4/20gxsLPZfz1N0vIuEDdjaf/9af2d0c68ae3933b5c7f3cb82a80829b/retailMainImg.78a62ded6722d307358a.png";

export default function CookiePolicyHero() {
  return (
    <section className="relative w-full overflow-hidden bg-black h-[70vh] md:h-[85vh]">

      {/* Cinematic Background Zoom */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={HERO_BG}
          alt="Cookie Policy Banner"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-[1]" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        <div className="text-center max-w-4xl">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-5 text-xs sm:text-sm  uppercase tracking-[0.35em] text-white/60"
          >
            Legal Information
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-white font-semibold leading-tight
              text-[26px]
              sm:text-[36px]
              md:text-[48px]
              lg:text-[60px]"
          >
            Cookie Policy
            
          </motion.h1>
         <motion.p 
          initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-white/80 text-lg max-w-3xl leading-relaxed">This Cookie Notice explains how DLUX TECH CORP PTY LTD uses cookies,
          tracking technologies, and web beacons across our services.</motion.p>
          <AnimatedDivider/>
        </div>
      </div>
    </section>
  );
}
