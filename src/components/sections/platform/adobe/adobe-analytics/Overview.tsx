"use client";

import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

const BRAND = "#FF3901";
const BRAND_2 = "#F07800";

export function Overview() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* subtle ambient glow (CSS drift, lightweight) */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div
          className="aa-drift absolute top-1/4 -left-24 h-72 w-72 rounded-full blur-[140px]"
          style={{ background: BRAND, opacity: 0.7 }}
        />
        <div
          className="aa-drift-rev absolute bottom-0 right-0 h-72 w-72 rounded-full blur-[150px]"
          style={{ background: BRAND_2, opacity: 0.08 }}
        />
      </div>

      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ===================== CONTENT ===================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center rounded-full border border-[#FF3901]/30 bg-[#FF3901]/10 px-4 py-1.5 text-sm font-medium text-[#FF6A3D]">
              Understand Adobe Analytics
            </span>

            <h2 className="mt-5 text-3xl font-bold lg:leading-tight text-white md:text-4xl lg:text-[44px]">
              What is Adobe Analytics?{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(110deg, ${BRAND}, ${BRAND_2})`,
                }}
              >
                Why It Matters in 2026
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-400 lg:mx-0">
              Adobe Analytics is an enterprise-grade behavioural analytics
              solution built to deliver deep customer journey intelligence across
              web, mobile, app, CRM, and offline channels. Powered by AI and
              real-time data insights, it helps brands uncover user behaviour,
              eliminate drop-off points, optimize engagement, and personalize
              experiences at every touchpoint.
            </p>
          </motion.div>

          {/* ===================== IMAGE PLACEHOLDER ===================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            {/* static gradient halo */}
            <div
              className="absolute -inset-4 rounded-[34px] opacity-30 blur-2xl"
              style={{ background: `linear-gradient(135deg, ${BRAND}, ${BRAND_2})` }}
            />

            {/* glass frame */}
            <div className="relative rounded-[26px] border border-white/15 bg-white/[0.05] p-3 shadow-2xl backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 rounded-[26px] bg-[radial-gradient(120%_80%_at_30%_0%,rgba(255,255,255,0.16),transparent_55%)]" />

              {/* ----- replace this block with <Image .../> later ----- */}
              <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center overflow-hidden rounded-[18px] border border-dashed border-white/20 bg-gradient-to-br from-white/[0.06] to-white/[0.01]">
                {/* shimmer sweep (CSS) */}
                <div
                  className="aa-shimmer pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.10) 50%, transparent 70%)",
                  }}
                />
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ background: `linear-gradient(135deg, ${BRAND}, ${BRAND_2})` }}
                >
                  <ImageIcon className="h-8 w-8 text-white" />
                </div>
                <p className="mt-4 text-sm font-medium text-white/80">
                  Image placeholder
                </p>
                <p className="mt-1 text-xs text-white/40">
                  Replace with your visual
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
