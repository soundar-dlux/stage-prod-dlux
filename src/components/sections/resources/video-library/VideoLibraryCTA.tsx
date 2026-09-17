"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      when: "beforeChildren",
      staggerChildren: 0.6,
    },
  },
};


const contentVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: "easeOut" as const,
    },
  },
};


const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.0,
      ease: "easeOut" as const,
    },
  },
};


export default function CtaBanner() {
  return (
    <section
      className="relative w-full lg:w-[1400px] m-auto py-12 px-4 sm:px-8"
      aria-label="Call to Action Banner - Talk to Our Experts"
    >
      <div
        className="absolute top-[30%] left-[10%] w-80 h-80 rounded-full 
        bg-gradient-to-r from-[#ff3901] to-[#F07800] 
        blur-[100px] opacity-70 z-0"
      />

      {/* Glassy Card with Content + Image */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-8 pt-8"
      >
        {/* Text Content */}
        <motion.div
          variants={contentVariants}
          className="block text-center lg:text-left text-white p-8 lg:w-[40%]"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Watched{" "}
            <span className="bg-gradient-to-r from-[#ff3901] to-[#F07800] bg-clip-text text-transparent">
              Our Videos ?
            </span>{" "}
            Talk to Our Experts
          </h2>

          <p className="text-gray-200 mb-6 max-w-md text-sm lg:text-[16px]">
            From Project Management to AI, Martech Tools our videos are just
            the beginning. Let’s talk about solutions that fit your enterprise
            needs.
          </p>

          <Link
            href="/contact-us"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect with DLUX Experts"
            title="Connect to DLUX Experts"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-2 rounded-full bg-white text-black font-medium border border-transparent hover:border-white/40 transition-all"
            >
              Connect to Us
            </motion.button>
          </Link>
        </motion.div>

        {/* Image Inside Glassy Box */}
        <motion.div
          variants={imageVariants}
          className="justify-end w-full lg:w-[60%]"
        >
          <img
            src="https://images.ctfassets.net/pj0maraabon4/3a28AU8s1QapOml16jHS7f/bc4d97c8dcbd1d439085bea698afcdd5/cta-banner-image.png"
            alt="DLUX Experts Consultation Banner - Enterprise Solutions"
            title="Talk to DLUX Enterprise Experts"
            className="drop-shadow-xl"
            loading="lazy"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
