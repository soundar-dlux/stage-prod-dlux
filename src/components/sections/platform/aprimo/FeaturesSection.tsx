"use client";

import { motion, type Variants } from "framer-motion";
import { memo } from "react";

/* ---------------- Motion ---------------- */
const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeSide = (isLeft: boolean): Variants => ({
  hidden: { opacity: 0, x: isLeft ? -30 : 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // premium easing
    },
  },
});

const features = [
  "Content Management platform for collaboration and automation",
  "Powerful Digital Asset Management (DAM)",
  "Distributed Marketing platform",
  "Campaign execution & targeting tools",
  "Plan & Spend for MROI visibility",
];

function FeaturesSection() {
  return (
    <section className="relative py-8 lg:py-10 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold text-brand-primary mb-20"
        >
          With Aprimo, you get
        </motion.h2>

        {/* Creative layout */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-4xl mx-auto space-y-12"
        >
          {features.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={item}
                variants={fadeSide(isLeft)}
                className={`flex items-center gap-6 ${
                  isLeft ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Accent line */}
                <div className="hidden md:block w-24 h-px bg-gradient-to-r from-brand-primary to-transparent" />

                {/* Feature text */}
                <div className="relative group max-w-xl">
                  <span className="absolute -left-6 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-brand-secondary opacity-0 group-hover:opacity-100 transition" />

                  <p className="text-lg md:text-xl text-brand-white leading-relaxed group-hover:text-brand-white transition">
                    {item}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(FeaturesSection);