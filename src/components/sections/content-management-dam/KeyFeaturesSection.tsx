"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Feature = {
  icon?: string;
  title: string;
  description: string;
};

type KeyFeaturesSectionProps = {
  heading: string;
  features: Feature[];
};

export default function KeyFeaturesSection({
  heading,
  features,
}: KeyFeaturesSectionProps) {
  return (
    <section className="bg-black text-white py-6 md:py-10 lg:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        {/* Heading */}
        <motion.h2 
         initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        className="text-3xl sm:text-3xl md:text-4xl text-center lg:text-5xl font-bold leading-tight max-w-5xl mx-auto">
            <span className="text-white">
              {heading.split(" ").slice(0, -2).join(" ")}
            </span>{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              {heading.split(" ").slice(-2).join(" ")}
            </span>
          </motion.h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-16 mt-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            className="relative rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 md:p-8  shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Glow Accent */}
              <div className="absolute -top-8 -right-8 w-[120px] h-[120px] bg-[#FE780C]/10 blur-3xl rounded-full pointer-events-none" />

              {feature.icon && (
                <div className="relative mb-6">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={120}
                    height={120}
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}

              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-sm sm:text-base md:text-lg leading-6 md:leading-7 text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
