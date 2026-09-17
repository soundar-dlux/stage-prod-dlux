"use client";

import { motion } from "framer-motion";
import React from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  asChild?: boolean; 
}

const BRAND = "#FF3901";

export default function PrimaryButton({
  children,
  onClick,
  className = "",
  asChild = false,
}: PrimaryButtonProps) {
  const Comp: any = asChild ? motion.div : motion.button;

  return (
    <Comp
      onClick={onClick}
      whileHover={{ scale: 1.06, y: -3 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative
        inline-flex items-center justify-center
        min-h-[48px] px-6 sm:px-8 py-3
        rounded-full
        font-semibold text-white text-base sm:text-lg
        overflow-hidden
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white
        ${className}
      `}
      style={{
        background: `linear-gradient(135deg, ${BRAND}, #ff7a1a)`,
        boxShadow: `0 10px 35px rgba(255, 57, 1, 0.45)`,
      }}
    >
      {/* 🔥 Shimmer */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              120deg,
              transparent 25%,
              rgba(255, 57, 1, 0.35) 45%,
              rgba(255, 122, 26, 0.45) 50%,
              rgba(255, 57, 1, 0.35) 55%,
              transparent 75%
            )
          `,
          transform: "translateX(-120%)",
        }}
        animate={{
          transform: ["translateX(-120%)", "translateX(120%)"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 1.2,
        }}
      />

      {/* 💎 Inner Highlight */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 60%)",
        }}
      />

      {/* ✨ Glow */}
      <motion.span
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          boxShadow: "0 0 40px rgba(255, 57, 1, 0.6)",
        }}
      />

      <span className="relative z-10">{children}</span>
    </Comp>
  );
}