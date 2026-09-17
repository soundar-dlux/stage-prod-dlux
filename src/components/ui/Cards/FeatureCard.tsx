"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  height?: string;
}

export default function FeatureCard({
  title,
  description,
  image,
  height = "260px",
}: FeatureCardProps) {
  const fastEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.55, ease: fastEase }}
      viewport={{ once: true }}
      style={{ transformPerspective: 1200 }}
      whileHover={{ y: -8 }}
      className="w-[405px] flex flex-col items-center gap-6 group will-change-transform"
    >
      {/* 🔹 IMAGE SECTION */}
      <div
        style={{ height }}
        className="relative w-full overflow-hidden rounded-t-[32px]"
      >
        <Image src={image} alt={title} fill className="object-cover" />

        {/* Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />

        {/* Subtle top light glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_60%)]" />
      </div>

      {/* 🔹 CONTENT SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: fastEase }}
        viewport={{ once: true }}
        className="
          relative
          w-full
          rounded-[32px]
          bg-gradient-to-b from-[#111] via-[#0b0b0b] to-black
          p-8
          transition-all duration-300
        "
      >
        <div className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />

        <h3 className="text-2xl font-semibold mb-4 text-white">{title}</h3>

        <p className="text-neutral-400 text-[15px] leading-relaxed">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
}
