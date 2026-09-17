"use client";

import { motion } from "framer-motion";
import FeatureCard from "../../../ui/Cards/FeatureCard";

export default function FeatureCardsSection() {
  const premiumEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const features = [
    {
      title: "Free Strategy Session",
      description:
        "Map opportunities, define use cases, and estimate project ROI in just 15 minutes with our experts.",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692",
    },
    {
      title: "Design & Rapid Prototyping",
      description:
        "Collaborate closely with your team to co-create solutions and validate ideas quickly through prototypes.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978",
    },
    {
      title: "Governed Build & Testing",
      description:
        "Develop in a secure sandbox with multi-agent orchestration, ensuring reliability, compliance, and performance.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },
    {
      title: "Phased Deployment & Onboarding",
      description:
        "Scale safely with structured deployment, team training, and smooth onboarding across your organization.",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    },
    {
      title: "Optimization & Innovation Sprints",
      description:
        "Continuously improve with data-driven insights, measurable KPIs, and ongoing innovation cycles.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
  ];

  return (
    <section className="bg-black text-white py-24 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: premiumEase }}
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-full mx-auto"
      >
        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Our 5-Phase Proven Approach
          </h2>

          <p className="max-w-2xl mx-auto text-neutral-400 leading-relaxed">
            A structured roadmap to successfully design, build, and scale your Agentic AI professional services.
          </p>

          {/* 🔥 NEW TRUST LINE */}
          <p className="mt-4 text-sm md:text-base text-white/60 italic">
            “Transparent, collaborative, governance-first — built for regulated industries”
          </p>
        </div>

        {/* CARDS */}
        <div className="flex flex-wrap justify-center gap-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              image={feature.image}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}