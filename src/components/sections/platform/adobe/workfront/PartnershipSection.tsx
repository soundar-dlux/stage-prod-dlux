"use client";

import { memo } from "react";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

const CONTENT = {
  titleLine1: "DLUX and Adobe:",
  titleLine2: "A Partnership that Clicks Like Lego Blocks!",
  left: `Transform your businesses with DLUX and Adobe Workfront that combines strategy, design, and technology. With Adobe's technology, DLUX unlocks the rich data repository of customers so you can better understand them and create meaningful interactions.`,
  right: `With over two years of successful partnerships, our automation, and customer-centric design leadership has driven revolutionary experiences and outcomes across various industries. DLUX, as an Adobe Specialized Partner for Workfront in Asia Pacific, are experts at integrating it all seamlessly for organizations, so you can ditch the silos and work as one incredible team.`,
};

const PartnershipSection = () => {
  return (
    <section className="relative bg-black py-8 lg:py-10 overflow-hidden">
      
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top, ${BRAND.primary}20, transparent 60%)`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        <h2 className="text-center font-bold text-white leading-tight mb-12 text-3xl md:text-4xl lg:text-5xl">
          {CONTENT.titleLine1}
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
            }}
          >
            {CONTENT.titleLine2}
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-10 md:gap-12">
          
          <p className="text-white/70 text-base md:text-lg leading-7 md:leading-8 max-w-xl">
            {CONTENT.left}
          </p>

          <p className="text-white/70 text-base md:text-lg leading-7 md:leading-8 max-w-xl">
            {CONTENT.right}
          </p>

        </div>
      </div>
    </section>
  );
};

export default memo(PartnershipSection);