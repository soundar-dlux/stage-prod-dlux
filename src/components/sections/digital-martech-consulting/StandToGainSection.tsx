"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface StepItem {
  title: string;
  description: string;
  image: string;
}

interface StandToGainProgressSectionProps {
  heading: string;
  steps: StepItem[];
}

export default function StandToGainProgressSection({
  heading,
  steps,
}: StandToGainProgressSectionProps) {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-gradient-to-br from-[#2e2d2d] to-black py-16 md:py-8 lg:py-10 overflow-hidden">
      
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-white text-3xl  md:text-4xl lg:text-5xl font-bold mb-10 md:mb-14 lg:mb-16"
        >
          {heading}
        </motion.h2>

        {/* Step Selector */}
<div className="mb-12 md:mb-16 lg:mb-14">

  <div className="relative">

    {/* Scroll Wrapper */}
    <div className="
      flex gap-4
      overflow-x-auto
      scroll-smooth
      no-scrollbar
      px-4
      md:px-0
      py-4
      lg:justify-center
    ">

      {steps.map((step, index) => {
        const isActive = active === index;

        return (
         <motion.button
  key={index}
  onClick={() => setActive(index)}
  whileTap={{ scale: 0.95 }}
  animate={{ scale: isActive ? 1.05 : 1 }}
  transition={{ type: "spring", stiffness: 300 }}
  className={`
    relative flex-shrink-0
    w-[150px] sm:w-[180px] md:w-[210px]
    h-[85px] sm:h-[95px]
    rounded-2xl
    p-3 sm:p-4
    text-left
    border border-gray-500
    transition-all duration-300
    ${
      isActive
        ? "bg-gradient-to-br from-[#FE780C] to-[#FE3908] text-white shadow-xl"
        : "bg-[#1f1f1f] text-gray-300 hover:bg-[#2a2a2a]"
    }
  `}
>

            <div className={`text-xs sm:text-sm font-bold mb-1 ${isActive ? "text-white" : "text-gray-500"}`}>
              Step {index + 1}
            </div>

            <div className="text-xs sm:text-sm md:text-base font-semibold leading-tight line-clamp-2 whitespace-normal">
              {step.title}
            </div>

            {isActive && (
              <motion.div
                layoutId="cardGlow"
                className="absolute inset-0 rounded-2xl border border-white/30"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  </div>
</div>


        {/* Content Section */}
        <div className="relative mt-6">
          <div className="
            relative
            flex flex-col lg:flex-row
            items-center
            gap-1 md:gap-16 lg:gap-20
            bg-[#161616]
            rounded-3xl
            p-6 sm:p-8 md:p-10 lg:p-14
            shadow-2xl
          ">

            {/* Glow Effect */}
            <div className="absolute -top-24 -right-24 w-[280px] h-[280px] bg-[#FE780C]/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Text */}
            <div className="relative w-full lg:w-1/2 text-white flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="w-full text-center lg:text-left"
                >
                  <div className="text-xs sm:text-sm text-[#FE780C] font-semibold mb-3 tracking-wide uppercase">
                    Step {active + 1}
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-5 leading-tight">
                    {steps[active].title}
                  </h3>

                  <p className="text-sm sm:text-base md:text-lg leading-6 md:leading-7 lg:leading-8 text-gray-300 max-w-[540px] mx-auto lg:mx-0">
                    {steps[active].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Image */}
            <div className="relative w-full lg:w-1/2 flex justify-center items-center min-h-[240px] sm:min-h-[300px] md:min-h-[360px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={steps[active].image}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full flex justify-center"
                >
                  <div className="relative flex justify-center items-center">

                    <div className="absolute inset-0 bg-gradient-to-br from-[#FE780C]/20 to-[#FE3908]/10 blur-3xl rounded-full scale-110" />

                    <Image
                      src={steps[active].image}
                      alt={steps[active].title}
                      width={420}
                      height={420}
                      className="
                        relative
                        shadow-2xl
                        w-[240px] sm:w-[300px] md:w-[360px] lg:w-[420px]
                        h-auto
                        rounded-xl
                        object-contain
                      "
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
