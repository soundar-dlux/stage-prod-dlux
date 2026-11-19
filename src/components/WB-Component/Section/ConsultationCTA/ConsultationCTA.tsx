"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDownCircle } from "lucide-react";

export interface AepCtaSectionProps {
  title?: React.ReactNode;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  className?: string;
}

export function ConsultationCTA({
  title = (
    <>
      Let's talk about your{" "}
      <span className="text-[#FF4F00]">DAM priorities.</span>
    </>
  ),
  description = "Whether you are evaluating Bynder for the first time or rethinking an existing DAM, an initial conversation with our consultants is the best place to start. We'll look at how content moves through your organization today, where the friction sits, and what a Bynder implementation would need to address. Where it helps, we'll follow up with a demonstration shaped around your own workflows.",
  buttonText = "Request a Consultation",
  buttonHref = "#implementation-guide",
  onButtonClick,
  className = "",
}: AepCtaSectionProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onButtonClick) {
      e.preventDefault();
      onButtonClick();
    }
  };

  return (
    <section
      style={{
        background:
          "linear-gradient(182.02deg, #000000 1.7%, #FE3908 221.82%)",
      }}
      className={`w-full min-h-[504px] pt-[80px] pb-[80px] px-4 sm:px-8 lg:pt-[80px] lg:pr-[80px] lg:pb-[80px] lg:pl-[81px] text-white text-center font-sans overflow-hidden relative flex flex-col justify-center items-center ${className}`}
    >
      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center gap-[10px]">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold tracking-tight text-white lg:leading-tight mb-4"
        >
          {title}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/85 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto mb-6 font-normal"
        >
          {description}
        </motion.p>

        {/* Single CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center mt-2"
        >
          <motion.a
            href={buttonHref}
            onClick={handleClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="
              inline-flex items-center gap-3
              bg-white text-[#FE3908] font-bold text-sm sm:text-base
              px-7 py-3.5 rounded-full
              shadow-lg shadow-black/20 hover:shadow-xl
              transition-all duration-300 cursor-pointer select-none no-underline
            "
          >
            <ArrowDownCircle className="w-5 h-5 text-[#FE3908] stroke-[2.2]" />
            <span>{buttonText}</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default ConsultationCTA;