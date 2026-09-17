"use client";

import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

interface ModalFormButtonProps {
  loading?: boolean;
  label?: string;
  loadingLabel?: string;
  type?: "button" | "submit";
}

export default function ModalFormButton({
  loading = false,
  label = "Submit",
  loadingLabel = "Processing...",
  type = "submit",
}: ModalFormButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="
        relative w-full
        py-2.5 px-4
        rounded-lg
        text-sm font-medium tracking-wide
        text-white
        overflow-hidden
        transition-all duration-300
        disabled:opacity-60 disabled:cursor-not-allowed
      "
    >
      {/* Brand Gradient Background */}
      <span
        className="
          absolute inset-0 rounded-lg
          bg-gradient-to-r 
          from-brand-primary 
          to-brand-secondary
          shadow-lg shadow-brand-primary/30
          transition-all duration-300
        "
      />

      {/* Subtle Hover Brightness */}
      <span className="absolute inset-0 rounded-lg bg-white/10 opacity-0 hover:opacity-100 transition duration-300" />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <>
            <FaSpinner className="animate-spin text-xs" />
            {loadingLabel}
          </>
        ) : (
          label
        )}
      </span>
    </motion.button>
  );
}