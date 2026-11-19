"use client";

import RotatingStarburst from "@/src/components/WB-Component/Loader";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const capabilities = [
  {
    imageUrl:
      "https://images.ctfassets.net/pj0maraabon4/UnRgbGU2gc6T4TOWWEzIE/c0108f5d636b97bfe47b118d46de7835/Mask_group.svg",
    title: "Unify Your Data",
    description:
      "Bring together data from CRM, eCommerce, marketing, sales, and support into one real-time customer profile. Break down the silos that cause inconsistent experiences, improve data accuracy, and give every team a trusted, AI-ready foundation to work from. ",
  },
  {
    imageUrl:
      "https://images.ctfassets.net/pj0maraabon4/7JyAxKvXuBsQczbFJGp6fJ/ebe74a1f1b403c18784ab66e94263744/Mask_group__1_.svg",
    title: "Activate in real time",
    description:
      "Turn insight into action the moment it matters. Use live customer data to activate audiences across web, mobile, email, and advertising channels, reaching the right person with the right message at the right time. ",
  },
  {
    imageUrl:
      "https://images.ctfassets.net/pj0maraabon4/1RZRsklAXcohhRt1R4GhJ7/23a87b8693dd5b469b440dfaaee55898/Mask_group__3_.svg",
    title: "Personalize every journey",
    description:
      "Every interaction is an opportunity. By tailoring each touchpoint using real-time insights, teams can create consistent, relevant experiences across channels that deepen engagement, build loyalty, and drive higher conversions. ",
  },
  {
    imageUrl:
      "https://images.ctfassets.net/pj0maraabon4/1MpAISDYfeLMtahDf8qRhE/cfd9821c35be9a3a4fc7a435d27d88e5/Mask_group__2_.svg",
    title: "Predict with AI",
    description:
      "Go beyond reporting to prediction. Analyzing unified, real-time data surfaces patterns in customer behavior, sharpens targeting, and equips teams to make data-driven decisions that turn marketing spend into measurable ROI. ",
  },
];

export function CapabilitiesSection() {
  return (
    <section className="relative w-full bg-white py-[40px] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            HEADER AREA
           ========================================================= */}
        <div className="flex items-start justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-xs font -helios uppercase tracking-widest font-semibold text-[#FF4F00] block mb-2">
              Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-black lg:leading-tight">
              <span className="text-[#FF4F00]">AEP</span> Capabilities
            </h2>
            <p className="mt-3 text-gray-500 text-sm sm:text-base max-w-xl">
              Area provides real insights, without the data overload.
            </p>
          </div>

          {/* Top Right Orange Starburst Icon Image */}
          <div className="hidden sm:block pt-2">
            <Image
              src="https://images.ctfassets.net/pj0maraabon4/6JM6DpM8LlCNPaafthkbXt/4a4dc908e4ad043329a340fd9003be19/image_1.svg"
              alt="Rotating Starburst"
              width={120}
              height={120}
              className="animate-[spin_20s_linear_infinite] object-contain"
            />
          </div>
        </div>

        {/* Divider */}

        {/* =========================================================
            4-COLUMN CAPABILITIES GRID
           ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12 sm:mb-16">
          {capabilities.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-start"
              >
                <div className="w-full border-t border-gray-100 mb-10 sm:mb-14" />

                {/* Image */}
                <div className="mb-4 relative flex items-center justify-center">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={24}
                    height={24}
                  />
                </div>

                {/* Title */}
                <h3 className="text-[#FF4F00] font-bold text-lg mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed font-normal">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* =========================================================
            BOTTOM FEATURE BANNER IMAGE
           ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl bg-gradient-to-r from-[#200A00] via-[#5A1A00] to-[#200A00]"
        >
          {/* Background Glow Image */}
          <Image
            src="https://images.ctfassets.net/pj0maraabon4/34ZHkMm6yb3Vupg2ykezA3/459554de5cf2394fead788ff79783486/Mask_group__1_.png"
            alt="AEP Global Data Network Capabilities"
            width={1400}
            height={600}
            sizes="(max-width: 768px) 100vw, 1200px"
            className="w-full h-auto object-contain block"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default CapabilitiesSection;
