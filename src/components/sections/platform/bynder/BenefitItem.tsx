"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LucideIcon } from "lucide-react";

type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
  number: string;
};

type BenefitItemProps = {
  benefit: Benefit;
  index: number;
  isReversed: boolean;
};

export default function BenefitItem({
  benefit,
  index,
  isReversed,
}: BenefitItemProps) {
  const Icon = benefit.icon;

  const itemRef = useRef<HTMLDivElement | null>(null);

  const itemInView = useInView(itemRef, {
    once: true,
    amount: 0.5,
  });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0 }}
      animate={itemInView ? { opacity: 1 } : {}}
      className={`flex flex-col items-center gap-12 md:gap-20 ${
        isReversed ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={itemInView ? { scale: 1, rotate: 0 } : {}}
        transition={{
          delay: 0.2,
          duration: 0.8,
          type: "spring",
        }}
        className="relative shrink-0"
      >
        <motion.div
          animate={itemInView ? { rotate: 360 } : {}}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF3901] to-[#F07800] opacity-30 blur-2xl"
          style={{ width: "200px", height: "200px" }}
        />

        <div className="relative flex h-48 w-48 items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={itemInView ? { opacity: 0.1 } : {}}
            transition={{ delay: 0.3 }}
            className="absolute inset-0 rounded-full border-4 border-[#FF3901]"
          />

          <motion.div
            initial={{ scale: 0 }}
            animate={itemInView ? { scale: 1 } : {}}
            transition={{
              delay: 0.4,
              type: "spring",
            }}
            className="bg-gradient-to-br from-[#FF3901] to-[#F07800] bg-clip-text text-[120px] font-bold text-transparent"
          >
            {benefit.number}
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={itemInView ? { scale: 1 } : {}}
            transition={{
              delay: 0.5,
              type: "spring",
            }}
            className="absolute bottom-0 right-0 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FF3901] to-[#F07800]"
          >
            <Icon className="h-8 w-8 text-white" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        animate={itemInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          delay: 0.3,
          duration: 0.8,
        }}
        className="flex-1"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={itemInView ? { width: "80px" } : {}}
          transition={{
            delay: 0.5,
            duration: 0.6,
          }}
          className="mb-6 h-1 rounded-full bg-gradient-to-r from-[#FF3901] to-[#F07800]"
        />

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={itemInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mb-6 text-2xl font-bold text-white md:text-3xl"
        >
          {benefit.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={itemInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-xl leading-relaxed text-gray-400"
        >
          {benefit.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}