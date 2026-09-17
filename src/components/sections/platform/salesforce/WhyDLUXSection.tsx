"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { memo } from "react";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

/* Data */
const points = [
  {
    title: "Certified Professionals",
    description:
      "Our team comprises certified Salesforce professionals with deep expertise across multi-cloud environments.",
    icon: "https://images.ctfassets.net/pj0maraabon4/76sPYLTzb9asEWm6TKIeq1/bf2c7a5a2bf621bf8bb09a1e8285febb/1.png",
  },
  {
    title: "Multi-Cloud Salesforce Expertise",
    description:
      "We deliver holistic Salesforce solutions across clouds, ensuring seamless alignment with your business goals.",
    icon: "https://images.ctfassets.net/pj0maraabon4/4qg01vF3awXUYfxi30sRm6/0c1688c38a2c14827a53ce1cc0bf840c/2.png",
  },
  {
    title: "End-to-End Consulting Support",
    description:
      "From strategy to execution, DLUX supports you through every phase of the Salesforce consulting lifecycle.",
    icon: "https://images.ctfassets.net/pj0maraabon4/hUvhoRsORKErBk5kyyGuT/81beae7eb4402dfaf90d96fc10d14eff/3.png",
  },
  {
    title: "Strategic Realignment Planning",
    description:
      "Our consultants help design vertical and horizontal realignment strategies to future-proof your business.",
    icon: "https://images.ctfassets.net/pj0maraabon4/3jaAXb9a34GOSQ4YlJYNCI/6cd6f1663441c80b251b03742ec79665/4.png",
  },
];

/* Motion */
const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

function WhyDLUXSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8 lg:py-10">
      
      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="text-center mb-12 md:mb-14"
      >
        <span className="text-xs md:text-sm uppercase tracking-widest text-white/50">
          Why DLUX
        </span>

        <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
          The Right Partner for
          <br className="hidden md:block" />
          Your Salesforce Journey
        </h2>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
      >
        {points.map((item) => (
          <motion.div
            key={item.title}
            variants={card}
            className="group rounded-xl border border-white/10 p-6 transition-all duration-300 hover:translate-y-[-2px]"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <div className="flex flex-col gap-4">
              
              {/* Icon */}
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg transition-colors"
                style={{
                  background: `${BRAND.primary}15`,
                  border: `1px solid ${BRAND.primary}30`,
                }}
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={28}
                  height={28}
                  sizes="28px"
                  loading="lazy"
                  className="object-contain"
                />
              </div>

              {/* Content */}
              <h3 className="text-base md:text-lg font-medium text-white">
                {item.title}
              </h3>

              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Bottom Accent */}
            <div
              className="mt-5 h-[2px] w-0 group-hover:w-full transition-all duration-500"
              style={{
                background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.secondary})`,
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default memo(WhyDLUXSection);