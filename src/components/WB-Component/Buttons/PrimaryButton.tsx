
"use client";

import React from "react";
import { motion } from "framer-motion";

export interface PrimaryButtonProps {
  /** Button label or React node */
  children: React.ReactNode;

  /** Click handler */
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;

  /** Optional link URL */
  href?: string;

  /** Additional CSS classes */
  className?: string;

  /** Whether to display an icon */
  icon?: boolean;

  /** Custom icon or image component */
  customIcon?: React.ReactNode;

  /** Button type */
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
  const buttonContent = (
    <motion.span
      whileHover={
        !disabled
          ? {
              y: -2,
            }
          : {}
      }
      whileTap={
        !disabled
          ? {
              scale: 0.98,
            }
          : {}
      }
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 22,
      }}
      className={`
        group relative isolate inline-flex items-center justify-center gap-2.5
        min-h-[48px] px-7 py-3.5 rounded-full
        font-bold text-sm sm:text-base tracking-wide text-white
        overflow-hidden select-none
        shadow-lg shadow-[#FE3908]/30
        wb-primary-btn
        bg-gradient-to-r from-[#FE780C] to-[#FE3908]
        transition-[box-shadow,background-color] duration-500 ease-out
        ${disabled
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer hover:shadow-xl hover:shadow-[#FE3908]/40"
        }
        ${className}
      `}
    >
      {/* Smooth Hover Background */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full"
        initial={{ opacity: 0 }}
        whileHover={!disabled ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(110deg, #FF9A20 0%, #FE3908 55%, #FF6A00 100%)",
        }}
      />

      {/* Continuous Shimmer */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.35) 50%, transparent 80%)",
        }}
        animate={
          disabled
            ? {}
            : {
                x: ["-150%", "150%"],
              }
        }
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 1.5,
        }}
      />

      {/* Top Highlight */}
      <span
        aria-hidden="true"
        className="
          absolute inset-x-0 top-0 h-px
          bg-gradient-to-r from-transparent
          via-white/50 to-transparent
          pointer-events-none
        "
      />

      {/* Icon - No Hover Animation */}
      {icon && customIcon && (
        <span
          aria-hidden="true"
          className="relative z-10 flex shrink-0 items-center justify-center"
        >
          {customIcon}
        </span>
      )}

      {/* Content - No Hover Animation */}
      <span className="relative z-10">
        {children}
      </span>
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        onClick={disabled ? undefined : onClick}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        className="inline-flex"
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex"
    >
      {buttonContent}
    </button>
  );
}

export default PrimaryButton;
