"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ServiceIntroSectionProps {
  image: string;
  heading: string;
  leftText: string;
  rightText: string;
}

export default function ServiceIntroSection({
  image,
  heading,
  leftText,
  rightText,
}: ServiceIntroSectionProps) {
  return (
    <section className="relative py-16 md:py-8 lg:py-14 bg-black text-white overflow-hidden">

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-[45%]"
          >
            <div className="relative mb-8">
              {/* Soft glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FE780C]/20 to-transparent blur-3xl rounded-3xl scale-110" />

              <Image
                src={image}
                alt={heading}
                width={500}
                height={600}
                className="relative w-full max-w-[500px] h-auto rounded-2xl shadow-2xl"
              />
            </div>

            <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-gray-300 whitespace-pre-line">
              {leftText}
            </p>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-[55%]"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 leading-tight">
              {heading}
            </h3>

            <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-gray-300 whitespace-pre-line">
              {rightText}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
