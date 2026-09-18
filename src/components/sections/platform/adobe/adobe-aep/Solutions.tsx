"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      "Orchestrate personalized, cross channel customer journeys in real time.",
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
    acronym: "Genstudio",
    title: " Genstudio ",
    description:
      "AI-powered content creation with real-time customer data insights. ",
    href: "/platform/adobe/adobe-aep/target",
  },
];

export function SolutionsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      checkScroll();
    }
    return () => {
      if (container) container.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const handlePrev = () => {
    if (!scrollContainerRef.current) return;
    const scrollAmount =
      scrollContainerRef.current.clientWidth < 640
        ? scrollContainerRef.current.clientWidth * 0.88
        : 424;
    scrollContainerRef.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    if (!scrollContainerRef.current) return;
    const scrollAmount =
      scrollContainerRef.current.clientWidth < 640
        ? scrollContainerRef.current.clientWidth * 0.88
        : 424;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full bg-[#FFF5EF] py-[40px] sm:py-[60px] font-sans overflow-hidden">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-black tracking-tight leading-tight">
            The Solution Behind{" "}
            <span className="text-[#FF4F00]">
              Real-
              <br className="hidden sm:inline" />
              Time Experiences
            </span>
          </h2>
        </motion.div>

        {/* Cards Row (using WbCard component with scrollable container) */}
        <div
          ref={scrollContainerRef}
          className="
            flex overflow-x-auto gap-4 sm:gap-6 lg:gap-8 pb-4 sm:pb-6
            scrollbar-hide snap-x snap-mandatory scroll-smooth
            -mx-4 px-4 sm:mx-0 sm:px-0 items-stretch
          "
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {solutions.map((item, index) => (
            <div
              key={index}
              className="
                flex-shrink-0 snap-center sm:snap-start
                w-[88vw] max-w-[360px] sm:w-[400px] sm:max-w-none
              "
            >
              <WbCard
                title={item.acronym}
                subtitle={item.title}
                description={item.description}
                buttonText="Read More"
                buttonHref={item.href}
                width="100%"
                height={350}
                borderRadius="20px"
                paddingTop="30px"
                paddingRight="30px"
                paddingBottom="30px"
                paddingLeft="30px"
                borderWidth="3px"
                showDots={true}
                className="w-full max-sm:!p-6"
              />
            </div>
          ))}
        </div>

        {/* Bottom Carousel Navigation Controls (Arrows) */}
        <div className="flex items-center justify-center gap-4 mt-4 sm:mt-6">
          {/* Previous Arrow Button */}
          <button
            onClick={handlePrev}
            disabled={!canScrollLeft}
            aria-label="Previous Card"
            className={`
              w-10 h-10 sm:w-11 sm:h-11 rounded-full border
              flex items-center justify-center transition-all duration-300
              shadow-sm bg-white
              ${canScrollLeft
                ? "border-gray-400 text-gray-700 hover:border-[#FF4F00] hover:text-[#FF4F00] hover:shadow-md cursor-pointer opacity-100"
                : "border-gray-300 text-gray-400 opacity-40 cursor-not-allowed"
              }
            `}
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Next Arrow Button */}
          <button
            onClick={handleNext}
            disabled={!canScrollRight}
            aria-label="Next Card"
            className={`
              w-10 h-10 sm:w-11 sm:h-11 rounded-full border
              flex items-center justify-center transition-all duration-300
              shadow-sm bg-white
              ${canScrollRight
                ? "border-[#FF4F00] text-[#FF4F00] hover:bg-[#FF4F00] hover:text-white hover:shadow-md cursor-pointer opacity-100"
                : "border-gray-300 text-gray-400 opacity-40 cursor-not-allowed"
              }
            `}
          >
            <ChevronRight className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default SolutionsSection;
