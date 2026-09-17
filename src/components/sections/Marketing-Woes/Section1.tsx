"use client";

import { Target, AlertCircle, TrendingDown, DollarSign } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function ProblemSection1() {
  const cards = [
    {
      icon: AlertCircle,
      title: "Generic Messaging",
      desc: "Your message doesn't resonate with anyone specifically because you're trying to appeal to everyone.",
    },
    {
      icon: DollarSign,
      title: "Wasted Budget",
      desc: "Ad spend is wasted on irrelevant audiences who have zero interest in your product.",
    },
    {
      icon: TrendingDown,
      title: "Low Conversions",
      desc: "Low engagement and conversion rates persist no matter how much you spend.",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-5 py-2.5 rounded-full mb-6">
            <Target className="w-5 h-5" />
            <span className="text-sm md:text-base font-medium">
              Challenge #1
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
            Struggling to Define Your{" "}
            <span className="text-[#FF6B00]">Target Audience</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Without a clear understanding of who you're marketing to, your
            campaigns fall flat. You're shooting arrows in the dark, wasting
            budget on people who'll never convert.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.2,
                }}
                viewport={{ once: true }}
                className="
                  group
                  bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D]
                  border border-[#FF6B00]/20
                  rounded-2xl
                  p-6 sm:p-7 lg:p-8
                  transition-all duration-500
                  hover:border-[#FF6B00]
                  hover:scale-[1.04]
                  hover:-translate-y-2
                  hover:shadow-[0_0_40px_rgba(255,107,0,0.15)]
                "
              >

                <Icon className="w-10 h-10 md:w-12 md:h-12 text-[#FF6B00] mb-4 transition-transform duration-500 group-hover:scale-110" />

                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                  {card.title}
                </h3>

                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  {card.desc}
                </p>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}