"use client";

import { motion } from "framer-motion";

export default function ParadigmSection() {
  return (
    <section className="w-full py-6 md:py-10 lg:py-14 px-4 bg-black overflow-hidden">
      <div className="max-w-[1050px] mx-auto relative">

        {/* Glow Accent */}
        <div className="absolute inset-0 flex justify-center">
          <div className="w-[300px] h-[300px] bg-[#FE780C]/10 blur-[120px] rounded-full pointer-events-none" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="
            relative
            bg-[#1a1a1a]
            rounded-2xl
            text-center
            px-6 sm:px-10
            py-10 sm:py-14 md:py-16
            shadow-2xl
          "
        >
          {/* Title */}
          <h2
            className="
              text-brand-primary
              font-bold
              text-lg sm:text-xl md:text-2xl lg:text-3xl
              lg:leading-snug
            "
          >
            A Paradigm Shift in Retail Dynamics:
            <br className="hidden md:block" />
            Embracing Technology Advancements
          </h2>

          {/* Quote */}
          <p
            className="
              mt-6
              text-white
              text-sm sm:text-base md:text-lg
              leading-6 md:leading-8
              font-normal
            "
          >
            “52% of retail tasks can be automated using current technology,
            reducing errors, enhancing service quality, increasing employee
            productivity, and saving costs. In today’s fiercely competitive
            market, automation is not merely an option but a vital necessity.”
          </p>

          {/* Source */}
          <p className="mt-6 text-white text-xs sm:text-sm md:text-base font-medium">
            — McKinsey report
          </p>

        </motion.div>
      </div>
    </section>
  );
}
