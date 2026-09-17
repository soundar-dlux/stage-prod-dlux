"use client";

import { motion } from "framer-motion";

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const BRAND = "#FF3901";

export default function SecondaryButton({
  children,
  onClick,
  className = "",
}: SecondaryButtonProps) {
  return (
    <motion.button
  onClick={onClick}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.96 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className={`
    relative
    inline-flex items-center justify-center
    min-h-[48px] px-6 sm:px-8 py-3
    rounded-full
    font-semibold text-base sm:text-lg
    border-2
    text-[#FF3901]
    border-[#FF3901]
    bg-transparent
    transition-all duration-300
    hover:bg-[#FF3901] hover:text-white
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3901]
    active:scale-[0.98]
    ${className}
  `}
>
      {children}
    </motion.button>
  );
}