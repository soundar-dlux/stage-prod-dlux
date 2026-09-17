"use client";

import { motion } from "framer-motion";

interface NavButtonProps {
  direction: "prev" | "next";
  variant?: "minimal" | "glass" | "glow" | "outline" | "solid";
  size?: number;
  onClick?: () => void;
  className?: string;
}

const BRAND = "#FF3901";

export default function NavButton({
  direction,
  variant = "glass",
  size = 56,
  onClick,
  className = "",
}: NavButtonProps) {
  const isNext = direction === "next";

  const baseClasses =
    "flex items-center justify-center rounded-full transition-all duration-300";

  const icon = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="white"
    >
      {isNext ? (
        <path d="M8 4l8 8-8 8" />
      ) : (
        <path d="M16 4l-8 8 8 8" />
      )}
    </svg>
  );

  const variants = {
    minimal: (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className={`${baseClasses} bg-transparent text-white`}
        style={{ width: size, height: size }}
      >
        {icon}
      </motion.button>
    ),

    glass: (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`${baseClasses} border border-white/10 bg-black/50 backdrop-blur-md text-white hover:bg-${BRAND}`}
        style={{ width: size, height: size }}
      >
        {icon}
      </motion.button>
    ),

    glow: (
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`${baseClasses}`}
        style={{
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${BRAND}, #ff6a2c)`,
          boxShadow: `0 0 25px ${BRAND}, 0 0 60px ${BRAND}40`,
        }}
      >
        {icon}
      </motion.button>
    ),

    outline: (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`${baseClasses} border-2`}
        style={{
          width: size,
          height: size,
          borderColor: BRAND,
          color: BRAND,
        }}
      >
        {icon}
      </motion.button>
    ),

    solid: (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`${baseClasses} text-white`}
        style={{
          width: size,
          height: size,
          backgroundColor: BRAND,
        }}
      >
        {icon}
      </motion.button>
    ),
  };

  return <div className={className}>{variants[variant]}</div>;
}