"use client";

import { motion } from "framer-motion";

interface PlayButtonProps {
  size?: number;
  onClick?: () => void;
  className?: string;
}

const BRAND = "#FF3901";

export default function PlayButton({
  size = 110,
  onClick,
  className = "",
}: PlayButtonProps) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* ===== Outer Ripple 1 ===== */}
      <motion.span
        className="absolute rounded-full border"
        style={{
          width: size,
          height: size,
          borderColor: BRAND,
        }}
        animate={{
          scale: [1, 1.6],
          opacity: [0.6, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      {/* ===== Outer Ripple 2 (Delayed) ===== */}
      <motion.span
        className="absolute rounded-full border"
        style={{
          width: size,
          height: size,
          borderColor: BRAND,
        }}
        animate={{
          scale: [1, 1.6],
          opacity: [0.6, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.8,
        }}
      />

      {/* ===== Main Button ===== */}
      <button
        onClick={onClick}
        className="relative flex items-center justify-center rounded-full bg-white shadow-2xl transition-transform duration-300 hover:scale-110"
        style={{
          width: size - 30,
          height: size - 30,
        }}
      >
        {/* SVG Play */}
        <svg
          width="35"
          height="35"
          viewBox="0 0 30 30"
          fill="none"
        >
          {/* Fill Triangle */}
          <polygon
            points="5,0 30,15 5,30"
            fill={BRAND}
            className="opacity-90"
          />

          {/* Stroke Animation */}
          <motion.path
            d="M5,0 L30,15 L5,30z"
            stroke={BRAND}
            strokeWidth="1"
            fill="none"
            strokeDasharray="90"
            initial={{ strokeDashoffset: 90 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
          />
        </svg>
      </button>
    </div>
  );
}