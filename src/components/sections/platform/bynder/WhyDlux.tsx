
"use client";

import React from "react";
import ImageLRComponenets from "@/src/components/WB-Component/ImageLR";
import OrangeGradientCircle from "@/src/components/WB-Component/Decorative/OrangeGradientCircle";

export default function WhyDlux() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-white py-[30px]">

      {/* Decorative Orange Blur Light */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          rounded-full
          opacity-80
          height-[30px]
          width-[30px]
          absolute right-[325%] top-[12%] z-[999]
        "
      >
        <OrangeGradientCircle />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <ImageLRComponenets
          imagePosition="left"
          title="Why DLUX"
          highlightText="DLUX"
          highlightColor="bg-gradient-to-r from-subGradientText-from to-subGradientText-to bg-clip-text text-transparent"
          description={[
            "Choosing the right implementation partner matters as much as choosing the platform. Our work across APAC means we understand how global brand standards need to flex for local markets, languages and regulations, and we design the DAM to handle both. Combined with a structured method and integration planning from day one, that gives your Bynder program a foundation built around how your teams actually work.",
          ]}
          imageSrc="https://images.ctfassets.net/pj0maraabon4/55IyGhJ5cpkpDCpAXGyBvX/b214819a66393790aadc2f417b46d039/Dlux_why_1.svg"
          imageAlt="Bynder Overview Dashboard Showcase"
          showSectionBottomLine={true}
          showTopLine={false}
          bgVariant="white"
        />
      </div>
    </section>
  );
}
