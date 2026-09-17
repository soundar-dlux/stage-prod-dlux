"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedDivider from "../../ui/Banners/AnimatedDivider";

interface HeroSectionProps {
  title: string;
  imageUrl: string;
}

export default function HeroSection({ title, imageUrl }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-black h-[70vh] md:h-[80vh]">
      {/* Background Image with cinematic zoom */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 7, ease: "easeOut" }}
        className="relative h-full w-full"
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85 z-[1]" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        <div className="text-center max-w-5xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-5 text-xs sm:text-sm  uppercase tracking-[0.35em] text-white/65"
          >
            Our Services
          </motion.p>
          {/* Heading Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-white font-semibold lg:leading-tight
             text-3xl
              md:text-4xl
              lg:text-5xl
              "
          >
          Invest in Resilience, Build Lasting Success<br/> Train. Transform. Triumph
          </motion.h1>

        <AnimatedDivider/>
        </div>
      </div>
    </section>
  );
}
