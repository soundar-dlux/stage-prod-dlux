
"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedSparkProps {
  size?: number;
  color?: string;
  className?: string;
  duration?: number;
}

export default function AnimatedSpark({
  size = 55,
  color = "#FE590D",
  className = "",
  duration = 8,
}: AnimatedSparkProps) {
  const rays = [
    [27.5, 0, 27.5, 11],
    [43, 12, 35, 20],
    [44, 27.5, 55, 27.5],
    [43, 43, 35, 35],
    [27.5, 44, 27.5, 55],
    [12, 43, 20, 35],
    [0, 27.5, 11, 27.5],
    [12, 12, 20, 20],
  ];

  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
      }}
      animate={{
        rotate: [0, 360],
        scale: [1, 1.08, 1],
      }}
      transition={{
        rotate: {
          duration,
          repeat: Infinity,
          ease: "linear",
        },
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 55 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {rays.map((ray, index) => (
          <motion.line
            key={index}
            x1={ray[0]}
            y1={ray[1]}
            x2={ray[2]}
            y2={ray[3]}
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            animate={{
              opacity: [0.65, 1, 0.65],
            }}
            transition={{
              duration: 1.5,
              delay: index * 0.12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
