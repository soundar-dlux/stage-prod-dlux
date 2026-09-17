"use client";

import { motion } from "framer-motion";
import AnimatedDivider from "../../ui/Banners/AnimatedDivider";

type HeroSectionProps = {
  title: string;
  imageUrl?: string;
};

export default function HeroSection({ title, imageUrl }: HeroSectionProps) {
  return (
    <section className="relative h-[70vh] md:h-[90vh] w-full overflow-hidden bg-black">
      {/* Background with cinematic zoom */}
      {imageUrl && (
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 7, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover "
          />
        </motion.div>
      )}

      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85 z-[1]" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
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
          {/* Animated Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-5xl text-center text-white font-semibold
                       text-3xl md:text-4xl lg:text-5xl lg:leading-tight"
          >
            {title}
          </motion.h1>
          <AnimatedDivider />
        </div>
      </div>
    </section>
  );
}
