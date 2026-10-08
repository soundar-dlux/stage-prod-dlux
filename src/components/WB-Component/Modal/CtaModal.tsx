"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export interface CtaModalProps {
  /** Controls modal visibility */
  isOpen: boolean;
  /** Callback fired when closing the modal */
  onClose: () => void;
  /** Optional top badge / pill text (e.g. "STRATEGY SESSION", "GET STARTED") */
  badge?: React.ReactNode;
  /** Main title displayed at top of modal */
  title?: React.ReactNode;
  /** Description or subtitle text */
  description?: React.ReactNode;
  /** Label for the main action button */
  primaryButtonText?: string;
  /** Callback when form is submitted */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  /** Custom content to render inside modal body (replaces or appends to form) */
  children?: React.ReactNode;
  /** Whether to render default CTA lead form (default: true) */
  showForm?: boolean;
  /** Custom footer note or trust signal */
  footerNote?: React.ReactNode;
  /** Close modal on backdrop overlay click (default: true) */
  closeOnOverlayClick?: boolean;
  /** Close modal on Escape key press (default: true) */
  closeOnEscape?: boolean;
  /** Additional custom class names for modal container */
  className?: string;
  /** Additional custom class names for backdrop overlay */
  overlayClassName?: string;
}

export function CtaModal({
  isOpen,
  onClose,
  badge = "GET IN TOUCH",
  title = (
    <>
      Transform Your Digital Experience with <span className="text-[#FE3908]">DLUX</span>
    </>
  ),
  description = "Book a 1-on-1 strategy call with our experts to discover tailored solutions for your enterprise.",
  primaryButtonText = "Submit Request",
  onSubmit,
  children,
  showForm = true,
  footerNote = "We respect your privacy. No spam, ever.",
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = "",
  overlayClassName = "",
}: CtaModalProps) {
  // Handle Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape" && isOpen) {
        onClose();
      }
    },
    [closeOnEscape, isOpen, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div
          aria-modal="true"
          role="dialog"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop Overlay with Smooth Blur Fade */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={closeOnOverlayClick ? onClose : undefined}
            className={`fixed inset-0 bg-black/60 ${overlayClassName}`}
          />

          {/* Modal Container with Spring Scale Pop Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 26,
              mass: 0.9,
            }}
            style={{
              width: "500px",
              maxWidth: "calc(100vw - 32px)",
              minWidth: "300px",
              maxHeight: "90vh",
              borderRadius: "24px",
              padding: "28px 24px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #E9E9E9",
              borderTop: "1px solid #E9E9E9",
              opacity: 1,
              transform: "rotate(0deg)",
            }}
            className={`
              relative z-10 w-full flex flex-col justify-between overflow-y-auto scrollbar-hide
              shadow-2xl shadow-black/20 box-border font-sans
              ${className}
            `}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="
                absolute top-4 right-4 sm:top-5 sm:right-5
                w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900
                flex items-center justify-center transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FE3908]
                cursor-pointer select-none z-20
              "
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Main Content Body */}
            <div className="flex flex-col gap-4 w-full">
              {/* Header Section */}
              <div className="flex flex-col gap-2 pr-6">
                {badge && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FE3908]/10 text-[#FE3908] text-[11px] font-bold tracking-wider uppercase w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FE3908] animate-pulse" />
                    {badge}
                  </div>
                )}
                {title && (
                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 leading-snug">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {description}
                  </p>
                )}
              </div>

              {/* Form Section */}
              {showForm && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                  <div className="flex flex-col gap-3">
                    {/* Name Field */}
                    <div className="flex flex-col gap-1">
                      <label htmlFor="cta-name" className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">
                        Full Name <span className="text-[#FE3908]">*</span>
                      </label>
                      <input
                        id="cta-name"
                        name="name"
                        type="text"
                        required
                        placeholder="John Doe"
                        className="
                          w-full px-3.5 py-2.5 rounded-xl border border-[#E9E9E9] bg-gray-50/50
                          text-gray-900 text-sm placeholder-gray-400
                          focus:outline-none focus:ring-2 focus:ring-[#FE3908]/30 focus:border-[#FE3908] focus:bg-white
                          transition-all duration-200
                        "
                      />
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col gap-1">
                      <label htmlFor="cta-email" className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">
                        Work Email <span className="text-[#FE3908]">*</span>
                      </label>
                      <input
                        id="cta-email"
                        name="email"
                        type="email"
                        required
                        placeholder="john@company.com"
                        className="
                          w-full px-3.5 py-2.5 rounded-xl border border-[#E9E9E9] bg-gray-50/50
                          text-gray-900 text-sm placeholder-gray-400
                          focus:outline-none focus:ring-2 focus:ring-[#FE3908]/30 focus:border-[#FE3908] focus:bg-white
                          transition-all duration-200
                        "
                      />
                    </div>

                    {/* Phone / Organization Field */}
                    <div className="flex flex-col gap-1">
                      <label htmlFor="cta-phone" className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">
                        Phone Number
                      </label>
                      <input
                        id="cta-phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="
                          w-full px-3.5 py-2.5 rounded-xl border border-[#E9E9E9] bg-gray-50/50
                          text-gray-900 text-sm placeholder-gray-400
                          focus:outline-none focus:ring-2 focus:ring-[#FE3908]/30 focus:border-[#FE3908] focus:bg-white
                          transition-all duration-200
                        "
                      />
                    </div>

                    {/* Message / Requirement Field */}
                    <div className="flex flex-col gap-1">
                      <label htmlFor="cta-message" className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">
                        How can we help?
                      </label>
                      <textarea
                        id="cta-message"
                        name="message"
                        rows={2}
                        placeholder="Tell us about your project requirements or goals..."
                        className="
                          w-full px-3.5 py-2.5 rounded-xl border border-[#E9E9E9] bg-gray-50/50
                          text-gray-900 text-sm placeholder-gray-400 resize-none
                          focus:outline-none focus:ring-2 focus:ring-[#FE3908]/30 focus:border-[#FE3908] focus:bg-white
                          transition-all duration-200
                        "
                      />
                    </div>
                  </div>

                  {/* Primary Action Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="
                      relative w-full py-3 px-6 rounded-full overflow-hidden
                      bg-gradient-to-r from-[#FE780C] to-[#FE3908] text-white font-bold text-sm sm:text-base
                      shadow-md shadow-[#FE3908]/25 hover:shadow-lg hover:shadow-[#FE3908]/40
                      flex items-center justify-center gap-2 transition-all duration-300
                      cursor-pointer select-none border-none mt-1
                    "
                  >
                    {/* Continuous Shimmer Beam */}
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
                    <span className="relative z-10">{primaryButtonText}</span>
                    <ArrowRight className="relative z-10 w-4 h-4" />
                  </motion.button>
                </form>
              )}

              {/* Children (if additional custom components provided) */}
              {children}
            </div>

            {/* Footer Border Top & Trust Note */}
            {footerNote && (
              <div className="pt-3 border-t border-[#E9E9E9] flex items-center justify-center gap-2 text-gray-500 text-[11px] text-center mt-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FE3908]" />
                <span>{footerNote}</span>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CtaModal;
