"use client";

import React from "react";
import { motion } from "framer-motion";
import WbCard from "@/src/components/WB-Component/Cards";

const solutions = [
  {
    acronym: "RT CDP",
    title: "Real-Time CDP",
    description:
      "Unify known andanonymous data into real-time customer profiles for activation across channels.",
    href: "/platform/adobe/adobe-aep/rt-cdp",
  },
  {
    acronym: "AJO",
    title: "Adobe Journey Optimizer",
    description:
      "Orchestrate personalized, cross-channel customer journeys in real time.",
    href: "/platform/adobe/adobe-aep/ajo",
  },
  {
    acronym: "CJA",
    title: "Customer Journey Analytics",
    description:
      "Analyse omni channel customer behaviour with real-time, cross-channel reporting.",
    href: "/platform/adobe/adobe-aep/cja",
  },
  {
    acronym: "AEP",
    title: "Adobe Target & AI",
    description:
      "Deliver automated AI personalization and experimentations across every digital touchpoint.",
    href: "/platform/adobe/adobe-aep/target",
  },
];

export function SolutionsSection() {
  return (
    <section className="relative w-full bg-[#FFF5EF] py-[40px] font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-black tracking-tight leading-tight">
            The Solution Behind{" "}
            <span className="text-[#FF4F00]">
              Real-
              <br />
              Time Experiences
            </span>
          </h2>
        </motion.div>

        {/* Cards Row (using WbCard component with scrollable container) */}
        <div
          className="
            flex overflow-x-auto gap-6 lg:gap-8 pb-6 justify-start xl:justify-start
            scrollbar-hide snap-x snap-mandatory scroll-smooth
            -mx-4 px-4 sm:mx-0 sm:px-0
          "
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {solutions.map((item, index) => (
            <div key={index} className="flex-shrink-0 snap-start">
              <WbCard
                title={item.acronym}
                subtitle={item.title}
                description={item.description}
                buttonText="Read More"
                buttonHref={item.href}
                width={400}
                height={350}
                borderRadius="20px"
                paddingTop="30px"
                paddingRight="40px"
                paddingBottom="30px"
                paddingLeft="40px"
                borderWidth="3px"
                showDots={true}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SolutionsSection;
