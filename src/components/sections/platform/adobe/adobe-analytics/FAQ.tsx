"use client";

import { Fragment } from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles } from "lucide-react";

const BRAND = "#FF3901";
const BRAND_2 = "#F07800";

const faqs = [
  {
    q: "What is the difference between Adobe Analytics and Customer Journey Analytics (CJA)?",
    a: "Adobe Analytics focuses on session-based web and app analytics. Customer Journey Analytics (CJA) provides a unified, person-based view of the complete customer journey across all online and offline channels.",
  },
  {
    q: "What kind of ROI can we expect from professional Adobe Analytics consulting?",
    a: "Clients typically see improved conversion rates, better marketing ROI, and faster insights. Many achieve payback within 6 months through optimized campaigns and customer experience.",
  },
  {
    q: "How does Adobe Sensei AI improve analytics outcomes in 2026?",
    a: "Adobe Sensei enables anomaly detection, predictive insights, automated alerts, and intelligent recommendations, turning data into proactive business actions.",
  },
  {
    q: "How long does a typical Adobe Analytics implementation take?",
    a: "A typical implementation takes 4 to 12 weeks, depending on the complexity of your website, apps, and integrations.",
  },
  {
    q: "How does Adobe Analytics handle privacy and consent?",
    a: "Adobe provides strong consent management, data governance, and privacy tools. We implement privacy-by-design tracking to keep you fully compliant.",
  },
  {
    q: "Can you migrate from Google Analytics (GA4) to Adobe Analytics?",
    a: "Definitely Yes. We specialize in smooth migrations from GA4 and legacy systems to Adobe Analytics with minimal data loss.",
  },
];

const thread: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
};
const qV: Variants = {
  hidden: { opacity: 0, x: 26, scale: 0.96 },
  show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};
const aV: Variants = {
  hidden: { opacity: 0, x: -26, scale: 0.96 },
  show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export function FAQ() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="aa-drift absolute left-1/4 top-1/4 h-72 w-72 rounded-full blur-[150px]"
          style={{ background: BRAND, opacity: 0.09 }}
        />
        <div
          className="aa-drift-rev absolute bottom-0 right-1/4 h-72 w-72 rounded-full blur-[150px]"
          style={{ background: BRAND_2, opacity: 0.08 }}
        />
      </div>

      <div className="container mx-auto max-w-3xl px-6">
        {/* heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[42px]"
        >
          Frequently Asked Questions About{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(110deg, ${BRAND}, ${BRAND_2})` }}
          >
            Adobe Analytics Consulting
          </span>
        </motion.h2>

        {/* chat window */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.03] shadow-2xl backdrop-blur-xl"
        >
          {/* header bar */}
          <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-5 py-4">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ background: `linear-gradient(135deg, ${BRAND}, ${BRAND_2})` }}
            >
              <Sparkles className="h-5 w-5 text-white" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-white">DLUX</p>
              <p className="flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                online
              </p>
            </div>
          </div>

          {/* messages */}
          <motion.div
            variants={thread}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-5 px-4 py-6 md:px-6"
          >
            {faqs.map((f, i) => (
              <Fragment key={i}>
                {/* question — right */}
                <motion.div variants={qV} className="flex justify-end">
                  <div
                    className="max-w-[82%] rounded-2xl rounded-tr-md px-4 py-3 text-sm font-medium text-white shadow-lg md:text-[15px]"
                    style={{ background: `linear-gradient(135deg, ${BRAND}, ${BRAND_2})` }}
                  >
                    {f.q}
                  </div>
                </motion.div>

                {/* answer — left */}
                <motion.div variants={aV} className="flex items-end justify-start gap-2.5">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                    style={{ background: `linear-gradient(135deg, ${BRAND}, ${BRAND_2})` }}
                  >
                    <Sparkles className="h-4 w-4 text-white" />
                  </span>
                  <div className="max-w-[82%] rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.05] px-4 py-3 text-sm leading-7 text-gray-300 md:text-[15px]">
                    {f.a}
                  </div>
                </motion.div>
              </Fragment>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
