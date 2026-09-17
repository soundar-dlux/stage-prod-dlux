"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface JourneyItem {
  title: string;
  description: string;
  imageUrl?: string;
}

interface FutureReadyWorkforceSectionProps {
  heading: string;
  items: JourneyItem[];
}

export default function FutureReadyWorkforceSection({
  heading,
  items,
}: FutureReadyWorkforceSectionProps) {
  return (
    <section className="bg-gradient-to-b from-neutral-900 to-black text-white py-10 lg:py-14 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">

        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 leading-snug md:leading-tight"
        >
          <span className="text-white">
              {heading.split(" ").slice(0, -2).join(" ")}
            </span>{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              {heading.split(" ").slice(-2).join(" ")}
            </span>
    
        </motion.h2>

        <div className="space-y-16 md:space-y-20">
          {items.map((item, index) => {
            const isReverse = index % 2 !== 0;

            return (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
              >              
                <motion.div
                  initial={{ opacity: 0, x: isReverse ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`${isReverse ? "lg:order-2" : ""}`}
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 lg:leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-gray-300 whitespace-pre-line max-w-xl">
                    {item.description}
                  </p>
                </motion.div>

                {/* Image */}
                {item.imageUrl && (
                  <motion.div
                    initial={{ opacity: 0, x: isReverse ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className={`flex justify-center ${isReverse ? "lg:order-1" : ""}`}
                  >
                    <div className="relative">
                      {/* Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FE780C]/20 to-transparent blur-3xl rounded-2xl scale-110" />

                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={1000}
                        height={400}
                        className="relative  lg:rounded-2xl shadow-2xl object-cover"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
