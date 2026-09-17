"use client";

import { motion } from "framer-motion";

type OneStopSectionProps = {
  title: string;
  description: string;
};

export default function OneStopSection({
  title,
  description,
}: OneStopSectionProps) {
  return (
    <section className="bg-black py-6 md:py-10 lg:py-10 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 text-center relative">

        {/* Soft Glow Accent */}
        <div className="absolute inset-0 flex justify-center">
          <div className="w-[300px] h-[300px] bg-[#FE780C]/10 blur-[120px] rounded-full pointer-events-none" />
        </div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mb-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-snug lg:leading-tight"
        >
          {title}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative whitespace-pre-line text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-gray-300"
        >
          {description}
        </motion.p>

      </div>
    </section>
  );
}
