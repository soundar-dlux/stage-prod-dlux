"use client";

import { motion } from "framer-motion";
import CinematicHero from "@/src/components/ui/Banners/CinematicHero";
import AnimatedDivider from "@/src/components/ui/Banners/AnimatedDivider";

export default function WhyDluxBanner() {
  return (
    <section className="py-8 lg:py-0">
      <CinematicHero
        image="https://images.ctfassets.net/pj0maraabon4/6Ed93GxDpRGDWT4g9zevBl/fe87485e0cc584ac504df090538fb020/two-businesspeople-are-working-together-find-way-solve-business-issue-flat-vector-illustration.jpg"
        alt="Why DLUX"
        subtitle="WHY DLUX"
        title={
          <h1 className="font-semibold leading-tight text-3xl md:text-4xl lg:text-5xl">
            <span className="text-brand-white">

              Where Strategy Meets
            </span>
            <br />
            <span className="bg-gradient-to-r from-brand-gradientFrom to-brand-gradientTo bg-clip-text text-transparent">

              Scalable Innovation
            </span>
          </h1>
        }
      >
        {/* Sub Text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-white/75 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          We combine deep marketing technology expertise with strategic thinking
          to deliver measurable impact and future-ready digital ecosystems.
        </motion.p>

        {/* Divider */}
        <AnimatedDivider />
      </CinematicHero>
    </section>
  );
}