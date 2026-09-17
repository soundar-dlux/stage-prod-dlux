"use client";

import { memo, useMemo } from "react";
import BrandCard from "@/src/components/ui/Cards/BrandCards";
import { motion, easeOut } from "framer-motion";

/* ================= TYPES ================= */
type Attribute = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

/* ================= CONSTANT DATA ================= */
const ATTRIBUTES: Attribute[] = [
  {
    id: "efficiency",
    title: "Enhancing Efficiency",
    description: "Streamlining workflows for seamless collaboration",
    icon: "https://images.ctfassets.net/pj0maraabon4/7tcnauh2umf5xa48MhHkVy/ef714ac40d204475768340d87be62452/1.png",
  },
  {
    id: "insight",
    title: "Maximizing Insight",
    description: "Providing unparalleled clarity from start to finish",
    icon: "https://images.ctfassets.net/pj0maraabon4/4yIwoelAvZoqM4BjqIZpJn/5f8211d16a1d62ec93ee9cc53bea0fe9/2.png",
  },
  {
    id: "innovation",
    title: "Collaborative Innovation",
    description: "Uniting expertise to drive exceptional outcomes",
    icon: "https://images.ctfassets.net/pj0maraabon4/wIGoYiY9DU4peHtAoFo5k/887c9a9ce79714c910692893afc50166/3.png",
  },
  {
    id: "integration",
    title: "Agile Integration",
    description: "Seamlessly incorporating cutting-edge technologies",
    icon: "https://images.ctfassets.net/pj0maraabon4/4CagWW63DxFC9vSVTFy5zO/dde9dd9865176c3dbc49cfa2255b1cf8/4.png",
  },
  {
    id: "partnership",
    title: "Reliable Partnership",
    description: "Building trust through transparency and integrity",
    icon: "https://images.ctfassets.net/pj0maraabon4/5eAQynYWm0eX9npcrXvDud/668709fd1a0fa87eaf8b4e2c6e44f5d4/5.png",
  },
];

/* ================= ANIMATION ================= */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const transition = {
  duration: 0.6,
  ease: easeOut,
};

const viewport = { once: true, margin: "-60px" };

/* ================= MEMO ================= */
const MemoBrandCard = memo(BrandCard);

/* ================= MAIN ================= */
export default function DefiningAttributesSection() {
  const data = useMemo(() => ATTRIBUTES, []);

  return (
    <section className="relative w-full bg-brand-black text-brand-white py-8 lg:py-10 overflow-hidden">

      <div className="max-w-6xl mx-auto px-6">

        {/* ===== HEADER ===== */}
        <motion.div
          {...fadeUp}
          transition={transition}
          viewport={viewport}
          className="text-center mb-12 md:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
            Our{" "}
            <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">
              Defining Attributes
            </span>
          </h2>

          {/* Divider */}
          <div className="mx-auto mt-5 h-[2px] w-16 bg-brand-primary rounded-full" />
        </motion.div>

        {/* ===== GRID ===== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 place-items-center"
        >
          {data.map((item, index) => (
            <MemoBrandCard
              key={item.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
              index={index}
            />
          ))}
        </motion.div>

      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-brand-primary/10 blur-[140px] rounded-full pointer-events-none" />
    </section>
  );
}