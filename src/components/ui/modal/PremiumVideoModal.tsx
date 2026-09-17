"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PremiumVideoModalProps {
  videoUrl?: string;
  onClose: () => void;
}

const BRAND = {
  primary: "#FF3901",
  secondary: "#F07800",
};

export default function PremiumVideoModal({
  videoUrl,
  onClose,
}: PremiumVideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  /* ===== Play Video on Mount ===== */
  useEffect(() => {
    videoRef.current?.play();

    // Lock Scroll
    document.body.style.overflow = "hidden";

    // ESC to Close
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!videoUrl) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Premium video modal"
        tabIndex={-1}
        className="fixed inset-0 z-50 flex items-center justify-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* ===== Backdrop ===== */}
        <motion.div
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* ===== Premium Glow Layer ===== */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0.15 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-none absolute w-[900px] h-[900px] rounded-full blur-[200px]"
          style={{
            background: `radial-gradient(circle, ${BRAND.primary}, ${BRAND.secondary})`,
          }}
        />

        {/* ===== Video Container ===== */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 60 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 40 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative w-full max-w-6xl rounded-3xl
          bg-gradient-to-br from-neutral-900 to-black
          border border-white/10
          shadow-[0_40px_120px_rgba(0,0,0,0.8)]
          backdrop-blur-xl p-6"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            type="button"
            aria-label="Close video modal"
            className="absolute -top-4 -right-4 w-12 h-12 rounded-full
            flex items-center justify-center
            bg-white/10 backdrop-blur-md
            border border-white/20
            text-white text-xl
            hover:bg-[#FF3901] hover:text-black
            transition-all duration-300"
          >
            ✕
          </button>

          {/* Video */}
          <div className="rounded-2xl overflow-hidden">
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}