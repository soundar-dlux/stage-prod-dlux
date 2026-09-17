"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Impact } from "./ImpactSection";

type ImpactNumberProps = {
  impact: Impact;
  index: number;
};

export default function ImpactNumber({
  impact,
  index,
}: ImpactNumberProps) {
  const numberRef = useRef<HTMLDivElement | null>(null);

  const numberInView = useInView(numberRef, {
    once: true,
    amount: 0.5,
  });

  const [count, setCount] = useState(0);

  const numericValue = parseInt(impact.value.replace(/\D/g, ""), 10);

  useEffect(() => {
    if (!numberInView) return;

    let start = 0;
    const duration = 2000;
    const increment = numericValue / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [numberInView, numericValue]);

  const formattedValue = impact.value.includes("%")
    ? `${count}%`
    : impact.value.includes("+")
      ? `${count}+`
      : count.toString();

  return (
    <motion.div
      ref={numberRef}
      initial={{ opacity: 0, y: 50 }}
      animate={numberInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
      }}
      className="group relative"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={numberInView ? { scale: 1 } : {}}
        transition={{
          delay: index * 0.15 + 0.3,
          type: "spring",
          stiffness: 200,
        }}
        className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#FF3901]/20 to-[#F07800]/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#FF3901]/50">
        <motion.div
          initial={{ scale: 0 }}
          animate={numberInView ? { scale: 1 } : {}}
          transition={{
            delay: index * 0.15 + 0.4,
            type: "spring",
          }}
          className="mb-4 bg-gradient-to-br from-[#FF3901] to-[#F07800] bg-clip-text text-6xl font-bold text-transparent md:text-7xl"
        >
          {formattedValue}
        </motion.div>

        <h4 className="mb-3 text-2xl font-bold text-white">
          {impact.title}
        </h4>

        <p className="leading-relaxed text-gray-400">
          {impact.description}
        </p>
      </div>
    </motion.div>
  );
}