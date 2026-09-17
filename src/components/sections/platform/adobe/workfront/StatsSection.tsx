"use client";

import { memo, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

const STATS = [
  {
    value: 36,
    label: "Certifications",
    duration: 2.2,
    icon: "https://images.ctfassets.net/pj0maraabon4/4Xi272FqUXaTN4GtL8sW24/385188cc3c8bee2925d60da0c47e2964/award_4449653.svg",
  },
  {
    value: 20,
    label: "Certified Employees",
    duration: 2.2,
    icon: "https://images.ctfassets.net/pj0maraabon4/7vNetYfFhDULQT4XxUxKuf/0d9b9f7a02dac6ae63d37cd5eebab1e4/certificate_18248416.svg",
  },
  {
    value: 1,
    label: "Specializations",
    duration: 1.5,
    icon: "https://images.ctfassets.net/pj0maraabon4/4ZE9YUcfFMJfrQwAlT242e/7458b2c5b0fa49ee525612d393b42a28/literature_8759964.svg",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const StatItem = ({ value, label, duration, icon, index }: any) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [start, setStart] = useState(false);

  if (inView && !start) setStart(true);

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -6, scale: 1.03 }}
      className="group relative flex items-center gap-4 p-5 rounded-2xl
                 bg-white/[0.03] backdrop-blur-xl
                 border border-white/10
                 transition duration-300 overflow-hidden"
      style={{
        borderColor: "rgba(255,255,255,0.1)",
      }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
        style={{
          background: `radial-gradient(circle at center, ${BRAND.primary}25, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div
        className="relative z-10 min-w-[60px] h-[60px] flex items-center justify-center rounded-xl
                   border transition duration-300 group-hover:scale-110"
        style={{
          background: `linear-gradient(135deg, ${BRAND.primary}20, ${BRAND.secondary}15)`,
          borderColor: `${BRAND.primary}30`,
        }}
      >
        <Image
          src={icon}
          alt={label}
          width={30}
          height={30}
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-left">
        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          {start && <CountUp end={value} duration={duration} />}+
        </h3>
        <p className="text-white/60 text-xs md:text-sm uppercase tracking-wider">
          {label}
        </p>
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section className="relative bg-black py-8 lg:py-10 overflow-hidden">
      
      {/* Background Glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, ${BRAND.primary}20, transparent 65%)`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        {STATS.map((stat, i) => (
          <StatItem key={stat.label} index={i} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default memo(StatsSection);