"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageLRComponents from "@/src/components/ui/WB-Components/imageLRComponenets";

export interface TabItem {
  id: string;
  label: string;
  heading: string;
  description: string;
  imageSrc: string;
  highlights?: string[];
  badge?: string;
}

const tabsData: TabItem[] = [
  {
    id: "partner",
    label: "Adobe Solution Partner",
    heading: "Adobe Solution Partner",
    imageSrc:
      "https://images.ctfassets.net/pj0maraabon4/7cNc58046Nf6MHPlIYzOAt/a9713b1dddc92cb0a087ad01b55688ea/Adobe_Solution-partner.png",
    description:
      "We help organisations unlock the full value of Adobe Experience Cloud through consulting, implementation, and optimisation, backed by Adobe's own best practices.",

  },
  {
    id: "engineers",
    label: "Certified Adobe Engineers",
    heading: "Certified Adobe Engineers",
    imageSrc:
      "https://images.ctfassets.net/pj0maraabon4/5mprZ5Ku7rgfi5x9OokTDO/7e12606d7ff05ff8cd059ab449b88de1/Certified_Adobe_Engineers-orange.png",
    description:
      "Our team of certified Adobe architects and engineers bring deep domain expertise across AEP, RT-CDP, CJA, AJO, and Target to guarantee production-ready enterprise performance.",

  },
  {
    id: "experience",
    label: "Enterprise Delivery Experience",
    heading: "Enterprise Delivery Experience",
    imageSrc:
      "https://images.ctfassets.net/pj0maraabon4/7Hot6WUFrjY4UKLnsuncaW/6c7ab086d58be357b6f28ea826c840f2/Enterprise_Delivery_Experience.png",
    description:
      "Proven track record delivering complex digital experience transformations for global enterprise clients, ensuring seamless integration, strict governance, and rapid time-to-value.",

  },
  {
    id: "delivery",
    label: "Engineering-Led Delivery",
    heading: "Engineering-Led Delivery",
    imageSrc:
      "https://images.ctfassets.net/pj0maraabon4/7i18XzsQkgsCyZi4xF8mi1/7c271cc5af60e3a86f500cf30fbaca40/Engineering-Led_Delivery.png",
    description:
      "We combine strategic vision with hands-on technical execution — building robust data pipelines, scalable architectures, and custom integrations tailored to your tech stack.",

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
            Adobe Experience Platform is the foundation your customer experience strategy is built on. Get the architecture, identity, and governance right from the start, and it scales with you. Get it wrong, and it's another disconnected system that needs to be rebuilt down the line. DLUX Tech turns
            fragmented customer data into a governed foundation for personalisation, analytics, and activation, across
            Real-Time CDP, Customer Journey Analytics, Journey Optimizer, and GenStudio.
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
            TAB CONTENT PANEL (using ImageLRComponents with Simple White BG)
           ========================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full max-w-6xl mx-auto bg-white"
          >
            <ImageLRComponents
              title={
                <span
                  style={{
                    background: "linear-gradient(90deg, #FE780C 0%, #FE3908 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  className="font-extrabold inline-block"
                >
                  {currentTab.heading}
                </span>
              }
              badge={currentTab.badge}
              description={currentTab.description}
              features={currentTab.highlights}
              bgVariant="white"
              imagePosition="left"
              imageSrc={currentTab.imageSrc}
              imageAlt={currentTab.heading}
              disableImageHover={true}
              className="py-0 px-0 bg-white [&_img]:!transform-none [&_img]:!scale-100"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default WhyChooseDluxSection;
