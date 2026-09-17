"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ServiceIntroSectionProps {
  heading: string;
  imageUrl?: string;
  leftDescription: string;
  rightDescription: string;
}

export default function ServiceIntroSection({
  heading,
  imageUrl,
  leftDescription,
  rightDescription,
}: ServiceIntroSectionProps) {
  return (
    <section className="bg-black text-white py-10 lg:py-14 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {imageUrl && (
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FE780C]/20 to-transparent blur-3xl rounded-2xl scale-110" />

                <Image
                  src={imageUrl}
                  alt={heading}
                  width={600}
                  height={500}
                  className="relative w-full max-w-md md:max-w-lg rounded-2xl object-cover shadow-2xl"
                />
              </div>
            )}

            <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-gray-300">
              {leftDescription}
            </p>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold lg:leading-tight">
              {heading}
            </h2>

            <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-gray-300 whitespace-pre-line">
              {rightDescription}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
