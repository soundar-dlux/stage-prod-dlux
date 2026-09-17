"use client";

import { motion } from "framer-motion";

interface PrevNextButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  size?: number;
  className?: string;
}

const BRAND = "#FF3901";

export default function PrevNextButtons({
  onPrev,
  onNext,
  size = 64,
  className = "",
}: PrevNextButtonsProps) {
  return (
    <div className={`flex items-center gap-6 ${className}`}>

      {/* ===== Prev ===== */}
      <motion.button
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPrev}
        className="relative flex items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-xl text-white overflow-hidden transition-all duration-300"
        style={{ width: size, height: size }}
      >
        {/* Hover Glow */}
        <motion.span
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: `0 0 25px ${BRAND}, 0 0 60px ${BRAND}30`,
          }}
        />

        {/* Arrow Icon */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </motion.button>

      {/* ===== Next ===== */}
      <motion.button
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="relative flex items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-xl text-white overflow-hidden transition-all duration-300"
        style={{ width: size, height: size }}
      >
        {/* Hover Glow */}
        <motion.span
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: `0 0 25px ${BRAND}, 0 0 60px ${BRAND}30`,
          }}
        />

        {/* Arrow Icon */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </motion.button>
    </div>
  );
}