"use client";

import { motion, Variants } from "framer-motion";
import {
  BadgeCheck,
  Globe2,
  Trophy,
  Sparkles,
  Workflow,
  ImageIcon,
} from "lucide-react";

const BRAND = "#FF3901";
const BRAND_2 = "#F07800";

const reasons = [
  { icon: BadgeCheck, text: "Certified experts with deep Adobe Stack Knowledge" },
  {
    icon: Globe2,
    text: "Global delivery with cost efficiency (Coimbatore center) and local presence (Sydney HQ)",
  },
  {
    icon: Trophy,
    text: "Proven track record in building intelligent revenue ecosystems, not just stacks",
  },
  {
    icon: Sparkles,
    text: "Focus on clean data → trusted insights → faster activation",
  },
  {
    icon: Workflow,
    text: "Integration with your existing AI & Martech services for end-to-end transformation",
  },
];

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const rowV: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function WhyChooseDlux() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="aa-drift absolute -left-24 top-0 h-72 w-72 rounded-full blur-[150px]"
          style={{ background: BRAND, opacity: 0.1 }}
        />
        <div
          className="aa-drift-rev absolute bottom-1/4 right-0 h-72 w-72 rounded-full blur-[150px]"
          style={{ background: BRAND_2, opacity: 0.08 }}
        />
      </div>

      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          {/* ===================== LEFT: heading + image ===================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <h2 className="text-3xl font-bold lg:leading-tight text-white md:text-4xl lg:text-[42px]">
              What{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(110deg, ${BRAND}, ${BRAND_2})` }}
              >
                business outcome
              </span>{" "}
              does this deliver?
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-400">
              Why Enterprises Trust DLUX for Adobe Analytics / CX Analytics
            </p>

            {/* image placeholder */}
            <div className="relative mt-8 max-w-md">
              <div
                className="absolute -inset-3 rounded-[30px] opacity-25 blur-2xl"
                style={{ background: `linear-gradient(135deg, ${BRAND}, ${BRAND_2})` }}
              />
              <div className="relative rounded-[24px] border border-white/15 bg-white/[0.05] p-3 shadow-2xl backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-[radial-gradient(120%_80%_at_30%_0%,rgba(255,255,255,0.16),transparent_55%)]" />
                <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center overflow-hidden rounded-[16px] border border-dashed border-white/20 bg-gradient-to-br from-white/[0.06] to-white/[0.01]">
                  <div
                    className="aa-shimmer pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.10) 50%, transparent 70%)",
                    }}
                  />
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ background: `linear-gradient(135deg, ${BRAND}, ${BRAND_2})` }}
                  >
                    <ImageIcon className="h-7 w-7 text-white" />
                  </div>
                  <p className="mt-3 text-sm font-medium text-white/80">
                    Image placeholder
                  </p>
                  <p className="mt-1 text-xs text-white/40">
                    Replace with your visual
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ===================== RIGHT: differentiators ===================== */}
          <motion.div
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-4 lg:col-span-7"
          >
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={i}
                  variants={rowV}
                  className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-[#FF3901]/40 md:p-6"
                >
                  {/* left accent bar grows on hover */}
                  <span
                    className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
                    style={{ background: `linear-gradient(${BRAND}, ${BRAND_2})` }}
                  />

                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${BRAND}, ${BRAND_2})` }}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </span>

                  <p className="text-base leading-7 text-white/85 md:text-lg">
                    {r.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
