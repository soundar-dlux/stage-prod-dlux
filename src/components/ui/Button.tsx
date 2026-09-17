"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface ButtonProps {
  children: string;
  variant?: "primary" | "secondary";
  className?: string;
  icon?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  icon = true,
}: ButtonProps) {
  const letters = children.split("");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleHoverStart = () => {
    setIsAnimating(true);
  };

  const handleHoverEnd = () => {
    // ❌ DO NOT stop animation immediately
    // Let it finish
    setTimeout(() => {
      setIsAnimating(false);
    }, 400 + letters.length * 50); // match total animation duration
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className={`
        relative overflow-hidden px-6 py-3 rounded-full font-semibold flex items-center gap-2
        transition-all duration-300
        ${
          variant === "primary"
            ? "bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo text-white shadow-lg"
            : "border-2 border-white text-white bg-transparent"
        }
        ${className}
      `}
    >
      {/* WAVE TEXT */}
      <span className="flex">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            animate={
              isAnimating
                ? {
                    y: [-2, -6, 0],
                  }
                : { y: 0 }
            }
            transition={{
              duration: 0.4,
              delay: i * 0.05,
              ease: "easeOut",
            }}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </span>

      {/* ICON */}
      {icon && (
        <motion.span
          animate={isAnimating ? { x: 4 } : { x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight size={18} />
        </motion.span>
      )}
    </motion.button>
  );
}