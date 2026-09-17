"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import HorizontalCarousel from "@/src/components/ui/Carousel/HorizontalCarousel";
import TestimonialCard from "@/src/components/ui/Cards/TestimonialCard";
import { ContentItem } from "@/src/app/platform/adobe/workfront-fusion/types";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

interface FusionTestimonialsSectionProps {
  clientSaying: ContentItem[];
}

const FusionTestimonialsSection = ({
  clientSaying = [],
}: FusionTestimonialsSectionProps) => {
  return (
    <section className="relative bg-black py-8 lg:py-10 px-6 lg:px-[6%] text-white overflow-hidden">

      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] blur-[120px] rounded-full pointer-events-none"
        style={{ background: `${BRAND.primary}20` }}
      />

      {/* Header */}
      <div className="relative text-center mb-12">
        <p className="uppercase tracking-[0.25em] text-[10px] text-white/50 mb-3">
          Testimonials
        </p>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
          What Our Clients Say
        </h2>

        <div
          className="mt-4 w-12 h-[2px] mx-auto rounded-full"
          style={{ background: BRAND.primary }}
        />
      </div>

      {/* Carousel */}
      <HorizontalCarousel autoScroll autoScrollInterval={4500}>
        {clientSaying.map((item, index) => {
          const name = item?.title?.split(",")[0]?.trim();
          const role = item?.title?.split(",")[1]?.trim();

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="min-w-[85%] sm:min-w-[60%] lg:min-w-[38%]"
            >
              <TestimonialCard
                name={name || "Client"}
                position={role || ""}
                testimonial={item?.description || ""}
                avatarUrl={item?.url}
                className="backdrop-blur-md border p-6 md:p-8 rounded-xl transition duration-300"
              
              />
            </motion.div>
          );
        })}
      </HorizontalCarousel>
    </section>
  );
};

export default memo(FusionTestimonialsSection);