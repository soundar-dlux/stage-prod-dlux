"use client";

import { motion, Variants } from "framer-motion";
import { memo } from "react";

const expertise = [
  {
    title: "Tailored Consulting",
    description:
      "Customized Aprimo consulting aligned to your business goals and DAM maturity. We analyze workflows, optimize processes, and build scalable solutions that support long-term growth.",
  },
  {
    title: "Implementation Excellence",
    description:
      "Certified experts delivering seamless Aprimo DAM and content management implementations. From architecture to deployment, we ensure performance, stability, and adoption.",
  },
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
function ExpertiseSection() {
  return (
    <section className="relative py-8 lg:py-10 bg-brand-black text-brand-white overflow-hidden">

      {/* Subtle Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/90 to-brand-black pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-10 md:mb-14"
        >
          Our Expertise
        </motion.h2>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-2"
        >
          {expertise.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="rounded-2xl p-6 md:p-8 border border-white/10 bg-white/5 transition hover:border-brand-primary/40 will-change-transform"
            >
              {/* Title */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 text-brand-primary">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-brand-white leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default memo(ExpertiseSection);