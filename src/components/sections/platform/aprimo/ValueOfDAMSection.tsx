"use client";

import { motion, Variants } from "framer-motion";
import { memo } from "react";

/* ---------------- Data ---------------- */
const values = [
  "Streamline content creation, organization, and delivery",
  "Centralized collaboration with approvals and workflows",
  "Easy reuse across markets and channels",
  "Optimized, secure, and on-brand content experiences",
];

/* ---------------- Motion ---------------- */
const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1], // premium easing
    },
  },
};

/* ---------------- Component ---------------- */
function ValueOfDAMSection() {
  return (
    <section className="relative py-8 lg:py-10">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold text-brand-primary mb-12 md:mb-16"
        >
          The Value of DAM
        </motion.h2>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {values.map((value, index) => (
            <motion.div
              key={value}
              variants={fadeUp}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 transition hover:border-brand-primary/40 will-change-transform"
            >
              {/* Index */}
              <span className="text-xs text-brand-primary font-medium">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Text */}
              <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                {value}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default memo(ValueOfDAMSection);