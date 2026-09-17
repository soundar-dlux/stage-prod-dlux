import { Variants } from "framer-motion";

/**
 * Container animation
 * Handles staggered children reveal
 */
export const fadeContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

/**
 * Item animation
 * Fade + slide up
 */
export const fadeUpItem: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // TS-safe easeOut
    },
  },
};
