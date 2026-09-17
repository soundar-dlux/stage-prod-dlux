"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

type BenefitLineProps = {
  icon: LucideIcon;
  text: string;
  delay: number;
  isInView: boolean;
};

export default function BenefitLine({
  icon: Icon,
  text,
  delay,
  isInView,
}: BenefitLineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        delay,
        duration: 0.6,
      }}
      className="group flex items-start gap-4"
    >
      <motion.div
        whileHover={{ rotate: 360, scale: 1.2 }}
        transition={{ duration: 0.5 }}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF3901] to-[#F07800]"
      >
        <Icon className="h-6 w-6 text-white" />
      </motion.div>

      <div className="flex-1">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : {}}
          transition={{
            delay: delay + 0.2,
            duration: 0.8,
          }}
          className="mb-3 h-px bg-gradient-to-r from-[#FF3901] to-transparent"
        />

        <p className="text-lg font-semibold text-white">
          {text}
        </p>
      </div>
    </motion.div>
  );
}