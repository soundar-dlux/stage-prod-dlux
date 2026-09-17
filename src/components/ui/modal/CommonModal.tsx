"use client";

import { useEffect, ReactNode, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function CommonModal({
  open,
  onClose,
  title = "Enquire Now",
  children,
}: ModalProps) {
  const titleId = useId();

  // Lock scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // ESC close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1000] 
                     bg-black/75 backdrop-blur-sm
                     flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 25, opacity: 0, scale: 0.94 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 15, opacity: 0, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-full max-w-md rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Brand Gradient Border */}
            <div className="p-[1px] rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary">
              
              {/* Surface */}
              <div
                className="
                  relative
                  rounded-2xl
                  bg-black
                  shadow-[0_30px_70px_rgba(0,0,0,0.8)]
                  overflow-hidden
                "
              >
                {/* Brand Glow */}
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-brand-primary/25 blur-3xl rounded-full pointer-events-none" />

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-brand-primary/20">
                  <h3
                    id={titleId}
                    className="text-base font-semibold text-white tracking-wide"
                  >
                    {title}
                  </h3>

                  <motion.button
                    onClick={onClose}
                    type="button"
                    aria-label="Close modal"
                    whileHover={{ rotate: 90, scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    className="
                      w-8 h-8 rounded-lg
                      flex items-center justify-center
                      bg-brand-primary/10
                      text-brand-primary
                      hover:bg-brand-primary/20
                      transition-all duration-200
                    "
                  >
                    <FaTimes size={12} />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="px-5 py-5 text-sm text-white/80">
                  {children}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}