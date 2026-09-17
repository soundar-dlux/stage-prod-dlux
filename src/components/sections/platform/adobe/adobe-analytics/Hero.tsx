"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import PrimaryButton from "@/src/components/ui/Buttons/PrimaryButton";

const BRAND = "#FF3901";
const BRAND_2 = "#F07800";

/* Deterministic sparkle positions (no Math.random → no hydration mismatch).
   Rendered as CSS-animated stars (see .aa-sparkle in globals.css) — no
   per-frame JS, so they stay lightweight. */
const sparkles = [
  { left: "7%", top: "22%", size: 16, delay: 0, dur: 4 },
  { left: "16%", top: "64%", size: 11, delay: 1.4, dur: 5 },
  { left: "26%", top: "34%", size: 18, delay: 0.6, dur: 4.5 },
  { left: "37%", top: "74%", size: 9, delay: 2.1, dur: 5.5 },
  { left: "46%", top: "16%", size: 13, delay: 1.6, dur: 4 },
  { left: "57%", top: "60%", size: 10, delay: 0.3, dur: 6 },
  { left: "65%", top: "28%", size: 16, delay: 1.9, dur: 4.5 },
  { left: "74%", top: "70%", size: 9, delay: 0.9, dur: 5 },
  { left: "82%", top: "24%", size: 14, delay: 2.4, dur: 4 },
  { left: "90%", top: "58%", size: 11, delay: 0.5, dur: 5.5 },
  { left: "12%", top: "44%", size: 10, delay: 1.7, dur: 5 },
  { left: "67%", top: "46%", size: 13, delay: 2.6, dur: 4.5 },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[150px] pb-24 lg:pt-[120px] text-center">
      {/* ============ AMBIENT BACKGROUND (CSS-only, lightweight) ============ */}
      <div className="absolute inset-0 " aria-hidden="true">
        {/* drifting glow blobs */}
        <div
          className="aa-drift absolute top-[-12%] left-[10%] h-[34rem] w-[34rem] rounded-full blur-[150px]"
          style={{ background: BRAND, opacity: 0.2 }}
        />
        <div
          className="aa-drift-rev absolute top-[18%] right-[8%] h-[30rem] w-[30rem] rounded-full blur-[150px]"
          style={{ background: BRAND_2, opacity: 0.16 }}
        />

        {/* static subtle grid */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* soft spotlight behind headline */}
        <div
          className="absolute left-1/2 top-[42%] h-[26rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          style={{ background: BRAND, opacity: 0.1 }}
        />

        {/* ✨ twinkling sparkles (CSS) */}
        {sparkles.map((s, i) => {
          const color = i % 3 === 0 ? "#ffffff" : i % 3 === 1 ? BRAND : BRAND_2;
          return (
            <span
              key={i}
              className="aa-sparkle"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                background: color,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.dur}s`,
                filter: `drop-shadow(0 0 6px ${color})`,
              }}
            />
          );
        })}

        {/* edge vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_10%,transparent_45%,rgba(0,0,0,0.7))]" />

        {/* decorative glass shards */}
        <div className="aa-drift absolute left-[6%] top-[30%] hidden h-20 w-20 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md md:block" />
        <div className="aa-drift-rev absolute right-[7%] top-[24%] hidden h-14 w-14 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md md:block" />
      </div>

      {/* ===================== CENTERED CONTENT ===================== */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto max-w-4xl px-6 flex flex-col items-center"
      >
        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl lg:text-[60px] font-bold leading-[1.08] tracking-tight text-white"
        >
          Master Your Customer Journey with Adobe Analytics –
          <span className="relative mt-2 inline-block">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(110deg, ${BRAND}, ${BRAND_2})` }}
            >
              Turn Data into Revenue
            </span>
            <motion.span
              className="absolute -bottom-2 left-0 right-0 mx-auto h-[3px] origin-left rounded-full"
              style={{ background: `linear-gradient(90deg, ${BRAND}, ${BRAND_2})` }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.8, ease: "easeOut" }}
            />
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-2xl text-lg md:text-xl leading-relaxed text-gray-400"
        >
          Unlock real-time customer insights, fix broken tracking, and make
          data-driven decisions with an enterprise-grade Adobe Analytics
          implementation.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/contact-us">
            <PrimaryButton asChild className="group">
              <span className="inline-flex items-center gap-2">
                Get a Free Analytics Audit
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </PrimaryButton>
          </Link>

          <Link
            href="/contact-us"
            className="group relative inline-flex min-h-[48px] items-center justify-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/[0.06] px-7 py-3 text-base sm:text-lg font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/[0.1]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            Talk to an Adobe Analytics Expert
          </Link>
        </motion.div>
      </motion.div>

      {/* glassy scroll cue (CSS) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 justify-center rounded-full border border-white/20 bg-white/[0.04] pt-2 backdrop-blur">
          <span
            className="aa-scroll-dot h-2.5 w-1 rounded-full"
            style={{ background: `linear-gradient(${BRAND}, ${BRAND_2})` }}
          />
        </div>
      </div>
    </section>
  );
}
