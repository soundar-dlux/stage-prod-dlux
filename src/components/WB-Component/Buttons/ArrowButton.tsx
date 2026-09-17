"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, ArrowUp, ArrowDown } from "lucide-react";

export interface ArrowButtonProps {
  /** Optional button text label */
  children?: React.ReactNode;
  /** Click handler function */
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /** Optional link URL (renders as <a> tag if provided) */
  href?: string;
  /** Direction of arrow icon ("right" | "left" | "up" | "down") @default "right" */
  direction?: "right" | "left" | "up" | "down";
  /** Button visual style variant @default "primary" */
  variant?: "primary" | "secondary" | "outline" | "white";
  /** Size variant @default "md" */
  size?: "sm" | "md" | "lg";
  /** Additional CSS class names */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Button type if rendered as button element */
  type?: "button" | "submit" | "reset";
}

export function ArrowButton({
  children,
  onClick,
  href,
  direction = "right",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
}: ArrowButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Icon mapping
  const ArrowIcon = {
    right: ArrowRight,
    left: ArrowLeft,
    up: ArrowUp,
    down: ArrowDown,
  }[direction];

  // Motion offset on hover based on direction
  const iconMotion = {
    right: { x: isHovered ? 4 : 0 },
    left: { x: isHovered ? -4 : 0 },
    up: { y: isHovered ? -4 : 0 },
    down: { y: isHovered ? 4 : 0 },
  }[direction];

  // Size styling classes
  const sizeClasses = {
    sm: children ? "px-4 py-2 text-xs min-h-[36px]" : "w-9 h-9 text-xs",
    md: children ? "px-6 py-3 text-sm min-h-[46px]" : "w-12 h-12 text-sm",
    lg: children ? "px-8 py-4 text-base min-h-[56px]" : "w-14 h-14 text-base",
  }[size];

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  }[size];

  // Variant styling classes
  const variantClasses = {
    primary: "bg-brand-primary text-white shadow-lg shadow-brand-primary/30 hover:bg-brand-secondary",
    secondary: "bg-surface-light text-surface-white border border-surface-white/20 hover:border-surface-white hover:bg-surface-white/10",
    outline: "bg-transparent text-current border border-current hover:bg-black/5 dark:hover:bg-white/10",
    white: "bg-surface-white text-surface-dark shadow-md hover:bg-surface-white/90",
  }[variant];

  const buttonContent = (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: disabled ? 1 : 1.05, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`
        relative inline-flex items-center justify-center gap-2.5 rounded-full
        font-bold tracking-wide select-none cursor-pointer
        transition-all duration-300 overflow-hidden
        focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary
        ${sizeClasses}
        ${variantClasses}
        ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
        ${className}
      `}
    >
      {/* Label Text */}
      {children && <span className="relative z-10">{children}</span>}

      {/* Arrow Icon */}
      <motion.span
        className="relative z-10 flex items-center justify-center"
        animate={iconMotion}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <ArrowIcon size={iconSizes} className="stroke-[2.5]" />
      </motion.span>
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

// Export alias ArrowBtn
export const ArrowBtn = ArrowButton;

export default ArrowButton;
