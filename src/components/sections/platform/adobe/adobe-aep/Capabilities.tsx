"use client";

import { motion } from "framer-motion";
import { Database, Users, GitMerge, BrainCircuit } from "lucide-react";
import Image from "next/image";
import React from "react";

const capabilities = [
  {
    icon: Database,
    title: "Unify Your Data",
    description:
      "Bring together data from CRM, eCommerce, marketing, sales, and support into one real-time customer profile. Break down the silos that cause inconsistent experiences, improve data accuracy, and give every team a trusted, AI-ready foundation to work from.",
  },
  {
    icon: Users,
    title: "Activate in real time",
    description:
      "Turn insight into action the moment it matters. Use live customer data to reach the right person with the right message across web, mobile, email, and advertising — creating consistent experiences that deepen engagement and drive higher conversions.",
  },
  {
    icon: GitMerge,
    title: "Personalize every journey",
    description:
      "Go beyond reporting to prediction. Analyzing unified, real-time data surfaces patterns in customer behavior, sharpens targeting, and equips teams to make data-driven decisions that turn marketing spend into measurable ROI.",
  },
  {
    icon: BrainCircuit,
    title: "Predict with AI",
    description:
      "Personalization and privacy aren't at odds; with the right controls, they reinforce each other. Built-in governance features protect sensitive data, support compliance with privacy regulations, and help build the customer trust that responsible personalization depends on.",
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
            <span className="text-xs uppercase tracking-widest font-semibold text-[#FF4F00] block mb-2">
              Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-black leading-tight">
              <span className="text-[#FF4F00]">AEP</span> Capabilities
            </h2>
            <p className="mt-3 text-gray-500 text-sm sm:text-base max-w-xl">
              Area provides real insights, without the data overload.
            </p>
          </div>

          {/* Top Right Orange Starburst Icon Image */}
          <div className="hidden sm:block pt-2">
            <Image
              src="https://images.ctfassets.net/pj0maraabon4/5O5ytmMdnVGHBfh0CBBqA4/278a58d685713827496e99187e99a3a7/Star.png"
              alt="Capabilities Starburst Icon"
              width={134}
              height={136}
              className=" object-contain"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-100 mb-10 sm:mb-14" />

        {/* =========================================================
            4-COLUMN CAPABILITIES GRID
           ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12 sm:mb-16">
          {capabilities.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-start"
              >
                {/* Icon */}
                <div className="mb-4 text-black">
                  <IconComponent className="w-6 h-6 stroke-[2]" />
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
          className="relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl bg-gradient-to-r from-[#200A00] via-[#5A1A00] to-[#200A00] aspect-[16/9] sm:aspect-[21/9] max-h-[520px]"
        >
          {/* Background Glow Image */}
          <Image
            src="https://images.ctfassets.net/pj0maraabon4/34ZHkMm6yb3Vupg2ykezA3/459554de5cf2394fead788ff79783486/Mask_group__1_.png"
            alt="AEP Global Data Network Capabilities"
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover object-center"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default CapabilitiesSection;
