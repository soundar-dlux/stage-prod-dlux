"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import PrimaryButton from "@/src/components/ui/Buttons/PrimaryButton";

const BRAND = "#FF3901";
const BRAND_2 = "#F07800";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      {/* ===== slowly moving brand-color background ===== */}
      <div className="absolute inset-0 z-1" aria-hidden="true">
        <div
          className="aa-gradient-pan absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(255,57,1,0.30), rgba(122,31,0,0.12), rgba(240,120,0,0.28), rgba(255,57,1,0.22), rgba(122,31,0,0.14))",
          }}
        />
        <div
          className="aa-drift absolute -left-16 top-0 h-80 w-80 rounded-full blur-[150px]"
          style={{ background: BRAND, opacity: 0.22 }}
        />
        <div
          className="aa-drift-rev absolute -right-16 bottom-0 h-80 w-80 rounded-full blur-[150px]"
          style={{ background: BRAND_2, opacity: 0.2 }}
        />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />
        {/* vignette to keep text crisp */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_30%,rgba(0,0,0,0.65))]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto flex max-w-3xl flex-col items-center px-6 text-center"
      >
        <motion.h2
          variants={item}
          className="text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl"
        >
          Have more{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(110deg, ${BRAND}, ${BRAND_2})` }}
          >
            questions?
          </span>
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-lg leading-relaxed text-gray-300 md:text-xl"
        >
          Get a Free Adobe Analytics Health Check – Book a consultation with our
          experts today.
        </motion.p>

        <motion.div variants={item} className="relative mt-10">
          {/* pulsing glow behind the button */}
          <span
            className="pointer-events-none absolute inset-0 rounded-full blur-xl animate-pulse"
            style={{ background: BRAND, opacity: 0.4 }}
            aria-hidden="true"
          />
          <Link href="/contact-us" className="relative">
            <PrimaryButton asChild className="group px-9">
              <span className="inline-flex items-center gap-2">
                Contact Us
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </PrimaryButton>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
