"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Database,
  Brain,
  Globe,
  BarChart3,
  CheckCircle,
} from "lucide-react";
import BenefitItem from "./BenefitItem";

export type Benefit = {
  icon: any;
  title: string;
  description: string;
  number: string;
};

export default function BenefitsSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  const benefits: Benefit[] = [
    {
      icon: Database,
      title: "Centralized Repository",
      description:
        "A centralized, secure cloud repository for your digital assets with controlled permissions and real-time updates.",
      number: "01",
    },
    {
      icon: Brain,
      title: "AI-Driven Production",
      description:
        "Faster content production enabled by AI-driven tagging, duplicate detection, and automated version control.",
      number: "02",
    },
    {
      icon: Globe,
      title: "Channel Readiness",
      description:
        "Enhanced channel readiness through CX Omnichannel, ensuring assets are optimized for web, social, retail, and e-commerce.",
      number: "03",
    },
    {
      icon: BarChart3,
      title: "Transparent Insights",
      description:
        "Transparent insights via Analytics dashboards tracking asset usage, workflow bottlenecks, and campaign impact.",
      number: "04",
    },
    {
      icon: CheckCircle,
      title: "Trusted Platform",
      description:
        "Confidence from a platform trusted by over 4,000 global organizations.",
      number: "05",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-8 lg:py-14"
    >
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{
              delay: i * 0.2,
              duration: 1,
            }}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF3901]/30 to-transparent"
            style={{ top: `${20 + i * 15}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mb-6 text-4xl font-bold text-white md:text-5xl md:leading-tight "
          >
            What You Gain with{" "}
            <span className="block bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Bynder DAM
            </span>
          </motion.h2>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {benefits.map((benefit, index) => (
            <BenefitItem
              key={benefit.title}
              benefit={benefit}
              index={index}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}