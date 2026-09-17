"use client";

import { ContentItem } from "@/src/app/platform/adobe/workfront-fusion/types";
import BrandCard from "@/src/components/ui/Cards/BrandCards";
import { motion } from "framer-motion";
import { memo } from "react";

interface FusionPlaybookSectionProps {
  playBook: ContentItem[];
  dlux: string;
  dluxplaybook: string;
}

const FusionPlaybookSection = ({
  playBook,
  dlux,
  dluxplaybook,
}: FusionPlaybookSectionProps) => {
  return (
    <section className="relative bg-black py-16 lg:py-20 overflow-hidden">

      {/* Glow (reduced) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* ================= TOP CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-[10px] uppercase tracking-[4px] text-orange-500 mb-4">
            Strategic Framework
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight">
            {dlux}
          </h2>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent leading-tight">
            {dluxplaybook}
          </h2>

          <div className="mt-5 h-[2px] w-16 bg-orange-500 rounded-full mx-auto" />

          <p className="mt-5 text-white/60 text-sm md:text-base leading-relaxed">
            A structured approach designed to accelerate transformation,
            unlock efficiency, and deliver measurable enterprise value.
          </p>
        </motion.div>

        {/* ================= BRAND CARDS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {playBook?.map((item, index) => (
            <BrandCard
              key={index}
              title={item?.title || ""}
              description={item?.description || ""}
              icon={item?.url}
              index={index}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default memo(FusionPlaybookSection);