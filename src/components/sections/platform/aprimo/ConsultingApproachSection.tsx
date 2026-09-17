"use client";

import { motion, Variants } from "framer-motion";
import { memo } from "react";

const steps = [
  {
    title: "Business Analysis",
    desc: "Deep understanding of DAM needs and current systems.",
  },
  {
    title: "Industry Expertise",
    desc: "Hands-on experience across retail, fintech, manufacturing & tech.",
  },
  {
    title: "Future-Ready Solutions",
    desc: "Blueprint-driven DAM systems built to scale.",
  },
  {
    title: "Workflow Assessment",
    desc: "Process optimization through industry-standard best practices.",
  },
];

/* ---------------- Motion ---------------- */
const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
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
function ConsultingApproachSection() {
  return (
    <section className="relative py-8 lg:py-10 bg-brand-black overflow-hidden">
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold text-brand-white mb-12 md:mb-16"
        >
          DAM Consulting Approach
        </motion.h2>

        {/* Timeline */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative max-w-3xl mx-auto"
        >
          
          {/* Vertical line */}
          <div className="absolute left-3 top-0 h-full w-px bg-brand-primary/30" />

          <div className="space-y-10 md:space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative pl-12 will-change-transform"
              >
                {/* Dot */}
                <span className="absolute left-1.5 top-2 h-3 w-3 rounded-full bg-brand-primary" />

                {/* Step number */}
                <span className="block text-xs text-brand-primary font-medium mb-1">
                  Step {String(index + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-brand-white mb-2">
                  {step.title}
                </h3>

                <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed max-w-lg">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}

export default memo(ConsultingApproachSection);