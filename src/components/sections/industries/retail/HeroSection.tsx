"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedDivider from "@/src/components/ui/Banners/AnimatedDivider";

const HERO_BG =
  "https://images.ctfassets.net/pj0maraabon4/20gxsLPZfz1N0vIuEDdjaf/9af2d0c68ae3933b5c7f3cb82a80829b/retailMainImg.78a62ded6722d307358a.png";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-black h-[80vh] md:h-[90vh]">
      {/* Background with cinematic zoom */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 7, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={HERO_BG}
          alt="Retail main banner"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85 z-[1]" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        <div className="text-center max-w-4xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-5 text-xs sm:text-sm  uppercase tracking-[0.35em] text-white/65"
          >
            Industries
          </motion.p>
          {/* Animated Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-white font-semibold lg:leading-tight
              text-3xl
              md:text-4xl
              lg:text-5xl"
          >
            Retail Excellence: Connecting Strategies for <span className="text-brand-primary">Customer Centricity</span>
          </motion.h1>
          <AnimatedDivider />
        </div>
      </div>
    </section>
  );
}
