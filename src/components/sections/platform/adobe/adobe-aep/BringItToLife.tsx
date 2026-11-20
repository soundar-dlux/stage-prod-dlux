"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HorizontalLine from "@/src/components/WB-Component/Line/HorizontalLine";
import OrangeGradientCircle from "@/src/components/WB-Component/Decorative/OrangeGradientCircle";

/* =========================================================
   TYPES
========================================================= */

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface BringItToLifeProps {
  title?: React.ReactNode;
  highlightText?: string;
  highlightColor?: string;
  steps?: StepItem[];

  imageSrc?: string;
  imageAlt?: string;
  customImage?: React.ReactNode;

  showTopLine?: boolean;
  bgVariant?: "white" | "light" | "transparent";
  className?: string;
}

/* =========================================================
   DEFAULT STEPS
========================================================= */

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

/* =========================================================
   MAIN COMPONENT
========================================================= */

export function BringItToLifeSection({
  title = (
    <>
      How we{" "}
      <span className="text-[#FF500D]">
        bring it to life
      </span>
    </>
  ),

  highlightText,
  highlightColor = "text-[#FF500D]",

  steps = defaultSteps,

  imageSrc = "https://images.ctfassets.net/pj0maraabon4/4RcVS0TeO62qAkGh2CXKp0/99c920dedfc777d9ea160639f9838e0d/How_we_bring_it_to_life.png",

  imageAlt = "How we bring it to life - 4 stage implementation approach: Discover, Design, Deliver, Drive Value",

  customImage,

  showTopLine = true,

  bgVariant = "white",
  className = "",
}: BringItToLifeProps) {

  /* =====================================================
     BACKGROUND
  ===================================================== */

  const bgStyles = {
    white: "bg-white text-black",
    light: "bg-[#FFF8F5] text-black",
    transparent: "bg-transparent text-black",
  };

  /* =====================================================
     IMAGE URL
  ===================================================== */

  const safeImageSrc = imageSrc?.startsWith("http://")
    ? imageSrc.replace("http://", "https://")
    : imageSrc?.startsWith("//")
      ? `https:${imageSrc}`
      : imageSrc;

  /* =====================================================
     ANIMATION
  ===================================================== */

  const leftVariants = {
    hidden: {
      opacity: 0,
      x: -25,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const rightVariants = {
    hidden: {
      opacity: 0,
      x: 25,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const stepVariants = {
    hidden: {
      opacity: 0,
      y: 14,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  /* =====================================================
     RENDER TITLE
  ===================================================== */

  const renderTitle = () => {
    if (highlightText && typeof title === "string" && title.includes(highlightText)) {
      const parts = title.split(highlightText);
      return (
        <>
          {parts[0]}
          <span className={highlightColor}>{highlightText}</span>
          {parts.slice(1).join(highlightText)}
        </>
      );
    }
    return title;
  };

  /* =====================================================
     JSX
  ===================================================== */

  return (
    <section
      className={`relative w-full overflow-hidden py-10 sm:py-14 lg:py-16 px-6 sm:px-8 lg:px-12 font-sans ${bgStyles[bgVariant]} ${className}`}
    >
      <div className="mx-auto max-w-[1240px]">

        {/* =============================================
            MAIN GRID: 2 Equal Columns
        ============================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
          {/* =============================================
              LEFT COLUMN: Title & Steps
          ============================================= */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={leftVariants}
            className="col-span-1 lg:col-span-6 w-full flex flex-col justify-between"
          >
            <HorizontalLine />

            {/* Section Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-black leading-tight m-[revert]">
              {renderTitle()}
            </h2>

            {/* Steps List */}
            <div className="w-full flex flex-col">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.number || idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={stepVariants}
                  transition={{
                    delay: idx * 0.08,
                  }}
                  className="w-full grid grid-cols-[36px_1fr] sm:grid-cols-[44px_1fr] items-start gap-3 sm:gap-4 py-5 sm:py-6 border-t border-[#EDEDED]"
                >
                  {/* Step Number */}
                  <span className="text-[13px] sm:text-[14px] font-bold text-[#1B1B1B] pt-0.5">
                    {step.number}
                  </span>

                  {/* Step Content */}
                  <p className="min-w-0 text-[13px] sm:text-[14px] leading-[1.65] text-[#555555] font-normal">
                    <strong className="font-bold text-[#FF500D] mr-1.5">
                      {step.title}:
                    </strong>
                    <span>
                      {step.description}
                    </span>
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* =============================================
              RIGHT COLUMN: Photo Card
          ============================================= */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={rightVariants}
            className="col-span-1 lg:col-span-6 w-full flex justify-center lg:justify-end items-start"
          >
            <div className="relative w-full max-w-[540px] aspect-[5/6] rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] bg-[#F8F8F8]">
              {customImage ? (
                customImage
              ) : (
                <Image
                  src={safeImageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 540px"
                  className="object-cover object-center"
                  priority
                />
              )}
            </div>
          </motion.div>

        </div>
        <HorizontalLine className="relative top-[60px]" />

      </div>
    </section>
  );
}

export default BringItToLifeSection;
