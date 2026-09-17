"use client";

import { motion } from "framer-motion";

type DividerProps = {
  width?: number; // px
  height?: number; // px
  delay?: number;
  duration?: number;
  align?: "left" | "center" | "right";
  color?: string;
  gradient?: string;
  glow?: boolean;
  className?: string;
};

const PRIMARY_GRADIENT =
  "linear-gradient(90deg, #ff7a00 0%, #ff3d00 100%)";

export default function AnimatedDivider({
  width = 120,
  height = 3,
  delay = 0.3,
  duration = 0.8,
  align = "center",
  color = "#ffffff66",
  gradient = PRIMARY_GRADIENT,
  glow = true,
  className = "",
}: DividerProps) {
  const alignment =
    align === "center"
      ? "mx-auto"
      : align === "left"
      ? "mr-auto"
      : "ml-auto";

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width, opacity: 1 }}
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`${alignment} mt-6 rounded-full ${className}`}
      style={{
        height,
        background: gradient || color,
        boxShadow: glow
          ? "0 0 12px rgba(255, 80, 0, 0.6), 0 0 24px rgba(255, 60, 0, 0.4)"
          : "none",
      }}
    />
  );
}