"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TabItem {
  id: string;
  label: string;
  heading: string;
  description: string;
  leftBoxText?: string;
  rightBoxText?: string;
  bottomText?: string;
}

const tabsData: TabItem[] = [
  {
    id: "partner",
    label: "Adobe Solution Partner",
    heading: "Adobe Solution Partner",
    description:
      "We help organisations unlock the full value of Adobe Experience Cloud through consulting, implementation, and optimisation, backed by Adobe's own best practices.",
    leftBoxText: "Consulting/\nImplementation",
    rightBoxText: "Continuous\nOptimisation",
    bottomText: "Adobe Experience Cloud",
  },
  {
    id: "engineers",
    label: "Certified Adobe Engineers",
    heading: "Certified Adobe Engineers",
    description:
      "Our team of certified Adobe architects and engineers bring deep domain expertise across AEP, RT-CDP, CJA, AJO, and Target to guarantee production-ready enterprise performance.",
    leftBoxText: "Architects &\nEngineers",
    rightBoxText: "Certified\nExcellence",
    bottomText: "Adobe Certified Teams",
  },
  {
    id: "experience",
    label: "Enterprise Delivery Experience",
    heading: "Enterprise Delivery Experience",
    description:
      "Proven track record delivering complex digital experience transformations for global enterprise clients, ensuring seamless integration, strict governance, and rapid time-to-value.",
    leftBoxText: "Global\nScale",
    rightBoxText: "Governed\nDelivery",
    bottomText: "Enterprise Strategy",
  },
  {
    id: "delivery",
    label: "Engineering-Led Delivery",
    heading: "Engineering-Led Delivery",
    description:
      "We combine strategic vision with hands-on technical execution — building robust data pipelines, scalable architectures, and custom integrations tailored to your tech stack.",
    leftBoxText: "Scalable\nPipelines",
    rightBoxText: "Agile\nExecution",
    bottomText: "Engineering First",
  },
];

export function WhyChooseDluxSection() {
  const [activeTab, setActiveTab] = useState<string>("partner");

  const currentTab = tabsData.find((t) => t.id === activeTab) || tabsData[0];

  return (
    <section className="relative w-full bg-white py-[40px] overflow-hidden font-sans">
      {/* Top-Right Soft Ambient Glow */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[radial-gradient(circle,_rgba(255,120,40,0.12),_transparent_70%)] pointer-events-none blur-2xl" />

      <div className="relative max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            HEADER AREA
           ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-10 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight text-black leading-tight mb-5">
            Why <span className="text-[#FF4F00]">Clients choose DLUX</span> as their
            <br className="hidden sm:inline" /> Adobe Partner
          </h2>

          <p className="text-gray-500 text-sm sm:text-[15px] leading-relaxed font-normal max-w-3xl mx-auto">
            Adobe Experience Platform is the foundation your customer experience strategy is built on. Get the architecture, identity, and governance right from the start, and it scales with you. Get it wrong, and it's another disconnected system that needs to be rebuilt down the line. DLUX Tech turns
            fragmented customer data into a governed foundation for personalisation, analytics, and activation, across
            Real-Time CDP, Customer Journey Analytics, Journey Optimizer, and GenStudio.
          </p>
        </motion.div>

        {/* =========================================================
            FOLDER TABBED NAVIGATION BAR
           ========================================================= */}
        <div className="w-full flex flex-col items-center mb-12 sm:mb-16">
          <div className="w-full flex items-center justify-center overflow-x-auto scrollbar-hide">
            <div className="flex items-center min-w-max">
              {tabsData.map((tab, index) => {
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
              relative
              w-[329.5px]
              h-[65px]
              flex items-center justify-center
              gap-[10px]
              pt-[13px]
              pr-[48px]
              pb-[12px]
              pl-[48px]
              font-bold text-sm sm:text-base
              transition-all duration-200
              cursor-pointer select-none

              border border-gray-200

              ${index % 2 === 0 ? "border-t-0" : "border-b-0"}

              ${index > 0 ? "-ml-[1px]" : ""}

              ${isActive
                        ? `
                    bg-white
                    text-[#FF4F00]
                    border-gray-300
                    z-10
                  `
                        : `
                    bg-gray-50/70
                    text-gray-700
                    hover:text-[#FF4F00]
                    hover:bg-white
                  `
                      }
            `}
                  >
                    {isActive && (
                      <span className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF4F00]" />
                    )}

                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================
            TAB CONTENT PANEL
           ========================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-6xl mx-auto"
          >
            {/* 🔹 LEFT COLUMN: ADOBE LOCK DIAGRAM */}
            <div className="col-span-1 lg:col-span-6 flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-3 sm:gap-5">
                {/* Left Box: Consulting / Implementation */}
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  className="w-[110px] sm:w-[130px] h-[95px] sm:h-[110px] rounded-[18px] bg-gradient-to-br from-[#FE780C] to-[#FE3908] text-white flex items-center justify-center p-3 text-center text-xs sm:text-sm font-bold shadow-md leading-snug select-none"
                >
                  <span className="whitespace-pre-line">
                    {currentTab.leftBoxText}
                  </span>
                </motion.div>

                {/* Center Graphic: Red Adobe Lock Icon */}
                <div className="flex flex-col items-center">
                  <div className="relative flex flex-col items-center">
                    {/* Red Lock Top Shackle */}
                    <svg
                      width="80"
                      height="50"
                      viewBox="0 0 80 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mb-[-8px] text-[#E32319]"
                    >
                      <path
                        d="M16 50V25C16 11.7452 26.7452 1 40 1C53.2548 1 64 11.7452 64 25V36"
                        stroke="currentColor"
                        strokeWidth="13"
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Red Lock Main Body with Adobe Logo */}
                    <div className="w-[125px] sm:w-[145px] h-[105px] sm:h-[120px] rounded-[22px] bg-[#E32319] shadow-lg flex items-center justify-center p-4">
                      {/* Official White Adobe 'A' Vector Logo */}
                      <svg
                        width="52"
                        height="44"
                        viewBox="0 0 48 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19.4 0H0V42L19.4 0Z" fill="white" />
                        <path d="M28.6 0H48V42L28.6 0Z" fill="white" />
                        <path
                          d="M14.2 24.2H33.8L24 0L14.2 24.2ZM24 15.6L28.4 26.6H19.6L24 15.6Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Right Box: Continuous Optimisation */}
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  className="w-[110px] sm:w-[130px] h-[95px] sm:h-[110px] rounded-[18px] bg-gradient-to-br from-[#FE780C] to-[#FE3908] text-white flex items-center justify-center p-3 text-center text-xs sm:text-sm font-bold shadow-md leading-snug select-none"
                >
                  <span className="whitespace-pre-line">
                    {currentTab.rightBoxText}
                  </span>
                </motion.div>
              </div>

              {/* Text Underneath Diagram */}
              {currentTab.bottomText && (
                <h4 className="text-[#FF4F00] font-extrabold text-base sm:text-lg tracking-tight mt-4 text-center">
                  {currentTab.bottomText}
                </h4>
              )}
            </div>

            {/* 🔹 RIGHT COLUMN: HEADING & DESCRIPTION */}
            <div className="col-span-1 lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
              <h3 className="text-[#FF4F00] font-extrabold text-2xl sm:text-3xl lg:text-[34px] tracking-tight leading-tight mb-4">
                {currentTab.heading}
              </h3>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-normal">
                {currentTab.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default WhyChooseDluxSection;
