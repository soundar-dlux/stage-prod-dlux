"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export interface PrimaryButtonProps {
  /** Button label or React node */
  children: React.ReactNode;
  /** Click handler function */
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /** Optional link URL (renders as <a> tag if provided) */
  href?: string;
  /** Additional CSS class names */
  className?: string;
  /** Whether to display right arrow icon (default: true) */
  icon?: boolean;
  /** Custom icon component override */
  customIcon?: React.ReactNode;
  /** Button type if rendered as button element */
  type?: "button" | "submit" | "reset";
  /** Disabled state */
  disabled?: boolean;
}

export function PrimaryButton({
  children,
  onClick,
  href,
  className = "",
  icon = true,
  customIcon,
  type = "button",
  disabled = false,
}: PrimaryButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const buttonContent = (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: disabled ? 1 : 1.04, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      className={`
        relative inline-flex items-center justify-center gap-2.5
        min-h-[48px] px-7 py-3.5 rounded-full
        font-bold text-sm sm:text-base tracking-wide text-white
        overflow-hidden cursor-pointer select-none
        transition-all duration-300 shadow-lg shadow-[#FE3908]/30
        wb-primary-btn bg-gradient-to-r from-[#FE780C] to-[#FE3908]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80
        ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
        ${className}
      `}
    >
      {/* 🌟 Continuous Shimmer Beam */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg, transparent 20%, rgba(255, 255, 255, 0.4) 50%, transparent 80%)",
        }}
        animate={{
          transform: ["translateX(-150%)", "translateX(150%)"],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 1.5,
        }}
      />

      {/* 💎 Subtle Inner Top Light Highlight */}
      <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-80" />

      {/* Button Text */}
      <span className="relative z-10">{children}</span>

      {/* Icon */}
      {icon && (
        <motion.span
          className="relative z-10 flex items-center justify-center"
          animate={isHovered ? { x: 4 } : { x: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
        </motion.span>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className="inline-block">
      {buttonContent}
    </button>
  );
}

export default PrimaryButton;
