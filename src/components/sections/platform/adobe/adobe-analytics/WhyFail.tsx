"use client";

import { motion } from "framer-motion";
import { X, Wrench } from "lucide-react";

const BRAND = "#FF3901";
const BRAND_2 = "#F07800";

const failures = [
  "Incomplete or broken tracking",
  "Poor ACDL structure",
  "No clear customer journey visibility",
  "Data exists, but no actionable insights",
  "The complex Adobe ecosystem is not fully utilized",
];

export function WhyFail() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* ambient glow (lightweight CSS drift) */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="aa-drift absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full blur-[150px]"
          style={{ background: "#b3340a", opacity: 0.14 }}
        />
      </div>

      <div className="container mx-auto max-w-5xl px-6">
        {/* heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center text-3xl font-bold lg:leading-tight text-white md:text-4xl lg:text-[44px]"
        >
          Why Most Adobe Analytics Implementations Fail
        </motion.h2>

        {/* ===================== ALTERNATING TIMELINE ===================== */}
        <div className="relative mt-16">
          {/* growing spine */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute left-[19px] top-0 bottom-0 w-[2px] origin-top -translate-x-1/2 bg-gradient-to-b from-[#FF3901] via-[#F07800] to-transparent lg:left-1/2"
          />

          <div className="space-y-7 lg:space-y-2">
            {failures.map((failure, i) => {
              const even = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: even ? -36 : 36 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  {/* numbered node on the spine */}
                  <span className="absolute left-[19px] top-5 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0c0c0e] text-sm font-bold text-white lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2">
                    {String(i + 1).padStart(2, "0")}
                    <span className="absolute inset-0 rounded-full ring-2 ring-[#FF3901]/30 animate-pulse" />
                  </span>

                  <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
                    <div
                      className={`pl-14 lg:pl-0 ${
                        even
                          ? "lg:col-start-1 lg:pr-16 lg:text-right"
                          : "lg:col-start-2 lg:pl-16 lg:text-left"
                      }`}
                    >
                      <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-red-500/40">
                        <div
                          className={`flex items-center gap-3 ${
                            even ? "lg:flex-row-reverse" : ""
                          }`}
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400 transition-transform duration-300 group-hover:scale-110">
                            <X className="h-5 w-5" />
                          </span>
                          <p className="text-base font-medium text-white md:text-lg">
                            {failure}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ===================== HIGHLIGHTED SOLUTION ===================== */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 max-w-3xl"
        >
          {/* rotating gradient border */}
          <div className="relative overflow-hidden rounded-[28px] p-[2px]">
            <div
              className="aa-spin absolute inset-[-60%]"
              style={{
                background: `conic-gradient(from 0deg, ${BRAND}, ${BRAND_2}, transparent 55%, ${BRAND})`,
              }}
            />
            <div className="relative rounded-[26px] bg-[#0b0b0d] px-7 py-10 text-center md:px-12">
              <div className="pointer-events-none absolute inset-0 rounded-[26px] bg-[radial-gradient(130%_130%_at_50%_0%,rgba(255,57,1,0.14),transparent_60%)]" />
              <div className="relative">
                <span
                  className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: `linear-gradient(135deg, ${BRAND}, ${BRAND_2})` }}
                >
                  <Wrench className="h-6 w-6 text-white" />
                </span>
                <p className="text-2xl font-bold leading-snug text-white md:text-3xl">
                  <span
                    className="mr-1 align-top text-3xl"
                    style={{ color: BRAND }}
                  >
                    “
                  </span>
                  DLUX fix this with a structured,{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(110deg, ${BRAND}, ${BRAND_2})`,
                    }}
                  >
                    AI-driven analytics approach
                  </span>
                  .
                  <span
                    className="ml-1 align-top text-3xl"
                    style={{ color: BRAND }}
                  >
                    ”
                  </span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
