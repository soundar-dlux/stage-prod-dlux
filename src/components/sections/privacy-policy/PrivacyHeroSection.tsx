"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedDivider from "../../ui/Banners/AnimatedDivider";

const HERO_BG =
  "https://images.ctfassets.net/pj0maraabon4/20gxsLPZfz1N0vIuEDdjaf/9af2d0c68ae3933b5c7f3cb82a80829b/retailMainImg.78a62ded6722d307358a.png";

export default function PrivacyHeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-black h-[65vh] md:h-[75vh] lg:h-[80vh]"
      aria-label="Privacy Policy Hero Section"
    >
      {/* Cinematic Background Zoom */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 7, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={HERO_BG}
          alt="DLUX Privacy Policy background banner"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/90 z-[1]" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        <div className="text-center max-w-4xl">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-5 text-xs sm:text-sm  uppercase tracking-[0.35em] text-white/70"
          >
            Legal Information
          </motion.p>

          {/* Main Heading (SEO Important H1) */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-white font-semibold leading-tight
              text-[28px]
              sm:text-[36px]
              md:text-[48px]
              lg:text-[60px]"
          >
            Privacy Policy
            <br />
            <span className="text-white/80 font-normal">
              Your Data. Your Rights. Our Responsibility.
            </span>
          </motion.h1>

          <AnimatedDivider/>
        </div>
      </div>
    </section>
  );
}
