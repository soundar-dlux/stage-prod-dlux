"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface BringItToLifeProps {
  /** Main section title */
  title?: React.ReactNode;
  /** Highlight text inside title */
  highlightText?: string;
  /** Highlight text color class */
  highlightColor?: string;
  /** List of 4 implementation steps */
  steps?: StepItem[];
  /** Image URL path (leave empty for empty image space) */
  imageSrc?: string;
  /** Image Alt text */
  imageAlt?: string;
  /** Custom image node override */
  customImage?: React.ReactNode;
  /** Background color variant */
  bgVariant?: "white" | "light" | "transparent";
  /** Custom outer container class names */
  className?: string;
}

const defaultSteps: StepItem[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "We start by understanding your business goals, customer journeys, existing data sources, and current technology environment, so the roadmap is grounded in where you actually are today, not a generic starting point.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "We define the data architecture, identity strategy, and governance model, along with a phased implementation roadmap, so every later decision has a solid foundation to build on.",
  },
  {
    number: "03",
    title: "Deliver",
    description:
      "We implement the platform: integrations, unified customer profiles, audiences, and activation, tailored to whichever Adobe Experience Cloud applications are in scope for your business.",
  },
  {
    number: "04",
    title: "Drive Value",
    description:
      "Launch isn't the finish line. We support adoption, monitor performance, and continue optimising the platform so it keeps delivering value as your business evolves.",
  },
];

export function BringItToLifeSection({
  title = (
    <>
      How we <span className="text-[#FF4F00]">bring it to life</span>
    </>
  ),
  steps = defaultSteps,
  imageSrc = "https://images.ctfassets.net/pj0maraabon4/4RcVS0TeO62qAkGh2CXKp0/99c920dedfc777d9ea160639f9838e0d/How_we_bring_it_to_life.png",
  imageAlt = "How we bring it to life",
  customImage,
  bgVariant = "white",
  className = "",
}: BringItToLifeProps) {
  const bgStyles = {
    white: "bg-white text-black",
    light: "bg-[#FFF8F5] text-black",
    transparent: "bg-transparent text-black",
  };

  const safeImageSrc = imageSrc?.startsWith("http://")
    ? imageSrc.replace("http://", "https://")
    : imageSrc?.startsWith("//")
    ? `https:${imageSrc}`
    : imageSrc;

  return (
    <section
      className={`w-full py-[40px] px-4 sm:px-6 lg:px-8 font-sans ${bgStyles[bgVariant]} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
          {/* =================================================== */}
          {/* 🔹 LEFT COLUMN: Title & Step Items                 */}
          {/* =================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 lg:col-span-7 flex flex-col justify-center"
          >
            {/* Section Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-black leading-tight mb-8 sm:mb-10">
              {title}
            </h2>

            {/* Steps List */}
            <div className="w-full flex flex-col">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="w-full border-t border-gray-200 py-6 sm:py-7 flex items-start gap-4 sm:gap-6"
                >
                  {/* Step Number */}
                  <span className="text-gray-900 font-bold text-sm sm:text-base w-8 sm:w-10 shrink-0 pt-0.5">
                    {step.number}
                  </span>

                  {/* Step Title & Description */}
                  <div className="flex-1 text-sm sm:text-[15px] leading-relaxed text-gray-600 font-normal">
                    <strong className="text-[#FF4F00] font-bold mr-1.5">
                      {step.title}:
                    </strong>
                    <span>{step.description}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* =================================================== */}
          {/* 🔹 RIGHT COLUMN: Image Area (Empty Placeholder)    */}
          {/* =================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="col-span-1 lg:col-span-5 w-full flex justify-center"
          >
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-w-[540px] rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-lg border border-gray-200/80 bg-gray-50 flex items-center justify-center">
              {customImage ? (
                customImage
              ) : safeImageSrc ? (
                <Image
                  src={safeImageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center rounded-[28px] sm:rounded-[32px]"
                />
              ) : (
                /* Empty Image Space Placeholder Frame */
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50 via-orange-50/20 to-gray-100 rounded-[28px] sm:rounded-[32px] border-2 border-dashed border-gray-300/70 text-gray-400 group hover:border-[#FF4F00]/50 transition-colors duration-300">
                  <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-[#FF4F00] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    <ImageIcon className="w-8 h-8 stroke-[1.75]" />
                  </div>
                  <span className="text-sm font-medium text-gray-400 text-center">
                    Image Space (Empty)
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default BringItToLifeSection;
