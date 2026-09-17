"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDownCircle, PhoneCall } from "lucide-react";

export interface AepCtaSectionProps {
  /** Main section title (supports JSX for dual-color) */
  title?: React.ReactNode;
  /** Subtitle description text */
  description?: string;
  /** Label for primary white CTA button (default: "Implementation Guide") */
  primaryButtonText?: string;
  /** Href for primary button */
  primaryButtonHref?: string;
  /** Primary button click handler */
  onPrimaryClick?: () => void;
  /** Label for secondary orange CTA button (default: "Book a Strategy Session") */
  secondaryButtonText?: string;
  /** Href for secondary button */
  secondaryButtonHref?: string;
  /** Secondary button click handler */
  onSecondaryClick?: () => void;
  /** Additional CSS class names */
  className?: string;
}

export function AepCtaSection({
  title = (
    <>
      Ready to build the right{" "}
      <span className="text-[#FF4F00]">
        Adobe
        <br />
        Experience Platform foundation?
      </span>
    </>
  ),
  description = "Getting the AEP foundation right, identity, governance, andintegration, determines whether it scales or needs rebuilding later. Our Implementation Guide breaks down the key decisions and execution steps to help you get there. Prefer to talk it through instead? Book a strategy session with our team. ",
  primaryButtonText = "Implementation Guide",
  primaryButtonHref = "#implementation-guide",
  onPrimaryClick,
  secondaryButtonText = "Book a Strategy Session",
  secondaryButtonHref = "#strategy-session",
  onSecondaryClick,
  className = "",
}: AepCtaSectionProps) {
  return (
    <section
      style={{
        background: "linear-gradient(182.02deg, #000000 1.7%, #FE3908 221.82%)",
      }}
      className={`w-full py-[40px] px-4 sm:px-6 lg:px-8 text-white text-center font-sans overflow-hidden relative ${className}`}
    >
      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
        {/* =========================================================
            HEADING
           ========================================================= */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold tracking-tight text-white leading-tight mb-6"
        >
          {title}
        </motion.h2>

        {/* =========================================================
            DESCRIPTION PARAGRAPH
           ========================================================= */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/85 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto mb-10 font-normal"
        >
          {description}
        </motion.p>

        {/* =========================================================
            CTA BUTTONS ROW
           ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {/* White Button: Implementation Guide */}
          <motion.a
            href={primaryButtonHref}
            onClick={onPrimaryClick}
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
            <span>{primaryButtonText}</span>
          </motion.a>

          {/* Orange Button: Book a Strategy Session */}
          <motion.a
            href={secondaryButtonHref}
            onClick={onSecondaryClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="
              inline-flex items-center gap-3
              bg-gradient-to-r from-[#FE780C] to-[#FE3908] text-white font-bold text-sm sm:text-base
              px-7 py-3.5 rounded-full
              shadow-lg shadow-[#FE3908]/30 hover:shadow-xl hover:shadow-[#FE3908]/50
              transition-all duration-300 cursor-pointer select-none no-underline
            "
          >
            <PhoneCall className="w-5 h-5 text-white stroke-[2.2]" />
            <span>{secondaryButtonText}</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default AepCtaSection;
