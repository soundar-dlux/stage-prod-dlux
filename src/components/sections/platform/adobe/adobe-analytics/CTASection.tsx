"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import PrimaryButton from "@/src/components/ui/Buttons/PrimaryButton";

const BRAND = "#FF3901";
const BRAND_2 = "#F07800";

const STAR =
  "polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)";

const headline = "Ready to Implement or Optimize Adobe Analytics?".split(" ");

const sparkles = [
  { left: "10%", top: "26%", size: 12, delay: 0, dur: 4 },
  { left: "84%", top: "22%", size: 14, delay: 1.1, dur: 5 },
  { left: "18%", top: "72%", size: 10, delay: 0.6, dur: 4.5 },
  { left: "88%", top: "68%", size: 12, delay: 1.8, dur: 5 },
  { left: "50%", top: "16%", size: 9, delay: 2.2, dur: 4 },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const word: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Ambient background */}
      <div className="absolute inset-0 z-[1]" aria-hidden="true">
        <div
          className="aa-drift absolute left-1/4 top-0 h-80 w-80 -translate-x-1/2 rounded-full blur-[150px]"
          style={{
            background: BRAND,
            opacity: 0.14,
          }}
        />

        <div
          className="aa-drift-rev absolute bottom-0 right-1/4 h-80 w-80 translate-x-1/2 rounded-full blur-[150px]"
          style={{
            background: BRAND_2,
            opacity: 0.12,
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.03]" />
      </div>

      <div className="container mx-auto max-w-5xl px-6">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-100px",
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          className="relative mx-auto max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-[36px] p-[1.5px]">
            {/* Rotating Border */}
            <div
              className="aa-spin absolute inset-[-60%]"
              style={{
                background: `conic-gradient(from 0deg, ${BRAND}, ${BRAND_2}, transparent 55%, ${BRAND})`,
              }}
            />

            {/* Card */}
            <div className="relative overflow-hidden rounded-[35px] bg-[#0a0a0c] px-6 py-16 text-center md:px-12 md:py-20">
              {/* Glow */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 120% at 50% 0%, rgba(255,57,1,.16), transparent 60%)",
                }}
              />

              {/* Sparkles */}
              {sparkles.map((s, i) => {
                const color = i % 2 === 0 ? BRAND : "#ffffff";

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
                      clipPath: STAR,
                      filter: `drop-shadow(0 0 6px ${color})`,
                      animationDelay: `${s.delay}s`,
                      animationDuration: `${s.dur}s`,
                    }}
                  />
                );
              })}

              {/* Heading */}
              <motion.h2
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{
                  once: true,
                  margin: "-80px",
                }}
                className="relative mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl lg:leading-tight"
              >
                {headline.map((w, i) => {
                  const isBrand = i >= headline.length - 2;

                  return (
                    <motion.span
                      key={i}
                      variants={word}
                      className="mr-[0.25em] inline-block"
                    >
                      {isBrand ? (
                        <span
                          className="bg-clip-text text-transparent"
                          style={{
                            backgroundImage: `linear-gradient(110deg, ${BRAND}, ${BRAND_2})`,
                          }}
                        >
                          {w}
                        </span>
                      ) : (
                        w
                      )}
                    </motion.span>
                  );
                })}
              </motion.h2>

              {/* CTA */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.85,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  margin: "-60px",
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 16,
                  delay: 0.5,
                }}
                className="relative mt-10 flex justify-center"
              >
                <PrimaryButton asChild className="group">
                  <Link href="/contact-us">
                    <span className="inline-flex items-center gap-2">
                      Let&apos;s Discuss Your Needs
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </PrimaryButton>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}