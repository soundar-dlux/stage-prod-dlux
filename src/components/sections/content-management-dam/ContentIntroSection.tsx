"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type ContentIntroSectionProps = {
  title: string;
  imageUrl: string;
  description: string;
};

export default function ContentIntroSection({
  title,
  imageUrl,
  description,
}: ContentIntroSectionProps) {
  return (
    <section className="bg-black py-6 md:py-10 lg:py-14 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        <div className="grid gap-12 md:grid-cols-2 md:items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FE780C]/20 to-transparent blur-3xl rounded-2xl scale-110" />

            <Image
              src={imageUrl}
              alt={title}
              width={600}
              height={450}
              className="relative w-full max-w-lg rounded-xl shadow-2xl object-cover"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-bold lg:leading-tight">
              {title}
            </h2>

            <p className="whitespace-pre-line text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-gray-300">
              {description}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
