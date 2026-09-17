"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export interface SecondaryButtonProps {
  /** Button label or React node */
  children: React.ReactNode;
  /** Click handler function */
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /** Optional link URL (renders as <a> tag if provided) */
  href?: string;
  /** Additional CSS class names */
  className?: string;
  /** Whether to display right arrow icon (default: false) */
  icon?: boolean;
  /** Custom icon component override */
  customIcon?: React.ReactNode;
  /** Button type if rendered as button element */
  type?: "button" | "submit" | "reset";
  /** Disabled state */
  disabled?: boolean;
}

export function SecondaryButton({
  children,
  onClick,
  href,
  className = "",
  icon = false,
  customIcon,
  type = "button",
  disabled = false,
}: SecondaryButtonProps) {
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
        font-semibold text-sm sm:text-base tracking-wide
        overflow-hidden cursor-pointer select-none
        transition-all duration-300 backdrop-blur-md
        border border-neutral-300 hover:border-black text-neutral-900 hover:bg-neutral-100/80
        dark:border-surface-white/30 dark:hover:border-surface-white dark:text-surface-white dark:hover:bg-surface-white/10
        focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary
        ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
        ${className}
      `}
    >
      {/* 🔹 Hover Fill Accent */}
      <motion.span
        className="absolute inset-0 bg-surface-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      {/* Button Text */}
      <span className="relative z-10">{children}</span>

      {/* Icon */}
      {icon && (
        <motion.span
          className="relative z-10 flex items-center justify-center"
          animate={isHovered ? { x: 4 } : { x: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {customIcon || <ArrowRight className="w-4 h-4 stroke-[2]" />}
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

export default SecondaryButton;
