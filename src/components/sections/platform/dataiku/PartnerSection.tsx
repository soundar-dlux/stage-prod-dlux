"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { memo } from "react";

/* ---------------- Motion ---------------- */
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.15,
    },
  },
};

/* ---------------- Component ---------------- */
function PartnerSection() {
  return (
    <section className="relative py-10 sm:py-14 lg:py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-brand-black overflow-hidden text-brand-white">

      {/* Ambient Glow (optimized for mobile) */}
      <div className="absolute -top-32 -left-32 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] rounded-full blur-3xl opacity-20 bg-[radial-gradient(circle,_#FF3901,_transparent_70%)]" />
      <div className="absolute -bottom-32 -right-32 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] rounded-full blur-3xl opacity-20 bg-[radial-gradient(circle,_#F07800,_transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 sm:gap-12 lg:gap-16">

        {/* Logo Card */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex-shrink-0 w-full md:w-auto flex justify-center"
        >
          <div className="backdrop-blur-xl p-5 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl shadow-xl transition-all duration-500 hover:scale-105 bg-white/5 border border-brand-primary/40 shadow-[0_20px_60px_rgba(255,57,1,0.2)]">

            <Image
              src="https://images.ctfassets.net/pj0maraabon4/2ndfQKXPMONiNB7Abn1vwn/07355d1f93a46f706ef2f461a3dca214/download.png"
              alt="DLUX Partner"
              width={320}
              height={220}
              className="object-contain w-[200px] sm:w-[260px] md:w-[300px] lg:w-[320px] h-auto"
            />

          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-xl text-center md:text-left"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-snug mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              DLUX –
            </span>{" "}
            Data Made Simple, Personalized Just for You!
          </h3>

          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-300">
            Tap into the potential of cutting-edge data analytics and AI with
            <span className="text-brand-white font-semibold"> DLUX</span>, a trusted
            Dataiku Consulting Partner. We integrate and optimize Dataiku
            for organizations of all sizes — from Fortune enterprises to
            fast-growing mid-market companies.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

export default memo(PartnerSection);